import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';
import ReactPlayer from 'react-player';

type MediaVideoDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedVideo: File;
  isLoading: boolean;
};

export default function MediaVideoDialog({
  isOpen,
  onClose,
  selectedVideo,
  isLoading,
}: MediaVideoDialogProps) {
  const renderedVideo = URL.createObjectURL(
    new Blob([selectedVideo], { type: 'video/mp4' })
  );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent>
        <DialogDescription>Video</DialogDescription>
        <div className="w-full">
          {renderedVideo && (
            <ReactPlayer url={renderedVideo} controls width={'100%'} />
          )}
        </div>
        <Button className="w-full" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
