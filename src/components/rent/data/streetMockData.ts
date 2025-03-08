import { StreetProperty } from '../types/mockups';

export const mockProperties: StreetProperty[] = [
  {
    street: "Via Reumberto 1",
    description: "Elegante palazzo nel centro storico",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    contactPhone: "+39 123 456 7890",
    rooms: [
      {
        id: "1",
        name: "Camera Singola A",
        price: 450,
        size: "16m²",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
        description: "Stanza in ottime condizioni caratterizzata da ottima luminosità grazie alle ampie finestre che si affacciano sul cortile interno. Ambiente accogliente e ben curato, recentemente ristrutturato con finiture moderne e materiali di qualità. La posizione privilegiata garantisce un'illuminazione naturale per gran parte della giornata, creando un ambiente ideale per studio e relax.",
        furniture: [
          "Letto singolo con materasso ortopedico",
          "Scrivania con sedia ergonomica",
          "Armadio a 3 ante",
          "Libreria",
          "Comodino"
        ],
        amenities: [
          "Wi-Fi fibra 1GB",
          "Riscaldamento centralizzato",
          "Aria condizionata",
          "Insonorizzazione"
        ],
        availability: "Disponibile dal 1 Settembre 2024",
        floorLevel: "2° Piano con ascensore",
        images: [
          "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
          "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
          "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
        ],
        contactPhone: "+39 123 456 7890"
      },
      {
        id: "2",
        name: "Camera Doppia B",
        price: 650,
        size: "24m²",
        image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
        description: "Spaziosa camera doppia con balcone privato e bagno en-suite. Ideale per studenti che cercano comfort e privacy.",
        furniture: [
          "2 Letti singoli (possibilità letto matrimoniale)",
          "2 Scrivanie con sedie",
          "2 Armadi",
          "Smart TV 32\"",
          "Mini frigo"
        ],
        amenities: [
          "Bagno privato",
          "Balcone arredato",
          "Wi-Fi fibra 1GB",
          "Aria condizionata"
        ],
        availability: "Disponibile dal 1 Settembre 2024",
        floorLevel: "3° Piano con ascensore",
        images: [
          "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
          "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
          "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
        ],
        contactPhone: "+39 123 456 7890"
      }
    ]
  },
  {
    street: "Via Roma 42",
    description: "Moderno complesso residenziale",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    contactPhone: "+39 123 456 7891",
    rooms: [
      {
        id: "3",
        name: "Studio C",
        price: 550,
        size: "20m²",
        image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
        description: "Moderno monolocale con angolo cottura e zona notte separata. Design contemporaneo e finiture di pregio.",
        furniture: [
          "Letto a una piazza e mezza",
          "Cucina completa di elettrodomestici",
          "Tavolo pieghevole con sedie",
          "Armadio scorrevole",
          "Smart TV 43\""
        ],
        amenities: [
          "Cucina attrezzata",
          "Lavatrice",
          "Wi-Fi fibra 1GB",
          "Videocitofono"
        ],
        availability: "Disponibile dal 15 Settembre 2024",
        floorLevel: "1° Piano",
        images: [
          "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
          "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
          "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
        ],
        contactPhone: "+39 123 456 7891"
      }
    ]
  }
];
