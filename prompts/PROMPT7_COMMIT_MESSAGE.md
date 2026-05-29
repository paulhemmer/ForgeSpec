# Commit message (traceable slice summary)

Use this **at commit time** for a completed implementation slice so revision history stays aligned with **TASK-**, **SPEC-**, **SPEC-INV-**, and **TEST-** IDs. Output **only** the structured message below—no preamble, no implementation advice.

## Preconditions

- The slice is reviewed and acceptable (or the human accepts the residual risk).
- You know which IDs this commit advances and what behavior changed at a high level.

## Instructions for the agent

1. List every **TASK-**, **SPEC-**, **SPEC-INV-**, and **TEST-** ID materially advanced or satisfied by this commit (omit prefixes with no changes).

2. Write a **single-line summary** (≤ 72 characters preferred) describing what was done, not how.

3. Add **behavioral impact**: 2–4 bullets—user-visible or system-visible effects, invariant guarantees touched, or “internal only / refactor” if truly no external behavior change.

4. Do not exceed this structure. No long paragraphs.

## Required output format

Paste the following template filled in:

```
IDs: TASK-… SPEC-… SPEC-INV-… TEST-…

Summary: <one line>

Behavioral impact:
- <bullet>
- <bullet>
```

If an ID category does not apply, omit that prefix from the **IDs** line (e.g. `IDs: TASK-004 TEST-011`).

---

**Rule:** If you cannot name the IDs, the change may not be traceable—resolve traceability before committing.
