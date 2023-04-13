import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

function Nav() {

  const router = useRouter();

  const navItems = [
    {
      name: "Hörbeispiele",
      path: "/bestof",
    },
    {
      name: "Portfolio",
      path: "/portfolio",
    },
    {
      name: "Referenzen",
      path: "/references",
    },
    {
      name: "Über mich",
      path: "/about",
    },
    {
      name: "Buchung",
      path: "/contact",
    },
  ];

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
      setMenuOpen(!menuOpen);
  };

  const navbarRef = useRef(null);

  const handleDocumentClick = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
          // Clicked outside of navbar, close navbar
          setMenuOpen(false);
      }
  };

  const [scroll, setScroll] = useState(false);

  const handleNavScroll = (event) => {
    if (window.scrollY > 5) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  }


  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    document.addEventListener('scroll', handleNavScroll);

    return () => {
        document.removeEventListener('click', handleDocumentClick);
        document.addEventListener('scroll', handleNavScroll);

    };
}, []);

  return (
    <nav className={`navbar ${scroll && "navbar--scrolled"}`}>
       <a href="mailto:hi@aileenwrozyna.de" className="navbar__info-mobile">
          Schreib mir
        </a>
      <ul className={`navbar__list ${menuOpen ? " open" : ""}`}>
        <li className="navbar__list__info-desktop">
          <div>Schreib mir gerne</div>
          <a
            href="mailto:hallo@aileenwrozyna.de"
            className="navbar__list__info-desktop__link"
          >
            hallo@aileenwrozyna.de
          </a>
        </li>

        {navItems.map((item) => (
          <li
            key={item.name}
            className={`navbar__list__item${
              router.asPath === item.path ? " navbar__list__item--active" : ""
            }`}
            onClick={toggleMenu}
          >
            <Link href={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>

      
                <button
                    onClick={toggleMenu}
                    type="button"
                    className={`burger${menuOpen ? " open" : ""}`}
                    title="Menu"
                >
                    <span className="burger__bun burger__bun__top"></span>
                    <span className="burger__bun burger__bun__bottom"></span>
                </button>
        
    </nav>
  );
}

export default Nav;

export async function getStaticProps() {
  const content = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/navbars`
  );

  return {
    props: {
      content: content.data,
    },
  };
}
