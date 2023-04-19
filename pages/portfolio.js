import axios from "axios";
import ProjectsList from "../components/ProjectsList";
import useSWR from "swr";
import { useEffect, useState } from "react";

function Portfolio({ projects }) {
  let [filtered, setFiltered] = useState(projects.data);
  let [currentFilter, setCurrentFilter] = useState(null);

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
      <div className="wrapper">
        <ul className="filters-list">
          Filters:
          <li
            className={`filters-list__item${
              filtered === projects.data ? " filters-list__item--active" : ""
            }`}
            onClick={removeFilter}
          >
            All
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
        {/* { */}
        <ProjectsList projects={filtered} />
      </div>
    </>
  );
}

export default Portfolio;

export async function getServerSideProps() {
  const projects = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/audio-projects?populate=*&sort=date:desc`
  );

  return {
    props: {
      projects: projects.data,
    },
  };
}
