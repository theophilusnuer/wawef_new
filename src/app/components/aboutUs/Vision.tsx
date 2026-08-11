import React from "react";

export const Vision: React.FC = () => {
  return (
    <div className="py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Mission Section */}
          <div className="flex flex-col items-center">
            <h2 className="text-lg md:text-2xl text-center  bg-[#FAEBE7] px-10 md:px-20 py-2 md:py-3 rounded-sm mb-4">
              Our Mission
            </h2>
            <p className="text-base md:text-xl text-center p-6 border-l-2 border-r-2 border-b-2 border-[#e07a5f] rounded-br-sm rounded-bl-sm">
              To empower women and girls through education, support systems, and
              practical interventions that create sustainable futures.
            </p>
          </div>

          {/* Vision Section */}
          <div className="flex flex-col items-center">
            <h2 className="text-lg md:text-2xl text-center bg-[#F2C94C] px-10 md:px-20 py-2 md:py-3 rounded-sm mb-4">
              Our Vision
            </h2>
            <p className="text-base md:text-xl text-center p-6 border-l-2 border-r-2 border-b-2 border-[#F2C94C] rounded-br-sm rounded-bl-sm flex-grow max-w-sm">
              A future where every woman and girl has the opportunity, support,
              and dignity to thrive.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
