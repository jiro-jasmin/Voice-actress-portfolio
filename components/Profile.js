import MarkdownIt from "markdown-it";

function Profile({ content }) {
  const md = new MarkdownIt();
  const htmlContent = md.render(content.content);

  return (
    <>
      <div className="profile-card">
        <img
          className="profile-card__image"
          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${content.picture.data.attributes.url}`}
          alt="Photo of Aileen"
        />
        <div className="profile-card__description">
          {content.title && (
            <h1 className="profile-card__description__title">
              {content.title}
            </h1>
          )}
          {content.content && (
            <section
              className="profile-card__description__text article"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            ></section>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
