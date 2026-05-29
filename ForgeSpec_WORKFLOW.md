
# ForgeSpec Workflow

This document defines the **canonical operational workflow** for using ForgeSpec.
It connects the ideas described in the book with the actual prompts and repository
structure used to execute the methodology.

ForgeSpec is a **spec‑driven AI engineering workflow** where architecture and system
constraints are defined before implementation is generated.

The prompts in this workflow are intentionally written to enforce skeptical engineering discipline: respectful pushback, assumption testing, and failure-first reasoning. They are designed to reduce premature agreement and preserve independent judgment during discovery, spec writing, and review.

When implementation is delegated to coding agents, behavior that used to ride on tacit engineer judgment should live in the spec repository as **named obligations** and **traceable** verification (see `docs/TRACEABILITY.md` once your spec repo exists). ForgeSpec targets **minimal sufficient** proof at **contracts and boundaries**, not a larger test count for its own sake. For the full rationale—especially why granularity concentrates at lifecycle, subsystem, and ordering assumptions—read **Chapter 12 — Implementing Within a Spec** in the book (*If the test plan looks like overkill* and *On Granularity and Diminishing Returns*). **`prompts/PROMPT1_GENERATE_SPEC.md`** encodes the same idea in its **TRACEABILITY** requirements and **Proportionality** rule.

The process can be summarized as:

Idea → Specification Discovery → generate_spec prompt → Spec Repository → Spec Validation Loop → Implementation Plan → AI Implementation → Design Review → Iteration

**Book reference:** Conceptual workflow in Chapter 7; discovery in Chapter 8; spec repository in Chapter 9; validation and design reviews in Chapter 10; implementation in Chapter 12. Optional implementation discipline: **`docs/IMPLEMENTATION_EXECUTION.md`** (Controlled Implementation Loop). Optional Round 3 (Timing Realization): **`prompts/PROMPT8_OPTIMIZE.md`** (**Optimize**), see Chapter 12. Operational quickstart: `QUICKSTART.md` and `examples/EXAMPLE_PROJECT.md`. The book uses **reader-facing names** for prompts (**Specification Discovery**, **Generate Spec**, **Validate Spec**, **Reverse Spec**, **Architecture Compare**, **Implementation Slice**, **Implementation Review**, **Commit Message**, **Reorient**, **Optimize**); Chapter 7 lists how those map to the `prompts/` files below.

**How to run the prompts:** Open your AI coding assistant (e.g. Cursor, Claude Code) in a project directory. For each step, paste the prompt file contents into a new chat and add your input in the PROJECT NARRATIVE (or equivalent) section. With file access, the assistant can create and edit the spec repository and run the validation loop.

---

# 1. Specification Discovery

**Prompt:** `prompts/PROMPT0_SPEC_DISCOVERY.md`  
**Book:** Chapter 8 — Iterative Spec Discovery; Appendix 1 (example dialogue).

Optional but recommended if your idea is not yet clear; you can skip to Step 2 if you already have a clear project narrative.

Goal: Transform a raw system idea into a **clear architectural description** (project narrative).

This phase identifies:

• subsystem boundaries  
• system invariants  
• ownership of responsibilities  
• failure scenarios  
• interface assumptions  

The user runs the **Specification Discovery Prompt** and interacts with the AI in a question‑and‑answer session.

Output of this phase:

**CUSTOM_SYSTEM_DESCRIPTION** (project narrative)

This block becomes the **input to the generate_spec prompt** (paste into the PROJECT NARRATIVE section of PROMPT1_GENERATE_SPEC.md).

---

# 2. generate_spec prompt (define_spec)

**Prompt:** `prompts/PROMPT1_GENERATE_SPEC.md`  
**Book:** Chapter 7 — The ForgeSpec Workflow; Chapter 9 — Anatomy of a Spec Repository.

Goal: Generate the **initial ForgeSpec repository structure** and core spec files.

Input:

**CUSTOM_SYSTEM_DESCRIPTION** (project narrative from Step 1, or a direct narrative if skipping discovery).

The generate_spec prompt produces:

• system architecture description  
• spec documents  
• architectural invariants  
• `docs/IMPLEMENTATION_PLAN.md` (phased implementation plan)

Typical output structure:

```
spec/
    spec.md, engineering_rules.md, pipeline_work_units.md, pipeline_thread_model.md
docs/
    AI_CONTEXT.md, SYSTEM_OVERVIEW.md, ARCHITECTURE.md, invariants.md,
    IMPLEMENTATION_PLAN.md, TRACEABILITY.md, DECISIONS.md, VALIDATION_CHECKLIST.md, GLOSSARY.md,
    design_reviews/
prompts/
    kickoff_prompt.md
design_reviews/
```

Create a project directory and create each file from the prompt output (each `FILE: path` block becomes that path under your project root). If you use an agentic assistant with file access, you can ask it to create the spec repository from the output.

At this point the system architecture exists but may still contain gaps or ambiguities.

---

# 3. Spec Validation Loop

**Prompt:** `prompts/PROMPT2_VALIDATE_SPEC.md`  
**Book:** Chapter 10 — AI Design Reviews.

Goal: Refine and stabilize the spec.

Provide the contents of all files in `spec/` and `docs/` (or give the model access to the spec repository). Include the project narrative if you want narrative-coverage analysis (analysis 6).

The **Spec Validation Prompt** is run repeatedly against the generated spec repository to:

• identify inconsistencies  
• detect missing invariants  
• clarify subsystem boundaries  
• enforce responsibility ownership  
• optionally: verify the spec covers the original scope (narrative/task coverage)—provide the discovery narrative when running the prompt so the review can check for gaps  

Save each design-review artifact under **`docs/design_reviews/`**.

The loop continues until:

• subsystem responsibilities are clear  
• system invariants are defined  
• failure behavior is described  
• interfaces are stable

Stop when the design-review artifact has no blocking findings and the verdict is acceptable; then the spec is ready for implementation planning.

**Plan-only workflow:** You can treat Steps 1–3 as a **plan-only** phase: produce the spec repository and implementation plan, run validation until the architecture is stable, and stop before implementation. Then implement subsystems in an order you choose (e.g. phase by phase from `IMPLEMENTATION_PLAN.md`), using the spec as the source of truth. This gives full control over what gets built and when.

---

# 4. Implementation Planning

**Book:** Chapter 7 (workflow); Chapter 12 — Implementing Within a Spec.  
**Artifact:** `docs/IMPLEMENTATION_PLAN.md` (generated by the generate_spec prompt in Step 2).  
**Kickoff:** `prompts/kickoff_prompt.md` in the generated repo.

Goal: Use the **structured development plan** produced by the generate_spec prompt.

There is no separate implementation-planning prompt. The generate_spec prompt (PROMPT1_GENERATE_SPEC.md) already generates `docs/IMPLEMENTATION_PLAN.md` with:

• phased development plan  
• subsystem implementation order  
• test strategy  
• acceptance gates  

The implementation plan should include tests and acceptance criteria that encode spec invariants.

The result typically resembles:

Phase 1 – Core infrastructure  
Phase 2 – Subsystem implementation  
Phase 3 – Integration  
Phase 4 – Reliability & testing

Use this plan (and the kickoff prompt) to drive the implementation phase in a controlled order.

For a repeatable slice-by-slice execution model (optional but recommended), see **`docs/IMPLEMENTATION_EXECUTION.md`** and Step 5 below.

### Two-Round Realization (when complexity warrants)

For complex systems, treat implementation as two explicit rounds:

- **Round 1 — Architectural Realization (R1):** full wiring exists; lifecycle, queue/threading model, observability surfaces, and contracts are implemented. Scaffolded paths are allowed only behind stable interfaces.
- **Round 2 — Production Realization (R2):** scaffolded paths are replaced with production implementations while preserving R1 contracts and invariants; behavioral, readiness, load, and shutdown guarantees are verified.

Rules:

- Any phase allowing scaffold/stub behavior on critical paths must be labeled `R1`.
- A phase cannot be labeled `R2` if critical paths remain scaffolded.
- `R1 complete` is not production-complete.

---

# 5. AI Implementation

**Book:** Chapter 12 — Implementing Within a Spec.  
**Artifacts:** `docs/IMPLEMENTATION_PLAN.md`, `prompts/kickoff_prompt.md`, `spec/`, `docs/AI_CONTEXT.md`, `docs/ARCHITECTURE.md`.

Goal: Generate code using AI agents while remaining constrained by the spec.

Tests are derived from the spec and provide executable verification of invariants and expected behavior. During implementation:

• the spec repository remains the **source of truth**  
• code must conform to the defined architecture  
• agents reference spec documents (and `prompts/kickoff_prompt.md`) before writing code  

Implement or generate tests and acceptance criteria from the implementation plan so that the implementation is verified against the spec.

Provide the assistant with the kickoff prompt and the current phase of IMPLEMENTATION_PLAN; ask it to implement that phase and run tests.

Typical loop:

select subsystem → generate implementation → run tests → validate against spec

### Controlled Implementation Loop (recommended)

Optional operational wrapper for each bounded unit of work—compatible with **human-only** or **AI-assisted** coding. Canonical definition and examples: **`docs/IMPLEMENTATION_EXECUTION.md`**. Per slice:

1. **Plan slice** — From `docs/IMPLEMENTATION_PLAN.md`, name **TASK-** / IDs and acceptance criteria. **`prompts/PROMPT5_IMPLEMENTATION_SLICE.md`** (**Implementation Slice**) produces a structured brief.
2. **Implement** — Only within that slice; use `prompts/kickoff_prompt.md` and `spec/` as authority when using agents.
3. **Review** — Spec compliance, invariants, scope creep, architectural drift. **`prompts/PROMPT6_IMPLEMENTATION_REVIEW.md`** (**Implementation Review**) is a narrow adversarial gate on the slice; full-repo validation remains **`prompts/PROMPT2_VALIDATE_SPEC.md`**.
4. **Correct** — Fix implementation or update spec/docs/tests first if contracts change; re-review.
5. **Commit** — Atomic, traceable change. **`prompts/PROMPT7_COMMIT_MESSAGE.md`** (**Commit Message**) optional.
6. **Update state** — `docs/IMPLEMENTATION_PLAN.md`, `docs/TRACEABILITY.md` as needed.

**Re-anchor between slices:** When finishing a phase or task, starting a new session, or anytime context feels muddy, run **`prompts/PROMPT_REORIENT.md`** in a fresh context. It forces a read of `docs/IMPLEMENTATION_PLAN.md`, traceability, and the last trusted checkpoint, and produces a short report (phase, active task, open work, test posture, recommended next human action) **before** more implementation—without duplicating a full validation pass.

### Optional: Timing Realization (Round 3)

After production correctness is established, **Chapter 12** describes an optional third round focused on real-world timing. Use **`prompts/PROMPT8_OPTIMIZE.md`** (**Optimize**) for hypothesis-driven, measurement-backed tuning (baseline → single change → compare → keep/revert/iterate). It does not replace **Validate Spec** or **Implementation Review**.

---

# 6. Design Review Loop

**Prompt:** `prompts/PROMPT2_VALIDATE_SPEC.md` (same as Step 3).  
**Book:** Chapter 10 — AI Design Reviews.

Goal: Continuously verify that implementation matches architecture.

The **Spec Validation / Design Review Prompt** can be used to:

• compare code and spec against the written specs  
• detect architectural drift  
• identify missing invariants  
• recommend spec updates  

Save review artifacts under **`docs/design_reviews/`**.

If architectural issues are discovered:

implementation → spec revision → validation → implementation

---

# 7. Reverse Spec (Optional)

**Prompt:** `prompts/PROMPT3_REVERSE_SPEC.md`  
**Book:** Chapter 11 — Reverse Engineering.

When working with existing systems, the **Reverse Spec Prompt** can reconstruct architecture from code or documentation.

This allows ForgeSpec to be applied to:

• legacy systems  
• inherited codebases  
• undocumented architectures  

Output: a **spec repository** (same structure as Step 2: `spec/`, `docs/`, `design_reviews/`) describing the current architecture. Then run the Spec Validation Loop (Step 3) and proceed to implementation planning and implementation as needed.

---

# 8. Continuous Iteration

ForgeSpec is not a one‑time process.

Systems evolve through cycles:

architecture → spec → implementation → validation → refinement

Because the spec repository exists, future changes begin with **updating
architecture**, not modifying code blindly.

**Evolving an existing spec repository:** When adding features or changing requirements, do not re-run the generate_spec prompt (PROMPT1_GENERATE_SPEC)—that would regenerate the repo. Instead: (1) update architecture and spec documents to reflect the new capability, (2) issue or update **ARCH-** / **SPEC-** / **TASK-** / **TEST-** IDs as needed and **keep `docs/TRACEABILITY.md` consistent** (same linkage rules as initial generation), (3) run `prompts/PROMPT2_VALIDATE_SPEC.md` against the updated spec and save the review under `docs/design_reviews/`, (4) refine the spec from the review, (5) update implementation and tests to match the updated spec. See Chapter 7 — "Evolving the System: Adding Features" for the full sequence.

---

## Traceability artifacts (ARCH → SPEC → TASK → TEST)

The generate_spec prompt (`PROMPT1_GENERATE_SPEC.md`) requires stable identifiers and a rollup matrix:

| Artifact | Role |
|----------|------|
| **`docs/TRACEABILITY.md`** | One row per **ARCH-**, **SPEC-**, **SPEC-INV-**, **TASK-**, and **TEST-** ID; **Upstream** / **Downstream** link obligations to work and verification. |
| **`docs/IMPLEMENTATION_PLAN.md`** | **TASK-** and **TEST-** IDs embedded in phases, gates, and test line items; each task cites upstream spec/architecture IDs. |
| **`docs/invariants.md`** | Per-invariant enforcement + **TEST-** mapping (echoes **SPEC-INV-***). |
| **Test code** | Comments or metadata citing **TEST-** and **SPEC-INV-** / **SPEC-** IDs as implemented. |

Validation (`PROMPT2_VALIDATE_SPEC.md`) includes a **traceability matrix audit**: orphan IDs, missing tests for invariants, and broken chains are defects. The **`prompts/kickoff_prompt.md`** produced with the repo instructs agents to maintain **`TRACEABILITY.md`** when closing tasks or adding tests.

---

# ForgeSpec Philosophy

The core principle of ForgeSpec is simple:

**Architecture must exist before implementation.**

AI dramatically accelerates code generation, but reliable systems still depend on:

• clearly defined subsystem boundaries  
• explicit system invariants  
• ownership of responsibilities  
• documented failure behavior  

ForgeSpec ensures those elements exist **before large amounts of code are produced**.

---

# Minimal Workflow Summary

| Step | Action | Prompt / artifact | Book chapter |
|------|--------|-------------------|--------------|
| 1 | Run **Specification Discovery** | `prompts/PROMPT0_SPEC_DISCOVERY.md` | Ch 8 |
| 2 | Insert output into generate_spec prompt; generate spec repo | `prompts/PROMPT1_GENERATE_SPEC.md` | Ch 7, 9 |
| 3 | Run Spec Validation Loop; save reviews under `docs/design_reviews/` | `prompts/PROMPT2_VALIDATE_SPEC.md` | Ch 10 |
| 4 | Use implementation plan from generate_spec output | `docs/IMPLEMENTATION_PLAN.md`, `prompts/kickoff_prompt.md`; optional loop guide `docs/IMPLEMENTATION_EXECUTION.md` | Ch 7, 12 |
| 5 | Implement (human and/or AI; spec = source of truth); optional **Controlled Implementation Loop** — `PROMPT5` / `PROMPT6` / `PROMPT7`; optional re-anchor with `prompts/PROMPT_REORIENT.md` | `prompts/kickoff_prompt.md`, `prompts/PROMPT5_IMPLEMENTATION_SLICE.md`, `prompts/PROMPT6_IMPLEMENTATION_REVIEW.md`, `prompts/PROMPT7_COMMIT_MESSAGE.md`, `prompts/PROMPT_REORIENT.md` | Ch 12 |
| 6 | Run design reviews; iterate on spec and implementation | `prompts/PROMPT2_VALIDATE_SPEC.md` | Ch 10 |
| 7 | (Optional) Compare two architectures | `prompts/PROMPT4_ARCHITECTURE_COMPARE.md` | Ch 7 |
| 8 | (Optional) Reverse-engineer existing system | `prompts/PROMPT3_REVERSE_SPEC.md` | Ch 11 |
| 9 | (Optional) Round 3 timing realization / measurement-driven tuning | `prompts/PROMPT8_OPTIMIZE.md` | Ch 12 |

This document acts as the **operational reference** for the ForgeSpec methodology. For a condensed runnable guide, see `QUICKSTART.md` and `examples/EXAMPLE_PROJECT.md`.

---

# Lifecycle Coverage

ForgeSpec’s prompts and artifacts cover the full lifecycle as follows:

| Stage | Covered by | Note |
|-------|------------|------|
| Discovery | `PROMPT0_SPEC_DISCOVERY.md` | Q&A until you have a project narrative; include **technology and integrations** (languages, third-party libraries, external APIs/SaaS) when relevant—see question bank section 14. |
| Architecture + spec repo | `PROMPT1_GENERATE_SPEC.md` (generate_spec) | Produces `spec/`, `docs/` (including `TRACEABILITY.md`), and initial specs. |
| Spec validation | `PROMPT2_VALIDATE_SPEC.md` | Run repeatedly; save artifacts under `docs/design_reviews/`. |
| Implementation planning | **No separate prompt.** | Use `docs/IMPLEMENTATION_PLAN.md` and `prompts/kickoff_prompt.md` produced by the generate_spec prompt. |
| Implementation | **`prompts/kickoff_prompt.md`** (per phase); optional CIL: **`docs/IMPLEMENTATION_EXECUTION.md`**, **`prompts/PROMPT5_IMPLEMENTATION_SLICE.md`**, **`prompts/PROMPT6_IMPLEMENTATION_REVIEW.md`**, **`prompts/PROMPT7_COMMIT_MESSAGE.md`**; optional **`prompts/PROMPT_REORIENT.md`** between phases or when context is unclear | Human and/or coding agents implement from `IMPLEMENTATION_PLAN.md` and spec docs; CIL adds slice/review/commit discipline; reorientation re-reads the plan and traceability without generating code until the report is complete. |
| Design review / iteration | `PROMPT2_VALIDATE_SPEC.md` | Same prompt; use to check for drift and refine spec. |
| Reverse (optional) | `PROMPT3_REVERSE_SPEC.md` | For existing systems. |
| Compare (optional) | `PROMPT4_ARCHITECTURE_COMPARE.md` | When choosing between two designs. |
| Timing realization (optional) | `PROMPT8_OPTIMIZE.md` | After Round 2 correctness; hypothesis- and measurement-driven performance tuning (Chapter 12, Round 3). |

There is no dedicated “implementation planning prompt”—the generate_spec prompt is responsible for generating the phased plan. There is no separate “code vs spec” review prompt; design reviews are performed with `PROMPT2_VALIDATE_SPEC.md` against the spec (and, in practice, you can feed it spec plus code context when checking for drift).
