import axios from "axios";
import Profile from "../components/Profile";
import Footer from "../components/Footer";

function About({ data, footer }) {
  const dataContent = data.data[0].attributes;

  return (
    <>
      <main className="main">
        <div className="wrapper">
          <Profile content={dataContent} />
        </div>
      </main>
      <Footer text={footer.data[0].attributes.about} />
    </>
  );
}

export default About;

export async function getServerSideProps() {
  const data = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/abouts?populate=*`
  );

  const footer = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/footers`
  );

  return {
    props: {
      data: data.data,
      footer: footer.data
    },
  };
}
