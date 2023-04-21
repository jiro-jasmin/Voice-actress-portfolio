function Footer({ text }) {
    return ( 
        <footer className="footer">
            <div className="footer__logo">aileen wrozyna{text ? ',' : ''}</div>
            <div className="footer__text">{text}</div>
        </footer>
     );
}

export default Footer;