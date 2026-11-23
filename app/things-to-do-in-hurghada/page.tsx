"import type { Metadata } from "next";
import Link from "next/link";
import { tourList } from "@/data/tours";
import { getLocalizedSeo } from "@/lib/localeMetadata";

const copy = {
  en: {
    eyebrow: "Plan your Hurghada holiday",
    title: "Things to Do in Hurghada: A Local Guide to Red Sea Experiences",
    intro: "Hurghada is a Red Sea destination where a holiday can include time on the water, island beaches, coral-reef snorkeling, desert adventures and cultural day trips. This guide explains the main experiences available from Hurghada and helps you choose what fits your time and interests.",
    seaTitle: "Explore the Red Sea by boat",
    seaText: "Boat trips are a popular way to experience the Red Sea. Depending on the trip, you can visit an island beach, relax on board, swim or stop at a reef for snorkeling. Compare the itinerary and what is included before choosing an island excursion.",
    reefTitle: "Snorkeling and diving",
    reefText: "The reefs around Hurghada make snorkeling and scuba diving a major part of the local experience. Choose a guided snorkeling trip if you want an introduction from the surface, or a diving experience if you want to explore underwater with the appropriate instruction and supervision.",
    desertTitle: "Desert safaris and horse riding",
    desertText: "Away from the coast, desert activities offer a different view of the Red Sea region. Safari options can include quad biking or a broader desert programme, while horse riding is another way to spend time outdoors. Check the specific tour programme and requirements before booking.",
    cityTitle: "Discover Hurghada and travel beyond",
    cityText: "A city tour can introduce you to Hurghada beyond the resorts. If you have a full day available and want to see more of Egypt, day trips from Hurghada include destinations such as Luxor and Cairo. These are longer journeys, so compare departure details and duration carefully.",
    chooseTitle: "How to choose the right excursion",
    chooseItems: ["Start with the time you have: a boat or island trip usually takes most of a day, while a city visit may fit a shorter schedule.", "Read the inclusions carefully, especially transfers, meals, drinks, equipment and entrance fees.", "For sea activities, follow the crew or instructor’s safety guidance and consider the weather and sea conditions.", "For long-distance day trips, check the itinerary, transport type and expected return time before confirming."],
    faqTitle: "Frequently asked questions",
    faqs: [
      ["What are the best things to do in Hurghada?", "Popular choices include Red Sea boat and island trips, snorkeling, diving, desert safaris, horse riding and city or Egypt day tours. The best option depends on your interests and available time."],
      ["Can I go snorkeling on a Hurghada boat trip?", "Many boat excursions include a snorkeling stop, but inclusions differ by tour. Check the individual tour details for equipment, guide support and the planned stops."],
      ["Can I visit Luxor or Cairo from Hurghada?", "Yes. Day-trip options are available, but these are long excursions. Review the transport, itinerary and duration on the specific tour page before booking."],
      ["Does Via Blue offer private transfers?", "Via Blue lists private transfer routes serving Hurghada and nearby areas. See the transfers page for available destinations and vehicle options."]
    ],
    tours: "Explore matching tours", transfers: "View private transfers", allTours: "Browse all Hurghada tours", note: "Tour programmes, inclusions and schedules can vary. Always use the individual tour page for the latest details before booking."
  },
  de: {
    eyebrow: "Planen Sie Ihren Urlaub in Hurghada",
    title: "Sehenswürdigkeiten und Aktivitäten in Hurghada: Ein lokaler Reiseführer",
    intro: "Hurghada am Roten Meer bietet Bootsausflüge, Inselstrände, Schnorcheln an Korallenriffen, Wüstenabenteuer und Tagesausflüge zu historischen Orten. Dieser Reiseführer stellt die wichtigsten Erlebnisse vor und hilft Ihnen, das Passende für Ihre Zeit und Interessen zu finden.",
    seaTitle: "Das Rote Meer mit dem Boot entdecken",
    seaText: "Bootsausflüge sind eine beliebte Möglichkeit, das Rote Meer zu erleben. Je nach Tour besuchen Sie einen Inselstrand, entspannen an Bord, schwimmen oder halten an einem Riff zum Schnorcheln. Vergleichen Sie Ablauf und Leistungen, bevor Sie einen Inselausflug auswählen.",
    reefTitle: "Schnorcheln und Tauchen",
    reefText: "Die Riffe rund um Hurghada machen Schnorcheln und Tauchen zu wichtigen Urlaubserlebnissen. Eine geführte Schnorcheltour eignet sich für den Einstieg an der Oberfläche. Beim Tauchen erkunden Sie die Unterwasserwelt mit entsprechender Einweisung und Betreuung.",
    desertTitle: "Wüstensafaris und Reiten",
    desertText: "Abseits der Küste zeigen Wüstenaktivitäten eine andere Seite der Region am Roten Meer. Safaris können Quadfahren oder ein umfangreicheres Wüstenprogramm umfassen. Reiten ist eine weitere Möglichkeit, Zeit im Freien zu verbringen. Prüfen Sie vor der Buchung den jeweiligen Ablauf und die Voraussetzungen.",
    cityTitle: "Hurghada entdecken und Ägypten erkunden",
    cityText: "Eine Stadtrundfahrt zeigt Ihnen Hurghada abseits der Hotelanlagen. Wenn Sie einen ganzen Tag Zeit haben und mehr von Ägypten sehen möchten, gibt es Tagesausflüge von Hurghada nach Luxor und Kairo. Diese Fahrten sind lang; vergleichen Sie daher Ablauf und Dauer sorgfältig.",
    chooseTitle: "So wählen Sie den passenden Ausflug",
    chooseItems: ["Berücksichtigen Sie Ihre verfügbare Zeit: Boots- und Inselausflüge dauern meist einen großen Teil des Tages.", "Prüfen Sie die enthaltenen Leistungen, insbesondere Transfers, Mahlzeiten, Getränke, Ausrüstung und Eintrittsgelder.", "Befolgen Sie bei Aktivitäten auf dem Meer die Sicherheitshinweise der Crew oder Guides und beachten Sie Wetter und Seegang.", "Prüfen Sie bei längeren Tagesausflügen die Route, Transportart und voraussichtliche Rückkehrzeit."],
    faqTitle: "Häufig gestellte Fragen",
    faqs: [
      ["Was kann man in Hurghada unternehmen?", "Beliebt sind Boots- und Inselausflüge am Roten Meer, Schnorcheln, Tauchen, Wüstensafaris, Reiten sowie Stadt- und Ägypten-Tagesausflüge."],
      ["Kann ich bei einem Bootsausflug schnorcheln?", "Viele Bootsausflüge beinhalten einen Schnorchelstopp. Ausrüstung, Betreuung und Stopps unterscheiden sich je nach Tour. Prüfen Sie die jeweilige Tourbeschreibung."],
      ["Kann man von Hurghada nach Luxor oder Kairo fahren?", "Ja, es gibt Tagesausflüge. Es sind jedoch lange Fahrten. Prüfen Sie vor der Buchung Transport, Programm und Dauer."],
      ["Bietet Via Blue private Transfers an?", "Via Blue führt private Transferstrecken in Hurghada und den umliegenden Gebieten auf. Verfügbare Ziele und Fahrzeuge finden Sie auf der Transferseite."]
    ],
    tours: "Passende Ausflüge entdecken", transfers: "Private Transfers ansehen", allTours: "Alle Ausflüge in Hurghada", note: "Ablauf, Leistungen und Zeiten können variieren. Maßgeblich sind die aktuellen Angaben auf der jeweiligen Tourseite."
  },
  fr: {
    eyebrow: "Préparez votre séjour à Hurghada",
    title: "Que faire à Hurghada ? Guide local des expériences en mer Rouge",
    intro: "Hurghada, sur la mer Rouge, propose des sorties en bateau, des plages insulaires, du snorkeling près des récifs, des aventures dans le désert et des excursions culturelles à la journée. Ce guide présente les principales expériences au départ de Hurghada pour vous aider à choisir selon votre temps et vos envies.",
    seaTitle: "Découvrir la mer Rouge en bateau",
    seaText: "Les sorties en bateau sont une façon populaire de découvrir la mer Rouge. Selon l’excursion, vous pouvez rejoindre une plage d’île, vous détendre à bord, nager ou faire un arrêt près d’un récif pour le snorkeling. Comparez le programme et les prestations incluses avant de choisir.",
    reefTitle: "Snorkeling et plongée",
    reefText: "Les récifs autour de Hurghada font du snorkeling et de la plongée des activités incontournables de la région. Une sortie snorkeling encadrée permet de découvrir les fonds depuis la surface ; la plongée permet d’explorer sous l’eau avec les consignes et l’encadrement adaptés.",
    desertTitle: "Safaris dans le désert et équitation",
    desertText: "Loin du littoral, les activités dans le désert offrent un autre aperçu de la région de la mer Rouge. Les safaris peuvent inclure du quad ou un programme plus complet dans le désert. L’équitation est une autre façon de profiter du plein air. Consultez le programme et les conditions de chaque excursion avant de réserver.",
    cityTitle: "Visiter Hurghada et découvrir l’Égypte",
    cityText: "Une visite de la ville permet de découvrir Hurghada au-delà des complexes hôteliers. Si vous disposez d’une journée entière, des excursions au départ de Hurghada permettent de rejoindre Louxor ou Le Caire. Ce sont de longs trajets : vérifiez soigneusement le programme et la durée.",
    chooseTitle: "Comment choisir votre excursion",
    chooseItems: ["Tenez compte du temps disponible : une sortie en bateau ou sur une île occupe généralement une grande partie de la journée.", "Vérifiez les prestations incluses, notamment les transferts, repas, boissons, équipements et frais d’entrée.", "En mer, suivez les consignes de sécurité de l’équipage ou du moniteur et tenez compte de la météo et de l’état de la mer.", "Pour les excursions lointaines, vérifiez l’itinéraire, le transport et l’heure de retour prévue."],
    faqTitle: "Questions fréquentes",
    faqs: [
      ["Que faire à Hurghada ?", "Parmi les activités populaires : sorties en bateau et sur les îles, snorkeling, plongée, safaris dans le désert, équitation et excursions à la journée."],
      ["Peut-on faire du snorkeling pendant une sortie en bateau ?", "De nombreuses excursions prévoient un arrêt snorkeling, mais l’équipement, l’encadrement et les arrêts varient. Consultez la fiche de l’excursion."],
      ["Peut-on visiter Louxor ou Le Caire depuis Hurghada ?", "Oui, des excursions à la journée existent, mais les trajets sont longs. Vérifiez le transport, le programme et la durée avant de réserver."],
      ["Via Blue propose-t-elle des transferts privés ?", "Via Blue propose des itinéraires de transferts privés à Hurghada et dans les environs. Consultez la page des transferts pour les destinations et véhicules disponibles."]
    ],
    tours: "Voir les excursions correspondantes", transfers: "Voir les transferts privés", allTours: "Toutes les excursions à Hurghada", note: "Les programmes, prestations et horaires peuvent varier. Consultez toujours la fiche de l’excursion pour les informations à jour."
  },
  ro: {
    eyebrow: "Planifică-ți vacanța în Hurghada",
    title: "Ce poți face în Hurghada: ghid local pentru experiențe la Marea Roșie",
    intro: "Hurghada, pe țărmul Mării Roșii, oferă excursii cu barca, plaje pe insule, snorkeling lângă recife, aventuri în deșert și excursii culturale de o zi. Acest ghid prezintă principalele experiențe disponibile din Hurghada și te ajută să alegi în funcție de timp și interese.",
    seaTitle: "Descoperă Marea Roșie cu barca",
    seaText: "Excursiile cu barca sunt o modalitate populară de a descoperi Marea Roșie. În funcție de program, poți ajunge la o plajă de pe insulă, te poți relaxa la bord, poți înota sau poți face o oprire pentru snorkeling lângă un recif. Compară itinerariul și serviciile incluse înainte de alegere.",
    reefTitle: "Snorkeling și scufundări",
    reefText: "Recifele din jurul orașului Hurghada fac din snorkeling și scufundări experiențe importante ale zonei. O excursie de snorkeling cu ghid este potrivită pentru explorarea de la suprafață, iar scufundările permit explorarea sub apă cu instruirea și supravegherea adecvate.",
    desertTitle: "Safari în deșert și călărie",
    desertText: "Departe de coastă, activitățile în deșert oferă o altă perspectivă asupra regiunii Mării Roșii. Safariurile pot include plimbări cu quad-ul sau un program mai amplu în deșert, iar călăria este o altă activitate în aer liber. Verifică programul și condițiile fiecărui tur înainte de rezervare.",
    cityTitle: "Descoperă Hurghada și călătorește prin Egipt",
    cityText: "Un tur al orașului îți arată Hurghada dincolo de resorturi. Dacă ai o zi întreagă și vrei să vezi mai mult din Egipt, există excursii de o zi din Hurghada către Luxor și Cairo. Sunt călătorii lungi, așa că verifică atent programul și durata.",
    chooseTitle: "Cum alegi excursia potrivită",
    chooseItems: ["Pornește de la timpul disponibil: excursiile cu barca sau pe insule ocupă de obicei cea mai mare parte a zilei.", "Verifică serviciile incluse, în special transferurile, mesele, băuturile, echipamentul și taxele de intrare.", "Pentru activitățile pe mare, respectă instrucțiunile de siguranță ale echipajului sau instructorului și ține cont de vreme și starea mării.", "Pentru excursiile lungi, verifică traseul, tipul transportului și ora estimată de întoarcere."],
    faqTitle: "Întrebări frecvente",
    faqs: [
      ["Ce activități sunt populare în Hurghada?", "Printre opțiunile populare se numără excursiile cu barca și pe insule, snorkelingul, scufundările, safariurile în deșert, călăria și excursiile de o zi."],
      ["Pot face snorkeling într-o excursie cu barca?", "Multe excursii includ o oprire pentru snorkeling, însă echipamentul, ghidul și opririle diferă. Verifică detaliile turului ales."],
      ["Pot vizita Luxor sau Cairo din Hurghada?", "Da, există excursii de o zi, dar sunt călătorii lungi. Verifică transportul, itinerariul și durata înainte de rezervare."],
      ["Via Blue oferă transferuri private?", "Via Blue listează rute de transfer privat în Hurghada și în zonele apropiate. Consultă pagina transferurilor pentru destinații și vehicule."]
    ],
    tours: "Descoperă excursiile potrivite", transfers: "Vezi transferurile private", allTours: "Toate excursiile din Hurghada", note: "Programele, serviciile incluse și orarele pot varia. Consultă pagina fiecărui tur pentru informațiile actualizate."
  },
  ru: {
    eyebrow: "Планируйте отдых в Хургаде",
    title: "Чем заняться в Хургаде: местный путеводитель по Красному морю",
    intro: "Хургада на побережье Красного моря предлагает морские прогулки, пляжи островов, снорклинг у коралловых рифов, приключения в пустыне и культурные поездки на целый день. В этом путеводителе собраны основные варианты отдыха, чтобы вам было проще выбрать подходящий.",
    seaTitle: "Исследуйте Красное море на лодке",
    seaText: "Морские прогулки — популярный способ познакомиться с Красным морем. В зависимости от программы можно посетить островной пляж, отдохнуть на борту, поплавать или остановиться у рифа для снорклинга. Перед выбором сравните маршрут и включённые услуги.",
    reefTitle: "Снорклинг и дайвинг",
    reefText: "Рифы вокруг Хургады делают снорклинг и дайвинг важной частью отдыха. Экскурсия со снорклингом подойдёт для знакомства с подводным миром с поверхности, а дайвинг позволяет погрузиться под воду с необходимым инструктажем и сопровождением.",
    desertTitle: "Сафари по пустыне и верховая езда",
    desertText: "Вдали от побережья пустынные активности открывают другую сторону региона Красного моря. Сафари могут включать поездки на квадроциклах или более продолжительную программу в пустыне. Верховая езда — ещё один вариант отдыха на природе. Перед бронированием изучите программу и условия конкретного тура.",
    cityTitle: "Познакомьтесь с Хургадой и отправляйтесь вглубь Египта",
    cityText: "Обзорная экскурсия поможет увидеть Хургаду за пределами отельных комплексов. Если у вас есть целый день, из Хургады доступны поездки в Луксор и Каир. Это длительные маршруты, поэтому внимательно проверьте программу и продолжительность.",
    chooseTitle: "Как выбрать экскурсию",
    chooseItems: ["Учитывайте свободное время: морская прогулка или поездка на остров обычно занимает большую часть дня.", "Проверьте, что входит в стоимость: трансфер, питание, напитки, оборудование и входные билеты.", "Во время морских активностей соблюдайте инструкции экипажа или инструктора и учитывайте погоду и состояние моря.", "Для дальних поездок уточните маршрут, вид транспорта и предполагаемое время возвращения."],
    faqTitle: "Частые вопросы",
    faqs: [
      ["Чем заняться в Хургаде?", "Популярные варианты — морские прогулки и острова, снорклинг, дайвинг, сафари по пустыне, верховая езда и экскурсии по городу или Египту."],
      ["Можно ли заняться снорклингом во время морской прогулки?", "Во многие морские экскурсии входит остановка для снорклинга, но оборудование, сопровождение и маршрут различаются. Проверьте описание выбранного тура."],
      ["Можно ли съездить из Хургады в Луксор или Каир?", "Да, доступны однодневные поездки, но дорога занимает много времени. Перед бронированием проверьте транспорт, маршрут и продолжительность."],
      ["Предлагает ли Via Blue частные трансферы?", "Via Blue предлагает маршруты частных трансферов по Хургаде и близлежащим районам. Доступные направления и автомобили указаны на странице трансферов."]
    ],
    tours: "Посмотреть подходящие экскурсии", transfers: "Частные трансферы", allTours: "Все экскурсии в Хургаде", note: "Программы, включённые услуги и расписание могут меняться. Перед бронированием проверяйте актуальные сведения на странице конкретного тура."
  }
} as const;

const sections = [
  { key: "sea", slugs: ["orange-bay", "paradise-island", "mahmya-island", "hula-hula"] },
  { key: "reef", slugs: ["snorkeling", "diving", "dolphin-house"] },
  { key: "desert", slugs: ["super-safari", "quad-bike", "horse-riding"] },
  { key: "city", slugs: ["hurghada-city-tour", "luxor-over-day", "cairo-over-day"] }
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getLocalizedSeo("/things-to-do-in-hurghada");
  return {
    title: seo.title,
    description: seo.description,
    alternates: seo.alternates,
    openGraph: { title: seo.title, description: seo.description, type: "article" },
  };
}

export default async function ThingsToDoInHurghadaPage() {
  const seo = await getLocalizedSeo("/things-to-do-in-hurghada");
  const t = copy[seo.locale];
  const localizedHref = (path: string) => seo.locale === "en" ? path : `/${seo.locale}${path === "/" ? "" : path}`;
  const tourBySlug = new Map(tourList.filter((tour) => tour.available).map((tour) => [tour.slug, tour]));
  const sectionCopy = [
    { title: t.seaTitle, text: t.seaText },
    { title: t.reefTitle, text: t.reefText },
    { title: t.desertTitle, text: t.desertText },
    { title: t.cityTitle, text: t.cityText }
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="bg-[#061a35] px-5 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-300">{t.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">{t.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-blue-100">{t.intro}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={localizedHref("/tours")} className="rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-400">{t.allTours}</Link>
            <Link href={localizedHref("/transfers")} className="rounded-xl border border-white/30 px-6 py-3 font-bold text-white transition hover:bg-white/10">{t.transfers}</Link>
          </div>
        </div>
      </section>

      <nav aria-label="Guide sections" className="border-b border-slate-100 bg-slate-50 px-5 py-4">
        <div className="mx-auto flex max-w-5xl flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-blue-900">
          {sections.map((section, index) => <a key={section.key} href={`#${section.key}`} className="hover:text-orange-600">{sectionCopy[index].title}</a>)}
          <a href="#choose" className="hover:text-orange-600">{t.chooseTitle}</a>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-5 py-14 sm:py-20">
        <div className="space-y-16">
          {sections.map((section, index) => {
            const text = sectionCopy[index];
            const matchingTours = section.slugs.map((slug) => tourBySlug.get(slug)).filter((tour) => tour !== undefined);
            return (
              <section id={section.key} key={section.key} className="scroll-mt-24">
                <h2 className="text-3xl font-bold tracking-tight text-[#092448] sm:text-4xl">{text.title}</h2>
                <p className="mt-5 max-w-4xl text-base leading-8 text-slate-600">{text.text}</p>
                {matchingTours.length > 0 && (
                  <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {matchingTours.map((tour) => (
                      <Link key={tour.slug} href={localizedHref(`/tours/${tour.slug}`)} className="group rounded-2xl border border-slate-200 p-5 transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg">
                        <h3 className="font-bold text-[#092448] group-hover:text-orange-600">{tour.name}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-500">{tour.description}</p>
                        <span className="mt-4 inline-block text-sm font-bold text-orange-600">{t.tours} →</span>
                      </Link>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>

        <section id="choose" className="mt-20 rounded-3xl bg-slate-50 p-7 sm:p-10">
          <h2 className="text-3xl font-bold text-[#092448]">{t.chooseTitle}</h2>
          <ul className="mt-6 list-disc space-y-4 pl-6 text-base leading-8 text-slate-600">
            {t.chooseItems.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-bold text-[#092448]">{t.faqTitle}</h2>
          <div className="mt-7 divide-y divide-slate-200 border-y border-slate-200">
            {t.faqs.map(([question, answer]) => (
              <details key={question} className="group py-5">
                <summary className="cursor-pointer list-none pr-8 font-semibold text-[#092448] marker:hidden">{question}</summary>
                <p className="mt-3 max-w-4xl leading-7 text-slate-600">{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <p className="mt-10 text-sm leading-6 text-slate-500">{t.note}</p>
        <section className="mt-12 rounded-3xl bg-[#061a35] p-8 text-white sm:p-10">
          <h2 className="text-2xl font-bold sm:text-3xl">{t.allTours}</h2>
          <p className="mt-3 max-w-2xl leading-7 text-blue-100">{t.intro}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={localizedHref("/tours")} className="rounded-xl bg-orange-500 px-6 py-3 font-bold text-white hover:bg-orange-400">{t.allTours}</Link>
            <Link href={localizedHref("/transfers")} className="rounded-xl border border-white/30 px-6 py-3 font-bold text-white hover:bg-white/10">{t.transfers}</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
