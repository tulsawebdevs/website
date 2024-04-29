import { Badge } from '../../../../components/ui/badge.tsx';
import type { Proposal } from '../types';

type Props = {
  status: Proposal['status'];
};

export default function ProposalStatus({ status }: Props) {
  // 'draft' | 'open' | 'rfc' | 'closed'
  if (status === 'draft') return <Badge variant="secondary">Draft</Badge>;
  if (status === 'open') return <Badge variant="success">Open</Badge>;
  if (status === 'rfc') return <Badge variant="outline">RFC</Badge>;
  if (status === 'closed') return <Badge variant="destructive">Closed</Badge>;

  return null;
}
