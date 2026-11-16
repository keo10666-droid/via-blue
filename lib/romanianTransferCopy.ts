const locations: Record<string, string> = {
  "Hurghada International Airport": "Aeroportul Internațional Hurghada",
  "Hurghada Airport": "Aeroportul Hurghada",
  "Hurghada City": "Orașul Hurghada",
  "Sahl Hasheesh": "Sahl Hasheesh",
  "Makadi Bay": "Makadi Bay",
  "El Gouna": "El Gouna",
  "Soma Bay": "Soma Bay",
  "Safaga": "Safaga",
};
const vehicles: Record<string, string> = {
  Sedan: "Sedan",
  "X-Pander": "X-Pander",
  Van: "Van",
  Luxury: "Vehicul de lux",
  Coster: "Microbuz",
};
export function romanianTransferLocation(value: string): string { return locations[value] || value; }
export function romanianTransferVehicle(value: string): string { return vehicles[value] || value; }
