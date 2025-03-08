export const cities = [
  "Roma", "Milano", "Firenze", "Torino", "Bologna", "Napoli", "Padova", "Pisa"
];

export const universities = {
  "Roma": ["La Sapienza", "Roma Tre", "LUISS"],
  "Milano": ["Politecnico di Milano", "Università degli Studi di Milano", "Bocconi"],
  "Firenze": ["Università degli Studi di Firenze"],
  "Torino": ["Politecnico di Torino", "Università degli Studi di Torino"],
  "Bologna": ["Università di Bologna"],
  "Napoli": ["Università degli Studi di Napoli Federico II"],
  "Padova": ["Università degli Studi di Padova"],
  "Pisa": ["Università di Pisa", "Scuola Normale Superiore"]
};

export const mockProperties = [
  {
    id: "1",
    title: "Appartamento Storico Via Roma",
    address: "Via Roma 45, Torino",
    description: "Prestigioso appartamento in palazzo d'epoca del '900, con soffitti affrescati e pavimenti in parquet originale. Dotato di ampie finestre che si affacciano sulla storica Via Roma.",
    city: "Torino",
    discounted_price_monthly: 420,
    market_price_monthly: 520,
    size_sqm: 75,
    rooms: 3,
    bathrooms: 1,
    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"],
    distance_to_university: "8 min dal Politecnico di Torino",
    availability_start: "2024-09-01",
    savings_percentage: 16,
    current_status: "available",
    has_balcony: true,
    has_kitchen: true,
    utilities_included: true,
    phone_number: "+393319053037"
  },
  {
    id: "2",
    title: "Residenza Storica San Salvario",
    address: "Via Nizza 28, Torino",
    description: "Elegante appartamento in stile liberty con elementi architettonici originali, situato nel cuore del quartiere San Salvario. Stucchi decorativi e porte originali dell'800.",
    city: "Torino",
    discounted_price_monthly: 400,
    market_price_monthly: 480,
    size_sqm: 65,
    rooms: 2,
    bathrooms: 1,
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c"],
    distance_to_university: "10 min dal Politecnico di Torino",
    availability_start: "2024-09-15",
    savings_percentage: 15,
    current_status: "available",
    has_balcony: true,
    has_kitchen: true,
    utilities_included: false,
    phone_number: "+393319053037"
  },
  {
    id: "3",
    title: "Palazzo Madama View",
    address: "Via Po 15, Torino",
    description: "Prestigioso appartamento con vista su Palazzo Madama, in edificio del XVIII secolo. Caratterizzato da alti soffitti con travi a vista e camino storico funzionante.",
    city: "Torino",
    discounted_price_monthly: 430,
    market_price_monthly: 530,
    size_sqm: 90,
    rooms: 3,
    bathrooms: 2,
    images: ["https://images.unsplash.com/photo-1600607687644-c94bf5588563"],
    distance_to_university: "5 min dall'Università degli Studi di Torino",
    availability_start: "2024-09-01",
    savings_percentage: 15,
    current_status: "available",
    has_balcony: true,
    has_kitchen: true,
    utilities_included: true,
    phone_number: "+393319053037"
  },
  {
    id: "4",
    title: "Residenza Piazza Vittorio",
    address: "Piazza Vittorio Veneto 8, Torino",
    description: "Appartamento signorile in palazzo barocco, affacciato sulla maestosa Piazza Vittorio. Restaurato mantenendo le caratteristiche storiche originali.",
    city: "Torino",
    discounted_price_monthly: 410,
    market_price_monthly: 490,
    size_sqm: 70,
    rooms: 2,
    bathrooms: 1,
    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"],
    distance_to_university: "7 min dall'Università degli Studi di Torino",
    availability_start: "2024-09-01",
    savings_percentage: 13,
    current_status: "available",
    has_balcony: true,
    has_kitchen: true,
    utilities_included: true,
    phone_number: "+393319053037"
  },
  {
    id: "5",
    title: "Appartamento Pantheon",
    address: "Via del Pantheon 57, Roma",
    description: "Esclusivo appartamento con vista diretta sul Pantheon, in palazzo del XVII secolo. Soffitti a cassettoni e pavimenti in cotto originale.",
    city: "Roma",
    discounted_price_monthly: 600,
    market_price_monthly: 700,
    size_sqm: 85,
    rooms: 2,
    bathrooms: 1,
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c"],
    distance_to_university: "10 min da La Sapienza",
    availability_start: "2024-09-15",
    savings_percentage: 14,
    current_status: "available",
    has_balcony: true,
    has_kitchen: true,
    utilities_included: false,
    phone_number: "+393319053037"
  },
  {
    id: "6",
    title: "Dimora Storica Trastevere",
    address: "Via della Lungara 45, Roma",
    description: "Caratteristico appartamento nel cuore di Trastevere, con travi a vista e pavimenti in legno originale. Atmosfera autentica romana.",
    city: "Roma",
    discounted_price_monthly: 580,
    market_price_monthly: 680,
    size_sqm: 60,
    rooms: 2,
    bathrooms: 1,
    images: ["https://images.unsplash.com/photo-1600607687644-c94bf5588563"],
    distance_to_university: "15 min da Roma Tre",
    availability_start: "2024-09-01",
    savings_percentage: 14,
    current_status: "available",
    has_balcony: true,
    has_kitchen: true,
    utilities_included: true,
    phone_number: "+393319053037"
  },
  {
    id: "7",
    title: "Residenza Campo de' Fiori",
    address: "Via dei Giubbonari 23, Roma",
    description: "Elegante appartamento d'epoca con vista su Campo de' Fiori. Archi in pietra e soffitti alti caratterizzano questo spazio unico.",
    city: "Roma",
    discounted_price_monthly: 620,
    market_price_monthly: 720,
    size_sqm: 75,
    rooms: 2,
    bathrooms: 1,
    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"],
    distance_to_university: "12 min dalla LUISS",
    availability_start: "2024-09-01",
    savings_percentage: 15,
    current_status: "available",
    has_balcony: false,
    has_kitchen: true,
    utilities_included: true,
    phone_number: "+393319053037"
  },
  {
    id: "8",
    title: "Palazzo Navona Suite",
    address: "Via della Pace 12, Roma",
    description: "Raffinato appartamento in palazzo nobiliare del '600, a due passi da Piazza Navona. Affreschi originali e finiture di pregio.",
    city: "Roma",
    discounted_price_monthly: 650,
    market_price_monthly: 750,
    size_sqm: 95,
    rooms: 3,
    bathrooms: 2,
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c"],
    distance_to_university: "8 min da La Sapienza",
    availability_start: "2024-09-15",
    savings_percentage: 13,
    current_status: "available",
    has_balcony: true,
    has_kitchen: true,
    utilities_included: false,
    phone_number: "+393319053037"
  }
];
