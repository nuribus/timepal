import { useEffect, useState } from 'react';

interface CircularTimerProps {
  totalSeconds: number;
  currentSeconds: number;
  isRunning: boolean;
}

export default function CircularTimer({ totalSeconds, currentSeconds, isRunning }: CircularTimerProps) {
  const [color, setColor] = useState('hsl(146, 74%, 37%)');
  
  // Calculate progress
  const progress = currentSeconds / totalSeconds;
  const circumference = 2 * Math.PI * 213.6; // radius is 213.6 (178 * 1.2)
  const strokeDashoffset = circumference * (1 - progress);
  
  // Color transitions based on time remaining
  useEffect(() => {
    const percentage = (currentSeconds / totalSeconds) * 100;
    
    if (percentage > 50) {
      setColor('hsl(146, 74%, 37%)'); // Primary Green
    } else if (percentage > 25) {
      setColor('hsl(146, 74%, 45%)'); // Lighter Green
    } else if (percentage > 10) {
      setColor('hsl(38, 92%, 50%)'); // Amber warning
    } else {
      setColor('hsl(0, 72%, 45%)'); // Red alert
    }
  }, [currentSeconds, totalSeconds]);
  
  // Format time display
  const minutes = Math.floor(currentSeconds / 60);
  const seconds = currentSeconds % 60;
  const displayTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
  return (
    <div className="relative flex items-center justify-center" data-testid="circular-timer">
      <svg 
        width="545" 
        height="545" 
        className="transform -rotate-90 w-[336px] h-[336px] sm:w-[420px] sm:h-[420px] md:w-[545px] md:h-[545px]"
        viewBox="0 0 545 545"
      >
        {/* Background circle */}
        <circle
          cx="272.5"
          cy="272.5"
          r="213.6"
          stroke="hsl(var(--muted))"
          strokeWidth="38.4"
          fill="none"
          opacity="0.2"
        />
        
        {/* Progress circle */}
        <circle
          cx="272.5"
          cy="272.5"
          r="213.6"
          stroke={color}
          strokeWidth="38.4"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-100 ease-linear"
          style={{
            transition: isRunning ? 'stroke-dashoffset 0.1s linear, stroke 0.3s ease' : 'stroke 0.3s ease'
          }}
        />
      </svg>
      
      {/* Time display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center" data-testid="time-display">
          <div className="text-6xl sm:text-8xl md:text-9xl leading-none" style={{ color }}>
            {displayTime}
          </div>
        </div>
      </div>
    </div>
  );
}
