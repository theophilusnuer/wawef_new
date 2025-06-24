"use client";
import Link from 'next/link';
import { FC } from 'react';
import ig from '../assets/images/ig.svg';
import fb from '../assets/images/fb.svg';
import li from '../assets/images/li.svg';
import yt from '../assets/images/yt.svg';
import Image from 'next/image';
import { getProgramPath } from '../utils/slugUtils';


export const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white px-4 md:px-40 py-15 w-full">
      <div className="container mx-auto px-4 ">
        {/* Footer Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 mb-2 gap-8">

          {/* Take Action */}
          <div>
            <h3 className="mb-6 text-sm md:text-base">Take Action</h3>
            <ul className="space-y-2 text-xs md:text-base text-[#666666]">
              <li>
                <Link href="/pad-a-girl-campaign" className="hover:underline underline-offset-5">
                  Pad A Girl
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:underline underline-offset-5">
                  Sponsor a Program
                </Link>
              </li>
              <li>
                <Link href="/give-monthly" className="hover:underline underline-offset-5">
                  Give monthly
                </Link>
              </li>
            </ul>
          </div>

          {/* What We Do */}
          <div>
            <h3 className="mb-6 text-sm md:text-base">What We Do</h3>
            <ul className="space-y-2 text-xs md:text-base text-[#666666]">
              <li>
                <Link href={`${getProgramPath("Cosmetology — Beauty & Personal Care")}`} className="hover:underline underline-offset-5">
                  Cosmetology Training
                </Link>
              </li>
              <li>
                <Link href={`${getProgramPath("Fashion Design — Textiles & Garment Manufacturing")}`} className="hover:underline underline-offset-5">
                  Fashion & Design Training
                </Link>
              </li>
              <li>
                <Link href={`${getProgramPath("ICT - Web Development and Digital Marketing")}`} className="hover:underline underline-offset-5">
                  Web Dev & Digital Marketing
                </Link>
              </li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="mb-6 text-sm md:text-base">About Us</h3>
            <ul className="space-y-2 text-xs md:text-base text-[#666666]">
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
          <p className="text-xs md:text-sm">
            © {currentYear} West Africa Women Empowerment Foundation (WAWEF). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};