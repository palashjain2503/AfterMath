import Modal from '@/components/common/Modal';
import MBButton from '@/components/common/Button';
import { Phone, MapPin } from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmergencyModal = ({ isOpen, onClose }: EmergencyModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} title="🚨 Emergency Alert">
    <div className="space-y-4">
      <p className="text-foreground text-lg">Emergency alert has been triggered. Help is on the way.</p>
      <div className="p-4 rounded-xl bg-destructive/10">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="text-destructive" size={18} />
          <span className="font-medium text-foreground">Location shared with emergency contacts</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="text-destructive" size={18} />
          <span className="font-medium text-foreground">Caregiver notified</span>
        </div>
      </div>
      <div className="flex gap-3">
        <MBButton variant="danger" className="flex-1" onClick={onClose}>Call Emergency</MBButton>
        <MBButton variant="secondary" className="flex-1" onClick={onClose}>Cancel</MBButton>
      </div>
    </div>
  </Modal>
);

export default EmergencyModal;
