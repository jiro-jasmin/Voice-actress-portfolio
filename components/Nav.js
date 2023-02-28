import Link from 'next/link';
import { useRouter } from 'next/router';


function Nav() {

    const router = useRouter();

    const navItems = [
        {
            name: 'Audios',
            path: '/audios'
        },
        {
            name: 'Texts',
            path: '/texts'
        },
        {
            name: 'About',
            path: '/about'
        },
    ];

    return (
        <nav className="navbar">
            <div className="navbar__text">
                Schreib mir gerne für <br />Anfragen und Kooperationen: <br />
               <Link href="mailto:hi@aileenwrozyna.de">hi@aileenwrozyna.de</Link>
            </div>
            <ul className="navbar__list">
                {navItems.map(item =>
                    <li key={item.name}
                        className={`navbar__list__item${router.asPath === item.path ? ' navbar__list__item--active' : ''}`}
                    >
                        <Link href={item.path}>
                            {item.name}
                        </Link>
                    </li>
                )}
            </ul>
            <div className="navbar__text-job navbar__text-job--active">
                Sprecherische Tätigkeiten
            </div>
            <div className="navbar__text-job">
                Journalistische Arbeiten
            </div>

        </nav>
    )
}

export default Nav;