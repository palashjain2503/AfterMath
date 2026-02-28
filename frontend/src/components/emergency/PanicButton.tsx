import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import EmergencyModal from './EmergencyModal';

interface PanicButtonProps {
  elderlyName?: string;
}

const PanicButton = ({ elderlyName }: PanicButtonProps) => {
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
      <EmergencyModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        elderlyName={elderlyName}
      />
    </>
  );
};

export default PanicButton;
