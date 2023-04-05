import axios from "axios";
import useSWR from "swr";
import ProjectsList from "../components/ProjectsList";

function BestOf({ projects }) {

  return (
    <>
      <div className="wrapper">
        <ProjectsList projects={projects} />
      </div>
    </>
  );
}

export default BestOf;

export async function getStaticProps() {
  const projects = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/audio-projects?filters[bestof][$eq]=true&populate=*&sort=date:desc`
  );

  return {
    props: {
      projects: projects.data,
    },
  };
}
