import axios from "axios";
import ProjectsList from "../components/ProjectsList";
import Footer from "../components/Footer";

function BestOf({ projects, footer }) {
  return (
    <>
      <main className="main">
        <div className="wrapper">
          <ProjectsList projects={projects.data} />
        </div>
      </main>
      <Footer text={footer.data[0].attributes.bestof} />
    </>
  );
}

export default BestOf;

export async function getServerSideProps() {
  const projects = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/bestworks?populate=*&sort=date:desc`
  );

  const footer = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/footers`
  );

  return {
    props: {
      projects: projects.data,
      footer: footer.data
    },
  };
}
