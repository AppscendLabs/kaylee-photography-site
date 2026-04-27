export interface NavLink {
  name: string;
  path: string;
}

export interface PortfolioImage {
  src: string;
  alt: string;
  category: "portraits" | "families" | "events" | "lifestyle";
}

export interface FeaturedWork {
  src: string;
  alt: string;
  title: string;
  category: string;
  delay: number;
}

export interface Package {
  name: string;
  price: string;
  desc: string;
  features: string[];
}

// Serializable booking type (dates as ISO strings for client components)
export interface BookingRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  sessionDate: string;
  sessionTime: string;
  sessionType: string;
  message: string;
  status: "PENDING" | "APPROVED" | "DECLINED";
  paymentStatus: "UNPAID" | "DEPOSIT_PENDING" | "DEPOSIT_PAID" | "FULLY_PAID" | "REFUNDED";
  depositAmount: number;
  createdAt: string;
}

export interface PackageSetting {
  id: string;
  packageKey: string;
  label: string;
  priceCents: number;
  depositCents: number;
}

export interface AvailabilityData {
  blockedDates: string[];
  workingDays: { dayOfWeek: number; isActive: boolean }[];
  timeSlots: { time: string; isActive: boolean }[];
}

export type BookingStep = 1 | 2;
export type AdminTab = "requests" | "schedule" | "settings" | "packages";
