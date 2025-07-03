'use client';

import { useState, useEffect, useRef } from 'react';
import { X, CheckCircle, XCircle, ArrowRight, Trophy } from 'lucide-react';
import styles from '../../scss/TriviaModal.module.scss';

export default function TriviaModal({ isOpen, onClose, questions, title, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState({});
  const [imageLoaded, setImageLoaded] = useState({});
  const [randomizedAnswers, setRandomizedAnswers] = useState([]);
  const [resultMessage, setResultMessage] = useState('');
  const modalContentRef = useRef(null);

  // supportive, child-friendly messages by score
  const lowScoreMessages = [
    "Great effort! Every mistake helps you learn. Try again and you'll get even better! 🌱",
    "Don't give up! Keep practicing and you'll see big improvements! 💪",
    "You're on your way! Each quiz makes you smarter. Let's keep going! 🚀",
    "Mistakes are part of learning. Try again and you'll do even better! 🌟",
    "Keep trying! Every attempt helps you grow. You can do it! ⭐",
    "Awesome effort! Next time you'll get even more right! 👍",
    "Remember, practice makes perfect. Let's try again! 🧠",
    "You're learning so much! Keep up the good work! 📚",
    "Every quiz is a step forward. Well done for trying! 👣",
    "Don't worry about mistakes—you're getting better every time! 😊"
  ];
  const mediumScoreMessages = [
    "Nice work! You're getting the hang of it! 🎉",
    "Good job! Just a little more practice and you'll ace it! 🌟",
    "You're so close to a perfect score! Keep going! 🚀",
    "Great progress! You're learning fast! 📈",
    "Awesome! Just a few more and you'll be a quiz master! 🏅",
    "You're doing really well! Keep practicing! 💡",
    "Impressive! You're almost there! 👏",
    "So close! Try again for a perfect score! 🏆",
    "You're making great progress. Keep it up! 😃",
    "Fantastic effort! You're on your way to the top! 🎈"
  ];
  const highScoreMessages = [
    "Amazing! You got almost everything right! 🌟",
    "Outstanding! You're a language champion! 🏆",
    "Perfect score! You're a superstar! 🎉",
    "Incredible! You really know your stuff! 👏",
    "Wow! You aced the quiz! 🥇",
    "Brilliant! You're a quiz master! 🧠",
    "Fantastic! You got them all right! 🚀",
    "Superb! You're a language whiz! 🏅",
    "Excellent! You should be proud of yourself! 🙌",
    "Unstoppable! You nailed it! 🥳"
  ];

  // clear cache and reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setPreloadedImages({});
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setScore(0);
      setAnswered(false);
      setImageLoaded({});
    }
  }, [isOpen]);

  // preload images when modal opens or questions change
  useEffect(() => {
    if (!isOpen || !questions || questions.length === 0) return;
    const imageCache = {};
    let isCancelled = false;
    const promises = questions.map((q, idx) => {
      if (q.imageUrl) {
        return new Promise((resolve) => {
          const img = new window.Image();
          const url = `https://api.tmero.com/static/images/${q.imageUrl}`;
          img.onload = () => {
            imageCache[idx] = url;
            resolve();
          };
          img.onerror = () => {
            imageCache[idx] = null;
            resolve();
          };
          img.src = url;
        });
      } else {
        imageCache[idx] = null;
        return Promise.resolve();
      }
    });
    Promise.all(promises).then(() => {
      if (!isCancelled) setPreloadedImages(imageCache);
    });
    return () => { isCancelled = true; };
  }, [isOpen, questions]);

  // auto-scroll modal content to top on question change or modal open
  useEffect(() => {
    if (isOpen && modalContentRef.current) {
      setTimeout(() => {
        if (modalContentRef.current) {
          modalContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 0);
    }
  }, [currentQuestion, isOpen]);

  // Keyboard support: Enter advances to next question if answered
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (answered && (e.key === 'Enter' || e.key === 'NumpadEnter')) {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [answered, isOpen, showResult]);

  // Randomize answers for each question when modal opens or questions change
  useEffect(() => {
    if (!isOpen || !questions || questions.length === 0) return;
    // Fisher-Yates shuffle
    const shuffle = (arr) => {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };
    const randomized = questions.map(q => shuffle(q.answers));
    setRandomizedAnswers(randomized);
  }, [isOpen, questions]);

  // Pick a random message based on score when showing results
  useEffect(() => {
    if (showResult) {
      let messageArr;
      if (questions.length === 0) {
        messageArr = lowScoreMessages;
      } else {
        const percent = score / questions.length;
        if (percent < 0.6) {
          messageArr = lowScoreMessages;
        } else if (percent < 0.9) {
          messageArr = mediumScoreMessages;
        } else {
          messageArr = highScoreMessages;
        }
      }
      setResultMessage(messageArr[Math.floor(Math.random() * messageArr.length)]);
    }
  }, [showResult, score, questions.length]);

  if (!isOpen) return null;

  const handleAnswerSelect = (answer) => {
    if (answered) return;
    setSelectedAnswer(answer);
    setAnswered(true);
    const sanitizedAnswer = sanitizeText(answer);
    const sanitizedCorrect = sanitizeText(questions[currentQuestion].correctAnswer);
    if (sanitizedAnswer === sanitizedCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResult(true);
      if (onComplete) onComplete();
    }
  };

  const handleTryAgain = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered(false);
  };

  const getAnswerClassName = (answer, correct, isSelected) => {
    if (!answered) return '';
    if (answer === correct) return styles.correct;
    if (isSelected && answer !== correct) return styles.incorrect;
    return '';
  };

  // utility to sanitize question/answers
  const sanitizeText = (text) => {
    if (!text) return '';
    // remove all leading/trailing quotes, brackets, slashes, and whitespace
    let sanitized = text.replace(/^[\s\["'\\/]+|[\s\]"'\\/]+$/g, '');
    // Replace escaped quotes with real quotes
    sanitized = sanitized.replace(/\\"/g, '"').replace(/\\'/g, "'");
    // decode Unicode escape sequences for Amharic characters
    sanitized = decodeUnicodeEscapes(sanitized);
    return sanitized;
  };

  // function to decode Unicode escape sequences
  const decodeUnicodeEscapes = (text) => {
    return text.replace(/\\u([0-9a-fA-F]{4})/g, (match, hex) => {
      return String.fromCharCode(parseInt(hex, 16));
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>{title}</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {!showResult ? (
          <div className={styles.triviaContent} ref={modalContentRef}>
            <div className={styles.progress}>
              Question {currentQuestion + 1} of {questions.length}
            </div>

            <div className={styles.question}>
              <h2>{sanitizeText(questions[currentQuestion].question)}</h2>
              {questions[currentQuestion].imageUrl && (
                <div style={{ minHeight: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    key={currentQuestion}
                    src={preloadedImages[currentQuestion] || `https://api.tmero.com/static/images/${questions[currentQuestion].imageUrl}`}
                    alt="Question illustration"
                    className={`${styles.questionImage} ${styles.fadeIn}`}
                    style={{ display: imageLoaded[currentQuestion] ? 'block' : 'none' }}
                    onLoad={() => setImageLoaded((prev) => ({ ...prev, [currentQuestion]: true }))}
                  />
                  {!imageLoaded[currentQuestion] && (
                    <div style={{ width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="18" stroke="#8b5cf6" strokeWidth="4" strokeDasharray="90 60" strokeLinecap="round">
                          <animateTransform attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="1s" repeatCount="indefinite" />
                        </circle>
                      </svg>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className={styles.answers}>
              {(randomizedAnswers[currentQuestion] || questions[currentQuestion].answers).map((answer, index) => {
                const sanitizedAnswer = sanitizeText(answer);
                const sanitizedCorrect = sanitizeText(questions[currentQuestion].correctAnswer);
                const isSelected = sanitizedAnswer === sanitizeText(selectedAnswer);
                const isCorrect = sanitizedAnswer === sanitizedCorrect;
                // highlight correct answer if answered and either selected or missed
                const highlightCorrect = answered && isCorrect;
                // highlight incorrect if selected and not correct
                const highlightIncorrect = answered && isSelected && !isCorrect;
                return (
                  <button
                    key={index}
                    className={
                      `${styles.answerButton} ` +
                      (highlightCorrect ? styles.correct : '') +
                      (highlightIncorrect ? ' ' + styles.incorrect : '')
                    }
                    onClick={() => handleAnswerSelect(answer)}
                    disabled={answered}
                  >
                    {sanitizedAnswer}
                    {/* show tick for correct answer (selected or not) */}
                    {highlightCorrect && (
                      <CheckCircle size={20} className={styles.icon} />
                    )}
                  </button>
                );
              })}
            </div>

            {answered && (
              <button 
                className={styles.nextButton} 
                onClick={handleNext}
              >
                {currentQuestion < questions.length - 1 ? (
                  <>
                    Next Question
                    <ArrowRight size={20} />
                  </>
                ) : (
                  <>
                    See Results
                    <Trophy size={20} />
                  </>
                )}
              </button>
            )}
          </div>
        ) : (
          <div className={styles.results}>
            <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#8b5cf6', marginBottom: '1rem' }}>
              {resultMessage}
            </div>
            <Trophy size={64} className={styles.trophyIcon} />
            <h2>Quiz Complete!</h2>
            <p className={styles.score}>
              Your score: {score} out of {questions.length}
            </p>
            <div className={styles.percentage}>
              {Math.round((score / questions.length) * 100)}%
            </div>
            <button 
              className={styles.tryAgainButton}
              onClick={handleTryAgain}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 