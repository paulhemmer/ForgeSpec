# Example: Using the Spec-Driven Architecture Generator

This document demonstrates how to use the prompts in this toolkit to turn a
plain-English engineering problem into a complete spec repository.

The goal is to illustrate the workflow end-to-end.

**Canonical reference:** For the full operational workflow (all steps, prompts, and book chapters), see `**ForgeSpec_WORKFLOW.md`** at the repository root. Reader-facing prompt names (**Specification Discovery**, **Generate Spec**, **Validate Spec**, and so on) match **Chapter 7** of the book; the shipped files live under `**prompts/`**. If your idea is still vague, run **Specification Discovery** first; paste the resulting narrative into the PROJECT NARRATIVE section of **Generate Spec** in Step 2 below.

---

# Step 1 - Write a Problem Narrative

Begin with a plain English description of the system.

Do **not** attempt to write a spec yet.

Example:

```
PROJECT NARRATIVE

We have a legacy system that ingests telemetry messages from hundreds of
devices and writes them into a time-series database.

The system is written in C++ and currently processes messages sequentially.
Under heavy load the ingestion buffer grows, latency spikes, and eventually
messages are dropped.

The redesigned system must:

• process at least 100k messages per second
• maintain bounded memory usage
• support deterministic shutdown
• tolerate temporary slowdowns in database writes
• allow cancellation of ingestion jobs
• avoid data loss

The system should remain simple to operate and test.
```

This narrative is intentionally incomplete. The architecture will be derived from it.

---

# Step 2 - Run Generate Spec

Paste the contents of the **Generate Spec** prompt file from `prompts/` into the LLM and append the narrative.

Example input:

```
[PROMPT1_GENERATE_SPEC.md]

PROJECT NARRATIVE

We have a legacy telemetry ingestion system...
```

The LLM will generate a complete architecture spec repository.

Typical output structure:

```
repo/

spec/
    spec.md
    engineering_rules.md
    pipeline_work_units.md
    pipeline_thread_model.md

docs/
    AI_CONTEXT.md
    SYSTEM_OVERVIEW.md
    ARCHITECTURE.md
    invariants.md
    IMPLEMENTATION_PLAN.md
    TRACEABILITY.md
    DECISIONS.md
    VALIDATION_CHECKLIST.md
    GLOSSARY.md

prompts/
    kickoff_prompt.md

design_reviews/
```

Create a project directory and create each file from the prompt output (each `FILE: path` block becomes that path under your project root). If you use an agentic assistant with file access, you can ask it to create the spec repository from the output. Each file defines part of the architecture.

---

# Step 3 - Run Validate Spec

Once the spec repository exists, run the **Validate Spec** prompt.

This prompt performs:

• architecture consistency checks  
• execution graph analysis  
• concurrency safety verification  
• edge case enumeration  
• stress simulation  

Example finding:

```
Finding: Queue between Stage A and Stage B is unbounded.

Risk:
High ingestion rate could cause unbounded memory growth.

Recommendation:
Introduce a bounded queue and backpressure behavior.
```

The output becomes a design review document and should be stored under:

```
docs/design_reviews/
```

---

# Step 4 - Refine the Spec

If validation identifies issues, update the spec.

Typical changes might include:

• clarifying queue behavior  
• tightening shutdown order  
• adding missing invariants  
• refining work-unit definitions  

Run the validation prompt again until the design review passes.

---

# Step 5 - Commit the Spec Repository

Once the architecture is stable:

```
commit
```

The spec repository now becomes the **source of truth**.

Implementation must conform to the spec.

---

# Step 6 - Begin Implementation

Use the generated:

```
prompts/kickoff_prompt.md
```

with an AI coding agent such as Cursor.

The agent will implement the system according to:

```
docs/IMPLEMENTATION_PLAN.md
```

Each phase includes acceptance criteria.

Tests and acceptance criteria should reflect the spec so that implementation is verified against it (see Chapter 12 and `ForgeSpec_WORKFLOW.md`). `**docs/TRACEABILITY.md**` is the rollup matrix linking **ARCH-** / **SPEC-** / **TASK-** / **TEST-** identifiers; keep it current as phases complete.

Between phases, or if the session loses track of the active task, run **Reorient** from `prompts/` so the agent re-reads `docs/IMPLEMENTATION_PLAN.md` and summarizes phase, open work, and test posture before continuing.

Optional: follow the **Controlled Implementation Loop** in `docs/IMPLEMENTATION_EXECUTION.md` (ForgeSpec package root)—slice planning (`PROMPT5_IMPLEMENTATION_SLICE.md`), adversarial slice review (`PROMPT6_IMPLEMENTATION_REVIEW.md`), and traceable commits (`PROMPT7_COMMIT_MESSAGE.md`). The same loop applies if you implement without an LLM.

Optional Round 3 (Timing Realization), after correctness: **Optimize** (`PROMPT8_OPTIMIZE.md` in `prompts/`). See Chapter 12.

---

# Why This Works

Most AI-assisted projects begin with code. That approach often leads to:

• architecture drift  
• hidden concurrency bugs  
• unbounded resource usage  
• brittle systems  

This workflow instead follows a traditional engineering sequence:

```
problem narrative
        ↓
architecture
        ↓
spec
        ↓
implementation
```

The LLM accelerates the architecture and spec-writing stages.



The prompts in this toolkit allow you to transform:

```
vague problem description
```

into

```
complete architecture spec repository
```

in a single structured workflow.

This spec then guides AI agents during implementation.