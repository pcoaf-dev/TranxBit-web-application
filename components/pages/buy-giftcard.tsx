"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Minus, Plus, Check, ChevronDown, Loader2 } from "lucide-react";
import Image from "next/image";
// import { cn } from "@/lib/utils";

const brands = [
  { value: "amazon", label: "Amazon", logo: "/brands/logo-amazon.svg" },
  { value: "apple", label: "Apple", logo: "/brands/apple-11.svg" },
  {
    value: "apex-legends",
    label: "Apex Legends",
    logo: "/brands/apex-legends-1.svg",
  },
  { value: "att", label: "AT&T", logo: "/brands/at-t-4.svg" },
  { value: "best-buy", label: "Best Buy", logo: "/brands/best-buy.svg" },
  { value: "booking", label: "Booking.com", logo: "/brands/bookingcom-1.svg" },
  {
    value: "calvin-klein",
    label: "Calvin Klein",
    logo: "/brands/calvin-klein-1.svg",
  },
  { value: "ea-sports", label: "EA Sports", logo: "/brands/ea-sports-2.svg" },
  { value: "ebay", label: "eBay", logo: "/brands/ebay.svg" },
  {
    value: "google-play",
    label: "Google Play",
    logo: "/brands/google-play-4.svg",
  },
  { value: "itunes", label: "iTunes", logo: "/brands/itunes-1.svg" },
  {
    value: "playstation",
    label: "PlayStation",
    logo: "/brands/playstation-6.svg",
  },
  { value: "spotify", label: "Spotify", logo: "/brands/spotify-logo.svg" },
  { value: "steam", label: "Steam", logo: "/brands/steam-1.svg" },
  { value: "target", label: "Target", logo: "/brands/target.svg" },
  { value: "uber-eats", label: "Uber Eats", logo: "/brands/uber-eats.svg" },
  { value: "xbox", label: "Xbox", logo: "/brands/xbox-3.svg" },
];

export default function BuyGiftCardPage() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);

  const amounts = [25, 30, 50];

  const selectedBrandData = brands.find(
    (brand) => brand.value === selectedBrand
  );

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setLoading(true);
      setOpen(true);
      // Simulate loading delay for future backend fetch
      setTimeout(() => {
        setLoading(false);
      }, 600);
    } else {
      setOpen(false);
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (selectedAmount) {
      return selectedAmount * quantity;
    }
    return 0;
  };

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  return (
    <div className="w-full max-w-md space-y-4">
      {/* Card Brand Selector */}
      <div className="space-y-2">
        <Label>Select Card Brand</Label>
        <Popover open={open} onOpenChange={handleOpenChange}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between h-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              {selectedBrandData ? (
                <div className="flex items-center gap-2">
                  <div className="relative w-5 h-5 flex-shrink-0">
                    <Image
                      src={selectedBrandData.logo}
                      alt={selectedBrandData.label}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>{selectedBrandData.label}</span>
                </div>
              ) : (
                <span className="text-muted-foreground">Select card brand</span>
              )}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[var(--radix-popover-trigger-width)] p-0"
            align="start"
          >
            <Command>
              <CommandInput placeholder="Search brands..." className="h-9" />
              <CommandList>
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                  </div>
                ) : (
                  <>
                    <CommandEmpty>No brand found.</CommandEmpty>
                    <CommandGroup>
                      <div className="grid grid-cols-2 gap-1 p-2">
                        {brands.map((brand) => (
                          <CommandItem
                            key={brand.value}
                            value={brand.value}
                            onSelect={(currentValue: string) => {
                              setSelectedBrand(
                                currentValue === selectedBrand
                                  ? ""
                                  : currentValue
                              );
                              setOpen(false);
                            }}
                            className="flex flex-col items-center justify-center p-3 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg border-2 border-transparent data-[selected=true]:border-blue-500 data-[selected=true]:bg-blue-50 dark:data-[selected=true]:bg-blue-950"
                          >
                            <div className="relative w-12 h-12 mb-2">
                              <Image
                                src={brand.logo}
                                alt={brand.label}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <span className="text-xs font-medium text-center">
                              {brand.label}
                            </span>
                            {selectedBrand === brand.value && (
                              <Check className="absolute top-1 right-1 h-4 w-4 text-blue-600" />
                            )}
                          </CommandItem>
                        ))}
                      </div>
                    </CommandGroup>
                  </>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Amount Selection */}
      <div className="space-y-2">
        <Label>Choose Amount</Label>
        <div className="grid grid-cols-3 gap-2">
          {amounts.map((amount) => (
            <button
              key={amount}
              onClick={() => setSelectedAmount(amount)}
              className={`
                relative p-3 rounded-lg border-2 transition-all duration-200
                ${
                  selectedAmount === amount
                    ? "border-blue-500 bg-blue-500 text-white shadow-md shadow-blue-500/30"
                    : "border-border hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950"
                }
              `}
            >
              <div className="text-base font-bold">${amount}</div>
              <div
                className={`text-xs ${
                  selectedAmount === amount
                    ? "text-blue-100"
                    : "text-muted-foreground"
                }`}
              >
                USD
              </div>
              {selectedAmount === amount && (
                <div className="absolute top-1.5 right-1.5">
                  <div className="w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="space-y-2">
        <Label>Quantity</Label>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className="h-9 w-9 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={quantity}
            onChange={(e) =>
              handleQuantityChange(parseInt(e.target.value) || 1)
            }
            className="h-9 w-16 text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            min="1"
            placeholder="1"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(quantity + 1)}
            className="h-9 w-9 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calculated Total */}
      <div className="pt-2 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            Total Amount:
          </span>
          <span className="text-xl font-bold text-blue-600">
            ${calculateTotal().toFixed(2)}
          </span>
        </div>
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-600/30 transition-all"
          disabled={!selectedBrand || !selectedAmount}
        >
          Buy Gift Card
        </Button>
      </div>
    </div>
  );
}
