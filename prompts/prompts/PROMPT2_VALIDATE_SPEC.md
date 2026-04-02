Perform a comprehensive specification validation pass.

Read all specification files generated for this system. The user (or the agent's environment) must provide these files: give the model access to the spec repository, or paste the contents of all files in `spec/` and `docs/`. Include the project narrative (or discovery summary) if you want narrative-coverage analysis (see analysis 6 below). This prompt may be used both for initial spec review and for reviewing spec updates (e.g. after adding features or changing requirements).

Your task is to validate the design as if performing a formal architecture review.

Maintain a disciplined engineering posture: professional and respectful, but skeptical. Do not optimize for affirming prior decisions. If a core assumption appears weak, challenge it explicitly and report what would falsify it.
Do not use praise or ego-reinforcing language; keep feedback technical, specific, and evidence-based.

Perform the following analyses:

1. Consistency Review
   - detect conflicting definitions
   - detect undefined terms
   - detect unused concepts
   - verify document authority hierarchy

2. Architecture Safety Review
   - verify concurrency model
   - verify bounded resource usage
   - verify deterministic shutdown behavior
   - verify error propagation

3. Execution Graph Analysis
   - construct the system execution graph
   - verify it is acyclic where required
   - verify no component waits on itself indirectly
   - verify ownership and lifecycle rules

4. Worst-Case Stress Simulation
   - slow downstream components
   - burst input workloads
   - partial subsystem failure
   - cancellation mid-processing
   - shutdown during I/O

5. Edge Case Enumeration
   - degenerate workloads
   - single-unit edge cases
   - disabled subsystem behavior
   - resource exhaustion scenarios

6. Narrative and task coverage
   - If the original project narrative (or discovery summary) was provided: verify that the specification addresses the key capabilities, action verbs, and requirements from that narrative.
   - Check for gaps where the narrative describes a capability or constraint that is not reflected in the spec.
   - Report any such gaps in the design-review artifact (e.g. under Findings or Recommended Spec Clarifications).
   - If no narrative was provided, skip this analysis or note in the output that narrative coverage was not verified.

7. Undefined policy parameters check (MUST-FLAG)
   - If the spec uses words like bounded/limited/throttled/retry/backoff/retention without an explicit parameter or rule, treat it as a defect.
   - Require: (a) a parameter or rule, (b) overflow behavior, and (c) a single owning component.

8. State/lifecycle model check (MUST-EXIST)
   - Verify the spec defines the lifecycle of the primary work unit(s):
     - states
     - transitions
     - who mutates state
     - what is durable vs ephemeral
   - If missing, treat as a defect.

9. Invariant traceability check (MUST-EXIST)
   - For each SPEC-INV-* invariant, verify there is:
     - an enforcement point (component + mechanism)
     - at least one test/validation strategy
     - a reference in the implementation plan (phase/gate)
   - If missing, treat as a defect.

10. Traceability matrix audit (MUST-EXIST)
   - Confirm `docs/TRACEABILITY.md` exists and includes every **ARCH-**, **SPEC-**, **SPEC-INV-**, **TASK-**, and **TEST-** ID referenced in `spec/`, `docs/IMPLEMENTATION_PLAN.md`, and `docs/invariants.md`.
   - Flag: orphan **TEST-** (no linked **SPEC-** / **SPEC-INV-**), orphan **TASK-** (no upstream **SPEC-** / **ARCH-**), **SPEC-INV-** with no **TEST-** downstream, duplicate IDs, or IDs used in prose but missing from the matrix.
   - Verify **Upstream/Downstream** columns are populated enough to reconstruct **ARCH → SPEC → TASK → TEST** chains without guesswork.

11. Pre-mortem failure-first check
   - Identify the top 3 "what breaks first?" scenarios if this spec were implemented as written.
   - For each scenario, name the triggering condition, first failing boundary, and missing or weak control.
   - Recommend the minimum spec change that would reduce the risk.

12. Round-integrity check (for complex implementations)
   - If the implementation plan uses round labels, verify each phase is explicitly marked `R1` or `R2`.
   - Flag any "Real Implementation" phase with no round label as ambiguous.
   - If a phase is marked `R2`, verify critical paths are not scaffolded/stubbed.
   - Verify `R1 complete` is not treated as production-complete in plan language or acceptance criteria.

13. Security and trust requirements review (when implied by narrative or architecture)
   - If the project narrative or architecture implies **network exposure**, **user identities**, **multi-tenant isolation**, **sensitive or regulated data**, or **administrative privilege**, verify the specification **names** the corresponding obligations: trust boundaries, authentication/authorization expectations at least at the architectural level, and data-handling constraints where relevant.
   - If the system is explicitly scoped as trusted-only or non-networked, verify that scope is stated so security silence is not mistaken for coverage.
   - Flag contradictions (e.g. “public API” with no auth story) and missing enforcement points for stated security invariants.

14. Technology, library, and external API coverage
   - If the project narrative or discovery summary names **specific languages**, **libraries/packages**, **external APIs**, **SaaS products**, **brokers**, or **data stores**: verify the spec repository **records** them (typically under `docs/ARCHITECTURE.md` **Technology and integration constraints**, with support in `docs/DECISIONS.md` or `spec/engineering_rules.md` as appropriate).
   - Flag **gaps** where the narrative promises an integration (“calls X API,” “uses Y database,” “must ship with Z SDK”) but the spec does not bind that obligation to an **ARCH-** subsystem or behavioral contract.
   - Flag **contradictions** (e.g. narrative requires Postgres; architecture says datastore open) unless explicitly recorded as a decided change.
   - If the narrative is silent and the spec correctly states **no fixed stack/API constraints**, treat as consistent; if the domain clearly needs external dependencies but neither narrative nor spec addresses them, recommend a **clarification or open question**.

For each issue found:

• describe the failure scenario
• identify the affected specification section
• recommend minimal specification improvements

Create the spec validation artifact in docs/design_reviews/ with today’s date in the filename (e.g. 2025-03-12_spec_validation.md).”

The output document should contain:

1. Executive Summary
2. Architecture Strengths
3. Findings
4. Recommended Spec Clarifications
5. Final Verdict

In Findings, include a dedicated subsection:

- Ambiguities that must be resolved into a single rule
  - Example: “unknown schema versions are rejected or routed to DLQ” must be resolved into one default rule (alternatives may be optional).