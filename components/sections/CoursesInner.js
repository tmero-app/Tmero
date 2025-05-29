import Link from 'next/link';
import React from 'react';

const CourseTwo = () => {
    const data = [
        {
            img: "somali-session.webp",
            title: "Learn Somali Easily from Your Own Home",
            oldPrice: 447,
            newPrice: 397,
            lesson: 19,
            students: 16,
        },
        {
            img: "amharic-session.webp",
            title: "Learn Amharic Easily from Your Own Home",
            oldPrice: 447,
            newPrice: 397,
            lesson: 19,
            students: 16,
        },
        {
            img: "afaan-oromo-session.webp",
            title: "Learn Afaan Oromo Easily from Your Own Home",
            oldPrice: 447,
            newPrice: 397,
            lesson: 19,
            students: 16,
        },
        {
            img: "tigrigna-session.webp",
            title: "Learn Tigrigna Easily from Your Own Home",
            oldPrice: 447,
            newPrice: 397,
            lesson: 19,
            students: 16,
        },
        {
            img: "swahili-session.png",
            title: "Learn Swahili Easily from Your Own Home",
            oldPrice: 447,
            newPrice: 397,
            lesson: 19,
            students: 16,
        },
        //add more courses here
    ];
    return (
        <>
            <section className="courses-section">
                <div className="auto-container">
                    <div className="row">
                        {/* Course Block Two*/}
                        {data.map((item, i) => (
                            <div className="course-block-two col-lg-4 col-md-6 col-sm-12">
                                <div className="inner-box">
                                    <div className="image-box">
                                        <figure className="image">
                                            <Link href="/page-course-details">
                                                <img src={`/images/resource/${item.img}`} title="Tmero" />
                                            </Link>
                                        </figure>
                                        <span className="price" style={{ position: 'absolute', right: '0', top: '20px', height: 'auto', minWidth: '80px', background: 'var(--bg-theme-color5)', color: '#ffffff', fontSize: '14px', textAlign: 'center', borderRadius: '20px 0 0 20px', padding: '4px 8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                        {/* Old price */}
                                        <span style={{ textDecoration: 'line-through', fontSize: '12px', opacity: '0.8', marginBottom: '2px' }}>${item.oldPrice}</span>
                                        {/* New price */}
                                        <span style={{ fontWeight: 'bold', fontSize: '14px' }}>${item.newPrice}</span>
                                    </span>
                                        <div className="value">Advanced</div>
                                    </div>
                                    <div className="content-box">
                                        <ul className="course-info">
                                            <li><i className="fa fa-book" /> {item.lesson} Lessons</li>
                                            <li><i className="fa fa-users" /> Students</li>
                                            <li><i className="fa fa-clock" /> 19 Weeks</li>
                                        </ul>
                                        <h5 className="title"><Link href="/page-course-details">{item.title}</Link></h5>
                                        <div className="other-info">
                                            <div className="rating-box">
                                                <span className="text">(5 /5 Rating)</span>
                                                <div className="rating"><span className="fa fa-star" /><span className="fa fa-star" /><span className="fa fa-star" /><span className="fa fa-star" /><span className="fa fa-star" /></div>
                                            </div>
                                            <div className="duration"><i className="fa fa-clock" /> 19 Weeks</div>
                                        </div>
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

export default CourseTwo;