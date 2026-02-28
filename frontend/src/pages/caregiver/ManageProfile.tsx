import { useState } from 'react';
import MBCard from '@/components/common/Card';
import MBButton from '@/components/common/Button';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';

const ManageProfile = () => {
  const [medHistory, setMedHistory] = useState(['Type 2 Diabetes', 'Mild Cognitive Impairment', 'Hypertension']);
  const [medications, setMedications] = useState(['Metformin 500mg', 'Donepezil 10mg', 'Lisinopril 20mg']);
  const [newHistory, setNewHistory] = useState('');
  const [newMed, setNewMed] = useState('');

  return (
    <AuthenticatedLayout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-display font-bold text-foreground mb-8">
          Manage Patient Profile
        </motion.h1>

        <div className="space-y-6">
          <MBCard elevated>
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">Medical History</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {medHistory.map((h) => (
                <span key={h} className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm flex items-center gap-2">
                  {h}
                  <button onClick={() => setMedHistory((p) => p.filter((x) => x !== h))} className="text-primary/60 hover:text-primary">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={newHistory} onChange={(e) => setNewHistory(e.target.value)} placeholder="Add condition..."
                className="flex-1 px-4 py-2 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              <MBButton size="sm" onClick={() => { if (newHistory.trim()) { setMedHistory((p) => [...p, newHistory.trim()]); setNewHistory(''); } }}>Add</MBButton>
            </div>
          </MBCard>

          <MBCard elevated>
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">Medications</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {medications.map((m) => (
                <span key={m} className="px-3 py-1 bg-success/10 text-success rounded-lg text-sm flex items-center gap-2">
                  {m}
                  <button onClick={() => setMedications((p) => p.filter((x) => x !== m))} className="text-success/60 hover:text-success">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={newMed} onChange={(e) => setNewMed(e.target.value)} placeholder="Add medication..."
                className="flex-1 px-4 py-2 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              <MBButton size="sm" onClick={() => { if (newMed.trim()) { setMedications((p) => [...p, newMed.trim()]); setNewMed(''); } }}>Add</MBButton>
            </div>
          </MBCard>

          <MBCard elevated>
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">Upload Memory Data</h3>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <Upload className="text-muted-foreground mx-auto mb-3" size={32} />
              <p className="text-muted-foreground">Drag & drop files or click to upload</p>
              <p className="text-sm text-muted-foreground mt-1">Photos, videos, voice recordings</p>
            </div>
          </MBCard>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default ManageProfile;
