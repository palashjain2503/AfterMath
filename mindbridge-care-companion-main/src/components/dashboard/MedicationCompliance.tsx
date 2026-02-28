import MBCard from '@/components/common/Card';
import { useCognitiveStore } from '@/store/cognitiveStore';
import { motion } from 'framer-motion';

const MedicationCompliance = () => {
  const { medicationCompliance } = useCognitiveStore();
  return (
    <MBCard>
      <h3 className="text-lg font-display font-semibold text-foreground mb-4">Medication Compliance</h3>
      <div className="flex items-center gap-4">
        <div className="flex-1 h-4 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full gradient-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${medicationCompliance}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
        <span className="text-2xl font-bold text-foreground">{medicationCompliance}%</span>
      </div>
    </MBCard>
  );
};

export default MedicationCompliance;
