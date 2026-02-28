import MBCard from '@/components/common/Card';
import { QRCodeSVG } from 'qrcode.react';

const QRHealthPassport = () => {
  const healthData = JSON.stringify({ id: '1', name: 'Margaret Johnson', blood: 'A+', emergency: '+1 555-0123' });

  return (
    <MBCard elevated className="flex flex-col items-center">
      <h3 className="text-xl font-display font-bold text-foreground mb-4">Health QR Code</h3>
      <div className="p-4 bg-card rounded-2xl border border-border">
        <QRCodeSVG value={healthData} size={200} level="H" />
      </div>
      <p className="text-sm text-muted-foreground mt-4 text-center">Scan this code for emergency medical information</p>
    </MBCard>
  );
};

export default QRHealthPassport;
