import { useConversationStore } from '@/store/chat-store';
import { useMutation, useQuery } from 'convex/react';
import { ImageIcon, Plus, Video } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { api } from '../../../convex/_generated/api';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '../ui/dropdown-menu';
import MediaImageDialog from './media/MediaImageDialog';
import MediaVideoDialog from './media/MediaVideoDialog';

export default function MediaDropdown() {
  const imageInput = useRef<HTMLInputElement>(null);
  const videoInput = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const generateUploadUrl = useMutation(api.conversations.generateUploadUrl);
  const sendImage = useMutation(api.messages.sendImage);
  const sendVideo = useMutation(api.messages.sendVideo);

  const me = useQuery(api.users.getMe);
  const { selectedConversation } = useConversationStore();

  async function handleSendImage() {
    setIsLoading(true);
    try {
      const postUrl = await generateUploadUrl();

      const result = await fetch(postUrl, {
        method: 'POST',
        headers: { 'Content-Type': selectedImage!.type },
        body: selectedImage,
      });

      const { storageId } = await result.json();

      await sendImage({
        conversation: selectedConversation!._id,
        imgId: storageId,
        sender: me!._id,
      });

      setSelectedImage(null);
    } catch (err) {
      toast.error('Failed to send image');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSendVideo() {
    setIsLoading(true);
    try {
      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: 'POST',
        headers: { 'Content-Type': selectedVideo!.type },
        body: selectedVideo,
      });

      const { storageId } = await result.json();

      await sendVideo({
        videoId: storageId,
        conversation: selectedConversation!._id,
        sender: me!._id,
      });

      setSelectedVideo(null);
    } catch (error) {
      toast.error('Failed to send video');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <input
        type="file"
        ref={imageInput}
        accept="image/*"
        onChange={(e) => setSelectedImage(e.target?.files![0])}
        hidden
      />
      <input
        type="file"
        ref={videoInput}
        accept="video/mp4"
        onChange={(e) => setSelectedVideo(e.target?.files![0])}
        hidden
      />

      {selectedImage && (
        <MediaImageDialog
          isOpen={selectedImage !== null}
          onClose={() => {
            setSelectedImage(null);
          }}
          selectedImage={selectedImage}
          isLoading={isLoading}
          handleSendImage={handleSendImage}
        />
      )}
      {selectedVideo && (
        <MediaVideoDialog
          isOpen={selectedVideo !== null}
          onClose={() => {
            setSelectedVideo(null);
          }}
          selectedVideo={selectedVideo}
          isLoading={isLoading}
          handleSendVideo={handleSendVideo}
        />
      )}

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Plus className="text-gray-600 dark:text-gray-400" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => imageInput.current!.click()}
          >
            <ImageIcon size={18} className="mr-1" /> Photo
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => videoInput.current!.click()}
          >
            <Video size={20} className="mr-1" />
            Video
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
