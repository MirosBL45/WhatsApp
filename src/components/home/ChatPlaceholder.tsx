import { Lock } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function ChatPlaceholder() {
  return (
    <div className="w-3/4 bg-gray-secondary flex flex-col items-center justify-center py-10">
      <div className="flex flex-col items-center w-full justify-center py-10 gap-4">
        <Image src={'/desktop-hero.png'} alt="Hero" width={320} height={188} />
        <p className="text-3xl font-extralight mt-5 mb-2">
          Download WhatsApp for Windows
        </p>
        <p className="w-1/2 text-center text-gray-primary text-sm text-muted-foreground">
          Make calls, share your screen and get a faster experience when you
          download the Windows app.
        </p>
        <Button className="rounded-full my-5 bg-green-primary hover:bg-green-secondary hover:text-greenmouse">
          <Link
            href={'https://web.whatsapp.com/'}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get from Microsoft Store
          </Link>
        </Button>
      </div>
      <p className="w-1/2 mt-auto text-center text-gray-primary text-xs text-muted-foreground flex items-center justify-center gap-1">
        <Lock size={10} /> Your personal messages are end-to-end encrypted
      </p>
    </div>
  );
}
