import axios from "axios";
import MarkdownIt from "markdown-it";
import Footer from "../components/Footer";
import Head from "next/head";

function Contact({ data, footer }) {
  const dataContent = data.data[0].attributes;

  const md = new MarkdownIt();
  const htmlContent = md.render(dataContent.content);

  return (
    <>
      <Head>
        <title>
          Buchung | Aileen Wrozyna, Sprecherin, Moderatorin & Voice Actress
        </title>
      </Head>
      <main className="main">
        <div className="wrapper">
          <section className="article">
            {dataContent.title && (
              <h1 className="article__title">{dataContent.title}</h1>
            )}
            {dataContent.content && (
              <section
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              ></section>
            )}
          </section>
        </div>
      </main>
      <Footer text={footer.data[0].attributes.contact} />
    </>
  );
}

export default Contact;

export async function getServerSideProps() {
  const data = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contacts`
  );

  const footer = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/footers`
  );

  return {
    props: {
      data: data.data,
      footer: footer.data,
    },
  };
}
