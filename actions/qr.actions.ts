'use server';
import prisma from '@/lib/prisma';

export async function getQR(id: string) {
  try {
    const qr = await prisma.qr.findFirst({
      where: {
        id: id,
      },
      include: {
        vote: true,
      },
    });
    return JSON.parse(JSON.stringify(qr));
  } catch (error) {
    console.log(error);
  }
}
export async function visitedQR(id: string) {
  try {
    const qr = await prisma.qr.update({
      where: {
        id: id,
      },
      data: {
        visited: true,
      },
    });
    return JSON.parse(JSON.stringify(qr));
  } catch (error) {
    console.log(error);
  }
}
