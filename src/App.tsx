import { Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Layout from '@/components/layout/Layout';
import ImportPage from '@/pages/ImportPage';
import ModeSelectionPage from '@/pages/ModeSelectionPage';
import TestPage from '@/pages/TestPage';
import ResultsPage from '@/pages/ResultsPage';
import NotFoundPage from '@/pages/NotFoundPage';

import { useAppSelector } from '@/hooks/redux';

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
          <Route path="/" element={<Navigate to="/import" replace />} />
          <Route
            path="/import"
            element={
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
            }
          />
          <Route
            path="/select-mode"
            element={
              appState === 'import' ? (
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
              )
            }
          />
          <Route
            path="/test"
            element={
              appState !== 'test' ? (
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
              )
            }
          />
          <Route
            path="/results"
            element={
              appState !== 'results' ? (
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
              )
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

export default App;