import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

export type DraftIndex = Paginated & {
  drafts: Array<Draft & DatabaseObject>;
};
export type Paginated = Partial<{
  /**
   * Cursor for paginating through a list of items
   */
  cursor: number;
  /**
   * In a request, the maximum number of items to return. In a response, the total number of items available (if known).
   */
  limit: number;
}>;
export type Draft = Partial<{
  /**
   * @maxLength 48
   */
  title: string;
  /**
   * @maxLength 255
   */
  summary: string;
  /**
   * @maxLength 2048
   */
  description: string;
  /**
   * @enum topic, project
   */
  type: 'topic' | 'project';
}>;
export type DatabaseObject = {
  id: number;
  created: string;
  updated: string;
};
export type ProposalState =
  | {
      authorName: string;
      /**
       * @enum closed
       */
      status: 'closed';
      userVote?: Vote | undefined;
      results: Array<Vote>;
    }
  | {
      /**
       * @minLength 4
       */
      authorName: string;
      /**
       * @enum open
       */
      status: 'open';
      userVote?: Vote | undefined;
    };
export type Vote = {
  /**
   * Ranking values: -2 (strong disinterest), -1 (slight disinterest), 0 (neutral), 1 (slight interest), 2 (strong interest)
   *
   * @enum -2, -1, 0, 1, 2
   */
  value: '-2' | '-1' | '0' | '1' | '2';
  comment?: /**
   * @maxLength 255
   */
  string | undefined;
};
export type ProposalIndex = Paginated & {
  proposals: Array<Proposal & ProposalState & DatabaseObject>;
};
export type Proposal = {
  /**
   * @minLength 8
   * @maxLength 48
   */
  title: string;
  /**
   * @minLength 30
   * @maxLength 255
   */
  summary: string;
  description?: /**
   * @maxLength 2048
   */
  string | undefined;
  /**
   * @enum topic, project
   */
  type: 'topic' | 'project';
};

const Paginated: z.ZodType<Paginated> = z
  .object({
    cursor: z
      .number()
      .int()
      .describe('Cursor for paginating through a list of items'),
    limit: z
      .number()
      .int()
      .describe(
        'In a request, the maximum number of items to return. In a response, the total number of items available (if known).',
      ),
  })
  .partial();
const Draft: z.ZodType<Draft> = z
  .object({
    title: z.string().max(48),
    summary: z.string().max(255),
    description: z.string().max(2048),
    type: z.enum(['topic', 'project']),
  })
  .partial();
const DatabaseObject: z.ZodType<DatabaseObject> = z.object({
  id: z.number().int(),
  created: z.string().datetime({ offset: true }),
  updated: z.string().datetime({ offset: true }),
});
const DraftIndex: z.ZodType<DraftIndex> = Paginated.and(
  z.object({ drafts: z.array(Draft.and(DatabaseObject)) }),
);
const Error = z.object({ message: z.string() });
const Proposal: z.ZodType<Proposal> = z.object({
  title: z.string().min(8).max(48),
  summary: z.string().min(30).max(255),
  description: z.string().max(2048).optional(),
  type: z.enum(['topic', 'project']),
});
const Vote: z.ZodType<Vote> = z.object({
  value: z
    .enum(['-2', '-1', '0', '1', '2'])
    .describe(
      'Ranking values: -2 (strong disinterest), -1 (slight disinterest), 0 (neutral), 1 (slight interest), 2 (strong interest)',
    ),
  comment: z.string().max(255).optional(),
});
const ProposalState: z.ZodType<ProposalState> = z.union([
  z.object({
    authorName: z.string(),
    status: z.literal('closed'),
    userVote: Vote.optional(),
    results: z.array(Vote),
  }),
  z.object({
    authorName: z.string().min(4),
    status: z.literal('open'),
    userVote: Vote.optional(),
  }),
]);
const ProposalIndex: z.ZodType<ProposalIndex> = Paginated.and(
  z.object({
    proposals: z.array(Proposal.and(ProposalState).and(DatabaseObject)),
  }),
);
const Expirable = z.object({ expires: z.string().datetime({ offset: true }) });

export const schemas = {
  Paginated,
  Draft,
  DatabaseObject,
  DraftIndex,
  Error,
  Proposal,
  Vote,
  ProposalState,
  ProposalIndex,
  Expirable,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/drafts',
    alias: 'listDrafts',
    requestFormat: 'json',
    parameters: [
      {
        name: 'Authorization',
        type: 'Header',
        schema: z.string(),
      },
      {
        name: 'pagination',
        type: 'Query',
        schema: z
          .object({
            cursor: z
              .number()
              .int()
              .describe('Cursor for paginating through a list of items'),
            limit: z
              .number()
              .int()
              .describe(
                'In a request, the maximum number of items to return. In a response, the total number of items available (if known).',
              ),
          })
          .partial()
          .optional(),
      },
      {
        name: 'type',
        type: 'Query',
        schema: z
          .enum(['topic', 'project'])
          .describe('Filter items by type')
          .optional(),
      },
    ],
    response: DraftIndex,
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: z.object({ message: z.string() }),
      },
      {
        status: 404,
        description: `Not Found`,
        schema: z.object({ message: z.string() }),
      },
    ],
  },
  {
    method: 'post',
    path: '/drafts',
    alias: 'createDraft',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z
          .object({
            title: z.string().max(48),
            summary: z.string().max(255),
            description: z.string().max(2048),
            type: z.enum(['topic', 'project']),
          })
          .partial(),
      },
      {
        name: 'Authorization',
        type: 'Header',
        schema: z.string(),
      },
    ],
    response: Draft.and(DatabaseObject),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: z.object({ message: z.string() }),
      },
    ],
  },
  {
    method: 'put',
    path: '/drafts',
    alias: 'putDraft',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z
          .object({
            title: z.string().max(48),
            summary: z.string().max(255),
            description: z.string().max(2048),
            type: z.enum(['topic', 'project']),
          })
          .partial(),
      },
      {
        name: 'Authorization',
        type: 'Header',
        schema: z.string(),
      },
      {
        name: 'recordId',
        type: 'Query',
        schema: z
          .number()
          .int()
          .describe('ID of the record to get, update, or delete'),
      },
    ],
    response: Draft.and(DatabaseObject),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: z.object({ message: z.string() }),
      },
      {
        status: 404,
        description: `Not Found`,
        schema: z.object({ message: z.string() }),
      },
    ],
  },
  {
    method: 'patch',
    path: '/drafts',
    alias: 'patchDraft',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z
          .object({
            title: z.string().max(48),
            summary: z.string().max(255),
            description: z.string().max(2048),
            type: z.enum(['topic', 'project']),
          })
          .partial(),
      },
      {
        name: 'Authorization',
        type: 'Header',
        schema: z.string(),
      },
      {
        name: 'recordId',
        type: 'Query',
        schema: z
          .number()
          .int()
          .describe('ID of the record to get, update, or delete'),
      },
    ],
    response: Draft.and(DatabaseObject),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: z.object({ message: z.string() }),
      },
      {
        status: 404,
        description: `Not Found`,
        schema: z.object({ message: z.string() }),
      },
    ],
  },
  {
    method: 'delete',
    path: '/drafts',
    alias: 'deleteDraft',
    requestFormat: 'json',
    parameters: [
      {
        name: 'Authorization',
        type: 'Header',
        schema: z.string(),
      },
      {
        name: 'recordId',
        type: 'Query',
        schema: z
          .number()
          .int()
          .describe('ID of the record to get, update, or delete'),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: z.object({ message: z.string() }),
      },
      {
        status: 404,
        description: `Not Found`,
        schema: z.object({ message: z.string() }),
      },
    ],
  },
  {
    method: 'get',
    path: '/proposals',
    alias: 'listProposals',
    requestFormat: 'json',
    parameters: [
      {
        name: 'Authorization',
        type: 'Header',
        schema: z.string().optional(),
      },
      {
        name: 'pagination',
        type: 'Query',
        schema: z
          .object({
            cursor: z
              .number()
              .int()
              .describe('Cursor for paginating through a list of items'),
            limit: z
              .number()
              .int()
              .describe(
                'In a request, the maximum number of items to return. In a response, the total number of items available (if known).',
              ),
          })
          .partial()
          .optional(),
      },
      {
        name: 'type',
        type: 'Query',
        schema: z
          .enum(['topic', 'project'])
          .describe('Filter items by type')
          .optional(),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z
          .enum(['open', 'closed'])
          .describe('Filter items by status')
          .optional(),
      },
    ],
    response: ProposalIndex,
    errors: [
      {
        status: 404,
        description: `Not Found`,
        schema: z.object({ message: z.string() }),
      },
    ],
  },
  {
    method: 'post',
    path: '/proposals',
    alias: 'createProposal',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({
          title: z.string().min(8).max(48),
          summary: z.string().min(30).max(255),
          description: z.string().max(2048).optional(),
          type: z.enum(['topic', 'project']),
        }),
      },
      {
        name: 'Authorization',
        type: 'Header',
        schema: z.string(),
      },
    ],
    response: Proposal.and(ProposalState).and(DatabaseObject),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: z.object({ message: z.string() }),
      },
    ],
  },
  {
    method: 'post',
    path: '/proposals/vote',
    alias: 'submitVote',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({
          value: z
            .enum(['-2', '-1', '0', '1', '2'])
            .describe(
              'Ranking values: -2 (strong disinterest), -1 (slight disinterest), 0 (neutral), 1 (slight interest), 2 (strong interest)',
            ),
          comment: z.string().max(255).optional(),
        }),
      },
      {
        name: 'Authorization',
        type: 'Header',
        schema: z.string(),
      },
      {
        name: 'recordId',
        type: 'Query',
        schema: z
          .number()
          .int()
          .describe('ID of the record to get, update, or delete'),
      },
    ],
    response: Vote.and(DatabaseObject),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: z.object({ message: z.string() }),
      },
    ],
  },
  {
    method: 'delete',
    path: '/proposals/vote',
    alias: 'deleteVote',
    requestFormat: 'json',
    parameters: [
      {
        name: 'Authorization',
        type: 'Header',
        schema: z.string(),
      },
      {
        name: 'recordId',
        type: 'Query',
        schema: z
          .number()
          .int()
          .describe('ID of the record to get, update, or delete'),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: z.object({ message: z.string() }),
      },
      {
        status: 404,
        description: `Not Found`,
        schema: z.object({ message: z.string() }),
      },
    ],
  },
]);

export const sdk = new Zodios('https://vote.tulsawebdevs.org', endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
