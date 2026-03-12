# Specification Discovery Question Bank

This document contains a set of **architectural discovery questions** that an AI assistant
should use during the Specification Discovery phase.

These questions help extract the architectural rules that define how a system behaves.

They are grouped by topic so the discovery process can move systematically.

---

# 1. System Purpose

- What problem does the system solve?
- Who or what are the producers of data?
- Who or what are the consumers of system output?
- What is the expected scale of the system?
- Is the system batch, streaming, or hybrid?

---

# 2. Inputs and Outputs

- What are the inputs to the system?
- Are inputs guaranteed to be valid?
- Can inputs arrive more than once?
- Can inputs arrive out of order?
- Are inputs time-sensitive?
- What outputs must the system produce?
- Are outputs allowed to be delayed?

---

# 3. Subsystem Boundaries

- What are the major subsystems?
- Which subsystem receives external input?
- Which subsystem performs processing?
- Which subsystem stores durable state?
- Which subsystem communicates with external systems?
- Which subsystem coordinates retries?

---

# 4. State Ownership

- Which components hold durable state?
- Can workers maintain local state?
- Is the system designed to be stateless?
- Where is the authoritative source of truth?
- Can state exist in multiple places simultaneously?

---

# 5. Failure Handling

- What happens if a worker crashes mid-task?
- What happens if the system loses network connectivity?
- What happens if storage becomes unavailable?
- What happens if a queue fails temporarily?
- What happens during system restart?
- What happens during graceful shutdown?

---

# 6. Retry Behavior

- Which subsystem owns retry logic?
- Can retries occur in multiple layers?
- What retry strategy is used?
- Is retry backoff required?
- How many retries are allowed?
- What happens after retries are exhausted?

---

# 7. Concurrency

- Can multiple workers process the same task?
- Can operations execute concurrently?
- Is ordering required for correctness?
- Are tasks independent?
- Can race conditions occur?

---

# 8. Idempotency

- Can tasks be executed more than once?
- Are operations idempotent?
- How does the system prevent duplicate side effects?
- Where does deduplication occur?

---

# 9. Persistence Guarantees

- When is data considered durable?
- What happens if persistence fails?
- Are writes atomic?
- Is partial state allowed?
- What consistency guarantees are required?

---

# 10. System Invariants

- What conditions must always remain true?
- What conditions would indicate corruption?
- What conditions would indicate data loss?
- What conditions must never occur?

Examples:

- A job must never execute twice.
- Data must never be partially written.
- Events must never disappear without record.

---

# 11. Operational Constraints

- What is the expected throughput?
- What latency requirements exist?
- How should the system scale?
- What monitoring is required?
- What metrics indicate system health?

---

# 12. Networking

Use this section when the system is networked or distributed (multiple nodes, services, or processes communicating over a network).

- How do subsystems communicate? (in-process, RPC, message queue, event stream, etc.)
- Are there required or preferred protocols? (HTTP, gRPC, custom, async messaging)
- Are components co-located or distributed? Single region or multi-region?
- What happens if the network partitions or connectivity between components is lost? Which boundaries are affected?
- How do components find or address each other? (static config, service discovery, etc.)
- How does the system handle slow consumers or network saturation? Is backpressure explicit?
- Are there requirements for encryption (e.g. TLS), authentication, or authorization on communication paths?

---

# 13. Evolution and Maintenance

- How will new features be added?
- Can subsystems evolve independently?
- Can implementations be replaced without changing architecture?
- What interfaces must remain stable?

---

# 14. Implementation context

Optional. Use to capture preferences or constraints that will influence implementation; the spec itself remains implementation-agnostic unless the user wants language/stack noted.

- Do you have a preferred programming language, runtime, or technology stack, or should the spec remain implementation-agnostic?
- Are there constraints (e.g. existing systems, team skills, deployment environment) that should influence language or stack choices?
- Would you like the discovery output to include brief, architecture-informed implementation options (e.g. common choices for this kind of system) for later use?

---

# Using the Question Bank

During Specification Discovery, the AI should:

1. Ask questions from each category. If the system is networked or distributed, include the networking section. If the user wants to capture implementation context or get language/stack suggestions, include the implementation context section.
2. Record answers.
3. Extract system invariants.
4. Propose subsystem boundaries.
5. Summarize the emerging architecture.

Once the architecture stabilizes, the system can move into the ForgeSpec workflow:

Architecture  
↓  
Specifications  
↓  
Implementation

