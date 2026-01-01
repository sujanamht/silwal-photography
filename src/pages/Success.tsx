import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ContactData, ContactResponse, CompanyDetails } from "@/types/api";

const Success = () => {
    const navigate = useNavigate();
    const [contactData, setContactData] = useState<ContactData | null>(null);
    const [companyDetails, setCompanyDetails] = useState<CompanyDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContactData = async () => {
            try {
                const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
                const isDevelopment = import.meta.env.DEV;
                const contactUrl = isDevelopment ? "/api/contact/" : `${baseUrl}/api/contact/`;
                const homeUrl = isDevelopment ? "/api/home/" : `${baseUrl}/api/home/`;

                // Fetch contact data
                const contactResponse = await fetch(contactUrl, {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (contactResponse.ok) {
                    const contactResult: ContactResponse = await contactResponse.json();
                    if (contactResult.success) {
                        setContactData(contactResult.data);
                    }
                }

                // Fetch company details for navigation/footer
                const homeResponse = await fetch(homeUrl, {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (homeResponse.ok) {
                    const homeResult = await homeResponse.json();
                    if (homeResult.success && homeResult.data?.company_details) {
                        setCompanyDetails(homeResult.data.company_details);
                    }
                }
            } catch (error) {
                console.error("Error fetching contact data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchContactData();
    }, []);

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-lg text-muted-foreground">Loading...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen">
            {companyDetails && <Navigation companyDetails={companyDetails} />}
            <section className="min-h-screen flex items-center justify-center pt-20 bg-gray-50">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    {/* Success Icon */}
                    <div className="mb-8 flex justify-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                            <svg
                                className="w-12 h-12 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Success Message */}
                    <h1 className="font-display text-4xl md:text-5xl font-medium text-foreground mb-4">
                        Booking Request <span className="text-yellow-600">Received!</span>
                    </h1>
                    <p className="font-body text-lg text-muted-foreground mb-8">
                        Thank you for your booking request. We've received your information and will get back to you soon.
                    </p>

                    {/* Contact Details Card */}
                    {contactData && (
                        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                            <h2 className="font-display text-2xl font-medium text-foreground mb-6">
                                For Faster Response
                            </h2>
                            <p className="font-body text-sm text-muted-foreground mb-6">
                                Feel free to reach out directly through any of these channels:
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center justify-center gap-3">
                                    <svg
                                        className="w-5 h-5 text-yellow-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <a
                                        href={`mailto:${contactData.email}`}
                                        className="font-body text-foreground hover:text-yellow-600 transition-colors"
                                    >
                                        {contactData.email}
                                    </a>
                                </div>

                                <div className="flex items-center justify-center gap-3">
                                    <svg
                                        className="w-5 h-5 text-yellow-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                    <a
                                        href={`tel:${contactData.phone_number}`}
                                        className="font-body text-foreground hover:text-yellow-600 transition-colors"
                                    >
                                        {contactData.phone_number}
                                    </a>
                                </div>

                                <div className="flex items-center justify-center gap-3">
                                    <svg
                                        className="w-5 h-5 text-yellow-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <span className="font-body text-foreground">{contactData.location}</span>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="mt-8 pt-8 border-t border-border flex justify-center gap-6">
                                {contactData.insta_link && (
                                    <a
                                        href={contactData.insta_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-yellow-600 transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    </a>
                                )}
                                {contactData.tiktok_link && (
                                    <a
                                        href={contactData.tiktok_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-yellow-600 transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate("/")}
                            className="px-8 py-3 bg-yellow-600 text-white font-medium hover:bg-yellow-700 transition-colors"
                        >
                            Back to Home
                        </button>
                        <button
                            onClick={() => navigate("/portfolio")}
                            className="px-8 py-3 bg-transparent border border-yellow-600 text-yellow-600 font-medium hover:bg-yellow-50 transition-colors"
                        >
                            View Portfolio
                        </button>
                    </div>
                </div>
            </section>
            {companyDetails && <Footer companyDetails={companyDetails} />}
        </main>
    );
};

export default Success;

