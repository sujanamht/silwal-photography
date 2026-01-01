import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";
import { HomePageData, HomePageResponse } from "@/types/api";

const Index = () => {
  const location = useLocation();
  const [data, setData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Handle hash scrolling when page loads or hash changes
  useEffect(() => {
    const handleHashScroll = (hash?: string) => {
      const hashToUse = hash || location.hash;
      if (hashToUse) {
        const elementId = hashToUse.replace("#", "");
        const element = document.getElementById(elementId);
        if (element) {
          // Delay to ensure page is fully rendered
          setTimeout(() => {
            const offset = 80; // Account for fixed navbar height
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }, 300);
        }
      }
    };

    // Scroll after data is loaded and page is rendered
    if (!loading && data && location.hash) {
      handleHashScroll();
    }

    // Also handle hash changes
    const handleHashChange = () => {
      const currentHash = window.location.hash;
      if (currentHash) {
        handleHashScroll(currentHash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [location.hash, loading, data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In development, use proxy (relative URL), in production use full URL
        const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
        const isDevelopment = import.meta.env.DEV;
        const apiUrl = isDevelopment
          ? "/api/home/"
          : `${baseUrl}/api/home/`;

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies for CSRF if needed
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${errorText || "Unknown error"}`
          );
        }

        const result: HomePageResponse = await response.json();
        if (result.success && result.data) {
          setData(result.data);
        } else {
          throw new Error("API returned unsuccessful response");
        }
      } catch (err) {
        let errorMessage = "An error occurred";

        if (err instanceof TypeError && err.message.includes("fetch")) {
          errorMessage = "Network error: Unable to connect to the API. Please check if the backend server is running.";
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }

        setError(errorMessage);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Loading...</p>
        </div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-500">Error: {error || "Failed to load data"}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navigation companyDetails={data.company_details} />
      <Hero companyDetails={data.company_details} />
      <About companyDetails={data.company_details} />
      <Portfolio
        portfolioItems={data.portfolio_items}
        portfolioCategories={data.portfolio_categories}
      />
      <Services services={data.services} />
      <BookingForm />
      <Footer companyDetails={data.company_details} />
    </main>
  );
};

export default Index;
