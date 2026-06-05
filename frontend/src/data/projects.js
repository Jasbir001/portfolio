export const projects = [
  {
    id: 'devflow',
    title: 'DevFlow - Collaborative Document Hub',
    category: 'MERN Stack',
    thumbnail: '/assets/project_devflow.png',
    screenshots: [
      '/assets/project_devflow.png',
      '/assets/project_devflow_editor.png',
      '/assets/project_devflow_settings.png'
    ],
    videoDemo: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder URL for standard layout rendering
    shortDescription: 'A real-time collaborative Markdown editing platform featuring conflict-free sync, inline commenting, and folder structures.',
    fullDescription: 'DevFlow is a developer-centric workspace designed to solve document collaboration challenges in distributed teams. It leverages WebSockets for instantaneous synchronizations and CRDTs (Conflict-Free Replicated Data Types) to prevent editing collision. Users can write standard Markdown and view a beautifully styled compiled live preview side-by-side. Additionally, the platform supports real-time workspace chat, granular project folders, and one-click PDF/HTML exporting.',
    features: [
      'Conflict-free multi-user text editing using Yjs CRDTs.',
      'Active session indicators with custom user presence cursors.',
      'Comprehensive version control history with rollback capacity.',
      'Integrated markdown compiler featuring KaTeX equations and Mermaid diagrams.',
      'Secure project spaces with invitation link sharing.'
    ],
    techStack: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'Yjs', 'Redis'],
    challenges: 'Handling synchronized edits across highly unstable network connections was the main bottleneck. Standard REST APIs felt laggy and caused severe race conditions when multiple users edited concurrently.',
    learningOutcomes: 'Mastered the application of operational transformation and Conflict-Free Replicated Data Types (CRDTs). Learned how to configure Redis adapter to scale Socket.io across multiple clusters for load balancing.',
    useCase: 'Remote software development teams who require simultaneous doc review, API drafting, and repository README structuring without opening heavy office suites.',
    architecture: 'A classic client-server model extended with a WebSocket gateway layer. The React frontend maintains a local Yjs document model, synced via a Socket.io server which stores session data in MongoDB and caches hot delta states in Redis.'
  },
  {
    id: 'saas-analytics',
    title: 'Pulse - SaaS Growth & Revenue Dashboard',
    category: 'Full Stack',
    thumbnail: '/assets/project_saas.png',
    screenshots: [
      '/assets/project_saas.png',
      '/assets/project_saas_metrics.png',
      '/assets/project_saas_billing.png'
    ],
    videoDemo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    shortDescription: 'An enterprise SaaS analytics dashboard aggregating Stripe webhooks, user usage tracking, and multi-tenant billing models.',
    fullDescription: 'Pulse allows SaaS owners to view, analyze, and forecast key subscription metrics such as MRR (Monthly Recurring Revenue), LTV (Lifetime Value), Churn Rate, and Active Users. The application listens to incoming Stripe events, parses billing logs, and maps them directly to MongoDB collections. A fast caching layer ensures dashboard load speeds remain sub-100ms. It features comprehensive filtering by billing plans, subscription status, and customizable date ranges.',
    features: [
      'Real-time MRR, ARR, and LTV telemetry charting.',
      'Robust Webhook ingestion pipeline verifying Stripe signatures.',
      'Granular cohort analysis mapping user churn over 30-day buckets.',
      'Interactive metrics filtering with support for CSV / PDF exports.',
      'Multi-tenant role-based access control (Admin, billing editor, viewer).'
    ],
    techStack: ['React.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'Express.js', 'MongoDB', 'Chart.js', 'Stripe API'],
    challenges: 'Processing thousands of Stripe webhooks out-of-order during peak activity hours risked database inconsistency, especially in subscription status mapping.',
    learningOutcomes: 'Developed an idempotent webhook handler to protect against duplicate transactions. Gained deep familiarity with Chart.js canvas render tuning for dynamic light/dark theme charts.',
    useCase: 'Early-stage bootstrapped SaaS startups seeking a self-hosted analytics hub without paying premium third-party platform prices.',
    architecture: 'The API server acts as an ingestion gate, writing incoming billing records to MongoDB after signature validation. A daily cron job runs aggregation pipelines to pre-calculate charting statistics, which are served via React components with sub-second responsive updates.'
  },
  {
    id: 'db-engine-dashboard',
    title: 'Titan - High-Performance Cache Monitor',
    category: 'Backend Heavy',
    thumbnail: '/assets/project_db.png',
    screenshots: [
      '/assets/project_db.png',
      '/assets/project_db_logs.png',
      '/assets/project_db_config.png'
    ],
    videoDemo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    shortDescription: 'A specialized dashboard to monitor custom Key-Value cache metrics, throughput, evicted logs, and memory allocation maps.',
    fullDescription: 'Titan Cache Monitor connects directly to local cache deployments and exposes real-time performance telemetry. Written to visualize cache miss/hit ratios, memory fragmentation, and operations per second (OPS), the app acts as a dashboard overlay. It displays system warnings, handles dynamic configuration updates (max memory changes, eviction policy tweaks), and formats eviction dump tables cleanly.',
    features: [
      'Real-time throughput metrics (OPS) using WebSocket relays.',
      'Interactive memory heap allocation tree-map.',
      'Live Eviction policy settings switcher (LRU, LFU, FIFO).',
      'Unified searchable error and performance log screen.',
      'Custom Slack and Email webhook alerts configurer.'
    ],
    techStack: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'WebSockets', 'ChartJS', 'PostgreSQL'],
    challenges: 'Aggregating large streams of high-frequency CPU and memory metrics without slowing down the cache execution path or lagging the client UI.',
    learningOutcomes: 'Implemented data throttling on the server side to buffer and package performance updates into 500ms batches. Learned to write lightweight DOM updates with React Virtualized.',
    useCase: 'Systems developers and backend DevOps specialists seeking a visual admin panel to test and configure in-memory databases.',
    architecture: 'A low-impact daemon agent runs alongside the cache engine, feeding metrics to a Node server. The Node server stores long-term analytics logs in MongoDB and streams active metrics to the React frontend using pure WebSockets.'
  }
];
export const categories = ['All', 'MERN Stack', 'Full Stack', 'Backend Heavy'];
