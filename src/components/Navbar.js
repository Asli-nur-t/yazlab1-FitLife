import { Link, useMatch, useResolvedPath } from "react-router-dom"
import "./styles.css";
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
export default function Navbar() {
    const path = window.location.pathname;
    return (
        <nav className="nav">
            <Link to="/" className="site-title">
                FİT LİFE
            </Link>
            <ul>
                <CustomLink to="/home">Ana Sayfa</CustomLink>
                <CustomLink to="/Auth">Kaydol</CustomLink>
                <CustomLink to="/UserLogin">Giriş Yap</CustomLink>
                <CustomLink to="/Coach">Antrenör Giriş</CustomLink>
                <CustomLink to="/AdminLogin">Admin Giriş</CustomLink>
                <CustomLink to="/About">Hakkımızda</CustomLink>
                {/* Sosyal medya bağlantıları için ikonlar */}
                <li>
                    <a href="link_to_facebook" className="social-icon">
                        <FaFacebook />
                    </a>
                </li>
                <li>
                    <a href="link_to_twitter" className="social-icon">
                        <FaTwitter />
                    </a>
                </li>
                <li>
                    <a href="link_to_instagram" className="social-icon">
                        <FaInstagram />
                    </a>
                </li>
            </ul>
        </nav>
    );


}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}