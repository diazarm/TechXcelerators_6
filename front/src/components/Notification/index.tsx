import React from 'react';
import { useScreenSize } from '../../context';
import type { NotificationProps } from './types';

/** Componente de notificación estilo toast */
export const Notification: React.FC<NotificationProps> = ({
  type = 'info',
  title,
  message,
  onClose,
  visible = true
}) => {
  const { dimensions, isMobile, isDesktop } = useScreenSize();
  const [isAnimating, setIsAnimating] = React.useState(false);
  
  React.useEffect(() => {
    if (visible) {
      setTimeout(() => setIsAnimating(true), 10);
    }
  }, [visible]);
  
  if (!visible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className={isDesktop ? "w-6 h-6 text-green-500" : "w-5 h-5 text-green-500"} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg className={isDesktop ? "w-6 h-6 text-red-500" : "w-5 h-5 text-red-500"} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg className={isDesktop ? "w-6 h-6 text-yellow-500" : "w-5 h-5 text-yellow-500"} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className={isDesktop ? "w-6 h-6 text-blue-500" : "w-5 h-5 text-blue-500"} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-white border-green-200 shadow-lg';
      case 'error':
        return 'bg-white border-red-200 shadow-lg';
      case 'warning':
        return 'bg-white border-yellow-200 shadow-lg';
      default:
        return 'bg-white border-blue-200 shadow-lg';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-[#5D5A88]';
      case 'error':
        return 'text-[#5D5A88]';
      case 'warning':
        return 'text-[#5D5A88]';
      default:
        return 'text-[#5D5A88]';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
      case 'warning':
        return 'text-yellow-500';
      default:
        return 'text-blue-500';
    }
  };

  return (
    <div 
      className={`fixed z-[60] ${getBackgroundColor()} border rounded-md shadow-lg transform transition-all duration-300 ease-in-out ${isAnimating ? 'animate-slide-down' : ''}`}
              style={{
                top: isAnimating ? dimensions.spacing.md : '-100px',
                left: '50%',
                transform: 'translateX(-50%)',
                maxWidth: isMobile ? '350px' : isDesktop ? '550px' : '450px',
                minWidth: isDesktop ? '350px' : '280px',
                opacity: isAnimating ? 1 : 0
              }}
    >
      <div style={{ padding: isDesktop ? dimensions.spacing.md : dimensions.spacing.sm }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center" style={{ gap: dimensions.spacing.xs }}>
            <div className="flex-shrink-0">
              <div className={getIconColor()}>
                {getIcon()}
              </div>
            </div>
                    <div className="flex-1 min-w-0">
                      {title && (
                        <p 
                          className={`font-medium ${getTextColor()} istok-web break-words`}
                          style={{ fontSize: isDesktop ? dimensions.fontSize.sm : dimensions.fontSize.xs }}
                        >
                          {title}
                        </p>
                      )}
                      <p 
                        className={`${getTextColor()} istok-web break-words leading-tight`}
                        style={{ 
                          fontSize: isDesktop ? dimensions.fontSize.sm : dimensions.fontSize.xs,
                          marginTop: title ? '1px' : 0
                        }}
                      >
                        {message}
                      </p>
                    </div>
          </div>
          <button
            onClick={onClose}
            className={`flex-shrink-0 text-gray-400 hover:text-gray-600 rounded-full p-1`}
            style={{ 
              backgroundColor: 'transparent'
            }}
          >
            <span className="sr-only">Cerrar</span>
            <svg 
              viewBox="0 0 20 20" 
              fill="currentColor"
              style={{
                width: isDesktop ? '16px' : '14px',
                height: isDesktop ? '16px' : '14px'
              }}
            >
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
