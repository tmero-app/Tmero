import React, { useEffect, useState } from 'react';
import ModalVideo from 'react-modal-video';
import styles from '../public/scss/Dashboard.module.scss';


const Dashboard = () => {

  const [courseTitle, setCourseTitle] = useState('');
  const [modules, setModules] = useState([]);


  const [userProgress, setUserProgress] = useState({
    name: '',
    email: '',
    course: '',
    progress: 50, 
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token'); 
      if (!token) return;

      try {
        const res = await fetch('https://api.tmero.com/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();

        if (res.ok && result.data) {
          setUserProgress((prev) => ({
            ...prev,
            name: result.data.studentName || 'Unknown',
            email: result.data.email || 'Unknown',
          }));
        } else {
          console.error('Failed to fetch user:', result.message);
        }
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    fetchUserDetails();
  }, []);

  const extractYouTubeVideoId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|embed|watch)|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};


  useEffect(() => {
  const fetchCourseAndOutline = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      //Get course ID and title
      const courseRes = await fetch('https://api.tmero.com/user/courses', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const courseData = await courseRes.json();

      if (!courseRes.ok || !courseData?.data?.length) {
        console.error('Failed to fetch courses');
        return;
      }

      const course = courseData.data[0]; 
      const courseId = course.id;
      setCourseTitle(course.title); 

      //Get outlines for that course
      const outlineRes = await fetch(`https://api.tmero.com/user/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const outlineData = await outlineRes.json();

      if (!outlineRes.ok || !outlineData?.data?.length) {
        console.error('Failed to fetch outlines');
        return;
      }

      const outlines = outlineData.data[0].outlines;

      //Map outlines to expected format
    const formattedModules = outlines.map((outline, index) => ({
  title: `Week ${index + 1}: ${outline.outline}`,
  videoId: outline.youtubeUrl.split('v=')[1],
  completed: false,
  trivia: (outline.trivia || []).map(triviaItem => {
    let options = [];

    try {
      let answersString = triviaItem.answers.join(',');
      answersString = answersString.trim();
      if (answersString.startsWith('[')) answersString = answersString.slice(1);
      if (answersString.endsWith(']')) answersString = answersString.slice(0, -1);
      answersString = `[${answersString}]`;
      options = JSON.parse(answersString);
      options = options.map(opt => opt.replace(/^"|"$/g, ''));

    } catch (e) {
      options = triviaItem.answers;
    }

    return {
      ...triviaItem,
      options,
    };
  }),
}));

    setModules(formattedModules);
    } catch (error) {
      console.error('Error fetching course/outline data:', error);
    }
  };

  fetchCourseAndOutline();
}, []);

  // Video Modal State
  const [isOpen, setOpen] = useState(false);
  const [videoId, setVideoId] = useState(null);

  // Trivia Modal States
  const [triviaOpen, setTriviaOpen] = useState(false);
  const [activeTriviaModule, setActiveTriviaModule] = useState(null);
  const [currentTriviaQuestion, setCurrentTriviaQuestion] = useState(0);
  const [selectedTriviaAnswer, setSelectedTriviaAnswer] = useState(null);
  const [triviaFeedback, setTriviaFeedback] = useState('');
  const [triviaScore, setTriviaScore] = useState(0);
  const [isTriviaCompleted, setIsTriviaCompleted] = useState(false);

  const handleOpenVideo = (id) => {
    setVideoId(id);
    setOpen(true);
  };

  const openTrivia = (module) => {
    setActiveTriviaModule(module);
    setTriviaOpen(true);
    setCurrentTriviaQuestion(0);
    setSelectedTriviaAnswer(null);
    setTriviaFeedback('');
    setTriviaScore(0);
    setIsTriviaCompleted(false);
  };

  const closeTrivia = () => {
    setTriviaOpen(false);
    setActiveTriviaModule(null);
    setCurrentTriviaQuestion(0);
    setSelectedTriviaAnswer(null);
    setTriviaFeedback('');
    setTriviaScore(0);
    setIsTriviaCompleted(false);
  };

  const handleTriviaAnswer = (option) => {
    if (selectedTriviaAnswer !== null) return; // Prevent re-answering
    setSelectedTriviaAnswer(option);
    const currentQ = activeTriviaModule.trivia[currentTriviaQuestion];
    if (option === currentQ.correctAnswer) {
      setTriviaFeedback("✅ Correct!");
      setTriviaScore((prev) => prev + 1);
    } else {
      setTriviaFeedback("❌ Incorrect.");
    }
  };

  const nextTriviaQuestion = () => {
    if (currentTriviaQuestion < activeTriviaModule.trivia.length - 1) {
      setCurrentTriviaQuestion((prev) => prev + 1);
      setSelectedTriviaAnswer(null);
      setTriviaFeedback('');
    } else {
      // Set completed state so the modal shows the results.
      setIsTriviaCompleted(true);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2 className={styles.userName}>{userProgress.name}</h2>
        <p className={styles.userEmail}>{userProgress.email}</p>
        <h3 className={styles.courseTitle}>{courseTitle || 'Loading course...'}</h3>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${userProgress.progress}%` }}>
            {userProgress.progress}%
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={styles.dashboardContent}>
        <h2 className={styles.dashboardTitle}>{courseTitle || 'Loading course...'}</h2>
        <div className={styles.moduleGrid}>
          {modules.map((module, index) => (
            <div key={index} className={`${styles.moduleCard} ${module.completed ? styles.completed : ''}`}>
              <h3 className={styles.moduleTitle}>{module.title}</h3>
              <button className={styles.btnPrimary} onClick={() => handleOpenVideo(module.videoId)}>
                {module.completed ? "Watch Again" : "Watch Video"}
              </button>
              {module.trivia && module.trivia.length > 0 && (
                <button className={styles.btnQuiz} onClick={() => openTrivia(module)}>
                  Take Quiz
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <ModalVideo 
        channel="youtube" 
        autoplay 
        isOpen={isOpen} 
        videoId={videoId} 
        onClose={() => setOpen(false)} 
      />

      {/* Trivia Modal */}
      {triviaOpen && activeTriviaModule && (
        <div className={styles.triviaModalOverlay}>
          <div className={styles.triviaModalContent}>
            <button className={styles.triviaCloseButton} onClick={closeTrivia}>X</button>
            <h3>{activeTriviaModule.title} Trivia</h3>

            {isTriviaCompleted ? (
              <div className={styles.triviaQuestionSection}>
                <p>Quiz Completed! Your score: {triviaScore} / {activeTriviaModule.trivia.length}</p>
                <button className={styles.triviaNextButton} onClick={closeTrivia}>Close</button>
              </div>
            ) : (
              activeTriviaModule.trivia.length > 0 && (
                <div className={styles.triviaQuestionSection}>

                  {/* Question Progress Indicator */}
                  <p className={styles.triviaProgress}>
                    Question {currentTriviaQuestion + 1} / {activeTriviaModule.trivia.length}
                  </p>
              
                  <p>{activeTriviaModule.trivia[currentTriviaQuestion].question}</p>

                  <div className={styles.triviaOptions}>
                    {activeTriviaModule.trivia[currentTriviaQuestion].options.map((option, idx) => (
                      <button 
                        key={idx} 
                        className={styles.triviaOptionButton} 
                        onClick={() => handleTriviaAnswer(option)}
                        disabled={selectedTriviaAnswer !== null}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  
                  {selectedTriviaAnswer && (
                    <div className={styles.triviaFeedback}>
                      <p>{triviaFeedback}</p>
                      <button className={styles.triviaNextButton} onClick={nextTriviaQuestion}>Next</button>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
