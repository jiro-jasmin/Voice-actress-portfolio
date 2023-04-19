import axios from "axios";
import ProjectsList from "../components/ProjectsList";

function BestOf({ projects }) {

  return (
    <>
      <div className="wrapper">
        <ProjectsList projects={projects.data} />
      </div>
    </>
  );
}

export default BestOf;

export async function getServerSideProps() {
  const projects = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/bestworks?populate=*&sort=date:desc`
  );

  return {
    props: {
      projects: projects.data,
    },
  };
}
