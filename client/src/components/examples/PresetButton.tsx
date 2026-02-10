import PresetButton from '../PresetButton';
import { Sparkles } from 'lucide-react';

export default function PresetButtonExample() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-8 gap-4">
      <PresetButton 
        icon={Sparkles}
        label="Brushing Time"
        duration={120}
        isActive={false}
        onClick={() => console.log('Brushing time selected')}
      />
      <PresetButton 
        icon={Sparkles}
        label="Clean-Up"
        duration={300}
        isActive={true}
        onClick={() => console.log('Clean-up selected')}
      />
    </div>
  );
}
