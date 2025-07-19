import React, { Component, ReactNode, ErrorInfo } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { clearAllBookingMemory } from '@/lib/hooks/useMemoryStorage';

interface Props {
  children: ReactNode;
  fallbackComponent?: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  isRecovering: boolean;
}

export interface ErrorFallbackProps {
  error: Error | null;
  resetError: () => void;
  clearData: () => void;
  isRecovering: boolean;
}

// Default error fallback component
const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetError,
  clearData,
  isRecovering
}) => {
  const [showDetails, setShowDetails] = React.useState(false);

  const handleReset = async () => {
    try {
      resetError();
    } catch (err) {
      console.error('Failed to reset error state:', err);
    }
  };

  const handleClearAndReset = async () => {
    try {
      clearData();
      setTimeout(() => {
        resetError();
      }, 100);
    } catch (err) {
      console.error('Failed to clear data and reset:', err);
    }
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black to-gray-900 items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full bg-[#111] border border-gray-800 rounded-lg p-8 text-center shadow-xl"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-2xl font-bold text-white mb-4"
        >
          Oops! Something went wrong
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-gray-400 mb-6"
        >
          We encountered an unexpected error while processing your booking. Don't worry, your data is safe and we're here to help.
        </motion.p>

        {/* Error Details (Optional) */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mb-6"
          >
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-sm text-gray-500 hover:text-gray-400 transition-colors flex items-center mx-auto"
            >
              <Bug className="w-4 h-4 mr-1" />
              {showDetails ? 'Hide' : 'Show'} technical details
            </button>
            
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 bg-gray-900/50 rounded border border-gray-700 text-left"
              >
                <p className="text-xs text-red-400 font-mono break-all">
                  {error.message}
                </p>
                {error.stack && (
                  <details className="mt-2">
                    <summary className="text-xs text-gray-500 cursor-pointer">
                      Stack trace
                    </summary>
                    <pre className="text-xs text-gray-600 mt-2 whitespace-pre-wrap break-all">
                      {error.stack}
                    </pre>
                  </details>
                )}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="space-y-3"
        >
          {/* Try Again */}
          <button
            onClick={handleReset}
            disabled={isRecovering}
            className="w-full py-3 px-4 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            {isRecovering ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Recovering...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </>
            )}
          </button>

          {/* Clear Data and Reset */}
          <button
            onClick={handleClearAndReset}
            disabled={isRecovering}
            className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Clear Data & Reset
          </button>

          {/* Go Home */}
          <button
            onClick={handleGoHome}
            className="w-full py-3 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            <Home className="w-4 h-4 mr-2" />
            Go to Homepage
          </button>
        </motion.div>

        {/* Help Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-xs text-gray-500 mt-6"
        >
          If this problem persists, please contact our support team.
        </motion.p>
      </motion.div>
    </div>
  );
};

export class BookingErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      isRecovering: false
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error
    console.error('Booking Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log to external error tracking service
    // Example: Sentry, LogRocket, etc.
    // logErrorToService(error, errorInfo);
  }

  resetError = () => {
    this.setState({
      isRecovering: true
    });

    // Small delay to show recovery state
    setTimeout(() => {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        isRecovering: false
      });
    }, 500);
  };

  clearDataAndReset = () => {
    this.setState({
      isRecovering: true
    });

    try {
      // Clear all booking memory
      clearAllBookingMemory();
      
      // Clear any other relevant data
      if (typeof window !== 'undefined') {
        // Clear session storage booking data
        const keysToRemove: string[] = [];
        for (let i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i);
          if (key && key.startsWith('booking-')) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(key => sessionStorage.removeItem(key));
      }

      setTimeout(() => {
        this.setState({
          hasError: false,
          error: null,
          errorInfo: null,
          isRecovering: false
        });
      }, 500);
    } catch (err) {
      console.error('Failed to clear data:', err);
      // Still reset the error state
      setTimeout(() => {
        this.setState({
          hasError: false,
          error: null,
          errorInfo: null,
          isRecovering: false
        });
      }, 500);
    }
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallbackComponent || DefaultErrorFallback;
      
      return (
        <FallbackComponent
          error={this.state.error}
          resetError={this.resetError}
          clearData={this.clearDataAndReset}
          isRecovering={this.state.isRecovering}
        />
      );
    }

    return this.props.children;
  }
}

// Higher-order component for easy usage
export const withBookingErrorBoundary = <P extends Record<string, any>>(
  Component: React.ComponentType<P>,
  fallbackComponent?: React.ComponentType<ErrorFallbackProps>
) => {
  const WrappedComponent = (props: P) => (
    <BookingErrorBoundary fallbackComponent={fallbackComponent}>
      <Component {...props} />
    </BookingErrorBoundary>
  );
  
  WrappedComponent.displayName = `withBookingErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};

export default BookingErrorBoundary; 