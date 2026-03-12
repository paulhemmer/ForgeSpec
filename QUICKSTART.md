# ForgeSpec — Quick Start

ForgeSpec helps you design and validate **software architecture specifications**
using LLMs.

ForgeSpec is built on a simple engineering principle:

**Design → Specify → Build**

Architecture is designed first. The system is specified second. Implementation is then delegated to AI tools.

**Canonical workflow:** See **`ForgeSpec_WORKFLOW.md`** for the full step-by-step operational reference (prompts, outputs, and book chapters). For a prompt–chapter index, see **`book/ForgeSpec_Book_Outline.md`** (Prompt–Chapter Map).

Workflow:

problem → architecture → specification → implementation

ForgeSpec combines spec-driven and test-driven development; tests enforce the spec (details in Chapter 12 and `ForgeSpec_WORKFLOW.md`). The workflow is best used with an **agentic coding assistant** that has project and file access (e.g. Cursor, Claude Code); see Chapter 12 for why. Editor integrations that expose the spec repo or validation status (e.g. via MCP or similar) can make the workflow smoother.

---

# Step 1 — Run Specification Discovery (optional but recommended)

If you do not yet have a clear system description, start with a **Specification Discovery** dialogue.

You can either:

- use the template in `book/chapters/Chapter8_Iterative_Specification_Discovery.md`, or  
- run `prompts/PROMPT0_SPEC_DISCOVERY.md` with your informal description.

For best results, run discovery in an environment where the assistant can read the repository (so it can use the question bank in `prompts/specification_discovery_question_bank.md`), or paste the question bank into the chat along with the prompt.

The goal is to produce a concise narrative that captures:

• subsystem boundaries  
• system invariants  
• failure behavior  
• responsibility ownership  

**Where to use it:** Paste this narrative into the **PROJECT NARRATIVE** section at the bottom of `prompts/PROMPT1_GENERATE_SPEC.md` in the next step.

---

# Step 2 — Write a Project Narrative

Describe:

• what the system does  
• performance requirements  
• concurrency needs  
• reliability constraints  
• problems with any legacy system

Example:

We have a telemetry ingestion system that processes data from hundreds
of devices. Under high load the system drops messages. The new system must
process 100k messages/sec while maintaining bounded memory usage and
deterministic shutdown behavior.

---

# Step 3 — Generate the Specification

Run the generate_spec prompt:

`prompts/PROMPT1_GENERATE_SPEC.md`

This produces a **specification repository** describing the system architecture.

---

# Step 4 — Validate the Architecture

Run the validation prompt:

`prompts/PROMPT2_VALIDATE_SPEC.md`

This performs a design review that checks for:

• concurrency hazards  
• unbounded queues  
• shutdown issues  
• execution graph errors  
• missing edge cases

Save the review artifact in:

`docs/design_reviews/`

---

# Step 5 — Refine the Spec

Update the specification based on review findings.

Repeat validation until the architecture stabilizes.

---

# Step 6 — Begin Implementation

Once the specification is stable:

commit the spec repository  
implement the system using the spec as the authority

Implement or generate tests and acceptance criteria from the implementation plan so that the implementation is verified against the spec.

Rule:

**If code and spec disagree, the spec wins.**

---

# Additional Capabilities

## Reverse-Engineering an Existing System

If you already have a system or codebase and want to document its architecture,
run the reverse-spec prompt:

`prompts/PROMPT3_REVERSE_SPEC.md`

This prompt analyzes the system and generates a **formal specification
repository describing the existing architecture**.

You can then run:

`prompts/PROMPT2_VALIDATE_SPEC.md`

to perform a design review and identify architectural risks.

---

# Key Principle

Do not start with code.

Start with the architecture.