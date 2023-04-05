import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Home({ content }) {
  const homeContent = content.data[0].attributes;

  const [fade, setFade] = useState(false);
  const router = useRouter();

  const fadeAnimation = () => {
    setFade(true);
    setTimeout(() => {
      router.push("/bestof");
    }, 500);
  };

  useEffect(() => {
    const handleWheel = () => {
      fadeAnimation();
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [router]);

  const handleClick = () => {
    fadeAnimation();
  };

  return (
    <>
      <div
        className={`landing-page${fade ? " fade-out" : ""}`}
        onClick={handleClick}
      >
        <img
          src={`http://localhost:1337${homeContent.background.data.attributes.url}`}
          alt=""
          className="landing-page__background"
        />
        <div className="landing-page__card">
          <div className="landing-page__card__title">aileen wrozyna</div>
          <div className="landing-page__card__description">
            {homeContent.description1}
          </div>
          <div className="landing-page__card__description">
            {homeContent.description2}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

export async function getStaticProps() {
  const content = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/homes?populate=*`
  );

  return {
    props: {
      content: content.data,
    },
  };
}
