import React from "react";

const Footer = () => {
  return (
    <footer className="mb-0 text-center">
      <div className="d-flex align-items-center justify-content-center pb-4 flex-column">
        <div>
          <a
            className="text-dark fs-4"
            href="https://gitlab.com/topmanager1016-group1/e-commerce/"
            target="_blank"
            rel="noreferrer"
            aria-label="View GitHub Repo"
          >
            <i className="fa fa-github" aria-hidden="true"></i>
          </a>
        </div>
        <p className="mt-3 text-muted">© {new Date().getFullYear()} Dex E-commerce</p>
      </div>
    </footer>
  );
};

export default Footer;
