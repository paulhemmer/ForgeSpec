Perform a comprehensive specification validation pass.

Read all specification files generated for this system. The user (or the agent's environment) must provide these files: give the model access to the spec repository, or paste the contents of all files in `spec/` and `docs/`. Include the project narrative (or discovery summary) if you want narrative-coverage analysis (see analysis 6 below). This prompt may be used both for initial spec review and for reviewing spec updates (e.g. after adding features or changing requirements).

Your task is to validate the design as if performing a formal architecture review.

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