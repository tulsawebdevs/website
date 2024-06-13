import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import {
  CardHeader,
  CardContent,
  Card,
  CardTitle,
  CardDescription,
} from '../ui/card.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar.tsx';
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
  const [previousVote, setPreviousVote] = useState(props.userVote);

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

  const displayName = useMemo(
    () =>
      props.authorName
        .split(' ')
        .map((name) => name[0]?.toUpperCase() ?? '')
        .join(''),
    [props.authorName],
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
    sdk
      .submitVote(newVote, {
        headers: { Authorization: `Bearer ${await session?.getToken()}` },
        queries: { recordId: props.id },
      })
      .then(() => {
        setPreviousVote(newVote);
      })
      .catch(() => {
        setVote(previousVote);
        toast.error('Unable to cast vote. Please try again.');
      });
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
      <CardHeader className="pb-0 pt-6 flex flex-row justify-between">
        <CardTitle className="content-center">{props.title}</CardTitle>

        <ProposalLikeButtons
          onVoteValueChange={(value) => onVoteChange({ ...vote, value })}
          numberUpvotes={votes.up}
          numberDownvotes={votes.down}
          disabled={props.status !== 'open'}
          voteValue={vote?.value}
        />
      </CardHeader>

      <CardContent className="my-3">
        <div className="mb-2">
          <div className="flex space-x-2 mb-2">
            <Avatar className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-200">
              <AvatarImage
                alt="avatar"
                src="http://placedog.net/100/100?50"
                className="w-full h-full object-cover rounded-full"
              />
              <AvatarFallback className="capitalize">
                {displayName}
              </AvatarFallback>
            </Avatar>

            <div>
              <div className="font-bold dark:text-gray-200">
                {props.authorName}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 content-center">
                Proposed {proposedDate} at {proposedTime}
              </div>
              <div>
                <Badge
                  variant={props.status === 'open' ? 'success' : 'destructive'}
                >
                  {props.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>

          <CardDescription className="py-4">
            {props.description}
          </CardDescription>
        </div>

        <div>
          <ProposalInterestVote
            proposalId={props.id}
            onVoteChange={onVoteChange}
            disabled={props.status !== 'open'}
            vote={vote}
          />
        </div>
      </CardContent>
    </Card>
  );
}
