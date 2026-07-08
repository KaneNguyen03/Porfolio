import type { BlogPost } from "../types/blog";

export const blogPostsEn: BlogPost[] = [
	{
		slug: "event-driven-aws-sqs-lambda",
		title: "Migrating from EventEmitter2 to AWS SQS + Lambda",
		date: "2025-10-15",
		tags: ["aws", "nodejs", "architecture"],
		excerpt:
			"How I migrated an internal event system from in-process EventEmitter2 to a scalable AWS SQS + Lambda event-driven architecture, reducing latency spikes and improving reliability.",
		overview:
			"At Cigro, our EveryTalk and Uobong platforms relied on EventEmitter2 to process internal events — IAP purchase webhooks, subscription changes, chat notifications — synchronously in the same Node.js process. Under real traffic (thousands of IAP webhooks during peak hours), the single-process event loop started to starve, causing latency spikes and occasional dropped events. I led the migration of this internal event system to AWS SQS + Lambda to decouple event production from consumption and make the pipeline horizontally scalable.",
		architecture: {
			summary:
				"The new pipeline separates event production, buffering, and processing into independently scalable stages instead of one synchronous in-process call chain.",
			components: [
				{
					name: "Event Producer (API Server)",
					description:
						"The Node.js API server publishes domain events (IAP purchase confirmed, subscription renewed, chat message sent) to SQS instead of invoking handlers directly in-process.",
				},
				{
					name: "SQS Queue",
					description:
						"Buffers events durably, absorbing traffic spikes and immediately freeing the API server from waiting on downstream processing.",
				},
				{
					name: "Lambda Consumer",
					description:
						"Auto-scales with queue depth — no manual provisioning — and processes events independently of the request/response cycle that created them.",
				},
				{
					name: "Dead-Letter Queue",
					description:
						"Captures events that fail processing after repeated retries, so failures are visible and replayable instead of silently dropped.",
				},
			],
			diagram:
				"flowchart LR\n    A[Event Producer<br/>API Server] -->|SendMessage| B[SQS Queue]\n    B -->|poll| C[Lambda Consumer]\n    C -->|3x fail| D[Dead-Letter Queue]",
		},
		implementation: [
			"Mapped every EventEmitter2 listener to an explicit event type/payload contract, since the old system relied on implicit shared memory and loosely typed payloads.",
			"Replaced synchronous `emitter.emit()` calls in the API layer with SQS `SendMessage` calls, keeping the API response path free of event-processing latency.",
			"Wrote a Lambda handler per event type with idempotent processing logic (since SQS guarantees at-least-once delivery, not exactly-once), and configured a redrive policy to a dead-letter queue after 3 failed attempts.",
			"Rolled the migration out incrementally behind a feature flag, running both systems in parallel for one release cycle to compare event counts and catch discrepancies before fully cutting over.",
		],
		results: [
			"P99 latency on the API endpoints that used to emit events synchronously dropped from ~1200ms to ~200ms, since the API no longer waits on event processing.",
			"Zero data loss observed during traffic spikes, since SQS durably buffers events instead of relying on in-memory state.",
			"Debugging improved significantly — each Lambda invocation logs independently to CloudWatch, making it easy to trace a single event's processing history instead of digging through a shared process log.",
		],
	},
	{
		slug: "typescript-utility-types",
		title: "Essential TypeScript Utility Types for Cleaner Code",
		date: "2025-08-20",
		tags: ["typescript", "frontend"],
		excerpt:
			"A practical guide to TypeScript utility types like Partial, Pick, Omit, Record, and conditional types that make your codebase more maintainable.",
		overview:
			"This is a general engineering-practice note rather than a specific project write-up — a set of TypeScript utility-type patterns I reach for constantly across the codebases I work in, from the portfolio site's own typed data layer to service-layer DTOs at Bizzi. Utility types eliminate boilerplate and encode constraints at the type level instead of leaving them as tribal knowledge in comments.",
		architecture: {
			summary:
				"Rather than an infrastructure diagram, this post's \"architecture\" is about how utility types compose across layers of a typical service — from raw domain models down to the narrower shapes each layer actually needs.",
			components: [
				{
					name: "Domain Model",
					description:
						"The full, authoritative shape of an entity (e.g. a User with all fields, including sensitive ones like password hashes).",
				},
				{
					name: "Partial<T> — Update DTOs",
					description:
						"Makes all properties optional, matching the shape of a PATCH request body where only changed fields are sent.",
				},
				{
					name: "Pick<T, K> / Omit<T, K> — API Response Shapes",
					description:
						"Pick selects only the fields a client needs; Omit excludes fields that should never leave the server (passwords, internal flags).",
				},
				{
					name: "Record<K, T> — Lookups & Configs",
					description:
						"Maps a fixed set of keys to a consistent value shape — used heavily for this site's own strings.ts translation dictionary and feature-flag configs.",
				},
			],
		},
		implementation: [
			"`Partial<T>` for update DTOs: `interface User { name: string; email: string; age: number; } type UpdateUser = Partial<User>;` — every field becomes optional, matching a real-world PATCH payload.",
			"`Pick` and `Omit` for response shaping: `type PublicUser = Omit<User, 'email' | 'password'>; type UserPreview = Pick<User, 'name' | 'age'>;` — enforces at compile time that sensitive fields never leak into a public response type.",
			"`Record<K, T>` for exhaustive lookups: used for this portfolio's own `Record<Language, Strings>` dictionary, which forces both the `en` and `vi` locale objects to satisfy the exact same `Strings` interface — a missing key in either language fails the build instead of failing silently at runtime.",
			"Conditional types for narrowing: combining `Extract`/`Exclude` with union types to constrain function parameters to a valid subset without duplicating the union definition.",
		],
		results: [
			"Fewer runtime validation checks needed, since invalid shapes are caught at compile time instead of production.",
			"API response types and DTOs stay in sync with domain models automatically — updating a base interface propagates to every derived type instead of requiring manual edits in multiple places.",
			"The `Record<Language, Strings>` pattern specifically caught several missing translation keys during this site's own EN/VI rollout before they ever reached the browser.",
		],
	},
	{
		slug: "rag-pipelines-langchain",
		title: "Exploring RAG Pipelines with LangChain — A Self-Study Deep Dive",
		date: "2025-07-10",
		tags: ["ai-agents", "nodejs", "architecture"],
		excerpt:
			"A self-directed deep dive into building a Retrieval-Augmented Generation pipeline in Node.js using LangChain, vector stores, and OpenAI embeddings — exploratory learning, not production work.",
		overview:
			"This post documents independent, self-directed study — not a client or employer project. I wanted to understand how Retrieval-Augmented Generation (RAG) systems actually work end-to-end, so I built a small Node.js proof-of-concept using LangChain, a vector store, and OpenAI embeddings on a personal dataset. None of this is part of my production work at Bizzi, Cigro, or earlier roles; it's exploratory learning to understand a technology pattern I hadn't used professionally.",
		architecture: {
			summary:
				"A minimal RAG pipeline has three stages: ingest and embed source documents, retrieve relevant chunks for a query, then generate an answer grounded in those chunks.",
			components: [
				{
					name: "Document Ingestion",
					description:
						"Splits source documents into overlapping chunks (I used ~500-1000 tokens with ~50-token overlap) small enough to embed meaningfully but large enough to retain context.",
				},
				{
					name: "Embedding + Vector Store",
					description:
						"Each chunk is embedded via OpenAI's embeddings API and stored in a vector database for nearest-neighbor search.",
				},
				{
					name: "Retriever",
					description:
						"On a query, embeds the query text and performs a similarity search against the vector store to pull back the most relevant chunks.",
				},
				{
					name: "LLM Generation",
					description:
						"Feeds the retrieved chunks plus the original query into an LLM prompt, grounding the generated answer in the retrieved source material instead of the model's training data alone.",
				},
			],
			diagram:
				"flowchart LR\n    A[Document Ingestion] --> B[Embedding + Vector Store]\n    B --> C[Retriever]\n    C --> D[LLM Generation]",
		},
		implementation: [
			"Set up LangChain.js as the orchestration layer connecting document loaders, the embedding step, and the retrieval + generation chain.",
			"Chunked source documents at ~500-1000 tokens with ~50-token overlap — small chunks lost context, very large chunks diluted retrieval relevance.",
			"Stored embeddings in a vector store and experimented with hybrid search (combining vector similarity with keyword matching) to catch edge cases pure vector search missed.",
			"Added a reranking step after initial retrieval, which noticeably improved answer relevance over naive top-k vector search alone.",
		],
		results: [
			"Confirmed hybrid search (vector + keyword) catches queries that pure semantic search misses — a useful lesson even outside this specific stack.",
			"Reranking after retrieval measurably improved answer quality, worth the added latency for use cases where accuracy matters more than raw speed.",
			"This remains exploratory/self-study work — I have not shipped a RAG system in a production role, and this post should be read as a learning log, not a claim of professional RAG experience.",
		],
	},
	{
		slug: "nestjs-grpc-microservices",
		title: "NestJS + gRPC: Building a Microservice Auth System",
		date: "2025-05-05",
		tags: ["typescript", "architecture"],
		excerpt:
			"How I built a standalone gRPC-based authentication service for BMCMS using NestJS, protobuf definitions, and inter-service communication patterns.",
		overview:
			"As lead developer on the Building Maintenance and Crack Monitoring System (BMCMS) — a university capstone project I led with full SDLC ownership — I needed an authentication service that multiple internal microservices could call without the overhead of HTTP/JSON for every internal call. I built a standalone gRPC-based auth service using NestJS and protobuf definitions, alongside the system's broader microservices architecture (React frontend, NestJS API, PostgreSQL, Redis, RabbitMQ, and an Ultralytics-based AI service for automated crack detection).",
		architecture: {
			summary:
				"BMCMS follows a microservices layout with a dedicated gRPC auth service sitting behind the main API gateway, mirroring the architecture also shown in this site's Projects page for the same system.",
			components: [
				{ name: "React Frontend", description: "The client application consumed by building maintenance staff and admins." },
				{ name: "NestJS API", description: "The main HTTP API gateway that frontend requests hit first." },
				{ name: "Auth gRPC", description: "A standalone NestJS microservice exposing login/token-validation over gRPC, called internally by the API gateway and other services." },
				{ name: "PostgreSQL", description: "Primary relational store for user, building, and maintenance-ticket data." },
				{ name: "Redis", description: "Backs OTP session state for email-verification flows with short-lived, fast-expiring keys." },
				{ name: "RabbitMQ", description: "Handles asynchronous inter-service messaging outside the synchronous gRPC auth path." },
				{ name: "Ultralytics AI", description: "Runs automated crack detection on uploaded building images, deployed on AWS Lambda." },
				{ name: "AWS EC2 / Docker", description: "Hosts the containerized services for deployment." },
			],
			diagram:
				"flowchart TD\n    A[React Frontend] --> B[NestJS API]\n    B --> C[Auth gRPC]\n    B --> D[PostgreSQL]\n    B --> E[Redis]\n    B --> F[RabbitMQ]\n    B --> G[Ultralytics AI]\n    G -->|writes back| E\n    A -->|deployed on| H[AWS EC2 / Docker]",
		},
		implementation: [
			"Defined a `.proto` service contract with `Login`, `ValidateToken`, and `RefreshToken` RPCs, giving every consuming service a strongly-typed client generated from the same schema.",
			"Implemented the NestJS microservice using `@nestjs/microservices`'s gRPC transport, keeping the auth logic isolated from the main API's HTTP concerns.",
			"Built the OTP email-verification flow on top of Redis, storing short-lived verification codes with TTL expiry instead of a persistent table.",
			"Containerized the auth service separately from the main API with Docker, deployed both to AWS EC2 alongside the RabbitMQ broker and Ultralytics AI Lambda functions.",
		],
		results: [
			"Chose gRPC over REST for inter-service auth calls specifically for its protobuf-enforced typing and HTTP/2 multiplexing — trading the simplicity of plain REST for stronger contracts and lower latency between internal services.",
			"Isolating auth as its own gRPC microservice made it straightforward to reason about and test independently of the rest of the API surface.",
			"The main trade-off: gRPC-web would require an extra proxy layer (envoy/grpc-gateway) if a browser client ever needed to call the auth service directly — not needed here since all gRPC calls stayed server-to-server, but worth flagging for future extensions.",
		],
	},
	{
		slug: "react-performance-optimization",
		title: "React Performance: From 60fps to Jank-Free 120fps",
		date: "2025-06-01",
		tags: ["react", "frontend"],
		excerpt:
			"Techniques I use to keep React apps at 60-120fps: memo, virtualization, will-change, GPU compositing, and lazy loading strategies.",
		overview:
			"A general frontend-craft note rather than a single-project write-up. These are the techniques I reach for whenever a React UI needs to stay smooth under animation-heavy or high-frequency-update conditions — including several used directly in this portfolio site's own hero background (a canvas/SVG node graph with cursor-tracked motion) and its framer-motion-driven page transitions.",
		architecture: {
			summary:
				"Rather than infrastructure, the relevant \"architecture\" here is the rendering pipeline itself — from React's component tree down to what the GPU actually composites each frame.",
			components: [
				{ name: "Component Tree", description: "Where React decides what needs to re-render — the first and cheapest place to cut unnecessary work." },
				{ name: "Memoization Boundaries", description: "React.memo/useMemo/useCallback act as gates that stop a re-render from propagating further down the tree than necessary." },
				{ name: "Virtualized Lists", description: "For long lists, only the visible window of DOM nodes exists at all, keeping the tree small regardless of underlying data size." },
				{ name: "GPU Compositing Layer", description: "CSS transforms/opacity animations that use will-change or transform run on the compositor thread, bypassing layout/paint entirely." },
			],
		},
		implementation: [
			"`React.memo` on presentational components plus `useMemo`/`useCallback` for expensive derived values and stable callback references — this site's `TimelineItem` and `ProjectCard` components in the Experience/Projects pages are memoized this way to avoid re-rendering the full list on every parent state change.",
			"Virtualization (`react-window`-style windowing) for any list long enough that rendering every row at once causes jank — not currently needed on this portfolio's content volume, but the first tool reached for once a list grows past a few dozen items.",
			"`will-change: transform` and animating only `transform`/`opacity` (never `top`/`left`/`width`) so the browser can hand the animation to the compositor thread instead of re-running layout every frame — used throughout this site's `HeroBackground` orb and node-graph animations.",
			"Code splitting via `React.lazy` + `Suspense` for below-the-fold routes, so the initial bundle only includes what's needed for the first paint.",
		],
		results: [
			"Keeping animations to transform/opacity-only changes was the single biggest lever for smoothness — layout-triggering properties (width, top, left) were the most common cause of jank before this discipline was applied.",
			"Memoizing list-item components eliminated visible re-render flicker when unrelated parent state (like a theme or language toggle) changed elsewhere on the page.",
			"Target frame budget: under 16ms per frame for 60fps, under 8ms for 120fps — measured with React DevTools Profiler and the Chrome Performance tab, not guessed at.",
		],
	},
];
