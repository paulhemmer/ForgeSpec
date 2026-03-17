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
• Affected specification section  
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

# Edge Case Analysis

Consider scenarios such as:

• burst workloads  
• slow downstream consumers  
• partial stage failure  
• cancellation during processing  

---

# Final Recommendation

Recommended next steps before implementation begins.
