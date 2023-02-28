import { useEffect, useRef, useState } from "react";
// import Project from "./Project";

function ProjectsList({ projects }) {

    const audios = [...projects.data.map((project) => `${process.env.NEXT_PUBLIC_STRAPI_URL}${project.attributes.audio.data.attributes.url}`)];

    const [activeIndex, setActiveIndex] = useState(-1);
    const [activeAudio, setActiveAudio] = useState(null);

    // const [timeSongInfo, setTimeSongInfo] = useState({
    //     currentTime: 0,
    //     duration: 0
    // });

    const handleClick = (index) => {
        if (index === activeIndex) {
            activeAudio.pause();
            setActiveAudio(null);
            setActiveIndex(-1);
        } else {
            const newAudio = new Audio(audios[index]);
            if (activeAudio) {
                activeAudio.pause();
            }
            newAudio.play();
            setActiveAudio(newAudio);
            setActiveIndex(index);
        }
    };

    // const handleTimeUpdate = (audio, index) => {
    //     const current = audio.currentTime;
    //     let duration = 0;
    //     if(audio.e.target).loadedmetadata {
    //         duration = audio.duration;
    //     }

    //     if (current === duration) {
    //         handleClick(index);
    //     } else {
    //         let timeSongInfo = {
    //             currentTime: current,
    //             duration: duration
    //         }
    //         setTimeSongInfo(timeSongInfo);
    //     }
    //     return timeSongInfo;
    // }

 




    return (
        <ul className="card-list">
            {projects && projects.data.map((project, index) =>

                <li
                    key={project.attributes.title + index}
                    className={`card-list__item${index === activeIndex ? ' card-list__item--active' : ''}`}
                    onClick={() => handleClick(index)}
                >
                    <img className="card-list__item__cover" src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${project.attributes.imagecover.data.attributes.url}`} />
                    <div className="card-list__item__title">
                        {project.attributes.title}
                    </div>
                    <div className="card-list__item__description">
                        {project.attributes.description}
                    </div>

                    {/* {project.attributes.audio.data &&
                        <audio
                            ref={audioRef}
                            src={`http://localhost:1337${project.attributes.audio.data.attributes.url}`}
                            className="card-list__item__audio-player"
                            controls
                        />
                    } */}
                </li>
            )}
        </ul>

    );
}

export default ProjectsList;