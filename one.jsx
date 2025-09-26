import React, { useState, useMemo, useCallback, useEffect, useRef, useReducer } from 'react';

// --- SVG Icon Components ---
const UploadIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>;
const CheckCircleIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>;
const XCircleIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>;
const RepeatIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 2.1l4 4-4 4" /><path d="M3 12.6A9 9 0 0 1 12 3h9" /><path d="M7 21.9l-4-4 4-4" /><path d="M21 11.4A9 9 0 0 1 12 21H3" /></svg>;
const ClockIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
const StarIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const SpinnerIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>;

// --- UI View Components (Memoized for performance) ---

const ImportScreen = React.memo(({ onFileUpload, error, isProcessing }) => (
  <div className="w-full max-w-2xl mx-auto text-center p-8 animate-fade-in-up">
    <h1 className="text-4xl md:text-5xl font-bold text-slate-800">SSC CGL Exam Simulator</h1>
    <p className="text-lg text-slate-500 mt-4">Ultimate MCQ - One Word Substitution</p>
    <div className="mt-12 bg-white/60 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-slate-200/50">
      <label htmlFor="file-upload" className={`cursor-pointer group ${isProcessing ? 'cursor-wait' : ''}`}>
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 hover:border-blue-500 hover:bg-white/50 transition-all duration-300">
          {isProcessing ? (
            <>
              <SpinnerIcon className="w-16 h-16 text-blue-600 mx-auto animate-spin" />
              <p className="mt-4 text-lg font-semibold text-slate-700">Processing Your Sheet...</p>
              <p className="text-sm text-slate-500 mt-1">Building Cognitive Models...</p>
            </>
          ) : (
            <>
              <UploadIcon className="w-16 h-16 text-slate-400 mx-auto group-hover:text-blue-600 transition-colors" />
              <p className="mt-4 text-lg font-semibold text-slate-700">Click to upload your Excel Sheet</p>
              <p className="text-sm text-slate-500 mt-1">(.xlsx, .xls, .csv)</p>
            </>
          )}
        </div>
      </label>
      <input id="file-upload" type="file" className="hidden" onChange={onFileUpload} accept=".xlsx, .xls, .csv" disabled={isProcessing} />
      <div className="mt-6 text-left text-sm text-slate-600 bg-slate-100/70 p-4 rounded-lg">
        <h3 className="font-semibold text-slate-700 mb-2">System Architecture:</h3>
        <p>• <span className="font-bold">Cognitive Difficulty Engine:</span> Curates tests harder than the real exam.</p>
        <p>• <span className="font-bold">Asynchronous & Resilient:</span> Non-blocking UI with fault tolerance.</p>
      </div>
      {error && <p className="mt-4 text-red-500 bg-red-100 p-3 rounded-lg">{error}</p>}
    </div>
     <footer className="mt-12 text-center text-slate-500 text-sm">
        <p>Made by Shahid Aktar Mir</p>
    </footer>
  </div>
));

const ModeSelectionScreen = React.memo(({ availableLetters, onSelectLetter, onStartFullMock, onReset, mostAskedCount, error }) => {
    return (
        <div className="w-full max-w-4xl mx-auto p-4 md:p-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-slate-800 text-center">Select Test Mode</h2>
            {error && <p className="mt-4 text-center text-red-500 bg-red-100 p-3 rounded-lg">{error}</p>}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/60 backdrop-blur-xl p-6 rounded-xl shadow-lg border border-slate-200/50 text-center flex flex-col animate-stagger-in" style={{'--stagger-order': 1}}>
                    <h3 className="font-bold text-2xl text-slate-700">Most Asked Questions</h3>
                    <p className="text-slate-500 mt-2 mb-8 flex-grow">A focused test on all questions previously asked in SSC exams ({mostAskedCount} found).</p>
                    <button onClick={onStartFullMock} disabled={mostAskedCount < 1} className="w-full bg-amber-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-amber-600 transition-all duration-200 hover:scale-105 active:scale-100 flex items-center justify-center disabled:bg-slate-400 disabled:cursor-not-allowed">
                         <StarIcon className="mr-2 h-5 w-5"/> Start Full Test
                    </button>
                </div>
                <div className="bg-white/60 backdrop-blur-xl p-6 rounded-xl shadow-lg border border-slate-200/50 animate-stagger-in" style={{'--stagger-order': 2}}>
                    <h3 className="font-bold text-2xl text-slate-700 text-center">Practice by Letter</h3>
                    <p className="text-slate-500 mt-2 text-center">Take a full test for a specific letter.</p>
                    <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 gap-2 mt-8">
                        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                            <button key={letter} onClick={() => onSelectLetter(letter)} disabled={!availableLetters.includes(letter)} className={`h-12 w-12 rounded-lg text-xl font-bold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/50 ${!availableLetters.includes(letter) ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-white/80 text-blue-700 hover:bg-blue-600 hover:text-white hover:scale-110 active:scale-105'}`}>{letter}</button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="text-center animate-stagger-in" style={{'--stagger-order': 3}}>
                <button onClick={onReset} className="mt-12 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">Import New Sheet</button>
            </div>
             <footer className="mt-12 text-center text-slate-500 text-sm">
                <p>Made by Shahid Aktar Mir</p>
            </footer>
        </div>
    );
});

const QuestionPalette = React.memo(({ questions, currentQuestionIndex, onQuestionSelect }) => (
    <div className="bg-white/60 backdrop-blur-xl p-4 rounded-lg shadow-lg border border-slate-200/50 h-full flex flex-col">
        <h3 className="font-bold text-center mb-4 text-slate-700 shrink-0">Question Palette</h3>
        <div className="flex-grow overflow-y-auto pr-2">
            <div className="grid grid-cols-5 gap-2">
                {questions.map((q, index) => {
                    let statusClass = 'bg-white/80 text-slate-700 hover:bg-slate-200/80';
                    if(q.status === 'answered') statusClass = 'bg-green-600 text-white hover:bg-green-700';
                    if(q.status === 'review') statusClass = 'bg-purple-600 text-white hover:bg-purple-700';
                    if(index === currentQuestionIndex) statusClass += ' ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-100';
                    
                    return (
                        <button key={index} onClick={() => onQuestionSelect(index)} className={`h-10 w-10 flex items-center justify-center font-bold rounded-md transition-all ${statusClass}`}>
                            {index + 1}
                        </button>
                    );
                })}
            </div>
        </div>
        <div className="mt-6 space-y-2 text-sm text-slate-600 shrink-0">
            <div className="flex items-center"><div className="w-4 h-4 rounded-full bg-green-600 mr-2 border border-green-700"></div> Answered</div>
            <div className="flex items-center"><div className="w-4 h-4 rounded-full bg-purple-600 mr-2 border border-purple-700"></div> Marked for Review</div>
            <div className="flex items-center"><div className="w-4 h-4 rounded-full bg-white/80 mr-2 border border-slate-400"></div> Not Answered</div>
            <div className="flex items-center"><div className="w-4 h-4 rounded-full bg-white ring-2 ring-blue-500 mr-2"></div> Current</div>
        </div>
    </div>
));

const TestScreen = React.memo(({ testData, onAnswer, onSubmit }) => {
    const { questions, currentQuestionIndex, timeLeft } = testData;
    const currentQuestion = questions[currentQuestionIndex];

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    const timerColorClass = useMemo(() => {
        if (timeLeft <= 60) return 'text-red-600 animate-pulse';
        if (timeLeft <= 300) return 'text-amber-600';
        return 'text-slate-700';
    }, [timeLeft]);

    return (
        <div className="w-full max-w-7xl mx-auto p-4 h-screen flex flex-col">
             <header className="bg-white/60 backdrop-blur-xl shadow-md rounded-lg p-3 flex justify-between items-center mb-4 border border-slate-200/50">
                <h1 className="text-xl font-bold text-blue-700">One Word Substitution Mock Test</h1>
                <div className={`flex items-center font-bold text-xl p-2 rounded-lg ${timerColorClass}`}>
                    <ClockIcon className="mr-2 h-6 w-6" />
                    <span>{formatTime(timeLeft)}</span>
                </div>
            </header>
            <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0">
                <div className="lg:col-span-2 bg-white/60 backdrop-blur-xl p-6 rounded-lg shadow-lg border border-slate-200/50 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-slate-800">Question {currentQuestionIndex + 1} of {questions.length}</h2>
                    </div>
                    <div className="flex-grow mb-6 overflow-y-auto">
                        <p className="text-md text-slate-500 mb-2">Definition:</p>
                        <p className="text-xl md:text-2xl font-serif text-slate-900">{currentQuestion.sentence}</p>
                    </div>
                    <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {currentQuestion.options.map((option, index) => (
                            <button 
                                key={index} 
                                onClick={() => onAnswer(currentQuestionIndex, option, 'select_option')}
                                className={`p-4 rounded-lg text-left text-lg font-semibold transition-all duration-200 border-2 active:scale-[0.98] ${
                                    currentQuestion.userAnswer === option 
                                    ? 'bg-blue-600 text-white border-blue-700 ring-2 ring-offset-2 ring-offset-slate-100' 
                                    : 'bg-white/70 text-slate-800 border-slate-300 hover:bg-blue-50/50 hover:border-blue-400'
                                }`}
                            >
                                <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span> {option}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-1 min-h-0">
                    <QuestionPalette questions={questions} currentQuestionIndex={currentQuestionIndex} onQuestionSelect={(idx) => onAnswer(idx, '', 'navigate')} />
                </div>
            </div>
            <footer className="bg-white/60 backdrop-blur-xl shadow-md rounded-lg p-3 mt-4 border border-slate-200/50 flex flex-wrap justify-between items-center gap-2">
                <div>
                     <button onClick={() => onAnswer(currentQuestionIndex, '', 'clear')} className="bg-slate-200 text-slate-700 font-bold py-2 px-4 rounded-lg hover:bg-slate-300 active:scale-95 transition-transform">Clear Response</button>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => onAnswer(currentQuestionIndex, '', 'review')} className="bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 transition-transform hover:scale-105 active:scale-100">Mark for Review & Next</button>
                    <button onClick={() => onAnswer(currentQuestionIndex, '', 'save')} className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-transform hover:scale-105 active:scale-100">Save & Next</button>
                </div>
                <div>
                    <button onClick={onSubmit} className="bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-transform hover:scale-105 active:scale-100">Submit Test</button>
                </div>
            </footer>
        </div>
    );
});

const SubmitModal = React.memo(({ summary, onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-slate-800">Confirm Submission</h2>
            <p className="mt-4 text-slate-600">Are you sure you want to submit the test?</p>
            <div className="mt-6 bg-slate-100 p-4 rounded-lg grid grid-cols-3 gap-2 text-center">
                <div><p className="text-2xl font-bold text-green-600">{summary.answered}</p><p className="text-sm text-slate-500">Answered</p></div>
                <div><p className="text-2xl font-bold text-purple-600">{summary.review}</p><p className="text-sm text-slate-500">For Review</p></div>
                <div><p className="text-2xl font-bold text-slate-500">{summary.notAnswered}</p><p className="text-sm text-slate-500">Not Answered</p></div>
            </div>
            <div className="mt-8 flex justify-center gap-4">
                <button onClick={onCancel} className="px-8 py-3 bg-slate-200 text-slate-800 font-bold rounded-lg hover:bg-slate-300 transition-transform active:scale-95">Cancel</button>
                <button onClick={onConfirm} className="px-8 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-transform active:scale-95">Submit</button>
            </div>
        </div>
    </div>
));

const ScoreCircle = React.memo(({ percentage }) => {
    const sqSize = 160;
    const strokeWidth = 12;
    const radius = (sqSize - strokeWidth) / 2;
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - (dashArray * percentage) / 100;

    const scoreColor = useMemo(() => {
        if (percentage < 40) return 'text-red-500';
        if (percentage < 75) return 'text-amber-500';
        return 'text-green-500';
    }, [percentage]);

    return (
        <svg width={sqSize} height={sqSize} viewBox={viewBox} className="transform -rotate-90">
            <circle className="text-slate-200" cx={sqSize / 2} cy={sqSize / 2} r={radius} strokeWidth={`${strokeWidth}px`} fill="none" stroke="currentColor" />
            <circle className={`${scoreColor} transition-all duration-1000 ease-out`} cx={sqSize / 2} cy={sqSize / 2} r={radius} strokeWidth={`${strokeWidth}px`} fill="none" strokeLinecap="round" stroke="currentColor" style={{ strokeDasharray: dashArray, strokeDashoffset: dashOffset }} />
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className={`text-4xl font-bold fill-current ${scoreColor} transform rotate-90`}>
                {`${percentage}%`}
            </text>
        </svg>
    );
});

const StatCard = React.memo(({ label, value, icon }) => (
    <div className="bg-slate-100/70 p-4 rounded-lg text-center">
        <div className="flex items-center justify-center text-slate-500">{icon}</div>
        <p className="text-2xl font-bold text-slate-800 mt-2">{value}</p>
        <p className="text-sm text-slate-500">{label}</p>
    </div>
));

const ResultsScreen = React.memo(({ results, stats, onRestart, onNewSheet }) => {
    const [activeTab, setActiveTab] = useState('summary');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (window.confetti) {
                window.confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
            }
        };

        return () => { if(document.body.contains(script)) document.body.removeChild(script); };
    }, []);

    const { correctAnswers, totalQuestions, scorePercentage, attemptedCount } = useMemo(() => {
        const correct = results.filter(r => r.isCorrect).length;
        const total = results.length;
        const attempted = results.filter(r => r.userAnswer).length;
        const score = total > 0 ? Math.round((correct / total) * 100) : 0;
        return { correctAnswers: correct, totalQuestions: total, scorePercentage: score, attemptedCount: attempted };
    }, [results]);

    const performanceTier = useMemo(() => {
        if (scorePercentage >= 90) return { name: "Master", color: "text-green-500" };
        if (scorePercentage >= 75) return { name: "Expert", color: "text-blue-500" };
        if (scorePercentage >= 50) return { name: "Practitioner", color: "text-amber-500" };
        return { name: "Novice", color: "text-red-500" };
    }, [scorePercentage]);
    
    const filteredResults = useMemo(() => {
        if (filter === 'correct') return results.filter(r => r.isCorrect);
        if (filter === 'incorrect') return results.filter(r => !r.isCorrect && r.userAnswer);
        return results;
    }, [results, filter]);
    
    const timeTakenFormatted = useMemo(() => {
        if (!stats || !stats.timeTaken) return "00:00";
        const mins = Math.floor(stats.timeTaken / 60).toString().padStart(2, '0');
        const secs = (stats.timeTaken % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    }, [stats]);

    const questionsPerMinute = useMemo(() => {
        if (!stats || !stats.timeTaken || stats.timeTaken < 1 || attemptedCount === 0) return "0.0";
        return ((attemptedCount / stats.timeTaken) * 60).toFixed(1);
    }, [stats, attemptedCount]);

    return (
        <div className="w-full max-w-4xl mx-auto p-4 md:p-8 animate-fade-in">
            <div className="bg-white/60 backdrop-blur-xl p-6 md:p-10 rounded-2xl shadow-xl border border-slate-200/50 text-center">
                <h2 className="text-4xl font-bold text-slate-800">Test Complete!</h2>
                <div className="mt-6 border-b border-slate-300/80 flex justify-center">
                    <button onClick={() => setActiveTab('summary')} className={`px-6 py-3 text-lg font-semibold transition-colors ${activeTab === 'summary' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}>Summary</button>
                    <button onClick={() => setActiveTab('review')} className={`px-6 py-3 text-lg font-semibold transition-colors ${activeTab === 'review' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}>Detailed Review</button>
                </div>

                {activeTab === 'summary' && (
                    <div className="animate-fade-in-up">
                        <div className="my-8 flex flex-col items-center justify-center">
                            <ScoreCircle percentage={scorePercentage} />
                             <p className="text-2xl font-bold mt-4 text-slate-700">You are a <span className={performanceTier.color}>{performanceTier.name}</span></p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatCard label="Correct" value={correctAnswers} icon={<CheckCircleIcon className="w-6 h-6 text-green-500"/>}/>
                            <StatCard label="Incorrect" value={attemptedCount - correctAnswers} icon={<XCircleIcon className="w-6 h-6 text-red-500"/>}/>
                            <StatCard label="Accuracy" value={`${Math.round(attemptedCount > 0 ? (correctAnswers/attemptedCount)*100 : 0)}%`} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>}/>
                            <StatCard label="Skipped" value={totalQuestions - attemptedCount} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"></path></svg>}/>
                            <StatCard label="Total Qs" value={totalQuestions} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>}/>
                             <StatCard label="Attempted" value={attemptedCount} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z"></path></svg>}/>
                            <StatCard label="Time Taken" value={timeTakenFormatted} icon={<ClockIcon className="w-6 h-6"/>} />
                            <StatCard label="QPM" value={questionsPerMinute} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>}/>
                        </div>
                    </div>
                )}

                {activeTab === 'review' && (
                     <div className="animate-fade-in-up">
                        <div className="my-6 flex justify-center gap-2">
                             <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-full font-semibold transition-colors ${filter==='all' ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>All</button>
                             <button onClick={() => setFilter('correct')} className={`px-4 py-2 rounded-full font-semibold transition-colors ${filter==='correct' ? 'bg-green-600 text-white' : 'bg-slate-200'}`}>Correct</button>
                             <button onClick={() => setFilter('incorrect')} className={`px-4 py-2 rounded-full font-semibold transition-colors ${filter==='incorrect' ? 'bg-red-600 text-white' : 'bg-slate-200'}`}>Incorrect</button>
                        </div>
                        <div className="text-left my-10 max-h-[50vh] overflow-y-auto pr-4">
                            <h3 className="text-2xl font-bold text-slate-800 text-center mb-6">Review Your Answers</h3>
                            {filteredResults.length > 0 ? filteredResults.map((result, index) => (
                                <div key={index} className={`p-4 rounded-lg border-l-4 mb-4 ${result.isCorrect ? 'bg-green-500/10 border-green-500' : 'bg-red-500/10 border-red-500'}`}>
                                    <p className="font-serif text-lg text-slate-800 mb-2"> <span className="font-sans font-bold text-slate-500 text-sm">Q:</span> {result.question.sentence}</p>
                                    
                                    {result.question.options.map((option, i) => {
                                        let optionStyle = "font-semibold";
                                        if(option === result.question.word) optionStyle += " text-green-700";
                                        if(option === result.userAnswer && !result.isCorrect) optionStyle += " text-red-700 line-through";
                                        return <p key={i} className={optionStyle}>
                                            <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span> {option}
                                            {option === result.question.word && ' (Correct Answer)'}
                                            {option === result.userAnswer && !result.isCorrect && ' (Your Answer)'}
                                        </p>
                                    })}
                                </div>
                            )) : <p className="text-center text-slate-500 mt-8">No items to show for this filter.</p>}
                        </div>
                     </div>
                )}
                
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 border-t border-slate-200/80 pt-6">
                    <button onClick={onRestart} className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"><RepeatIcon className="mr-3 h-5 w-5" />Take Another Test</button>
                    <button onClick={onNewSheet} className="inline-flex items-center justify-center px-8 py-3 border border-slate-300 text-base font-medium rounded-md shadow-sm text-slate-700 bg-white hover:bg-slate-50">Import New Sheet</button>
                </div>
            </div>
             <footer className="mt-12 text-center text-slate-500 text-sm">
                <p>Made by Shahid Aktar Mir</p>
            </footer>
        </div>
    );
});


// --- System Architecture: Web Worker for background processing ---
const workerScript = `
    const parseWordFromCell = (cellValue) => { if (!cellValue) return ''; const cellString = String(cellValue).trim(); const parenthesisIndex = cellString.indexOf('('); return parenthesisIndex > 0 ? cellString.substring(0, parenthesisIndex).trim() : cellString; };
    const parseRepeatCount = (cellValue) => { if (!cellValue) return 0; const match = String(cellValue).trim().match(/^[0-9]+/); return match ? parseInt(match[0], 10) : 0; };

    self.onmessage = (e) => {
        const { file } = e.data;
        importScripts("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js");

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const bstr = event.target.result;
                const wb = self.XLSX.read(bstr, { type: 'binary' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const jsonData = self.XLSX.utils.sheet_to_json(ws, { header: 1 });
                if (jsonData.length < 5) throw new Error("Sheet has too few words for MCQs.");
                
                const allWords = [];
                const rows = jsonData.slice(1);
                rows.forEach(row => {
                    if (!row || !row[1] || !row[2]) return;
                    const parsedWord = parseWordFromCell(row[2]);
                    if (!parsedWord) return;
                    const wordObject = { sentence: String(row[1]).trim(), word: parsedWord, fullWordInfo: String(row[2]).trim(), repeatCount: parseRepeatCount(row[4]) };
                    allWords.push(wordObject);
                });
                if (allWords.length < 5) throw new Error("Not enough valid data.");
                
                self.postMessage({ status: 'success', data: allWords });

            } catch (err) {
                self.postMessage({ status: 'error', error: err.message });
            }
        };
        reader.readAsBinaryString(file);
    };
`;


// --- System Architecture: Fault Tolerance with Error Boundary ---
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.props.onError?.();
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="w-full max-w-2xl mx-auto text-center p-8">
                    <h1 className="text-4xl font-bold text-red-600">Something Went Wrong</h1>
                    <p className="text-lg text-slate-600 mt-4">An unexpected error occurred. Please refresh the page and try again.</p>
                    <button onClick={() => { this.props.onReset(); this.setState({ hasError: false }); }} className="mt-8 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg">Start Over</button>
                </div>
            );
        }
        return this.props.children;
    }
}

// **DSA 1: Trie (Prefix Tree)**
class TrieNode { constructor() { this.children = {}; this.isEndOfWord = false; this.word = null; } }
class Trie {
    constructor() { this.root = new TrieNode(); }
    insert(word) { let node = this.root; for (const char of word) { if (!node.children[char]) node.children[char] = new TrieNode(); node = node.children[char]; } node.isEndOfWord = true; node.word = word; }
    findAllWordsWithPrefix(prefix) { let node = this.root; for (const char of prefix) { if (!node.children[char]) return []; node = node.children[char]; } const words = []; this._collectAllWords(node, words); return words; }
    _collectAllWords(node, words) { if (node.isEndOfWord) words.push(node.word); for (const char in node.children) this._collectAllWords(node.children[char], words); }
}

// **DSA 2: Double Metaphone (simplified)**
const doubleMetaphone = (str) => { if (!str) return ['', '']; str = str.toUpperCase(); let primary = ''; const VOWELS = /[AEIOUY]/; if (VOWELS.test(str[0])) primary += 'A'; for (let i = 0; i < str.length; i++) { let char = str[i]; if (char === str[i-1] && char !== 'C') continue; switch (char) { case 'B': primary += 'P'; break; case 'C': primary += (str[i+1] === 'H' || str[i+1] === 'S') ? 'X' : 'K'; break; case 'F': case 'J': case 'L': case 'M': case 'N': case 'R': primary += char; break; default: break; } } return [primary, primary]; };

// **DSA 3: Levenshtein Distance**
const levenshteinDistance = (a, b) => { const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null)); for (let i = 0; i <= a.length; i += 1) { matrix[0][i] = i; } for (let j = 0; j <= b.length; j += 1) { matrix[j][0] = j; } for (let j = 1; j <= b.length; j += 1) { for (let i = 1; i <= a.length; i += 1) { const cost = a[i - 1] === b[j - 1] ? 0 : 1; matrix[j][i] = Math.min(matrix[j][i - 1] + 1, matrix[j - 1][i] + 1, matrix[j - 1][i - 1] + cost); } } return matrix[b.length][a.length]; };

// --- Main App Component ---

// **System Architecture: State Machine with useReducer**
const initialState = {
    appState: 'import', // 'import', 'selectMode', 'test', 'results'
    wordData: { all: [], mostAsked: [], trie: new Trie(), phoneticMap: new Map(), difficultyScores: new Map() },
    testData: { questions: [], currentQuestionIndex: 0, timeLeft: 0, initialTime: 0 },
    error: '',
    isProcessing: false,
    showSubmitModal: false,
};

function appReducer(state, action) {
    switch (action.type) {
        case 'START_PROCESSING':
            return { ...state, isProcessing: true, error: '' };
        case 'PROCESSING_SUCCESS':
            return { ...state, isProcessing: false, appState: 'selectMode', wordData: action.payload, error: '' };
        case 'PROCESSING_ERROR':
            return { ...state, isProcessing: false, error: action.payload };
        case 'START_TEST':
            const initialTime = action.payload.length * 60;
            return { ...state, appState: 'test', testData: { questions: action.payload, currentQuestionIndex: 0, timeLeft: initialTime, initialTime }, error: '' };
        case 'SET_TEST_DATA':
             return { ...state, testData: action.payload };
        case 'DECREMENT_TIMER':
            if (state.appState !== 'test') return state; 
            return { ...state, testData: {...state.testData, timeLeft: state.testData.timeLeft - 1 }};
        case 'SUBMIT_TEST':
            return { ...state, appState: 'results', showSubmitModal: false };
        case 'SHOW_SUBMIT_MODAL':
            return { ...state, showSubmitModal: true };
        case 'HIDE_SUBMIT_MODAL':
             return { ...state, showSubmitModal: false };
        case 'GO_TO_SELECT_MODE':
            return { ...state, appState: 'selectMode' };
        case 'RESET':
            return initialState;
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export default function App() {
    const [state, dispatch] = useReducer(appReducer, initialState);
    const { appState, wordData, testData, error, isProcessing, showSubmitModal } = state;

    const workerRef = useRef(null);
    const timerRef = useRef(null);
    
    useEffect(() => {
        const workerBlob = new Blob([workerScript], { type: 'application/javascript' });
        const workerUrl = URL.createObjectURL(workerBlob);
        workerRef.current = new Worker(workerUrl);

        workerRef.current.onmessage = (e) => {
            const { status, data, error } = e.data;
            if (status === 'success') {
                const allWords = data;
                const newTrie = new Trie();
                const newPhoneticMap = new Map();
                const newDifficultyScores = new Map();

                allWords.forEach(wordObj => {
                    newTrie.insert(wordObj.word);
                    const [primaryCode] = doubleMetaphone(wordObj.word);
                    if(primaryCode) {
                        if (!newPhoneticMap.has(primaryCode)) newPhoneticMap.set(primaryCode, []);
                        newPhoneticMap.get(primaryCode).push(wordObj.word);
                    }
                });

                allWords.forEach(wordObj => {
                    let score = 0;
                    const phoneticSiblings = (newPhoneticMap.get(doubleMetaphone(wordObj.word)[0]) || []).length - 1;
                    score += phoneticSiblings * 2; 
                    score += wordObj.word.length / 5; 
                    newDifficultyScores.set(wordObj.word, score);
                });

                dispatch({ type: 'PROCESSING_SUCCESS', payload: { 
                    all: allWords, 
                    mostAsked: allWords.filter(item => item.repeatCount > 0),
                    trie: newTrie, 
                    phoneticMap: newPhoneticMap,
                    difficultyScores: newDifficultyScores,
                }});
            } else {
                dispatch({ type: 'PROCESSING_ERROR', payload: error });
            }
        };

        return () => { workerRef.current.terminate(); };
    }, []);

    useEffect(() => {
        clearInterval(timerRef.current);
        if (appState === 'test' && testData.timeLeft > 0) {
            timerRef.current = setInterval(() => { dispatch({ type: 'DECREMENT_TIMER' }); }, 1000);
        } else if (appState === 'test' && testData.timeLeft <= 0) {
             dispatch({ type: 'SUBMIT_TEST' });
        }
        return () => clearInterval(timerRef.current);
    }, [appState, testData.timeLeft]);

    const handleFileUpload = useCallback((e) => {
        const file = e.target.files[0];
        if (!file) return;
        dispatch({ type: 'START_PROCESSING' });
        workerRef.current.postMessage({ file });
    }, []);

    const generateMCQOptions = useCallback((correctAnswer) => {
        const { all: allWords, trie, phoneticMap, difficultyScores } = wordData;
        const distractors = new Set();
        const correctWord = correctAnswer.word.toLowerCase();

        const difficulty = difficultyScores.get(correctAnswer.word) || 0;

        if(difficulty > 5) {
            const [primaryCode] = doubleMetaphone(correctWord);
            const phoneticCandidates = phoneticMap.get(primaryCode) || [];
            phoneticCandidates.forEach(candidate => {
                if (distractors.size < 3 && candidate.toLowerCase() !== correctWord) distractors.add(candidate);
            });
        }
        
        if (distractors.size < 3) {
            allWords.map(item => ({ word: item.word, distance: levenshteinDistance(correctWord, item.word.toLowerCase()) })).filter(item => item.distance > 0 && item.distance <= 2).sort((a, b) => a.distance - b.distance).forEach(item => { if(distractors.size < 3 && !distractors.has(item.word) && item.word.toLowerCase() !== correctWord) distractors.add(item.word); });
        }

        if (distractors.size < 3) {
            const sameLetterWords = trie.findAllWordsWithPrefix(correctWord.charAt(0)); sameLetterWords.sort(() => Math.random() - 0.5).forEach(word => { if (distractors.size < 3 && !distractors.has(word) && word.toLowerCase() !== correctWord) distractors.add(word); });
        }
        
        const randomPool = [...allWords].sort(() => Math.random() - 0.5);
        while (distractors.size < 3) { const randomWord = randomPool.pop()?.word; if (randomWord && randomWord.toLowerCase() !== correctWord && !distractors.has(randomWord)) { distractors.add(randomWord); } if(randomPool.length === 0) break; }
        
        const options = Array.from(distractors); options.push(correctAnswer.word); return options.sort(() => Math.random() - 0.5);
    }, [wordData]);

    const startTest = useCallback((questions) => {
        if (questions.length < 1) {
             dispatch({ type: 'PROCESSING_ERROR', payload: "No questions found for this selection. Please try another." });
             return;
        }
        if (questions.length > 0 && wordData.all.length < 4) {
             dispatch({ type: 'PROCESSING_ERROR', payload: "Your sheet needs at least 4 words in total to generate distractors." });
             return;
        }

        questions.sort((a, b) => (wordData.difficultyScores.get(b.word) || 0) - (wordData.difficultyScores.get(a.word) || 0));

        const questionsWithMCQs = questions.map(q => ({ ...q, status: 'not-answered', userAnswer: '', options: generateMCQOptions(q) }));
        dispatch({ type: 'START_TEST', payload: questionsWithMCQs });
    }, [generateMCQOptions, wordData]);

    const handleSelectLetter = useCallback((letter) => {
        const filtered = wordData.all.filter(item => item.word.charAt(0).toUpperCase() === letter);
        startTest(filtered);
    }, [wordData.all, startTest]);

    const handleStartFullMock = useCallback(() => {
        startTest([...wordData.mostAsked]);
    }, [wordData.mostAsked, startTest]);
    
    const handleAnswerAction = useCallback((index, option, action) => {
        const newQuestions = [...testData.questions];
        const currentQ = { ...newQuestions[index] };
        let nextIndex = testData.currentQuestionIndex;
        switch(action) {
            case 'select_option': currentQ.userAnswer = option; currentQ.status = option ? 'answered' : 'not-answered'; break;
            case 'save': nextIndex = Math.min(index + 1, newQuestions.length - 1); break;
            case 'review': currentQ.status = 'review'; nextIndex = Math.min(index + 1, newQuestions.length - 1); break;
            case 'clear': currentQ.userAnswer = ''; currentQ.status = 'not-answered'; break;
            case 'navigate': nextIndex = index; break;
            default: break;
        }
        newQuestions[index] = currentQ;
        dispatch({ type: 'SET_TEST_DATA', payload: { ...testData, questions: newQuestions, currentQuestionIndex: nextIndex } });
    }, [testData]);
    
    const availableLetters = useMemo(() => Array.from(new Set(wordData.all.map(item => item.word.charAt(0).toUpperCase()))).sort(), [wordData.all]);
    const finalResults = useMemo(() => { if (appState !== 'results') return []; return testData.questions.map(q => ({ question: q, userAnswer: q.userAnswer, isCorrect: q.word.toLowerCase() === (q.userAnswer || '').toLowerCase() })); }, [appState, testData.questions]);
    const submissionSummary = useMemo(() => ({ answered: testData.questions.filter(q => q.status === 'answered').length, review: testData.questions.filter(q => q.status === 'review').length, notAnswered: testData.questions.filter(q => q.status === 'not-answered').length }), [testData.questions]);
    const testStats = useMemo(() => ({ timeTaken: testData.initialTime - testData.timeLeft }), [testData.initialTime, testData.timeLeft]);
    
    const renderContent = () => {
        switch (appState) {
            case 'import': return <ImportScreen onFileUpload={handleFileUpload} error={error} isProcessing={isProcessing} />;
            case 'selectMode': return <ModeSelectionScreen availableLetters={availableLetters} onSelectLetter={handleSelectLetter} onStartFullMock={handleStartFullMock} onReset={() => dispatch({ type: 'RESET' })} mostAskedCount={wordData.mostAsked.length} error={error} />;
            case 'test': return <TestScreen testData={testData} onAnswer={handleAnswerAction} onSubmit={() => dispatch({ type: 'SHOW_SUBMIT_MODAL' })} />;
            case 'results': return <ResultsScreen results={finalResults} stats={testStats} onRestart={() => dispatch({type: 'GO_TO_SELECT_MODE'})} onNewSheet={() => dispatch({ type: 'RESET' })} />;
            default: return <ImportScreen onFileUpload={handleFileUpload} error={error} isProcessing={isProcessing} />;
        }
    };

    return (
        <main className="bg-gradient-to-br from-slate-50 to-slate-200 min-h-screen w-full flex items-center justify-center font-sans transition-colors duration-500 relative">
            <ErrorBoundary onReset={() => dispatch({ type: 'RESET' })}>
                {renderContent()}
                {showSubmitModal && <SubmitModal summary={submissionSummary} onConfirm={() => dispatch({ type: 'SUBMIT_TEST' })} onCancel={() => dispatch({ type: 'HIDE_SUBMIT_MODAL' })} />}
            </ErrorBoundary>
             <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
                body { font-family: 'Inter', sans-serif; }
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes stagger-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
                .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
                .animate-stagger-in { animation: stagger-in 0.5s ease-out forwards; animation-delay: calc(var(--stagger-order) * 100ms); opacity:0; animation-fill-mode:forwards; }
            `}</style>
        </main>
    );
}

