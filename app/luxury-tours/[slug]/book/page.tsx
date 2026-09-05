import { notFound } from "next/navigation";
import LuxuryBookingForm from "@/app/components/LuxuryBookingForm";

export const dynamic = "force-dynamic";

const luxuryTours = {
  luxor: {
    name: "Luxor Private Tour",
    tourType: "Private Tour",
    adultPrice: 150,
    included: [
      "Private transportation",
      "Professional driver",
      "Hotel pickup and drop-off",
      "Flexible private experience",
    ],
  },

  cairo: {
    name: "Cairo Private Tour",
    tourType: "Private Tour",
    adultPrice: 180,
    included: [
      "Private transportation",
      "Professional driver",
      "Hotel pickup and drop-off",
      "Flexible private experience",
    ],
  },

  alexandria: {
    name: "Alexandria Private Tour",
    tourType: "Private Tour",
    adultPrice: 120,
    included: [
      "Private modern air-conditioned transportation",
      "Professional private tour guide",
      "Hotel pickup and drop-off",
      "Entrance tickets to all listed attractions",
      "Lunch",
      "Fully private experience",
    ],
  },

  aswan: {
    name: "Aswan Private Tour",
    tourType: "Private Tour",
    adultPrice: 250,
    included: [
      "Private transportation",
      "Professional driver",
      "Hotel pickup and drop-off",
      "Flexible private experience",
    ],
  },

  "speed-boat": {
    name: "Private Speed Boat",
    tourType: "Private Boat",
    adultPrice: 200,
    included: [
      "Private speed boat",
      "Professional crew",
      "Hotel transfer",
      "Flexible private experience",
    ],
  },

  "quad-safari": {
    name: "Private Quad Safari",
    tourType: "Private Safari",
    adultPrice: 120,
    included: [
      "Private safari experience",
      "Quad bike",
      "Professional guide",
      "Hotel pickup and drop-off",
    ],
  },

  "buggy-safari": {
    name: "Private Buggy Safari",
    tourType: "Private Safari",
    adultPrice: 160,
    included: [
      "Private buggy experience",
      "Professional guide",
      "Desert adventure",
      "Hotel pickup and drop-off",
    ],
  },

  "private-boat": {
    name: "Private Boat",
    tourType: "Private Boat",
    adultPrice: 180,
    included: [
      "Private boat",
      "Professional crew",
      "Hotel pickup and drop-off",
      "Exclusive private experience",
      "Flexible timing",
    ],
  },
};

export default async function LuxuryBookingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const tour =
    luxuryTours[slug as keyof typeof luxuryTours];

  if (!tour) {
    notFound();
  }

  return (
    <LuxuryBookingForm
      tourName={tour.name}
      adultPrice={tour.adultPrice}
      tourType={tour.tourType}
      included={tour.included}
    />
  );
}