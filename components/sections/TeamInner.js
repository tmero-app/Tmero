import React from 'react';

const TeamOne = () => {
    const data = [
        {
            img: "team-1.jpg",
            title: "Kalikadan Maru",
            desig: "Amharic",
            university: "University of Washington"
        },
        {
            img: "team-2.jpg",
            title: "Khadija Hussein",
            desig: "Somali",
            university: "University of Washington"
        },
        {
            img: "team-3.jpg",
            title: "Seena Mohammed",
            desig: "Afaan Oromo",
            university: "Seattle University"
        },
        {
            img: "team-4.jpg",
            title: "Adolina Tewolde",
            desig: "Tigrigna",
            university: "Washington State University"
        }
    ];
    return (
        <>
            <section className="team-section">
                <div className="auto-container">
                    <div className="row">
                        {data.map((item, i) => (
                            <div className="team-block col-xl-3 col-lg-6 col-md-6 col-sm-12 wow fadeInUp">
                                <div className="inner-box">
                                    <div className="image-box">
                                        <figure className="image"><a href="/page-team-details"><img src={`images/resource/${item.img}`} title="Tmero" /></a></figure>
                                        <span className="share-icon fa fa-share-alt" />
                                        <div className="social-links">
                                            <a href="#"><i className="fab fa-twitter" /></a>
                                            <a href="#"><i className="fab fa-facebook-f" /></a>
                                            <a href="#"><i className="fab fa-pinterest-p" /></a>
                                            <a href="#"><i className="fab fa-instagram" /></a>
                                        </div>
                                    </div>
                                    <div className="info-box">
                                        <h4 className="name"><a href="#">{item.title}</a></h4>
                                        <span className="designation">{item.desig}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default TeamOne;