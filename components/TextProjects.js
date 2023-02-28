import { useEffect, useRef, useState } from "react";


function TextProjects({ projects }) {

    const [activeIndex, setActiveIndex] = useState(-1);
    const [activeAudio, setActiveAudio] = useState(null);

    const handleClick = (index) => {
        if (index === activeIndex) {

            setActiveAudio(null);
            setActiveIndex(-1);
        } else {
            setActiveIndex(index);
        }
    };



    return (
        <ul className="card-list">
            {projects && projects.data.map((project, index) =>

                <li
                    key={project.attributes.title + index}
                    className={`text card-list__item${index === activeIndex ? ' card-list__item--active' : ''}`}
                    onClick={() => handleClick(index)}
                >
                    <img className="card-list__item__cover" src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${project.attributes.imagecover.data.attributes.url}`} />
                    <div className="card-list__item__title">
                        {project.attributes.title}
                    </div>
                    <div className="card-list__item__description">
                        {project.attributes.description}
                    </div>

                </li>
            )}
        </ul>

    );
}

export default TextProjects;