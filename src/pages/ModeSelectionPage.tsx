import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Star, BookOpen, RotateCcw } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setAppState, reset } from '@/store/slices/appSlice';
import { startTest } from '@/store/slices/testSlice';
import { fileProcessorService } from '@/services/fileProcessor';

import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

const ModeSelectionPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { wordData } = useAppSelector(state => state.app);

  const availableLetters = useMemo(() => {
    if (!wordData) return [];
    return Array.from(new Set(wordData.all.map(item => item.word.charAt(0).toUpperCase()))).sort();
  }, [wordData]);

  const mostAskedCount = wordData?.mostAsked.length || 0;

  const handleSelectLetter = (letter: string) => {
    if (!wordData) return;
    
    const filtered = wordData.all.filter(item => item.word.charAt(0).toUpperCase() === letter);
    const questionsWithMCQs = filtered
      .sort((a, b) => (wordData.difficultyScores.get(b.word) || 0) - (wordData.difficultyScores.get(a.word) || 0))
      .map(q => ({
        ...q,
        status: 'not-answered' as const,
        userAnswer: '',
        options: fileProcessorService.generateMCQOptions(q, wordData.all, wordData.trie, wordData.phoneticMap, wordData.difficultyScores),
      }));

    dispatch(startTest({ questions: questionsWithMCQs, mode: 'letter', letter }));
    dispatch(setAppState('test'));
    navigate('/test');
  };

  const handleStartFullMock = () => {
    if (!wordData || mostAskedCount < 1) return;
    
    const questionsWithMCQs = [...wordData.mostAsked]
      .sort((a, b) => (wordData.difficultyScores.get(b.word) || 0) - (wordData.difficultyScores.get(a.word) || 0))
      .map(q => ({
        ...q,
        status: 'not-answered' as const,
        userAnswer: '',
        options: fileProcessorService.generateMCQOptions(q, wordData.all, wordData.trie, wordData.phoneticMap, wordData.difficultyScores),
      }));

    dispatch(startTest({ questions: questionsWithMCQs, mode: 'mostAsked' }));
    dispatch(setAppState('test'));
    navigate('/test');
  };

  const handleReset = () => {
    dispatch(reset());
    navigate('/import');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-slate-800">Select Test Mode</h2>
        <p className="text-slate-600 mt-2">Choose how you want to practice</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card hover className="h-full flex flex-col">
            <div className="text-center mb-6">
              <Star className="w-12 h-12 text-warning-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                Most Asked Questions
              </h3>
              <p className="text-slate-600 flex-grow">
                A focused test on all questions previously asked in SSC exams ({mostAskedCount} found).
              </p>
            </div>
            
            <div className="mt-auto">
              <Button
                onClick={handleStartFullMock}
                disabled={mostAskedCount < 1}
                variant="warning"
                fullWidth
                icon={<Star className="w-5 h-5" />}
              >
                Start Full Test
              </Button>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="h-full">
            <div className="text-center mb-6">
              <BookOpen className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                Practice by Letter
              </h3>
              <p className="text-slate-600 mb-6">
                Take a full test for a specific letter.
              </p>
            </div>
            
            <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 gap-2">
              {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter, index) => (
                <motion.div
                  key={letter}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.02 }}
                >
                  <button
                    onClick={() => handleSelectLetter(letter)}
                    disabled={!availableLetters.includes(letter)}
                    className={`h-12 w-12 rounded-lg text-xl font-bold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary-500/50 ${
                      !availableLetters.includes(letter)
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-white/80 text-primary-700 hover:bg-primary-600 hover:text-white hover:scale-110 active:scale-105 shadow-md hover:shadow-lg'
                    }`}
                  >
                    {letter}
                  </button>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center"
      >
        <Button
          onClick={handleReset}
          variant="secondary"
          icon={<RotateCcw className="w-5 h-5" />}
        >
          Import New Sheet
        </Button>
      </motion.div>
    </div>
  );
};

export default ModeSelectionPage;