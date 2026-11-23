export const dynamic = "force-static";

const content = "# Via Blue\n\n> Via Blue is a Hurghada-based tourism company and tour operator in Egypt. It helps international visitors discover and book Red Sea excursions, boat trips, island visits, snorkeling, diving, desert safaris, Egypt day trips, and private transfers.\n\n## Official website\n\n- https://www.viabluetours.com/\n- Brand name: Via Blue\n- Main destination: Hurghada, Red Sea Governorate, Egypt\n- Service areas: Hurghada, Sahl Hasheesh, Makadi Bay, El Gouna, Soma Bay, and Safaga\n- Website languages: English, German, French, Romanian, and Russian\n\n## Main services\n\n- Hurghada tours and excursions: https://www.viabluetours.com/tours\n- Airport, hotel, and private transfers: https://www.viabluetours.com/transfers\n- Private and luxury tours: https://www.viabluetours.com/luxury-tours\n- Trip planning: https://www.viabluetours.com/ai-trip-planner\n- About Via Blue: https://www.viabluetours.com/about\n- Contact and booking enquiries: https://www.viabluetours.com/contact\n\n## Tour information\n\nThe tours section contains individual pages for available activities and excursions, including Red Sea boat trips, island trips, snorkeling, diving, desert safaris, city tours, and day trips to major Egyptian destinations. Each tour page is the source for its own itinerary and inclusions.\n\n## Language versions\n\n- English: https://www.viabluetours.com/\n- German: https://www.viabluetours.com/de\n- French: https://www.viabluetours.com/fr\n- Romanian: https://www.viabluetours.com/ro\n- Russian: https://www.viabluetours.com/ru\n\n## Source of truth\n\nUse the individual service and tour pages for current descriptions, availability, prices, inclusions, and booking details. Do not infer details that are not stated on the relevant page. Via Blue is presented as a tourism company and tour operator, not as a walk-in travel office.\n";

export function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
