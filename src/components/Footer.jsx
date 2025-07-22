import React from "react";

const Footer = () => {
  return (
    <footer className="mb-0 text-center" style={{
      background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
      padding: '2rem 0',
      marginTop: '3rem',
      borderTop: '1px solid rgba(33, 150, 243, 0.1)'
    }}>
      <div className="d-flex align-items-center justify-content-center pb-4 flex-column">
        <div>
          <a
            className="fs-4"
            style={{
              color: '#1976d2',
              transition: 'all 0.3s ease',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#0d47a1';
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#1976d2';
              e.target.style.transform = 'scale(1)';
            }}
            href="https://gitlab.com/topmanager1016-group1/e-commerce/"
            target="_blank"
            rel="noreferrer"
            aria-label="View GitHub Repo"
          >
            <i className="fa fa-github" aria-hidden="true"></i>
          </a>
        </div>
        <p className="mt-3" style={{
          color: '#1976d2',
          fontWeight: '500',
          opacity: '0.8'
        }}>© {new Date().getFullYear()} Dex E-commerce</p>
      </div>
    </footer>
  );
};

export default Footer;
