const locations: Record<string, string> = {
  "Hurghada International Airport": "Flughafen Hurghada",
  "Hurghada Airport": "Flughafen Hurghada",
  "Hurghada City": "Stadt Hurghada",
  "Sahl Hasheesh": "Sahl Hasheesh",
  "Makadi Bay": "Makadi Bay",
  "El Gouna": "El Gouna",
  "Soma Bay": "Soma Bay",
  "Safaga": "Safaga",
};

const vehicles: Record<string, string> = {
  Sedan: "Limousine",
  Van: "Kleinbus",
  Luxury: "Luxusfahrzeug",
  Coster: "Coaster",
};

export function germanTransferLocation(value: string): string {
  return locations[value] || value;
}

export function germanTransferVehicle(value: string): string {
  return vehicles[value] || value;
}
