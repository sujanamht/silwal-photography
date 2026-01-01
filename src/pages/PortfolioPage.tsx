import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
    PortfolioItem,
    PortfolioCategory,
    PortfolioListResponse,
    CompanyDetails,
    HomePageResponse,
} from "@/types/api";

const PortfolioPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
    const [categories, setCategories] = useState<PortfolioCategory[]>([]);
    const [companyDetails, setCompanyDetails] = useState<CompanyDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

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

                // Fetch portfolio data
                const categoryId = searchParams.get("category");
                const page = searchParams.get("page") || "1";
                const portfolioUrl = isDevelopment
                    ? `/api/portfolio/?page=${page}${categoryId ? `&category=${categoryId}` : ""}`
                    : `${baseUrl}/api/portfolio/?page=${page}${categoryId ? `&category=${categoryId}` : ""}`;

                const portfolioResponse = await fetch(portfolioUrl, {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (!portfolioResponse.ok) {
                    throw new Error(`HTTP error! status: ${portfolioResponse.status}`);
                }

                const portfolioResult: PortfolioListResponse = await portfolioResponse.json();
                if (portfolioResult.success) {
                    setPortfolioItems(portfolioResult.results);
                    setCategories(portfolioResult.categories);
                    setCurrentPage(portfolioResult.current_page);
                    setTotalPages(portfolioResult.total_pages);
                    setSelectedCategory(portfolioResult.current_category);
                } else {
                    throw new Error("Failed to fetch portfolio");
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
                console.error("Error fetching portfolio:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchParams]);

    const handleCategoryChange = (categoryId: number | null) => {
        setSelectedCategory(categoryId);
        const params = new URLSearchParams();
        if (categoryId) {
            params.set("category", categoryId.toString());
        }
        params.set("page", "1");
        setSearchParams(params);
    };

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());
        setSearchParams(params);
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
            <section className="pt-20 pb-20">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="font-display text-4xl md:text-5xl font-medium text-foreground mb-4 text-center">
                        My <span className="text-yellow-600">Portfolio</span>
                    </h1>
                    <p className="font-body text-muted-foreground text-center mb-12">
                        Explore all my photography work
                    </p>

                    {/* Category Filters */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        <button
                            onClick={() => handleCategoryChange(null)}
                            className={`px-4 py-2 text-sm font-body transition-all duration-300 ${selectedCategory === null
                                ? "bg-yellow-600 text-white shadow-md"
                                : "bg-secondary text-secondary-foreground hover:bg-yellow-100 hover:text-yellow-700"
                                }`}
                        >
                            All
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryChange(category.id)}
                                className={`px-4 py-2 text-sm font-body transition-all duration-300 ${selectedCategory === category.id
                                    ? "bg-yellow-600 text-white shadow-md"
                                    : "bg-secondary text-secondary-foreground hover:bg-yellow-100 hover:text-yellow-700"
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>

                    {/* Portfolio Grid */}
                    {portfolioItems.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                                {portfolioItems.map((item) => (
                                    <div key={item.id} className="group relative overflow-hidden">
                                        {item.file_type === "image" ? (
                                            <img
                                                src={item.file}
                                                alt={item.category.name}
                                                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <video
                                                src={item.file}
                                                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                                                muted
                                                loop
                                                playsInline
                                            />
                                        )}
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/60 to-transparent p-4">
                                            <span className="font-body text-sm text-background/90">
                                                {item.category.name}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center gap-2">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
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
                                            onClick={() => handlePageChange(page)}
                                            className={`px-4 py-2 text-sm font-body ${currentPage === page
                                                ? "bg-yellow-600 text-white"
                                                : "hover:bg-yellow-100"
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
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
                            <p className="font-body text-muted-foreground">No portfolio items found.</p>
                        </div>
                    )}
                </div>
            </section>
            {companyDetails && <Footer companyDetails={companyDetails} />}
        </main>
    );
};

export default PortfolioPage;

