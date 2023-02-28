import axios from "axios";
import useSWR from "swr";
import ProjectsList from "../components/ProjectsList";

function Audios({ projects }) {

    const fetcher = (url) => fetch(url).then((res) => res.json());

    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/audio-projects?populate=*&sort=date:desc`, fetcher, {
        fallbackData: projects
    });
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    return (
        <>
            <ProjectsList projects={data} />
        </>
    )
}

export default Audios;

export async function getStaticProps() {
    const projects = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/audio-projects?populate=*&sort=date:desc`);

    return {
        props: {
            projects: projects.data
        }
    }
}

