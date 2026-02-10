import { useState } from 'react';
import TimerControls from '../TimerControls';

export default function TimerControlsExample() {
  const [isRunning, setIsRunning] = useState(false);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <TimerControls 
        isRunning={isRunning}
        onPlayPause={() => {
          setIsRunning(!isRunning);
          console.log('Play/Pause toggled:', !isRunning);
        }}
        onReset={() => {
          setIsRunning(false);
          console.log('Timer reset');
        }}
        showReset={true}
      />
    </div>
  );
}
