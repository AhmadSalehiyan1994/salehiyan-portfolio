import { describe, expect, it } from "vitest";
import { parsePagination } from "../lib/pagination";
import {
  changePasswordSchema,
  commentCreateSchema,
  loginSchema,
  pollCreateSchema,
  registerSchema,
  topicFollowSchema,
  voteSchema,
} from "../lib/validation";

describe("backend hardening helpers", () => {
  it("parses pagination with sane defaults and bounds", () => {
    const params = new URLSearchParams({ page: "0", pageSize: "1000" });
    const parsed = parsePagination(params, { pageSize: 20, maxPageSize: 100 });

    expect(parsed.page).toBe(1);
    expect(parsed.pageSize).toBe(100);
    expect(parsed.offset).toBe(0);
  });

  it("validates auth schemas", () => {
    expect(registerSchema.safeParse({ fullName: "A", email: "a@b.com", password: "12345678" }).success).toBe(true);
    expect(loginSchema.safeParse({ email: "a@b.com", password: "x" }).success).toBe(true);
    expect(changePasswordSchema.safeParse({ currentPassword: "old12345", newPassword: "new12345" }).success).toBe(true);
  });

  it("rejects invalid payloads", () => {
    expect(voteSchema.safeParse({ optionIds: [] }).success).toBe(false);
    expect(commentCreateSchema.safeParse({ body: "hey" }).success).toBe(false);
    expect(topicFollowSchema.safeParse({ topicSlug: "" }).success).toBe(false);
  });

  it("validates poll creation schema", () => {
    const payload = {
      slug: "poll-slug",
      title: "Poll title",
      options: [{ label: "A" }, { label: "B" }],
      targets: [{ targetType: "global", targetKey: "global" }],
    };

    expect(pollCreateSchema.safeParse(payload).success).toBe(true);
  });
});
