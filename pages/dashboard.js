import React, { useState } from 'react';
import ModalVideo from 'react-modal-video';
import styles from '../public/scss/Dashboard.module.scss';

// Add trivia to each module as needed
//example mock data
const mockModules = [
  { 
    title: "Week 1: Greetings", 
    videoId: "dQw4w9WgXcQ", 
    completed: true,
    trivia: [
      {
        question: "What does 'Selam' mean?",
        options: ["Goodbye", "Hello", "Please", "Thank you"],
        correctAnswer: "Hello"
      },
      {
        question: "Which greeting is common in Amharic?",
        options: ["Dehna", "Tena Yistilign", "Amasegenallo", "Yikirta"],
        correctAnswer: "Tena Yistilign"
      }
    ]
  },
  { 
    title: "Week 2: Common Phrases", 
    videoId: "3JZ_D3ELwOQ", 
    completed: true,
    trivia: [
      {
        question: "What is the Amharic word for 'Thank you'?",
        options: ["Amesegenallo", "Selam", "Dehna", "Teanastilign"],
        correctAnswer: "Amesegenallo"
      }
    ]
  },
  { 
    title: "Week 3: Numbers & Counting", 
    videoId: "cU8ZcWKuOHo", 
    completed: false,
    trivia: [
      {
        question: "How do you say 'one' in Amharic?",
        options: ["And", "Kilo", "Hule", "Sost"],
        correctAnswer: "And"
      }
    ]
  },
  { 
    title: "Week 4: Family & Relationships", 
    videoId: "oHg5SJYRHA0", 
    completed: false,
    trivia: [
      {
        question: "How do you say 'mother' in Amharic?",
        options: ["Enat", "Abat", "Ehit", "Wondim"],
        correctAnswer: "Enat"
      },
      {
        question: "Which of the following means 'brother' in Amharic?",
        options: ["Wondim", "Enat", "Abat", "Ehit"],
        correctAnswer: "Wondim"
      }
    ] 
  }
];

const userProgress = {
  name: "Selim",
  email: "Selim@gmail.com",
  course: "Amharic for Beginners",
  progress: 50 
};

const Dashboard = () => {
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
        <h3 className={styles.courseTitle}>{userProgress.course}</h3>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${userProgress.progress}%` }}>
            {userProgress.progress}%
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={styles.dashboardContent}>
        <h2 className={styles.dashboardTitle}>{userProgress.course}</h2>
        <div className={styles.moduleGrid}>
          {mockModules.map((module, index) => (
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
