import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

type Proposal = Draft & {
  /**
   * @minLength 8
   */
  title: string;
  /**
   * @minLength 30
   */
  summary: string;
};
type Draft = Partial<{
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
  type: "topic" | "project";
}>;
type ProposalVoteState =
  | {
      userVote?: Vote | undefined;
      results: Array<Vote>;
      /**
       * @enum closed
       */
      status: "closed";
    }
  | {
      userVote?: Vote | undefined;
      /**
       * @enum open
       */
      status: "open";
    };
type Vote = {
  /**
   * Ranking values: -2 (strong disinterest), -1 (slight disinterest), 0 (neutral), 1 (slight interest), 2 (strong interest)
   *
   * @enum -2, -1, 0, 1, 2
   */
  value: "-2" | "-1" | "0" | "1" | "2";
  comment?: /**
   * @maxLength 255
   */
  string | undefined;
};

const patchDrafts_Body = z
  .object({
    title: z.string().max(48),
    summary: z.string().max(255),
    description: z.string().max(2048),
    type: z.enum(["topic", "project"]),
  })
  .partial()
  .and(z.object({ draftId: z.number().int() }));
const _401Error = z
  .object({ message: z.string() })
  .and(z.object({ message: z.string().default("Unauthorized") }).partial());
const _404Error = z
  .object({ message: z.string() })
  .and(z.object({ message: z.string().default("Not Found") }).partial());
const Error = z.object({ message: z.string() });
const Paginated = z.object({
  cursor: z
    .number()
    .int()
    .describe("Cursor for paginating through a list of items"),
  total: z
    .number()
    .int()
    .describe("Total number of items of this type in the database, if known")
    .optional(),
});
const Draft: z.ZodType<Draft> = z
  .object({
    title: z.string().max(48),
    summary: z.string().max(255),
    description: z.string().max(2048),
    type: z.enum(["topic", "project"]),
  })
  .partial();
const Proposal: z.ZodType<Proposal> = Draft.and(
  z.object({ title: z.string().min(8), summary: z.string().min(30) })
);
const Vote: z.ZodType<Vote> = z.object({
  value: z
    .enum(["-2", "-1", "0", "1", "2"])
    .describe(
      "Ranking values: -2 (strong disinterest), -1 (slight disinterest), 0 (neutral), 1 (slight interest), 2 (strong interest)"
    ),
  comment: z.string().max(255).optional(),
});
const ProposalVoteState: z.ZodType<ProposalVoteState> = z.union([
  z.object({
    userVote: Vote.optional(),
    results: z.array(Vote),
    status: z.literal("closed"),
  }),
  z.object({ userVote: Vote.optional(), status: z.literal("open") }),
]);
const DatabaseObject = z.object({
  id: z.number().int(),
  created: z.string().datetime({ offset: true }),
  updated: z.string().datetime({ offset: true }).optional(),
});
const Expirable = z.object({ expires: z.string().datetime({ offset: true }) });

export const schemas = {
  patchDrafts_Body,
  _401Error,
  _404Error,
  Error,
  Paginated,
  Draft,
  Proposal,
  Vote,
  ProposalVoteState,
  DatabaseObject,
  Expirable,
};

const endpoints = makeApi([
  {
    method: "post",
    path: "/:proposalId",
    alias: "postProposalId",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({
          value: z
            .enum(["-2", "-1", "0", "1", "2"])
            .describe(
              "Ranking values: -2 (strong disinterest), -1 (slight disinterest), 0 (neutral), 1 (slight interest), 2 (strong interest)"
            ),
          comment: z.string().max(255).optional(),
        }),
      },
      {
        name: "Authorization",
        type: "Header",
        schema: z.string(),
      },
      {
        name: "proposalId",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Vote.and(DatabaseObject),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: z
          .object({ message: z.string() })
          .and(
            z.object({ message: z.string().default("Unauthorized") }).partial()
          ),
      },
    ],
  },
  {
    method: "delete",
    path: "/:proposalId",
    alias: "deleteProposalId",
    requestFormat: "json",
    parameters: [
      {
        name: "Authorization",
        type: "Header",
        schema: z.string(),
      },
      {
        name: "proposalId",
        type: "Path",
        schema: z.number().int(),
      },
      {
        name: "voteId",
        type: "Query",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: z
          .object({ message: z.string() })
          .and(
            z.object({ message: z.string().default("Unauthorized") }).partial()
          ),
      },
      {
        status: 404,
        description: `Not Found`,
        schema: z
          .object({ message: z.string() })
          .and(
            z.object({ message: z.string().default("Not Found") }).partial()
          ),
      },
    ],
  },
  {
    method: "get",
    path: "/drafts",
    alias: "getDrafts",
    requestFormat: "json",
    parameters: [
      {
        name: "Authorization",
        type: "Header",
        schema: z.string(),
      },
      {
        name: "cursor",
        type: "Query",
        schema: z
          .number()
          .int()
          .describe("Cursor for paginating through a list of drafts")
          .optional(),
      },
      {
        name: "limit",
        type: "Query",
        schema: z
          .number()
          .int()
          .describe("Maximum number of drafts to return")
          .optional()
          .default(10),
      },
      {
        name: "type",
        type: "Query",
        schema: z
          .enum(["topic", "project"])
          .describe("Filter drafts by type")
          .optional(),
      },
    ],
    response: z
      .object({
        cursor: z
          .number()
          .int()
          .describe("Cursor for paginating through a list of items"),
        total: z
          .number()
          .int()
          .describe(
            "Total number of items of this type in the database, if known"
          )
          .optional(),
      })
      .and(
        z.object({
          drafts: z.array(
            z
              .object({
                title: z.string().max(48),
                summary: z.string().max(255),
                description: z.string().max(2048),
                type: z.enum(["topic", "project"]),
              })
              .partial()
              .and(
                z.object({
                  id: z.number().int(),
                  created: z.string().datetime({ offset: true }),
                  updated: z.string().datetime({ offset: true }).optional(),
                })
              )
          ),
        })
      ),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: z
          .object({ message: z.string() })
          .and(
            z.object({ message: z.string().default("Unauthorized") }).partial()
          ),
      },
      {
        status: 404,
        description: `Not Found`,
        schema: z
          .object({ message: z.string() })
          .and(
            z.object({ message: z.string().default("Not Found") }).partial()
          ),
      },
    ],
  },
  {
    method: "post",
    path: "/drafts",
    alias: "postDrafts",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z
          .object({
            title: z.string().max(48),
            summary: z.string().max(255),
            description: z.string().max(2048),
            type: z.enum(["topic", "project"]),
          })
          .partial(),
      },
      {
        name: "Authorization",
        type: "Header",
        schema: z.string(),
      },
    ],
    response: z
      .object({
        title: z.string().max(48),
        summary: z.string().max(255),
        description: z.string().max(2048),
        type: z.enum(["topic", "project"]),
      })
      .partial()
      .and(
        z.object({
          id: z.number().int(),
          created: z.string().datetime({ offset: true }),
          updated: z.string().datetime({ offset: true }).optional(),
        })
      ),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: z
          .object({ message: z.string() })
          .and(
            z.object({ message: z.string().default("Unauthorized") }).partial()
          ),
      },
    ],
  },
  {
    method: "patch",
    path: "/drafts",
    alias: "patchDrafts",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: patchDrafts_Body,
      },
      {
        name: "Authorization",
        type: "Header",
        schema: z.string(),
      },
    ],
    response: z
      .object({
        title: z.string().max(48),
        summary: z.string().max(255),
        description: z.string().max(2048),
        type: z.enum(["topic", "project"]),
      })
      .partial()
      .and(
        z.object({
          id: z.number().int(),
          created: z.string().datetime({ offset: true }),
          updated: z.string().datetime({ offset: true }).optional(),
        })
      ),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: z
          .object({ message: z.string() })
          .and(
            z.object({ message: z.string().default("Unauthorized") }).partial()
          ),
      },
      {
        status: 404,
        description: `Not Found`,
        schema: z
          .object({ message: z.string() })
          .and(
            z.object({ message: z.string().default("Not Found") }).partial()
          ),
      },
    ],
  },
  {
    method: "delete",
    path: "/drafts",
    alias: "deleteDrafts",
    requestFormat: "json",
    parameters: [
      {
        name: "Authorization",
        type: "Header",
        schema: z.string(),
      },
      {
        name: "draftId",
        type: "Query",
        schema: z.number().int().describe("Id of the draft to delete"),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: z
          .object({ message: z.string() })
          .and(
            z.object({ message: z.string().default("Unauthorized") }).partial()
          ),
      },
      {
        status: 404,
        description: `Not Found`,
        schema: z
          .object({ message: z.string() })
          .and(
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
        name: "Authorization",
        type: "Header",
        schema: z.string().optional(),
      },
      {
        name: "cursor",
        type: "Query",
        schema: z
          .number()
          .int()
          .describe("Cursor for paginating through the list of proposals")
          .optional(),
      },
      {
        name: "limit",
        type: "Query",
        schema: z
          .number()
          .int()
          .describe("Maximum number of proposals to return")
          .optional()
          .default(10),
      },
      {
        name: "type",
        type: "Query",
        schema: z
          .enum(["topic", "project"])
          .describe("Filter proposals by type")
          .optional(),
      },
      {
        name: "status",
        type: "Query",
        schema: z
          .enum(["open", "closed"])
          .describe("Filter proposals by status")
          .optional(),
      },
    ],
    response: Paginated.and(
      z.object({
        proposals: z.array(
          z
            .object({ authorName: z.string() })
            .and(Proposal)
            .and(ProposalVoteState)
            .and(DatabaseObject)
        ),
      })
    ),
    errors: [
      {
        status: 404,
        description: `Not Found`,
        schema: z
          .object({ message: z.string() })
          .and(
            z.object({ message: z.string().default("Not Found") }).partial()
          ),
      },
    ],
  },
  {
    method: "put",
    path: "/proposals",
    alias: "putProposals",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Draft.and(
          z.object({ title: z.string().min(8), summary: z.string().min(30) })
        ),
      },
      {
        name: "Authorization",
        type: "Header",
        schema: z.string(),
      },
    ],
    response: Proposal.and(ProposalVoteState).and(DatabaseObject),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: z
          .object({ message: z.string() })
          .and(
            z.object({ message: z.string().default("Unauthorized") }).partial()
          ),
      },
    ],
  },
]);

export const sdk = new Zodios("https://vote.tulsawebdevs.org", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
