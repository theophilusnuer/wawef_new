import React from 'react';
import Image from 'next/image';

interface ImpactStoryDetailsClientProps {
  story: any;
}

const ImpactStoryDetailsClient: React.FC<ImpactStoryDetailsClientProps> = ({ story }) => {
  return (
    <div>
      <div className="relative w-full h-[60vh] md:h-[70vh]">
        {story.coverImage && (
          <Image
            src={story.coverImage}
            alt={story.title}
            fill
            className="object-cover object-center"
          />
        )}
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 flex flex-col justify-end h-full p-8 w-full">
          <div className="w-full max-w-[78rem] mx-auto flex flex-col items-start text-left mb-6">
            <h1 className="text-white text-3xl md:text-4xl font-bold mb-2">{story.title}</h1>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {story.body && (
          <div className="mb-6 prose prose-lg max-w-none">
            {/* Render Portable Text or rich text here if needed */}
            {Array.isArray(story.body) ? story.body.map((block: any, i: number) => (
              <p key={i}>{block.children ? block.children.map((child: any) => child.text).join('') : ''}</p>
            )) : null}
          </div>
        )}
        {story.gallery && story.gallery.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Gallery</h2>
            <div className="grid grid-cols-2 gap-4">
              {story.gallery.map((img: any, i: number) => (
                <Image
                  key={i}
                  src={img}
                  alt={`Gallery image ${i + 1}`}
                  width={400}
                  height={250}
                  className="rounded object-cover w-full h-48"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImpactStoryDetailsClient;
