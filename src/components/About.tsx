import { CompanyDetails } from "@/types/api";

interface AboutProps {
  companyDetails: CompanyDetails;
}

const About = ({ companyDetails }: AboutProps) => {
  // Parse HTML content and extract text, or use dangerouslySetInnerHTML
  const createMarkup = () => {
    return { __html: companyDetails.about_us_details };
  };

  return (
    <section id="about" className="min-h-screen flex items-center pt-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-center">

          {/* Image - smaller, left side */}
          <div className="lg:col-span-2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Soft bokeh-inspired circles */}
              <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-yellow-400/20 blur-3xl" />
              <div className="absolute -bottom-12 -right-6 w-40 h-40 rounded-full bg-yellow-500/15 blur-3xl" />
              <div className="absolute top-1/2 -left-16 w-24 h-24 rounded-full bg-neutral-400/10 blur-2xl" />

              {/* Image */}
              <img
                src={companyDetails.about_us_pic}
                alt="Ashok Silwal"
                loading="eager"
                fetchPriority="high"
                className="relative z-10 w-auto h-auto object-cover"
              />
            </div>
          </div>

          {/* Text - right side */}
          <div className="lg:col-span-3">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
              About
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground mb-8">
              {companyDetails.header}
            </h2>
            <div
              className="font-body text-muted-foreground leading-relaxed mb-10 max-w-lg"
              dangerouslySetInnerHTML={createMarkup()}
            />

            <a
              href="#booking"
              className="inline-block text-sm font-medium text-foreground border-b border-foreground pb-1 hover:text-muted-foreground hover:border-muted-foreground transition-colors"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
