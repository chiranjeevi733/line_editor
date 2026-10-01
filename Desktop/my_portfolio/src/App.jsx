import { useEffect, useState } from 'react'
import {
  FaArrowRight,
  FaBriefcase,
  FaCode,
  FaDownload,
  FaEnvelope,
  FaGithub,
  FaGlobe,
  FaLinkedinIn,
  FaMoon,
  FaPhoneAlt,
  FaSun,
  FaUniversity,
} from 'react-icons/fa'
import { FiMenu, FiX } from 'react-icons/fi'
import './App.css'
import { portfolioData } from './data/portfolioData'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { name: 'GitHub', href: portfolioData.github, icon: <FaGithub /> },
  { name: 'LinkedIn', href: portfolioData.linkedin, icon: <FaLinkedinIn /> },
]

const profileIcons = {
  github: <FaGithub />,
  leetcode: <FaCode />,
  hackerrank: <FaCode />,
  codechef: <FaCode />,
  other: <FaGlobe />,
}

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('portfolio-theme')

    if (savedTheme) {
      return savedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  const handleContactSubmit = (event) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const name = formData.get('name')?.toString().trim() || 'Portfolio Visitor'
    const email = formData.get('email')?.toString().trim() || ''
    const message = formData.get('message')?.toString().trim() || ''

    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    )

    window.location.href = `mailto:${portfolioData.email}?subject=${subject}&body=${body}`
    form.reset()
  }

  return (
    <div className="portfolio-app" data-theme={theme}>
      <header className="site-header">
        <div className="container nav-wrapper">
          <a href="#home" className="brand" aria-label="Go to home section">
            {portfolioData.name || '[YOUR FULL NAME]'}
          </a>

          <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))}
              aria-label="Toggle light and dark mode"
            >
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </button>

            <button
              type="button"
              className="menu-toggle"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Open mobile menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <p className="eyebrow">Hi, I&apos;m {portfolioData.name || '[YOUR FULL NAME]'}</p>
              <h1>{portfolioData.title}</h1>
              <p className="intro-text">{portfolioData.shortIntro}</p>

              <div className="hero-actions">
                <a href="#projects" className="button-primary">
                  View My Projects <FaArrowRight />
                </a>
                <a href={portfolioData.resume} className="button-secondary" target="_blank" rel="noreferrer">
                  <FaDownload /> Download Resume
                </a>
              </div>

              <div className="social-row" aria-label="Social media links">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="social-link"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              <p className="resume-placeholder">
                Resume file location: public/resume.pdf. Add your PDF there when ready.
              </p>
            </div>

          </div>
        </section>

        <section id="about" className="content-section">
          <div className="container">
            <SectionHeading
              eyebrow="About me"
              title="Building skills through projects, practice, and curiosity"
              text="I am passionate about learning technology, solving problems, and creating meaningful digital experiences."
            />

            <div className="about-grid">
              <div className="about-card reveal">
                <p>{portfolioData.about}</p>
              </div>

              <div className="about-card reveal">
                <ul className="info-list">
                  <li>
                    <strong>Current status:</strong> {portfolioData.academicStatus}
                  </li>
                  <li>
                    <strong>Areas of interest:</strong> {portfolioData.areasOfInterest.join(', ')}
                  </li>
                  <li>
                    <strong>Learning mindset:</strong> {portfolioData.learningMindset}
                  </li>
                  <li>
                    <strong>Career interests:</strong> {portfolioData.careerInterests.join(', ')}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="education" className="content-section alt-section">
          <div className="container">
            <SectionHeading
              eyebrow="Education"
              title="Academic background"
              text="A focused, practical learning path in computer science and software development."
            />

            <div className="education-card reveal">
              <div className="edu-icon">
                <FaUniversity />
              </div>

              <div className="edu-content">
                <p className="degree-name">{portfolioData.education.degree}</p>
                <p className="edu-meta">
                  {portfolioData.education.year} • {portfolioData.education.college}
                </p>
                <p className="edu-meta">Location: {portfolioData.education.location}</p>
                <p className="edu-meta">
                  Start Year: {portfolioData.education.startYear} • Expected Graduation:{' '}
                  {portfolioData.education.graduationYear}
                </p>
                <p className="edu-meta">School / PUC: {portfolioData.education.school}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="content-section">
          <div className="container">
            <SectionHeading
              eyebrow="Skills"
              title="Technical strengths and learning focus"
              text="A growing set of skills in programming, web development, and core computer science concepts."
            />

            <div className="skills-grid">
              <SkillGroup title="Programming Languages" items={portfolioData.skills.programmingLanguages} />
              <SkillGroup title="Web Technologies" items={portfolioData.skills.webTechnologies} />
              <SkillGroup title="Database" items={portfolioData.skills.database} />
              <SkillGroup title="Tools" items={portfolioData.skills.tools} />
              <SkillGroup title="Libraries / Frameworks" items={portfolioData.skills.frameworks} />
              <SkillGroup title="Concepts" items={portfolioData.skills.concepts} />
            </div>
          </div>
        </section>

        <section id="projects" className="content-section alt-section">
          <div className="container">
            <SectionHeading
              eyebrow="Projects"
              title="Hands-on work and learning through building"
              text="These placeholders are ready to be replaced with your real projects and demos."
            />

            <div className="projects-grid">
              {portfolioData.projects.map((project, index) => (
                <article key={project.name + index} className="project-card reveal">
                  {project.image && project.image !== '#' ? (
                    <img src={project.image} alt={`${project.name} preview`} className="project-image" />
                  ) : (
                    <div className="project-image placeholder-image">
                      <span>{project.name}</span>
                    </div>
                  )}

                  <div className="project-body">
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>

                    <div className="tag-list">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="tag">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <ul className="feature-list">
                      {project.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>

                    <div className="project-links">
                      <a href={project.github} target="_blank" rel="noreferrer">
                        GitHub
                      </a>
                      {project.liveDemo && project.liveDemo !== '[LINK OR LEAVE BLANK]' ? (
                        <a href={project.liveDemo} target="_blank" rel="noreferrer">
                          Live Demo
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="content-section">
          <div className="container">
            <SectionHeading
              eyebrow="Experience & activities"
              title="Building a strong foundation"
              text="Currently growing through academic work, technical learning, and practical project experience."
            />

            <div className="experience-card reveal">
              <div className="experience-icon">
                <FaBriefcase />
              </div>
              <div className="experience-content">
                {portfolioData.experience.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="certifications" className="content-section alt-section">
          <div className="container">
            <SectionHeading
              eyebrow="Certifications"
              title="Learning milestones"
              text="Certificates will appear here as you complete relevant courses and programs."
            />

            <div className="certificates-grid">
              {portfolioData.certificates.map((certificate) => (
                <article key={certificate.name} className="certificate-card reveal">
                  <h3>{certificate.name}</h3>
                  <p>{certificate.issuer}</p>
                  <div className="certificate-meta">
                    <span>Date: {certificate.date}</span>
                    <span>Credential: {certificate.credential}</span>
                  </div>
                  <a href={certificate.link} target="_blank" rel="noreferrer">
                    View certificate
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="achievements" className="content-section">
          <div className="container">
            <SectionHeading
              eyebrow="Achievements"
              title="Progress and recognition"
              text="Only add results you have truly earned and can confidently present."
            />

            <div className="achievement-list reveal">
              {portfolioData.achievements.map((achievement) => (
                <div key={achievement} className="achievement-item">
                  <span className="achievement-bullet" aria-hidden="true"></span>
                  <p>{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="coding-profiles" className="content-section alt-section">
          <div className="container">
            <SectionHeading
              eyebrow="Coding profiles"
              title="Practice, learning, and problem solving"
              text="These links help visitors see your coding journey and technical consistency."
            />

            <div className="profile-grid">
              {portfolioData.codingProfiles.map((profile) => (
                <a
                  key={profile.name}
                  href={profile.url}
                  target="_blank"
                  rel="noreferrer"
                  className="profile-card-item reveal"
                >
                  <div className="profile-icon">{profileIcons[profile.icon] || <FaCode />}</div>
                  <span>{profile.name}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="resume" className="content-section">
          <div className="container">
            <SectionHeading
              eyebrow="Resume"
              title="Professional portfolio summary"
              text="Add your PDF in the public folder and keep the link ready for recruiters and reviewers."
            />

            <div className="resume-box reveal">
              <a href={portfolioData.resume} className="button-primary" target="_blank" rel="noreferrer">
                <FaDownload /> Download My Resume
              </a>
              <a href={portfolioData.resume} className="button-secondary" target="_blank" rel="noreferrer">
                View Resume
              </a>
              <p className="resume-placeholder large">Resume file should be placed at public/resume.pdf.</p>
            </div>
          </div>
        </section>

        <section id="contact" className="content-section alt-section">
          <div className="container">
            <SectionHeading
              eyebrow="Contact"
              title="Let&apos;s connect"
              text="I am open to learning opportunities, collaborations, and meaningful software discussions."
            />

            <div className="contact-grid">
              <div className="contact-card reveal">
                <div className="contact-item">
                  <FaEnvelope />
                  <a href={`mailto:${portfolioData.email}`}>{portfolioData.email}</a>
                </div>
                <div className="contact-item">
                  <FaLinkedinIn />
                  <a href={portfolioData.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                </div>
                <div className="contact-item">
                  <FaGithub />
                  <a href={portfolioData.github} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                </div>
                <div className="contact-item">
                  <FaPhoneAlt />
                  <a href={`tel:${portfolioData.phone}`}>{portfolioData.phone}</a>
                </div>
              </div>

              <form className="contact-form reveal" onSubmit={handleContactSubmit}>
                <label>
                  Name
                  <input type="text" name="name" placeholder="Your name" required />
                </label>
                <label>
                  Email
                  <input type="email" name="email" placeholder="Your email" required />
                </label>
                <label>
                  Message
                  <textarea name="message" rows="5" placeholder="Write your message here" required />
                </label>
                <button type="submit" className="button-primary submit-button">
                  Submit
                </button>
                <p className="form-note">This form opens the default mail app because no backend email service is configured.</p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>© {new Date().getFullYear()} {portfolioData.name || '[YOUR FULL NAME]'}</p>
          <p>Built with passion for learning and building.</p>
        </div>
      </footer>
    </div>
  )
}

function SkillGroup({ title, items }) {
  return (
    <div className="skill-group reveal">
      <h3>{title}</h3>
      <div className="tag-list">
        {items.map((item) => (
          <span key={item} className="tag">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="section-heading reveal">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  )
}

export default App
