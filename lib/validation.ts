import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().trim().min(1),
  email: z.string().trim().email(),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8),
});

export const bootstrapAdminSchema = z.object({
  fullName: z.string().trim().min(1),
  email: z.string().trim().email(),
  password: z.string().min(8),
});

export const contactSchema = z.object({
  website: z.unknown().optional(),
  formStartedAt: z.union([z.number(), z.string()]).optional(),
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  subject: z.string().trim().optional(),
  message: z.string().trim().min(1),
});

export const clientErrorSchema = z.object({
  message: z.string().optional(),
  type: z.string().optional(),
  url: z.string().optional(),
  stack: z.string().optional(),
  timestamp: z.union([z.string(), z.number()]).optional(),
  fileName: z.string().optional(),
  line: z.number().optional(),
  column: z.number().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const voteSchema = z.object({
  optionIds: z.array(z.number().int()).min(1),
});

export const commentCreateSchema = z.object({
  body: z.string().trim().min(5).max(500),
});

export const commentModerateSchema = z.object({
  action: z.enum(["approve", "reject", "hide"]),
});

export const topicFollowSchema = z.object({
  topicSlug: z.string().trim().min(1),
});

export const pollCreateSchema = z.object({
  slug: z.string().trim().min(1),
  title: z.string().trim().min(1),
  description: z.string().optional(),
  allowMultiple: z.boolean().optional(),
  maxChoices: z.number().int().positive().optional(),
  startsAt: z.string().optional(),
  endsAt: z.string().optional(),
  status: z.enum(["draft", "scheduled", "active"]).optional(),
  options: z.array(z.object({ label: z.string().trim().min(1) })).min(2),
  topics: z.array(z.string()).optional(),
  targets: z
    .array(
      z.object({
        targetType: z.enum(["global", "article", "topic"]),
        targetKey: z.string().trim().min(1),
      }),
    )
    .optional(),
  isFeatured: z.boolean().optional(),
});

export async function parseBody<T>(request: Request, schema: z.ZodType<T>) {
  const json = await request.json();
  return schema.safeParse(json);
}
