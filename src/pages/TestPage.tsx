import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useTimer } from '@/hooks/useTimer';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { 
  updateQuestion, 
  setCurrentQuestionIndex, 
  showSubmitModal, 
  hideSubmitModal, 
  submitTest 
} from '@/store/slices/testSlice';
import { setAppState } from '@/store/slices/appSlice';
import { KEYBOARD_SHORTCUTS } from '@/utils/constants';

import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import QuestionPalette from '@/components/test/QuestionPalette';
import SubmitModal from '@/components/test/SubmitModal';

const TestPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { questions, currentQuestionIndex, showSubmitModal: showModal } = useAppSelector(state => state.test);
  const { timeLeft, formatTime, getTimerColorClass } = useTimer();

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (questions.length === 0) {
      navigate('/import');
    }
  }, [questions.length, navigate]);

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: KEYBOARD_SHORTCUTS.NEXT_QUESTION,
      callback: () => {
        if (currentQuestionIndex < questions.length - 1) {
          dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
        }
      },
    },
    {
      key: KEYBOARD_SHORTCUTS.PREV_QUESTION,
      callback: () => {
        if (currentQuestionIndex > 0) {
          dispatch(setCurrentQuestionIndex(currentQuestionIndex - 1));
        }
      },
    },
    {
      key: KEYBOARD_SHORTCUTS.MARK_REVIEW,
      callback: () => handleMarkForReview(),
    },
    {
      key: KEYBOARD_SHORTCUTS.CLEAR_ANSWER,
      callback: () => handleClearAnswer(),
    },
    {
      key: KEYBOARD_SHORTCUTS.OPTION_A,
      callback: () => handleSelectOption(0),
    },
    {
      key: KEYBOARD_SHORTCUTS.OPTION_B,
      callback: () => handleSelectOption(1),
    },
    {
      key: KEYBOARD_SHORTCUTS.OPTION_C,
      callback: () => handleSelectOption(2),
    },
    {
      key: KEYBOARD_SHORTCUTS.OPTION_D,
      callback: () => handleSelectOption(3),
    },
  ]);

  const handleSelectOption = (optionIndex: number) => {
    if (!currentQuestion || optionIndex >= currentQuestion.options.length) return;
    
    const option = currentQuestion.options[optionIndex];
    dispatch(updateQuestion({
      index: currentQuestionIndex,
      question: {
        userAnswer: option,
        status: 'answered',
      },
    }));
  };

  const handleAnswerAction = (action: string) => {
    let nextIndex = currentQuestionIndex;
    let questionUpdate: any = {};

    switch (action) {
      case 'save':
        nextIndex = Math.min(currentQuestionIndex + 1, questions.length - 1);
        break;
      case 'review':
        questionUpdate.status = 'review';
        nextIndex = Math.min(currentQuestionIndex + 1, questions.length - 1);
        break;
      case 'clear':
        questionUpdate = { userAnswer: '', status: 'not-answered' };
        break;
    }

    if (Object.keys(questionUpdate).length > 0) {
      dispatch(updateQuestion({
        index: currentQuestionIndex,
        question: questionUpdate,
      }));
    }

    if (nextIndex !== currentQuestionIndex) {
      dispatch(setCurrentQuestionIndex(nextIndex));
    }
  };

  const handleMarkForReview = () => handleAnswerAction('review');
  const handleSaveAndNext = () => handleAnswerAction('save');
  const handleClearAnswer = () => handleAnswerAction('clear');

  const handleSubmitTest = () => {
    dispatch(showSubmitModal());
  };

  const handleConfirmSubmit = () => {
    dispatch(submitTest());
    dispatch(setAppState('results'));
    navigate('/results');
  };

  const handleCancelSubmit = () => {
    dispatch(hideSubmitModal());
  };

  const submissionSummary = {
    answered: questions.filter(q => q.status === 'answered').length,
    review: questions.filter(q => q.status === 'review').length,
    notAnswered: questions.filter(q => q.status === 'not-answered').length,
  };

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto h-screen flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card shadow-md rounded-lg p-4 flex justify-between items-center mb-4 border border-slate-200/50"
      >
        <h1 className="text-xl font-bold text-primary-700">
          One Word Substitution Mock Test
        </h1>
        
        <div className={`flex items-center font-bold text-xl p-3 rounded-lg ${getTimerColorClass(timeLeft)}`}>
          <Clock className="mr-2 h-6 w-6" />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0">
        {/* Question Area */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <Card className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-slate-800">
                Question {currentQuestionIndex + 1} of {questions.length}
              </h2>
              
              <div className="flex items-center space-x-2 text-sm">
                {currentQuestion.status === 'answered' && (
                  <span className="flex items-center text-success-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Answered
                  </span>
                )}
                {currentQuestion.status === 'review' && (
                  <span className="flex items-center text-warning-600">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    For Review
                  </span>
                )}
              </div>
            </div>

            <div className="flex-grow mb-6 overflow-y-auto">
              <p className="text-sm text-slate-500 mb-2">Definition:</p>
              <p className="text-xl md:text-2xl font-serif text-slate-900 leading-relaxed">
                {currentQuestion.sentence}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectOption(index)}
                  className={`p-4 rounded-lg text-left text-lg font-semibold transition-all duration-200 border-2 ${
                    currentQuestion.userAnswer === option
                      ? 'bg-primary-600 text-white border-primary-700 ring-2 ring-primary-500 ring-offset-2'
                      : 'bg-white/70 text-slate-800 border-slate-300 hover:bg-primary-50 hover:border-primary-400'
                  }`}
                >
                  <span className="font-bold mr-3 text-primary-600">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </motion.button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Question Palette */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <QuestionPalette
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            onQuestionSelect={(index) => dispatch(setCurrentQuestionIndex(index))}
          />
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card shadow-md rounded-lg p-4 mt-4 border border-slate-200/50"
      >
        <div className="flex flex-wrap justify-between items-center gap-4">
          <Button
            onClick={handleClearAnswer}
            variant="secondary"
            size="sm"
          >
            Clear Response
          </Button>

          <div className="flex gap-3">
            <Button
              onClick={handleMarkForReview}
              variant="warning"
              size="sm"
            >
              Mark for Review & Next
            </Button>
            
            <Button
              onClick={handleSaveAndNext}
              variant="success"
              size="sm"
            >
              Save & Next
            </Button>
          </div>

          <Button
            onClick={handleSubmitTest}
            variant="error"
            size="sm"
          >
            Submit Test
          </Button>
        </div>
      </motion.div>

      {/* Submit Modal */}
      {showModal && (
        <SubmitModal
          summary={submissionSummary}
          onConfirm={handleConfirmSubmit}
          onCancel={handleCancelSubmit}
        />
      )}
    </div>
  );
};

export default TestPage;