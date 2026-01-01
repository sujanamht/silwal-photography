import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PortfolioItem, PortfolioCategory } from "@/types/api";

type Category = "featured" | "all" | number;

interface PortfolioProps {
  portfolioItems: PortfolioItem[];
  portfolioCategories: PortfolioCategory[];
}

const Portfolio = ({ portfolioItems, portfolioCategories }: PortfolioProps) => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<Category>("featured");

  // Build filters: Featured, All, and then each category
  const filters: { value: Category; label: string }[] = [
    { value: "featured", label: "Featured" },
    { value: "all", label: "All" },
    ...portfolioCategories.map((cat) => ({
      value: cat.id as Category,
      label: cat.name,
    })),
  ];

  const filteredPhotos = activeFilter === "featured"
    ? portfolioItems.filter((item) => item.is_featured_in_home_page)
    : activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category.id === activeFilter);

  return (
    <section id="portfolio" className="py-20 md:py-28 ">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground mb-8 text-center">
          My <span className="text-yellow-600">Portfolio</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-4 py-2 text-sm font-body transition-all duration-300 ${activeFilter === filter.value
                ? "bg-yellow-600 text-white shadow-md"
                : "bg-secondary text-secondary-foreground hover:bg-yellow-100 hover:text-yellow-700"
                }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPhotos.map((item) => (
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

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/portfolio")}
            className="px-8 py-3 bg-yellow-600 text-white font-medium hover:bg-yellow-700 transition-colors"
          >
            View All Portfolio
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
