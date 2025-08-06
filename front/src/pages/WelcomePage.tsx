import React from 'react';
import './WelcomePage.css';

const WelcomePage: React.FC = () => {
  const teamMembers = [
    {
      name: 'Alvaroooo Gatica',
      role: 'La cabeza del equipo',
      avatar: '👨‍💻'
    },
    {
      name: 'Pedro Ascui',
      role: 'La creatividad del equipo',
      avatar: '👨‍💻'
    },
    {
      name: 'Felipe Caroca',
      role: 'Bailarin del frontend',
      avatar: '👨‍💻'
    }
  ];

  const features = [
    {
      title: 'React 18',
      description: 'Última versión con hooks avanzados',
      icon: '⚛️'
    },
    {
      title: 'TypeScript',
      description: 'Tipado estático para mejor desarrollo',
      icon: '📘'
    },
    {
      title: 'Vite',
      description: 'Build tool ultra rápido',
      icon: '⚡'
    },
    {
      title: 'Responsive Design',
      description: 'Adaptable a todos los dispositivos',
      icon: '📱'
    }
  ];

  return (
    <div className="welcome-container">
      {/* Header */}
      <header className="welcome-header">
        <div className="header-content">
          <h1 className="main-title">
            <span className="title-icon">🎉</span>
            ¡Bienvenido al Equipo Frontend!
            <span className="title-icon">🎉</span>
          </h1>
          <p className="subtitle">
            Construyendo experiencias digitales extraordinarias
          </p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h2 className="hero-title">
              TechXcelerators <span className="highlight">Frontend</span>
            </h2>
            <p className="hero-description">
              Somos un equipo apasionado por crear interfaces intuitivas, 
              experiencias de usuario excepcionales y código limpio y mantenible.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">TypeScript</span>
              </div>
              <div className="stat">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Innovación</span>
              </div>
              <div className="stat">
                <span className="stat-number">∞</span>
                <span className="stat-label">Posibilidades</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card">
              <div className="code-preview">
                <div className="code-header">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <div className="code-content">
                  <span className="code-line">const</span> <span className="code-variable">team</span> = <span className="code-string">'Frontend'</span>;
                  <span className="code-line">const</span> <span className="code-variable">passion</span> = <span className="code-string">'Infinite'</span>;
                  <span className="code-line">const</span> <span className="code-variable">future</span> = <span className="code-string">'Bright'</span>;
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h3 className="section-title">Nuestras Tecnologías</h3>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h4 className="feature-title">{feature.title}</h4>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h3 className="section-title">Nuestro Equipo</h3>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <div className="member-avatar">{member.avatar}</div>
              <h4 className="member-name">{member.name}</h4>
              <p className="member-role">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

    

      {/* Footer */}
      <footer className="welcome-footer">
        <p className="footer-text">
          Made with ❤️ by TechXcelerators Frontend Team
        </p>
      </footer>
    </div>
  );
};

export default WelcomePage; 