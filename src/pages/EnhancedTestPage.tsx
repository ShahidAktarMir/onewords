import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Flag,
  CheckCircle,
  LayoutGrid,
  X,
} from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useTimer } from '@/hooks/useTimer';
import {
  updateQuestion,
  setCurrentQuestionIndex,
  showSubmitModal,
  hideSubmitModal,
  submitTest,
} from '@/store/slices/testSlice';
import { setAppState } from '@/store/slices/appSlice';

import Button from '@/components/common/Button';
import EnhancedQuestionPalette from '@/components/test/EnhancedQuestionPalette';
import SubmitModal from '@/components/test/SubmitModal';

const EnhancedTestPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { questions, currentQuestionIndex, showSubmitModal: showModal } = useAppSelector(
    (state) => state.test
  );
  const { timeLeft, formatTime } = useTimer();

  const [visitedQuestions, setVisitedQuestions] = useState<Set<number>>(new Set([0]));
  const [showPalette, setShowPalette] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (questions.length === 0) {
      navigate('/import');
    }
  }, [questions.length, navigate]);

  useEffect(() => {
    setVisitedQuestions((prev) => new Set(prev).add(currentQuestionIndex));
  }, [currentQuestionIndex]);

  const handleSelectOption = useCallback(
    (option: string) => {
      const isCurrentlySelected = currentQuestion.userAnswer === option;

      dispatch(
        updateQuestion({
          index: currentQuestionIndex,
          question: {
            userAnswer: isCurrentlySelected ? '' : option,
            status: isCurrentlySelected ? 'not-answered' : 'answered',
          },
        })
      );
    },
    [dispatch, currentQuestionIndex, currentQuestion]
  );

  const handleMarkForReview = useCallback(() => {
    const isCurrentlyMarked = currentQuestion.status === 'review';

    dispatch(
      updateQuestion({
        index: currentQuestionIndex,
        question: {
          status: isCurrentlyMarked ? (currentQuestion.userAnswer ? 'answered' : 'not-answered') : 'review',
        },
      })
    );
  }, [dispatch, currentQuestionIndex, currentQuestion]);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      dispatch(setCurrentQuestionIndex(currentQuestionIndex - 1));
    }
  }, [dispatch, currentQuestionIndex]);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
    }
  }, [dispatch, currentQuestionIndex, questions.length]);

  const handleSubmit = useCallback(() => {
    dispatch(showSubmitModal());
  }, [dispatch]);

  const handleConfirmSubmit = useCallback(() => {
    dispatch(submitTest());
    dispatch(setAppState('results'));
    navigate('/results');
  }, [dispatch, navigate]);

  const handleCancelSubmit = useCallback(() => {
    dispatch(hideSubmitModal());
  }, [dispatch]);

  const stats = useMemo(() => {
    return {
      answered: questions.filter((q) => q.status === 'answered').length,
      review: questions.filter((q) => q.status === 'review').length,
      notAnswered: questions.filter((q) => q.status === 'not-answered').length,
    };
  }, [questions]);

  const progress = useMemo(() => {
    return ((stats.answered + stats.review) / questions.length) * 100;
  }, [stats.answered, stats.review, questions.length]);

  const isMarked = currentQuestion?.status === 'review';

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-4 py-3 lg:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-slate-800">One Word Substitution</h1>
              <p className="text-sm text-slate-500">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>

            <div className="md:hidden">
              <div className="text-sm font-semibold text-slate-700">
                Q{currentQuestionIndex + 1}/{questions.length}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-primary-50 px-3 py-2 rounded-lg border border-primary-200">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-semibold text-primary-700">{formatTime(timeLeft)}</span>
              </div>
            </div>

            <button
              onClick={() => setShowPalette(!showPalette)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle question palette"
            >
              {showPalette ? <X className="w-5 h-5" /> : <LayoutGrid className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-3">
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 lg:p-6">
          <div className="lg:col-span-3 flex flex-col gap-4 min-h-0">
            <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 p-6 lg:p-8 overflow-y-auto">
              <div className="mb-6">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                  Definition
                </p>
                <p className="text-2xl lg:text-3xl font-serif text-slate-900 leading-relaxed">
                  {currentQuestion.sentence}
                </p>
              </div>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = currentQuestion.userAnswer === option;
                  const optionLetter = String.fromCharCode(65 + index);

                  return (
                    <button
                      key={index}
                      onClick={() => handleSelectOption(option)}
                      className={`w-full text-left p-4 lg:p-5 rounded-xl border-2 transition-all duration-200 ${
                        isSelected
                          ? 'bg-primary-50 border-primary-500 ring-2 ring-primary-200'
                          : 'bg-white border-slate-200 hover:border-primary-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                            isSelected
                              ? 'bg-primary-500 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {optionLetter}
                        </div>
                        <span className={`text-base lg:text-lg font-medium ${
                          isSelected ? 'text-primary-900' : 'text-slate-700'
                        }`}>
                          {option}
                        </span>
                        {isSelected && (
                          <CheckCircle className="ml-auto w-5 h-5 text-primary-600 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-2">
                  <Button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    variant="secondary"
                    size="md"
                    icon={<ChevronLeft className="w-5 h-5" />}
                    className="px-4"
                  >
                    <span className="hidden sm:inline">Previous</span>
                  </Button>

                  <Button
                    onClick={handleNext}
                    disabled={currentQuestionIndex === questions.length - 1}
                    variant="primary"
                    size="md"
                    iconPosition="right"
                    icon={<ChevronRight className="w-5 h-5" />}
                    className="px-4"
                  >
                    <span className="hidden sm:inline">Next</span>
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleMarkForReview}
                    variant={isMarked ? 'warning' : 'secondary'}
                    size="md"
                    icon={<Flag className="w-4 h-4" />}
                    className="px-4"
                  >
                    {isMarked ? 'Unmark' : 'Mark'}
                  </Button>

                  <Button
                    onClick={handleSubmit}
                    variant="error"
                    size="md"
                    className="px-6"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${
              showPalette ? 'fixed' : 'hidden'
            } lg:relative lg:block inset-0 z-50 lg:z-auto bg-black/50 lg:bg-transparent`}
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowPalette(false);
            }}
          >
            <div
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl lg:rounded-xl shadow-xl lg:shadow-sm border-t lg:border border-slate-200 p-4 max-h-[70vh] lg:max-h-none overflow-y-auto lg:static"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="lg:hidden flex justify-between items-center mb-4 pb-3 border-b border-slate-200">
                <h2 className="font-bold text-slate-800">Questions</h2>
                <button
                  onClick={() => setShowPalette(false)}
                  className="p-1 hover:bg-slate-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <EnhancedQuestionPalette
                questions={questions}
                currentQuestionIndex={currentQuestionIndex}
                onQuestionSelect={(index) => {
                  dispatch(setCurrentQuestionIndex(index));
                  setShowPalette(false);
                }}
                visitedQuestions={visitedQuestions}
              />
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <SubmitModal summary={stats} onConfirm={handleConfirmSubmit} onCancel={handleCancelSubmit} />
      )}
    </div>
  );
};

export default EnhancedTestPage;
