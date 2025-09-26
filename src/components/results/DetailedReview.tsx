import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Filter } from 'lucide-react';
import { TestResult } from '@/types';
import Button from '@/components/common/Button';

interface DetailedReviewProps {
  results: TestResult[];
}

type FilterType = 'all' | 'correct' | 'incorrect' | 'unanswered';

const DetailedReview: React.FC<DetailedReviewProps> = ({ results }) => {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredResults = useMemo(() => {
    switch (filter) {
      case 'correct':
        return results.filter(r => r.isCorrect);
      case 'incorrect':
        return results.filter(r => !r.isCorrect && r.userAnswer);
      case 'unanswered':
        return results.filter(r => !r.userAnswer);
      default:
        return results;
    }
  }, [results, filter]);

  const filterButtons: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: results.length },
    { key: 'correct', label: 'Correct', count: results.filter(r => r.isCorrect).length },
    { key: 'incorrect', label: 'Incorrect', count: results.filter(r => !r.isCorrect && r.userAnswer).length },
    { key: 'unanswered', label: 'Unanswered', count: results.filter(r => !r.userAnswer).length },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {filterButtons.map(({ key, label, count }) => (
          <Button
            key={key}
            onClick={() => setFilter(key)}
            variant={filter === key ? 'primary' : 'secondary'}
            size="sm"
            className="text-sm"
          >
            {label} ({count})
          </Button>
        ))}
      </div>

      {/* Results List */}
      <div className="max-h-96 overflow-y-auto pr-2 scrollbar-hide">
        {filteredResults.length > 0 ? (
          <div className="space-y-4">
            {filteredResults.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-lg border-l-4 text-left ${
                  result.isCorrect
                    ? 'bg-success-50 border-success-500'
                    : result.userAnswer
                    ? 'bg-error-50 border-error-500'
                    : 'bg-slate-50 border-slate-400'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="font-serif text-lg text-slate-800 flex-1">
                    <span className="font-sans font-bold text-slate-500 text-sm mr-2">
                      Q{index + 1}:
                    </span>
                    {result.question.sentence}
                  </p>
                  
                  <div className="ml-4 flex-shrink-0">
                    {result.isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-success-600" />
                    ) : result.userAnswer ? (
                      <XCircle className="w-6 h-6 text-error-600" />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-slate-400" />
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  {result.question.options.map((option, optionIndex) => {
                    const isCorrect = option === result.question.word;
                    const isUserAnswer = option === result.userAnswer;
                    
                    let optionClass = 'text-slate-600';
                    if (isCorrect) optionClass = 'text-success-700 font-semibold';
                    if (isUserAnswer && !isCorrect) optionClass = 'text-error-700 font-semibold line-through';
                    
                    return (
                      <p key={optionIndex} className={optionClass}>
                        <span className="font-bold mr-2">
                          {String.fromCharCode(65 + optionIndex)}.
                        </span>
                        {option}
                        {isCorrect && ' ✓ (Correct Answer)'}
                        {isUserAnswer && !isCorrect && ' ✗ (Your Answer)'}
                      </p>
                    );
                  })}
                  
                  {!result.userAnswer && (
                    <p className="text-slate-500 italic mt-2">
                      No answer provided
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Filter className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-500">
              No questions match the selected filter.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DetailedReview;