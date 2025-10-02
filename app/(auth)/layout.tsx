"use client";
import { useEffect } from "react";
import TranxBitLoader from "@/components/design/Loading-screen";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check auth on mount
  useEffect(() => {
    const checkAuth = async () => {};

    checkAuth();
  }, []);

  // Don't render anything while checking auth
  //   if (authState === "checking" || authState === "redirect") {
  //     return <LoadingScreen />;
  //   }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Auth Forms */}
      <div className="w-full xl:w-1/3   2xl:w-1/2 p-6 xs:p-10 md:mt-10">
        {children}
      </div>

      {/* Updated right side - hidden on mobile */}
      <div className="hidden  md:block xl:w-2/3 relative overflow-hidden bg-background pointer-events-none">
        <TranxBitLoader variant="light" isForm={true} />
      </div>
    </div>
  );
}
