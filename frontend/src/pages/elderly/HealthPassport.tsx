import QRHealthPassport from '@/components/health/QRHealthPassport';
import MedicalInfoCard from '@/components/health/MedicalInfoCard';
import PanicButton from '@/components/emergency/PanicButton';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import { motion } from 'framer-motion';

const HealthPassport = () => (
  <AuthenticatedLayout>
    <div className="max-w-5xl mx-auto px-4 py-8">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-display font-bold text-foreground mb-8">
        Health Passport 🏥
      </motion.h1>
      <div className="grid md:grid-cols-2 gap-6">
        <QRHealthPassport />
        <MedicalInfoCard />
      </div>
    </div>
    <PanicButton />
  </AuthenticatedLayout>
);

export default HealthPassport;
