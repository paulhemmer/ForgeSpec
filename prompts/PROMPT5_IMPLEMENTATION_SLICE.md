# Implementation Slice (bounded execution brief)

Use this **before** starting a coding session for the next unit of work from `docs/IMPLEMENTATION_PLAN.md`. The goal is a **single bounded slice**: explicit IDs, scope boundaries, and acceptance criteria—**no implementation** in this prompt.

## Preconditions

- You have access to the spec repository: `spec/`, `docs/` (including `IMPLEMENTATION_PLAN.md`, `TRACEABILITY.md`), and optionally `docs/invariants.md`, `docs/ARCHITECTURE.md`.
- If paths differ, substitute your project’s equivalents.
- The human (or session owner) may name the target **TASK-** ID, phase, or “next open item”; if not, infer the **single** best next slice from the plan and traceability—do not merge unrelated tasks.

## Instructions for the agent

1. Read **`docs/IMPLEMENTATION_PLAN.md`**. Identify the **one slice** to execute next (one **TASK-** or an explicitly atomic sub-step the plan defines). If multiple tasks are equally “next,” pick the one the plan orders first and state that choice.

2. Read **`docs/TRACEABILITY.md`**. Collect every **ARCH-**, **SPEC-**, **SPEC-INV-**, **TASK-**, and **TEST-** ID that applies to this slice (upstream obligations and downstream verification). Flag any ID referenced in the plan but missing from the matrix.

3. Read **`docs/invariants.md`** and the relevant **`spec/`** sections for this slice. Extract the behavioral obligations and invariants that bound the work—not a full spec dump; only what this slice must respect.

4. Define **in scope** (bullet list) and **out of scope** (bullet list). Out of scope must include “no new subsystems, queues, retries, or state ownership without spec/docs update first” unless the plan explicitly authorizes them.

5. Define **acceptance criteria** for this slice: observable outcomes, tests or **TEST-** IDs that must pass or be added, and any plan gate text that applies.

6. List **files or subsystems likely touched** as hypotheses (for human planning only—not a mandate to edit).

7. **Do not** write or modify implementation code, tests, or config in this turn. **Do not** propose large refactors outside the slice. If critical information is missing, list exactly what to read or clarify next.

## Required output structure

### 1. Slice identity

- Primary **TASK-** ID(s) for this slice (one primary unless the plan explicitly batches).
- Phase / gate name from the plan.

### 2. Traceability bundle

- **ARCH-** …  
- **SPEC-** …  
- **SPEC-INV-** …  
- **TEST-** … (existing or to be added per plan/spec)

### 3. In scope

- Bullets.

### 4. Out of scope

- Bullets.

### 5. Acceptance criteria

- Bullets (testable, spec-backed).

### 6. Likely touchpoints

- Paths or subsystem names (hypothesis).

### 7. Risks / ambiguities

- Gaps that could cause scope creep; recommend spec clarification if blocking.

---

**Rule:** The slice brief is the contract for the next **IMPLEMENT** step. If the slice is too large to review in one pass, say so and propose a narrower decomposition—still without implementing.
