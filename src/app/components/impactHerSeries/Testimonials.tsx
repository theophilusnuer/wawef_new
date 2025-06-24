'use client';

import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: '7n3t0nlsp3', 
      name: 'Janet',
      title: 'Project Manager',
    },
    {
      id: 'p85vcxyser', 
      name: 'Miriam',
      title: 'Marketing Expert',
    },
    {
      id: 'pwn2qymhf4', 
      name: 'Louisa',
      title: 'Nurse',
    },
  ];

  return (
    <section className="text-center my-4 md:mb-14 py-10 px-4 md:px-10 max-w-[78rem] mx-auto">
      <h2 className="inline-block font-medium md:text-2xl px-4 md:px-10 py-2 bg-[#DFF3E7] border border-[#27AE60] rounded-md mb-8 italic mx-auto max-w-xs md:max-w-md">
          Testimonials
        </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="hidden md:block text-center">
          <h3 className="text-2xl italic font-medium max-w-[10rem] mx-auto h-full flex items-center justify-center">
            What Women Are Saying?
          </h3>
        </div>
        <div className="sm:col-span-3 sm:my-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="rounded-md">
                <div className="bg-[#27AE60] text-white py-2 px-4 rounded-t-md">
                  {/* <p>
                    {testimonial.name} 
                  </p>  */}
                 {/* <p className='italic text-sm'> ({testimonial.title})</p> */}
                </div>
                <div className="relative w-full aspect-video">
                  <iframe
                    src={`https://fast.wistia.net/embed/iframe/${testimonial.id}?web_component=false&seo=false`}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="w-full h-96 rounded-b-md"
                    title={`${testimonial.name}'s Testimonial`}
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;