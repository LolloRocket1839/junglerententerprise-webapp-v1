// Mock data for junglerent.it application

import type {
  Property,
  Application,
  Booking,
  RentPayment,
  RentBreakdown,
  LeaseInfo,
  ChatConversation,
  ChatMessage,
  Notification,
  PlatformAnalytics,
  AdminActivity,
  AdminUser,
} from "./types";

export const properties: Property[] = [
  {
    id: 1,
    name: "Politecnico Studio",
    address: "Via Nizza 230, Turin",
    type: "Studio Apartment",
    currentMode: "student",
    bedrooms: 1,
    monthlyRate: 450,
    nightlyRate: 85,
    occupancy: 95,
    yearlyRevenue: 5400,
    expenses: 1200,
    noi: 4200,
    price: 120000,
    distance: "5 min from Politecnico",
    university: "Politecnico di Torino",
    amenities: ["WiFi", "Laundry", "Study Room", "Air Conditioning", "Furnished"],
    investors: [
      { name: "Lorenzo R.", fraction: 0.5 },
      { name: "Jungle Rent SRL", fraction: 0.5 },
    ],
    petFriendly: false,
    furnished: true,
    parking: false,
    wifi: true,
    laundry: true,
    airConditioning: true,
    heating: true,
    elevator: true,
    accessible: false,
    virtualTourUrl: "https://tour.junglerent.it/politecnico-studio",
  },
  {
    id: 2,
    name: "Centro Storico Loft",
    address: "Via Po 15, Turin",
    type: "Loft",
    currentMode: "hybrid",
    bedrooms: 2,
    monthlyRate: 750,
    nightlyRate: 120,
    occupancy: 88,
    yearlyRevenue: 9000,
    expenses: 2000,
    noi: 7000,
    price: 180000,
    distance: "10 min from UniTO",
    university: "Università di Torino",
    amenities: ["WiFi", "Terrace", "Dishwasher", "Washing Machine", "Furnished"],
    investors: [
      { name: "Lorenzo R.", fraction: 0.43 },
      { name: "Jungle Rent SRL", fraction: 0.57 },
    ],
    petFriendly: true,
    furnished: true,
    parking: true,
    wifi: true,
    laundry: true,
    airConditioning: true,
    heating: true,
    elevator: true,
    accessible: true,
  },
  {
    id: 3,
    name: "ESCP Luxury Apartment",
    address: "Corso Unione Sovietica 218, Turin",
    type: "3-Bedroom Apartment",
    currentMode: "tourist",
    bedrooms: 3,
    monthlyRate: 1200,
    nightlyRate: 165,
    occupancy: 75,
    yearlyRevenue: 14400,
    expenses: 3500,
    noi: 10900,
    price: 280000,
    distance: "2 min from ESCP",
    university: "ESCP Business School",
    amenities: ["WiFi", "Gym Access", "Concierge", "Smart Home", "Furnished", "Parking"],
    investors: [{ name: "Jungle Rent SRL", fraction: 1.0 }],
    petFriendly: true,
    furnished: true,
    parking: true,
    wifi: true,
    laundry: true,
    airConditioning: true,
    heating: true,
    elevator: true,
    accessible: true,
    virtualTourUrl: "https://tour.junglerent.it/escp-luxury",
  },
];

export const applications: Application[] = [
  {
    id: 1,
    applicant: "Marco Rossi",
    email: "marco.rossi@studenti.polito.it",
    phone: "+39 333 1234567",
    university: "Politecnico di Torino",
    propertyId: 1,
    moveInDate: "2025-09-01",
    submittedDate: "2025-06-15",
    status: "approved",
    score: 92,
  },
  {
    id: 2,
    applicant: "Giulia Bianchi",
    email: "giulia.bianchi@unito.it",
    phone: "+39 340 9876543",
    university: "Università di Torino",
    propertyId: 2,
    moveInDate: "2025-09-01",
    submittedDate: "2025-06-18",
    status: "reviewing",
    score: 85,
  },
  {
    id: 3,
    applicant: "Alessandro Verdi",
    email: "a.verdi@escp.eu",
    phone: "+39 347 5551234",
    university: "ESCP Business School",
    propertyId: 3,
    moveInDate: "2025-10-01",
    submittedDate: "2025-06-20",
    status: "pending",
    score: 78,
  },
];

export const bookings: Booking[] = [
  {
    id: 1,
    guest: "John Smith",
    email: "john.smith@email.com",
    propertyId: 2,
    checkIn: "2025-07-15",
    checkOut: "2025-07-18",
    nights: 3,
    guestCount: 2,
    total: 360,
    platform: "Airbnb",
    status: "confirmed",
  },
  {
    id: 2,
    guest: "Marie Dupont",
    email: "marie.dupont@email.fr",
    propertyId: 3,
    checkIn: "2025-08-01",
    checkOut: "2025-08-08",
    nights: 7,
    guestCount: 4,
    total: 1155,
    platform: "Booking.com",
    status: "pending",
  },
  {
    id: 3,
    guest: "Hans Mueller",
    email: "hans.mueller@email.de",
    propertyId: 2,
    checkIn: "2025-08-20",
    checkOut: "2025-08-25",
    nights: 5,
    guestCount: 2,
    total: 600,
    platform: "Direct",
    status: "confirmed",
  },
];

export const rentPayments: RentPayment[] = [
  {
    id: 1,
    studentId: 1,
    month: "Settembre 2025",
    amount: 450,
    dueDate: "2025-09-05",
    paidDate: "2025-09-03",
    status: "paid",
    paymentMethod: "Bonifico Bancario",
    receiptUrl: "/receipts/sept-2025.pdf",
  },
  {
    id: 2,
    studentId: 1,
    month: "Ottobre 2025",
    amount: 450,
    dueDate: "2025-10-05",
    paidDate: "2025-10-04",
    status: "paid",
    paymentMethod: "Bonifico Bancario",
    receiptUrl: "/receipts/oct-2025.pdf",
  },
  {
    id: 3,
    studentId: 1,
    month: "Novembre 2025",
    amount: 450,
    dueDate: "2025-11-05",
    status: "due",
  },
  {
    id: 4,
    studentId: 1,
    month: "Dicembre 2025",
    amount: 450,
    dueDate: "2025-12-05",
    status: "upcoming",
  },
];

export const rentBreakdowns: Record<number, RentBreakdown> = {
  1: {
    baseRent: 600,
    utilities: 50,
    internet: 25,
    cleaning: 25,
    discount: -150,
    total: 450,
  },
  2: {
    baseRent: 1000,
    utilities: 80,
    internet: 30,
    cleaning: 40,
    discount: -250,
    total: 750,
  },
};

export const leaseInfo: LeaseInfo[] = [
  {
    id: 1,
    studentId: 1,
    propertyId: 1,
    startDate: "2025-09-01",
    endDate: "2026-06-30",
    monthlyRent: 450,
    deposit: 900,
    depositPaid: true,
    guarantorName: "Giuseppe Rossi",
    guarantorContact: "+39 320 1234567",
  },
];

export const chatConversations: ChatConversation[] = [
  {
    id: 1,
    userName: "Marco Rossi",
    userType: "student",
    propertyName: "Politecnico Studio",
    lastMessage: "Quando posso venire a vedere l'appartamento?",
    lastMessageTime: "2025-10-24T14:30:00Z",
    unreadCount: 2,
    status: "active",
  },
  {
    id: 2,
    userName: "John Smith",
    userType: "tourist",
    propertyName: "Centro Storico Loft",
    lastMessage: "Thank you for the information!",
    lastMessageTime: "2025-10-23T10:15:00Z",
    unreadCount: 0,
    status: "resolved",
  },
  {
    id: 3,
    userName: "Lorenzo R.",
    userType: "investor",
    propertyName: "Portfolio Overview",
    lastMessage: "Can we schedule a call about the Q4 returns?",
    lastMessageTime: "2025-10-22T16:45:00Z",
    unreadCount: 1,
    status: "active",
  },
];

export const chatMessages: ChatMessage[] = [
  {
    id: 1,
    conversationId: 1,
    senderId: 1,
    senderName: "Marco Rossi",
    senderType: "student",
    message: "Buongiorno, sono interessato all'appartamento vicino al Politecnico.",
    timestamp: "2025-10-24T14:00:00Z",
    read: true,
  },
  {
    id: 2,
    conversationId: 1,
    senderId: 0,
    senderName: "Jungle Rent",
    senderType: "admin",
    message: "Ciao Marco! Grazie per il tuo interesse. L'appartamento è disponibile da settembre.",
    timestamp: "2025-10-24T14:15:00Z",
    read: true,
  },
  {
    id: 3,
    conversationId: 1,
    senderId: 1,
    senderName: "Marco Rossi",
    senderType: "student",
    message: "Quando posso venire a vedere l'appartamento?",
    timestamp: "2025-10-24T14:30:00Z",
    read: false,
  },
];

export const notifications: Notification[] = [
  {
    id: 1,
    type: "payment",
    title: "Pagamento Ricevuto",
    message: "Affitto di Ottobre pagato con successo",
    timestamp: "2025-10-04T09:00:00Z",
    read: true,
  },
  {
    id: 2,
    type: "application",
    title: "Nuova Candidatura",
    message: "Giulia Bianchi ha inviato una candidatura",
    timestamp: "2025-10-18T11:30:00Z",
    read: false,
  },
  {
    id: 3,
    type: "booking",
    title: "Nuova Prenotazione",
    message: "Prenotazione confermata per Centro Storico Loft",
    timestamp: "2025-10-20T15:45:00Z",
    read: false,
  },
];

export const platformAnalytics: PlatformAnalytics = {
  totalUsers: 1247,
  activeUsers: 892,
  totalRevenue: 156000,
  monthlyGrowth: 12.5,
  usersByType: {
    students: 845,
    investors: 124,
    tourists: 278,
  },
  revenueBySource: {
    studentRentals: 89000,
    touristBookings: 42000,
    investments: 25000,
  },
};

export const adminActivities: AdminActivity[] = [
  {
    id: 1,
    userName: "Marco Rossi",
    action: "Application Submitted",
    details: "Applied for Politecnico Studio",
    timestamp: "2025-10-24T14:30:00Z",
  },
  {
    id: 2,
    userName: "John Smith",
    action: "Booking Completed",
    details: "Checked out from Centro Storico Loft",
    timestamp: "2025-10-23T11:00:00Z",
  },
  {
    id: 3,
    userName: "Lorenzo R.",
    action: "Investment Made",
    details: "Invested €5,000 in ESCP Luxury Apartment",
    timestamp: "2025-10-22T09:15:00Z",
  },
];

export const adminUsers: AdminUser[] = [
  {
    id: 1,
    name: "Marco Rossi",
    email: "marco.rossi@studenti.polito.it",
    userType: "student",
    verificationStatus: "verified",
    joinedDate: "2025-06-15",
  },
  {
    id: 2,
    name: "Giulia Bianchi",
    email: "giulia.bianchi@unito.it",
    userType: "student",
    verificationStatus: "pending",
    joinedDate: "2025-10-18",
  },
  {
    id: 3,
    name: "Lorenzo R.",
    email: "lorenzo@investor.it",
    userType: "investor",
    verificationStatus: "verified",
    joinedDate: "2025-01-10",
  },
];

// Mock property investment data for property-investment-view
export const mockProperties = properties;

export const propertyInvestmentData: Record<number, {
  propertyImages: string[];
  currentTenants: Array<{
    firstName: string;
    university: string;
    program?: string;
    moveInDate: string;
  }>;
  historicalPerformance: Array<{
    month: string;
    revenue: number;
    occupancy: number;
  }>;
  investmentReturns: Array<{
    quarter: string;
    amount: number;
    percentage: number;
    paid: boolean;
    paymentDate?: string;
  }>;
  averageOccupancy: number;
}> = {
  1: {
    propertyImages: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    currentTenants: [
      {
        firstName: "Marco",
        university: "Politecnico di Torino",
        program: "Ingegneria Informatica",
        moveInDate: "2025-09-01",
      },
    ],
    historicalPerformance: [
      { month: "Apr", revenue: 450, occupancy: 100 },
      { month: "May", revenue: 450, occupancy: 100 },
      { month: "Jun", revenue: 450, occupancy: 100 },
      { month: "Jul", revenue: 680, occupancy: 80 },
      { month: "Aug", revenue: 850, occupancy: 100 },
      { month: "Sep", revenue: 450, occupancy: 100 },
      { month: "Oct", revenue: 450, occupancy: 100 },
    ],
    investmentReturns: [
      { quarter: "Q1 2025", amount: 1050, percentage: 2.1, paid: true, paymentDate: "2025-04-01" },
      { quarter: "Q2 2025", amount: 1050, percentage: 2.1, paid: true, paymentDate: "2025-07-01" },
      { quarter: "Q3 2025", amount: 1100, percentage: 2.2, paid: true, paymentDate: "2025-10-01" },
      { quarter: "Q4 2025", amount: 1100, percentage: 2.2, paid: false },
    ],
    averageOccupancy: 97,
  },
  2: {
    propertyImages: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    currentTenants: [
      {
        firstName: "Giulia",
        university: "Università di Torino",
        program: "Economia",
        moveInDate: "2025-09-01",
      },
      {
        firstName: "Alessandro",
        university: "Università di Torino",
        moveInDate: "2025-09-01",
      },
    ],
    historicalPerformance: [
      { month: "Apr", revenue: 750, occupancy: 100 },
      { month: "May", revenue: 750, occupancy: 100 },
      { month: "Jun", revenue: 750, occupancy: 100 },
      { month: "Jul", revenue: 960, occupancy: 80 },
      { month: "Aug", revenue: 1200, occupancy: 100 },
      { month: "Sep", revenue: 750, occupancy: 100 },
      { month: "Oct", revenue: 750, occupancy: 100 },
    ],
    investmentReturns: [
      { quarter: "Q1 2025", amount: 1750, percentage: 2.3, paid: true, paymentDate: "2025-04-01" },
      { quarter: "Q2 2025", amount: 1750, percentage: 2.3, paid: true, paymentDate: "2025-07-01" },
      { quarter: "Q3 2025", amount: 1800, percentage: 2.4, paid: true, paymentDate: "2025-10-01" },
      { quarter: "Q4 2025", amount: 1800, percentage: 2.4, paid: false },
    ],
    averageOccupancy: 94,
  },
  3: {
    propertyImages: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    currentTenants: [],
    historicalPerformance: [
      { month: "Apr", revenue: 0, occupancy: 0 },
      { month: "May", revenue: 1650, occupancy: 50 },
      { month: "Jun", revenue: 3300, occupancy: 100 },
      { month: "Jul", revenue: 4950, occupancy: 100 },
      { month: "Aug", revenue: 4950, occupancy: 100 },
      { month: "Sep", revenue: 1650, occupancy: 50 },
      { month: "Oct", revenue: 0, occupancy: 0 },
    ],
    investmentReturns: [
      { quarter: "Q1 2025", amount: 0, percentage: 0, paid: true, paymentDate: "2025-04-01" },
      { quarter: "Q2 2025", amount: 2725, percentage: 2.4, paid: true, paymentDate: "2025-07-01" },
      { quarter: "Q3 2025", amount: 2900, percentage: 2.6, paid: true, paymentDate: "2025-10-01" },
      { quarter: "Q4 2025", amount: 500, percentage: 0.4, paid: false },
    ],
    averageOccupancy: 57,
  },
};
