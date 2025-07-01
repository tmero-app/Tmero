import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Autoplay, Navigation]);

const PopularCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('https://api.tmero.com/course');
                if (!response.ok) {
                    throw new Error('Failed to fetch courses');
                }
                const result = await response.json();
                
                const transformedCourses = result.data.map(course => ({
                    id: course.id,
                    img: `https://api.tmero.com/static/images/${course.imageUrl}`,
                    title: course.description,
                    newPrice: parseFloat(course.price),
                    oldPrice: parseFloat(course.price) + 50, // new price calculation
                    lesson: 19, 
                }));
                
                setCourses(transformedCourses);
            } catch (err) {
                console.error('Error fetching courses:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return (
            <div className="courses-section">
                <div className="auto-container">
                    <div className="text-center">
                        <p>Loading courses...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="courses-section">
                <div className="auto-container">
                    <div className="text-center">
                        <p>Error loading courses: {error}</p>
                    </div>
                </div>
            </div>
        );
    }

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
                {courses.map((item, i) => (
                    <SwiperSlide key={item.id}>
                        <div className="course-block">
                            <div className="inner-box">
                                <div className="image-box">
                                    <figure className="image">
                                        <Link href="/page-course-details">
                                            <img src={item.img} title="Tmero" alt={item.title} />
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

            <div className="owl-nav">
                <div className="owl-prev owl-prev-course-1">
                    <span className="fa fa-long-arrow-alt-left"></span>
                </div>
                <div className="owl-next owl-next-course-1">
                    <span className="fa fa-long-arrow-alt-right"></span>
                </div>
            </div>
        </>
    );
};

export default PopularCourses;

