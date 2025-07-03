"use client";

import React, { useEffect, useState } from "react";
import { Topbar } from "../components/sections/Topbar";
import LanguageLearningDashboard from "../components/sections/language-learning-dashboard";
import styles from "../scss/dashboard.module.scss";

const positiveMessages = [
  "Keep up the great work! Every day you learn something new! 🚀",
  "You're doing amazing! Let's see what you can discover today! 🧠",
  "Learning a language is an adventure let's keep going! 🌟",
  "Every lesson makes you smarter. Ready for today's challenge? 💡",
  "You're a language explorer! Let's find new words together! 🗺️",
  "Practice makes perfect! Let's keep learning and having fun! 🎈",
  "Your hard work is paying off! Let's keep the momentum! 🏅",
  "Great to see you back! Ready for more language fun? 😃",
  "Let's make today another step forward in your language journey! 👣",
  "You're a superstar learner! Let's shine today! ⭐"
];

export default function Dashboard() {
  const [userData, setUserData] = useState({
    parentName: '',
    studentName: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [subtitle, setSubtitle] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found');
        setIsLoading(false);
        window.location.href = '/log-in';
        return;
      }

      try {
        const response = await fetch('https://api.tmero.com/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (response.ok && result.data) {
          setUserData({
            parentName: result.data.parentFullname || 'Unknown',
            studentName: result.data.studentName || 'Unknown',
            email: result.data.email || 'Unknown',
          });
        } else {
          setError(result.message || 'Failed to fetch user data');
          if (response.status === 401) {
            window.location.href = '/log-in';
          }
        }
      } catch (err) {
        setError('An error occurred while fetching user data');
        console.error('Error fetching user:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // dynamic subtitle logic
  useEffect(() => {
    setSubtitle(positiveMessages[Math.floor(Math.random() * positiveMessages.length)]);
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error && !userData.parentName) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error}</p>
        <button 
          onClick={() => window.location.href = '/log-in'} 
          className={styles.loginButton}
        >
          Return to Login
        </button>
      </div>
    );
  }

  return (
    <div className={styles.dashboardPage}>
      <Topbar userName={userData.parentName} userEmail={userData.email} />
      <main className={styles.mainContent}>
        <div className={styles.welcomeHeader}>
          <h1>Welcome, <span className={styles.studentName}>{userData.studentName}</span>! 👋</h1>
          <p>{subtitle}</p>
        </div>
        <LanguageLearningDashboard />
      </main>
    </div>
  );
}
