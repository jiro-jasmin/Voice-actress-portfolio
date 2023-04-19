import axios from "axios";
import Profile from "../components/Profile";

function About({ data }) {
  const dataContent = data.data[0].attributes;

  return (
    <>
      <div className="wrapper">
        <Profile content={dataContent} />
      </div>
    </>
  );
}

export default About;

export async function getServerSideProps() {
  const data = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/abouts?populate=*`
  );

  return {
    props: {
      data: data.data,
    },
  };
}
