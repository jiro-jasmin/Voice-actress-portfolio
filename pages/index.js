import Image from "next/image";
import Link from "next/link";


function Home({ projects }) {



    return (
        <>
            <div className="landing-page">
                <Image className="landing-page__bg" src="/test.jpg" alt="" fill />
                <div className="landing-page__card">
                    <div className="landing-page__card__title">aileen wrozyna</div>
                    <div className="landing-page__card__description">Meine Stimme fur Ihre Projekte</div>
                    <div className="landing-page__card__description">Moderation | Hoerbuch | Hoerspiel | Voice Over | Live | Sprechbildung</div>
                    <button className="landing-page__card__btn btn">
                        <Link href="/audios">Audio projects</Link>
                    </button>
                    <button className="landing-page__card__btn btn">
                        <Link href="/texts">Textual projects</Link>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Home;

