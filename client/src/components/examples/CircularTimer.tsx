import CircularTimer from '../CircularTimer';

export default function CircularTimerExample() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <CircularTimer 
        totalSeconds={120} 
        currentSeconds={45} 
        isRunning={true}
      />
    </div>
  );
}
