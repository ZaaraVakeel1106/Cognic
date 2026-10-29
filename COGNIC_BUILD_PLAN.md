
COGNIC — Build Plan
Feature-by-feature hackathon implementation plan | 29 October–3 November 2026

Local-first • Ollama + Llama 3.2 3B • No paid API • Feature-by-feature Git checkpoints

Shared source of truth for Codex. Work one feature at a time, test each slice, avoid unrelated refactors, and do not commit/push without user review.

1. Executive decision
Product definition
Cognic is a project-aware learning studio that turns a real codebase into an interactive learning environment. Core loop: import project → explore architecture → learn a concept grounded in source → attempt practice → receive progressive feedback → review.

Positioning
Do not present Cognic as a generic chatbot, course catalogue, or code-summary tool. The key promise is that the codebase becomes the curriculum and the product checks whether the learner can independently explain, trace, or debug what they saw.

Deadline
Target feature freeze on 3 November. Meta's public event page lists submissions due 4 November at 9 PM ET. Finish a day early and verify the portal's exact deliverables before submission.

Cost constraint
Windows local development. Ollama and Llama 3.2 3B are already installed/downloaded. Use local inference at http://localhost:11434. No Meta API key, payment card, paid API fallback, or automatic large-model downloads.

2. Careful review of the proposal
Strongest differentiator
A connected loop: architecture → source-linked lesson → prediction/trace/debug practice → explain-back → revision. Every feature must support this learning loop.

Credibility
Use static parsing for structural facts and the LLM for explanations. Link to file paths and line ranges when possible. Separate parser-established facts from AI-inferred interpretations; never present guesses as verified facts.

Risks
Feature sprawl; decorative graph; generic lessons without source links; fake buttons; invented code facts; executing uploaded code; and polishing screens before the core workflow works.

Scope reduction
The proposal is a product vision, not a six-day implementation checklist. For this sprint: ZIP import, Python-first AST analysis, useful graph, one high-quality source-grounded lesson, one practice loop, and local mentor. Other languages may appear in the file tree but must be labelled unsupported/best-effort.

3. MVP and acceptance criteria
End-to-end journey
Import a small Python project ZIP → see searchable file tree and analysis summary → explore graph with evidence-backed nodes/edges → select a real function → receive a structured lesson with source references → complete a prediction/debug task → receive local-model feedback → see saved attempt/progress.

Import and analysis
ZIP upload only. Block path traversal; cap archive expansion, file count and file size; skip binaries, secrets, generated output and dependency folders; show coverage warnings. Never execute imported code.

Architecture explorer
Start with parser-backed files/imports/symbols. Every edge has a defined type and evidence. Add search, focus and selected-node details. Avoid hallucinated runtime flows and graph hairballs.

Learning studio
Structured lesson: objective, prerequisite, mental model, how the selected code works, source evidence, edge cases, and a short check for understanding. Validate generated source references.

Practice lab
Start with predict behavior/output and explain/debug a snippet. Use progressive hints and reveal full explanation after an attempt. Do not execute arbitrary uploaded code.

Mentor and progress
Start with Teach Me and Hint; add Debug With Me or Interview Me only if time remains. Send relevant code, not the entire repository. Keep minimal local attempt history; no database unless necessary.

Done means
Fresh local run completes import → graph → source-linked lesson → practice → feedback → progress. Loading, empty, error and success states work. README has exact Windows commands. Core tests pass.

4. UI/UX: non-generic by design
Design principle
Build a crafted interactive developer-learning studio, not a generic SaaS dashboard or chat-first page. Avoid giant gradient hero, identical card rows, decorative charts and inert controls.

Workspace concept
Persistent project rail; central architecture canvas/source panel; contextual lesson/practice inspector; compact mentor panel that retains selected file, symbol, lesson and task context.

Visual language
Deep-ink base, restrained electric violet, mint and warm amber accents, strong typography, generous spacing, readable code, accessible contrast, subtle transitions. Palette is a guide, not an excuse to sacrifice accessibility.

Watermelon UI
Use Watermelon UI as a source of React/Tailwind components, blocks and interaction patterns. Its current framework page lists Vite + React support with Tailwind CSS v4 and shadcn/ui primitives. Adapt components into one coherent Cognic design system; verify compatibility, license and attribution. Do not blindly paste an unrelated template.

Interactions that teach
Graph nodes open source; selecting a symbol updates lesson context; guided flow highlights one verified edge at a time; hint reveals are progressive; completed tasks update the learning map. Animation must communicate state or cause-and-effect.

UI acceptance
Manually test each feature in-browser. No fake AI responses, dead buttons, placeholder charts, unlinked source references or controls implying unfinished functionality.

5. Recommended architecture
Frontend
React + TypeScript + Vite; Tailwind CSS v4; Watermelon UI selectively; React Flow for graph; Monaco only if installation is clean and time permits. A lighter code viewer is acceptable.

Backend
FastAPI + Pydantic modular monolith: ZIP intake, filtering, Python AST analysis, graph construction, lesson generation, practice, Ollama client and local progress.

Static analysis
Python AST for modules, imports, functions, classes and selected relationships. Preserve file/line evidence. Do not claim static analysis proves runtime behavior.

AI
Ollama local HTTP API; configurable OLLAMA_BASE_URL and OLLAMA_MODEL. Keep prompts small and structured. Validate output and fail visibly rather than inventing content.

Privacy
Repository contents are untrusted. Never execute code during ingestion. Limit archives and context. Detect likely secrets and exclude them from model context. Do not expose Ollama publicly.

Tests
ZIP traversal rejection, ignored files, AST extraction, graph evidence, malformed model output, Ollama unavailable/timeouts, and the lesson/practice path.

6. Day-by-day plan
Thu 29 Oct — Plan, scaffold, visual foundation
Confirm demo repository and primary language. Create Git repo, README, plan and baseline ignore rules. Scaffold frontend/backend, distinctive app shell/navigation/design tokens, health endpoint and Ollama status check. Verify model response through backend. Commit: chore: scaffold Cognic workspace.

Fri 30 Oct — Feature 1: import and analysis
ZIP upload, safeguards, filtering, file/language inventory, Python AST parsing, symbol list and line ranges. Create sample ZIP fixture and tests. Build progress/error states. Commit: feat: safe project import and Python analysis.

Sat 31 Oct — Feature 2: architecture graph
Build graph from parser-backed files/imports/symbols. Add search, focus, selected-node details and source viewer. Verify edge provenance and visual usability. Commit: feat: interactive evidence-backed architecture explorer.

Sun 1 Nov — Feature 3: learning studio
Generate a structured lesson for selected function/file using relevant context and local Llama. Show source references, loading/error states and follow-up questions. Validate references. Commit: feat: source-grounded lesson generation.

Mon 2 Nov — Feature 4: practice, mentor, progress
Implement prediction and explain/debug exercises, progressive hints, final feedback, Teach Me/Hint mentor and minimal local history. Verify actual Ollama integration. Commit: feat: practice and mentor learning loop.

Tue 3 Nov — Polish and freeze
Fix critical bugs, run full flow from fresh start, improve empty/error/loading states, accessibility and responsive layout, run tests, update README/architecture notes, record backup demo, verify GitHub and submission. No major features after midday. Commit: chore: harden demo and submission readiness.

7. Feature-by-feature Git workflow
Before a feature
Run git status and inspect branch. Do not overwrite uncommitted work. Use a feature branch or one clearly named working branch depending on repository setup.

After a feature
Run targeted tests and manual browser/API check. Review git diff/status. Commit only the completed slice. Push after confirming remote and target branch.

Commit sequence
chore: scaffold Cognic workspace; feat: safe project import and Python analysis; feat: interactive evidence-backed architecture explorer; feat: source-grounded lesson generation; feat: practice and mentor learning loop; chore: harden demo and submission readiness.

Safety
Never commit .env, credentials, local model files, private uploads or secrets. Verify .gitignore before first push. No force pushes or history rewrites.

8. Codex free-limit discipline
One task per prompt
Do not paste the whole proposal into every Codex turn. Save this plan as COGNIC_BUILD_PLAN.md and stable rules as AGENTS.md. Each prompt should reference the plan and ask for one bounded deliverable.

Prompt size
Aim for about 150–300 words per implementation prompt. Avoid repeated architecture summaries, unrelated refactors and asking Codex to regenerate completed files.

Task contract
Each prompt names goal, allowed area, acceptance criteria, tests, and required short report. Ask Codex to inspect existing code first and leave unrelated areas unchanged.

Checkpoint loop
One prompt → implement → review diff/test output → fix only specific failures → commit/push → next feature. Do not bundle import, graph, AI, practice and polish into one huge task.

When stuck
Ask for exact failing command and smallest fix. Do not restart or rewrite the project. Keep a short HANDOFF.md with status, tests, known issues and next task.

9. Hackathon compliance checkpoint
Publicly confirmed
Meta's public event page lists an Indie Developer track for individual builders/students, judged on creativity, technical ambition and whether it works. Theme options are Build for Your World and Push the Frontier. Public page says submissions are due 4 Nov at 9 PM ET and selected participants must accept official rules.

Model
User-shared rule says eligible Meta open-weight models including Llama can run on participant-provided compute. Plan uses local Ollama + Llama 3.2 3B and no paid Meta API. Before submission verify exact model/version and any attribution, disclosure, demo, repo or use restrictions in the full participant rules.

Theme
Build for Your World is the strongest fit: firsthand problem of AI-assisted coding producing working software that the builder cannot confidently explain.

Submission portal
Verify exact deliverables, track, demo URL/video, repo visibility, model eligibility and disclosures in the participant portal. Do not assume public deployment is mandatory.

Reference
Official event page: https://dev.meta.ai/events/global-hackathon. Team proposal: Project_Aware_Learning_Studio_Team_Proposal(1).pdf. Participant portal rules remain the authority for full compliance.

10. Decisions to confirm
Demo repository
Choose a small, authorized Python project with a clear entry point and meaningful imports/functions. Prefer a project the team can explain. Avoid a large/private repo as the first fixture.

Primary stack
Guarantee quality for Python first. Other file types may appear in the tree but should be labelled unsupported/best-effort rather than pretending universal support.

Watermelon UI
Use Watermelon components/MCP guidance only where it helps and does not destabilize Vite/Tailwind. Add dependencies deliberately.

Full rules
Keep the official rules/portal details available so model eligibility and submission requirements are verified, not inferred.

11. First Codex prompt — scaffold only
Prompt
Read COGNIC_BUILD_PLAN.md and AGENTS.md if present. Inspect the current repository. Implement only Day 1: minimal React + TypeScript + Vite frontend and FastAPI backend; a distinctive responsive Cognic workspace shell and design tokens; backend health endpoint; and Ollama connectivity/model-status check for http://localhost:11434 using llama3.2:3b. Do not implement ZIP import, graph, lessons, practice or unrelated features yet. Keep UI intentional and non-generic; use Watermelon UI selectively only if compatible with Vite/Tailwind. No paid APIs, Meta API keys, card requirements, Docker, or database. Add README Windows setup commands and .env.example without secrets. Run relevant tests and report changed files, commands, results and blockers. Do not commit/push automatically; report Git commands for review.

⋮⋮⋮⋮