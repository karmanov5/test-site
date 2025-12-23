import React, { useState } from 'react';
import { CheckCircle, XCircle, Trophy, RefreshCcw, ArrowRight } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../constants';

interface QuizProps {
  onRestart: () => void;
}

const Quiz: React.FC<QuizProps> = ({ onRestart }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const question = QUIZ_QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === QUIZ_QUESTIONS.length - 1;

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    
    setIsAnswered(true);
    if (selectedOption === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setShowResult(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  const getGrade = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return { mark: 5, text: 'Отлично! Вы усвоили материал.', color: 'text-green-600' };
    if (percentage >= 70) return { mark: 4, text: 'Хорошо. Есть небольшие пробелы.', color: 'text-blue-600' };
    if (percentage >= 50) return { mark: 3, text: 'Удовлетворительно. Стоит повторить тему.', color: 'text-yellow-600' };
    return { mark: 2, text: 'Плохо. Изучите презентацию еще раз.', color: 'text-red-600' };
  };

  if (showResult) {
    const grade = getGrade(score, QUIZ_QUESTIONS.length);
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden text-center p-12">
        <div className="flex justify-center mb-6">
          <Trophy size={80} className="text-yellow-400" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Тест завершен!</h2>
        <p className="text-slate-500 mb-8">Вот ваши результаты</p>
        
        <div className="mb-8">
          <span className="text-6xl font-black text-slate-800">{score}</span>
          <span className="text-2xl text-slate-400"> / {QUIZ_QUESTIONS.length}</span>
        </div>

        <div className={`text-xl font-bold mb-8 ${grade.color}`}>
          Ваша оценка: {grade.mark} <br/>
          <span className="text-base font-normal text-slate-600">{grade.text}</span>
        </div>

        <button 
          onClick={onRestart}
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition font-medium"
        >
          <RefreshCcw size={20} />
          Пройти заново
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex justify-between items-center text-sm font-medium text-slate-500 uppercase tracking-wider">
        <span>Вопрос {currentQuestionIndex + 1} из {QUIZ_QUESTIONS.length}</span>
        <span>Очки: {score}</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
        <div 
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" 
          style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
        ></div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">
          {question.question}
        </h3>

        <div className="space-y-3">
          {question.options.map((option, idx) => {
            let itemClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ";
            
            if (isAnswered) {
              if (idx === question.correctAnswer) {
                itemClass += "border-green-500 bg-green-50 text-green-800";
              } else if (idx === selectedOption) {
                itemClass += "border-red-500 bg-red-50 text-red-800";
              } else {
                itemClass += "border-gray-100 opacity-50";
              }
            } else {
              if (selectedOption === idx) {
                itemClass += "border-indigo-500 bg-indigo-50 shadow-md transform scale-[1.01]";
              } else {
                itemClass += "border-gray-200 hover:border-indigo-200 hover:bg-gray-50";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(idx)}
                disabled={isAnswered}
                className={itemClass}
              >
                <span className="font-medium">{option}</span>
                {isAnswered && idx === question.correctAnswer && <CheckCircle className="text-green-500" size={24} />}
                {isAnswered && idx === selectedOption && idx !== question.correctAnswer && <XCircle className="text-red-500" size={24} />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end">
        {!isAnswered ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedOption === null}
            className={`px-8 py-3 rounded-full font-bold text-white transition-all ${
              selectedOption !== null 
                ? 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30' 
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Ответить
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="px-8 py-3 rounded-full font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30 flex items-center gap-2"
          >
            {isLastQuestion ? 'Завершить' : 'Далее'}
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
