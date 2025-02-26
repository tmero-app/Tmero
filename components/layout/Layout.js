import { useEffect, useState } from 'react';
import BackToTop from '../elements/BackToTop';
import Footer from './Footer';
import Header1 from './Header1';
import PageHead from './PageHead';

const Layout = ({ children, HeaderStyle }) => {
    const [searchToggle, setSearchToggled] = useState(false);
    const [scroll, setScroll] = useState(0);

    const handleToggle = () => setSearchToggled(!searchToggle);

    useEffect(() => {
        const handleScroll = () => {
            const scrollCheck = window.scrollY > 100;
            if (scrollCheck !== scroll) {
                setScroll(scrollCheck);
            }
        };

        document.addEventListener("scroll", handleScroll);
        return () => document.removeEventListener("scroll", handleScroll);
    }, [scroll]);

    const handleOpen = () => {
        document.body.classList.add("mobile-menu-visible");
    };

    const handleRemove = () => {
        document.body.classList.remove("mobile-menu-visible");
    };

    useEffect(() => {
        // import('wowjs').then((WOW) => {
        //     const wowInstance = new WOW.WOW({ live: false });
        //     wowInstance.init();
        // });
    }, []);

    return (
        <>
            <PageHead />
            <div className="page-wrapper" id="top">
                {!HeaderStyle && <Header1 handleOpen={handleOpen} handleRemove={handleRemove} searchToggle={searchToggle} handleToggle={handleToggle} scroll={scroll} />}
                {HeaderStyle === "one" && <Header1 handleOpen={handleOpen} handleRemove={handleRemove} searchToggle={searchToggle} handleToggle={handleToggle} scroll={scroll} />}
                
                {children}

                <Footer />
            </div>
            
            <BackToTop />
        </>
    );
};

export default Layout;
