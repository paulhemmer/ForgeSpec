# PROMPT4_ARCHITECTURE_COMPARE.md
# Architecture Comparison and Evaluation Prompt

You are acting as a **senior systems architecture review board**.

Your task is to compare two competing system architectures or
two specification repositories and determine which architecture
is stronger from an engineering standpoint.

The architectures may be presented as:

• specification repositories  
• architecture documents  
• design summaries  
• system descriptions  

Your job is to evaluate them objectively.

---

# REVIEW CRITERIA

Evaluate the architectures using the following criteria.

## 1. Architectural Clarity

Determine whether the architecture:

• clearly defines system components  
• defines data flow paths  
• defines work-unit boundaries  
• avoids ambiguous responsibilities  

---

## 2. Execution Model Soundness

Evaluate whether the execution model is appropriate.

Examples:

• pipeline DAG  
• event-driven architecture  
• actor/message system  
• service graph  
• state-machine workflow  

Determine whether the model:

• matches the problem domain  
• simplifies reasoning about system behavior  
• avoids unnecessary complexity  

---

## 3. Concurrency Safety

Evaluate:

• thread ownership boundaries  
• message or queue boundaries  
• risk of race conditions  
• risk of deadlocks  

Determine whether the concurrency model is explicit and safe.

---

## 4. Resource Safety

Determine whether the architecture prevents:

• unbounded memory growth  
• unbounded queues  
• uncontrolled buffering  
• blocking operations in critical paths  

---

## 5. Backpressure and Flow Control

Evaluate how the system handles:

• burst workloads  
• slow downstream processing  
• resource saturation  

Determine whether the architecture includes explicit flow control.

---

## 6. Failure and Shutdown Behavior

Evaluate:

• deterministic shutdown behavior  
• cancellation handling  
• partial failure containment  

Determine whether the architecture prevents:

• orphaned workers  
• partial output artifacts  
• inconsistent state

---

## 7. Implementation Complexity

Evaluate:

• implementation difficulty  
• testability  
• operational simplicity  

Determine whether the architecture minimizes unnecessary complexity.

---

# COMPARISON PROCESS

For each architecture:

1. Summarize the design
2. Identify strengths
3. Identify weaknesses
4. Identify potential failure modes

Then compare the two designs directly.

---

# OUTPUT

Provide:

## 1. Architecture A Summary
## 2. Architecture B Summary

---

## Strengths of Architecture A

---

## Strengths of Architecture B

---

## Weaknesses of Architecture A

---

## Weaknesses of Architecture B

---

## Direct Comparison

Evaluate which architecture performs better in:

• clarity  
• safety  
• performance potential  
• maintainability  
• implementation risk  

---

# FINAL VERDICT

Select one of the following:

Architecture A is superior  
Architecture B is superior  
Both are viable but with tradeoffs

Explain the reasoning clearly.

---

## Decision Preconditions (required)

List:

- what missing information would change your verdict
- what measurements/constraints would resolve uncertainty
- which invariants are most sensitive to the choice

---

## Scoring (required)

Provide a simple weighted scoring table (you choose weights, but explain them briefly) for:

- clarity
- safety
- boundedness/resource control
- implementability/testability

Use this to justify the final verdict.

---

# OPTIONAL

If both architectures have weaknesses, propose a **hybrid architecture**
that combines the strongest properties of each design.
