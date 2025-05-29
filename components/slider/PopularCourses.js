import Link from 'next/link';
import React from 'react';
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";


SwiperCore.use([Autoplay, Navigation]);
const PopularCourses = () => {

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
            <Swiper
                slidesPerView={4}
                spaceBetween={0}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false
                }}
                navigation={{
                    prevEl: ".owl-prev-course-1",
                    nextEl: ".owl-next-course-1",
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        // spaceBetween: 30,
                    },
                    575: {
                        slidesPerView: 1,
                        // spaceBetween: 30,
                    },
                    767: {
                        slidesPerView: 1,
                        // spaceBetween: 30,
                    },
                    991: {
                        slidesPerView: 2,
                        // spaceBetween: 30,
                    },
                    1199: {
                        slidesPerView: 3,
                        // spaceBetween: 30,
                    },
                    1350: {
                        slidesPerView: 4,
                        // spaceBetween: 30,
                    },
                }}
                className=""
            >
                {data.map((item, i) => (
                    <SwiperSlide>
                        <div className="course-block">
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
                    </SwiperSlide>
                ))}
            </Swiper>

            <div class="owl-nav">
                <div class="owl-prev owl-prev-course-1">
                    <span class="fa fa-long-arrow-alt-left"></span>
                </div>
                <div class="owl-next owl-next-course-1">
                    <span class="fa fa-long-arrow-alt-right"></span>
                </div>
            </div>

        </>
    );
};

export default PopularCourses;

