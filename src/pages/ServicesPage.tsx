import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
    Service,
    ServicesListResponse,
    CompanyDetails,
    HomePageResponse,
} from "@/types/api";

const ServicesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [services, setServices] = useState<Service[]>([]);
    const [companyDetails, setCompanyDetails] = useState<CompanyDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
                const isDevelopment = import.meta.env.DEV;

                // Fetch company details for navigation/footer
                const homeUrl = isDevelopment ? "/api/home/" : `${baseUrl}/api/home/`;
                const homeResponse = await fetch(homeUrl, {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (homeResponse.ok) {
                    const homeResult: HomePageResponse = await homeResponse.json();
                    if (homeResult.success && homeResult.data?.company_details) {
                        setCompanyDetails(homeResult.data.company_details);
                    }
                }

                // Fetch services data
                const page = searchParams.get("page") || "1";
                const servicesUrl = isDevelopment
                    ? `/api/services/?page=${page}`
                    : `${baseUrl}/api/services/?page=${page}`;

                const servicesResponse = await fetch(servicesUrl, {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (!servicesResponse.ok) {
                    throw new Error(`HTTP error! status: ${servicesResponse.status}`);
                }

                const servicesResult: ServicesListResponse = await servicesResponse.json();
                if (servicesResult.success) {
                    setServices(servicesResult.results);
                    setCurrentPage(servicesResult.current_page);
                    setTotalPages(servicesResult.total_pages);
                } else {
                    throw new Error("Failed to fetch services");
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
                console.error("Error fetching services:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchParams]);

    // Parse HTML description to extract text features
    const parseDescription = (html: string): string[] => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const paragraphs = doc.querySelectorAll("p");
        if (paragraphs.length > 0) {
            return Array.from(paragraphs)
                .map((p) => p.textContent?.trim())
                .filter((text) => text && text.length > 0) as string[];
        }
        return html
            .replace(/<[^>]*>/g, "")
            .split(/\n|<br\s*\/?>/i)
            .map((line) => line.trim())
            .filter((line) => line.length > 0);
    };

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-lg text-muted-foreground">Loading...</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-lg text-red-500">Error: {error}</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen">
            {companyDetails && <Navigation companyDetails={companyDetails} />}
            <section className="pt-20 pb-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="font-display text-4xl md:text-5xl font-medium text-foreground mb-4 text-center">
                        My <span className="text-yellow-600">Services</span>
                    </h1>
                    <p className="font-body text-muted-foreground text-center mb-12">
                        Explore all available photography services
                    </p>

                    {services.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                {services
                                    .sort((a, b) => a.priority - b.priority)
                                    .map((service) => {
                                        const features = parseDescription(service.description);
                                        return (
                                            <div
                                                key={service.id}
                                                className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow"
                                            >
                                                <h3 className="font-display text-xl font-medium text-foreground mb-6">
                                                    {service.name}
                                                </h3>
                                                {features.length > 0 && (
                                                    <ul className="space-y-3 mb-8">
                                                        {features.map((feature, idx) => (
                                                            <li
                                                                key={idx}
                                                                className="font-body text-sm text-muted-foreground flex items-start"
                                                            >
                                                                <span className="text-yellow-600 mr-2">•</span>
                                                                {feature}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                                <p className="font-body text-sm font-semibold text-yellow-700">
                                                    {service.starting_price}
                                                </p>
                                            </div>
                                        );
                                    })}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center gap-2">
                                    <button
                                        onClick={() => {
                                            const newPage = currentPage - 1;
                                            const params = new URLSearchParams(searchParams);
                                            params.set("page", newPage.toString());
                                            setSearchParams(params);
                                        }}
                                        disabled={currentPage === 1}
                                        className={`px-4 py-2 text-sm font-body ${currentPage === 1
                                            ? "opacity-50 cursor-not-allowed"
                                            : "hover:bg-yellow-100"
                                            }`}
                                    >
                                        Previous
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => {
                                                const params = new URLSearchParams(searchParams);
                                                params.set("page", page.toString());
                                                setSearchParams(params);
                                            }}
                                            className={`px-4 py-2 text-sm font-body ${currentPage === page
                                                ? "bg-yellow-600 text-white"
                                                : "hover:bg-yellow-100"
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => {
                                            const newPage = currentPage + 1;
                                            const params = new URLSearchParams(searchParams);
                                            params.set("page", newPage.toString());
                                            setSearchParams(params);
                                        }}
                                        disabled={currentPage === totalPages}
                                        className={`px-4 py-2 text-sm font-body ${currentPage === totalPages
                                            ? "opacity-50 cursor-not-allowed"
                                            : "hover:bg-yellow-100"
                                            }`}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <p className="font-body text-muted-foreground">No services found.</p>
                        </div>
                    )}
                </div>
            </section>
            {companyDetails && <Footer companyDetails={companyDetails} />}
        </main>
    );
};

export default ServicesPage;

