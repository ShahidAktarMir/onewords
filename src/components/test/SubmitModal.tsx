import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, Clock, FileX } from 'lucide-react';
import { SubmissionSummary } from '@/types';
import Button from '@/components/common/Button';

interface SubmitModalProps {
  summary: SubmissionSummary;
  onConfirm: () => void;
  onCancel: () => void;
}

const SubmitModal: React.FC<SubmitModalProps> = ({
  summary,
  onConfirm,
  onCancel,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onCancel}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="w-16 h-16 text-warning-500" />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Confirm Submission
            </h2>
            
            <p className="text-slate-600">
              Are you sure you want to submit the test? This action cannot be undone.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-slate-700 mb-3 text-center">
              Test Summary
            </h3>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center">
                <CheckCircle className="w-8 h-8 text-success-600 mb-2" />
                <p className="text-2xl font-bold text-success-600">
                  {summary.answered}
                </p>
                <p className="text-sm text-slate-500">Answered</p>
              </div>
              
              <div className="flex flex-col items-center">
                <Clock className="w-8 h-8 text-warning-600 mb-2" />
                <p className="text-2xl font-bold text-warning-600">
                  {summary.review}
                </p>
                <p className="text-sm text-slate-500">For Review</p>
              </div>
              
              <div className="flex flex-col items-center">
                <FileX className="w-8 h-8 text-slate-500 mb-2" />
                <p className="text-2xl font-bold text-slate-500">
                  {summary.notAnswered}
                </p>
                <p className="text-sm text-slate-500">Not Answered</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={onCancel}
              variant="secondary"
              fullWidth
            >
              Cancel
            </Button>
            
            <Button
              onClick={onConfirm}
              variant="error"
              fullWidth
            >
              Submit Test
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SubmitModal;