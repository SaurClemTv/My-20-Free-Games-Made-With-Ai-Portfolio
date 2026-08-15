(() => {
  const SAVE_KEY = "idle-cozy-fishing-v1";
  const PROFILE_INDEX = "idle-cozy-fishing-profiles";
  const SAVE_PREFIX = "idle-cozy-fishing-slot-";
  const SLIP_COUNT = 12;
  const START_UNLOCKED = 4;
  const BAIT_SCALE = 40;
  const START_COINS = 240;
  const OFFLINE_CAP_MS = 8 * 60 * 60 * 1000;
  const DAY_MS = 7 * 60 * 1000;

  const SEASONS = ["spring", "summer", "autumn", "winter"];
  const SEASON_LABEL = { spring: "Spring", summer: "Summer", autumn: "Autumn", winter: "Winter" };
  const TIDES = ["slack", "flood", "high", "ebb"];
  const TIDE_SAY = {
    slack: "the water holds its breath",
    flood: "the tide is climbing",
    high: "high water, full of gossip",
    ebb: "the tide is leaving gifts",
  };
  const WEATHERS = {
    spring: ["sunny", "rain", "wind"],
    summer: ["sunny", "sunny", "rain"],
    autumn: ["sunny", "wind", "fog"],
    winter: ["snow", "sunny", "fog"],
  };
  const WEATHER_SAY = {
    sunny: "calm and kind",
    rain: "a soft rain",
    wind: "a busy wind",
    snow: "quiet snow",
    fog: "a polite fog",
  };

  const FISH = [
    { id: "minnow", name: "Minnow", bite: 5000, cost: 2, sell: 6, unlock: 0, seasons: ["spring", "summer"], kind: "creek", art: "minnow", hint: "A polite first nibble." },
    { id: "perch", name: "Perch", bite: 7000, cost: 3, sell: 8, unlock: 12, seasons: ["spring", "autumn"], kind: "creek", art: "perch", hint: "Stripes like a Sunday vest." },
    { id: "sunfish", name: "Sunfish", bite: 8000, cost: 4, sell: 11, unlock: 28, seasons: ["summer"], kind: "creek", art: "sunfish", hint: "A little lantern with fins." },
    { id: "clam", name: "Clam", bite: 9000, cost: 5, sell: 14, unlock: 36, seasons: ["spring", "summer", "autumn"], kind: "shore", art: "crab", hint: "Keeps its own counsel." },
    { id: "shrimp", name: "Shrimp", bite: 9000, cost: 6, sell: 17, unlock: 55, seasons: ["summer"], kind: "shore", art: "shrimp", hint: "Pink commas in the shallows." },
    { id: "trout", name: "Trout", bite: 12000, cost: 8, sell: 22, unlock: 70, seasons: ["spring", "autumn"], kind: "river", art: "trout", hint: "Speckled as a good story." },
    { id: "crab", name: "Crab", bite: 14000, cost: 10, sell: 28, unlock: 95, seasons: ["summer", "autumn"], kind: "shore", art: "crab", hint: "Walks sideways toward lunch." },
    { id: "catfish", name: "Catfish", bite: 16000, cost: 11, sell: 30, unlock: 110, seasons: ["summer", "autumn"], kind: "mud", art: "catfish", hint: "Whiskers and patience." },
    { id: "bass", name: "Bass", bite: 18000, cost: 12, sell: 32, unlock: 140, seasons: ["summer"], kind: "river", art: "bass", hint: "A mouth that means it." },
    { id: "carp", name: "Carp", bite: 20000, cost: 14, sell: 38, unlock: 180, seasons: ["autumn"], kind: "mud", art: "carp", hint: "Bronze that remembers mud." },
    { id: "eel", name: "Eel", bite: 22000, cost: 16, sell: 46, unlock: 220, seasons: ["autumn", "winter"], kind: "mud", art: "eel", hint: "A ribbon after dusk." },
    { id: "pike", name: "Pike", bite: 24000, cost: 18, sell: 50, unlock: 260, seasons: ["winter", "spring"], kind: "river", art: "pike", hint: "A green argument." },
    { id: "salmon", name: "Salmon", bite: 28000, cost: 22, sell: 62, unlock: 320, seasons: ["autumn"], kind: "river", art: "salmon", hint: "Coming home the long way." },
    { id: "lobster", name: "Lobster", bite: 36000, cost: 36, sell: 96, unlock: 480, seasons: ["summer", "autumn"], kind: "deep", art: "lobster", hint: "Armor for a feast." },
    { id: "koi", name: "Koi", bite: 40000, cost: 48, sell: 140, unlock: 620, seasons: ["spring"], kind: "pond", art: "koi", hint: "A painted wish." },
    { id: "tuna", name: "Tuna", bite: 48000, cost: 55, sell: 155, unlock: 780, seasons: ["summer"], kind: "deep", art: "bass", hint: "The open water's eldest." },
    { id: "moonfish", name: "Moonfish", bite: 80000, cost: 160, sell: 480, unlock: 1600, seasons: ["autumn", "winter"], kind: "magic", art: "moonfish", hint: "Opens only for dusk." },
    { id: "dace", name: "Dace", bite: 6000, cost: 3, sell: 7, unlock: 8, seasons: ["spring", "summer"], kind: "creek", art: "minnow", hint: "A minnow with opinions." },
    { id: "bluegill", name: "Bluegill", bite: 8500, cost: 5, sell: 13, unlock: 42, seasons: ["summer"], kind: "creek", art: "sunfish", hint: "A sunfish in a better vest." },
    { id: "brook", name: "Brook trout", bite: 13000, cost: 9, sell: 24, unlock: 88, seasons: ["spring", "autumn"], kind: "river", art: "trout", hint: "Speckles like a good map." },
    { id: "bullhead", name: "Bullhead", bite: 15000, cost: 10, sell: 27, unlock: 100, seasons: ["summer", "autumn"], kind: "mud", art: "catfish", hint: "Whiskers, smaller lecture." },
    { id: "flounder", name: "Flounder", bite: 17000, cost: 13, sell: 34, unlock: 155, seasons: ["summer", "autumn"], kind: "shore", art: "perch", hint: "Both eyes on the same joke." },
    { id: "oyster", name: "Oyster", bite: 20000, cost: 16, sell: 44, unlock: 210, seasons: ["autumn", "winter"], kind: "shore", art: "crab", hint: "A pearl sometimes pretends to live here." },
    { id: "mackerel", name: "Mackerel", bite: 26000, cost: 20, sell: 54, unlock: 300, seasons: ["summer"], kind: "deep", art: "bass", hint: "Stripes that remember open water." },
    { id: "crayfish", name: "Crayfish", bite: 19000, cost: 14, sell: 38, unlock: 190, seasons: ["summer", "autumn"], kind: "creek", art: "lobster", hint: "A lobster who stayed inland." },
    { id: "goldfish", name: "Goldfish", bite: 30000, cost: 36, sell: 96, unlock: 480, seasons: ["spring", "summer"], kind: "pond", art: "koi", hint: "Escaped from a bowl, stayed for the gossip." },
    { id: "starfin", name: "Starfin", bite: 70000, cost: 120, sell: 360, unlock: 1200, seasons: ["autumn", "winter"], kind: "magic", art: "moonfish", hint: "A cousin of dusk." },
  ];

  const BOATS = [
    { id: "dinghy", name: "Dinghy", cost: 80, interval: 12000, value: 4, produce: "minnow", produceName: "minnow", max: 4, art: "minnow", blurb: "A polite little boat. Brings minnows." },
    { id: "rowboat", name: "Rowboat", cost: 160, interval: 16000, value: 7, produce: "perch", produceName: "perch", max: 3, art: "perch", blurb: "Oars that know the reeds." },
    { id: "skiff", name: "Skiff", cost: 280, interval: 20000, value: 12, produce: "trout", produceName: "trout", max: 3, art: "trout", blurb: "A river cousin." },
    { id: "trawler", name: "Trawler", cost: 480, interval: 26000, value: 18, produce: "shrimp", produceName: "shrimp", max: 2, art: "shrimp", blurb: "Nets with opinions." },
    { id: "lantern", name: "Lantern skiff", cost: 720, interval: 36000, value: 30, produce: "eel", produceName: "eel", max: 2, art: "eel", blurb: "Fishes the hush after supper." },
  ];

  const GOODS = {
    kelp: { name: "Tide kelp", sell: 8 },
    starfish: { name: "Starfish", sell: 12 },
    pearl: { name: "Pocket pearl", sell: 40 },
    chowder: { name: "Harbor chowder", sell: 36 },
    grill: { name: "Grilled trout", sell: 70 },
    pie: { name: "Fish pie", sell: 180 },
    boil: { name: "Shrimp boil", sell: 140 },
    smoked: { name: "Smoked salmon", sell: 240 },
    cakes: { name: "Crab cakes", sell: 120 },
    moonbroth: { name: "Moon broth", sell: 900 },
    tea: { name: "Dock tea", sell: 48 },
  };

  const DOCKS = [
    { name: "Home pier", water: "creek", say: "Kind to minnows and other shy folk." },
    { name: "Reed cove", water: "mud", say: "Soft bottom. Whiskers like it." },
    { name: "River mouth", water: "river", say: "The current brings letters." },
    { name: "Shingle shore", water: "shore", say: "Crabs keep office here." },
    { name: "Open water", water: "deep", say: "The horizon has a ledger." },
    { name: "Lily pond", water: "pond", say: "Painted fish, painted hush." },
    { name: "Moon shoal", water: "magic", say: "Dusk keeps a spare key." },
  ];

  const WATERS = {
    creek: { name: "Creek", kinds: ["creek", "shore"], say: "Shallow and honest." },
    mud: { name: "Mud", kinds: ["mud", "creek"], say: "Holds secrets and catfish." },
    river: { name: "River", kinds: ["river", "creek"], say: "Moving mail." },
    shore: { name: "Shore", kinds: ["shore", "creek"], say: "Tide gifts on the stones." },
    deep: { name: "Deep", kinds: ["deep", "river"], say: "Blue that does not hurry." },
    pond: { name: "Pond", kinds: ["pond", "creek"], say: "A mirror with fins." },
    magic: { name: "Moon", kinds: ["magic", "pond", "deep"], say: "Only dusk has the combination." },
  };
  const WATER_ORDER = ["creek", "mud", "river", "shore", "deep", "pond", "magic"];

  const RECIPES = [
    { id: "chowder", name: "Harbor chowder", needs: { minnow: 2, clam: 1 }, cottage: 0, say: "Steam like coming home." },
    { id: "grill", name: "Grilled trout", needs: { trout: 1 }, cottage: 0, say: "The dock smells like a good decision." },
    { id: "tea", name: "Dock tea", needs: { kelp: 2 }, cottage: 0, say: "Salt and patience in a cup." },
    { id: "cakes", name: "Crab cakes", needs: { crab: 1, shrimp: 1 }, cottage: 1, say: "A pan of sideways compliments." },
    { id: "boil", name: "Shrimp boil", needs: { shrimp: 2, kelp: 1 }, cottage: 1, say: "The pot is gossiping." },
    { id: "pie", name: "Fish pie", needs: { perch: 1, clam: 1 }, cottage: 1, say: "A lid for leftover tide." },
    { id: "smoked", name: "Smoked salmon", needs: { salmon: 1 }, cottage: 2, say: "The smokehouse wrote a letter." },
    { id: "moonbroth", name: "Moon broth", needs: { moonfish: 1, kelp: 1 }, cottage: 2, say: "It tastes like staying up." },
  ];

  const NPCS = [
    {
      id: "odo",
      name: "Odo",
      role: "the fisher",
      art: "odo",
      chat: ["The tide keeps its own ledger.", "I brought salt. You brought patience. Fair trade."],
      wants: [
        { item: "minnow", n: 3, pay: 40, say: "Three minnows for the morning line?" },
        { item: "trout", n: 1, pay: 50, say: "A trout, if the river was kind." },
        { item: "salmon", n: 1, pay: 160, say: "Salmon for the smokehouse." },
      ],
    },
    {
      id: "piper",
      name: "Piper",
      role: "the bait kid",
      art: "piper",
      chat: ["Worms have union rules.", "I named the bucket. The bucket did not mind."],
      wants: [
        { item: "perch", n: 2, pay: 36, say: "Two perch. I am practicing supper." },
        { item: "shrimp", n: 2, pay: 50, say: "Shrimp. For science, and also lunch." },
        { item: "kelp", n: 3, pay: 30, say: "Kelp for the bait tin's bouquet." },
      ],
    },
    {
      id: "maren",
      name: "Maren",
      role: "the cook",
      art: "maren",
      chat: ["A pot is a kind of harbor.", "If it steams, it is almost a story."],
      wants: [
        { item: "clam", n: 2, pay: 40, say: "Clams for the noon pot?" },
        { item: "chowder", n: 1, pay: 50, say: "A bowl to compare notes with." },
        { item: "crab", n: 1, pay: 55, say: "A crab. I will be polite to it." },
      ],
    },
    {
      id: "cob",
      name: "Cob",
      role: "the boatwright",
      art: "cob",
      chat: ["Good wood listens if you plane it slowly.", "A leak is just a hole that wants a story."],
      wants: [
        { item: "bass", n: 1, pay: 50, say: "Lunch for the workshop — one bass?" },
        { item: "pike", n: 1, pay: 80, say: "Pike. The ribs remember winter." },
        { item: "kelp", n: 4, pay: 40, say: "Kelp to pack a seam." },
      ],
    },
    {
      id: "sela",
      name: "Sela",
      role: "the net-mender",
      art: "sela",
      chat: ["Knots are just patient loops.", "Harbor gossip travels faster than gulls."],
      wants: [
        { item: "eel", n: 1, pay: 70, say: "An eel. The twine wants a cousin." },
        { item: "lobster", n: 1, pay: 180, say: "A lobster for the feast net." },
        { item: "shrimp", n: 3, pay: 80, say: "Shrimp. They slip through if I hurry." },
      ],
    },
    {
      id: "wren",
      name: "Wren",
      role: "the post",
      art: "wren",
      chat: ["Letters arrive when the tide does.", "I filed you under 'comes back with fish'."],
      wants: [
        { item: "koi", n: 1, pay: 220, say: "A koi. For the stamp drawer, not the pot." },
        { item: "moonfish", n: 1, pay: 700, say: "Moonfish, if dusk was generous." },
        { item: "tea", n: 1, pay: 70, say: "Tea for the late window." },
      ],
    },
  ];

  const BAITS = [
    { id: "worm", name: "Worms", cost: 12, n: 8, kinds: ["creek", "mud", "shore"], hint: "Honest dirt." },
    { id: "bread", name: "Bread crumbs", cost: 14, n: 8, kinds: ["creek", "pond"], hint: "The ducks write a complaint." },
    { id: "cricket", name: "Crickets", cost: 18, n: 8, kinds: ["river", "creek"], hint: "A pocket orchestra." },
    { id: "fly", name: "Tied flies", cost: 28, n: 6, kinds: ["river"], hint: "Trout read these as letters." },
    { id: "spinner", name: "Spinners", cost: 36, n: 6, kinds: ["river", "deep"], hint: "A little argument in the water." },
    { id: "night", name: "Night lures", cost: 40, n: 6, kinds: ["mud", "magic"], hint: "After the lamps." },
    { id: "pearl", name: "Pearl spoons", cost: 90, n: 4, kinds: ["magic", "pond", "deep"], hint: "Moonfish notice." },
  ];
  const RODS = [
    { id: "willow", name: "Willow switch", cost: 0, bite: 1, rare: 0, maxOz: 18, hint: "A first kind stick." },
    { id: "cedar", name: "Cedar rod", cost: 180, bite: 0.92, rare: 0.04, maxOz: 36, hint: "It smells like a porch." },
    { id: "ironwood", name: "Ironwood", cost: 560, bite: 0.84, rare: 0.08, maxOz: 64, hint: "Holds a trophy's opinion." },
    { id: "steel", name: "Harbor steel", cost: 1480, bite: 0.76, rare: 0.12, maxOz: 96, hint: "Nell's leftover kindness." },
    { id: "moon", name: "Moon rod", cost: 3400, bite: 0.7, rare: 0.2, maxOz: 140, magic: true, hint: "Dusk keeps a spare." },
  ];
  const TRAPS = [
    { id: "crabpot", name: "Crab pot", cost: 160, interval: 18000, produce: "crab", max: 4, waters: ["shore", "creek"], blurb: "Sideways mail." },
    { id: "weir", name: "Eel weir", cost: 220, interval: 22000, produce: "eel", max: 3, waters: ["mud", "river"], blurb: "A polite fence." },
    { id: "rake", name: "Clam rake", cost: 120, interval: 14000, produce: "clam", max: 6, waters: ["shore"], blurb: "The shingle pays rent." },
    { id: "lobsterpot", name: "Lobster pot", cost: 480, interval: 32000, produce: "lobster", max: 2, waters: ["deep"], blurb: "Armor, if you wait." },
  ];
  const SMOKE_MAP = {
    salmon: { out: "smoked", ms: 40000, name: "Smoked salmon" },
    trout: { out: "smoked", ms: 28000, name: "Smoked trout" },
    eel: { out: "smoked", ms: 32000, name: "Smoked eel" },
    perch: { out: "smoked", ms: 24000, name: "Smoked perch" },
  };
  const CHARTERS = [
    { id: "dawn", name: "Dawn loop", cost: 60, ms: 90000, n: [3, 5], waters: ["creek", "shore"], blurb: "Back before the kettle cools." },
    { id: "reef", name: "Reef day", cost: 180, ms: 180000, n: [4, 7], waters: ["deep", "shore"], blurb: "The horizon has a packed lunch." },
    { id: "moonrun", name: "Moon run", cost: 320, ms: 240000, n: [3, 6], waters: ["magic", "mud"], blurb: "Lanterns on the gunwale." },
  ];
  const BOARD = [
    { title: "Mabel's fry", needs: { minnow: 4 }, pay: 40, say: "Four shy fish for the morning pan." },
    { title: "Odo's line", needs: { trout: 1 }, pay: 55, say: "One trout, if the river wrote back." },
    { title: "Maren's pot", needs: { clam: 3 }, pay: 48, say: "Clams. The chowder is waiting." },
    { title: "Sela's twine", needs: { kelp: 4 }, pay: 36, say: "Kelp to pad the new knots." },
    { title: "Wren's stamp", needs: { perch: 2 }, pay: 30, say: "Two perch. The letter smells like lunch." },
    { title: "Cob's lunch", needs: { bass: 1 }, pay: 50, say: "A bass for the workshop." },
    { title: "Festival tin", needs: { shrimp: 2 }, pay: 44, say: "Shrimp. The fair is pretending it is a picnic." },
    { title: "Night kettle", needs: { eel: 1 }, pay: 70, say: "An eel, after the lamps." },
  ];

  const DECOR = [
    { id: "lantern", name: "Path lantern", cost: 220, bonus: "One extra forage after dusk.", x: "18%", y: "58%", art: "lantern" },
    { id: "bench", name: "Dock bench", cost: 200, bonus: "Sit once a day. Same kindness as a well-wish.", x: "72%", y: "78%", art: "bench" },
    { id: "birdbath", name: "Gull bath", cost: 260, bonus: "Birds leave one more wild thing.", x: "12%", y: "72%", art: "birdbath" },
  ];

  const SLIP_PRICES = [0, 0, 0, 0, 40, 80, 140, 220, 340, 520, 780, 1200].map((n) => n * 4);

  const WAGE = { cast: 2, reel: 2, boat: 2, forage: 2, cook: 4, visit: 4, sellTax: 0.1 };

  const PARAGON = [
    { id: "root", name: "Harbor star", blurb: "The first ember. Every other gift grows from this.", cost: 1, max: 1, req: [], branch: "hearth" },
    { id: "look", name: "The cat remembers", blurb: "Boat looks stay with you when the harbor folds.", cost: 2, max: 1, req: ["root"], branch: "hearth" },
    { id: "purse", name: "Fuller purse", blurb: "Start each new harbor with +200 coins per rank.", cost: 1, max: 5, req: ["root"], branch: "purse" },
    { id: "margin", name: "Honest margin", blurb: "Crew profit leans toward the high end of 1–5%. Still pennies.", cost: 2, max: 4, req: ["purse"], branch: "purse" },
    { id: "crumbs", name: "Kinder crumbs", blurb: "Hand sales lean toward the high end of 4–20%. Still pennies, just kinder.", cost: 2, max: 3, req: ["purse"], branch: "purse" },
    { id: "stars", name: "Star harvest", blurb: "+15% stars the next time you prestige, per rank.", cost: 3, max: 3, req: ["margin", "crumbs"], branch: "purse" },
    { id: "slips", name: "Open slips", blurb: "Home pier starts with +1 unlocked slip per rank.", cost: 1, max: 4, req: ["root"], branch: "land" },
    { id: "wages", name: "Fairer wages", blurb: "Crew jobs cost 1 less coin per rank (never below 1).", cost: 2, max: 2, req: ["slips"], branch: "land" },
    { id: "crew", name: "Familiar faces", blurb: "Caster and reeler start hired on a new harbor.", cost: 3, max: 1, req: ["wages"], branch: "land" },
    { id: "hearts", name: "Known on the dock", blurb: "Neighbors start at one heart. They already know your slip.", cost: 3, max: 1, req: ["crew"], branch: "land" },
    { id: "thumb", name: "Patient hook", blurb: "Begin with +1 Patient Hook rank. Fish remember how to hurry.", cost: 2, max: 3, req: ["root"], branch: "green" },
    { id: "seed", name: "Bait ledger", blurb: "Bait costs 4% less per rank.", cost: 2, max: 3, req: ["thumb"], branch: "green" },
    { id: "glass", name: "Remembered ice", blurb: "Start with an icehouse. Any fish, any season.", cost: 4, max: 1, req: ["seed"], branch: "green" },
    { id: "hands", name: "Old calluses", blurb: "Minnow, perch, and trout begin at mastery 1 on a new harbor.", cost: 2, max: 1, req: ["thumb"], branch: "green" },
    { id: "fair", name: "Fair week", blurb: "Festivals last the whole season, not just the opening two days.", cost: 3, max: 1, req: ["hearts"], branch: "land" },
    { id: "favor", name: "A pocket ribbon", blurb: "Start each harbor with 1 almanac favor.", cost: 2, max: 1, req: ["look"], branch: "hearth" },
  ];

  const PARAGON_BRANCH = { hearth: "Hearth", purse: "Purse", land: "Dock", green: "Tide" };

  const MASTERY_STEPS = [0, 10, 40, 120, 360];

  const FESTIVALS = {
    spring: { id: "blossom", name: "Blossom Tide", kinds: ["creek", "pond"], ids: ["minnow", "koi"], say: "Ribbon on the pier. Creek fish hurry." },
    summer: { id: "midsummer", name: "Midsummer Net", kinds: ["shore", "deep"], ids: ["shrimp", "sunfish"], say: "Stalls in the heat. Shore and deep are the toast." },
    autumn: { id: "harvest", name: "Smokehouse Fair", kinds: ["river", "mud"], ids: ["salmon", "carp"], say: "The smokehouse door is open." },
    winter: { id: "hearth", name: "Hearth Night", kinds: ["mud", "magic"], ids: ["eel", "pike", "moonfish"], say: "Everyone is in the kitchen. Night fish glow." },
  };

  const WEEK_GOALS = [
    { title: "Twenty honest reels", kind: "reel", n: 20, say: "Fill the creel. The week will take care of itself." },
    { title: "Something on the stove", kind: "cook", n: 3, say: "Three recipes. The house should smell like a decision." },
    { title: "Gifts on the dock", kind: "gift", n: 4, say: "Four parcels for neighbors. Hearts remember." },
    { title: "Boat morning", kind: "boat", n: 8, say: "Eight collections from the boats." },
    { title: "The wild stones", kind: "forage", n: 6, say: "Six wild things. The tide leaves presents." },
    { title: "A mixed creel", kind: "kinds", n: 5, say: "Catch five different fish this week." },
  ];

  const CRAFTS = {
    dockhand: {
      id: "dockhand",
      name: "Dockhand",
      art: "odo",
      blurb: "Balanced. The pier already knows your step.",
      skill: "Home pier starts with one extra slip.",
    },
    fly: {
      id: "fly",
      name: "Fly fisher",
      art: "trout",
      blurb: "River fish introduce themselves first.",
      skill: "River bites hurry. Trout and salmon lean in.",
    },
    night: {
      id: "night",
      name: "Night liner",
      art: "eel",
      blurb: "The hush after supper is a kind of office.",
      skill: "Night fish and moon-water hurry.",
    },
    cook: {
      id: "cook",
      name: "Harbor cook",
      art: "maren",
      blurb: "The kettle is a kind of rod.",
      skill: "Kitchen wages drop. Recipes feel cheaper to hire.",
    },
    shore: {
      id: "shore",
      name: "Beachcomber",
      art: "crab",
      blurb: "The stones leave presents if you look kindly.",
      skill: "Shore fish hurry. Extra forage on the shingle.",
    },
    skipper: {
      id: "skipper",
      name: "Skipper",
      art: "bass",
      blurb: "Boats come home sooner, and fuller.",
      skill: "Boats produce a little sooner.",
    },
  };

  const HEART_PERKS = {
    odo: { name: "Tide gifts", blurb: "One extra forage by the water-side." },
    piper: { name: "Cheap worms", blurb: "Bait costs 6% less." },
    maren: { name: "Cook's friend", blurb: "Kitchen wages drop by 1." },
    cob: { name: "Measured keels", blurb: "New slips cost 12% less." },
    sela: { name: "Patient loops", blurb: "Shore and mud fish bite 6% sooner." },
    wren: { name: "Filed kindly", blurb: "Mail sometimes tucks a coin in." },
  };

  const STORY = [
    { at: 0, title: "A kettle, a key", text: "Someone left the dock unlocked and the kettle already warm. The cat has decided you live here." },
    { at: 60, title: "First neighbors", text: "Odo waved from the next slip as if you had always been expected. Piper measured your bucket with their eyes." },
    { at: 300, title: "The harbor remembers", text: "Sela says this water has been kind for a hundred springs. You are only the newest pair of hands." },
    { at: 900, title: "Smokehouse dusk", text: "The wind smells like pie and woodsmoke. You stop counting coins long enough to watch the lighthouse go gold." },
    { at: 2400, title: "Moon water", text: "A fish opens that should not exist, and the cat does not even look surprised." },
  ];

  const LETTERS = {
    spring: [
      "The lane is loud with gulls. Cast something small and let the rain finish the sentence.",
      "Maren folded a recipe into this letter. It is only 'add butter until it feels like Sunday.'",
      "The cat sat on the blotter. I think she meant to send her regards.",
    ],
    summer: [
      "Cob left a note on the piling: 'Don't forget to sit down.' The sun agrees.",
      "The nets are humming in the heat. Sela says knots are gossip that became rope.",
      "Bring shrimp if you have them. The harbor is pretending it is a picnic.",
    ],
    autumn: [
      "Maren is taking pie orders. The hills have started wearing copper.",
      "The salmon are writing their long letter home.",
      "If the lobster is heavy, you did it right. If it is smug, even better.",
    ],
    winter: [
      "Wren hung a sprig of something over your door. She said it was for luck. It smells like patience.",
      "The ice keeps its own ledger. Count reels, not flakes.",
      "Come by the hearth if the wind gets opinions. We have tea and leftover year.",
    ],
  };

  const ART = {
    minnow: "assets/fish-minnow.png",
    perch: "assets/fish-perch.png",
    sunfish: "assets/fish-sunfish.png",
    trout: "assets/fish-trout.png",
    bass: "assets/fish-bass.png",
    catfish: "assets/fish-catfish.png",
    carp: "assets/fish-carp.png",
    salmon: "assets/fish-salmon.png",
    pike: "assets/fish-pike.png",
    eel: "assets/fish-eel.png",
    crab: "assets/fish-crab.png",
    shrimp: "assets/fish-shrimp.png",
    lobster: "assets/fish-lobster.png",
    koi: "assets/fish-koi.png",
    moonfish: "assets/fish-moonfish.png",
    odo: "assets/npc-odo.png",
    piper: "assets/npc-wren.jpg",
    maren: "assets/npc-maren.jpg",
    cob: "assets/npc-cob.jpg",
    sela: "assets/npc-sela.png",
    wren: "assets/npc-wren.jpg",
    lantern: "assets/decor-lantern.png",
    bench: "assets/decor-bench.png",
    birdbath: "assets/decor-birdbath.png",
    chowder: "assets/food-chowder.png",
    pie: "assets/food-pie.png",
    broth: "assets/food-broth.png",
    tea: "assets/food-tea.png",
    cat: "assets/animal-cat.png",
    fish: "assets/icon-fish.jpg",
  };

  const keyed = {};
  const LOOK_N = 30;
  function rollLook() { return Math.floor(Math.random() * LOOK_N); }
  const LOOK_STYLE = ["gouache", "woodcut", "wash", "felt", "glass", "ink", "stitch"];
  function lookWrap(html, look, drawn) {
    look = ((look % LOOK_N) + LOOK_N) % LOOK_N;
    const style = LOOK_STYLE[look % LOOK_STYLE.length];
    return `<span class="look look-${look} style-${style}${drawn ? " drawn" : ""}">${html}</span>`;
  }

  const $ = (id) => document.getElementById(id);
  const fishById = (id) => FISH.find((f) => f.id === id);
  const boatById = (id) => BOATS.find((b) => b.id === id);
  const npcById = (id) => NPCS.find((n) => n.id === id);
  const craftBy = () => CRAFTS[state.classId] || CRAFTS.dockhand;
  const rodBy = () => RODS.find((r) => r.id === (state.rod || "willow")) || RODS[0];
  const baitDef = (id) => BAITS.find((b) => b.id === id) || BAITS[0];
  const baitBy = () => baitDef(state.selectedBait || "worm");

  function baitCount(id) { return (state.baitTin && state.baitTin[id]) || 0; }
  function takeBait() {
    const id = state.selectedBait || "worm";
    if (baitCount(id) > 0) {
      state.baitTin[id] -= 1;
      if (state.baitTin[id] <= 0) delete state.baitTin[id];
      return true;
    }
    const b = baitDef(id);
    const unit = Math.max(1, Math.round(b.cost / b.n));
    if (!spend(unit)) return false;
    return true;
  }
  function noteRecord(id, patch) {
    state.records = state.records || {};
    const rec = state.records[id] || { count: 0, gotAway: 0, biggest: 0, firstDay: harborDay() };
    if (patch.count) rec.count += patch.count;
    if (patch.gotAway) rec.gotAway += patch.gotAway;
    if (patch.released) rec.released = (rec.released || 0) + patch.released;
    if (patch.oz && patch.oz > (rec.biggest || 0)) rec.biggest = patch.oz;
    state.records[id] = rec;
  }
  function canAppear(fish, dock) {
    if (!fish || state.lifetime < fish.unlock) return false;
    if (!(inSeason(fish) || state.upgrades.icehouse)) return false;
    return waterMatch(fish, dock) || state.upgrades.icehouse;
  }
  function rollOz(fish, rod) {
    const base = 4 + (fish.cost || 2) * 1.6;
    let oz = base * (0.55 + Math.random() * 0.7);
    if (state.luckyDay === harborDay()) oz *= 1.2;
    oz = Math.min(rod.maxOz || 24, oz);
    return Math.max(2, Math.round(oz * 10) / 10);
  }
  function rollCatch(target, dock) {
    const rod = rodBy();
    const bait = baitBy();
    let away = 0.07 - (rod.rare || 0) - masteryRank(target.id) * 0.008 - 0.01 * (state.upgrades.line || 0);
    if (state.luckyDay === harborDay()) away *= 0.4;
    if (Math.random() < Math.max(0.015, away)) {
      noteRecord(target.id, { gotAway: 1 });
      return { kind: "away", fish: target };
    }
    const pool = FISH.filter((f) => canAppear(f, dock));
    const weights = pool.map((f) => {
      let w = 1;
      if (f.id === target.id) w += 6 + 2 * (state.upgrades.hook || 0);
      if (bait.kinds.indexOf(f.kind) >= 0) w += 3;
      if (f.id === target.id && bait.kinds.indexOf(f.kind) >= 0) w += 4;
      if (rod.magic && f.kind === "magic") w += 3;
      if (isNight() && (f.id === "eel" || f.id === "moonfish" || f.id === "catfish")) w += 2;
      return w;
    });
    const sum = weights.reduce((a, b) => a + b, 0) || 1;
    let roll = Math.random() * sum;
    let got = target;
    for (let i = 0; i < pool.length; i++) {
      roll -= weights[i];
      if (roll <= 0) { got = pool[i]; break; }
    }
    const oz = rollOz(got, rod);
    const stars = oz > (rod.maxOz || 24) * 0.72 ? 3 : oz > (rod.maxOz || 24) * 0.45 ? 2 : 1;
    if (oz > (rod.maxOz || 18) * 0.98 && Math.random() < 0.25) {
      noteRecord(got.id, { gotAway: 1 });
      return { kind: "away", fish: got, oz, heavy: true };
    }
    return { kind: "fish", fish: got, oz, stars };
  }

  function keyCyan(img) {
    try {
      const c = document.createElement("canvas");
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      const ctx = c.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);
      const d = ctx.getImageData(0, 0, c.width, c.height);
      const px = d.data;
      for (let i = 0; i < px.length; i += 4) {
        if (px[i] < 110 && px[i + 1] > 150 && px[i + 2] > 170) px[i + 3] = 0;
      }
      ctx.putImageData(d, 0, 0);
      return c.toDataURL("image/png");
    } catch {
      return img.src;
    }
  }

  function loadOneArt(name, src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        keyed[name] = (location.protocol === "file:") ? img.src : keyCyan(img);
        resolve();
      };
      img.onerror = () => {
        keyed[name] = src;
        resolve();
      };
      img.src = src;
    });
  }

  function loadArt() {
    return Promise.all(Object.entries(ART).map(([name, src]) => loadOneArt(name, src)));
  }

  function sprite(id) {
    return keyed[id] ? `<img src="${keyed[id]}" alt="" draggable="false">` : "";
  }

  function fishArt(id, look) {
    look = look == null ? 0 : look;
    const fish = fishById(id);
    const art = (fish && fish.art) || id;
    if (keyed[art]) return lookWrap(sprite(art), look, false);
    if (keyed[id]) return lookWrap(sprite(id), look, false);
    if (keyed.fish) return lookWrap(sprite("fish"), look, false);
    return lookWrap(`<span class="thumb-dot"></span>`, look, false);
  }

  function goodArt(id) {
    const look = (id || "").length % LOOK_N;
    if (fishById(id)) return fishArt(id, look);
    if (id === "kelp" || id === "starfish" || id === "pearl") return fishArt("clam", look);
    if (id === "grill" || id === "smoked" || id === "cakes" || id === "boil" || id === "moonbroth") {
      return keyed.chowder ? lookWrap(sprite("chowder"), look, false) : fishArt("trout", look);
    }
    if (keyed[id]) return lookWrap(sprite(id), look, false);
    return `<span class="thumb-dot"></span>`;
  }

  function waterForIndex(index) {
    return WATER_ORDER[index % WATER_ORDER.length];
  }

  function makeSlips(unlocked) {
    return Array.from({ length: SLIP_COUNT }, (_, i) => ({
      unlocked: i < unlocked,
      fish: null,
      castAt: 0,
      invested: 0,
      wages: 0,
      look: 0,
      lastFish: null,
    }));
  }

  function makeDock(index, extraSlips) {
    const meta = DOCKS[index] || { name: "Slip row " + (index + 1), water: waterForIndex(index) };
    const unlocked = index === 0 ? START_UNLOCKED + (extraSlips || 0) : 2;
    return {
      name: meta.name,
      water: meta.water,
      stock: 80,
      slips: makeSlips(Math.min(SLIP_COUNT, unlocked)),
    };
  }

  function defaultParagon() {
    return { stars: 0, spent: 0, nodes: {}, runs: 0, bestDay: 1, bestLife: 0, bestCatch: 0, history: [] };
  }

  function defaultState() {
    const now = Date.now();
    const boats = {};
    const bins = {};
    const lastBoat = {};
    BOATS.forEach((b) => {
      boats[b.id] = 0;
      bins[b.id] = 0;
      lastBoat[b.id] = now;
    });
    return {
      coins: START_COINS,
      grindScale: BAIT_SCALE,
      lifetime: 0,
      caught: 0,
      docks: [makeDock(0, 0)],
      viewDock: 0,
      selected: "minnow",
      baitCat: "all",
      boats,
      bins,
      lastBoat,
      boatLook: {},
      pantry: {},
      pantryCost: {},
      pantryWage: {},
      upgrades: { thumb: 0, market: 0, icehouse: false, cottage: 0 },
      decor: {},
      hearts: NPCS.reduce((o, n) => { o[n.id] = 0; return o; }, {}),
      discovered: { minnow: true },
      stories: [0],
      mail: { day: 0, unread: true, body: LETTERS.spring[0] },
      weather: "sunny",
      lastHarborDay: 1,
      muted: false,
      sound: { master: true, music: true, sfx: true, track: "harbor", musicVol: 0.42, sfxVol: 0.55, autoTrack: false, cards: true, fisher: true, school: true, calm: false },
      selectedBait: "worm",
      baitTin: { worm: 24 },
      rod: "willow",
      rods: { willow: true },
      traps: {},
      trapBin: {},
      trapLast: {},
      smoke: [],
      well: [],
      charter: null,
      records: {},
      orders: [],
      peddler: { day: 0, stock: [] },
      luckyDay: 0,
      hurryDay: 0,
      seenWelcome: false,
      sawIntro: false,
      pickedClass: false,
      classId: "dockhand",
      fisherName: "Rowan",
      lastTick: now,
      startedAt: now,
      auto: { cast: false, reel: false, boat: false, sell: false, forage: false, deliver: false, cook: false, trap: false },
      books: { wages: 0, tax: 0, jobs: 0 },
      paragon: defaultParagon(),
      mastery: {},
      almanac: { week: 0, goal: 0, progress: 0, done: false, favors: 0, seen: {}, kinds: {} },
      forage: [],
      wishDay: 0,
      sitDay: 0,
      weekCatch: {},
    };
  }

  let state = defaultState();
  let audioCtx = null;
  let shopTimer = 0;
  let toastTimer = 0;
  let catchTimer = 0;
  const catchQueue = [];
  let catchBusy = false;

  function harborDay() { return 1 + Math.floor((Date.now() - state.startedAt) / DAY_MS); }
  function seasonId() { return SEASONS[Math.floor((harborDay() - 1) / 7) % 4]; }
  function yearNum() { return 1 + Math.floor((harborDay() - 1) / 28); }
  const MOONS = ["new", "waxing", "half", "gibbous", "full", "waning", "last", "crescent"];
  const MOON_SAY = { new: "new moon", waxing: "waxing", half: "half moon", gibbous: "gibbous", full: "full moon", waning: "waning", last: "last quarter", crescent: "crescent" };
  function moonId() { return MOONS[(harborDay() - 1) % 8]; }
  function tideId() { return TIDES[Math.floor(((Date.now() - state.startedAt) % DAY_MS) / (DAY_MS / 4))]; }
  function isNight() {
    const t = ((Date.now() - state.startedAt) % DAY_MS) / DAY_MS;
    return t > 0.72 || t < 0.12;
  }
  function inSeason(fish) { return fish && fish.seasons.indexOf(seasonId()) >= 0; }
  function currentDock() { return state.docks[state.viewDock] || state.docks[0]; }
  function slips() { return currentDock().slips; }
  function dockWater(dock) { return WATERS[(dock || currentDock()).water] || WATERS.creek; }

  function waterMatch(fish, dock) {
    const w = dockWater(dock);
    return w.kinds.indexOf(fish.kind) >= 0;
  }

  function canCast(fish, dock) {
    if (!fish || state.lifetime < fish.unlock) return false;
    if (!(inSeason(fish) || state.upgrades.icehouse)) return false;
    return waterMatch(fish, dock || currentDock()) || state.upgrades.icehouse;
  }

  function festBoost(fish) {
    const fest = FESTIVALS[seasonId()];
    if (!fest || !isFestOpen()) return false;
    return fest.kinds.indexOf(fish.kind) >= 0 || fest.ids.indexOf(fish.id) >= 0;
  }

  function isFestOpen() {
    const day = harborDay();
    const inSeasonDay = ((day - 1) % 7) + 1;
    return inSeasonDay <= 2 || nodeRank("fair") >= 1;
  }

  function biteTime(fish, slip, dock) {
    if (!fish) return 2000;
    let t = fish.bite * Math.pow(0.88, state.upgrades.thumb || 0);
    if (inSeason(fish)) t *= 0.9;
    if (state.weather === "rain") t *= 0.82;
    if (state.weather === "snow" && !state.upgrades.icehouse) t *= 1.12;
    if (state.weather === "fog" && (fish.kind === "magic" || fish.kind === "mud")) t *= 0.9;
    if (tideId() === "flood") t *= 0.94;
    if (tideId() === "ebb" && fish.kind === "shore") t *= 0.9;
    if (isNight() && (fish.id === "eel" || fish.id === "catfish" || fish.id === "moonfish")) t *= 0.86;
    if (state.decor.lantern && isNight()) t *= 0.97;
    t *= Math.pow(0.99, Math.min(8, (state.paragon && state.paragon.runs) || 0));
    t *= Math.pow(0.96, masteryRank(fish.id));
    if (festBoost(fish)) t *= 0.88;
    if (state.wishDay === harborDay()) t *= 0.97;
    dock = dock || currentDock();
    if (waterMatch(fish, dock)) t *= 0.92;
    if (slip && slip.lastFish && slip.lastFish !== fish.id) t *= 0.95;
    if (heartPerk("sela") && (fish.kind === "shore" || fish.kind === "mud")) t *= 0.94;
    const rod = rodBy();
    t *= rod.bite || 1;
    if (state.hurryDay === harborDay()) t *= 0.9;
    const moon = moonId();
    if (moon === "full" && (fish.kind === "magic" || fish.id === "moonfish" || fish.id === "starfin")) t *= 0.86;
    if (moon === "new" && (fish.kind === "mud" || fish.id === "eel" || fish.id === "catfish")) t *= 0.9;
    if (state.upgrades.float && (fish.kind === "creek" || fish.kind === "pond")) t *= 0.94;
    if (state.upgrades.sinker && (fish.kind === "deep" || fish.kind === "mud")) t *= 0.94;
    const dockNow = dock || currentDock();
    if (dockNow && (dockNow.stock || 80) < 25) t *= 1.22;
    const craft = craftBy();
    if (craft.id === "fly" && (fish.kind === "river" || fish.id === "trout" || fish.id === "salmon")) t *= 0.9;
    if (craft.id === "night" && (isNight() || fish.kind === "magic" || fish.id === "eel" || fish.id === "catfish")) t *= 0.9;
    if (craft.id === "shore" && fish.kind === "shore") t *= 0.9;
    return Math.max(1100, Math.round(t));
  }

  function baitCost(fish) {
    if (!fish) return 1;
    let n = fish.cost * BAIT_SCALE;
    n *= Math.pow(0.96, nodeRank("seed"));
    n *= Math.pow(0.96, Math.max(0, masteryRank(fish.id) - 1));
    if (heartPerk("piper")) n *= 0.94;
    return Math.max(1, Math.round(n));
  }

  function itemBasis(id) {
    const fish = fishById(id);
    if (fish) return baitCost(fish);
    const rec = RECIPES.find((r) => r.id === id);
    if (rec) return Object.keys(rec.needs).reduce((sum, k) => sum + itemBasis(k) * rec.needs[k], 0);
    return Math.max(1, (GOODS[id] ? GOODS[id].sell : 1) * BAIT_SCALE);
  }

  function grindRate(auto, basis) {
    basis = Math.max(0, Number(basis) || 0);
    const step = (state.caught + harborDay() + (state.books.jobs || 0) + Math.floor(basis / 80)) % 5;
    let r = 0.01 + step * 0.01;
    if (auto) {
      if (nodeRank("margin") >= 1) r = Math.min(0.05, r + 0.01);
      if (nodeRank("margin") >= 3) r = 0.05;
      return Math.min(0.05, Math.max(0.01, r));
    }
    if (nodeRank("crumbs") >= 1) r = Math.min(0.05, r + 0.01);
    if (nodeRank("crumbs") >= 3) r = 0.05;
    r += 0.001 * (state.upgrades.market || 0);
    return Math.min(0.05, Math.max(0.01, r)) * 4;
  }

  function grindPayout(basis, auto) {
    return Math.max(1, Math.round(basis * (1 + grindRate(auto, basis))));
  }

  function pantryWageShare(id, n) {
    const c = pantryCount(id);
    if (!c) return 0;
    return ((state.pantryWage && state.pantryWage[id]) || 0) * ((n || 1) / c);
  }

  function sellPayout(id, n, auto) {
    n = n || 1;
    const basis = itemBasis(id) * n;
    let wages = pantryWageShare(id, n);
    if (auto && wages <= 0 && fishById(id)) {
      wages = (wageNow("cast") + wageNow("reel")) * n;
    }
    return Math.max(1, Math.round(basis * (1 + grindRate(auto, basis)) + wages));
  }

  function sellValue(id, auto) { return sellPayout(id, 1, auto); }

  function fmt(n) {
    n = Math.floor(n);
    if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "m";
    if (n >= 10000) return Math.round(n / 1000) + "k";
    return String(n);
  }

  function spend(n) {
    if (state.coins < n) return false;
    state.coins -= n;
    return true;
  }

  function earn(n, source) {
    n = Math.max(0, Math.round(n));
    state.coins += n;
    state.lifetime += n;
    if (source === "wage") state.books.wages += n;
    flashCoins();
  }

  function wageNow(kind) {
    let w = WAGE[kind] || 2;
    w -= nodeRank("wages");
    if (kind === "cook" && (heartPerk("maren") || (state.classId === "cook"))) w -= 1;
    return Math.max(1, w);
  }

  function payWage(kind) {
    const w = wageNow(kind);
    if (!spend(w)) return 0;
    state.books.wages += w;
    state.books.jobs += 1;
    return w;
  }

  function nodeRank(id) { return (state.paragon && state.paragon.nodes && state.paragon.nodes[id]) || 0; }
  function hasNode(id) { return nodeRank(id) >= 1; }
  function nodeDef(id) { return PARAGON.find((n) => n.id === id); }
  function unspentStars() { return Math.max(0, (state.paragon.stars || 0) - (state.paragon.spent || 0)); }
  function nodeUnlocked(id) {
    const n = nodeDef(id);
    if (!n) return false;
    return n.req.every((r) => hasNode(r));
  }
  function nodeCost(id) {
    const n = nodeDef(id);
    return n ? n.cost : 99;
  }
  function heartPerk(id) { return (state.hearts[id] || 0) >= 5; }
  function masteryCount(id) { return (state.mastery && state.mastery[id]) || 0; }
  function masteryRank(id) {
    const c = masteryCount(id);
    let r = 0;
    for (let i = 1; i < MASTERY_STEPS.length; i++) if (c >= MASTERY_STEPS[i]) r = i;
    return r;
  }
  function noteMastery(id, n) {
    state.mastery = state.mastery || {};
    state.mastery[id] = (state.mastery[id] || 0) + (n || 1);
  }

  function pantryCount(id) { return (state.pantry[id] || 0); }
  function addPantry(id, n, spent, wages) {
    n = n || 1;
    state.pantry[id] = (state.pantry[id] || 0) + n;
    state.pantryCost = state.pantryCost || {};
    state.pantryCost[id] = (state.pantryCost[id] || 0) + (spent || 0);
    state.pantryWage = state.pantryWage || {};
    state.pantryWage[id] = (state.pantryWage[id] || 0) + (wages || 0);
    state.discovered[id] = true;
  }
  function takePantry(id, n) {
    n = n || 1;
    if ((state.pantry[id] || 0) < n) return false;
    const unit = pantryUnitCost(id);
    const wage = pantryWageShare(id, n);
    state.pantry[id] -= n;
    if (state.pantry[id] <= 0) {
      delete state.pantry[id];
      if (state.pantryCost) delete state.pantryCost[id];
      if (state.pantryWage) delete state.pantryWage[id];
    } else {
      state.pantryCost[id] = Math.max(0, (state.pantryCost[id] || 0) - unit * n);
      state.pantryWage[id] = Math.max(0, (state.pantryWage[id] || 0) - wage);
    }
    return true;
  }
  function pantryUnitCost(id) {
    const c = pantryCount(id);
    if (!c) return itemBasis(id);
    return Math.round((state.pantryCost[id] || 0) / c) || itemBasis(id);
  }
  function itemName(id) {
    const f = fishById(id);
    if (f) return f.name;
    if (GOODS[id]) return GOODS[id].name;
    const r = RECIPES.find((x) => x.id === id);
    return r ? r.name : id;
  }

  function slotKey(id) { return SAVE_PREFIX + id; }
  function readIndex() {
    try { return JSON.parse(localStorage.getItem(PROFILE_INDEX) || "null"); } catch { return null; }
  }
  function writeIndex(idx) { localStorage.setItem(PROFILE_INDEX, JSON.stringify(idx)); }
  function ensureIndex() {
    let idx = readIndex();
    if (!idx || !idx.slots || !idx.slots.length) {
      const id = "harbor-1";
      idx = { active: id, slots: [{ id, name: "Home pier" }] };
      writeIndex(idx);
      try { localStorage.setItem(slotKey(id), localStorage.getItem(SAVE_KEY) || ""); } catch (_) {}
    }
    return idx;
  }
  function activeSlot() { return ensureIndex().active; }

  function hydrate(saved) {
    const base = defaultState();
    if (!saved || typeof saved !== "object") return base;
    const next = Object.assign(base, saved);
    next.docks = (saved.docks && saved.docks.length) ? saved.docks.map((d, i) => {
      const fresh = makeDock(i, 0);
      return Object.assign(fresh, d, { slips: (d.slips || fresh.slips).map((s, j) => Object.assign(fresh.slips[j] || {}, s)) });
    }) : [makeDock(0, 0)];
    next.pantry = saved.pantry || {};
    next.pantryWage = saved.pantryWage || {};
    next.hearts = Object.assign(base.hearts, saved.hearts || {});
    next.auto = Object.assign(base.auto, saved.auto || {});
    next.upgrades = Object.assign(base.upgrades, saved.upgrades || {});
    next.paragon = Object.assign(defaultParagon(), saved.paragon || {});
    next.boats = Object.assign(base.boats, saved.boats || {});
    next.bins = Object.assign(base.bins, saved.bins || {});
    next.discovered = Object.assign({ minnow: true }, saved.discovered || {});
    next.almanac = Object.assign(base.almanac, saved.almanac || {});
    next.books = Object.assign(base.books, saved.books || {});
    next.mastery = saved.mastery || {};
    next.forage = saved.forage || [];
    next.sound = Object.assign(defaultSound(), saved.sound || {});
    if (saved.muted) next.sound.master = false;
    next.baitTin = Object.assign({ worm: 24 }, saved.baitTin || {});
    next.rods = Object.assign({ willow: true }, saved.rods || {});
    next.rod = saved.rod || "willow";
    next.selectedBait = saved.selectedBait || "worm";
    next.traps = saved.traps || {};
    next.trapBin = saved.trapBin || {};
    next.trapLast = saved.trapLast || {};
    next.smoke = saved.smoke || [];
    next.well = saved.well || [];
    next.charter = saved.charter || null;
    next.records = saved.records || {};
    next.orders = saved.orders || [];
    next.peddler = Object.assign({ day: 0, stock: [] }, saved.peddler || {});
    if (!next.classId) next.classId = "dockhand";
    if (!next.fisherName) next.fisherName = "Rowan";
    return next;
  }

  function load() {
    try {
      const idx = ensureIndex();
      const raw = localStorage.getItem(slotKey(idx.active)) || localStorage.getItem(SAVE_KEY);
      if (raw) state = hydrate(JSON.parse(raw));
      else state = defaultState();
    } catch {
      state = defaultState();
    }
  }

  function save() {
    try {
      const idx = ensureIndex();
      const blob = JSON.stringify(state);
      localStorage.setItem(slotKey(idx.active), blob);
      localStorage.setItem(SAVE_KEY, blob);
    } catch (_) {}
  }

  function switchProfile(id) {
    save();
    const idx = ensureIndex();
    idx.active = id;
    writeIndex(idx);
    load();
    applyOffline();
    refreshAll();
    save();
  }

  function createProfile(name) {
    save();
    const idx = ensureIndex();
    const id = "harbor-" + Date.now();
    idx.slots.push({ id, name: (name || "New harbor").slice(0, 24) });
    idx.active = id;
    writeIndex(idx);
    const keep = state.paragon;
    state = defaultState();
    state.paragon = keep;
    applyParagonStart();
    state.sawIntro = false;
    state.pickedClass = false;
    if (name) state.fisherName = name.slice(0, 24);
    save();
    refreshAll();
    showIntro();
  }

  function applyParagonStart() {
    state.coins = START_COINS + 200 * nodeRank("purse");
    if (hasNode("glass")) state.upgrades.icehouse = true;
    state.upgrades.thumb = nodeRank("thumb");
    if (hasNode("crew")) { state.auto.cast = true; state.auto.reel = true; }
    if (hasNode("hearts")) NPCS.forEach((n) => { state.hearts[n.id] = Math.max(state.hearts[n.id] || 0, 1); });
    if (hasNode("favor")) state.almanac.favors = Math.max(state.almanac.favors || 0, 1);
    if (hasNode("hands")) {
      state.mastery.minnow = Math.max(state.mastery.minnow || 0, 10);
      state.mastery.perch = Math.max(state.mastery.perch || 0, 10);
      state.mastery.trout = Math.max(state.mastery.trout || 0, 10);
    }
    const extra = nodeRank("slips");
    if (extra) {
      const d = state.docks[0];
      for (let i = 0; i < Math.min(SLIP_COUNT, START_UNLOCKED + extra); i++) d.slips[i].unlocked = true;
    }
  }

  function resetActiveHarbor() {
    const keep = state.paragon;
    state = defaultState();
    state.paragon = keep;
    applyParagonStart();
    state.sawIntro = false;
    state.pickedClass = false;
    save();
    refreshAll();
    showIntro();
  }

  function prestige() {
    const stars = prestigeGain();
    const pg = state.paragon;
    pg.stars = (pg.stars || 0) + stars;
    pg.runs = (pg.runs || 0) + 1;
    pg.bestDay = Math.max(pg.bestDay || 1, harborDay());
    pg.bestLife = Math.max(pg.bestLife || 0, state.lifetime);
    pg.bestCatch = Math.max(pg.bestCatch || 0, state.caught);
    pg.history = (pg.history || []).concat([{ day: harborDay(), life: state.lifetime, stars }]).slice(-8);
    const keep = pg;
    state = defaultState();
    state.paragon = keep;
    applyParagonStart();
    save();
    refreshAll();
    modal("A folded harbor", "You pressed a long year into " + stars + " star" + (stars === 1 ? "" : "s") + ". The kettle is new. Your hands remember.");
  }

  function prestigeGain() {
    const base = Math.max(1, Math.floor(Math.sqrt((state.lifetime || 0) / 400)));
    return Math.max(1, Math.round(base * (1 + 0.15 * nodeRank("stars"))));
  }

  function restartKeepTree() {
    const keep = state.paragon;
    state = defaultState();
    state.paragon = keep;
    applyParagonStart();
    save();
    refreshAll();
    toast("Restarted. The tree stayed. No new stars.");
  }

  function buyNode(id) {
    const n = nodeDef(id);
    if (!n || !nodeUnlocked(id)) return;
    const rank = nodeRank(id);
    if (rank >= n.max) return;
    const cost = nodeCost(id);
    if (unspentStars() < cost) return;
    state.paragon.nodes[id] = rank + 1;
    state.paragon.spent = (state.paragon.spent || 0) + cost;
    save();
    renderParagon();
    renderHud();
    toast(n.name + " remembered.");
  }

  const TRACKS = [
    { id: "harbor", name: "Harbor morning", blurb: "Warm planks, slow kettle, gulls far off.", bpm: 70, root: 62, scale: [0, 2, 4, 7, 9], pad: [0, 4, 7, 11], pattern: [0, 2, 4, 2, 7, 4, 2, 0], bass: [0, 0, 7, 4], noise: 0.012, sparkle: true },
    { id: "lullaby", name: "Tide lullaby", blurb: "The water sings itself to sleep.", bpm: 56, root: 57, scale: [0, 2, 3, 7, 10], pad: [0, 3, 7, 10], pattern: [0, 3, 7, 3, 2, 0, 7, 3], bass: [0, 7, 3, 0], noise: 0.01, sparkle: false },
    { id: "rain", name: "Rain on planks", blurb: "Soft drops, darker tea.", bpm: 64, root: 60, scale: [0, 3, 5, 7, 10], pad: [0, 3, 7, 10], pattern: [0, 5, 3, 7, 5, 3, 0, 5], bass: [0, 5, 3, 7], noise: 0.028, sparkle: true },
    { id: "night", name: "Night line", blurb: "Moon on the hook. Almost no one talking.", bpm: 52, root: 55, scale: [0, 2, 5, 7, 9], pad: [0, 5, 7, 12], pattern: [0, 7, 5, 0, 9, 5, 2, 0], bass: [0, 0, 5, 7], noise: 0.008, sparkle: true },
    { id: "fair", name: "Fair net", blurb: "Ribbon on the pier. A little dance.", bpm: 86, root: 64, scale: [0, 2, 4, 7, 9], pad: [0, 4, 7, 9], pattern: [4, 2, 0, 7, 4, 9, 7, 4], bass: [0, 4, 7, 4], noise: 0.01, sparkle: true },
    { id: "hush", name: "Just water", blurb: "No tune. Only the harbor breathing.", bpm: 48, root: 50, scale: [0, 7], pad: [0, 7, 12], pattern: [], bass: [], noise: 0.035, sparkle: false },
    { id: "fog", name: "Fog bowl", blurb: "Notes arrive late, like boats.", bpm: 58, root: 58, scale: [0, 2, 5, 7, 10], pad: [0, 5, 10], pattern: [0, 5, 2, 7, 0, 10, 5, 2], bass: [0, 5, 0, 7], noise: 0.02, sparkle: false },
    { id: "frost", name: "Frost kettle", blurb: "Thin ice, warm cup.", bpm: 62, root: 61, scale: [0, 2, 4, 7, 11], pad: [0, 4, 7, 11], pattern: [0, 4, 7, 11, 7, 4, 2, 0], bass: [0, 4, 0, 7], noise: 0.014, sparkle: true },
    { id: "kettle", name: "Kettle waltz", blurb: "Steam keeps time.", bpm: 78, root: 65, scale: [0, 2, 4, 5, 7], pad: [0, 4, 7], pattern: [0, 4, 7, 5, 4, 2, 0, 4], bass: [0, 7, 5, 4], noise: 0.009, sparkle: true },
  ];

  const radio = { ctx: null, master: null, music: null, sfx: null, nodes: [], timer: 0, step: 0, started: false };

  function defaultSound() {
    return {
      master: true, music: true, sfx: true, track: "harbor", musicVol: 0.42, sfxVol: 0.55, autoTrack: false,
      cards: true, fisher: true, school: true, calm: false, water: 1, tempo: 1, gulls: true,
      typeLg: false, contrast: false, watch: "normal", linger: 18, moonHud: true, release: false,
      note: true, catName: "Miso", boatName: "Kindling", pauseDesk: false, setPage: "sound",
    };
  }
  function soundState() {
    state.sound = Object.assign(defaultSound(), state.sound || {});
    return state.sound;
  }

  function trackBy() {
    return TRACKS.find((t) => t.id === soundState().track) || TRACKS[0];
  }

  function weatherTrack() {
    if (isFestOpen()) return "fair";
    if (state.weather === "rain" || state.weather === "snow") return "rain";
    if (state.weather === "fog") return "fog";
    if (isNight()) return "night";
    if (state.weather === "wind") return "lullaby";
    if (seasonId() === "winter") return "frost";
    return "harbor";
  }

  function ensureAudio() {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      if (!radio.ctx) {
        radio.ctx = new AC();
        radio.master = radio.ctx.createGain();
        radio.music = radio.ctx.createGain();
        radio.sfx = radio.ctx.createGain();
        radio.music.connect(radio.master);
        radio.sfx.connect(radio.master);
        radio.master.connect(radio.ctx.destination);
      }
      if (radio.ctx.state === "suspended") radio.ctx.resume();
      audioCtx = radio.ctx;
      applySoundGains();
      return radio.ctx;
    } catch {
      return null;
    }
  }

  function applySoundGains() {
    const s = soundState();
    if (!radio.master) return;
    radio.master.gain.value = (s.master && !state.muted) ? 1 : 0;
    radio.music.gain.value = s.music ? Number(s.musicVol) || 0 : 0;
    radio.sfx.gain.value = s.sfx ? Number(s.sfxVol) || 0 : 0;
  }

  function midi(n) { return 440 * Math.pow(2, (n - 69) / 12); }

  function stopRadio() {
    radio.nodes.forEach((n) => {
      try { n.stop(); } catch (_) {}
      try { n.disconnect(); } catch (_) {}
    });
    radio.nodes = [];
    if (radio.timer) { clearInterval(radio.timer); radio.timer = 0; }
    radio.step = 0;
  }

  function startRadio() {
    const ctx = ensureAudio();
    if (!ctx) return;
    stopRadio();
    const s = soundState();
    if (!s.master || state.muted || !s.music) return;
    if (s.autoTrack) s.track = weatherTrack();
    const tr = trackBy();
    const now = ctx.currentTime;

    const noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < data.length; i++) {
      last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02;
      data[i] = last;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuf;
    noise.loop = true;
    const nf = ctx.createBiquadFilter();
    nf.type = "lowpass";
    nf.frequency.value = tr.id === "rain" ? 900 : 420;
    const ng = ctx.createGain();
    ng.gain.value = tr.noise * (Number(s.water) || 1);
    noise.connect(nf); nf.connect(ng); ng.connect(radio.music);
    noise.start();
    radio.nodes.push(noise);

    tr.pad.forEach((int, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = i % 2 ? "sine" : "triangle";
      o.frequency.value = midi(tr.root - 12 + int);
      g.gain.value = 0;
      o.connect(g); g.connect(radio.music);
      o.start();
      g.gain.linearRampToValueAtTime(0.045 / (i + 1), now + 1.4 + i * 0.2);
      radio.nodes.push(o);
    });

    const beat = 60000 / (tr.bpm * (Number(s.tempo) || 1));
    radio.timer = setInterval(() => {
      if (!radio.ctx || !soundState().music || state.muted) return;
      const t = trackBy();
      const when = radio.ctx.currentTime;
      const step = radio.step++;
      if (t.bass.length && step % 2 === 0) {
        const deg = t.bass[(step / 2) % t.bass.length];
        pluck(midi(t.root - 24 + deg), 0.7, 0.05, "sine", when);
      }
      if (t.pattern.length && (step % 2 === 1 || t.id === "fair")) {
        const deg = t.pattern[step % t.pattern.length];
        if (deg != null) pluck(midi(t.root + deg), t.id === "night" ? 0.9 : 0.38, 0.045, "triangle", when);
      }
      if (t.sparkle && step % 8 === 5 && Math.random() < 0.55) {
        pluck(midi(t.root + 12 + t.scale[step % t.scale.length]), 0.5, 0.02, "sine", when);
      }
      if (soundState().gulls !== false && step % 16 === 9 && Math.random() < 0.4) {
        pluck(midi(t.root + 19), 0.18, 0.018, "sine", when);
      }
    }, beat);
    radio.started = true;
    renderSettings();
  }

  function pluck(freq, dur, gain, type, when) {
    if (!radio.ctx || !radio.music) return;
    const o = radio.ctx.createOscillator();
    const g = radio.ctx.createGain();
    o.type = type || "triangle";
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, when);
    g.gain.exponentialRampToValueAtTime(gain, when + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    o.connect(g); g.connect(radio.music);
    o.start(when);
    o.stop(when + dur + 0.05);
  }

  function setTrack(id) {
    soundState().track = id;
    soundState().autoTrack = false;
    startRadio();
    save();
  }

  function tone(freq, dur, type, gain) {
    const s = soundState();
    if (state.muted || !s.master || !s.sfx) return;
    try {
      const ctx = ensureAudio();
      if (!ctx) return;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type || "sine";
      o.frequency.value = freq;
      g.gain.value = (gain || 0.03) * (s.sfxVol || 0.55);
      o.connect(g);
      g.connect(radio.sfx || ctx.destination);
      o.start();
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + (dur || 0.1));
      o.stop(ctx.currentTime + (dur || 0.1) + 0.02);
    } catch (_) {}
  }

  function toast(msg) {
    const el = $("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.remove("hidden");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.add("hidden"), 2400);
  }

  function farmSay(text) {
    const el = $("say");
    if (!el) return;
    el.textContent = text;
    el.classList.remove("hidden");
    setTimeout(() => el.classList.add("hidden"), 2200);
  }

  function modal(title, body, actions) {
    $("modal-title").textContent = title;
    $("modal-body").textContent = body;
    $("modal").classList.remove("hidden");
    const box = $("modal-actions");
    box.innerHTML = "";
    const list = actions || [{ label: "Come ashore", fn: closeModal }];
    list.forEach((a) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "primary-btn";
      b.textContent = a.label;
      b.addEventListener("click", () => { closeModal(); if (a.fn) a.fn(); });
      box.appendChild(b);
    });
  }
  function closeModal() {
    $("modal").classList.add("hidden");
    if ($("modal-portrait")) {
      $("modal-portrait").classList.add("hidden");
      $("modal-portrait").innerHTML = "";
    }
  }

  function showPortrait(id) {
    const port = $("modal-portrait");
    if (!port) return;
    const html = sprite(id) || fishArt(id, 0) || "";
    if (!html) {
      port.classList.add("hidden");
      return;
    }
    port.innerHTML = html;
    port.classList.remove("hidden");
  }

  function showCraftPicker(first) {
    const craft = craftBy();
    showPortrait(craft.art);
    modal(
      "Choose a craft",
      first
        ? "The dock will still be yours. Only the walk changes."
        : "Maren will pour you a new name for 40 coins. The kettle refills.",
      []
    );
    const box = $("modal-actions");
    const keep = document.createElement("button");
    keep.type = "button";
    keep.className = "primary-btn";
    keep.textContent = first ? "Keep " + craft.name : "Keep " + craft.name;
    keep.addEventListener("click", () => pickCraft(craft.id, first));
    box.appendChild(keep);
    const grid = document.createElement("div");
    grid.className = "class-pick";
    Object.values(CRAFTS).forEach((c) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "class-btn" + (state.classId === c.id ? " on" : "");
      btn.innerHTML = `<strong>${c.name}</strong><span>${c.blurb}</span><span>${c.skill}</span>`;
      btn.addEventListener("click", () => pickCraft(c.id, first));
      grid.appendChild(btn);
    });
    box.appendChild(grid);
  }

  function pickCraft(id, first) {
    if (!first && !spend(40)) {
      toast("The inn wants 40 coins to retrain.");
      return;
    }
    state.classId = id;
    state.pickedClass = true;
    if (first && id === "dockhand") {
      const d = state.docks[0];
      if (d && d.slips[START_UNLOCKED]) d.slips[START_UNLOCKED].unlocked = true;
    }
    closeModal();
    toast("A " + craftBy().name + ". The tide agrees.");
    renderHud();
    paintAll();
    save();
  }

  function showIntro() {
    state.sawIntro = true;
    save();
    showPortrait("odo");
    modal(
      "Idle Cozy Fishing",
      "A sleepy dock where the fish come when they are ready.\n\nYour lines wait. Hearts are real. The kettle is already warm.",
      [{ label: "Choose a craft", fn: () => showCraftPicker(true) }]
    );
  }

  function flashCoins() {
    const el = $("coin-pill");
    if (!el) return;
    el.classList.add("flash");
    setTimeout(() => el.classList.remove("flash"), 400);
  }

  function poseFisher(kind) {
    const el = $("fisher");
    if (!el) return;
    el.classList.remove("casting", "reeling");
    void el.offsetWidth;
    el.classList.add(kind);
    setTimeout(() => el.classList.remove(kind), 700);
  }

  function playReelFx(el, fish) {
    const fx = $("fx");
    if (!fx || !el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const leap = document.createElement("div");
    leap.className = "fish-leap";
    leap.style.left = cx + "px";
    leap.style.top = cy + "px";
    leap.innerHTML = fishArt(fish.id, fish.look || 0);
    fx.appendChild(leap);
    for (let i = 0; i < 8; i++) {
      const d = document.createElement("span");
      d.className = "water-burst";
      d.style.left = cx + "px";
      d.style.top = cy + "px";
      const a = (Math.PI * 2 * i) / 8;
      d.style.setProperty("--dx", Math.round(Math.cos(a) * 28) + "px");
      d.style.setProperty("--dy", Math.round(Math.sin(a) * 18 - 10) + "px");
      fx.appendChild(d);
      setTimeout(() => d.remove(), 700);
    }
    setTimeout(() => leap.remove(), 900);
  }

  function queueCatch(fish, how) {
    if (soundState().cards === false) return;
    catchQueue.push({ fish, how });
    if (!catchBusy) drainCatch();
  }

  function drainCatch() {
    const next = catchQueue.shift();
    if (!next) { catchBusy = false; hideCatch(); return; }
    catchBusy = true;
    showCatchCard(next.fish, next.how);
    clearTimeout(catchTimer);
    const linger = Math.max(800, (Number(soundState().linger) || 18) * 100);
    catchTimer = setTimeout(drainCatch, catchQueue.length ? Math.min(720, linger) : linger);
  }

  function showCatchCard(fish, how) {
    const box = $("catch");
    if (!box) return;
    $("catch-art").innerHTML = fishArt(fish.id, 0);
    $("catch-art").classList.remove("splash");
    void $("catch-art").offsetWidth;
    $("catch-art").classList.add("splash");
    $("catch-name").textContent = fish.name;
    $("catch-log").textContent = (how || "The line sang.") + " " + (fish.hint || "");
    box.classList.remove("hidden");
  }

  function hideCatch() {
    const box = $("catch");
    if (box) box.classList.add("hidden");
  }

  function puff(x, y, text) {
    const fx = $("fx");
    if (!fx) return;
    const el = document.createElement("div");
    el.className = "puff";
    el.textContent = text;
    el.style.left = x + "px";
    el.style.top = y + "px";
    fx.appendChild(el);
    setTimeout(() => el.remove(), 900);
  }

  function slipPriceAt(i) {
    let n = SLIP_PRICES[i] || SLIP_PRICES[SLIP_PRICES.length - 1] * (i - 8);
    if (heartPerk("cob")) n = Math.round(n * 0.88);
    return n;
  }

  function dockPrice(owned) {
    return Math.round(400 * Math.pow(2.1, owned - 1) * 4);
  }

  function nextEmptySlip(dock) {
    dock = dock || currentDock();
    return dock.slips.findIndex((s) => s.unlocked && !s.fish);
  }

  function castAt(i, auto, dock) {
    dock = dock || currentDock();
    const slip = dock.slips[i];
    if (!slip || !slip.unlocked || slip.fish) return false;
    const fish = fishById(state.selected);
    if (!canCast(fish, dock)) return false;
    const cost = baitCost(fish);
    let wages = 0;
    if (auto) {
      wages = payWage("cast");
      if (!wages) return false;
    }
    if (!spend(cost)) return false;
    if (!takeBait()) {
      state.coins += cost;
      if (auto) earn(wages);
      toast("The bait tin is empty. Buy more in Desk → Tackle.");
      return false;
    }
    slip.fish = fish.id;
    slip.castAt = Date.now();
    slip.invested = cost;
    slip.wages = wages;
    slip.look = rollLook();
    tone(330, 0.08, "sine", 0.03);
    if (!auto || dock === currentDock()) poseFisher("casting");
    return true;
  }

  function reelAt(i, auto, dock, el) {
    dock = dock || currentDock();
    const slip = dock.slips[i];
    if (!slip || !slip.fish) return false;
    const fish = fishById(slip.fish);
    if (!fish) { slip.fish = null; return false; }
    if (Date.now() - slip.castAt < biteTime(fish, slip, dock)) return false;
    let wages = slip.wages || 0;
    if (auto) {
      const w = payWage("reel");
      if (!w) return false;
      wages += w;
    }
    const result = rollCatch(fish, dock);
    if (result.kind === "away") {
      slip.lastFish = fish.id;
      slip.fish = null;
      slip.castAt = 0;
      slip.invested = 0;
      slip.wages = 0;
      if (!auto || dock === currentDock()) {
        poseFisher("reeling");
        queueCatch(result.fish, result.heavy ? "Too heavy for the rod. It slipped." : "The one that got away.");
      }
      toast(result.heavy ? "Too much fish for this rod." : "Got away. The water kept the story.");
      return true;
    }
    const got = result.fish;
    const release = !!(soundState().release);
    if (release) {
      noteMastery(got.id, 1);
      noteRecord(got.id, { count: 1, oz: result.oz, released: 1 });
      if (dock.stock != null) dock.stock = Math.min(100, (dock.stock || 80) + 2);
    } else {
      addPantry(got.id, 1, slip.invested, wages);
      if (dock.stock != null) dock.stock = Math.max(0, (dock.stock || 80) - (result.stars || 1));
      noteMastery(got.id, 1);
      noteRecord(got.id, { count: 1, oz: result.oz });
    }
    state.caught += 1;
    state.weekCatch = state.weekCatch || {};
    state.weekCatch[got.id] = true;
    bumpAlmanac("reel", 1);
    bumpAlmanac("kinds", Object.keys(state.weekCatch).length);
    slip.lastFish = got.id;
    slip.fish = null;
    slip.castAt = 0;
    slip.invested = 0;
    slip.wages = 0;
    tone(494, 0.1, "triangle", 0.04);
    const vis = el || (dock === currentDock() && $("field") && $("field").children[i]);
    if (vis) {
      const r = vis.getBoundingClientRect();
      puff(r.left + r.width / 2, r.top, got.name + (result.oz ? " · " + result.oz + "oz" : ""));
      playReelFx(vis, got);
    }
    if (!auto || dock === currentDock()) {
      poseFisher("reeling");
      const extra = got.id !== fish.id ? " Not the one you named — still a guest." : "";
      const rel = release ? " You let it go." : "";
      queueCatch(got, (auto ? "The hired line sang." : "You reeled.") + (result.oz ? " " + result.oz + " oz." : "") + extra + rel);
    }
    maybeStory();
    return true;
  }

  function onSlip(i, el) {
    const slip = slips()[i];
    if (!slip) return;
    if (!slip.unlocked) {
      if (spend(slipPriceAt(i))) {
        slip.unlocked = true;
        tone(392, 0.1, "sine", 0.04);
        paintAll();
        save();
      } else toast("Need " + fmt(slipPriceAt(i)) + " to open this slip.");
      return;
    }
    if (slip.fish) {
      const fish = fishById(slip.fish);
      const wait = fish ? biteTime(fish, slip, currentDock()) - (Date.now() - slip.castAt) : 0;
      if (wait > 0) toast(fish.name + " still needs " + Math.ceil(wait / 1000) + "s.");
      else {
        reelAt(i, false, currentDock(), el);
        paintSlip(i);
        renderHud();
        renderPantry();
        save();
      }
      return;
    }
    const fish = fishById(state.selected);
    if (!fish) {
      toast("Open Desk → Tackle and tap a fish first.");
      setDesk(true);
      setTab("tackle");
      return;
    }
    if (!canCast(fish)) {
      toast(state.lifetime < fish.unlock
        ? fish.name + " is still locked. Earn " + fmt(fish.unlock) + " first."
        : !inSeason(fish) && !state.upgrades.icehouse
          ? fish.name + " is sleeping until its season. An icehouse would help."
          : fish.name + " does not like this water. Try another dock.");
      return;
    }
    if (state.coins < baitCost(fish)) {
      toast("Need " + fmt(baitCost(fish)) + " for " + fish.name + " bait.");
      return;
    }
    castAt(i, false);
    paintSlip(i);
    renderHud();
    save();
  }

  function collectBoats(auto) {
    let n = 0;
    BOATS.forEach((b) => {
      const have = state.boats[b.id] || 0;
      const bin = state.bins[b.id] || 0;
      if (!have || !bin) return;
      let wage = 0;
      if (auto) {
        wage = payWage("boat");
        if (!wage) return;
      }
      addPantry(b.produce, bin, itemBasis(b.produce) * bin, wage);
      state.bins[b.id] = 0;
      n += bin;
      bumpAlmanac("boat", bin);
    });
    if (n) {
      toast("Boats brought " + n + ".");
      renderBoats();
      renderPantry();
      renderHud();
      save();
    }
    return n;
  }

  function sellCreel(auto) {
    const ids = Object.keys(state.pantry);
    if (!ids.length) { toast("The creel is empty."); return 0; }
    let gained = 0;
    ids.forEach((id) => {
      const n = pantryCount(id);
      if (!n) return;
      const pay = sellPayout(id, n, auto);
      takePantry(id, n);
      earn(pay);
      gained += pay;
    });
    if (gained) {
      toast("Sold the creel for " + fmt(gained) + ".");
      renderPantry();
      renderHud();
      save();
    }
    return gained;
  }

  function cook(id, auto) {
    const rec = RECIPES.find((r) => r.id === id);
    if (!rec) return false;
    if ((state.upgrades.cottage || 0) < rec.cottage) {
      toast("The kitchen is too small for " + rec.name + ".");
      return false;
    }
    if (Object.keys(rec.needs).some((k) => pantryCount(k) < rec.needs[k])) {
      toast("Missing pieces for " + rec.name + ".");
      return false;
    }
    if (auto && !payWage("cook")) return false;
    let spent = 0;
    Object.keys(rec.needs).forEach((k) => {
      spent += pantryUnitCost(k) * rec.needs[k];
      takePantry(k, rec.needs[k]);
    });
    addPantry(rec.id, 1, spent);
    bumpAlmanac("cook", 1);
    toast(rec.say);
    renderPantry();
    renderRecipes();
    renderHud();
    save();
    return true;
  }

  function giftNpc(npc, want) {
    if (pantryCount(want.item) < want.n) {
      toast("Need " + want.n + " " + itemName(want.item) + ".");
      return;
    }
    for (let i = 0; i < want.n; i++) takePantry(want.item);
    earn(want.pay);
    state.hearts[npc.id] = Math.min(5, (state.hearts[npc.id] || 0) + 1);
    bumpAlmanac("gift", 1);
    toast(npc.name + " smiles. " + want.say);
    renderVillage();
    renderPantry();
    renderHud();
    save();
  }

  function bumpAlmanac(kind, n) {
    const a = state.almanac;
    const goal = WEEK_GOALS[a.goal % WEEK_GOALS.length];
    if (!goal || a.done) return;
    if (goal.kind === "kinds") a.progress = n;
    else if (goal.kind === kind) a.progress = (a.progress || 0) + n;
    if (a.progress >= goal.n) {
      a.done = true;
      a.favors = (a.favors || 0) + 1;
      toast("Week kept. A favor for the tide book.");
    }
  }

  function maybeStory() {
    STORY.forEach((s) => {
      if (state.stories.indexOf(s.at) >= 0) return;
      if (state.lifetime >= s.at) {
        state.stories.push(s.at);
        modal(s.title, s.text);
      }
    });
  }

  function spawnForage() {
    if (state.forage.length >= 4) return;
    const pool = ["kelp", "kelp", "starfish", "clam"];
    if (state.decor.birdbath) pool.push("starfish");
    if (heartPerk("odo")) pool.push("kelp");
    if (isNight() && state.decor.lantern) pool.push("pearl");
    if (state.classId === "shore") pool.push("kelp", "starfish");
    const id = pool[Math.floor(Math.random() * pool.length)];
    state.forage.push({
      id,
      x: 12 + Math.random() * 70,
      y: 58 + Math.random() * 22,
      at: Date.now(),
    });
  }

  function pickForage(i, auto) {
    const f = state.forage[i];
    if (!f) return;
    if (auto && !payWage("forage")) return;
    addPantry(f.id, 1, itemBasis(f.id));
    bumpAlmanac("forage", 1);
    state.forage.splice(i, 1);
    renderForage();
    renderPantry();
    save();
  }

  function runDockOnce() {
    let did = 0;
    state.docks.forEach((dock) => {
      dock.slips.forEach((slip, i) => {
        if (slip.fish) {
          const fish = fishById(slip.fish);
          if (fish && Date.now() - slip.castAt >= biteTime(fish, slip, dock)) {
            if (reelAt(i, true, dock)) did++;
          }
        } else if (slip.unlocked && canCast(fishById(state.selected), dock)) {
          if (castAt(i, true, dock)) did++;
        }
      });
    });
    collectBoats(true);
    if (state.auto.sell) sellCreel(true);
    if (did) {
      paintAll();
      renderHud();
      save();
    } else toast("Nothing ready, or the wage tin is shy.");
  }

  function tickBoats(now) {
    BOATS.forEach((b) => {
      const have = state.boats[b.id] || 0;
      if (!have) return;
      const last = state.lastBoat[b.id] || now;
      const dt = now - last;
      const interval = state.classId === "skipper" ? Math.round(b.interval * 0.88) : b.interval;
      const n = Math.floor(dt / interval);
      if (n <= 0) return;
      const room = b.max * have - (state.bins[b.id] || 0);
      const add = Math.min(room, n * have);
      if (add > 0) state.bins[b.id] = (state.bins[b.id] || 0) + add;
      state.lastBoat[b.id] = last + n * interval;
    });
  }

  function rollWeather() {
    const list = WEATHERS[seasonId()] || WEATHERS.spring;
    state.weather = list[Math.floor(Math.random() * list.length)];
  }

  function onNewDay(prev, next) {
    if (state.forecast) state.weather = state.forecast;
    else rollWeather();
    const nxt = (WEATHERS[seasonId()] || WEATHERS.spring);
    state.forecast = nxt[Math.floor(Math.random() * nxt.length)];
    const season = seasonId();
    const letters = LETTERS[season] || LETTERS.spring;
    state.mail = { day: next, unread: true, body: letters[next % letters.length] };
    if (heartPerk("wren") && Math.random() < 0.35) {
      state.mail.body += " Wren tucked 8 coins in the fold.";
      earn(8);
    }
    const week = Math.floor((next - 1) / 7);
    if (week !== state.almanac.week) {
      state.almanac.week = week;
      state.almanac.goal = (state.almanac.goal + 1) % WEEK_GOALS.length;
      state.almanac.progress = 0;
      state.almanac.done = false;
      state.weekCatch = {};
      seedOrders();
    }
    state.docks.forEach((d) => { d.stock = Math.min(100, (d.stock || 80) + 8); });
    if (next % 2 === 0) spawnForage();
    if (soundState().autoTrack) {
      soundState().track = weatherTrack();
      if (radio.started) startRadio();
    }
    if (isFestOpen() && FESTIVALS[season]) {
      $("fest-line").textContent = " · " + FESTIVALS[season].name;
      $("fest-line").classList.add("on");
    }
  }

  function applyOffline() {
    const now = Date.now();
    const dt = Math.min(OFFLINE_CAP_MS, Math.max(0, now - (state.lastTick || now)));
    if (dt < 4000) { state.lastTick = now; return null; }
    const steps = Math.min(400, Math.floor(dt / 1500));
    let reels = 0;
    for (let s = 0; s < steps; s++) {
      const t = state.lastTick + s * 1500;
      tickBoats(t);
      if (state.auto.reel || state.auto.cast) {
        state.docks.forEach((dock) => {
          dock.slips.forEach((slip, i) => {
            if (slip.fish && state.auto.reel) {
              const fish = fishById(slip.fish);
              if (fish && t - slip.castAt >= biteTime(fish, slip, dock)) {
                if (reelAt(i, true, dock)) reels++;
              }
            } else if (!slip.fish && slip.unlocked && state.auto.cast) {
              if (castAt(i, true, dock)) slip.castAt = t;
            }
          });
        });
      }
    }
    tickBoats(now);
    if (state.auto.boat) collectBoats(true);
    if (state.auto.sell) sellCreel(true);
    state.lastTick = now;
    const hours = (dt / 3600000).toFixed(1);
    return { hours, reels };
  }

  function timeOfDayClass() {
    const t = ((Date.now() - state.startedAt) % DAY_MS) / DAY_MS;
    if (t < 0.18) return "morning";
    if (t < 0.55) return "noon";
    if (t < 0.72) return "noon";
    return "night";
  }

  function paintWorld() {
    const world = $("world");
    const sky = $("sky");
    const season = seasonId();
    world.className = "world painted season-" + season + " weather-" + state.weather + (isFestOpen() ? " festive" : "");
    sky.className = "sky " + timeOfDayClass();
    $("weather-layer").innerHTML = "";
    if (state.weather === "rain") {
      for (let i = 0; i < 24; i++) {
        const d = document.createElement("span");
        d.className = "drop";
        d.style.left = (Math.random() * 100) + "%";
        d.style.animationDuration = (0.7 + Math.random() * 0.6) + "s";
        $("weather-layer").appendChild(d);
      }
    } else if (state.weather === "snow") {
      for (let i = 0; i < 18; i++) {
        const d = document.createElement("span");
        d.className = "flake";
        d.textContent = "❄";
        d.style.left = (Math.random() * 100) + "%";
        d.style.animationDuration = (4 + Math.random() * 4) + "s";
        $("weather-layer").appendChild(d);
      }
    } else if (state.weather === "wind") {
      for (let i = 0; i < 4; i++) {
        const d = document.createElement("span");
        d.className = "gust";
        d.style.top = (18 + i * 12) + "%";
        d.style.animationDelay = (-i) + "s";
        $("weather-layer").appendChild(d);
      }
    }
    renderDecor();
    renderForage();
    renderHotspots();
    const dock = currentDock();
    const water = dockWater(dock);
    const boat = soundState().boatName || "Kindling";
    $("world-note").textContent = dock.name + " · " + water.name + " water · " + TIDE_SAY[tideId()] + " · " + boat + " at the piling" + (state.forecast ? " · tomorrow " + (WEATHER_SAY[state.forecast] || state.forecast) : "");
    renderSchool();
    renderFisher();
  }

  function renderSchool() {
    const box = $("school");
    if (!box || box.childElementCount) return;
    box.innerHTML = [1, 2, 3, 4, 5].map((n) => `<span class="swim s${n}"></span>`).join("");
  }

  function renderFisher() {
    const el = $("fisher");
    if (!el) return;
    const art = sprite("odo") || sprite("maren") || sprite(craftBy().art);
    if (el.dataset.art !== (state.classId || "odo")) {
      el.dataset.art = state.classId || "odo";
      el.innerHTML = art;
    }
  }

  function renderDecor() {
    const layer = $("decor-layer");
    layer.innerHTML = DECOR.filter((d) => state.decor[d.id]).map((d) =>
      `<div class="decor-item" style="left:${d.x};top:${d.y}">${sprite(d.art) || sprite(d.id)}</div>`
    ).join("");
  }

  function renderForage() {
    const layer = $("forage-layer");
    layer.innerHTML = "";
    state.forage.forEach((f, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "forage-spot";
      b.style.left = f.x + "%";
      b.style.top = f.y + "%";
      b.innerHTML = goodArt(f.id) || fishArt("clam", 0);
      b.title = itemName(f.id);
      b.addEventListener("click", () => pickForage(i, false));
      layer.appendChild(b);
    });
  }

  function renderHotspots() {
    const layer = $("hotspots");
    layer.innerHTML = "";
    const spots = [
      { x: "8%", y: "42%", w: "16%", h: "22%", title: "Lighthouse", fn: () => {
        if (state.wishDay === harborDay()) { toast("The light already knows you today."); return; }
        state.wishDay = harborDay();
        farmSay("The lighthouse nods. Bites hurry until morning.");
        save();
      } },
      { x: "78%", y: "36%", w: "14%", h: "18%", title: "Kettle", fn: () => { setDesk(true); setTab("kitchen"); } },
      { x: "4%", y: "70%", w: "12%", h: "16%", title: "Harbor cat", fn: () => {
        const cat = soundState().catName || "Miso";
        farmSay(cat + " approves of your shoes.");
        if (Math.random() < 0.2) { earn(2); toast(cat + " donated two coins. Taxation, really."); }
      } },
    ];
    spots.forEach((s) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "hot";
      b.style.left = s.x; b.style.top = s.y; b.style.width = s.w; b.style.height = s.h;
      b.title = s.title;
      b.addEventListener("click", s.fn);
      layer.appendChild(b);
    });
  }

  function buildField() {
    const field = $("field");
    field.innerHTML = "";
    for (let i = 0; i < SLIP_COUNT; i++) {
      const el = document.createElement("button");
      el.type = "button";
      el.className = "plot";
      el.addEventListener("click", () => onSlip(i, el));
      field.appendChild(el);
      paintSlip(i);
    }
    renderFieldBar();
  }

  function paintSlip(i) {
    const slip = slips()[i];
    const el = $("field").children[i];
    if (!el || !slip) return;
    el.classList.toggle("locked", !slip.unlocked);
    el.classList.remove("ready", "growing", "fishing");
    if (!slip.unlocked) {
      el.innerHTML = `<span class="bed"></span><span class="price">${fmt(slipPriceAt(i))}</span>`;
      el.title = "Open this slip for " + fmt(slipPriceAt(i));
      el.dataset.art = "locked";
      return;
    }
    if (!slip.fish) {
      const ghost = fishById(state.selected);
      if (ghost && canCast(ghost)) {
        el.innerHTML = `<span class="bed"></span><span class="plant">${fishArt(ghost.id, 0)}</span>`;
        el.classList.add("ghost-seed");
        el.title = "Cast for " + ghost.name + " · " + fmt(baitCost(ghost));
      } else {
        el.innerHTML = `<span class="bed"></span><span class="plant"><span class="plant-plus">+</span></span>`;
        el.title = "Empty slip — pick a fish in Desk → Tackle";
      }
      el.dataset.art = "empty";
      return;
    }
    const fish = fishById(slip.fish);
    if (!fish) { slip.fish = null; paintSlip(i); return; }
    const g = biteTime(fish, slip, currentDock());
    const t = Date.now() - slip.castAt;
    const ready = t >= g;
    el.classList.toggle("ready", ready);
    el.classList.toggle("growing", !ready);
    el.classList.toggle("fishing", !ready);
    el.style.setProperty("--stage", String(0.4 + Math.min(1, t / g) * 0.6));
    const tug = !ready && t / g > 0.72;
    el.classList.toggle("tug", tug);
    if (ready) {
      el.innerHTML = `<span class="bed"></span><span class="line"></span><span class="splash-ring"></span><span class="plant">${fishArt(fish.id, slip.look)}</span>`;
      el.title = fish.name + " is ready — click to watch the reel";
    } else {
      el.innerHTML = `<span class="bed"></span><span class="line"></span><span class="splash-ring"></span><span class="shadow-fish">${fishArt(fish.id, slip.look)}</span><span class="plant"><span class="bobber"></span></span>`;
      el.title = fish.name + " · " + Math.ceil((g - t) / 1000) + "s — the line is working";
    }
    el.dataset.art = fish.id + (ready ? "-ready" : "-cast");
  }

  function paintAll() {
    for (let i = 0; i < SLIP_COUNT; i++) paintSlip(i);
    renderFieldBar();
    paintWorld();
  }

  function renderFieldBar() {
    const bar = $("field-bar");
    const dock = currentDock();
    const water = dockWater(dock);
    const price = dockPrice(state.docks.length);
    bar.innerHTML = "";
    const prev = document.createElement("button");
    prev.type = "button"; prev.className = "once-btn"; prev.textContent = "←";
    prev.disabled = state.viewDock <= 0;
    prev.addEventListener("click", () => showDock(state.viewDock - 1));
    const label = document.createElement("div");
    label.className = "field-label";
    label.innerHTML = `<strong>${dock.name}</strong><span>${water.name} · stock ${Math.round(dock.stock || 80)} · ${state.viewDock + 1}/${state.docks.length}</span>`;
    label.title = "Double-click to rename. " + water.say;
    label.addEventListener("dblclick", () => {
      const next = prompt("Name this dock", dock.name);
      if (next == null) return;
      dock.name = (next || "").trim() || dock.name;
      renderFieldBar();
      save();
    });
    const next = document.createElement("button");
    next.type = "button"; next.className = "once-btn"; next.textContent = "→";
    next.disabled = state.viewDock >= state.docks.length - 1;
    next.addEventListener("click", () => showDock(state.viewDock + 1));
    const bait = document.createElement("button");
    bait.type = "button"; bait.className = "once-btn";
    const sel = fishById(state.selected);
    bait.textContent = sel ? sel.name : "Bait";
    bait.addEventListener("click", () => { setDesk(true); setTab("tackle"); });
    const buy = document.createElement("button");
    buy.type = "button"; buy.className = "buy-btn";
    buy.textContent = "Dock " + fmt(price);
    buy.disabled = state.coins < price;
    buy.addEventListener("click", buyDock);
    const rel = document.createElement("button");
    rel.type = "button";
    rel.className = "once-btn";
    rel.textContent = soundState().release ? "Release" : "Keep";
    rel.title = "Catch and release, or keep for the creel";
    rel.addEventListener("click", () => {
      soundState().release = !soundState().release;
      renderFieldBar(); renderSettings(); save();
      toast(soundState().release ? "The fish go home." : "The creel is open again.");
    });
    bar.append(prev, label, next, bait, rel, buy);
  }

  function showDock(i) {
    if (i < 0 || i >= state.docks.length) return;
    state.viewDock = i;
    paintAll();
    renderShop();
    save();
  }

  function buyDock() {
    const price = dockPrice(state.docks.length);
    if (!spend(price)) return;
    state.docks.push(makeDock(state.docks.length));
    state.viewDock = state.docks.length - 1;
    toast("Deed signed: " + currentDock().name + ".");
    paintAll();
    renderHud();
    save();
  }

  function renderHud() {
    $("coins").textContent = fmt(state.coins);
    $("wage-num").textContent = fmt(state.books.wages || 0);
    $("star-num").textContent = unspentStars();
    $("year-num").textContent = yearNum();
    $("season-name").textContent = SEASON_LABEL[seasonId()];
    $("day-num").textContent = harborDay();
    $("weather").textContent = WEATHER_SAY[state.weather] || state.weather;
    $("tide-name").textContent = tideId();
    if ($("moon-name")) $("moon-name").textContent = MOON_SAY[moonId()] || moonId();
    const fest = FESTIVALS[seasonId()];
    if (fest && isFestOpen()) {
      $("fest-line").textContent = " · " + fest.name;
      $("fest-line").classList.add("on");
    } else {
      $("fest-line").textContent = "";
      $("fest-line").classList.remove("on");
    }
    $("mail-dot").classList.toggle("hidden", !state.mail.unread);
    $("btn-mute").classList.toggle("muted", !!state.muted);
    if ($("hero-name")) $("hero-name").textContent = state.fisherName || "Rowan";
    if ($("craft-name")) $("craft-name").textContent = craftBy().name;
    applyDockPrefs();
  }

  function applyDockPrefs() {
    const s = soundState();
    document.body.classList.toggle("calm-motion", !!s.calm);
    document.body.classList.toggle("hide-fisher", s.fisher === false);
    document.body.classList.toggle("hide-school", s.school === false);
    document.body.classList.toggle("type-lg", !!s.typeLg);
    document.body.classList.toggle("hi-contrast", !!s.contrast);
    document.body.classList.toggle("hide-note", s.note === false);
    document.body.classList.toggle("hide-moon", s.moonHud === false);
    if ($("set-cat") && document.activeElement !== $("set-cat")) $("set-cat").value = s.catName || "Miso";
    if ($("set-boatname") && document.activeElement !== $("set-boatname")) $("set-boatname").value = s.boatName || "Kindling";
    if ($("set-watch")) $("set-watch").value = s.watch || "normal";
    if ($("set-linger")) $("set-linger").value = s.linger || 18;
    if ($("set-water")) $("set-water").value = Math.round((s.water || 1) * 100);
    if ($("set-tempo")) $("set-tempo").value = Math.round((s.tempo || 1) * 100);
    if ($("set-name") && document.activeElement !== $("set-name")) {
      $("set-name").value = state.fisherName || "Rowan";
    }
  }

  function renderSettings() {
    const box = $("settings");
    if (!box) return;
    const s = soundState();
    const on = (id, yes) => { const el = $(id); if (el) el.classList.toggle("on", !!yes); };
    on("set-master", s.master && !state.muted);
    on("set-music", s.music);
    on("set-sfx", s.sfx);
    on("set-autotrack", s.autoTrack);
    on("set-cards", s.cards !== false);
    on("set-fisher", s.fisher !== false);
    on("set-school", s.school !== false);
    on("set-calm", !!s.calm);
    on("set-gulls", s.gulls !== false);
    on("set-moonhud", s.moonHud !== false);
    on("set-note", s.note !== false);
    on("set-release", !!s.release);
    on("set-type", !!s.typeLg);
    on("set-contrast", !!s.contrast);
    on("set-pausedesk", !!s.pauseDesk);
    document.querySelectorAll(".set-nav .cat").forEach((c) => c.classList.toggle("on", c.dataset.set === (s.setPage || "sound")));
    ["sound", "dock", "play"].forEach((p) => {
      const el = $("set-page-" + p);
      if (el) el.classList.toggle("hidden", (s.setPage || "sound") !== p);
    });
    if ($("set-mvol")) $("set-mvol").value = Math.round((s.musicVol || 0) * 100);
    if ($("set-svol")) $("set-svol").value = Math.round((s.sfxVol || 0) * 100);
    const tracks = $("set-tracks");
    if (tracks) {
      tracks.innerHTML = "";
      TRACKS.forEach((t) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "track-btn" + (s.track === t.id ? " on" : "");
        b.innerHTML = `<strong>${t.name}</strong><span>${t.blurb}</span>`;
        b.addEventListener("click", () => { ensureAudio(); setTrack(t.id); });
        tracks.appendChild(b);
      });
    }
  }

  function openSettings() {
    ensureAudio();
    if (soundState().music && !radio.started) startRadio();
    $("settings").classList.remove("hidden");
    renderSettings();
  }

  function closeSettings() {
    $("settings").classList.add("hidden");
  }

  function openDesk() {
    closeSettings();
    document.body.classList.add("setup");
    document.body.classList.remove("play");
    $("btn-desk").classList.add("hidden");
    if ($("btn-settings")) $("btn-settings").classList.add("hidden");
    if (soundState().pauseDesk && radio.music) radio.music.gain.value = (soundState().musicVol || 0.42) * 0.2;
  }

  function closeDesk() {
    document.body.classList.remove("setup");
    document.body.classList.add("play");
    $("btn-desk").classList.remove("hidden");
    if ($("btn-settings")) $("btn-settings").classList.remove("hidden");
    applySoundGains();
  }

  function setDesk(open) {
    if (open) openDesk();
    else closeDesk();
  }

  function setTab(id) {
    document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("on", t.dataset.tab === id));
    document.querySelectorAll(".tab-page").forEach((p) => p.classList.toggle("hidden", p.id !== "tab-" + id));
    if (id === "crew") renderCrew();
    if (id === "tackle") { renderBaits(); renderBaitTin(); renderRods(); renderTraps(); renderBoats(); renderCharters(); renderShop(); }
    if (id === "kitchen") { renderPantry(); renderRecipes(); renderSmoke(); renderWell(); }
    if (id === "harbor") { renderVillage(); renderOrders(); renderPeddler(); renderDecorShop(); }
    if (id === "journal") { renderAlmanac(); renderEncyclopedia(); renderTrophies(); renderJournal(); }
    if (id === "paragon") renderParagon();
    if (id === "saves") { renderProfiles(); renderDebug(); }
  }

  function renderCrew() {
    const jobs = [
      { id: "cast", name: "Caster", text: "Casts the selected fish on empty slips.", wage: wageNow("cast") },
      { id: "reel", name: "Reeler", text: "Reels whatever is ready.", wage: wageNow("reel") },
      { id: "boat", name: "Skipper", text: "Gathers the boats' catch.", wage: wageNow("boat") },
      { id: "sell", name: "Monger", text: "Sells the creel for a 1–5% penny profit. Pays the crew's wages back first.", wage: 0 },
      { id: "forage", name: "Beachcomber", text: "Picks kelp and stars off the stones.", wage: wageNow("forage") },
      { id: "cook", name: "Cook", text: "Makes the first recipe you can afford.", wage: wageNow("cook") },
      { id: "deliver", name: "Courier", text: "Walks a gift to a neighbor if you have it.", wage: wageNow("visit") },
      { id: "trap", name: "Trapper", text: "Gathers pots and weirs.", wage: wageNow("boat") },
    ];
    $("crew").innerHTML = "";
    jobs.forEach((j) => {
      const row = document.createElement("div");
      row.className = "crew-row";
      row.innerHTML = `<div><h3>${j.name}</h3><p>${j.text}${j.wage ? " · wage " + j.wage : ""}</p></div>`;
      const once = document.createElement("button");
      once.type = "button"; once.className = "once-btn"; once.textContent = "Once";
      once.addEventListener("click", () => runJob(j.id, true));
      const tog = document.createElement("button");
      tog.type = "button";
      tog.className = "toggle" + (state.auto[j.id] ? " on" : "");
      tog.addEventListener("click", () => {
        state.auto[j.id] = !state.auto[j.id];
        tog.classList.toggle("on", state.auto[j.id]);
        save();
      });
      row.append(once, tog);
      $("crew").appendChild(row);
    });
  }

  function runJob(id, once) {
    if (id === "cast") {
      let n = 0;
      state.docks.forEach((d) => d.slips.forEach((s, i) => { if (!s.fish && s.unlocked && castAt(i, true, d)) n++; }));
      if (n) { paintAll(); renderHud(); save(); } else toast("No empty slips, or the tin is shy.");
    } else if (id === "reel") {
      let n = 0;
      state.docks.forEach((d) => d.slips.forEach((s, i) => { if (s.fish && reelAt(i, true, d)) n++; }));
      if (n) { paintAll(); renderHud(); renderPantry(); save(); } else toast("Nothing ready.");
    } else if (id === "boat") collectBoats(true);
    else if (id === "sell") sellCreel(true);
    else if (id === "forage") {
      if (state.forage.length) pickForage(0, true);
      else toast("The stones are empty.");
    } else if (id === "cook") {
      const rec = RECIPES.find((r) => (state.upgrades.cottage || 0) >= r.cottage && Object.keys(r.needs).every((k) => pantryCount(k) >= r.needs[k]));
      if (rec) cook(rec.id, true);
      else toast("Nothing the pot can make.");
    } else if (id === "trap") {
      let n = 0;
      TRAPS.forEach((t) => {
        const bin = (state.trapBin && state.trapBin[t.id]) || 0;
        if (!bin) return;
        if (!payWage("boat")) return;
        addPantry(t.produce, bin, itemBasis(t.produce) * bin, wageNow("boat"));
        state.trapBin[t.id] = 0;
        n += bin;
      });
      if (n) { renderTraps(); renderPantry(); renderHud(); save(); }
      else toast("The pots are still thinking.");
    } else if (id === "deliver") {
      const npc = NPCS.find((n) => n.wants.some((w) => pantryCount(w.item) >= w.n));
      if (!npc) { toast("Nobody's list matches the creel."); return; }
      if (!payWage("visit")) { toast("No wage for the walk."); return; }
      const want = npc.wants.find((w) => pantryCount(w.item) >= w.n);
      giftNpc(npc, want);
    }
    if (once) renderCrew();
  }

  function rowBuy(parent, thumb, title, sub, label, disabled, fn) {
    if (!parent) return;
    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `<div class="thumb">${thumb || ""}</div><div><h3>${title}</h3><p>${sub}</p></div>`;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "buy-btn";
    btn.textContent = label;
    btn.disabled = !!disabled;
    btn.addEventListener("click", fn);
    row.appendChild(btn);
    parent.appendChild(row);
  }

  function renderBaitTin() {
    const box = $("bait-inv");
    if (!box) return;
    box.innerHTML = "";
    BAITS.forEach((b) => {
      const on = state.selectedBait === b.id;
      rowBuy(box, fishArt("minnow", b.id.length), b.name + (on ? " · on the hook" : ""),
        baitCount(b.id) + " in the tin · " + b.hint + " · likes " + b.kinds.join(", "),
        on ? "Using" : "Use / buy " + fmt(b.cost),
        false,
        () => {
          state.selectedBait = b.id;
          if (baitCount(b.id) < 4 && spend(b.cost)) {
            state.baitTin[b.id] = baitCount(b.id) + b.n;
            toast(b.n + " " + b.name.toLowerCase() + " in the tin.");
          }
          renderBaitTin(); renderHud(); save();
        });
    });
  }

  function renderRods() {
    const box = $("rods");
    if (!box) return;
    box.innerHTML = "";
    RODS.forEach((r) => {
      const owned = !!(state.rods && state.rods[r.id]) || r.cost === 0;
      const eq = state.rod === r.id;
      rowBuy(box, sprite("fish"), r.name + (eq ? " · in hand" : ""),
        r.hint + " · hurry " + Math.round((1 - r.bite) * 100) + "% · max " + r.maxOz + " oz",
        eq ? "Equipped" : owned ? "Equip" : fmt(r.cost),
        eq || (!owned && state.coins < r.cost),
        () => {
          if (!owned) {
            if (!spend(r.cost)) return;
            state.rods = state.rods || {};
            state.rods[r.id] = true;
            toast(r.name + " leans against the rack.");
          }
          state.rod = r.id;
          renderRods(); renderHud(); save();
        });
    });
  }

  function renderTraps() {
    const box = $("traps");
    if (!box) return;
    box.innerHTML = "";
    TRAPS.forEach((t) => {
      const have = (state.traps && state.traps[t.id]) || 0;
      const bin = (state.trapBin && state.trapBin[t.id]) || 0;
      rowBuy(box, goodArt(t.produce), t.name + " · " + have,
        t.blurb + " Ready " + bin + " · likes " + t.waters.join(", "),
        have && bin ? "Gather" : have >= t.max ? "Full" : fmt(t.cost * (have + 1)),
        (!have && state.coins < t.cost) || (have && !bin && have >= t.max),
        () => {
          if (have && bin) {
            addPantry(t.produce, bin, itemBasis(t.produce) * bin);
            state.trapBin[t.id] = 0;
            bumpAlmanac("boat", bin);
            toast("The " + t.name.toLowerCase() + " came up.");
          } else if (have < t.max && spend(t.cost * (have + 1))) {
            state.traps[t.id] = have + 1;
            state.trapLast[t.id] = Date.now();
            toast(t.name + " set.");
          }
          renderTraps(); renderPantry(); renderHud(); save();
        });
    });
  }

  function renderCharters() {
    const box = $("charters");
    if (!box) return;
    box.innerHTML = "";
    if (state.charter) {
      const left = Math.max(0, state.charter.backAt - Date.now());
      rowBuy(box, sprite("odo"), "Out on the water",
        "Back in " + Math.ceil(left / 1000) + "s. They packed a story.",
        left > 0 ? "Waiting" : "Welcome home",
        left > 0,
        () => { landCharter(); });
      return;
    }
    CHARTERS.forEach((c) => {
      rowBuy(box, sprite("odo"), c.name, c.blurb + " · " + fmt(c.cost),
        fmt(c.cost),
        state.coins < c.cost,
        () => {
          if (!spend(c.cost)) return;
          state.charter = { id: c.id, backAt: Date.now() + c.ms };
          toast("The boat left. The kettle will wait.");
          renderCharters(); renderHud(); save();
        });
    });
  }

  function landCharter() {
    const ch = state.charter && CHARTERS.find((c) => c.id === state.charter.id);
    state.charter = null;
    if (!ch) { renderCharters(); return; }
    const n = ch.n[0] + Math.floor(Math.random() * (ch.n[1] - ch.n[0] + 1));
    const pool = FISH.filter((f) => ch.waters.indexOf(f.kind) >= 0 && (inSeason(f) || state.upgrades.icehouse));
    const names = [];
    for (let i = 0; i < n; i++) {
      const f = pool[Math.floor(Math.random() * (pool.length || 1))] || fishById("minnow");
      addPantry(f.id, 1, itemBasis(f.id));
      noteRecord(f.id, { count: 1, oz: rollOz(f, rodBy()) });
      names.push(f.name);
    }
    toast("The charter came home: " + names.slice(0, 4).join(", ") + (names.length > 4 ? "…" : "") + ".");
    renderCharters(); renderPantry(); renderHud(); save();
  }

  function renderSmoke() {
    const box = $("smokehouse");
    if (!box) return;
    box.innerHTML = "";
    (state.smoke || []).forEach((job, i) => {
      const left = Math.max(0, job.doneAt - Date.now());
      rowBuy(box, goodArt(job.out), job.name || "Hanging",
        left ? "The rafters still have " + Math.ceil(left / 1000) + "s." : "Ready.",
        left ? "Waiting" : "Take",
        !!left,
        () => {
          addPantry(job.out, 1, itemBasis(job.src || job.out));
          state.smoke.splice(i, 1);
          renderSmoke(); renderPantry(); save();
        });
    });
    Object.keys(SMOKE_MAP).forEach((id) => {
      const rec = SMOKE_MAP[id];
      rowBuy(box, fishArt(id, 0), "Hang " + itemName(id),
        "Becomes " + rec.name + ".",
        pantryCount(id) ? "Hang" : "Need " + itemName(id),
        !pantryCount(id) || (state.smoke || []).length >= 3,
        () => {
          if (!takePantry(id, 1)) return;
          state.smoke.push({ src: id, out: rec.out, name: rec.name, doneAt: Date.now() + rec.ms });
          toast("Hung. The smoke will finish the sentence.");
          renderSmoke(); renderPantry(); save();
        });
    });
  }

  function renderWell() {
    const box = $("livewell");
    if (!box) return;
    box.innerHTML = "";
    (state.well || []).forEach((w, i) => {
      rowBuy(box, fishArt(w.id, 0), itemName(w.id) + " in the well",
        "Paying rent in quiet. Tap to release.",
        "Release",
        false,
        () => {
          const dock = currentDock();
          if (dock) dock.stock = Math.min(100, (dock.stock || 80) + 6);
          state.well.splice(i, 1);
          toast("Back to the water. The slip looks kinder.");
          renderWell(); save();
        });
    });
    ["koi", "minnow", "moonfish"].forEach((id) => {
      rowBuy(box, fishArt(id, 0), "Keep a " + itemName(id),
        id === "koi" ? "Sometimes a pearl." : id === "minnow" ? "Sometimes a spare fry." : "Night bites hurry a little.",
        pantryCount(id) && (state.well || []).length < 3 ? "Keep" : "—",
        !pantryCount(id) || (state.well || []).length >= 3,
        () => {
          if (!takePantry(id, 1)) return;
          state.well.push({ id, since: Date.now() });
          renderWell(); renderPantry(); save();
        });
    });
  }

  function seedOrders() {
    const mix = BOARD.slice().sort(() => Math.random() - 0.5);
    state.orders = mix.slice(0, 2).map((o, i) => Object.assign({ id: "ord-" + Date.now() + "-" + i, done: false }, o));
  }

  function renderOrders() {
    const box = $("orders");
    if (!box) return;
    if (!state.orders || !state.orders.length) seedOrders();
    box.innerHTML = "";
    state.orders.forEach((o) => {
      const need = Object.keys(o.needs).map((k) => o.needs[k] + " " + itemName(k)).join(", ");
      const ok = !o.done && Object.keys(o.needs).every((k) => pantryCount(k) >= o.needs[k]);
      rowBuy(box, sprite("wren"), o.title + (o.done ? " · kept" : ""),
        o.say + " · " + need + " · " + fmt(o.pay),
        o.done ? "Pinned" : "Fill",
        !ok,
        () => {
          Object.keys(o.needs).forEach((k) => takePantry(k, o.needs[k]));
          earn(o.pay);
          o.done = true;
          bumpAlmanac("gift", 1);
          toast("Wren smiles and pins a ribbon.");
          renderOrders(); renderPantry(); renderHud(); save();
        });
    });
  }

  function renderPeddler() {
    const box = $("peddler");
    if (!box) return;
    box.innerHTML = "";
    const day = harborDay();
    if (!state.peddler || day - (state.peddler.day || 0) >= 3) {
      state.peddler = {
        day,
        stock: [
          { bait: "fly", cost: 22 },
          { bait: "night", cost: 32 },
          { id: "pearl", n: 1, cost: 70 },
        ],
      };
    }
    if (day - (state.peddler.day || 0) > 1 && state.peddler.day) {
      box.innerHTML = `<p class="lesson">The crate left with the tide. It will be back.</p>`;
      return;
    }
    (state.peddler.stock || []).forEach((it, i) => {
      if (it.gone) return;
      const title = it.bait ? baitDef(it.bait).name : itemName(it.id);
      rowBuy(box, it.bait ? fishArt("minnow", 2) : goodArt(it.id), title,
        "A crate thing. " + fmt(it.cost),
        fmt(it.cost),
        state.coins < it.cost,
        () => {
          if (!spend(it.cost)) return;
          if (it.bait) state.baitTin[it.bait] = baitCount(it.bait) + (baitDef(it.bait).n || 4);
          else addPantry(it.id, it.n || 1, it.cost);
          it.gone = true;
          toast("The crate is lighter.");
          renderPeddler(); renderBaitTin(); renderPantry(); renderHud(); save();
        });
    });
  }

  function renderAlmanac() {
    const box = $("almanac");
    if (!box) return;
    const a = state.almanac;
    const goal = WEEK_GOALS[a.goal % WEEK_GOALS.length];
    box.innerHTML = `<div class="almanac-card"><strong>Week ${a.week + 1}</strong><p>${goal.title} — ${a.progress || 0}/${goal.n}${a.done ? " · kept" : ""}</p><p>${goal.say}</p><p>Favors ${a.favors || 0}</p></div>`;
    const spenders = [
      { id: "sun", name: "Ask for sun", text: "The weather becomes calm and kind." },
      { id: "stock", name: "Restock this water", text: "This dock fills back toward full." },
      { id: "luck", name: "Lucky day", text: "Trophies lean in until morning." },
      { id: "hurry", name: "Hurry the bites", text: "Lines think faster until morning." },
    ];
    spenders.forEach((sp) => {
      rowBuy(box, "", sp.name, sp.text, "Favor",
        (a.favors || 0) < 1,
        () => {
          a.favors -= 1;
          if (sp.id === "sun") state.weather = "sunny";
          if (sp.id === "stock") currentDock().stock = 100;
          if (sp.id === "luck") state.luckyDay = harborDay();
          if (sp.id === "hurry") state.hurryDay = harborDay();
          toast(sp.name + ". The week nods.");
          renderAlmanac(); paintWorld(); save();
        });
    });
  }

  function renderEncyclopedia() {
    const box = $("encyclopedia");
    if (!box) return;
    box.innerHTML = "";
    FISH.forEach((f) => {
      const rec = (state.records && state.records[f.id]) || {};
      const known = state.discovered[f.id] || rec.count;
      const row = document.createElement("div");
      row.className = "journal-row";
      row.innerHTML = `<span class="thumb">${known ? fishArt(f.id, 0) : ""}</span><span><strong>${known ? f.name : "???"}</strong><span class="sub">${known ? "caught " + (rec.count || 0) + " · best " + (rec.biggest || 0) + " oz · away " + (rec.gotAway || 0) + " · released " + (rec.released || 0) + " · " + f.hint : "A rumor in the water."}</span></span>`;
      box.appendChild(row);
    });
  }

  function renderTrophies() {
    const box = $("trophies");
    if (!box) return;
    const list = FISH.map((f) => {
      const rec = (state.records && state.records[f.id]) || {};
      return { f, rec };
    }).filter((x) => (x.rec.biggest || 0) >= 12).sort((a, b) => b.rec.biggest - a.rec.biggest);
    box.innerHTML = list.length ? "" : `<p class="lesson">The wall is waiting for something heavy and kind.</p>`;
    list.forEach(({ f, rec }) => {
      const row = document.createElement("div");
      row.className = "journal-row";
      row.innerHTML = `<span class="thumb">${fishArt(f.id, 0)}</span><span><strong>${f.name}</strong><span class="sub">${rec.biggest} oz · caught ${rec.count || 0}</span></span>`;
      box.appendChild(row);
    });
  }

  function tickTraps(now) {
    TRAPS.forEach((t) => {
      const have = (state.traps && state.traps[t.id]) || 0;
      if (!have) return;
      const last = state.trapLast[t.id] || now;
      const n = Math.floor((now - last) / t.interval);
      if (n <= 0) return;
      const room = t.max * have - (state.trapBin[t.id] || 0);
      const add = Math.min(room, n * have);
      if (add > 0) state.trapBin[t.id] = (state.trapBin[t.id] || 0) + add;
      state.trapLast[t.id] = last + n * t.interval;
    });
  }

  function tickWell(now) {
    (state.well || []).forEach((w) => {
      if (now - (w.since || now) < 80000) return;
      w.since = now;
      if (w.id === "koi" && Math.random() < 0.35) addPantry("pearl", 1, 20);
      if (w.id === "minnow" && Math.random() < 0.4) addPantry("minnow", 1, itemBasis("minnow"));
    });
  }

  function tickCharter() {
    if (state.charter && Date.now() >= state.charter.backAt) landCharter();
  }

  function renderBaits() {
    const cats = ["all", "creek", "river", "mud", "shore", "deep", "pond", "magic"];
    $("bait-cats").innerHTML = cats.map((c) =>
      `<button type="button" class="cat${state.baitCat === c ? " on" : ""}" data-cat="${c}">${c}</button>`
    ).join("");
    $("bait-cats").querySelectorAll(".cat").forEach((b) => b.addEventListener("click", () => {
      state.baitCat = b.dataset.cat;
      renderBaits();
    }));
    const list = FISH.filter((f) => state.baitCat === "all" || f.kind === state.baitCat);
    $("baits").innerHTML = "";
    list.forEach((f) => {
      const locked = state.lifetime < f.unlock;
      const el = document.createElement("button");
      el.type = "button";
      el.className = "seed" + (state.selected === f.id ? " selected" : "") + (locked ? " locked" : "") + (inSeason(f) ? " in-season" : "") + (festBoost(f) ? " fair" : "");
      el.innerHTML = `<span class="thumb">${fishArt(f.id, 0)}</span><span class="meta"><span class="name">${f.name}</span><span class="sub">${fmt(baitCost(f))} · ${Math.round(biteTime(f) / 1000)}s · ${f.seasons.join("/")}${inSeason(f) ? ' <span class="tag">in</span>' : ""}</span></span>`;
      el.disabled = locked;
      el.title = locked ? "Earn " + fmt(f.unlock) + " first. " + f.hint : f.hint + " · " + f.kind;
      el.addEventListener("click", () => {
        state.selected = f.id;
        renderBaits();
        paintAll();
        save();
      });
      $("baits").appendChild(el);
    });
  }

  function renderBoats() {
    $("boats").innerHTML = "";
    BOATS.forEach((b) => {
      const have = state.boats[b.id] || 0;
      const bin = state.bins[b.id] || 0;
      const row = document.createElement("div");
      row.className = "row";
      row.innerHTML = `<div class="thumb">${fishArt(b.produce, state.boatLook[b.id] || 0)}</div><div><h3>${b.name} · ${have}/${b.max}</h3><p>${b.blurb} Ready ${bin}</p></div>`;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = have && bin ? "collect-chip" : "buy-btn";
      if (have && bin) {
        btn.textContent = "Gather";
        btn.addEventListener("click", () => {
          addPantry(b.produce, bin, itemBasis(b.produce) * bin);
          state.bins[b.id] = 0;
          bumpAlmanac("boat", bin);
          renderBoats(); renderPantry(); renderHud(); save();
        });
      } else {
        const cost = b.cost * BAIT_SCALE / 8 * (have + 1);
        btn.textContent = have >= b.max ? "Full" : fmt(cost);
        btn.disabled = have >= b.max || state.coins < cost;
        btn.addEventListener("click", () => {
          if (have >= b.max || !spend(cost)) return;
          state.boats[b.id] = have + 1;
          state.boatLook[b.id] = rollLook();
          state.lastBoat[b.id] = Date.now();
          toast(b.name + " tied up.");
          renderBoats(); renderHud(); save();
        });
      }
      row.appendChild(btn);
      $("boats").appendChild(row);
    });
  }

  function renderShop() {
    const items = [
      { id: "thumb", name: "Patient hook", cost: () => Math.round(80 * Math.pow(1.7, state.upgrades.thumb || 0) * 5), text: "Fish hurry a little.", buy: () => { state.upgrades.thumb = (state.upgrades.thumb || 0) + 1; } },
      { id: "market", name: "Fair stall", cost: () => Math.round(120 * Math.pow(1.8, state.upgrades.market || 0) * 5), text: "Hand pennies lean kinder.", buy: () => { state.upgrades.market = (state.upgrades.market || 0) + 1; } },
      { id: "icehouse", name: "Icehouse", cost: () => 2400, text: "Any fish, any season.", buy: () => { state.upgrades.icehouse = true; }, owned: () => state.upgrades.icehouse },
      { id: "cottage", name: "Bigger kitchen", cost: () => [0, 600, 1800][state.upgrades.cottage] || 4000, text: "Unlocks richer recipes.", buy: () => { state.upgrades.cottage = Math.min(2, (state.upgrades.cottage || 0) + 1); }, owned: () => (state.upgrades.cottage || 0) >= 2 },
      { id: "line", name: "Better line", cost: () => Math.round(90 * Math.pow(1.6, state.upgrades.line || 0) * 4), text: "Fewer got-aways.", buy: () => { state.upgrades.line = (state.upgrades.line || 0) + 1; } },
      { id: "hook", name: "Kind hook", cost: () => Math.round(80 * Math.pow(1.55, state.upgrades.hook || 0) * 4), text: "Named fish lean a little closer.", buy: () => { state.upgrades.hook = (state.upgrades.hook || 0) + 1; } },
      { id: "float", name: "Cork float", cost: () => 420, text: "Creek and pond fish hurry.", buy: () => { state.upgrades.float = true; }, owned: () => !!state.upgrades.float },
      { id: "sinker", name: "Kind sinker", cost: () => 480, text: "Deep and mud fish hurry.", buy: () => { state.upgrades.sinker = true; }, owned: () => !!state.upgrades.sinker },
    ];
    $("shop").innerHTML = "";
    items.forEach((it) => {
      const row = document.createElement("div");
      row.className = "row";
      const owned = it.owned && it.owned();
      row.innerHTML = `<div class="thumb">${sprite("fish")}</div><div><h3>${it.name}</h3><p>${it.text}</p></div>`;
      const btn = document.createElement("button");
      btn.type = "button"; btn.className = "buy-btn";
      btn.textContent = owned ? "Owned" : fmt(it.cost());
      btn.disabled = !!owned || state.coins < it.cost();
      btn.addEventListener("click", () => {
        const c = it.cost();
        if (owned || !spend(c)) return;
        it.buy();
        toast(it.name + " is yours.");
        renderShop(); renderHud(); save();
      });
      row.appendChild(btn);
      $("shop").appendChild(row);
    });
  }

  function renderPantry() {
    const ids = Object.keys(state.pantry).filter((id) => state.pantry[id] > 0);
    $("pantry").innerHTML = ids.length ? "" : `<p class="lesson">The creel is a polite empty.</p>`;
    ids.forEach((id) => {
      const el = document.createElement("button");
      el.type = "button";
      el.className = "pantry-item";
      el.innerHTML = `<span class="thumb">${goodArt(id)}</span><span><strong>${itemName(id)}</strong><span class="sub">×${state.pantry[id]} · sell ${fmt(sellPayout(id, 1, false))}</span></span>`;
      el.addEventListener("click", () => {
        const pay = sellPayout(id, 1, false);
        if (!takePantry(id, 1)) return;
        earn(pay);
        renderPantry(); renderHud(); save();
      });
      $("pantry").appendChild(el);
    });
  }

  function renderRecipes() {
    $("recipes").innerHTML = "";
    RECIPES.forEach((r) => {
      const need = Object.keys(r.needs).map((k) => r.needs[k] + " " + itemName(k)).join(", ");
      const ok = (state.upgrades.cottage || 0) >= r.cottage && Object.keys(r.needs).every((k) => pantryCount(k) >= r.needs[k]);
      const row = document.createElement("div");
      row.className = "row";
      row.innerHTML = `<div class="thumb">${goodArt(r.id)}</div><div><h3>${r.name}</h3><p>${need}</p></div>`;
      const btn = document.createElement("button");
      btn.type = "button"; btn.className = "buy-btn";
      btn.textContent = (state.upgrades.cottage || 0) < r.cottage ? "Kitchen" : "Cook";
      btn.disabled = !ok;
      btn.addEventListener("click", () => cook(r.id, false));
      row.appendChild(btn);
      $("recipes").appendChild(row);
    });
  }

  function renderVillage() {
    $("village").innerHTML = "";
    NPCS.forEach((n) => {
      const hearts = state.hearts[n.id] || 0;
      const want = n.wants[hearts % n.wants.length];
      const card = document.createElement("div");
      card.className = "npc-card";
      card.innerHTML = `<div class="port">${sprite(n.art) || sprite(n.id)}</div><div><h3>${n.name} <span class="hearts">${"♥".repeat(hearts)}${"♡".repeat(5 - hearts)}</span></h3><p>${n.role}. ${n.chat[hearts % n.chat.length]}</p><p>${want.say} (${want.n} ${itemName(want.item)} · ${fmt(want.pay)})</p></div>`;
      const btn = document.createElement("button");
      btn.type = "button"; btn.className = "buy-btn";
      btn.textContent = "Give";
      btn.disabled = pantryCount(want.item) < want.n;
      btn.addEventListener("click", () => giftNpc(n, want));
      card.lastChild.appendChild(btn);
      if (heartPerk(n.id)) {
        const p = document.createElement("p");
        p.textContent = HEART_PERKS[n.id].name + " — " + HEART_PERKS[n.id].blurb;
        card.lastChild.appendChild(p);
      }
      $("village").appendChild(card);
    });
  }

  function renderDecorShop() {
    $("decor-shop").innerHTML = "";
    DECOR.forEach((d) => {
      const row = document.createElement("div");
      row.className = "row";
      row.innerHTML = `<div class="thumb">${sprite(d.art)}</div><div><h3>${d.name}</h3><p>${d.bonus}</p></div>`;
      const btn = document.createElement("button");
      btn.type = "button"; btn.className = "buy-btn";
      btn.textContent = state.decor[d.id] ? "Placed" : fmt(d.cost);
      btn.disabled = !!state.decor[d.id] || state.coins < d.cost;
      btn.addEventListener("click", () => {
        if (state.decor[d.id] || !spend(d.cost)) return;
        state.decor[d.id] = true;
        paintWorld(); renderDecorShop(); renderHud(); save();
      });
      row.appendChild(btn);
      $("decor-shop").appendChild(row);
    });
  }

  function renderJournal() {
    const caught = FISH.filter((f) => state.discovered[f.id]);
    $("journal-sub").textContent = caught.length + " / " + FISH.length + " fish known · day " + harborDay();
    $("journal").innerHTML = "";
    STORY.filter((s) => state.stories.indexOf(s.at) >= 0).forEach((s) => {
      const el = document.createElement("div");
      el.className = "story";
      el.innerHTML = `<strong>${s.title}</strong><br>${s.text}`;
      $("journal").appendChild(el);
    });
  }

  function renderParagon() {
    const pg = state.paragon;
    $("paragon").innerHTML = `
      <div class="para-stats">
        <strong>${unspentStars()} unspent</strong> of ${pg.stars || 0} stars · ${pg.runs || 0} folded harbors
        <div class="para-break">
          <span>Best day ${pg.bestDay || 1}</span>
          <span>Best life ${fmt(pg.bestLife || 0)}</span>
          <span>Best catch ${pg.bestCatch || 0}</span>
          <span>Next fold ${prestigeGain()} ★</span>
        </div>
      </div>
      <div class="para-actions">
        <button type="button" class="buy-btn" id="btn-prestige">Prestige · ${prestigeGain()} ★</button>
        <button type="button" class="ghost-btn" id="btn-restart">Restart, keep tree</button>
      </div>
      <div class="para-tree" id="para-tree"></div>
    `;
    $("btn-prestige").addEventListener("click", () => {
      if (state.lifetime < 200) { toast("Fish a little longer before you fold the year."); return; }
      modal("Fold this harbor?", "You will earn " + prestigeGain() + " stars and start a new dock. The tree stays.", [
        { label: "Fold it", fn: prestige },
        { label: "Not yet", fn: () => {} },
      ]);
    });
    $("btn-restart").addEventListener("click", restartKeepTree);
    const tree = $("para-tree");
    Object.keys(PARAGON_BRANCH).forEach((br) => {
      const col = document.createElement("div");
      col.className = "para-branch";
      col.innerHTML = `<h3>${PARAGON_BRANCH[br]}</h3>`;
      PARAGON.filter((n) => n.branch === br).forEach((n) => {
        const rank = nodeRank(n.id);
        const node = document.createElement("div");
        node.className = "para-node" + (rank >= n.max ? " maxed owned" : rank ? " owned" : nodeUnlocked(n.id) ? " ready" : " locked");
        node.innerHTML = `<h4>${n.name}</h4><p>${n.blurb}</p><div class="para-row"><span class="rank">${rank}/${n.max}</span></div>`;
        const btn = document.createElement("button");
        btn.type = "button"; btn.className = "buy-btn";
        btn.textContent = rank >= n.max ? "Max" : nodeCost(n.id) + " ★";
        btn.disabled = rank >= n.max || !nodeUnlocked(n.id) || unspentStars() < nodeCost(n.id);
        btn.addEventListener("click", () => buyNode(n.id));
        node.querySelector(".para-row").appendChild(btn);
        col.appendChild(node);
      });
      tree.appendChild(col);
    });
  }

  function renderProfiles() {
    const idx = ensureIndex();
    $("profiles").innerHTML = "";
    idx.slots.forEach((s) => {
      const row = document.createElement("div");
      row.className = "profile-row" + (s.id === idx.active ? " on" : "");
      row.innerHTML = `<div><strong>${s.name}</strong><span>${s.id === idx.active ? "current dock" : "asleep"}</span></div>`;
      const go = document.createElement("button");
      go.type = "button"; go.className = "once-btn"; go.textContent = "Open";
      go.disabled = s.id === idx.active;
      go.addEventListener("click", () => switchProfile(s.id));
      const del = document.createElement("button");
      del.type = "button"; del.className = "once-btn"; del.textContent = "×";
      del.addEventListener("click", () => {
        if (idx.slots.length <= 1) { toast("Keep one harbor."); return; }
        idx.slots = idx.slots.filter((x) => x.id !== s.id);
        try { localStorage.removeItem(slotKey(s.id)); } catch (_) {}
        if (idx.active === s.id) idx.active = idx.slots[0].id;
        writeIndex(idx);
        if (idx.active !== s.id) switchProfile(idx.active);
        else renderProfiles();
      });
      row.append(go, del);
      $("profiles").appendChild(row);
    });
  }

  function renderDebug() {
    const cmds = [
      ["+1k", () => { earn(1000); renderHud(); }],
      ["Day+", () => { state.startedAt -= DAY_MS; onNewDay(harborDay() - 1, harborDay()); renderHud(); paintWorld(); }],
      ["Unlock fish", () => { state.lifetime += 5000; FISH.forEach((f) => { state.discovered[f.id] = true; }); renderBaits(); }],
      ["Fill creel", () => { FISH.slice(0, 6).forEach((f) => addPantry(f.id, 3, baitCost(f) * 3)); renderPantry(); }],
      ["Hearts", () => { NPCS.forEach((n) => { state.hearts[n.id] = 5; }); renderVillage(); }],
      ["+star", () => { state.paragon.stars = (state.paragon.stars || 0) + 3; renderParagon(); renderHud(); }],
    ];
    $("debug").innerHTML = "";
    cmds.forEach(([label, fn]) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = label;
      b.addEventListener("click", () => { fn(); save(); });
      $("debug").appendChild(b);
    });
  }

  function openMail() {
    state.mail.unread = false;
    renderHud();
    modal("A letter", state.mail.body || "The envelope is shy today.");
    save();
  }

  function sitBench() {
    if (!state.decor.bench) return;
    if (state.sitDay === harborDay()) { toast("You already sat. The boards remember."); return; }
    state.sitDay = harborDay();
    farmSay("The bench agrees. Tomorrow can wait.");
    state.wishDay = harborDay();
    save();
  }

  function refreshAll() {
    renderHud();
    buildField();
    paintWorld();
    renderCrew();
    renderBaits();
    renderBaitTin();
    renderRods();
    renderTraps();
    renderBoats();
    renderCharters();
    renderShop();
    renderPantry();
    renderRecipes();
    renderSmoke();
    renderWell();
    renderVillage();
    renderOrders();
    renderPeddler();
    renderDecorShop();
    renderAlmanac();
    renderEncyclopedia();
    renderTrophies();
    renderJournal();
    renderParagon();
    renderProfiles();
    renderDebug();
    renderSettings();
    applyDockPrefs();
    if (!state.orders || !state.orders.length) seedOrders();
  }

  function tick() {
    const now = Date.now();
    const day = harborDay();
    if (day !== state.lastHarborDay) {
      onNewDay(state.lastHarborDay, day);
      state.lastHarborDay = day;
      paintWorld();
      renderHud();
    }
    tickBoats(now);
    if (state.auto.reel || state.auto.cast) {
      state.docks.forEach((dock, di) => {
        const visible = di === state.viewDock;
        if (state.auto.reel) {
          const pace = soundState().watch === "slow" ? 2 : 1;
          if (visible && shopTimer % pace !== 0) {
            /* watch the last catch finish */
          } else if (visible) {
            const i = dock.slips.findIndex((slip) => {
              const fish = slip.fish && fishById(slip.fish);
              return !!(fish && now - slip.castAt >= biteTime(fish, slip, dock));
            });
            if (i >= 0) reelAt(i, true, dock, $("field").children[i]);
            if (soundState().watch === "quick") {
              const j = dock.slips.findIndex((slip, ix) => {
                if (ix === i) return false;
                const fish = slip.fish && fishById(slip.fish);
                return !!(fish && now - slip.castAt >= biteTime(fish, slip, dock));
              });
              if (j >= 0) reelAt(j, true, dock, $("field").children[j]);
            }
          } else {
            dock.slips.forEach((slip, i) => {
              const fish = slip.fish && fishById(slip.fish);
              if (fish && now - slip.castAt >= biteTime(fish, slip, dock)) reelAt(i, true, dock);
            });
          }
        }
        if (state.auto.cast) {
          if (visible) {
            const i = dock.slips.findIndex((s) => s.unlocked && !s.fish);
            if (i >= 0) castAt(i, true, dock);
          } else {
            dock.slips.forEach((s, i) => { if (s.unlocked && !s.fish) castAt(i, true, dock); });
          }
        }
        if (visible) for (let i = 0; i < SLIP_COUNT; i++) paintSlip(i);
      });
    } else {
      for (let i = 0; i < SLIP_COUNT; i++) {
        const slip = slips()[i];
        if (slip && slip.fish) paintSlip(i);
      }
    }
    tickTraps(now);
    tickWell(now);
    if (shopTimer % 4 === 0) tickCharter();
    if (state.auto.boat && shopTimer % 8 === 0) collectBoats(true);
    if (state.auto.sell && shopTimer % 10 === 0) sellCreel(true);
    if (state.auto.trap && shopTimer % 9 === 0) runJob("trap", false);
    if (state.auto.forage && state.forage.length && shopTimer % 6 === 0) pickForage(0, true);
    if (state.auto.cook && shopTimer % 12 === 0) runJob("cook", false);
    if (state.auto.deliver && shopTimer % 14 === 0) runJob("deliver", false);
    if (shopTimer % 20 === 0 && Math.random() < 0.35) spawnForage();
    if (shopTimer % 15 === 0) {
      renderHud();
      $("sky").className = "sky " + timeOfDayClass();
    }
    if (shopTimer % 30 === 0) save();
    state.lastTick = now;
    shopTimer++;
  }

  function bind() {
    $("btn-desk").addEventListener("click", openDesk);
    $("btn-close-desk").addEventListener("click", closeDesk);
    $("btn-settings").addEventListener("click", () => {
      if ($("settings").classList.contains("hidden")) openSettings();
      else closeSettings();
    });
    $("btn-close-settings").addEventListener("click", closeSettings);
    $("set-master").addEventListener("click", () => {
      const s = soundState();
      s.master = !s.master;
      state.muted = !s.master;
      applySoundGains();
      if (s.master && s.music) startRadio();
      else if (!s.master) stopRadio();
      renderHud(); renderSettings(); save();
    });
    $("set-music").addEventListener("click", () => {
      const s = soundState();
      s.music = !s.music;
      applySoundGains();
      if (s.music) startRadio();
      else stopRadio();
      renderSettings(); save();
    });
    $("set-sfx").addEventListener("click", () => {
      soundState().sfx = !soundState().sfx;
      applySoundGains();
      renderSettings(); save();
    });
    $("set-autotrack").addEventListener("click", () => {
      const s = soundState();
      s.autoTrack = !s.autoTrack;
      if (s.autoTrack) s.track = weatherTrack();
      startRadio();
      renderSettings(); save();
    });
    $("set-mvol").addEventListener("input", () => {
      soundState().musicVol = Number($("set-mvol").value) / 100;
      applySoundGains();
    });
    $("set-mvol").addEventListener("change", save);
    $("set-svol").addEventListener("input", () => {
      soundState().sfxVol = Number($("set-svol").value) / 100;
      applySoundGains();
    });
    $("set-svol").addEventListener("change", save);
    $("set-cards").addEventListener("click", () => { soundState().cards = soundState().cards === false; renderSettings(); save(); });
    $("set-fisher").addEventListener("click", () => { soundState().fisher = soundState().fisher === false; applyDockPrefs(); renderSettings(); save(); });
    $("set-school").addEventListener("click", () => { soundState().school = soundState().school === false; applyDockPrefs(); renderSettings(); save(); });
    $("set-calm").addEventListener("click", () => { soundState().calm = !soundState().calm; applyDockPrefs(); renderSettings(); save(); });
    $("set-name").addEventListener("change", () => {
      const n = ($("set-name").value || "").trim().slice(0, 24);
      if (n) state.fisherName = n;
      renderHud(); save();
    });
    document.querySelectorAll(".set-nav .cat").forEach((c) => {
      c.addEventListener("click", () => { soundState().setPage = c.dataset.set; renderSettings(); save(); });
    });
    const bindTog = (id, key) => {
      if (!$(id)) return;
      $(id).addEventListener("click", () => {
        const s = soundState();
        s[key] = !s[key];
        if (key === "gulls" && radio.started) startRadio();
        applyDockPrefs(); renderSettings(); save();
      });
    };
    bindTog("set-gulls", "gulls");
    bindTog("set-moonhud", "moonHud");
    bindTog("set-note", "note");
    bindTog("set-release", "release");
    bindTog("set-type", "typeLg");
    bindTog("set-contrast", "contrast");
    bindTog("set-pausedesk", "pauseDesk");
    if ($("set-cat")) $("set-cat").addEventListener("change", () => {
      soundState().catName = ($("set-cat").value || "Miso").trim().slice(0, 16) || "Miso";
      save();
    });
    if ($("set-boatname")) $("set-boatname").addEventListener("change", () => {
      soundState().boatName = ($("set-boatname").value || "Kindling").trim().slice(0, 20) || "Kindling";
      save();
    });
    if ($("set-watch")) $("set-watch").addEventListener("change", () => { soundState().watch = $("set-watch").value; save(); });
    if ($("set-linger")) $("set-linger").addEventListener("input", () => { soundState().linger = Number($("set-linger").value) || 18; });
    if ($("set-linger")) $("set-linger").addEventListener("change", save);
    if ($("set-water")) $("set-water").addEventListener("input", () => { soundState().water = Number($("set-water").value) / 100; if (radio.started) startRadio(); });
    if ($("set-water")) $("set-water").addEventListener("change", save);
    if ($("set-tempo")) $("set-tempo").addEventListener("input", () => { soundState().tempo = Number($("set-tempo").value) / 100; if (radio.started) startRadio(); });
    if ($("set-tempo")) $("set-tempo").addEventListener("change", save);
    if ($("set-radio-reset")) $("set-radio-reset").addEventListener("click", () => {
      const s = soundState();
      s.track = "harbor"; s.musicVol = 0.42; s.sfxVol = 0.55; s.water = 1; s.tempo = 1; s.autoTrack = false; s.gulls = true;
      applySoundGains(); startRadio(); renderSettings(); save();
      toast("The radio found harbor morning again.");
    });
    $("btn-run").addEventListener("click", runDockOnce);
    $("btn-run-desk").addEventListener("click", runDockOnce);
    $("btn-collect").addEventListener("click", () => {
      let n = 0;
      state.docks.forEach((d) => d.slips.forEach((s, i) => { if (s.fish && reelAt(i, false, d)) n++; }));
      n += collectBoats(false);
      if (n) { paintAll(); renderHud(); renderPantry(); save(); }
      else toast("Nothing waiting.");
    });
    $("btn-sell").addEventListener("click", () => sellCreel(false));
    $("btn-mail").addEventListener("click", openMail);
    $("btn-mute").addEventListener("click", () => {
      state.muted = !state.muted;
      soundState().master = !state.muted;
      applySoundGains();
      if (!state.muted && soundState().music) startRadio();
      else if (state.muted) stopRadio();
      renderHud();
      renderSettings();
      save();
    });
    document.addEventListener("pointerdown", () => {
      ensureAudio();
      if (soundState().music && soundState().master && !state.muted && !radio.started) startRadio();
    }, { once: true });
    $("coin-pill").addEventListener("click", () => { setDesk(true); setTab("saves"); });
    $("tax-pill").addEventListener("click", () => { setDesk(true); setTab("crew"); });
    $("star-pill").addEventListener("click", () => { setDesk(true); setTab("paragon"); });
    $("modal-ok").addEventListener("click", closeModal);
    document.querySelectorAll(".tab").forEach((t) => t.addEventListener("click", () => setTab(t.dataset.tab)));
    $("btn-new-profile").addEventListener("click", () => createProfile($("profile-name").value));
    $("btn-reset").addEventListener("click", () => {
      modal("Reset this harbor?", "The dock forgets. The paragon tree forgets too.", [
        { label: "Reset", fn: () => { state.paragon = defaultParagon(); resetActiveHarbor(); } },
        { label: "Keep it", fn: () => {} },
      ]);
    });
    $("btn-export").addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "idle-cozy-fishing.json";
      a.click();
    });
    $("import-save").addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          state = hydrate(JSON.parse(reader.result));
          save();
          refreshAll();
          toast("Harbor loaded.");
        } catch {
          toast("That file was not a harbor.");
        }
      };
      reader.readAsText(file);
    });
    $("modal").addEventListener("click", (e) => { if (e.target.id === "modal") closeModal(); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if ($("settings") && !$("settings").classList.contains("hidden")) closeSettings();
        else closeDesk();
      }
    });
    $("decor-layer").addEventListener("click", (e) => {
      if (e.target.closest(".decor-item") && state.decor.bench) sitBench();
    });
  }

  function boot() {
    load();
    const away = applyOffline();
    bind();
    closeDesk();
    refreshAll();
    if (!state.sawIntro) {
      showIntro();
    } else if (!state.pickedClass) {
      showCraftPicker(true);
    } else if (away) {
      showPortrait(craftBy().art);
      modal(
        "While you rested",
        "The tide worked about " + away.hours + " quiet hours.\n\n" +
          (away.reels ? "They brought home " + away.reels + " fish." : "The lines waited. Nobody hurried."),
        [{ label: "Welcome back", fn: closeModal }]
      );
    } else if (state.mail && state.mail.unread) {
      toast("A letter is waiting.");
    }
    setInterval(tick, 800);
  }

  loadArt().then(boot);
})();
