import '../../styles.css';
export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer-text">© {currentYear} MovieDux, All rights reserved.</p>
    </footer>
  );
};
