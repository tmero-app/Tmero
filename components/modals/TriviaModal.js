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
  const modalContentRef = useRef(null);

  // Clear cache and reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setPreloadedImages({});
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setScore(0);
      setAnswered(false);
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
      // set timeout to ensure scroll happens after DOM update
      setTimeout(() => {
        if (modalContentRef.current) {
          modalContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 0);
    }
  }, [currentQuestion, isOpen]);

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
    // remove all leading/trailing quotes, brackets, and whitespace
    let sanitized = text.replace(/^[\s\["']+|[\s\]"']+$/g, '');
    
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
    <div className={styles.modalOverlay} onClick={onClose}>
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
                <img 
                  key={currentQuestion}
                  src={preloadedImages[currentQuestion] || `https://api.tmero.com/static/images/${questions[currentQuestion].imageUrl}`}
                  alt="Question illustration"
                  className={`${styles.questionImage} ${styles.fadeIn}`}
                />
              )}
            </div>

            <div className={styles.answers}>
              {questions[currentQuestion].answers.map((answer, index) => {
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