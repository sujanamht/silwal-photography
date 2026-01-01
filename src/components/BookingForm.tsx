import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { BookingRequest, BookingApiResponse } from "@/types/api";

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

// Helper function to get CSRF token from cookies
const getCsrfToken = (): string | null => {
  const name = "csrftoken";
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [key, value] = cookie.trim().split("=");
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
};

// Helper function to fetch CSRF token from backend if not in cookies
const fetchCsrfToken = async (): Promise<string | null> => {
  try {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
    const isDevelopment = import.meta.env.DEV;
    const apiUrl = isDevelopment
      ? "/api/home/"
      : `${baseUrl}/api/home/`;

    // Make a GET request to get CSRF token cookie
    await fetch(apiUrl, {
      method: "GET",
      credentials: "include",
    });

    // Try to get token from cookies again
    return getCsrfToken();
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    return null;
  }
};

const BookingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BookingData>({
    name: "",
    email: "",
    phone: "",
    sessionType: "",
    preferredDate: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof BookingData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

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

    setIsSubmitting(true);
    setErrors({});

    try {
      // Prepare API request data
      const bookingData: BookingRequest = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        session_type: formData.sessionType,
        event_date: formData.preferredDate,
        event_details: formData.message,
      };

      // Determine API URL (use proxy in development)
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
      const isDevelopment = import.meta.env.DEV;
      const apiUrl = isDevelopment
        ? "/api/bookings/create/"
        : `${baseUrl}/api/bookings/create/`;

      // Get CSRF token from cookies, or fetch it if not available
      let csrfToken = getCsrfToken();
      if (!csrfToken) {
        csrfToken = await fetchCsrfToken();
      }

      // Prepare headers
      const headers: HeadersInit = {
        accept: "application/json",
        "Content-Type": "application/json",
      };

      // Add CSRF token if available
      if (csrfToken) {
        headers["X-CSRFToken"] = csrfToken;
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers,
        credentials: "include", // Include cookies for CSRF
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Unknown error" }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result: BookingApiResponse = await response.json();

      if (result.success) {
        // Redirect to success page
        navigate("/success");
      } else {
        throw new Error(result.message || "Failed to create booking");
      }
    } catch (err) {
      let errorMessage = "Failed to submit booking request. Please try again.";

      if (err instanceof TypeError && err.message.includes("fetch")) {
        errorMessage = "Network error: Unable to connect to the server. Please check your connection.";
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setSubmitError(errorMessage);
      console.error("Error submitting booking:", err);
    } finally {
      setIsSubmitting(false);
    }
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
            disabled={isSubmitting}
            className={`w-full bg-yellow-600 text-white py-3 text-sm font-medium hover:bg-yellow-700 transition-all ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {isSubmitting ? "Submitting..." : "Send Booking Request"}
          </button>
        </form>

        {submitError && (
          <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 text-center">
            <p className="font-body text-sm text-destructive">
              {submitError}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingForm;
