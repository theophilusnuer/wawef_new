'use client';

export default function WhatToExpect() {
  const expectations = [
    { number: 1, text: 'A dynamic keynote or interview with a featured woman leader' },
    { number: 2, text: 'Live audience Q&A' },
    { number: 3, text: 'Guided networking and global sisterhood' },
    { number: 4, text: 'Access to the replay and resources toolkit' },
  ];

  return (
    <div className="md:py-8 px-4 md:px-10 max-w-[78rem] mx-auto text-center">
      <h2 className="inline-block font-medium md:text-2xl px-10 py-2 border border-[#E07A5F] bg-[#FAEBE7] rounded-md mb-8 italic">
        What To Expect
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mx-auto">
        {expectations.map((item) => (
          <div key={item.number} className="bg-[#DFF3E7] p-4 rounded-md">
            <h3 className="font-bold rounded-full bg-white h-10 w-10 flex items-center justify-center mx-auto mb-2">
              {item.number}
            </h3>
            <p className="text-center p-2 md:p-4 break-words">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}