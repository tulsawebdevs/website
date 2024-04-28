import { useState } from 'react';
import { Button } from '../ui/button.tsx';
import { getProposals } from '../../services/proposal.ts';
import type { Proposal } from '../../types/proposal.ts';
import ProposalListItem from './ProposalListItem.tsx';

type Props = {
  cursor?: string;
};

export default function LoadMoreProposalsButton(props: Props) {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState<string | undefined>(props.cursor);

  const fetchMoreProposals = () => {
    if (!cursor) return;

    setLoading(true);
    getProposals(cursor)
      .then(({ cursor: nextCursor, proposals: proposalData }) => {
        setCursor(nextCursor);
        setProposals([...proposals, ...proposalData]);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {proposals.map((proposal) => (
        <li key={proposal.id} className="mb-2">
          <ProposalListItem proposal={proposal} />
        </li>
      ))}
      {cursor && !loading && (
        <Button onClick={fetchMoreProposals} className="my-2">
          Load More
        </Button>
      )}
      {loading && <p className="text-center">Loading...</p>}
    </>
  );
}
