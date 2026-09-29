# AGENTS.md

## 1. Project Overview

This repository is the Finance AI Platform, an enterprise-oriented AI application for finance-related business workflows.

The platform currently focuses on two business domains:

* Expense Management
* Cost Management

The planned AI capabilities include:

1. **Invoice OCR / Multimodal Expense Agent**

   * Understand invoice images and PDFs.
   * Extract structured invoice information.
   * Analyze expense-related context.
   * Investigate potential inconsistencies or anomalies.
   * Provide evidence and recommendations for human review.

2. **Cost Data Analysis Agent**

   * Analyze cost-related business data.
   * Understand natural-language analysis requests.
   * Investigate data through approved business tools.
   * Explain analysis results and potential anomalies.

3. **Annual Financial Report Agent**

   * Gather approved financial data.
   * Organize analysis results.
   * Generate structured annual financial reports.
   * Support human review before final publication.

The system should be designed for real enterprise workflows rather than as a simple chatbot demonstration.

---

## 2. Technology Direction

The planned backend technology stack includes:

* Python 3.12
* FastAPI
* SQLAlchemy Async
* PostgreSQL
* Redis
* Alembic
* LangChain
* LangGraph
* Multimodal / Vision models
* RAG and hybrid retrieval where appropriate
* Elasticsearch / BM25 where appropriate
* Docker Compose

The frontend is planned to use:

* React
* Vite
* TypeScript

Do not assume that a planned technology or component has already been implemented. Always inspect the actual repository before referring to implementation details.

---

## 3. Core Architectural Principle

Use deterministic application code for deterministic business logic.

Use AI Agents for tasks that require interpretation, investigation, natural-language understanding, multimodal understanding, or flexible reasoning.

### Deterministic logic should remain in normal application code

Examples include:

* Financial calculations
* Tax calculations
* Budget deduction
* Permission checks
* Authentication and authorization
* Database transactions
* State transitions
* Accounting rules
* Fixed validation rules
* Final persistence of critical business states

An LLM or Agent must not replace deterministic business rules merely because the task can be expressed in natural language.

### Agents may assist with uncertain or interpretation-heavy tasks

Examples include:

* Multimodal information extraction
* Natural-language understanding
* Classification
* Anomaly investigation
* Multi-source investigation
* Policy/document understanding
* Deciding which approved information or tool is needed next
* Explaining evidence and results
* Organizing reports
* Human-in-the-loop workflows

Agents are assistants within the business workflow, not the final authority over critical business decisions.

---

## 4. Agent Safety and Business Boundaries

AI Agents must operate within explicit tool, permission, and business boundaries.

Agents must not:

* Bypass authorization or permission checks.
* Directly override deterministic business rules.
* Invent financial facts, evidence, or source data.
* Arbitrarily modify critical business states.
* Approve or reject business transactions solely because of an LLM decision.
* Change final financial amounts without deterministic backend validation.
* Perform operations outside the permissions of the current user or workflow.

When confidence is insufficient or required information is missing, the Agent should return an explicit uncertainty, request additional information, or hand the workflow to a human.

Critical business actions should be validated and persisted by normal backend logic.

---

## 5. Development Rules

Before modifying code:

1. Inspect the relevant existing files and understand the current implementation.
2. Do not assume that a file, API, function, model, database table, or workflow exists without verifying it.
3. Prefer the smallest change that correctly solves the requested task.
4. Avoid unrelated refactoring or introducing unnecessary abstractions.
5. Do not add dependencies unless they are justified by the task.
6. Preserve existing behavior unless a change in behavior is explicitly required.
7. When requirements are ambiguous or important information is missing, ask for clarification rather than inventing implementation details.

For larger tasks, first provide a concise implementation plan and identify the files that will be affected before making substantial changes.

---

## 6. Testing and Verification

Every code change should include appropriate verification.

Depending on the change, verification may include:

* Unit tests
* Integration tests
* API tests
* Type checking
* Linting / formatting
* Manual workflow verification

Do not claim that a change works unless it has been appropriately verified.

When a test fails, investigate the actual failure instead of simply changing the test to make it pass.

---

## 7. Data, Security, and Configuration

Never hardcode:

* API keys
* Passwords
* Access tokens
* Database credentials
* Private service credentials

Use environment variables or the project's configuration mechanism.

Treat financial data, employee data, invoice information, and other enterprise data as sensitive.

Do not expose sensitive information in logs, error messages, test fixtures, or API responses unless explicitly required.

AI Agents must only access business data through approved tools and permission boundaries.

---

## 8. Git and Collaboration Workflow

The `main` branch is the stable branch.

Use short-lived branches for development:

* `feature/*`
* `fix/*`
* `docs/*`

Typical workflow:

```text
Issue
  ↓
Feature / Fix branch
  ↓
Implementation
  ↓
Tests / Verification
  ↓
Push
  ↓
Pull Request
  ↓
Review
  ↓
Merge into main
```

Do not force-push shared branches.

Keep commits focused on a coherent change.

Do not mix unrelated changes into the same task or pull request.

---

## 9. Repository Accuracy

The repository itself is the source of truth for implementation details.

Do not invent:

* File structures
* APIs
* Database schemas
* Existing functions
* Existing services
* Model configurations
* Tool definitions
* Workflow nodes
* Features that have not yet been implemented

When documentation and implementation disagree, inspect the code and report the discrepancy rather than silently assuming one is correct.
