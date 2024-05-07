import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

type Topic = Proposal &
  Partial<{
    /**
     * @enum topic
     */
    type: "topic";
  }>;
type Proposal = {
  /**
   * @minLength 8
   * @maxLength 48
   */
  title: string;
  /**
   * @minLength 40
   * @maxLength 255
   */
  summary: string;
  description?: string | undefined;
  /**
   * @enum draft, open, closed
   */
  status: "draft" | "open" | "closed";
  /**
   * @enum topic, project
   */
  type: "topic" | "project";
};
type Project = Proposal &
  Partial<{
    /**
     * @enum project
     */
    type: "project";
  }>;
type AuthorData = Author & {
  authorId: string;
};
type Author = {
  /**
   * @maxLength 48
   */
  authorName: string;
  authorEmail: string;
};
type _404Error = Error &
  Partial<{
    /**
     * @default "Not Found"
     */
    message: string;
  }>;
type Error = {
  message: string;
};
type _401Error = Error &
  Partial<{
    /**
     * @default "Unauthorized"
     */
    message: string;
  }>;

const Paginated = z.object({
  cursor: z.number().int(),
  total: z
    .number()
    .int()
    .describe("Total number of items of this type in the database, if known")
    .optional(),
});
const Proposal: z.ZodType<Proposal> = z.object({
  title: z.string().min(8).max(48),
  summary: z.string().min(40).max(255),
  description: z.string().optional(),
  status: z.enum(["draft", "open", "closed"]),
  type: z.enum(["topic", "project"]),
});
const Topic: z.ZodType<Topic> = Proposal.and(
  z.object({ type: z.literal("topic") }).partial()
);
const DatabaseObject = z.object({ id: z.number().int() });
const TimeStamped = z.object({
  created: z.string().datetime({ offset: true }),
  updated: z.string().datetime({ offset: true }),
});
const Author: z.ZodType<Author> = z.object({
  authorName: z.string().max(48),
  authorEmail: z.string(),
});
const Error: z.ZodType<Error> = z.object({ message: z.string() });
const _404Error: z.ZodType<_404Error> = Error.and(
  z.object({ message: z.string().default("Not Found") }).partial()
);
const Project: z.ZodType<Project> = Proposal.and(
  z.object({ type: z.literal("project") }).partial()
);
const AuthorData: z.ZodType<AuthorData> = Author.and(
  z.object({ authorId: z.string() })
);
const _401Error: z.ZodType<_401Error> = Error.and(
  z.object({ message: z.string().default("Unauthorized") }).partial()
);
const Vote = z.object({
  proposalId: z.number().int(),
  vote: z
    .enum(["-2", "-1", "0", "1", "2"])
    .describe(
      "Ranking values: -2 (strong disinterest), -1 (slight disinterest), 0 (neutral), 1 (slight interest), 2 (strong interest)"
    ),
  comment: z.string().max(255).optional(),
});
const Expirable = z.object({ expires: z.string().datetime({ offset: true }) });

export const schemas = {
  Paginated,
  Proposal,
  Topic,
  DatabaseObject,
  TimeStamped,
  Author,
  Error,
  _404Error,
  Project,
  AuthorData,
  _401Error,
  Vote,
  Expirable,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/projects",
    alias: "getProjects",
    requestFormat: "json",
    parameters: [
      {
        name: "cursor",
        type: "Query",
        schema: z
          .number()
          .int()
          .describe("Cursor for paginating through a list of votes")
          .optional(),
      },
      {
        name: "limit",
        type: "Query",
        schema: z
          .number()
          .int()
          .describe("Maximum number of votes to return")
          .optional()
          .default(10),
      },
    ],
    response: Paginated.and(
      z.object({
        list: z.array(Project.and(DatabaseObject).and(TimeStamped).and(Author)),
      })
    ),
    errors: [
      {
        status: 404,
        description: `Not Found`,
        schema: Error.and(
          z.object({ message: z.string().default("Not Found") }).partial()
        ),
      },
    ],
  },
  {
    method: "get",
    path: "/proposals",
    alias: "getProposals",
    requestFormat: "json",
    parameters: [
      {
        name: "cursor",
        type: "Query",
        schema: z
          .number()
          .int()
          .describe("Cursor for paginating through a list of votes")
          .optional(),
      },
      {
        name: "limit",
        type: "Query",
        schema: z
          .number()
          .int()
          .describe("Maximum number of votes to return")
          .optional()
          .default(10),
      },
    ],
    response: Paginated.and(
      z.object({
        list: z.array(
          Proposal.and(DatabaseObject).and(TimeStamped).and(Author)
        ),
      })
    ),
    errors: [
      {
        status: 404,
        description: `Not Found`,
        schema: Error.and(
          z.object({ message: z.string().default("Not Found") }).partial()
        ),
      },
    ],
  },
  {
    method: "post",
    path: "/proposals",
    alias: "postProposals",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Proposal.and(AuthorData),
      },
      {
        name: "Authorization",
        type: "Header",
        schema: z.string(),
      },
    ],
    response: z.unknown(),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: Error.and(
          z.object({ message: z.string().default("Unauthorized") }).partial()
        ),
      },
    ],
  },
  {
    method: "get",
    path: "/proposals/:id",
    alias: "getProposalsId",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z
          .number()
          .int()
          .describe("ID of the proposal to get, update, or delete"),
      },
    ],
    response: Proposal.and(DatabaseObject).and(TimeStamped).and(Author),
    errors: [
      {
        status: 404,
        description: `Not Found`,
        schema: Error.and(
          z.object({ message: z.string().default("Not Found") }).partial()
        ),
      },
    ],
  },
  {
    method: "post",
    path: "/proposals/:id",
    alias: "postProposalsId",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: DatabaseObject.and(Proposal),
      },
      {
        name: "id",
        type: "Path",
        schema: z
          .number()
          .int()
          .describe("ID of the proposal to get, update, or delete"),
      },
      {
        name: "Authorization",
        type: "Header",
        schema: z.string(),
      },
    ],
    response: Proposal.and(DatabaseObject).and(TimeStamped),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: Error.and(
          z.object({ message: z.string().default("Unauthorized") }).partial()
        ),
      },
    ],
  },
  {
    method: "delete",
    path: "/proposals/:id",
    alias: "deleteProposalsId",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z
          .number()
          .int()
          .describe("ID of the proposal to get, update, or delete"),
      },
      {
        name: "Authorization",
        type: "Header",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: Error.and(
          z.object({ message: z.string().default("Unauthorized") }).partial()
        ),
      },
    ],
  },
  {
    method: "get",
    path: "/proposals/:id/votes",
    alias: "getProposalsIdvotes",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z
          .number()
          .int()
          .describe("ID of the proposal to get, update, or delete votes for"),
      },
      {
        name: "cursor",
        type: "Query",
        schema: z
          .number()
          .int()
          .describe("Cursor for paginating through a list of votes")
          .optional(),
      },
      {
        name: "limit",
        type: "Query",
        schema: z
          .number()
          .int()
          .describe("Maximum number of votes to return")
          .optional(),
      },
    ],
    response: z.object({
      tally: z
        .number()
        .int()
        .describe(
          "Total tally of all votes, including those not returned in the response"
        ),
      votes: Paginated.and(z.object({ list: z.array(Vote) })).optional(),
    }),
    errors: [
      {
        status: 404,
        description: `Not Found`,
        schema: Error.and(
          z.object({ message: z.string().default("Not Found") }).partial()
        ),
      },
    ],
  },
  {
    method: "post",
    path: "/proposals/:id/votes",
    alias: "postProposalsIdvotes",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Vote,
      },
      {
        name: "id",
        type: "Path",
        schema: z
          .number()
          .int()
          .describe("ID of the proposal to get, update, or delete votes for"),
      },
      {
        name: "Authorization",
        type: "Header",
        schema: z.string(),
      },
    ],
    response: z.object({
      proposalId: z.number().int(),
      vote: z
        .enum(["-2", "-1", "0", "1", "2"])
        .describe(
          "Ranking values: -2 (strong disinterest), -1 (slight disinterest), 0 (neutral), 1 (slight interest), 2 (strong interest)"
        ),
      comment: z.string().max(255).optional(),
    }),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: Error.and(
          z.object({ message: z.string().default("Unauthorized") }).partial()
        ),
      },
    ],
  },
  {
    method: "delete",
    path: "/proposals/:id/votes",
    alias: "deleteProposalsIdvotes",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z
          .number()
          .int()
          .describe("ID of the proposal to get, update, or delete votes for"),
      },
      {
        name: "Authorization",
        type: "Header",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: Error.and(
          z.object({ message: z.string().default("Unauthorized") }).partial()
        ),
      },
    ],
  },
  {
    method: "get",
    path: "/topics",
    alias: "getTopics",
    requestFormat: "json",
    parameters: [
      {
        name: "cursor",
        type: "Query",
        schema: z
          .number()
          .int()
          .describe("Cursor for paginating through a list of votes")
          .optional(),
      },
      {
        name: "limit",
        type: "Query",
        schema: z
          .number()
          .int()
          .describe("Maximum number of votes to return")
          .optional()
          .default(10),
      },
    ],
    response: Paginated.and(
      z.object({
        list: z.array(Topic.and(DatabaseObject).and(TimeStamped).and(Author)),
      })
    ),
    errors: [
      {
        status: 404,
        description: `Not Found`,
        schema: Error.and(
          z.object({ message: z.string().default("Not Found") }).partial()
        ),
      },
    ],
  },
]);

export const sdk = new Zodios("https://vote.tulsawebdevs.org", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
