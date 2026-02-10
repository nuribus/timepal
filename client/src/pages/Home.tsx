import { useState, useEffect, useCallback } from 'react';
import { Sparkles, Hand, ShowerHead, ArrowLeftRight, BookOpen, Clock } from 'lucide-react';
import CircularTimer from '@/components/CircularTimer';
import PresetButton from '@/components/PresetButton';
import SoundSelector from '@/components/SoundSelector';
import TimerControls from '@/components/TimerControls';
import CustomTimePicker from '@/components/CustomTimePicker';
import { playSound, unlockAudio } from '@/lib/soundUtils';

interface TimerPreset {
  id: string;
  label: string;
  duration: number;
  icon: any;
}

const presets: TimerPreset[] = [
  { id: 'teeth-brushing', label: 'Teeth Brushing', duration: 120, icon: Sparkles },
  { id: 'transition', label: 'Transition', duration: 180, icon: ArrowLeftRight },
  { id: 'clean-up', label: 'Clean-up', duration: 300, icon: Hand },
  { id: 'bath-time', label: 'Bath Time', duration: 600, icon: ShowerHead },
  { id: 'reading-time', label: 'Reading Time', duration: 900, icon: BookOpen },
  { id: 'custom', label: 'Custom', duration: 300, icon: Clock },
];

export default function Home() {
  const [selectedPreset, setSelectedPreset] = useState<TimerPreset>(presets[0]);
  const [currentSeconds, setCurrentSeconds] = useState(presets[0].duration);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedSound, setSelectedSound] = useState('gentle-chime');
  const [isPlayingCompletionSound, setIsPlayingCompletionSound] = useState(false);
  const [soundLoopCount, setSoundLoopCount] = useState(0);
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [customDuration, setCustomDuration] = useState(300);

  // Load last used timer from localStorage
  useEffect(() => {
    const savedCustomDuration = localStorage.getItem('customTimerDuration');
    if (savedCustomDuration) {
      setCustomDuration(parseInt(savedCustomDuration));
    }

    const lastPresetId = localStorage.getItem('lastTimerPreset');
    if (lastPresetId) {
      const preset = presets.find(p => p.id === lastPresetId);
      if (preset) {
        const duration = lastPresetId === 'custom' && savedCustomDuration 
          ? parseInt(savedCustomDuration) 
          : preset.duration;
        
        setSelectedPreset({ ...preset, duration });
        setCurrentSeconds(duration);
      }
    }
    
    const savedSound = localStorage.getItem('selectedSound');
    if (savedSound) {
      setSelectedSound(savedSound);
    }
  }, []);

  const playCompletionSound = useCallback(() => {
    setIsPlayingCompletionSound(true);
    setSoundLoopCount(0);
  }, []);

  // Timer countdown logic
  useEffect(() => {
    if (!isRunning) return;
    
    const interval = setInterval(() => {
      setCurrentSeconds(prev => {
        if (prev <= 1) {
          setIsRunning(false);
          playCompletionSound();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isRunning, playCompletionSound]);

  // Sound looping effect - play sound 5 times
  useEffect(() => {
    if (!isPlayingCompletionSound) return;
    
    if (soundLoopCount < 5) {
      playSound(selectedSound);
      
      const timeout = setTimeout(() => {
        setSoundLoopCount(prev => prev + 1);
      }, 2000); // Wait 2 seconds between sounds
      
      return () => clearTimeout(timeout);
    } else {
      setIsPlayingCompletionSound(false);
      setSoundLoopCount(0);
    }
  }, [isPlayingCompletionSound, soundLoopCount, selectedSound]);

  const handlePresetSelect = (preset: TimerPreset) => {
    // Unlock audio on user interaction (iOS requirement)
    unlockAudio();
    
    if (preset.id === 'custom') {
      setShowCustomPicker(true);
      return;
    }
    
    setSelectedPreset(preset);
    setCurrentSeconds(preset.duration);
    setIsRunning(false);
    setIsPlayingCompletionSound(false);
    setSoundLoopCount(0);
    localStorage.setItem('lastTimerPreset', preset.id);
  };

  const handleCustomTimeSelect = (minutes: number) => {
    const duration = minutes * 60;
    setCustomDuration(duration);
    
    const customPreset = { ...presets.find(p => p.id === 'custom')!, duration };
    setSelectedPreset(customPreset);
    setCurrentSeconds(duration);
    setIsRunning(false);
    setIsPlayingCompletionSound(false);
    setSoundLoopCount(0);
    localStorage.setItem('lastTimerPreset', 'custom');
    localStorage.setItem('customTimerDuration', duration.toString());
  };

  const handlePlayPause = () => {
    // Unlock audio on first user interaction (iOS requirement)
    unlockAudio();
    
    // If sound is playing, stop it
    if (isPlayingCompletionSound) {
      setIsPlayingCompletionSound(false);
      setSoundLoopCount(0);
      return;
    }
    
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPlayingCompletionSound(false);
    setSoundLoopCount(0);
    setCurrentSeconds(selectedPreset.duration);
  };

  const handleSoundChange = (sound: string) => {
    setSelectedSound(sound);
    localStorage.setItem('selectedSound', sound);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-2 sm:px-4 py-4 sm:py-8 max-w-2xl mx-auto w-full">
        {/* Timer Display - 60% of vertical space */}
        <div className="flex-[3] flex items-center justify-center">
          <CircularTimer 
            totalSeconds={selectedPreset.duration}
            currentSeconds={currentSeconds}
            isRunning={isRunning}
          />
        </div>

        {/* Controls */}
        <div className="py-4 sm:py-6">
          <TimerControls 
            isRunning={isRunning}
            onPlayPause={handlePlayPause}
            onReset={handleReset}
            showReset={currentSeconds !== selectedPreset.duration}
            isPlayingCompletionSound={isPlayingCompletionSound}
          />
        </div>

        {/* Presets - 40% of vertical space */}
        <div className="flex-[2] w-full space-y-4 sm:space-y-6">
          <div>
            <h2 className="text-sm font-medium text-foreground mb-2 sm:mb-3">Timer Presets</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {presets.map((preset) => {
                const displayDuration = preset.id === 'custom' ? customDuration : preset.duration;
                return (
                  <PresetButton
                    key={preset.id}
                    icon={preset.icon}
                    label={preset.label}
                    duration={displayDuration}
                    isActive={selectedPreset.id === preset.id}
                    onClick={() => handlePresetSelect(preset)}
                  />
                );
              })}
            </div>
          </div>

          <SoundSelector 
            selectedSound={selectedSound}
            onSoundChange={handleSoundChange}
          />
        </div>
      </main>

      <CustomTimePicker
        isOpen={showCustomPicker}
        onClose={() => setShowCustomPicker(false)}
        onSelect={handleCustomTimeSelect}
        initialMinutes={Math.round(customDuration / 60)}
      />

      {/* Footer */}
      <footer className="pb-4 px-2 text-center">
        <p className="text-xs sm:text-sm text-muted-foreground">
          Made with love by a mom | Questions?{' '}
          <a 
            href="mailto:curiousbaby.studio@gmail.com" 
            className="text-primary hover:underline"
            data-testid="link-contact-email"
          >
            curiousbaby.studio@gmail.com
          </a>
        </p>
      </footer>
    </div>
  );
}
