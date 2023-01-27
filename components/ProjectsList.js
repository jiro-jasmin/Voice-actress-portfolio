import { useState } from "react";
import Project from "./Project";

function ProjectsList({ projects }) {

    const [isActive, setActive] = useState(false);

    // const toggleClass = () => {
    //     setActive(!isActive);
    // };

    // let className = isActive ? ' card-list__item--active' : '';

    // const toggleClass = (e) => {
    //     setActive(!isActive);
    //     let classes = 'card-list__item';
    //     let els = document.getElementsByClassName('card-list__item--active');
    //     console.log(els);
    //     if (els) {
    //         while (els[0]) {
    //             els[0].classList.remove('card-list__item--active')
    //         }
    //     }
    //     e.target.className = classes.replace('card-list__item', 'card-list__item card-list__item--active');
    // }

    return (
        <ul className="card-list">
            {projects && projects.data.map((project, index) =>
                
                    // className={`card-list__item${stateCheck}`}
                    
                    <Project
                        project={project}
                        key={project.attributes.title + index}
                        // className='card-list__item'
                        // className={className}
                        // toggle={e => toggleClass}
                    />
               
            )}
        </ul>
    );
}

export default ProjectsList;