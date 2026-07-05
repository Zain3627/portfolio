import type { ReactNode } from 'react'

import { NavLink, Navigate, Route, Routes } from 'react-router-dom'

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
]

type MediaFrame = {
  src: string
  label: string
}

type Project = {
  title: string
  subtitle: string
  summary: string
  technologies: string[]
  whatIDid: string[]
  impact: string[]
  media?: MediaFrame[]
  note?: string
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
//   'scikit-learn',
  'Matplotlib',
//   'Seaborn',
  'Plotly',
//   'TensorFlow',
  'Keras',
//   'PyTorch',
//   'Transformers',
//   'OpenCV',
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
//   'GitHub Actions',
  'Kubernetes',
//   'Hadoop',
//   'Arduino',
//   'MQTT',
//   'LaTeX',
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
//   'scikit-learn',
  'Matplotlib',
//   'Seaborn',
  'Plotly',
//   'TensorFlow',
  'Keras',
//   'PyTorch',
//   'Transformers',
//   'OpenCV',
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
//   'GitHub Actions',
  'Kubernetes',
//   'Hadoop',
//   'Arduino',
//   'MQTT',
//   'LaTeX',
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
    title: 'ECPC Qualification - 1st Place',
    fileUrl: certificateUrls[0],
    achievement:
      'This certificate reflects strong competitive programming performance and the ability to solve algorithmic problems under pressure.',
    learned:
      'It strengthened my speed, correctness under constraints, and my habit of breaking complex problems into precise steps.',
  },
  {
    title: 'Certificate of Achievement',
    fileUrl: certificateUrls[1],
    achievement:
      'This recognition represents a formal milestone from my academic and technical journey as documented in the certificate folder.',
    learned:
      'It reinforced consistency, discipline, and the value of building a strong technical base over time.',
  },
  {
    title: 'Personal Achievement Certificate',
    fileUrl: certificateUrls[2],
    achievement:
      'This certificate shows continued progress and effort in the areas where I keep building my portfolio and technical profile.',
    learned:
      'It reminded me to keep improving through practice, feedback, and project-based learning.',
  },
  {
    title: 'Technical Recognition Certificate',
    fileUrl: certificateUrls[3],
    achievement:
      'This certificate marks another formal recognition from the set of achievements in my media folder.',
    learned:
      'It strengthened my focus on showing measurable outcomes and not only completed work.',
  },
  {
    title: 'Technical Recognition Certificate',
    fileUrl: certificateUrls[4],
    achievement:
      'This certificate adds to the record of technical recognition and shows consistency across my journey.',
    learned:
      'It taught me to treat every learning milestone as part of a longer path of growth.',
  },
  {
    title: 'Sprints x Microsoft',
    fileUrl: certificateUrls[5],
    achievement:
      'This certificate reflects participation in an industry-linked learning experience connected to Microsoft and Sprints.',
    learned:
      'It helped me connect classroom learning with practical engineering skills and professional development.',
  },
]

const aboutCards = [
  {
    title: 'Education',
    body:
      'I study Computer Engineering at the Arab Academy for Science, Technology & Maritime Transport University, with a 3.99/4.0 CGPA and coursework across AI, algorithms, databases, distributed systems, embedded systems, cybersecurity, and HCI.',
  },
  {
    title: 'Volunteering',
    body:
      'I have supported the AWS Student Builder Group at AAST and coached students in the AAST Competitive Programming Club. I value teaching, mentoring, and helping others grow in technical spaces.',
  },
  {
    title: 'Passion for helping others',
    body:
      'I enjoy making technical ideas understandable and useful for other people. Whether through workshops, tutoring, or collaborative project work, I like helping others gain confidence and practical skill.',
  },
]

const contactLinks = [
  {
    label: 'Email',
    value: 'zaintamer10@gmail.com',
    href: 'mailto:zaintamer10@gmail.com',
  },
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
          <p className="topbar-label">AI Engineer Portfolio</p>
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
          <p className="footer-name">Zain Tamer Zain Elabdin</p>
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
              <p className="hero-kicker">Home</p>
              <p className="hero-status">Open to work</p>
              <h2 className="hero-name">Zain Tamer Zain Elabdin</h2>
              <p className="hero-role">AI Engineer • Machine Learning • Computer Vision • MLOps</p>
              <p className="hero-summary">
                I build practical AI systems with a focus on model training, data pipelines, deployment, and clean
                problem solving. My work combines machine learning, computer vision, cloud deployment, and competitive
                programming.
              </p>

              <div className="home-usp-card">
                <p className="card-label">USP</p>
                <h3>Production-minded AI with strong algorithmic thinking.</h3>
                <p>
                  I bring together ML engineering, MLOps, and competitive programming discipline to build reliable
                  systems, not only experiments.
                </p>
              </div>

              <div className="home-education-card">
                <p className="card-label">Education summary</p>
                <div className="education-line">
                  <strong>Arab Academy for Science, Technology & Maritime Transport University</strong>
                </div>
                <div className="education-metrics">
                  <span>CGPA: 3.99/4.0</span>
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
                <img src={profilePhoto} alt="Zain Tamer Zain Elabdin profile photo" />
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
            </div>
          </section>
        </div>
      </section>
    </SiteLayout>
  )
}

function ProjectsPage() {
  return (
    <SiteLayout>
      <section className="page page--projects">
        <SectionHeader
          eyebrow="Projects"
          title="Detailed projects with technologies, responsibilities, and media."
          description="Each project has its own detailed view so the page can stand alone on the tab."
        />

        <div className="project-stack">
          {projects.map((project) => (
            <article key={project.title} className="project-card">
              <div className="project-intro">
                <div>
                  <p className="card-label">{project.subtitle}</p>
                  <h3>{project.title}</h3>
                </div>
                <p>{project.summary}</p>
              </div>

              <div className="project-details-grid">
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

                <div className="project-detail-box">
                  <h4>What I did</h4>
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
              </div>

              {project.media ? (
                <div className="media-grid">
                  {project.media.map((media) => (
                    <figure key={media.label} className="media-card">
                      <img src={media.src} alt={`${project.title} - ${media.label}`} />
                      <figcaption>{media.label}</figcaption>
                    </figure>
                  ))}
                </div>
              ) : (
                <p className="project-note">{project.note}</p>
              )}
            </article>
          ))}
        </div>
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
          title="Education, volunteering, and the reason I enjoy helping others."
          description="This page focuses on academic background, community involvement, and personal motivation."
        />

        <div className="about-grid">
          {aboutCards.map((item) => (
            <article key={item.title} className="info-card">
              <p className="card-label">{item.title}</p>
              <p>{item.body}</p>
            </article>
          ))}

          <article className="info-card about-visual">
            <img src={awsCloudClubImage} alt="AWS Cloud Club core team" />
            <p>
              I also enjoy being part of technical communities where learning is shared, workshops are organized, and
              people help each other improve.
            </p>
          </article>

          <article className="info-card about-visual">
            <img src={cpclogo} alt="AWS Cloud Club core team" />
            <p>
              I also enjoy being part of technical communities where learning is shared, workshops are organized, and
              people help each other improve.
            </p>
          </article>
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
                <iframe title={certificate.title} src={certificate.fileUrl} />
              </div>
              <div className="certificate-content">
                <p className="card-label">Certificate</p>
                <h3>{certificate.title}</h3>
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
      <section className="page page--contact">
        <SectionHeader
          eyebrow="Contact"
          title="Reach out through the contact information from my CV."
          description="This page stays focused on direct contact and profile links only."
        />

        <div className="contact-grid">
          <article className="info-card contact-card">
            <p className="card-label">Direct contact</p>
            <a href="mailto:zaintamer10@gmail.com">zaintamer10@gmail.com</a>
            <a href="tel:+201094332424">+20 109 433 2424</a>
            <p>Alexandria, Egypt</p>
          </article>

          <article className="info-card contact-card">
            <p className="card-label">Profiles</p>
            <div className="contact-links">
              {contactLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                  <span>{link.label}</span>
                  <strong>{link.value}</strong>
                </a>
              ))}
            </div>
            <a className="button button--primary" href={cvUrl} target="_blank" rel="noreferrer">
              Download CV
            </a>
          </article>
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
      <Route path="/research" element={<ResearchPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/certificates" element={<CertificatesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App