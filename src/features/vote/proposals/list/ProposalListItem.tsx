import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import {
  CardHeader,
  CardContent,
  Card,
  CardTitle,
  CardDescription,
} from '../../../../components/ui/card.tsx';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../../components/ui/avatar.tsx';
import ProposalStatus from './ProposalStatus.tsx';
import type { Proposal, Vote, VotePayload } from '../types.ts';
import useDebounce from '../../../hooks/useDebounce.ts';
import ProposalInterestVote from './ProposalInterestVote.tsx';
import ProposalLikeButtons from './ProposalLikeButtons.tsx';
import { useFetchPost, useProtectedFunction } from '../../../auth/hooks.ts';

export type ProposalListItemProps = {
  proposal: Proposal;
};

export default function ProposalListItem({ proposal }: ProposalListItemProps) {
  const [voteValue, setVoteValue] = useState<Vote>('0');
  const isOpen = proposal.status === 'open';
  const proposedDate = new Date(proposal.created).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const proposedTime = new Date(proposal.created).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  const { authorName } = proposal;
  const displayName = useMemo(() => {
    if (authorName) {
      return authorName.slice(0, 2);
    }

    return 'A';
  }, [authorName]);

  const numberUpvotes = useMemo(() => {
    // if status is not open, return total number of votes
    if (!isOpen) {
      return 72; // TODO: Replace with actual vote total
    }
    // if status is open, only show the user's votes
    // and if vote is below zero return 0 for postive votes
    const userVote = parseInt(voteValue, 10);

    return userVote > 0 ? voteValue : 0;
  }, [voteValue, isOpen]);
  const numberDownvotes = useMemo(() => {
    // if status is not open, return total number of votes
    if (!isOpen) {
      return 18; // TODO: Replace with actual vote total
    }
    // if status is open, only show the user's votes
    // and if vote is above zero return 0 for negative votes
    const userVote = parseInt(voteValue, 10);

    return userVote < 0 ? voteValue : 0;
  }, [voteValue, isOpen]);

  const voteRequest = useFetchPost(
    `https://vote.tulsawebdevs.org/proposals/${proposal.id}/vote`,
  );
  const castVote = useDebounce((value: Vote) => {
    const votePayload: VotePayload = {
      initiativeId: proposal.id.toString(10),
      vote: value,
      comment: '',
      authorId: proposal.authorId,
      authorName: proposal.authorName,
      authorEmail: proposal.authorEmail,
    };

    voteRequest(votePayload).catch(() => {
      toast.error('Could not cast vote. Please try again.', {
        duration: 3000,
        closeButton: true,
      });
    });
  });

  const handleVote = useProtectedFunction(
    (value: Vote) => {
      setVoteValue(value);
      castVote(value);
    },
    {
      unauthorizedMessage: 'You do not have permission to vote.',
    },
  );

  return (
    <Card>
      <CardHeader className="pb-0 pt-6 flex flex-row justify-between">
        <CardTitle className="content-center">{proposal.title}</CardTitle>

        <ProposalLikeButtons
          onVote={handleVote}
          numberUpvotes={numberUpvotes}
          numberDownvotes={numberDownvotes}
          disabled={!isOpen}
          voteValue={voteValue}
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
                {proposal.authorName}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 content-center">
                Proposed {proposedDate} at {proposedTime}
              </div>
              <div>
                <ProposalStatus status={proposal.status} />
              </div>
            </div>
          </div>

          <CardDescription className="py-4">
            {proposal.description}
          </CardDescription>
        </div>

        <div>
          <ProposalInterestVote
            proposal={proposal}
            onVote={handleVote}
            disabled={!isOpen}
            value={voteValue}
          />
        </div>
      </CardContent>
    </Card>
  );
}
