"use client";
import { FC } from 'react';

export const Quote1: FC = () => {
    return (
        <div className="py-6 px-4 md:py-10 max-w-md mx-auto items-center md:max-w-2xl">
            <p className="text-base md:text-3xl text-center italic mb-2">
            &quot; When you empower a woman, <br /> you empower a generation.&quot;
            </p>
            <p className="text-sm md:text-base text-center italic">— Melinda French Gates</p>
        </div>
    );
};

export const Quote2: FC = () => {
    return (
        <div className="py-4 px-4 md:py-10 max-w-md mx-auto items-center md:max-w-3xl">
            <p className="text-base md:text-3xl text-center italic">
                Every gift sparks strength and resilience. You&quot;re not just donating, you&quot;re rewriting futures.
            </p>
        </div>
    );
};

export const Quote3: FC = () => {
    return (
        <div className="py-6 px-4 md:py-10 max-w-md mx-auto items-center md:max-w-2xl">
            <p className="text-base md:text-3xl text-center italic mb-2">
            &quot;There is no limit to what we, <br /> as women, can accomplish.&quot;
            </p>
            <p className="text-sm md:text-base text-center italic">— Michelle Obama</p>
        </div>
    );
};

// Default export for the entire Quotes section
export const Quotes: FC = () => {
    return (
        <div className="flex flex-col space-y-6">
            <Quote1 />
            <Quote2 />
            <Quote3 />
        </div>
    );
};