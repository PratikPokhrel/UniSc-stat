import React, { FC } from 'react';

interface ErrorProps {
  title: string;
  error: string;
  onClose: () => void;
}

const ErrorCard: FC<ErrorProps> = ({ title, error, onClose }) => {
  return (
    <div className="fixed inset-y-0 right-0 w-1/2 bg-white shadow-xl z-50 flex items-center justify-center p-6">
      <div className="text-center text-red-500">
        <p>{title}</p>
        <p className="mt-2">{error}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorCard;
