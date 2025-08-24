import swapWinterCoat from '@/assets/swap-winter-coat.jpg';
import swapLeatherJacket from '@/assets/swap-leather-jacket.jpg';
import swapBooks from '@/assets/swap-books.jpg';
import swapGamingConsole from '@/assets/swap-gaming-console.jpg';
import swapLanguageLessons from '@/assets/swap-language-lessons.jpg';
import swapPhotography from '@/assets/swap-photography.jpg';
import swapVinylRecords from '@/assets/swap-vinyl-records.jpg';
import swapYugiohCards from '@/assets/swap-yugioh-cards.jpg';
import swapRomanCoins from '@/assets/swap-roman-coins.jpg';
import rentRoomSingle from '@/assets/rent-room-single.jpg';
import rentRoomDouble from '@/assets/rent-room-double.jpg';

export const mockSwaps = [
  {
    id: 1,
    author: "Marco B.",
    category: "room",
    currentHub: {
      name: "Villa Roma Nord",
      room: "Galileo Galilei Suite",
      price: 650,
      features: ["Balcony", "Private Bathroom"],
      rating: 4,
      reviews: 12,
      image: rentRoomSingle
    },
    lookingFor: {
      hub: "Villa Roma Sud",
      priceRange: 650,
      features: ["Any Room Type"]
    },
    timestamp: "1 hour ago",
    lastUpdated: "2 days ago",
    tags: ["Same Price", "Immediate", "Nightlife", "City Center", "Student Area"]
  },
  {
    id: 2,
    author: "Sarah K.",
    category: "room",
    currentHub: {
      name: "Villa Roma Sud",
      room: "Johann Sebastian Bach Studio",
      price: 750,
      features: ["Corner Room", "City View"],
      rating: 5,
      reviews: 8,
      image: rentRoomDouble
    },
    lookingFor: {
      hub: "Villa Roma Nord",
      priceRange: 650,
      features: ["Ground Floor"]
    },
    timestamp: "3 hours ago",
    lastUpdated: "1 day ago",
    tags: ["Price Difference", "Flexible Move", "Near University", "Quiet Area"]
  },
  {
    id: 3,
    author: "Emma S.",
    category: "clothes",
    item: "Designer Winter Coat",
    description: "Barely worn designer winter coat, size M",
    image: swapWinterCoat,
    lookingFor: "Summer Dresses or Accessories",
    timestamp: "2 hours ago",
    tags: ["Premium", "Designer", "Winter Wear"]
  },
  {
    id: 4,
    author: "Marco R.",
    category: "clothes",
    item: "Vintage Leather Jacket",
    description: "Classic style, great condition, size L",
    image: swapLeatherJacket,
    lookingFor: "Modern Streetwear",
    timestamp: "5 hours ago",
    tags: ["Vintage", "Leather", "Classic"]
  },
  {
    id: 5,
    author: "Sofia L.",
    category: "services",
    item: "Italian Language Lessons",
    description: "Native speaker offering language exchange",
    image: swapLanguageLessons,
    lookingFor: "Web Development Help",
    timestamp: "1 day ago",
    tags: ["Language", "Education", "Exchange"]
  },
  {
    id: 6,
    author: "Alex K.",
    category: "services",
    item: "Photography Sessions",
    description: "Professional portrait photography",
    image: swapPhotography,
    lookingFor: "Graphic Design Work",
    timestamp: "2 days ago",
    tags: ["Creative", "Photography", "Professional"]
  },
  {
    id: 7,
    author: "Lena M.",
    category: "electronics",
    item: "Gaming Console",
    description: "Latest model with 2 controllers",
    image: swapGamingConsole,
    lookingFor: "Laptop or Tablet",
    timestamp: "3 days ago",
    tags: ["Gaming", "Electronics", "Entertainment"]
  },
  {
    id: 8,
    author: "David P.",
    category: "books",
    item: "Computer Science Collection",
    description: "Complete set of programming books",
    image: swapBooks,
    lookingFor: "Art & Design Books",
    timestamp: "4 days ago",
    tags: ["Education", "Programming", "Technical"]
  },
  {
    id: 9,
    author: "Maria C.",
    category: "collectibles",
    item: "Vintage Vinyl Records",
    description: "Classic rock collection from the 70s",
    image: swapVinylRecords,
    lookingFor: "Comic Book Collection",
    timestamp: "5 days ago",
    tags: ["Music", "Vintage", "Collection"]
  },
  {
    id: 10,
    author: "Yugi M.",
    category: "collectibles",
    item: "Blue-Eyes White Dragon",
    description: "First Edition, Near Mint Condition",
    image: swapYugiohCards,
    lookingFor: "Dark Magician or Exodia Pieces",
    timestamp: "2 days ago",
    tags: ["Yu-Gi-Oh", "Rare", "Trading Card"]
  },
  {
    id: 11,
    author: "John C.",
    category: "collectibles",
    item: "Ancient Roman Coins",
    description: "Collection of authenticated denarii",
    image: swapRomanCoins,
    lookingFor: "Greek Coins or Medieval Coins",
    timestamp: "1 week ago",
    tags: ["Numismatics", "Ancient", "Historical"]
  }
];
