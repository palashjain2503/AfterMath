import Modal from '@/components/common/Modal';
import MBButton from '@/components/common/Button';
import { Phone, MapPin, Loader2, CheckCircle, AlertOctagon } from 'lucide-react';
import { useState } from 'react';
import { triggerEmergency } from '@/services/emergencyService';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  elderlyName?: string;
}

const EmergencyModal = ({ isOpen, onClose, elderlyName = 'Elderly User' }: EmergencyModalProps) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleTriggerEmergency = async () => {
    setStatus('loading');
    try {
      await triggerEmergency(elderlyName);
      setStatus('success');
    } catch (err: any) {
      console.error('SOS Error:', err);
      setErrorMessage(err.message || 'Failed to trigger SOS');
      setStatus('error');
    }
  };

  const handleClose = () => {
    setStatus('idle');
    setErrorMessage('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="🚨 Emergency Alert">
      <div className="space-y-4">
        {status === 'idle' && (
          <>
            <p className="text-foreground text-lg">Are you sure you want to trigger an emergency alert?</p>
            <div className="flex gap-3">
              <MBButton variant="danger" className="flex-1" onClick={handleTriggerEmergency}>
                Yes, Call Emergency
              </MBButton>
              <MBButton variant="secondary" className="flex-1" onClick={handleClose}>
                Cancel
              </MBButton>
            </div>
          </>
        )}

        {status === 'loading' && (
          <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <Loader2 className="w-12 h-12 text-destructive animate-spin" />
            <p className="text-lg font-medium">Triggering Emergency SOS...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-3 text-success">
              <CheckCircle size={28} />
              <p className="text-xl font-bold">Alert Triggered</p>
            </div>
            <p className="text-foreground text-lg">Emergency alert has been triggered. Help is on the way.</p>
            <div className="p-4 rounded-xl bg-destructive/10">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="text-destructive" size={18} />
                <span className="font-medium text-foreground">Location shared with emergency contacts</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="text-destructive" size={18} />
                <span className="font-medium text-foreground">Caregiver notified via call</span>
              </div>
            </div>
            <MBButton variant="primary" className="w-full" onClick={handleClose}>
              Dismiss
            </MBButton>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col space-y-4 items-center">
            <div className="flex items-center gap-3 text-destructive">
              <AlertOctagon size={28} />
              <p className="text-xl font-bold">Failed to Trigger Alert</p>
            </div>
            <p className="text-foreground text-center">{errorMessage}</p>
            <div className="flex gap-3 w-full mt-4">
              <MBButton variant="danger" className="flex-1" onClick={handleTriggerEmergency}>
                Try Again
              </MBButton>
              <MBButton variant="secondary" className="flex-1" onClick={handleClose}>
                Cancel
              </MBButton>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default EmergencyModal;
