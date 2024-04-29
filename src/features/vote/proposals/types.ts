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
