import Link from 'next/link';
import React from 'react';

const CourseTwo = () => {
    const data = [
        {
            img: "somali-session.webp",
            title: "Learn Somali Easily from Your Own Home",
            price: 49.00,
            lesson: 8,
            students: 16,
        },
        {
            img: "amharic-session.webp",
            title: "Learn Amharic Easily from Your Own Home",
            price: 49.00,
            lesson: 8,
            students: 16,
        },
        {
            img: "afaan-oromo-session.webp",
            title: "Learn Afaan Oromo Easily from Your Own Home",
            price: 49.00,
            lesson: 8,
            students: 16,
        },
        {
            img: "tigrigna-session.webp",
            title: "Learn Tigrigna Easily from Your Own Home",
            price: 49.00,
            lesson: 8,
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
                                        <span className="price">${item.price}</span>
                                        <div className="value">Advanced</div>
                                    </div>
                                    <div className="content-box">
                                        <ul className="course-info">
                                            <li><i className="fa fa-book" /> {item.lesson} Lessons</li>
                                            <li><i className="fa fa-users" /> {item.students} Students</li>
                                            <li><i className="fa fa-clock" /> 3 Weeks</li>
                                        </ul>
                                        <h5 className="title"><Link href="/page-course-details">{item.title}</Link></h5>
                                        <div className="other-info">
                                            <div className="rating-box">
                                                <span className="text">(4.9 /8 Rating)</span>
                                                <div className="rating"><span className="fa fa-star" /><span className="fa fa-star" /><span className="fa fa-star" /><span className="fa fa-star" /><span className="fa fa-star" /></div>
                                            </div>
                                            <div className="duration"><i className="fa fa-clock" /> 3 Weeks</div>
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