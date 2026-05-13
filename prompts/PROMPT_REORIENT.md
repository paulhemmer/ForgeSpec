# Reorientation prompt (implementation session)

Use this **between implementation-plan phases** (after a commit or phase boundary, before starting the next slice) to re-anchor the agent in `docs/IMPLEMENTATION_PLAN.md` and traceability—**or** when a long session has left you unsure of **current task**, **completed vs. open work**, **test posture**, or **whether the effort is converging**. The goal is to recover a factual picture from **repository artifacts**, not to continue editing until that picture is clear.

## Preconditions

- You (or the agent) have access to the project tree: spec repo, implementation, and version control.
- If paths differ from the defaults below, substitute your repo’s equivalents.

## Instructions for the agent

1. Read **`docs/IMPLEMENTATION_PLAN.md`** (or the project’s implementation plan). Identify the **intended current phase** and **the single active task** the session should be executing—not “implementation” in general.

2. Read authoritative design sources: **`spec/`** and relevant **`docs/`** (e.g. `ARCHITECTURE.md`, `SYSTEM_OVERVIEW.md`) as needed to ground behavior claims. If `ARCHITECTURE.md` includes **Technology and integration constraints**, treat required libraries and external APIs as part of the current contract unless the plan explicitly defers them.

3. Read **traceability / invariants** material—**`docs/TRACEABILITY.md`** first (ID linkage map), then **`docs/invariants.md`** and **`docs/VALIDATION_CHECKLIST.md`**, plus spec sections that tie obligations to tests—so answers about “what must still hold” are spec-backed.

4. Determine the **last trusted checkpoint**: the commit hash (and tag if any) the human treats as baseline. Summarize **what changed since that checkpoint** (high level: areas, intent). Do **not** dump the full diff; summarize narrative.

5. Incorporate **latest test results** (local run, CI, or last decisive output). State whether tests are **green for the claimed scope**, **failing with a clear story**, **churning**, or **unknown**—if unknown, say what command or artifact is missing.

6. Read the **most recent session summary** from the implementation agent (if available). Treat it as **hypothesis and intent**, not as proof of completion.

7. **Do not** propose new code, refactors, or further implementation steps until the output below is complete. If information is missing, list **exactly** what to read or run next.

## Required output structure

Produce a short report with these sections:

### 1. Phase and active task

- Phase / gate (from the plan).
- One concrete active task (subtask, failing test, or spec clause in focus).

### 2. Completed and accepted

- Only work that passes the project’s checkpoint bar: committed or explicitly signed-off items, validated against the spec. Exclude “in progress on disk.”

### 3. Still open

- Next plan items, unresolved failures, spec or test gaps.

### 4. Delta since last trusted checkpoint

- Baseline: commit (and tag if any).
- Summary of changes since then.

### 5. Test posture

- Stable / failing / churning / unknown, with evidence (command or log reference).

### 6. Moment type

- State which applies: **debugging loop**, **completion boundary** (validate, possibly commit), or **new task** (switching plan items). One primary label; brief justification.

### 7. Recommended next human action

- One or two sentences: what the engineer should do next (e.g. run tests, commit valid state, narrow scope, update spec)—without implementing it unless asked.

---

**Rule:** When context is thin, do not improvise. Re-anchor in the **plan**, the **last trusted checkpoint**, and the **spec**, then proceed.
