import React, { useState } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, GraduationCap, Menu, X } from 'lucide-react';
import { LESSON_CONTENT } from './constants';
import NotebookCard from './components/NotebookCard';
import Quiz from './components/Quiz';
import { LessonState } from './types';

function App() {
  const [currentState, setCurrentState] = useState<LessonState>('learning');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentSlide = LESSON_CONTENT[currentSlideIndex];
  const isFirstSlide = currentSlideIndex === 0;
  const isLastSlide = currentSlideIndex === LESSON_CONTENT.length - 1;

  const handleNext = () => {
    if (isLastSlide) {
      setCurrentState('quiz');
    } else {
      setCurrentSlideIndex(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (!isFirstSlide) {
      setCurrentSlideIndex(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleRestart = () => {
    setCurrentState('learning');
    setCurrentSlideIndex(0);
    window.scrollTo(0, 0);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-indigo-900 text-white p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="font-bold text-lg">Урок информатики</h1>
        <button onClick={toggleSidebar} className="p-1">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-indigo-900 text-indigo-100 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen sticky top-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8 text-white">
            <GraduationCap size={32} />
            <h1 className="font-bold text-xl leading-tight">Алгоритмы<br/><span className="text-indigo-300 text-sm font-normal">8 класс</span></h1>
          </div>

          <nav className="space-y-1">
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2 px-3">Содержание</div>
            {LESSON_CONTENT.map((section, idx) => (
              <button
                key={section.id}
                onClick={() => {
                  setCurrentState('learning');
                  setCurrentSlideIndex(idx);
                  setIsSidebarOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                  currentState === 'learning' && currentSlideIndex === idx 
                    ? 'bg-indigo-700 text-white font-medium shadow-md' 
                    : 'hover:bg-indigo-800'
                }`}
              >
                <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs ${currentState === 'learning' && currentSlideIndex === idx ? 'bg-indigo-500' : 'bg-indigo-800'}`}>
                  {idx + 1}
                </span>
                {section.title}
              </button>
            ))}
            
            <div className="my-4 border-t border-indigo-800"></div>
            
            <button
              onClick={() => {
                setCurrentState('quiz');
                setIsSidebarOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                currentState === 'quiz' 
                  ? 'bg-indigo-600 text-white font-medium shadow-md' 
                  : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
              }`}
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-yellow-500 text-indigo-900 font-bold text-xs">
                ?
              </span>
              Проверка знаний
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-slate-50 relative">
        {/* Top Bar (Desktop) */}
        <header className="hidden md:flex bg-white border-b border-gray-200 px-8 py-4 justify-between items-center sticky top-0 z-30">
          <h2 className="text-xl font-bold text-slate-800">
            {currentState === 'learning' ? currentSlide.title : 'Итоговое тестирование'}
          </h2>
          {currentState === 'learning' && (
            <div className="text-sm text-slate-500">
              Слайд {currentSlideIndex + 1} из {LESSON_CONTENT.length}
            </div>
          )}
        </header>

        <div className="flex-1 p-6 md:p-12 max-w-5xl mx-auto w-full">
          
          {currentState === 'learning' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Content Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-2 text-indigo-600 font-semibold mb-4 uppercase tracking-wider text-sm">
                    <BookOpen size={16} />
                    Теория
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                    {currentSlide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                    {currentSlide.content}
                  </p>

                  {/* Notebook Block if exists */}
                  {currentSlide.notebook && (
                    <NotebookCard data={currentSlide.notebook} />
                  )}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8">
                <button
                  onClick={handlePrev}
                  disabled={isFirstSlide}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    isFirstSlide 
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'text-slate-600 hover:bg-white hover:shadow-md bg-gray-100'
                  }`}
                >
                  <ChevronLeft size={20} />
                  Назад
                </button>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-1"
                >
                  {isLastSlide ? 'Перейти к тесту' : 'Далее'}
                  {isLastSlide ? <GraduationCap size={20} /> : <ChevronRight size={20} />}
                </button>
              </div>
            </div>
          ) : (
            <div className="animate-in zoom-in-95 duration-500">
              <Quiz onRestart={handleRestart} />
            </div>
          )}

        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default App;
