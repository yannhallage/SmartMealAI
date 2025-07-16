import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CookingTimer = ({ recipe }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerSteps, setTimerSteps] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const intervalRef = useRef(null);

  // Créer des étapes de minuteur basées sur la recette
  useEffect(() => {
    if (recipe) {
      const steps = createTimerSteps(recipe);
      setTimerSteps(steps);
      setTimeLeft(steps[0]?.duration || 0);
    }
  }, [recipe]);

  const createTimerSteps = (recipe) => {
    const steps = [];
    let instructions = recipe.instructions;
    if (typeof instructions === 'string') {
      instructions = instructions.split('\n').filter(line => line.trim() !== '');
    }
    if (Array.isArray(instructions)) {
      instructions.forEach((instruction, index) => {
        // Estimer le temps basé sur le contenu de l'instruction
        let duration = 120; // 2 minutes par défaut
        if (instruction.toLowerCase().includes('cuire') || instruction.toLowerCase().includes('faire cuire')) {
          duration = 300; // 5 minutes
        } else if (instruction.toLowerCase().includes('mijoter') || instruction.toLowerCase().includes('simmer')) {
          duration = 600; // 10 minutes
        } else if (instruction.toLowerCase().includes('préchauffer')) {
          duration = 180; // 3 minutes
        } else if (instruction.toLowerCase().includes('couper') || instruction.toLowerCase().includes('hacher')) {
          duration = 60; // 1 minute
        }
        steps.push({
          id: index,
          title: `Étape ${index + 1}`,
          instruction: instruction,
          duration: duration,
          completed: false
        });
      });
    }
    return steps;
  };

  useEffect(() => {
    if (isActive && !isPaused && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Étape terminée
            completeStep();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, isPaused, timeLeft]);

  const completeStep = () => {
    const newSteps = [...timerSteps];
    newSteps[currentStep].completed = true;
    setTimerSteps(newSteps);

    // Notification
    addNotification(`Étape ${currentStep + 1} terminée !`);

    // Passer à l'étape suivante
    if (currentStep < timerSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setTimeLeft(timerSteps[currentStep + 1].duration);
    } else {
      // Recette terminée
      setIsActive(false);
      addNotification("🎉 Recette terminée ! Bon appétit !");
    }
  };

  const addNotification = (message) => {
    const newNotification = {
      id: Date.now(),
      message,
      timestamp: new Date()
    };
    setNotifications(prev => [...prev, newNotification]);
    
    // Supprimer la notification après 5 secondes
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
    setCurrentStep(0);
    setTimeLeft(timerSteps[0]?.duration || 0);
    addNotification("🚀 Début de la cuisson !");
  };

  const pauseTimer = () => {
    setIsPaused(true);
    addNotification("⏸️ Minuteur en pause");
  };

  const resumeTimer = () => {
    setIsPaused(false);
    addNotification("▶️ Minuteur repris");
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setCurrentStep(0);
    setTimeLeft(timerSteps[0]?.duration || 0);
    setTimerSteps(prev => prev.map(step => ({ ...step, completed: false })));
    addNotification("🔄 Minuteur réinitialisé");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const completedSteps = timerSteps.filter(step => step.completed).length;
    return (completedSteps / timerSteps.length) * 100;
  };

  const getCurrentStepProgress = () => {
    if (timerSteps[currentStep]) {
      const totalTime = timerSteps[currentStep].duration;
      const remaining = timeLeft;
      return ((totalTime - remaining) / totalTime) * 100;
    }
    return 0;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          ⏱️ Minuteur de Cuisine
        </h3>
        <div className="mt-2 text-lg float-right font-semibold text-coral-600">
          {recipe?.titre || recipe?.name || <span className="text-gray-400 italic">Titre non disponible</span>}
        </div>
      </div>

      {/* Timer principal */}
      <div className="text-center mb-6">
        <div className="relative w-48 h-48 mx-auto mb-4">
          {/* Cercle de progression */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              initial={{ strokeDasharray: 283, strokeDashoffset: 283 }}
              animate={{ 
                strokeDashoffset: 283 - (283 * getCurrentStepProgress()) / 100 
              }}
              transition={{ duration: 1 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#fb923c" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Temps au centre */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-gray-900">
              {formatTime(timeLeft)}
            </div>
            <div className="text-sm text-gray-600">
              Étape {currentStep + 1}/{timerSteps.length}
            </div>
          </div>
        </div>

        {/* Contrôles */}
        <div className="flex justify-center space-x-3">
          {!isActive ? (
            <motion.button
              onClick={startTimer}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-coral-400 to-peach-400 text-white px-6 py-3 rounded-lg font-semibold hover:from-coral-500 hover:to-peach-500 transition-all duration-200 shadow-lg"
            >
              🚀 Commencer
            </motion.button>
          ) : (
            <>
              {isPaused ? (
                <motion.button
                  onClick={resumeTimer}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  ▶️ Reprendre
                </motion.button>
              ) : (
                <motion.button
                  onClick={pauseTimer}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                >
                  ⏸️ Pause
                </motion.button>
              )}
              <motion.button
                onClick={resetTimer}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                🔄 Reset
              </motion.button>
            </>
          )}
        </div>
      </div>

      {/* Progression globale */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progression globale</span>
          <span className="text-sm text-gray-600">{Math.round(getProgress())}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-coral-400 to-peach-400 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${getProgress()}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Étapes */}
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-900">📋 Étapes</h4>
        {timerSteps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-3 rounded-lg border transition-all duration-200 ${
              step.completed
                ? 'bg-green-50 border-green-200'
                : index === currentStep && isActive
                ? 'bg-coral-50 border-coral-200'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step.completed
                    ? 'bg-green-500 text-white'
                    : index === currentStep && isActive
                    ? 'bg-coral-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {step.completed ? '✓' : index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{step.title}</div>
                  <div className="text-sm text-gray-600">{step.instruction}</div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {formatTime(step.duration)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Notifications */}
      <AnimatePresence>
        {notifications.map(notification => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg p-4 shadow-lg z-50 max-w-sm"
          >
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🔔</div>
              <div>
                <div className="font-medium text-gray-900">{notification.message}</div>
                <div className="text-xs text-gray-500">
                  {notification.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CookingTimer; 