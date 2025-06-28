import React from 'react';

export default function ConfirmModal({ isOpen, message, onConfirm, onCancel }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center space-y-4">
        <p className="text-gray-800">{message}</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium bg-gray-800 text-white rounded-full hover:bg-gray-700"
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium border rounded-full hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
