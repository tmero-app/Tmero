import Link from 'next/link';
import React from 'react';

const BlogOne = ({ blogData }) => {

    const { title, description, videoUrl, comments, tags } = blogData || {
        title: "Amharic Testimonials: Reconnecting Through Language",
      description: "Heartfelt testimonials from families who rediscovered their bonds by speaking Amharic together—powered by Tmero.",
      videoUrl: "https://www.youtube.com/embed/cU8ZcWKuOHo", 
      comments: [
        { 
          name: "Alemu Desta (Father of 2)", 
          text: "We started speaking Amharic during dinner. Tmero helped us reconnect not just with the language, but with each other." 
        },
        { 
          name: "Selamawit Taye (Mom from DMV)", 
          text: "My daughter now surprises me with phrases in Amharic. It's like watching a piece of our home come alive in her." 
        }
      ],
      tags: ["Amharic"]
    };
    return (
        <>
            <section className="blog-details">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-7">
                            <div className="blog-details__left">
                                <div className="blog-details__img">
                                     <div className="video-frame-wrapper">
                                        <iframe
                                            width="100%"
                                            height="500"
                                            src={videoUrl}
                                            title="Tmero Video"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                    {/* <div className="blog-details__date">
                                        <span className="day">28</span>
                                        <span className="month">Aug</span>
                                    </div> */}
                                </div>
                                <div className="blog-details__content">
                                    <ul className="list-unstyled blog-details__meta">
                                        <li><Link href="#"><i className="fas fa-user-circle"></i> Admin</Link> </li>
                                        <li><Link href="#"><i className="fas fa-comments"></i> 200 Comments</Link>
                                        </li>
                                    </ul>
                                    <h3 className="blog-details__title font-weight-600">{title}</h3>
                                    <p className="blog-details__text-2">{description}</p>
                                </div>
                                <div className="blog-details__bottom">
                                    <p className="blog-details__tags"> <span>Tags</span> {tags.map((tag, index) => (
                                        <Link href="#" key={index}>{tag}</Link>
                                    ))} </p>
                                    <div className="blog-details__social-list">
                                      <a
                                        href="https://www.facebook.com/profile.php?id=61570942204502"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <i className="fab fa-facebook" />
                                      </a>
                                      <a
                                        href="https://www.instagram.com/tmeroedu/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <i className="fab fa-instagram" />
                                      </a>
                                      <a
                                        href="https://wa.me/+12067596659"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <i className="fab fa-whatsapp" />
                                      </a>
                                      <a
                                        href="https://www.tiktok.com/@tmero.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <img
                                          src="/images/icons/tiktok2.svg"
                                          alt="TikTok"
                                          style={{ width: '19px', height: '19px' }}
                                        />
                                      </a>
                                      <a
                                        href="https://t.me/tmeroedu"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <i className="fab fa-telegram" />
                                      </a>
                                    </div>
                                </div>
                                <div className="nav-links">
                                    <div className="prev">
                                        <Link href="#" rel="prev">Building Bridges Through Language and Understanding</Link>
                                    </div>
                                    <div className="next">
                                        <Link href="#" rel="next">Discover the Joy of Culturally Rich Language Learning</Link>
                                    </div>
                                </div>
                                <div className="comment-one">
                                    <h3 className="comment-one__title">200 Comments</h3>
                                    {comments.map((comment, index) => (
                                    <div className="comment-one__single" key={index}>
                                        <div className="comment-one__content">
                                            <h3>{comment.name}</h3>
                                            <p className="blog-details__text-2">{comment.text}</p>
                                            {/* <Link href="#" className="theme-btn btn-style-one comment-one__btn"><span className="btn-title">Reply</span></Link> */}
                                        </div>
                                    </div>
                                    ))}
                                </div>
                                <div className="text-center mt-5">
                                <Link 
                                    href="https://docs.google.com/forms/d/e/1FAIpQLSfYw4pgvmdYKoptMakdjOcVbbOIfrrWiUwvJ8n3CF_BMgV8fg/viewform?usp=sharing" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="theme-btn btn-style-one"
                                >
                                    <span className="btn-title">Fill Out Our Form</span>
                                  </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-5">
                            <div className="sidebar">
                                <div className="sidebar__single sidebar__search">
                                    <form className="sidebar__search-form" action="#">
                                        <input type="search" placeholder="Search Tmero's Blog" />
                                        <button type="submit"><i className="lnr-icon-search"></i></button>
                                    </form>
                                </div>
                                <div className="sidebar__single sidebar__post">
                                    <h3 className="sidebar__title">Latest Posts</h3>
                                    <ul className="sidebar__post-list list-unstyled">
                                        <li>
                                            {/* <div className="sidebar__post-image"> <img src="/images/resource/news-1.jpg" title='Tmero' /> </div> */}
                                            <div className="sidebar__post-content">
                                                <h3> <span className="sidebar__post-content-meta"><i
                                                    className="fas fa-user-circle"></i>Admin</span> <Link href="#">5 Essential Tips for Mastering Afaan Oromo</Link>
                                                </h3>
                                            </div>
                                        </li>
                                        <li>
                                            {/* <div className="sidebar__post-image"> <img src="/images/resource/news-2.jpg" title='Tmero' /> </div> */}
                                            <div className="sidebar__post-content">
                                                <h3> <span className="sidebar__post-content-meta"><i
                                                    className="fas fa-user-circle"></i>Admin</span> <Link href="#">Why Learning Amharic Is a Game-Changer for Your Career</Link> </h3>
                                            </div>
                                        </li>
                                        <li>
                                            {/* <div className="sidebar__post-image"> <img src="/images/resource/news-3.jpg" title='Tmero' /> </div> */}
                                            <div className="sidebar__post-content">
                                                <h3> <span className="sidebar__post-content-meta"><i
                                                    className="fas fa-user-circle"></i>Admin</span> <Link href="#">Interactive Somali Lessons: Learn Faster, Retain More</Link> </h3>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="sidebar__single sidebar__category">
                                    <h3 className="sidebar__title">Categories</h3>
                                    <ul className="sidebar__category-list list-unstyled">
                                        <li className="active"><Link href="#">Language Learning Strategies<span
                                            className="icon-right-arrow"></span></Link> </li>
                                        <li><Link href="#">Online Courses<span
                                            className="icon-right-arrow"></span></Link></li>
                                        <li><Link href="#">Grammar Essentials<span
                                            className="icon-right-arrow"></span></Link> </li>
                                        <li><Link href="#">Cultural Education<span
                                            className="icon-right-arrow"></span></Link> </li>
                                        <li><Link href="#">Interactive Learning Techniques<span
                                            className="icon-right-arrow"></span></Link> </li>
                                    </ul>
                                </div>
                                <div className="sidebar__single sidebar__tags">
                                    <h3 className="sidebar__title">Tags</h3>
                                    <div className="sidebar__tags-list"> <Link href="#">Amharic Basics</Link> <Link href="#">Afaan Oromo Vocabulary</Link> <Link href="#">Somali Conversation Skills</Link> <Link href="#">Interactive Education</Link> <Link href="#">Tigrigna Phrases</Link> <Link href="#">Cultural Insights</Link> <Link href="#">Character build</Link> </div>
                                </div>
                                <div className="sidebar__single sidebar__comments">
                                    <h3 className="sidebar__title">Recent Comments</h3>
                                    <ul className="sidebar__comments-list list-unstyled">
                                    {blogData.comments.slice(0, 2).map((c, i) => (
                                      <li key={i}>
                                        <div className="sidebar__comments-icon">
                                          <i className="fas fa-comments" />
                                        </div>
                                        <div className="sidebar__comments-text-box">
                                          <p>
                                          <span>{c.name.split(' (')[0]}</span> on
                                          </p>
                                          <h5>comments</h5>
                                        </div>
                                      </li>
                                    ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BlogOne;