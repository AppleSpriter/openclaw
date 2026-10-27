import { describe, expect, it } from "vitest";
import { isPreDispatchToolCallRejectionMessage } from "./message-patterns.js";

describe("isPreDispatchToolCallRejectionMessage", () => {
  it.each([
    "Provider returned an incomplete or malformed tool call",
    "Upstream returned invalid tool input for 'exec'.",
    "Upstream returned invalid tool input for 'edit'",
    "  Upstream returned invalid tool input for 'mcp__server__tool'.  ",
  ])("recognizes pre-dispatch rejection: %s", (message) => {
    expect(isPreDispatchToolCallRejectionMessage(message)).toBe(true);
  });

  it.each([
    undefined,
    "",
    "Upstream returned invalid tool input",
    "Upstream returned invalid tool input for ''.",
    "Tool exec failed: Upstream returned invalid tool input for 'exec'.",
    "Upstream returned invalid tool input for 'exec'. Retried and executed.",
    "tool_use.input: Field required",
  ])("rejects other text: %s", (message) => {
    expect(isPreDispatchToolCallRejectionMessage(message)).toBe(false);
  });
});
