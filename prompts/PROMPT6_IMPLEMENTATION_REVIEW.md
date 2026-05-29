# Implementation Review (adversarial slice validation)

Use this **after** a bounded implementation slice: adversarial validation of **implementation output** against the spec and slice boundaries. This prompt is **narrow**—a gate for one slice—not a substitute for full-repository **Validate Spec** (`PROMPT2_VALIDATE_SPEC.md`), which you should still run periodically or when architecture-wide drift is a concern.

## Preconditions

- A **slice brief** exists (from `PROMPT5_IMPLEMENTATION_SLICE.md` or an equivalent human-written brief): TASK, IDs, in/out of scope, acceptance criteria.
- You have the **implementation delta**: diff summary, changed file list, or the agent’s summary of edits—plus **test results** (pass/fail, command, or “unknown”).
- Access to authoritative **`spec/`** and relevant **`docs/`** (e.g. `invariants.md`, `ARCHITECTURE.md`) for cross-checking.

## Instructions for the agent

1. Restate the slice **in scope** and **out of scope** from the brief. Treat them as the enforcement boundary for this review.

2. **Spec compliance:** For each material change in the delta, tie it to a **SPEC-** or **SPEC-INV-** obligation or an explicit plan task. Flag any behavior that satisfies tests but is not supported by the spec (overfitting risk).

3. **Invariant preservation:** Check whether **SPEC-INV-** guarantees could be violated by the new code paths (concurrency, retries, shutdown, durability, ordering, etc.).

4. **Scope creep:** List any changes that implement features, dependencies, or structural choices **outside** the slice brief or plan.

5. **Architectural drift:** Detect silent introduction of new queues, retries, caches, background jobs, or ownership moves not reflected in spec/docs. These are **fail** findings unless the spec was updated in the same change set.

6. **Tests:** Verify that claimed **TEST-** IDs are exercised or added as promised. Flag missing coverage for invariants the slice touches.

7. Assign a **verdict**: **pass**, **pass with notes** (non-blocking improvements), or **fail** (blocking issues). **Do not** rewrite implementation unless explicitly asked; output review only.

## Required output structure

### 1. Verdict

- One of: **pass** | **pass with notes** | **fail**  
- One-sentence rationale.

### 2. Findings by severity

- **Blocking** — must fix or update spec before merge.  
- **Important** — should fix before next slice.  
- **Minor** — style, clarity, optional hardening.

### 3. Scope and drift

- **Scope creep:** yes/no; items.  
- **Architectural drift:** yes/no; items.

### 4. Spec / test gaps

- Missing or inconsistent **SPEC-** / **SPEC-INV-** / **TEST-** linkage.

### 5. Required follow-ups

- If **fail** or spec must change: list **required spec/docs updates** before implementation can be considered aligned.

---

**Boundary:** Full traceability matrix audits, narrative coverage, and repository-wide consistency remain the job of **Validate Spec** (`PROMPT2_VALIDATE_SPEC.md`). Use this prompt as a **fast, adversarial slice gate** after implementation.
