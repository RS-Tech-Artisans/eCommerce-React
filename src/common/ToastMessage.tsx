import React from 'react';
import { ToastMessageProps } from '../utils/Interfaces';

const ToastMessage: React.FC<ToastMessageProps> = ({ type, text }) => {
  if (!type || !text) return null;

  return (
    <div className={`toast ${type === 'success' ? 'show' : ''}`}>{text}</div>
  );
};

export default ToastMessage;
