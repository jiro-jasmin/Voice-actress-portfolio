function Profile() {
    return (
        <>
            <div className="profile-card">
                <img className="profile-card__image" src="https://placekitten.com/500/500" alt="..." />
                <div className="profile-card__description">
                    <h1 className="profile-card__description__title">
                        Aileen Wrozyna arbeitet als Sprecherin, Moderatorin,
                        Journalistin und Sprecherzieherin. .....?
                    </h1>
                    <p className="profile-card__description__text">This is real, this is me<br />
                        I'm exactly where I'm supposed To be now<br />
                        Gonna let the light shine on me <br />
                        Now I've found who I am <br />
                        There's no way to hold it in <br />
                        No more hiding who <br />
                        I wanna be This is me Do you know what it's like <br />
                        To feel so in the dark To dream about a life <br />
                        Where you're the shining star Even though it seems <br />
                        Like it's too far away
                    </p>
                    <h2 className="profile-card__description__title-second">
                        Aileen Wrozyna arbeitet als Sprecherin, Moderatorin,
                        Journalistin und Sprecherzieherin. .....?
                    </h2>
                    <ul className="profile-card__description__list">
                        <li className="profile-card__description__list__item">Ein</li>
                        <li className="profile-card__description__list__item">Zwei</li>
                        <li className="profile-card__description__list__item">Drei</li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Profile;