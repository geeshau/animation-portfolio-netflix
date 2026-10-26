import { PortfolioVideo } from "./config";

export const videos: PortfolioVideo[] = [
  {
    id: "wYKNgHH75Ts",
    title: "Sweet Porridge | Fairy Tales | Bed time Story for Kids",
    description: "Showcase of recent animation work.",
    category: "Videos"
  },
  {
    id: "Xa97087O8D0",
    title: "Red Shoes Story | Fairy Tales |  Bedtime Stories",
    description: "Showcase of recent animation work.",
    category: "Reels"
  },
  {
    id: "OEPmdO6fpWM",
    title: "The State of MASSACHUSETS",
    description: "Showcase of recent animation work.",
    category: "Reels"
  },
  {
    id: "eFvVRztQCAQ",
    title: "The State of New Mexico",
    description: "Showcase of recent animation work.",
    category: "Reels"
  },
  {
    id: "PsWMYquv8aE",
    title: "The State of Rhode Island",
    description: "Showcase of recent animation work.",
    category: "Reels"
  },
  {
    id: "c_7AOZUAVOk",
    title: "The State of Aloha",
    description: "Showcase of recent animation work.",
    category: "Reels"
  },
  {
    id: "wPkPuZXuJEM",
    title: "The State of IDAHO",
    description: "Showcase of recent animation work.",
    category: "Reels"
  },
  {
    id: "YbCyjzBuyug",
    title: "The State of Missouri",
    description: "Showcase of recent animation work.",
    category: "Reels"
  },
  {
    id: "V7ooFCYnWOY",
    title: "The State of Montana",
    description: "Showcase of recent animation work.",
    category: "Reels"
  },
  
  {
    id: "gZ5X7esTrwQ",
    title: "The Countries of the World",
    description: "Showcase of recent animation work.",
    category: "Reels"
  },
  {
    id: "B64SwtlYe-E",
    title: "The State of Kentucky",
    description: "Showcase of recent animation work.",
    category: "Reels"
  },
  {
    id: "PdtX4NsccRU",
    title: "The State of Arkansas",
    description: "Showcase of recent animation work.",
    category: "Reels"
  },
  {
    id: "vCzqNX6P6Uc",
    title: "The State of Nevada",
    description: "Showcase of recent animation work.",
    category: "Reels"
  },
  {
    id: "ATkND2NA7o8",
    title: "Dwarf Planets",
    description: "Showcase of recent animation work.",
    category: "Reels"
  },
  {
    id: "bwHKm3PoUtA",
    title: "Ants Marching Song",
    description: "Showcase of recent animation work.",
    category: "Reels"
  },
  {
    id: "BJl2-av9hFo",
    title: "Bartolito Song",
    description: "Showcase of recent animation work.",
    category: "Reels"
  },
  {
    id: "hUYko7a6LKs",
    title: "The State of Indiana",
    description: "Showcase of recent animation work.",
    category: "Reels"
  },
  {
    id: "OmKGbRkvGKg",
    title: "7 Continents Songs",
    description: "Showcase of recent animation work.",
    category: "Reels"
  },
  {
    id: "cwWEKJOW2yk",
    title: "The State of Arizona",
    description: "Showcase of recent animation work.",
    category: "Reels"
  },
  {
    id: "yeG86jp5brM",
    title: "5 Oceans Song | Nursery Rhymes",
    description: "Showcase of recent animation work.",
    category: "Reels"
  },
  {
    id: "a8fkw0JJwzg",
    title: "The Solar System",
    description: "Showcase of recent animation work.",
    category: "Reels"
  },{
    id: "mWlVVk3bWsI",
    title: "1 Hour Lullaby - Sleep with Sound",
    description: "Showcase of recent animation work.",
    category: "Reels"
  },
  {
    id: "G1p_6FHlzx8",
    title: "Down in my Heart",
    description: "Showcase of recent animation work.",
    category: "Reels"
  },
  {
    id: "qzSeicPxeCg",
    title: "If you are happy and you know",
    description: "Showcase of recent animation work.",
    category: "Reels"
  },
  {
    id: "gln5mGHYdwI",
    title: "Halleluyah, Praise the Lord",
    description: "Showcase of recent animation work.",
    category: "Reels"
  }
  
];

export function getVideos(): PortfolioVideo[] {
  return videos;
}

export function getVideoById(id: string): PortfolioVideo | undefined {
  return videos.find((v) => v.id === id);
}
