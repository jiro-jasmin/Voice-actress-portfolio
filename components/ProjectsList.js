import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function ProjectsList({ projects }) {
  const audios = [
    ...projects.map(
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
    if (audio) {
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
    <>
      {router.asPath === "/bestof" ? (
        <ul className="preview-list">
          {projects &&
            projects.map((project, index) => (
              <li
                key={project.attributes.title + index}
                className={`preview-list__item 
            ${index === activeIndex ? " preview-list__item--active" : ""}`}
                onClick={() => handleClick(index)}
              >
                <div className="preview-list__item__inner">
                  <h2 className="preview-list__item__inner__title">
                    {project.attributes.title}
                  </h2>
                  {project.attributes.subtitle && (
                    <h3 className="preview-list__item__inner__subtitle">
                      {project.attributes.subtitle}
                    </h3>
                  )}
                  <span className="preview-list__item__inner__line"></span>
                  <div className="preview-list__item__inner__controls">
                    {index === activeIndex ? (
                      <div className="button-pause"></div>
                    ) : (
                      <div className="button-play"></div>
                    )}
                    {index === activeIndex ? (
                      <div className="duration">
                        -{" "}
                        {getTime(
                          timeSongInfo.duration - timeSongInfo.currentTime
                        )}
                      </div>
                    ) : (
                      <div>Bespielen</div>
                    )}
                  </div>
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <ul className="card-list">
          {projects &&
            projects.map((project, index) => (
              <li
                key={project.attributes.title + index}
                className={`card-list__item 
            ${index === activeIndex ? " card-list__item--active" : ""}`}
                onClick={() => handleClick(index)}
              >
                <div className="card-list__item__inner">
                  <div className="card-list__item__inner__front">
                    {project.attributes.imagecover.data ? (
                      <img
                        className="card-list__item__inner__front__cover"
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${project.attributes.imagecover.data.attributes.url}`}
                      />
                    ) : (
                      <div className="card-list__item__inner__back__description">
                        {project.attributes.title}
                      </div>
                    )}
                    <div className="card-list__item__inner__front__play">
                      <div className="button-play"></div>
                      <div>Bespielen</div>
                    </div>
                  </div>
                  <div className="card-list__item__inner__back">
                    <div className="card-list__item__inner__back__title">
                      {project.attributes.title}
                    </div>

                    <div className="card-list__item__inner__back__description">
                      {project.attributes.description}
                    </div>

                    <div className="card-list__item__inner__back__pause">
                      <div className="button-pause"></div>
                      {index === activeIndex ? (
                        <div className="duration">
                          -{" "}
                          {getTime(
                            timeSongInfo.duration - timeSongInfo.currentTime
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      )}
    </>
  );
}

export default ProjectsList;
