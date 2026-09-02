import { notFound } from "next/navigation";
import LuxuryBookingForm from "@/app/components/LuxuryBookingForm";

const luxuryTours = {
  luxor: {
    name: "Luxor Private Tour",
    tourType: "Private Tour",
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
    included: [
      "Private buggy experience",
      "Professional guide",
      "Desert adventure",
      "Hotel pickup and drop-off",
    ],
  },

  aswan: {
    name: "Aswan Private Tour",
    tourType: "Private Tour",
    included: [
      "Private transportation",
      "Professional driver",
      "Hotel pickup and drop-off",
      "Flexible private experience",
    ],
  },

  "private-boat": {
    name: "Private Boat",
    tourType: "Private Boat",
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

  const tour = luxuryTours[slug as keyof typeof luxuryTours];

  if (!tour) {
    notFound();
  }

  return (
    <LuxuryBookingForm
      tourName={tour.name}
      tourType={tour.tourType}
      included={tour.included}
    />
  );
}