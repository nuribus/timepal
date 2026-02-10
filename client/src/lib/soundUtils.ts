// Create a single persistent AudioContext for iOS compatibility
let audioContext: AudioContext | null = null;
let isAudioUnlocked = false;

// Initialize audio context on first user interaction (iOS requirement)
function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
}

// Unlock audio on iOS - must be called from user interaction
export function unlockAudio() {
  if (isAudioUnlocked) return;
  
  const ctx = getAudioContext();
  
  // iOS requires BOTH resuming AND playing a sound within the user gesture
  // Method 1: Resume the context
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
  
  // Method 2: Play a silent buffer (required for iOS unlock)
  // This is the "belt-and-suspenders" approach that actually works on iOS
  const buffer = ctx.createBuffer(1, 1, 22050);
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.start(0);
  
  // Mark as unlocked
  isAudioUnlocked = true;
  
  console.log('🔊 Audio unlocked for iOS');
}

// Simple sound utility using Web Audio API to generate sounds
export async function playSound(soundType: string) {
  try {
    const ctx = getAudioContext();
    
    // Ensure audio is unlocked (iOS requirement)
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
    
    const now = ctx.currentTime;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Different sound patterns for different types
    switch (soundType) {
      case 'gentle-chime':
        // Higher frequency, soft gentle chime
        oscillator.frequency.setValueAtTime(800, now);
        oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.3);
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        oscillator.type = 'sine';
        break;
        
      case 'happy-bell':
        // Bell-like sound with harmonics
        oscillator.frequency.setValueAtTime(600, now);
        oscillator.frequency.exponentialRampToValueAtTime(500, now + 0.2);
        oscillator.frequency.exponentialRampToValueAtTime(600, now + 0.4);
        gainNode.gain.setValueAtTime(0.4, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
        oscillator.type = 'triangle';
        break;
        
      case 'soft-gong':
        // Lower frequency gong sound
        oscillator.frequency.setValueAtTime(200, now);
        oscillator.frequency.exponentialRampToValueAtTime(150, now + 0.5);
        gainNode.gain.setValueAtTime(0.5, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 1);
        oscillator.type = 'sine';
        break;
        
      default:
        oscillator.frequency.setValueAtTime(440, now);
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        oscillator.type = 'sine';
    }
    
    oscillator.start(now);
    oscillator.stop(now + 1);
    
  } catch (error) {
    console.error('Error playing sound:', error);
  }
}
