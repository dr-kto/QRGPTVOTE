'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { QrGenerateRequest, QrGenerateResponse } from '@/utils/service';
import { QrCard } from '@/components/QrCard';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import LoadingDots from '@/components/ui/loadingdots';
import downloadQrCode from '@/utils/downloadQrCode';
import va from '@vercel/analytics';
import { PromptSuggestion } from '@/components/PromptSuggestion';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import { getQR } from '@/actions/qr.actions';

const promptSuggestions = [
  'A city view with clouds',
  'A beautiful glacier',
  'A forest overlooking a mountain',
  'A saharan desert',
];

const generateFormSchema = z.object({
  url: z.string().min(1),
  prompt: z.string().min(3).max(160),
});

type GenerateFormValues = z.infer<typeof generateFormSchema>;

const fullUrl = (process.env.NEXT_PUBLIC_SERVER_URL + '/vote/') as string;

////////////////////////////////////////////////////////////////
const QR = ({
  imageUrl,
  prompt,
  redirectUrl,
  modelLatency,
  id,
}: {
  imageUrl?: string;
  prompt?: string;
  redirectUrl?: string;
  modelLatency?: number;
  id?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [response, setResponse] = useState<QrGenerateResponse | null>(null);
  // const [submittedURL, setSubmittedURL] = useState<string | null>(null);
  // const [flag, setFlag] = useState(1);
  const [visited, setVisited] = useState(false);
  const [qrId, setQrId] = useState();

  let flag = 1;

  const router = useRouter();

  useEffect(() => {
    if (flag === 1) {
      flag = 0;

      // setFlag((prev) => prev - 1);
      console.log('setFlag');
      generateQR({
        url: fullUrl,
        prompt: 'A city with mountains and clouds',
      });
    }
  }, [flag]);

  useEffect(() => {
    if (imageUrl && prompt && redirectUrl && modelLatency && id) {
      setResponse({
        image_url: imageUrl,
        model_latency_ms: modelLatency,
        id: id,
      });
      // for (x in promts) {
      //   if (prompt !== x) {
      //     setPromt(x);
      //   }
      // }
      // setSubmittedURL(redirectUrl);
      //
    }
  }, [imageUrl, prompt, redirectUrl, modelLatency, id]);

  async function l() {
    try {
      if (id) {
        console.log('loads');
        const qr = await getQR(id);
        setVisited(qr.visited);
      }
    } catch (error) {
      console.log(error);
    }

    if (visited && isLoading) {
      console.log('visit');
      router.push(`/qr/${qrId}`);
      return;
    }
  }
  l();
  // useEffect(() => {
  //   console.log(flag + ' set flag');
  //   if (flag === 1) {
  //     console.log(flag + ' set flague');
  //     // setFlag((prev) => prev - 1);

  //     // generateQR({
  //     //   url: fullUrl,
  //     //   prompt: 'A city with mountains and clouds',
  //     // });
  //   }
  // }, [flag]);

  // if (flag === 1) {
  //   setTimeout(() => {
  //     setFlag((prev) => prev - 1);
  //   }, 1000);
  // }

  const generateQR = useCallback(
    async (values: GenerateFormValues) => {
      setIsLoading(true);
      setResponse(null);
      // setSubmittedURL(values.url);

      try {
        const request: QrGenerateRequest = {
          url: values.url,
          prompt: values.prompt,
        };
        const response = await fetch('/api/generate', {
          method: 'POST',
          body: JSON.stringify(request),
        });

        // Handle API errors.
        if (!response.ok || response.status !== 200) {
          const text = await response.text();
          throw new Error(
            `Failed to generate QR code: ${response.status}, ${text}`,
          );
        }

        const data = await response.json();

        va.track('Generated QR Code', {
          prompt: values.prompt,
        });

        if (!id) {
          router.push(`/qr/${data.id}`);
        }
        setQrId(data.id);
        // const qrVote = await getVote(data.id);
        // const qrVote = await getVote(qrId);
        // console.log(qrVote);
        // if (qrVote.length > 0) {
        //   console.log('ttr');
        //   setVote(qrVote.vote.qrId);
        // }
        // if (vote || flag === 1) {
        //   console.log(flag + '->flague');
        //   setFlag(0);
        //   router.push(`/qr/ai/${qrId}`);
        // }
        // router.push(`/vote/${data.id}`);
      } catch (error) {
        va.track('Failed to generate', {
          prompt: values.prompt,
        });
        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [router],
  );

  return (
    <div className="flex flex-col justify-center relative h-auto items-center pt-[40%]">
      {response ? (
        <QrCard
          imageURL={response.image_url}
          time={(response.model_latency_ms / 1000).toFixed(2)}
        />
      ) : (
        <div className="relative flex flex-col justify-center items-center gap-y-2 w-[510px] border border-gray-300 rounded shadow group p-2 mx-auto animate-pulse bg-gray-400 aspect-square max-w-full" />
      )}
    </div>
  );
};

export default QR;
