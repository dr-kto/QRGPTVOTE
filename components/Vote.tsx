'use client';
import { getQR, visitedQR } from '@/actions/qr.actions';
import VoteUp from './VoteUp';
import prisma from '@/lib/prisma';
import { handleError } from '@/utils/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import VoteList from './VoteList';

// export type SearchParamProps = {
//   params?: { id: string };
//   searchParams?: { [key: string]: string | string[] | undefined };
// };

// export async function getVote(id: string) {
//   try {
//     const usedQRVote = await prisma.vote.findFirst({
//       where: {
//         qrId: id,
//       },
//     });

//     if (usedQRVote) {
//       throw new Error(`Voted`);
//     }

//     // const
//   } catch (error) {
//     handleError(error);
//   }

//   return [];
// }

function setDeviceIdCookie() {
  var deviceId = generateDeviceId(); // generate a unique identifier
  var expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 1); // set the cookie to expire in 1 year
  document.cookie =
    'deviceId=' +
    deviceId +
    '; expires=' +
    expirationDate.toUTCString() +
    '; path=/';
}

function getDeviceIdCookie() {
  var cookies = document.cookie.split('; ');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].split('=');
    if (cookie[0] === 'deviceId') {
      return cookie[1];
    }
  }
  return null;
}

function generateDeviceId() {
  // generate a unique identifier using a combination of browser information and a random number
  var browserInfo =
    navigator.userAgent + navigator.language + screen.width + screen.height;
  var randomNumber =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  return hashCode(browserInfo + randomNumber);
}

function hashCode(str: string) {
  // generate a hash code for the input string
  var hash = 0;
  if (str.length == 0) {
    return hash;
  }
  for (var i = 0; i < str.length; i++) {
    var char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

const fullUrl = process.env.NEXT_PUBLIC_SERVER_URL as string;
// const origin = window.location.origin;
// const hostname =
//   typeof window !== 'undefined' && window.location.hostname
//     ? window.location.hostname
//     : '';
// const origin =
//   typeof window !== 'undefined' && window.location.origin
//     ? window.location.origin
//     : '';

//////////////
const Vote = ({
  id,
  children,
  isVoted,
}: {
  id?: string;
  children?: React.ReactNode;
  isVoted?: boolean;
}) => {
  // const vote = await getVote(params.id);

  return (
    <>
      <div>
        page {id}
        <p>{fullUrl}</p>
        {id ? (
          <>{isVoted ? <>redirect to vote</> : children}</>
        ) : (
          <>{children}</>
        )}
        {/* <p>{origin}a</p> */}
      </div>
    </>
  );
};

export default Vote;
