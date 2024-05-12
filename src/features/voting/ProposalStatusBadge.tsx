import { Badge } from '../ui/badge.tsx';
import type { ProposalRecord } from './ProposalList.tsx';

type Props = {
  status: ProposalRecord['status'];
};

export default function ProposalStatus({ status }: Props) {
  if (status === 'draft') return <Badge variant="outline">Draft</Badge>;
  if (status === 'open') return <Badge variant="success">Open</Badge>;
  if (status === 'closed') return <Badge variant="destructive">Closed</Badge>;

  return null;
}
