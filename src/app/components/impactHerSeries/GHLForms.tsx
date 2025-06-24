'use client';

import React from 'react';

const GHLForms = () => {
  return (
    <section className="py-12 px-4 text-center bg-[#DFF3E7]">
      <h2 className="md:text-2xl font-semibold mb-6 py-2 italic">
        Reserve your Virtual Seat
      </h2>
      <div className="w-full max-w-4xl mx-auto">
        <iframe
          src="null" 
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full h-96 rounded-md shadow-md border border-gray-200"
          title="Reserve Virtual Seat Form"
        ></iframe>
      </div>
    </section>
  );
};


export default GHLForms;