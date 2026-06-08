document.addEventListener("DOMContentLoaded", () => {
    const STORAGE_KEY = "polla_mundial_2026";

    let savedBracketWinners = [];

  // ==========================================================
  // TABLA FIFA DE ASIGNACIÓN DE TERCEROS (495 combinaciones)
  // ==========================================================
  // Orden de primeros de grupo que enfrentan a un tercero:
  // Índice 0→1A, 1→1B, 2→1D, 3→1E, 4→1G, 5→1I, 6→1K, 7→1L
  const FIRST_PLACE_ORDER = ["A","B","D","E","G","I","K","L"];

  const THIRD_PLACE_TABLE = {
    "ABCDEFGH": ["C","E","B","F","A","G","D","H"],
    "ABCDEFGI": ["C","E","B","F","A","G","D","I"],
    "ABCDEFGJ": ["C","E","B","F","A","G","D","J"],
    "ABCDEFGK": ["C","E","B","F","A","G","D","K"],
    "ABCDEFGL": ["C","F","B","D","A","G","L","E"],
    "ABCDEFHI": ["C","E","B","A","H","F","D","I"],
    "ABCDEFHJ": ["C","E","B","A","H","F","D","J"],
    "ABCDEFHK": ["C","E","B","A","H","F","D","K"],
    "ABCDEFHL": ["C","E","B","D","A","F","L","H"],
    "ABCDEFIJ": ["C","E","B","A","I","F","D","J"],
    "ABCDEFIK": ["C","E","B","A","I","F","D","K"],
    "ABCDEFIL": ["C","E","B","D","A","F","L","I"],
    "ABCDEFJK": ["C","E","B","A","J","F","D","K"],
    "ABCDEFJL": ["C","E","B","D","A","F","L","J"],
    "ABCDEFKL": ["C","E","B","D","A","F","L","K"],
    "ABCDEGHI": ["C","E","B","A","H","G","D","I"],
    "ABCDEGHJ": ["C","E","B","A","H","G","D","J"],
    "ABCDEGHK": ["C","E","B","A","H","G","D","K"],
    "ABCDEGHL": ["C","E","B","D","A","G","L","H"],
    "ABCDEGIJ": ["C","E","B","A","I","G","D","J"],
    "ABCDEGIK": ["C","E","B","A","I","G","D","K"],
    "ABCDEGIL": ["C","E","B","D","A","G","L","I"],
    "ABCDEGJK": ["C","E","B","A","J","G","D","K"],
    "ABCDEGJL": ["C","E","B","D","A","G","L","J"],
    "ABCDEGKL": ["C","E","B","D","A","G","L","K"],
    "ABCDEHIJ": ["C","E","B","A","H","D","I","J"],
    "ABCDEHIK": ["C","E","B","A","H","D","I","K"],
    "ABCDEHIL": ["C","E","B","A","H","D","L","I"],
    "ABCDEHJK": ["C","E","B","A","H","D","J","K"],
    "ABCDEHJL": ["C","E","B","A","H","D","L","J"],
    "ABCDEHKL": ["C","E","B","A","H","D","L","K"],
    "ABCDEIJK": ["C","E","B","A","I","D","J","K"],
    "ABCDEIJL": ["C","E","B","A","I","D","L","J"],
    "ABCDEIKL": ["C","E","B","A","I","D","L","K"],
    "ABCDEJKL": ["C","E","B","A","J","D","L","K"],
    "ABCDFGHI": ["C","F","B","A","H","G","D","I"],
    "ABCDFGHJ": ["C","F","B","A","H","G","D","J"],
    "ABCDFGHK": ["C","F","B","A","H","G","D","K"],
    "ABCDFGHL": ["C","F","B","D","A","G","L","H"],
    "ABCDFGIJ": ["C","F","B","A","I","G","D","J"],
    "ABCDFGIK": ["C","F","B","A","I","G","D","K"],
    "ABCDFGIL": ["C","F","B","D","A","G","L","I"],
    "ABCDFGJK": ["C","F","B","A","J","G","D","K"],
    "ABCDFGJL": ["C","F","B","D","A","G","L","J"],
    "ABCDFGKL": ["C","F","B","D","A","G","L","K"],
    "ABCDFHIJ": ["C","F","B","A","H","D","I","J"],
    "ABCDFHIK": ["C","F","B","A","H","D","I","K"],
    "ABCDFHIL": ["C","F","B","A","H","D","L","I"],
    "ABCDFHJK": ["C","F","B","A","H","D","J","K"],
    "ABCDFHJL": ["C","F","B","A","H","D","L","J"],
    "ABCDFHKL": ["C","F","B","A","H","D","L","K"],
    "ABCDFIJK": ["C","F","B","A","I","D","J","K"],
    "ABCDFIJL": ["C","F","B","A","I","D","L","J"],
    "ABCDFIKL": ["C","F","B","A","I","D","L","K"],
    "ABCDFJKL": ["C","F","B","A","J","D","L","K"],
    "ABCDGHIJ": ["C","G","B","A","H","D","I","J"],
    "ABCDGHIK": ["C","G","B","A","H","D","I","K"],
    "ABCDGHIL": ["C","G","B","A","H","D","L","I"],
    "ABCDGHJK": ["C","G","B","A","H","D","J","K"],
    "ABCDGHJL": ["C","G","B","A","H","D","L","J"],
    "ABCDGHKL": ["C","G","B","A","H","D","L","K"],
    "ABCDGIJK": ["C","G","B","A","I","D","J","K"],
    "ABCDGIJL": ["C","G","B","A","I","D","L","J"],
    "ABCDGIKL": ["C","G","B","A","I","D","L","K"],
    "ABCDGJKL": ["C","G","B","A","J","D","L","K"],
    "ABCDHIJK": ["C","I","B","A","H","D","J","K"],
    "ABCDHIJL": ["C","I","B","A","H","D","L","J"],
    "ABCDHIKL": ["C","I","B","A","H","D","L","K"],
    "ABCDHJKL": ["C","J","B","A","H","D","L","K"],
    "ABCDIJKL": ["C","I","B","A","J","D","L","K"],
    "ABCEFGHI": ["C","E","B","F","A","G","I","H"],
    "ABCEFGHJ": ["C","E","B","F","A","G","J","H"],
    "ABCEFGHK": ["C","F","B","A","H","G","E","K"],
    "ABCEFGHL": ["C","E","B","F","A","G","L","H"],
    "ABCEFGIJ": ["C","E","B","F","A","G","I","J"],
    "ABCEFGIK": ["C","E","B","F","A","G","I","K"],
    "ABCEFGIL": ["C","E","B","F","A","G","L","I"],
    "ABCEFGJK": ["C","E","B","F","A","G","J","K"],
    "ABCEFGJL": ["C","E","B","F","A","G","L","J"],
    "ABCEFGKL": ["C","E","B","F","A","G","L","K"],
    "ABCEFHIJ": ["C","E","B","A","H","F","I","J"],
    "ABCEFHIK": ["C","E","B","A","H","F","I","K"],
    "ABCEFHIL": ["C","E","B","A","H","F","L","I"],
    "ABCEFHJK": ["C","E","B","A","H","F","J","K"],
    "ABCEFHJL": ["C","E","B","A","H","F","L","J"],
    "ABCEFHKL": ["C","E","B","A","H","F","L","K"],
    "ABCEFIJK": ["C","E","B","A","I","F","J","K"],
    "ABCEFIJL": ["C","E","B","A","I","F","L","J"],
    "ABCEFIKL": ["C","E","B","A","I","F","L","K"],
    "ABCEFJKL": ["C","E","B","A","J","F","L","K"],
    "ABCEGHIJ": ["C","E","B","A","H","G","I","J"],
    "ABCEGHIK": ["C","E","B","A","H","G","I","K"],
    "ABCEGHIL": ["C","E","B","A","H","G","L","I"],
    "ABCEGHJK": ["C","E","B","A","H","G","J","K"],
    "ABCEGHJL": ["C","E","B","A","H","G","L","J"],
    "ABCEGHKL": ["C","E","B","A","H","G","L","K"],
    "ABCEGIJK": ["C","E","B","A","I","G","J","K"],
    "ABCEGIJL": ["C","E","B","A","I","G","L","J"],
    "ABCEGIKL": ["C","E","B","A","I","G","L","K"],
    "ABCEGJKL": ["C","E","B","A","J","G","L","K"],
    "ABCEHIJK": ["C","E","B","A","I","H","J","K"],
    "ABCEHIJL": ["C","E","B","A","I","H","L","J"],
    "ABCEHIKL": ["C","E","B","A","I","H","L","K"],
    "ABCEHJKL": ["C","E","B","A","J","H","L","K"],
    "ABCEIJKL": ["E","I","B","A","J","C","L","K"],
    "ABCFGHIJ": ["C","F","B","A","H","G","I","J"],
    "ABCFGHIK": ["C","F","B","A","H","G","I","K"],
    "ABCFGHIL": ["C","F","B","A","H","G","L","I"],
    "ABCFGHJK": ["C","F","B","A","H","G","J","K"],
    "ABCFGHJL": ["C","F","B","A","H","G","L","J"],
    "ABCFGHKL": ["C","F","B","A","H","G","L","K"],
    "ABCFGIJK": ["C","F","B","A","I","G","J","K"],
    "ABCFGIJL": ["C","F","B","A","I","G","L","J"],
    "ABCFGIKL": ["C","F","B","A","I","G","L","K"],
    "ABCFGJKL": ["C","F","B","A","J","G","L","K"],
    "ABCFHIJK": ["C","F","B","A","I","H","J","K"],
    "ABCFHIJL": ["C","F","B","A","I","H","L","J"],
    "ABCFHIKL": ["C","F","B","A","I","H","L","K"],
    "ABCFHJKL": ["C","F","B","A","J","H","L","K"],
    "ABCFIJKL": ["C","I","B","A","J","F","L","K"],
    "ABCGHIJK": ["C","G","B","A","I","H","J","K"],
    "ABCGHIJL": ["C","G","B","A","I","H","L","J"],
    "ABCGHIKL": ["C","G","B","A","I","H","L","K"],
    "ABCGHJKL": ["C","G","B","A","J","H","L","K"],
    "ABCGIJKL": ["C","I","B","A","J","G","L","K"],
    "ABCHIJKL": ["C","I","B","A","J","H","L","K"],
    "ABDEFGHI": ["E","F","B","A","H","G","D","I"],
    "ABDEFGHJ": ["E","F","B","A","H","G","D","J"],
    "ABDEFGHK": ["E","F","B","A","H","G","D","K"],
    "ABDEFGHL": ["E","F","B","D","A","G","L","H"],
    "ABDEFGIJ": ["E","F","B","A","I","G","D","J"],
    "ABDEFGIK": ["E","F","B","A","I","G","D","K"],
    "ABDEFGIL": ["E","F","B","D","A","G","L","I"],
    "ABDEFGJK": ["E","F","B","A","J","G","D","K"],
    "ABDEFGJL": ["E","F","B","D","A","G","L","J"],
    "ABDEFGKL": ["E","F","B","D","A","G","L","K"],
    "ABDEFHIJ": ["E","F","B","A","H","D","I","J"],
    "ABDEFHIK": ["E","F","B","A","H","D","I","K"],
    "ABDEFHIL": ["E","F","B","A","H","D","L","I"],
    "ABDEFHJK": ["E","F","B","A","H","D","J","K"],
    "ABDEFHJL": ["E","F","B","A","H","D","L","J"],
    "ABDEFHKL": ["E","F","B","A","H","D","L","K"],
    "ABDEFIJK": ["E","F","B","A","I","D","J","K"],
    "ABDEFIJL": ["E","F","B","A","I","D","L","J"],
    "ABDEFIKL": ["E","F","B","A","I","D","L","K"],
    "ABDEFJKL": ["E","F","B","A","J","D","L","K"],
    "ABDEGHIJ": ["E","G","B","A","H","D","I","J"],
    "ABDEGHIK": ["E","G","B","A","H","D","I","K"],
    "ABDEGHIL": ["E","G","B","A","H","D","L","I"],
    "ABDEGHJK": ["E","G","B","A","H","D","J","K"],
    "ABDEGHJL": ["E","G","B","A","H","D","L","J"],
    "ABDEGHKL": ["E","G","B","A","H","D","L","K"],
    "ABDEGIJK": ["E","G","B","A","I","D","J","K"],
    "ABDEGIJL": ["E","G","B","A","I","D","L","J"],
    "ABDEGIKL": ["E","G","B","A","I","D","L","K"],
    "ABDEGJKL": ["E","G","B","A","J","D","L","K"],
    "ABDEHIJK": ["E","I","B","A","H","D","J","K"],
    "ABDEHIJL": ["E","I","B","A","H","D","L","J"],
    "ABDEHIKL": ["E","I","B","A","H","D","L","K"],
    "ABDEHJKL": ["E","J","B","A","H","D","L","K"],
    "ABDEIJKL": ["E","I","B","A","J","D","L","K"],
    "ABDFGHIJ": ["F","G","B","A","H","D","I","J"],
    "ABDFGHIK": ["F","G","B","A","H","D","I","K"],
    "ABDFGHIL": ["F","G","B","A","H","D","L","I"],
    "ABDFGHJK": ["F","G","B","A","H","D","J","K"],
    "ABDFGHJL": ["F","G","B","A","H","D","L","J"],
    "ABDFGHKL": ["F","G","B","A","H","D","L","K"],
    "ABDFGIJK": ["F","G","B","A","I","D","J","K"],
    "ABDFGIJL": ["F","G","B","A","I","D","L","J"],
    "ABDFGIKL": ["F","G","B","A","I","D","L","K"],
    "ABDFGJKL": ["F","G","B","A","J","D","L","K"],
    "ABDFHIJK": ["F","I","B","A","H","D","J","K"],
    "ABDFHIJL": ["F","I","B","A","H","D","L","J"],
    "ABDFHIKL": ["F","I","B","A","H","D","L","K"],
    "ABDFHJKL": ["F","J","B","A","H","D","L","K"],
    "ABDFIJKL": ["F","I","B","A","J","D","L","K"],
    "ABDGHIJK": ["H","G","B","A","I","D","J","K"],
    "ABDGHIJL": ["H","G","B","A","I","D","L","J"],
    "ABDGHIKL": ["H","G","B","A","I","D","L","K"],
    "ABDGHJKL": ["H","G","B","A","J","D","L","K"],
    "ABDGIJKL": ["I","G","B","A","J","D","L","K"],
    "ABDHIJKL": ["H","I","B","A","J","D","L","K"],
    "ABEFGHIJ": ["E","F","B","A","H","G","I","J"],
    "ABEFGHIK": ["E","F","B","A","H","G","I","K"],
    "ABEFGHIL": ["E","F","B","A","H","G","L","I"],
    "ABEFGHJK": ["E","F","B","A","H","G","J","K"],
    "ABEFGHJL": ["E","F","B","A","H","G","L","J"],
    "ABEFGHKL": ["E","F","B","A","H","G","L","K"],
    "ABEFGIJK": ["E","F","B","A","I","G","J","K"],
    "ABEFGIJL": ["E","F","B","A","I","G","L","J"],
    "ABEFGIKL": ["E","F","B","A","I","G","L","K"],
    "ABEFGJKL": ["E","F","B","A","J","G","L","K"],
    "ABEFHIJK": ["E","F","B","A","I","H","J","K"],
    "ABEFHIJL": ["E","F","B","A","I","H","L","J"],
    "ABEFHIKL": ["E","F","B","A","I","H","L","K"],
    "ABEFHJKL": ["E","F","B","A","J","H","L","K"],
    "ABEFIJKL": ["E","I","B","A","J","F","L","K"],
    "ABEGHIJK": ["E","G","B","A","I","H","J","K"],
    "ABEGHIJL": ["E","G","B","A","I","H","L","J"],
    "ABEGHIKL": ["E","G","B","A","I","H","L","K"],
    "ABEGHJKL": ["E","G","B","A","J","H","L","K"],
    "ABEGIJKL": ["E","I","B","A","J","G","L","K"],
    "ABEHIJKL": ["E","I","B","A","J","H","L","K"],
    "ABFGHIJK": ["F","G","B","A","I","H","J","K"],
    "ABFGHIJL": ["F","G","B","A","I","H","L","J"],
    "ABFGHIKL": ["F","G","B","A","I","H","L","K"],
    "ABFGHJKL": ["F","G","B","A","J","H","L","K"],
    "ABFGIJKL": ["F","I","B","A","J","G","L","K"],
    "ABFHIJKL": ["F","I","B","A","J","H","L","K"],
    "ABGHIJKL": ["H","I","B","A","J","G","L","K"],
    "ACDEFGHI": ["C","E","F","A","H","G","D","I"],
    "ACDEFGHJ": ["C","E","F","A","H","G","D","J"],
    "ACDEFGHK": ["C","E","F","A","H","G","D","K"],
    "ACDEFGHL": ["C","E","F","D","A","G","L","H"],
    "ACDEFGIJ": ["C","E","F","A","I","G","D","J"],
    "ACDEFGIK": ["C","E","F","A","I","G","D","K"],
    "ACDEFGIL": ["C","E","F","D","A","G","L","I"],
    "ACDEFGJK": ["C","E","F","A","J","G","D","K"],
    "ACDEFGJL": ["C","E","F","D","A","G","L","J"],
    "ACDEFGKL": ["C","E","F","D","A","G","L","K"],
    "ACDEFHIJ": ["C","E","F","A","H","D","I","J"],
    "ACDEFHIK": ["C","E","F","A","H","D","I","K"],
    "ACDEFHIL": ["C","E","F","A","H","D","L","I"],
    "ACDEFHJK": ["C","E","F","A","H","D","J","K"],
    "ACDEFHJL": ["C","E","F","A","H","D","L","J"],
    "ACDEFHKL": ["C","E","F","A","H","D","L","K"],
    "ACDEFIJK": ["C","E","F","A","I","D","J","K"],
    "ACDEFIJL": ["C","E","F","A","I","D","L","J"],
    "ACDEFIKL": ["C","E","F","A","I","D","L","K"],
    "ACDEFJKL": ["C","E","F","A","J","D","L","K"],
    "ACDEGHIJ": ["C","E","I","A","H","G","D","J"],
    "ACDEGHIK": ["C","E","I","A","H","G","D","K"],
    "ACDEGHIL": ["C","E","I","D","A","G","L","H"],
    "ACDEGHJK": ["C","E","J","A","H","G","D","K"],
    "ACDEGHJL": ["C","E","J","D","A","G","L","H"],
    "ACDEGHKL": ["C","G","E","A","H","D","L","K"],
    "ACDEGIJK": ["C","E","I","A","J","G","D","K"],
    "ACDEGIJL": ["C","E","I","D","A","G","L","J"],
    "ACDEGIKL": ["C","E","I","D","A","G","L","K"],
    "ACDEGJKL": ["C","E","J","D","A","G","L","K"],
    "ACDEHIJK": ["C","E","I","A","H","D","J","K"],
    "ACDEHIJL": ["C","E","I","A","H","D","L","J"],
    "ACDEHIKL": ["C","E","I","A","H","D","L","K"],
    "ACDEHJKL": ["C","E","J","A","H","D","L","K"],
    "ACDEIJKL": ["C","E","I","A","J","D","L","K"],
    "ACDFGHIJ": ["C","F","I","A","H","G","D","J"],
    "ACDFGHIK": ["C","F","I","A","H","G","D","K"],
    "ACDFGHIL": ["C","F","I","D","A","G","L","H"],
    "ACDFGHJK": ["C","F","J","A","H","G","D","K"],
    "ACDFGHJL": ["C","F","J","D","A","G","L","H"],
    "ACDFGHKL": ["C","G","F","A","H","D","L","K"],
    "ACDFGIJK": ["C","F","I","A","J","G","D","K"],
    "ACDFGIJL": ["C","F","I","D","A","G","L","J"],
    "ACDFGIKL": ["C","F","I","D","A","G","L","K"],
    "ACDFGJKL": ["C","F","J","D","A","G","L","K"],
    "ACDFHIJK": ["C","F","I","A","H","D","J","K"],
    "ACDFHIJL": ["C","F","I","A","H","D","L","J"],
    "ACDFHIKL": ["C","F","I","A","H","D","L","K"],
    "ACDFHJKL": ["C","F","J","A","H","D","L","K"],
    "ACDFIJKL": ["C","F","I","A","J","D","L","K"],
    "ACDGHIJK": ["C","G","I","A","H","D","J","K"],
    "ACDGHIJL": ["C","G","I","A","H","D","L","J"],
    "ACDGHIKL": ["C","G","I","A","H","D","L","K"],
    "ACDGHJKL": ["C","G","J","A","H","D","L","K"],
    "ACDGIJKL": ["C","G","I","A","J","D","L","K"],
    "ACDHIJKL": ["C","I","J","A","H","D","L","K"],
    "ACEFGHIJ": ["C","E","F","A","H","G","I","J"],
    "ACEFGHIK": ["C","E","F","A","H","G","I","K"],
    "ACEFGHIL": ["C","E","F","A","H","G","L","I"],
    "ACEFGHJK": ["C","E","F","A","H","G","J","K"],
    "ACEFGHJL": ["C","E","F","A","H","G","L","J"],
    "ACEFGHKL": ["C","E","F","A","H","G","L","K"],
    "ACEFGIJK": ["C","E","F","A","I","G","J","K"],
    "ACEFGIJL": ["C","E","F","A","I","G","L","J"],
    "ACEFGIKL": ["C","E","F","A","I","G","L","K"],
    "ACEFGJKL": ["C","E","F","A","J","G","L","K"],
    "ACEFHIJK": ["C","E","F","A","I","H","J","K"],
    "ACEFHIJL": ["C","E","F","A","I","H","L","J"],
    "ACEFHIKL": ["C","E","F","A","I","H","L","K"],
    "ACEFHJKL": ["C","E","F","A","J","H","L","K"],
    "ACEFIJKL": ["C","E","I","A","J","F","L","K"],
    "ACEGHIJK": ["C","E","I","A","H","G","J","K"],
    "ACEGHIJL": ["C","E","I","A","H","G","L","J"],
    "ACEGHIKL": ["C","E","I","A","H","G","L","K"],
    "ACEGHJKL": ["C","E","J","A","H","G","L","K"],
    "ACEGIJKL": ["C","E","I","A","J","G","L","K"],
    "ACEHIJKL": ["C","E","I","A","J","H","L","K"],
    "ACFGHIJK": ["C","F","I","A","H","G","J","K"],
    "ACFGHIJL": ["C","F","I","A","H","G","L","J"],
    "ACFGHIKL": ["C","F","I","A","H","G","L","K"],
    "ACFGHJKL": ["C","F","J","A","H","G","L","K"],
    "ACFGIJKL": ["C","F","I","A","J","G","L","K"],
    "ACFHIJKL": ["C","F","I","A","J","H","L","K"],
    "ACGHIJKL": ["C","G","I","A","J","H","L","K"],
    "ADEFGHIJ": ["E","F","I","A","H","G","D","J"],
    "ADEFGHIK": ["E","F","I","A","H","G","D","K"],
    "ADEFGHIL": ["E","F","I","D","A","G","L","H"],
    "ADEFGHJK": ["E","F","J","A","H","G","D","K"],
    "ADEFGHJL": ["E","F","J","D","A","G","L","H"],
    "ADEFGHKL": ["E","G","F","A","H","D","L","K"],
    "ADEFGIJK": ["E","F","I","A","J","G","D","K"],
    "ADEFGIJL": ["E","F","I","D","A","G","L","J"],
    "ADEFGIKL": ["E","F","I","D","A","G","L","K"],
    "ADEFGJKL": ["E","F","J","D","A","G","L","K"],
    "ADEFHIJK": ["E","F","I","A","H","D","J","K"],
    "ADEFHIJL": ["E","F","I","A","H","D","L","J"],
    "ADEFHIKL": ["E","F","I","A","H","D","L","K"],
    "ADEFHJKL": ["E","F","J","A","H","D","L","K"],
    "ADEFIJKL": ["E","F","I","A","J","D","L","K"],
    "ADEGHIJK": ["E","G","I","A","H","D","J","K"],
    "ADEGHIJL": ["E","G","I","A","H","D","L","J"],
    "ADEGHIKL": ["E","G","I","A","H","D","L","K"],
    "ADEGHJKL": ["E","G","J","A","H","D","L","K"],
    "ADEGIJKL": ["E","G","I","A","J","D","L","K"],
    "ADEHIJKL": ["E","I","J","A","H","D","L","K"],
    "ADFGHIJK": ["F","G","I","A","H","D","J","K"],
    "ADFGHIJL": ["F","G","I","A","H","D","L","J"],
    "ADFGHIKL": ["F","G","I","A","H","D","L","K"],
    "ADFGHJKL": ["F","G","J","A","H","D","L","K"],
    "ADFGIJKL": ["F","G","I","A","J","D","L","K"],
    "ADFHIJKL": ["F","I","J","A","H","D","L","K"],
    "ADGHIJKL": ["H","G","I","A","J","D","L","K"],
    "AEFGHIJK": ["E","F","I","A","H","G","J","K"],
    "AEFGHIJL": ["E","F","I","A","H","G","L","J"],
    "AEFGHIKL": ["E","F","I","A","H","G","L","K"],
    "AEFGHJKL": ["E","F","J","A","H","G","L","K"],
    "AEFGIJKL": ["E","F","I","A","J","G","L","K"],
    "AEFHIJKL": ["E","F","I","A","J","H","L","K"],
    "AEGHIJKL": ["E","G","I","A","J","H","L","K"],
    "AFGHIJKL": ["F","G","I","A","J","H","L","K"],
    "BCDEFGHI": ["C","E","B","F","H","G","D","I"],
    "BCDEFGHJ": ["C","E","B","F","H","G","D","J"],
    "BCDEFGHK": ["C","E","B","F","H","G","D","K"],
    "BCDEFGHL": ["C","F","B","D","E","G","L","H"],
    "BCDEFGIJ": ["C","E","B","F","I","G","D","J"],
    "BCDEFGIK": ["C","E","B","F","I","G","D","K"],
    "BCDEFGIL": ["C","F","B","D","E","G","L","I"],
    "BCDEFGJK": ["C","E","B","F","J","G","D","K"],
    "BCDEFGJL": ["C","F","B","D","E","G","L","J"],
    "BCDEFGKL": ["C","F","B","D","E","G","L","K"],
    "BCDEFHIJ": ["C","E","B","D","H","F","I","J"],
    "BCDEFHIK": ["C","E","B","D","H","F","I","K"],
    "BCDEFHIL": ["C","E","B","D","H","F","L","I"],
    "BCDEFHJK": ["C","E","B","D","H","F","J","K"],
    "BCDEFHJL": ["C","E","B","D","H","F","L","J"],
    "BCDEFHKL": ["C","E","B","D","H","F","L","K"],
    "BCDEFIJK": ["C","E","B","D","I","F","J","K"],
    "BCDEFIJL": ["C","E","B","D","I","F","L","J"],
    "BCDEFIKL": ["C","E","B","D","I","F","L","K"],
    "BCDEFJKL": ["C","E","B","D","J","F","L","K"],
    "BCDEGHIJ": ["C","E","B","D","H","G","I","J"],
    "BCDEGHIK": ["C","E","B","D","H","G","I","K"],
    "BCDEGHIL": ["C","E","B","D","H","G","L","I"],
    "BCDEGHJK": ["C","E","B","D","H","G","J","K"],
    "BCDEGHJL": ["C","E","B","D","H","G","L","J"],
    "BCDEGHKL": ["C","E","B","D","H","G","L","K"],
    "BCDEGIJK": ["C","E","B","D","I","G","J","K"],
    "BCDEGIJL": ["C","E","B","D","I","G","L","J"],
    "BCDEGIKL": ["C","E","B","D","I","G","L","K"],
    "BCDEGJKL": ["C","E","B","D","J","G","L","K"],
    "BCDEHIJK": ["C","E","B","D","I","H","J","K"],
    "BCDEHIJL": ["C","E","B","D","I","H","L","J"],
    "BCDEHIKL": ["C","E","B","D","I","H","L","K"],
    "BCDEHJKL": ["C","E","B","D","J","H","L","K"],
    "BCDEIJKL": ["C","E","I","B","J","D","L","K"],
    "BCDFGHIJ": ["C","F","B","D","H","G","I","J"],
    "BCDFGHIK": ["C","F","B","D","H","G","I","K"],
    "BCDFGHIL": ["C","F","B","D","H","G","L","I"],
    "BCDFGHJK": ["C","F","B","D","H","G","J","K"],
    "BCDFGHJL": ["C","F","B","D","H","G","L","J"],
    "BCDFGHKL": ["C","F","B","D","H","G","L","K"],
    "BCDFGIJK": ["C","F","B","D","I","G","J","K"],
    "BCDFGIJL": ["C","F","B","D","I","G","L","J"],
    "BCDFGIKL": ["C","F","B","D","I","G","L","K"],
    "BCDFGJKL": ["C","F","B","D","J","G","L","K"],
    "BCDFHIJK": ["C","F","B","D","I","H","J","K"],
    "BCDFHIJL": ["C","F","B","D","I","H","L","J"],
    "BCDFHIKL": ["C","F","B","D","I","H","L","K"],
    "BCDFHJKL": ["C","F","B","D","J","H","L","K"],
    "BCDFIJKL": ["C","F","I","B","J","D","L","K"],
    "BCDGHIJK": ["C","G","B","D","I","H","J","K"],
    "BCDGHIJL": ["C","G","B","D","I","H","L","J"],
    "BCDGHIKL": ["C","G","B","D","I","H","L","K"],
    "BCDGHJKL": ["C","G","B","D","J","H","L","K"],
    "BCDGIJKL": ["C","G","I","B","J","D","L","K"],
    "BCDHIJKL": ["C","I","B","D","J","H","L","K"],
    "BCEFGHIJ": ["C","E","B","F","H","G","I","J"],
    "BCEFGHIK": ["C","E","B","F","H","G","I","K"],
    "BCEFGHIL": ["C","E","B","F","H","G","L","I"],
    "BCEFGHJK": ["C","E","B","F","H","G","J","K"],
    "BCEFGHJL": ["C","E","B","F","H","G","L","J"],
    "BCEFGHKL": ["C","E","B","F","H","G","L","K"],
    "BCEFGIJK": ["C","E","B","F","I","G","J","K"],
    "BCEFGIJL": ["C","E","B","F","I","G","L","J"],
    "BCEFGIKL": ["C","E","B","F","I","G","L","K"],
    "BCEFGJKL": ["C","E","B","F","J","G","L","K"],
    "BCEFHIJK": ["C","E","B","F","I","H","J","K"],
    "BCEFHIJL": ["C","E","B","F","I","H","L","J"],
    "BCEFHIKL": ["C","E","B","F","I","H","L","K"],
    "BCEFHJKL": ["C","E","B","F","J","H","L","K"],
    "BCEFIJKL": ["C","E","I","B","J","F","L","K"],
    "BCEGHIJK": ["C","E","I","B","H","G","J","K"],
    "BCEGHIJL": ["C","E","I","B","H","G","L","J"],
    "BCEGHIKL": ["C","E","I","B","H","G","L","K"],
    "BCEGHJKL": ["C","E","J","B","H","G","L","K"],
    "BCEGIJKL": ["C","E","I","B","J","G","L","K"],
    "BCEHIJKL": ["C","E","I","B","J","H","L","K"],
    "BCFGHIJK": ["C","F","I","B","H","G","J","K"],
    "BCFGHIJL": ["C","F","I","B","H","G","L","J"],
    "BCFGHIKL": ["C","F","I","B","H","G","L","K"],
    "BCFGHJKL": ["C","F","J","B","H","G","L","K"],
    "BCFGIJKL": ["C","F","I","B","J","G","L","K"],
    "BCFHIJKL": ["C","F","I","B","J","H","L","K"],
    "BCGHIJKL": ["C","G","I","B","J","H","L","K"],
    "BDEFGHIJ": ["E","F","B","D","H","G","I","J"],
    "BDEFGHIK": ["E","F","B","D","H","G","I","K"],
    "BDEFGHIL": ["E","F","B","D","H","G","L","I"],
    "BDEFGHJK": ["E","F","B","D","H","G","J","K"],
    "BDEFGHJL": ["E","F","B","D","H","G","L","J"],
    "BDEFGHKL": ["E","F","B","D","H","G","L","K"],
    "BDEFGIJK": ["E","F","B","D","I","G","J","K"],
    "BDEFGIJL": ["E","F","B","D","I","G","L","J"],
    "BDEFGIKL": ["E","F","B","D","I","G","L","K"],
    "BDEFGJKL": ["E","F","B","D","J","G","L","K"],
    "BDEFHIJK": ["E","F","B","D","I","H","J","K"],
    "BDEFHIJL": ["E","F","B","D","I","H","L","J"],
    "BDEFHIKL": ["E","F","B","D","I","H","L","K"],
    "BDEFHJKL": ["E","F","B","D","J","H","L","K"],
    "BDEFIJKL": ["E","F","I","B","J","D","L","K"],
    "BDEGHIJK": ["E","G","B","D","I","H","J","K"],
    "BDEGHIJL": ["E","G","B","D","I","H","L","J"],
    "BDEGHIKL": ["E","G","B","D","I","H","L","K"],
    "BDEGHJKL": ["E","G","B","D","J","H","L","K"],
    "BDEGIJKL": ["E","G","I","B","J","D","L","K"],
    "BDEHIJKL": ["E","I","B","D","J","H","L","K"],
    "BDFGHIJK": ["F","G","B","D","I","H","J","K"],
    "BDFGHIJL": ["F","G","B","D","I","H","L","J"],
    "BDFGHIKL": ["F","G","B","D","I","H","L","K"],
    "BDFGHJKL": ["F","G","B","D","J","H","L","K"],
    "BDFGIJKL": ["F","G","I","B","J","D","L","K"],
    "BDFHIJKL": ["F","I","B","D","J","H","L","K"],
    "BDGHIJKL": ["H","G","I","B","J","D","L","K"],
    "BEFGHIJK": ["E","F","I","B","H","G","J","K"],
    "BEFGHIJL": ["E","F","I","B","H","G","L","J"],
    "BEFGHIKL": ["E","F","I","B","H","G","L","K"],
    "BEFGHJKL": ["E","F","J","B","H","G","L","K"],
    "BEFGIJKL": ["E","F","I","B","J","G","L","K"],
    "BEFHIJKL": ["E","F","I","B","J","H","L","K"],
    "BEGHIJKL": ["E","G","I","B","J","H","L","K"],
    "BFGHIJKL": ["F","G","I","B","J","H","L","K"],
    "CDEFGHIJ": ["C","E","F","D","H","G","I","J"],
    "CDEFGHIK": ["C","E","F","D","H","G","I","K"],
    "CDEFGHIL": ["C","E","F","D","H","G","L","I"],
    "CDEFGHJK": ["C","E","F","D","H","G","J","K"],
    "CDEFGHJL": ["C","E","F","D","H","G","L","J"],
    "CDEFGHKL": ["C","E","F","D","H","G","L","K"],
    "CDEFGIJK": ["C","E","F","D","I","G","J","K"],
    "CDEFGIJL": ["C","E","F","D","I","G","L","J"],
    "CDEFGIKL": ["C","E","F","D","I","G","L","K"],
    "CDEFGJKL": ["C","E","F","D","J","G","L","K"],
    "CDEFHIJK": ["C","E","F","D","I","H","J","K"],
    "CDEFHIJL": ["C","E","F","D","I","H","L","J"],
    "CDEFHIKL": ["C","E","F","D","I","H","L","K"],
    "CDEFHJKL": ["C","E","F","D","J","H","L","K"],
    "CDEFIJKL": ["C","E","I","D","J","F","L","K"],
    "CDEGHIJK": ["C","E","I","D","H","G","J","K"],
    "CDEGHIJL": ["C","E","I","D","H","G","L","J"],
    "CDEGHIKL": ["C","E","I","D","H","G","L","K"],
    "CDEGHJKL": ["C","E","J","D","H","G","L","K"],
    "CDEGIJKL": ["C","E","I","D","J","G","L","K"],
    "CDEHIJKL": ["C","E","I","D","J","H","L","K"],
    "CDFGHIJK": ["C","F","I","D","H","G","J","K"],
    "CDFGHIJL": ["C","F","I","D","H","G","L","J"],
    "CDFGHIKL": ["C","F","I","D","H","G","L","K"],
    "CDFGHJKL": ["C","F","J","D","H","G","L","K"],
    "CDFGIJKL": ["C","F","I","D","J","G","L","K"],
    "CDFHIJKL": ["C","F","I","D","J","H","L","K"],
    "CDGHIJKL": ["C","G","I","D","J","H","L","K"],
    "CEFGHIJK": ["C","E","I","F","H","G","J","K"],
    "CEFGHIJL": ["C","E","I","F","H","G","L","J"],
    "CEFGHIKL": ["C","E","I","F","H","G","L","K"],
    "CEFGHJKL": ["C","E","J","F","H","G","L","K"],
    "CEFGIJKL": ["C","E","I","F","J","G","L","K"],
    "CEFHIJKL": ["C","E","I","F","J","H","L","K"],
    "CEGHIJKL": ["E","G","I","C","J","H","L","K"],
    "CFGHIJKL": ["C","G","I","F","J","H","L","K"],
    "DEFGHIJK": ["E","F","I","D","H","G","J","K"],
    "DEFGHIJL": ["E","F","I","D","H","G","L","J"],
    "DEFGHIKL": ["E","F","I","D","H","G","L","K"],
    "DEFGHJKL": ["E","F","J","D","H","G","L","K"],
    "DEFGIJKL": ["E","F","I","D","J","G","L","K"],
    "DEFHIJKL": ["E","F","I","D","J","H","L","K"],
    "DEGHIJKL": ["E","G","I","D","J","H","L","K"],
    "DFGHIJKL": ["F","G","I","D","J","H","L","K"],
    "EFGHIJKL": ["E","G","I","F","J","H","L","K"]
  };

  /**
   * Dada la lista de 8 grupos cuyos terceros clasifican,
   * retorna un objeto { firstPlaceLetter: thirdPlaceGroupLetter }
   * o null si no se encuentra la combinación.
   */
  function getThirdPlaceAllocation(qualifyingGroups) {
    const key = qualifyingGroups.slice().sort().join("");
    const row = THIRD_PLACE_TABLE[key];
    if (!row) return null;
    const result = {};
    FIRST_PLACE_ORDER.forEach((fp, i) => {
      result[fp] = row[i];
    });
    return result;
  }



    // ==========================================================
    // RENDERIZADO DE GRUPOS DESDE data.js
    // ==========================================================
    function crearFilaPartido(partido) {
        const gl = partido.golesLocal ?? 0;
        const gv = partido.golesVisitante ?? 0;
        const confirmado = partido.jugado ? " partido-confirmado" : "";
        return `<div class="match-row${confirmado}">
            <div class="team-name left">${partido.local}</div>
            <div class="score-container">
                <div class="control-counter">
                    <button type="button" class="btn-counter plus" data-type="local">+</button>
                    <span class="score-display" data-type="local">${gl}</span>
                    <button type="button" class="btn-counter minus" data-type="local">-</button>
                </div>
                <span class="separator">-</span>
                <div class="control-counter">
                    <button type="button" class="btn-counter plus" data-type="visitante">+</button>
                    <span class="score-display" data-type="visitante">${gv}</span>
                    <button type="button" class="btn-counter minus" data-type="visitante">-</button>
                </div>
            </div>
            <div class="team-name right">${partido.visitante}</div>
        </div>`;
    }

    function renderizarGrupos() {
        const nav = document.getElementById("group-selector-nav");
        const container = document.getElementById("groups-container");
        if (!nav || !container) return;

        const letras = Object.keys(torneoData.grupos).sort();

        nav.innerHTML = letras.map((letra, i) =>
            `<button class="selector-btn${i === 0 ? " active" : ""}" data-group="${letra}">${letra}</button>`
        ).join("");

        container.innerHTML = letras.map((letra, i) => {
            const grupo = torneoData.grupos[letra];
            const partidosHtml = grupo.partidos.map(crearFilaPartido).join("");
            return `<div class="group-card${i === 0 ? " active" : ""}" id="card-grupo-${letra}">
                <h3>GRUPO ${letra}</h3>
                <div class="standings-container">
                    <table class="standings-table">
                        <thead>
                            <tr>
                                <th>#</th><th>Equipo</th><th>PJ</th><th>GF</th><th>GC</th><th>DIF</th><th>PTS</th>
                            </tr>
                        </thead>
                        <tbody id="standings-${letra}"></tbody>
                    </table>
                </div>
                <h4 class="matches-heading">Partidos</h4>
                <div class="matches-container">${partidosHtml}</div>
            </div>`;
        }).join("");
    }

    // ==========================================================
    // RENDERIZADO DE LLAVES DESDE data.js
    // ==========================================================
    function slotId(rondaId, partidoId, posicion) {
        if (partidoId) return `slot-${rondaId}-${partidoId}-${posicion}`;
        return `slot-${rondaId}-${posicion}`;
    }

    function crearEquipoBracket(rondaId, partidoId, posicion, etiqueta) {
        const id = slotId(rondaId, partidoId, posicion);
        return `<div class="bracket-team ${posicion} team-row-clickable" id="${id}">
            <span class="team-name-bracket">${etiqueta}</span>
        </div>`;
    }

    function crearPartidoBracket(rondaId, partido) {
        const top = crearEquipoBracket(rondaId, partido.id, "top", partido.top);
        const bottom = crearEquipoBracket(rondaId, partido.id, "bottom", partido.bottom);
        return `<div class="match-bracket">${top}${bottom}</div>`;
    }

    function buildBracketProgression(progresion) {
        const result = {};
        progresion.forEach(p => {
            if (!result[p.ronda]) result[p.ronda] = [];
            const targetId = slotId(p.ronda, p.targetMatch, p.targetPos);
            const entry = { source: { stage: p.sourceRonda, match: p.sourceMatch } };
            if (p.targetPos === "top") entry.targetTop = targetId;
            else entry.targetBottom = targetId;
            result[p.ronda].push(entry);
        });
        return result;
    }

    function renderizarLlaves() {
        const nav = document.getElementById("ronda-selector-nav");
        const container = document.getElementById("bracket-container");
        if (!nav || !container || !torneoData.llaves) return;

        const { rondas } = torneoData.llaves;

        nav.innerHTML = rondas.map((ronda, i) =>
            `<button class="ronda-btn${i === 0 ? " active" : ""}" data-ronda="${ronda.id}">${ronda.etiquetaBoton}</button>`
        ).join("");

        container.innerHTML = rondas.map((ronda, i) => {
            const partidosHtml = ronda.partidos.map(p => crearPartidoBracket(ronda.id, p)).join("");
            return `<div class="bracket-column${i === 0 ? " active" : ""}" id="ronda-${ronda.id}">
                <div class="column-header">${ronda.titulo}</div>
                ${partidosHtml}
            </div>`;
        }).join("");
    }

    const bracketSlotConfig = torneoData.llaves.clasificacion;
    const bracketProgression = buildBracketProgression(torneoData.llaves.progresion);

    // ==========================================================
    // PERSISTENCIA
    // ==========================================================
    function getBracketWinners() {
        return [...document.querySelectorAll(".bracket-team.winner")].map(el => el.id);
    }

    function guardarMarcadoresEnLocalStorage() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                grupos: torneoData.grupos,
                bracketWinners: getBracketWinners()
            }));
        } catch (error) {
            console.error("Error guardando datos en localStorage:", error);
        }
    }

    function restoreBracketWinners(winnerIds) {
        document.querySelectorAll(".bracket-team.winner").forEach(el => el.classList.remove("winner"));
        if (!winnerIds?.length) return;

        winnerIds.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            const teamName = el.querySelector(".team-name-bracket")?.textContent.trim();
            if (!teamName || isBracketPlaceholder(teamName)) return;
            el.classList.add("winner");
        });
    }

    function sincronizarMarcadoresUI() {
        document.querySelectorAll(".match-row").forEach(filaPartido => {
            const equipoLocal = filaPartido.querySelector(".team-name.left").textContent.trim();
            const equipoVisitante = filaPartido.querySelector(".team-name.right").textContent.trim();
            for (const letraGrupo in torneoData.grupos) {
                const partido = torneoData.grupos[letraGrupo].partidos.find(
                    p => p.local === equipoLocal && p.visitante === equipoVisitante
                );
                if (partido) {
                    const displayLocal = filaPartido.querySelector('.score-display[data-type="local"]');
                    const displayVisitante = filaPartido.querySelector('.score-display[data-type="visitante"]');
                    if (displayLocal) displayLocal.textContent = partido.golesLocal ?? 0;
                    if (displayVisitante) displayVisitante.textContent = partido.golesVisitante ?? 0;
                    filaPartido.classList.toggle("partido-confirmado", partido.jugado === true);
                }
            }
        });
    }

    function normalizarPartidosGrupo() {
        for (const letra in torneoData.grupos) {
            torneoData.grupos[letra].partidos.forEach(p => {
                const teniaMarcadorGuardado = p.golesLocal !== null && p.golesVisitante !== null;
                if (p.golesLocal === null || p.golesLocal === undefined) p.golesLocal = 0;
                if (p.golesVisitante === null || p.golesVisitante === undefined) p.golesVisitante = 0;
                if (p.jugado === undefined) {
                    p.jugado = teniaMarcadorGuardado;
                }
                if (p.jugado !== true) p.jugado = false;
            });
        }
    }

    function aplicarMarcadorAPartido(partido, golesLocal, golesVisitante) {
        partido.golesLocal = golesLocal;
        partido.golesVisitante = golesVisitante;
        partido.jugado = true;
    }

    function confirmarMarcadorDesdeFila(fila) {
        const local = fila.querySelector(".team-name.left")?.textContent.trim();
        const visitante = fila.querySelector(".team-name.right")?.textContent.trim();
        if (!local || !visitante) return;

        const golesLocal = parseInt(fila.querySelector('.score-display[data-type="local"]')?.textContent, 10) || 0;
        const golesVisitante = parseInt(fila.querySelector('.score-display[data-type="visitante"]')?.textContent, 10) || 0;

        for (const g in torneoData.grupos) {
            const p = torneoData.grupos[g].partidos.find(x => x.local === local && x.visitante === visitante);
            if (p) {
                if (p.jugado && p.golesLocal === golesLocal && p.golesVisitante === golesVisitante) return;
                aplicarMarcadorAPartido(p, golesLocal, golesVisitante);
                fila.classList.add("partido-confirmado");
                calcularTablaYActualizar();
                guardarMarcadoresEnLocalStorage();
                break;
            }
        }
    }

    function cargarMarcadoresGuardados() {
        registrationFormAutoOpened = true;
        registrationCompleted = false;
        registrationData = null;

        const datosLocales = localStorage.getItem(STORAGE_KEY);
        if (datosLocales) {
            try {
                const datosParseados = JSON.parse(datosLocales);
                if (datosParseados?.grupos) {
                    Object.assign(torneoData.grupos, datosParseados.grupos);
                    normalizarPartidosGrupo();
                }
                if (Array.isArray(datosParseados?.bracketWinners)) {
                    savedBracketWinners = datosParseados.bracketWinners;
                } else if (datosParseados?.winnerSlot) {
                    savedBracketWinners = [datosParseados.winnerSlot];
                }
            } catch (error) {
                console.error("Error al leer localStorage:", error);
            }
        }

        sincronizarMarcadoresUI();
        calcularTablaYActualizar();
        restoreBracketWinners(savedBracketWinners);
        updateBracketProgression();
        actualizarVisibilidadExportar();
    }

    // ==========================================================
    // MOTOR DE CLASIFICACIÓN
    // ==========================================================
    window.actualizarSlot = function(slotId, nombreEquipo) {
        const elemento = document.getElementById(slotId);
        if (!elemento) return;
        const span = elemento.querySelector(".team-name-bracket");
        if (span) span.textContent = nombreEquipo || "...";
    };

    const bracketPlaceholders = new Map();

    function preserveBracketPlaceholders() {
        document.querySelectorAll(".bracket-team").forEach(el => {
            const text = el.querySelector(".team-name-bracket")?.textContent.trim() || "";
            bracketPlaceholders.set(el.id, text);
        });
    }

    function getGroupRanking(grupo) {
        const tabla = {};
        const pj = {};
        grupo.equipos.forEach(eq => {
            tabla[eq] = { pts: 0, gf: 0, gc: 0 };
            pj[eq] = 0;
        });

        grupo.partidos.forEach(p => {
            const gl = p.golesLocal ?? 0;
            const gv = p.golesVisitante ?? 0;

            tabla[p.local].gf += gl;
            tabla[p.local].gc += gv;
            tabla[p.visitante].gf += gv;
            tabla[p.visitante].gc += gl;
            pj[p.local]++;
            pj[p.visitante]++;

            if (gl > gv) tabla[p.local].pts += 3;
            else if (gv > gl) tabla[p.visitante].pts += 3;
            else { tabla[p.local].pts += 1; tabla[p.visitante].pts += 1; }
        });

        const ranking = Object.keys(tabla).sort((a, b) => {
            if (tabla[b].pts !== tabla[a].pts) return tabla[b].pts - tabla[a].pts;
            const difA = tabla[a].gf - tabla[a].gc;
            const difB = tabla[b].gf - tabla[b].gc;
            if (difB !== difA) return difB - difA;
            return tabla[b].gf - tabla[a].gf;
        });

        return { ranking, tabla, pj };
    }

    function updateStandingsTables(groupRankings) {
        for (const letra in groupRankings) {
            const tbody = document.getElementById(`standings-${letra}`);
            if (!tbody) continue;

            const { ranking, tabla, pj } = groupRankings[letra];
            tbody.innerHTML = ranking.map((equipo, idx) => {
                const s = tabla[equipo];
                const dif = s.gf - s.gc;
                const posClass = idx === 0 ? "pos-first" : idx === 1 ? "pos-second" : idx === 2 ? "pos-third" : "";
                const difStr = dif >= 0 ? `+${dif}` : String(dif);
                return `<tr class="${posClass}">
                    <td>${idx + 1}</td>
                    <td class="standings-team">${equipo}</td>
                    <td>${pj[equipo]}</td>
                    <td>${s.gf}</td>
                    <td>${s.gc}</td>
                    <td>${difStr}</td>
                    <td>${s.pts}</td>
                </tr>`;
            }).join("");
        }
    }

    function isBracketPlaceholder(name) {
        return /^(?:1[A-L]|2[A-L]|3[A-L](?:\/[A-L]){0,11}|Gan\.|Gan\. 16|Gan\. 8|Gan\. C|Gan\. S)/.test(name);
    }

    function clearBracketWinners() {
        document.querySelectorAll(".bracket-team.winner").forEach(el => el.classList.remove("winner"));
    }

    function fillBracketFromGroupRankings(groupRankings) {
        const thirdPlaces = [];

        for (const letra in groupRankings) {
            const { ranking, tabla } = groupRankings[letra];
            if (ranking[0]) actualizarSlot(bracketSlotConfig.firstPlace[letra], ranking[0]);
            if (ranking[1]) actualizarSlot(bracketSlotConfig.secondPlace[letra], ranking[1]);
            if (ranking[2]) {
                const stats = tabla[ranking[2]];
                thirdPlaces.push({
                    group: letra,
                    team: ranking[2],
                    pts: stats.pts,
                    diff: stats.gf - stats.gc,
                    gf: stats.gf
                });
            }
        }

        // Ordenar los 12 terceros por: puntos > diferencia de gol > goles a favor
        thirdPlaces.sort((a, b) => {
            if (b.pts !== a.pts) return b.pts - a.pts;
            if (b.diff !== a.diff) return b.diff - a.diff;
            return b.gf - a.gf;
        });

        // Los mejores 8 terceros clasifican
        const qualifiedThirds = thirdPlaces.slice(0, 8);
        const qualifyingGroups = qualifiedThirds.map(t => t.group);

        // Buscar la asignación en la tabla FIFA
        const allocation = getThirdPlaceAllocation(qualifyingGroups);

        if (allocation) {
            // FIRST_PLACE_ORDER = ["A","B","D","E","G","I","K","L"]
            // thirdPlaceSlots sigue el mismo orden
            FIRST_PLACE_ORDER.forEach((fp, idx) => {
                const slotId = bracketSlotConfig.thirdPlaceSlots[idx];
                const thirdGroupLetter = allocation[fp];
                const thirdTeam = qualifiedThirds.find(t => t.group === thirdGroupLetter);
                const name = thirdTeam ? thirdTeam.team : (bracketPlaceholders.get(slotId) || "...");
                actualizarSlot(slotId, name);
            });
        } else {
            // Fallback: llenar por orden de ranking (comportamiento original)
            bracketSlotConfig.thirdPlaceSlots.forEach((slotId, index) => {
                const name = thirdPlaces[index]?.team || bracketPlaceholders.get(slotId) || "...";
                actualizarSlot(slotId, name);
            });
        }
    }

    function getBracketMatchWinner(stage, matchId) {
        const topSlot = document.getElementById(`slot-${stage}-${matchId}-top`);
        const bottomSlot = document.getElementById(`slot-${stage}-${matchId}-bottom`);
        if (!topSlot || !bottomSlot) return null;

        const topTeam = topSlot.querySelector(".team-name-bracket")?.textContent.trim();
        const bottomTeam = bottomSlot.querySelector(".team-name-bracket")?.textContent.trim();
        if (!topTeam || !bottomTeam || isBracketPlaceholder(topTeam) || isBracketPlaceholder(bottomTeam)) return null;
        if (topSlot.classList.contains("winner")) return topTeam;
        if (bottomSlot.classList.contains("winner")) return bottomTeam;
        return null;
    }

    function updateBracketProgression() {
        Object.values(bracketProgression).forEach(stagePairs => {
            stagePairs.forEach(pair => {
                const targetId = pair.targetTop || pair.targetBottom;
                const placeholder = bracketPlaceholders.get(targetId) || "...";
                const winner = getBracketMatchWinner(pair.source.stage, pair.source.match);
                actualizarSlot(targetId, winner || placeholder);
            });
        });
        renderPodium();
    }

    function renderPodium() {
        const finalTop = document.getElementById("slot-final-top");
        const finalBottom = document.getElementById("slot-final-bottom");
        const podium = document.getElementById("podium");
        const podium1 = document.getElementById("podium-1");
        const podium2 = document.getElementById("podium-2");
        if (!finalTop || !finalBottom || !podium1 || !podium2 || !podium) return;

        const topName = finalTop.querySelector(".team-name-bracket")?.textContent.trim() || "...";
        const bottomName = finalBottom.querySelector(".team-name-bracket")?.textContent.trim() || "...";

        let champion = "...";
        let runner = "...";
        if (finalTop.classList.contains("winner")) { champion = topName; runner = bottomName; }
        else if (finalBottom.classList.contains("winner")) { champion = bottomName; runner = topName; }

        podium1.textContent = champion;
        podium2.textContent = runner;
        if (champion !== "...") { podium.removeAttribute("hidden"); }
        else { podium.setAttribute("hidden", ""); }
        actualizarVisibilidadExportar();
    }

    function handleBracketClick(element) {
        const slotId = element.id;
        const matchParts = slotId.match(/^slot-([a-z0-9]+)(?:-P(\d+))?-(top|bottom)$/);
        if (!matchParts) return;

        const [, stage, matchId] = matchParts;
        const topId = matchId ? `slot-${stage}-P${matchId}-top` : `slot-${stage}-top`;
        const bottomId = matchId ? `slot-${stage}-P${matchId}-bottom` : `slot-${stage}-bottom`;
        const top = document.getElementById(topId);
        const bottom = document.getElementById(bottomId);
        if (!top || !bottom) return;

        const topName = top.querySelector(".team-name-bracket")?.textContent.trim();
        const bottomName = bottom.querySelector(".team-name-bracket")?.textContent.trim();
        if (!topName || !bottomName) return;
        if (isBracketPlaceholder(topName) || isBracketPlaceholder(bottomName)) return;

        if (element.classList.contains("winner")) {
            top.classList.remove("winner");
            bottom.classList.remove("winner");
        } else {
            top.classList.remove("winner");
            bottom.classList.remove("winner");
            element.classList.add("winner");
        }

        updateBracketProgression();
        guardarMarcadoresEnLocalStorage();
        actualizarVisibilidadExportar();
    }

    window.calcularTablaYActualizar = function() {
        const groupRankings = {};

        for (const letra in torneoData.grupos) {
            groupRankings[letra] = getGroupRanking(torneoData.grupos[letra]);
        }

        updateStandingsTables(groupRankings);
        clearBracketWinners();
        fillBracketFromGroupRankings(groupRankings);
        updateBracketProgression();
        actualizarVisibilidadExportar();
    };

    // ==========================================================
    // VALIDACIÓN EXPORTAR (campeón + subcampeón)
    // ==========================================================
    function nombrePodioValido(nombre) {
        return Boolean(nombre && nombre !== "..." && !isBracketPlaceholder(nombre));
    }

    function tienePodioDefinido() {
        const campeon = document.getElementById("podium-1")?.textContent.trim() || "";
        const subcampeon = document.getElementById("podium-2")?.textContent.trim() || "";
        return nombrePodioValido(campeon) && nombrePodioValido(subcampeon);
    }

    function getGanadorPartidoLlave(rondaId, partidoId) {
        const topEl = document.getElementById(slotId(rondaId, partidoId, "top"));
        const bottomEl = document.getElementById(slotId(rondaId, partidoId, "bottom"));
        if (!topEl || !bottomEl) return null;

        const topName = topEl.querySelector(".team-name-bracket")?.textContent.trim();
        const bottomName = bottomEl.querySelector(".team-name-bracket")?.textContent.trim();
        if (!topName || !bottomName || isBracketPlaceholder(topName) || isBracketPlaceholder(bottomName)) {
            return null;
        }
        if (topEl.classList.contains("winner")) return topName;
        if (bottomEl.classList.contains("winner")) return bottomName;
        return null;
    }

    let registrationFormAutoOpened = true;
    let registrationPdfBlob = null;
    let registrationPdfFileName = "";
    let registrationCompleted = false;
    let registeredPodioKey = "";
    let registrationData = null;

    function getCurrentPodioKey() {
        const campeon = document.getElementById("podium-1")?.textContent.trim() || "";
        const subcampeon = document.getElementById("podium-2")?.textContent.trim() || "";
        return `${campeon}|${subcampeon}`;
    }

    function updateExportButtonState() {
        const exportButton = document.getElementById("btn-exportar-pdf");
        if (!exportButton) return;
        exportButton.hidden = !registrationCompleted;
        exportButton.disabled = !registrationCompleted;
        exportButton.setAttribute("aria-hidden", registrationCompleted ? "false" : "true");
    }

    function actualizarVisibilidadExportar() {
        const contenedor = document.getElementById("export-actions");
        if (!contenedor) return;
        const listo = tienePodioDefinido();
        contenedor.hidden = !listo;
        contenedor.setAttribute("aria-hidden", listo ? "false" : "true");

        if (!listo) {
            registrationCompleted = false;
            registeredPodioKey = "";
        } else if (registrationCompleted) {
            const currentKey = getCurrentPodioKey();
            if (registeredPodioKey && currentKey !== registeredPodioKey) {
                registrationCompleted = false;
            }
        }

        updateExportButtonState();

        // Nunca abrir el formulario automáticamente
        // if (listo && !registrationCompleted) {
        //     showRegistrationFormIfReady();
        // }
    }

    function openRegistrationForm() {
        const modal = document.getElementById("registration-modal");
        if (!modal) return;
        modal.hidden = false;
        modal.setAttribute("aria-hidden", "false");
        prepareRegistrationFormPDF();
    }

    function showRegistrationFormIfReady() {
        if (registrationFormAutoOpened || !tienePodioDefinido()) return;
        // Desactivado: no abrir el formulario automáticamente
        // registrationFormAutoOpened = true;
        // openRegistrationForm();
    }

    function handleRegistrationSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const nombre = form.nombre.value.trim();
        const cedula = form.cedula.value.trim();
        const email = form.email.value.trim();
        const comentario = form.comentario.value.trim();
        const consent = form.consent.checked;

        if (!nombre || !cedula || !email || !consent) {
            alert("Completa todos los campos obligatorios y acepta el consentimiento.");
            return;
        }

        if (!registrationPdfBlob) {
            prepareRegistrationFormPDF();
        }

        if (!registrationPdfBlob) {
            alert("El PDF aún no está listo. Recarga la página o intenta de nuevo en unos segundos.");
            return;
        }

        registrationData = {
            nombre,
            cedula,
            email,
            comentario,
            fecha: new Date().toISOString(),
            campeon: document.getElementById("podium-1")?.textContent.trim() || "",
            subcampeon: document.getElementById("podium-2")?.textContent.trim() || ""
        };

        guardarRegistroEnLocalStorage(registrationData);

        const submitBtn = form.querySelector("button[type='submit']");
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = "Enviando...";
        }

        const formData = new FormData(form);
        formData.append("pdf_attachment", registrationPdfBlob, registrationPdfFileName);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", form.action, true);

        xhr.onload = function() {
            console.log("Registro enviado a FormSubmit:", registrationData);
            registrationCompleted = true;
            registeredPodioKey = getCurrentPodioKey();
            updateExportButtonState();
            updateRegistrationAttachmentPreview();
            showDownloadButton();
            // update UI: hide registration/open buttons and show 'Realizar nueva polla'
            setPostSubmissionUI();
            alert("Formulario enviado correctamente. Ahora puedes descargar el PDF.");
            hideRegistrationForm();
            form.reset();
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = "Enviar Participación";
            }
        };

        xhr.onerror = function() {
            console.error("Error al enviar el formulario");
            alert("Hubo un error al enviar. Verifica tu conexión e intenta de nuevo.");
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = "Enviar Participación";
            }
        };

        xhr.send(formData);
    }

    function guardarRegistroEnLocalStorage(datos) {
        try {
            const registros = JSON.parse(localStorage.getItem("pollaRegistros") || "[]");
            registros.push(datos);
            localStorage.setItem("pollaRegistros", JSON.stringify(registros));
            console.log("Registro guardado en localStorage");
        } catch (error) {
            console.error("Error al guardar en localStorage:", error);
        }
    }

    function showDownloadButton() {
        const downloadBtn = document.getElementById("btn-download-registration-pdf");
        if (!downloadBtn) return;
        downloadBtn.hidden = false;
    }

    function setPostSubmissionUI() {
        const exportBtn = document.getElementById("btn-exportar-pdf");
        const openRegBtn = document.getElementById("btn-open-registration-form");
        const newPollaBtn = document.getElementById("btn-new-polla");
        if (exportBtn) {
            // keep export button visible after submission until user chooses to start a new polla
            exportBtn.hidden = false;
            exportBtn.setAttribute("aria-hidden", "false");
        }
        if (openRegBtn) {
            openRegBtn.hidden = true;
            openRegBtn.setAttribute("aria-hidden", "true");
        }
        if (newPollaBtn) {
            newPollaBtn.hidden = false;
            newPollaBtn.setAttribute("aria-hidden", "false");
        }
    }

    function resetAppToInitialState() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem("pollaRegistros");
            // reset in-memory state
            registrationCompleted = false;
            registeredPodioKey = "";
            registrationData = null;
        } catch (err) {
            console.error("Error clearing storage:", err);
        }
        // reload the page to initial load state
        window.location.reload();
    }

    function hideRegistrationForm() {
        const modal = document.getElementById("registration-modal");
        if (!modal) return;
        modal.hidden = true;
        modal.setAttribute("aria-hidden", "true");
    }

    // ==========================================================
    // EXPORTAR PDF
    // ==========================================================
    function formatMarcadorPartido(partido) {
        const gl = partido.golesLocal ?? 0;
        const gv = partido.golesVisitante ?? 0;
        return `${gl} - ${gv}`;
    }

    function getNombreEnSlot(rondaId, partidoId, posicion) {
        const el = document.getElementById(slotId(rondaId, partidoId, posicion));
        return el?.querySelector(".team-name-bracket")?.textContent.trim() || "—";
    }

    function buildPdfDocument() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
        const margin = 14;
        let y = 18;
        const pageH = doc.internal.pageSize.getHeight();

        const fecha = new Date().toLocaleString("es-ES", {
            dateStyle: "long",
            timeStyle: "short"
        });

        doc.setFontSize(18);
        doc.setFont(undefined, "bold");
        doc.text("Mundial 2026 — Simulación completa", margin, y);
        y += 8;

        doc.setFontSize(10);
        doc.setFont(undefined, "normal");
        doc.setTextColor(80, 80, 80);
        doc.text(`Generado: ${fecha}`, margin, y);
        y += 10;
        doc.setTextColor(0, 0, 0);

        if (registrationData) {
            doc.setFontSize(12);
            doc.setFont(undefined, "bold");
            doc.text("Datos del Participante", margin, y);
            y += 6;
            doc.setFontSize(10);
            doc.setFont(undefined, "normal");
            doc.text(`Nombre: ${registrationData.nombre}`, margin, y);
            y += 5;
            doc.text(`Cédula: ${registrationData.cedula}`, margin, y);
            y += 5;
            doc.text(`Correo: ${registrationData.email}`, margin, y);
            y += 5;
            if (registrationData.comentario) {
                doc.text(`Comentarios: ${registrationData.comentario}`, margin, y);
                y += 5;
            }
            y += 6;
        }

        const campeon = document.getElementById("podium-1")?.textContent.trim() || "—";
        const subcampeon = document.getElementById("podium-2")?.textContent.trim() || "—";

        doc.setFontSize(12);
        doc.setFont(undefined, "bold");
        doc.text("Podio", margin, y);
        y += 6;
        doc.setFontSize(10);
        doc.setFont(undefined, "normal");
        doc.text(`Campeón: ${campeon}`, margin, y);
        y += 5;
        doc.text(`Subcampeón: ${subcampeon}`, margin, y);
        y += 12;

        doc.setFontSize(14);
        doc.setFont(undefined, "bold");
        doc.text("Fase de grupos", margin, y);
        y += 4;

        const letras = Object.keys(torneoData.grupos).sort();

        letras.forEach(letra => {
            const grupo = torneoData.grupos[letra];
            const { ranking, tabla, pj } = getGroupRanking(grupo);

            if (y > pageH - 50) {
                doc.addPage();
                y = 18;
            }

            doc.setFontSize(11);
            doc.setFont(undefined, "bold");
            doc.text(`Grupo ${letra}`, margin, y);
            y += 2;

            const filasTabla = ranking.map((equipo, idx) => {
                const s = tabla[equipo];
                const dif = s.gf - s.gc;
                return [
                    String(idx + 1),
                    equipo,
                    String(pj[equipo]),
                    String(s.gf),
                    String(s.gc),
                    dif >= 0 ? `+${dif}` : String(dif),
                    String(s.pts)
                ];
            });

            doc.autoTable({
                head: [["#", "Equipo", "PJ", "GF", "GC", "DIF", "PTS"]],
                body: filasTabla,
                startY: y,
                margin: { left: margin, right: margin },
                styles: { fontSize: 8, cellPadding: 1.5 },
                headStyles: { fillColor: [13, 59, 142], textColor: 255 },
                theme: "grid"
            });

            y = doc.lastAutoTable.finalY + 4;

            const filasPartidos = grupo.partidos.map(p => [
                p.local,
                formatMarcadorPartido(p),
                p.visitante
            ]);

            doc.autoTable({
                head: [["Local", "Marcador", "Visitante"]],
                body: filasPartidos,
                startY: y,
                margin: { left: margin, right: margin },
                styles: { fontSize: 8, cellPadding: 1.5 },
                headStyles: { fillColor: [9, 35, 94], textColor: 255 },
                theme: "striped"
            });

            y = doc.lastAutoTable.finalY + 10;
        });

        doc.addPage();
        y = 18;
        doc.setFontSize(14);
        doc.setFont(undefined, "bold");
        doc.text("Llaves finales", margin, y);
        y += 8;

        torneoData.llaves.rondas.forEach(ronda => {
            if (y > pageH - 40) {
                doc.addPage();
                y = 18;
            }

            doc.setFontSize(11);
            doc.setFont(undefined, "bold");
            doc.text(ronda.titulo, margin, y);
            y += 2;

            const filasLlave = ronda.partidos.map((partido, idx) => {
                const top = getNombreEnSlot(ronda.id, partido.id, "top");
                const bottom = getNombreEnSlot(ronda.id, partido.id, "bottom");
                const ganador = getGanadorPartidoLlave(ronda.id, partido.id);
                const etiqueta = partido.id || `Final`;
                return [
                    etiqueta,
                    top,
                    "vs",
                    bottom,
                    ganador ? ganador : "Sin elegir"
                ];
            });

            doc.autoTable({
                head: [["Partido", "Equipo 1", "", "Equipo 2", "Ganador elegido"]],
                body: filasLlave,
                startY: y,
                margin: { left: margin, right: margin },
                styles: { fontSize: 8, cellPadding: 1.5 },
                headStyles: { fillColor: [13, 59, 142], textColor: 255 },
                columnStyles: {
                    2: { cellWidth: 8, halign: "center" }
                },
                theme: "grid"
            });

            y = doc.lastAutoTable.finalY + 10;
        });

        return doc;
    }

    function createPdfBlobForRegistration() {
        if (!window.jspdf?.jsPDF) {
            return null;
        }
        try {
            const doc = buildPdfDocument();
            return doc.output("blob");
        } catch (error) {
            console.error("Error creando el PDF:", error);
            return null;
        }
    }

    function updateRegistrationAttachmentPreview() {
        const preview = document.getElementById("pdf-attachment-preview");
        if (!preview) return;
        if (registrationCompleted) {
            preview.textContent = `Formulario enviado. Adjunte: ${registrationPdfFileName}`;
        } else {
            preview.textContent = registrationPdfBlob ? `Adjunto: ${registrationPdfFileName}` : "Generando PDF listo para adjuntar...";
        }
    }

    function prepareRegistrationFormPDF() {
        registrationPdfFileName = `polla-mundial-2026-${new Date().toISOString().slice(0, 10)}.pdf`;
        const blob = createPdfBlobForRegistration();
        if (blob) {
            registrationPdfBlob = new File([blob], registrationPdfFileName, { type: "application/pdf" });
        }
        updateRegistrationAttachmentPreview();
    }

    function downloadRegistrationPdf() {
        if (!registrationPdfBlob) {
            alert("El PDF aún no está listo. Intenta de nuevo en unos segundos.");
            return;
        }
        const url = URL.createObjectURL(registrationPdfBlob);
        const enlace = document.createElement("a");
        enlace.href = url;
        enlace.download = registrationPdfFileName;
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);
        URL.revokeObjectURL(url);
    }

    function exportarPDF() {
        if (!tienePodioDefinido()) {
            alert("Para exportar, elige el ganador de la Gran Final (pestaña Llaves → Final). El podio debe mostrar campeón y subcampeón.");
            return;
        }

        if (!window.jspdf?.jsPDF) {
            alert("No se pudo cargar la librería PDF. Recarga la página e intenta de nuevo.");
            return;
        }

        const btn = document.getElementById("btn-exportar-pdf");
        if (btn) {
            btn.disabled = true;
            btn.textContent = "Generando PDF...";
        }

        try {
            const doc = buildPdfDocument();
            const nombreArchivo = `polla-mundial-2026-${new Date().toISOString().slice(0, 10)}.pdf`;
            doc.save(nombreArchivo);
        } catch (error) {
            console.error("Error al exportar PDF:", error);
            alert("Ocurrió un error al generar el PDF. Revisa la consola para más detalles.");
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.textContent = "Exportar PDF completo";
            }
        }
    }

    function escapeCsvValue(value) {
        const text = String(value ?? "");
        if (/[";\n\r]/.test(text)) {
            return `"${text.replace(/"/g, '""')}"`;
        }
        return text;
    }

    function buildGroupStageCsv() {
        const headers = ["Grupo", "Local", "Visitante", "Goles Local", "Goles Visitante", "Jugado"];
        const rows = [headers];

        Object.keys(torneoData.grupos).sort().forEach(letra => {
            const grupo = torneoData.grupos[letra];
            grupo.partidos.forEach(partido => {
                rows.push([
                    letra,
                    partido.local,
                    partido.visitante,
                    partido.golesLocal ?? 0,
                    partido.golesVisitante ?? 0,
                    partido.jugado ? "Sí" : "No"
                ]);
            });
        });

        return rows.map(row => row.map(escapeCsvValue).join(";")).join("\r\n");
    }

    function descargarGruposCsv() {
        const csvContent = buildGroupStageCsv();
        const blob = new Blob(["\uFEFF", csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const enlace = document.createElement("a");
        enlace.href = url;
        enlace.download = `partidos-fase-grupos-2026-${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);
        URL.revokeObjectURL(url);
    }

    // ==========================================================
    // EVENTOS
    // ==========================================================
    document.body.addEventListener("click", (e) => {
        const bracketTarget = e.target.closest?.(".team-row-clickable");
        if (bracketTarget) {
            handleBracketClick(bracketTarget);
            return;
        }

        const filaMarcador = e.target.closest?.(".match-row");
        if (filaMarcador && !e.target.closest?.("button.btn-counter")) {
            confirmarMarcadorDesdeFila(filaMarcador);
            return;
        }

        const boton = e.target.closest?.("button.btn-counter");
        if (!boton) return;

        const fila = boton.closest(".match-row");
        if (!fila) return;

        const tipoId = boton.getAttribute("data-type");
        const display = fila.querySelector(`.score-display[data-type="${tipoId}"]`);
        if (!display) return;

        let val = parseInt(display.textContent, 10) || 0;
        if (boton.classList.contains("plus") && val < 15) val++;
        else if (boton.classList.contains("minus") && val > 0) val--;
        display.textContent = val;

        const local = fila.querySelector(".team-name.left").textContent.trim();
        const vis = fila.querySelector(".team-name.right").textContent.trim();
        const golesLocal = parseInt(fila.querySelector('.score-display[data-type="local"]').textContent, 10) || 0;
        const golesVisitante = parseInt(fila.querySelector('.score-display[data-type="visitante"]').textContent, 10) || 0;

        for (const g in torneoData.grupos) {
            const p = torneoData.grupos[g].partidos.find(x => x.local === local && x.visitante === vis);
            if (p) {
                aplicarMarcadorAPartido(p, golesLocal, golesVisitante);
                fila.classList.add("partido-confirmado");
                calcularTablaYActualizar();
                guardarMarcadoresEnLocalStorage();
                break;
            }
        }
    });

    document.querySelectorAll(".tab").forEach(boton => {
        boton.addEventListener("click", () => {
            document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
            document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
            boton.classList.add("active");
            document.getElementById(boton.getAttribute("data-target")).classList.add("active");
        });
    });

    document.getElementById("group-selector-nav")?.addEventListener("click", (e) => {
        const boton = e.target.closest(".selector-btn");
        if (!boton) return;
        document.querySelectorAll(".selector-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".group-card").forEach(t => t.classList.remove("active"));
        boton.classList.add("active");
        document.getElementById(`card-grupo-${boton.getAttribute("data-group")}`)?.classList.add("active");
    });

    document.getElementById("ronda-selector-nav")?.addEventListener("click", (e) => {
        const boton = e.target.closest(".ronda-btn");
        if (!boton) return;
        document.querySelectorAll(".ronda-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".bracket-column").forEach(c => c.classList.remove("active"));
        boton.classList.add("active");
        document.getElementById(`ronda-${boton.getAttribute("data-ronda")}`)?.classList.add("active");
    });

    document.getElementById("btn-exportar-pdf")?.addEventListener("click", exportarPDF);
    document.getElementById("btn-exportar-grupos-csv")?.addEventListener("click", descargarGruposCsv);
    document.getElementById("btn-open-registration-form")?.addEventListener("click", openRegistrationForm);
    document.getElementById("btn-download-registration-pdf")?.addEventListener("click", downloadRegistrationPdf);
    document.getElementById("close-registration-form")?.addEventListener("click", hideRegistrationForm);
    document.getElementById("registration-backdrop")?.addEventListener("click", hideRegistrationForm);
    document.getElementById("registration-form")?.addEventListener("submit", handleRegistrationSubmit);
    document.getElementById("btn-new-polla")?.addEventListener("click", resetAppToInitialState);

    // ==========================================================
    // INICIALIZACIÓN
    // ==========================================================
    normalizarPartidosGrupo();
    renderizarGrupos();
    renderizarLlaves();
    preserveBracketPlaceholders();
    cargarMarcadoresGuardados();
    actualizarVisibilidadExportar();
});