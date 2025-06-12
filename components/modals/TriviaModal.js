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

    if (answer === questions[currentQuestion].correctAnswer) {
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

  const getAnswerClassName = (answer) => {
    if (!answered) return '';
    if (answer === questions[currentQuestion].correctAnswer) {
      return styles.correct;
    }
    if (answer === selectedAnswer) {
      return styles.incorrect;
    }
    return '';
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
              <h2>{questions[currentQuestion].question}</h2>
              {questions[currentQuestion].imageUrl && (
                <img 
                  src={questions[currentQuestion].imageUrl} 
                  alt="Question illustration"
                  className={styles.questionImage}
                />
              )}
            </div>

            <div className={styles.answers}>
              {questions[currentQuestion].answers.map((answer, index) => (
                <button
                  key={index}
                  className={`${styles.answerButton} ${getAnswerClassName(answer)}`}
                  onClick={() => handleAnswerSelect(answer)}
                  disabled={answered}
                >
                  {answer}
                  {answered && answer === questions[currentQuestion].correctAnswer && (
                    <CheckCircle size={20} className={styles.icon} />
                  )}
                  {answered && answer === selectedAnswer && answer !== questions[currentQuestion].correctAnswer && (
                    <XCircle size={20} className={styles.icon} />
                  )}
                </button>
              ))}
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