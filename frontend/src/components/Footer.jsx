import "../styles/footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-title">Chat Summarizer</span>
          <p className="footer-subtitle">Turning chaotic Discord discussions into clear, actionable insights.</p>
        </div>

        <div className="footer-meta">
          <p className="footer-copy">&copy; 2026 Chat Summarizer. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
