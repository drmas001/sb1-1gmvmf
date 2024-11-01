import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center p-4 bg-red-50 rounded-lg">
      <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
      <span className="text-red-700">{message}</span>
    </div>
  );
};

export default ErrorMessage;