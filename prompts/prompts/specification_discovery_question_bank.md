# Specification Discovery Question Bank

This document contains a set of **architectural discovery questions** that an AI assistant
should use during the Specification Discovery phase.

These questions help extract the architectural rules that define how a system behaves.

They are grouped by topic so the discovery process can move systematically.

---

# 0. How to Use This Question Bank (Important)

- If an answer is “bounded/limited/throttled,” follow up until you have:
  - an explicit parameter (number/limit) or a precise rule
  - overflow behavior
  - a single owning component
- If the system has a primary “thing that moves through it” (request/message/job/event/task), identify its **lifecycle** (states + transitions) early.

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

# 10.5 State transitions / lifecycle (domain-agnostic)

- What is the primary work unit (request/message/job/event/task/record) in this system?
- What are its states (e.g. pending/in-progress/done/failed/cancelled/dlq)?
- What triggers each transition?
- Which component owns each transition?
- Which state is durable vs ephemeral?
- What does “done” mean (observable, durable criteria)?

---

# 10.6 Policy parameters (no “bounded” without a rule)

- What are the queue/buffer bounds (capacity targets) and what happens when full?
- What is the retry policy (max attempts, retryable vs permanent criteria, backoff)?
- What is the retention policy (key, duration, cleanup behavior) and how does it interact with replay/backfill?
- What is the rate limit/quota strategy (per-tenant/per-user/per-resource), and what happens when exceeded?
- If schema/versioning exists: what is the default rule for unknown versions?

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

Optional but **strongly recommended** whenever the user cares *how* the system will be built or *what* it must integrate with. Use to capture preferences and **hard constraints** so generate_spec can record them in `docs/ARCHITECTURE.md`, `docs/DECISIONS.md`, `spec/engineering_rules.md`, or `docs/AI_CONTEXT.md` (required vs recommended vs open).

If the user has not mentioned language, libraries, or external APIs yet, **ask explicitly** whether they want to lock any of these in now or leave them open.

## Language, runtime, and stack

- Do you have a preferred **programming language**, **runtime** (e.g. JVM, Node, .NET), or **deployment shape** (containers, serverless, bare metal), or should the spec remain implementation-agnostic?
- Are there constraints (existing systems, team skills, org standards, regulated environments) that **rule out** certain stacks?

## Third-party libraries and packages

- Which **libraries, frameworks, or packages** are **required** (names and, if known, major version or version range)?
- Which are **preferred but substitutable** vs **hard dependencies** (e.g. “must use org-approved X”)?
- Are there **forbidden** dependencies (license, security policy, supply-chain rules)?
- For each required library: **what architectural obligation does it carry** (ORM owns schema migrations, HTTP client owns timeouts, etc.)?

## External APIs, SaaS, and partner systems

- Which **external HTTP/gRPC APIs**, **cloud vendor APIs**, **webhooks**, or **SaaS products** must the system call or receive traffic from?
- For each: **authentication model** (API key, OAuth, mutual TLS, IAM role), **rough rate/limit expectations**, and **failure behavior** if the dependency is down or slow?
- Are any APIs **contractually versioned** or **subject to deprecation** that the architecture must plan for?

## SDKs, drivers, and protocol stacks

- Are specific **client SDKs**, **database drivers**, **message-broker clients**, or **observability agents** mandated?
- Must the system support **multiple implementations** of the same boundary (e.g. swap broker vendor) or is one vendor fixed?

## Data stores and managed services (when chosen)

- If the user has already chosen **Postgres**, **Redis**, **Kafka**, **S3**, etc.: capture **which subsystem owns** that dependency and whether the spec must treat it as **replaceable** or **fixed**.

## Summary for handoff

- Ask the user for a short **bullet list** of “must use / must integrate / must not use” if anything in this section applies—discovery output should carry that list forward to **PROJECT NARRATIVE** and **Decision Capture** so **Generate Spec** does not drop it.

---

# 15. Assumption Testing and Pre-Mortem

- Which assumption in the current design is most likely to be wrong?
- If this architecture fails in production in the first 30 days, what is most likely to break first?
- Which subsystem boundary is most likely to hide coupling that is not yet documented?
- What behavior currently depends on an unwritten rule?
- What is the most likely source of scope creep in this design?
- If one ownership decision is wrong, which one would cause the widest system-level damage?
- What are two credible alternative designs for the highest-risk boundary, and why are we not choosing them?
- What evidence or constraint would falsify the current preferred design?
- Where could local optimization create a global inconsistency?
- Which edge case is most likely to pass basic tests but violate an invariant under real load?

---

# 16. Security and Trust (requirements and boundaries)

Use this section when the system is **exposed to untrusted input**, **reachable over a network** (including APIs, web, mobile, or cloud control planes), **handles identities or permissions**, **stores or processes sensitive data**, or **serves multiple tenants or organizations**. Skip or shorten only when the narrative explicitly scopes the system to a fully trusted, non-networked, single-actor context.

The goal is not to replace specialized security design or threat modeling; it is to **surface security-relevant requirements early** so architecture and specifications can record them alongside correctness and failure behavior.

## Trust and actors

- Who or what is **trusted** versus **untrusted** at each boundary (end users, admins, partner systems, devices, internal services)?
- What are the **principal types** (human user, service account, device, anonymous) and how are they represented?
- Are there **separate privilege levels** (e.g. operator vs. end user) and what can each class do?

## Authentication and session lifecycle

- How are callers **authenticated** (if at all): passwords, API keys, OAuth/OIDC, mutual TLS, platform identity, other?
- How are **sessions or tokens** issued, renewed, and revoked? What is the **session timeout** or equivalent policy?
- What happens on **credential compromise** or forced logout (revocation model, if any)?

## Authorization

- What **authorization model** applies: role-based, attribute-based, resource policies, ownership checks, or a mix?
- Where are **permission decisions** enforced (which components are authoritative)?
- Are there **object-level** rules (e.g. “user A may only access resource R”) and how is **enumeration** prevented where it matters?

## Network exposure and surface area

- Which interfaces are **public internet**, **partner/VPN**, **internal VPC only**, or **localhost**?
- What is the **attack surface**: REST/GraphQL, WebSockets, gRPC, mobile apps, CLI, webhooks, file uploads?
- Are **rate limits, abuse controls, or bot mitigation** required for any path?

## Data protection

- What data is **personally identifiable**, **financial**, **health**, **credentials**, or otherwise **regulated** (even if only “might be later”)?
- What are the rules for **data at rest** (encryption expectations, key custody) and **data in transit** (TLS version expectations, certificate pinning for mobile if relevant)?
- Where may **secrets** live (vault, managed identity, env vars) and what **rotation** expectations exist?

## Client and supply-chain context (when relevant)

- For **web or mobile clients**: how are tokens or secrets **stored** on device/browser; what **same-origin** or **deep link** assumptions apply?
- For **dependencies and CI/CD** (if in scope): are there expectations for **pinned versions**, **SBOM**, or **signed artifacts**?

## Abuse, safety, and observability

- What **abuse cases** matter (credential stuffing, replay, IDOR, injection into logs or downstream systems, denial of service)?
- What **security-relevant events** must be **auditable** (authentication failures, permission denials, admin actions, data export)?
- What **must not** appear in logs (raw secrets, full payment payloads)?

## Explicit non-goals (when useful)

- What security properties are **explicitly out of scope** for this system or phase (e.g. “no public API in v1”), so the team does not assume silent coverage?

---

# Using the Question Bank

During Specification Discovery, the AI should:

1. Ask questions from each category. If the system is networked or distributed, include the networking section. If the system exposes APIs, handles identities, processes sensitive data, or spans trust boundaries, include the **security and trust** section (section 16). If the user wants to capture implementation context or get language/stack suggestions, include the **implementation context** section (section 14)—including **third-party libraries** and **external APIs/SaaS** when the narrative implies integrations or when the user may have unstated dependency preferences.
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

