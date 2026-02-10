import { X, Star, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface AuthPromptProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUp: () => void;
}

export default function AuthPrompt({ isOpen, onClose, onSignUp }: AuthPromptProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" data-testid="auth-prompt">
        <DialogHeader>
          <DialogTitle className="text-2xl">Save Your Timer History</DialogTitle>
          <DialogDescription className="text-base pt-2">
            Sign up for free to unlock these features:
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-primary/10 p-2">
              <History className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-medium">View Complete History</div>
              <div className="text-sm text-muted-foreground">Track which timers help your routine</div>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-primary/10 p-2">
              <Star className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-medium">Multi-Device Sync</div>
              <div className="text-sm text-muted-foreground">Access your timers anywhere</div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button 
            onClick={onSignUp} 
            className="flex-1"
            data-testid="button-signup"
          >
            Sign Up Free
          </Button>
          <Button 
            onClick={onClose} 
            variant="outline"
            data-testid="button-dismiss"
          >
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
