import { useState } from 'react';
import { Button } from '../../ui/button.tsx';
import { getProposals } from '../services/proposal.ts';
import type { Proposal } from '../types.ts';
import ProposalListItem from '../card/ProposalCard.tsx';

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

      <div className="text-center">
        {cursor && !loading && (
          <Button onClick={fetchMoreProposals} className="my-2">
            Load More
          </Button>
        )}
        {loading && <p>Loading...</p>}
      </div>
    </>
  );
}