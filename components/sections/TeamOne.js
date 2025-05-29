import React from 'react';

const TeamOne = () => {
    const data = [
        {
            img: "rediet.webp",
            title: "Rediet Girma",
            desig: "Amharic",
            university: "University of Washington"
        },
        {
            img: "sitra.webp",
            title: "Sithra Mahamed",
            desig: "Somali",
            university: "University of Washington"
        },
        {
            img: "mahfa.webp",
            title: "Mahfa Jafar",
            desig: "Afaan Oromo",
            university: "Seattle University"
        },
        {
            img: "mary.webp",
            title: "Mary Kesete",
            desig: "Tigrigna",
            university: "Washington State University"
        },
        {
            img: "mauriane.png",
            title: "Mauriane Banza",
            desig: "Swahili",
            university: "Washington State University"
        }        
    ];
    return (
        <>
            <section className="team-section">
                <div className="auto-container">
                    <div className="sec-title text-center">
                        <span className="sub-title">qualified teachers</span>
                        <h2>Meet the teacher who <br />teaches you online</h2>
                    </div>
                    <div className="row">
                        {data.map((item, i) => (
                            <div className="team-block col-6 col-sm-4 col-md-3 col-lg-2-4 wow fadeInUp">
                                <div className="inner-box">
                                    <div className="image-box">
                                        <figure className="image"><img src={`images/resource/${item.img}`} title="Tmero" /></figure>
                                        <span className="share-icon fa fa-share-alt" />
                                        <div className="social-links">
                                            <a href="https://wa.me/+12067596659" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp" /></a>
                                            <a href="https://www.facebook.com/profile.php?id=61570942204502" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook" /></a>
                                            <a href="https://t.me/tmeroedu" target="_blank" rel="noopener noreferrer"><i className="fab fa-telegram" /></a>
                                            <a href="https://www.instagram.com/tmeroedu/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram" /></a>
                                        </div>
                                    </div>
                                    <div className="info-box">
                                        <h4 className="name">{item.title}</h4>
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