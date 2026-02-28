import MBCard from '@/components/common/Card';
import { useAuth } from '@/hooks/useAuth';
import { User, Phone, Pill, FileText } from 'lucide-react';

const MedicalInfoCard = () => {
  const { user } = useAuth();

  return (
    <MBCard elevated>
      <h3 className="text-xl font-display font-bold text-foreground mb-4">Medical Information</h3>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <User className="text-primary mt-1" size={20} />
          <div>
            <p className="text-sm text-muted-foreground">Patient</p>
            <p className="font-semibold text-foreground">{user?.name || 'Margaret Johnson'}, Age {user?.age || 78}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Pill className="text-primary mt-1" size={20} />
          <div>
            <p className="text-sm text-muted-foreground">Medications</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {(user?.medications || ['Metformin 500mg', 'Donepezil 10mg']).map((m) => (
                <span key={m} className="px-2 py-0.5 bg-primary/10 text-primary text-sm rounded-lg">{m}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <FileText className="text-primary mt-1" size={20} />
          <div>
            <p className="text-sm text-muted-foreground">Medical History</p>
            <ul className="text-foreground text-sm mt-1 space-y-1">
              {(user?.medicalHistory || ['Type 2 Diabetes', 'Mild Cognitive Impairment']).map((h) => (
                <li key={h}>• {h}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Phone className="text-primary mt-1" size={20} />
          <div>
            <p className="text-sm text-muted-foreground">Emergency Contacts</p>
            {(user?.emergencyContacts || [{ name: 'Sarah Johnson', relationship: 'Daughter', phone: '+1 555-0123' }]).map((c) => (
              <p key={c.phone} className="text-foreground text-sm">{c.name} ({c.relationship}) — {c.phone}</p>
            ))}
          </div>
        </div>
      </div>
    </MBCard>
  );
};

export default MedicalInfoCard;
