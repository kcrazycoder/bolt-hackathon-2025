import { useVideoTrack, DailyVideo } from '@daily-co/daily-react';
import { cn } from '@/lib/utils';

interface VideoProps {
  id: string;
  className?: string;
  isSpeaking?: boolean;
}

export const Video = ({ id, className, isSpeaking }: VideoProps) => {
  const videoState = useVideoTrack(id);

  return (
    <div className="relative">
      <DailyVideo
        automirror
        sessionId={id}
        type='video'
        className={cn('h-auto bg-slate-500/80 rounded-md', className, {
          hidden: videoState.isOff,
        })}
      />
      {isSpeaking && (
        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
          Speaking
        </div>
      )}
    </div>
  );
}