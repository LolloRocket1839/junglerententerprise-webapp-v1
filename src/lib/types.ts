// Types for junglerent.it application

export type UserMode = "investor" | "student" | "tourist" | null;
export type AdminMode = "administrator";
export type ViewType = 
  | "dashboard"
  | "properties"
  | "applications"
  | "bookings"
  | "payments"
  | "messages"
  | "notifications"
  | "rent"
  | "invest"
  | "admin"
  | "admin-users"
  | "browse"
  | "leasing"
  | "launching-soon";

export type PropertyMode = "student" | "tourist" | "hybrid";
export type ApplicationStatus = "pending" | "reviewing" | "approved" | "signed" | "deposit_paid" | "rejected";
export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface Property {
  id: number;
  name: string;
  address: string;
  type: string;
  currentMode: PropertyMode;
  bedrooms: number;
  monthlyRate: number;
  nightlyRate: number;
  occupancy: number;
  yearlyRevenue: number;
  expenses: number;
  noi: number;
  price: number;
  distance: string;
  university: string;
  amenities: string[];
  investors: Investor[];
  petFriendly: boolean;
  furnished: boolean;
  parking: boolean;
  wifi: boolean;
  laundry: boolean;
  airConditioning: boolean;
  heating: boolean;
  elevator: boolean;
  accessible: boolean;
  virtualTourUrl?: string;
  images?: string[];
}

export interface Investor {
  name: string;
  fraction: number;
}

export interface Application {
  id: number;
  applicant: string;
  email: string;
  phone: string;
  university: string;
  propertyId: number;
  moveInDate: string;
  submittedDate: string;
  status: ApplicationStatus;
  score: number;
}

export interface Booking {
  id: number;
  guest: string;
  email: string;
  propertyId: number;
  checkIn: string;
  checkOut: string;
  nights: number;
  guestCount: number;
  total: number;
  platform: string;
  status: BookingStatus;
}

export interface RentPayment {
  id: number;
  studentId: number;
  month: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: "paid" | "due" | "upcoming" | "overdue" | "late";
  paymentMethod?: string;
  receiptUrl?: string;
}

export interface RentBreakdown {
  baseRent: number;
  utilities: number;
  internet: number;
  cleaning: number;
  discount: number;
  total: number;
}

export interface LeaseInfo {
  id: number;
  studentId: number;
  propertyId: number;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  deposit: number;
  depositPaid: boolean;
  guarantorName: string;
  guarantorContact: string;
}

export interface ChatConversation {
  id: number;
  userName: string;
  userType: "student" | "tourist" | "investor";
  propertyName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: "active" | "resolved" | "archived";
}

export interface ChatMessage {
  id: number;
  conversationId: number;
  senderId: number;
  senderName: string;
  senderType: "admin" | "student" | "tourist" | "investor";
  message: string;
  timestamp: string;
  read: boolean;
}

export interface Notification {
  id: number;
  type: "payment" | "application" | "booking" | "message" | "system";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface PlatformAnalytics {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  monthlyGrowth: number;
  usersByType: {
    students: number;
    investors: number;
    tourists: number;
  };
  revenueBySource: {
    studentRentals: number;
    touristBookings: number;
    investments: number;
  };
}

export interface AdminActivity {
  id: number;
  userName: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  userType: "student" | "tourist" | "investor";
  verificationStatus: "pending" | "verified" | "rejected";
  joinedDate: string;
}
