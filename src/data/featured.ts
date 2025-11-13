import type { FeaturedSpecies } from "@/types/analytics";
import tarsier from "@/assets/Tarsier.png";
import philippineEagle from "@/assets/eagle.png";
import rajahBrookesButterfly from "@/assets/rajah.png";

const featuredSpecies: FeaturedSpecies[] = [
  {
    speciesName: "Tarsier",
    speciesType: "Mammal",
    location: "Spotted near the dense forest of Ormoc",
    imageUrl: tarsier,
  },
  {
    speciesName: "Philippine Eagle",
    speciesType: "Bird",
    location: "A rare sighting from the northern part of Leyte",
    imageUrl: philippineEagle,
  },
  {
    speciesName: "Rajah Brooke's Butterfly",
    speciesType: "Insect",
    location: "A beautiful butterfly seen fluttering in a local garden",
    imageUrl: rajahBrookesButterfly,
  },
  {
    speciesName: "Philippine Crocodile",
    speciesType: "Reptile",
    location: "Observed in the freshwater habitats of Mindoro",
    imageUrl: "https://example.com/philippine_crocodile.png",
  }
];

export default featuredSpecies;
