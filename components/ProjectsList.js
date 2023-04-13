import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function ProjectsList({ projects }) {
  const audios = [
    ...projects.map(
      (project) =>
        project.attributes.audio.data &&
        `${process.env.NEXT_PUBLIC_STRAPI_URL}${project.attributes.audio.data.attributes.url}`
    ),
  ];

  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeAudio, setActiveAudio] = useState(null);
  const [activeEmbedded, setActiveEmbedded] = useState(null);

  const handleClick = (index) => {
    setActiveEmbedded(null);
    // If the project is an audio file
    if (audios[index] !== null) {
      if (index === activeIndex && activeAudio) {
        activeAudio.pause();
        setActiveAudio(null);
        setActiveIndex(-1);
      } else {
        const newAudio = new Audio(audios[index]);
        if (activeAudio) {
          activeAudio.pause();
        }
        newAudio.play().catch((e)=>{
          // this error sometimes happens when fetching the audio but gets quickly resolved
          console.log("Error while playing the new audio");
       })
       
        setActiveAudio(newAudio);
        setActiveIndex(index);
        newAudio.ontimeupdate = (e) => handleTimeUpdate(newAudio, activeIndex);
      }
    }
    // If the project is an embedded content (e.g Youtube, Spotify...)
    else {
      if (index === activeIndex) {
        setActiveIndex(-1);
        setActiveEmbedded(null);
      } else {
        setActiveIndex(index);
        if (activeAudio) {
          activeAudio.pause();
          setActiveAudio(null);
        }
        // embedded content plays here
        setActiveEmbedded(index);
      }
    }
  };

  const handleCloseClick = () => {
    setActiveEmbedded(null);
  };

  useEffect(() => {
    if (activeEmbedded) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [activeEmbedded]);

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
                      <div>Abspielen</div>
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
              <React.Fragment key={project.attributes.title + index}>
                <li
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
                          alt=""
                        />
                      ) : (
                        <Image
                          className="card-list__item__inner__front__cover"
                          src="/work-placeholder.png"
                          width={200}
                          height={200}
                          alt=""
                        />
                      )}
                      <div className="card-list__item__inner__front__play">
                        <div className="button-play"></div>
                        <div>Abspielen</div>
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
                {index === activeEmbedded ? (
                  <div className="modal">
                    <button
                      onClick={handleClick}
                      type="button"
                      className="modal__close burger open"
                      title="Close"
                    >
                      <span className="burger__bun burger__bun__top"></span>
                      <span className="burger__bun burger__bun__bottom"></span>
                    </button>
                    {project.attributes.embedded && (
                      <>
                        <h2 className="modal__title">
                          {project.attributes.title}
                        </h2>
                        <section className="modal__description">
                          {project.attributes.description}
                        </section>
                        {project.attributes.embedded === "Youtube" && (
                          <iframe
                            className="modal__video"
                            src={`https://www.youtube.com/embed/${project.attributes.embeddedid}`}
                            title="YouTube video player"
                            allowFullScreen
                          ></iframe>
                        )}
                        {project.attributes.embedded === "SoundCloud" && (
                          <iframe
                            width="100%"
                            height="200"
                            allow="autoplay"
                            src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${project.attributes.embeddedid}&auto_play=true`}
                          ></iframe>
                        )}
                        {project.attributes.embedded === "Spotify" && (
                          <iframe
                            src={`https://open.spotify.com/embed/episode/${project.attributes.embeddedid}`}
                            width="100%"
                            height="352"
                            allow="autoplay"
                            loading="lazy"
                          ></iframe>
                        )}
                        {project.attributes.embedded === "ApplePodcasts" && (
                          <iframe
                            allow="autoplay"
                            height="200"
                            width="100%"
                            src={`https://embed.podcasts.apple.com/de/podcast/${project.attributes.embeddedid}`}
                          ></iframe>
                        )}
                      </>
                    )}
                    {!project.attributes.embedded && "No content yet"}
                  </div>
                ) : (
                  ""
                )}
              </React.Fragment>
            ))}
        </ul>
      )}
    </>
  );
}

export default ProjectsList;
