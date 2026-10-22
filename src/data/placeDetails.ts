/**
 * Text shown under the "Overview" heading on each tour package page: a short write-up of the 2-3 main
 * places in the package (about 5-10 lines).
 *
 * The key is the package's slug (the last part of its web address, e.g. /packages/udupi-tour -> "udupi-tour").
 * Each package has one or two paragraphs. A package with no entry here keeps showing its normal one-line
 * summary, so nothing breaks.
 *
 * Written from public sources (Karnataka Tourism, district websites, temple and heritage guides).
 * Please read it once against your own itinerary: opening times, entry fees, ferry and lift availability and
 * dress rules change, so none are quoted here.
 */
export const placeDetails: Record<string, string[]> = {
  "udupi-tour": [
    "Udupi is best known for the Sri Krishna Matha, founded in the 13th century by the philosopher-saint Madhvacharya. Devotees traditionally see the deity through an ornate window called the Navagraha Kitiki, and the temple's simple vegetarian meals helped make Udupi cuisine famous across India.",
    "A short drive away, Malpe Beach has golden sand beside a working fishing harbour and is the starting point for boat rides to St. Mary's Island, a group of small islands known for their unusual basalt rock columns (trips depend on the weather and sea conditions). The trip also includes Kaup Beach, a quieter shore with a historic lighthouse that you can climb for wide views of the coast, especially at sunset.",
  ],

  "kollur-tour": [
    "Kollur is built around the Mookambika Temple, dedicated to Goddess Mookambika, a form of Shakti. It sits at the foot of the Kodachadri hills on the bank of the Souparnika River, and its sacred lingam is divided by a golden line said to represent Shiva and Shakti together. Devotees come from all over South India, and the temple is especially associated with learning, so many families pray here for their children.",
    "Behind the temple rises Kodachadri, where a shrine at the summit is believed to be the goddess's original home, and which is a favourite with trekkers. Nearby, the Arishina Gundi Falls lie hidden in the forest of the Mookambika Wildlife Sanctuary and are reached on foot.",
  ],

  "murudeshwara-tour": [
    "Murudeshwara is famous for its Shiva temple on Kanduka Hill, with the Arabian Sea on three sides. Legend links the temple to the Atma Linga carried by the demon king Ravana, and the lingam here is believed to be a piece of it. Beside the temple stands a 123-foot statue of Lord Shiva, visible from far along the coast, with a cave exhibition beneath it that tells the local story through sculptures and a light-and-sound show.",
    "The 20-storey Raja Gopura, completed in 2008, has a lift that takes visitors close to the top for views of the statue, the temple and the sea. From the beach, boats run to Netrani Island, a small heart-shaped island known for snorkelling and diving, depending on the season and weather. Modest dress is expected inside the temple.",
  ],

  "gokarna-tour": [
    "Gokarna is both a pilgrimage town and a beach destination. Its Mahabaleshwar Temple is an ancient Shiva temple that houses the Atmalinga; according to legend, Ganesha tricked Ravana into setting the lingam down here. Pilgrims traditionally visit the nearby Maha Ganapati Temple first, and the sacred Kotitheertha tank lies in the middle of the town.",
    "A short drive away are the beaches. Kudle Beach is long and broad with soft sand and is best known for its sunsets, while Om Beach is named for its natural shape, which resembles the Om symbol. Half Moon and Paradise beaches are quieter and more secluded, reached by a coastal trek or by boat.",
  ],

  "goa-tour": [
    "Goa mixes heritage and beaches. In Old Goa, the Basilica of Bom Jesus is a UNESCO World Heritage church built in the 16th century, which holds the remains of St. Francis Xavier. Close by, the Se Cathedral is one of the largest churches in Asia and is known for its grand interior and its large Golden Bell.",
    "On the coast, Fort Aguada, a 17th-century Portuguese fort with a lighthouse, gives wide views over the Arabian Sea. The day usually ends at Calangute or Baga, two of North Goa's best-known beaches, which are lively and good for a sunset walk.",
  ],

  "sringeri-tour": [
    "Sringeri is a temple town on the Tunga River. Its Sharadamba Temple, dedicated to Goddess Sharada, the goddess of learning, belongs to the Sringeri Sharada Peetham, the first of the four mathas established by Adi Shankara in the 8th century. Students and families often come to pray for knowledge.",
    "In the same complex, the carved stone Vidyashankara Temple, built in 1338, is admired for its fine sculpture and its twelve zodiac pillars, designed so that the sun's rays fall on each of them in turn through the year. Visitors can also walk along the river ghats and watch the sacred fish, which people feed. The Peetham offers free meals to devotees every day.",
  ],

  "horanadu-tour": [
    "Horanadu is home to the Annapoorneshwari Temple, dedicated to the goddess of food, on the Bhadra River in the Western Ghats. The main idol is cast in gold, and local legend says the goddess filled Lord Shiva's bowl with grain and ended a curse, which is why people come here to seek blessings for food and prosperity.",
    "The temple is ringed by forest and hills, with coffee and spice plantations along the winding road, so the journey is part of the experience. About 10 kilometres away, the old temple town of Kalasa has the Kalaseshwara Temple on the same river, a quieter stop that is counted among the Pancha Kshetras of the region.",
  ],

  "darmasthala-tour": [
    "Dharmasthala is one of Karnataka's most visited pilgrimage places, with its Manjunatha Temple on the banks of the Netravati River. The temple is unusual: a Shiva temple whose priests follow the Madhva tradition, looked after by a hereditary Jain family, and open to people of every faith. The town is also known for serving free meals to thousands of visitors every day.",
    "On a hill about a kilometre from the temple stands a 39-foot monolithic statue of Lord Bahubali, carved from a single rock, symbolising non-violence and renunciation, with a good view over the town. The Manjusha Museum, with antiques, manuscripts and old temple chariots, and the nearby Car Museum with vintage cars are also worth the time.",
  ],

  "kukke-subramanya-tour": [
    "Kukke Subramanya is a temple set in a forested valley on the Kumaradhara River, dedicated to Lord Subramanya, who is worshipped here as the lord of serpents. It is one of the best-known centres of serpent worship in India, and rituals such as Sarpa Samskara and Ashlesha Bali are performed here. Pilgrims traditionally cross the river and take a dip before entering the temple for darshan.",
    "Two mountains overlook the temple: Kumara Parvatha, a well-known trekking peak, and Shesha Parvatha, said to resemble a hooded cobra guarding the shrine.",
  ],

  "mantralayam-tour": [
    "Mantralayam, on the bank of the Tungabhadra River, is the home of the brindavana of the 17th-century saint Sri Raghavendra Swamy, who is believed to have entered samadhi alive. Thousands of devotees visit every year, and the Mutt serves meals to all visitors. Many devotees first pray at the Manchalamma Temple, whose goddess is said to have given the land for the brindavana, and then visit the main shrine.",
    "A short drive away, the Panchamukhi Anjaneya Temple marks the cave where the saint is said to have meditated for twelve years and seen Hanuman in his five-faced form. Mantralayam is in Andhra Pradesh, just across the Karnataka border, so it is usually a long day trip or an overnight stay.",
  ],

  "tirupathi-tour": [
    "Tirupathi, nestled at the foot of the Seshachalam Hills in Andhra Pradesh, is one of the most venerated pilgrimage destinations in the world. Perched atop the sacred Tirumala range stands the ancient Sri Venkateswara Temple, dedicated to Lord Balaji, an incarnation of Vishnu. Millions of pilgrims journey here year-round to offer prayers, receive the sacred laddu prasadam, and participate in centuries-old worship rituals amidst chants of 'Govinda'.",
    "In the foothills and surrounding temple grounds, devotees visit the Sri Padmavathi Ammavari Temple at Tiruchanur, dedicated to Lord Venkateswara's divine consort, traditionally visited alongside Tirumala. The tour also features the natural rock formation of Silathoranam—a rare geological arch of great antiquity—and Kapila Theertham, a holy waterfall and Shiva temple situated right at the mountain base.",
  ],

  "kanyakumari-tour": [
    "Kanyakumari marks the southernmost tip of peninsular India, famously where the Arabian Sea, the Bay of Bengal, and the Indian Ocean converge at Triveni Sangam. The town takes its name from the ancient coastal temple of Goddess Bhagavathy Amman (Kanya Kumari), a virgin deity worshipped here for millennia. Visitors gather along the coastline to witness spectacular sunrises and sunsets across the open waters.",
    "Just off the mainland shore on rocky islets stand the Vivekananda Rock Memorial, built where Swami Vivekananda meditated in 1892, and the towering 133-foot stone statue of Tamil poet-philosopher Thiruvalluvar (reached by ferry, subject to sea conditions). A short drive inland leads to the 16th-century Padmanabhapuram Palace, an extraordinary wooden palace showcasing traditional Kerala architecture, carved rosewood ceilings, and royal artefacts.",
  ],

  "rameshwaram-tour": [
    "Rameshwaram is a deeply sacred pilgrimage island associated with the Ramayana, where Lord Rama is believed to have worshipped Lord Shiva. The magnificent Sri Ramanathaswamy Temple is renowned across the globe for its immense outer corridors—the longest among Hindu temples in India—supported by more than a thousand sculpted granite pillars, as well as the ritual tradition of bathing in the temple's 22 holy theerthams (wells).",
    "The journey to the island passes over the iconic Pamban Bridge, India's historic sea bridge spanning the turquoise waters of the Palk Strait. At the island's eastern edge lies Dhanushkodi, a ghost town destroyed by a 1964 cyclone where sandbanks meet the sea at Ram Setu (Adam's Bridge), alongside the shores of Agni Theertham where pilgrims take sacred dips in the tranquil ocean.",
  ],

  "coorg-tour": [
    "Coorg (Kodagu) is Karnataka's premier hill station district, celebrated for its misty green mountains, fragrant coffee plantations, and pepper vines. Often referred to as the 'Scotland of India', it offers crisp mountain air, lush evergreen landscapes, and warm hospitality rooted in unique Kodava traditions. Taking a leisurely stroll through shaded estate paths and breathing in fresh coffee blossoms is an essential part of the journey.",
    "Key stops include Raja's Seat in Madikeri, a manicured hilltop garden once favoured by the Kings of Kodagu to watch sweeping valley sunsets. Close by, Abbey Falls plunges down amidst private spice estates into a rocky pool. Near the Kaveri River, the Dubare Elephant Camp gives visitors a chance to learn about elephant conservation and observe them in a riverbank forest setting.",
  ],

  "chikamagaluru-tour": [
    "Chikamagaluru is celebrated as the cradle of coffee in India, where the 17th-century Sufi saint Baba Budan first planted coffee seeds in the surrounding hills. Nestled in the Baba Budan Giri range of the Western Ghats, the town is flanked by rolling plantations, freshwater streams, and verdant ridges. A stop at the local Coffee Museum offers a pleasant look into the history and heritage of coffee cultivation in the region.",
    "For panoramic viewpoints and mountain air, Mullayanagiri is the crowning attraction—Karnataka's highest peak rising over 1,900 metres, offering sweeping vistas of cloud-covered valleys. Nearby, the scenic hill station of Kemmangundi, once a summer retreat for Mysore royalty, charms visitors with ornamental gardens, walking trails, and fresh mountain breezes.",
  ],

  "mysore-tour": [
    "Mysore (Mysuru), known as the cultural capital of Karnataka, is famous for its royal heritage, rich silk sarees, and fragrant sandalwood. At the centre of the city stands the grand Mysore Palace (Amba Vilas), an architectural masterpiece with stained-glass ceilings, ornate courtyards, and carved doors, which lights up spectacularly on weekends and festival evenings.",
    "Overlooking the city from Chamundi Hill is the revered Chamundeshwari Temple and the massive monolithic black granite Nandi bull. Visitors can also explore the historic Sri Chamarajendra Zoological Gardens (Mysore Zoo), one of the oldest and most lush zoos in India, and spend an evening at the Brindavan Gardens by the Krishnarajasagara Dam, admiring terraced fountains and illuminated floral beds.",
  ],

  "ooty-tour": [
    "Ooty (Udhagamandalam), nestled high in the Nilgiri Hills of Tamil Nadu, is affectionately known as the 'Queen of Hill Stations'. Blessed with cool mountain weather, terraced tea gardens, and eucalyptus woods, it has been a favoured highland getaway for generations. The heritage Nilgiri Mountain Railway toy train, running across picturesque bridges and forest tunnels, offers an unforgettable journey into the hills.",
    "In the heart of the town, the Government Botanical Garden spreads across terraced hill slopes, showcasing rare trees, landscaped lawns, and seasonal flower shows. Travellers can rent paddleboats on the scenic Ooty Lake, browse homemade chocolates and Nilgiri tea, or drive up to Doddabetta Peak—the highest summit in the Nilgiris—for sweeping views across the blue hills.",
  ],

  "wayanad-tour": [
    "Wayanad, perched on a scenic plateau in the Western Ghats of Kerala, is renowned for its mist-clad mountains, spice estates, and untouched wilderness. One of its most famous historical sites is the Edakkal Caves on Ambukuthi Mala, where ancient rock engravings and petroglyphs dating back to Neolithic times can be seen inside a dramatic split rock shelter reached via a scenic hike.",
    "The region also features Banasura Sagar Dam, the largest earthen dam in India, where calm reservoir waters wrap around miniature green islands against rugged mountain backdrops. Visitors can also enjoy views towards Chembra Peak, trek through forested paths to cascading waterfalls like Soochipara, and wander through lush tea and cardamom valleys.",
  ],

  "kodaikanal-tour": [
    "Kodaikanal, known as the 'Princess of Hill Stations', sits over 2,100 metres high in the Palani Hills of Tamil Nadu. Known for its cool mountain mist, eucalyptus groves, and pine forests, the town centres around the star-shaped, man-made Kodaikanal Lake. Walking or cycling around the lakeside promenade and leisurely boating on the misty waters are timeless holiday rituals here.",
    "Natural rock formations and high vantage points define the landscape. Pillar Rocks features three dramatic vertical granite pillars standing 400 feet high, often veiled in drifting clouds. Close by, Coaker's Walk offers a paved pedestrian pathway along steep mountain cliffs with sweeping views of the plains, complemented by colourful blooms at Bryant Park.",
  ],

  "munnar-tour": [
    "Munnar is Kerala's most renowned hill station, situated where three mountain streams meet in the Western Ghats. Famous for its carpet of manicured tea plantations undulating across rolling slopes, Munnar offers crisp highland air, morning fog, and picturesque viewpoints around every bend. Visitors can visit local tea museums and tea factories to learn how fresh leaves are harvested and processed.",
    "Nature and wildlife form a major highlight. Eravikulam National Park provides a sanctuary for the endangered Nilgiri Tahr mountain goat against the backdrop of Anamudi, the highest peak in South India. Further along the scenic lake routes, Mattupetty Dam and Echo Point provide lovely boating spots and scenic lakefront views framed by green tea plantations.",
  ],

  "thekkady-tour": [
    "Thekkady, situated in the Idukki district of Kerala, is the home of Periyar National Park and Tiger Reserve. Set around a serene lake created by the Mullaperiyar Dam, the reserve is known for herds of wild Asian elephants, gaur, sambar deer, and rich birdlife. A calm boat cruise across Periyar Lake is the classic highlight, offering sightings of wildlife along the forest-fringed shores.",
    "Surrounding the wildlife sanctuary are sprawling plantations of black pepper, green cardamom, cinnamon, and nutmeg. Guided plantation walks let visitors touch and smell genuine spices growing in natural groves. The town also offers cultural experiences like traditional Kathakali dance and Kalaripayattu martial arts demonstrations.",
  ],

  "valparai-tour": [
    "Valparai is an uncrowded, tranquil hill station situated over 3,500 feet high in the Anamalai Hills of the Western Ghats. Surrounded by lush tea estates, rainforest fragments, and the protected wildlife habitats of the Anamalai Tiger Reserve, the journey to Valparai is famous for its scenic drive navigating 40 hairpin bends with magnificent vistas.",
    "Along the ascent, travellers pass Aliyar Dam and Monkey Falls at the foothill base, where cool mountain waters cascade over natural rocks. In the upper plateau, the massive Sholayar Dam provides expansive views over calm reservoir backwaters framed by misty peaks, where lion-tailed macaques and wild hornbills can often be spotted among the trees.",
  ],

  "alleppey-tour": [
    "Alleppey (Alappuzha), known as the 'Venice of the East', is the heart of Kerala's enchanting backwater network. Interconnected by palm-shaded canals, lagoons, and the broad waters of Vembanad Lake, the destination is world-famous for cruises aboard traditional kettuvallam houseboats. Drifting through quiet channels offers an intimate view of village life, local fishing, coir weaving, and freshly prepared Kerala meals.",
    "On the coast, Alappuzha Beach features an old 150-year-old sea pier extending into the Arabian Sea and a nearby heritage lighthouse offering coastal panoramas. Nearby Marari Beach provides a quiet stretch of golden sand and coconut groves, making it an ideal coastal retreat to conclude a backwater holiday.",
  ],
};
