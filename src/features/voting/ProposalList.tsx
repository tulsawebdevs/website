import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import type { z } from 'zod';
import NewProposalFormButton from './NewProposalFormButton.tsx';

import ProposalListItem from './ProposalCard.tsx';
import { Button } from '../ui/button.tsx';
import { schemas, sdk } from '../../sdk.ts';

const limit = 10;

const getProposalResultSchema = schemas.DatabaseObject.and(schemas.Proposal);

export type ProposalRecord = z.infer<typeof getProposalResultSchema>;

export function ProposalList() {
  const [cursor, setCursor] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);
  const [proposals, setProposals] = useState<ProposalRecord[]>([]);

  useEffect(() => {
    setLoading(true);
    sdk
      .getProposals({ queries: { limit } })
      .then((args) => {
        setCursor(args.cursor);
        setProposals(args.proposals);
      })
      .catch(toast.error)
      .finally(() => setLoading(false));
  }, []);

  const onClick = useCallback(() => {
    if (loading) return;
    setLoading(true);
    sdk
      .getProposals({ queries: { cursor, limit } })
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
            <ProposalListItem proposal={proposal} />
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
