import { useState } from "react";

function Project({ project }) {


    const [isActive, setActive] = useState(false);

    const toggleClass = () => {
        // let els = [...document.getElementsByClassName('card-list__item--active')];
        // console.log(els);
        // if (els.length > 0) {
        //     for(let i = 0 ; i < els.length; i++) {
        //         els[i].classList.remove('card-list__item--active')
        //     }
        // }    
        setActive(!isActive);
    }



    return (<>
        <li
            className={`card-list__item${isActive ? ' card-list__item--active' : ''}`}
            onClick={toggleClass}
        // className={`card-list__item${className}`}
        // onClick={toggle}
        >
            <img className="card-list__item__cover" src={`http://localhost:1337${project.attributes.imagecover.data.attributes.url}`} />
            <div className="card-list__item__title">
                {project.attributes.title}
            </div>
            <div className="card-list__item__description">
                {project.attributes.description}
            </div>
        </li>
    </>);
}

export default Project;