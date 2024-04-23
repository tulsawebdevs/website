/**
 * v0 by Vercel.
 * @see https://v0.dev/t/sLO9yNDsRM6
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import type React from 'react';
import { Button } from './ui/button.tsx';
import { CardHeader, CardContent, Card } from './ui/card.tsx';
import { AvatarImage, AvatarFallback, Avatar } from './ui/avatar.tsx';
import { RadioGroupItem, RadioGroup } from './ui/radio-group.tsx';
import { Label } from './ui/label.tsx';

export type Proposal = {
  id: string;
  status: 'draft' | 'rfc' | 'open' | 'closed';
  type: 'topic' | 'project';
  title: string;
  summary: string;
  description: string;
  created: string;
  updated: string;
};

type VoteListProps = {
  children?: React.ReactNode;
  proposals: Proposal[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export default function VoteList(props: VoteListProps) {
  return (
    <div
      key="1"
      className="flex flex-col w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold dark:text-gray-200">
          Vote on Proposals
        </h2>
        <Button size="sm" variant="outline">
          Add Proposal
        </Button>
      </div>
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-0 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold dark:text-gray-200">
                  Redesign the company website
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {`Proposal to update the company's website with a modern design.`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUpIcon className="w-5 h-5 text-green-500" />
                <span className="text-green-500 font-medium">72</span>
                <ThumbsDownIcon className="w-5 h-5 text-red-500" />
                <span className="text-red-500 font-medium">18</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-start justify-between gap-6">
            <div className="flex items-center gap-1 py-0">
              <Avatar className="w-8 h-8">
                <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Proposed 3 days ago by
                <span className="font-bold dark:text-gray-200">John Doe</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroup
                aria-label="Vote"
                className="flex items-center gap-2"
                defaultValue="0"
              >
                <Label
                  className="flex items-center gap-2 cursor-pointer"
                  htmlFor="vote-strongly-disinterested"
                >
                  <RadioGroupItem
                    className="peer sr-only"
                    id="vote-strongly-disinterested"
                    value="-2"
                  />
                  <div className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-300 peer-checked:bg-red-500 peer-checked:border-red-500 dark:border-gray-600 dark:peer-checked:bg-red-500 dark:peer-checked:border-red-500">
                    <ThumbsDownIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Strongly Disinterested
                  </span>
                </Label>
                <Label
                  className="flex items-center gap-2 cursor-pointer"
                  htmlFor="vote-slightly-disinterested"
                >
                  <RadioGroupItem
                    className="peer sr-only"
                    id="vote-slightly-disinterested"
                    value="-1"
                  />
                  <div className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-300 peer-checked:bg-red-500 peer-checked:border-red-500 dark:border-gray-600 dark:peer-checked:bg-red-500 dark:peer-checked:border-red-500">
                    <ThumbsDownIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Slightly Disinterested
                  </span>
                </Label>
                <Label
                  className="flex items-center gap-2 cursor-pointer"
                  htmlFor="vote-neutral"
                >
                  <RadioGroupItem
                    className="peer sr-only"
                    id="vote-neutral"
                    value="0"
                  />
                  <div className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-300 peer-checked:bg-gray-500 peer-checked:border-gray-500 dark:border-gray-600 dark:peer-checked:bg-gray-500 dark:peer-checked:border-gray-500">
                    <MinusIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Neutral
                  </span>
                </Label>
                <Label
                  className="flex items-center gap-2 cursor-pointer"
                  htmlFor="vote-slightly-interested"
                >
                  <RadioGroupItem
                    className="peer sr-only"
                    id="vote-slightly-interested"
                    value="1"
                  />
                  <div className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-300 peer-checked:bg-green-500 peer-checked:border-green-500 dark:border-gray-600 dark:peer-checked:bg-green-500 dark:peer-checked:border-green-500">
                    <ThumbsUpIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Slightly Interested
                  </span>
                </Label>
                <Label
                  className="flex items-center gap-2 cursor-pointer"
                  htmlFor="vote-strongly-interested"
                >
                  <RadioGroupItem
                    className="peer sr-only"
                    id="vote-strongly-interested"
                    value="2"
                  />
                  <div className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-300 peer-checked:bg-green-500 peer-checked:border-green-500 dark:border-gray-600 dark:peer-checked:bg-green-500 dark:peer-checked:border-green-500">
                    <ThumbsUpIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Strongly Interested
                  </span>
                </Label>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-0 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold dark:text-gray-200">
                  Implement a new CRM system
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Proposal to migrate to a more robust CRM platform.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUpIcon className="w-5 h-5 text-green-500" />
                <span className="text-green-500 font-medium">54</span>
                <ThumbsDownIcon className="w-5 h-5 text-red-500" />
                <span className="text-red-500 font-medium">32</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-start justify-between gap-6">
            <div className="flex items-center gap-1 py-0">
              <Avatar className="w-8 h-8">
                <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Proposed 1 week ago by
                <span className="font-bold dark:text-gray-200">Jane Smith</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroup
                aria-label="Vote"
                className="flex items-center gap-2"
                defaultValue="0"
              >
                <Label
                  className="flex items-center gap-2 cursor-pointer"
                  htmlFor="vote-strongly-disinterested-2"
                >
                  <RadioGroupItem
                    className="peer sr-only"
                    id="vote-strongly-disinterested-2"
                    value="-2"
                  />
                  <div className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-300 peer-checked:bg-red-500 peer-checked:border-red-500 dark:border-gray-600 dark:peer-checked:bg-red-500 dark:peer-checked:border-red-500">
                    <ThumbsDownIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Strongly Disinterested
                  </span>
                </Label>
                <Label
                  className="flex items-center gap-2 cursor-pointer"
                  htmlFor="vote-slightly-disinterested-2"
                >
                  <RadioGroupItem
                    className="peer sr-only"
                    id="vote-slightly-disinterested-2"
                    value="-1"
                  />
                  <div className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-300 peer-checked:bg-red-500 peer-checked:border-red-500 dark:border-gray-600 dark:peer-checked:bg-red-500 dark:peer-checked:border-red-500">
                    <ThumbsDownIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Slightly Disinterested
                  </span>
                </Label>
                <Label
                  className="flex items-center gap-2 cursor-pointer"
                  htmlFor="vote-neutral-2"
                >
                  <RadioGroupItem
                    className="peer sr-only"
                    id="vote-neutral-2"
                    value="0"
                  />
                  <div className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-300 peer-checked:bg-gray-500 peer-checked:border-gray-500 dark:border-gray-600 dark:peer-checked:bg-gray-500 dark:peer-checked:border-gray-500">
                    <MinusIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Neutral
                  </span>
                </Label>
                <Label
                  className="flex items-center gap-2 cursor-pointer"
                  htmlFor="vote-slightly-interested-2"
                >
                  <RadioGroupItem
                    className="peer sr-only"
                    id="vote-slightly-interested-2"
                    value="1"
                  />
                  <div className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-300 peer-checked:bg-green-500 peer-checked:border-green-500 dark:border-gray-600 dark:peer-checked:bg-green-500 dark:peer-checked:border-green-500">
                    <ThumbsUpIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Slightly Interested
                  </span>
                </Label>
                <Label
                  className="flex items-center gap-2 cursor-pointer"
                  htmlFor="vote-strongly-interested-2"
                >
                  <RadioGroupItem
                    className="peer sr-only"
                    id="vote-strongly-interested-2"
                    value="2"
                  />
                  <div className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-300 peer-checked:bg-green-500 peer-checked:border-green-500 dark:border-gray-600 dark:peer-checked:bg-green-500 dark:peer-checked:border-green-500">
                    <ThumbsUpIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Strongly Interested
                  </span>
                </Label>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function ThumbsDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 14V2" />
      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
    </svg>
  );
}

function ThumbsUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  );
}
