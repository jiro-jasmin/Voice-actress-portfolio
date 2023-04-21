import axios from "axios";
import ProjectsList from "../components/ProjectsList";
import { useState } from "react";
import Footer from "../components/Footer";
import Head from "next/head";

function Portfolio({ projects, footer }) {
  let [filtered, setFiltered] = useState(projects.data);
  let [currentFilter, setCurrentFilter] = useState(null);

  console.log(footer.data[0]);

  const filters = [
    "Hörbuch",
    "Werbung",
    "Podcast",
    "Voice Over",
    "Imagefilm",
    "Synchron",
  ];

  const handleFilter = (filter) => {
    setFiltered(
      projects.data.filter((el) => el.attributes.category === filter)
    );
    setCurrentFilter(filter);
  };

  const removeFilter = () => {
    setFiltered(projects.data);
    setCurrentFilter(null);
  };

  return (
    <>
      <Head>
        <title>
          Portfolio | Aileen Wrozyna, Sprecherin, Moderatorin & Voice Actress
        </title>
      </Head>
      <main className="main">
        <div className="wrapper">
          <ul className="filters-list">
            Kategorien:
            <li
              className={`filters-list__item${
                filtered === projects.data ? " filters-list__item--active" : ""
              }`}
              onClick={removeFilter}
            >
              Alles
            </li>
            {filters.map((filter, index) => (
              <li
                className={`filters-list__item${
                  currentFilter === filter ? " filters-list__item--active" : ""
                }`}
                onClick={() => handleFilter(filter)}
                key={index + filter}
              >
                {filter}
              </li>
            ))}
          </ul>
          <ProjectsList projects={filtered} />
        </div>
        <Footer text={footer.data[0].attributes.portfolio} />
      </main>
    </>
  );
}

export default Portfolio;

export async function getServerSideProps() {
  const projects = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/audio-projects?populate=*&sort=date:desc`
  );

  const footer = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/footers`
  );

  return {
    props: {
      projects: projects.data,
      footer: footer.data,
    },
  };
}
