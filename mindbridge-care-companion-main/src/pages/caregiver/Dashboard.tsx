import CognitiveGraph from '@/components/dashboard/CognitiveGraph';
import MoodTrend from '@/components/dashboard/MoodTrend';
import MedicationCompliance from '@/components/dashboard/MedicationCompliance';
import LonelinessIndex from '@/components/dashboard/LonelinessIndex';
import EmergencyAlerts from '@/components/dashboard/EmergencyAlerts';
import RecentConversations from '@/components/dashboard/RecentConversations';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import { motion } from 'framer-motion';

const CaregiverDashboard = () => (
  <AuthenticatedLayout>
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-display font-bold text-foreground mb-8">
        Caregiver Dashboard
      </motion.h1>
      <div className="grid md:grid-cols-2 gap-6">
        <CognitiveGraph />
        <MoodTrend />
        <MedicationCompliance />
        <LonelinessIndex />
        <EmergencyAlerts />
        <RecentConversations />
      </div>
    </div>
  </AuthenticatedLayout>
);

export default CaregiverDashboard;
