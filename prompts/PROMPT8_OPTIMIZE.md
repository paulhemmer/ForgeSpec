# Optimize (Timing Realization — post-correctness performance work)

Use this **after** Round 2 (Production Realization) is complete: behavior is correct, tests pass, and contracts are stable. This prompt is for **Round 3 (Timing Realization)** work: **measurement-driven** adjustments to latency, throughput, memory, scheduling, batching, concurrency, and overlap—**without** changing what the system is allowed to do unless you explicitly decide to.

This is **not** a substitute for **Validate Spec** or **Implementation Review**. Do **not** use it to “fix” correctness, missing tests, or ambiguous contracts—resolve those first.

---

## Preconditions (must all be true)

- **Correctness baseline:** Relevant **TEST-** / **SPEC-INV-** checks pass; no open blocking defects for the paths under study.
- **Frozen intent for this run:** You are optimizing **one hypothesis** (see below). If the spec must change, **stop**, update `spec/` / `docs/` and traceability, then resume.

---

## Inputs you must provide (fill before running)

1. **Hypothesis (one sentence):** Changing **X** will improve **metric M** under **workload W**, because **reason**.
2. **Primary metrics (pick 1–3):** e.g. p50/p95/p99 latency, throughput, queue depth, GC pause, CPU%, memory high-water, end-to-end deadline miss rate, etc.
3. **Workload / scenario:** Realistic inputs, rate, duration, dataset size, failure off/on—enough to reproduce.
4. **Subsystem / code path in scope:** Files, components, or flags involved; **out of scope** explicitly listed.
5. **Feature toggles / parameters available:** e.g. queue depth, batch size, worker count, seam/feature flags—**only** those already present or trivially addable as **non-behavior-changing** tuning knobs (same externally visible semantics).

---

## Hard rules (non-negotiable)

1. **One variable at a time** per experiment cycle (one knob, one code change class, or one config change—not combinations unless the hypothesis is explicitly about interaction, and then run a **separate** factorial plan with clear structure).
2. **Controlled conditions:** Fix hardware/OS profile where possible; document build flavor, env vars, seeds, load driver, concurrency, and data set. Re-run **baseline** if conditions change.
3. **Baseline first:** Measure **before** change with the same procedure as **after**.
4. **No silent contract changes:** If a change could alter semantics, ordering guarantees, durability, failure behavior, or API contracts—**flag and stop** for spec/test updates **before** treating it as tuning.
5. **Safety:** If optimization risks invariant drift, add or run targeted checks/tests for the affected **SPEC-INV-** items in the same cycle.

---

## Instructions for the agent

1. Restate the hypothesis, metrics, workload, and scope; confirm preconditions.
2. Propose a **minimal** measurement plan: commands/tools (profiler, benchmark harness, tracing), iteration count / duration, warmup, what to log.
3. Run or outline **baseline** measurements (before); capture raw numbers and context.
4. Apply **one** change aligned with the hypothesis; keep diff minimal.
5. Run **after** measurements with the **same** procedure.
6. Compare before/after: compute deltas for primary metrics; note secondary effects (memory, errors).
7. **Verdict:** Choose one: **keep**, **revert**, or **iterate** (next hypothesis)—with explicit reasoning.
8. If **keep**: summarize what was tuned, the measured gain, and what to monitor in production or CI. Optionally add a short note to `docs/DECISIONS.md` or an existing project notes file—**do not** mandate large doc rewrites.
9. If **revert**: ensure tree returns to known-good state; record why the hypothesis failed.
10. If **iterate**: start a **new** run with a **new** single-variable hypothesis—do not stack unexplained changes.

---

## Required output structure

### A. Hypothesis and scope

- Hypothesis, metrics, workload, in/out of scope.

### B. Measurement protocol

- Tools, steps, warmup, duration, environment notes.

### C. Baseline (before)

- Numbers + brief context (what was measured).

### D. Change (single variable)

- Exact diff summary or parameter delta.

### E. After

- Numbers (same methodology).

### F. Before/after comparison

- Table or bullets: primary metrics, regressions, surprises.

### G. Interpretation

- What likely caused the outcome; confidence level; assumptions.

### H. Recommendation

- **keep** | **revert** | **iterate** (next hypothesis stated explicitly).

### I. Spec / safety check

- Confirm **SPEC-INV-** / **TEST-** relevance: unchanged or explicitly updated—yes/no.

---

## Boundary

Full-repository spec audits remain **Validate Spec** (`PROMPT2_VALIDATE_SPEC.md`). Slice correctness gates remain **Implementation Review** (`PROMPT6_IMPLEMENTATION_REVIEW.md`). This prompt is for **performance realization** once correctness is established.
