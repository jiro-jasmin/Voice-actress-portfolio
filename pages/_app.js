import Head from "next/head";
import { useRouter } from "next/router";
import Nav from "../components/Nav";
import "../styles/styles.scss";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Aileen Wrozyna | Sprecherin | Moderatorin | Voice Actress</title>
        <meta name="description" content="Meine Stimme für Ihre Projekte - Werbung | Synchron | Dokumentation | Erklärfilm" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Twitter Card data */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Aileen Wrozyna" />
        <meta name="twitter:description" content="Meine Stimme für Ihre Projekte - Werbung | Synchron | Dokumentation | Erklärfilm" />
        <meta name="twitter:image" content="https://res.cloudinary.com/dzciuzi3d/image/upload/v1681406142/small_profile_pic_d4204b1e6c.png" />

        {/* Open Graph data */}
        <meta property="og:title" content="Aileen Wrozyna | Sprecherin | Moderatorin | Voice Actress" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.aileenwrozyna.de" />
        <meta property="og:image" content="https://res.cloudinary.com/dzciuzi3d/image/upload/v1681406142/small_profile_pic_d4204b1e6c.png" />
        <meta property="og:description" content="Meine Stimme für Ihre Projekte - Werbung | Synchron | Dokumentation | Erklärfilm" />
        <meta property="og:site_name" content="Aileen Wrozyna" />

        <meta name="google-site-verification" content="qhcAy_-teUR8sPhzeu96UtMQIAK8xPZ-g8KqZVEm7ws" />
      </Head>
      {router.asPath !== "/" && <Nav />}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;