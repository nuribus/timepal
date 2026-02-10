import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface WhyTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WhyTimerModal({ isOpen, onClose }: WhyTimerModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay to trigger animation
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      // Wait for animation to complete before removing from DOM
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <>
      {/* Modal Content */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-300"
        style={{
          transformOrigin: 'top right',
          transform: isAnimating ? 'scale(1)' : 'scale(0)',
          opacity: isAnimating ? 1 : 0,
        }}
      >
        {/* Invisible backdrop - click to close */}
        <div 
          className="absolute inset-0 cursor-pointer"
          onClick={onClose}
          data-testid="modal-backdrop"
        />
        
        {/* Modal card */}
        <div 
          data-testid="modal-card"
          className="relative w-full max-w-2xl bg-card border border-border rounded-lg shadow-lg z-10 pt-[40px] pb-[40px] ml-[0px] mr-[0px] pl-[40px] pr-[40px]"
        >
          {/* Content */}
          <div className="space-y-4">
            <h2 className="sm:text-3xl font-medium text-[#cb5d24] text-[24px]">Why a timer</h2>
            <div className="text-foreground/80 space-y-4">
              <p className="text-[14px]">
                Visual timers help toddlers in general — but the clearest benefits show up around ages 3–5, 
                when kids' sense of time and self-regulation take a leap.
              </p>
              
              <div className="text-[14px]">
                <h3 className="font-semibold text-foreground mb-2">Benefits</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Makes time visible. Little kids are still learning what "3 minutes" means.</li>
                  <li>Smoother transitions, fewer meltdowns.</li>
                  <li>Builds self-regulation. Short, predictable countdowns support waiting and shifting.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2 text-[14px]">Learn more</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <a 
                      href="https://huckleberrycare.com/blog/when-and-how-do-you-use-timers-with-kids?utm_source=chatgpt.com#timers_faq"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-[14px]"
                      data-testid="link-huckleberry"
                    >
                      How do you use timers with kids? From Huckleberry
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://developingchild.harvard.edu/resource-guides/guide-executive-function/?utm_source=chatgpt.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-[14px]"
                      data-testid="link-harvard"
                    >
                      Executive function & self-regulation From Harvard Center on the Developing Child
                    </a>
                  </li>
                </ul>
              </div>

              <p className="text-[14px]">
                Fun little feature: when the countdown reaches 0, tap Play for a sound. It was a happy 
                accident—my child loved using it to "close out" activities—so it became part of the timer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
