import Link from "next/link";
import HomeText from "@/app/components/HomeText";

const luxuryGermanText: Record<string, string> = {
  "Quad Bike Safari": "Quad-Safari",
  "Experience an exciting guided quad bike adventure through the Egyptian desert, riding as part of a dedicated group with a professional guide leading the way throughout the journey.": "Erleben Sie eine aufregende, geführte Quad-Tour durch die ägyptische Wüste. Sie fahren in einer festen Gruppe, die während der gesamten Tour von einem professionellen Guide begleitet wird.",
  "2–3 Hours": "2–3 Stunden",
  "Guided Quad Adventure Through the Desert": "Geführtes Quad-Abenteuer durch die Wüste",
  "Morning / Sunset": "Morgens / zum Sonnenuntergang",
  "Morning / Evening": "Morgens / abends",
  "Guided quad bike adventure": "Geführte Quad-Tour",
  "Dedicated group experience": "Tour in einer festen Gruppe",
  "Professional desert guide": "Professioneller Wüsten-Guide",
  "Single or Double Quad": "Einzel- oder Doppelquad",
  "Safety equipment": "Sicherheitsausrüstung",
  "Test drive before departure": "Probefahrt vor dem Start",
  "20–25 km desert ride": "Wüstenfahrt über 20–25 km",
  "Mountain & desert trails": "Berg- und Wüstenwege",
  "Photo & rest stop": "Foto- und Ruhepause",
  "Morning or sunset departure": "Abfahrt morgens oder zum Sonnenuntergang",
  "Arrival & Desert Preparation": "Ankunft und Vorbereitung in der Wüste",
  "Meet at the main safari station and get ready for your adventure. Put on your Bedouin scarf and protective goggles before receiving the necessary riding equipment and instructions.": "Treffen Sie sich an der Haupt-Safari-Station und bereiten Sie sich auf Ihr Abenteuer vor. Legen Sie Beduinenschal und Schutzbrille an und erhalten Sie anschließend die notwendige Ausrüstung und Einweisung.",
  "Safety Briefing & Riding Instructions": "Sicherheitseinweisung und Fahranleitung",
  "Your professional guide will explain the safety rules and demonstrate how to control the quad bike, including acceleration, braking and proper riding techniques.": "Ihr professioneller Guide erklärt die Sicherheitsregeln und zeigt Ihnen die Bedienung des Quads, einschließlich Beschleunigen, Bremsen und sicherer Fahrtechnik.",
  "Test Drive": "Probefahrt",
  "Before heading into the desert, each guest will complete a short test drive on a closed track to make sure they are comfortable and confident operating the quad bike.": "Bevor es in die Wüste geht, macht jeder Gast eine kurze Probefahrt auf einer abgesperrten Strecke, um sich mit dem Quad vertraut zu machen.",
  "Guided Desert Quad Adventure": "Geführtes Quad-Abenteuer in der Wüste",
  "Follow your professional guide as part of your dedicated group and ride through the Egyptian desert across hills, rocky paths and challenging terrain for approximately 20–25 km.": "Folgen Sie Ihrem professionellen Guide in Ihrer Gruppe und fahren Sie etwa 20–25 km durch die ägyptische Wüste, über Hügel, steinige Wege und anspruchsvolles Gelände.",
  "Mountain Rest & Photo Stop": "Pause in den Bergen und Fotostopp",
  "Take a relaxing break at an elevated location between the mountains. Enjoy the spectacular desert scenery, take memorable photographs and have some water before continuing the adventure.": "Machen Sie eine entspannte Pause an einem erhöhten Platz zwischen den Bergen. Genießen Sie die beeindruckende Wüstenlandschaft, machen Sie Erinnerungsfotos und trinken Sie etwas Wasser, bevor das Abenteuer weitergeht.",
  "Return to the Safari Station": "Rückkehr zur Safari-Station",
  "Ride the quads back to the main safari station with your guide, completing your desert adventure before your onward journey.": "Fahren Sie gemeinsam mit Ihrem Guide mit den Quads zurück zur Haupt-Safari-Station und beenden Sie dort Ihr Wüstenabenteuer.",
  "Quad bike experience": "Quad-Erlebnis",
  "Single or Double Quad option": "Wahl zwischen Einzel- und Doppelquad",
  "Safety briefing": "Sicherheitseinweisung",
  "Helmet and riding safety equipment": "Helm und Sicherheitsausrüstung",
  "Test drive before the main ride": "Probefahrt vor der eigentlichen Tour",
  "Guided desert ride": "Geführte Wüstenfahrt",
  "20–25 km desert route": "Wüstenroute über 20–25 km",
  "Mountain rest and photo stop": "Bergpause und Fotostopp",
  "Hotel transfers unless specifically requested": "Hoteltransfers, sofern nicht ausdrücklich angefragt",
  "Bedouin scarf": "Beduinenschal",
  "Protective dust goggles": "Staubschutzbrille",
  "Optional photography and video services": "Optionale Foto- und Videodienste",
  "Drinks other than included water": "Getränke außer dem enthaltenen Wasser",
  "Tips": "Trinkgelder",
  "The experience is operated as a dedicated group with a professional guide leading the group throughout the ride.": "Die Tour findet in einer festen Gruppe statt, die während der gesamten Fahrt von einem professionellen Guide geführt wird.",
  "Guests can choose between a Single Quad or Double Quad.": "Gäste können zwischen einem Einzel- und einem Doppelquad wählen.",
  "Minimum age for driving a Single Quad is 16 years.": "Das Mindestalter zum Fahren eines Einzelquads beträgt 16 Jahre.",
  "Children from 6 years old can ride as passengers on a Double Quad with an accompanying adult.": "Kinder ab 6 Jahren können zusammen mit einem begleitenden Erwachsenen als Beifahrer auf einem Doppelquad mitfahren.",
  "Actual quad riding time is approximately 45–60 minutes.": "Die tatsächliche Fahrzeit auf dem Quad beträgt etwa 45–60 Minuten.",
  "Total experience duration is approximately 2–3 hours including preparation, transfers and rest stops.": "Das gesamte Erlebnis dauert einschließlich Vorbereitung, Transfers und Pausen etwa 2–3 Stunden.",
  "Trips are available daily in the morning or around sunset.": "Die Touren werden täglich morgens oder rund um den Sonnenuntergang angeboten.",
  "Closed shoes are required.": "Geschlossene Schuhe sind erforderlich.",
  "Guests must follow the guide and remain within the group for safety.": "Aus Sicherheitsgründen müssen Gäste dem Guide folgen und in der Gruppe bleiben.",
  "Comfortable clothing, sunglasses and sunscreen are recommended.": "Bequeme Kleidung, Sonnenbrille und Sonnencreme werden empfohlen.",
  "The experience is subject to weather and operational conditions.": "Das Erlebnis hängt von den Wetter- und Betriebsbedingungen ab.",
  "Private Boat Charter": "Private Bootscharter",
  "Enjoy an exclusive 8-hour private boat charter on the Red Sea, created for families, couples and groups who want complete privacy, flexible timing and the freedom to enjoy their perfect day at sea.": "Genießen Sie einen exklusiven, achtstündigen privaten Bootscharter auf dem Roten Meer – ideal für Familien, Paare und Gruppen, die Privatsphäre, flexible Zeiten und einen ganz persönlichen Tag auf dem Meer wünschen.",
  "Your Own Private Day at Sea": "Ihr ganz privater Tag auf dem Meer",
  "8 hours at sea": "8 Stunden auf dem Meer",
  "Professional captain & crew": "Professioneller Kapitän und Crew",
  "Private snorkeling guide": "Privater Schnorchelguide",
  "Multiple snorkeling stops": "Mehrere Schnorchelstopps",
  "Fresh lunch onboard": "Frisches Mittagessen an Bord",
  "Seafood or BBQ lunch": "Meeresfrüchte- oder BBQ-Mittagessen",
  "Drinks throughout the day": "Getränke den ganzen Tag über",
  "Optional Giftun Islands": "Optionale Giftun-Inseln",
  "Fishing & free swimming": "Angeln und freies Schwimmen",
  "Your private experience begins with a comfortable air-conditioned transfer from your hotel in Hurghada directly to Hurghada Marina.": "Ihr privates Erlebnis beginnt mit einem komfortablen, klimatisierten Transfer von Ihrem Hotel in Hurghada direkt zur Marina von Hurghada.",
  "Welcome Aboard Your Private Boat": "Willkommen an Bord Ihres privaten Boots",
  "Board your private boat and meet your dedicated captain and professional crew before setting out across the Red Sea.": "Gehen Sie an Bord Ihres privaten Boots und lernen Sie Ihren Kapitän und die professionelle Crew kennen, bevor Sie aufs Rote Meer hinausfahren.",
  "Cruise Across the Red Sea": "Bootsfahrt über das Rote Meer",
  "Enjoy a relaxing private cruise across the crystal-clear waters of the Red Sea. Your route can be adjusted according to your group's preferences and the conditions of the day.": "Genießen Sie eine entspannte private Fahrt durch das kristallklare Wasser des Roten Meeres. Die Route kann an die Wünsche Ihrer Gruppe und die Bedingungen des Tages angepasst werden.",
  "Stop at some of the Red Sea's most beautiful coral reef locations for swimming and snorkeling. Enjoy multiple snorkeling stops and discover colorful fish and vibrant marine life with your private snorkeling guide.": "Halten Sie an einigen der schönsten Korallenriffe des Roten Meeres zum Schwimmen und Schnorcheln. Entdecken Sie mit Ihrem privaten Schnorchelguide bunte Fische und die vielfältige Unterwasserwelt an mehreren Stopps.",
  "Optional Giftun Islands": "Optionale Giftun-Inseln",
  "If you wish, add a visit to one of the beautiful Giftun Islands, such as Orange Bay, Paradise, El Aden, Magaweesh or Hula Hula. Island entry is optional and available at an additional cost depending on the selected island.": "Auf Wunsch können Sie eine der schönen Giftun-Inseln besuchen, zum Beispiel Orange Bay, Paradise, El Aden, Magaweesh oder Hula Hula. Der Inselbesuch ist optional und kostet je nach gewählter Insel zusätzlich.",
  "Fresh Private Lunch Onboard": "Frisches privates Mittagessen an Bord",
  "Enjoy a freshly prepared private lunch served onboard your boat. Choose between a seafood or BBQ-style meal prepared especially for your group, accompanied by drinks throughout the day.": "Genießen Sie ein frisch zubereitetes Mittagessen an Bord. Wählen Sie für Ihre Gruppe zwischen Meeresfrüchten und einem BBQ-Menü; Getränke sind den ganzen Tag über verfügbar.",
  "Relax, Swim & Enjoy Complete Privacy": "Entspannen, schwimmen und Privatsphäre genießen",
  "Spend time relaxing on board, enjoying free swimming or trying your hand at fishing. With the entire boat reserved for your group, you can control the pace of your day and enjoy complete privacy at sea.": "Entspannen Sie an Bord, gehen Sie frei schwimmen oder versuchen Sie sich im Angeln. Da das gesamte Boot Ihrer Gruppe vorbehalten ist, bestimmen Sie das Tempo Ihres Tages und genießen absolute Privatsphäre auf dem Meer.",
  "Return to the Marina": "Rückkehr zur Marina",
  "After approximately eight hours at sea, return to Hurghada Marina. Your private vehicle will then take you comfortably back to your hotel.": "Nach etwa acht Stunden auf dem Meer kehren Sie zur Marina von Hurghada zurück. Ihr Privatfahrzeug bringt Sie anschließend bequem zurück zu Ihrem Hotel.",
  "Private round-trip hotel transportation": "Privater Hin- und Rücktransfer zum Hotel",
  "Private air-conditioned transfer": "Privater klimatisierter Transfer",
  "Private boat charter for 8 hours": "Privater Bootscharter für 8 Stunden",
  "Professional captain and crew": "Professioneller Kapitän und Crew",
  "Complete snorkeling equipment": "Vollständige Schnorchelausrüstung",
  "Masks": "Masken",
  "Fins": "Flossen",
  "Life jackets": "Schwimmwesten",
  "Fresh lunch prepared onboard": "Frisch zubereitetes Mittagessen an Bord",
  "Water and soft drinks throughout the day": "Wasser und alkoholfreie Getränke den ganzen Tag über",
  "Fresh juices": "Frische Säfte",
  "Giftun Island entry fees": "Eintrittsgebühren für Giftun-Inseln",
  "Orange Bay entry fee": "Eintrittsgebühr für Orange Bay",
  "Paradise Island entry fee": "Eintrittsgebühr für Paradise Island",
  "El Aden Island entry fee": "Eintrittsgebühr für El Aden",
  "Magaweesh Island entry fee": "Eintrittsgebühr für Magaweesh",
  "Hula Hula Island entry fee": "Eintrittsgebühr für Hula Hula",
  "Optional water sports activities": "Optionale Wassersportaktivitäten",
  "Parasailing and water games": "Parasailing und Wasserspiele",
  "Professional photography and video services": "Professionelle Foto- und Videodienste",
  "Tips for the boat crew": "Trinkgelder für die Bootscrew",
  "This is a fully private 8-hour boat charter.": "Dies ist ein vollständig privater Bootscharter für acht Stunden.",
  "The experience is ideal for families, couples and groups looking for complete privacy.": "Das Erlebnis ist ideal für Familien, Paare und Gruppen, die absolute Privatsphäre wünschen.",
  "Departure time is flexible and is usually arranged around 08:30 or 09:00 AM.": "Die Abfahrtszeit ist flexibel und liegt normalerweise bei etwa 08:30 oder 09:00 Uhr.",
  "Return is approximately 04:30 or 05:00 PM depending on the selected departure time.": "Die Rückkehr erfolgt je nach gewählter Abfahrtszeit ungefähr um 16:30 oder 17:00 Uhr.",
  "The itinerary can be customized according to your group's preferences and sea conditions.": "Der Reiseplan kann an die Wünsche Ihrer Gruppe und die Bedingungen auf See angepasst werden.",
  "Guests can choose how long they would like to spend snorkeling, swimming or relaxing at sea.": "Gäste können selbst entscheiden, wie viel Zeit sie mit Schnorcheln, Schwimmen oder Entspannen auf dem Meer verbringen möchten.",
  "Giftun Island visits are optional and available at an additional cost depending on the selected island.": "Besuche der Giftun-Inseln sind optional und kosten je nach gewählter Insel zusätzlich.",
  "Bring swimwear, personal towels, sunglasses and sunscreen.": "Bringen Sie Badebekleidung, eigene Handtücher, eine Sonnenbrille und Sonnencreme mit.",
  "The experience is subject to weather and sea conditions.": "Das Erlebnis hängt von den Wetter- und Seebedingungen ab.",
  "Aswan Private Tour": "Private Assuan-Tour",
  "Discover the beauty and history of Aswan with a premium private tour from Hurghada, designed for guests who appreciate comfort, privacy and personalized service.": "Entdecken Sie die Schönheit und Geschichte Assuans auf einer exklusiven privaten Tour ab Hurghada – ideal für Gäste, die Komfort, Privatsphäre und persönlichen Service schätzen.",
  "A Private Journey to Southern Egypt": "Eine private Reise in den Süden Ägyptens",
  "Aswan highlights": "Höhepunkte Assuans",
  "Private Departure": "Private Abfahrt",
  "Depart from your hotel in Hurghada in your selected private vehicle and travel comfortably towards Aswan.": "Starten Sie an Ihrem Hotel in Hurghada in Ihrem ausgewählten Privatfahrzeug und reisen Sie bequem nach Assuan.",
  "Discover Aswan": "Assuan entdecken",
  "Explore the city's most important landmarks and discover the unique beauty and history of southern Egypt with your private guide.": "Entdecken Sie mit Ihrem privaten Reiseleiter die wichtigsten Sehenswürdigkeiten der Stadt sowie die einzigartige Schönheit und Geschichte Südägyptens.",
  "Private Exploration": "Private Entdeckungstour",
  "Enjoy a flexible private itinerary designed around the highlights you want to experience during your visit.": "Genießen Sie einen flexiblen privaten Reiseplan, der auf die Höhepunkte abgestimmt ist, die Sie während Ihres Besuchs erleben möchten.",
  "After your private day in Aswan, relax during the return journey to your hotel.": "Entspannen Sie sich nach Ihrem privaten Tag in Assuan während der Rückfahrt zu Ihrem Hotel.",
  "Professional private guide": "Professioneller privater Reiseleiter",
  "Included entrance tickets according to the final itinerary": "Enthaltene Eintrittskarten gemäß dem endgültigen Reiseplan",
  "Optional entrance tickets": "Optionale Eintrittskarten",
  "An early departure is recommended.": "Eine frühe Abfahrt wird empfohlen.",
  "Comfortable walking shoes are recommended.": "Bequeme Schuhe zum Gehen werden empfohlen.",
  "The itinerary can be customized upon request.": "Der Reiseplan kann auf Anfrage individuell angepasst werden.",
  "Alexandria Private Tour": "Private Alexandria-Tour",
  "Discover the historic Mediterranean city of Alexandria on a completely private full-day journey from Hurghada, exploring ancient Roman and Greek heritage, museums, royal gardens and the city's iconic Mediterranean landmarks with your private guide.": "Entdecken Sie die historische Mittelmeerstadt Alexandria auf einem vollständig privaten Tagesausflug ab Hurghada. Erkunden Sie antikes römisches und griechisches Erbe, Museen, königliche Gärten und berühmte Sehenswürdigkeiten am Mittelmeer mit Ihrem privaten Reiseleiter.",
  "A Private Journey Through Alexandria": "Eine private Reise durch Alexandria",
  "Modern air-conditioned vehicle": "Modernes, klimatisiertes Fahrzeug",
  "Private professional tour guide": "Privater professioneller Reiseleiter",
  "Pompey's Pillar": "Pompeius-Säule",
  "Catacombs of Kom El Shoqafa": "Katakomben von Kom el-Schuqafa",
  "Alexandria National Museum": "Nationalmuseum von Alexandria",
  "Bibliotheca Alexandrina": "Bibliotheca Alexandrina",
  "Stanley Bridge": "Stanley-Brücke",
  "Montaza Palace & Gardens": "Montaza-Palast und Gärten",
  "Private Early-Morning Departure": "Private Abfahrt am frühen Morgen",
  "Your private Alexandria journey begins with pickup from your hotel in Hurghada between 02:00 and 03:00 AM. Travel comfortably in a modern air-conditioned private vehicle towards Alexandria.": "Ihre private Reise nach Alexandria beginnt mit der Abholung an Ihrem Hotel in Hurghada zwischen 02:00 und 03:00 Uhr. Reisen Sie bequem in einem modernen, klimatisierten Privatfahrzeug nach Alexandria.",
  "Visit Pompey's Pillar and admire one of Alexandria's most important Roman monuments.": "Besuchen Sie die Pompeius-Säule und bewundern Sie eines der bedeutendsten römischen Denkmäler Alexandrias.",
  "Explore the underground tunnels, chambers and fascinating Roman and Greek funerary architecture.": "Erkunden Sie unterirdische Tunnel und Kammern sowie die faszinierende römische und griechische Grabarchitektur.",
  "Visit the Alexandria National Museum and discover its remarkable collection representing Pharaonic, Greek, Coptic and Islamic history.": "Besuchen Sie das Nationalmuseum von Alexandria und entdecken Sie seine bemerkenswerte Sammlung zur pharaonischen, griechischen, koptischen und islamischen Geschichte.",
  "Continue to the Bibliotheca Alexandrina, one of Alexandria's most important cultural landmarks overlooking the Mediterranean Sea.": "Besuchen Sie anschließend die Bibliotheca Alexandrina, eine der wichtigsten kulturellen Sehenswürdigkeiten Alexandrias mit Blick auf das Mittelmeer.",
  "Lunch at a Local Restaurant": "Mittagessen in einem lokalen Restaurant",
  "Enjoy lunch at a carefully selected local restaurant in Alexandria.": "Genießen Sie Ihr Mittagessen in einem sorgfältig ausgewählten lokalen Restaurant in Alexandria.",
  "Visit the famous Stanley Bridge and enjoy time for photographs overlooking the Mediterranean coastline.": "Besuchen Sie die berühmte Stanley-Brücke und nutzen Sie die Zeit für Fotos mit Blick auf die Mittelmeerküste.",
  "Explore Montaza Palace and Gardens, enjoying the landscaped gardens, Mediterranean views and royal architecture.": "Erkunden Sie den Montaza-Palast und seine Gärten mit gepflegten Grünanlagen, Blick auf das Mittelmeer und königlicher Architektur.",
  "After a full day of private exploration, return comfortably to your hotel in Hurghada.": "Nach einem erlebnisreichen Tag voller privater Entdeckungen kehren Sie bequem zu Ihrem Hotel in Hurghada zurück.",
  "Private round-trip transportation from your hotel": "Privater Hin- und Rücktransfer ab Ihrem Hotel",
  "Professional private tour guide": "Professioneller privater Reiseleiter",
  "Guide available in multiple languages": "Reiseleiter in mehreren Sprachen verfügbar",
  "Entrance tickets to all listed attractions and museums": "Eintrittskarten für alle aufgeführten Sehenswürdigkeiten und Museen",
  "Lunch during the tour": "Mittagessen während der Tour",
  "All taxes and tour fees": "Alle Steuern und Tourgebühren",
  "Additional drinks during lunch": "Zusätzliche Getränke zum Mittagessen",
  "Special food requests or extra meals": "Besondere Essenswünsche oder zusätzliche Mahlzeiten",
  "Personal purchases": "Persönliche Einkäufe",
  "Additional activities not mentioned in the program": "Zusätzliche Aktivitäten, die nicht im Programm aufgeführt sind",
  "Fully private tour designed for maximum comfort and privacy.": "Eine vollständig private Tour für maximalen Komfort und Privatsphäre.",
  "Free cancellation up to 24 hours before departure.": "Kostenlose Stornierung bis 24 Stunden vor der Abfahrt.",
  "A breakfast box from your hotel is recommended.": "Eine Frühstücksbox vom Hotel wird empfohlen.",
  "Comfortable clothing and walking shoes are recommended.": "Bequeme Kleidung und Wanderschuhe werden empfohlen.",
  "Bring sunglasses, a hat and sunscreen.": "Bringen Sie Sonnenbrille, Hut und Sonnencreme mit.",
  "The total journey takes approximately 16–18 hours.": "Die gesamte Reise dauert ungefähr 16–18 Stunden.",
  "Buggy Safari": "Buggy-Safari",
  "Enjoy an exciting guided buggy adventure through the Egyptian desert, riding as part of a dedicated group with a professional guide leading the way throughout the experience.": "Erleben Sie ein aufregendes, geführtes Buggy-Abenteuer in der ägyptischen Wüste. Sie fahren in einer festen Gruppe, die während des gesamten Erlebnisses von einem professionellen Guide begleitet wird.",
  "Guided Buggy Adventure Through the Desert": "Geführtes Buggy-Abenteuer durch die Wüste",
  "Guided buggy adventure": "Geführte Buggy-Tour",
  "Dedicated group experience": "Tour in einer festen Gruppe",
  "Professional desert guide": "Professioneller Wüsten-Guide",
  "Buggy driving experience": "Buggy-Fahrerlebnis",
  "Safety briefing": "Sicherheitseinweisung",
  "Safety equipment": "Sicherheitsausrüstung",
  "Test drive": "Probefahrt",
  "Desert & mountain trails": "Wüsten- und Bergstrecken",
  "20–25 km desert ride": "Wüstenfahrt über 20–25 km",
  "Mountain photo & rest stop": "Pause und Fotostopp in den Bergen",
  "Morning or sunset departure": "Abfahrt am Morgen oder zum Sonnenuntergang",
  "Arrival & Desert Preparation": "Ankunft und Vorbereitung in der Wüste",
  "Meet at the main safari station and prepare for your buggy adventure. Get your riding equipment ready and receive the necessary instructions before departure.": "Treffen Sie sich an der Haupt-Safaristation und bereiten Sie sich auf Ihr Buggy-Abenteuer vor. Legen Sie Ihre Ausrüstung an und erhalten Sie vor der Abfahrt die nötigen Anweisungen.",
  "Safety Briefing & Driving Instructions": "Sicherheitseinweisung und Fahranleitung",
  "Your professional guide will explain the safety rules and demonstrate how to operate the buggy correctly, including acceleration, braking and safe driving techniques.": "Ihr professioneller Guide erklärt die Sicherheitsregeln und zeigt Ihnen die richtige Bedienung des Buggys – einschließlich Beschleunigen, Bremsen und sicherer Fahrtechnik.",
  "Before heading into the desert, enjoy a short test drive on a controlled track to make sure you are comfortable and confident with the buggy.": "Bevor es in die Wüste geht, machen Sie eine kurze Probefahrt auf einer kontrollierten Strecke, damit Sie sich mit dem Buggy vertraut und sicher fühlen.",
  "Guided Desert Buggy Adventure": "Geführtes Buggy-Abenteuer in der Wüste",
  "Follow your professional guide as part of your dedicated group and ride through the Egyptian desert across hills, rough trails and spectacular mountain landscapes for approximately 20–25 km.": "Folgen Sie Ihrem professionellen Guide in Ihrer festen Gruppe und fahren Sie etwa 20–25 km durch die ägyptische Wüste, über Hügel, unbefestigte Wege und durch beeindruckende Berglandschaften.",
  "Mountain Rest & Photo Stop": "Pause und Fotostopp in den Bergen",
  "Take a relaxing break at an elevated mountain location, enjoy the surrounding desert scenery, have some water and capture memorable photographs before continuing the adventure.": "Legen Sie an einem höher gelegenen Ort in den Bergen eine entspannte Pause ein, genießen Sie die Wüstenlandschaft, trinken Sie etwas Wasser und machen Sie Erinnerungsfotos, bevor das Abenteuer weitergeht.",
  "Return to the Safari Station": "Rückkehr zur Safaristation",
  "Complete your guided buggy ride back at the main safari station, finishing your desert adventure before your onward journey.": "Kehren Sie nach der geführten Buggy-Fahrt zur Haupt-Safaristation zurück und beenden Sie dort Ihr Wüstenabenteuer, bevor Sie weiterfahren.",
  "Test drive before the main ride": "Probefahrt vor der eigentlichen Tour",
  "Guided desert ride": "Geführte Wüstenfahrt",
  "20–25 km desert route": "Wüstenroute über 20–25 km",
  "Mountain rest and photo stop": "Pause und Fotostopp in den Bergen",
  "Hotel transfers unless specifically requested": "Hoteltransfers, sofern nicht ausdrücklich angefragt",
  "Optional photography and video services": "Optionale Foto- und Videodienste",
  "Personal expenses": "Persönliche Ausgaben",
  "Drinks other than included water": "Getränke außer dem enthaltenen Wasser",
  "Tips": "Trinkgelder",
  "The experience is operated as a dedicated group with a professional guide leading the group throughout the ride.": "Die Tour findet in einer festen Gruppe statt, die während der gesamten Fahrt von einem professionellen Guide geführt wird.",
  "Guests must follow the guide and remain within the group for safety.": "Aus Sicherheitsgründen müssen Gäste dem Guide folgen und bei der Gruppe bleiben.",
  "Actual driving time is approximately 45–60 minutes.": "Die reine Fahrzeit beträgt etwa 45–60 Minuten.",
  "Total experience duration is approximately 2–3 hours including preparation, transfers and rest stops.": "Das gesamte Erlebnis dauert einschließlich Vorbereitung, Transfers und Pausen etwa 2–3 Stunden.",
  "Trips are available daily in the morning or around sunset.": "Die Touren finden täglich am Morgen oder rund um den Sonnenuntergang statt.",
  "Closed shoes are recommended.": "Festes, geschlossenes Schuhwerk wird empfohlen.",
  "Comfortable outdoor clothing, sunglasses and sunscreen are recommended.": "Bequeme Outdoor-Kleidung, Sonnenbrille und Sonnencreme werden empfohlen.",
  "The experience is subject to weather and operational conditions.": "Das Erlebnis hängt von den Wetter- und Betriebsbedingungen ab.",
  "Private Speed Boat": "Privates Schnellboot",
  "Enjoy an exclusive private speed boat experience across the beautiful Red Sea, with a dedicated crew, snorkeling stop, White Island visit and the freedom to choose your preferred additional island destination.": "Genießen Sie ein exklusives Schnellboot-Erlebnis auf dem wunderschönen Roten Meer – mit eigener Crew, Schnorchelstopp, Besuch der White Island und der Freiheit, eine weitere Insel Ihrer Wahl hinzuzufügen.",
  "Your Private Escape on the Red Sea": "Ihre private Auszeit am Roten Meer",
  "Private speed boat": "Privates Schnellboot",
  "Professional crew": "Professionelle Crew",
  "White Island visit": "Besuch der White Island",
  "Additional island of your choice": "Weitere Insel Ihrer Wahl",
  "Snorkeling stop": "Schnorchelstopp",
  "Snorkeling equipment": "Schnorchelausrüstung",
  "Fresh fruit onboard": "Frisches Obst an Bord",
  "Exclusive experience": "Exklusives Erlebnis",
  "Flexible timing": "Flexible Zeitplanung",
  "Complete privacy": "Absolute Privatsphäre",
  "Private Hotel Pickup": "Private Abholung am Hotel",
  "Start your experience with private transportation from your hotel to the marina, ready for your exclusive Red Sea adventure.": "Ihr Erlebnis beginnt mit einem privaten Transfer von Ihrem Hotel zum Yachthafen – bereit für Ihr exklusives Abenteuer am Roten Meer.",
  "Private Speed Boat Departure": "Abfahrt mit dem privaten Schnellboot",
  "Board your private speed boat and set out across the crystal-clear waters of the Red Sea with your dedicated professional crew.": "Gehen Sie an Bord Ihres privaten Schnellboots und fahren Sie mit Ihrer professionellen Crew über das kristallklare Wasser des Roten Meeres.",
  "Enjoy a dedicated snorkeling stop at one of the beautiful Red Sea spots and discover the vibrant marine life beneath the crystal-clear waters. Snorkeling equipment is provided.": "Genießen Sie einen Schnorchelstopp an einem der schönsten Plätze des Roten Meeres und entdecken Sie die vielfältige Unterwasserwelt. Die Schnorchelausrüstung wird bereitgestellt.",
  "White Island": "White Island",
  "Visit the beautiful White Island as a fixed part of your private speed boat experience. Enjoy the unique scenery, crystal-clear waters and time to relax and take unforgettable photographs.": "Der Besuch der wunderschönen White Island ist fester Bestandteil Ihres privaten Schnellboot-Erlebnisses. Genießen Sie die einzigartige Landschaft, das kristallklare Wasser und Zeit zum Entspannen und Fotografieren.",
  "Choose Your Additional Island": "Wählen Sie eine weitere Insel",
  "After visiting White Island, choose your preferred additional island destination. You can select Paradise Island, El Aden, the Protected Area, Orange Bay, Hula Hula, Magaweesh or Amwaj Island. Each island option has its own additional price.": "Nach dem Besuch der White Island wählen Sie eine weitere Insel Ihrer Wahl: Paradise Island, El Aden, das Schutzgebiet, Orange Bay, Hula Hula, Magaweesh oder Amwaj Island. Für jede Inseloption fällt ein eigener Aufpreis an.",
  "Fresh Fruit Onboard": "Frisches Obst an Bord",
  "Relax during the journey and enjoy fresh fruit while taking in the beautiful Red Sea views.": "Entspannen Sie während der Fahrt und genießen Sie frisches Obst mit Blick auf das wunderschöne Rote Meer.",
  "Private round-trip transportation from your hotel": "Privater Hin- und Rücktransfer ab Ihrem Hotel",
  "Private speed boat with professional crew": "Privates Schnellboot mit professioneller Crew",
  "Snorkeling equipment": "Schnorchelausrüstung",
  "Fresh fruit onboard": "Frisches Obst an Bord",
  "White Island visit": "Besuch der White Island",
  "Additional island destination": "Besuch einer weiteren Insel Ihrer Wahl",
  "Lunch": "Mittagessen",
  "Drinks": "Getränke",
  "Tips and personal expenses": "Trinkgelder und persönliche Ausgaben",
  "Please arrive at the marina on time for your selected departure.": "Bitte erscheinen Sie rechtzeitig zum gewählten Abfahrtstermin am Yachthafen.",
  "Bring swimwear, a towel, sunscreen and sunglasses.": "Bringen Sie Badebekleidung, ein Handtuch, Sonnencreme und eine Sonnenbrille mit.",
  "Island access fees may vary depending on your selected destination.": "Die Gebühren für den Inselzugang können je nach gewähltem Ziel variieren.",
  "The additional island destination can be selected according to your preferences.": "Die zusätzliche Insel kann nach Ihren Wünschen ausgewählt werden.",
  "Cairo Private Tour": "Private Kairo-Tour",
  "Discover the legendary Pyramids of Giza, the Great Sphinx and the highlights of Cairo on a completely private journey from Hurghada, with the flexibility to choose your preferred museum experience.": "Entdecken Sie die legendären Pyramiden von Gizeh, die Große Sphinx und die Höhepunkte Kairos auf einer vollständig privaten Reise ab Hurghada. Sie können dabei Ihr bevorzugtes Museumserlebnis auswählen.",
  "The Wonders of Cairo, Your Way": "Kairos Wunder ganz nach Ihren Wünschen",
  "Great Sphinx": "Große Sphinx",
  "Valley Temple": "Taltempel",
  "Museum of your choice": "Museum Ihrer Wahl",
  "Premium private experience": "Exklusives privates Erlebnis",
  "Flexible itinerary": "Flexibler Reiseplan",
  "No shared transportation": "Kein Sammeltransfer",
  "Private Departure from Hurghada": "Private Abfahrt ab Hurghada",
  "Your private Cairo journey begins at 02:30 AM with pickup from your hotel in Hurghada. Travel comfortably in your selected private vehicle or tourist bus with air conditioning throughout the journey.": "Ihre private Kairo-Reise beginnt um 02:30 Uhr mit der Abholung an Ihrem Hotel in Hurghada. Reisen Sie bequem in Ihrem ausgewählten Privatfahrzeug oder Touristenbus mit Klimaanlage während der gesamten Fahrt.",
  "Pyramids of Giza": "Pyramiden von Gizeh",
  "Arrive in Giza and explore the legendary Pyramids of Khufu, Khafre and Menkaure with your private Egyptologist guide. Enjoy time at the panoramic viewpoint for unforgettable photographs overlooking the pyramids.": "Erkunden Sie in Gizeh mit Ihrem privaten Ägyptologen-Reiseleiter die legendären Pyramiden von Cheops, Chephren und Mykerinos. Am Aussichtspunkt haben Sie Zeit für unvergessliche Fotos mit Blick auf die Pyramiden.",
  "The Great Sphinx & Valley Temple": "Die Große Sphinx und der Taltempel",
  "Continue to the iconic Great Sphinx and the nearby Valley Temple. Discover the history, legends and architectural secrets behind two of the most famous monuments of ancient Egypt.": "Weiter geht es zur berühmten Großen Sphinx und zum nahe gelegenen Taltempel. Entdecken Sie die Geschichte, Legenden und architektonischen Geheimnisse zweier der bekanntesten Monumente des alten Ägyptens.",
  "Lunch in Cairo": "Mittagessen in Kairo",
  "Take a relaxing break and enjoy a freshly prepared lunch at a carefully selected local restaurant in Cairo.": "Legen Sie eine entspannte Pause ein und genießen Sie ein frisch zubereitetes Mittagessen in einem sorgfältig ausgewählten lokalen Restaurant in Kairo.",
  "Choose Your Museum Experience": "Wählen Sie Ihr Museumserlebnis",
  "Customize your private Cairo experience by choosing whether to visit a museum. Depending on your selected option, you can visit the Egyptian Museum in Tahrir Square, explore the Grand Egyptian Museum, or continue the tour without a museum visit.": "Gestalten Sie Ihr privates Kairo-Erlebnis selbst und entscheiden Sie, ob Sie ein Museum besuchen möchten. Je nach gewählter Option können Sie das Ägyptische Museum am Tahrir-Platz, das Grand Egyptian Museum oder die Tour ohne Museumsbesuch erleben.",
  "Shopping & Cairo Highlights": "Einkaufen und Höhepunkte Kairos",
  "If time allows, enjoy a short shopping stop for authentic papyrus and perfumes, or explore the atmosphere of Khan el-Khalili according to the selected program and available time.": "Wenn es die Zeit erlaubt, legen Sie einen kurzen Einkaufsstopp für echten Papyrus und Parfüms ein oder entdecken Sie je nach Programm und verfügbarer Zeit die Atmosphäre des Khan el-Khalili.",
  "After an unforgettable private day in Cairo, relax in your comfortable vehicle and begin the journey back to Hurghada, arriving at your hotel approximately between 10:00 and 11:00 PM.": "Nach einem unvergesslichen privaten Tag in Kairo entspannen Sie sich in Ihrem komfortablen Fahrzeug und fahren zurück nach Hurghada. Die Ankunft an Ihrem Hotel ist voraussichtlich zwischen 22:00 und 23:00 Uhr.",
  "Private round-trip transportation": "Privater Hin- und Rücktransfer",
  "Professional private Egyptologist guide": "Professioneller privater Ägyptologen-Reiseleiter",
  "Entrance tickets to the included attractions": "Eintrittskarten für die enthaltenen Sehenswürdigkeiten",
  "Great Sphinx & Valley Temple visit": "Besuch der Großen Sphinx und des Taltempels",
  "Lunch at a local restaurant": "Mittagessen in einem lokalen Restaurant",
  "Optional museum tickets according to the selected option": "Optionale Museumseintritte je nach gewählter Option",
  "Entrance tickets inside the pyramids": "Eintrittskarten für das Innere der Pyramiden",
  "Mummy Hall or other optional museum areas": "Mumienhalle oder andere optionale Museumsbereiche",
  "Drinks during lunch": "Getränke zum Mittagessen",
  "Personal purchases and souvenirs": "Persönliche Einkäufe und Souvenirs",
  "Departure from Hurghada is fixed at 02:30 AM.": "Die Abfahrt ab Hurghada ist fest auf 02:30 Uhr festgelegt.",
  "Guests can choose whether to include a museum visit in their experience.": "Gäste können entscheiden, ob ein Museumsbesuch Teil ihres Erlebnisses sein soll.",
  "The museum option can be selected according to the preferred program.": "Die Museumsoption kann passend zum gewünschten Programm ausgewählt werden.",
  "Breakfast box from your hotel is recommended.": "Eine Frühstücksbox vom Hotel wird empfohlen.",
  "Comfortable walking shoes and suitable clothing are recommended.": "Bequeme Schuhe und geeignete Kleidung werden empfohlen.",
  "Private itinerary adjustments can be requested when possible.": "Änderungen am privaten Reiseplan können auf Anfrage und je nach Möglichkeit berücksichtigt werden.",
  "Private Luxor Overday Tour": "Private Luxor-Tagesreise",
  "Discover the wonders of ancient Luxor in complete privacy, with a dedicated private vehicle, professional Egyptologist guide and a carefully planned full-day experience from Hurghada.": "Entdecken Sie die Wunder des antiken Luxor ganz privat – mit einem eigenen Fahrzeug, einem professionellen Ägyptologen als Reiseleiter und einem sorgfältig geplanten Ganztagesausflug ab Hurghada.",
  "A Private Journey Through Ancient Egypt": "Eine private Reise durch das alte Ägypten",
  "Private transportation": "Privater Transfer",
  "Private Egyptologist guide": "Privater Ägyptologen-Reiseleiter",
  "Hotel pickup & drop-off": "Abholung und Rücktransfer zum Hotel",
  "Karnak Temple": "Karnak-Tempel",
  "Valley of the Kings – 3 tombs": "Tal der Könige – 3 Gräber",
  "Temple of Hatshepsut": "Tempel der Hatschepsut",
  "Lunch included": "Mittagessen inklusive",
  "Fully private experience": "Vollständig privates Erlebnis",
  "Private Early-Morning Departure": "Private Abfahrt am frühen Morgen",
  "Your private journey begins with pickup from your hotel in Hurghada at 04:30 AM. Relax in your selected private vehicle as you travel comfortably towards Luxor through the Eastern Desert.": "Ihre private Reise beginnt mit der Abholung an Ihrem Hotel in Hurghada um 04:30 Uhr. Lehnen Sie sich in Ihrem ausgewählten Privatfahrzeug zurück und fahren Sie komfortabel durch die Östliche Wüste nach Luxor.",
  "Explore the magnificent Karnak Temple complex with your private Egyptologist guide. Discover the Great Hypostyle Hall, monumental columns and fascinating stories from ancient Egyptian history.": "Erkunden Sie mit Ihrem privaten Ägyptologen-Reiseleiter die beeindruckende Tempelanlage von Karnak. Entdecken Sie die Große Säulenhalle, monumentale Säulen und faszinierende Geschichten aus der altägyptischen Geschichte.",
  "Lunch by the Nile": "Mittagessen am Nil",
  "Take a relaxing break and enjoy a freshly prepared Egyptian lunch at a carefully selected local restaurant, with the opportunity to enjoy the atmosphere of the Nile.": "Gönnen Sie sich eine entspannte Pause und genießen Sie ein frisch zubereitetes ägyptisches Mittagessen in einem sorgfältig ausgewählten Restaurant – mit Gelegenheit, die Atmosphäre am Nil zu erleben.",
  "Cross to the West Bank": "Überfahrt zum Westufer",
  "Continue your private exploration by crossing the Nile to Luxor's legendary West Bank, home to some of Egypt's most remarkable ancient monuments.": "Setzen Sie Ihre private Entdeckungstour mit der Überquerung des Nils zum legendären Westufer von Luxor fort, wo einige der bedeutendsten antiken Denkmäler Ägyptens liegen.",
  "Valley of the Kings": "Tal der Könige",
  "Enter the Valley of the Kings and explore three included royal tombs carved deep into the mountains, while your private guide explains the history and stories behind them.": "Betreten Sie das Tal der Könige und besichtigen Sie drei enthaltene Königsgräber, die tief in den Fels gehauen wurden. Ihr privater Reiseleiter erklärt Ihnen ihre Geschichte und die Geschichten dahinter.",
  "Visit the spectacular Temple of Hatshepsut at Deir el-Bahari and discover the story of one of ancient Egypt's most remarkable rulers.": "Besuchen Sie den beeindruckenden Tempel der Hatschepsut in Deir el-Bahari und erfahren Sie mehr über eine der bemerkenswertesten Herrscherinnen des alten Ägyptens.",
  "Colossi of Memnon": "Memnonkolosse",
  "Stop at the iconic Colossi of Memnon for photographs and a closer look at the monumental statues that have watched over the West Bank for thousands of years.": "Halten Sie an den berühmten Memnonkolossen für Fotos und sehen Sie sich die monumentalen Statuen näher an, die seit Jahrtausenden über das Westufer wachen.",
  "Return to Hurghada": "Rückfahrt nach Hurghada",
  "After a full day of discovery, settle back into your private vehicle and enjoy a comfortable journey back to your hotel in Hurghada.": "Nach einem erlebnisreichen Tag machen Sie es sich in Ihrem Privatfahrzeug bequem und fahren entspannt zurück zu Ihrem Hotel in Hurghada.",
  "Private round-trip transportation from your hotel": "Privater Hin- und Rücktransfer ab Ihrem Hotel",
  "Professional private Egyptologist guide": "Professioneller privater Ägyptologen-Reiseleiter",
  "Entrance ticket to Karnak Temple": "Eintrittskarte für den Karnak-Tempel",
  "Entrance ticket to Hatshepsut Temple": "Eintrittskarte für den Hatschepsut-Tempel",
  "Lunch at a local restaurant": "Mittagessen in einem lokalen Restaurant",
  "Drinks during lunch": "Getränke zum Mittagessen",
  "Tutankhamun, Ramses VI or Nefertari tomb tickets": "Eintrittskarten für die Gräber von Tutanchamun, Ramses VI. oder Nefertari",
  "Nile felucca ride or Banana Island visit": "Fahrt mit einer Nil-Felucca oder Besuch der Bananeninsel",
  "Tips and personal expenses": "Trinkgelder und persönliche Ausgaben",
  "Request a breakfast box from your hotel the evening before departure.": "Bestellen Sie am Abend vor der Abfahrt eine Frühstücksbox bei Ihrem Hotel.",
  "Wear comfortable shoes as the tour involves walking.": "Tragen Sie bequeme Schuhe, da bei der Tour zu Fuß gegangen wird.",
  "Bring a hat, sunglasses and sunscreen.": "Bringen Sie einen Hut, eine Sonnenbrille und Sonnencreme mit.",
  "Private experiences can be tailored around your preferences and schedule.": "Private Erlebnisse können an Ihre Wünsche und Ihren Zeitplan angepasst werden.",
};

function luxuryText(value: string): string {
  return luxuryGermanText[value] ?? value;
}

const luxuryTours = {
  luxor: {
    name: "Private Luxor Overday Tour",
    description:
      "Discover the wonders of ancient Luxor in complete privacy, with a dedicated private vehicle, professional Egyptologist guide and a carefully planned full-day experience from Hurghada.",
    price: 150,
    duration: "Full Day",
    emoji: "🏛️",
    subtitle: "A Private Journey Through Ancient Egypt",
    departure: "04:30 AM",
    returnTime: "08:30 – 09:30 PM",
    highlights: [
      "Private transportation",
      "Private Egyptologist guide",
      "Hotel pickup & drop-off",
      "Karnak Temple",
      "Valley of the Kings – 3 tombs",
      "Temple of Hatshepsut",
      "Lunch included",
      "Fully private experience",
    ],
    itinerary: [
      {
        title: "Private Early-Morning Departure",
        description:
          "Your private journey begins with pickup from your hotel in Hurghada at 04:30 AM. Relax in your selected private vehicle as you travel comfortably towards Luxor through the Eastern Desert.",
      },
      {
        title: "Karnak Temple",
        description:
          "Explore the magnificent Karnak Temple complex with your private Egyptologist guide. Discover the Great Hypostyle Hall, monumental columns and fascinating stories from ancient Egyptian history.",
      },
      {
        title: "Lunch by the Nile",
        description:
          "Take a relaxing break and enjoy a freshly prepared Egyptian lunch at a carefully selected local restaurant, with the opportunity to enjoy the atmosphere of the Nile.",
      },
      {
        title: "Cross to the West Bank",
        description:
          "Continue your private exploration by crossing the Nile to Luxor's legendary West Bank, home to some of Egypt's most remarkable ancient monuments.",
      },
      {
        title: "Valley of the Kings",
        description:
          "Enter the Valley of the Kings and explore three included royal tombs carved deep into the mountains, while your private guide explains the history and stories behind them.",
      },
      {
        title: "Temple of Hatshepsut",
        description:
          "Visit the spectacular Temple of Hatshepsut at Deir el-Bahari and discover the story of one of ancient Egypt's most remarkable rulers.",
      },
      {
        title: "Colossi of Memnon",
        description:
          "Stop at the iconic Colossi of Memnon for photographs and a closer look at the monumental statues that have watched over the West Bank for thousands of years.",
      },
      {
        title: "Return to Hurghada",
        description:
          "After a full day of discovery, settle back into your private vehicle and enjoy a comfortable journey back to your hotel in Hurghada.",
      },
    ],
    included: [
      "Private round-trip transportation from your hotel",
      "Your selected private vehicle",
      "Professional private Egyptologist guide",
      "Entrance ticket to Karnak Temple",
      "Valley of the Kings – 3 tombs",
      "Entrance ticket to Hatshepsut Temple",
      "Lunch at a local restaurant",
      "Drinks during lunch",
      "Hotel pickup & drop-off",
      "Fully private experience with no shared transportation",
    ],
    excluded: [
      "Tutankhamun, Ramses VI or Nefertari tomb tickets",
      "Nile felucca ride or Banana Island visit",
      "Tips and personal expenses",
    ],
    notes: [
      "Request a breakfast box from your hotel the evening before departure.",
      "Wear comfortable shoes as the tour involves walking.",
      "Bring a hat, sunglasses and sunscreen.",
      "Private experiences can be tailored around your preferences and schedule.",
    ],
  },

  cairo: {
    name: "Cairo Private Tour",

    description:
      "Discover the legendary Pyramids of Giza, the Great Sphinx and the highlights of Cairo on a completely private journey from Hurghada, with the flexibility to choose your preferred museum experience.",

    price: 180,

    duration: "Full Day",

    emoji: "🏺",

    subtitle: "The Wonders of Cairo, Your Way",

    departure: "02:30 AM",

    returnTime: "10:00 – 11:00 PM",

    highlights: [
      "Private transportation",
      "Private Egyptologist guide",
      "Hotel pickup & drop-off",
      "Pyramids of Giza",
      "Great Sphinx",
      "Valley Temple",
      "Museum of your choice",
      "Premium private experience",
      "Flexible itinerary",
      "No shared transportation",
    ],

    itinerary: [
      {
        title: "Private Departure from Hurghada",
        description:
          "Your private Cairo journey begins at 02:30 AM with pickup from your hotel in Hurghada. Travel comfortably in your selected private vehicle or tourist bus with air conditioning throughout the journey.",
      },

      {
        title: "Pyramids of Giza",
        description:
          "Arrive in Giza and explore the legendary Pyramids of Khufu, Khafre and Menkaure with your private Egyptologist guide. Enjoy time at the panoramic viewpoint for unforgettable photographs overlooking the pyramids.",
      },

      {
        title: "The Great Sphinx & Valley Temple",
        description:
          "Continue to the iconic Great Sphinx and the nearby Valley Temple. Discover the history, legends and architectural secrets behind two of the most famous monuments of ancient Egypt.",
      },

      {
        title: "Lunch in Cairo",
        description:
          "Take a relaxing break and enjoy a freshly prepared lunch at a carefully selected local restaurant in Cairo.",
      },

      {
        title: "Choose Your Museum Experience",
        description:
          "Customize your private Cairo experience by choosing whether to visit a museum. Depending on your selected option, you can visit the Egyptian Museum in Tahrir Square, explore the Grand Egyptian Museum, or continue the tour without a museum visit.",
      },

      {
        title: "Shopping & Cairo Highlights",
        description:
          "If time allows, enjoy a short shopping stop for authentic papyrus and perfumes, or explore the atmosphere of Khan el-Khalili according to the selected program and available time.",
      },

      {
        title: "Return to Hurghada",
        description:
          "After an unforgettable private day in Cairo, relax in your comfortable vehicle and begin the journey back to Hurghada, arriving at your hotel approximately between 10:00 and 11:00 PM.",
      },
    ],

    included: [
      "Private round-trip transportation",
      "Professional private Egyptologist guide",
      "Hotel pickup & drop-off",
      "Private experience",
      "Entrance tickets to the included attractions",
      "Pyramids of Giza visit",
      "Great Sphinx & Valley Temple visit",
      "Lunch at a local restaurant",
    ],

    excluded: [
      "Optional museum tickets according to the selected option",
      "Entrance tickets inside the pyramids",
      "Mummy Hall or other optional museum areas",
      "Drinks during lunch",
      "Personal purchases and souvenirs",
      "Tips and personal expenses",
    ],

    notes: [
      "Departure from Hurghada is fixed at 02:30 AM.",
      "Guests can choose whether to include a museum visit in their experience.",
      "The museum option can be selected according to the preferred program.",
      "Breakfast box from your hotel is recommended.",
      "Comfortable walking shoes and suitable clothing are recommended.",
      "Private itinerary adjustments can be requested when possible.",
    ],
  },

  "speed-boat": {
    name: "Private Speed Boat",

    description:
      "Enjoy an exclusive private speed boat experience across the beautiful Red Sea, with a dedicated crew, snorkeling stop, White Island visit and the freedom to choose your preferred additional island destination.",

    price: 200,

    duration: "4 Hours",

    emoji: "🚤",

    subtitle: "Your Private Escape on the Red Sea",

    departure: "08:00 AM – 12:00 PM / 01:00 PM – 05:00 PM",

    returnTime: "12:00 PM / 05:00 PM",

    highlights: [
      "Private speed boat",
      "Professional crew",
      "Hotel pickup & drop-off",
      "White Island visit",
      "Additional island of your choice",
      "Snorkeling stop",
      "Snorkeling equipment",
      "Fresh fruit onboard",
      "Exclusive experience",
      "Flexible timing",
      "Complete privacy",
    ],

    islands: [
      {
        name: "Paradise Island",
        slug: "paradise",
        price: 0,
      },
      {
        name: "El Aden Island",
        slug: "aden",
        price: 0,
      },
      {
        name: "Protected Area",
        slug: "protected-area",
        price: 0,
      },
      {
        name: "Orange Bay",
        slug: "orange-bay",
        price: 0,
      },
      {
        name: "Hula Hula Island",
        slug: "hula-hula",
        price: 0,
      },
      {
        name: "Magaweesh Island",
        slug: "magaweesh",
        price: 0,
      },
      {
        name: "Amwaj Island",
        slug: "amwaj",
        price: 0,
      },
    ],

    timeSlots: [
      {
        label: "Morning",
        time: "08:00 AM – 12:00 PM",
      },
      {
        label: "Afternoon",
        time: "01:00 PM – 05:00 PM",
      },
    ],

    itinerary: [
      {
        title: "Private Hotel Pickup",
        description:
          "Start your experience with private transportation from your hotel to the marina, ready for your exclusive Red Sea adventure.",
      },

      {
        title: "Private Speed Boat Departure",
        description:
          "Board your private speed boat and set out across the crystal-clear waters of the Red Sea with your dedicated professional crew.",
      },

      {
        title: "Snorkeling Stop",
        description:
          "Enjoy a dedicated snorkeling stop at one of the beautiful Red Sea spots and discover the vibrant marine life beneath the crystal-clear waters. Snorkeling equipment is provided.",
      },

      {
        title: "White Island",
        description:
          "Visit the beautiful White Island as a fixed part of your private speed boat experience. Enjoy the unique scenery, crystal-clear waters and time to relax and take unforgettable photographs.",
      },

      {
        title: "Choose Your Additional Island",
        description:
          "After visiting White Island, choose your preferred additional island destination. You can select Paradise Island, El Aden, the Protected Area, Orange Bay, Hula Hula, Magaweesh or Amwaj Island. Each island option has its own additional price.",
      },

      {
        title: "Fresh Fruit Onboard",
        description:
          "Relax during the journey and enjoy fresh seasonal fruit served onboard while taking in the beautiful views of the Red Sea.",
      },

      {
        title: "Return to the Marina",
        description:
          "After your four-hour private experience, return comfortably to the marina before your private transfer back to your hotel.",
      },
    ],

    included: [
      "Private speed boat",
      "Professional crew",
      "Private hotel transportation",
      "Hotel pickup & drop-off",
      "Snorkeling stop",
      "Snorkeling equipment",
      "White Island visit",
      "Selected additional island visit",
      "Fresh fruit onboard",
      "Exclusive private experience",
    ],

    excluded: [
      "Additional island option price",
      "Personal expenses",
      "Optional activities not mentioned",
      "Drinks other than the included fresh fruit",
      "Tips",
    ],

    notes: [
      "The experience is available daily.",
      "Guests can choose between the morning or afternoon departure.",
      "Morning session: 08:00 AM – 12:00 PM.",
      "Afternoon session: 01:00 PM – 05:00 PM.",
      "White Island is included as a fixed part of the experience.",
      "Guests can choose one additional island from the available options.",
      "Each additional island option will have its own price.",
      "Bring swimwear, sunglasses, a hat and sunscreen.",
    ],
  },

  "quad-safari": {
    name: "Quad Bike Safari",

    description:
      "Experience an exciting guided quad bike adventure through the Egyptian desert, riding as part of a dedicated group with a professional guide leading the way throughout the journey.",

    price: 120,

    duration: "2–3 Hours",

    emoji: "🏜️",

    subtitle: "Guided Quad Adventure Through the Desert",

    departure: "Morning / Sunset",

    returnTime: "Morning / Evening",

    highlights: [
      "Guided quad bike adventure",
      "Dedicated group experience",
      "Professional desert guide",
      "Single or Double Quad",
      "Safety equipment",
      "Test drive before departure",
      "20–25 km desert ride",
      "Mountain & desert trails",
      "Photo & rest stop",
      "Morning or sunset departure",
    ],

    itinerary: [
      {
        title: "Arrival & Desert Preparation",
        description:
          "Meet at the main safari station and get ready for your adventure. Put on your Bedouin scarf and protective goggles before receiving the necessary riding equipment and instructions.",
      },

      {
        title: "Safety Briefing & Riding Instructions",
        description:
          "Your professional guide will explain the safety rules and demonstrate how to control the quad bike, including acceleration, braking and proper riding techniques.",
      },

      {
        title: "Test Drive",
        description:
          "Before heading into the desert, each guest will complete a short test drive on a closed track to make sure they are comfortable and confident operating the quad bike.",
      },

      {
        title: "Guided Desert Quad Adventure",
        description:
          "Follow your professional guide as part of your dedicated group and ride through the Egyptian desert across hills, rocky paths and challenging terrain for approximately 20–25 km.",
      },

      {
        title: "Mountain Rest & Photo Stop",
        description:
          "Take a relaxing break at an elevated location between the mountains. Enjoy the spectacular desert scenery, take memorable photographs and have some water before continuing the adventure.",
      },

      {
        title: "Return to the Safari Station",
        description:
          "Ride the quads back to the main safari station with your guide, completing your desert adventure before your onward journey.",
      },
    ],

    included: [
      "Quad bike experience",
      "Single or Double Quad option",
      "Professional desert guide",
      "Safety briefing",
      "Helmet and riding safety equipment",
      "Test drive before the main ride",
      "Guided desert ride",
      "20–25 km desert route",
      "Mountain rest and photo stop",
    ],

    excluded: [
      "Hotel transfers unless specifically requested",
      "Bedouin scarf",
      "Protective dust goggles",
      "Optional photography and video services",
      "Personal expenses",
      "Drinks other than included water",
      "Tips",
    ],

    notes: [
      "The experience is operated as a dedicated group with a professional guide leading the group throughout the ride.",
      "Guests can choose between a Single Quad or Double Quad.",
      "Minimum age for driving a Single Quad is 16 years.",
      "Children from 6 years old can ride as passengers on a Double Quad with an accompanying adult.",
      "Actual quad riding time is approximately 45–60 minutes.",
      "Total experience duration is approximately 2–3 hours including preparation, transfers and rest stops.",
      "Trips are available daily in the morning or around sunset.",
      "Closed shoes are required.",
      "Guests must follow the guide and remain within the group for safety.",
      "Comfortable clothing, sunglasses and sunscreen are recommended.",
      "The experience is subject to weather and operational conditions.",
    ],
  },

  "buggy-safari": {
    name: "Buggy Safari",

    description:
      "Enjoy an exciting guided buggy adventure through the Egyptian desert, riding as part of a dedicated group with a professional guide leading the way throughout the experience.",

    price: 160,

    duration: "2–3 Hours",

    emoji: "🏎️",

    subtitle: "Guided Buggy Adventure Through the Desert",

    departure: "Morning / Sunset",

    returnTime: "Morning / Evening",

    highlights: [
      "Guided buggy adventure",
      "Dedicated group experience",
      "Professional desert guide",
      "Buggy driving experience",
      "Safety briefing",
      "Safety equipment",
      "Test drive",
      "Desert & mountain trails",
      "20–25 km desert ride",
      "Mountain photo & rest stop",
      "Morning or sunset departure",
    ],

    itinerary: [
      {
        title: "Arrival & Desert Preparation",
        description:
          "Meet at the main safari station and prepare for your buggy adventure. Get your riding equipment ready and receive the necessary instructions before departure.",
      },

      {
        title: "Safety Briefing & Driving Instructions",
        description:
          "Your professional guide will explain the safety rules and demonstrate how to operate the buggy correctly, including acceleration, braking and safe driving techniques.",
      },

      {
        title: "Test Drive",
        description:
          "Before heading into the desert, enjoy a short test drive on a controlled track to make sure you are comfortable and confident with the buggy.",
      },

      {
        title: "Guided Desert Buggy Adventure",
        description:
          "Follow your professional guide as part of your dedicated group and ride through the Egyptian desert across hills, rough trails and spectacular mountain landscapes for approximately 20–25 km.",
      },

      {
        title: "Mountain Rest & Photo Stop",
        description:
          "Take a relaxing break at an elevated mountain location, enjoy the surrounding desert scenery, have some water and capture memorable photographs before continuing the adventure.",
      },

      {
        title: "Return to the Safari Station",
        description:
          "Complete your guided buggy ride back at the main safari station, finishing your desert adventure before your onward journey.",
      },
    ],

    included: [
      "Buggy driving experience",
      "Professional desert guide",
      "Dedicated group experience",
      "Safety briefing",
      "Safety equipment",
      "Test drive before the main ride",
      "Guided desert ride",
      "20–25 km desert route",
      "Mountain rest and photo stop",
    ],

    excluded: [
      "Hotel transfers unless specifically requested",
      "Optional photography and video services",
      "Personal expenses",
      "Drinks other than included water",
      "Tips",
    ],

    notes: [
      "The experience is operated as a dedicated group with a professional guide leading the group throughout the ride.",
      "Guests must follow the guide and remain within the group for safety.",
      "Actual driving time is approximately 45–60 minutes.",
      "Total experience duration is approximately 2–3 hours including preparation, transfers and rest stops.",
      "Trips are available daily in the morning or around sunset.",
      "Closed shoes are recommended.",
      "Comfortable outdoor clothing, sunglasses and sunscreen are recommended.",
      "The experience is subject to weather and operational conditions.",
    ],
  },

  alexandria: {
    name: "Alexandria Private Tour",
    description:
      "Discover the historic Mediterranean city of Alexandria on a completely private full-day journey from Hurghada, exploring ancient Roman and Greek heritage, museums, royal gardens and the city's iconic Mediterranean landmarks with your private guide.",
    price: 120,
    duration: "Full Day",
    emoji: "🏛️",
    subtitle: "A Private Journey Through Alexandria",
    departure: "02:00 – 03:00 AM",
    returnTime: "10:30 – 11:30 PM",

    highlights: [
      "Private round-trip transportation",
      "Modern air-conditioned vehicle",
      "Private professional tour guide",
      "Pompey's Pillar",
      "Catacombs of Kom El Shoqafa",
      "Alexandria National Museum",
      "Bibliotheca Alexandrina",
      "Stanley Bridge",
      "Montaza Palace & Gardens",
      "Lunch included",
      "Fully private experience",
    ],

    itinerary: [
      {
        title: "Private Early-Morning Departure",
        description:
          "Your private Alexandria journey begins with pickup from your hotel in Hurghada between 02:00 and 03:00 AM. Travel comfortably in a modern air-conditioned private vehicle towards Alexandria.",
      },
      {
        title: "Pompey's Pillar",
        description:
          "Visit Pompey's Pillar and admire one of Alexandria's most important Roman monuments.",
      },
      {
        title: "Catacombs of Kom El Shoqafa",
        description:
          "Explore the underground tunnels, chambers and fascinating Roman and Greek funerary architecture.",
      },
      {
        title: "Alexandria National Museum",
        description:
          "Visit the Alexandria National Museum and discover its remarkable collection representing Pharaonic, Greek, Coptic and Islamic history.",
      },
      {
        title: "Bibliotheca Alexandrina",
        description:
          "Continue to the Bibliotheca Alexandrina, one of Alexandria's most important cultural landmarks overlooking the Mediterranean Sea.",
      },
      {
        title: "Lunch at a Local Restaurant",
        description:
          "Enjoy lunch at a carefully selected local restaurant in Alexandria.",
      },
      {
        title: "Stanley Bridge",
        description:
          "Visit the famous Stanley Bridge and enjoy time for photographs overlooking the Mediterranean coastline.",
      },
      {
        title: "Montaza Palace & Gardens",
        description:
          "Explore Montaza Palace and Gardens, enjoying the landscaped gardens, Mediterranean views and royal architecture.",
      },
      {
        title: "Return to Hurghada",
        description:
          "After a full day of private exploration, return comfortably to your hotel in Hurghada.",
      },
    ],

    included: [
      "Private round-trip transportation from your hotel",
      "Modern air-conditioned private vehicle",
      "Professional private tour guide",
      "Guide available in multiple languages",
      "Entrance tickets to all listed attractions and museums",
      "Lunch during the tour",
      "Hotel pickup & drop-off",
      "All taxes and tour fees",
      "Fully private experience",
    ],

    excluded: [
      "Additional drinks during lunch",
      "Special food requests or extra meals",
      "Personal purchases",
      "Additional activities not mentioned in the program",
      "Tips and personal expenses",
    ],

    notes: [
      "Fully private tour designed for maximum comfort and privacy.",
      "Free cancellation up to 24 hours before departure.",
      "A breakfast box from your hotel is recommended.",
      "Comfortable clothing and walking shoes are recommended.",
      "Bring sunglasses, a hat and sunscreen.",
      "The total journey takes approximately 16–18 hours.",
    ],
  },

  aswan: {
    name: "Aswan Private Tour",
    description:
      "Discover the beauty and history of Aswan with a premium private tour from Hurghada, designed for guests who appreciate comfort, privacy and personalized service.",
    price: 250,
    duration: "Full Day",
    emoji: "🌅",
    subtitle: "A Private Journey to Southern Egypt",
    departure: "Early Morning",
    returnTime: "Evening",
    highlights: [
      "Private transportation",
      "Private experience",
      "Professional Egyptologist guide",
      "Hotel pickup & drop-off",
      "Aswan highlights",
      "Flexible itinerary",
    ],
    itinerary: [
      {
        title: "Private Departure",
        description:
          "Depart from your hotel in Hurghada in your selected private vehicle and travel comfortably towards Aswan.",
      },
      {
        title: "Discover Aswan",
        description:
          "Explore the city's most important landmarks and discover the unique beauty and history of southern Egypt with your private guide.",
      },
      {
        title: "Private Exploration",
        description:
          "Enjoy a flexible private itinerary designed around the highlights you want to experience during your visit.",
      },
      {
        title: "Return to Hurghada",
        description:
          "After your private day in Aswan, relax during the return journey to your hotel.",
      },
    ],
    included: [
      "Private round-trip transportation",
      "Professional private guide",
      "Hotel pickup & drop-off",
      "Private experience",
      "Included entrance tickets according to the final itinerary",
    ],
    excluded: [
      "Optional entrance tickets",
      "Drinks",
      "Tips and personal expenses",
    ],
    notes: [
      "An early departure is recommended.",
      "Comfortable walking shoes are recommended.",
      "The itinerary can be customized upon request.",
    ],
  },

  "private-boat": {
    name: "Private Boat Charter",

    description:
      "Enjoy an exclusive 8-hour private boat charter on the Red Sea, created for families, couples and groups who want complete privacy, flexible timing and the freedom to enjoy their perfect day at sea.",

    price: 180,

    duration: "8 Hours",

    emoji: "🛥️",

    subtitle: "Your Own Private Day at Sea",

    departure: "Flexible — Usually 08:30 or 09:00 AM",

    returnTime: "Approximately 04:30 or 05:00 PM",

    highlights: [
      "Private boat charter",
      "8 hours at sea",
      "Private transportation",
      "Professional captain & crew",
      "Private snorkeling guide",
      "Multiple snorkeling stops",
      "Fresh lunch onboard",
      "Seafood or BBQ lunch",
      "Drinks throughout the day",
      "Complete privacy",
      "Flexible itinerary",
      "Optional Giftun Islands",
      "Fishing & free swimming",
    ],

    itinerary: [
      {
        title: "Private Hotel Pickup",
        description:
          "Your private experience begins with a comfortable air-conditioned transfer from your hotel in Hurghada directly to Hurghada Marina.",
      },

      {
        title: "Welcome Aboard Your Private Boat",
        description:
          "Board your private boat and meet your dedicated captain and professional crew before setting out across the Red Sea.",
      },

      {
        title: "Cruise Across the Red Sea",
        description:
          "Enjoy a relaxing private cruise across the crystal-clear waters of the Red Sea. Your route can be adjusted according to your group's preferences and the conditions of the day.",
      },

      {
        title: "Multiple Snorkeling Stops",
        description:
          "Stop at some of the Red Sea's most beautiful coral reef locations for swimming and snorkeling. Enjoy multiple snorkeling stops and discover colorful fish and vibrant marine life with your private snorkeling guide.",
      },

      {
        title: "Optional Giftun Islands",
        description:
          "If you wish, add a visit to one of the beautiful Giftun Islands, such as Orange Bay, Paradise, El Aden, Magaweesh or Hula Hula. Island entry is optional and available at an additional cost depending on the selected island.",
      },

      {
        title: "Fresh Private Lunch Onboard",
        description:
          "Enjoy a freshly prepared private lunch served onboard your boat. Choose between a seafood or BBQ-style meal prepared especially for your group, accompanied by drinks throughout the day.",
      },

      {
        title: "Relax, Swim & Enjoy Complete Privacy",
        description:
          "Spend time relaxing on board, enjoying free swimming or trying your hand at fishing. With the entire boat reserved for your group, you can control the pace of your day and enjoy complete privacy at sea.",
      },

      {
        title: "Return to the Marina",
        description:
          "After approximately eight hours at sea, return to Hurghada Marina. Your private vehicle will then take you comfortably back to your hotel.",
      },
    ],

    included: [
      "Private round-trip hotel transportation",
      "Private air-conditioned transfer",
      "Private boat charter for 8 hours",
      "Professional captain and crew",
      "Private snorkeling guide",
      "Complete snorkeling equipment",
      "Masks",
      "Fins",
      "Life jackets",
      "Multiple snorkeling stops",
      "Fresh lunch prepared onboard",
      "Seafood or BBQ lunch",
      "Water and soft drinks throughout the day",
      "Fresh juices",
      "Private experience",
    ],

    excluded: [
      "Giftun Island entry fees",
      "Orange Bay entry fee",
      "Paradise Island entry fee",
      "El Aden Island entry fee",
      "Magaweesh Island entry fee",
      "Hula Hula Island entry fee",
      "Optional water sports activities",
      "Parasailing and water games",
      "Professional photography and video services",
      "Tips for the boat crew",
      "Personal expenses",
    ],

    notes: [
      "This is a fully private 8-hour boat charter.",
      "The experience is ideal for families, couples and groups looking for complete privacy.",
      "Departure time is flexible and is usually arranged around 08:30 or 09:00 AM.",
      "Return is approximately 04:30 or 05:00 PM depending on the selected departure time.",
      "The itinerary can be customized according to your group's preferences and sea conditions.",
      "Guests can choose how long they would like to spend snorkeling, swimming or relaxing at sea.",
      "Giftun Island visits are optional and available at an additional cost depending on the selected island.",
      "Bring swimwear, personal towels, sunglasses and sunscreen.",
      "The experience is subject to weather and sea conditions.",
    ],
  },
};

type LuxuryTourSlug = keyof typeof luxuryTours;

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function cleanText(text: string) {
  return text.replace(/\.+$/, "");
}

function CrownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="m3 7 4.5 4L12 4l4.5 7L21 7l-2 12H5L3 7Z" />
      <path d="M5 16h14" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export default async function LuxuryTourPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const tour = luxuryTours[slug as LuxuryTourSlug];

  if (!tour) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-950 text-orange-400 shadow-xl shadow-blue-950/20">
            <CrownIcon />
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
            Private Collection
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-blue-950">
            <HomeText en="Tour Not Found" de="Tour nicht gefunden" />
          </h1>

          <p className="mx-auto mt-4 max-w-md text-gray-600">
            <HomeText en="Sorry, this luxury experience is not available" de="Dieses luxuriöse Erlebnis ist leider nicht verfügbar." />
          </p>

          <Link
            href="/luxury-tours"
            className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-blue-950 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-950/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-900"
          >
            <HomeText en="Back to Luxury Tours" de="Zurück zu den Luxustouren" />
            <ArrowRightIcon />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="relative overflow-hidden bg-blue-950 px-6 py-20 text-white md:px-8 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-950/95 to-blue-900" />

        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-700/20 blur-3xl" />

        <div className="absolute -bottom-48 -right-32 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-3xl" />

        <div className="absolute bottom-10 left-[35%] h-20 w-20 rounded-full border border-orange-400/10" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2.5 shadow-lg shadow-blue-950/10 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_12px_rgba(251,146,60,0.8)]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-300">
                <HomeText en="Private Collection" de="Private Auswahl" />
              </p>
            </div>

            <h1 className="mt-7 text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              <HomeText en={cleanText(tour.name)} de={luxuryText(cleanText(tour.name))} />
            </h1>

            <p className="mt-5 text-lg font-medium text-orange-300 md:text-xl">
              <HomeText en={cleanText(tour.subtitle)} de={luxuryText(cleanText(tour.subtitle))} />
            </p>

            <p className="mt-6 max-w-3xl text-base leading-8 text-blue-100 md:text-lg">
              <HomeText en={cleanText(tour.description)} de={luxuryText(cleanText(tour.description))} />
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-4 py-2.5 text-xs font-semibold shadow-lg shadow-blue-950/10 backdrop-blur-xl">
                <span className="text-orange-400">
                  <CrownIcon />
                </span>
                <HomeText en="Private Experience" de="Privates Erlebnis" />
              </div>

              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-4 py-2.5 text-xs font-semibold shadow-lg shadow-blue-950/10 backdrop-blur-xl">
                <span className="text-orange-400">
                  <ClockIcon />
                </span>
                <HomeText en=<HomeText en={cleanText(tour.duration)} de={cleanText(tour.duration) === "8 Hours" ? "8 Stunden" : cleanText(tour.duration) === "4 Hours" ? "4 Stunden" : cleanText(tour.duration) === "Full Day" ? "Ganztägig" : cleanText(tour.duration) === "2–3 Hours" ? "2–3 Stunden" : cleanText(tour.duration)} /> de={cleanText(tour.duration) === "8 Hours" ? "8 Stunden" : cleanText(tour.duration) === "4 Hours" ? "4 Stunden" : cleanText(tour.duration) === "Full Day" ? "Ganztägig" : cleanText(tour.duration) === "2–3 Hours" ? "2–3 Stunden" : cleanText(tour.duration)} />
              </div>

              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-4 py-2.5 text-xs font-semibold shadow-lg shadow-blue-950/10 backdrop-blur-xl">
                <span className="text-orange-400">
                  <CheckIcon />
                </span>
                <HomeText en="Premium Service" de="Premium-Service" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* LEFT */}
          <div className="space-y-8">
            {/* EXPERIENCE OVERVIEW */}
            <section className="rounded-[28px] border border-slate-200/80 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg md:p-9">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-950 text-orange-400 shadow-lg shadow-blue-950/10">
                  <CrownIcon />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-500">
                    <HomeText en="The Experience" de="Das Erlebnis" />
                  </p>

                  <h2 className="mt-1 text-3xl font-semibold tracking-tight text-blue-950">
                    <HomeText en="A Private Journey, Designed Around You" de="Eine private Reise, ganz nach Ihren Wünschen" />
                  </h2>
                </div>
              </div>

              <p className="mt-6 text-base leading-8 text-gray-600">
                <HomeText
                  en="Enjoy a premium private experience created for guests who value comfort, privacy and personal attention. From the moment you leave your hotel until your return, your journey is designed to feel effortless, exclusive and flexible."
                  de="Genießen Sie ein exklusives Privaterlebnis für Gäste, die Komfort, Privatsphäre und persönliche Betreuung schätzen. Vom Verlassen Ihres Hotels bis zu Ihrer Rückkehr ist Ihre Reise entspannt, exklusiv und flexibel gestaltet."
                />
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {tour.highlights.map((item) => (
                  <div
                    key={item}
                    className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3.5 transition duration-300 hover:border-orange-100 hover:bg-orange-50/50 hover:shadow-sm"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500 transition duration-300 group-hover:bg-orange-500 group-hover:text-white">
                      <CheckIcon />
                    </span>

                    <span className="text-sm font-semibold text-blue-950">
                      <HomeText en={cleanText(item)} de={luxuryText(cleanText(item))} />
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* ITINERARY */}
            <section className="rounded-[28px] border border-slate-200/80 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg md:p-9">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-500">
                  <HomeText en="Your Journey" de="Ihre Reise" />
                </p>

                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-blue-950">
                  <HomeText en="Private Itinerary" de="Privater Reiseplan" />
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500">
                  <HomeText en="A carefully planned experience with the flexibility and privacy of a dedicated private tour" de="Ein sorgfältig geplanter Ausflug mit der Flexibilität und Privatsphäre einer exklusiven privaten Tour" />
                </p>
              </div>

              <div className="mt-8">
                {tour.itinerary.map((item, index) => (
                  <div
                    key={item.title}
                    className="group relative flex gap-5 pb-8 last:pb-0"
                  >
                    {index !== tour.itinerary.length - 1 && (
                      <span className="absolute left-[19px] top-10 h-[calc(100%-18px)] w-px bg-slate-200 transition duration-300 group-hover:bg-orange-200" />
                    )}

                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-950 text-sm font-bold text-orange-400 shadow-md shadow-blue-950/10 transition duration-300 group-hover:bg-orange-500 group-hover:text-white">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="pt-0.5">
                      <h3 className="text-lg font-bold text-blue-950 transition duration-300 group-hover:text-orange-500">
                        <HomeText en={cleanText(item.title)} de={luxuryText(cleanText(item.title))} />
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-gray-600">
                        <HomeText en={cleanText(item.description)} de={luxuryText(cleanText(item.description))} />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* INCLUDED / EXCLUDED */}
            <section className="grid gap-6 md:grid-cols-2">
              <div className="rounded-[28px] border border-slate-200/80 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-500">
                  <HomeText en="Included" de="Inklusive" />
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-blue-950">
                  <HomeText en="Everything Prepared For You" de="Alles für Sie vorbereitet" />
                </h2>

                <div className="mt-6 space-y-3">
                  {tour.included.map((item) => (
                    <div
                      key={item}
                      className="group flex items-start gap-3 rounded-xl px-2 py-1.5 transition duration-300 hover:bg-slate-50"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                        <CheckIcon />
                      </span>

                      <span className="text-sm leading-6 text-gray-600">
                        <HomeText en={cleanText(item)} de={luxuryText(cleanText(item))} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200/80 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-500">
                  <HomeText en="Not Included" de="Nicht inklusive" />
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-blue-950">
                  <HomeText en="Optional Extras" de="Optionale Extras" />
                </h2>

                <div className="mt-6 space-y-3">
                  {tour.excluded.map((item) => (
                    <div
                      key={item}
                      className="group flex items-start gap-3 rounded-xl px-2 py-1.5 transition duration-300 hover:bg-slate-50"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                        <span className="text-sm font-bold">–</span>
                      </span>

                      <span className="text-sm leading-6 text-gray-600">
                        <HomeText en={cleanText(item)} de={luxuryText(cleanText(item))} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* NOTES */}
            <section className="rounded-[28px] border border-orange-100 bg-orange-50/60 p-7 shadow-sm md:p-9">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-500">
                <HomeText en="Good To Know" de="Gut zu wissen" />
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-blue-950">
                <HomeText en="Before Your Experience" de="Vor Ihrem Erlebnis" />
              </h2>

              <div className="mt-5 space-y-3">
                {tour.notes.map((note) => (
                  <div
                    key={note}
                    className="flex items-start gap-3 rounded-xl px-2 py-1.5 transition duration-300 hover:bg-white/50"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />

                    <p className="text-sm leading-7 text-gray-700">
                      <HomeText en={cleanText(note)} de={luxuryText(cleanText(note))} />
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* SIDEBAR */}
          <aside>
            <div className="sticky top-28 overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-xl shadow-blue-950/10">
              <div className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-950 to-blue-900 p-7 text-white">
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-orange-500/10 blur-2xl" />

                <div className="relative">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400">
                    <HomeText en="Private Collection" de="Private Auswahl" />
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold">
                    <HomeText en="Reserve Your Experience" de="Ihr Erlebnis reservieren" />
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-blue-200">
                    <HomeText en="Premium service, private transportation and a journey designed around you" de="Premium-Service, privater Transfer und eine Reise, die ganz auf Sie abgestimmt ist" />
                  </p>
                </div>
              </div>

              <div className="p-7">
                {/* PRICE */}
                <div className="rounded-2xl border border-orange-100 bg-orange-50/60 p-5 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                    <HomeText en="Starting From" de="Ab" />
                  </p>

                  <div className="mt-1 flex items-end gap-2">
                    <span className="text-4xl font-bold tracking-tight text-orange-500">
                      €{tour.price}
                    </span>

                    <span className="pb-1 text-xs text-gray-400">
                      <HomeText en="/ private experience" de="/ privates Erlebnis" />
                    </span>
                  </div>
                </div>

                <div className="my-6 h-px bg-gray-100" />

                {/* DETAILS */}
                <div className="space-y-3">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 transition duration-300 hover:border-slate-200 hover:bg-white hover:shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          <HomeText en="Duration" de="Dauer" />
                        </p>

                        <p className="mt-1 text-sm font-bold text-blue-950">
                          {cleanText(tour.duration)}
                        </p>
                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-950 shadow-sm">
                        <ClockIcon />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 transition duration-300 hover:border-slate-200 hover:bg-white hover:shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      <HomeText en="Departure" de="Abfahrt" />
                    </p>

                    <p className="mt-1 text-sm font-bold text-blue-950">
                      <HomeText en={cleanText(tour.departure)} de={luxuryText(cleanText(tour.departure))} />
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 transition duration-300 hover:border-slate-200 hover:bg-white hover:shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      <HomeText en="Return" de="Rückkehr" />
                    </p>

                    <p className="mt-1 text-sm font-bold text-blue-950">
                      <HomeText en={cleanText(tour.returnTime)} de={luxuryText(cleanText(tour.returnTime))} />
                    </p>
                  </div>

                  <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-orange-500">
                      <HomeText en="Experience Type" de="Erlebnisart" />
                    </p>

                    <p className="mt-1 text-sm font-bold text-orange-700">
                      <HomeText en="Fully Private" de="Vollständig privat" />
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={`/luxury-tours/${slug}/book`}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 py-4 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl"
                >
                  <HomeText en="Reserve Your Experience" de="Ihr Erlebnis reservieren" />
                  <ArrowRightIcon />
                </Link>

                <Link
                  href="/luxury-tours"
                  className="mt-3 flex w-full items-center justify-center rounded-2xl border border-blue-950 py-3.5 text-sm font-bold text-blue-950 transition duration-300 hover:bg-blue-950 hover:text-white"
                >
                  <HomeText en="Back to Luxury Tours" de="Zurück zu den Luxustouren" />
                </Link>

                <div className="mt-6 border-t border-gray-100 pt-5 text-center">
                  <div className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-500">
                    <span className="text-orange-500">
                      <ShieldIcon />
                    </span>
                    <HomeText en="Premium private service" de="Premium-Privatservice" />
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-8 md:pb-24">
        <div className="relative overflow-hidden rounded-[30px] bg-blue-950 px-6 py-12 text-center text-white shadow-xl shadow-blue-950/10 md:px-12 md:py-16">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-950 to-blue-900" />

          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-blue-700/20 blur-3xl" />

          <div className="absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-3xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-orange-400/30 bg-orange-400/10 text-orange-400">
              <CrownIcon />
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.3em] text-orange-400">
              <HomeText en="Your Private Experience" de="Ihr privates Erlebnis" />
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              <HomeText en="Travel Privately" de="Privat reisen" />
              <span className="block text-orange-400">
                <HomeText en="Experience More" de="Mehr erleben" />
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-blue-100 md:text-base">
              <HomeText en="Looking for something more personalized? Our private experiences can be arranged around your preferences and schedule" de="Sie wünschen sich etwas Persönlicheres? Unsere privaten Erlebnisse lassen sich an Ihre Wünsche und Ihren Zeitplan anpassen" />
            </p>

            <div className="mt-7">
              <Link
                href={`/luxury-tours/${slug}/book`}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-orange-600"
              >
                <HomeText en="Reserve This Experience" de="Dieses Erlebnis reservieren" />
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M12 3 20 6v5c0 5-3.3 8.2-8 10-4.7-1.8-8-5-8-10V6l8-3Z" />
      <path d="m8.5 12 2.3 2.3 4.7-4.7" />
    </svg>
  );
}