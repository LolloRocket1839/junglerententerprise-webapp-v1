import rentRoomSingle from '@/assets/rent-room-single.jpg';
import rentRoomDouble from '@/assets/rent-room-double.jpg';
import rentStudio from '@/assets/rent-studio.jpg';
import rentApartmentLiving from '@/assets/rent-apartment-living.jpg';
import rentBuildingExterior from '@/assets/rent-building-exterior.jpg';
import rentKitchen from '@/assets/rent-kitchen.jpg';

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
    title: "Appartamento Corso Duca",
    address: "Corso Duca degli Abruzzi 24, Torino",
    description: "Luminoso appartamento a due passi dal Politecnico di Torino. Recentemente ristrutturato, dotato di tutti i comfort per studenti e ottimo anche per soggiorni turistici.",
    city: "Torino",
    discounted_price_monthly: 840,
    market_price_monthly: 840,
    size_sqm: 65,
    rooms: 2,
    bathrooms: 1,
    images: [rentApartmentLiving],
    distance_to_university: "2 min dal Politecnico di Torino",
    availability_start: "2024-09-01",
    savings_percentage: 0,
    current_status: "available",
    has_balcony: true,
    has_kitchen: true,
    utilities_included: true,
    phone_number: "+393319053037"
  },
  {
    id: "2",
    title: "Bilocale Via Sacchi",
    address: "Via Sacchi 18, Torino",
    description: "Elegante bilocale in stile liberty a pochi passi dalla stazione di Porta Nuova e dal Politecnico. Perfetto per studenti o turisti.",
    city: "Torino",
    discounted_price_monthly: 840,
    market_price_monthly: 840,
    size_sqm: 55,
    rooms: 2,
    bathrooms: 1,
    images: [rentRoomDouble],
    distance_to_university: "7 min dal Politecnico di Torino",
    availability_start: "2024-09-01",
    savings_percentage: 0,
    current_status: "available",
    has_balcony: true,
    has_kitchen: true,
    utilities_included: true,
    phone_number: "+393319053037"
  },
  {
    id: "4",
    title: "Trilocale Corso Vittorio",
    address: "Corso Vittorio Emanuele II 68, Torino",
    description: "Spazioso appartamento con vista sulla Mole Antonelliana. Posizione strategica tra il Politecnico e il centro città.",
    city: "Torino",
    discounted_price_monthly: 1260,
    market_price_monthly: 1260,
    size_sqm: 85,
    rooms: 3,
    bathrooms: 2,
    images: [rentBuildingExterior],
    distance_to_university: "10 min dal Politecnico di Torino",
    availability_start: "2024-09-01",
    savings_percentage: 0,
    current_status: "available",
    has_balcony: true,
    has_kitchen: true,
    utilities_included: false,
    phone_number: "+393319053037"
  },
  {
    id: "5",
    title: "Attico Via Verdi",
    address: "Via Verdi 15, Torino",
    description: "Prestigioso attico nel cuore della città, a pochi passi da Palazzo Nuovo. Vista panoramica su tutta la città.",
    city: "Torino",
    discounted_price_monthly: 1260,
    market_price_monthly: 1260,
    size_sqm: 95,
    rooms: 3,
    bathrooms: 2,
    images: [rentKitchen],
    distance_to_university: "3 min dall'Università degli Studi di Torino",
    availability_start: "2024-09-01",
    savings_percentage: 0,
    current_status: "available",
    has_balcony: true,
    has_kitchen: true,
    utilities_included: true,
    phone_number: "+393319053037"
  },
  {
    id: "7",
    title: "Studio Via Sant'Ottavio",
    address: "Via Sant'Ottavio 20, Torino",
    description: "Moderno monolocale nel cuore del quartiere universitario. Arredamento contemporaneo e tutti i comfort.",
    city: "Torino",
    discounted_price_monthly: 420,
    market_price_monthly: 420,
    size_sqm: 40,
    rooms: 1,
    bathrooms: 1,
    images: [rentRoomDouble],
    distance_to_university: "1 min dall'Università degli Studi di Torino",
    availability_start: "2024-09-01",
    savings_percentage: 0,
    current_status: "available",
    has_balcony: true,
    has_kitchen: true,
    utilities_included: true,
    phone_number: "+393319053037"
  },
  {
    id: "8",
    title: "Bilocale Via Principe Amedeo",
    address: "Via Principe Amedeo 12, Torino",
    description: "Elegante appartamento in zona centrale, ideale per studenti. A pochi passi da tutti i servizi e trasporti.",
    city: "Torino",
    discounted_price_monthly: 840,
    market_price_monthly: 840,
    size_sqm: 50,
    rooms: 2,
    bathrooms: 1,
    images: [rentStudio],
    distance_to_university: "8 min dall'Università degli Studi di Torino",
    availability_start: "2024-09-15",
    savings_percentage: 0,
    current_status: "available",
    has_balcony: true,
    has_kitchen: true,
    utilities_included: false,
    phone_number: "+393319053037"
  }
];
