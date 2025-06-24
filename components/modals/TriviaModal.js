'use client';

import { useState } from 'react';
import { X, CheckCircle, XCircle, ArrowRight, Trophy } from 'lucide-react';
import styles from '../../scss/TriviaModal.module.scss';

export default function TriviaModal({ isOpen, onClose, questions, title }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

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

  // Utility to sanitize question/answers
  const sanitizeText = (text) => {
    if (!text) return '';
    // Remove all leading/trailing quotes, brackets, and whitespace
    return text.replace(/^[\s\["']+|[\s\]"']+$/g, '');
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
          <div className={styles.triviaContent}>
            <div className={styles.progress}>
              Question {currentQuestion + 1} of {questions.length}
            </div>

            <div className={styles.question}>
              <h2>{sanitizeText(questions[currentQuestion].question)}</h2>
              {/*
              {questions[currentQuestion].imageUrl && (
                <img 
                  src={questions[currentQuestion].imageUrl} 
                  alt="Question illustration"
                  className={styles.questionImage}
                />
              )}
              */}
            </div>

            <div className={styles.answers}>
              {questions[currentQuestion].answers.map((answer, index) => {
                const sanitizedAnswer = sanitizeText(answer);
                const sanitizedCorrect = sanitizeText(questions[currentQuestion].correctAnswer);
                const isSelected = sanitizedAnswer === sanitizeText(selectedAnswer);
                const isCorrect = sanitizedAnswer === sanitizedCorrect;
                // Highlight correct answer if answered and either selected or missed
                const highlightCorrect = answered && isCorrect;
                // Highlight incorrect if selected and not correct
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
                    {/* Show tick for correct answer (selected or not) */}
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