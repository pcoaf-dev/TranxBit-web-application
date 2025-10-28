"use client";
import TranxBitLogo from "../design/tranx-bit-logo";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  ShoppingCart,
  BadgeDollarSign,
  Receipt,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Settings,
} from "lucide-react";

interface SidebarProps {
  onCollapse?: (collapsed: boolean) => void;
}

const Sidebar = ({ onCollapse }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  // Ensure parent component knows initial state
  useEffect(() => {
    onCollapse?.(isCollapsed);
  }, [isCollapsed, onCollapse]);

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      id: "buy",
      label: "Buy Gift Card",
      icon: ShoppingCart,
      href: "/buy-giftcards",
    },
    {
      id: "sell",
      label: "Sell Gift Card",
      icon: BadgeDollarSign,
      href: "/sell-giftcards",
    },
    {
      id: "transactions",
      label: "Transactions",
      icon: Receipt,
      href: "/transactions",
    },
    { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
  ];

  const bottomItems = [
    // { id: "profile", label: "Profile", icon: User, href: "/profile" },
    { id: "logout", label: "Logout", icon: LogOut, href: "/logout" },
  ];

  const NavItem = ({ item }: { item: (typeof navItems)[number] }) => {
    const isActive = pathname === item.href;

    const buttonContent = (
      <Button
        variant="ghost"
        className={`
          w-full flex items-center gap-3 justify-start h-12 rounded-lg transition-all duration-300
          ${
            isActive
              ? // Active state with blue-to-cyan gradient and glow effect
                "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/50 hover:from-blue-700 hover:to-cyan-600 hover:shadow-xl hover:shadow-blue-500/60"
              : // Inactive state with subtle hover effect
                "text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:text-blue-700 hover:shadow-sm"
          }
          ${isCollapsed ? "justify-center px-0" : "px-4"}
        `}
      >
        <item.icon className="w-5 h-5 flex-shrink-0" />
        {!isCollapsed && <span className="font-medium">{item.label}</span>}
      </Button>
    );

    return (
      <Link href={item.href} className="block">
        {isCollapsed ? (
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
              <TooltipContent side="right">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          buttonContent
        )}
      </Link>
    );
  };

  const SidebarContent = () => (
    <>
      {/* Logo Area */}
      <div
        className={`p-6 border-b border-gray-200 ${isCollapsed ? "px-4" : ""}`}
      >
        {/* <TranxBitLogo size="medium" variant="dark" /> */}
        {isCollapsed ? (
          <TranxBitLogo size="small" variant="dark" isMobile={true} />
        ) : (
          <TranxBitLogo size="medium" variant="dark" />
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavItem key={item.id} item={item} />
        ))}
      </nav>

      {/* Bottom Items */}
      <div className="px-4 py-6 border-t border-gray-200 space-y-2">
        {bottomItems.map((item) => (
          <NavItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 bg-white shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`
          lg:hidden fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-200 z-50 
          transform transition-transform duration-300 ease-in-out flex flex-col
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileOpen(false)}
          className="absolute top-4 right-4"
        >
          <X className="w-5 h-5" />
        </Button>
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={`
          hidden lg:flex fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-30
          flex-col transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-20" : "w-72"}
        `}
      >
        <SidebarContent />

        {/* Collapse Toggle Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            const newState = !isCollapsed;
            setIsCollapsed(newState);
            onCollapse?.(newState);
          }}
          className="absolute -right-3 top-8 w-6 h-6 rounded-full shadow-sm"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </aside>
    </>
  );
};

export default Sidebar;
