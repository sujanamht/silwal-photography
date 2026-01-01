export interface CompanyDetails {
    logo: string;
    logo_name: string;
    top_header: string;
    header: string;
    sub_header: string;
    background: string;
    about_us_pic: string;
    about_us_details: string;
    fb_link: string | null;
    insta_link: string | null;
    tiktok_link: string | null;
    email: string;
    phone_number: string;
    location: string;
}

export interface PortfolioCategory {
    id: number;
    name: string;
    is_featured_in_home_page: boolean;
}

export interface PortfolioItem {
    id: number;
    category: PortfolioCategory;
    file: string;
    file_type: string;
    priority: number;
    is_featured_in_home_page: boolean;
    created_at: string;
}

export interface Service {
    id: number;
    name: string;
    description: string;
    starting_price: string;
    priority: number;
    is_featured: boolean;
    created_at: string;
}

export interface HomePageData {
    company_details: CompanyDetails;
    portfolio_categories: PortfolioCategory[];
    portfolio_items: PortfolioItem[];
    services: Service[];
}

export interface HomePageResponse {
    success: boolean;
    data: HomePageData;
}

export interface BookingRequest {
    name: string;
    email: string;
    phone: string;
    session_type: string;
    event_date: string;
    event_details: string;
}

export interface BookingResponse {
    id: number;
    name: string;
    email: string;
    phone: string;
    session_type: string;
    event_date: string;
    status: string;
    created_at: string;
}

export interface BookingApiResponse {
    success: boolean;
    message: string;
    data: BookingResponse;
}

export interface ContactData {
    email: string;
    phone_number: string;
    location: string;
    fb_link: string | null;
    insta_link: string | null;
    tiktok_link: string | null;
}

export interface ContactResponse {
    success: boolean;
    data: ContactData;
}

export interface PortfolioListResponse {
    success: boolean;
    count: number;
    next: string | null;
    previous: string | null;
    results: PortfolioItem[];
    current_page: number;
    total_pages: number;
    categories: PortfolioCategory[];
    current_category: number | null;
}

export interface ServicesListResponse {
    success: boolean;
    count: number;
    next: string | null;
    previous: string | null;
    results: Service[];
    current_page: number;
    total_pages: number;
}

