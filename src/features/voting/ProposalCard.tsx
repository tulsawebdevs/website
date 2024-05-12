import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import { z } from 'zod';
import {
  CardHeader,
  CardContent,
  Card,
  CardTitle,
  CardDescription,
} from '../ui/card.tsx';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar.tsx';
import ProposalStatusBadge from './ProposalStatusBadge.tsx';

import useDebounce from '../hooks/useDebounce.ts';
import ProposalInterestVote, { type Vote } from './ProposalInterestVote.tsx';
import ProposalLikeButtons from './ProposalLikeButtons.tsx';
import { useIfAuthorized, useSession } from '../auth/hooks.ts';

import { schemas, sdk } from '../../sdk.ts';

const proposalListItemSchema = schemas.Proposal.and(schemas.DatabaseObject)
  .and(schemas.ProposalVoteState)
  .and(
    z.object({
      authorName: z.string(),
    }),
  );

type ProposalListItem = z.infer<typeof proposalListItemSchema>;

export default function ProposalListItem(props: {
  proposal: ProposalListItem;
}) {
  const [vote, setVote] = useState<Vote>({ value: '0' });

  const proposedDate = new Date(props.proposal.created).toLocaleDateString(
    'en-US',
    {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    },
  );

  const proposedTime = new Date(props.proposal.created).toLocaleTimeString(
    'en-US',
    {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    },
  );

  const displayName = useMemo(
    () =>
      props.proposal.authorName
        .split(' ')
        .map((name) => name[0])
        .join(''),
    [props.proposal.authorName],
  );

  const numberUpvotes = useMemo(
    () =>
      // eslint-disable-next-line no-nested-ternary
      props.proposal.status === 'closed' ?
        props.proposal.results.reduce((accumulator, result) => {
          const voteValue = parseInt(result.value, 10);
          if (voteValue > 0) {
            return accumulator + voteValue;
          }
          return accumulator;
        }, 0)
      : parseInt(props.proposal.userVote?.value ?? '0', 10) > 0 ?
        parseInt(props.proposal.userVote!.value, 10)
      : 0,
    [props.proposal],
  );

  const numberDownvotes = useMemo(
    () =>
      // eslint-disable-next-line no-nested-ternary
      props.proposal.status === 'closed' ?
        props.proposal.results.reduce((accumulator, result) => {
          const voteValue = parseInt(result.value, 10);
          if (voteValue < 0) {
            return accumulator + voteValue;
          }
          return accumulator;
        }, 0)
      : parseInt(props.proposal.userVote?.value ?? '0', 10) < 0 ?
        parseInt(props.proposal.userVote!.value, 10)
      : 0,
    [props.proposal],
  );

  const session = useSession();

  const castVote = useDebounce(async (newVote: Vote) => {
    toast.promise(
      sdk.post('/:proposalId', newVote, {
        headers: { Authorization: `Bearer: ${await session?.getToken()}` },
        params: { proposalId: props.proposal.id },
      }),
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
      <CardHeader className="pb-0 pt-6 flex flex-row justify-between">
        <CardTitle className="content-center">{props.proposal.title}</CardTitle>

        <ProposalLikeButtons
          onVoteValueChange={(value) => onVoteChange({ ...vote, value })}
          numberUpvotes={numberUpvotes}
          numberDownvotes={numberDownvotes}
          disabled={props.proposal.status !== 'open'}
          voteValue={vote.value}
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
                {props.proposal.authorName}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 content-center">
                Proposed {proposedDate} at {proposedTime}
              </div>
              <div>
                <ProposalStatusBadge status={props.proposal.status} />
              </div>
            </div>
          </div>

          <CardDescription className="py-4">
            {props.proposal.description}
          </CardDescription>
        </div>

        <div>
          <ProposalInterestVote
            proposal={props.proposal}
            onVoteChange={onVoteChange}
            disabled={props.proposal.status !== 'open'}
            vote={vote}
          />
        </div>
      </CardContent>
    </Card>
  );
}
