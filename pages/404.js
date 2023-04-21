import Head from "next/head";
import Link from "next/link";
import Footer from "../components/Footer";

function PageNotFound() {
  return (
    <>
      <Head>
        <title>Page Not Found | Aileen portfolio</title>
      </Head>
      <main className="main" />
      <div className="message-card">
        <h1 className="message-card__title">
          404
          <br />
          Page Not Found
        </h1>
        <div className="message-card__title">😢</div>
        <h3>Looks like you're lost.</h3>
        <p>The page you are looking for is not available!</p>
        <Link href="/">
          <button className="message-card__btn btn">Go back to homepage</button>
        </Link>
      </div>
      <main />
      <Footer />
    </>
  );
}

export default PageNotFound;
