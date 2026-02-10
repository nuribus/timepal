import { useState } from 'react';
import SoundSelector from '../SoundSelector';

export default function SoundSelectorExample() {
  const [selectedSound, setSelectedSound] = useState('gentle-chime');
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-8">
      <SoundSelector 
        selectedSound={selectedSound}
        onSoundChange={(sound) => {
          setSelectedSound(sound);
          console.log('Sound changed to:', sound);
        }}
      />
    </div>
  );
}
