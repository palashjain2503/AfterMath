import React, { useState } from 'react';
import axios from 'axios';

export const PanicButton = ({ elderlyName = 'John Doe' }) => {
  const [isCalling, setIsCalling] = useState(false);

  const handleEmergencyCall = async () => {
    setIsCalling(true);

    try {
      const response = await axios.post('http://localhost:5004/api/v1/alerts/sos', {
        elderlyName: elderlyName,
      });

      if (response.data.success) {
        alert(`✓ Emergency call triggered successfully for ${elderlyName}`);
      } else {
        alert(`✗ Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Emergency call error:', error);
      alert(`✗ Failed to trigger emergency call: ${error.message}`);
    } finally {
      setIsCalling(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={handleEmergencyCall}
        disabled={isCalling}
        className={`
          w-32 h-32 rounded-full
          bg-red-600 hover:bg-red-700 active:bg-red-800
          text-white font-bold text-xl
          animate-pulse shadow-lg
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200
          flex items-center justify-center
          border-4 border-red-700
        `}
      >
        {isCalling ? (
          <span className="flex flex-col items-center gap-2">
            <span className="animate-spin">⏳</span>
            <span className="text-sm">CALLING...</span>
          </span>
        ) : (
          'EMERGENCY'
        )}
      </button>
    </div>
  );
};

export default PanicButton;
