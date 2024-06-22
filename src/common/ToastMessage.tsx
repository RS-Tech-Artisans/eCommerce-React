import React from 'react';

export interface ToastMessageProps {
  type: 'success' | 'error' | null;
  text: string | null;
}

const ToastMessage: React.FC<ToastMessageProps> = ({ type, text }) => {
  if (!type || !text) return null;

  return (
    <div className={`toast ${type === 'success' ? 'show' : ''}`}>{text}</div>
  );
};

export default ToastMessage;
