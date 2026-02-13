import React, { useState, useEffect, useRef } from "react";
import anime from "animejs";
import {
  Menu,
  X,
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  Code,
  Database,
  Palette,
  Globe,
  ExternalLink,
} from "lucide-react";
import "./Portfolio.css";

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [visibleSections, setVisibleSections] = useState(new Set(["home"]));
  const [menuBtnPressed, setMenuBtnPressed] = useState(false);
  const [heroText, setHeroText] = useState("");

  const sectionsRef = useRef({});
  const heroImageRef = useRef(null);
  const heroButtonsRef = useRef(null);
  const projectCardsRef = useRef([]);
  const skillCardsRef = useRef([]);
  const fullText = "Hi! I am John";

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = sectionsRef.current[sectionId];
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMenuOpen(false);
  };

  // Hero entrance animations
  useEffect(() => {
    // Animate hero image
    if (heroImageRef.current) {
      anime({
        targets: heroImageRef.current,
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 1200,
        easing: "easeOutElastic(1, .8)",
        delay: 500,
      });
    }

    // Animate hero buttons
    if (heroButtonsRef.current) {
      anime({
        targets: heroButtonsRef.current.children,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: "easeOutQuad",
        delay: anime.stagger(150, { start: 1500 }),
      });
    }
  }, []);

  // Typing animation for hero title
  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const typeWriter = setInterval(() => {
        if (i < fullText.length) {
          setHeroText(fullText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typeWriter);
        }
      }, 100);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Update active navigation
      const sections = Object.keys(sectionsRef.current);
      let current = "home";

      sections.forEach((sectionId) => {
        const element = sectionsRef.current[sectionId];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = sectionId;
          }
        }
      });

      setActiveSection(current);

      // Update navbar background
      const navbar = document.querySelector(".navbar");
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      }

      // Parallax effect for hero background
      const heroBackground = document.querySelector(".hero-bg");
      if (heroBackground) {
        const scrolled = window.pageYOffset;
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for section animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setVisibleSections((prev) => new Set([...prev, sectionId]));

            // Trigger anime.js animations when sections become visible
            if (sectionId === "projects") {
              anime({
                targets: projectCardsRef.current,
                opacity: [0, 1],
                translateY: [50, 0],
                scale: [0.9, 1],
                duration: 800,
                easing: "easeOutExpo",
                delay: anime.stagger(150),
              });
            }

            if (sectionId === "about") {
              anime({
                targets: ".about-text p",
                opacity: [0, 1],
                translateX: [-30, 0],
                duration: 800,
                easing: "easeOutQuad",
                delay: anime.stagger(200),
              });

              anime({
                targets: ".social-links a",
                opacity: [0, 1],
                scale: [0, 1],
                duration: 600,
                easing: "easeOutBack",
                delay: anime.stagger(100, { start: 600 }),
              });
            }

            if (sectionId === "contact") {
              anime({
                targets: ".contact-content > *",
                opacity: [0, 1],
                translateY: [40, 0],
                duration: 800,
                easing: "easeOutQuad",
                delay: anime.stagger(150),
              });
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    Object.values(sectionsRef.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Add hover animation for project cards
  const handleProjectCardHover = (e, isEntering) => {
    anime({
      targets: e.currentTarget,
      scale: isEntering ? 1.03 : 1,
      translateY: isEntering ? -8 : 0,
      duration: 300,
      easing: "easeOutQuad",
    });
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const projects = [
    {
      title: "Catering Management System",
      description:
        "Full-stack catering management system using React, Node.js, and MongoDB. Features include food reservation, dynamic pricing per pax, admin menu control, and responsive UI.",
      image: "/samp_cms.png",
      tech: ["React", "Node.js", "MongoDB"],
      github: "https://github.com/mrvndgl/catering-management-system",
    },
    {
      title: "TMATES Dance Crew",
      description:
        "TMATES is a passionate dance crew known for high-energy performances, creative choreography, and strong teamwork on and off stage.",
      image: "/samp-tmates.png",
      tech: ["React"],
      github: "https://github.com/mrvndgl/tmates",
      demo: "https://superb-empanada-5bc26f.netlify.app/",
    },
    {
      title: "But's Printing Shop",
      description:
        "Responsive printing shop website using React and CSS, showcasing offered services and product catalog with a modern UI.",
      image: "/samp_bps.png",
      tech: ["HTML", "CSS", "React"],
      github: "https://github.com/mrvndgl/butsprintingshop",
    },
    {
      title: "Shake Eat",
      description:
        "A gamified food decision app UI in Figma that helps groups choose dining spots based on preferences, budget, and location.",
      image: "/samp-shakeeat.png",
      tech: ["Figma"],
      demo: "https://www.figma.com/design/B9LP3r5AT9lKhWkOA0joh2/SHAKE-EAT?node-id=0-1&t=omLkoOI3sHUYNU3P-1",
    },
  ];

  const skills = [
    {
      icon: Code,
      title: "Frontend",
      techs: ["React", "Tailwind CSS"],
    },
    {
      icon: Database,
      title: "Backend",
      techs: ["Node.js", "MongoDB"],
    },
    {
      icon: Palette,
      title: "Design",
      techs: ["Figma", "UI/UX"],
    },
    {
      icon: Globe,
      title: "DevOps",
      techs: ["GitHub"],
    },
  ];

  return (
    <div className="portfolio">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">John Marvin Digal</div>

          {/* Desktop Navigation */}
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-link ${activeSection === item.id ? "active" : ""
                    }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className={`mobile-menu-btn${menuBtnPressed ? " pressed" : ""}`}
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
            onPointerDown={() => setMenuBtnPressed(true)}
            onPointerUp={() => setMenuBtnPressed(false)}
            onPointerLeave={() => setMenuBtnPressed(false)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Navigation */}
          <div className={`mobile-menu ${isMenuOpen ? "show" : ""}`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="mobile-nav-link"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        ref={(el) => (sectionsRef.current.home = el)}
        className="hero"
      >
        <div className="hero-bg" />

        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              {heroText}
              <span className="blinking-cursor">|</span>
            </h1>
            <p className="hero-subtitle">
              Junior Web Developer & UI/UX Enthusiast building meaningful and
              user-friendly digital experiences.
            </p>
            <div className="hero-buttons" ref={heroButtonsRef}>
              <button
                onClick={() => scrollToSection("projects")}
                className="btn btn-primary"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="btn btn-outline"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Get In Touch
              </button>
            </div>
          </div>

          <div className="hero-image" ref={heroImageRef}>
            <div className="hero-image-wrapper">
              <img src="/John.jpg" alt="John" />
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <button
            className="scroll-indicator-btn"
            onClick={() => scrollToSection("about")}
            aria-label="Scroll to About Me"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <ChevronDown size={32} color="#F4631E" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={(el) => (sectionsRef.current.about = el)}
        className={`section ${visibleSections.has("about") ? "visible" : ""}`}
      >
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                I'm a junior front-end web developer and recent IT graduate with
                a strong interest in building clean, responsive, and
                user-friendly interfaces. I enjoy working with modern web
                technologies like HTML, CSS, JavaScript, and React, and I'm
                passionate about creating smooth user experiences.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge
                through technical writing and mentoring.
              </p>
              <div className="social-links">
                <a
                  href="https://github.com/mrvndgl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={24} color="#F4631E" />
                </a>
                <a
                  href="https://www.linkedin.com/in/john-marvin-digal-147a2a324/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={24} color="#F4631E" />
                </a>
                <a href="mailto:johnmarvindigal@gmail.com">
                  <Mail size={24} color="#F4631E" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        ref={(el) => (sectionsRef.current.projects = el)}
        className={`section projects-section ${visibleSections.has("projects") ? "visible" : ""
          }`}
      >
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div
                key={index}
                className="project-card"
                ref={(el) => (projectCardsRef.current[index] = el)}
                onMouseEnter={(e) => handleProjectCardHover(e, true)}
                onMouseLeave={(e) => handleProjectCardHover(e, false)}
              >
                <img src={project.image} alt={project.title} />
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tech-tags">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={16} />
                      <span>Code</span>
                    </a>

                    {(project.title === "TMATES Dance Crew" ||
                      project.title === "Shake Eat") &&
                      project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={16} />
                          <span>Live Demo</span>
                        </a>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={(el) => (sectionsRef.current.contact = el)}
        className={`section contact-section ${visibleSections.has("contact") ? "visible" : ""
          }`}
      >
        <div className="container">
          <div className="contact-content">
            <h2 className="section-title">Let's Work Together</h2>
            <p className="contact-description">
              I'm always excited to take on new challenges and collaborate on
              interesting projects. Let's create something amazing together!
            </p>
            <div className="contact-buttons">
              <a
                href="mailto:johnmarvindigal@gmail.com"
                className="btn btn-primary"
              >
                <Mail size={20} />
                <span>Send Email</span>
              </a>
              <a
                href="https://www.linkedin.com/in/john-marvin-digal-147a2a324/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 John Marvin Digal. Built with React & CSS.</p>
      </footer>
    </div>
  );
};

export default Portfolio;