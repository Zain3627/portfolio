import type { ReactNode } from 'react'
import { useState, useEffect } from "react"
import { NavLink, Navigate, Route, Routes, useNavigate, useParams, Link } from 'react-router-dom'
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
import profilePhoto from '../media/profile.jpg'
import gharbiyaLogo from '../media/gharbiya-logo.png'
import aastmtLogo from '../media/aastmt-logo.png'

const cvUrl = new URL('../media/full_CV.pdf', import.meta.url).href
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
  new URL('../media/certificates/zindi.jpg', import.meta.url).href
]

// type MediaFrame = {
//   src: string
//   label: string
// }

interface ProjectMedia {
  src: string
  label: string
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
  skills: string[]
}

type CertificateItem = {
  title: string
  fileUrl: string
  achievement: string
  learned: string
  fileType?: 'pdf' | 'image' // defaults to 'pdf' if omitted
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
    title: 'Premier League Predictor',
    subtitle: 'End-to-End MLOps System',
    summary:
      'Built a complete pipeline to fetch football data, train an XGBoost classifier, generate fixture predictions, and project the league table in a Streamlit dashboard.',
    technologies: ['ZenML', 'XGBoost', 'MLflow', 'Supabase', 'AWS S3', 'Docker', 'AWS EC2', 'cron'],
    whatIDid: [
      'Designed the ingestion, training, evaluation, and deployment flow as a reproducible pipeline.',
      'Used MLflow for experiment tracking, model registry, and champion model promotion.',
      'Stored intermediate datasets in Supabase PostgreSQL so execution stayed decoupled and maintainable.',
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
    technologies: ['Python', 'XGBoost', 'Streamlit', 'Azure App Service', 'Azure Blob Storage', 'GitHub Actions'],
    whatIDid: [
      'Aggregated and engineered features from the FPL REST API across 700+ players and 20 teams.',
      'Built a dashboard that combines predictions with live player and team statistics.',
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
    technologies: ['FaceNet', 'MediaPipe', 'Cosine Similarity', 'Docker', 'Hugging Face Spaces'],
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
    technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly'],
    whatIDid: [
      'Cleaned and transformed a large public dataset into analysis-ready tables.',
      'Used statistical plots and feature engineering to surface trends across countries and regions.',
      'Focused on storytelling through data and analysis quality.',
    ],
    impact: [
      'Highlights research-style analysis and visual communication skills.',
      'Demonstrates disciplined work with large real-world datasets.',
    ],
    note: 'No project media is stored in the repo for this analysis.',
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
    note: 'No project media is stored in the repo for this hardware project.',
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
      'Built a banking interface focused on secure login and basic banking operations, emphasizing clear user flow and transaction handling.',
    technologies: ['Java', 'Desktop UI', 'OOP', 'Workflow Design'],
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
  logo: string
  coursework?: string[]
  transcriptUrl?: string
}

interface VolunteerEntry {
  organization: string
  role: string
  start: string
  end: string
  description: string
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
    logo: gharbiyaLogo,
  },
  {
    institution: "Arab Academy for Science, Technology & Maritime Transport (AASTMT)",
    degree: "Bachelor of Science in Computer Engineering ",
    start: "Sep 2022",
    end: "Present",
    description: "Currently ranked 2nd in my class.",
    logo: aastmtLogo,
    coursework: [
      "Discrete Mathematics",
      "Probability \& Statistical Analysis",
      "Artificial Intelligence",
      "Data Analytics and Optimization",
      "Database Systems",
      "Computing Algorithms",
      "Object-Oriented Programming",
      "Data Structure \& Algorithms",
      "Distributed and Parallel Systems",
      "Embedded Systems Design",
      "Cyber Security",
      "Intro to Intelligent Human Computer Interaction"
    ],
    transcriptUrl: "../media/transcript.pdf",
  },
]
const volunteerExperiences: VolunteerEntry[] = [
  {
    organization: "AWS Cloud Club",
    role: "Core Team Member",
    start: "Mar 2026",
    end: "Present",
    description:
      "Preparing and delivering workshops and sessions on AWS Cloud Practitioner topics, helping members build a solid foundation in core cloud concepts.",
    logo: awsCloudClubImage,
  },
  {
    organization: "Competitive Programming Club",
    role: "CP Coach",
    start: "Sep 2025",
    end: "Present",
    description:
      "Leading competitive programming sessions on algorithms and problem-solving, along with tutoring, upsolving sessions, and contests to help members sharpen their skills.",
    logo: cpclogo,
  },
]

const researchItems: ResearchItem[] = [
  {
    title: 'An Experimental Analysis of Data Augmentation and Hyperparameter Tuning for Image Classification',
    date: 'Oct 2025 - Dec 2025',
    summary:
      'Studied how different augmentation strategies and tuning choices affect model performance across multiple deep learning architectures.',
    skills: ['Experimental design', 'Model comparison', 'Training analysis', 'Image classification'],
  },
  {
    title: 'Comparison of Quicksort and BFPRT Algorithms for the K-th Element Selection Problem',
    date: 'Feb 2025',
    summary:
      'Compared different solutions to the selection problem and measured how input size changes their runtime behavior.',
    skills: ['Algorithm analysis', 'Complexity reasoning', 'Benchmarking', 'Selection problems'],
  },
]

const certificateItems: CertificateItem[] = [
  {
    title: 'Personal Achievement Certificate',
    fileUrl: certificateUrls[2].toString(),
    achievement:
      'This certificate shows continued progress and effort in the areas where I keep building my portfolio and technical profile.',
    learned:
      'It reminded me to keep improving through practice, feedback, and project-based learning.',
    date: 'Apr 2026',
  },
  {
    title: 'Certificate of Achievement',
    fileUrl: certificateUrls[1].toString(),
    achievement:
      'This recognition represents a formal milestone from my academic and technical journey as documented in the certificate folder.',
    learned:
      'It reinforced consistency, discipline, and the value of building a strong technical base over time.',
    date: 'Dec 2025',
  },
  {
    title: 'Codeforces Specialist',
    fileUrl: certificateUrls[6].toString(),
    achievement:
      'Reached Specialist rank on Codeforces with a rating of 1448, reflecting consistent competitive programming performance.',
    learned:
      'It reinforced steady, deliberate practice in algorithms and problem-solving, and showed measurable progress from sustained effort over time.',
    fileType: 'image',
    date: 'Nov 2025',
  },
  {
    title: 'Artificial Intelligence Engineer 1',
    fileUrl: certificateUrls[7].toString(),
    achievement:
    'Completed the Artificial Intelligence Engineer 1 learning path on Coursera, covering foundational AI engineering concepts and skills.',
    learned:
    'It gave me a structured grounding in core AI engineering practices and reinforced concepts I could apply directly to my own projects.',
    fileType: 'image',
    date: 'Oct 2025',
  },
  {
    title: 'Sprints x Microsoft',
    fileUrl: certificateUrls[5].toString(),
    achievement:
      'This certificate reflects participation in an industry-linked learning experience connected to Microsoft and Sprints.',
    learned:
      'It helped me connect classroom learning with practical engineering skills and professional development.',
    date: 'Oct 2025',
  },
  {
    title: 'ECPC Qualification - 1st Place',
    fileUrl: certificateUrls[0].toString(),
    achievement:
      'This certificate reflects strong competitive programming performance and the ability to solve algorithmic problems under pressure.',
    learned:
      'It strengthened my speed, correctness under constraints, and my habit of breaking complex problems into precise steps.',
    date: 'Jul 2025',
  },
  {
    title: 'Zindi Financial Inclusion in Africa Competition',
    fileUrl: certificateUrls[8].toString(),
    achievement:
      'Ranked 15th on the leaderboard out of over 2,000 participants in a competitive data science challenge focused on financial inclusion in Africa.',
    learned:
      'It sharpened my ability to approach a real-world dataset end-to-end — from feature engineering to model tuning — while competing against a large, skilled field.',
    fileType: 'image',
    date: 'Jun 2025',
  },  
  {
    title: 'Technical Recognition Certificate',
    fileUrl: certificateUrls[3].toString(),
    achievement:
      'This certificate marks another formal recognition from the set of achievements in my media folder.',
    learned:
      'It strengthened my focus on showing measurable outcomes and not only completed work.',
    date: 'Oct 2024',
  }
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
  },
  {
    label: 'GitHub',
    value: 'github.com/Zain3627',
    href: 'https://github.com/Zain3627',
  },
  {
    label: 'Codeforces',
    value: 'codeforces.com/profile/Zain3627',
    href: 'https://codeforces.com/profile/Zain3627',
  },
  {
    label: 'Kaggle',
    value: 'kaggle.com/zaintamer',
    href: 'https://www.kaggle.com/zaintamer',
  },
]

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}

function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="page-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Portfolio</p>
          <p className="topbar-label">Zain Tamer Zain ElAbdin</p>
        </div>
        <nav className="nav" aria-label="Primary">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Home
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Projects
          </NavLink>
          <NavLink to="/research" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Research
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            About
          </NavLink>
          <NavLink to="/certificates" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Certificates
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Contact
          </NavLink>
        </nav>
      </header>

      <main className="content">{children}</main>

      <footer className="site-footer">
        <div>
          <p className="footer-name">Zain Tamer Zain ElAbdin</p>
          <p className="footer-role">AI Engineer</p>
        </div>
        <div>
          <p className="footer-label">Address</p>
          <p>Alexandria, Egypt</p>
        </div>
        <div>
          <p className="footer-label">Contact</p>
          <p>zaintamer10@gmail.com</p>
          <p>+20 109 433 2424</p>
        </div>
      </footer>
    </div>
  )
}

function HomePage() {
  return (
    <SiteLayout>
      <section className="page page--home">
        <div className="home-layout">
          <div className="home-hero-grid">
            <article className="home-hero-copy">
              
              <h2 className="hero-name">Zain Tamer Zain ElAbdin</h2>
              <p className="hero-role">AI Engineer & Researcher • ML • NLP • Computer Vision • MLOps</p>
              
              <h3>Production-minded AI with strong algorithmic thinking.</h3>
              <p className="hero-summary">
                I build practical AI systems with a focus on model training, data pipelines, deployment, and clean
                problem solving. My work combines machine learning, computer vision, cloud deployment, and competitive
                programming thinking.
              </p>

              {/* <div className="home-usp-card">
                <h3>Production-minded AI with strong algorithmic thinking.</h3>
                <p>
                  I build practical AI systems with a focus on model training, data pipelines, deployment, and clean
                problem solving. My work combines machine learning, computer vision, cloud deployment, and competitive
                programming thinking.
                </p>
              </div> */}

              <div className="home-education-card">
                <p className="card-label">Education summary</p>
                <div className="education-line">
                  <strong>Arab Academy for Science, Technology & Maritime Transport University</strong>
                </div>
                <div className="education-metrics">
                  <span>CGPA: 3.98/4.0</span>
                  <span>Expected graduation: February 2027</span>
                </div>
              </div>

              <div className="cta-row">
                <NavLink className="button button--primary" to="/projects">
                  View projects
                </NavLink>
                <a className="button" href={cvUrl} target="_blank" rel="noreferrer">
                  Open CV
                </a>
              </div>
            </article>

            <aside className="home-hero-side">
              <div className="hero-photo-frame hero-photo-frame--large">
                <img src={profilePhoto} alt="Zain Tamer Zain ElAbdin profile photo" />
              </div>

              <div className="home-status-card">
                <p className="card-label">Current focus</p>
                <ul className="bullet-list">
                  <li>Machine learning systems with production quality.</li>
                  <li>Computer vision workflows and deployment.</li>
                  <li>Cloud delivery on AWS and Azure.</li>
                </ul>
              </div>
            </aside>
          </div>

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
        <SectionHeader
          eyebrow="Projects"
          title="A quick look at what I've built."
          description="Click any project to see the full story — the problem, how it was built, and what came out of it."
        />
        <div className="project-grid">
          {projects.map((project) => {
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

function ResearchPage() {
  return (
    <SiteLayout>
      <section className="page page--research">
        <SectionHeader
          eyebrow="Research"
          title="Clean, focused research work that shows experimental thinking."
          description="This page stays simple and demonstrates analysis, comparison, and methodological thinking."
        />

        <div className="research-stack">
          {researchItems.map((item) => (
            <article key={item.title} className="info-card info-card--research">
              <div className="project-meta">
                <span>{item.date}</span>
                <span>Research</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <ul className="chip-row">
                {item.skills.map((skill) => (
                  <li key={skill} className="chip chip--soft">
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  )
}

function AboutPage() {
  return (
    <SiteLayout>
      <section className="page page--about">
        <SectionHeader
          eyebrow="About"
          title=""
          description=''
        />
        <h1 className="hero-name"> Zain Tamer Zain ElAbdin </h1>


        <div className="about-intro">
          <p>
            Computer Engineering student at AAST specializing in machine learning, computer vision, and MLOps — with hands-on experience shipping production AI systems on AWS and Azure. Years of competitive programming shaped an algorithmic rigor that runs through every architecture and system design decision. Equally invested in people as in code: teaching, mentoring, and building as part of a team matter as much as the technical craft itself. Current research interests center on large language models and NLP — specifically how these systems can be grounded, adapted, and deployed reliably in production.
          </p>
        </div>

        <div className="about-section">
          <h2 className="about-section-title">Education</h2>
          <div className="timeline">
            {educationTimeline.map((entry) => (
              <div key={entry.institution} className="timeline-item">
                <div className="timeline-marker">
                  <img src={entry.logo} alt={`${entry.institution} logo`} />
                </div>
                <div className="timeline-content">
                  <p className="timeline-date">
                    {entry.start} — {entry.end}
                  </p>
                  <h3>{entry.institution}</h3>
                  <p className="timeline-degree">{entry.degree}</p>
                  <p>{entry.description}</p>

                  {entry.coursework && entry.coursework.length > 0 && (
                    <div className="timeline-coursework">
                      <p className="timeline-coursework-label">Relevant coursework</p>
                      <ul className="chip-row">
                        {entry.coursework.map((course) => (
                          <li key={course} className="chip">
                            {course}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {entry.transcriptUrl && (
                    
                      <a href={entry.transcriptUrl}
                      download
                      className="github-button"
                    >
                      Download unofficial transcript ↓
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-section">
          <h2 className="about-section-title">Volunteering</h2>
          <div className="volunteer-grid">
            {volunteerExperiences.map((entry, index) => (
              <article key={`${entry.organization}-${index}`} className="volunteer-card">
                <div className="volunteer-card-logo">
                  <img src={entry.logo} alt={`${entry.organization} logo`} />
                </div>
                <p className="timeline-date">
                  {entry.start} — {entry.end}
                </p>
                <h3>{entry.organization}</h3>
                <p className="volunteer-role">{entry.role}</p>
                <p>{entry.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}

function CertificatesPage() {
  return (
    <SiteLayout>
      <section className="page page--certificates">
        <SectionHeader
          eyebrow="Certificates"
          title="Certificates with achievement context and learning takeaways."
          description="Each certificate is shown with the corresponding file from the media folder, plus what the achievement meant and what I learned from it."
        />
        <div className="certificate-grid">
          {certificateItems.map((certificate) => (
            <article key={certificate.title} className="certificate-card">
              <div className="certificate-preview">
                {certificate.fileType === 'image' ? (
                  <img src={certificate.fileUrl} alt={certificate.title} />
                ) : (
                  <iframe title={certificate.title} src={certificate.fileUrl} />
                )}
              </div>
              <div className="certificate-content">
                <p className="card-label">Certificate</p>
                <h3>{certificate.title}</h3>
                <p className="certificate-date">{certificate.date}</p>
                <p>
                  <strong>Achievement:</strong> {certificate.achievement}
                </p>
                <p>
                  <strong>What I learned:</strong> {certificate.learned}
                </p>
                <a href={certificate.fileUrl} target="_blank" rel="noreferrer" className="button">
                  Open certificate
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  )
}

function ContactPage() {
  return (
    <SiteLayout>
      <section className="contact-page">
        <div className="contact-container">
          <div className="contact-left">
            <p className="contact-tag">CONTACT</p>

            <h1>
              Let's build something <span>awesome.</span>
            </h1>

            <p className="contact-description">
              Whether you have a project, a job opportunity, or just want to
              connect, I'd love to hear from you.
            </p>

            <div className="contact-info">
              <a
                href="mailto:zaintamer10@gmail.com"
                className="contact-item"
              >
                <div className="icon">📧</div>

                <div>
                  <small>Email</small>
                  <strong>zaintamer10@gmail.com</strong>
                </div>
              </a>

              <a href="tel:+201094332424" className="contact-item">
                <div className="icon">📞</div>

                <div>
                  <small>Phone</small>
                  <strong>+20 109 433 2424</strong>
                </div>
              </a>

              <div className="contact-item">
                <div className="icon">📍</div>

                <div>
                  <small>Location</small>
                  <strong>Alexandria, Egypt</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-right">
            <div className="contact-card">
              <h2>Find me online</h2>

              <div className="profile-links">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="profile-link"
                  >
                    <div>
                      <span>{link.label}</span>
                      <strong>{link.value}</strong>
                    </div>

                    <span className="arrow">↗</span>
                  </a>
                ))}
              </div>

              <a
                className="download-cv"
                href={cvUrl}
                target="_blank"
                rel="noreferrer"
              >
                ⬇ Download CV
              </a>
            </div>
          </div>
        </div>
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
      <Route path="/certificates" element={<CertificatesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App