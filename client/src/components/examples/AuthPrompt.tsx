import { useState } from 'react';
import AuthPrompt from '../AuthPrompt';
import { Button } from '@/components/ui/button';

export default function AuthPromptExample() {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Button onClick={() => setIsOpen(true)}>Show Auth Prompt</Button>
      <AuthPrompt 
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          console.log('Auth prompt closed');
        }}
        onSignUp={() => {
          console.log('Sign up clicked');
          setIsOpen(false);
        }}
      />
    </div>
  );
}
