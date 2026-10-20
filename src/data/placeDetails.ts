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
};
