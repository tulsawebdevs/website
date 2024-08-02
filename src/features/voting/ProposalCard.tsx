import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import {
  CardHeader,
  CardContent,
  Card,
  CardTitle,
  CardDescription,
  CardFooter,
} from '../ui/card.tsx';
import { Badge } from '../ui/badge.tsx';
import useDebounce from '../hooks/useDebounce.ts';
import ProposalInterestVote from './ProposalInterestVote.tsx';
import ProposalLikeButtons from './ProposalLikeButtons.tsx';
import { useIfAuthorized, useSession } from '../auth/hooks.ts';
import {
  sdk,
  type DatabaseObject,
  type Proposal,
  type ProposalState,
  type Vote,
} from '../../sdk.ts';

export type ProposalCardProps = DatabaseObject & Proposal & ProposalState;

export default function ProposalCard(props: ProposalCardProps) {
  const [vote, setVote] = useState(props.userVote);

  const proposedDate = useMemo(
    () =>
      new Date(props.created).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    [props.created],
  );

  const proposedTime = useMemo(
    () =>
      new Date(props.created).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }),
    [props.created],
  );

  const votes = useMemo(() => {
    if (props.status === 'closed') {
      return props.results.reduce(
        (accumulator, result) => {
          const voteValue = result.value;
          accumulator[voteValue > 0 ? 'up' : 'down'] += voteValue;
          return accumulator;
        },
        { up: 0, down: 0 },
      );
    }

    return {
      up: vote && vote.value > 0 ? vote.value : 0,
      down: vote && vote.value < 0 ? vote.value : 0,
    };
  }, [props, vote]);

  const session = useSession();

  const castVote = useDebounce(async (newVote: Vote) => {
    toast.promise(
      sdk.post('/proposals/vote', newVote, {
        headers: { Authorization: `Bearer ${await session?.getToken()}` },
        queries: { recordId: props.id },
      }),
      {
        loading: 'Casting vote...',
        success: 'Vote cast successfully.',
        error: 'Failed to cast vote.',
      },
    );
  });

  const onVoteChange = useIfAuthorized(
    (value: Vote) => {
      setVote(value);
      castVote(value);
    },
    { unauthorizedMessage: 'You must be logged in to vote.' },
  );

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between gap-2 flex-wrap">
        <div className="flex flex-col max-w-full gap-2 content-center">
          <CardTitle className="break-words text-wrap">{props.title}</CardTitle>
          <h2 className="break-words">{props.summary}</h2>
        </div>

        <ProposalLikeButtons
          onVoteValueChange={(value) => onVoteChange({ ...vote, value })}
          numberUpvotes={votes.up}
          numberDownvotes={votes.down}
          disabled={props.status !== 'open'}
          voteValue={vote?.value}
        />
      </CardHeader>

      <CardContent className="flex gap-6 flex-col">
        <CardDescription className="break-words">
          {props.description}
        </CardDescription>

        <ProposalInterestVote
          proposalId={props.id}
          onVoteChange={onVoteChange}
          disabled={props.status !== 'open'}
          vote={vote}
        />
      </CardContent>

      <CardFooter className="flex flex-row justify-between gap-4">
        <Badge variant={props.status === 'open' ? 'success' : 'destructive'}>
          {props.status.toUpperCase()}
        </Badge>

        <div className="flex flex-row place-items-center gap-2">
          <div className="font-bold dark:text-gray-200">{props.authorName}</div>

          <div className="text-sm text-gray-500 dark:text-gray-400 content-center">
            Proposed {proposedDate} at {proposedTime}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
