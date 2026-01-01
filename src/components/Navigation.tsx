import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CompanyDetails } from "@/types/api";

interface NavigationProps {
  companyDetails: CompanyDetails;
}

const Navigation = ({ companyDetails }: NavigationProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // On non-home pages, always show white background
  const shouldShowWhiteBg = !isHomePage || isScrolled || isMobileMenuOpen;

  useEffect(() => {
    if (!isHomePage) {
      // On other pages, always show white background
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Scroll to section with offset for fixed navbar
  const scrollToSection = (hash: string) => {
    const elementId = hash.replace("#", "");
    const element = document.getElementById(elementId);
    if (element) {
      const offset = 80; // Account for fixed navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Handle hash link clicks - navigate to home first if needed, then scroll
  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    handleLinkClick();

    if (!isHomePage) {
      // Navigate to home page first, then scroll after navigation
      window.location.href = hash;
      return;
    }

    // On home page, just scroll
    scrollToSection(hash);
  };

  // Navigation links - different for home page vs other pages
  const navLinks = isHomePage
    ? [
      { href: "#about", label: "About", isHash: true },
      { href: "#portfolio", label: "Portfolio", isHash: true },
      { href: "#services", label: "Services", isHash: true },
      { href: "#booking", label: "Booking", isHash: true },
      { href: "#contact", label: "Contact", isHash: true },
    ]
    : [
      { href: "/#about", label: "About", isHash: true },
      { href: "/portfolio", label: "Portfolio", isHash: false },
      { href: "/services", label: "Services", isHash: false },
      { href: "/#booking", label: "Booking", isHash: true },
      { href: "/#contact", label: "Contact", isHash: true },
    ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${shouldShowWhiteBg
        ? "bg-background/95 backdrop-blur-sm shadow-lg"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-6xl mx-auto py-2 px-4 flex items-center justify-between">
        <Link
          to="/"
          className={`flex items-center gap-2 font-display text-xl font-medium transition-colors ${shouldShowWhiteBg ? "text-foreground" : "text-white"
            }`}
        >
          <img
            src={companyDetails.logo}
            alt={companyDetails.logo_name}
            loading="eager"
            fetchPriority="high"
            className={`w-auto rounded-full object-contain transition-all duration-300 ${shouldShowWhiteBg ? "h-10" : "h-20"
              }`}
          />
          <span className="text-xl font-medium">{companyDetails.logo_name}</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.isHash ? (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleHashClick(e, link.href)}
                className={`text-sm font-body transition-colors ${shouldShowWhiteBg
                  ? "text-foreground hover:text-yellow-600"
                  : "text-white hover:text-yellow-500 drop-shadow-md"
                  }`}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-body transition-colors ${shouldShowWhiteBg
                  ? "text-foreground hover:text-yellow-600"
                  : "text-white hover:text-yellow-500 drop-shadow-md"
                  }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Hamburger Button - Mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 transition-colors ${shouldShowWhiteBg ? "text-foreground" : "text-white drop-shadow-md"
            }`}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            // X Icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Hamburger Icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm border-t border-border">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) =>
              link.isHash ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleHashClick(e, link.href)}
                  className="text-base font-body text-foreground hover:text-yellow-600 transition-colors py-2"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={handleLinkClick}
                  className="text-base font-body text-foreground hover:text-yellow-600 transition-colors py-2"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
