import { useState } from "react";

type Category = "featured" | "all" | "weddings" | "portrait" | "graduation" | "events";

interface Photo {
  id: number;
  src: string;
  alt: string;
  category: Exclude<Category, "featured" | "all">;
  caption: string;
  featured?: boolean;
}

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState<Category>("featured");

  const photos: Photo[] = [
    // Featured photos
    { id: 1, src: "/photos/couple.jpg", alt: "Wedding couple", category: "weddings", caption: "Couple", featured: true },
    { id: 2, src: "/photos/Lucken_Wedding_Highlights-9.JPEG", alt: "Wedding highlights", category: "weddings", caption: "Wedding", featured: true },
    { id: 3, src: "/photos/marriage2.jpg", alt: "Wedding moments", category: "weddings", caption: "Wedding", featured: true },
    { id: 4, src: "/photos/girl.jpg", alt: "Portrait session", category: "portrait", caption: "Portrait", featured: true },
    { id: 5, src: "/photos/siblings.JPEG", alt: "Family portrait", category: "events", caption: "Family", featured: true },
    { id: 6, src: "/photos/sisters.jpg", alt: "Sisters portrait", category: "events", caption: "Sisters", featured: true },
    // Additional photos
    { id: 7, src: "/photos/sis.JPEG", alt: "portrait", category: "portrait", caption: "Portrait" },
    { id: 8, src: "/photos/marriage.JPEG", alt: "Marriage ceremony", category: "weddings", caption: "Wedding" },
    { id: 9, src: "/photos/marriage1.JPEG", alt: "Wedding celebration", category: "weddings", caption: "Wedding" },
    { id: 10, src: "/photos/girl.JPEG", alt: "Sisters", category: "events", caption: "Portrait" },
    { id: 11, src: "/photos/graduation.JPEG", alt: "Graduation", category: "graduation", caption: "Graduation" },
  ];

  const filters: { value: Category; label: string }[] = [
    { value: "featured", label: "Featured" },
    { value: "all", label: "All" },
    { value: "weddings", label: "Weddings" },
    { value: "portrait", label: "Portrait" },
    { value: "graduation", label: "Graduations" },
    { value: "events", label: "Events" },
  ];

  const filteredPhotos = activeFilter === "featured"
    ? photos.filter((photo) => photo.featured)
    : activeFilter === "all"
    ? photos
    : photos.filter((photo) => photo.category === activeFilter);

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
              className={`px-4 py-2 text-sm font-body transition-all duration-300 ${
                activeFilter === filter.value
                  ? "bg-yellow-600 text-white shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-yellow-100 hover:text-yellow-700"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPhotos.map((photo) => (
            <div key={photo.id} className="group relative overflow-hidden">
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/60 to-transparent p-4">
                <span className="font-body text-sm text-background/90">
                  {photo.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
