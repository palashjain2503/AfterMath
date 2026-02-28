import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import EmergencyModal from './EmergencyModal';

const PanicButton = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="btn-panic"
        aria-label="Emergency panic button"
      >
        <AlertTriangle size={28} />
      </button>
      <EmergencyModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default PanicButton;
