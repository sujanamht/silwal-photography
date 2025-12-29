interface Service {
  title: string;
  features: string[];
  price: string;
}

const Services = () => {
  const services: Service[] = [
    {
      title: "Weddings",
      features: [
        "Full day coverage (8+ hours)",
        "Engagement session included",
        "Online gallery with downloads",
      ],
      price: "Starting at $1,500 +",
    },
    {
      title: "Graduations ",
      features: [
        "1-2 hour portrait session",
        "Multiple outfit changes",
        "5+ edited digital images",
      ],
      price: "Starting at $150 +",
    },
    {
      title: "Events & Parties",
      features: [
        "Flexible hourly coverage",
        "Candid & group photos",
        "Quick turnaround delivery",
      ],
      price: "Starting at $200/hr +",
    },
  ];

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
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm p-8 text-center hover:bg-white transition-all duration-300 group"
            >
              <h3 className="font-display text-xl font-medium text-foreground mb-6 group-hover:text-yellow-700 transition-colors">
                {service.title}
              </h3>
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="font-body text-sm text-muted-foreground"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="font-body text-sm font-semibold text-yellow-700">
                {service.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
