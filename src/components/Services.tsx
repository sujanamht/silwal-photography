import { useNavigate } from "react-router-dom";
import { Service as ServiceType } from "@/types/api";

interface ServicesProps {
  services: ServiceType[];
}

const Services = ({ services }: ServicesProps) => {
  const navigate = useNavigate();

  // Parse HTML description to extract text features
  const parseDescription = (html: string): string[] => {
    // Simple parsing - extract text from <p> tags or plain text
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const paragraphs = doc.querySelectorAll("p");
    if (paragraphs.length > 0) {
      return Array.from(paragraphs)
        .map((p) => p.textContent?.trim())
        .filter((text) => text && text.length > 0) as string[];
    }
    // Fallback: split by line breaks or return as single item
    return html
      .replace(/<[^>]*>/g, "")
      .split(/\n|<br\s*\/?>/i)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  };

  return (
    <section id="services" className="relative py-20 md:py-28 overflow-hidden">
      {/* Blurred Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm scale-105"
        style={{ backgroundImage: "url('/photos/bg.jpg')" }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative max-w-6xl mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-medium text-white mb-12 text-center">
          My <span className="text-yellow-600">Services</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services
            .sort((a, b) => a.priority - b.priority)
            .map((service) => {
              const features = parseDescription(service.description);
              return (
                <div
                  key={service.id}
                  className="bg-white/90 backdrop-blur-sm p-8 text-center hover:bg-white transition-all duration-300 group"
                >
                  <h3 className="font-display text-xl font-medium text-foreground mb-6 group-hover:text-yellow-700 transition-colors">
                    {service.name}
                  </h3>
                  {features.length > 0 && (
                    <ul className="space-y-3 mb-8">
                      {features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="font-body text-sm text-muted-foreground"
                        >
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

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/services")}
            className="px-8 py-3 bg-white text-yellow-600 border-2 border-yellow-600 font-medium hover:bg-yellow-50 transition-colors"
          >
            View All Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
