import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PresetButtonProps {
  icon: LucideIcon;
  label: string;
  duration: number;
  isActive: boolean;
  onClick: () => void;
}

export default function PresetButton({ icon: Icon, label, duration, isActive, onClick }: PresetButtonProps) {
  const minutes = duration / 60;
  const displayDuration = minutes < 1 ? `${duration}s` : `${minutes}min`;
  
  return (
    <button
      onClick={onClick}
      data-testid={`preset-${label.toLowerCase().replace(/\s+/g, '-')}`}
      className={`
        flex items-center gap-1.5 px-2.5 py-2 rounded-full
        transition-all duration-200
        hover-elevate active-elevate-2
        whitespace-nowrap text-xs sm:text-sm
        ${isActive 
          ? 'bg-primary text-primary-foreground border-2 border-primary' 
          : 'bg-secondary/20 text-foreground border-2 border-secondary/30'
        }
      `}
    >
      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
      <div className="flex items-center gap-0.5 sm:gap-1">
        <span className="font-medium">{label}</span>
        <span className="opacity-70">({displayDuration})</span>
      </div>
    </button>
  );
}
