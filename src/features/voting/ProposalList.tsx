import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import NewProposalFormButton from './NewProposalFormButton.tsx';

import ProposalCard, { type ProposalCardProps } from './ProposalCard.tsx';
import { Button } from '../ui/button.tsx';
import { sdk, type Paginated } from '../../sdk.ts';

// This component auto-loads proposals on scroll, so we hard-code a static limit
const limit = 10;

export function ProposalList() {
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState<Paginated['cursor']>();
  const [proposals, setProposals] = useState<ProposalCardProps[]>([]);

  useEffect(() => {
    setLoading(true);
    sdk
      .getProposals({ queries: { pagination: { limit } } })
      .then((result) => {
        setCursor(result.cursor);
        setProposals(result.proposals);
      })
      .catch(toast.error)
      .finally(() => setLoading(false));
  }, []);

  const onClick = useCallback(() => {
    if (loading) return;
    setLoading(true);
    sdk
      .getProposals({ queries: { pagination: { cursor, limit } } })
      .then((args) => {
        setCursor(args.cursor);
        setProposals([...proposals, ...args.proposals]);
      })
      .catch(toast.error)
      .finally(() => setLoading(false));
  }, [loading, cursor, proposals]);

  return (
    <div>
      <ul className="flex flex-col" id="proposal-list">
        {proposals.map((proposal) => (
          <li key={`${proposal.summary}`} className="mb-2">
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <ProposalCard {...proposal} />
          </li>
        ))}
        {loading || proposals.length ?
          <div className="flex justify-center p-5 text-black">
            <Button onClick={onClick} busy={loading} variant="secondary">
              Load More
            </Button>
          </div>
        : <li>
            <div className="text-center p-2">
              <h2 className="font-bold text-xl mb-2">No proposals found</h2>
              <NewProposalFormButton />
            </div>
          </li>
        }
      </ul>
    </div>
  );
}
