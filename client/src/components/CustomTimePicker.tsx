import { useEffect, useState, useRef } from 'react';
import { Clock, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CustomTimePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (minutes: number) => void;
  initialMinutes?: number;
}

export default function CustomTimePicker({ isOpen, onClose, onSelect, initialMinutes = 5 }: CustomTimePickerProps) {
  const [selectedMinutes, setSelectedMinutes] = useState(initialMinutes);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  
  const minutes = Array.from({ length: 60 }, (_, i) => i + 1);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsAnimating(true), 10);
      
      setTimeout(() => {
        if (wheelRef.current) {
          const selectedElement = wheelRef.current.querySelector(`[data-value="${selectedMinutes}"]`);
          if (selectedElement) {
            selectedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }, 100);
    } else {
      setIsAnimating(false);
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [isOpen, selectedMinutes]);

  const handleConfirm = () => {
    onSelect(selectedMinutes);
    onClose();
  };

  const handleMinuteClick = (minute: number) => {
    setSelectedMinutes(minute);
    if (wheelRef.current) {
      const selectedElement = wheelRef.current.querySelector(`[data-value="${minute}"]`);
      if (selectedElement) {
        selectedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  if (!shouldRender) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center transition-all duration-300"
        style={{
          opacity: isAnimating ? 1 : 0,
        }}
      >
        <div 
          className="absolute inset-0 bg-background/80 backdrop-blur-sm cursor-pointer"
          onClick={onClose}
          data-testid="picker-backdrop"
        />
        
        <div 
          data-testid="custom-time-picker"
          className="relative w-full sm:w-auto sm:min-w-[320px] bg-card border-t sm:border border-border sm:rounded-lg shadow-lg z-10 transition-transform duration-300"
          style={{
            transform: isAnimating 
              ? 'translateY(0)' 
              : 'translateY(100%)',
          }}
        >
          <div className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Select Time</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                data-testid="button-picker-cancel"
              >
                Cancel
              </Button>
            </div>

            <div className="relative">
              <div 
                ref={wheelRef}
                className="h-[200px] overflow-y-auto scroll-smooth px-2"
                data-testid="minute-wheel"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                <div className="py-[80px]">
                  {minutes.map((minute) => {
                    const isSelected = minute === selectedMinutes;
                    return (
                      <button
                        key={minute}
                        data-value={minute}
                        onClick={() => handleMinuteClick(minute)}
                        data-testid={`minute-option-${minute}`}
                        className={`
                          w-full py-3 text-center transition-all duration-200
                          ${isSelected 
                            ? 'text-foreground text-2xl font-semibold' 
                            : 'text-muted-foreground text-lg'
                          }
                        `}
                      >
                        {minute} {minute === 1 ? 'minute' : 'minutes'}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <div className="absolute inset-y-0 left-0 right-0 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-[80px] bg-gradient-to-b from-card to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-t from-card to-transparent" />
                
                <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[44px] border-y-2 border-primary/20 bg-primary/5" />
              </div>
            </div>

            <Button
              onClick={handleConfirm}
              className="w-full gap-2"
              data-testid="button-picker-confirm"
            >
              <Check className="w-4 h-4" />
              Set {selectedMinutes} {selectedMinutes === 1 ? 'minute' : 'minutes'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
