import axios from "axios";
import useSWR from "swr";
import TextProjects from "../components/TextProjects";

function Texts({ projects }) {

    return (
        <>
            <div className="wrapper">
                <TextProjects projects={projects} />
            </div>

        </>
    )
}

export default Texts;

export async function getStaticProps() {
    const projects = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/text-projects?populate=*&sort=date:desc`);

    return {
        props: {
            projects: projects.data
        }
    }
}

