'use server';
import { visitedQR } from '@/actions/qr.actions';
import VoteList from './VoteList';

const VoteUp = async ({ id }: { id: string }) => {
  await visitedQR(id);
  return <VoteList />;
};

export default VoteUp;
