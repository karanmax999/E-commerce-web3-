import React from "react";

const Footer = () => {
  return (
    <footer className="mb-0 text-center" style={{
      background: 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 50%, #fce4ec 100%)',
      padding: '3rem 0 2rem 0',
      marginTop: '3rem',
      borderTop: '1px solid rgba(156, 39, 176, 0.2)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 20%, rgba(233, 30, 99, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(156, 39, 176, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(33, 150, 243, 0.05) 0%, transparent 50%)
        `,
        animation: 'pulse 4s ease-in-out infinite'
      }}></div>
      
      <div className="d-flex align-items-center justify-content-center pb-4 flex-column">
        {/* Social media icons */}
        <div className="mb-4">
          <h5 style={{
            background: 'linear-gradient(45deg, #1565c0, #7b1fa2, #e91e63)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: '600',
            marginBottom: '20px'
          }}>✨ Follow Us ✨</h5>
          
          <div className="d-flex justify-content-center gap-3">
            {[
              { icon: 'fa-facebook', color: '#3b5998', name: 'Facebook' },
              { icon: 'fa-twitter', color: '#1da1f2', name: 'Twitter' },
              { icon: 'fa-instagram', color: '#e4405f', name: 'Instagram' },
              { icon: 'fa-linkedin', color: '#0077b5', name: 'LinkedIn' },
              { icon: 'fa-youtube', color: '#ff0000', name: 'YouTube' }
            ].map((social, index) => (
              <a
                key={social.name}
                href="#"
                className="btn"
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #ffffff, #f8f9fa)',
                  color: social.color,
                  border: `2px solid ${social.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  fontSize: '1.2rem',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  animation: `float 3s ease-in-out infinite ${index * 0.5}s`
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = social.color;
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-5px) scale(1.1)';
                  e.target.style.boxShadow = `0 8px 25px ${social.color}40`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(45deg, #ffffff, #f8f9fa)';
                  e.target.style.color = social.color;
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                }}
                aria-label={social.name}
              >
                <i className={`fab ${social.icon}`}></i>
              </a>
            ))}
          </div>
        </div>
        
        {/* Newsletter signup */}
        <div className="mb-4" style={{ maxWidth: '400px', width: '100%' }}>
          <h6 style={{
            color: '#7b1fa2',
            fontWeight: '600',
            marginBottom: '15px'
          }}>💌 Subscribe to our Newsletter</h6>
          <div className="input-group">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email..."
              style={{
                border: '2px solid rgba(156, 39, 176, 0.2)',
                borderRadius: '25px 0 0 25px',
                padding: '12px 20px',
                fontSize: '0.9rem'
              }}
            />
            <button
              className="btn"
              style={{
                background: 'linear-gradient(45deg, #e91e63, #9c27b0)',
                color: 'white',
                border: 'none',
                borderRadius: '0 25px 25px 0',
                padding: '12px 20px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 4px 15px rgba(233, 30, 99, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Subscribe ✨
            </button>
          </div>
        </div>
        
        {/* GitHub link */}
        <div>
          <a
            className="fs-4"
            style={{
              background: 'linear-gradient(45deg, #1976d2, #7b1fa2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              transition: 'all 0.4s ease',
              textDecoration: 'none',
              fontSize: '2rem',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(45deg, #0d47a1, #4a148c)';
              e.target.style.WebkitBackgroundClip = 'text';
              e.target.style.WebkitTextFillColor = 'transparent';
              e.target.style.transform = 'scale(1.2) rotate(5deg)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(45deg, #1976d2, #7b1fa2)';
              e.target.style.WebkitBackgroundClip = 'text';
              e.target.style.WebkitTextFillColor = 'transparent';
              e.target.style.transform = 'scale(1) rotate(0deg)';
            }}
            href="https://gitlab.com/topmanager1016-group1/e-commerce/"
            target="_blank"
            rel="noreferrer"
            aria-label="View GitHub Repo"
          >
            <i className="fab fa-github" aria-hidden="true"></i>
          </a>
        </div>
        
        {/* Copyright */}
        <p className="mt-3" style={{
          background: 'linear-gradient(45deg, #1976d2, #7b1fa2, #e91e63)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontWeight: '500',
          fontSize: '1rem',
          marginBottom: '10px'
        }}>© {new Date().getFullYear()} ✨ Dex E-commerce ✨</p>
        
        <p style={{
          color: '#7b1fa2',
          fontSize: '0.9rem',
          opacity: '0.8',
          fontStyle: 'italic'
        }}>Made with 💜 and lots of ☕</p>
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
