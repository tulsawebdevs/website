export type Proposal = {
  id: number;
  status: 'draft' | 'open' | 'rfc' | 'closed';
  authorId: string;
  authorName: string;
  authorEmail: string;
  title: string;
  summary: string;
  description: string;
  type: 'topic' | 'project';
  created: string;
  updated: string | null;
};

export type Vote =
  | '-2' // Strongly Disinterested
  | '-1' // Slightly Disinterested
  | '0' // Neutral
  | '1' // Slightly Interested
  | '2'; // Strongly Interested

export type VotePayload = {
  initiativeId: string;
  vote: Vote;
  comment: string;
  authorId: string;
  authorName: string;
  authorEmail: string;
};
