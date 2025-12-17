import React, { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/v2/Header";
import Sidebar from "@/components/v2/Sidebar";
import Footer from "@/components/v2/Footer";

type LayoutProps = {
  showSidebar?: boolean;
  showFooter?: boolean;
};

const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({ children, showSidebar, showFooter = false }) => {
  const location = useLocation();
  const cUrl = location.pathname.toLowerCase();

  // Default: show sidebar on most pages, hide on home/root unless explicitly enabled
  const computedShowSidebar =
    typeof showSidebar === "boolean"
      ? showSidebar
      : !(cUrl === "/" || cUrl === "/home");

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Fixed top header */}
      <Header />

      {/* Offset content below fixed header */}
      <div className="pt-16">
        {computedShowSidebar ? (
          <div className="flex w-full">
            {/* Sidebar is fixed inside, includes its own spacer */}
            <Sidebar />
            <div className="flex-1">
              {children}
            </div>
          </div>
        ) : (
          <div className="w-full">
            {children}
          </div>
        )}
      </div>

      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;