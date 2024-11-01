import React, { useState } from 'react';
import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  url: string;
  title: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ url, title }) => {
  const [shared, setShared] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors relative"
      aria-label="Share"
    >
      <Share2 className="h-5 w-5" />
      {shared && (
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded">
          Copied!
        </span>
      )}
    </button>
  );
};

export default ShareButton;