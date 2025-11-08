"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function CardWithForm() {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full min-h-screen">
        {/* Cards Container */}
        <div className="w-full flex flex-wrap lg:flex-nowrap justify-center items-center gap-8 mt-20 lg:mt-28">
          
          {/* Card 1 with Link and Hover Effect */}
          {/* ✅ MOVED the responsive width classes from the Card to the Link component */}
          <Link 
            href="https://www.ecelliitbhu.com/" 
            className="block w-[90%] sm:w-[48%] md:w-[45%] lg:w-[40%] xl:w-[35%]"
          >
            {/* ✅ ADDED w-full to the Card so it fills the Link container */}
            <Card className="w-full  bg-transparent rounded-lg transition-transform duration-300 ease-in-out hover:scale-105">
              <CardContent className="p-4">
                <div className="w-full  overflow-hidden rounded-md">
                  <Image
                    unoptimized
                    src="/logos/E-Cell-White[1].png"
                    alt="Modern interior design"
                    width={600}
                    height={850}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* divider */}
          <div className="border border-white portrait:h-0 portrait:w-52 h-80">

          </div>
          <Link 
            href="https://www.ecelliitbhu.com/" 
            className="block w-[90%] sm:w-[48%] md:w-[45%] lg:w-[40%] xl:w-[35%]"
          >
            {/* ✅ ADDED w-full to the Card so it fills the Link container */}
            <Card className="w-full bg-transparent rounded-lg transition-transform duration-300 ease-in-out hover:scale-105">
              <CardContent className="p-4">
                <div className="w-full overflow-hidden rounded-md">
                  <Image
                    unoptimized
                    src="/logos/SJwhite.png"
                    alt="Minimalist living room"
                    width={20}
                    height={20}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              </CardContent>
            </Card>
          </Link>

        </div>
      </div>
    </>
  );
}