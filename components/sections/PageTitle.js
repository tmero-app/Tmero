import Link from 'next/link';
import React from 'react';

const PageTitle = (props) => {
  const getBackgroundImage = () => {
    const pageImages = {
      FAQ: 'url(images/background/Faq.png)',
      Contact: 'url(images/background/contact.png)',
      Courses: 'url(images/background/courses.png)',
    };
    return pageImages[props.pageName] || pageImages.Contact;
  };

  return (
    <section
      className="page-title"
      style={{ backgroundImage: getBackgroundImage() }}
    >
      <div className="auto-container">
        <div className="title-outer">
          <h1 className="title">{props.pageName}</h1>
          <ul className="page-breadcrumb">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/">Pages</Link>
            </li>
            <li>{props.pageName}</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PageTitle;