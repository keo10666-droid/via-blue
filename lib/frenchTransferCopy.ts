export function frenchTransferLocation(value: string): string {
  const locations: Record<string, string> = {
    "Hurghada International Airport": "Aéroport international d’Hurghada",
    "Hurghada City": "Centre-ville d’Hurghada",
    "Sahl Hasheesh": "Sahl Hasheesh",
    "Makadi Bay": "Baie de Makadi",
    "El Gouna": "El Gouna",
    "Soma Bay": "Soma Bay",
    "Safaga": "Safaga",
  };
  return locations[value] ?? value;
}

export function frenchTransferVehicle(value: string): string {
  const vehicles: Record<string, string> = {
    "Sedan": "Berline",
    "X-Pander": "X-Pander",
    "Van": "Van",
    "Luxury": "Luxe",
    "Coster": "Minibus",
  };
  return vehicles[value] ?? value;
}
