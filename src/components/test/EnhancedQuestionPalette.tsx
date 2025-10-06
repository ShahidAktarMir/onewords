import React, { useMemo } from 'react';
import { CheckCircle2, Circle, Flag, Eye } from 'lucide-react';
import { Question } from '@/types';

interface QuestionStatus {
  answered: number;
  marked: number;
  visited: number;
  notVisited: number;
}

interface EnhancedQuestionPaletteProps {
  questions: Question[];
  currentQuestionIndex: number;
  onQuestionSelect: (index: number) => void;
  visitedQuestions: Set<number>;
  className?: string;
}

export const EnhancedQuestionPalette: React.FC<EnhancedQuestionPaletteProps> = ({
  questions,
  currentQuestionIndex,
  onQuestionSelect,
  visitedQuestions,
  className = '',
}) => {
  const stats: QuestionStatus = useMemo(() => {
    return questions.reduce(
      (acc, q, idx) => {
        if (q.status === 'answered') acc.answered++;
        else if (q.status === 'review') acc.marked++;
        else if (visitedQuestions.has(idx)) acc.visited++;
        else acc.notVisited++;
        return acc;
      },
      { answered: 0, marked: 0, visited: 0, notVisited: 0 }
    );
  }, [questions, visitedQuestions]);

  const getQuestionClasses = (question: Question, index: number) => {
    const isCurrent = index === currentQuestionIndex;
    const isVisited = visitedQuestions.has(index);

    let classes =
      'relative h-11 w-11 flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 text-sm';

    if (question.status === 'answered') {
      classes += ' bg-primary-500 text-white hover:bg-primary-600 shadow-sm';
    } else if (question.status === 'review') {
      classes += ' bg-warning-500 text-white hover:bg-warning-600 shadow-sm';
    } else if (isVisited) {
      classes += ' bg-slate-200 text-slate-700 hover:bg-slate-300 border border-slate-300';
    } else {
      classes += ' bg-white text-slate-600 hover:bg-slate-50 border border-slate-200';
    }

    if (isCurrent) {
      classes += ' ring-2 ring-primary-600 ring-offset-2 scale-105';
    }

    return classes;
  };

  const getStatusIcon = (question: Question) => {
    if (question.status === 'answered') {
      return <CheckCircle2 className="absolute -top-1 -right-1 w-4 h-4 text-success-600 bg-white rounded-full" />;
    } else if (question.status === 'review') {
      return <Flag className="absolute -top-1 -right-1 w-4 h-4 text-warning-600 bg-white rounded-full" />;
    }
    return null;
  };

  const groupedQuestions = useMemo(() => {
    const groups = [];
    for (let i = 0; i < questions.length; i += 10) {
      groups.push(questions.slice(i, i + 10));
    }
    return groups;
  }, [questions]);

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="mb-4 pb-4 border-b border-slate-200">
        <h3 className="text-base font-bold text-slate-800 mb-3">Question Navigator</h3>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-primary-50 rounded-lg p-2.5 border border-primary-100">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Answered</span>
              <span className="font-bold text-primary-700">{stats.answered}</span>
            </div>
          </div>
          <div className="bg-warning-50 rounded-lg p-2.5 border border-warning-100">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Marked</span>
              <span className="font-bold text-warning-700">{stats.marked}</span>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Visited</span>
              <span className="font-bold text-slate-700">{stats.visited}</span>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Remaining</span>
              <span className="font-bold text-slate-700">{stats.notVisited}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-3 mb-4 border border-slate-200">
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary-600" />
            <span>Answered</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Flag className="w-3.5 h-3.5 text-warning-500" />
            <span>Marked</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>Visited</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Circle className="w-3.5 h-3.5 text-slate-400" />
            <span>Not Visited</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
        <div className="space-y-4">
          {groupedQuestions.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-2">
              <div className="text-xs font-semibold text-slate-500 px-1">
                {groupIndex * 10 + 1} - {Math.min((groupIndex + 1) * 10, questions.length)}
              </div>
              <div className="grid grid-cols-5 gap-2">
                {group.map((question, localIndex) => {
                  const globalIndex = groupIndex * 10 + localIndex;
                  return (
                    <button
                      key={globalIndex}
                      onClick={() => onQuestionSelect(globalIndex)}
                      className={getQuestionClasses(question, globalIndex)}
                      aria-label={`Question ${globalIndex + 1} - ${question.status || 'not visited'}`}
                      title={`Question ${globalIndex + 1}`}
                    >
                      {globalIndex + 1}
                      {getStatusIcon(question)}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedQuestionPalette;
