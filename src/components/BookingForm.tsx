import { useState } from "react";
import { z } from "zod";

const bookingSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().min(1, "Phone is required"),
  sessionType: z.string().min(1, "Please select a session type"),
  preferredDate: z.string().min(1, "Please select a date"),
  message: z.string().min(1, "Please tell me about your event"),
});

type BookingData = z.infer<typeof bookingSchema>;
type FormErrors = Partial<Record<keyof BookingData, string>>;

const BookingForm = () => {
  const [formData, setFormData] = useState<BookingData>({
    name: "",
    email: "",
    phone: "",
    sessionType: "",
    preferredDate: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof BookingData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = bookingSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof BookingData;
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }
    
    setIsSubmitted(true);
    setErrors({});
  };

  const sessionTypes = [
    { value: "", label: "Select a session type *" },
    { value: "wedding", label: "Wedding" },
    { value: "graduation", label: "Graduation" },
    { value: "event", label: "Event" },
    { value: "other", label: "Other" },
  ];

  const inputClasses = "w-full px-4 py-3 bg-background border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors";

  return (
    <section id="booking" className="py-20 md:py-28 bg-card">
      <div className="max-w-xl mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground mb-4 text-center">
          Book a <span className="text-yellow-600">Session</span>
        </h2>
        <p className="font-body text-muted-foreground text-center mb-10">
          Request a date for your session.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name *"
              value={formData.name}
              onChange={handleChange}
              className={inputClasses}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-destructive">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleChange}
              className={inputClasses}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone *"
              value={formData.phone}
              onChange={handleChange}
              className={inputClasses}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-destructive">{errors.phone}</p>
            )}
          </div>

          <div>
            <select
              name="sessionType"
              value={formData.sessionType}
              onChange={handleChange}
              className={inputClasses}
            >
              {sessionTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.sessionType && (
              <p className="mt-1 text-xs text-destructive">{errors.sessionType}</p>
            )}
          </div>

          <div>
            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              className={inputClasses}
            />
            {errors.preferredDate && (
              <p className="mt-1 text-xs text-destructive">{errors.preferredDate}</p>
            )}
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Tell me about your event *"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className={`${inputClasses} resize-none`}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-destructive">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-3 text-sm font-medium hover:bg-yellow-700 transition-all"
          >
            Send Booking Request
          </button>
        </form>

        {isSubmitted && (
          <div className="mt-6 p-4 bg-secondary text-center">
            <p className="font-body text-sm text-secondary-foreground">
              Thank you! Your request has been received. I'll get back to you soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingForm;
