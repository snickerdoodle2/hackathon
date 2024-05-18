import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

// Przykładowe dane JSON z pytaniami i odpowiedziami
const quizData = [
  {
    question: "Których zajęć nie prowadzi BIT?",
    answers: [
      { text: "BIT Algo", isCorrect: false, explanation: "Mamy ;) należy do BIT START" },
      { text: "BIT AI", isCorrect: false, explanation: "Mamy ;) należy do BIT PRO" },
      { text: "BIT Java", isCorrect: true, explanation: "Mamy ;) należy do BIT SOFTWARE ENGINEERING & DEVELOPMENT" },
      { text: "BIT Data Science", isCorrect: true, explanation: "" }
    ]
  },
  {
    question: "Z jakiego wydziału studenci uczestniczą w KN BIT?",
    answers: [
      { text: "Wydział Informatyki", isCorrect: true, explanation: "" },
      { text: "Wydział Odlewnictwa", isCorrect: false, explanation: "Prawidłowa odpowiedź to Wydział Informatyki" },
      { text: "Wydział Energetyki", isCorrect: false, explanation: "Prawidłowa odpowiedź to Wydział Informatyki" },
      { text: "Wydział Humanistyczny", isCorrect: false, explanation: "Prawidłowa odpowiedź to Wydział Informatyki" }
    ]
  },
  {
    question: "Których zajęć nie prowadzi BIT?",
    answers: [
      { text: "BIT Algo", isCorrect: false, explanation: "Mamy ;) należy do BIT START" },
      { text: "BIT AI", isCorrect: false, explanation: "Mamy ;) należy do BIT PRO" },
      { text: "BIT Java", isCorrect: true, explanation: "Mamy ;) należy do BIT SOFTWARE ENGINEERING & DEVELOPMENT" },
      { text: "BIT Data Science", isCorrect: true, explanation: "" }
    ]
  },
  {
    question: "Z jakiego wydziału studenci uczestniczą w KN BIT?",
    answers: [
      { text: "Wydział Informatyki", isCorrect: true, explanation: "" },
      { text: "Wydział Odlewnictwa", isCorrect: false, explanation: "Prawidłowa odpowiedź to Wydział Informatyki" },
      { text: "Wydział Energetyki", isCorrect: false, explanation: "Prawidłowa odpowiedź to Wydział Informatyki" },
      { text: "Wydział Humanistyczny", isCorrect: false, explanation: "Prawidłowa odpowiedź to Wydział Informatyki" }
    ]
  },
  {
    question: "Których zajęć nie prowadzi BIT?",
    answers: [
      { text: "BIT Algo", isCorrect: false, explanation: "Mamy ;) należy do BIT START" },
      { text: "BIT AI", isCorrect: false, explanation: "Mamy ;) należy do BIT PRO" },
      { text: "BIT Java", isCorrect: true, explanation: "Mamy ;) należy do BIT SOFTWARE ENGINEERING & DEVELOPMENT" },
      { text: "BIT Data Science", isCorrect: true, explanation: "" }
    ]
  },
];

const MiniQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [intervalProgress, setIntervalProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedAnswerIndex !== null) {
      let progressValue = 2;
      setIntervalProgress(0); // Zresetuj progress bar
      const interval = setInterval(() => {
        progressValue += 2;
        setIntervalProgress(progressValue);
      }, 100);

      const timer = setTimeout(() => {
        clearInterval(interval);
        if (currentQuestionIndex < quizData.length - 1) {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
          navigate('/');
        }
        setSelectedAnswerIndex(null);
        setExplanation(null);
        setIntervalProgress(0); // Zresetuj progress bar
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [selectedAnswerIndex, currentQuestionIndex, navigate]);

  useEffect(() => {
    setProgress(((currentQuestionIndex + 1) / quizData.length) * 100);
  }, [currentQuestionIndex]);

  const handleAnswerClick = (index: number, isCorrect: boolean, explanation: string) => {
    setSelectedAnswerIndex(index);
    setExplanation(isCorrect ? null : explanation);
  };

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="p-8 max-w-md mx-auto flex flex-col min-h-screen">
      <div className="w-full bg-gray-200 rounded h-2 mb-8">
        <div
          className="bg-blue-600 h-2 rounded transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <h1 className="text-xl font-bold mb-8">{currentQuestion.question}</h1>
      <div>
        {currentQuestion.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(index, answer.isCorrect, answer.explanation)}
            className={`block w-full px-4 py-2 my-2 border rounded 
                        ${selectedAnswerIndex !== null && index === selectedAnswerIndex
              ? answer.isCorrect
                ? 'bg-green-500 font-bold'
                : 'bg-red-500 font-bold'
              : 'bg-white border-gray-300'
              }`}
            disabled={selectedAnswerIndex !== null}
          >
            {answer.text}
          </button>
        ))}
      </div>
      {explanation && (
        <div className="mt-4 text-red-500">
          <p>{explanation}</p>
        </div>
      )}
      <div className="mt-auto w-full bg-gray-200 rounded h-2 mt-4">
        <div
          className="bg-green-600 h-2 rounded transition-all"
          style={{ width: `${intervalProgress}%`, transitionDuration: '0.1s' }}
        ></div>
      </div>
    </div>
  );
};

export default MiniQuiz;
