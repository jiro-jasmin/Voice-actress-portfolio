import { useRouter } from "next/router";
import { useState } from "react";

function ProjectsList({ projects }) {
  const audios = [
    ...projects.data.map(
      (project) =>
        `${process.env.NEXT_PUBLIC_STRAPI_URL}${project.attributes.audio.data.attributes.url}`
    ),
  ];

  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeAudio, setActiveAudio] = useState(null);

  const handleClick = (index) => {
    if (index === activeIndex && activeAudio) {
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
      newAudio.ontimeupdate = (e) => handleTimeUpdate(newAudio, activeIndex);
    }
  };

  const router = useRouter();

  const [timeSongInfo, setTimeSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  const handleTimeUpdate = (audio, index) => {
    const current = audio.currentTime;
    let duration = 0;
    if (audio.e && audio.e.target) {
      duration = audio.duration;
    }

    if (current === duration) {
      handleClick(index);
    } else {
      let timeSongInfo = {
        currentTime: current,
        duration: duration,
      };
      setTimeSongInfo(timeSongInfo);
    }
    return timeSongInfo;
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  return (
    <ul
      className={`
    ${router.asPath !== "/bestof" ? "card-list" : "card-list-best"}
    `}
    >
      {projects &&
        projects.data.map((project, index) => (
          <li
            key={project.attributes.title + index}
            className={`
            ${
              router.asPath !== "/bestof"
                ? "card-list__item"
                : "card-list__item-best"
            }
            ${index === activeIndex ? " card-list__item--active" : ""}`}
            onClick={() => handleClick(index)}
          >
            <div className="card-list__item__inner">
              <div className="card-list__item__inner__front">
                {router.asPath !== "/bestof" ? (
                  project.attributes.imagecover.data && (
                    <img
                      className="card-list__item__inner__front__cover"
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${project.attributes.imagecover.data.attributes.url}`}
                    />
                  )
                ) : (
                  <div className="card-list__item__inner__back__description">
                    {project.attributes.title}
                  </div>
                )}
                <div className="card-list__item__inner__front__play">
                  <span className="play-button"></span>
                  {getTime(timeSongInfo.duration)}
                </div>
              </div>
              <div className="card-list__item__inner__back">
                <div className="card-list__item__inner__back__title">
                  {project.attributes.title}
                </div>
                {router.asPath !== "/bestof" && (
                  <div className="card-list__item__inner__back__description">
                    {project.attributes.description}
                  </div>
                )}
                <div className="card-list__item__inner__back__pause">
                  <span className="pause-button"></span>
                  {getTime(timeSongInfo.currentTime)}
                </div>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
}

export default ProjectsList;
