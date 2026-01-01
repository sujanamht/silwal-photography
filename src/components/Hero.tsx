import { CompanyDetails } from "@/types/api";

interface HeroProps {
  companyDetails: CompanyDetails;
}

const Hero = ({ companyDetails }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        src={companyDetails.background}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center pt-16">
        <p className="text-sm uppercase tracking-[0.2em] text-yellow-500 mb-4 animate-fade-in">
          {companyDetails.top_header}
        </p>
        <h1
          className="font-display text-5xl md:text-7xl font-medium text-white mb-6 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          {companyDetails.header}
        </h1>
        <p
          className="font-body text-lg md:text-xl text-white/80 max-w-xl mx-auto mb-10 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          {companyDetails.sub_header}
        </p>
        <a
          href="#booking"
          className="inline-block bg-white/20  border border-yellow-500 text-yellow-500 rounded-3xl  px-8 py-3 text-sm font-bold hover:bg-white hover:text-black transition-all shadow-sm animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          Book a Session
        </a>
      </div>
    </section>
  );
};

export default Hero;
