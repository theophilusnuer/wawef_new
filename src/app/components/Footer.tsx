"use client";
import Link from 'next/link';
import { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';
import ig from '../assets/images/ig.svg';
import fb from '../assets/images/fb.svg';
import li from '../assets/images/li.svg';
import yt from '../assets/images/yt.svg';
import Image from 'next/image';
import { createClient } from '@/sanity/lib/client';

type FooterProjectItem = {
  projectName?: string;
  slug?: string;
};

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  const [flagshipProjects, setFlagshipProjects] = useState<Array<{ label: string; href: string }>>([]);

  useEffect(() => {
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
      useCdn: true,
    });

    client
      .fetch<FooterProjectItem[]>(
        `*[_type == "program"] | order(_createdAt desc)[0...5]{ "projectName": title, "slug": slug.current }`,
      )
      .then((data) => {
        setFlagshipProjects(
          (data || []).map((project) => {
            const label = project.projectName || 'Project';
            const fallbackSlug = label.replace(/\s+/g, '-').toLowerCase();

            return {
              label,
              href: `/programs/${project.slug || fallbackSlug}`,
            };
          }),
        );
      });
  }, []);

  const featuredProjects = useMemo(() => flagshipProjects.slice(0, 3), [flagshipProjects]);
  const hasMoreProjects = flagshipProjects.length > 4;

  return (
    <footer className="bg-white px-4 md:px-40 py-15 w-full">
      <div className="container mx-auto px-4 ">
        {/* Footer Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 mb-2 gap-8">

          {/* Resources and Stories */}
          <div>
            <h3 className="mb-6 text-sm md:text-base">Get Involved</h3>
            <ul className="space-y-2 text-xs md:text-base text-[#666666]">
              <li>
                <Link href="mailto:info@wawef.org?subject=Partnership%20Inquiry" className="hover:underline underline-offset-5">
                  Partner with us
                </Link>
              </li>
              <li>
                <Link href="/give-monthly" className="hover:underline underline-offset-5">
                  Sponsor a girl
                </Link>
              </li>
              <li>
                <Link href="mailto:info@wawef.org?subject=Volunteer%20Application" className="hover:underline underline-offset-5">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link href="mailto:info@wawef.org?subject=Advisory%20Board%20Interest" className="hover:underline underline-offset-5">
                  Join Advisory Board
                </Link>
              </li>
            </ul>
          </div>

          {/* Flagship Projects */}
          <div>
            <h3 className="mb-6 text-sm md:text-base">Programs</h3>
            <ul className="space-y-2 text-xs md:text-base text-[#666666]">
              {featuredProjects.map((project) => (
                <li key={project.href}>
                  <Link href={project.href} className="hover:underline underline-offset-5">
                    {project.label}
                  </Link>
                </li>
              ))}
              {hasMoreProjects && (
                <li>
                  <Link href="/programs" className="italic hover:underline underline-offset-5">
                    See all programs
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="mb-6 text-sm md:text-base">About Us</h3>
            <ul className="space-y-2 text-xs md:text-base text-[#666666]">
              <li>
                  WAWEF | EIN: 33-4982367
              </li>
              <li>
                <Link href="/about-us" className="hover:underline underline-offset-5">
                  Who we are
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:underline underline-offset-5">
                  Our mission
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:underline underline-offset-5">
                  Our vision
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:underline underline-offset-5">
                  The team
                </Link>
              </li>
              {/* <li>
                <Link href="/blog" className="hover:underline underline-offset-5">
                  Blog
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="mb-6 text-sm md:text-base">Contact Us</h3>
            <ul className='space-y-2 text-xs md:text-base text-[#666666]'>
              <li className="mb-2">C177 Central High Street, East Legon - Accra, Ghana</li>
              <li className="mb-2">4055 Hopewell Springs Dr Milton, GA 30004</li>
              <li className="mb-4">
                <a href="mailto:info@wawef.org" className="hover:underline underline-offset-5">
                  info@wawef.org
                </a>
              </li>
            </ul>
            {/* Social Media Icons */}
            <div className="flex space-x-3">
              <a href="https://www.instagram.com/wawef_org?igsh=a2VpNHZmcndqMWY0" target="_blank" className="">
                <Image src={ig} alt="wawef" className='text-[#666666] h-5 w-5' />
              </a>
              <a href="https://www.facebook.com/share/1E671tfEF1/" target="_blank" className="">
                <Image src={fb} alt="wawef" className='text-[#666666] h-5 w-5' />
              </a>
              <a href="https://www.linkedin.com/company/wawef/" target="_blank" className="">
                <Image src={li} alt="wawef" className='text-[#666666] h-5 w-5' />
              </a>
              <a href="https://youtube.com/@wawef?si=F96u-yypKQboLJVg" target="_blank" className="">
                <Image src={yt} alt="wawef" className='text-[#666666] h-5.5 w-5.5' />
              </a>
            </div>

          </div>

        </div>

        {/* Divider */}
        <hr className="my-4 border-gray-300" />

        {/* Copyright */}
        <div className="text-center text-[#666666]">
          <p className="text-xs md:text-base">
            WAWEF is a 501(c)(3) nonprofit. Donations are tax-deductible as allowed by law.
          </p>
          <p className="text-xs md:text-sm mt-4 md:mt-1">
            © {currentYear} West Africa Women Empowerment Foundation (WAWEF). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};