# Architecture Design Review

Project:
Date:
Reviewer:

---

# Executive Summary

Brief summary of the architecture and overall assessment.

Verdict:

[ ] Ready for implementation  
[ ] Minor clarifications required  
[ ] Significant design issues  
[ ] Architecture redesign recommended

---

# Architecture Overview

Describe the system architecture at a high level.

Include:

• execution model  
• system components  
• work unit flow  
• concurrency model  
• **technology and integration constraints** (required languages/libraries, external APIs/SaaS, forbidden dependencies—or explicit “open / none specified”)

---

# Strengths

Identify strong aspects of the architecture.

Examples:

• clear stage boundaries  
• bounded resource usage  
• deterministic shutdown model  
• well-defined work units  

---

# Issues Identified

List design issues discovered during review.

For each issue include:

• Description  
• Risk level (Low / Medium / High)  
• Affected spec section  
• Suggested correction  

---

# Concurrency Safety Review

Evaluate:

• thread ownership boundaries  
• queue ownership  
• race-condition risks  
• blocking operations  

---

# Resource Bound Analysis

Confirm:

• bounded queues  
• bounded memory growth  
• explicit backpressure behavior  

---

# Failure Handling

Evaluate:

• cancellation handling  
• shutdown ordering  
• partial failure containment  

---

# Security and Trust Boundaries (when applicable)

Use when the system exposes network interfaces, handles identities or permissions, processes sensitive data, or spans multiple trust zones. If none of these apply, note “not applicable” with one line of rationale.

Evaluate:

• trust boundaries and principal types (who is authenticated vs. anonymous)  
• authentication and session/token lifecycle at a high level  
• authorization model and where enforcement is authoritative  
• sensitive data handling, encryption in transit/at rest expectations, and secret custody (as specified)  
• public vs. internal surface area; abuse and rate-limit expectations if stated  
• security-relevant observability (audit events, safe logging) and explicit security non-goals if documented  

Flag **gaps** where the narrative implies exposure or sensitive data but the spec is silent on the corresponding obligation.

---

# Execution Graph Analysis (if applicable)

Verify (for the chosen execution model):

• correct stage ordering  
• no cyclic dependencies  
• valid queue topology  
• backpressure propagation  

---

# Policy Parameters and Lifecycle (must be explicit)

Confirm:

• any “bounded/limited/throttled/retry/backoff/retention” statement includes a parameter or rule, overflow behavior, and an owner  
• the primary work unit has a lifecycle/state model (states + transitions + ownership)  
• each invariant has an enforcement point and at least one test/validation strategy

---

# Traceability (`docs/TRACEABILITY.md`)

Confirm:

• `docs/TRACEABILITY.md` exists and lists every **ARCH-**, **SPEC-**, **SPEC-INV-**, **TASK-**, and **TEST-** ID used in the spec repository  
• **Upstream/Downstream** columns support **ARCH → SPEC → TASK → TEST** without orphan tasks or orphan tests  
• completing a phase or acceptance gate would have a clear place to record **Status** and **Evidence** on the relevant rows  

---

# Edge Case Analysis

Consider scenarios such as:

• burst workloads  
• slow downstream consumers  
• partial stage failure  
• cancellation during processing  

---

# Final Recommendation

Recommended next steps before implementation begins.
