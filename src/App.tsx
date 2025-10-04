import { Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Layout from '@/components/layout/Layout';
import ImportPage from '@/pages/ImportPage';
import ModeSelectionPage from '@/pages/ModeSelectionPage';
import TestPage from '@/pages/TestPage';
import ResultsPage from '@/pages/ResultsPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { AuthPage } from '@/pages/AuthPage';
import { HistoryPage } from '@/pages/HistoryPage';

import { useAppSelector } from '@/hooks/redux';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4,
};

function App() {
  const { appState } = useAppSelector(state => state.app);

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<Navigate to="/import" replace />} />
          <Route
            path="/import"
            element={
              <ProtectedRoute>
                <motion.div
                  key="import"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <ImportPage />
                </motion.div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/select-mode"
            element={
              <ProtectedRoute>
                {appState === 'import' ? (
                  <Navigate to="/import" replace />
                ) : (
                  <motion.div
                    key="select-mode"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <ModeSelectionPage />
                  </motion.div>
                )}
              </ProtectedRoute>
            }
          />
          <Route
            path="/test"
            element={
              <ProtectedRoute>
                {appState !== 'test' ? (
                  <Navigate to="/import" replace />
                ) : (
                  <motion.div
                    key="test"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <TestPage />
                  </motion.div>
                )}
              </ProtectedRoute>
            }
          />
          <Route
            path="/results"
            element={
              <ProtectedRoute>
                {appState !== 'results' ? (
                  <Navigate to="/import" replace />
                ) : (
                  <motion.div
                    key="results"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <ResultsPage />
                  </motion.div>
                )}
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <motion.div
                  key="history"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <HistoryPage />
                </motion.div>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

export default App;