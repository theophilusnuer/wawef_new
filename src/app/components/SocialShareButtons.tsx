'use client';

import React from 'react';

interface SocialShareButtonsProps {
  title: string;
  className?: string;
}

export default function SocialShareButtons({
  title,
  className,
}: SocialShareButtonsProps) {
  const [currentUrl, setCurrentUrl] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      className: 'bg-[#1877f2] text-white',
    },
    {
      label: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      className: 'bg-black text-white',
    },
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      className: 'bg-[#0a66c2] text-white',
    },
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${currentUrl}`)}`,
      className: 'bg-[#25d366] text-white',
    },
  ];

  const copyLink = async () => {
    if (!currentUrl) return;

    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={className}>
      <p className="text-sm font-semibold text-gray-700 mb-2">Share this story</p>
      <div className="flex flex-wrap gap-2">
        {shareLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center px-3 py-2 rounded-sm text-xs sm:text-sm font-medium transition-opacity hover:opacity-90 ${item.className}`}
            aria-label={`Share on ${item.label}`}
          >
            {item.label}
          </a>
        ))}

        <button
          type="button"
          onClick={copyLink}
          className="inline-flex items-center px-3 py-2 rounded-sm text-xs sm:text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200"
          aria-label="Copy page link"
        >
          {copied ? 'Copied' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
}
