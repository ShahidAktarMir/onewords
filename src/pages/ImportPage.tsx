import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Upload, FileSpreadsheet, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { startProcessing, processingSuccess, processingError, setAppState } from '@/store/slices/appSlice';
import { fileProcessorService } from '@/services/fileProcessor';
import { validateFile } from '@/utils/helpers';
import { APP_CONFIG } from '@/utils/constants';

import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const ImportPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isProcessing, error } = useAppSelector(state => state.app);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    const validation = validateFile(file);
    if (!validation.isValid) {
      toast.error(validation.error!);
      return;
    }

    dispatch(startProcessing());

    try {
      const result = await fileProcessorService.processFile(file);
      
      if (result.status === 'success' && result.data) {
        const processedData = fileProcessorService.buildDataStructures(result.data);
        dispatch(processingSuccess(processedData));
        dispatch(setAppState('selectMode'));
        navigate('/select-mode');
        toast.success('File processed successfully!');
      } else {
        dispatch(processingError(result.error || 'Processing failed'));
        toast.error(result.error || 'Processing failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      dispatch(processingError(errorMessage));
      toast.error(errorMessage);
    }

    // Reset file input
    event.target.value = '';
  }, [dispatch, navigate]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
          {APP_CONFIG.name}
        </h1>
        <p className="text-lg text-slate-600">
          {APP_CONFIG.description}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="text-center">
          <div className="mb-6">
            <FileSpreadsheet className="w-16 h-16 text-primary-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Upload Your Excel Sheet
            </h2>
            <p className="text-slate-600">
              Upload your question bank to start practicing
            </p>
          </div>

          <div className="mb-6">
            <label
              htmlFor="file-upload"
              className={`block cursor-pointer ${isProcessing ? 'cursor-wait' : ''}`}
            >
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 hover:border-primary-500 hover:bg-primary-50/50 transition-all duration-300">
                {isProcessing ? (
                  <LoadingSpinner
                    size="lg"
                    text="Processing Your Sheet..."
                    className="py-4"
                  />
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-slate-700 mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-slate-500">
                      Supported formats: {APP_CONFIG.supportedFileTypes.join(', ')}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Maximum file size: {APP_CONFIG.maxFileSize / (1024 * 1024)}MB
                    </p>
                  </>
                )}
              </div>
            </label>
            
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              accept={APP_CONFIG.supportedFileTypes.join(',')}
              disabled={isProcessing}
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-error-50 border border-error-200 rounded-lg flex items-start"
            >
              <AlertCircle className="w-5 h-5 text-error-500 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-error-700 text-sm">{error}</p>
            </motion.div>
          )}

          <div className="bg-slate-50 p-4 rounded-lg text-left text-sm text-slate-600">
            <h3 className="font-semibold text-slate-700 mb-3">System Features:</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Cognitive Difficulty Engine:</strong> Curates tests harder than the real exam</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Advanced Algorithms:</strong> Uses Trie, Double Metaphone, and Levenshtein Distance</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Fault Tolerant:</strong> Resilient architecture with error boundaries</span>
              </li>
            </ul>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ImportPage;