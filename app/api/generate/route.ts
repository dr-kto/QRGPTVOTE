import { replicateClient } from '@/utils/ReplicateClient';
import { QrGenerateRequest, QrGenerateResponse } from '@/utils/service';
import { NextRequest } from 'next/server';
// import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';
import prisma from '@/lib/prisma';
import { put } from '@vercel/blob';
import { nanoid } from '@/utils/utils';
import cuid from 'cuid';
import { error } from 'console';

/**
 * Validates a request object.
 *
 * @param {QrGenerateRequest} request - The request object to be validated.
 * @throws {Error} Error message if URL or prompt is missing.
 */

const validateRequest = (request: QrGenerateRequest) => {
  if (!request.url) {
    throw new Error('URL is required');
  }
  if (!request.prompt) {
    throw new Error('Prompt is required');
  }
};

// const ratelimit = new Ratelimit({
//   redis: kv,
//   // Allow 20 requests from the same IP in 1 day.
//   limiter: Ratelimit.slidingWindow(20, '1 d'),
// });

export async function POST(request: NextRequest) {
  const reqBody = (await request.json()) as QrGenerateRequest;

  // const ip = request.ip ?? '127.0.0.1';
  // const { success } = await ratelimit.limit(ip);

  // if (!success && process.env.NODE_ENV !== 'development') {
  //   return new Response('Too many requests. Please try again after 24h.', {
  //     status: 429,
  //   });
  // }

  try {
    validateRequest(reqBody);
  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message, { status: 400 });
    }
  }

  // const id = nanoid();
  // const id = cuid();
  const createdAt = new Date();
  const startTime = performance.now();

  let qrId = '';
  try {
    const qr = await prisma.qr.create({
      data: {
        prompt: reqBody.prompt,
        image: '',
        website_url: reqBody.url,
        model_latency: 0,
        visited: false,
      },
    });
    qrId = qr.id;
  } catch (err) {
    console.log(error + 'bul error');
  }

  let imageUrl = await replicateClient.generateQrCode({
    url: reqBody.url + qrId,
    prompt: reqBody.prompt,
    qr_conditioning_scale: 2,
    num_inference_steps: 30,
    guidance_scale: 5,
    negative_prompt:
      'Longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, blurry',
  });

  const endTime = performance.now();
  const durationMS = endTime - startTime;

  // convert output to a blob object
  const file = await fetch(imageUrl).then((res) => res.blob());

  // upload & store in Vercel Blob
  const { url } = await put(`${createdAt}.png`, file, { access: 'public' });

  // await kv.hset(id, {
  //   prompt: reqBody.prompt,
  //   image: url,
  //   website_url: reqBody.url,
  //   model_latency: Math.round(durationMS),
  // });

  try {
    const qr = await prisma.qr.update({
      where: {
        id: qrId,
      },
      data: {
        prompt: reqBody.prompt,
        image: url,
        website_url: reqBody.url,
        model_latency: Math.round(durationMS),
      },
    });
    // const QR = await prisma.qr.findMany({
    //   orderBy: {
    //     id: 'desc',
    //   },
    //   take: 1,
    // });

    // const id = QR[0].id;
    const id = qr.id;

    const response: QrGenerateResponse = {
      image_url: url,
      model_latency_ms: Math.round(durationMS),
      id: id,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (err) {
    console.log(error + 'bul error');
  }
}
