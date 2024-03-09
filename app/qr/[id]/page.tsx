import { kv } from '@vercel/kv';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Body from '@/components/Body';
import { handleError } from '@/utils/utils';
import QR from '@/components/QR';

async function getAllKv(id: string) {
  const data = await kv.hgetall<{
    prompt: string;
    image?: string;
    website_url?: string;
    model_latency?: string;
  }>(id);

  return data;
}

async function getAIQR(id: string) {
  try {
    const data = await prisma.qr.findFirst({
      where: {
        id: id,
      },
    });
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    handleError(error);
  }
}

// export async function generateMetadata({
//   params,
// }: {
//   params: {
//     id: string;
//   };
// }): Promise<Metadata | undefined> {
//   //   const data = await getAllKv(params.id);
//   const data = await getAIQR(params.id);
//   if (!data) {
//     return;
//   }

//   const title = `QrGPT: ${data.prompt}`;
//   const description = `A QR code generated from qrGPT.io linking to: ${data.website_url}`;
//   const image = data.image || 'https://qrGPT.io/og-image.png';

//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//       images: [
//         {
//           url: image,
//         },
//       ],
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title,
//       description,
//       images: [image],
//       creator: '@nutlope',
//     },
//   };
// }

export default async function Results({
  params,
}: {
  params: {
    id: string;
  };
}) {
  //   const data = await getAllKv(params.id);
  console.log(params.id);
  const data = await getAIQR(params.id);

  if (!data) {
    notFound();
  }
  return (
    <QR
      prompt={data.prompt}
      imageUrl={data.image}
      redirectUrl={data.website_url}
      modelLatency={Number(data.model_latency)}
      id={params.id}
    />
  );
}
