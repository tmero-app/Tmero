"use client";

import { useState, useEffect, useRef } from "react";
import { LogOut, ChevronDown, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../scss/Topbar.module.scss";

export function Topbar({ userName, userEmail }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userCourse, setUserCourse] = useState(null);
  const userMenuRef = useRef(null);

  //get initials from user name
  const initials = userName
    .trim()
    .split(/\s+/)
    .map((name) => name[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // fetch user's course information
  useEffect(() => {
    const fetchUserCourse = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('https://api.tmero.com/user/courses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        
        if (response.ok && data?.data?.length > 0) {
          setUserCourse(data.data[0]);
        }
      } catch (error) {
        console.error('Error fetching user course:', error);
      }
    };

    fetchUserCourse();
  }, []);

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
    if (!userCourse) {
      alert('Course information not available. Please refresh the page.');
      return;
    }

    const courseTitle = userCourse.title;
    let meetingUrl = '';

    switch (courseTitle) {
      case 'Amharic':
        meetingUrl = 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_MjM5OGI4OWYtN2FhYS00ZjdjLWI1M2QtNzk5ZmFkNDI1MzQ4%40thread.v2/0?context=%7b%22Tid%22%3a%22c0fdc250-ab8c-4f78-9399-cf0f4259ac02%22%2c%22Oid%22%3a%22440fc6dc-373c-44b9-acaf-690751f30700%22%7d';
        break;
      case 'Afaan Oromo':
        meetingUrl = 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_ZDEyODFlZjAtZGM1NC00YWVmLWEzNjEtMjY1OTA1ZTNmOTA5%40thread.v2/0?context=%7b%22Tid%22%3a%22c0fdc250-ab8c-4f78-9399-cf0f4259ac02%22%2c%22Oid%22%3a%22440fc6dc-373c-44b9-acaf-690751f30700%22%7d';
        break;
      case 'Somali':
        meetingUrl = 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_ZDJlMmE5YjQtZjRmZC00ZTkzLTk4YTUtZDRmYjNiYmRlNGQ1%40thread.v2/0?context=%7b%22Tid%22%3a%22c0fdc250-ab8c-4f78-9399-cf0f4259ac02%22%2c%22Oid%22%3a%22440fc6dc-373c-44b9-acaf-690751f30700%22%7d';
        break;
      case 'Tigrigna':
        meetingUrl = 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_ODNmMWMwODQtZTNhZC00YWRmLThiYzUtMjExMDg4OTk4NGI0%40thread.v2/0?context=%7b%22Tid%22%3a%22c0fdc250-ab8c-4f78-9399-cf0f4259ac02%22%2c%22Oid%22%3a%22440fc6dc-373c-44b9-acaf-690751f30700%22%7d';
        break;
      case 'Swahili':
        meetingUrl = 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_ZTA2NDAyZTAtMTcwYy00YTVlLWI0YWEtODQ0NDAxNmM3YzRi%40thread.v2/0?context=%7b%22Tid%22%3a%22c0fdc250-ab8c-4f78-9399-cf0f4259ac02%22%2c%22Oid%22%3a%22440fc6dc-373c-44b9-acaf-690751f30700%22%7d';
        break;
      default:
        alert('No meeting link available for this course.');
        return;
    }

    window.open(meetingUrl, '_blank');
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
        {/*left side - logo */}
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

        {/*right side - theme toggle and user menu */}
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

          {/*user menu */}
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
