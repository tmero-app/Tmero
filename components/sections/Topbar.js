"use client";

import { useState, useEffect, useRef } from "react";
import { LogOut, ChevronDown, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../scss/Topbar.module.scss";

export function Topbar({ userName, userEmail }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  //get initials from user name
  const initials = userName
    .trim()
    .split(/\s+/)
    .map((name) => name[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleLogout = () => {
    //clear all authentication-related data
    localStorage.removeItem("token");
    localStorage.removeItem("registrationToken");
    localStorage.removeItem("signupData");
    
    //close the user menu
    setIsUserMenuOpen(false);
    
    //redirect to login page
    window.location.href = "/log-in";
  };

  const joinZoomClass = () => {
    window.open('https://zoom.us/j/your-meeting-id', '_blank');
  };

  //close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.topbar}>
      <div className={styles.topbarContainer}>
        {/*left side - Logo */}
        <div className={styles.topbarLeft}>
          <Link href="/" className={styles.brand}>
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={45}
              height={45}
              className={styles.logo}
              priority
            />
          </Link>
        </div>

        {/*right side - Theme toggle and User menu */}
        <div className={styles.topbarRight}>
          {/*Theme Toggle */}
          <div className={styles.themeToggleWrapper}>
          </div>

          {/*zoom Button */}
          <button
            className={styles.zoomButton}
            onClick={joinZoomClass}
          >
            <Video size={16} />
            <span>Join Online Class</span>
          </button>

          {/*user Menu */}
          <div className={styles.userMenu} ref={userMenuRef}>
            <button
              className={styles.userMenuTrigger}
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              aria-expanded={isUserMenuOpen}
              aria-haspopup="true"
            >
              <div className={styles.userProfile}>
                <div className={styles.avatar}>{initials}</div>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>{userName}</span>
                  <span className={styles.userEmail}>{userEmail}</span>
                </div>
              </div>
              <ChevronDown 
                className={`${styles.chevron} ${isUserMenuOpen ? styles.chevronOpen : ""}`} 
                size={16} 
              />
            </button>

            {/*dropdown menu */}
            {isUserMenuOpen && (
              <div className={styles.userDropdown}>
                <div className={styles.dropdownHeader}>
                  <div className={styles.avatarLarge}>{initials}</div>
                  <div className={styles.userDetails}>
                    <span className={styles.dropdownUserName}>{userName}</span>
                    <span className={styles.dropdownUserEmail}>{userEmail}</span>
                  </div>
                </div>
                <div className={styles.dropdownDivider}></div>
                <div className={styles.dropdownContent}>
                  <button 
                    className={`${styles.dropdownItem} ${styles.logoutItem}`} 
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
