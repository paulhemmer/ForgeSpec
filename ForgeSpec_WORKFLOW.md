
# ForgeSpec Workflow

This document defines the **canonical operational workflow** for using ForgeSpec.
It connects the ideas described in the book with the actual prompts and repository
structure used to execute the methodology.

ForgeSpec is a **spec‑driven AI engineering workflow** where architecture and system
constraints are defined before implementation is generated.

The process can be summarized as:

Idea → Specification Discovery → generate_spec prompt → Spec Repository → Spec Validation Loop → Implementation Plan → AI Implementation → Design Review → Iteration

**Book reference:** Conceptual workflow in Chapter 7; discovery in Chapter 8; spec repository in Chapter 9; validation and design reviews in Chapter 10; implementation in Chapter 12. Operational quickstart: `QUICKSTART.md` and `examples/EXAMPLE_PROJECT.md`.

**How to run the prompts:** Open your AI coding assistant (e.g. Cursor, Claude Code) in a project directory. For each step, paste the prompt file contents into a new chat and add your input in the PROJECT NARRATIVE (or equivalent) section. With file access, the assistant can create and edit the spec repository and run the validation loop.

---

# 1. Specification Discovery

**Prompt:** `prompts/PROMPT0_SPEC_DISCOVERY.md`  
**Book:** Chapter 8 — Iterative Specification Discovery; Appendix 1 (example dialogue).

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

Goal: Generate the **initial ForgeSpec repository structure** and core specification files.

Input:

**CUSTOM_SYSTEM_DESCRIPTION** (project narrative from Step 1, or a direct narrative if skipping discovery).

The generate_spec prompt produces:

• system architecture description  
• specification documents  
• architectural invariants  
• `docs/IMPLEMENTATION_PLAN.md` (phased implementation plan)

Typical output structure:

```
spec/
    spec.md, engineering_rules.md, pipeline_work_units.md, pipeline_thread_model.md
docs/
    AI_CONTEXT.md, SYSTEM_OVERVIEW.md, ARCHITECTURE.md, invariants.md,
    IMPLEMENTATION_PLAN.md, DECISIONS.md, VALIDATION_CHECKLIST.md, GLOSSARY.md,
    design_reviews/
prompts/
    kickoff_prompt.md
design_reviews/
```

Create a project directory and create each file from the prompt output (each `FILE: path` block becomes that path under your project root). If you use an agentic assistant with file access, you can ask it to create the spec repository from the output.

At this point the system architecture exists but may still contain gaps or ambiguities.

---

# 3. Specification Validation Loop

**Prompt:** `prompts/PROMPT2_VALIDATE_SPEC.md`  
**Book:** Chapter 10 — AI Design Reviews.

Goal: Refine and stabilize the specification.

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

The implementation plan should include tests and acceptance criteria that encode specification invariants.

The result typically resembles:

Phase 1 – Core infrastructure  
Phase 2 – Subsystem implementation  
Phase 3 – Integration  
Phase 4 – Reliability & testing

Use this plan (and the kickoff prompt) to drive the implementation phase in a controlled order.

---

# 5. AI Implementation

**Book:** Chapter 12 — Implementing Within a Spec.  
**Artifacts:** `docs/IMPLEMENTATION_PLAN.md`, `prompts/kickoff_prompt.md`, `spec/`, `docs/AI_CONTEXT.md`, `docs/ARCHITECTURE.md`.

Goal: Generate code using AI agents while remaining constrained by the specification.

Tests are derived from the specification and provide executable verification of invariants and expected behavior. During implementation:

• the spec repository remains the **source of truth**  
• code must conform to the defined architecture  
• agents reference specification documents (and `prompts/kickoff_prompt.md`) before writing code  

Implement or generate tests and acceptance criteria from the implementation plan so that the implementation is verified against the spec.

Provide the assistant with the kickoff prompt and the current phase of IMPLEMENTATION_PLAN; ask it to implement that phase and run tests.

Typical loop:

select subsystem → generate implementation → run tests → validate against spec

---

# 6. Design Review Loop

**Prompt:** `prompts/PROMPT2_VALIDATE_SPEC.md` (same as Step 3).  
**Book:** Chapter 10 — AI Design Reviews.

Goal: Continuously verify that implementation matches architecture.

The **Spec Validation / Design Review Prompt** can be used to:

• compare code and spec against specifications  
• detect architectural drift  
• identify missing invariants  
• recommend specification updates  

Save review artifacts under **`docs/design_reviews/`**.

If architectural issues are discovered:

implementation → spec revision → validation → implementation

---

# 7. Reverse Specification (Optional)

**Prompt:** `prompts/PROMPT3_REVERSE_SPEC.md`  
**Book:** Chapter 11 — Reverse Engineering Systems.

When working with existing systems, the **Reverse Spec Prompt** can reconstruct architecture from code or documentation.

This allows ForgeSpec to be applied to:

• legacy systems  
• inherited codebases  
• undocumented architectures  

Output: a **specification repository** (same structure as Step 2: `spec/`, `docs/`, `design_reviews/`) describing the current architecture. Then run the Spec Validation Loop (Step 3) and proceed to implementation planning and implementation as needed.

---

# 8. Continuous Iteration

ForgeSpec is not a one‑time process.

Systems evolve through cycles:

architecture → specification → implementation → validation → refinement

Because the specification repository exists, future changes begin with **updating
architecture**, not modifying code blindly.

**Evolving an existing spec repository:** When adding features or changing requirements, do not re-run the generate_spec prompt (PROMPT1_GENERATE_SPEC)—that would regenerate the repo. Instead: (1) update architecture and specification documents to reflect the new capability, (2) run `prompts/PROMPT2_VALIDATE_SPEC.md` against the updated spec and save the review under `docs/design_reviews/`, (3) refine the spec from the review, (4) update implementation and tests to match the updated spec. See Chapter 7 — "Evolving the System: Adding Features" for the full sequence.

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
| 1 | Run Specification Discovery | `prompts/PROMPT0_SPEC_DISCOVERY.md` | Ch 8 |
| 2 | Insert output into generate_spec prompt; generate spec repo | `prompts/PROMPT1_GENERATE_SPEC.md` | Ch 7, 9 |
| 3 | Run Spec Validation Loop; save reviews under `docs/design_reviews/` | `prompts/PROMPT2_VALIDATE_SPEC.md` | Ch 10 |
| 4 | Use implementation plan from generate_spec output | `docs/IMPLEMENTATION_PLAN.md`, `prompts/kickoff_prompt.md` | Ch 12 |
| 5 | Implement with AI agents (spec = source of truth) | — | Ch 12 |
| 6 | Run design reviews; iterate on spec and implementation | `prompts/PROMPT2_VALIDATE_SPEC.md` | Ch 10 |
| 7 | (Optional) Compare two architectures | `prompts/PROMPT4_ARCHITECTURE_COMPARE.md` | Ch 7 |
| 8 | (Optional) Reverse-engineer existing system | `prompts/PROMPT3_REVERSE_SPEC.md` | Ch 11 |

This document acts as the **operational reference** for the ForgeSpec methodology. For a condensed runnable guide, see `QUICKSTART.md` and `examples/EXAMPLE_PROJECT.md`.

---

# Lifecycle Coverage

ForgeSpec’s prompts and artifacts cover the full lifecycle as follows:

| Stage | Covered by | Note |
|-------|------------|------|
| Discovery | `PROMPT0_SPEC_DISCOVERY.md` | Q&A until you have a project narrative. |
| Architecture + spec repo | `PROMPT1_GENERATE_SPEC.md` (generate_spec) | Produces `spec/`, `docs/`, and initial specs. |
| Spec validation | `PROMPT2_VALIDATE_SPEC.md` | Run repeatedly; save artifacts under `docs/design_reviews/`. |
| Implementation planning | **No separate prompt.** | Use `docs/IMPLEMENTATION_PLAN.md` and `prompts/kickoff_prompt.md` produced by the generate_spec prompt. |
| Implementation | **No prompt.** | Use the spec repository as source of truth; coding agents implement from `IMPLEMENTATION_PLAN.md` and spec docs. |
| Design review / iteration | `PROMPT2_VALIDATE_SPEC.md` | Same prompt; use to check for drift and refine spec. |
| Reverse (optional) | `PROMPT3_REVERSE_SPEC.md` | For existing systems. |
| Compare (optional) | `PROMPT4_ARCHITECTURE_COMPARE.md` | When choosing between two designs. |

There is no dedicated “implementation planning prompt”—the generate_spec prompt is responsible for generating the phased plan. There is no separate “code vs spec” review prompt; design reviews are performed with `PROMPT2_VALIDATE_SPEC.md` against the spec (and, in practice, you can feed it spec plus code context when checking for drift).
