import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

import Button from '@/components/common/Button';
import Card from '@/components/common/Card';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="text-8xl font-bold text-primary-600 mb-4"
          >
            404
          </motion.div>
          
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            Page Not Found
          </h1>
          
          <p className="text-lg text-slate-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/')}
              variant="primary"
              icon={<Home className="w-5 h-5" />}
            >
              Go Home
            </Button>
            
            <Button
              onClick={() => navigate(-1)}
              variant="secondary"
              icon={<ArrowLeft className="w-5 h-5" />}
            >
              Go Back
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;