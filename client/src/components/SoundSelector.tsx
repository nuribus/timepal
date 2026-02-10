import { Bell, Music, Radio } from 'lucide-react';
import { playSound, unlockAudio } from '@/lib/soundUtils';

interface SoundSelectorProps {
  selectedSound: string;
  onSoundChange: (sound: string) => void;
}

const sounds = [
  { id: 'gentle-chime', label: 'Gentle Chime', icon: Bell, description: 'Calm activities' },
  { id: 'happy-bell', label: 'Happy Bell', icon: Music, description: 'Play & fun' },
  { id: 'soft-gong', label: 'Soft Gong', icon: Radio, description: 'Transitions' },
];

export default function SoundSelector({ selectedSound, onSoundChange }: SoundSelectorProps) {
  const handleSoundClick = (soundId: string) => {
    // Unlock audio on first interaction (iOS requirement)
    unlockAudio();
    // Play sound preview
    playSound(soundId);
    // Select the sound
    onSoundChange(soundId);
  };

  return (
    <div className="flex flex-col gap-2 sm:gap-3" data-testid="sound-selector">
      <label className="text-sm font-medium text-foreground">Sound </label>
      <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
        {sounds.map((sound) => {
          const Icon = sound.icon;
          const isSelected = selectedSound === sound.id;
          
          return (
            <button
              key={sound.id}
              onClick={() => handleSoundClick(sound.id)}
              data-testid={`sound-${sound.id}`}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full
                transition-all duration-200
                hover-elevate active-elevate-2
                ${isSelected 
                  ? 'bg-primary text-primary-foreground border-2 border-primary' 
                  : 'bg-secondary/20 text-foreground border-2 border-secondary/30'
                }
              `}
            >
              <Icon className="w-4 h-4" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
