import axios from "axios";
import MarkdownIt from "markdown-it";

function References({ data }) {
  const dataContent = data.data[0].attributes;

  const md = new MarkdownIt();
  const htmlContent = md.render(dataContent.content);

  return (
    <>
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
    </>
  );
}

export default References;

export async function getServerSideProps() {
  const data = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/references`
  );

  return {
    props: {
      data: data.data,
    },
  };
}
