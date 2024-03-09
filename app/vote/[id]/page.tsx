import Vote from '@/components/Vote';
import VoteUp from '@/components/VoteUp';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { handleError } from '@/utils/utils';
import { visitedQR } from '@/actions/qr.actions';

async function getAIQR(id: string) {
  try {
    const data = await prisma.qr.findFirst({
      where: {
        id: id,
      },
    });
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log(error);
    // handleError(error);
  }
}

export default async function page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  //   const data = await getAllKv(params.id);
  const data = await getAIQR(params.id);

  if (!data) {
    notFound();
  }

  let isVoted = false;

  if (data?.vote) {
    console.log('no vote');
    // const updatedQr = await visitedQR(params.id);
  } else if (data?.vote) {
    // router.push(`/`)
    console.log('noote');

    isVoted = true;
  }

  // const router = useRouter();

  // const [isVoted, setIsVoted] = useState(false);

  // let flag = 1;

  // useEffect(() => {
  //   if (flag === 1) {
  //     flag = 0;

  //     console.log('setFlag');
  //     if (id) {
  //       const l = async () => {
  //         console.log(id);
  //         const qr = await getQR(id);

  //         console.log('sr' + qr);
  //         if (qr) {
  //           console.log('qr');
  // if (qr?.vote) {
  //   console.log('no vote');
  //   const updatedQr = await visitedQR(id);
  // } else if (qr?.vote) {
  //   // router.push(`/`)
  //   console.log('noote');

  //   setIsVoted(true);
  // }
  //           console.log('vv');
  //         }
  //       };

  //       l();
  //     }
  //   }
  // }, [flag]);

  return (
    <Vote
      // prompt={data.prompt}
      // imageUrl={data.image}
      // redirectUrl={data.website_url}
      // modelLatency={Number(data.model_latency)}
      isVoted={isVoted}
      id={params.id}
    >
      <VoteUp id={params.id} />
    </Vote>
  );
}
