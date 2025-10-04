import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { History, Trophy, Calendar, Clock, Target, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

import { useAuth } from '../contexts/AuthContext';
import { testResultsService, TestResult } from '../services/testResultsService';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { formatTime } from '../utils/helpers';

export const HistoryPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const userResults = testResultsService.getUserResults(user.id);
      setResults(userResults);
      setLoading(false);
    }
  }, [user]);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this test result?')) {
      const success = testResultsService.deleteResult(id);
      if (success) {
        setResults(results.filter((r) => r.id !== id));
        toast.success('Test result deleted');
      } else {
        toast.error('Failed to delete test result');
      }
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg">
              <History className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Test History</h1>
              <p className="text-slate-600">View your past test results</p>
            </div>
          </div>
          <Button onClick={() => navigate('/import')} variant="primary">
            Take New Test
          </Button>
        </div>

        {results.length === 0 ? (
          <Card className="text-center py-12">
            <History className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-slate-700 mb-2">No test history yet</h2>
            <p className="text-slate-500 mb-6">Take your first test to see your results here</p>
            <Button onClick={() => navigate('/import')} variant="primary">
              Start Your First Test
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {results.map((result) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Trophy className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800 capitalize">
                            {result.testMode} Test
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Calendar className="w-4 h-4" />
                            {formatDate(result.completedAt)}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-slate-500" />
                          <div>
                            <p className="text-xs text-slate-500">Score</p>
                            <p className={`text-lg font-bold ${getPerformanceColor(result.score)}`}>
                              {result.score.toFixed(1)}%
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-green-500" />
                          <div>
                            <p className="text-xs text-slate-500">Correct</p>
                            <p className="text-lg font-bold text-slate-700">
                              {result.correct}/{result.totalQuestions}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-blue-500" />
                          <div>
                            <p className="text-xs text-slate-500">Attempted</p>
                            <p className="text-lg font-bold text-slate-700">{result.attempted}</p>
                          </div>
                        </div>

                        {result.timeTaken && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-500" />
                            <div>
                              <p className="text-xs text-slate-500">Time</p>
                              <p className="text-lg font-bold text-slate-700">
                                {formatTime(result.timeTaken)}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleDelete(result.id)}
                        variant="secondary"
                        className="text-red-600 hover:bg-red-50"
                        icon={<Trash2 className="w-4 h-4" />}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};
