document.addEventListener("DOMContentLoaded", () => {
    const STORAGE_KEY = "polla_mundial_2026";

    let savedBracketWinners = [];

const THIRD_PLACE_TABLE = {
  "ABCDEFGH": ["H","G","B","C","A","F","D","E"],
  "ABCDEFGI": ["C","G","B","D","A","F","E","I"],
  "ABCDEFGJ": ["C","G","B","D","A","F","E","J"],
  "ABCDEFGK": ["C","G","B","D","A","F","E","K"],
  "ABCDEFGL": ["C","G","B","D","A","F","L","E"],
  "ABCDEFHI": ["H","E","B","C","A","F","D","I"],
  "ABCDEFHJ": ["H","J","B","C","A","F","D","E"],
  "ABCDEFHK": ["H","E","B","C","A","F","D","K"],
  "ABCDEFHL": ["H","F","B","C","A","D","L","E"],
  "ABCDEFIJ": ["C","J","B","D","A","F","E","I"],
  "ABCDEFIK": ["C","E","B","D","A","F","I","K"],
  "ABCDEFIL": ["C","E","B","D","A","F","L","I"],
  "ABCDEFJK": ["C","J","B","D","A","F","E","K"],
  "ABCDEFJL": ["C","J","B","D","A","F","L","E"],
  "ABCDEFKL": ["C","E","B","D","A","F","L","K"],
  "ABCDEGHI": ["H","G","B","C","A","D","E","I"],
  "ABCDEGHJ": ["H","G","B","C","A","D","E","J"],
  "ABCDEGHK": ["H","G","B","C","A","D","E","K"],
  "ABCDEGHL": ["H","G","B","C","A","D","L","E"],
  "ABCDEGIJ": ["E","G","B","C","A","D","I","J"],
  "ABCDEGIK": ["E","G","B","C","A","D","I","K"],
  "ABCDEGIL": ["E","G","B","C","A","D","L","I"],
  "ABCDEGJK": ["E","G","B","C","A","D","J","K"],
  "ABCDEGJL": ["E","G","B","C","A","D","L","J"],
  "ABCDEGKL": ["E","G","B","C","A","D","L","K"],
  "ABCDEHIJ": ["H","J","B","C","A","D","E","I"],
  "ABCDEHIK": ["H","E","B","C","A","D","I","K"],
  "ABCDEHIL": ["H","E","B","C","A","D","L","I"],
  "ABCDEHJK": ["H","J","B","C","A","D","E","K"],
  "ABCDEHJL": ["H","J","B","C","A","D","L","E"],
  "ABCDEHKL": ["H","E","B","C","A","D","L","K"],
  "ABCDEIJK": ["E","J","B","C","A","D","I","K"],
  "ABCDEIJL": ["E","J","B","C","A","D","L","I"],
  "ABCDEIKL": ["E","I","B","C","A","D","L","K"],
  "ABCDEJKL": ["E","J","B","C","A","D","L","K"],
  "ABCDFGHI": ["H","G","B","C","A","F","D","I"],
  "ABCDFGHJ": ["H","G","B","C","A","F","D","J"],
  "ABCDFGHK": ["H","G","B","C","A","F","D","K"],
  "ABCDFGHL": ["C","G","B","D","A","F","L","H"],
  "ABCDFGIJ": ["C","G","B","D","A","F","I","J"],
  "ABCDFGIK": ["C","G","B","D","A","F","I","K"],
  "ABCDFGIL": ["C","G","B","D","A","F","L","I"],
  "ABCDFGJK": ["C","G","B","D","A","F","J","K"],
  "ABCDFGJL": ["C","G","B","D","A","F","L","J"],
  "ABCDFGKL": ["C","G","B","D","A","F","L","K"],
  "ABCDFHIJ": ["H","J","B","C","A","F","D","I"],
  "ABCDFHIK": ["H","F","B","C","A","D","I","K"],
  "ABCDFHIL": ["H","F","B","C","A","D","L","I"],
  "ABCDFHJK": ["H","J","B","C","A","F","D","K"],
  "ABCDFHJL": ["C","J","B","D","A","F","L","H"],
  "ABCDFHKL": ["H","F","B","C","A","D","L","K"],
  "ABCDFIJK": ["C","J","B","D","A","F","I","K"],
  "ABCDFIJL": ["C","J","B","D","A","F","L","I"],
  "ABCDFIKL": ["C","I","B","D","A","F","L","K"],
  "ABCDFJKL": ["C","J","B","D","A","F","L","K"],
  "ABCDGHIJ": ["H","G","B","C","A","D","I","J"],
  "ABCDGHIK": ["H","G","B","C","A","D","I","K"],
  "ABCDGHIL": ["H","G","B","C","A","D","L","I"],
  "ABCDGHJK": ["H","G","B","C","A","D","J","K"],
  "ABCDGHJL": ["H","G","B","C","A","D","L","J"],
  "ABCDGHKL": ["H","G","B","C","A","D","L","K"],
  "ABCDGIJK": ["C","J","B","D","A","G","I","K"],
  "ABCDGIJL": ["C","J","B","D","A","G","L","I"],
  "ABCDGIKL": ["I","G","B","C","A","D","L","K"],
  "ABCDGJKL": ["C","J","B","D","A","G","L","K"],
  "ABCDHIJK": ["H","J","B","C","A","D","I","K"],
  "ABCDHIJL": ["H","J","B","C","A","D","L","I"],
  "ABCDHIKL": ["H","I","B","C","A","D","L","K"],
  "ABCDHJKL": ["H","J","B","C","A","D","L","K"],
  "ABCDIJKL": ["I","J","B","C","A","D","L","K"],
  "ABCEFGHI": ["H","G","B","C","A","F","E","I"],
  "ABCEFGHJ": ["H","G","B","C","A","F","E","J"],
  "ABCEFGHK": ["H","G","B","C","A","F","E","K"],
  "ABCEFGHL": ["H","G","B","C","A","F","L","E"],
  "ABCEFGIJ": ["E","G","B","C","A","F","I","J"],
  "ABCEFGIK": ["E","G","B","C","A","F","I","K"],
  "ABCEFGIL": ["E","G","B","C","A","F","L","I"],
  "ABCEFGJK": ["E","G","B","C","A","F","J","K"],
  "ABCEFGJL": ["E","G","B","C","A","F","L","J"],
  "ABCEFGKL": ["E","G","B","C","A","F","L","K"],
  "ABCEFHIJ": ["H","J","B","C","A","F","E","I"],
  "ABCEFHIK": ["H","E","B","C","A","F","I","K"],
  "ABCEFHIL": ["H","E","B","C","A","F","L","I"],
  "ABCEFHJK": ["H","J","B","C","A","F","E","K"],
  "ABCEFHJL": ["H","J","B","C","A","F","L","E"],
  "ABCEFHKL": ["H","E","B","C","A","F","L","K"],
  "ABCEFIJK": ["E","J","B","C","A","F","I","K"],
  "ABCEFIJL": ["E","J","B","C","A","F","L","I"],
  "ABCEFIKL": ["E","I","B","C","A","F","L","K"],
  "ABCEFJKL": ["E","J","B","C","A","F","L","K"],
  "ABCEGHIJ": ["H","J","B","C","A","G","E","I"],
  "ABCEGHIK": ["E","G","B","C","A","H","I","K"],
  "ABCEGHIL": ["E","G","B","C","A","H","L","I"],
  "ABCEGHJK": ["H","J","B","C","A","G","E","K"],
  "ABCEGHJL": ["H","J","B","C","A","G","L","E"],
  "ABCEGHKL": ["E","G","B","C","A","H","L","K"],
  "ABCEGIJK": ["E","J","B","C","A","G","I","K"],
  "ABCEGIJL": ["E","J","B","C","A","G","L","I"],
  "ABCEGIKL": ["E","G","B","A","I","C","L","K"],
  "ABCEGJKL": ["E","J","B","C","A","G","L","K"],
  "ABCEHIJK": ["E","J","B","C","A","H","I","K"],
  "ABCEHIJL": ["E","J","B","C","A","H","L","I"],
  "ABCEHIKL": ["E","I","B","C","A","H","L","K"],
  "ABCEHJKL": ["E","J","B","C","A","H","L","K"],
  "ABCEIJKL": ["E","J","B","A","I","C","L","K"],
  "ABCFGHIJ": ["H","G","B","C","A","F","I","J"],
  "ABCFGHIK": ["H","G","B","C","A","F","I","K"],
  "ABCFGHIL": ["H","G","B","C","A","F","L","I"],
  "ABCFGHJK": ["H","G","B","C","A","F","J","K"],
  "ABCFGHJL": ["H","G","B","C","A","F","L","J"],
  "ABCFGHKL": ["H","G","B","C","A","F","L","K"],
  "ABCFGIJK": ["C","J","B","F","A","G","I","K"],
  "ABCFGIJL": ["C","J","B","F","A","G","L","I"],
  "ABCFGIKL": ["I","G","B","C","A","F","L","K"],
  "ABCFGJKL": ["C","J","B","F","A","G","L","K"],
  "ABCFHIJK": ["H","J","B","C","A","F","I","K"],
  "ABCFHIJL": ["H","J","B","C","A","F","L","I"],
  "ABCFHIKL": ["H","I","B","C","A","F","L","K"],
  "ABCFHJKL": ["H","J","B","C","A","F","L","K"],
  "ABCFIJKL": ["I","J","B","C","A","F","L","K"],
  "ABCGHIJK": ["H","J","B","C","A","G","I","K"],
  "ABCGHIJL": ["H","J","B","C","A","G","L","I"],
  "ABCGHIKL": ["I","G","B","C","A","H","L","K"],
  "ABCGHJKL": ["H","J","B","C","A","G","L","K"],
  "ABCGIJKL": ["I","J","B","C","A","G","L","K"],
  "ABCHIJKL": ["I","J","B","C","A","H","L","K"],
  "ABDEFGHI": ["H","G","B","D","A","F","E","I"],
  "ABDEFGHJ": ["H","G","B","D","A","F","E","J"],
  "ABDEFGHK": ["H","G","B","D","A","F","E","K"],
  "ABDEFGHL": ["H","G","B","D","A","F","L","E"],
  "ABDEFGIJ": ["E","G","B","D","A","F","I","J"],
  "ABDEFGIK": ["E","G","B","D","A","F","I","K"],
  "ABDEFGIL": ["E","G","B","D","A","F","L","I"],
  "ABDEFGJK": ["E","G","B","D","A","F","J","K"],
  "ABDEFGJL": ["E","G","B","D","A","F","L","J"],
  "ABDEFGKL": ["E","G","B","D","A","F","L","K"],
  "ABDEFHIJ": ["H","J","B","D","A","F","E","I"],
  "ABDEFHIK": ["H","E","B","D","A","F","I","K"],
  "ABDEFHIL": ["H","E","B","D","A","F","L","I"],
  "ABDEFHJK": ["H","J","B","D","A","F","E","K"],
  "ABDEFHJL": ["H","J","B","D","A","F","L","E"],
  "ABDEFHKL": ["H","E","B","D","A","F","L","K"],
  "ABDEFIJK": ["E","J","B","D","A","F","I","K"],
  "ABDEFIJL": ["E","J","B","D","A","F","L","I"],
  "ABDEFIKL": ["E","I","B","D","A","F","L","K"],
  "ABDEFJKL": ["E","J","B","D","A","F","L","K"],
  "ABDEGHIJ": ["H","J","B","D","A","G","E","I"],
  "ABDEGHIK": ["E","G","B","D","A","H","I","K"],
  "ABDEGHIL": ["E","G","B","D","A","H","L","I"],
  "ABDEGHJK": ["H","J","B","D","A","G","E","K"],
  "ABDEGHJL": ["H","J","B","D","A","G","L","E"],
  "ABDEGHKL": ["E","G","B","D","A","H","L","K"],
  "ABDEGIJK": ["E","J","B","D","A","G","I","K"],
  "ABDEGIJL": ["E","J","B","D","A","G","L","I"],
  "ABDEGIKL": ["E","G","B","A","I","D","L","K"],
  "ABDEGJKL": ["E","J","B","D","A","G","L","K"],
  "ABDEHIJK": ["E","J","B","D","A","H","I","K"],
  "ABDEHIJL": ["E","J","B","D","A","H","L","I"],
  "ABDEHIKL": ["E","I","B","D","A","H","L","K"],
  "ABDEHJKL": ["E","J","B","D","A","H","L","K"],
  "ABDEIJKL": ["E","J","B","A","I","D","L","K"],
  "ABDFGHIJ": ["H","G","B","D","A","F","I","J"],
  "ABDFGHIK": ["H","G","B","D","A","F","I","K"],
  "ABDFGHIL": ["H","G","B","D","A","F","L","I"],
  "ABDFGHJK": ["H","G","B","D","A","F","J","K"],
  "ABDFGHJL": ["H","G","B","D","A","F","L","J"],
  "ABDFGHKL": ["H","G","B","D","A","F","L","K"],
  "ABDFGIJK": ["F","J","B","D","A","G","I","K"],
  "ABDFGIJL": ["F","J","B","D","A","G","L","I"],
  "ABDFGIKL": ["I","G","B","D","A","F","L","K"],
  "ABDFGJKL": ["F","J","B","D","A","G","L","K"],
  "ABDFHIJK": ["H","J","B","D","A","F","I","K"],
  "ABDFHIJL": ["H","J","B","D","A","F","L","I"],
  "ABDFHIKL": ["H","I","B","D","A","F","L","K"],
  "ABDFHJKL": ["H","J","B","D","A","F","L","K"],
  "ABDFIJKL": ["I","J","B","D","A","F","L","K"],
  "ABDGHIJK": ["H","J","B","D","A","G","I","K"],
  "ABDGHIJL": ["H","J","B","D","A","G","L","I"],
  "ABDGHIKL": ["I","G","B","D","A","H","L","K"],
  "ABDGHJKL": ["H","J","B","D","A","G","L","K"],
  "ABDGIJKL": ["I","J","B","D","A","G","L","K"],
  "ABDHIJKL": ["I","J","B","D","A","H","L","K"],
  "ABEFGHIJ": ["H","J","B","F","A","G","E","I"],
  "ABEFGHIK": ["E","G","B","F","A","H","I","K"],
  "ABEFGHIL": ["E","G","B","F","A","H","L","I"],
  "ABEFGHJK": ["H","J","B","F","A","G","E","K"],
  "ABEFGHJL": ["H","J","B","F","A","G","L","E"],
  "ABEFGHKL": ["E","G","B","F","A","H","L","K"],
  "ABEFGIJK": ["E","J","B","F","A","G","I","K"],
  "ABEFGIJL": ["E","J","B","F","A","G","L","I"],
  "ABEFGIKL": ["E","G","B","A","I","F","L","K"],
  "ABEFGJKL": ["E","J","B","F","A","G","L","K"],
  "ABEFHIJK": ["E","J","B","F","A","H","I","K"],
  "ABEFHIJL": ["E","J","B","F","A","H","L","I"],
  "ABEFHIKL": ["E","I","B","F","A","H","L","K"],
  "ABEFHJKL": ["E","J","B","F","A","H","L","K"],
  "ABEFIJKL": ["E","J","B","A","I","F","L","K"],
  "ABEGHIJK": ["E","J","B","A","H","G","I","K"],
  "ABEGHIJL": ["E","J","B","A","H","G","L","I"],
  "ABEGHIKL": ["E","G","B","A","I","H","L","K"],
  "ABEGHJKL": ["E","J","B","A","H","G","L","K"],
  "ABEGIJKL": ["E","J","B","A","I","G","L","K"],
  "ABEHIJKL": ["E","J","B","A","I","H","L","K"],
  "ABFGHIJK": ["H","J","B","F","A","G","I","K"],
  "ABFGHIJL": ["H","J","B","F","A","G","L","I"],
  "ABFGHIKL": ["H","G","B","A","I","F","L","K"],
  "ABFGHJKL": ["H","J","B","F","A","G","L","K"],
  "ABFGIJKL": ["I","J","B","F","A","G","L","K"],
  "ABFHIJKL": ["H","J","B","A","I","F","L","K"],
  "ABGHIJKL": ["H","J","B","A","I","G","L","K"],
  "ACDEFGHI": ["H","G","E","C","A","F","D","I"],
  "ACDEFGHJ": ["H","G","J","C","A","F","D","E"],
  "ACDEFGHK": ["H","G","E","C","A","F","D","K"],
  "ACDEFGHL": ["H","G","F","C","A","D","L","E"],
  "ACDEFGIJ": ["C","G","J","D","A","F","E","I"],
  "ACDEFGIK": ["C","G","E","D","A","F","I","K"],
  "ACDEFGIL": ["C","G","E","D","A","F","L","I"],
  "ACDEFGJK": ["C","G","J","D","A","F","E","K"],
  "ACDEFGJL": ["C","G","J","D","A","F","L","E"],
  "ACDEFGKL": ["C","G","E","D","A","F","L","K"],
  "ACDEFHIJ": ["H","J","E","C","A","F","D","I"],
  "ACDEFHIK": ["H","E","F","C","A","D","I","K"],
  "ACDEFHIL": ["H","E","F","C","A","D","L","I"],
  "ACDEFHJK": ["H","J","E","C","A","F","D","K"],
  "ACDEFHJL": ["H","J","F","C","A","D","L","E"],
  "ACDEFHKL": ["H","E","F","C","A","D","L","K"],
  "ACDEFIJK": ["C","J","E","D","A","F","I","K"],
  "ACDEFIJL": ["C","J","E","D","A","F","L","I"],
  "ACDEFIKL": ["C","E","I","D","A","F","L","K"],
  "ACDEFJKL": ["C","J","E","D","A","F","L","K"],
  "ACDEGHIJ": ["H","G","J","C","A","D","E","I"],
  "ACDEGHIK": ["H","G","E","C","A","D","I","K"],
  "ACDEGHIL": ["H","G","E","C","A","D","L","I"],
  "ACDEGHJK": ["H","G","J","C","A","D","E","K"],
  "ACDEGHJL": ["H","G","J","C","A","D","L","E"],
  "ACDEGHKL": ["H","G","E","C","A","D","L","K"],
  "ACDEGIJK": ["E","G","J","C","A","D","I","K"],
  "ACDEGIJL": ["E","G","J","C","A","D","L","I"],
  "ACDEGIKL": ["E","G","I","C","A","D","L","K"],
  "ACDEGJKL": ["E","G","J","C","A","D","L","K"],
  "ACDEHIJK": ["H","J","E","C","A","D","I","K"],
  "ACDEHIJL": ["H","J","E","C","A","D","L","I"],
  "ACDEHIKL": ["H","E","I","C","A","D","L","K"],
  "ACDEHJKL": ["H","J","E","C","A","D","L","K"],
  "ACDEIJKL": ["E","J","I","C","A","D","L","K"],
  "ACDFGHIJ": ["H","G","J","C","A","F","D","I"],
  "ACDFGHIK": ["H","G","F","C","A","D","I","K"],
  "ACDFGHIL": ["H","G","F","C","A","D","L","I"],
  "ACDFGHJK": ["H","G","J","C","A","F","D","K"],
  "ACDFGHJL": ["C","G","J","D","A","F","L","H"],
  "ACDFGHKL": ["H","G","F","C","A","D","L","K"],
  "ACDFGIJK": ["C","G","J","D","A","F","I","K"],
  "ACDFGIJL": ["C","G","J","D","A","F","L","I"],
  "ACDFGIKL": ["C","G","I","D","A","F","L","K"],
  "ACDFGJKL": ["C","G","J","D","A","F","L","K"],
  "ACDFHIJK": ["H","J","F","C","A","D","I","K"],
  "ACDFHIJL": ["H","J","F","C","A","D","L","I"],
  "ACDFHIKL": ["H","F","I","C","A","D","L","K"],
  "ACDFHJKL": ["H","J","F","C","A","D","L","K"],
  "ACDFIJKL": ["C","J","I","D","A","F","L","K"],
  "ACDGHIJK": ["H","G","J","C","A","D","I","K"],
  "ACDGHIJL": ["H","G","J","C","A","D","L","I"],
  "ACDGHIKL": ["H","G","I","C","A","D","L","K"],
  "ACDGHJKL": ["H","G","J","C","A","D","L","K"],
  "ACDGIJKL": ["I","G","J","C","A","D","L","K"],
  "ACDHIJKL": ["H","J","I","C","A","D","L","K"],
  "ACEFGHIJ": ["H","G","J","C","A","F","E","I"],
  "ACEFGHIK": ["H","G","E","C","A","F","I","K"],
  "ACEFGHIL": ["H","G","E","C","A","F","L","I"],
  "ACEFGHJK": ["H","G","J","C","A","F","E","K"],
  "ACEFGHJL": ["H","G","J","C","A","F","L","E"],
  "ACEFGHKL": ["H","G","E","C","A","F","L","K"],
  "ACEFGIJK": ["E","G","J","C","A","F","I","K"],
  "ACEFGIJL": ["E","G","J","C","A","F","L","I"],
  "ACEFGIKL": ["E","G","I","C","A","F","L","K"],
  "ACEFGJKL": ["E","G","J","C","A","F","L","K"],
  "ACEFHIJK": ["H","J","E","C","A","F","I","K"],
  "ACEFHIJL": ["H","J","E","C","A","F","L","I"],
  "ACEFHIKL": ["H","E","I","C","A","F","L","K"],
  "ACEFHJKL": ["H","J","E","C","A","F","L","K"],
  "ACEFIJKL": ["E","J","I","C","A","F","L","K"],
  "ACEGHIJK": ["E","G","J","C","A","H","I","K"],
  "ACEGHIJL": ["E","G","J","C","A","H","L","I"],
  "ACEGHIKL": ["E","G","I","C","A","H","L","K"],
  "ACEGHJKL": ["E","G","J","C","A","H","L","K"],
  "ACEGIJKL": ["E","J","I","C","A","G","L","K"],
  "ACEHIJKL": ["E","J","I","C","A","H","L","K"],
  "ACFGHIJK": ["H","G","J","C","A","F","I","K"],
  "ACFGHIJL": ["H","G","J","C","A","F","L","I"],
  "ACFGHIKL": ["H","G","I","C","A","F","L","K"],
  "ACFGHJKL": ["H","G","J","C","A","F","L","K"],
  "ACFGIJKL": ["I","G","J","C","A","F","L","K"],
  "ACFHIJKL": ["H","J","I","C","A","F","L","K"],
  "ACGHIJKL": ["H","J","I","C","A","G","L","K"],
  "ADEFGHIJ": ["H","G","J","D","A","F","E","I"],
  "ADEFGHIK": ["H","G","E","D","A","F","I","K"],
  "ADEFGHIL": ["H","G","E","D","A","F","L","I"],
  "ADEFGHJK": ["H","G","J","D","A","F","E","K"],
  "ADEFGHJL": ["H","G","J","D","A","F","L","E"],
  "ADEFGHKL": ["H","G","E","D","A","F","L","K"],
  "ADEFGIJK": ["E","G","J","D","A","F","I","K"],
  "ADEFGIJL": ["E","G","J","D","A","F","L","I"],
  "ADEFGIKL": ["E","G","I","D","A","F","L","K"],
  "ADEFGJKL": ["E","G","J","D","A","F","L","K"],
  "ADEFHIJK": ["H","J","E","D","A","F","I","K"],
  "ADEFHIJL": ["H","J","E","D","A","F","L","I"],
  "ADEFHIKL": ["H","E","I","D","A","F","L","K"],
  "ADEFHJKL": ["H","J","E","D","A","F","L","K"],
  "ADEFIJKL": ["E","J","I","D","A","F","L","K"],
  "ADEGHIJK": ["E","G","J","D","A","H","I","K"],
  "ADEGHIJL": ["E","G","J","D","A","H","L","I"],
  "ADEGHIKL": ["E","G","I","D","A","H","L","K"],
  "ADEGHJKL": ["E","G","J","D","A","H","L","K"],
  "ADEGIJKL": ["E","J","I","D","A","G","L","K"],
  "ADEHIJKL": ["E","J","I","D","A","H","L","K"],
  "ADFGHIJK": ["H","G","J","D","A","F","I","K"],
  "ADFGHIJL": ["H","G","J","D","A","F","L","I"],
  "ADFGHIKL": ["H","G","I","D","A","F","L","K"],
  "ADFGHJKL": ["H","G","J","D","A","F","L","K"],
  "ADFGIJKL": ["I","G","J","D","A","F","L","K"],
  "ADFHIJKL": ["H","J","I","D","A","F","L","K"],
  "ADGHIJKL": ["H","J","I","D","A","G","L","K"],
  "AEFGHIJK": ["E","G","J","F","A","H","I","K"],
  "AEFGHIJL": ["E","G","J","F","A","H","L","I"],
  "AEFGHIKL": ["E","G","I","F","A","H","L","K"],
  "AEFGHJKL": ["E","G","J","F","A","H","L","K"],
  "AEFGIJKL": ["E","J","I","F","A","G","L","K"],
  "AEFHIJKL": ["E","J","I","F","A","H","L","K"],
  "AEGHIJKL": ["E","J","I","A","H","G","L","K"],
  "AFGHIJKL": ["H","J","I","F","A","G","L","K"],
  "BCDEFGHI": ["C","G","B","D","H","F","E","I"],
  "BCDEFGHJ": ["H","G","B","C","J","F","D","E"],
  "BCDEFGHK": ["C","G","B","D","H","F","E","K"],
  "BCDEFGHL": ["C","G","B","D","H","F","L","E"],
  "BCDEFGIJ": ["C","G","B","D","J","F","E","I"],
  "BCDEFGIK": ["C","G","B","D","E","F","I","K"],
  "BCDEFGIL": ["C","G","B","D","E","F","L","I"],
  "BCDEFGJK": ["C","G","B","D","J","F","E","K"],
  "BCDEFGJL": ["C","G","B","D","J","F","L","E"],
  "BCDEFGKL": ["C","G","B","D","E","F","L","K"],
  "BCDEFHIJ": ["C","J","B","D","H","F","E","I"],
  "BCDEFHIK": ["C","E","B","D","H","F","I","K"],
  "BCDEFHIL": ["C","E","B","D","H","F","L","I"],
  "BCDEFHJK": ["C","J","B","D","H","F","E","K"],
  "BCDEFHJL": ["C","J","B","D","H","F","L","E"],
  "BCDEFHKL": ["C","E","B","D","H","F","L","K"],
  "BCDEFIJK": ["C","J","B","D","E","F","I","K"],
  "BCDEFIJL": ["C","J","B","D","E","F","L","I"],
  "BCDEFIKL": ["C","E","B","D","I","F","L","K"],
  "BCDEFJKL": ["C","J","B","D","E","F","L","K"],
  "BCDEGHIJ": ["H","G","B","C","J","D","E","I"],
  "BCDEGHIK": ["E","G","B","C","H","D","I","K"],
  "BCDEGHIL": ["E","G","B","C","H","D","L","I"],
  "BCDEGHJK": ["H","G","B","C","J","D","E","K"],
  "BCDEGHJL": ["H","G","B","C","J","D","L","E"],
  "BCDEGHKL": ["E","G","B","C","H","D","L","K"],
  "BCDEGIJK": ["E","G","B","C","J","D","I","K"],
  "BCDEGIJL": ["E","G","B","C","J","D","L","I"],
  "BCDEGIKL": ["E","G","B","C","I","D","L","K"],
  "BCDEGJKL": ["E","G","B","C","J","D","L","K"],
  "BCDEHIJK": ["E","J","B","C","H","D","I","K"],
  "BCDEHIJL": ["E","J","B","C","H","D","L","I"],
  "BCDEHIKL": ["E","I","B","C","H","D","L","K"],
  "BCDEHJKL": ["E","J","B","C","H","D","L","K"],
  "BCDEIJKL": ["E","J","B","C","I","D","L","K"],
  "BCDFGHIJ": ["H","G","B","C","J","F","D","I"],
  "BCDFGHIK": ["C","G","B","D","H","F","I","K"],
  "BCDFGHIL": ["C","G","B","D","H","F","L","I"],
  "BCDFGHJK": ["H","G","B","C","J","F","D","K"],
  "BCDFGHJL": ["C","G","B","D","H","F","L","J"],
  "BCDFGHKL": ["C","G","B","D","H","F","L","K"],
  "BCDFGIJK": ["C","G","B","D","J","F","I","K"],
  "BCDFGIJL": ["C","G","B","D","J","F","L","I"],
  "BCDFGIKL": ["C","G","B","D","I","F","L","K"],
  "BCDFGJKL": ["C","G","B","D","J","F","L","K"],
  "BCDFHIJK": ["C","J","B","D","H","F","I","K"],
  "BCDFHIJL": ["C","J","B","D","H","F","L","I"],
  "BCDFHIKL": ["C","I","B","D","H","F","L","K"],
  "BCDFHJKL": ["C","J","B","D","H","F","L","K"],
  "BCDFIJKL": ["C","J","B","D","I","F","L","K"],
  "BCDGHIJK": ["H","G","B","C","J","D","I","K"],
  "BCDGHIJL": ["H","G","B","C","J","D","L","I"],
  "BCDGHIKL": ["H","G","B","C","I","D","L","K"],
  "BCDGHJKL": ["H","G","B","C","J","D","L","K"],
  "BCDGIJKL": ["I","G","B","C","J","D","L","K"],
  "BCDHIJKL": ["H","J","B","C","I","D","L","K"],
  "BCEFGHIJ": ["H","G","B","C","J","F","E","I"],
  "BCEFGHIK": ["E","G","B","C","H","F","I","K"],
  "BCEFGHIL": ["E","G","B","C","H","F","L","I"],
  "BCEFGHJK": ["H","G","B","C","J","F","E","K"],
  "BCEFGHJL": ["H","G","B","C","J","F","L","E"],
  "BCEFGHKL": ["E","G","B","C","H","F","L","K"],
  "BCEFGIJK": ["E","G","B","C","J","F","I","K"],
  "BCEFGIJL": ["E","G","B","C","J","F","L","I"],
  "BCEFGIKL": ["E","G","B","C","I","F","L","K"],
  "BCEFGJKL": ["E","G","B","C","J","F","L","K"],
  "BCEFHIJK": ["E","J","B","C","H","F","I","K"],
  "BCEFHIJL": ["E","J","B","C","H","F","L","I"],
  "BCEFHIKL": ["E","I","B","C","H","F","L","K"],
  "BCEFHJKL": ["E","J","B","C","H","F","L","K"],
  "BCEFIJKL": ["E","J","B","C","I","F","L","K"],
  "BCEGHIJK": ["E","J","B","C","H","G","I","K"],
  "BCEGHIJL": ["E","J","B","C","H","G","L","I"],
  "BCEGHIKL": ["E","G","B","C","I","H","L","K"],
  "BCEGHJKL": ["E","J","B","C","H","G","L","K"],
  "BCEGIJKL": ["E","J","B","C","I","G","L","K"],
  "BCEHIJKL": ["E","J","B","C","I","H","L","K"],
  "BCFGHIJK": ["H","G","B","C","J","F","I","K"],
  "BCFGHIJL": ["H","G","B","C","J","F","L","I"],
  "BCFGHIKL": ["H","G","B","C","I","F","L","K"],
  "BCFGHJKL": ["H","G","B","C","J","F","L","K"],
  "BCFGIJKL": ["I","G","B","C","J","F","L","K"],
  "BCFHIJKL": ["H","J","B","C","I","F","L","K"],
  "BCGHIJKL": ["H","J","B","C","I","G","L","K"],
  "BDEFGHIJ": ["H","G","B","D","J","F","E","I"],
  "BDEFGHIK": ["E","G","B","D","H","F","I","K"],
  "BDEFGHIL": ["E","G","B","D","H","F","L","I"],
  "BDEFGHJK": ["H","G","B","D","J","F","E","K"],
  "BDEFGHJL": ["H","G","B","D","J","F","L","E"],
  "BDEFGHKL": ["E","G","B","D","H","F","L","K"],
  "BDEFGIJK": ["E","G","B","D","J","F","I","K"],
  "BDEFGIJL": ["E","G","B","D","J","F","L","I"],
  "BDEFGIKL": ["E","G","B","D","I","F","L","K"],
  "BDEFGJKL": ["E","G","B","D","J","F","L","K"],
  "BDEFHIJK": ["E","J","B","D","H","F","I","K"],
  "BDEFHIJL": ["E","J","B","D","H","F","L","I"],
  "BDEFHIKL": ["E","I","B","D","H","F","L","K"],
  "BDEFHJKL": ["E","J","B","D","H","F","L","K"],
  "BDEFIJKL": ["E","J","B","D","I","F","L","K"],
  "BDEGHIJK": ["E","J","B","D","H","G","I","K"],
  "BDEGHIJL": ["E","J","B","D","H","G","L","I"],
  "BDEGHIKL": ["E","G","B","D","I","H","L","K"],
  "BDEGHJKL": ["E","J","B","D","H","G","L","K"],
  "BDEGIJKL": ["E","J","B","D","I","G","L","K"],
  "BDEHIJKL": ["E","J","B","D","I","H","L","K"],
  "BDFGHIJK": ["H","G","B","D","J","F","I","K"],
  "BDFGHIJL": ["H","G","B","D","J","F","L","I"],
  "BDFGHIKL": ["H","G","B","D","I","F","L","K"],
  "BDFGHJKL": ["H","G","B","D","J","F","L","K"],
  "BDFGIJKL": ["I","G","B","D","J","F","L","K"],
  "BDFHIJKL": ["H","J","B","D","I","F","L","K"],
  "BDGHIJKL": ["H","J","B","D","I","G","L","K"],
  "BEFGHIJK": ["E","J","B","F","H","G","I","K"],
  "BEFGHIJL": ["E","J","B","F","H","G","L","I"],
  "BEFGHIKL": ["E","G","B","F","I","H","L","K"],
  "BEFGHJKL": ["E","J","B","F","H","G","L","K"],
  "BEFGIJKL": ["E","J","B","F","I","G","L","K"],
  "BEFHIJKL": ["E","J","B","F","I","H","L","K"],
  "BEGHIJKL": ["E","J","I","B","H","G","L","K"],
  "BFGHIJKL": ["H","J","B","F","I","G","L","K"],
  "CDEFGHIJ": ["C","G","J","D","H","F","E","I"],
  "CDEFGHIK": ["C","G","E","D","H","F","I","K"],
  "CDEFGHIL": ["C","G","E","D","H","F","L","I"],
  "CDEFGHJK": ["C","G","J","D","H","F","E","K"],
  "CDEFGHJL": ["C","G","J","D","H","F","L","E"],
  "CDEFGHKL": ["C","G","E","D","H","F","L","K"],
  "CDEFGIJK": ["C","G","E","D","J","F","I","K"],
  "CDEFGIJL": ["C","G","E","D","J","F","L","I"],
  "CDEFGIKL": ["C","G","E","D","I","F","L","K"],
  "CDEFGJKL": ["C","G","E","D","J","F","L","K"],
  "CDEFHIJK": ["C","J","E","D","H","F","I","K"],
  "CDEFHIJL": ["C","J","E","D","H","F","L","I"],
  "CDEFHIKL": ["C","E","I","D","H","F","L","K"],
  "CDEFHJKL": ["C","J","E","D","H","F","L","K"],
  "CDEFIJKL": ["C","J","E","D","I","F","L","K"],
  "CDEGHIJK": ["E","G","J","C","H","D","I","K"],
  "CDEGHIJL": ["E","G","J","C","H","D","L","I"],
  "CDEGHIKL": ["E","G","I","C","H","D","L","K"],
  "CDEGHJKL": ["E","G","J","C","H","D","L","K"],
  "CDEGIJKL": ["E","G","I","C","J","D","L","K"],
  "CDEHIJKL": ["E","J","I","C","H","D","L","K"],
  "CDFGHIJK": ["C","G","J","D","H","F","I","K"],
  "CDFGHIJL": ["C","G","J","D","H","F","L","I"],
  "CDFGHIKL": ["C","G","I","D","H","F","L","K"],
  "CDFGHJKL": ["C","G","J","D","H","F","L","K"],
  "CDFGIJKL": ["C","G","I","D","J","F","L","K"],
  "CDFHIJKL": ["C","J","I","D","H","F","L","K"],
  "CDGHIJKL": ["H","G","I","C","J","D","L","K"],
  "CEFGHIJK": ["E","G","J","C","H","F","I","K"],
  "CEFGHIJL": ["E","G","J","C","H","F","L","I"],
  "CEFGHIKL": ["E","G","I","C","H","F","L","K"],
  "CEFGHJKL": ["E","G","J","C","H","F","L","K"],
  "CEFGIJKL": ["E","G","I","C","J","F","L","K"],
  "CEFHIJKL": ["E","J","I","C","H","F","L","K"],
  "CEGHIJKL": ["E","J","I","C","H","G","L","K"],
  "CFGHIJKL": ["H","G","I","C","J","F","L","K"],
  "DEFGHIJK": ["E","G","J","D","H","F","I","K"],
  "DEFGHIJL": ["E","G","J","D","H","F","L","I"],
  "DEFGHIKL": ["E","G","I","D","H","F","L","K"],
  "DEFGHJKL": ["E","G","J","D","H","F","L","K"],
  "DEFGIJKL": ["E","G","I","D","J","F","L","K"],
  "DEFHIJKL": ["E","J","I","D","H","F","L","K"],
  "DEGHIJKL": ["E","J","I","D","H","G","L","K"],
  "DFGHIJKL": ["H","G","I","D","J","F","L","K"],
  "EFGHIJKL": ["E","J","I","F","H","G","L","K"]
};

const FIRST_PLACE_ORDER = ["A","B","D","E","G","I","K","L"];

function getThirdPlaceAllocation(qualifyingGroups) {
  const key = qualifyingGroups.slice().sort().join("");
  const alloc = THIRD_PLACE_TABLE[key];
  if (!alloc) return null;
  const result = {};
  for (let i = 0; i < FIRST_PLACE_ORDER.length; i++) {
    result[FIRST_PLACE_ORDER[i]] = alloc[i];
  }
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
                    team: ranking[2],
                    pts: stats.pts,
                    diff: stats.gf - stats.gc,
                    gf: stats.gf
                });
            }
        }

        thirdPlaces.sort((a, b) => {
            if (b.pts !== a.pts) return b.pts - a.pts;
            if (b.diff !== a.diff) return b.diff - a.diff;
            return b.gf - a.gf;
        });

        bracketSlotConfig.thirdPlaceSlots.forEach((slotId, index) => {
            const name = thirdPlaces[index]?.team || bracketPlaceholders.get(slotId) || "...";
            actualizarSlot(slotId, name);
        });
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