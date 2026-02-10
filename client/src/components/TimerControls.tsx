import { Play, Pause, RotateCcw, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TimerControlsProps {
  isRunning: boolean;
  onPlayPause: () => void;
  onReset: () => void;
  showReset: boolean;
  isPlayingCompletionSound?: boolean;
}

export default function TimerControls({ isRunning, onPlayPause, onReset, showReset, isPlayingCompletionSound = false }: TimerControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      {/* Main Play/Pause/Stop button */}
      <button
        onClick={onPlayPause}
        data-testid="button-play-pause"
        className="
          w-[72px] h-[72px] rounded-full 
          bg-primary text-primary-foreground
          flex items-center justify-center
          shadow-lg hover-elevate active-elevate-2
          transition-transform duration-200
        "
      >
        {isPlayingCompletionSound ? (
          <Square className="w-8 h-8" fill="currentColor" />
        ) : isRunning ? (
          <Pause className="w-8 h-8" fill="currentColor" />
        ) : (
          <Play className="w-8 h-8 ml-1" fill="currentColor" />
        )}
      </button>
      
      {/* Reset button - only show when timer is active */}
      {showReset && (
        <Button
          variant="outline"
          size="default"
          onClick={onReset}
          data-testid="button-reset"
          className="gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
      )}
    </div>
  );
}
