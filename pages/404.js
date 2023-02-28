import Head from "next/head";
import Link from "next/link";

function PageNotFound() {
    return (<>
        <Head>
            <title>Page Not Found | Aileen portfolio</title>
        </Head>
        <div className="message-card">
            <h1 className="message-card__title">404<br />Page Not Found</h1>
            <div className="message-card__title">😢</div>
            <h3>Looks like you're lost.</h3>
            <p>The page you are looking for is not available!</p>
            <button className="message-card__btn btn">
                <Link href="/">Go back to homepage</Link>
            </button>
        </div>
    </>);
}

export default PageNotFound;