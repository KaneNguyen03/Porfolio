export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "event-driven-aws-sqs-lambda",
    title: "Migrating from EventEmitter2 to AWS SQS + Lambda",
    date: "2025-10-15",
    tags: ["aws", "nodejs", "architecture"],
    excerpt:
      "How I migrated an internal event system from in-process EventEmitter2 to a scalable AWS SQS + Lambda event-driven architecture, reducing latency spikes and improving reliability.",
    content: `
# Migrating from EventEmitter2 to AWS SQS + Lambda

At Cigro, we hit a scalability ceiling with EventEmitter2 for internal event processing.

## The Problem

EventEmitter2 processes events synchronously in the same Node.js process. Under high load (thousands of IAP webhooks), the event loop starved, causing latency spikes.

## The Solution

We migrated to AWS SQS + Lambda:

1. **Decoupling**: Events are published to SQS, immediately freeing the API server
2. **Auto-scaling**: Lambda scales up with queue depth, no manual provisioning
3. **Retry/Dead-letter**: Failed events retry automatically, then move to DLQ

## Results

- P99 latency dropped from 1200ms to 200ms
- Zero data loss during traffic spikes
- Easier debugging with CloudWatch logging per invocation`,
  },
  {
    slug: "typescript-utility-types",
    title: "Essential TypeScript Utility Types for Cleaner Code",
    date: "2025-08-20",
    tags: ["typescript", "frontend"],
    excerpt:
      "A practical guide to TypeScript utility types like Partial, Pick, Omit, Record, and conditional types that make your codebase more maintainable.",
    content: `
# Essential TypeScript Utility Types

TypeScript utility types eliminate boilerplate and encode constraints at the type level.

## Partial<T>

Makes all properties optional — perfect for update DTOs:

\`\`\`typescript
interface User { name: string; email: string; age: number; }
type UpdateUser = Partial<User>;
\`\`\`

## Pick & Omit

Pick only the fields you need, or exclude fields:

\`\`\`typescript
type PublicUser = Omit<User, 'email' | 'password'>;
type UserPreview = Pick<User, 'name' | 'age'>;
\`\`\`

## Record<K, T>

Maps keys to values — great for lookups and configs.

Using these types consistently reduces runtime validation and catches bugs at compile time.`,
  },
  {
    slug: "rag-pipelines-langchain",
    title: "Building RAG Pipelines with LangChain in Node.js",
    date: "2025-07-10",
    tags: ["ai-agents", "nodejs", "architecture"],
    excerpt:
      "A walkthrough of building a Retrieval-Augmented Generation pipeline in Node.js using LangChain, vector stores, and OpenAI embeddings.",
    content: `
# Building RAG Pipelines with LangChain

RAG (Retrieval-Augmented Generation) lets LLMs answer based on your data, not just their training.

## The Stack

- **LangChain.js**: Orchestration framework
- **Pinecone/PostgreSQL pgvector**: Vector storage
- **OpenAI embeddings**: Document vectorization

## How It Works

1. **Ingestion**: Split documents → embed → store in vector DB
2. **Retrieval**: User query → embed → nearest-neighbor search
3. **Generation**: Retrieved chunks + query → LLM prompt

## Key Lessons

- Chunk size matters: 500-1000 tokens with 50-token overlap works well
- Reranking boosts relevance by 20-30%
- Hybrid search (vector + keyword) catches edge cases`,
  },
  {
    slug: "nestjs-grpc-microservices",
    title: "NestJS + gRPC: Building a Microservice Auth System",
    date: "2025-05-05",
    tags: ["typescript", "architecture"],
    excerpt:
      "How I built a standalone gRPC-based authentication service for BMCMS using NestJS, protobuf definitions, and inter-service communication patterns.",
    content: `
# NestJS + gRPC Microservices

For BMCMS, we needed an auth service that multiple services could call without HTTP overhead.

## Why gRPC

- Strongly typed via protobuf
- HTTP/2 multiplexing
- Bi-directional streaming (future use)

## Implementation

1. Define proto service with AuthService RPCs
2. NestJS implements the interface
3. Other microservices use the generated client

## Trade-offs

- gRPC-web requires a proxy (envoy/grpc-gateway)
- Protobuf compilation adds build step
- Worth it for internal service-to-service communication`,
  },
  {
    slug: "react-performance-optimization",
    title: "React Performance: From 60fps to Jank-Free 120fps",
    date: "2025-06-01",
    tags: ["react", "frontend"],
    excerpt:
      "Techniques I use to keep React apps at 60-120fps: memo, virtualization, will-change, GPU compositing, and lazy loading strategies.",
    content: `
# React Performance at 120fps

## Key Techniques

1. **React.memo & useMemo**: Skip unnecessary re-renders
2. **Virtualization**: react-window for long lists
3. **CSS will-change**: Hint GPU compositing for animations
4. **Code splitting**: React.lazy + Suspense
5. **Avoid causing layout thrash**: Batch DOM reads/writes

## Measuring

Use React DevTools Profiler and Chrome Performance tab. Target < 16ms per frame (60fps) or < 8ms (120fps).

## The Golden Rule

The fastest code is the code that doesn't run. Memoize aggressively, virtualize long lists, and lazy-load everything below the fold.`,
  },
];
