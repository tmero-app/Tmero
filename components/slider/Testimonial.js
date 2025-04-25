import React from 'react';
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Autoplay, Navigation]);
const Testimonial = () => {

    const data = [
        {
            img: "testi-thumb-1.jpg",
            title: "Ali Mohammed",
            lang: "Somali",
            testimonial: "Kooraskan wuxuu wax weyn ka beddelay carruurtayda. Waxay hadda awoodaan inay si kalsooni leh uga hadlaan afkoodii hooyo, taas oo naga caawisay inaan xiriir wanaagsan yeelanno oo ku xirnaanno dhaqankeenna."
        },
        {
            img: "testi-thumb-2.jpg",
            title: "ብርሃነ አበበ",
            lang: "Amharic",
            testimonial: "ይህ ኮርስ ልጆቼን በጣም አስገራሚ አደረገዋል። አሁን በቋንቋቸው በተሰማራ ሁኔታ መነጋገር እንደሚችሉ እና በባህላችን እንደሚገነኙ ማየት አደስቶኛል።"
        },
        {
            img: "testi-thumb-1.jpg",
            title: "Ayyaana Abdi",
            lang: "Afaan Oromo",
            testimonial: "Koorsoon kun ijoollee kiyyaaf faayidaa guddaa qaba. Ilmi keenya afaan isaa jalqabaa keessatti dandeettii guddaa argatee jira, kunis qunnamtii keenya cimaa taasiseera, akkasumas aadaa keenya waliin wal qunnamtii qaba."
        },
        {
            img: "testi-thumb-2.jpg",
            title: "ኣብርሃም ኣሰፋ",
            lang: "Tigrigna",
            testimonial: "እዚ ኮርስ ኣብ ናታት ህጻናትይ ሓበሬታ ታሪካዊ እዩ። እዚኦም ኣብቲ ቋንቋ ምምሃር ብተመኻኸርቲ ምንባብ ዝኸድ እንተሃበሮም።"
        }
    ];


    return (
        <>
            <Swiper
                slidesPerView={2}
                loop={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false
                }}
                navigation={{
                    prevEl: ".swiper-button-prev-style-3",
                    nextEl: ".swiper-button-next-style-3",
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                    },
                    575: {
                        slidesPerView: 1,
                    },
                    767: {
                        slidesPerView: 1,
                    },
                    991: {
                        slidesPerView: 2,
                    },
                    1199: {
                        slidesPerView: 2,
                    },
                    1350: {
                        slidesPerView: 2,
                    },
                }}
                className=""
            >
                {data.map((item, i) => (
                    <SwiperSlide className="testimonial-block">
                        <div className="inner-box">
                            <div className="content-box">
                                {/* <figure className="thumb"><img src={`images/resource/${item.img}`} title="Tmero" /></figure> */}
                                <div className="rating"><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /></div>
                                <div className="text">{item.testimonial}</div>
                                <div className="info-box">
                                    <span className="icon-quote" />
                                    <h4 className="name">{item.title}</h4>
                                    <span className="designation">{item.lang}</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default Testimonial;

