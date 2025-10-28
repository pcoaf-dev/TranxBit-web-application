"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bell, Wallet, ListChecks, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export default function HeaderWithBalance() {
  const pathname = usePathname();

  const ads = [
    { src: "/ads/amazon-ads.svg", alt: "Amazon Gift Cards" },
    { src: "/ads/netflix-ads.svg", alt: "Netflix Subscriptions" },
    { src: "/ads/steam-ads.svg", alt: "Steam Wallet Codes" },
    { src: "/ads/apple-ads.svg", alt: "Apple Gift Cards" },
  ];

  const [emblaApi, setEmblaApi] = useState<CarouselApi | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const t = setInterval(() => {
      if (!isPaused) {
        emblaApi?.scrollNext();
      }
    }, 4000);

    return () => clearInterval(t);
  }, [emblaApi, isPaused]);

  // Don't render on settings page
  if (pathname === "/settings") {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto mb-6 sm:mb-8">
      {/* Header with User Profile and Notification */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
            JD
          </div>
          <div>
            <p className="text-gray-500 text-sm">Welcome,</p>
            <p className="text-gray-900 font-semibold text-lg">John Doe</p>
          </div>
        </div>

        <Popover open={notificationOpen} onOpenChange={setNotificationOpen}>
          <PopoverTrigger asChild>
            <button className="relative p-3 rounded-full bg-white hover:bg-gray-100 transition-all duration-200 shadow-sm">
              <Bell size={20} className="text-gray-700" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <span className="text-xs text-gray-500">0 new</span>
              </div>
              <div className="text-center py-8">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No notifications yet</p>
                <p className="text-gray-400 text-xs mt-1">
                  We&apos;ll notify you when something important happens
                </p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Balance Cards and Carousel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Available Credits Card */}
        <Card className="bg-white shadow-sm rounded-2xl">
          <CardContent className="pt-6 pb-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-4xl font-bold text-gray-900">$0.1</h2>
                <p className="text-gray-500 mt-2">Available Credits</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-full">
                <Wallet className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-4">
            <div className="w-full border-t border-gray-100 pt-4">
              <Button
                onClick={() => {
                  toast.info("This feature will be available soon", {
                    position: "top-center",
                  });
                }}
                className="w-full justify-center border-blue-600 text-blue-600 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-200"
                variant="outline"
                aria-label="Add credits"
              >
                Add credits
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Pending Orders Card */}
        <Card className="bg-white shadow-sm rounded-2xl">
          <CardContent className="pt-6 pb-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-4xl font-bold text-gray-900">0</h2>
                <p className="text-gray-500 mt-2">Pending Orders</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-full">
                <ListChecks className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-4">
            <div className="w-full border-t border-gray-100 pt-4">
              <Button
                className="w-full justify-center border-blue-600 text-blue-600 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-200"
                variant="outline"
                aria-label="View pending orders"
              >
                View pending orders
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Ads Carousel */}
        <Card className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200">
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 text-sm">
              Featured Offers
            </h3>
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <Carousel
                className="w-full"
                opts={{ align: "start", loop: true }}
                setApi={setEmblaApi}
              >
                <CarouselContent>
                  {ads.map((ad) => (
                    <CarouselItem key={ad.src}>
                      <div className="p-1 flex items-center justify-center h-32 cursor-pointer">
                        <Image
                          src={ad.src}
                          alt={ad.alt}
                          width={420}
                          height={128}
                          className="h-full w-auto object-cover rounded-lg"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-1 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm border-0 shadow-md hover:bg-white h-5 w-5" />
                <CarouselNext className="absolute right-1 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm border-0 shadow-md hover:bg-white h-5 w-5" />
              </Carousel>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
