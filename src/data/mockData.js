// Mock data for Krishna's portfolio website
export const personalInfo = {
  name: "Krishna KOMPALLI",
    title: "Lead Data Scientist | Machine Learning & AI Specialist",
  location: "Paris, France",
  email: "gk.kompalli@gmail.com",
  linkedin: "linkedin.com/in/krishna-kompalli/",
  aboutMe: `"WITHOUT STRATEGY, DATA IS NOISE & WITHOUT DATA, STRATEGY IS BLIND."`
};

export const skills = [
  {
    category: "Programming Languages",
    items: ["Python", "R", "SQL", "Java", "JavaScript"]
  },
  {
    category: "Frameworks & Libraries",
    items: ["TensorFlow", "PyTorch", "LangChain", "LangFlow", "OpenCV", "N8N", "AirFlow", "MLFlow", "LlamaIndex"]
  },
  {
    category: "Cloud & Deployment",
    items: ["SaaS product development", "AWS", "Azure"]
  },
  {
    category: "Machine Learning Techniques",
    items: ["Tree-based models (Random Forest, XGBoost)", "Clustering (K-means, DBSCAN)", "Time Series Forecasting", "Regression Analysis", "Anomaly Detection", "Deep Learning (LSTM, CNNs)"]
  },
  {
    category: "Data Expertise",
    items: ["Large-scale datasets", "Temporal data analysis", "Unstructured data processing (text, images)", "Cross-sectional analysis"]
  },
  {
    category: "CRM Tools",
    items: ["Attio"]
  }
];

export const clientSegments = [
  {
    id: 1,
    title: "Fintech & Banking",
    description: "AI-powered financial solutions for risk assessment, fraud detection, and regulatory compliance.",
    background: "/fintech-gif.gif",
    products: [
      {
        id: "fintech-risk",
        title: "AI-driven Risk Scoring & Lending OS",
        summary: "AI-powered risk assessment platform that evaluates creditworthiness using real-time transaction patterns, payment behavior, and alternative data sources. Makes instant lending decisions with dynamic interest rates based on actual financial behavior rather than static credit scores.",
        worksWellFor: "Banks, credit unions, online lenders, microfinance institutions, anyone making lending decisions at scale",
        fullDescription: "Traditional credit scores miss a lot. Someone might have a thin credit file but consistently manage their money well, pay bills on time, and maintain steady income. Our risk scoring platform looks at the full picture—transaction history, payment patterns, account management, and alternative data sources that traditional models ignore.\n\nThe system makes lending decisions in real-time by processing multiple data streams simultaneously. Instead of static scores that update monthly, we continuously assess risk based on actual financial behavior. This means faster approvals for good borrowers and better protection against defaults.\n\nBanks and lenders using this see approval rates go up while default rates come down. Interest rates adjust dynamically based on actual risk rather than outdated credit bureau data. And because the AI explains its decisions, lenders can confidently defend their credit policies to regulators.",
        diagram: `graph TB
    subgraph "Data Sources"
        A[Credit Bureaus APIs] --> DS[Data Streaming Layer]
        B[Banking Transaction History] --> DS
        C[Social Media APIs] --> DS
        D[Open Banking APIs] --> DS
        E[Alternative Data Sources] --> DS
        F[Real-time Payment Data] --> DS
    end

    subgraph "Data Ingestion & Processing"
        DS --> G[Apache Kafka Streams]
        G --> H[Data Validation Service]
        H --> I[Feature Engineering Pipeline]
        I --> J[Data Lake - S3/Delta Lake]
    end

    subgraph "ML Pipeline"
        J --> K[Feature Store - Feast]
        K --> L[Model Training Pipeline]
        L --> M[Model Registry - MLflow]
        
        subgraph "ML Models"
            N[XGBoost Risk Model]
            O[Neural Network - PyTorch]
            P[Ensemble Meta-Model]
            Q[LLM Risk Analyst - GPT-4]
        end
        
        M --> N
        M --> O
        M --> P
        M --> Q
    end

    subgraph "Real-time Scoring Engine"
        R[API Gateway - Kong]
        S[Redis Cache Layer]
        T[Model Serving - Seldon/TorchServe]
        U[Risk Score Calculator]
        V[Dynamic Interest Rate Engine]
    end

    K --> T
    N --> U
    O --> U
    P --> U
    Q --> U
    
    subgraph "Security & Compliance"
        W[OAuth 2.0/JWT Auth]
        X[Data Encryption at Rest/Transit]
        Y[Audit Logging - ELK Stack]
        Z[GDPR Compliance Engine]
    end

    subgraph "API & Integration Layer"
        AA[RESTful APIs]
        BB[GraphQL Gateway]
        CC[Webhook Notifications]
        DD[Banking Core Integration]
    end

    subgraph "Monitoring & Observability"
        EE[Prometheus/Grafana]
        FF[Model Drift Detection]
        GG[Performance Metrics]
        HH[Alert Management - PagerDuty]
    end

    subgraph "Database Layer"
        II[PostgreSQL - Customer Data]
        JJ[ClickHouse - Analytics]
        KK[Redis - Caching]
        LL[Vector DB - Pinecone]
    end

    R --> W
    R --> AA
    AA --> T
    T --> U
    U --> V
    U --> S
    V --> DD

    T --> FF
    U --> EE
    V --> GG
    
    style N fill:#e1f5fe
    style O fill:#e1f5fe
    style P fill:#e1f5fe
    style Q fill:#fff3e0`
      },
      {
        id: "fintech-fraud",
        title: "Cross-channel Fraud Intelligence Platform",
        summary: "Real-time fraud detection system that learns from every transaction across all channels. Monitors behavioral patterns like typing speed, device fingerprints, and transaction habits to stop fraud in milliseconds while minimizing false positives.",
        worksWellFor: "Banks, payment processors, e-commerce platforms, any business handling financial transactions",
        fullDescription: "Fraud patterns keep evolving, but most fraud systems rely on static rules that criminals quickly learn to bypass. We built a detection engine that learns from every transaction, identifying suspicious behavior across web, mobile, card, and point-of-sale channels.\n\nThe system watches how people interact with their accounts—typing speed, mouse movements, typical transaction patterns, device fingerprints. When something's off, it can stop the transaction in milliseconds. More importantly, it learns what normal looks like for each customer, so legitimate transactions rarely get flagged by mistake.\n\nWhat makes this different is the cross-channel view. If someone's card gets used at a physical store while their phone is making purchases online, we catch that. If login patterns suddenly change or a device appears in a new country, we know. The system connects dots that isolated fraud checks miss.",
        diagram: `graph TB
    subgraph "Real-time Data Sources"
        A[Transaction Streams] --> DS[Event Streaming Platform]
        B[Mobile App Behavior] --> DS
        C[Web Analytics] --> DS
        D[Device Fingerprinting] --> DS
        E[Geolocation Data] --> DS
        F[Biometric Signals] --> DS
        G[Card Networks] --> DS
    end

    subgraph "Stream Processing Layer"
        DS --> H[Apache Kafka]
        H --> I[Apache Flink/Spark Streaming]
        I --> J[Real-time Feature Store]
        I --> K[Event Enrichment Service]
    end

    subgraph "ML Models & AI Engine"
        subgraph "Fraud Detection Models"
            L[Isolation Forest - Anomaly Detection]
            M[Graph Neural Network - Relationship Analysis]
            N[LSTM - Sequence Pattern Detection]
            O[Transformer Model - Behavioral Analysis]
            P[Gradient Boosting - Rule-based ML]
        end
        
        Q[LLM Reasoning Engine - Claude/GPT-4]
        R[Ensemble Fraud Classifier]
        S[Real-time Scoring Engine]
    end

    subgraph "Cross-Channel Analytics"
        T[Behavioral Analytics Engine]
        U[Device Identity Graph]
        V[Customer Journey Mapper]
        W[Risk Profile Builder]
    end

    subgraph "Decision Engine"
        X[Rule Engine - Drools]
        Y[Risk Threshold Manager]
        Z[Action Orchestrator]
        AA[Notification Service]
    end

    subgraph "Security & Compliance"
        BB[Zero-Trust Architecture]
        CC[PCI DSS Compliance]
        DD[Data Masking & Tokenization]
        EE[Audit Trail - Immutable Logs]
    end

    subgraph "API & Integration"
        FF[Real-time Fraud API]
        GG[Webhook Alerts]
        HH[SMS/Email Notifications]
        II[Core Banking Integration]
        JJ[Card Network Callbacks]
    end

    subgraph "Storage & Analytics"
        KK[Time-series DB - InfluxDB]
        LL[Graph Database - Neo4j]
        MM[Data Warehouse - Snowflake]
        NN[Vector Store - Weaviate]
        OO[Redis - Session Store]
    end

    subgraph "Monitoring & ML Ops"
        PP[Model Performance Monitoring]
        QQ[False Positive Rate Tracking]
        RR[A/B Testing Framework]
        SS[Model Retraining Pipeline]
        TT[Explainable AI Dashboard]
    end

    J --> L
    J --> M
    J --> N
    J --> O
    J --> P
    
    K --> T
    K --> U
    K --> V
    K --> W
    
    L --> R
    M --> R
    N --> R
    O --> R
    P --> R
    Q --> R
    
    R --> S
    S --> X
    X --> Y
    Y --> Z
    Z --> AA
    
    S --> FF
    Z --> GG
    AA --> HH
    
    T --> LL
    U --> LL
    V --> MM
    W --> NN
    
    S --> PP
    R --> QQ
    Z --> RR
    
    style L fill:#e8f5e8
    style M fill:#e8f5e8
    style N fill:#e8f5e8
    style O fill:#e8f5e8
    style P fill:#e8f5e8
    style Q fill:#fff3e0
    style R fill:#e1f5fe`
      },
      {
        id: "fintech-compliance",
        title: "Regulatory Intelligence Co-pilot",
        summary: "AI-powered compliance monitoring system that tracks regulatory changes worldwide and automatically identifies requirements affecting your products. Provides real-time alerts and compliance roadmaps for new market expansion.",
        worksWellFor: "Fintech companies, banks expanding internationally, compliance teams, product managers",
        fullDescription: "Launching a new financial product means navigating dozens of regulations across multiple jurisdictions. Most companies have compliance teams manually reading through regulatory updates, trying to figure out what applies to them. It's slow, expensive, and easy to miss something.\n\nThis system monitors regulatory bodies worldwide, automatically extracting requirements that affect your specific products and markets. When a regulation changes in a country you operate in, you get notified with a clear breakdown of what's changed and what you need to do about it.\n\nPlanning to expand into a new country? The system maps out all the licensing requirements, compliance obligations, and implementation timelines you'll need. It's like having a compliance expert who never sleeps and reads every regulatory update published anywhere in the world.",
        diagram: `graph TB
    subgraph "Regulatory Data Sources"
        A[Regulatory Bodies APIs] --> DS[Data Ingestion Layer]
        B[Legal Document Feeds] --> DS
        C[Industry Standards Updates] --> DS
        D[Geographic Regulation DBs] --> DS
        E[Product Configuration Data] --> DS
        F[Company Policy Repository] --> DS
        G[Competitor Analysis Data] --> DS
    end

    subgraph "Document Processing Pipeline"
        DS --> H[Document Parser - Unstructured.io]
        H --> I[OCR Engine - AWS Textract]
        I --> J[NLP Preprocessing Pipeline]
        J --> K[Document Classification Model]
        K --> L[Entity Extraction - spaCy/Transformers]
    end

    subgraph "Knowledge Management"
        L --> M[Regulatory Knowledge Graph - Neo4j]
        M --> N[Vector Embeddings - OpenAI/Cohere]
        N --> O[Semantic Search Engine]
        O --> P[Knowledge Base - Elasticsearch]
    end

    subgraph "AI Analysis Engine"
        subgraph "Core AI Models"
            Q[LLM Legal Analyst - GPT-4/Claude]
            R[Compliance Gap Detector]
            S[Risk Assessment Model]
            T[Regulatory Change Impact Analyzer]
            U[Geographic Compliance Mapper]
        end
        
        V[Multi-Agent Orchestrator]
        W[Legal Reasoning Chain]
        X[Compliance Score Calculator]
    end

    subgraph "Product Analysis Module"
        Y[Product Feature Analyzer]
        Z[Regulatory Requirement Matcher]
        AA[Gap Analysis Engine]
        BB[Compliance Roadmap Generator]
        CC[Implementation Cost Estimator]
    end

    subgraph "Geographic Expansion Module"
        DD[Market Entry Analyzer]
        EE[Local Regulation Scanner]
        FF[Licensing Requirement Detector]
        GG[Timeline & Cost Projector]
        HH[Risk Mitigation Planner]
    end

    subgraph "Decision Support System"
        II[Interactive Compliance Dashboard]
        JJ[Recommendation Engine]
        KK[Action Item Generator]
        LL[Progress Tracking System]
        MM[Alert & Notification Service]
    end

    subgraph "Integration & APIs"
        NN[RESTful API Gateway]
        OO[Slack/Teams Integration]
        PP[Email Notifications]
        QQ[JIRA Integration]
        RR[Confluence Documentation]
    end

    subgraph "Security & Audit"
        SS[Role-based Access Control]
        TT[Document Version Control]
        UU[Audit Trail Logging]
        VV[Data Encryption]
        WW[Compliance Reporting]
    end

    subgraph "Storage Layer"
        XX[PostgreSQL - Structured Data]
        YY[MongoDB - Document Store]
        ZZ[Vector Database - Pinecone]
        AAA[Redis - Caching]
        BBB[S3 - Document Storage]
    end

    P --> Q
    P --> R
    P --> S
    P --> T
    P --> U
    
    Q --> V
    R --> V
    S --> V
    T --> V
    U --> V
    
    V --> W
    W --> X
    
    E --> Y
    Y --> Z
    Z --> AA
    AA --> BB
    BB --> CC
    
    D --> DD
    DD --> EE
    EE --> FF
    FF --> GG
    GG --> HH
    
    X --> II
    BB --> JJ
    JJ --> KK
    KK --> LL
    LL --> MM
    
    II --> NN
    MM --> OO
    MM --> PP
    KK --> QQ
    BB --> RR
    
    M --> XX
    P --> YY
    N --> ZZ
    O --> AAA
    H --> BBB
    
    style Q fill:#fff3e0
    style R fill:#e8f5e8
    style S fill:#e8f5e8
    style T fill:#e8f5e8
    style U fill:#e8f5e8
    style V fill:#e1f5fe`
      },
      {
        id: "fintech-coach",
        title: "Personalized Financial Wellness Coach",
        summary: "Unified financial platform that connects all your accounts and provides AI-driven insights for better money management. Offers personalized saving strategies, goal planning, and scenario modeling through conversational interface.",
        worksWellFor: "Digital banks, wealth management apps, financial advisors, employee benefit programs",
        fullDescription: "Most people have their money scattered across multiple banks, credit cards, investment accounts, and loan providers. Getting a complete picture of your finances means logging into half a dozen apps and manually tracking everything in a spreadsheet.\n\nOur platform connects to all your financial accounts and gives you one unified view. But more importantly, it actually helps you improve your financial situation. The AI analyzes your spending patterns, identifies where money's leaking, and suggests realistic changes based on your specific circumstances.\n\nWant to buy a house in three years? It'll show you exactly how much to save monthly, where to cut back, and how different decisions impact your timeline. Worried about retirement? It runs scenarios based on your current trajectory and suggests adjustments. The conversational interface means you can ask questions in plain English instead of wrestling with financial calculators.",
        diagram: `graph TB
    subgraph "Data Aggregation Layer"
        A[Open Banking APIs] --> DS[Account Aggregation Service]
        B[Credit Card APIs] --> DS
        C[Investment Platforms] --> DS
        D[Crypto Exchanges] --> DS
        E[Loan/Mortgage Data] --> DS
        F[Insurance Platforms] --> DS
        G[Manual Input Interface] --> DS
    end

    subgraph "Data Processing Pipeline"
        DS --> H[Data Standardization Engine]
        H --> I[Transaction Categorization ML]
        I --> J[Financial Pattern Detection]
        J --> K[Behavioral Analytics Engine]
        K --> L[Predictive Forecasting Models]
    end

    subgraph "AI Coaching Engine"
        subgraph "Core AI Models"
            M[Financial LLM Coach - GPT-4/Claude]
            N[Goal-based Planning Model]
            O[Risk Tolerance Assessor]
            P[Spending Behavior Analyzer]
            Q[Investment Recommendation Engine]
            R[Debt Optimization Model]
        end
        
        S[Conversational AI Interface]
        T[Personalization Engine]
        U[Financial Health Scorer]
    end

    subgraph "Forecasting & Planning"
        V[Monte Carlo Simulation Engine]
        W[Cash Flow Predictor]
        X[Retirement Planning Calculator]
        Y[Emergency Fund Optimizer]
        Z[Goal Timeline Estimator]
        AA[Tax Optimization Advisor]
    end

    subgraph "Behavioral Insights"
        BB[Spending Pattern Analyzer]
        CC[Financial Stress Detector]
        DD[Habit Formation Tracker]
        EE[Behavioral Nudge Engine]
        FF[Milestone Achievement System]
    end

    subgraph "Coaching Features"
        GG[Interactive Chat Interface]
        HH[Financial Education Content]
        II[Actionable Recommendations]
        JJ[Goal Setting & Tracking]
        KK[Budget Creation & Monitoring]
        LL[Investment Guidance]
        MM[Debt Payoff Strategies]
    end

    subgraph "Notification & Engagement"
        NN[Smart Alert System]
        OO[Progress Notifications]
        PP[Coaching Reminders]
        QQ[Achievement Celebrations]
        RR[Educational Push Content]
    end

    subgraph "Integration & APIs"
        SS[Mobile App SDK]
        TT[Web Dashboard]
        UU[Slack/Teams Bot]
        VV[Email Digest Service]
        WW[Calendar Integration]
        XX[Third-party App APIs]
    end

    subgraph "Security & Privacy"
        YY[Bank-level Encryption]
        ZZ[OAuth 2.0 Authentication]
        AAA[Data Anonymization]
        BBB[GDPR Compliance]
        CCC[Audit Logging]
    end

    subgraph "Storage & Analytics"
        DDD[PostgreSQL - User Data]
        EEE[Time-series DB - InfluxDB]
        FFF[Vector Store - Chroma]
        GGG[Redis - Session Cache]
        HHH[Data Warehouse - BigQuery]
    end

    L --> M
    L --> N
    L --> O
    L --> P
    L --> Q
    L --> R
    
    M --> S
    N --> T
    O --> U
    P --> U
    Q --> U
    R --> U
    
    L --> V
    V --> W
    W --> X
    X --> Y
    Y --> Z
    Z --> AA
    
    J --> BB
    BB --> CC
    CC --> DD
    DD --> EE
    EE --> FF
    
    S --> GG
    T --> HH
    U --> II
    N --> JJ
    P --> KK
    Q --> LL
    R --> MM
    
    EE --> NN
    FF --> OO
    S --> PP
    FF --> QQ
    HH --> RR
    
    GG --> SS
    II --> TT
    S --> UU
    HH --> VV
    JJ --> WW
    
    DS --> DDD
    L --> EEE
    S --> FFF
    T --> GGG
    J --> HHH
    
    style M fill:#fff3e0
    style N fill:#e8f5e8
    style O fill:#e8f5e8
    style P fill:#e8f5e8
    style Q fill:#e8f5e8
    style R fill:#e8f5e8
    style S fill:#e1f5fe`
      },
      {
        id: "fintech-categorization",
        title: "AI-powered Transaction Categorisation Engine",
        summary: "Intelligent transaction categorization system trained on millions of transactions. Accurately identifies merchants from cryptic names, detects spending patterns, flags anomalies, and provides actionable financial insights for better expense management.",
        worksWellFor: "Expense management platforms, accounting software, banking apps, small business tools",
        fullDescription: "Nobody enjoys categorizing expenses manually, whether it's for personal budgeting or business accounting. Most apps try, but they get merchant names wrong, miss recurring subscriptions, and require constant manual corrections.\n\nWe've trained our models on hundreds of millions of transactions, so categorization is accurate right out of the box. The system recognizes merchants even when they show up with cryptic names on statements, understands context (a charge at Whole Foods is groceries, not healthcare), and learns from corrections you make.\n\nBeyond categorization, it spots unusual patterns—duplicate charges, subscription increases, spending spikes, potential fraud. For businesses, it flags expenses that might be tax-deductible and tracks spending against budgets. The analytics layer turns raw transaction data into actionable insights about where money's going and why.",
        diagram: `graph TB
    subgraph "Data Input Sources"
        A[Bank Transaction Feeds] --> DS[Transaction Ingestion API]
        B[Credit Card Networks] --> DS
        C[Payment Processors] --> DS
        D[POS System Data] --> DS
        E[E-commerce Platforms] --> DS
        F[Mobile Payment Apps] --> DS
        G[Expense Management Tools] --> DS
    end

    subgraph "Real-time Processing Pipeline"
        DS --> H[Apache Kafka Streams]
        H --> I[Data Validation & Cleaning]
        I --> J[Transaction Enrichment Service]
        J --> K[Feature Extraction Engine]
        K --> L[Real-time ML Pipeline]
    end

    subgraph "AI Classification Engine"
        subgraph "ML Models"
            M[BERT-based Transaction Classifier]
            N[Ensemble Random Forest Model]
            O[Neural Network Category Predictor]
            P[Few-shot Learning Model]
            Q[Rule-based Classification Engine]
        end
        
        R[LLM Merchant Analyzer - GPT-4]
        S[Confidence Scoring System]
        T[Active Learning Framework]
    end

    subgraph "Merchant Intelligence"
        U[Merchant Database - Factual/Foursquare]
        V[Web Scraping & Research Engine]
        W[Business Category Mapper]
        X[Location-based Context Engine]
        Y[Merchant Reputation Scorer]
    end

    subgraph "Anomaly Detection System"
        Z[Isolation Forest Anomaly Detector]
        AA[Statistical Outlier Detection]
        BB[Behavioral Pattern Analyzer]
        CC[Fraud Risk Assessor]
        DD[Expense Policy Violation Detector]
    end

    subgraph "User Feedback Loop"
        EE[Manual Correction Interface]
        FF[User Preference Learning]
        GG[Custom Category Creator]
        HH[Feedback Collection API]
        II[Model Retraining Trigger]
    end

    subgraph "Business Intelligence"
        JJ[Spending Analytics Engine]
        KK[Trend Analysis Module]
        LL[Budget vs Actual Tracker]
        MM[Tax Deduction Identifier]
        NN[Cash Flow Forecaster]
        OO[Business Insight Generator]
    end

    subgraph "Alert & Notification System"
        PP[Smart Alert Engine]
        QQ[Anomaly Notifications]
        RR[Budget Threshold Alerts]
        SS[Tax-relevant Transaction Flags]
        TT[Duplicate Transaction Detector]
    end

    subgraph "API & Integration Layer"
        UU[RESTful Categorization API]
        VV[Webhook Event Publisher]
        WW[Accounting Software Integration]
        XX[Expense Management APIs]
        YY[Banking App SDK]
        ZZ[Business Dashboard APIs]
    end

    subgraph "Storage & Analytics"
        AAA[PostgreSQL - Transaction Data]
        BBB[Elasticsearch - Search & Analytics]
        CCC[Redis - Real-time Cache]
        DDD[Vector Database - Embeddings]
        EEE[Time-series DB - Metrics]
        FFF[Data Lake - S3]
    end

    subgraph "Security & Compliance"
        GGG[PCI DSS Compliance]
        HHH[Data Encryption Pipeline]
        III[Audit Trail System]
        JJJ[Access Control - IAM]
        KKK[Data Retention Policies]
    end

    L --> M
    L --> N
    L --> O
    L --> P
    L --> Q
    L --> R
    
    M --> S
    N --> S
    O --> S
    P --> S
    Q --> S
    R --> S
    
    J --> U
    U --> V
    V --> W
    W --> X
    X --> Y
    
    K --> Z
    Z --> AA
    AA --> BB
    BB --> CC
    CC --> DD
    
    S --> EE
    EE --> FF
    FF --> GG
    GG --> HH
    HH --> II
    II --> T
    
    S --> JJ
    JJ --> KK
    KK --> LL
    LL --> MM
    MM --> NN
    NN --> OO
    
    DD --> PP
    PP --> QQ
    LL --> RR
    MM --> SS
    TT --> PP
    
    S --> UU
    PP --> VV
    OO --> WW
    UU --> XX
    UU --> YY
    JJ --> ZZ
    
    DS --> AAA
    JJ --> BBB
    S --> CCC
    M --> DDD
    PP --> EEE
    J --> FFF
    
    style M fill:#e8f5e8
    style N fill:#e8f5e8
    style O fill:#e8f5e8
    style P fill:#e8f5e8
    style Q fill:#e8f5e8
    style R fill:#fff3e0
    style S fill:#e1f5fe`
      }
    ]
  },
  {
    id: 2,
    title: "EdTech Platforms",
    description: "Personalized learning platforms with AI tutoring, grading, and student success prediction.",
    background: "/edtech.gif",
    products: [
      {
        id: "edtech-learning-analytics",
        title: "Real-time Learning Analytics Fabric",
        summary: "Adaptive learning system that continuously adjusts curriculum difficulty based on individual student performance. Tracks learning patterns, predicts at-risk students, and provides teachers with real-time insights for personalized intervention.",
        worksWellFor: "K-12 schools, universities, online course platforms, corporate training programs",
        fullDescription: "Students learn at different speeds and in different ways. A one-size-fits-all curriculum means some students are bored while others are lost. Our adaptive system continuously adjusts what each student sees based on how they're actually performing.\n\nIf someone's breezing through algebra concepts, the difficulty ramps up. If they're struggling with a particular type of problem, the system provides more practice with similar examples and adjusts the explanation approach. The AI tracks not just whether answers are correct, but how long problems take, what types of mistakes happen, and which teaching methods work for each student.\n\nTeachers get visibility into where each student truly is, not where the curriculum says they should be. The system predicts which students might fall behind before it actually happens, giving educators time to intervene.",
        flowComponent: "LearningAnalyticsFlowchart"
      },
      {
        id: "edtech-ai-tutor",
        title: "AI Tutor Interaction Platform",
        summary: "24/7 AI tutoring platform that uses Socratic method teaching across multiple subjects. Accepts homework photos, remembers learning history, and adapts teaching style to guide students toward understanding rather than providing direct answers.",
        worksWellFor: "Online learning platforms, tutoring companies, schools, homeschooling families",
        fullDescription: "Hiring enough qualified tutors to give every student one-on-one help is impossible for most schools. But that personalized attention makes a huge difference in learning outcomes. This AI tutor provides subject expertise across math, science, coding, languages, and test prep—available 24/7 to any student who needs help.\n\nThe key is how it teaches. Instead of just giving answers, it uses the Socratic method—asking questions that guide students to figure things out themselves. If a student's stuck on a calculus problem, the tutor breaks it into smaller steps, helps them understand the underlying concept, and builds confidence through the process.\n\nStudents can upload photos of homework problems, diagrams, or code they're working on. The AI understands context, remembers what the student struggled with before, and adjusts its teaching style accordingly. It's patient, never judges, and can explain the same concept in different ways until it clicks.",
        flowComponent: "AITutorFlowchart"
      },
      {
        id: "edtech-grading",
        title: "Automated Assessment & Feedback Pipeline",
        summary: "Automated grading system for essays, code, and projects that provides instant detailed feedback. Evaluates content quality, gives specific improvement suggestions, and allows teacher customization of rubrics and review processes.",
        worksWellFor: "Universities, online courses, coding bootcamps, any program with lots of assignments to grade",
        fullDescription: "Grading takes up an enormous amount of teacher time, especially for essays, coding assignments, and open-ended projects. And even with all that effort, feedback often comes too late to help students improve before the next assignment.\n\nThis system handles grading for essays, code, math problems, and project work. But it doesn't just assign scores—it provides detailed feedback on what's good, what needs improvement, and specific suggestions for getting better. Students get this feedback immediately instead of waiting days or weeks.\n\nFor essays, it evaluates structure, argument quality, evidence use, and writing mechanics. For code, it runs automated tests, checks for quality and security issues, and assesses algorithm efficiency. For math, it understands different solution approaches and can give partial credit for work that's on the right track.\n\nTeachers can customize rubrics, review anything the AI flagged as uncertain, and track how well students are improving over time.",
        flowComponent: "AssessmentFlowchart"
      },
      {
        id: "edtech-intervention",
        title: "Student Risk Early Warning System",
        summary: "Early warning system that identifies at-risk students weeks before they fail by monitoring academic performance, engagement metrics, and behavioral patterns. Suggests targeted interventions and tracks their effectiveness.",
        worksWellFor: "Colleges and universities, online degree programs, student success teams",
        fullDescription: "By the time a student is failing courses, it's often too late to help. The warning signs appear weeks earlier—declining assignment quality, missed deadlines, reduced participation, changes in login patterns. But with hundreds or thousands of students, these early signals get missed.\n\nOur system watches for these patterns across academic performance, engagement metrics, and behavioral indicators. When multiple risk factors align, it alerts advisors and suggests specific interventions based on what's worked for similar students before.\n\nThe goal isn't just to predict who'll drop out—it's to trigger help early enough to change outcomes. The system might recommend an advisor check in, suggest specific resources, or connect the student with a peer mentor. It tracks whether interventions work and adjusts recommendations accordingly.",
        flowComponent: "EarlyWarningFlowchart"
      },
      {
        id: "edtech-study-planner",
        title: "Personalized Study Planner Engine",
        summary: "Science-based study planner that optimizes learning retention using spaced repetition and interleaving techniques. Dynamically adjusts schedules based on progress, integrates with calendars, and balances multiple courses for effective exam preparation.",
        worksWellFor: "Individual students, test prep companies, study apps, academic coaching services",
        fullDescription: "Creating an effective study schedule requires understanding learning science—spaced repetition, interleaving, cognitive load management. Most students just cram before exams or review everything in the order it was taught, which isn't optimal for retention.\n\nThis platform builds study schedules based on what actually works. It spaces out review sessions according to forgetting curves, mixes different topics to improve retention, and schedules harder material during each student's peak performance hours. The calendar integrates with classes and other commitments, so plans are realistic.\n\nAs students progress, the system adjusts. If someone's mastering calculus faster than expected, it shifts focus to weaker areas. If they're falling behind on chemistry, it automatically adds more review sessions. The approach balances multiple courses and exam dates, optimizing for long-term retention rather than short-term cramming.",
        flowComponent: "StudyPlannerFlowchart"
      }
    ]
  },
  {
    id: 3,
    title: "Healthcare & Biotech",
    description: "Healthcare AI for patient triage, medical imaging analysis, and clinical decision support.",
    background: "/biotech.gif",
    products: [
    {
      id: "healthcare-triage-platform",
      title: "Intelligent Care Orchestration Platform",
      summary: "AI-powered healthcare triage system that guides patients to appropriate care levels based on symptoms and medical history. Provides 24/7 chronic disease management, medication reminders, and coordinates care across multiple providers.",
      worksWellFor: "Health systems, insurance companies, telemedicine platforms, chronic disease management programs",
      fullDescription: "Most health questions don't require an ER visit or even a doctor's appointment, but people often don't know where to go or who to call. This creates unnecessary emergency room crowding while patients wait hours for non-urgent issues.\n\nThe virtual assistant handles patient triage by asking about symptoms, medical history, and current medications. Based on this assessment, it recommends the appropriate care level—whether that's self-care at home, scheduling a telehealth appointment, visiting urgent care, or going to the emergency room.\n\nFor chronic conditions like diabetes or hypertension, it provides ongoing management support. Patients get medication reminders, lifestyle coaching, and symptom tracking. When readings suggest a problem developing, the system alerts care teams before it becomes serious. The assistant is available 24/7, speaks multiple languages, and can coordinate appointments across different providers.",
      flowComponent: "CareOrchestrationFlowchart"
    },
    {
      id: "healthcare-imaging-intelligence",
      title: "Medical Imaging Intelligence Fabric",
      summary: "AI-assisted medical imaging analysis that helps radiologists work more efficiently by providing preliminary scan analysis and flagging urgent findings. Works across all imaging modalities with confidence scoring and prioritization.",
      worksWellFor: "Hospitals, imaging centers, teleradiology services, rural healthcare facilities",
      fullDescription: "Radiologists are in short supply, and reading scans is time-intensive work that requires extreme precision. Meanwhile, imaging volumes keep growing. The AI doesn't replace radiologists—it helps them work more efficiently and catch things they might miss.\n\nWhen a scan comes in, the system provides a preliminary analysis, highlighting potential abnormalities for the radiologist to review. Critical findings like strokes or pulmonary embolisms get flagged immediately so urgent cases jump to the front of the queue. For routine scans, the AI's preliminary report gives radiologists a starting point, reducing reading time.\n\nThe system works across X-rays, CT scans, MRIs, ultrasounds, and mammography. It's trained to spot dozens of conditions and provides confidence scores on its findings. Radiologists still make all final decisions, but they're working with an AI assistant that never gets tired and has been trained on millions of images.",
      flowComponent: "MedicalImagingFlowchart"
    },
    {
      id: "healthcare-hospital-operations",
      title: "Operational Intelligence for Hospitals",
      summary: "Predictive hospital operations platform that forecasts patient admissions, ICU transfers, and optimal discharge timing. Enables proactive resource planning and identifies discharge-ready patients to optimize bed utilization and staffing.",
      worksWellFor: "Hospital systems, emergency departments, care coordination teams, capacity planners",
      fullDescription: "Hospitals constantly juggle bed availability, staffing levels, and patient flow. Unexpected admission surges create chaos, while delays in discharging stable patients waste resources and risk infections.\n\nThis system forecasts which emergency department patients will need admission, predicts ICU transfers, and estimates length of stay at admission. Hospitals can prepare beds and staff proactively instead of reacting to crises. More importantly, it identifies patients who are clinically ready for discharge but are still occupying beds, sometimes days earlier than discharge planning teams would notice.\n\nThe model considers clinical factors, social determinants, home support availability, and readmission risk. High-risk patients get flagged for enhanced post-discharge support. Resource planners use the forecasts to optimize bed allocation and staffing across departments.",
      flowComponent: "HospitalOperationsFlowchart"
    },
    {
      id: "biotech-knowledge-graph",
      title: "Biomedical Knowledge Graph Engine",
      summary: "Comprehensive biomedical knowledge system that integrates medical literature, clinical trials, and drug databases into a searchable platform. Enables evidence-based treatment recommendations and discovers hidden drug-disease connections.",
      worksWellFor: "Healthcare providers, pharmaceutical companies, medical researchers, clinical decision support systems",
      fullDescription: "Medical knowledge is growing exponentially—thousands of research papers published daily, new clinical trials starting constantly, treatment guidelines evolving. No individual can keep up with it all, yet doctors need this information to make treatment decisions.\n\nOur knowledge graph integrates medical literature, clinical trials, drug databases, and genetic information into a searchable system. Doctors can query it for differential diagnoses, treatment options, or drug interactions. The AI pulls relevant evidence and ranks recommendations by strength of evidence.\n\nFor researchers, it's a discovery tool. The graph can identify hidden connections—maybe a drug approved for one condition shows promise for another based on mechanism of action, or certain biomarkers correlate with treatment response across multiple diseases. These insights would take years to find manually.",
      flowComponent: "BiomedicalKnowledgeFlowchart"
    },
    {
      id: "clinical-trials-matching",
      title: "Clinical Trial Matching & Recruitment",
      summary: "Automated clinical trial matching system that screens patient records against thousands of active trials. Handles complex eligibility criteria and manages the entire enrollment process from matching to consent tracking.",
      worksWellFor: "Hospitals, research institutions, pharmaceutical companies, CROs, patient advocates",
      fullDescription: "Clinical trials need patients, patients need access to cutting-edge treatments, but matching them is incredibly manual. Research coordinators spend hours reviewing patient records against trial criteria, and most eligible patients never hear about relevant trials.\n\nThe system automatically screens patient records against eligibility criteria for thousands of active trials. When there's a match, it notifies both the care team and the patient. The AI handles complex inclusion/exclusion criteria that involve specific lab values, prior treatments, genetic markers, and disease characteristics.\n\nPatients can explore matched trials, see detailed information, and express interest through a portal. The system manages scheduling, consent forms, and enrollment tracking. For researchers, it forecasts enrollment rates and identifies why certain trials struggle to recruit.",
      flowComponent: "ClinicalTrialsFlowchart"
    }
  ]
  },
  {
    id: 4,
    title: "Enterprise SaaS",
    description: "Enterprise AI tools for project management, knowledge search, and business process automation.",
    background: "/enterprise.gif",
    products: [
      {
        id: "enterprise-project-management",
        title: "AI-powered Project Management Copilot",
        summary: "AI project management assistant that automates task breakdown, time estimation, and status reporting. Provides predictive analytics for project completion and suggests resource optimization strategies through natural language interface.",
        worksWellFor: "Software teams, project managers, product teams, consultants, agencies",
        fullDescription: "Project managers spend tons of time on status updates, task breakdowns, and figuring out why things are behind schedule. This copilot handles the mechanical parts so PMs can focus on actual problem-solving.\n\nTell it what you're building, and it breaks the project into tasks with time estimates and dependencies. It's not perfect, but it gives you a solid starting point that beats starting from scratch. As work progresses, the AI generates status summaries for different audiences—detailed for the team, high-level for executives.\n\nThe predictive piece is valuable too. Based on current velocity and task dependencies, it forecasts when things will actually finish (not when you hoped they'd finish). When bottlenecks appear, it suggests ways to parallelize work or shift resources. You can ask it questions in plain English: \"Why are we behind on the API integration?\" or \"What if we pushed the mobile launch to next sprint?\"",
        flowComponent: "ProjectManagementFlowchart"
      },
      {
        id: "enterprise-knowledge-retrieval",
        title: "Enterprise Knowledge Retrieval Copilot",
        summary: "Unified enterprise search platform that finds information across all company systems through natural language queries. Provides contextualized answers with source citations while maintaining security permissions and learning from usage patterns.",
        worksWellFor: "Companies over 50 people, especially those growing fast or with distributed teams",
        fullDescription: "Your company's knowledge is scattered across Google Drive, SharePoint, Confluence, Slack threads, email chains, and people's heads. Finding information means asking around, searching multiple systems, or interrupting someone who probably knows.\n\nThis chatbot searches everything at once and answers questions in natural language. It understands context, can handle follow-up questions, and cites its sources so you can verify the information. Security is built in—it only shows you information you have permission to see.\n\nThe value compounds over time. New employees get up to speed faster. Teams waste less time searching for documents or asking repetitive questions. Institutional knowledge gets captured instead of living only in senior employees' memories. The AI learns which answers are useful based on feedback and search patterns.",
        flowComponent: "KnowledgeRetrievalFlowchart"
      },
      {
        id: "enterprise-workflow-automation",
        title: "Workflow Automation Engine",
        summary: "Intelligent automation platform for business processes like approvals, contract reviews, and reporting. Handles routine tasks end-to-end while escalating exceptions to humans with full context and recommendations.",
        worksWellFor: "Finance teams, legal departments, HR operations, procurement, anyone drowning in process work",
        fullDescription: "Every company has workflows that follow predictable patterns but still require human involvement—expense approvals, contract reviews, monthly reports. These take time, create bottlenecks, and are prone to delays when someone's on vacation.\n\nThe bots handle these end-to-end. For approvals, they route requests to the right people, auto-approve low-risk items based on rules you set, and escalate unusual cases with context. For contracts, they flag risky clauses, check compliance requirements, and highlight deviations from standard terms. For reports, they pull data, generate visualizations, and distribute them on schedule.\n\nThe system connects your existing tools—ERP, CRM, HRIS, document management, email. When exceptions occur (and they always do), it escalates to humans with all the context needed to make a quick decision.",
        flowComponent: "WorkflowAutomationFlowchart"
      },
      {
        id: "enterprise-performance-analytics",
        title: "Performance Analytics Platform",
        summary: "Employee wellbeing analytics platform that detects early burnout signals through work pattern analysis. Provides managers with actionable insights for workload rebalancing and career development while maintaining privacy compliance.",
        worksWellFor: "HR teams, people analytics groups, companies serious about retention",
        fullDescription: "Burnout sneaks up gradually—increasing hours, declining engagement, stress signals in communication patterns. By the time someone quits or goes on stress leave, they've been struggling for weeks or months.\n\nThis system spots those early warning signs by analyzing work patterns, communication, calendar density, and performance trends. It's not tracking keystrokes or being creepy—it's looking at aggregate patterns that indicate stress: constant after-hours work, declining meeting participation, communication style changes.\n\nWhen risks appear, it gives managers specific, actionable guidance: maybe someone needs workload rebalancing, vacation time, different project assignments, or a conversation about career growth. The insights are private to managers and HR, and everything respects privacy laws and consent requirements.\n\nThe performance side predicts trajectories and identifies development needs before annual review season. This helps with succession planning, promotion decisions, and catching high performers who might be flight risks.",
        flowComponent: "PerformanceAnalyticsFlowchart"
      },
      {
        id: "enterprise-employee-onboarding",
        title: "Employee Onboarding Assistant",
        summary: "24/7 AI onboarding companion that answers new hire questions without judgment and guides them through checklists. Adapts to different roles and tracks progress to help managers identify struggling employees early.",
        worksWellFor: "Companies hiring regularly, especially remote or distributed teams",
        fullDescription: "New hires are flooded with information in their first weeks—policy manuals, system logins, org charts, acronyms nobody explains. They're afraid to ask basic questions because they don't want to look clueless. The AI companion gives them someone to ask those questions 24/7 without judgment. \"How do I submit an expense report?\" \"What does TPS stand for?\" \"Who's my backup if my manager's out?\" It knows company policies, system procedures, org structure, and benefits details. Beyond answering questions, it guides new hires through their onboarding checklist—documents to complete, training modules to finish, people to meet. For managers and HR, it tracks progress and flags people who seem stuck or disengaged early enough to help. The system adapts to different roles—engineers get more technical onboarding, salespeople get product and CRM training, remote employees get extra focus on communication tools and team connections.",
        flowComponent: "EmployeeOnboardingFlowchart"
      }
    ]
  },
  {
    id: 5,
    title: "APEX Framework",
    description: "AI Product Excellence methodology - a comprehensive framework for building successful AI products from conception to continuous management.",
    background: "/apex-framework.gif",
    isFramework: true,
    detailedDescription: "The APEX (AI Product Excellence) Framework is a comprehensive, battle-tested methodology I've developed for building successful AI products from initial concept through continuous management. This framework distills years of experience across fintech, healthcare, education, and enterprise software into a structured approach that minimizes risk and maximizes product-market fit.\n\nUnlike traditional software development methodologies, APEX specifically addresses the unique challenges of AI product development: data quality assessment, model validation, ethical considerations, and the iterative nature of machine learning systems. The framework encompasses 10 distinct phases: Product Strategy, Planning, Discovery & Validation, Development, Prototype & Testing, Go-to-Market Planning, Production Development, Launch, Post-Launch Management, and Continuous Product Management.\n\nEach phase includes specific deliverables, decision gates, and feedback loops designed to catch issues early and ensure your AI product delivers real business value. The framework has been successfully applied across industries, from risk scoring systems processing millions of transactions to personalized learning platforms serving thousands of students."
  }
];

export const experience = [
  {
    id: 1,
    title: "AI Product Manager & Lead Data Scientist",
    company: "Flyers Soft Pvt. Ltd.",
    period: "Sep 2023 - Present (2+ years)",
    location: "Lyon, France · Remote",
    achievements: [
      "As AI Product Manager (Sep 2024 - Present): Specialized in transforming custom, service-based projects into scalable, market-ready products by identifying common patterns in client needs and leading POC development to validate standardized solutions",
      "Successfully drove the company's shift towards a product-centric business model, creating repeatable revenue streams and owning product roadmaps for new AI offerings",
      "As Lead Data Scientist: Guided data science projects from conception to deployment, leading a team of 5 data scientists while shaping overall technical strategy",
      "Planned technical AI roadmap that guided successful delivery of 3 major client-facing AI features over 18 months",
      "Mentored team on complex topics like Generative AI and computer vision, enabling development of first LLM-based agent that handles 20% of initial customer support queries",
      "Built robust ML pipelines in collaboration with product and engineering teams, reducing average model deployment time from 4 weeks to under 1 week",
      "Developed over 2 proof-of-concept models with clients, achieving 75% conversion rate to full-scale, paid projects",
      "Defined and tracked model KPIs for key recommendation engine, improving click-through rate (CTR) by 22% and reducing prediction latency by 30%",
      "Led fine-tuning of domain-specific models, saving clients 10+ hours of manual work per week",
      "Oversaw end-to-end project lifecycle ensuring models maintained accuracy with no critical performance degradation 6 months post-deployment"
    ]
  },
  {
    id: 2,
    title: "Developer Advocate (Product)",
    company: "Eden AI",
    period: "2025 - Present",
    location: "Lyon, France",
    achievements: [
      "Promoted product adoption by creating compelling content, tutorials, and technical documentation",
      "Bridged client and development teams to facilitate user-centric product enhancements",
      "Created educational video content showcasing AI/ML integrations and best practices",
      "Drove community engagement through technical workshops and developer outreach programs"
    ]
  },
  {
    id: 3,
    title: "Founding Team Member (AI Solutions)",
    company: "Oncourse AI",
    period: "Feb 2023 - Aug 2023",
    location: "Bengaluru, India",
    achievements: [
      "Developed Turing, an AI-driven data science server, enhancing the efficiency and scalability of educational solutions",
      "Integrated advanced AI models to deliver robust, scalable solutions tailored to client needs",
      "Architected cloud infrastructure supporting 10,000+ concurrent users with 99.9% uptime",
      "Led technical strategy discussions and contributed to product roadmap planning for educational AI platform"
    ]
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "MFine",
    period: "2022 - 2023 (10 months)",
    location: "India",
    achievements: [
      "Developed a 'Smart Search Bar' using BERT, improving search accuracy by 30%",
      "Designed AI solutions for yoga pose verification using OpenCV, achieving a 90% success rate",
      "Built predictive models for patient health risk assessment, enabling early intervention strategies",
      "Collaborated with healthcare professionals to develop AI-driven diagnostic assistance tools"
    ]
  },
  {
    id: 5,
    title: "Software Engineer",
    company: "Temenos India Pvt. Ltd.",
    period: "2021-2022 (1.4 years)",
    location: "India",
    achievements: [
      "Built AI-powered virtual assistants for global banking clients using RASA, boosting operational efficiency by 40%",
      "Enhanced chatbot interfaces for better user experience, achieving a 95% client satisfaction rate",
      "Developed automated testing frameworks for conversational AI systems, reducing QA time by 60%",
      "Mentored junior developers and contributed to best practices documentation for AI implementation"
    ]
  }
];

export const education = [
  {
    id: 1,
    degree: "Programme Grande Ecole (Management, Product)",
    institution: "EMLyon Business School",
    location: "Lyon, France",
    year: "2024",
    exchange: {
      program: "Biopharma and Biotech Management",
      institution: "Université Claude Bernard Lyon 1 (UCBL)",
      description: "Specialized exchange program focusing on biotechnology and biopharmaceutical management"
    }
  },
  {
    id: 2,
    degree: "Master of Science (Machine Learning & AI)",
    institution: "Liverpool John Moores University",
    location: "UK",
    year: "2022"
  },
  {
    id: 3,
    degree: "PG Diploma (Machine Learning & AI)",
    institution: "IIIT",
    location: "Bengaluru, India",
    year: "2021"
  },
  {
    id: 4,
    degree: "Bachelor of Technology (Electronics & Communication Engineering)",
    institution: "SRM University",
    location: "Chennai, India",
    year: "2020"
  }
];

export const projects = [
  {
    id: 1,
    title: "LLM Product Building",
    company: "Flyers Soft",
    description: "Building comprehensive LLM-powered product solutions from conception to deployment",
    tags: ["Product Management", "LLM", "Strategic Planning", "AI Architecture", "Stakeholder Management"],
    impact: "Leading end-to-end product development with cross-functional teams"
  },
  {
    id: 2,
    title: "Recommendation Engine Optimization",
    company: "Flyers Soft",
    description: "Optimized core recommendation system for improved performance",
    tags: ["Machine Learning", "Optimization", "Recommendation Systems"],
    impact: "22% CTR increase, 30% latency reduction"
  },
  {
    id: 3,
    title: "Plant Disease Detection with YOLO v11",
    company: "Personal Project",
    description: "Advanced computer vision model for detecting plant diseases using state-of-the-art YOLO v11 architecture",
    tags: ["Computer Vision", "YOLO", "Agriculture Tech", "Python"],
    impact: "High-accuracy disease detection for agricultural applications"
  },
  {
    id: 4,
    title: "Student Motion Tracking System",
    company: "Personal Project", 
    description: "AI-powered system for tracking student engagement and motion in educational environments",
    tags: ["Computer Vision", "Motion Tracking", "Education Tech", "Python"],
    impact: "Enhanced learning analytics and engagement monitoring"
  },
  {
    id: 5,
    title: "Coffee Machine Failure Prediction",
    company: "Personal Project",
    description: "Predictive maintenance model for coffee machines using machine learning algorithms",
    tags: ["Predictive Analytics", "IoT", "Machine Learning", "Python"],
    impact: "Preventive maintenance optimization and cost reduction"
  },
  {
    id: 6,
    title: "GitHub Critic AI System",
    company: "Personal Project",
    description: "AI-powered code review and analysis tool with FastAPI backend and Streamlit frontend",
    tags: ["AI", "Code Analysis", "FastAPI", "Streamlit"],
    impact: "Automated code quality assessment and improvement suggestions"
  },
  {
    id: 7,
    title: "Smart Search Bar",
    company: "MFine",
    description: "BERT-powered search functionality for healthcare platform",
    tags: ["BERT", "NLP", "Search", "Healthcare"],
    impact: "30% improvement in search accuracy"
  },
  {
    id: 8,
    title: "Llama2 RAG Fusion System",
    company: "Personal Project",
    description: "Advanced Retrieval-Augmented Generation system using Llama2 for enhanced AI responses",
    tags: ["RAG", "Llama2", "NLP", "Jupyter"],
    impact: "Enhanced AI response accuracy with document-based context"
  },
  {
    id: 9,
    title: "COVID-19 Data Visualizer",
    company: "Personal Project",
    description: "Comprehensive data visualization dashboard for COVID-19 statistics and trends",
    tags: ["Data Visualization", "TypeScript", "Analytics", "Public Health"],
    impact: "Real-time pandemic data insights and trend analysis"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Senior Manager",
    company: "Flyers Soft",
    text: "Krishna's technical leadership and innovative approach to ML solutions have been instrumental in our product success. His ability to translate complex AI concepts into business value is exceptional."
  },
  {
    id: 2,
    name: "Product Team",
    company: "Eden AI",
    text: "As a Developer Advocate, Krishna excels at bridging the gap between technical complexity and user understanding. His content and tutorials have significantly improved our product adoption."
  },
  {
    id: 3,
    name: "Engineering Team",
    company: "MFine",
    text: "Krishna's work on our Smart Search Bar transformed user experience. His deep understanding of NLP and practical implementation skills make him a valuable team member."
  }
];





