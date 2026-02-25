export interface DomainProject {
  name: string
  description: string
  tags: string[]
}

export interface DomainStat {
  label: string
  value: string
}

export interface Domain {
  id: string
  label: string
  shortLabel: string
  title: string
  description: string
  summary: string
  highlights: string[]
  accentColor: string
  accentGlow: string
  // Extended content for domain "website" view
  tagline: string
  philosophy: string
  tools: string[]
  projects: DomainProject[]
  stats: DomainStat[]
}

export interface GlobalContent {
  label: string
  title: string
  description: string
  summary: string
  highlights: string[]
}

export const domains: Domain[] = [
  {
    id: "iot",
    label: "IoT & Robotics",
    shortLabel: "IoT",
    title: "Physical-Digital System Integration",
    description:
      "Designing sensor-driven, connected systems with intelligent control and real-world constraints.",
    summary: "Building bridges between physical and digital worlds",
    highlights: [
      "Sensor integration & telemetry pipelines",
      "Edge computing & MQTT protocols",
      "Microcontroller firmware & control systems",
    ],
    accentColor: "#4ecdc4",
    accentGlow: "rgba(78, 205, 196, 0.15)",
    tagline: "Where physical meets digital",
    philosophy:
      "Every connected device is a conversation between the physical world and the digital one. I design these conversations to be reliable, efficient, and meaningful -- ensuring real-world data drives real-world impact.",
    tools: ["Arduino", "ESP32", "Raspberry Pi", "MQTT", "Node-RED", "ROS2", "LoRaWAN", "Zigbee"],
    projects: [
      { name: "Smart Agriculture Monitor", description: "Soil moisture, temperature & weather-aware irrigation system with LoRa mesh networking.", tags: ["ESP32", "LoRaWAN", "MQTT"] },
      { name: "Indoor Air Quality Grid", description: "Distributed CO2/VOC sensor network with real-time dashboard and predictive alerting.", tags: ["Raspberry Pi", "Grafana", "Python"] },
      { name: "Robotic Arm Controller", description: "6-DOF robotic arm with computer vision pick-and-place using ROS2 and inverse kinematics.", tags: ["ROS2", "OpenCV", "C++"] },
    ],
    stats: [
      { label: "Devices Deployed", value: "200+" },
      { label: "Uptime Achieved", value: "99.7%" },
      { label: "Protocols", value: "12" },
      { label: "Data Points/Day", value: "2M+" },
    ],
  },
  {
    id: "ai-ml",
    label: "AI / ML",
    shortLabel: "AI/ML",
    title: "Intelligent Data-Driven Systems",
    description:
      "Building predictive models and intelligent pipelines that transform raw data into actionable insight.",
    summary: "From data to decisions through learning systems",
    highlights: [
      "Model architecture & training pipelines",
      "Feature engineering & data preprocessing",
      "MLOps & deployment at scale",
    ],
    accentColor: "#74b9ff",
    accentGlow: "rgba(116, 185, 255, 0.15)",
    tagline: "Intelligence by design",
    philosophy:
      "Machine learning is not magic -- it is structured reasoning at scale. I focus on building models that are interpretable, reproducible, and genuinely useful, not just impressively accurate on benchmarks.",
    tools: ["PyTorch", "TensorFlow", "scikit-learn", "Hugging Face", "MLflow", "ONNX", "Weights & Biases", "LangChain"],
    projects: [
      { name: "Predictive Maintenance Engine", description: "Time-series anomaly detection for industrial equipment with 94% precision on failure prediction.", tags: ["PyTorch", "TimeSeries", "Docker"] },
      { name: "Document Intelligence Pipeline", description: "OCR + NLP pipeline for extracting structured data from unstructured documents at enterprise scale.", tags: ["Transformers", "spaCy", "FastAPI"] },
      { name: "Recommendation System", description: "Hybrid collaborative-content recommendation engine serving 50K+ users with sub-100ms latency.", tags: ["TensorFlow", "Redis", "gRPC"] },
    ],
    stats: [
      { label: "Models Deployed", value: "35+" },
      { label: "Avg. Accuracy", value: "93%" },
      { label: "Training Hours", value: "10K+" },
      { label: "Inference/sec", value: "5K+" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    shortLabel: "Backend",
    title: "Scalable Server Architecture",
    description:
      "Engineering robust, high-throughput backend systems with clean APIs and reliable data flows.",
    summary: "Architecting systems that scale with confidence",
    highlights: [
      "Distributed systems & microservices",
      "API design & database optimization",
      "Authentication & security protocols",
    ],
    accentColor: "#a29bfe",
    accentGlow: "rgba(162, 155, 254, 0.12)",
    tagline: "Engineered for resilience",
    philosophy:
      "A backend should be invisible when it works and informative when it fails. I build systems with clear boundaries, predictable behavior, and graceful degradation -- because production never sleeps.",
    tools: ["Node.js", "Go", "PostgreSQL", "Redis", "Docker", "Kubernetes", "gRPC", "GraphQL"],
    projects: [
      { name: "Event-Driven Order System", description: "CQRS/Event Sourcing architecture processing 10K orders/minute with zero data loss guarantee.", tags: ["Go", "Kafka", "PostgreSQL"] },
      { name: "Multi-Tenant Auth Platform", description: "OAuth2/OIDC-compliant identity provider supporting RBAC, MFA, and SSO for enterprise clients.", tags: ["Node.js", "JWT", "Redis"] },
      { name: "API Gateway & Rate Limiter", description: "Custom API gateway with token-bucket rate limiting, circuit breakers, and request tracing.", tags: ["Go", "Envoy", "Prometheus"] },
    ],
    stats: [
      { label: "APIs Built", value: "80+" },
      { label: "Req/sec Peak", value: "50K" },
      { label: "Uptime SLA", value: "99.9%" },
      { label: "Microservices", value: "40+" },
    ],
  },
  {
    id: "web-app",
    label: "Web & App",
    shortLabel: "Web",
    title: "Full-Stack Application Development",
    description:
      "Crafting performant web applications with thoughtful UX and modern tooling across the stack.",
    summary: "End-to-end application delivery",
    highlights: [
      "Next.js, React & modern frameworks",
      "Performance optimization & SSR/SSG",
      "Progressive web apps & responsive design",
    ],
    accentColor: "#55a8e5",
    accentGlow: "rgba(85, 168, 229, 0.15)",
    tagline: "From concept to deployment",
    philosophy:
      "A great application is one users never think about -- it just works. I build full-stack systems where every layer, from database queries to UI transitions, is considered and intentional.",
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "Vercel", "Supabase", "tRPC"],
    projects: [
      { name: "SaaS Analytics Dashboard", description: "Real-time business intelligence platform with custom chart builder and role-based workspace management.", tags: ["Next.js", "D3.js", "Supabase"] },
      { name: "E-Commerce Platform", description: "Headless commerce with Stripe integration, inventory management, and sub-second page loads.", tags: ["React", "Stripe", "Prisma"] },
      { name: "Collaborative Document Editor", description: "Real-time CRDT-based document editor with presence indicators and conflict-free syncing.", tags: ["TypeScript", "Yjs", "WebSocket"] },
    ],
    stats: [
      { label: "Apps Shipped", value: "25+" },
      { label: "Lighthouse Score", value: "98" },
      { label: "Users Served", value: "100K+" },
      { label: "Deploy/Week", value: "15+" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    shortLabel: "Frontend",
    title: "Interface & Interaction Design",
    description:
      "Building accessible, pixel-perfect interfaces with seamless interactions and component systems.",
    summary: "Where design meets engineering precision",
    highlights: [
      "Component architecture & design systems",
      "Animation & interaction patterns",
      "Accessibility & cross-browser support",
    ],
    accentColor: "#81ecec",
    accentGlow: "rgba(129, 236, 236, 0.15)",
    tagline: "Precision at every pixel",
    philosophy:
      "The frontend is where engineering meets empathy. I treat every interaction as a micro-conversation with the user -- each transition, loading state, and error message is an opportunity to build trust.",
    tools: ["React", "Vue.js", "Framer Motion", "GSAP", "Storybook", "Figma", "Radix UI", "CSS Modules"],
    projects: [
      { name: "Design System Library", description: "50+ accessible components with comprehensive docs, Storybook previews, and theme customization.", tags: ["React", "Storybook", "Radix"] },
      { name: "Interactive Data Viz Suite", description: "Custom chart library with gesture controls, animated transitions, and responsive breakpoints.", tags: ["D3.js", "Framer Motion", "SVG"] },
      { name: "Micro-Interaction Engine", description: "Reusable animation primitives for scroll-triggered reveals, parallax, and physics-based transitions.", tags: ["GSAP", "IntersectionObserver", "CSS"] },
    ],
    stats: [
      { label: "Components Built", value: "200+" },
      { label: "A11y Score", value: "100" },
      { label: "Bundle Size Avg", value: "<50KB" },
      { label: "Cross-Browser", value: "99%" },
    ],
  },
  {
    id: "data",
    label: "Data",
    shortLabel: "Data",
    title: "Data Engineering & Analytics",
    description:
      "Structuring, transforming, and visualizing data to uncover patterns and drive informed decisions.",
    summary: "Turning raw signals into clear understanding",
    highlights: [
      "ETL pipelines & data warehousing",
      "Real-time streaming & processing",
      "Visualization & business intelligence",
    ],
    accentColor: "#6ec6e6",
    accentGlow: "rgba(110, 198, 230, 0.15)",
    tagline: "Signal from the noise",
    philosophy:
      "Data without context is just noise. I build pipelines that not only move data reliably but also enrich it with meaning at every stage -- from ingestion to the final dashboard pixel.",
    tools: ["Apache Spark", "Airflow", "dbt", "Snowflake", "BigQuery", "Kafka", "Pandas", "Metabase"],
    projects: [
      { name: "Real-Time Event Stream", description: "Kafka-based event pipeline processing 1M+ events/hour with exactly-once delivery semantics.", tags: ["Kafka", "Flink", "Avro"] },
      { name: "Data Quality Framework", description: "Automated data validation with anomaly detection, lineage tracking, and self-healing pipelines.", tags: ["dbt", "Great Expectations", "Airflow"] },
      { name: "Executive BI Dashboard", description: "Self-service analytics platform with natural language queries and automated insight generation.", tags: ["Snowflake", "Metabase", "Python"] },
    ],
    stats: [
      { label: "Pipelines Built", value: "60+" },
      { label: "Records/Day", value: "50M+" },
      { label: "Data Sources", value: "30+" },
      { label: "Query P95", value: "<2s" },
    ],
  },
  {
    id: "embedded",
    label: "Embedded",
    shortLabel: "Embedded",
    title: "Low-Level Systems Programming",
    description:
      "Programming resource-constrained hardware with precision, reliability, and real-time performance.",
    summary: "Precision engineering at the hardware level",
    highlights: [
      "RTOS & bare-metal programming",
      "Communication protocols (SPI, I2C, UART)",
      "Power optimization & hardware debugging",
    ],
    accentColor: "#a0c4e8",
    accentGlow: "rgba(160, 196, 232, 0.15)",
    tagline: "Code meets silicon",
    philosophy:
      "Embedded programming is engineering under constraint. Every byte matters, every cycle counts, and every decision lives permanently in silicon. I embrace these constraints as design principles, not limitations.",
    tools: ["C", "C++", "Rust", "FreeRTOS", "Zephyr", "STM32", "JTAG", "Logic Analyzer"],
    projects: [
      { name: "Custom RTOS Scheduler", description: "Priority-based preemptive scheduler for STM32 with deadline-aware task management and power states.", tags: ["C", "STM32", "ARM Cortex"] },
      { name: "Wireless Sensor Node", description: "Ultra-low-power BLE sensor with 2-year battery life, OTA updates, and encrypted communication.", tags: ["nRF52", "BLE", "Rust"] },
      { name: "Motor Control Firmware", description: "FOC motor controller with real-time current sensing, PID tuning, and CAN bus integration.", tags: ["C++", "DSP", "CAN"] },
    ],
    stats: [
      { label: "Firmware Built", value: "45+" },
      { label: "MCU Platforms", value: "15+" },
      { label: "Power Savings", value: "60%" },
      { label: "RTOS Projects", value: "20+" },
    ],
  },
  {
    id: "research",
    label: "Research",
    shortLabel: "Research",
    title: "Systems Research & Innovation",
    description:
      "Exploring emerging technologies and publishing novel approaches to complex engineering challenges.",
    summary: "Pushing boundaries through systematic inquiry",
    highlights: [
      "Literature review & hypothesis formation",
      "Experimental design & prototyping",
      "Technical writing & knowledge sharing",
    ],
    accentColor: "#b8d4e8",
    accentGlow: "rgba(184, 212, 232, 0.15)",
    tagline: "Inquiry as engineering",
    philosophy:
      "Research is not separate from engineering -- it is engineering at its most honest. I approach every unknown with rigor, document every finding with clarity, and build prototypes that test ideas, not just demonstrate them.",
    tools: ["LaTeX", "Jupyter", "MATLAB", "Python", "Overleaf", "Zotero", "Git", "Docker"],
    projects: [
      { name: "Edge AI Optimization Study", description: "Novel quantization approach reducing model size 4x with <2% accuracy loss on resource-constrained devices.", tags: ["PyTorch", "TensorRT", "Benchmarking"] },
      { name: "Mesh Network Resilience Paper", description: "Published analysis of self-healing mesh topologies with formal verification of convergence properties.", tags: ["NS-3", "Formal Methods", "LaTeX"] },
      { name: "Human-Robot Interaction Framework", description: "Experimental framework for evaluating intuitive gesture-based robot control in industrial settings.", tags: ["ROS2", "Motion Capture", "Statistics"] },
    ],
    stats: [
      { label: "Papers Published", value: "8" },
      { label: "Citations", value: "120+" },
      { label: "Prototypes Built", value: "30+" },
      { label: "Conferences", value: "12" },
    ],
  },
]

export const globalContent: GlobalContent = {
  label: "SYSTEMS ENGINEER",
  title: "Building Intelligent\nSystems Across Domains",
  description:
    "A multidisciplinary engineer integrating hardware, software, and data into scalable, real-world solutions.",
  summary: "Cross-domain systems integration",
  highlights: [
    "8 interconnected engineering domains",
    "Hardware to cloud full-stack capability",
    "Research-driven, production-ready output",
  ],
}
