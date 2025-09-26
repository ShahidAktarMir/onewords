import React from 'react';
import { motion } from 'framer-motion';
import { Question } from '@/types';
import Card from '@/components/common/Card';

interface QuestionPaletteProps {
  questions: Question[];
  currentQuestionIndex: number;
  onQuestionSelect: (index: number) => void;
}

const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  questions,
  currentQuestionIndex,
  onQuestionSelect,
}) => {
  const getStatusClass = (question: Question, index: number) => {
    let baseClass = 'h-10 w-10 flex items-center justify-center font-bold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1';
    
    if (question.status === 'answered') {
      baseClass += ' bg-success-600 text-white hover:bg-success-700';
    } else if (question.status === 'review') {
      baseClass += ' bg-warning-600 text-white hover:bg-warning-700';
    } else {
      baseClass += ' bg-white/80 text-slate-700 hover:bg-slate-200/80 border border-slate-300';
    }
    
    if (index === currentQuestionIndex) {
      baseClass += ' ring-2 ring-primary-500 ring-offset-2 ring-offset-slate-100';
    }
    
    return baseClass;
  };

  return (
    <Card className="h-full flex flex-col">
      <h3 className="font-bold text-center mb-4 text-slate-700 shrink-0">
        Question Palette
      </h3>
      
      <div className="flex-grow overflow-y-auto pr-2 scrollbar-hide">
        <div className="grid grid-cols-5 gap-2">
          {questions.map((question, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onQuestionSelect(index)}
              className={getStatusClass(question, index)}
              aria-label={`Question ${index + 1} - ${question.status}`}
            >
              {index + 1}
            </motion.button>
          ))}
        </div>
      </div>
      
      <div className="mt-6 space-y-3 text-sm text-slate-600 shrink-0">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-success-600 mr-3 border border-success-700"></div>
          <span>Answered</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-warning-600 mr-3 border border-warning-700"></div>
          <span>Marked for Review</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-white/80 mr-3 border border-slate-400"></div>
          <span>Not Answered</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-white ring-2 ring-primary-500 mr-3"></div>
          <span>Current Question</span>
        </div>
      </div>
    </Card>
  );
};

export default QuestionPalette;