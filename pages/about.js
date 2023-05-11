import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const About = () => {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:py-16 lg:px-8 h-screen grid -mt-40 content-center justify-center ">
      <div className="max-w-7xl mx-auto text-center">
        <Image src={'logo.svg'} height={100} width={100} alt="Damngood Logo" className="h-16 mx-auto mb-6 scale-150" />
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          About Damngood
        </h2>
        <p className="mt-3 text-xl text-gray-500 sm:mt-4">
          At Damngood, we believe that clothing should be more than just a way to cover your body. Our t-shirts and hoodies are designed to make a statement and express your personality. Whether you&apos;re into music, sports, or just want to show off your sense of humor, we&apos;ve got something for everyone.
        </p>
        <div className="mt-10">
          <Link
            href={"/"}
            className="inline-block bg-gray-500 border border-transparent py-3 px-8 rounded-md font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;