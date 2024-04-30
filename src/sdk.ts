import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

type Topic = InitiativeData & {
  type?:
    | /**
     * @enum topic
     */
    "topic"
    | undefined;
};
type InitiativeData = Partial<{
  /**
   * @maxLength 48
   */
  title: string;
  /**
   * @maxLength 255
   */
  summary: string;
  description: string;
}>;
type Project = InitiativeData & {
  type?:
    | /**
     * @enum project
     */
    "project"
    | undefined;
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

const Paginated = z
  .object({
    cursor: z.number().int(),
    total: z
      .number()
      .int()
      .describe("Total number of items of this type in the database, if known")
      .optional(),
  })
  .strict();
const InitiativeData: z.ZodType<InitiativeData> = z
  .object({
    title: z.string().max(48),
    summary: z.string().max(255),
    description: z.string(),
  })
  .partial()
  .strict();
const Topic: z.ZodType<Topic> = InitiativeData.and(
  z.object({ type: z.literal("topic").optional() }).strict()
);
const DatabaseObject = z.object({ id: z.number().int() }).strict();
const TimeStamped = z
  .object({
    created: z.string().datetime({ offset: true }),
    updated: z.string().datetime({ offset: true }),
  })
  .strict();
const Authored = z
  .object({ authorName: z.string().max(48), authorEmail: z.string() })
  .strict();
const Error: z.ZodType<Error> = z.object({ message: z.string() }).strict();
const _404Error: z.ZodType<_404Error> = Error.and(
  z
    .object({ message: z.string().default("Not Found") })
    .partial()
    .strict()
);
const Project: z.ZodType<Project> = InitiativeData.and(
  z.object({ type: z.literal("project").optional() }).strict()
);
const Proposal = z
  .object({ status: z.enum(["draft", "rfc", "open", "closed"]) })
  .strict();
const postProposals_Body = z
  .union([Topic, Project])
  .and(Proposal)
  .and(Authored)
  .and(z.object({}).strict());
const _401Error: z.ZodType<_401Error> = Error.and(
  z
    .object({ message: z.string().default("Unauthorized") })
    .partial()
    .strict()
);
const postProposalsId_Body = DatabaseObject.and(
  z.union([Proposal, InitiativeData])
);
const Vote = z
  .object({
    initiativeId: z.number().int(),
    vote: z
      .enum(["-2", "-1", "0", "1", "2"])
      .describe(
        "Ranking values: -2 (strongly disinterested), -1 (slightly disinterested), 0 (neutral), 1 (slightly interested), 2 (strongly interested)"
      ),
    comment: z.string().max(255).optional(),
  })
  .strict();
const postProposalsIdvotes_Body = Vote;
const Expirable = z
  .object({ expires: z.string().datetime({ offset: true }) })
  .strict();

export const schemas = {
  Paginated,
  InitiativeData,
  Topic,
  DatabaseObject,
  TimeStamped,
  Authored,
  Error,
  _404Error,
  Project,
  Proposal,
  postProposals_Body,
  _401Error,
  postProposalsId_Body,
  Vote,
  postProposalsIdvotes_Body,
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
      z
        .object({
          list: z.array(
            Project.and(DatabaseObject).and(TimeStamped).and(Authored)
          ),
        })
        .strict()
    ),
    errors: [
      {
        status: 404,
        description: `Not Found`,
        schema: _404Error,
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
      z
        .object({
          list: z.array(
            z
              .union([Topic, Project])
              .and(Proposal)
              .and(DatabaseObject)
              .and(TimeStamped)
              .and(Authored)
          ),
        })
        .strict()
    ),
    errors: [
      {
        status: 404,
        description: `Not Found`,
        schema: _404Error,
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
        schema: postProposals_Body,
      },
      {
        name: "Authorization",
        type: "Header",
        schema: z.number().int(),
      },
    ],
    response: z
      .union([Topic, Project])
      .and(Proposal)
      .and(DatabaseObject)
      .and(TimeStamped),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: _401Error,
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
    response: z
      .union([Topic, Project])
      .and(Proposal)
      .and(DatabaseObject)
      .and(TimeStamped)
      .and(Authored),
    errors: [
      {
        status: 404,
        description: `Not Found`,
        schema: _404Error,
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
        schema: postProposalsId_Body,
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
        schema: z.number().int(),
      },
    ],
    response: z
      .union([Topic, Project])
      .and(Proposal)
      .and(DatabaseObject)
      .and(TimeStamped),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: _401Error,
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
        schema: z.number().int(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: _401Error,
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
    response: z
      .object({
        tally: z
          .number()
          .int()
          .describe(
            "Total tally of all votes, including those not returned in the response"
          ),
        votes: Paginated.and(
          z.object({ list: z.array(Vote) }).strict()
        ).optional(),
      })
      .strict(),
    errors: [
      {
        status: 404,
        description: `Not Found`,
        schema: _404Error,
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
        schema: postProposalsIdvotes_Body,
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
        schema: z.number().int(),
      },
    ],
    response: Vote,
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: _401Error,
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
        schema: z.number().int(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: _401Error,
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
      z
        .object({
          list: z.array(
            Topic.and(DatabaseObject).and(TimeStamped).and(Authored)
          ),
        })
        .strict()
    ),
    errors: [
      {
        status: 404,
        description: `Not Found`,
        schema: _404Error,
      },
    ],
  },
]);

export const sdk = new Zodios("vote.tulsawebdevs.org", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
