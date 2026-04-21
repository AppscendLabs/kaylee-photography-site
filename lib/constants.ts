import type { NavLink, PortfolioImage, FeaturedWork, Package } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { name: "Home", path: "/" },
  { name: "Selected Works", path: "/works" },
  { name: "Investment", path: "/packages" },
  { name: "Book & Connect", path: "/book" },
];

export const AVAILABLE_TIMES = ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"];

export const PACKAGES: Package[] = [
  {
    name: "The Portrait Session",
    price: "$450",
    desc: "Perfect for individuals, couples, or maternity. Capturing your authentic self in a relaxed environment.",
    features: [
      "1 hour of coverage",
      "Online high-resolution gallery",
      "Print rights",
      "Style consultation",
    ],
  },
  {
    name: "The Family Collection",
    price: "$650",
    desc: "Our most popular collection, offering comprehensive coverage for your family's precious moments.",
    features: [
      "1.5 hours of coverage",
      "Up to 6 family members",
      "Candid & posed portraits",
      "Location of your choice",
      "Online high-resolution gallery",
    ],
  },
  {
    name: "The Event Coverage",
    price: "$1,200",
    desc: "The ultimate storytelling experience for your special gatherings, corporate events, and parties.",
    features: [
      "4 hours of event coverage",
      "Documentary & candid style",
      "Quick turnaround sneak peeks",
      "Online high-resolution gallery",
      "Commercial use rights",
    ],
  },
];

export const PORTFOLIO_IMAGES: PortfolioImage[] = [
  {
    src: "https://images.unsplash.com/photo-1775333273212-e06fed7a485c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHN0dWRpbyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3Njc0MzA5OHww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Creative Studio Portrait",
    category: "portraits",
  },
  {
    src: "https://images.unsplash.com/photo-1601294281485-2b5a214689dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBvdXRkb29yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc2NzQzMDk3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Outdoor Family Portrait",
    category: "families",
  },
  {
    src: "https://images.unsplash.com/photo-1763256377588-f29bdc912698?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBldmVudCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc3Njc0MzA5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Professional Event Photography",
    category: "events",
  },
  {
    src: "https://images.unsplash.com/photo-1656177999031-0d3e8e62317a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW5kaWQlMjBmYW1pbHklMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NzY3NDMwOTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Candid Family Photography",
    category: "families",
  },
  {
    src: "https://images.unsplash.com/photo-1768508664411-9bef1b361224?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBldmVudCUyMGdhdGhlcmluZ3xlbnwxfHx8fDE3NzY3NDMwOTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Corporate Event Gathering",
    category: "events",
  },
  {
    src: "https://images.unsplash.com/photo-1596510914965-9ae08acae566?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjBmYW1pbHklMjBwaG90b3xlbnwxfHx8fDE3NzY3NDMwOTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Lifestyle Family Photo",
    category: "lifestyle",
  },
  {
    src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1080",
    alt: "Portrait Session",
    category: "portraits",
  },
  {
    src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1080",
    alt: "Family Portrait",
    category: "families",
  },
];

export const FEATURED_WORKS: FeaturedWork[] = [
  {
    src: "https://images.unsplash.com/photo-1775333273212-e06fed7a485c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHN0dWRpbyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3Njc0MzA5OHww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Creative Portrait",
    title: "Quiet Confidence",
    category: "Portraits",
    delay: 0,
  },
  {
    src: "https://images.unsplash.com/photo-1601294281485-2b5a214689dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBvdXRkb29yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc2NzQzMDk3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Outdoor Family",
    title: "Generations",
    category: "Family",
    delay: 0.2,
  },
  {
    src: "https://images.unsplash.com/photo-1763256377588-f29bdc912698?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBldmVudCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc3Njc0MzA5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Event Photography",
    title: "The Gathering",
    category: "Events",
    delay: 0,
  },
  {
    src: "https://images.unsplash.com/photo-1596510914965-9ae08acae566?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjBmYW1pbHklMjBwaG90b3xlbnwxfHx8fDE3NzY3NDMwOTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Lifestyle Family",
    title: "Sunday Mornings",
    category: "Lifestyle",
    delay: 0.2,
  },
];

