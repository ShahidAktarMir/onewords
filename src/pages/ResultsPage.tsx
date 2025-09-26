import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { RotateCcw, FileText, Trophy, Clock, Target, Zap } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setAppState, reset } from '@/store/slices/appSlice';
import { resetTest } from '@/store/slices/testSlice';
import { getPerformanceTier, formatTime } from '@/utils/helpers';

import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import ScoreCircle from '@/components/results/ScoreCircle';
import StatCard from '@/components/results/StatCard';
import DetailedReview from '@/components/results/DetailedReview';

const ResultsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { results, stats } = useAppSelector(state => state.test);
  const [activeTab, setActiveTab] = useState<'summary' | 'review'>('summary');

  useEffect(() => {
    // Confetti effect
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.confetti && stats && stats.scorePercentage >= 75) {
        window.confetti({ 
          particleCount: 150, 
          spread: 90, 
          origin: { y: 0.6 } 
        });
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [stats]);

  const handleRestart = () => {
    dispatch(resetTest());
    dispatch(setAppState('selectMode'));
    navigate('/select-mode');
  };

  const handleNewSheet = () => {
    dispatch(reset());
    navigate('/import');
  };

  if (!stats || !results) {
    return <div>Loading results...</div>;
  }

  const performanceTier = getPerformanceTier(stats.scorePercentage);
  const accuracy = stats.attemptedCount > 0 ? Math.round((stats.correctAnswers / stats.attemptedCount) * 100) : 0;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-6">
              Test Complete! 🎉
            </h2>
          </motion.div>

          {/* Tab Navigation */}
          <div className="border-b border-slate-300/80 flex justify-center mb-8">
            <button
              onClick={() => setActiveTab('summary')}
              className={`px-6 py-3 text-lg font-semibold transition-colors ${
                activeTab === 'summary'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setActiveTab('review')}
              className={`px-6 py-3 text-lg font-semibold transition-colors ${
                activeTab === 'review'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Detailed Review
            </button>
          </div>

          {activeTab === 'summary' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Score Circle */}
              <div className="flex flex-col items-center justify-center mb-8">
                <ScoreCircle percentage={stats.scorePercentage} />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-2xl font-bold mt-4 text-slate-700"
                >
                  You are a{' '}
                  <span className={performanceTier.color}>
                    {performanceTier.name}
                  </span>
                </motion.p>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatCard
                  label="Correct"
                  value={stats.correctAnswers}
                  icon={<Trophy className="w-6 h-6 text-success-500" />}
                />
                <StatCard
                  label="Incorrect"
                  value={stats.attemptedCount - stats.correctAnswers}
                  icon={<Target className="w-6 h-6 text-error-500" />}
                />
                <StatCard
                  label="Accuracy"
                  value={`${accuracy}%`}
                  icon={<Zap className="w-6 h-6 text-warning-500" />}
                />
                <StatCard
                  label="Skipped"
                  value={stats.totalQuestions - stats.attemptedCount}
                  icon={<FileText className="w-6 h-6 text-slate-500" />}
                />
                <StatCard
                  label="Total Questions"
                  value={stats.totalQuestions}
                  icon={<FileText className="w-6 h-6 text-primary-500" />}
                />
                <StatCard
                  label="Attempted"
                  value={stats.attemptedCount}
                  icon={<Target className="w-6 h-6 text-primary-500" />}
                />
                <StatCard
                  label="Time Taken"
                  value={formatTime(stats.timeTaken)}
                  icon={<Clock className="w-6 h-6 text-slate-600" />}
                />
                <StatCard
                  label="QPM"
                  value={stats.questionsPerMinute}
                  icon={<Zap className="w-6 h-6 text-primary-500" />}
                />
              </div>
            </motion.div>
          )}

          {activeTab === 'review' && (
            <DetailedReview results={results} />
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mt-8 pt-6 border-t border-slate-200/80"
          >
            <Button
              onClick={handleRestart}
              variant="primary"
              icon={<RotateCcw className="w-5 h-5" />}
            >
              Take Another Test
            </Button>
            
            <Button
              onClick={handleNewSheet}
              variant="secondary"
              icon={<FileText className="w-5 h-5" />}
            >
              Import New Sheet
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ResultsPage;