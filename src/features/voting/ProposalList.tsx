import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import ProposalFormButton from './ProposalFormButton.tsx';

import ProposalCard, { type ProposalCardProps } from './ProposalCard.tsx';
import { Button } from '../ui/button.tsx';
import { sdk, type Paginated } from '../../sdk.ts';
import { useSession } from '../auth/hooks.ts';
import { LoadingSpinner } from '../ui/LoadingSpinner.tsx';

// This component auto-loads proposals on scroll, so we hard-code a static limit
const limit = 10;

export function ProposalList() {
  const session = useSession();
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState<Paginated['cursor']>();
  const [proposals, setProposals] = useState<ProposalCardProps[]>([]);

  const load = useCallback(
    async (pagination: Paginated, token?: string | null) => {
      setLoading(true);

      try {
        const result = await sdk.listProposals({
          queries: { pagination },
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setCursor(result.cursor);
        setProposals(result.proposals);
      } catch (e) {
        if (e instanceof Error) return console.dir(e.message);
        else throw e;
      } finally {
        setLoading(false);
      }
    },
    [session],
  );

  useEffect(() => {
    session?.getToken().then((token) =>
      // Load initial proposals
      toast.promise(load({ limit }, token), {
        loading: 'Loading proposals...',
        success: 'Proposals loaded',
        error: 'Failed to load proposals',
      }),
    );
  }, [load, session]);

  const onClick = useCallback(async () => {
    if (loading) return;
    if (!cursor) return;
    session?.getToken().then((token) =>
      toast.promise(load({ cursor, limit }, token), {
        loading: 'Loading more proposals...',
        success: 'More proposals loaded',
        error: 'Failed to load more proposals',
      }),
    );
  }, [loading, load, cursor]);

  return (
    <div>
      {!loading && !proposals.length && (
        <li>
          <div className="text-center p-2">
            <h2 className="font-bold text-xl mb-2">No proposals found</h2>
            <ProposalFormButton />
          </div>
        </li>
      )}

      <ul className="flex flex-col" id="proposal-list">
        {proposals.map((proposal) => (
          <li key={`${proposal.id}`} className="mb-2">
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <ProposalCard {...proposal} />
          </li>
        ))}
      </ul>

      <div className="flex justify-center p-5 text-black">
        {proposals.length && loading ?
          <LoadingSpinner className="max-h-6 max-w-6 opacity-70" />
        : <Button
            onClick={onClick}
            busy={loading}
            disabled={!cursor}
            variant="secondary"
          >
            Load More
          </Button>
        }
      </div>
    </div>
  );
}
