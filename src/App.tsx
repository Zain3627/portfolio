import type { ReactNode } from 'react'
import { useState, useEffect, useRef } from "react"
import { NavLink, Navigate, Route, Routes, useLocation, useNavigate, useParams, Link } from 'react-router-dom'
import './App.css'

import bankLogin from '../media/java_banking_system/login_page.jpg'
import bankOperations from '../media/java_banking_system/operations.jpg'
import chatFirstPage from '../media/chatroom/first_page.jpg'
import chatSendMessages from '../media/chatroom/send_messages.jpg'
import chatServerSide from '../media/chatroom/server_side.jpg'
import chatShareMedia from '../media/chatroom/share_media.jpg'
import chatUsersJoining from '../media/chatroom/users_are_joining.jpg'
import faceMainMenu from '../media/facial_recognition_system/main_menu.jpg'
import faceRegister from '../media/facial_recognition_system/register_users_page.jpg'
import faceTest from '../media/facial_recognition_system/test_recognition.jpg'
import fplMainMenu from '../media/fpl_vision/main_menu.jpg'
import fplNewFeatures from '../media/fpl_vision/new_features_in_main_menu.jpg'
import fplPoints from '../media/fpl_vision/points_predictions.jpg'
import fplStats from '../media/fpl_vision/stats_preview.jpg'
import plPipelines from '../media/pl_predictor/pipelines.jpg'
import plPipelines2 from '../media/pl_predictor/pipelines2.jpg'
import plPipelines3 from '../media/pl_predictor/pipelines3.jpg'
import plPredictionPage from '../media/pl_predictor/prediction_page.jpg'
import awsCloudClubImage from '../media/aws-cloud-club-core-team.png'
import cpclogo from '../media/cpc-club.png'
import chatBotAvatar from '../media/chat-bot.png'
import profilePhoto from '../media/profile.jpg'
import gharbiyaLogo from '../media/gharbiya-logo.png'
import aastmtLogo from '../media/aastmt-logo.png'
import ragArchitecture from '../media/rag_chatbot/RAG_summary_pipeline.png'
import chatwindow from '../media/rag_chatbot/chat_window.png'
import chatintegration from '../media/rag_chatbot/chat_integration.png'
import summaryWHO from '../media/who_covid/summary.png'
import carAtRest from '../media/car/car_at_rest.png'
import points from '../media/car/points.jpeg'
import carSetsHeading from '../media/car/car_sets_heading.png'
import reachesGoal from '../media/car/reaches_goal.png'
import awsWorkshopOne from '../media/aws/1.jpg'
import awsWorkshopTwo from '../media/aws/2.jpg'
import awsFeedback from '../media/aws/feedback.png'
import cpcTasks from '../media/cpc/1.png'
import cpcHackathonOne from '../media/cpc/2.jpg'
import cpcHackathonTwo from '../media/cpc/3.jpg'

const cvUrl = new URL('../media/full_CV.pdf', import.meta.url).href
const transcript = new URL('../media/transcript.pdf', import.meta.url).href
const skillIconSources = import.meta.glob('../media/skills/*.{svg,png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const certificateUrls = [
  new URL('../media/certificates/2026-ECPC Q 1-PLACE.pdf', import.meta.url).href,
  new URL('../media/certificates/Zain Tamer Zain ElAbdin.pdf', import.meta.url).href,
  new URL('../media/certificates/Zain Tamer_certificate.pdf', import.meta.url).href,
  new URL('../media/certificates/jJd70oofeOlhQ7.pdf', import.meta.url).href,
  new URL('../media/certificates/lbKJygkFAGjHjz.pdf', import.meta.url).href,
  new URL('../media/certificates/sprintsXmicrosoft.pdf', import.meta.url).href,
  new URL('../media/certificates/cf.png', import.meta.url).href,
  new URL('../media/certificates/ai-engineer-1-badge.png', import.meta.url).href,
  new URL('../media/certificates/zindi.jpg', import.meta.url).href,
  new URL('../media/certificates/SOFTWAREENGINEERINGSOFTWAREDEVELOPERL1_Badge.pdf', import.meta.url).href,
  new URL('../media/certificates/2027-ECPC Q 1-Zain Tamer-PLACE.pdf', import.meta.url).href,
  new URL('../media/certificates/2027-ICPC Egyptian CPC-Zain Tamer-PLACE.pdf', import.meta.url).href,
  new URL('../media/certificates/team-image-2027.jpeg', import.meta.url).href,
  new URL('../media/certificates/Certificate-F-2020-E9281FABE74-04e8637ddd62ea4bafa37dc2d14a9980.pdf', import.meta.url).href,
  new URL('../media/certificates/nasa_2020.pdf', import.meta.url).href,
  new URL('../media/certificates/Octans.jpeg', import.meta.url).href,
  new URL('../media/certificates/nasa_covid_2019.pdf', import.meta.url).href,
  new URL('../media/certificates/Beam line certificate.pdf', import.meta.url).href,
]

// type MediaFrame = {
//   src: string
//   label: string
// }

interface ProjectMedia {
  src: string
  label: string
  fit?: 'cover' | 'contain'
}

interface Project {
  title: string
  subtitle: string
  summary: string
  technologies: string[]
  whatIDid: string[]
  impact: string[]
  media?: ProjectMedia[]
  note?: string
  date?: string          // optional — add later if you want it shown
  problem?: string       // optional — add later if you want it shown
  whatILearned?: string[] // optional — add later if you want it shown
  github?: string  
}

type ResearchItem = {
  title: string
  date: string
  summary: string
  contributions: string[]
  tagline: string
  highlights: string[]
  visual: 'papers' | 'vision' | 'algorithms'
  skills: string[]
  github?: string
}

type CertificateItem = {
  title: string
  fileUrl: string
  achievement: string
  learned: string[]
  fileType?: 'pdf' | 'image' // defaults to 'pdf' if omitted
  evidence?: {
    label: string
    fileUrl: string
    fileType?: 'pdf' | 'image'
  }[]
  date: string
}

type SkillItem = {
  name: string
  slug: string
  icon?: string
}

const homeSkillsFile: string[] = [
  'Python',
  'C',
  'Cplus-plus',
  'Csharp',
  'Java',
  'SQL',
  'Bash',
  'Pandas',
  'NumPy',
  'scikit-learn',
  'Matplotlib',
  'Seaborn',
  'Plotly',
  'TensorFlow',
  'Keras',
  'PyTorch',
  'FastAPI',
  'OpenCV',
  'Azure',
  'AWS',
  'Git',
  'GitHub',
  'hugging_face',
  'Linux',
  'ZenML',
  'MLflow',
  'Docker',
  'LangChain',
//   'CI/CD',
  'GitHub Actions',
  'Kubernetes',
  'Apache Hadoop',
  'Arduino',
//   'MQTT',
  'LaTeX',
]

const homeSkillsName: string[] = [
  'Python',
  'C',
  'C++',
  'C#',
  'Java',
  'SQL',
  'Bash',
  'Pandas',
  'NumPy',
  'scikit-learn',
  'Matplotlib',
  'Seaborn',
  'Plotly',
  'TensorFlow',
  'Keras',
  'PyTorch',
  'FastAPI',
  'OpenCV',
  'Azure',
  'AWS',
  'Git',
  'GitHub',
  'Hugging Face',
  'Linux',
  'ZenML',
  'MLflow',
  'Docker',
  'LangChain',
//   'CI/CD',
  'GitHub Actions',
  'Kubernetes',
  'Apache Hadoop',
  'Arduino',
//   'MQTT',
  'LaTeX',
]

function slugifySkillName(value: string) {
  return value
    .toLowerCase()
    .replace(/\+\+/g, 'plus-plus')
    .replace(/#/g, 'sharp')
    .replace(/\//g, ' ') // keep the matcher stable if a skill ever contains separators
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// maps a skill's slug to its identifier in homeSkillsFile
function findMatchingFileId(slug: string): string | undefined {
  return homeSkillsFile.find((fileId) => {
    const fileSlug = slugifySkillName(fileId)
    return fileSlug === slug || fileId.toLowerCase() === slug
  })
}

function resolveSkillItem(name: string): SkillItem {
  const slug = slugifySkillName(name)
  const fileId = findMatchingFileId(slug)

  const match = fileId
    ? Object.entries(skillIconSources).find(([path]) =>
        path.toLowerCase().includes(`/${fileId.toLowerCase()}.`)
      )
    : undefined

  return {
    name,
    slug,
    icon: match?.[1],
  }
}

const marqueeSkills = homeSkillsName.map(resolveSkillItem)

const projects: Project[] = [
    {
  title: 'RAG Knowledge Base Chatbot',
  subtitle: 'Production-Ready LLM Application',
  summary:
    'Built an end-to-end Retrieval-Augmented Generation (RAG) chatbot that answers questions over a custom knowledge base using LangChain, hybrid search, and a FastAPI backend deployed on AWS.',
  technologies: [
    'Python',
    'LangChain',
    'RAG',
    'Hybrid Search',
    'FAISS',
    'BM25',
    'FastAPI',
    'Docker',
    'AWS EC2',
    'REST API'
  ],
  whatIDid: [
    'Built a LangChain-based RAG pipeline integrating retrieval, prompt engineering, and LLM inference.',
    'Implemented hybrid retrieval by combining FAISS semantic search with BM25 keyword search using LangChain EnsembleRetriever.',
    'Developed a FastAPI backend exposing REST endpoints for document retrieval and question answering.',
    'Containerized the application with Docker and deployed it on an AWS EC2 instance.',
    'Integrated LangSmith tracing for monitoring and debugging LLM executions.'
  ],
  impact: [
    'Delivered a production-ready chatbot capable of answering questions over a custom knowledge base.',
    'Improved retrieval quality by combining semantic and lexical search techniques.',
    'Demonstrated practical LLM application development using modern AI and cloud technologies.'
  ],
  media: [
    { src: chatintegration, label: 'RAG chatbot interface' },
    { src: chatwindow, label: 'Chat window' },
    { src: ragArchitecture, label: 'RAG monitoring dashboard and observability' }
  ],
  github: 'https://github.com/Zain3627/<repo>',
  date: '2026'
},
  {
    title: 'Premier League Predictor',
    subtitle: 'End-to-End MLOps System',
    summary:
      'Built a complete pipeline to fetch football data, train a model classifier, generate fixture predictions, and project the league table in a Streamlit dashboard with a scheduled jobs to evaluate the model performance.',
    technologies: ['ZenML', 'MLflow', 'Supabase', 'SQL','ETL pipeline', 'AWS S3', 'Docker', 'AWS EC2', 'AWS ECR', 'cron'],
    whatIDid: [
      'Designed the ingestion, training, evaluation, and deployment flow as a reproducible pipeline.',
      'Used MLflow for experiment tracking, model registry, and champion model promotion.',
      'Stored intermediate datasets in Supabase PostgreSQL so execution stayed decoupled and maintainable.', 'Containerised the system with Docker, deployed to AWS EC2 via AWS ECR.', 'Scheduled weekly automated evaluation via cron — triggering a full retraining pipeline when live prediction accuracy dropped below threshold.'
    ],
    impact: [
      'Deployed on AWS EC2 with Docker and automated weekly re-training checks.',
      'Created a practical MLOps case study that shows production deployment thinking.',
    ],
    media: [
      { src: plPipelines, label: 'Pipeline orchestration overview' },
      { src: plPipelines2, label: 'Pipeline execution detail' },
      { src: plPipelines3, label: 'Retraining and evaluation path' },
      { src: plPredictionPage, label: 'Fixture prediction dashboard' },
    ],
    github: 'https://github.com/Zain3627/pl_predictor',
    date: '2026'
  },
  {
    title: 'FPL Vision',
    subtitle: 'AI-Powered Fantasy Premier League Assistant',
    summary:
      'Created a web assistant for Fantasy Premier League managers that produces player recommendations and expected points projections from a trained model.',
    technologies: ['Python', 'XGBoost', 'Streamlit', 'Azure App Service', 'Azure Blob Storage', 'GitHub Actions', 'Docker', 'SQL'],
    whatIDid: [
      'Aggregated and engineered features from the FPL REST API across 700+ players and 20 teams.',
      'Trained a model that predicts each player projected points, stored projected points using postgres server while updating the predicted points each gameweek',
      'Built a dashboard using Streamlit that combines predictions with live player and team statistics and hosted it in a container using Azure App Service.',
      'Automated deployment and updates using GitHub Actions.',
    ],
    impact: [
      'Delivered an end-to-end assistant that blends AI, data engineering, and product thinking.',
      'Deployed on Azure App Service for easy access and demoability.',
    ],
    media: [
      { src: fplMainMenu, label: 'Main menu and assistant entry point' },
      { src: fplNewFeatures, label: 'New feature highlights' },
      { src: fplPoints, label: 'Expected points prediction view' },
      { src: fplStats, label: 'Player statistics preview' },
    ],
    github: 'https://github.com/Zain3627/Fantasy_Premier_League_Predictor',
    date: '2026'
  },
  {
    title: 'Facial Recognition System',
    subtitle: 'Real-Time Identity Enrollment',
    summary:
      'Implemented a real-time facial recognition pipeline using a FaceNet backbone, a fine-tuned classification head, and a user enrollment workflow.',
    technologies: ['FaceNet', 'MediaPipe', 'Cosine Similarity', 'Docker', 'Hugging Face Spaces','Vector Embeddings'],
    whatIDid: [
      'Trained and evaluated the model on the LFW dataset to reach high recognition accuracy.',
      'Built multi-face detection and 128-dimensional embedding matching for real-time use.',
      'Containerized the demo and published it on Hugging Face Spaces.',
    ],
    impact: [
      'Shows practical computer vision, deployment, and user onboarding design.',
      'Reached 98% accuracy on the dataset used in the project.',
    ],
    media: [
      { src: faceMainMenu, label: 'Recognition system main menu' },
      { src: faceRegister, label: 'User registration page' },
      { src: faceTest, label: 'Recognition test screen' },
    ],
    github: 'https://github.com/Zain3627/Facial-Recognition-System',
    date: '2025'
  },
  {
    title: 'WHO COVID-19 Global Daily Data Analysis',
    subtitle: 'Data Exploration and Visualization',
    summary:
      'Performed exploratory analysis on more than 250,000 daily records across 200+ countries and regions to uncover public-health trends.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly', 'EDA', 'Feature Engineering'],
    whatIDid: [
      'Cleaned and transformed a large public dataset into analysis-ready tables.',
      'Used statistical plots and feature engineering to surface trends across countries and regions.',
      'Focused on storytelling through data and analysis quality.',
    ],
    impact: [
      'Highlights research-style analysis and visual communication skills.',
      'Demonstrates disciplined work with large real-world datasets.',
    ],
    media: [
      { src: summaryWHO, label: 'Global COVID-19 analysis summary dashboard' },
    ],
    github: 'https://github.com/Zain3627/WHO-COVID-19-global-daily-data-analysis-project',
    date: '2025'
  },
  {
    title: 'Autonomous Point-to-Point Smart Car',
    subtitle: 'Embedded Systems and Voice Control',
    summary:
      'Developed an autonomous ground vehicle that navigates to user-specified coordinates using onboard localization and motion control.',
    technologies: ['Arduino', 'MQTT', 'IMU Localization', 'Voice Recognition'],
    whatIDid: [
      'Integrated wireless command input and voice-based target control.',
      'Connected motion logic to sensor-driven localization.',
      'Built the control loop around embedded communication and navigation.',
    ],
    impact: [
      'Shows embedded systems thinking, autonomy, and control integration.',
      'Adds breadth beyond software-only projects.',
    ],
    media: [
      { src: carAtRest, label: 'Autonomous car at its starting position' },
      { src: points, label: 'Point-to-point navigation setup' },
      { src: carSetsHeading, label: 'Car aligning with the target heading' },
      { src: reachesGoal, label: 'Car reaching its target coordinates' },
    ],
    date: '2025'
  },
  {
    title: 'LAN Chat Room',
    subtitle: 'Real-Time Media Communication App',
    summary:
      'Engineered a LAN chatroom application that supports text, voice, and video communication using socket programming and multithreaded coordination.',
    technologies: ['Python', 'Sockets', 'Multithreading', 'Client-Server Architecture'],
    whatIDid: [
      'Implemented message exchange, presence handling, and media-sharing workflow.',
      'Built the client-server interaction to support up to 10 concurrent users.',
      'Kept the interactions lightweight so the app stayed responsive during media switching.',
    ],
    impact: [
      'Demonstrates strong networking fundamentals and communication design.',
      'Highlights hands-on system programming beyond machine learning projects.',
    ],
    media: [
      { src: chatFirstPage, label: 'First page and room entry screen' },
      { src: chatSendMessages, label: 'Message sending interface' },
      { src: chatServerSide, label: 'Server-side control panel' },
      { src: chatShareMedia, label: 'Media sharing screen' },
      { src: chatUsersJoining, label: 'Users joining the room' },
    ],
    github: 'https://github.com/Zain3627/Chatroom',
    date: '2024'
  },
  {
    title: 'Java Banking System',
    subtitle: 'Desktop Banking Workflow',
    summary:
      'Built a banking interface focused on secure login and basic banking operations using OOP principles and design patterns, emphasizing clear user flow and transaction handling.',
    technologies: ['Java', 'JavaFX', 'Desktop UI', 'OOP', 'Workflow Design'],
    whatIDid: [
      'Separated authentication from the post-login banking workflow.',
      'Designed the interface to keep common banking actions easy to follow.',
      'Used object-oriented design to keep the app structure understandable.',
    ],
    impact: [
      'A compact example of strong software structure and interface thinking.',
      'Shows a clean, practical application of OOP concepts.',
    ],
    media: [
      { src: bankLogin, label: 'Login page' },
      { src: bankOperations, label: 'Banking operations screen' },
    ],
    github: 'https://github.com/Zain3627/Banking-System-Java-Project',
    date: '2024'
  },
]

interface EducationEntry {
  institution: string
  degree: string
  start: string
  end: string
  description: string
  takeaways: string[]
  logo: string
  coursework?: string[]
  transcriptUrl?: string
}

interface ContributionEntry {
  organization: string
  role: string
  start: string
  end: string
  description: string
  contributions: string[]
  media: ProjectMedia[]
  logo: string
}


const educationTimeline: EducationEntry[] = [
  {
    institution: "Gharbiya STEM High School",
    degree: "STEM High School Diploma",
    start: "Sep 2019",
    end: "Jul 2022",
    description:
      "A boarding school experience that pushed me to grow well beyond academics — living away from home built independence, discipline, and teamwork skills I still rely on today. Graduated 2nd in my school and ranked 34th nationally in my senior year.",
    takeaways: [
  "Graduated 2nd in school and ranked 34th nationally.",
  "Completed 3 year-long interdisciplinary capstone projects.",
  "Developed independence and self-discipline through a 3-year boarding school experience.",
  "Strengthened teamwork, communication, and time management in project-based learning.",
  "Learned to collaborate effectively with teammates from diverse backgrounds."
],
      logo: gharbiyaLogo,
  },
  {
    institution: "Arab Academy for Science, Technology & Maritime Transport (AASTMT)",
    degree: "Bachelor of Science in Computer Engineering ",
    start: "Sep 2022",
    end: "Present",
    description: "Currently ranked 2nd in my class.",
    takeaways: [
  "Currently ranked 2nd in my class.",
  "Completed software engineering and AI projects with multiple teams.",
  "Strengthened collaboration, technical communication, and project planning.",
  "Built a solid foundation in computer engineering, algorithms, and artificial intelligence."
],
    logo: aastmtLogo,
    coursework: [
      "Discrete Mathematics",
      "Probability & Statistical Analysis",
      "Artificial Intelligence",
      "Data Analytics and Optimization",
      "Database Systems",
      "Computing Algorithms",
      "Object-Oriented Programming",
      "Data Structure & Algorithms",
      "Distributed and Parallel Systems",
      "Embedded Systems Design",
      "Cyber Security",
      "Intro to Intelligent Human Computer Interaction"
    ],
    transcriptUrl: transcript,
  },
]
const communityContributions: ContributionEntry[] = [
  {
    organization: "AWS Student Builder Group",
    role: "Core Team Member",
    start: "Mar 2026",
    end: "Present",
    description:
      "I help students move from hearing cloud terminology to understanding how real services fit together—and then give them space to build for themselves. Seeing someone discover a possible career path through a workshop is the kind of impact that keeps me volunteering.",
    contributions: [
      "Helped deliver a two-workshop learning journey: one session built the conceptual foundation, and the next moved into guided hands-on practice.",
      "Explained AWS Regions and Availability Zones, IaaS/PaaS/SaaS, scalability, fault tolerance, high availability, IAM, security, and core services including EC2, S3, and RDS.",
      "Guided learners through AWS Skill Builder labs and the process of launching a web page on an EC2 instance.",
      "Received meaningful attendee feedback describing a shift from knowing little about cloud computing to seriously considering it as a career path.",
    ],
    media: [
      { src: awsWorkshopOne, label: 'Guiding students through a hands-on AWS lab' },
      { src: awsWorkshopTwo, label: 'Students applying cloud concepts during the workshop' },
      { src: awsFeedback, label: 'Participant feedback after the two-workshop journey', fit: 'contain' },
    ],
    logo: awsCloudClubImage,
  },
  {
    organization: "Competitive Programming Club",
    role: "CP Coach",
    start: "Sep 2025",
    end: "Present",
    description:
      "Competitive programming taught me patience, precision, and how much faster people grow when difficult problems are discussed openly. As a coach, I try to make every session a place where students feel challenged, supported, and excited to try once more.",
    contributions: [
      "Lead recurring topic sessions on algorithms and structured problem-solving, alongside tutoring and recorded upsolving sessions.",
      "Completed more than 16 coaching sessions, dealing with different students and minds.",
      "Help organize competitive hackathons in collaboration with HackerRank, creating an energetic environment where students can test their skills under pressure.",
      "Turn contest solutions into reusable lessons so members improve not only their rankings, but also their confidence and way of thinking.",
    ],
    media: [
      { src: cpcTasks, label: 'A sample of completed coaching tasks in the CP Club workspace', fit: 'contain' },
      { src: cpcHackathonOne, label: 'Students collaborating and competing at an organized hackathon' },
      { src: cpcHackathonTwo, label: 'A focused HackerRank competition environment' },
    ],
    logo: cpclogo,
  },
]

const researchItems: ResearchItem[] = [
  {
    title:
      "AI Research Notes & Paper Reproductions",

    date: "Ongoing",

    summary:
      "A continuously growing collection of structured analyses of influential AI papers spanning machine learning, deep learning, NLP, computer vision, LLMs, and related fields. The repository documents methodologies, key findings, limitations, and implementation insights, with selected papers reproduced to validate experimental results and deepen understanding.",

    tagline: "A living lab for reading, testing, and explaining the AI papers shaping the field.",

    highlights: ["Structured paper analysis", "Selected result reproduction", "Methods, limits & implications"],

    visual: "papers",

    contributions: [
      "Summarized research papers across multiple AI domains using a consistent analytical framework.",
      "Documented methodologies, experimental setups, strengths, limitations, and future research directions.",
      "Maintained organized notes to build a long-term AI research knowledge base.",
      "Reproduced selected papers to verify published results and understand implementation details."
    ],

    skills: [
      "Research Analysis",
      "Paper Reproduction",
      "Literature Review",
      "Scientific Writing",
      "Experimental Design",
      "Machine Learning"
    ],

    github:
      "https://github.com/Zain3627/ai-research-summary"
  },

  {
    title:
      "An Experimental Analysis of Data Augmentation and Hyperparameter Tuning for Image Classification",

    date: "Oct 2025 – Dec 2025",

    summary:
      "Conducted an empirical study investigating how different data augmentation techniques and hyperparameter optimization strategies affect image classification performance across multiple deep learning architectures.",

    tagline: "Controlled experiments exploring what actually improves image-classification generalization.",

    highlights: ["Multiple CNN architectures", "Controlled augmentation trials", "Generalization evaluation"],

    visual: "vision",

    contributions: [
      "Designed controlled experiments to isolate the effect of augmentation techniques.",
      "Compared multiple CNN architectures under identical training conditions.",
      "Evaluated models using accuracy, convergence behavior, and generalization performance.",
      "Documented experimental findings through quantitative analysis and visualizations."
    ],

    skills: [
      "PyTorch",
      "Computer Vision",
      "Image Classification",
      "Hyperparameter Tuning",
      "Experimental Design",
      "Model Evaluation"
    ],

    github:
      "https://github.com/Zain3627/An-Experimental-Analysis-of-Data-Augmentation-and-Hyperparameter-Tuning-for-Image-Classification"
  },

  {
    title:
      "Experimental Comparison of Quicksort and BFPRT for K-th Element Selection",

    date: "Feb 2025",

    summary:
      "Implemented and benchmarked deterministic and randomized selection algorithms to compare their theoretical complexity with empirical runtime behavior across varying input sizes.",

    tagline: "A theory-versus-runtime investigation of deterministic and randomized selection.",

    highlights: ["Algorithms built from scratch", "Multi-size benchmarks", "Theory compared with runtime"],

    visual: "algorithms",

    contributions: [
      "Implemented Quicksort-based and BFPRT selection algorithms from scratch.",
      "Designed benchmarking experiments using multiple dataset sizes.",
      "Compared observed runtime against theoretical complexity.",
      "Analyzed algorithmic trade-offs through empirical performance evaluation."
    ],

    skills: [
      "Algorithms",
      "Benchmarking",
      "Complexity Analysis",
      "Performance Evaluation",
      "Experimental Design"
    ],

    github:
      "https://github.com/Zain3627/quicksort-bfprt-kth-selection-analysis"
  }
]

const certificateItems: CertificateItem[] = [
  {
    title: 'Qualified for the 2026 ECPC Finals',
    fileUrl: certificateUrls[10].toString(),
    achievement:
      'Placed 22nd in the 2026 ECPC qualification round and advanced to the Egyptian Collegiate Programming Contest finals, where the team competed among the country’s strongest collegiate teams and placed 166th. This improved on the team’s 37th-place qualification result in 2025.',
    learned: [
      'Improved the qualification placement by 15 positions year over year, progressing from 37th to 22nd.',
      'Strengthened team strategy, rapid problem selection, implementation, and debugging under contest pressure.',
      'Earned experience competing at the ECPC finals level against Egypt’s top qualifying teams.',
    ],
    evidence: [
      {
        label: 'ECPC Qualifications — 22nd Place',
        fileUrl: certificateUrls[10].toString(),
      },
      {
        label: 'ECPC Finals — 166th Place',
        fileUrl: certificateUrls[11].toString(),
      },
      {
        label: 'Team Photo',
        fileUrl: certificateUrls[12].toString(),
        fileType: 'image',
      },
    ],
    date: 'Aug 2026',
  },
  {
    title: 'Second Place In HackerRank x CPClub AAST Event',
    fileUrl: certificateUrls[2].toString(),
    achievement:
      'Placed 2nd in a competitive algorithmic problem-solving event hosted by HackerRank x CPClub AAST.',
    learned:
      ['Solved multiple competitive programming problems involving data structures and algorithms.', 'Improved implementation speed and debugging efficiency under strict time constraints.'],
    date: 'Apr 2026',
  },
  {
    title: 'Completed Machine Learning Engineer Intern – Digital Egypt Pioneers Initiative',
    fileUrl: certificateUrls[1].toString(),
    achievement:
      'Completed a structured 180-hour applied ML programme covering data engineering, computer vision, NLP, and cloud deployment, with hands-on delivery across all domains.',
    learned: [
  'Designed and deployed end-to-end machine learning solutions for computer vision, NLP, and predictive analytics, covering data preprocessing, feature engineering, model training, evaluation, and deployment using Azure Machine Learning, Azure App Service, and Azure Blob Storage.',
  'Collaborated in a team to deliver a real-world capstone project, applying task distribution, version control, communication, and collaborative software development practices to meet project milestones.'
  ],
    date: 'Dec 2025',
  },
  {
    title: 'Reached Specialist on Codeforces',
    fileUrl: certificateUrls[6].toString(),
    achievement:
      'Reached Specialist rank on Codeforces with a rating of 1448, reflecting consistent competitive programming performance.',
    learned:
     [ 'Solved hundreds of algorithmic problems across multiple difficulty levels.', 'Strengthened graph algorithms, dynamic programming, greedy algorithms, and binary search.', 'Improved problem-solving speed during time constrained competitive contests.'],
    fileType: 'image',
    date: 'Nov 2025',
  },
  {
    title: 'Artificial Intelligence Engineer 1',
    fileUrl: certificateUrls[7].toString(),
    achievement:
    'Completed the Artificial Intelligence Engineer 1 learning path on Coursera, covering foundational AI engineering concepts and skills.',
    learned:
    ['Studied core AI concepts including machine learning, neural networks, and natural language processing', 'Closed a gap between theoretical ML knowledge and engineering-grade implementation practices.'],
    fileType: 'image',
    date: 'Oct 2025',
  },
  {
    title: 'Sprints x Microsoft Summer Camp – AI and Machine Learning',
    fileUrl: certificateUrls[5].toString(),
    achievement:
      'Completed a Microsoft-supported AI & Machine Learning summer program, gaining practical experience with the end-to-end machine learning workflow through hands-on exercises and projects.',
    learned:
      ['Applied data preprocessing, feature engineering, and train/test validation workflows.', 'Built and evaluated machine learning models on practical datasets.'],
    date: 'Oct 2025',
  },
  {
    title: 'Participated in ECPC (Egyptian Collegiate Programming Contest) Qualifications',
    fileUrl: certificateUrls[0].toString(),
    achievement:
      'Participated in the Egyptian Collegiate Programming Contest (ECPC) qualification round.',
    learned:
      ['Practiced collaborative problem solving in a team environment.', 'Improved optimization, debugging, and solution verification under pressure.'],
    date: 'Jul 2025',
  },
  {
    title: 'Zindi Financial Inclusion in Africa Competition',
    fileUrl: certificateUrls[8].toString(),
    achievement:
      'Ranked 15th on the leaderboard out of over 2,000 participants in a competitive data science challenge focused on financial inclusion in Africa.',
    learned:
      ['Built an end-to-end machine learning pipeline for a real-world tabular dataset.', 'Doing research and development trials through evaluating models using competition metrics while iterating through multiple experiments.'],
    fileType: 'image',
    date: 'Jun 2025',
  },  
  {
    title: 'IEEEXtreme Programming Competition',
    fileUrl: certificateUrls[3].toString(),
    achievement:
      'Ranked in top 2% in the Egyptian region and in top 20% worldwide from over 8000 teams',
    learned:
      ['Solved advanced algorithmic problems over a continuous 24-hour contest', 'Improved endurance, time management, and task prioritization in long competitions.'],
    date: 'Oct 2024',
  },
  {
    title: 'Completed Software Engineer Developer Roadmap',
    fileUrl: certificateUrls[9].toString(),
    achievement:
    'Completed the Software Engineering (Software Developer) L1 certification, demonstrating foundational knowledge of software development principles, programming, version control, and professional engineering practices.',

    learned: [
    'Applied core software engineering concepts, including object-oriented programming, Git version control, debugging, testing, and clean code principles.',
    'Strengthened knowledge of the software development lifecycle (SDLC), collaborative development workflows, and industry-standard practices for designing, building, and maintaining software systems.'
    ],
    date: 'Oct 2024',
  },
  {
    title: 'Bronze Honour — International Youth Math Challenge',
    fileUrl: certificateUrls[13].toString(),
    achievement:
      'Reached the final round of the 2020 International Youth Math Challenge, scored 13 points in the supervised 30-question exam, and placed among the top 15% of all participants.',
    learned: [
      'Applied broad mathematical knowledge across a demanding international challenge.',
      'Strengthened accuracy, reasoning, and time management in a supervised final-round examination.',
    ],
    date: 'Dec 2020',
  },
  {
    title: 'NASA Space Apps Cairo Hackathon',
    fileUrl: certificateUrls[14].toString(),
    achievement:
      'Recognized by IEEE Young Professionals Egypt and the NASA Space Apps Cairo organizing committee for exceptional contribution and online participation in the sixth edition of the hackathon.',
    learned: [
      'Practiced collaborative problem-solving in an interdisciplinary hackathon environment.',
      'Developed experience turning an open-ended challenge into a focused solution under time constraints.',
    ],
    date: 'Oct 2020',
  },
  {
    title: 'CERN Beamline for Schools Competition',
    fileUrl: certificateUrls[17].toString(),
    achievement:
      'As a member of Gharbiya STEM’s Stemadrons team, successfully submitted an experimental proposal to the seventh CERN Beamline for Schools competition.',
    learned: [
      'Helped shape scientific ideas into a structured experimental proposal.',
      'Strengthened physics research, scientific communication, and teamwork through an international competition.',
    ],
    date: 'Jun 2020',
  },
  {
    title: 'NASA Space Apps COVID-19 Challenge',
    fileUrl: certificateUrls[16].toString(),
    achievement:
      'Recognized for exceptional contribution and online participation in the NASA Space Apps COVID-19 virtual hackathon held on May 30–31, 2020.',
    learned: [
      'Collaborated remotely on a time-sensitive, real-world global challenge.',
      'Applied research, teamwork, and rapid solution development in a virtual hackathon setting.',
    ],
    date: 'May 2020',
  },
  {
    title: 'Octans Math Tournament — Preliminary Round',
    fileUrl: certificateUrls[15].toString(),
    achievement:
      'Participated in the preliminary round of the international Octans Math Tournament held in 2020.',
    learned: [
      'Tested mathematical reasoning through tournament-style problems.',
      'Built confidence engaging with challenging mathematics beyond the school curriculum.',
    ],
    fileType: 'image',
    date: '2020',
  },
]


const contactLinks = [
  // {
  //   label: 'Email',
  //   value: 'zaintamer10@gmail.com',
  //   href: 'mailto:zaintamer10@gmail.com',
  // },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/zaintamer',
    href: 'https://linkedin.com/in/zaintamer',
    description: 'Professional experience, updates, and conversations.',
  },
  {
    label: 'GitHub',
    value: 'github.com/Zain3627',
    href: 'https://github.com/Zain3627',
    description: 'Software projects, AI experiments, and research work.',
  },
  {
    label: 'Codeforces',
    value: 'codeforces.com/profile/Zain3627',
    href: 'https://codeforces.com/profile/Zain3627',
    description: 'Competitive programming progress and contest history.',
  },
  {
    label: 'Kaggle',
    value: 'kaggle.com/zaintamer',
    href: 'https://www.kaggle.com/zaintamer',
    description: 'Data science notebooks, competitions, and applied ML.',
  },
]

// new chat insertings

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: number
  role: 'bot' | 'user'
  content: string
  error?: boolean
}

// ─── FastAPI skeleton ─────────────────────────────────────────────────────────

// const FASTAPI_BASE = '' // TODO: update to your deployed URL

async function askChatbot(question: string): Promise<string> {
  const response = await fetch(`/api/ask`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ question }),
})

  if (!response.ok) {
    throw new Error(`Server responded with ${response.status}`)
  }

  const data = await response.json()

  // TODO: adjust key to match your FastAPI response shape, e.g. data.answer
  if (!data.answer) throw new Error('Unexpected response format')
  return data.answer as string
}

// ─── Layout ───────────────────────────────────────────────────────────────────

function SiteLayout({ children }: { children: ReactNode }) {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <div className="page-shell">
      <header className="topbar">
        <Link className="topbar-brand" to="/" aria-label="Zain Tamer — Home">
          <span className="topbar-monogram" aria-hidden="true">ZT</span>
          <span className="topbar-identity">
            <span className="topbar-label">Zain Tamer</span>
            <span className="topbar-role">AI engineer · Software developer</span>
          </span>
        </Link>
        <nav className="nav" aria-label="Primary">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : undefined)}>Home</NavLink>
          <NavLink to="/projects" className={({ isActive }) => (isActive ? 'active' : undefined)}>Projects</NavLink>
          <NavLink to="/research" className={({ isActive }) => (isActive ? 'active' : undefined)}>Research</NavLink>
          <NavLink to="/volunteering" className={({ isActive }) => (isActive ? 'active' : undefined)}>Volunteering</NavLink>
          <NavLink to="/certificates" className={({ isActive }) => (isActive ? 'active' : undefined)}>Certificates</NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : undefined)}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : undefined)}>Contact</NavLink>
        </nav>
      </header>
      <main className="content">{children}</main>
      <footer className="site-footer">
        <div className="footer-intro">
          <p className="footer-label">Let’s build something meaningful</p>
          <p className="footer-name">Ideas, engineered into useful products.</p>
          <p className="footer-role">AI Engineer & Software Developer based in Alexandria, Egypt.</p>
          <Link className="footer-contact-link" to="/contact">Start a conversation <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="footer-links">
          <div>
            <p className="footer-label">Explore</p>
            <Link to="/projects">Projects</Link>
            <Link to="/research">Research</Link>
            <Link to="/volunteering">Volunteering</Link>
          </div>
          <div>
            <p className="footer-label">Connect</p>
            <a href="https://linkedin.com/in/zaintamer" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/Zain3627" target="_blank" rel="noreferrer">GitHub</a>
            <a href="mailto:zaintamer10@gmail.com">Email</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Zain Tamer</p>
          <p>Learning deeply. Building thoughtfully. Sharing openly.</p>
        </div>
      </footer>
      <Link
        to="/chat"
        className="chat-bubble"
        aria-label="Open Chat with Zain's bot"
        data-tooltip="Chat with Zain's bot"
      >
        <img className="chat-bubble__icon" src={chatBotAvatar} alt="" aria-hidden="true" />
      </Link>
    </div>
  )
}

// ─── Chat Page ────────────────────────────────────────────────────────────────

const WELCOME_MSG: Message = {
  id: 0,
  role: 'bot',
  content: "Hi! I'm Zain's AI assistant. Ask me anything about his work, projects, or experience.",
}

const MAX_CHAT_MESSAGE_LENGTH = 150

function TypingIndicator() {
  return (
    <div className="msg-row bot">
      <div className="chat-avatar" aria-hidden="true">Z</div>
      <div className="bubble bot typing-bubble">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    </div>
  )
}

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MSG])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const idCounter = useRef(1)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function sendMessage() {
    const text = input.trim()
    if (!text || loading) return

    if (text.length > MAX_CHAT_MESSAGE_LENGTH) {
      setMessages(prev => [
        ...prev,
        {
          id: idCounter.current++,
          role: 'bot',
          content: `Maximum message length is ${MAX_CHAT_MESSAGE_LENGTH} characters. Please shorten your question and try again.`,
          error: true,
        },
      ])
      setTimeout(() => inputRef.current?.focus(), 50)
      return
    }

    const userMsg: Message = { id: idCounter.current++, role: 'user', content: text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const answer = await askChatbot(text)
      setMessages(prev => [
        ...prev,
        { id: idCounter.current++, role: 'bot', content: answer },
      ])
    } catch (err) {
      const detail =
        err instanceof Error ? err.message : 'Unknown error'
      setMessages(prev => [
        ...prev,
        {
          id: idCounter.current++,
          role: 'bot',
          content: `Sorry, I couldn't reach the server right now. (${detail}) Please try again later.`,
          error: true,
        },
      ])
    } finally {
      setLoading(false)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="chat-page">
      <div className="chat-header-card">
        <div className="chat-header-copy">
          <p className="eyebrow">Portfolio assistant</p>
          <h1>Ask beyond the résumé.</h1>
          <p>Explore the thinking, tools, and stories behind my work.</p>
        </div>
        <div className="chat-agent-card">
          <img className="chat-header-avatar" src={chatBotAvatar} alt="Zain's AI assistant" />
          <div>
            <p className="chat-header-name">Zain’s AI guide</p>
            <p className="chat-header-status">
              <span className="status-dot" aria-hidden="true" />
              Ready to help
            </p>
          </div>
        </div>
      </div>

      <div className="chat-suggestions" aria-label="Suggested questions">
        <span>Try asking</span>
        {[
          "Which project best shows Zain's AI skills?",
          "Tell me about Zain's research experience.",
          "Tell me about Zain's volunteering.",
        ].map(prompt => (
          <button key={prompt} type="button" onClick={() => {
            setInput(prompt)
            inputRef.current?.focus()
          }}>
            {prompt}
          </button>
        ))}
      </div>

      <div className="chat-window">
        <div className="chat-window-bar">
          <div aria-hidden="true">
            <span className="chat-window-dot" />
            <span className="chat-window-dot" />
            <span className="chat-window-dot" />
          </div>
          <p>Conversation with portfolio assistant</p>
          <span className="chat-window-badge">AI</span>
        </div>

        <div className="chat-messages" role="log" aria-live="polite" aria-label="Chat messages">
          {messages.map(msg =>
            msg.role === 'bot' ? (
              <div key={msg.id} className="msg-row bot">
                <img className="chat-avatar" src={chatBotAvatar} alt="" aria-hidden="true" />
                <div className={`bubble bot${msg.error ? ' bubble-error' : ''}`}>
                  {msg.error && <span className="error-icon" aria-label="Error">⚠ </span>}
                  {msg.content}
                </div>
              </div>
            ) : (
              <div key={msg.id} className="msg-row user">
                <div className="chat-avatar user-avatar" aria-hidden="true">You</div>
                <div className="bubble user">{msg.content}</div>
              </div>
            )
          )}

          {loading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        <div className="chat-input-row">
          <input
            ref={inputRef}
            className="chat-input"
            type="text"
            placeholder="Ask about a project, skill, or experience…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            maxLength={MAX_CHAT_MESSAGE_LENGTH}
            aria-label="Message input"
          />
          <span className="chat-character-count">{input.length}/{MAX_CHAT_MESSAGE_LENGTH}</span>
          <button
            className="chat-send-btn"
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            aria-label="Send message"
          >
            <span>Send</span>
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </div>
  )
}

function HomePage() {
  return (
    <SiteLayout>
      <section className="page page--home">
        <div className="home-layout">
          <section className="home-hero">
            <div className="home-hero-copy">
              <p className="home-kicker"><span aria-hidden="true" /> Hello, I’m Zain.</p>
              <h1 className="home-display">I turn deep curiosity into <em>software that works.</em></h1>
              <p className="home-roles">AI Engineer <span>·</span> Software Developer <span>·</span> Researcher</p>
              <p className="home-introduction">
                I build intelligent and reliable software—from machine-learning pipelines and computer-vision systems to cloud-deployed applications. Competitive programming sharpens how I solve problems; research deepens how I understand them; volunteering reminds me to bring others along.
              </p>

              <div className="home-difference">
                <p className="card-label">Different disciplines. One way of thinking.</p>
                <p>
                  Competitive programming teaches me precision. Research keeps me curious. Software engineering turns ideas into reliable solutions. Teaching reminds me that knowledge matters most when it helps others grow.
                </p>
              </div>

              <div className="cta-row home-actions">
                <NavLink className="button button--primary" to="/projects">Explore my work</NavLink>
                <NavLink className="button" to="/about">More about me</NavLink>
                <a className="button" href={cvUrl} target="_blank" rel="noreferrer">Open CV ↗</a>
              </div>
            </div>

            <aside className="home-portrait-column">
              <div className="home-portrait">
                <img src={profilePhoto} alt="Zain Tamer Zain ElAbdin" />
                <div className="home-location-badge">
                  <span aria-hidden="true">●</span>
                  Alexandria, Egypt
                </div>
              </div>
              <div className="home-now-card">
                <span className="home-now-dot" aria-hidden="true" />
                <div>
                  <p className="card-label">Final semester</p>
                  <strong>Completing my Computer Engineering degree and preparing for graduation.</strong>
                </div>
              </div>
            </aside>
          </section>

          <section className="home-proof" aria-label="Selected achievements">
            <div><strong>3.98</strong><span>CGPA / 4.0</span></div>
            <div><strong>#2</strong><span>in my university class</span></div>
            <div><strong>Specialist</strong><span>Codeforces · 1448 rating</span></div>
            <div><strong>Finalist</strong><span>2026 ECPC</span></div>
          </section>

          <section className="home-current" aria-labelledby="home-current-title">
            <div className="home-current-heading">
              <p className="eyebrow">Currently exploring</p>
              <h2 id="home-current-title">Finishing one chapter. Actively shaping the next.</h2>
              <p>
                I am in my final university semester, bringing together years of study, experimentation, competition, and community work as I prepare for graduation.
              </p>
            </div>
            <div className="home-current-grid">
              <article>
                <span>01</span>
                <div><h3>AI research</h3><p>Building a public GitHub research project that investigates, reproduces, and analyzes influential and fast-moving AI papers.</p></div>
              </article>
              <article>
                <span>02</span>
                <div><h3>Industry opportunity</h3><p>Seeking an AI or software engineering role where I can turn ideas into dependable solutions and learn alongside industry innovators.</p></div>
              </article>
              <article>
                <span>03</span>
                <div><h3>Graduate study</h3><p>Exploring AI master’s programs that will let me deepen my research foundations and contribute to meaningful advances in the field.</p></div>
              </article>
              <article>
                <span>04</span>
                <div><h3>Graduation</h3><p>Completing my final semester in Computer Engineering and preparing to graduate in February 2027.</p></div>
              </article>
            </div>
          </section>

          <section className="home-journey" aria-labelledby="home-journey-title">
            <div className="home-section-heading">
              <p className="eyebrow">My journey</p>
              <h2 id="home-journey-title">From mathematical curiosity to intelligent systems.</h2>
              <p>Each stage added a different dimension to the engineer I am becoming.</p>
            </div>
            <div className="home-timeline">
              <article>
                <p className="home-timeline-date">2019–2022</p>
                <span aria-hidden="true" />
                <h3>Foundations</h3>
                <p>Studied at Gharbiya STEM, explored advanced mathematics and mechanics, and founded M2C to help other students learn.</p>
              </article>
              <article>
                <p className="home-timeline-date">2022–Present</p>
                <span aria-hidden="true" />
                <h3>Computer Engineering</h3>
                <p>Built foundations across algorithms, software systems, embedded engineering, data, and AI while ranking second in my class.</p>
              </article>
              <article>
                <p className="home-timeline-date">2024–2026</p>
                <span aria-hidden="true" />
                <h3>Building & Competing</h3>
                <p>Developed end-to-end AI and software projects, reached Codeforces Specialist, and advanced to the ECPC finals.</p>
              </article>
              <article>
                <p className="home-timeline-date">Now</p>
                <span aria-hidden="true" />
                <h3>Research & Impact</h3>
                <p>Analyzing influential AI research, teaching technical communities, and looking for the team where I can build what comes next.</p>
              </article>
            </div>
          </section>


          <section className="home-paths" aria-labelledby="home-paths-title">
            <div className="home-section-heading">
              <p className="eyebrow">Explore</p>
              <h2 id="home-paths-title">Choose a side of my story.</h2>
            </div>
            <div className="home-path-grid">
              <Link to="/projects" className="home-path-card">
                <span className="home-path-number">01</span>
                <p className="card-label">Build</p>
                <h3>Projects</h3>
                <p>AI systems, software applications, embedded work, and cloud-deployed products.</p>
                <strong>See what I build →</strong>
              </Link>
              <Link to="/research" className="home-path-card">
                <span className="home-path-number">02</span>
                <p className="card-label">Investigate</p>
                <h3>Research</h3>
                <p>Paper analysis, controlled experiments, reproduction, and evidence-led technical inquiry.</p>
                <strong>See how I think →</strong>
              </Link>
              <Link to="/volunteering" className="home-path-card">
                <span className="home-path-number">03</span>
                <p className="card-label">Give back</p>
                <h3>Volunteering</h3>
                <p>Teaching, mentoring, workshops, and communities built around shared curiosity.</p>
                <strong>See how I contribute →</strong>
              </Link>
            </div>
          </section>

          <section className="skills-marquee" aria-label="Skills moving bar">
            <div className="skills-marquee__track">
              {marqueeSkills.map((skill, index) => (
                <div key={`${skill.slug}-${index}`} className="skills-pill">
                  <span className="skills-pill__icon" aria-hidden="true">
                    {skill.icon ? <img src={skill.icon} alt="" /> : skill.name.slice(0, 1)}
                  </span>
                  <span>{skill.name}</span>
                </div>
              ))}
              {marqueeSkills.map((skill, index) => (
                <div key={`${skill.slug}-dup-${index}`} className="skills-pill" aria-hidden="true">
                  <span className="skills-pill__icon" aria-hidden="true">
                    {skill.icon ? <img src={skill.icon} alt="" /> : skill.name.slice(0, 1)}
                  </span>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </SiteLayout>
  )
}
function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function ProjectsPage() {
  const navigate = useNavigate()
  return (
    <SiteLayout>
      <section className="page page--projects">
        <header className="projects-hero">
          <div className="projects-hero-copy">
            <p className="home-kicker"><span aria-hidden="true" /> Projects</p>
            <h1>Ideas become valuable when they become <em>working systems.</em></h1>
            <p>From AI pipelines and cloud applications to embedded systems and networking, these projects show how I move from problem definition to implementation and delivery.</p>
          </div>
          <aside className="projects-map" aria-label="Project disciplines">
            <p className="card-label">My engineering range</p>
            <div className="projects-map-core">Build</div>
            <span className="projects-map-node projects-map-node--ai">AI</span>
            <span className="projects-map-node projects-map-node--software">Software</span>
            <span className="projects-map-node projects-map-node--cloud">Cloud</span>
            <span className="projects-map-node projects-map-node--systems">Systems</span>
          </aside>
        </header>

        <div className="projects-snapshot" aria-label="Projects overview">
          <div><strong>{projects.length}</strong><span>documented builds</span></div>
          <div><strong>AI + SW</strong><span>models through applications</span></div>
          <div><strong>End to end</strong><span>from idea to deployment</span></div>
        </div>

        <div className="projects-section-heading">
          <p className="eyebrow">Selected work</p>
          <h2>Explore the systems behind the outcomes.</h2>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => {
            const slug = slugify(project.title)
            return (
              <article
                key={slug}
                className="project-card project-card--compact"
                onClick={() => navigate(`/projects/${slug}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") navigate(`/projects/${slug}`)
                }}
              >
                <span className="project-card-index">0{index + 1}</span>
                {project.media?.[0] && (
                  <div className="project-card-media">
                    <img
                      src={project.media[0].src}
                      alt={`${project.title} cover`}
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="project-card-body">
                  <p className="card-label">{project.subtitle}</p>
                  <div className="project-card-heading">
                    <h3>{project.title}</h3>
                    {project.date && <span className="project-card-date">{project.date}</span>}
                  </div>
                  <p className="project-card-summary">{project.summary}</p>
                  <ul className="chip-row">
                    {project.technologies.slice(0, 4).map((item) => (
                      <li key={item} className="chip">
                        {item}
                      </li>
                    ))}
                    {project.technologies.length > 4 && (
                      <li className="chip chip--muted">
                        +{project.technologies.length - 4}
                      </li>
                    )}
                  </ul>
                  {project.github && (
                    
                      <a href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="github-button"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View on GitHub ↗
                    </a>
                  )}
                </div>
              </article>
            )
          })}
        </div>

        <section className="projects-closing">
          <div><p className="eyebrow">Build with me</p><h2>Have a problem worth turning into a reliable product?</h2></div>
          <Link className="button button--primary" to="/contact">Start a conversation</Link>
        </section>
      </section>
    </SiteLayout>
  )
}

function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => slugify(p.title) === slug)
  const [lightboxImage, setLightboxImage] = useState<ProjectMedia | null>(null)

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxImage(null)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  if (!project) {
    return <Navigate to="/projects" replace />
  }

  return (
    <SiteLayout>
      <section className="page page--project-detail">
        <Link to="/projects" className="back-link">
          ← All projects
        </Link>

        <header className="project-detail-header">
          <p className="card-label">{project.subtitle}</p>
          <h1>{project.title}</h1>
          {project.date && <p className="project-detail-date">{project.date}</p>}
          <p className="project-detail-summary">{project.summary}</p>
        </header>

        {project.media && project.media.length > 0 && (
          <div className="media-grid">
            {project.media.map((media) => (
              <figure
                key={media.label}
                className="media-card media-card--clickable"
                onClick={() => setLightboxImage(media)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setLightboxImage(media)
                }}
              >
                <img src={media.src} alt={`${project.title} - ${media.label}`} />
                <figcaption>{media.label}</figcaption>
              </figure>
            ))}
          </div>
        )}

        <div className="project-detail-grid">
          <div className="project-detail-box">
            <h4>Technologies</h4>
            <ul className="chip-row">
              {project.technologies.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {project.problem && (
            <div className="project-detail-box">
              <h4>The problem</h4>
              <p>{project.problem}</p>
            </div>
          )}

          <div className="project-detail-box">
            <h4>How it was built</h4>
            <ul className="bullet-list">
              {project.whatIDid.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="project-detail-box">
            <h4>Impact</h4>
            <ul className="bullet-list">
              {project.impact.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {project.whatILearned && (
            <div className="project-detail-box">
              <h4>What I learned</h4>
              <ul className="bullet-list">
                {project.whatILearned.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {lightboxImage && (
          <div className="lightbox-overlay" onClick={() => setLightboxImage(null)}>
            <button
              className="lightbox-close"
              onClick={() => setLightboxImage(null)}
              aria-label="Close"
            >
              ×
            </button>
            <img
              src={lightboxImage.src}
              alt={lightboxImage.label}
              className="lightbox-image"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="lightbox-caption">{lightboxImage.label}</p>
          </div>
        )}
      </section>
    </SiteLayout>
  )
}

function ResearchVisual({ type }: { type: ResearchItem['visual'] }) {
  if (type === 'papers') {
    return (
      <div className="research-visual research-visual--papers" aria-label="Paper research workflow illustration">
        <span className="paper-node paper-node--one">Read</span>
        <span className="paper-node paper-node--two">Question</span>
        <div className="paper-core"><strong>AI</strong><small>Research</small></div>
        <span className="paper-node paper-node--three">Reproduce</span>
        <span className="paper-node paper-node--four">Explain</span>
      </div>
    )
  }

  if (type === 'vision') {
    return (
      <div className="research-visual research-visual--vision" aria-label="Image augmentation experiment illustration">
        <div className="vision-sample vision-sample--one"><span /></div>
        <div className="vision-sample vision-sample--two"><span /></div>
        <div className="vision-sample vision-sample--three"><span /></div>
        <div className="vision-controls">
          <p><span>Augmentation</span><i style={{ width: '76%' }} /></p>
          <p><span>Hyperparameters</span><i style={{ width: '58%' }} /></p>
          <p><span>Generalization</span><i style={{ width: '88%' }} /></p>
        </div>
      </div>
    )
  }

  return (
    <div className="research-visual research-visual--algorithms" aria-label="Algorithm benchmark illustration">
      <div className="algorithm-track"><span>Quicksort</span><i style={{ width: '78%' }} /><small>randomized</small></div>
      <div className="algorithm-track"><span>BFPRT</span><i style={{ width: '61%' }} /><small>deterministic</small></div>
      <div className="algorithm-complexity"><span>Selection</span><strong>k-th</strong><small>theory ↔ runtime</small></div>
    </div>
  )
}

function ResearchPage() {
  return (
    <SiteLayout>
      <section className="page page--research">
        <header className="research-hero">
          <div className="research-hero-copy">
            <p className="home-kicker"><span aria-hidden="true" /> Research</p>
            <h1>I don’t stop at what works. <em>I investigate why.</em></h1>
            <p>My research connects careful reading with controlled experiments, reproduction, and honest evaluation.</p>
          </div>
          <aside className="research-loop" aria-label="Research process">
            <p className="card-label">My research loop</p>
            <div className="research-loop-track">
              <span><strong>01</strong>Read</span><i>→</i>
              <span><strong>02</strong>Question</span><i>→</i>
              <span><strong>03</strong>Test</span><i>→</i>
              <span><strong>04</strong>Explain</span>
            </div>
          </aside>
        </header>


        <div className="research-grid">
          {researchItems.map((item, index) => (
            <article key={item.title} className={`research-card${index === 0 ? ' research-card--featured' : ''}`}>
              <ResearchVisual type={item.visual} />
              <div className="research-card-content">
                <div className="research-meta"><span>{item.date}</span><span>{index === 0 ? 'Living Repository' : 'Experimental Study'}</span></div>
                <p className="research-index">0{index + 1}</p>
                <h2>{item.title}</h2>
                <p className="research-tagline">{item.tagline}</p>
                <ul className="research-highlights">
                  {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
                <ul className="chip-row research-skills">
                  {item.skills.slice(0, 4).map((skill) => <li key={skill} className="chip chip--soft">{skill}</li>)}
                  {item.skills.length > 4 && <li className="chip chip--soft">+{item.skills.length - 4}</li>}
                </ul>
                {item.github && <a href={item.github} target="_blank" rel="noopener noreferrer" className="research-repo-link">Explore repository <span>↗</span></a>}
              </div>
            </article>
          ))}
        </div>

        <section className="research-closing">
          <div><p className="eyebrow">Ongoing inquiry</p><h2>Read critically. Test carefully. Explain clearly.</h2></div>
          <a href="https://github.com/Zain3627/ai-research-summary" target="_blank" rel="noopener noreferrer" className="button button--primary">Follow the research ↗</a>
        </section>
      </section>
    </SiteLayout>
  )
}

function AboutPage() {
  return (
    <SiteLayout>
      <section className="page page--about">
        <header className="about-hero">
          <div className="about-hero-copy">
            <p className="home-kicker"><span aria-hidden="true" /> About me</p>
            <h1>Curiosity has always been my <em>starting point.</em></h1>
            <p className="about-role">AI Engineer · Software Developer · Researcher</p>
            <p className="about-lead">
              I am Zain, a final-semester Computer Engineering student who enjoys understanding difficult ideas and turning them into dependable software. My work moves between AI research, end-to-end engineering, competitive problem-solving, and teaching others what I learn.
            </p>
            <div className="about-hero-actions">
              <Link className="button button--primary" to="/projects">Explore my work</Link>
              <Link className="button" to="/contact">Let’s connect</Link>
            </div>
          </div>

          <aside className="about-portrait-wrap" aria-label="Zain's disciplines">
            <div className="about-portrait">
              <img src={profilePhoto} alt="Zain Tamer Zain ElAbdin" />
            </div>
            <span className="about-orbit about-orbit--build">Build</span>
            <span className="about-orbit about-orbit--research">Research</span>
            <span className="about-orbit about-orbit--share">Share</span>
          </aside>
        </header>

        <section className="about-snapshot" aria-label="At a glance">
          <div><strong>3.98</strong><span>CGPA / 4.0</span></div>
          <div><strong>#2</strong><span>in my class</span></div>
          <div><strong>Specialist</strong><span>Codeforces</span></div>
          <div><strong>Finalist</strong><span>ECPC 2026</span></div>
        </section>

        <section className="about-story" aria-labelledby="about-story-title">
          <div className="about-section-heading">
            <p className="eyebrow">My story</p>
            <h2 id="about-story-title">One curiosity, three transformations.</h2>
          </div>
          <div className="about-story-grid">
            <article>
              <span className="about-story-icon" aria-hidden="true">π</span>
              <p className="card-label">01 · Explore</p>
              <h3>Curiosity began with mathematics.</h3>
              <p>At Gharbiya STEM, advanced mathematics, mechanics, and extended research taught me to enjoy going beyond the expected answer.</p>
            </article>
            <article>
              <span className="about-story-icon" aria-hidden="true">{'</>'}</span>
              <p className="card-label">02 · Engineer</p>
              <h3>Problem-solving became software.</h3>
              <p>Computer Engineering and competitive programming gave that curiosity structure: algorithms, architecture, implementation, and systems that must actually work.</p>
            </article>
            <article>
              <span className="about-story-icon" aria-hidden="true">AI</span>
              <p className="card-label">03 · Create impact</p>
              <h3>Engineering expanded into intelligence.</h3>
              <p>AI, cloud deployment, research, and teaching now let me turn ideas into useful products—and help other people grow alongside me.</p>
            </article>
          </div>
        </section>

        <section className="about-strengths" aria-labelledby="about-strengths-title">
          <div className="about-section-heading">
            <p className="eyebrow">What I bring</p>
            <h2 id="about-strengths-title">A combination built across different arenas.</h2>
          </div>
          <div className="about-strength-grid">
            <article><span>01</span><h3>Algorithmic rigor</h3><p>Codeforces Specialist and ECPC finalist experience sharpen how I reason under constraints.</p></article>
            <article><span>02</span><h3>Research curiosity</h3><p>I investigate and reproduce influential AI papers instead of treating models as black boxes.</p></article>
            <article><span>03</span><h3>End-to-end engineering</h3><p>I connect models with APIs, applications, data pipelines, and deployment on AWS and Azure.</p></article>
            <article><span>04</span><h3>Collaborative leadership</h3><p>Coaching, workshops, and team projects taught me to communicate clearly and bring people together.</p></article>
          </div>
        </section>

        <section className="about-soft-skills" aria-labelledby="about-soft-skills-title">
          <div className="about-section-heading about-soft-heading">
            <div>
              <p className="eyebrow">Human skills · backed by evidence</p>
              <h2 id="about-soft-skills-title">Not traits I claim. Patterns my journey proves.</h2>
            </div>
            <p>Each quality grew through a real transition, responsibility, or shared challenge.</p>
          </div>

          <div className="about-soft-grid">
            <article className="about-soft-card about-soft-card--discipline">
              <div className="about-soft-marker"><span>01</span><strong>↗</strong></div>
              <div className="about-soft-content">
                <p className="card-label">Independence → consistency</p>
                <h3>Discipline & self-management</h3>
                <p>I entered boarding school at 15 and later learned to manage university life while living independently. New responsibilities never displaced the academic standard I set for myself.</p>
                <div className="about-soft-proof">
                  <strong>3.98 / 4.0</strong>
                  <span>CGPA maintained while ranking second in my university class</span>
                </div>
              </div>
            </article>

            <article className="about-soft-card about-soft-card--adaptability">
              <div className="about-soft-marker"><span>02</span><strong>⌁</strong></div>
              <div className="about-soft-content">
                <p className="card-label">Change → growth</p>
                <h3>Flexibility & adaptability</h3>
                <p>Moving away from home early taught me how to read a new environment, build routines, connect with different people, and keep progressing without waiting for perfect conditions.</p>
                <div className="about-soft-proof">
                  <strong>Age 15</strong>
                  <span>First major transition into independent boarding-school life</span>
                </div>
              </div>
            </article>

            <article className="about-soft-card about-soft-card--leadership">
              <div className="about-soft-marker"><span>03</span><strong>◎</strong></div>
              <div className="about-soft-content">
                <p className="card-label">Knowledge → community</p>
                <h3>Leadership through service</h3>
                <p>I began by founding M2C in high school, then carried that instinct into competitive-programming coaching and AWS workshops—creating the structure that helps others learn.</p>
                <div className="about-soft-proof">
                  <strong>16+ sessions</strong>
                  <span>Coaching experience alongside workshops and organized hackathons</span>
                </div>
                <Link className="about-soft-link" to="/volunteering">See the volunteering evidence <span aria-hidden="true">↗</span></Link>
              </div>
            </article>

            <article className="about-soft-card about-soft-card--teamwork">
              <div className="about-soft-marker"><span>04</span><strong>∞</strong></div>
              <div className="about-soft-content">
                <p className="card-label">Pressure → collaboration</p>
                <h3>Communication & teamwork</h3>
                <p>ECPC contests taught me to align decisions quickly with teammates; tutoring and technical workshops taught me to explain the same difficult idea in ways different minds can understand.</p>
                <div className="about-soft-proof">
                  <strong>ECPC finalist</strong>
                  <span>Team problem-solving under time pressure, supported by years of teaching</span>
                </div>
                <Link className="about-soft-link" to="/certificates">View supporting milestones <span aria-hidden="true">↗</span></Link>
              </div>
            </article>
          </div>
        </section>

        <section className="about-education" aria-labelledby="about-education-title">
          <div className="about-section-heading">
            <p className="eyebrow">Education</p>
            <h2 id="about-education-title">The environments that shaped me.</h2>
          </div>
          <div className="about-education-grid">
            {educationTimeline.map((entry) => (
              <article key={entry.institution} className="about-education-card">
                <div className="about-education-header">
                  <div className="about-school-logo"><img src={entry.logo} alt={`${entry.institution} logo`} /></div>
                  <div>
                    <p className="timeline-date">{entry.start} — {entry.end}</p>
                    <h3>{entry.institution}</h3>
                    <p className="timeline-degree">{entry.degree}</p>
                  </div>
                </div>
                <p className="about-education-description">{entry.description}</p>
                <ul className="about-outcome-list">
                  {entry.takeaways.slice(0, 3).map((item) => <li key={item}>{item}</li>)}
                </ul>
                {entry.coursework && entry.coursework.length > 0 && (
                  <details className="about-coursework">
                    <summary>View relevant coursework <span aria-hidden="true">+</span></summary>
                    <ul className="chip-row">
                      {entry.coursework.map((course) => <li key={course} className="chip chip--soft">{course}</li>)}
                    </ul>
                  </details>
                )}
                {entry.transcriptUrl && (
                  <a href={entry.transcriptUrl} download="unofficial-transcript.pdf" className="github-button">Download unofficial transcript ↓</a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="about-closing">
          <div><p className="eyebrow">What comes next</p><h2>I am ready to keep learning—and build work that matters.</h2></div>
          <Link className="button button--primary" to="/contact">Start a conversation</Link>
        </section>
      </section>
    </SiteLayout>
  )
}

function VolunteeringPage() {
  return (
    <SiteLayout>
      <section className="page page--volunteering">
        <header className="volunteering-hero">
          <div className="volunteering-hero-copy">
            <p className="home-kicker"><span aria-hidden="true" /> Volunteering</p>
            <h1>Knowledge grows when it is <em>shared forward.</em></h1>
            <p>I love studying difficult ideas, but their greatest value appears when they help someone else grow. Teaching has become the bridge between my curiosity and my community.</p>
          </div>
          <aside className="volunteering-cycle" aria-label="Volunteering philosophy">
            <p className="card-label">How knowledge travels</p>
            <div><span>01</span><strong>Learn deeply</strong></div>
            <i aria-hidden="true">→</i>
            <div><span>02</span><strong>Explain clearly</strong></div>
            <i aria-hidden="true">→</i>
            <div><span>03</span><strong>Multiply impact</strong></div>
          </aside>
        </header>

        <article className="volunteering-origin">
          <div className="volunteering-origin-heading">
            <p className="card-label">Where it started · High school</p>
            <h3>M2C — Mathematics & Mechanics Club</h3>
            <p className="volunteering-origin-lead">
              A personal love of studying became my first experience building a learning community.
            </p>
          </div>

          <div className="volunteering-origin-story">
            <p>
              At Gharbiya STEM High School, I was deeply drawn to mathematics and mechanics. I went beyond the syllabus, explored advanced topics, and carried out extended research. After standing out academically among a school of top students, I approached a teacher with an idea: create a club for students who shared the same passion and wanted to use it to help others.
            </p>
            <p>
              That idea became <strong>M2C</strong>. We brought together curious students, ran tutoring sessions for classmates struggling with difficult topics, prepared clear explanation resources, and built solved test banks from international competitions and examinations. Those materials continued helping younger students after we graduated—a lasting reminder that one useful resource can travel much further than its creator.
            </p>
          </div>

          {/* <div className="volunteering-origin-lessons">
            <div><span>01</span><strong>Learn deeply</strong><p>Go beyond the curriculum and keep asking why.</p></div>
            <div><span>02</span><strong>Bring people together</strong><p>Find others who share the curiosity and give it a home.</p></div>
            <div><span>03</span><strong>Leave something useful</strong><p>Turn understanding into resources that continue helping others.</p></div>
          </div> */}

          <p className="volunteering-origin-reflection">
            Starting M2C at a young age taught me leadership, communication, and teamwork—but its most important lesson was simpler: contributing to the environment around me is part of learning, not something separate from it.
          </p>
        </article>

        <div className="volunteering-section-heading">
          <p className="eyebrow">Continuing the journey</p>
          <h2>How I contribute today</h2>
          <p>M2C shaped the mindset. These communities give me new ways to keep practicing it.</p>
        </div>

        <div className="volunteering-grid">
          {communityContributions.map((entry) => (
            <article key={entry.organization} className="volunteering-card">
              <div className="volunteering-card-header">
                <div className="volunteering-card-logo">
                  <img src={entry.logo} alt={`${entry.organization} logo`} />
                </div>
                <div>
                  <p className="timeline-date">{entry.start} — {entry.end}</p>
                  <h3>{entry.organization}</h3>
                  <p className="volunteering-role">{entry.role}</p>
                </div>
              </div>
              <p className="volunteering-description">{entry.description}</p>

              <div className="volunteering-card-body">
                <div className="volunteering-impact">
                  <p className="card-label">What I contributed</p>
                  <ul className="takeaway-list">
                    {entry.contributions.map((contribution) => (
                      <li key={contribution} className="takeaway-item">
                        <span className="takeaway-icon">✓</span>
                        <span>{contribution}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="volunteering-gallery">
                  {entry.media.map((media, index) => (
                    <figure key={media.label} className={`volunteering-photo volunteering-photo--${index + 1}`}>
                      <img
                        src={media.src}
                        alt={media.label}
                        loading="lazy"
                        className={media.fit === 'contain' ? 'is-contained' : undefined}
                      />
                      <figcaption>{media.label}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="volunteering-closing">
          <div><p className="eyebrow">The principle remains</p><h2>Learn deeply, then make the path clearer for someone else.</h2></div>
          <Link className="button button--primary" to="/contact">Connect with me</Link>
        </section>
      </section>
    </SiteLayout>
  )
}

function CertificatesPage() {
  return (
    <SiteLayout>
      <section className="page page--certificates">
        <header className="certificates-hero">
          <div className="certificates-hero-copy">
            <p className="home-kicker"><span aria-hidden="true" /> Certificates</p>
            <h1>Milestones that document a habit of <em>going further.</em></h1>
            <p>Competitions, technical programs, research challenges, and practical training—each certificate marks a stage where effort became measurable progress.</p>
          </div>
          <aside className="certificate-stack-visual" aria-label="Certificate collection">
            <div className="certificate-sheet certificate-sheet--back" />
            <div className="certificate-sheet certificate-sheet--middle" />
            <div className="certificate-sheet certificate-sheet--front">
              <span>Verified milestones</span>
              <strong>{certificateItems.length}</strong>
              <small>certificates & achievements</small>
            </div>
          </aside>
        </header>

        <div className="certificates-snapshot" aria-label="Certificate areas">
          <div><strong>Compete</strong><span>algorithms and mathematics</span></div>
          <div><strong>Build</strong><span>AI and software engineering</span></div>
          <div><strong>Explore</strong><span>science and research</span></div>
        </div>

        <div className="certificates-section-heading">
          <p className="eyebrow">Achievement archive</p>
          <h2>Evidence from each stage of the journey.</h2>
        </div>
        <div className="certificate-grid">
          {certificateItems.map((certificate, index) => (
  <article key={certificate.title} className="certificate-card">
    <span className="certificate-card-index">{String(index + 1).padStart(2, '0')}</span>
    <div className={`certificate-evidence${certificate.evidence ? ' certificate-evidence--multiple' : ''}`}>
      {(certificate.evidence ?? [{ label: certificate.title, fileUrl: certificate.fileUrl, fileType: certificate.fileType }]).map((item) => (
        <figure className="certificate-preview" key={item.label}>
          {item.fileType === 'image' ? (
            <img src={item.fileUrl} alt={item.label} />
          ) : (
            <iframe title={item.label} src={item.fileUrl} />
          )}
          {certificate.evidence && <figcaption>{item.label}</figcaption>}
        </figure>
      ))}
    </div>
    <div className="certificate-content">
      <p className="card-label">Certificate</p>
      <h3>{certificate.title}</h3>
      <p className="certificate-date">{certificate.date}</p>
      <p>
        <strong>Achievement:</strong> {certificate.achievement}
      </p>
      <details className="certificate-learned">
        <summary>What I learned <span aria-hidden="true">+</span></summary>
        <ul>
          {certificate.learned.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </details>
      <div className="certificate-actions">
        {(certificate.evidence ?? [{ label: 'Open certificate', fileUrl: certificate.fileUrl }]).map((item) => (
          <a key={item.label} href={item.fileUrl} target="_blank" rel="noreferrer" className="button">
            {certificate.evidence ? `Open ${item.label}` : item.label}
          </a>
        ))}
      </div>
    </div>
  </article>
))}
        </div>

        <section className="certificates-closing">
          <div><p className="eyebrow">Beyond credentials</p><h2>The certificate records the milestone. The work behind it shaped the engineer.</h2></div>
          <Link className="button button--primary" to="/projects">See the work</Link>
        </section>
      </section>
    </SiteLayout>
  )
}

function ContactPage() {
  return (
    <SiteLayout>
      <section className="page page--contact">
        <header className="contact-hero">
          <div className="contact-hero-copy">
            <p className="home-kicker"><span aria-hidden="true" /> Let’s connect</p>
            <h1>Good ideas deserve to become <em>useful systems.</em></h1>
            <p>
              I am completing my Computer Engineering degree and looking for opportunities in AI and software engineering where I can solve meaningful problems, learn from strong teams, and help turn ambitious ideas into reliable products.
            </p>
            <div className="contact-hero-actions">
              <a className="button button--primary" href="mailto:zaintamer10@gmail.com?subject=Let%27s%20connect">Start a conversation</a>
              <a className="button" href={cvUrl} target="_blank" rel="noreferrer">View my CV ↗</a>
            </div>
          </div>

          <aside className="contact-intro-card">
            <div className="contact-person">
              <img src={profilePhoto} alt="Zain Tamer Zain ElAbdin" />
              <div>
                <h2>Zain Tamer</h2>
                <p>AI Engineer · Software Developer</p>
              </div>
            </div>
            <div className="contact-availability">
              <span aria-hidden="true" />
              Open to opportunities
            </div>
            <div className="contact-looking-for">
              <p className="card-label">Especially interested in</p>
              <ul>
                <li>AI and software engineering roles</li>
                <li>Research-minded product teams</li>
                <li>Graduate study and research connections</li>
                <li>Builders who value learning and community</li>
              </ul>
            </div>
          </aside>
        </header>

        <section className="contact-direct" aria-labelledby="contact-direct-title">
          <div className="contact-section-heading">
            <p className="eyebrow">Direct contact</p>
            <h2 id="contact-direct-title">The easiest ways to reach me.</h2>
          </div>
          <div className="contact-direct-grid">
            <a href="mailto:zaintamer10@gmail.com" className="contact-method">
              <span className="contact-method-icon" aria-hidden="true">@</span>
              <div><small>Email · Preferred</small><strong>zaintamer10@gmail.com</strong><p>Best for opportunities, projects, and research conversations.</p></div>
              <span className="contact-method-arrow" aria-hidden="true">↗</span>
            </a>
            <a href="tel:+201094332424" className="contact-method">
              <span className="contact-method-icon" aria-hidden="true">☎</span>
              <div><small>Phone</small><strong>+20 109 433 2424</strong><p>Available for direct professional communication.</p></div>
              <span className="contact-method-arrow" aria-hidden="true">↗</span>
            </a>
            <div className="contact-method">
              <span className="contact-method-icon" aria-hidden="true">⌖</span>
              <div><small>Based in</small><strong>Alexandria, Egypt</strong><p>Open to local, remote, and international opportunities.</p></div>
            </div>
          </div>
        </section>

        <section className="contact-online" aria-labelledby="contact-online-title">
          <div className="contact-section-heading">
            <p className="eyebrow">Find me online</p>
            <h2 id="contact-online-title">Follow the work, not just the résumé.</h2>
            <p>Explore the code, competitions, research, and professional journey behind my portfolio.</p>
          </div>
          <div className="contact-profile-grid">
            {contactLinks.map((link, index) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="contact-profile-card">
                <span className="contact-profile-number">0{index + 1}</span>
                <p className="card-label">{link.label}</p>
                <h3>{link.value}</h3>
                <p>{link.description}</p>
                <strong>Visit profile ↗</strong>
              </a>
            ))}
          </div>
        </section>

        <section className="contact-closing">
          <div>
            <p className="eyebrow">Have something in mind?</p>
            <h2>Let’s turn the conversation into something real.</h2>
          </div>
          <a className="button button--primary" href="mailto:zaintamer10@gmail.com?subject=Opportunity%20for%20Zain">Email me</a>
        </section>
      </section>
    </SiteLayout>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      <Route path="/research" element={<ResearchPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/volunteering" element={<VolunteeringPage />} />
      <Route path="/contributions" element={<Navigate to="/volunteering" replace />} />
      <Route path="/certificates" element={<CertificatesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/chat" element={<SiteLayout><ChatPage /></SiteLayout>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
