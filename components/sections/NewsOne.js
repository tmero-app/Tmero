import Link from 'next/link';
import React, { useState } from 'react';

const TRUNCATE_LEN = 35;

const NewsOne = () => {
  const data = [
    {
      id: 'blog-1',
      img: 'blog-1.webp',
      title: 'Bilingual Communication Between Parents and Children: Building Stronger Family Bonds.',
      comment: 10,
    },
    {
      id: 'blog-2',
      img: 'blog-2.webp',
      title: 'Bridging the Cultural Gap: Teaching Parents About Modern Child-Parenting in the U.S.',
      comment: 10,
    },
    {
      id: 'blog-3',
      img: 'blog-3.webp',
      title: 'More Than Words: The Emotional Bond Built When Children Speak Their Parents’ Language.',
      comment: 10,
    },
    {
      id: 'blog-4',
      img: 'blog-4.webp',
      title: 'Parenting in the U.S. vs. Back Home: Learning Through Culturally Aware Education.',
      comment: 10,
    },
    {
      id: 'blog-5',
      img: 'blog-5.png',
      title: 'Rooted in two worlds: Strengthening family ties through cultural parenting.',
      comment: 10,
    },
  ];

  return (
    <section className="news-section">
      <div className="auto-container">
        <div className="sec-title text-center">
          <span className="sub-title">directly from blog</span>
          <h2>
            Our latest news &amp;<br /> upcoming blog posts
          </h2>
        </div>
        <div className="row">
          {data.map(item => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Card = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = item.title.length > TRUNCATE_LEN;
  const displayedTitle = expanded || !isLong
    ? item.title
    : item.title.slice(0, TRUNCATE_LEN) + '…';

  return (
    <div className="news-block custom-col-5 wow fadeInUp">
      <div className="inner-box">
        <div className="image-box">
          <figure className="image">
            <Link href={{ pathname: '/news-details', query: { id: item.id } }}>
              <img src={`images/resource/${item.img}`} title="Tmero" />
            </Link>
          </figure>
        </div>

        <div className="content-box">
          <div className="content">
            <ul className="post-info">
              <li>
                <i className="fa fa-user" /> by Admin
              </li>
              <li>
                <i className="fa fa-comments" /> {item.comment} Comments
              </li>
            </ul>

            <h4 className="title">
              <Link href={{ pathname: '/news-details', query: { id: item.id } }}>
                {displayedTitle}
              </Link>
              {isLong && (
                <button
                  className="truncate-toggle"
                  onClick={() => setExpanded(prev => !prev)}
                >
                  {expanded ? ' show less' : ' see more'}
                </button>
              )}
            </h4>

            <Link
              href={{ pathname: '/news-details', query: { id: item.id } }}
              className="read-more"
            >
              Read More <i className="fa fa-long-arrow-alt-right" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsOne;


