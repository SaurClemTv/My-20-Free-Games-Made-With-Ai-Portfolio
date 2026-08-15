(() => {
  const SAVE_KEY = "idle-cozy-rpg-v9";
  const OLD_KEYS = ["idle-cozy-rpg-v8", "idle-cozy-rpg-v7", "idle-cozy-rpg-v6", "idle-cozy-rpg-v5", "idle-cozy-rpg-v4", "idle-cozy-rpg-v3", "idle-cozy-rpg-v2", "idle-cozy-rpg-v1"];
  const PARA_MAX = 20;
  const TEMPER_MAX = 8;
  const CLASS_RANK_MAX = 5;
  const PROFILE_INDEX = "idle-cozy-rpg-profiles";
  const SAVE_PREFIX = "idle-cozy-rpg-slot-";
  const OFFLINE_CAP_MS = 8 * 60 * 60 * 1000;
  const DAY_MS = 6 * 60 * 1000;
  const REGEN_MS = 12000;
  const FIGHT_STEP_MS = 680;
  const KEEPER_EVERY = 8;

  const SEASONS = ["spring", "summer", "autumn", "winter"];
  const SEASON_LABEL = { spring: "Spring", summer: "Summer", autumn: "Autumn", winter: "Winter" };
  const WEATHERS = {
    spring: ["sunny", "rain", "wind"],
    summer: ["sunny", "sunny", "wind"],
    autumn: ["sunny", "wind", "rain"],
    winter: ["snow", "sunny", "wind"],
  };

  const ITEMS = {
    herb: { name: "Trail herb", sell: 3, icon: "🌿" },
    biscuit: { name: "Pocket biscuit", sell: 4, icon: "🍪", heal: 8 },
    wildflower: { name: "Wildflower", sell: 5, icon: "🌼" },
    ribbon: { name: "Brook ribbon", sell: 8, icon: "🎀" },
    fish: { name: "Kind fish", sell: 7, icon: "🐟" },
    apple: { name: "Orchard apple", sell: 10, icon: "🍎" },
    button: { name: "Lost button", sell: 6, icon: "🔘" },
    honey: { name: "Lantern honey", sell: 18, icon: "🍯" },
    mushroom: { name: "Glowcap", sell: 12, icon: "🍄" },
    glowbug: { name: "Glowbug jar", sell: 20, icon: "🪲" },
    silk: { name: "Moth silk", sell: 22, icon: "🧵" },
    relic: { name: "Moss relic", sell: 40, icon: "🪨" },
    teacup: { name: "Warm teacup", sell: 16, icon: "🍵" },
    moss: { name: "Pocket moss", sell: 9, icon: "🍃" },
    starshard: { name: "Starshard", sell: 80, icon: "✨" },
    moonbloom: { name: "Moonbloom", sell: 90, icon: "🌙" },
    lullaby: { name: "Bottled lullaby", sell: 70, icon: "🎵" },
    salt: { name: "Harbor salt", sell: 9, icon: "🧂" },
    net: { name: "Mended net", sell: 14, icon: "🕸️" },
    "pearl-bead": { name: "Pearl bead", sell: 26, icon: "⚪" },
    wax: { name: "Hive wax", sell: 16, icon: "🕯️" },
    sting: { name: "Polite sting", sell: 11, icon: "🐝" },
    wool: { name: "Cloud wool", sell: 20, icon: "☁️" },
    "cloud-tuft": { name: "Cloud tuft", sell: 24, icon: "🌬️" },
    pot: { name: "Warm pot", sell: 28, icon: "🏺" },
    ember: { name: "Kind ember", sell: 32, icon: "🔥" },
    glaze: { name: "Honey glaze", sell: 36, icon: "🧴" },
    wish: { name: "Well wish", sell: 95, icon: "💫" },
    wellwater: { name: "Star water", sell: 70, icon: "🫗" },
    stew: { name: "Hearth stew", sell: 48, icon: "🍲", heal: 20 },
    tea: { name: "Trail tea", sell: 14, icon: "🫖", heal: 10 },
    jam: { name: "Lantern jam", sell: 36, icon: "🫙", heal: 6 },
    salve: { name: "Honey salve", sell: 40, icon: "🩹", heal: 16 },
    cocoa: { name: "Cloud cocoa", sell: 42, icon: "☕", heal: 12 },
    broth: { name: "Harbor broth", sell: 38, icon: "🍜", heal: 14 },
    frostberry: { name: "Frostberry", sell: 14, icon: "🫐" },
    icicle: { name: "Kind icicle", sell: 18, icon: "🧊" },
    "frost-jam": { name: "Frost jam", sell: 44, icon: "❄️", heal: 8 },
    thyme: { name: "Ridge thyme", sell: 13, icon: "🌱" },
    page: { name: "Loose page", sell: 15, icon: "📄" },
    flour: { name: "Mill flour", sell: 8, icon: "🌾" },
    loaf: { name: "Mill loaf", sell: 32, icon: "🍞", heal: 16 },
    kelp: { name: "Tide kelp", sell: 11, icon: "🪸" },
    "pearl-shell": { name: "Pearl shell", sell: 34, icon: "🐚" },
    "wax-wrap": { name: "Wax wrap", sell: 22, icon: "📦" },
    oil: { name: "Lantern oil", sell: 22, icon: "🪔" },
    "dusk-wing": { name: "Dusk wing", sell: 38, icon: "🦋" },
  };

  const CLASSES = {
    wanderer: {
      id: "wanderer",
      name: "Wanderer",
      art: "hero",
      blurb: "Balanced. Finds more along the way.",
      hp: 30, atk: 6, def: 3,
      gold: 0, xp: 0, loot: 0.08, speed: 0,
      luck: 0.03, crit: 0.02, mend: 0, ward: 0, grit: 0, pierce: 0, haste: 0,
      skill: "Kind pockets — more loot on every loop.",
    },
    knight: {
      id: "knight",
      name: "Hearth Knight",
      art: "hero-knight",
      blurb: "Stout. The path hits you last.",
      hp: 44, atk: 7, def: 6,
      gold: 0.06, xp: 0, loot: 0, speed: -0.04,
      luck: 0, crit: 0, mend: 0, ward: 0.08, grit: 0.08, pierce: 0, haste: -0.02,
      skill: "Spoon guard — take a quarter less from nuzzles.",
    },
    mage: {
      id: "mage",
      name: "Grove Mage",
      art: "hero-mage",
      blurb: "Lantern-bright. Hits first, bruises easier.",
      hp: 24, atk: 11, def: 2,
      gold: 0, xp: 0.12, loot: 0, speed: 0,
      luck: 0, crit: 0.07, mend: 0, ward: 0, grit: -0.04, pierce: 2, haste: 0.03,
      skill: "Warm spark — attacks ignore two defense.",
    },
    bard: {
      id: "bard",
      name: "Trail Bard",
      art: "hero-bard",
      blurb: "Songs shorten the walk and mend the party.",
      hp: 28, atk: 5, def: 3,
      gold: 0, xp: 0.1, loot: 0, speed: 0.1,
      luck: 0, crit: 0, mend: 0.12, ward: 0, grit: 0, pierce: 0, haste: 0.06,
      skill: "Walking song — heal a little after every loop.",
    },
    forager: {
      id: "forager",
      name: "Forager",
      art: "hero-forager",
      blurb: "The grass introduces itself. You remember its name.",
      hp: 26, atk: 6, def: 3,
      gold: 0, xp: 0, loot: 0.16, speed: 0.04,
      luck: 0.08, crit: 0.02, mend: 0, ward: 0, grit: 0, pierce: 0, haste: 0,
      skill: "Soft hands — extra herbs and flowers after loops.",
    },
    cook: {
      id: "cook",
      name: "Hearth Cook",
      art: "hero-cook",
      blurb: "The kettle is a kind of sword.",
      hp: 32, atk: 5, def: 4,
      gold: 0.08, xp: 0, loot: 0, speed: 0,
      luck: 0, crit: 0, mend: 0.14, ward: 0.03, grit: 0.04, pierce: 0, haste: 0,
      skill: "Second helping — meals heal more, and you cook a spare loaf sometimes.",
    },
    ranger: {
      id: "ranger",
      name: "Ridge Ranger",
      art: "hero-ranger",
      blurb: "The high path knows your step.",
      hp: 28, atk: 8, def: 3,
      gold: 0, xp: 0, loot: 0.06, speed: 0.07,
      luck: 0.04, crit: 0.08, mend: 0, ward: 0, grit: 0, pierce: 1, haste: 0.04,
      skill: "Keen eye — keepers bruise easier, and forage appears more often.",
    },
    shepherd: {
      id: "shepherd",
      name: "Shepherd",
      art: "hero-shepherd",
      blurb: "The flock votes, and you count kindly.",
      hp: 34, atk: 6, def: 5,
      gold: 0.1, xp: 0, loot: 0.04, speed: 0,
      luck: 0.02, crit: 0, mend: 0.04, ward: 0.04, grit: 0.06, pierce: 0, haste: 0,
      skill: "Soft flock — wool and sheep encounters pay extra, and sit down sooner.",
    },
  };

  const TALENTS = [
    { id: "deep-pockets", name: "Deep pockets", text: "Loot chance +10%.", loot: 0.1 },
    { id: "kind-fists", name: "Kind fists", text: "+2 attack.", atk: 2 },
    { id: "quilted", name: "Quilted", text: "+8 max hearts.", hp: 8 },
    { id: "short-path", name: "Short path", text: "Loops run a little faster.", speed: 0.08 },
    { id: "story-ear", name: "Story ear", text: "Experience +10%.", xp: 0.1 },
    { id: "honey-hands", name: "Honey hands", text: "Penny profits lean toward 5%.", gold: 0.08 },
    { id: "keen-seam", name: "Keen seam", text: "Crit chance +6%.", crit: 0.06 },
    { id: "soft-hide", name: "Soft hide", text: "Ward +6%. Nuzzles land softer.", ward: 0.06 },
    { id: "quick-kettle", name: "Quick kettle", text: "Mend +8%. Heals go further.", mend: 0.08 },
  ];

  const PARAGON_NODES = [
    { id: "might", name: "Kind steel", stat: "might", per: 0.045, text: "A little more poke. Crits lean in." },
    { id: "ward", name: "Quilted hide", stat: "ward", per: 0.04, text: "Nuzzles land softer." },
    { id: "grit", name: "Deep kettle", stat: "grit", per: 0.055, text: "More hearts to share." },
    { id: "fortune", name: "Honey math", stat: "fortune", per: 0.045, text: "Pennies lean kinder, still pennies." },
    { id: "insight", name: "Lantern lesson", stat: "insight", per: 0.05, text: "Experience sticks." },
    { id: "stride", name: "Short grass", stat: "stride", per: 0.04, text: "The path hurries for you." },
    { id: "find", name: "Soft pockets", stat: "find", per: 0.045, text: "More finds on every loop." },
    { id: "luck", name: "Lucky crumb", stat: "luck", per: 0.035, text: "Rares and crits say yes more often." },
    { id: "mend", name: "Steam hands", stat: "mend", per: 0.05, text: "Heals and regen go further." },
    { id: "haste", name: "Quick courtesy", stat: "haste", per: 0.035, text: "Scuffles resolve sooner." },
  ];

  const ASPECTS = [
    { id: "kindling", name: "Kindling", icon: "🔥", text: "The poke leans in. Crits keep the books.", might: 0.09, crit: 0.05, haste: 0.03 },
    { id: "quilt", name: "Quilt", icon: "🧵", text: "Nuzzles land in wool. Hearts stay seated.", ward: 0.09, grit: 0.08, mend: 0.06 },
    { id: "pockets", name: "Pockets", icon: "👜", text: "The grass introduces more of itself.", find: 0.09, luck: 0.06, fortune: 0.05 },
    { id: "lesson", name: "Lesson", icon: "📖", text: "The path is a patient teacher.", insight: 0.1, stride: 0.05, xp: 0.06 },
    { id: "duskkept", name: "Dusk-kept", icon: "🪔", text: "Evening is a room you already paid for.", luck: 0.05, haste: 0.05, mend: 0.03, night: true },
  ];

  const STANCES = [
    { id: "kind", name: "Kind", text: "After a sit, the pockets are heavier.", loot: 0.05, mend: 0.04, crit: -0.02 },
    { id: "guard", name: "Guard", text: "Spoon up. Hits arrive smaller.", ward: 0.1, grit: 0.04, haste: -0.04, incoming: 0.82 },
    { id: "keen", name: "Keen", text: "Look for the seam. The bruise can wait.", crit: 0.08, pierce: 1, ward: -0.04, incoming: 1.08 },
  ];

  const SONGS = [
    { id: "kettle", name: "Kettle Waltz", blurb: "Steam in three. The inn after rain.", bpm: 68, root: 196,
      melody: [0, 4, 7, 4, 9, 7, 4, 2, 0, 4, 7, 11, 9, 7, 4, 0],
      bass: [0, 0, 7, 7, -5, -5, 0, 0, 0, 0, 5, 5, -7, -7, 0, 0],
      spark: [null, null, 12, null, null, 16, null, 12, null, 7, null, 12, null, 19, null, 7],
      wave: "triangle" },
    { id: "brook", name: "Willow Brook", blurb: "Water counting pebbles.", bpm: 82, root: 220,
      melody: [7, 9, 7, 4, 7, 11, 9, 7, 4, 2, 4, 7, 4, 0, 2, 4],
      bass: [0, 0, 5, 5, 7, 7, 0, 0, -5, -5, 0, 0, 2, 2, 0, 0],
      spark: [12, null, 16, null, 12, null, 19, null, 12, null, 16, null, 11, null, 12, null],
      wave: "sine" },
    { id: "dusk", name: "Lantern Dusk", blurb: "Moths keeping time.", bpm: 54, root: 174.61,
      melody: [0, 3, 7, 3, 10, 7, 3, 0, -2, 0, 3, 7, 5, 3, 0, -4],
      bass: [0, 0, -5, -5, -9, -9, 0, 0, 3, 3, -2, -2, -5, -5, 0, 0],
      spark: [null, null, null, 15, null, null, null, 10, null, null, 12, null, null, 7, null, null],
      wave: "triangle" },
    { id: "honey", name: "Honey Square", blurb: "A festival that forgot to end.", bpm: 94, root: 246.94,
      melody: [0, 4, 7, 12, 7, 4, 7, 4, 2, 5, 9, 12, 9, 5, 4, 0],
      bass: [0, 0, 4, 4, -5, -5, 0, 0, 2, 2, 5, 5, -3, -3, 0, 0],
      spark: [12, 16, 12, 19, 12, 16, 12, 12, 16, 19, 16, 12, 9, 12, 7, 4],
      wave: "sine" },
    { id: "snow", name: "Snow Quilt", blurb: "Almost nothing. Almost enough.", bpm: 46, root: 233.08,
      melody: [0, null, null, null, 7, null, null, null, 4, null, null, null, 12, null, null, null],
      bass: [0, null, null, null, null, null, null, null, -7, null, null, null, null, null, null, null],
      spark: [null, null, null, null, 19, null, null, null, null, null, null, null, 24, null, null, null],
      wave: "sine" },
    { id: "starwell", name: "Starwell Hum", blurb: "The well answering itself.", bpm: 60, root: 164.81,
      melody: [0, 7, 12, 7, 5, 12, 7, 0, 3, 10, 15, 10, 7, 12, 7, 3],
      bass: [0, 0, 0, 0, -5, -5, -5, -5, 3, 3, 3, 3, -2, -2, -2, -2],
      spark: [12, null, 19, null, 15, null, 12, null, 24, null, 19, null, 15, null, 12, null],
      wave: "triangle" },
    { id: "orchard", name: "Old Orchard", blurb: "Apples keeping time in the grass.", bpm: 76, root: 207.65,
      melody: [4, 7, 9, 7, 4, 2, 4, 0, 7, 9, 12, 9, 7, 4, 2, 4],
      bass: [0, 0, 5, 5, -3, -3, 0, 0, 4, 4, -5, -5, 0, 0, 2, 2],
      spark: [16, null, 12, null, 19, null, 12, null, 16, 12, null, 9, null, 12, null, 7],
      wave: "sine" },
    { id: "harbor", name: "Saltwind Reel", blurb: "Crabs tapping teacups on the dock.", bpm: 74, root: 185,
      melody: [0, 2, 5, 7, 5, 2, 0, -2, 0, 5, 9, 7, 5, 2, 0, 5],
      bass: [0, 0, -5, -5, 2, 2, 0, 0, -7, -7, 0, 0, 5, 5, 0, 0],
      spark: [12, null, null, 17, null, 12, null, 7, 12, null, 19, null, 12, null, 5, null],
      wave: "triangle" },
    { id: "mill", name: "Mill Wheel", blurb: "Flour counting itself in circles.", bpm: 62, root: 196,
      melody: [0, 0, 4, 4, 7, 7, 4, 0, 5, 5, 9, 9, 7, 4, 0, -5],
      bass: [0, 0, 0, 0, -5, -5, -5, -5, 2, 2, 2, 2, 0, 0, -7, -7],
      spark: [null, 12, null, 12, null, 7, null, 12, null, 16, null, 12, null, 7, null, 4],
      wave: "triangle" },
    { id: "frost", name: "Frost Hollow", blurb: "Ice bells that ask before they ring.", bpm: 50, root: 233.08,
      melody: [7, null, 12, null, 4, null, 7, null, 0, null, 7, null, 12, 16, 12, 7],
      bass: [0, null, null, null, -8, null, null, null, 3, null, null, null, -5, null, 0, null],
      spark: [null, 19, null, 24, null, 19, null, 12, null, 16, null, 19, null, 24, null, 19],
      wave: "sine" },
    { id: "kiln", name: "Ember Kiln", blurb: "Warm pots humming to themselves.", bpm: 70, root: 174.61,
      melody: [0, 5, 8, 5, 0, -2, 0, 5, 8, 12, 8, 5, 3, 0, 5, 0],
      bass: [0, 0, -4, -4, 5, 5, 0, 0, -7, -7, 0, 0, 3, 3, 0, 0],
      spark: [8, null, 12, null, 15, null, 12, null, 8, 12, null, 17, null, 12, null, 5],
      wave: "triangle" },
    { id: "meadow", name: "Meadow Counting", blurb: "Sheep naming clouds, slowly.", bpm: 72, root: 220,
      melody: [0, 2, 4, 2, 0, 4, 7, 4, 2, 0, -3, 0, 4, 7, 4, 0],
      bass: [0, 0, -5, -5, 0, 0, 4, 4, -7, -7, 0, 0, 2, 2, 0, 0],
      spark: [null, 12, null, 7, null, 12, null, 16, null, 12, null, 7, null, 12, null, 4],
      wave: "sine" },
    { id: "choir", name: "Lantern Choir", blurb: "The woods practicing after dark.", bpm: 58, root: 196,
      melody: [0, 4, 7, 11, 7, 4, 0, 4, 2, 5, 9, 12, 9, 5, 2, 0],
      bass: [0, 0, 7, 7, 4, 4, 0, 0, -5, -5, 2, 2, 0, 0, -8, -8],
      spark: [12, 16, 19, 16, 12, 7, 12, 16, 11, 14, 19, 14, 11, 7, 11, 12],
      wave: "sine" },
    { id: "crumb", name: "Pocket Biscuit", blurb: "A small song that fits in a tin.", bpm: 88, root: 261.63,
      melody: [0, 4, 2, 4, 7, 4, 2, 0, 5, 4, 2, 0, 4, 7, 4, 0],
      bass: [0, 0, 4, 4, -5, -5, 0, 0, 2, 2, 0, 0, -3, -3, 0, 0],
      spark: [12, 7, 12, 16, 12, 7, 4, 12, 9, 12, 16, 12, 7, 12, 4, 0],
      wave: "triangle" },
  ];

  const SYNERGIES = [
    { need: ["wick", "lumen"], luck: 0.05, text: "Two lanterns, one moth." },
    { need: ["bramble", "fern"], ward: 0.05, text: "A wall that votes to sit." },
    { need: ["pip", "thimble"], loot: 0.05, text: "Pockets consulting pockets." },
    { need: ["pearl", "nettle"], mend: 0.06, text: "Tea that learned a chorus." },
    { need: ["ash", "cook"], gold: 0.04, text: "The mug and the kettle agree." },
    { need: ["wick", "ash"], haste: 0.04, text: "Kiln-dusk, walking." },
  ];

  const COTTAGE = [
    { id: "kettle", name: "Copper kettle", cost: 70, text: "Hearts mend a little faster at home.", blurb: "Steam is a kind of clock." },
    { id: "quilt", name: "Hearth quilt", cost: 180, text: "+4 max hearts for everyone.", blurb: "The inn's cousin." },
    { id: "porch", name: "Porch lantern", cost: 360, text: "Loot +8%. Night is polite.", blurb: "A light that waits up." },
    { id: "garden", name: "Doorstep garden", cost: 720, text: "Penny profits lean kinder. Herbs sometimes arrive.", blurb: "The path starts at the stoop." },
    { id: "hivebox", name: "Porch hive", cost: 260, text: "Honey arrives twice as kindly.", blurb: "A small factory that hums." },
    { id: "sconce", name: "Dusk sconce", cost: 480, text: "Night loops hurry. Moths come to visit.", blurb: "A shelf for evenings." },
  ];

  const PETS = [
    { id: "mallow", name: "Mallow", art: "mallow", cost: 55, level: 2, loot: 0.05, gold: 0, heal: 1, blurb: "A kettle for a hat. Approves of naps." },
    { id: "dumpling", name: "Dumpling", art: "dumpling", cost: 95, level: 5, loot: 0, gold: 0.07, heal: 0, blurb: "Shaped like lunch. Pays in pennies and crumbs." },
  ];

  const STORY = [
    { id: "first-loop", title: "The first loop", text: "You came home with crumbs and a new map-crease.", gold: 8, test: (s) => Object.values(s.walks || {}).reduce((a, b) => a + b, 0) >= 1 },
    { id: "first-friend", title: "A packed bag", text: "Someone else thought the lantern was worth following.", gold: 16, test: (s) => (s.party || []).length >= 2 },
    { id: "first-keeper", title: "A moss crown", text: "The path introduced its steward. You bowed. They bowed back.", gold: 24, test: (s) => Object.values(s.walks || {}).some((n) => n >= 8) },
    { id: "hearth", title: "A hearth of your own", text: "The cottage learned your footsteps.", gold: 20, test: (s) => Object.keys(s.cottage || {}).length >= 1 },
    { id: "post", title: "A name that travels", text: "Wren filed you under 'comes home.'", item: "ribbon", n: 1, test: (s) => (s.hearts && s.hearts.wren) >= 1 },
    { id: "festival", title: "A table in the square", text: "The valley set an extra place and did not say for whom.", gold: 30, test: (s) => !!s.sawFestival },
    { id: "bonded", title: "A known walk", text: "A companion started finishing your sentences with crumbs.", gold: 22, test: (s) => Object.values(s.bonds || {}).some((n) => n >= 12) },
    { id: "frost", title: "The hollow in white", text: "Winter showed you a path it had been saving.", item: "frostberry", n: 2, test: (s) => (s.walks && s.walks.frost) >= 1 },
    { id: "starwell", title: "The last mapped step", text: "The well said yes. The valley stayed small. You did not.", gold: 80, test: (s) => (s.walks && s.walks.starwell) >= 1 },
    { id: "full-table", title: "A crowded lantern", text: "Five kinds of footsteps, one kettle.", gold: 40, test: (s) => (s.party || []).length >= 5 },
    { id: "mill", title: "Flour on the wind", text: "The wheel never sleeps. Bram offered you a sack anyway.", item: "flour", n: 2, test: (s) => (s.hearts && s.hearts.bram) >= 1 || (s.walks && s.walks.caves) >= 1 },
    { id: "caves", title: "A cave that breathed", text: "The tide introduced itself. You said after you.", item: "kelp", n: 2, test: (s) => (s.walks && s.walks.caves) >= 1 },
    { id: "library", title: "A book that remembered you", text: "Iris dog-eared a page that wasn't there yesterday.", item: "lullaby", n: 1, test: (s) => (s.hearts && s.hearts.iris) >= 1 },
    { id: "ridge", title: "The meadow that looks down", text: "The valley looked small. It did not mind.", item: "thyme", n: 2, test: (s) => (s.walks && s.walks.ridge) >= 1 },
    { id: "springs", title: "Steam that remembers you", text: "The pools knew your name before you sat.", item: "teacup", n: 1, test: (s) => (s.walks && s.walks.springs) >= 1 },
    { id: "cabinet", title: "A shelf with your handwriting", text: "Iris labeled a space and left it empty for later.", gold: 24, test: (s) => Object.keys(s.museum || {}).length >= 3 },
    { id: "kindled", title: "A lantern that remembers", text: "You came home to a valley that had forgotten your pockets and kept your math.", gold: 16, test: (s) => (s.paragon && s.paragon.kindles) >= 1 },
    { id: "dusk", title: "A second evening", text: "The thicket had already lit itself. You only had to walk the aisle.", item: "oil", n: 1, test: (s) => (s.walks && s.walks.dusk) >= 1 },
    { id: "wick-met", title: "A spare lantern", text: "Someone small arrived carrying dusk in a bottle.", gold: 18, test: (s) => (s.party || []).includes("wick") },
  ];

  const STAMPS = [
    { id: "walker", name: "Walker", icon: "🥾", test: (s) => Object.values(s.walks || {}).reduce((a, b) => a + b, 0) >= 25 },
    { id: "host", name: "Host", icon: "🫖", test: (s) => (s.party || []).length >= 4 },
    { id: "keeper", name: "Steward", icon: "👑", test: (s) => Object.values(s.walks || {}).some((n) => n >= 16) },
    { id: "cook", name: "Kettle", icon: "🍲", test: (s) => (s.pack && ((s.pack.stew || 0) + (s.pack.tea || 0) + (s.pack.jam || 0))) >= 1 || (s.journal || []).some((j) => /cook|kettle|stew/i.test(j.text)) },
    { id: "post", name: "Posted", icon: "✉", test: (s) => (s.mail || []).some((m) => m.read) },
    { id: "pet", name: "Lap", icon: "🐾", test: (s) => !!s.pet },
    { id: "story", name: "Chaptered", icon: "📖", test: (s) => Object.keys(s.story || {}).length >= 5 },
    { id: "well", name: "Wished", icon: "✨", test: (s) => (s.walks && s.walks.starwell) >= 1 },
    { id: "mill", name: "Milled", icon: "🌾", test: (s) => (s.hearts && s.hearts.bram) >= 1 },
    { id: "gift", name: "Given", icon: "🎁", test: (s) => !!s.gaveGift },
    { id: "board", name: "Boarded", icon: "📌", test: (s) => (s.errandsDone || 0) >= 5 },
    { id: "hive", name: "Hived", icon: "🐝", test: (s) => !!s.hiveCollected },
    { id: "fish", name: "Hooked", icon: "🎣", test: (s) => !!s.pondCollected },
    { id: "cabinet", name: "Shelved", icon: "🏺", test: (s) => Object.keys(s.museum || {}).length >= 3 },
    { id: "kindle", name: "Kindled", icon: "🏮", test: (s) => (s.paragon && s.paragon.kindles) >= 1 },
    { id: "dusk", name: "Dusked", icon: "🪔", test: (s) => (s.walks && s.walks.dusk) >= 1 },
    { id: "temper", name: "Tempered", icon: "🔨", test: (s) => Object.values(s.temper || {}).some((n) => n > 0) },
    { id: "codex", name: "Filed", icon: "📚", test: (s) => Object.keys((s.paragon && s.paragon.codex) || {}).length >= 3 },
    { id: "far", name: "Farther", icon: "∞", test: (s) => Object.keys(s.walks || {}).some((id) => id.indexOf("far-") === 0) },
    { id: "thirty", name: "Mapped", icon: "🗺️", test: (s) => Object.keys(s.walks || {}).length >= 12 },
  ];

  const ERRANDS = [
    { id: "walk-any", kind: "walks", n: 3, text: "Walk any trail three times today.", gold: 20, xp: 6 },
    { id: "forage", kind: "forage", n: 2, text: "Pick two finds off the painted world.", gold: 12, xp: 4 },
    { id: "gift", kind: "gift", n: 1, text: "Give a companion something from the satchel.", gold: 14, xp: 4 },
    { id: "cook", kind: "cook", n: 1, text: "Cook or craft one thing.", gold: 16, xp: 5 },
    { id: "npc", kind: "npc", n: 1, text: "Visit a neighbor and talk a minute.", gold: 10, xp: 4 },
    { id: "hive", kind: "hive", n: 1, text: "Collect whatever the hive offered.", gold: 14, xp: 4 },
    { id: "pond", kind: "pond", n: 1, text: "Check the mill pond line.", gold: 12, xp: 4 },
    { id: "oil", kind: "oil", n: 1, text: "Light a porch rite, or cook a bottle of oil.", gold: 18, xp: 5 },
    { id: "temper", kind: "temper", n: 1, text: "Temper one worn thing with oil.", gold: 22, xp: 6 },
  ];

  const FOES = {
    slime: { id: "slime", name: "Biscuit slime", art: "slime", hp: 12, atk: 3, def: 0, grow: 1.1, verb: "wobbled into" },
    sheep: { id: "sheep", name: "Stubborn sheep", art: "wool", hp: 14, atk: 2, def: 1, grow: 1.1, verb: "leaned on" },
    trout: { id: "trout", name: "Winking trout", art: "trout", hp: 13, atk: 4, def: 1, grow: 1.15, verb: "splashed" },
    crab: { id: "crab", name: "Teacup crab", art: "crab", hp: 18, atk: 5, def: 3, grow: 1.2, verb: "pinched, politely," },
    bee: { id: "bee", name: "Baker bee", art: "bee", hp: 16, atk: 6, def: 1, grow: 1.2, verb: "buzzed against" },
    mothkin: { id: "mothkin", name: "Lost moth", art: "lumen", hp: 17, atk: 5, def: 1, grow: 1.2, verb: "brushed" },
    ghost: { id: "ghost", name: "Tea ghost", art: "ghost", hp: 20, atk: 5, def: 2, grow: 1.25, verb: "chilled" },
    wool: { id: "wool", name: "Cloud sheep", art: "wool", hp: 22, atk: 5, def: 2, grow: 1.25, verb: "fluffed" },
    ember: { id: "ember", name: "Kiln sprite", art: "ember", hp: 26, atk: 7, def: 3, grow: 1.3, verb: "warmed" },
    star: { id: "star", name: "Well sprite", art: "star", hp: 34, atk: 9, def: 3, grow: 1.35, verb: "glimmered at" },
    spring: { id: "spring", name: "Steam sprite", art: "spring", hp: 28, atk: 6, def: 3, grow: 1.28, verb: "misted" },
    dusk: { id: "dusk", name: "Dusk moth", art: "dusk", hp: 27, atk: 7, def: 2, grow: 1.28, verb: "dusted" },
  };

  const TRAILS = [
    {
      id: "meadow", name: "Meadow Path", hint: "Sheep, biscuits, and polite slimes.",
      ms: 8000, level: 1, gold: [4, 7], xp: 3, art: "meadow", icon: "🌾",
      loot: [["herb", 0.55], ["biscuit", 0.4], ["wildflower", 0.35]], rare: ["biscuit", 0.08],
      foes: ["slime", "sheep"],
      says: [
        "A plump slime blocked the path. You offered a biscuit. It rolled aside, leaving crumbs and a copper.",
        "The sheep refused to move, so the party sat down and named the clouds.",
        "Wildflowers leaned in as if they had gossip. You picked only the ones that nodded.",
      ],
    },
    {
      id: "brook", name: "Willow Brook", hint: "The water tells small secrets.",
      ms: 14000, level: 2, gold: [8, 12], xp: 6, art: "brook", icon: "💧",
      loot: [["ribbon", 0.4], ["fish", 0.35], ["herb", 0.4]], rare: ["ribbon", 0.1],
      foes: ["trout", "slime"],
      says: [
        "A trout winked. Pip swore it wanted to join the party. You let it go with a bow.",
        "Willow branches braided a ribbon for you and asked nothing back.",
        "The brook hummed a tune Nettle almost recognized.",
      ],
    },
    {
      id: "orchard", name: "Old Orchard", hint: "Apples and lost buttons in the grass.",
      ms: 22000, level: 4, gold: [14, 20], xp: 10, art: "orchard", icon: "🍎",
      loot: [["apple", 0.5], ["button", 0.35], ["honey", 0.22]], rare: ["honey", 0.1],
      foes: ["sheep", "bee"],
      says: [
        "An apple dropped into Bramble's helmet. He called it a promotion.",
        "Bees negotiated a treaty. Honey was the signing bonus.",
        "A button in the grass matched nothing you owned. Cob will know its family.",
      ],
    },
    {
      id: "harbor", name: "Saltwind Harbor", hint: "Crabs in teacups. Salt on the wind.",
      ms: 18000, level: 5, gold: [16, 24], xp: 12, art: "harbor", icon: "⚓",
      loot: [["salt", 0.5], ["net", 0.3], ["pearl-bead", 0.18]], rare: ["pearl-bead", 0.12],
      foes: ["crab", "trout"],
      says: [
        "A crab wore a teacup as a helm and demanded a duel. You bowed. It bowed back.",
        "Pearl would have liked this dock. The water smelled like coming home.",
        "Someone left a net full of buttons. The sea has a sense of humor.",
      ],
    },
    {
      id: "woods", name: "Lantern Woods", hint: "Paper lights and glowcaps after dusk.",
      ms: 32000, level: 6, gold: [22, 32], xp: 16, art: "woods", icon: "🏮",
      loot: [["mushroom", 0.45], ["glowbug", 0.28], ["silk", 0.22]], rare: ["silk", 0.12],
      foes: ["mothkin", "slime"],
      says: [
        "Lumen's lantern answered the trees. For a moment the whole path bowed.",
        "A moth asked for directions and left a thread of silk as thanks.",
        "You crossed the little bridge. Nobody fell in. The brook applauded anyway.",
      ],
    },
    {
      id: "hollow", name: "Honey Hollow", hint: "Hives like cottages. Biscuits with wings.",
      ms: 28000, level: 7, gold: [20, 30], xp: 15, art: "hollow", icon: "🍯",
      loot: [["honey", 0.45], ["wax", 0.35], ["sting", 0.22]], rare: ["honey", 0.14],
      foes: ["bee"],
      says: [
        "A baker bee offered you a tour of the comb. Admission was one compliment.",
        "Wax stuck to Bramble. He claimed it was armor.",
        "The hollow hummed in three-part harmony. Nettle took notes.",
      ],
    },
    {
      id: "caves", name: "Tide Caves", hint: "The sea keeps rooms it only rents at dusk.",
      ms: 30000, level: 8, gold: [24, 36], xp: 17, art: "caves", icon: "🐚",
      loot: [["kelp", 0.5], ["salt", 0.35], ["pearl-shell", 0.2]], rare: ["pearl-bead", 0.14],
      foes: ["crab", "trout"],
      says: [
        "A cave breathed out. It smelled like a promise kept wet.",
        "Kelp curtained a room nobody was using. You borrowed a ribbon of it.",
        "The tide left a shell and took nothing back.",
      ],
    },
    {
      id: "frost", name: "Frost Hollow", hint: "Winter keeps a spare path here.",
      ms: 36000, level: 10, gold: [30, 44], xp: 20, art: "frost", icon: "❄️",
      loot: [["frostberry", 0.45], ["icicle", 0.32], ["wool", 0.22]], rare: ["icicle", 0.14],
      foes: ["wool", "ghost"],
      says: [
        "An icicle rang like a tiny bell. You asked before taking it.",
        "Frostberries nodded when you passed. Only the ripe ones came.",
        "The hollow held its breath. Then it let you have some of the quiet.",
      ],
    },
    {
      id: "ruins", name: "Moss Ruins", hint: "Ghosts who mostly want tea.",
      ms: 48000, level: 9, gold: [36, 50], xp: 24, art: "ruins", icon: "🪨",
      loot: [["relic", 0.28], ["teacup", 0.4], ["moss", 0.5]], rare: ["relic", 0.14],
      foes: ["ghost"],
      says: [
        "A kind ghost poured tea you could almost taste. The cup stayed behind.",
        "Moss had grown into the shape of a map. Quill will faint politely.",
        "You left a biscuit on a fallen stair. In the morning it was a relic.",
      ],
    },
    {
      id: "cloud", name: "Cloud Pasture", hint: "Sheep that forgot to come down.",
      ms: 40000, level: 11, gold: [32, 48], xp: 22, art: "cloud", icon: "☁️",
      loot: [["wool", 0.45], ["cloud-tuft", 0.32], ["lullaby", 0.12]], rare: ["cloud-tuft", 0.12],
      foes: ["wool", "sheep"],
      says: [
        "A cloud sheep offered you a seat. It was very soft and slightly damp.",
        "The fence floated. So did Pip, briefly.",
        "You sheared a tuft with permission. The sheep looked prouder.",
      ],
    },
    {
      id: "ridge", name: "High Meadow", hint: "The valley looks kind from here.",
      ms: 44000, level: 12, gold: [34, 50], xp: 23, art: "ridge", icon: "🌄",
      loot: [["thyme", 0.5], ["wildflower", 0.35], ["cloud-tuft", 0.2]], rare: ["thyme", 0.14],
      foes: ["sheep", "wool"],
      says: [
        "The wind combed the grass. You let it finish.",
        "Thyme clung to your boots like a small souvenir.",
        "A cairn had one extra stone. You did not add another. You sat.",
      ],
    },
    {
      id: "moon", name: "Moonridge", hint: "The sky is closer. Speak softly.",
      ms: 70000, level: 13, gold: [60, 90], xp: 40, art: "moon", icon: "🌙",
      loot: [["starshard", 0.3], ["moonbloom", 0.28], ["lullaby", 0.22]], rare: ["starshard", 0.16],
      foes: ["star", "ghost"],
      says: [
        "The moon leaned down to hear Nettle's song and left a shard in the grass.",
        "A bloom opened only for dusk. You asked first. It said yes.",
        "You walked the ridge until your thoughts were the same color as the sky.",
      ],
    },
    {
      id: "springs", name: "Hot Springs", hint: "Steam that mends what the trail unstitches.",
      ms: 50000, level: 14, gold: [42, 62], xp: 28, art: "springs", icon: "♨️",
      loot: [["teacup", 0.4], ["moss", 0.35], ["wellwater", 0.18]], rare: ["teacup", 0.14],
      foes: ["spring", "ghost"],
      says: [
        "The pool was already the right temperature. You did not ask how.",
        "Steam wrote a letter and erased it. You kept the warmth.",
        "A sprite offered the ladle. You bowed. The water bowed back.",
      ],
    },
    {
      id: "kiln", name: "Ember Kiln", hint: "Warm stones. Pottery that remembers hands.",
      ms: 55000, level: 15, gold: [48, 70], xp: 32, art: "kiln", icon: "🔥",
      loot: [["pot", 0.4], ["ember", 0.3], ["glaze", 0.22]], rare: ["ember", 0.14],
      foes: ["ember"],
      says: [
        "A kiln sprite offered you a mug that was still becoming a mug.",
        "The yard smelled like bread that decided to be a bowl.",
        "Cob would approve of these stitches of clay.",
      ],
    },
    {
      id: "dusk", name: "Dusk Thicket", hint: "The trees keep a second evening.",
      ms: 62000, level: 16, gold: [52, 76], xp: 34, art: "dusk", icon: "🪔",
      loot: [["oil", 0.42], ["silk", 0.3], ["glowbug", 0.26], ["dusk-wing", 0.16]], rare: ["dusk-wing", 0.14],
      foes: ["dusk", "mothkin"],
      says: [
        "A moth landed on the lantern and paid rent in gold dust.",
        "The thicket had already lit itself. You just walked the aisle.",
        "Oil dripped from a leaf. You asked. The tree nodded.",
      ],
    },
    {
      id: "starwell", name: "Starwell", hint: "A well full of yes. The map keeps a blank page after.",
      ms: 85000, level: 18, gold: [80, 120], xp: 50, art: "starwell", icon: "✨",
      loot: [["starshard", 0.35], ["wish", 0.22], ["wellwater", 0.3]], rare: ["wish", 0.12],
      foes: ["star"],
      says: [
        "You looked in. The well looked back, kindly, and handed you a star.",
        "A wish floated up like steam. You bottled the leftover warmth.",
        "The last step felt like the first. The valley is still small. You are not.",
      ],
    },
    {
      id: "reed", name: "Reed Marsh", hint: "The frogs keep minutes. The mud keeps boots.",
      ms: 58000, level: 17, gold: [54, 78], xp: 36, art: "brook", icon: "🌾",
      loot: [["kelp", 0.4], ["ribbon", 0.3], ["fish", 0.32]], rare: ["pearl-bead", 0.12],
      foes: ["trout", "slime"],
      says: [
        "A reed bowed and offered you the dry side of the path.",
        "Something plopped. It was a fish with opinions.",
        "The marsh smelled like a library that learned to swim.",
      ],
    },
    {
      id: "bell", name: "Bell Steppe", hint: "Wind and one polite bell. Sheep vote later.",
      ms: 64000, level: 19, gold: [62, 90], xp: 40, art: "ridge", icon: "🔔",
      loot: [["thyme", 0.42], ["wool", 0.3], ["wildflower", 0.28]], rare: ["lullaby", 0.12],
      foes: ["sheep", "wool"],
      says: [
        "The bell rang once. You did not ask who pulled it.",
        "Grass ran in one direction. You ran in the other, slowly.",
        "A sheep counted the party and found the number acceptable.",
      ],
    },
    {
      id: "quarry", name: "Copper Quarry", hint: "Warm stone. Ghosts who used to be masons.",
      ms: 68000, level: 20, gold: [70, 100], xp: 44, art: "ruins", icon: "🪨",
      loot: [["relic", 0.26], ["ember", 0.28], ["moss", 0.4]], rare: ["ember", 0.14],
      foes: ["ember", "ghost"],
      says: [
        "A block of copper remembered a kettle and blushed.",
        "The quarry asked for a song. Nettle charged one compliment.",
        "Dust settled in the shape of a map Quill will deny.",
      ],
    },
    {
      id: "fen", name: "Quiet Fen", hint: "Honey and tide arguing politely.",
      ms: 70000, level: 21, gold: [74, 108], xp: 46, art: "hollow", icon: "🌿",
      loot: [["honey", 0.36], ["wax", 0.3], ["kelp", 0.28]], rare: ["oil", 0.12],
      foes: ["bee", "trout"],
      says: [
        "A bee and a trout signed a treaty. You witnessed, unpaid.",
        "The fen hummed in a key nobody uses on purpose.",
        "Wax and salt made a candle that refused to gossip.",
      ],
    },
    {
      id: "lark", name: "Lark Spire", hint: "The sky keeps a spare stair.",
      ms: 76000, level: 22, gold: [82, 118], xp: 50, art: "moon", icon: "🐦",
      loot: [["cloud-tuft", 0.34], ["starshard", 0.22], ["lullaby", 0.2]], rare: ["moonbloom", 0.12],
      foes: ["star", "wool"],
      says: [
        "A lark sold you a stair for one kind word.",
        "The spire leaned into the wind and asked you to lean too.",
        "Cloud wool caught on the lantern and paid rent.",
      ],
    },
    {
      id: "archive", name: "Salt Archive", hint: "The tide files everything wet.",
      ms: 78000, level: 23, gold: [86, 124], xp: 52, art: "caves", icon: "📜",
      loot: [["page", 0.38], ["salt", 0.34], ["pearl-shell", 0.2]], rare: ["lullaby", 0.12],
      foes: ["crab", "ghost"],
      says: [
        "A crab stamped a page with its claw. Official enough.",
        "The archive whispered in salt. You took notes, then licked one.",
        "A ghost asked if you had a library card. You did not. It issued one.",
      ],
    },
    {
      id: "amber", name: "Amber Gallery", hint: "Kiln-light hung like paintings.",
      ms: 80000, level: 24, gold: [92, 132], xp: 56, art: "kiln", icon: "🟠",
      loot: [["glaze", 0.32], ["pot", 0.3], ["ember", 0.26]], rare: ["ember", 0.16],
      foes: ["ember", "mothkin"],
      says: [
        "A pot framed itself. You applauded. It bowed.",
        "Amber held a moth mid-compliment. You let it finish later.",
        "The gallery was warm enough to nap in. You did not. Almost.",
      ],
    },
    {
      id: "thistle", name: "Thistle Causeway", hint: "A road that scratches, then apologizes.",
      ms: 82000, level: 25, gold: [98, 140], xp: 58, art: "orchard", icon: "🌵",
      loot: [["apple", 0.34], ["button", 0.28], ["honey", 0.24]], rare: ["jam", 0.1],
      foes: ["bee", "sheep"],
      says: [
        "Thistles parted if you said please. Most of them.",
        "An apple rolled the whole causeway and arrived proud.",
        "A sheep used the thistles as a comb. It looked official.",
      ],
    },
    {
      id: "glass", name: "Glass Brook", hint: "Water so clear it files complaints.",
      ms: 84000, level: 26, gold: [104, 148], xp: 62, art: "springs", icon: "🪞",
      loot: [["teacup", 0.3], ["wellwater", 0.28], ["fish", 0.3]], rare: ["teacup", 0.14],
      foes: ["spring", "trout"],
      says: [
        "You could see the brook's homework. It was mostly pebbles.",
        "Steam wrote on the glass and wiped it, shy.",
        "A trout admired itself and then you, equally.",
      ],
    },
    {
      id: "umber", name: "Umber Stacks", hint: "Books of stone. Ghosts for librarians.",
      ms: 88000, level: 27, gold: [112, 158], xp: 66, art: "ruins", icon: "📚",
      loot: [["page", 0.36], ["relic", 0.26], ["moss", 0.34]], rare: ["relic", 0.16],
      foes: ["ghost", "dusk"],
      says: [
        "A stack of umber asked to be reshelved. You sat on it instead.",
        "The moths had already read the endings. They spoilered kindly.",
        "Moss made an index. It was accurate and a little smug.",
      ],
    },
    {
      id: "nightorchard", name: "Night Orchard", hint: "Apples that only ripen for lanterns.",
      ms: 90000, level: 28, gold: [118, 168], xp: 70, art: "dusk", icon: "🍎",
      loot: [["apple", 0.32], ["oil", 0.3], ["moonbloom", 0.2]], rare: ["dusk-wing", 0.14],
      foes: ["dusk", "mothkin"],
      says: [
        "An apple ticked like a small clock. Ripe at dusk exactly.",
        "The trees had hung their own lanterns. You were late to the party.",
        "Oil and juice mixed on the grass. The moths called it punch.",
      ],
    },
    {
      id: "labyrinth", name: "Soft Labyrinth", hint: "Hedges that apologize when you turn wrong.",
      ms: 94000, level: 29, gold: [126, 178], xp: 74, art: "woods", icon: "🌀",
      loot: [["silk", 0.3], ["mushroom", 0.32], ["page", 0.24]], rare: ["silk", 0.16],
      foes: ["mothkin", "ghost"],
      says: [
        "A hedge opened a door that had not been there. It was sorry about the delay.",
        "You were lost for one song. Then you were found, humming.",
        "The center was a bench. The labyrinth's whole thesis.",
      ],
    },
    {
      id: "stair", name: "Kindling Stair", hint: "Steps that remember every lantern.",
      ms: 98000, level: 30, gold: [136, 192], xp: 80, art: "starwell", icon: "🪜",
      loot: [["starshard", 0.3], ["oil", 0.26], ["wish", 0.16]], rare: ["wish", 0.14],
      foes: ["star", "ember"],
      says: [
        "Each step lit when you thanked it. You thanked a lot of steps.",
        "The stair went up and also inward. Both were polite.",
        "A spark offered to carry the bag. You let it carry one biscuit.",
      ],
    },
    {
      id: "farpasture", name: "Far Pasture", hint: "The flock that left the map on purpose.",
      ms: 100000, level: 31, gold: [144, 204], xp: 84, art: "cloud", icon: "🐑",
      loot: [["wool", 0.36], ["cloud-tuft", 0.3], ["thyme", 0.26]], rare: ["lullaby", 0.14],
      foes: ["wool", "star"],
      says: [
        "The pasture had no fence. The sheep were the fence, philosophically.",
        "A cloud sat down. You sat in it. Everyone was damper and braver.",
        "Far is just a word sheep use for 'not yet napped.'",
      ],
    },
    {
      id: "lastcart", name: "Last Cart Road", hint: "The harbor's cousin that forgot the water.",
      ms: 104000, level: 32, gold: [154, 218], xp: 90, art: "harbor", icon: "🛒",
      loot: [["salt", 0.3], ["net", 0.26], ["pearl-bead", 0.22], ["button", 0.24]], rare: ["pearl-shell", 0.14],
      foes: ["crab", "dusk"],
      says: [
        "A cart with no horse waited. You pulled. It was grateful and squeaky.",
        "The road smelled like tide and flour. Bram would investigate.",
        "The last cart of the day was also the first of tomorrow. You waved twice.",
      ],
    },
    {
      id: "pollen", name: "Pollen Stairs", hint: "Steps that sneeze gold dust.",
      ms: 72000, level: 19, gold: [66, 96], xp: 42, art: "orchard", icon: "🌼",
      loot: [["wildflower", 0.4], ["honey", 0.3], ["apple", 0.26]], rare: ["honey", 0.14],
      foes: ["bee", "sheep"],
      says: [
        "Pollen wrote your name on the stair and then blew it off, shy.",
        "A bee counted the steps and lost count, happily.",
        "You sneezed. The flowers considered it applause.",
      ],
    },
    {
      id: "inkfen", name: "Ink Fen", hint: "Pages that grew legs and got wet.",
      ms: 76000, level: 21, gold: [78, 112], xp: 48, art: "woods", icon: "🖋️",
      loot: [["page", 0.4], ["moss", 0.3], ["ribbon", 0.24]], rare: ["lullaby", 0.12],
      foes: ["mothkin", "ghost"],
      says: [
        "A page swam by. You fished it out. It was still writing.",
        "The fen smelled like a library after rain.",
        "Iris would faint, then take notes, then faint again.",
      ],
    },
    {
      id: "copperbridge", name: "Copper Bridge", hint: "Warm metal. Crabs collecting tolls in buttons.",
      ms: 80000, level: 23, gold: [88, 128], xp: 54, art: "harbor", icon: "🌉",
      loot: [["button", 0.34], ["salt", 0.3], ["ember", 0.2]], rare: ["pearl-bead", 0.13],
      foes: ["crab", "ember"],
      says: [
        "The bridge charged one compliment. You paid twice.",
        "Copper ticked like a kettle about to sing.",
        "A crab stamped your boot. Official crossing.",
      ],
    },
    {
      id: "softglacier", name: "Soft Glacier", hint: "Ice that apologizes when it slips.",
      ms: 86000, level: 25, gold: [100, 144], xp: 60, art: "frost", icon: "🧊",
      loot: [["icicle", 0.36], ["frostberry", 0.32], ["wool", 0.24]], rare: ["icicle", 0.16],
      foes: ["wool", "ghost"],
      says: [
        "The glacier offered you a slow seat. You declined, kindly, then sat anyway.",
        "An icicle rang the hour. It was tea-time somewhere.",
        "Snow forgot to be cold for one song.",
      ],
    },
    {
      id: "choir", name: "Lantern Choir", hint: "The woods practicing harmony after dark.",
      ms: 90000, level: 27, gold: [114, 162], xp: 68, art: "dusk", icon: "🎶",
      loot: [["lullaby", 0.26], ["oil", 0.28], ["silk", 0.26]], rare: ["dusk-wing", 0.14],
      foes: ["dusk", "mothkin"],
      says: [
        "The lanterns hit a chord. Your pockets hummed.",
        "A moth conducted with a twig. You obeyed.",
        "The choir asked for an encore. You walked it again in your head.",
      ],
    },
    {
      id: "mugyard", name: "Mug Yard", hint: "Pottery that wants to be useful immediately.",
      ms: 92000, level: 29, gold: [124, 176], xp: 74, art: "kiln", icon: "☕",
      loot: [["pot", 0.34], ["glaze", 0.28], ["cocoa", 0.16]], rare: ["ember", 0.16],
      foes: ["ember", "spring"],
      says: [
        "A mug introduced itself as lunch. Ash approved.",
        "The yard steamed like a kettle the size of a barn.",
        "You left a compliment in a bowl. It kept it warm.",
      ],
    },
    {
      id: "pearlstair", name: "Pearl Stair", hint: "The tide built steps and then rented them.",
      ms: 96000, level: 31, gold: [138, 196], xp: 82, art: "caves", icon: "⚪",
      loot: [["pearl-bead", 0.28], ["pearl-shell", 0.22], ["kelp", 0.3]], rare: ["pearl-shell", 0.16],
      foes: ["crab", "trout"],
      says: [
        "Each step was a little moon. You wiped your feet first.",
        "Pearl would have named every stair. You named three.",
        "The sea collected the rent in salt and a nod.",
      ],
    },
    {
      id: "wishhedge", name: "Wish Hedge", hint: "A hedge that keeps yeses in its pockets.",
      ms: 102000, level: 33, gold: [150, 214], xp: 88, art: "starwell", icon: "🌿",
      loot: [["wish", 0.18], ["starshard", 0.24], ["wildflower", 0.3]], rare: ["wish", 0.14],
      foes: ["star", "dusk"],
      says: [
        "The hedge offered a yes. You offered a please. Fair trade.",
        "A wish stuck to your sleeve like burr. You let it.",
        "Beyond the hedge the map was blank and friendly.",
      ],
    },
    {
      id: "quiltfold", name: "Quilt Fold", hint: "A meadow sewn into itself.",
      ms: 70000, level: 20, gold: [72, 104], xp: 46, art: "meadow", icon: "🧶",
      loot: [["wool", 0.34], ["thyme", 0.3], ["biscuit", 0.28]], rare: ["wool", 0.14],
      foes: ["sheep", "wool"],
      says: [
        "The grass had been tucked in. You tried not to wrinkle it.",
        "A fold hid a biscuit. The fold was proud.",
        "Fern would vote to nap here. The fold already had.",
      ],
    },
    {
      id: "echowell", name: "Echo Well", hint: "The well that answers in your own voice, kinder.",
      ms: 108000, level: 34, gold: [160, 228], xp: 94, art: "starwell", icon: "🔔",
      loot: [["wish", 0.2], ["wellwater", 0.28], ["page", 0.24]], rare: ["starshard", 0.16],
      foes: ["star", "ghost"],
      says: [
        "You said hello. The well said hello, then added please.",
        "An echo came back carrying a star it had found.",
        "The well remembered every kindle. It did not mention the scores.",
      ],
    },
  ];

  const PARTY = [
    { id: "hero", name: "You", role: "Wanderer", art: "hero", cost: 0, level: 1, hp: 30, atk: 6, def: 3, blurb: "Lantern staff, kind pockets.", bonus: () => ({ gold: 0, xp: 0, loot: 0, speed: 0, crit: 0, mend: 0, luck: 0, ward: 0 }) },
    { id: "pip", name: "Pip", role: "Fox scout", art: "pip", cost: 80, level: 2, hp: 16, atk: 5, def: 2, blurb: "Finds what the grass is hiding.", bonus: () => ({ gold: 0, xp: 0, loot: 0.18, speed: 0.04, crit: 0.03, mend: 0, luck: 0.06, ward: 0 }) },
    { id: "bramble", name: "Bramble", role: "Hedgehog knight", art: "bramble", cost: 180, level: 4, hp: 28, atk: 6, def: 5, blurb: "Spoon-sword. Protects the biscuits.", bonus: () => ({ gold: 0.2, xp: 0, loot: 0, speed: 0, crit: 0, mend: 0, luck: 0, ward: 0.08 }) },
    { id: "thimble", name: "Thimble", role: "Mouse rogue", art: "thimble", cost: 240, level: 5, hp: 14, atk: 8, def: 1, blurb: "A needle for a rapier. Crits, then curtsies.", bonus: () => ({ gold: 0.08, xp: 0, loot: 0.1, speed: 0.06, crit: 0.1, mend: 0, luck: 0.04, ward: 0 }) },
    { id: "lumen", name: "Lumen", role: "Moth-mage", art: "lumen", cost: 320, level: 6, hp: 18, atk: 8, def: 2, blurb: "Lights the rare corners.", bonus: () => ({ gold: 0.05, xp: 0.08, loot: 0.12, speed: 0, crit: 0.04, mend: 0, luck: 0.03, ward: 0 }) },
    { id: "pearl", name: "Pearl", role: "Otter healer", art: "pearl", cost: 420, level: 8, hp: 22, atk: 4, def: 3, blurb: "Tea for bruises. Salt for courage.", bonus: () => ({ gold: 0, xp: 0.06, loot: 0, speed: 0, crit: 0, mend: 0.14, luck: 0, ward: 0.03 }) },
    { id: "nettle", name: "Nettle", role: "Frog bard", art: "nettle", cost: 500, level: 9, hp: 20, atk: 4, def: 3, blurb: "Songs that make the trail shorter.", bonus: () => ({ gold: 0, xp: 0.25, loot: 0, speed: 0.08, crit: 0, mend: 0.08, luck: 0, ward: 0 }) },
    { id: "ash", name: "Ash", role: "Kiln cat", art: "ash", cost: 620, level: 10, hp: 24, atk: 7, def: 4, blurb: "Warm mug. Warmer opinions.", bonus: () => ({ gold: 0.08, xp: 0, loot: 0, speed: 0, crit: 0.03, mend: 0.04, luck: 0, ward: 0.02 }) },
    { id: "fern", name: "Fern", role: "Meadow ewe", art: "fern", cost: 700, level: 11, hp: 26, atk: 5, def: 5, blurb: "Thyme in the wool. Votes for sitting.", bonus: () => ({ gold: 0.1, xp: 0, loot: 0.04, speed: -0.02, crit: 0, mend: 0.03, luck: 0.02, ward: 0.05 }) },
    { id: "wick", name: "Wick", role: "Lantern mouse", art: "wick", cost: 480, level: 12, hp: 18, atk: 6, def: 3, blurb: "Keeps a spare evening in a bottle.", bonus: () => ({ gold: 0.06, xp: 0.04, loot: 0.06, speed: 0, crit: 0.05, mend: 0, luck: 0.05, ward: 0 }) },
  ];

  const GEAR = [
    { id: "beanie", slot: "hat", name: "Moss beanie", cost: 0, level: 1, gold: 0, xp: 0, loot: 0, speed: 0, atk: 0, start: true, blurb: "Already warm." },
    { id: "mushroom-cap", slot: "hat", name: "Glowcap hat", cost: 45, level: 3, gold: 0, xp: 0, loot: 0.06, speed: 0, atk: 0, luck: 0.03, blurb: "Slightly more finds." },
    { id: "circlet", slot: "hat", name: "Lantern circlet", cost: 220, level: 8, gold: 0, xp: 0.08, loot: 0, speed: 0, atk: 1, crit: 0.04, blurb: "Lessons stick." },
    { id: "knit", slot: "cloak", name: "Honey cloak", cost: 0, level: 1, gold: 0, xp: 0, loot: 0, speed: 0, atk: 0, start: true, blurb: "Home on your shoulders." },
    { id: "moss-cloak", slot: "cloak", name: "Moss travel cloak", cost: 90, level: 3, gold: 0.1, xp: 0, loot: 0, speed: 0, atk: 0, ward: 0.03, blurb: "Pockets for pennies." },
    { id: "starweave", slot: "cloak", name: "Starweave", cost: 360, level: 10, gold: 0.12, xp: 0.05, loot: 0, speed: 0, atk: 0, luck: 0.04, blurb: "Night likes you." },
    { id: "worn", slot: "boots", name: "Trail-worn boots", cost: 0, level: 1, gold: 0, xp: 0, loot: 0, speed: 0, atk: 0, start: true, blurb: "They know the path." },
    { id: "stout", slot: "boots", name: "Cob's stout boots", cost: 70, level: 2, gold: 0.06, xp: 0, loot: 0, speed: 0.08, atk: 0, ward: 0.02, blurb: "Shorter loops." },
    { id: "cloudstep", slot: "boots", name: "Cloudstep boots", cost: 280, level: 9, gold: 0, xp: 0, loot: 0, speed: 0.16, atk: 0, haste: 0.05, blurb: "The path hurries for you." },
    { id: "acorn", slot: "charm", name: "Lucky acorn", cost: 0, level: 1, gold: 0, xp: 0, loot: 0, speed: 0, atk: 0, start: true, blurb: "A small yes." },
    { id: "tea-tin", slot: "charm", name: "Tea tin", cost: 55, level: 3, gold: 0.04, xp: 0, loot: 0.05, speed: 0, atk: 0, mend: 0.04, blurb: "Smells like arriving." },
    { id: "moon-locket", slot: "charm", name: "Moon locket", cost: 400, level: 12, gold: 0.08, xp: 0.08, loot: 0.08, speed: 0, atk: 1, crit: 0.05, luck: 0.04, blurb: "The ridge remembers you." },
    { id: "harbor-charm", slot: "charm", name: "Harbor charm", cost: 0, level: 1, gold: 0.04, xp: 0, loot: 0.06, speed: 0, atk: 0, blurb: "Crafted from net and pearl." },
    { id: "ember-charm", slot: "charm", name: "Ember bead", cost: 0, level: 1, gold: 0.05, xp: 0, loot: 0, speed: 0, atk: 1, blurb: "Crafted kiln-warm." },
    { id: "staff", slot: "weapon", name: "Lantern staff", cost: 0, level: 1, gold: 0, xp: 0, loot: 0, speed: 0, atk: 2, start: true, blurb: "A light and a poke." },
    { id: "spoon-lance", slot: "weapon", name: "Spoon lance", cost: 90, level: 4, gold: 0, xp: 0, loot: 0, speed: 0, atk: 4, blurb: "Bramble approved." },
    { id: "grove-wand", slot: "weapon", name: "Grove wand", cost: 220, level: 8, gold: 0, xp: 0.04, loot: 0, speed: 0, atk: 6, pierce: 1, crit: 0.04, blurb: "Sparks that smell like mint." },
    { id: "star-crook", slot: "weapon", name: "Star crook", cost: 480, level: 14, gold: 0, xp: 0, loot: 0, speed: 0, atk: 9, pierce: 2, luck: 0.03, blurb: "The well taught it manners." },
  ];

  const RECIPES = [
    { id: "tea", name: "Trail tea", needs: { herb: 2 }, gold: 0.25, xp: 0, loops: 3, say: "Steam like a small blessing." },
    { id: "stew", name: "Hearth stew", needs: { apple: 1, mushroom: 1, herb: 1 }, gold: 0.4, xp: 0, loops: 2, say: "The house smells like coming home." },
    { id: "jam", name: "Lantern jam", needs: { honey: 1, apple: 1 }, gold: 0, xp: 0.3, loops: 3, say: "Sweet enough to remember the woods by." },
    { id: "salve", name: "Honey salve", needs: { honey: 1, wax: 1 }, gold: 0, xp: 0, loops: 0, say: "Warm on the bruise. Kind on the pride." },
    { id: "cocoa", name: "Cloud cocoa", needs: { "cloud-tuft": 1, honey: 1 }, gold: 0, xp: 0.12, loops: 3, say: "Steam that remembers the pasture." },
    { id: "broth", name: "Harbor broth", needs: { fish: 1, salt: 1, herb: 1 }, gold: 0.15, xp: 0, loops: 2, say: "Salt and kindness in a bowl." },
    { id: "frost-jam", name: "Frost jam", needs: { frostberry: 2, honey: 1 }, gold: 0, xp: 0.18, loops: 3, say: "Cold and kind on the tongue." },
    { id: "loaf", name: "Mill loaf", needs: { flour: 2, honey: 1 }, gold: 0.1, xp: 0, loops: 2, say: "The crust remembered the wheel." },
    { id: "oil", name: "Lantern oil", needs: { wax: 1, honey: 1 }, gold: 0, xp: 0, loops: 0, say: "The bottle kept a spare dusk." },
  ];

  const CRAFTS = [
    { id: "wax-wrap", name: "Wax wrap", needs: { wax: 2, herb: 1 }, item: "wax-wrap", n: 1, say: "Crumbs will have to wait." },
    { id: "loaf-c", name: "Spare loaf", needs: { flour: 2, herb: 1 }, item: "loaf", n: 1, say: "Bram would nod at the crumb." },
    { id: "net-charm", name: "Harbor charm", needs: { net: 1, "pearl-bead": 1 }, gear: "harbor-charm", say: "The satchel smells like arriving." },
    { id: "ember-bead", name: "Ember bead", needs: { ember: 1, glaze: 1 }, gear: "ember-charm", say: "A small night, pocket-sized." },
    { id: "kelp-salve", name: "Tide salve", needs: { kelp: 2, salt: 1 }, item: "salve", n: 1, say: "Salt and patience, mashed." },
    { id: "oil-c", name: "Spare oil", needs: { wax: 1, ember: 1 }, item: "oil", n: 1, say: "Kiln-dusk, bottled." },
  ];

  const FAVORITES = {
    pip: ["herb", "biscuit", "wildflower"],
    bramble: ["apple", "stew", "loaf"],
    thimble: ["button", "ribbon", "silk"],
    lumen: ["glowbug", "silk", "moonbloom"],
    pearl: ["tea", "fish", "pearl-bead"],
    nettle: ["lullaby", "jam", "honey"],
    ash: ["ember", "cocoa", "pot"],
    fern: ["thyme", "wool", "apple"],
    wick: ["oil", "glowbug", "honey"],
  };

  const MUSEUM = [
    { id: "relic", name: "Moss relic", gold: 0.03, xp: 0.03 },
    { id: "wish", name: "Well wish", gold: 0.04, xp: 0 },
    { id: "starshard", name: "Starshard", gold: 0, xp: 0.04 },
    { id: "pearl-shell", name: "Pearl shell", loot: 0.04, gold: 0 },
    { id: "moonbloom", name: "Moonbloom", gold: 0.03, loot: 0 },
    { id: "ember", name: "Kind ember", gold: 0.03, xp: 0 },
    { id: "dusk-wing", name: "Dusk wing", luck: 0.03, haste: 0.03 },
  ];

  const RANKS = [
    { name: "Newcomer", need: 0 },
    { name: "Neighbor", need: 8 },
    { name: "Regular", need: 20 },
    { name: "Steward", need: 40 },
    { name: "Valley-kin", need: 70 },
    { name: "Hearth-name", need: 110 },
    { name: "Lantern-kin", need: 160 },
  ];

  const TALKS = {
    pip: ["I named a beetle. Then I lost the beetle. The name is still good.", "The grass told me a secret. It was about more grass."],
    bramble: ["I polished the spoon. It is ready for diplomacy.", "If you sit, I will sit slightly in front."],
    thimble: ["I mended a hole you did not know you had.", "Buttons have families. I am taking a census."],
    lumen: ["The dark is just a room with the lantern in the other hand.", "I found a moth who was me, almost. We nodded."],
    pearl: ["Tea first. Then the bruise can speak.", "The sea sends its love. It is salty."],
    nettle: ["I wrote a song about crumbs. It has three verses and no ending.", "If we walk slower, the tune catches up."],
    ash: ["The mug is for sharing. The opinions are not.", "Kiln-warm is the correct temperature for most problems."],
    fern: ["I vote we sit. I have counted the votes. It was one."],
    wick: ["I brought a spare evening. It fits in the satchel.", "If the lantern coughs, I know which leaf to ask."],
    hero: ["The lantern is still lit. That is the whole plan."],
  };

  const NPCS = [
    {
      id: "maren", name: "Maren", role: "keeps the inn kettle honest", art: "maren",
      chat: ["Sit. The stew has opinions tonight.", "A valley is only as kind as its leftovers.", "If you vanish up the ridge, leave a mug. I'll keep it warm."],
      quests: [
        { kind: "item", item: "biscuit", n: 3, pay: 28, say: "The slimes keep leaving crumbs. Three biscuits?" },
        { kind: "item", item: "honey", n: 2, pay: 55, say: "Honey for the evening regulars." },
        { kind: "item", item: "stew", n: 1, pay: 80, say: "Something that tastes like a hearth, if the kettle allows." },
        { kind: "item", item: "salt", n: 2, pay: 40, say: "Harbor salt. The stew has been bland on purpose." },
      ],
    },
    {
      id: "quill", name: "Quill", role: "draws maps that refuse to stay still", art: "quill",
      chat: ["I inked the brook twice. It moved.", "Bring me a walk and I will make it a line.", "The ruins are polite if you greet the moss first."],
      quests: [
        { kind: "walk", trail: "meadow", n: 5, pay: 30, say: "Walk the meadow five times. I need the bends." },
        { kind: "walk", trail: "woods", n: 3, pay: 70, say: "Three loops of the lantern woods. Count the bridges." },
        { kind: "item", item: "relic", n: 1, pay: 120, say: "A moss relic, if the ghosts were in a sharing mood." },
        { kind: "walk", trail: "harbor", n: 3, pay: 80, say: "The harbor keeps rearranging. Three loops, please." },
        { kind: "walk", trail: "frost", n: 3, pay: 90, say: "Three loops of Frost Hollow. I need the white bends." },
        { kind: "item", item: "wish", n: 1, pay: 200, say: "A well wish. I will not ink it. I will just… hold it." },
      ],
    },
    {
      id: "cob", name: "Cob", role: "mends what the trail unstitches", art: "cob",
      chat: ["Boots tell on you. Yours have been dancing.", "I keep bees in the sleeves. Don't ask.", "A button is a tiny reunion if you know its coat."],
      quests: [
        { kind: "item", item: "button", n: 3, pay: 32, say: "Three lost buttons. I am reuniting a coat." },
        { kind: "item", item: "silk", n: 2, pay: 70, say: "Two lengths of moth silk for a winter lining." },
        { kind: "item", item: "wool", n: 2, pay: 90, say: "Cloud wool, if the pasture was generous." },
        { kind: "item", item: "moonbloom", n: 1, pay: 140, say: "A moonbloom, for dye that remembers dusk." },
      ],
    },
    {
      id: "wren", name: "Wren", role: "walks the letters until they behave", art: "wren",
      chat: [
        "If it has a stamp, it has a home. I only help it remember.",
        "The harbor wind steals envelopes. I steal them back.",
        "A letter is a visit that learned patience.",
      ],
      quests: [
        { kind: "item", item: "ribbon", n: 2, pay: 36, say: "Two brook ribbons. I tie the stacks so they don't gossip." },
        { kind: "walk", trail: "harbor", n: 4, pay: 70, say: "Four harbor loops. The post crate there is a known liar." },
        { kind: "item", item: "lullaby", n: 1, pay: 110, say: "A bottled lullaby. Some letters need to sleep first." },
        { kind: "item", item: "wish", n: 1, pay: 180, say: "A well wish, if you can spare one. I will not post it. I will keep it." },
      ],
    },
    {
      id: "bram", name: "Bram", role: "keeps the wheel honest and the flour polite", art: "bram",
      chat: [
        "The wheel has opinions. Tonight it wants rain.",
        "Flour on the beard is a professional credential.",
        "If the pond freezes I will skate it, slowly, for science.",
      ],
      quests: [
        { kind: "item", item: "honey", n: 2, pay: 40, say: "Two honeys. The loaves have been shy." },
        { kind: "walk", trail: "caves", n: 3, pay: 75, say: "Three tide-cave loops. The wheel likes a salt story." },
        { kind: "item", item: "flour", n: 4, pay: 50, say: "Bring my own flour back. I lent it to the wind." },
        { kind: "item", item: "loaf", n: 1, pay: 60, say: "A loaf that isn't mine. I want to be jealous of it." },
      ],
    },
    {
      id: "iris", name: "Iris", role: "keeps the books that refuse to stay shut", art: "iris",
      chat: [
        "This one keeps rewriting the ending. I let it.",
        "If you whisper, the shelves lean in.",
        "A library is a valley that learned to sit still.",
      ],
      quests: [
        { kind: "item", item: "page", n: 2, pay: 40, say: "Two loose pages. They escaped again." },
        { kind: "walk", trail: "woods", n: 3, pay: 70, say: "Three lantern-wood loops. I am mapping footnotes." },
        { kind: "item", item: "lullaby", n: 1, pay: 110, say: "A bottled lullaby. Some books only sleep to music." },
        { kind: "walk", trail: "ridge", n: 2, pay: 90, say: "Two high-meadow loops. I need the wind's handwriting." },
        { kind: "walk", trail: "dusk", n: 2, pay: 100, say: "Two dusk-thicket loops. I need the moths' footnotes." },
      ],
    },
  ];

  const ART = {
    hero: "assets/hero.jpg",
    "hero-knight": "assets/hero-knight.jpg",
    "hero-mage": "assets/hero-mage.jpg",
    "hero-bard": "assets/hero-bard.jpg",
    "hero-forager": "assets/hero-forager.jpg",
    "hero-cook": "assets/hero-cook.jpg",
    "hero-ranger": "assets/hero-ranger.jpg",
    "hero-shepherd": "assets/hero-shepherd.jpg",
    pip: "assets/party-pip.jpg",
    bramble: "assets/party-bramble.jpg",
    lumen: "assets/party-lumen.jpg",
    nettle: "assets/party-nettle.jpg",
    thimble: "assets/party-thimble.jpg",
    pearl: "assets/party-pearl.jpg",
    ash: "assets/party-ash.jpg",
    fern: "assets/party-fern.jpg",
    wick: "assets/party-wick.jpg",
    mallow: "assets/pet-mallow.jpg",
    dumpling: "assets/pet-dumpling.jpg",
    maren: "assets/npc-maren.jpg",
    quill: "assets/npc-quill.jpg",
    cob: "assets/npc-cob.jpg",
    wren: "assets/npc-wren.jpg",
    bram: "assets/npc-bram.jpg",
    iris: "assets/npc-iris.jpg",
    slime: "assets/slime.jpg",
    trout: "assets/foe-trout.jpg",
    crab: "assets/foe-crab.jpg",
    bee: "assets/foe-bee.jpg",
    wool: "assets/foe-wool.jpg",
    ghost: "assets/foe-ghost.jpg",
    ember: "assets/foe-ember.jpg",
    star: "assets/foe-star.jpg",
    spring: "assets/foe-spring.jpg",
    dusk: "assets/foe-dusk.jpg",
    "icon-biscuit": "assets/icon-biscuit.jpg",
    "icon-honey": "assets/icon-honey.jpg",
    "icon-relic": "assets/icon-relic.jpg",
    "icon-apple": "assets/icon-apple.jpg",
    "icon-tea": "assets/icon-tea.jpg",
    "icon-starshard": "assets/icon-starshard.jpg",
    "icon-wool": "assets/icon-wool.jpg",
    "icon-fish": "assets/icon-fish.jpg",
    "icon-coin": "assets/icon-coin.jpg",
    "icon-mushroom": "assets/icon-mushroom.jpg",
    "icon-stew": "assets/icon-stew.jpg",
    "icon-herb": "assets/icon-herb.jpg",
    lantern: "assets/decor-lantern.jpg",
    hearts: "assets/fx-hearts.jpg",
    spark: "assets/fx-spark.jpg",
    butterfly: "assets/fx-butterfly.jpg",
    "icon-wish": "assets/icon-wish.jpg",
    "icon-glowbug": "assets/icon-glowbug.jpg",
    levelup: "assets/fx-levelup.jpg",
    moth: "assets/fx-moth.jpg",
    "icon-oil": "assets/icon-oil.jpg",
  };

  let state;
  let audio;
  let musicMaster;
  let musicTimer;
  let musicStep = 0;
  let toastTimer;
  let sayTimer;
  let lastUi = 0;

  const $ = (id) => document.getElementById(id);

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function rand(min, max) { return min + Math.random() * (max - min); }

  function pennies(n) {
    return Math.round((Number(n) || 0) * 100) / 100;
  }

  function fmt(n) {
    n = pennies(n);
    const sign = n < 0 ? "-" : "";
    n = Math.abs(n);
    const cents = Math.round(n * 100);
    if (cents < 100) return sign + cents + "¢";
    if (n >= 10000) return sign + (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    if (cents % 100 === 0) return sign + String(cents / 100);
    return sign + n.toFixed(2);
  }

  function lootValue(ids) {
    if (!ids) return 0;
    const list = Array.isArray(ids) ? ids : [ids];
    return list.reduce((sum, id) => {
      const key = id && typeof id === "object" ? (id.id || id.item) : id;
      return sum + ((ITEMS[key] && ITEMS[key].sell) || 0);
    }, 0);
  }

  function profitRate() {
    const extra = Math.max(0, bonuses().gold - 1);
    const lean = Math.min(1, extra / 1.8);
    const lo = 0.01 + lean * 0.015;
    const hi = 0.03 + lean * 0.02;
    return Math.min(0.05, Math.max(0.01, lo + Math.random() * Math.max(0.005, hi - lo)));
  }

  function pennyProfit(base) {
    const v = Number(base) || 0;
    if (v <= 0) return 0;
    return Math.max(0.01, pennies(v * profitRate()));
  }

  function profitRange(base) {
    const v = Number(base) || 0;
    if (v <= 0) return fmt(0);
    return fmt(Math.max(0.01, pennies(v * 0.01))) + "–" + fmt(Math.max(0.01, pennies(v * 0.05)));
  }

  function stallPay(id, n) {
    return pennyProfit(((ITEMS[id] && ITEMS[id].sell) || 0) * (n || 1));
  }

  function stallRange(id, n) {
    return profitRange(((ITEMS[id] && ITEMS[id].sell) || 0) * (n || 1));
  }

  function xpNeeded(level) {
    const lv = Math.max(1, level);
    const late = lv > 18 ? 1 + (lv - 18) * 0.035 : 1;
    return Math.floor(16 * Math.pow(lv, 1.55) * late);
  }

  function softCap(n, k) {
    n = Math.max(0, Number(n) || 0);
    if (k <= 0) return n;
    return n / (1 + n / k);
  }

  function fmtPct(n) {
    const v = (Number(n) || 0) * 100;
    const shown = Math.abs(v) >= 10 ? v.toFixed(0) : v.toFixed(1);
    return (v >= 0 ? "+" : "") + shown + "%";
  }

  function blankParagon() {
    return {
      kindles: 0,
      points: 0,
      tree: {},
      lifetimeWalks: 0,
      lifetimeGold: 0,
      lifetimeXp: 0,
      bestLevel: 1,
      bestWalks: 0,
      lastScore: 0,
      lastGain: 0,
      mastered: {},
      codex: {},
      classRank: {},
      infused: {},
    };
  }

  function para() {
    if (!state.paragon) state.paragon = blankParagon();
    if (!state.paragon.tree) state.paragon.tree = {};
    if (!state.paragon.mastered) state.paragon.mastered = {};
    if (!state.paragon.codex) state.paragon.codex = {};
    if (!state.paragon.classRank) state.paragon.classRank = {};
    if (!state.paragon.infused) state.paragon.infused = {};
    return state.paragon;
  }

  function temperOf(id) {
    return (state.temper && state.temper[id]) || 0;
  }

  function temperCost(rank) {
    return {
      oil: 1 + Math.floor(rank * 0.85),
      spark: rank >= 2 ? 1 : 0,
    };
  }

  function wornTemper() {
    const t = { atk: 0, loot: 0, gold: 0, crit: 0, ward: 0, pierce: 0 };
    Object.keys(state.gear || {}).forEach((slot) => {
      const r = temperOf(state.gear[slot]);
      t.atk += Math.floor(r / 2);
      t.loot += r * 0.012;
      t.gold += r * 0.01;
      t.crit += r * 0.007;
      t.ward += r * 0.006;
      if (r >= 4) t.pierce += 1;
    });
    return t;
  }

  function echoOf(id) {
    return (para().mastered && para().mastered[id]) || 0;
  }

  function trailMods(trail) {
    const walks = (state.walks && state.walks[trail.id]) || 0;
    const aff = softCap(walks * 0.01, 0.28);
    const echo = softCap(echoOf(trail.id) * 0.055, 0.36);
    const study = (para().codex && para().codex[trail.id]) ? 0.08 : 0;
    const focus = state.focus === trail.id ? 0.1 : 0;
    const streak = (state.streak && state.streak.id === trail.id) ? softCap((state.streak.n || 0) * 0.015, 0.12) : 0;
    const bless = dayBlessing();
    const onBless = bless.trails.indexOf(trail.id) >= 0;
    const loot = aff + echo + study + streak + (onBless && bless.stat === "loot" ? bless.amt : 0);
    const xp = aff + echo + study + focus + streak * 0.5 + (onBless && bless.stat === "xp" ? bless.amt : 0);
    const gold = aff * 0.55 + echo * 0.7 + (onBless && bless.stat === "gold" ? bless.amt : 0);
    return { loot, xp, gold, bless: onBless ? bless : null };
  }

  function memberCost(m) {
    if (m.id === "wick" && para().kindles) return Math.max(80, Math.floor(m.cost * 0.45));
    return m.cost;
  }

  function memberNeed(m) {
    if (m.id === "wick" && para().kindles) return Math.max(8, m.level - 4);
    return m.level;
  }

  function currentAspect() {
    return ASPECTS.find((a) => a.id === state.aspect) || null;
  }

  function currentStance() {
    return STANCES.find((s) => s.id === (state.stance || "kind")) || STANCES[0];
  }

  function formOf(id) {
    if (id === "hero") return "front";
    return (state.form && state.form[id]) || (id === "bramble" ? "front" : "back");
  }

  function classRankOf(id) {
    const key = id || state.classId;
    return (para().classRank && para().classRank[key]) || 0;
  }

  function isInfused(id) {
    return !!(para().infused && para().infused[id]);
  }

  function dayBlessing() {
    const pool = allTrails().filter((t) => t.level <= Math.max(2, (state.level || 1) + 3));
    let seed = ((state.day || 1) * 31 + 11) % 997;
    const a = pool[seed % pool.length];
    seed = (seed * 17 + 5) % 997;
    const b = pool[seed % pool.length];
    const kinds = [
      { stat: "loot", name: "Soft pockets today" },
      { stat: "xp", name: "The path is teaching" },
      { stat: "gold", name: "Pennies lean today" },
    ];
    const k = kinds[(state.day || 1) % 3];
    const trails = a.id === b.id ? [a.id] : [a.id, b.id];
    return { trails, stat: k.stat, amt: 0.14, name: k.name };
  }

  function partyHas(id) {
    if (id === "cook") return state.classId === "cook";
    return (state.party || []).includes(id);
  }

  function nodeRank(id) {
    return (para().tree && para().tree[id]) || 0;
  }

  function nodeCost(rank) {
    return 1 + Math.floor(rank * 1.25);
  }

  function paragonSpent() {
    return PARAGON_NODES.reduce((s, n) => {
      const r = nodeRank(n.id);
      let cost = 0;
      for (let i = 0; i < r; i++) cost += nodeCost(i);
      return s + cost;
    }, 0);
  }

  function paragonBonus(stat) {
    return PARAGON_NODES.reduce((s, n) => s + (n.stat === stat ? nodeRank(n.id) * n.per : 0), 0);
  }

  function kindleScore() {
    const walks = totalWalks();
    const stories = Object.keys(state.story || {}).length;
    const hearts = Object.values(state.hearts || {}).reduce((a, b) => a + b, 0);
    const museum = Object.keys(state.museum || {}).length;
    const trailTier = allTrails().reduce((m, t) => ((state.walks && state.walks[t.id]) ? Math.max(m, t.level) : m), 0);
    const goldLife = para().lifetimeGold || 0;
    const score =
      Math.pow(Math.max(1, state.level), 1.42) * 5.5
      + walks * 1.15
      + stories * 8
      + hearts * 2.4
      + museum * 5
      + trailTier * 6
      + Math.log10(1 + goldLife) * 14
      + ((state.walks && state.walks.starwell) ? 28 : 0)
      + Math.max(0, (state.party || []).length - 1) * 6
      + (state.talents || []).length * 4
      + Object.keys(state.cottage || {}).length * 5
      + Object.values(state.temper || {}).reduce((a, n) => a + n, 0) * 3
      + Object.values(state.bonds || {}).reduce((a, n) => a + Math.floor(n / 12), 0) * 5
      + Object.keys(para().mastered || {}).length * 4
      + Object.keys(para().codex || {}).length * 6
      + ((state.walks && state.walks.dusk) ? 18 : 0)
      + Object.values(para().classRank || {}).reduce((a, n) => a + n, 0) * 6
      + Object.keys(para().infused || {}).length * 5
      + (state.aspect ? 8 : 0);
    return Math.floor(score);
  }

  function kindlePointsFrom(score) {
    return Math.max(1, Math.floor(Math.pow(Math.max(1, score) / 26, 0.74)));
  }

  function canKindle() {
    return state.level >= 12 || totalWalks() >= 50 || !!(state.walks && state.walks.starwell);
  }

  function kindleWhyNot() {
    if (canKindle()) return "";
    return "The lantern is only warm. Reach level 12, walk fifty loops, or visit the Starwell.";
  }

  function spendParagonNode(id) {
    const node = PARAGON_NODES.find((n) => n.id === id);
    if (!node) return false;
    const rank = nodeRank(id);
    if (rank >= PARA_MAX) return false;
    const cost = nodeCost(rank);
    const p = para();
    if ((p.points || 0) < cost) return false;
    p.points -= cost;
    p.tree[id] = rank + 1;
    return true;
  }

  function doKindle() {
    if (!canKindle()) {
      toast(kindleWhyNot());
      return false;
    }
    const score = kindleScore();
    const gain = kindlePointsFrom(score);
    const kept = para();
    kept.kindles = (kept.kindles || 0) + 1;
    kept.points = (kept.points || 0) + gain;
    kept.lastScore = score;
    kept.lastGain = gain;
    if (state.level > (kept.bestLevel || 0)) kept.bestLevel = state.level;
    if (totalWalks() > (kept.bestWalks || 0)) kept.bestWalks = totalWalks();
    kept.mastered = kept.mastered || {};
    Object.keys(state.walks || {}).forEach((id) => {
      if ((state.walks[id] || 0) >= 6) kept.mastered[id] = (kept.mastered[id] || 0) + 1;
    });
    kept.codex = kept.codex || {};
    const memories = (state.memories || []).slice();
    memories.unshift({
      title: "Lantern kindled",
      text: "Heat " + kept.kindles + ". The valley forgot your pockets and kept the math. +" + gain + " paragon.",
      day: state.day,
      t: Date.now(),
    });
    const next = fresh(state.name);
    next.classId = state.classId || "wanderer";
    next.pickedClass = true;
    next.sawIntro = true;
    next.mute = !!state.mute;
    next.musicOn = state.musicOn !== false;
    next.musicId = state.musicId || "kettle";
    next.musicVol = state.musicVol == null ? 0.38 : state.musicVol;
    next.sfxVol = state.sfxVol == null ? 0.55 : state.sfxVol;
    next.reduceMotion = !!state.reduceMotion;
    next.musicFollow = state.musicFollow || "pick";
    next.fightSpeed = state.fightSpeed || "cozy";
    next.autoWatch = state.autoWatch !== false;
    next.showDmg = state.showDmg !== false;
    next.showNames = !!state.showNames;
    next.bigType = !!state.bigType;
    next.confirmKindle = state.confirmKindle !== false;
    next.musicShuffle = !!state.musicShuffle;
    next.musicBells = state.musicBells !== false;
    next.musicPad = state.musicPad !== false;
    next.paragon = kept;
    next.memories = memories.slice(0, 20);
    next.autosell = state.autosell || {};
    next.gold = pennies(0.24 + Math.min(0.4, kept.kindles * 0.03));
    next.journal = [{ t: Date.now(), text: "You kindled the lantern. The path began again, warmer by " + gain + "." }];
    next.lastSay = "The valley is small. The lantern is not.";
    state = next;
    ensureCombat();
    fullHeal();
    checkStory(true);
    save();
    note("Kindled. The valley started over, and remembered the heat.");
    toast("Kindled +" + gain + ". The lantern kept " + kept.points + " unspent.");
    return true;
  }

  function heroArt() {
    const cls = CLASSES[state.classId] || CLASSES.wanderer;
    return cls.art;
  }

  function sprite(id) {
    const key = id === "hero" ? heroArt() : id;
    const src = ART[key];
    if (!src) return `<span>${esc(id)}</span>`;
    return `<img src="${src}" alt="" />`;
  }

  function itemName(id) { return (ITEMS[id] && ITEMS[id].name) || id; }
  function itemIcon(id) { return (ITEMS[id] && ITEMS[id].icon) || "•"; }

  function itemThumb(id) {
    const src = ART["icon-" + id];
    if (src) return `<img src="${src}" alt="" />`;
    return itemIcon(id);
  }
  function trailDiff(t) {
    if (!t) return 1;
    if (t.diff) return t.diff;
    if (t.far) return Math.min(5, 3 + Math.floor((t.tier || 1) / 4));
    if (t.level <= 4) return 1;
    if (t.level <= 9) return 2;
    if (t.level <= 16) return 3;
    if (t.level <= 24) return 4;
    return 5;
  }

  function trailDiffName(n) {
    return ["", "gentle", "kind", "firm", "steep", "far"][n] || "far";
  }

  function toRoman(n) {
    const map = [[100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
    let s = "";
    map.forEach(([v, r]) => {
      while (n >= v) { s += r; n -= v; }
    });
    return s || "I";
  }

  function makeFarTrail(tier) {
    const arts = ["meadow", "brook", "woods", "dusk", "ruins", "moon", "harbor", "kiln", "starwell", "frost", "cloud", "ridge", "springs", "caves", "orchard", "hollow"];
    const foeSets = [
      ["slime", "sheep"], ["trout", "dusk"], ["mothkin", "ghost"], ["star", "ember"],
      ["wool", "crab"], ["spring", "dusk"], ["ghost", "star"], ["ember", "mothkin"],
    ];
    const lootSets = [
      [["herb", 0.4], ["oil", 0.22], ["starshard", 0.16]],
      [["silk", 0.3], ["relic", 0.2], ["dusk-wing", 0.14]],
      [["wish", 0.14], ["ember", 0.22], ["page", 0.28]],
      [["moonbloom", 0.16], ["wellwater", 0.22], ["honey", 0.26]],
    ];
    const rareSets = [["wish", 0.12], ["starshard", 0.14], ["dusk-wing", 0.13], ["relic", 0.14]];
    const art = arts[(tier - 1) % arts.length];
    const baseLv = TRAILS[TRAILS.length - 1].level;
    const lv = baseLv + tier * 2;
    const goldLo = Math.round(150 + tier * 22);
    const goldHi = Math.round(220 + tier * 30);
    return {
      id: "far-" + tier,
      name: "Farther Path " + toRoman(tier),
      hint: "The map ended. The lantern did not.",
      ms: Math.min(160000, 90000 + tier * 3500),
      level: lv,
      gold: [goldLo, goldHi],
      xp: Math.round(88 + tier * 10),
      art,
      icon: "∞",
      loot: lootSets[(tier - 1) % lootSets.length],
      rare: rareSets[(tier - 1) % rareSets.length],
      foes: foeSets[(tier - 1) % foeSets.length],
      says: [
        "Farther still. The path introduced itself by a new name and the same kindness.",
        "You walked past the last ink. The grass kept the minutes.",
        "A keeper waited with a bigger crown and a smaller bow.",
      ],
      far: true,
      tier,
      diff: Math.min(5, 3 + Math.floor(tier / 4)),
    };
  }

  function allTrails() {
    const lv = (typeof state !== "undefined" && state && state.level) || 1;
    const last = TRAILS[TRAILS.length - 1];
    const until = Math.max(last.level + 2, lv + 8);
    const extra = [];
    let tier = 1;
    const namedLast = TRAILS[TRAILS.length - 1].level;
    while (namedLast + tier * 2 <= until && tier <= 80) {
      extra.push(makeFarTrail(tier));
      tier += 1;
    }
    if (extra.length < 2) {
      extra.push(makeFarTrail(1));
      extra.push(makeFarTrail(2));
    }
    return TRAILS.concat(extra);
  }

  function trailById(id) { return allTrails().find((t) => t.id === id) || TRAILS[0]; }
  function memberById(id) { return PARTY.find((p) => p.id === id); }
  function gearById(id) { return GEAR.find((g) => g.id === id); }
  function classBy() { return CLASSES[state.classId] || CLASSES.wanderer; }

  function seasonId() {
    return SEASONS[Math.floor((Math.max(1, state.day) - 1) / 8) % 4];
  }

  function todId() {
    const t = (Date.now() - (state.dayAt || Date.now())) / DAY_MS;
    if (t < 0.22) return "morning";
    if (t < 0.5) return "noon";
    if (t < 0.78) return "dusk";
    return "night";
  }

  function talentBy(id) { return TALENTS.find((t) => t.id === id); }

  function talentSum(key) {
    return (state.talents || []).reduce((n, id) => n + ((talentBy(id) && talentBy(id)[key]) || 0), 0);
  }

  function talentsDue() {
    const cap = Math.min(TALENTS.length, Math.floor(state.level / 3));
    return Math.max(0, cap - (state.talents || []).length);
  }

  function unreadMail() {
    return (state.mail || []).filter((m) => !m.read);
  }

  function totalWalks() {
    return Object.values(state.walks || {}).reduce((a, b) => a + b, 0);
  }

  function isFestival() {
    return state.day > 1 && ((state.day - 1) % 8 === 0);
  }

  function millUnlocked() {
    return state.level >= 4 || totalWalks() >= 8 || (state.hearts && state.hearts.bram > 0);
  }

  function libraryUnlocked() {
    return state.level >= 6 || totalWalks() >= 15 || (state.hearts && state.hearts.iris > 0);
  }

  function rankScore() {
    const hearts = Object.values(state.hearts || {}).reduce((a, b) => a + b, 0);
    return hearts + Math.floor(totalWalks() / 5) + Object.keys(state.museum || {}).length * 2;
  }

  function villageRank() {
    const score = rankScore();
    let i = 0;
    RANKS.forEach((r, idx) => { if (score >= r.need) i = idx; });
    return { i, name: RANKS[i].name, score };
  }

  function pondReady() {
    return (state.walks && (state.walks.brook || 0) >= 3) || millUnlocked();
  }

  function tickPond() {
    if (!pondReady()) return;
    const gap = 42000;
    const now = Date.now();
    if (!state.pondAt) state.pondAt = now;
    while (now - state.pondAt >= gap && state.pondFish < 6) {
      state.pondAt += gap;
      state.pondFish += 1;
    }
    if (state.pondFish >= 6) state.pondAt = now;
  }

  function collectPond() {
    tickPond();
    const n = state.pondFish || 0;
    if (!n) {
      toast("The line is thinking.");
      return;
    }
    addPack("fish", n);
    if (Math.random() < 0.25) addPack("kelp", 1);
    state.pondFish = 0;
    state.pondAt = Date.now();
    state.pondCollected = true;
    bumpErrand("pond", 1);
    toast("The pond offered " + n + " kind fish.");
    checkStory(false);
    renderPond();
    renderPack();
    save();
  }

  function hiveReady() {
    return (state.walks && (state.walks.hollow || 0) >= 2) || !!(state.cottage && state.cottage.hivebox);
  }

  function tickHive() {
    if (!hiveReady()) return;
    const gap = (state.cottage && state.cottage.hivebox) ? 28000 : 48000;
    const now = Date.now();
    if (!state.hiveAt) state.hiveAt = now;
    let gained = 0;
    while (now - state.hiveAt >= gap && state.hiveHoney < 8) {
      state.hiveAt += gap;
      state.hiveHoney += 1;
      gained += 1;
    }
    if (state.hiveHoney >= 8) state.hiveAt = now;
    return gained;
  }

  function collectHive() {
    tickHive();
    const n = state.hiveHoney || 0;
    if (!n) {
      toast("The hive is thinking.");
      return;
    }
    addPack("honey", n);
    state.hiveHoney = 0;
    state.hiveAt = Date.now();
    state.hiveCollected = true;
    bumpErrand("hive", 1);
    toast("The hive offered " + n + " honey.");
    checkStory(false);
    renderHive();
    renderPack();
    save();
  }

  function seedErrands() {
    if (state.errandDay === state.day && state.errands && state.errands.length) return;
    const pool = ERRANDS.slice();
    const picked = [];
    let seed = state.day * 31 + 7;
    for (let i = 0; i < 2 && pool.length; i++) {
      seed = (seed * 17 + 11) % 997;
      const idx = seed % pool.length;
      const base = pool.splice(idx, 1)[0];
      picked.push({ id: base.id, kind: base.kind, n: base.n, text: base.text, gold: base.gold, xp: base.xp, progress: 0, done: false });
    }
    state.errands = picked;
    state.errandDay = state.day;
  }

  function bumpErrand(kind, n) {
    seedErrands();
    (state.errands || []).forEach((e) => {
      if (e.done || e.kind !== kind) return;
      e.progress = Math.min(e.n, e.progress + (n || 1));
      if (e.progress >= e.n) {
        e.done = true;
        state.errandsDone = (state.errandsDone || 0) + 1;
        addGold(pennyProfit(e.gold));
        if (e.xp) addXp(e.xp);
        toast("Board done: " + e.text);
      }
    });
    if ($("errands")) renderErrands();
  }

  function autoSellFound(found) {
    if (!found || !found.length || !state.autosell) return;
    found.forEach((id) => {
      if (!state.autosell[id] || !ITEMS[id] || ITEMS[id].heal) return;
      if (!takePack(id, 1)) return;
      creditGold(stallPay(id, 1));
    });
  }

  function bondOf(id) {
    return (state.bonds && state.bonds[id]) || 0;
  }

  function checkStory(silent) {
    STORY.forEach((ch) => {
      if (state.story[ch.id] || !ch.test(state)) return;
      state.story[ch.id] = true;
      if (ch.gold) {
        const pay = pennyProfit(ch.gold);
        if (silent) creditGold(pay);
        else addGold(pay);
      }
      if (ch.item) addPack(ch.item, ch.n || 1);
      note(ch.title + ". " + ch.text);
      if (!state.memories) state.memories = [];
      state.memories.unshift({ title: ch.title, text: ch.text, day: state.day, t: Date.now() });
      state.memories = state.memories.slice(0, 20);
      if (!silent) toast(ch.title + ".");
    });
  }

  function rollForage() {
    if (state.forageDay >= state.day && state.forage && state.forage.length) return;
    state.forageDay = state.day;
    const pool = isFestival()
      ? ["wildflower", "biscuit", "honey", "frostberry"]
      : ["herb", "wildflower", "biscuit", "moss", "mushroom"];
    const n = 2 + (Math.random() < 0.4 ? 1 : 0) + (state.classId === "ranger" ? 1 : 0);
    state.forage = [];
    for (let i = 0; i < n; i++) {
      state.forage.push({
        id: "f-" + state.day + "-" + i,
        item: pick(pool),
        x: 12 + Math.random() * 70,
        y: 26 + Math.random() * 22,
        taken: false,
      });
    }
  }

  function packCount(id) { return state.pack[id] || 0; }
  function addPack(id, n) { state.pack[id] = packCount(id) + n; }
  function takePack(id, n) {
    if (packCount(id) < n) return false;
    state.pack[id] -= n;
    if (state.pack[id] <= 0) delete state.pack[id];
    return true;
  }

  function memberName(id) {
    if (id === "hero") return state.name;
    const m = memberById(id);
    return m ? m.name : id;
  }

  function memberArt(id) {
    if (id === "hero") return heroArt();
    const m = memberById(id);
    return m ? m.art : id;
  }

  function combatStats(id) {
    const lv = state.level;
    const s = sheet();
    const gritHp = Math.round(s.grit * 14);
    const mightAtk = Math.round(s.might * 5);
    const wardDef = Math.round(s.ward * 4);
    let extraHp = talentSum("hp") + (state.cottage && state.cottage.quilt ? 4 : 0) + gritHp;
    if (id === "hero") {
      const c = classBy();
      return {
        hp: c.hp + (lv - 1) * 3 + extraHp,
        atk: c.atk + Math.floor((lv - 1) / 2) + weaponAtk() + talentSum("atk") + mightAtk + wornTemper().atk,
        def: c.def + Math.floor((lv - 1) / 3) + wardDef,
        pierce: s.pierce + wornTemper().pierce,
      };
    }
    const m = memberById(id) || { hp: 16, atk: 4, def: 2 };
    const front = formOf(id) === "front";
    return {
      hp: m.hp + (lv - 1) * 2 + extraHp + (front ? 2 : 0),
      atk: m.atk + Math.floor((lv - 1) / 2) + Math.floor(mightAtk * 0.6) + (front ? 2 : -1),
      def: m.def + Math.floor((lv - 1) / 4) + Math.floor(wardDef * 0.6) + (front ? 1 : 0),
      pierce: Math.floor(s.pierce * 0.5),
      form: front ? "front" : "back",
    };
  }

  function weaponAtk() {
    const g = gearById(state.gear.weapon);
    return (g && g.atk) || 0;
  }

  function maxHp(id) { return combatStats(id).hp; }

  function curHp(id) {
    const n = state.hp[id];
    if (n == null) return maxHp(id);
    return Math.max(0, Math.min(maxHp(id), n));
  }

  function setHp(id, n) {
    state.hp[id] = Math.max(0, Math.min(maxHp(id), Math.round(n)));
  }

  function livingMembers() {
    return state.party.filter((id) => curHp(id) > 0);
  }

  function partyHp() {
    return state.party.reduce((s, id) => s + curHp(id), 0);
  }

  function partyMaxHp() {
    return state.party.reduce((s, id) => s + maxHp(id), 0);
  }

  function healMember(id, n) {
    const amt = Math.max(1, Math.round((Number(n) || 0) * sheet().mendMult));
    const before = curHp(id);
    setHp(id, before + amt);
    return curHp(id) - before;
  }

  function healAll(n) {
    state.party.forEach((id) => healMember(id, n));
  }

  function healLowest(n) {
    const hurt = state.party.filter((id) => curHp(id) < maxHp(id) && curHp(id) > 0)
      .sort((a, b) => (curHp(a) / maxHp(a)) - (curHp(b) / maxHp(b)));
    const down = state.party.filter((id) => curHp(id) <= 0);
    const id = (hurt[0] || down[0]);
    if (!id) return 0;
    return healMember(id, n);
  }

  function fullHeal() {
    state.party.forEach((id) => setHp(id, maxHp(id)));
  }

  function ensureCombat() {
    if (!state.classId) state.classId = "wanderer";
    if (!CLASSES[state.classId]) state.classId = "wanderer";
    if (!state.hp) state.hp = {};
    if (!state.seen) state.seen = {};
    if (!state.ownedGear) state.ownedGear = [];
    if (!state.gear) state.gear = {};
    if (!state.ownedGear.includes("staff")) state.ownedGear.push("staff");
    if (!state.gear.weapon) state.gear.weapon = "staff";
    if (!state.regenAt) state.regenAt = Date.now();
    if (!state.talents) state.talents = [];
    if (!state.cottage) state.cottage = {};
    if (!state.mail) state.mail = [];
    if (!state.weather) state.weather = "sunny";
    if (!state.mailDay) state.mailDay = 0;
    if (state.hearts && state.hearts.wren == null) state.hearts.wren = 0;
    if (state.questStep && state.questStep.wren == null) state.questStep.wren = 0;
    if (state.hearts && state.hearts.bram == null) state.hearts.bram = 0;
    if (state.questStep && state.questStep.bram == null) state.questStep.bram = 0;
    if (state.hearts && state.hearts.iris == null) state.hearts.iris = 0;
    if (state.questStep && state.questStep.iris == null) state.questStep.iris = 0;
    if (!state.errands) state.errands = [];
    if (!state.autosell) state.autosell = {};
    if (!state.memories) state.memories = [];
    if (!state.hiveAt) state.hiveAt = Date.now();
    if (state.hiveHoney == null) state.hiveHoney = 0;
    if (!state.museum) state.museum = {};
    if (!state.pondAt) state.pondAt = Date.now();
    if (state.pondFish == null) state.pondFish = 0;
    if (!state.story) state.story = {};
    if (!state.bonds) state.bonds = {};
    if (!state.forage) state.forage = [];
    if (!state.forageDay) state.forageDay = 0;
    if (state.pet && !PETS.find((p) => p.id === state.pet)) state.pet = null;
    if (!state.pennyEco) {
      state.gold = pennies((Number(state.gold) || 0) * 0.01);
      state.pennyEco = true;
    } else {
      state.gold = pennies(state.gold);
    }
    if (!state.paragon) state.paragon = blankParagon();
    if (!state.paragon.tree) state.paragon.tree = {};
    if (!state.paragon.mastered) state.paragon.mastered = {};
    if (!state.paragon.codex) state.paragon.codex = {};
    if (!state.paragon.classRank) state.paragon.classRank = {};
    if (!state.paragon.infused) state.paragon.infused = {};
    if (state.paragon.bestLevel == null) state.paragon.bestLevel = state.level || 1;
    if (!state.temper) state.temper = {};
    if (state.riteLeft == null) state.riteLeft = 0;
    if (!state.streak) state.streak = { id: state.trail || "meadow", n: 0 };
    if (!state.stance) state.stance = "kind";
    if (!state.form) state.form = {};
    if (!state.aspect) state.aspect = para().kindles ? "kindling" : null;
    if (state.musicOn == null) state.musicOn = true;
    if (!state.musicId) state.musicId = "kettle";
    if (state.musicVol == null) state.musicVol = 0.38;
    if (state.sfxVol == null) state.sfxVol = 0.55;
    if (state.reduceMotion == null) state.reduceMotion = false;
    if (!state.musicFollow) state.musicFollow = "pick";
    if (!state.fightSpeed) state.fightSpeed = "cozy";
    if (state.autoWatch == null) state.autoWatch = true;
    if (state.showDmg == null) state.showDmg = true;
    if (state.showNames == null) state.showNames = false;
    if (state.bigType == null) state.bigType = false;
    if (state.confirmKindle == null) state.confirmKindle = true;
    if (state.musicShuffle == null) state.musicShuffle = false;
    if (state.musicBells == null) state.musicBells = true;
    if (state.musicPad == null) state.musicPad = true;
    state.party.forEach((id) => {
      if (state.hp[id] == null) state.hp[id] = maxHp(id);
      else state.hp[id] = Math.min(maxHp(id), state.hp[id]);
    });
  }

  function fresh(name) {
    return {
      name: name || "Rowan",
      classId: "wanderer",
      pickedClass: false,
      gold: 0.24,
      pennyEco: true,
      xp: 0,
      level: 1,
      day: 1,
      dayAt: Date.now(),
      lastTick: Date.now(),
      regenAt: Date.now(),
      trail: "meadow",
      progress: 0,
      scene: "town",
      party: ["hero"],
      hp: { hero: 30 },
      ownedGear: ["beanie", "knit", "worn", "acorn", "staff"],
      gear: { hat: "beanie", cloak: "knit", boots: "worn", charm: "acorn", weapon: "staff" },
      pack: { biscuit: 3, herb: 1 },
      hearts: { maren: 0, quill: 0, cob: 0, wren: 0, bram: 0, iris: 0 },
      questStep: { maren: 0, quill: 0, cob: 0, wren: 0, bram: 0, iris: 0 },
      questDoneDay: {},
      questWalkAt: {},
      walks: {},
      seen: {},
      buffs: [],
      fight: null,
      talents: [],
      cottage: {},
      mail: [],
      mailDay: 0,
      weather: "sunny",
      story: {},
      bonds: {},
      pet: null,
      forage: [],
      forageDay: 0,
      sawFestival: false,
      errands: [],
      errandDay: 0,
      errandsDone: 0,
      autosell: {},
      memories: [],
      hiveAt: Date.now(),
      hiveHoney: 0,
      hiveCollected: false,
      museum: {},
      pondAt: Date.now(),
      pondFish: 0,
      pondCollected: false,
      temper: {},
      riteLeft: 0,
      focus: "meadow",
      streak: { id: "meadow", n: 0 },
      stance: "kind",
      form: {},
      aspect: null,
      expedition: null,
      journal: [{ t: Date.now(), text: "You arrived with a lantern and a polite hunger." }],
      lastSay: "The valley is small. The trails are kind.",
      lastArt: "slime",
      mute: false,
      musicOn: true,
      musicId: "kettle",
      musicVol: 0.38,
      sfxVol: 0.55,
      reduceMotion: false,
      musicFollow: "pick",
      fightSpeed: "cozy",
      autoWatch: true,
      showDmg: true,
      showNames: false,
      bigType: false,
      confirmKindle: true,
      musicShuffle: false,
      musicBells: true,
      musicPad: true,
      sawIntro: false,
      created: Date.now(),
      paragon: blankParagon(),
    };
  }

  function slotKey(id) { return SAVE_PREFIX + id; }

  function loadIndex() {
    try {
      const raw = localStorage.getItem(PROFILE_INDEX);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* ignore */ }
    const id = "hearth-1";
    const idx = { active: id, list: [{ id, name: "Rowan" }] };
    localStorage.setItem(PROFILE_INDEX, JSON.stringify(idx));
    return idx;
  }

  function saveIndex(idx) { localStorage.setItem(PROFILE_INDEX, JSON.stringify(idx)); }

  function load() {
    const idx = loadIndex();
    let raw = localStorage.getItem(slotKey(idx.active));
    if (!raw) {
      raw = localStorage.getItem(SAVE_KEY);
      if (!raw) {
        for (let i = 0; i < OLD_KEYS.length; i++) {
          raw = localStorage.getItem(OLD_KEYS[i]);
          if (raw) break;
        }
      }
    }
    if (raw) {
      try {
        state = Object.assign(fresh(), JSON.parse(raw));
        ensureCombat();
        return;
      } catch (e) { /* fall through */ }
    }
    state = fresh(idx.list[0] && idx.list[0].name);
    save();
  }

  function save() {
    const idx = loadIndex();
    state.lastTick = Date.now();
    const blob = JSON.stringify(state);
    localStorage.setItem(slotKey(idx.active), blob);
    localStorage.setItem(SAVE_KEY, blob);
    const row = idx.list.find((p) => p.id === idx.active);
    if (row) row.name = state.name;
    saveIndex(idx);
  }

  function note(text) {
    state.journal.unshift({ t: Date.now(), text });
    state.journal = state.journal.slice(0, 40);
  }

  function bonuses() {
    const b = {
      gold: 1, xp: 1, loot: 1, speed: 1,
      might: 0, ward: 0, grit: 0, fortune: 0, insight: 0, stride: 0,
      find: 0, luck: 0, mend: 0, haste: 0, pierce: 0, crit: 0, critDmg: 0,
    };
    const addTo = (src) => {
      if (!src) return;
      ["gold", "xp", "loot", "speed", "might", "ward", "grit", "fortune", "insight", "stride", "find", "luck", "mend", "haste", "pierce", "crit", "critDmg"].forEach((k) => {
        if (src[k]) b[k] += src[k];
      });
    };
    const c = classBy();
    addTo(c);
    state.party.forEach((id) => {
      const m = memberById(id);
      if (m) addTo(m.bonus());
    });
    Object.keys(state.gear || {}).forEach((slot) => addTo(gearById(state.gear[slot])));
    (state.buffs || []).forEach((buff) => addTo(buff));
    NPCS.forEach((npc) => { b.gold += (state.hearts[npc.id] || 0) * 0.02; });
    ["gold", "xp", "loot", "speed", "crit", "ward", "mend", "luck", "atk", "hp"].forEach((k) => {
      if (k !== "atk" && k !== "hp") b[k] += talentSum(k);
    });
    if (state.cottage && state.cottage.porch) b.loot += 0.08;
    if (state.cottage && state.cottage.garden) b.gold += 0.1;
    if (state.cottage && state.cottage.sconce && (todId() === "dusk" || todId() === "night")) {
      b.haste += 0.06;
      b.luck += 0.03;
    }
    if ((state.riteLeft || 0) > 0) {
      b.haste += 0.07;
      b.mend += 0.06;
      b.luck += 0.03;
    }
    const temper = wornTemper();
    b.loot += temper.loot;
    b.gold += temper.gold;
    b.crit += temper.crit;
    b.ward += temper.ward;
    state.party.forEach((id) => {
      if (id === "hero") return;
      const n = bondOf(id);
      if (n >= 12) { b.loot += 0.03; b.mend += 0.02; }
      if (n >= 24) { b.gold += 0.04; b.ward += 0.03; }
      if (n >= 36) { b.crit += 0.04; b.luck += 0.03; }
    });
    const wx = state.weather || "sunny";
    if (wx === "sunny") b.gold += 0.06;
    if (wx === "rain") { b.loot += 0.08; b.speed -= 0.05; }
    if (wx === "wind") b.speed += 0.06;
    if (wx === "snow") b.xp += 0.08;
    const sn = seasonId();
    if (sn === "spring") b.loot += 0.04;
    if (sn === "summer") b.gold += 0.04;
    if (sn === "autumn") b.xp += 0.04;
    if (sn === "winter") b.speed -= 0.03;
    if (isFestival()) { b.gold += 0.12; b.xp += 0.08; }
    addTo(PETS.find((p) => p.id === state.pet));
    Object.keys(state.museum || {}).forEach((id) => {
      const m = MUSEUM.find((x) => x.id === id);
      addTo(m);
      if (isInfused(id)) addTo(m);
    });
    addTo(currentAspect());
    addTo(currentStance());
    const cr = classRankOf();
    if (cr) {
      const c = classBy();
      if (c.loot) b.loot += cr * 0.025;
      if (c.gold) b.gold += cr * 0.02;
      if (c.xp) b.xp += cr * 0.025;
      if (c.crit) b.crit += cr * 0.012;
      if (c.ward) b.ward += cr * 0.015;
      if (c.mend) b.mend += cr * 0.015;
      if (c.luck) b.luck += cr * 0.012;
      b.might += cr * 0.02;
    }
    SYNERGIES.forEach((syn) => {
      if (syn.need.every(partyHas)) addTo(syn);
    });
    if (currentAspect() && currentAspect().night && (todId() === "dusk" || todId() === "night")) {
      b.luck += 0.04;
      b.find += 0.04;
    }
    b.gold += villageRank().i * 0.02;
    PARAGON_NODES.forEach((n) => { b[n.stat] += nodeRank(n.id) * n.per; });
    b.gold += b.fortune;
    b.xp += b.insight;
    b.loot += b.find;
    b.speed += b.stride;
    b.crit += b.might * 0.12 + b.luck * 0.35;
    b.critDmg += b.might * 0.18;
    return b;
  }

  function sheet() {
    const b = bonuses();
    const critChance = Math.min(0.62, 0.04 + softCap(b.crit, 0.7));
    const critMult = 1.5 + softCap(b.critDmg, 1.25);
    const wardDR = softCap(b.ward, 0.48);
    const mendMult = 1 + softCap(b.mend, 1.05);
    const lootChance = Math.max(0.15, b.loot);
    return {
      raw: b,
      gold: b.gold,
      xp: b.xp,
      loot: lootChance,
      speed: b.speed,
      might: b.might,
      ward: b.ward,
      grit: b.grit,
      fortune: b.fortune,
      insight: b.insight,
      stride: b.stride,
      find: b.find,
      luck: b.luck,
      mend: b.mend,
      haste: b.haste,
      pierce: b.pierce,
      critChance,
      critMult,
      wardDR,
      mendMult,
      rare: Math.min(0.85, b.loot * (1 + softCap(b.luck, 0.6))),
      power: 0,
    };
  }

  function trailDuration(trail) {
    const spd = Math.max(0.42, Math.min(2.4, bonuses().speed));
    return trail.ms / spd;
  }

  function fightStepMs() {
    const pace = state.fightSpeed === "slow" ? 1.65 : state.fightSpeed === "brisk" ? 0.58 : 1;
    return (FIGHT_STEP_MS * pace) / Math.max(0.52, 1 + sheet().haste);
  }

  function suggestedSong() {
    const mode = state.musicFollow || "pick";
    if (mode === "day") {
      const t = todId();
      if (t === "night") return "dusk";
      if (t === "dusk") return "starwell";
      if (t === "morning") return "brook";
      return "kettle";
    }
    if (mode === "season") {
      return ({ spring: "brook", summer: "honey", autumn: "kettle", winter: "snow" })[seasonId()] || "kettle";
    }
    if (mode === "trail") {
      const art = trailById(state.trail).art;
      return ({
        brook: "brook", dusk: "dusk", moon: "starwell", starwell: "starwell", frost: "frost",
        kiln: "kiln", meadow: "meadow", woods: "choir", springs: "brook", orchard: "orchard",
        harbor: "harbor", caves: "harbor", hollow: "honey", ridge: "meadow", cloud: "snow",
      })[art] || "kettle";
    }
    return state.musicId || "kettle";
  }

  function syncFollowMusic() {
    if ((state.musicFollow || "pick") === "pick") return;
    const id = suggestedSong();
    if (id && id !== state.musicId) {
      state.musicId = id;
      if (state.musicOn !== false) startMusic();
    }
  }

  function powerRating() {
    const hero = combatStats("hero");
    const s = sheet();
    return Math.round(
      hero.atk * 2.4
      + hero.def * 1.7
      + hero.hp * 0.32
      + (s.loot - 1) * 42
      + (s.speed - 1) * 34
      + (s.xp - 1) * 28
      + s.critChance * 80
      + s.wardDR * 70
      + paragonSpent() * 3
      + (para().kindles || 0) * 8
    );
  }

  function creditGold(n) {
    n = pennies(Math.max(0, n));
    if (n < 0.005) return 0;
    state.gold = pennies((state.gold || 0) + n);
    para().lifetimeGold = pennies((para().lifetimeGold || 0) + n);
    return n;
  }

  function addGold(n, el) {
    n = creditGold(n);
    if (!n) return;
    $("gold").textContent = fmt(state.gold);
    $("coin-pill").classList.remove("flash");
    void $("coin-pill").offsetWidth;
    $("coin-pill").classList.add("flash");
    puff("+" + fmt(n), el);
    flyCoin(el);
    tone(660, 0.08, "sine", 0.035);
  }

  function spend(n) {
    n = pennies(n);
    if (pennies(state.gold) + 1e-9 < n) return false;
    state.gold = pennies(state.gold - n);
    $("gold").textContent = fmt(state.gold);
    return true;
  }

  function addXp(n) {
    n = Math.max(0, Math.round(n));
    state.xp += n;
    if (n) para().lifetimeXp = (para().lifetimeXp || 0) + n;
    if (state.level > (para().bestLevel || 0)) para().bestLevel = state.level;
    let ups = 0;
    while (state.xp >= xpNeeded(state.level)) {
      state.xp -= xpNeeded(state.level);
      state.level += 1;
      ups += 1;
      state.party.forEach((id) => healMember(id, 4));
    }
    if (ups) {
      note("You grew to level " + state.level + ".");
      toast("Level " + state.level + ". Hearts grew a little too.");
      tone(523, 0.12, "triangle", 0.05);
      burstLevel();
      if (talentsDue() > 0) setTimeout(showTalentPicker, 400);
    }
    renderHud();
  }

  function lightRite() {
    if ((state.riteLeft || 0) > 0) {
      toast("The sconce is already thinking. " + state.riteLeft + " loops left.");
      return false;
    }
    if (!takePack("oil", 1)) {
      toast("The porch wants a bottle of lantern oil.");
      return false;
    }
    state.riteLeft = 5;
    bumpErrand("oil", 1);
    toast("The porch kept an evening for five loops.");
    note("You poured oil. The moths approved.");
    return true;
  }

  function doTemper(id) {
    if (!id || !state.ownedGear || !state.ownedGear.includes(id)) return false;
    const rank = temperOf(id);
    if (rank >= TEMPER_MAX) {
      toast("That piece is as warm as it will get.");
      return false;
    }
    const cost = temperCost(rank);
    if (packCount("oil") < cost.oil) {
      toast("Tempering wants " + cost.oil + " oil.");
      return false;
    }
    if (cost.spark && packCount("ember") < 1 && packCount("starshard") < 1) {
      toast("Higher ranks want an ember or a starshard.");
      return false;
    }
    if (!takePack("oil", cost.oil)) return false;
    if (cost.spark) {
      if (packCount("ember")) takePack("ember", 1);
      else takePack("starshard", 1);
    }
    if (!state.temper) state.temper = {};
    state.temper[id] = rank + 1;
    bumpErrand("temper", 1);
    toast((gearById(id) && gearById(id).name || id) + " tempered to " + state.temper[id] + ".");
    note("You warmed the " + ((gearById(id) && gearById(id).name) || id) + ".");
    return true;
  }

  function studyTrail(id) {
    const p = para();
    if (p.codex[id]) {
      toast("Iris already filed that path.");
      return false;
    }
    if (packCount("page") < 2 || packCount("oil") < 1) {
      toast("A study wants 2 loose pages and 1 oil.");
      return false;
    }
    takePack("page", 2);
    takePack("oil", 1);
    p.codex[id] = true;
    toast(trailById(id).name + " is in the lantern book now.");
    note("You studied " + trailById(id).name + ". The moths turned the page.");
    return true;
  }

  function canPickAspect() {
    return state.level >= 8 || !!(para().kindles);
  }

  function setAspect(id) {
    const a = ASPECTS.find((x) => x.id === id);
    if (!a) return false;
    if (!canPickAspect()) {
      toast("The lantern is only a color at level 8, or after a kindle.");
      return false;
    }
    if (state.aspect === id) return false;
    if (state.aspect && !takePack("oil", 1)) {
      toast("Changing aspect wants one oil.");
      return false;
    }
    state.aspect = id;
    toast("The lantern took the color of " + a.name + ".");
    note("Aspect: " + a.name + ".");
    return true;
  }

  function setStance(id) {
    const s = STANCES.find((x) => x.id === id);
    if (!s || state.fight) {
      if (state.fight) toast("Finish the scuffle first.");
      return false;
    }
    state.stance = id;
    toast("Stance: " + s.name + ".");
    return true;
  }

  function toggleForm(id) {
    if (id === "hero") return false;
    if (!state.form) state.form = {};
    state.form[id] = formOf(id) === "front" ? "back" : "front";
    toast(memberName(id) + " steps " + state.form[id] + ".");
    return true;
  }

  function rankClass() {
    const r = classRankOf();
    if (r >= CLASS_RANK_MAX) {
      toast("This class is as taught as it gets.");
      return false;
    }
    const oil = 1 + r;
    if (packCount("oil") < oil || packCount("page") < 1) {
      toast("A class lesson wants " + oil + " oil and 1 page.");
      return false;
    }
    takePack("oil", oil);
    takePack("page", 1);
    const p = para();
    if (!p.classRank) p.classRank = {};
    p.classRank[state.classId] = r + 1;
    toast(classBy().name + " grew to lesson " + p.classRank[state.classId] + ".");
    note("A class lesson. The path underlined something.");
    return true;
  }

  function infuseMuseum(id) {
    if (!state.museum || !state.museum[id]) return false;
    if (isInfused(id)) {
      toast("That shelf is already glowing.");
      return false;
    }
    if (!takePack("dusk-wing", 1)) {
      toast("Infusion wants a dusk wing.");
      return false;
    }
    const p = para();
    if (!p.infused) p.infused = {};
    p.infused[id] = true;
    toast(itemName(id) + " took a second evening.");
    return true;
  }

  function farmDay() { return state.day; }

  function rollWeather() {
    const opts = WEATHERS[seasonId()] || WEATHERS.spring;
    state.weather = pick(opts);
  }

  function rollMail() {
    if (state.mailDay >= state.day) return;
    state.mailDay = state.day;
    if (Math.random() > 0.62) return;
    const writers = NPCS.filter((n) => (state.hearts[n.id] || 0) > 0 || n.id === "wren" || n.id === "maren");
    const npc = pick(writers);
    const gifts = {
      maren: [["biscuit", 2], ["stew", 1], ["tea", 1]],
      quill: [["herb", 2], ["ribbon", 1]],
      cob: [["button", 2], ["wool", 1]],
      wren: [["biscuit", 1], ["pearl-bead", 1], ["ribbon", 1]],
      bram: [["flour", 2], ["loaf", 1], ["honey", 1]],
      iris: [["page", 1], ["tea", 1], ["lullaby", 1]],
    };
    const notes = {
      maren: ["The stew asked after you. I packed a little of last night.", "Eat. Then walk. Then eat again."],
      quill: ["The brook moved. I redrew it. Then it moved back.", "A line I liked. I thought you should have a copy in crumbs."],
      cob: ["Your boots wrote. They are happy. I sent buttons anyway.", "A scrap of wool. The bees approved."],
      wren: ["This one had your name on it, even before it did.", "The harbor crate coughed up a kindness. I forwarded it."],
      bram: ["The wheel sent flour. Do not ask how.", "A loaf that wandered off the cooling rack. It is yours now."],
      iris: ["A page slipped out and asked for you by name.", "I lent the wind a bookmark. It sent this back."],
    };
    const gift = pick(gifts[npc.id] || gifts.wren);
    state.mail.unshift({
      id: "m-" + Date.now() + "-" + Math.floor(Math.random() * 99),
      from: npc.id,
      text: pick(notes[npc.id] || notes.wren),
      item: gift[0],
      n: gift[1],
      read: false,
      day: state.day,
    });
    state.mail = state.mail.slice(0, 16);
  }

  function tickDay(now) {
    let grew = false;
    while (now - state.dayAt >= DAY_MS) {
      state.dayAt += DAY_MS;
      state.day += 1;
      grew = true;
    }
    if (grew) {
      rollWeather();
      rollMail();
      rollForage();
      if (isFestival()) state.sawFestival = true;
      if (state.cottage && state.cottage.garden && Math.random() < 0.45) addPack("herb", 1);
      if (state.cottage && state.cottage.sconce && Math.random() < 0.3) addPack("oil", 1);
      seedErrands();
      tickHive();
      tickPond();
      checkStory(true);
      syncFollowMusic();
    }
  }

  function scaledFoe(id, trail) {
    const base = FOES[id] || FOES.slime;
    const lv = Math.max(1, state.level);
    const tlv = (trail && trail.level) || 1;
    const diff = trailDiff(trail);
    const heat = 1 + (para().kindles || 0) * 0.018;
    const trailHeat = 1 + Math.max(0, tlv - 1) * 0.032 + (diff - 1) * 0.06;
    const far = trail && trail.far ? 1 + (trail.tier || 1) * 0.035 : 1;
    const scale = heat * trailHeat * far;
    const hp = Math.round((base.hp + (lv - 1) * base.grow * 1.15 + tlv * 0.8) * scale);
    return {
      id: base.id, name: base.name, art: base.art, verb: base.verb,
      hp, max: hp,
      atk: Math.round((base.atk + (lv - 1) * 0.38 + tlv * 0.12) * scale),
      def: Math.round((base.def + (lv - 1) * 0.22 + (diff - 1) * 0.4) * scale),
    };
  }

  function seeFoe(id, win) {
    if (!state.seen[id]) state.seen[id] = { meets: 0, wins: 0 };
    state.seen[id].meets += 1;
    if (win) state.seen[id].wins += 1;
  }

  function hitDmg(atk, def, pierce, incoming) {
    const s = sheet();
    const extraPierce = incoming ? 0 : (pierce || 0);
    const effDef = Math.max(0, (def || 0) - extraPierce);
    const mit = effDef / (effDef + 13 + state.level * 0.55);
    const variance = 0.8 + Math.random() * 0.4;
    let dmg = Math.max(0.5, atk) * variance * (1 - mit);
    if (incoming) {
      dmg *= (1 - s.wardDR);
      const st = currentStance();
      if (st && st.incoming) dmg *= st.incoming;
    } else if (Math.random() < s.critChance) {
      dmg *= s.critMult;
      state._lastCrit = true;
    } else {
      state._lastCrit = false;
    }
    return Math.max(1, Math.round(dmg));
  }

  function pickTarget(living) {
    if (state.classId === "knight" && living.includes("hero") && Math.random() < 0.55) return "hero";
    if (living.includes("bramble") && Math.random() < 0.4) return "bramble";
    const front = living.filter((id) => formOf(id) === "front");
    if (front.length && Math.random() < 0.62) return pick(front);
    return pick(living);
  }

  function tryAutoHeal() {
    const need = state.party.find((id) => curHp(id) > 0 && curHp(id) / maxHp(id) < 0.28);
    if (!need) return;
    if (packCount("salve") && takePack("salve", 1)) {
      healMember(need, 16);
      return "Honey salve for " + memberName(need) + ".";
    }
    if (packCount("biscuit") && takePack("biscuit", 1)) {
      healMember(need, 8);
      return memberName(need) + " ate a biscuit.";
    }
    return "";
  }

  function afterFightHeals() {
    if (state.classId === "bard") healAll(3);
    if (state.classId === "cook") healAll(4);
    if (trailById(state.trail).id === "springs") healAll(3);
    if (state.party.includes("pearl")) healAll(4);
    if (state.party.includes("nettle")) healAll(2);
    const pet = PETS.find((p) => p.id === state.pet);
    if (pet && pet.heal) healAll(pet.heal);
    if ((state.stance || "kind") === "kind") healAll(2);
    if ((state.stance || "kind") === "guard") healMember("hero", 3);
  }

  function grantLoop(trail, silent, won) {
    const s = sheet();
    const mods = trailMods(trail);
    const xpScale = 1 + softCap(s.insight, 1.2) + mods.xp;
    const xp = Math.round(trail.xp * s.xp * xpScale * (won ? 1 : 0.4));
    const found = [];
    if (won) {
      trail.loot.forEach(([id, chance]) => {
        if (Math.random() < Math.min(0.9, chance * s.loot * (1 + mods.loot))) {
          addPack(id, 1);
          found.push(id);
        }
      });
      if (Math.random() < Math.min(0.62, trail.rare[1] * s.rare * (1 + mods.loot))) {
        addPack(trail.rare[0], 1);
        found.push(trail.rare[0]);
      }
      if (state.classId === "forager" && Math.random() < 0.55) {
        const extra = pick(["herb", "wildflower", "moss", "mushroom"]);
        addPack(extra, 1);
        found.push(extra);
      }
      if (state.classId === "cook" && Math.random() < 0.35) {
        addPack("loaf", 1);
        found.push("loaf");
      }
      if (state.classId === "ranger" && Math.random() < 0.45) {
        const extra = pick(["thyme", "herb", "wildflower"]);
        addPack(extra, 1);
        found.push(extra);
      }
      if (state.classId === "shepherd" && Math.random() < 0.4) {
        addPack("wool", 1);
        found.push("wool");
      }
      if (trail.id === "springs") healAll(3);
      if (trail.id === "woods" && Math.random() < 0.18) {
        addPack("page", 1);
        found.push("page");
      }
      if (trail.id === "dusk" && Math.random() < 0.22) {
        addPack("oil", 1);
        found.push("oil");
      }
      if (echoOf(trail.id) && Math.random() < 0.14 + echoOf(trail.id) * 0.04) {
        const echoItem = pick(trail.loot)[0];
        addPack(echoItem, 1);
        found.push(echoItem);
      }
      if ((state.stance || "kind") === "kind" && Math.random() < 0.22) {
        const extra = pick(trail.loot)[0];
        addPack(extra, 1);
        found.push(extra);
      }
      if (currentAspect() && currentAspect().night && (todId() === "dusk" || todId() === "night") && Math.random() < 0.2) {
        addPack("oil", 1);
        found.push("oil");
      }
      if (state._keeper) {
        const tip = pennyProfit(12 + state.level * 2);
        if (silent) creditGold(tip);
        else addGold(tip);
        addPack(trail.rare[0], 1);
        found.push(trail.rare[0]);
        note("The keeper of " + trail.name + " sat down and left a gift.");
      }
    }
    const trailBase = rand(trail.gold[0], trail.gold[1] + 1) * (won ? 1 : 0.35) * (1 + mods.gold);
    const gold = pennyProfit(trailBase) + (won ? pennyProfit(lootValue(found)) : 0);
    state._keeper = false;
    state.walks[trail.id] = (state.walks[trail.id] || 0) + 1;
    const p = para();
    p.lifetimeWalks = (p.lifetimeWalks || 0) + 1;
    if (totalWalks() > (p.bestWalks || 0)) p.bestWalks = totalWalks();
    if (state.level > (p.bestLevel || 0)) p.bestLevel = state.level;
    state.party.forEach((id) => {
      if (id === "hero") return;
      if (!state.bonds) state.bonds = {};
      state.bonds[id] = Math.min(40, (state.bonds[id] || 0) + 1);
    });
    if ((state.riteLeft || 0) > 0) state.riteLeft -= 1;
    if (!state.streak) state.streak = { id: trail.id, n: 0 };
    if (won && state.streak.id === trail.id) state.streak.n += 1;
    else state.streak = { id: trail.id, n: won ? 1 : 0 };
    state.buffs = state.buffs.map((buff) => ({ ...buff, left: buff.left - 1 })).filter((buff) => buff.left > 0);
    checkStory(silent);
    bumpErrand("walks", 1);
    autoSellFound(found);
    state.lastSay = won ? pick(trail.says) : "The party sat down, shared a biscuit, and the path wandered off first.";
    if (!silent) {
      addGold(gold);
      addXp(xp);
    } else {
      creditGold(gold);
      state.xp += xp;
      if (xp) para().lifetimeXp = (para().lifetimeXp || 0) + xp;
      while (state.xp >= xpNeeded(state.level)) {
        state.xp -= xpNeeded(state.level);
        state.level += 1;
      }
    }
    return { gold, xp, found, trail: trail.name, won };
  }

  function resolveFightInstant(foe) {
    const log = [];
    let rounds = 0;
    while (foe.hp > 0 && livingMembers().length && rounds < 24) {
      livingMembers().forEach((id) => {
        if (foe.hp <= 0) return;
        let pierce = combatStats(id).pierce || 0;
        if (id === "hero" && state.classId === "mage") pierce = Math.max(pierce, 2);
        let dmg = hitDmg(combatStats(id).atk, foe.def, pierce);
        if (id === "thimble" && Math.random() < 0.22) dmg *= 2;
        foe.hp -= dmg;
      });
      if (foe.hp <= 0) break;
      const living = livingMembers();
      if (!living.length) break;
      const target = pickTarget(living);
      let dmg = hitDmg(foe.atk, combatStats(target).def, 0, true);
      if (state.classId === "knight") dmg = Math.max(1, Math.floor(dmg * 0.75));
      setHp(target, curHp(target) - dmg);
      tryAutoHeal();
      rounds += 1;
    }
    const win = foe.hp <= 0 && livingMembers().length > 0;
    seeFoe(foe.id, win);
    if (win) afterFightHeals();
    else {
      state.party.forEach((id) => { if (curHp(id) <= 0) setHp(id, 1); });
    }
    return win;
  }

  function startFight(silent) {
    if (!livingMembers().length) {
      state.party.forEach((id) => setHp(id, Math.max(1, Math.floor(maxHp(id) * 0.35))));
    }
    const trail = trailById(state.trail);
    const foe = scaledFoe(pick(trail.foes), trail);
    if (currentAspect() && currentAspect().id === "kindling") {
      foe.hp = Math.max(4, Math.round(foe.hp * 0.94));
      foe.max = foe.hp;
    }
    if (state.classId === "shepherd" && (foe.id === "sheep" || foe.id === "wool")) {
      foe.hp = Math.round(foe.hp * 0.75);
      foe.max = foe.hp;
      foe.atk = Math.max(1, foe.atk - 1);
    }
    const walks = (state.walks[trail.id] || 0) + 1;
    const keeper = walks % KEEPER_EVERY === 0;
    if (keeper) {
      foe.hp = Math.round(foe.hp * 2.15);
      foe.max = foe.hp;
      foe.atk += 2;
      foe.def += 1;
      foe.name = "Keeper " + foe.name;
      foe.keeper = true;
      state._keeper = true;
    }
    if (silent) {
      const win = resolveFightInstant(foe);
      return grantLoop(trail, true, win);
    }
    state.scene = "trail";
    if (state.autoWatch !== false) {
      try { closeDesk(); } catch (e) { /* ignore */ }
    }
    state.fight = {
      foeId: foe.id,
      name: foe.name,
      art: foe.art,
      verb: foe.verb,
      foeHp: foe.hp,
      foeMax: foe.max,
      atk: foe.atk,
      def: foe.def,
      keeper: !!keeper,
      log: keeper
        ? foe.name + " waits in the middle of the path, wearing a little crown of moss."
        : foe.name + " stands in the path, politely.",
      next: performance.now() + 420,
      turn: "party",
      idx: 0,
    };
    renderWorld();
    renderFight();
    return null;
  }

  function endFight(win) {
    const f = state.fight;
    const trail = trailById(state.trail);
    if (f) seeFoe(f.foeId, win);
    state.fight = null;
    renderFight();
    if (win) afterFightHeals();
    else {
      state.party.forEach((id) => { if (curHp(id) <= 0) setHp(id, 1); });
      toast("The party sat down. The path waited.");
    }
    const r = grantLoop(trail, false, win);
    state.lastArt = (f && f.art) || "slime";
    showSay(state.lastSay, state.lastArt);
    if (r.found.length) toast("Found " + r.found.map(itemName).join(", ") + ".");
    state.progress = 0;
    renderPack();
    renderRecipes();
    renderNeighbors();
    renderJournal();
    renderVitals();
    renderHud();
    renderWorld();
    save();
    return r;
  }

  function partyAct(id, foe) {
    const st = combatStats(id);
    let pierce = st.pierce || 0;
    const close = bondOf(id) >= 12 ? 0.12 : 0;
    const critTag = () => (state._lastCrit ? " A lantern crit." : "");
    if (id === "hero" && state.classId === "ranger" && foe.keeper) {
      const dmg = hitDmg(st.atk + 3, foe.def, pierce + 1);
      return { dmg, log: "The ranger found the keeper's soft spot for " + dmg + "." + critTag() };
    }
    if (id === "ash" && Math.random() < 0.32 + close) {
      const dmg = hitDmg(st.atk + 2, foe.def, pierce + 1);
      healMember("hero", 3);
      return { dmg, log: "Ash offered the mug, then bonked for " + dmg + "." + critTag() };
    }
    if (id === "pearl" && Math.random() < 0.38 + close) {
      const got = healLowest(6);
      return { dmg: 0, skipHit: true, log: "Pearl poured tea (+" + got + ")." };
    }
    if (id === "nettle" && Math.random() < 0.3 + close) {
      healAll(2);
      const dmg = hitDmg(st.atk, foe.def, pierce);
      return { dmg, log: "Nettle sang. Everyone mended. A note hit for " + dmg + "." + critTag() };
    }
    if (id === "lumen" && Math.random() < 0.32) pierce += 4;
    if (id === "pip" && Math.random() < 0.28) {
      const crumb = pick(["herb", "biscuit", "wildflower"]);
      addPack(crumb, 1);
      const dmg = hitDmg(st.atk, foe.def, pierce);
      return { dmg, log: "Pip pinched a " + itemName(crumb) + " and bonked for " + dmg + "." + critTag() };
    }
    if (id === "bramble" && Math.random() < 0.3) state._guard = true;
    let dmg = hitDmg(st.atk, foe.def, pierce);
    let extra = critTag();
    if (id === "thimble" && Math.random() < 0.22) {
      dmg = Math.round(dmg * 2);
      extra = " A tidy crit.";
    }
    if (id === "lumen" && pierce > 2) extra += " The lantern found a seam.";
    if (id === "bramble" && state._guard) extra += " Spoon up.";
    return { dmg, log: memberName(id) + " bonked for " + dmg + "." + extra };
  }

  function stepFight(now) {
    const f = state.fight;
    if (!f || now < f.next) return;
    const living = livingMembers();
    if (!living.length) {
      endFight(false);
      return;
    }
    if (f.turn === "party") {
      const id = living[f.idx % living.length];
      const act = partyAct(id, f);
      const actor = document.querySelector('.walker[data-id="' + id + '"]');
      if (actor) punch(actor, "acting");
      if (act.skipHit) {
        f.log = act.log;
        puffHeart(actor || $("fight-art"));
      } else {
        f.foeHp = Math.max(0, f.foeHp - act.dmg);
        f.log = act.log;
        const foeEl = $("foe-stage") || $("fight-art");
        punch(foeEl, "lunge-hit");
        floatDmg("-" + (act.dmg || 0), foeEl, false);
        puffSpark(foeEl);
      }
      tone(520 + (act.dmg || 4) * 12, 0.07, "triangle", 0.03);
      if (f.foeHp <= 0) {
        f.log = f.name + " sat down first. Kindly.";
        renderFight();
        setTimeout(() => { if (state.fight) endFight(true); }, 500);
        f.next = now + 99999;
        return;
      }
      f.idx += 1;
      if (f.idx >= living.length) {
        f.turn = "foe";
        f.idx = 0;
      }
    } else {
      const target = pickTarget(living);
      let dmg = hitDmg(f.atk, combatStats(target).def, 0, true);
      if (formOf(target) === "back") dmg = Math.max(1, Math.floor(dmg * 0.82));
      if (formOf(target) === "front") dmg = Math.max(1, Math.floor(dmg * 1.08));
      if (state.classId === "knight") dmg = Math.max(1, Math.floor(dmg * 0.75));
      if (state._guard) {
        dmg = Math.max(1, Math.floor(dmg * 0.55));
        state._guard = false;
      }
      setHp(target, curHp(target) - dmg);
      f.log = f.name + " " + f.verb + " " + memberName(target) + " for " + dmg + ".";
      const stage = $("foe-stage");
      if (stage) punch(stage, "foe-lunge");
      const tgt = document.querySelector('.walker[data-id="' + target + '"]');
      if (tgt) {
        punch(tgt, "hit");
        floatDmg("-" + dmg, tgt, false);
      }
      const auto = tryAutoHeal();
      if (auto) f.log += " " + auto;
      tone(280, 0.08, "sine", 0.03);
      if (!livingMembers().length) {
        renderFight();
        setTimeout(() => { if (state.fight) endFight(false); }, 500);
        f.next = now + 99999;
        return;
      }
      f.turn = "party";
      f.idx = 0;
    }
    f.next = now + fightStepMs();
    renderFight();
    updateWalkerHp();
    renderHud();
  }

  function runExpedition(silent) {
    return startFight(silent);
  }

  function catchUp() {
    const now = Date.now();
    const elapsed = Math.min(OFFLINE_CAP_MS, Math.max(0, now - (state.lastTick || now)));
    tickDay(now);
    if (state.fight) state.fight = null;
    const trail = trailById(state.trail);
    const dur = trailDuration(trail);
    let remain = elapsed + state.progress * dur;
    let loops = 0;
    let gold = 0;
    let xp = 0;
    const summary = {};
    while (remain >= dur && loops < 400) {
      const r = startFight(true);
      if (r) {
        gold = pennies(gold + r.gold);
        xp += r.xp;
        (r.found || []).forEach((id) => { summary[id] = (summary[id] || 0) + 1; });
      }
      remain -= dur;
      loops += 1;
    }
    const regenTicks = Math.floor(elapsed / REGEN_MS);
    if (regenTicks) healAll(regenTicks);
    state.progress = dur ? remain / dur : 0;
    state.lastTick = now;
    state.regenAt = now;
    if (loops > 0) {
      const lootTxt = Object.keys(summary).slice(0, 5).map((id) => summary[id] + " " + itemName(id)).join(", ");
      return { loops, gold, hours: +(elapsed / 3600000).toFixed(1), loot: lootTxt };
    }
    return null;
  }

  function currentQuest(npc) {
    const step = state.questStep[npc.id] || 0;
    return npc.quests[step % npc.quests.length];
  }

  function walkProgress(npc, q) {
    const walked = state.walks[q.trail] || 0;
    const base = (state.questWalkAt && state.questWalkAt[npc.id]) || 0;
    return walked - base;
  }

  function questReady(npc) {
    const q = currentQuest(npc);
    if (q.kind === "item") return packCount(q.item) >= q.n;
    if (q.kind === "walk") return walkProgress(npc, q) >= q.n;
    return false;
  }

  function completeQuest(npc) {
    const q = currentQuest(npc);
    if (state.questDoneDay[npc.id] === farmDay()) return false;
    if (q.kind === "item") {
      if (!takePack(q.item, q.n)) return false;
    } else if (q.kind === "walk") {
      if (walkProgress(npc, q) < q.n) return false;
      if (!state.questWalkAt) state.questWalkAt = {};
      state.questWalkAt[npc.id] = state.walks[q.trail] || 0;
    }
    state.questDoneDay[npc.id] = farmDay();
    state.questStep[npc.id] = (state.questStep[npc.id] || 0) + 1;
    state.hearts[npc.id] = Math.min(5, (state.hearts[npc.id] || 0) + 1);
    const turned = q.kind === "item" ? Array(q.n).fill(q.item) : [];
    addGold(pennyProfit(q.pay) + pennyProfit(lootValue(turned)));
    note(npc.name + " tucked the gift away like treasure.");
    checkStory(false);
    return true;
  }

  function toast(msg) {
    const el = $("toast");
    el.textContent = msg;
    el.classList.remove("hidden");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.add("hidden"), 2800);
  }

  function punch(el, cls) {
    if (!el) return;
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
  }

  function updateWalkerHp() {
    document.querySelectorAll(".walker[data-id]").forEach((el) => {
      const id = el.dataset.id;
      const bar = el.querySelector(".mini-hp span");
      if (bar && maxHp(id)) bar.style.width = (curHp(id) / maxHp(id) * 100) + "%";
      el.classList.toggle("down", curHp(id) <= 0);
    });
  }

  function showSay(text, art) {
    const el = $("say");
    const pic = art && ART[art] ? `<div class="say-art">${sprite(art)}</div>` : "";
    el.innerHTML = pic + esc(text);
    el.classList.remove("hidden");
    el.style.animation = "none";
    void el.offsetWidth;
    el.style.animation = "";
    clearTimeout(sayTimer);
    sayTimer = setTimeout(() => el.classList.add("hidden"), 3800);
  }

  function puff(text, el) {
    const fx = $("fx");
    const n = document.createElement("div");
    n.className = "puff";
    n.textContent = text;
    const r = (el && el.getBoundingClientRect && el.getBoundingClientRect()) || $("coin-pill").getBoundingClientRect();
    n.style.left = r.left + r.width / 2 + "px";
    n.style.top = r.top + "px";
    fx.appendChild(n);
    setTimeout(() => n.remove(), 900);
  }

  function puffHeart(el) {
    const fx = $("fx");
    const n = document.createElement("div");
    n.className = "fx-heart";
    n.innerHTML = sprite("hearts");
    const r = (el && el.getBoundingClientRect && el.getBoundingClientRect()) || $("hp-pill").getBoundingClientRect();
    n.style.left = r.left + r.width / 2 + "px";
    n.style.top = r.top + "px";
    fx.appendChild(n);
    setTimeout(() => n.remove(), 900);
  }

  function flyCoin(from) {
    const fx = $("fx");
    const pill = $("coin-pill");
    if (!fx || !pill) return;
    const a = (from && from.getBoundingClientRect && from.getBoundingClientRect()) || { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 };
    const b = pill.getBoundingClientRect();
    const n = document.createElement("div");
    n.className = "coin-fly";
    n.innerHTML = sprite("icon-coin");
    n.style.left = a.left + a.width / 2 + "px";
    n.style.top = a.top + "px";
    n.style.setProperty("--dx", (b.left + b.width / 2 - a.left - a.width / 2) + "px");
    n.style.setProperty("--dy", (b.top - a.top) + "px");
    fx.appendChild(n);
    setTimeout(() => n.remove(), 720);
  }

  function puffSpark(el) {
    const fx = $("fx");
    const n = document.createElement("div");
    n.className = "fx-spark";
    n.innerHTML = sprite("spark");
    const r = (el && el.getBoundingClientRect && el.getBoundingClientRect()) || { left: window.innerWidth / 2, top: 160, width: 40, height: 40 };
    n.style.left = r.left + r.width / 2 + "px";
    n.style.top = r.top + r.height / 2 + "px";
    fx.appendChild(n);
    setTimeout(() => n.remove(), 450);
  }

  function floatDmg(text, el, heal) {
    if (state.showDmg === false) return;
    const fx = $("fx");
    const n = document.createElement("div");
    n.className = "dmg-num" + (heal ? " heal" : "");
    n.textContent = text;
    const r = (el && el.getBoundingClientRect && el.getBoundingClientRect()) || $("fight-art").getBoundingClientRect();
    n.style.left = r.left + r.width / 2 + "px";
    n.style.top = r.top + "px";
    fx.appendChild(n);
    setTimeout(() => n.remove(), 850);
  }

  function showModal(title, body, ok) {
    const actions = $("modal-actions");
    let okBtn = $("modal-ok");
    if (!okBtn) {
      okBtn = document.createElement("button");
      okBtn.id = "modal-ok";
      okBtn.type = "button";
      okBtn.className = "primary-btn";
      okBtn.addEventListener("click", hideModal);
    }
    $("modal-title").textContent = title;
    $("modal-body").textContent = body;
    okBtn.textContent = ok || "Alright";
    Array.from(actions.children).forEach((child) => {
      if (child.id !== "modal-ok") child.remove();
    });
    if (okBtn.parentNode !== actions) actions.appendChild(okBtn);
    $("modal").classList.remove("hidden");
  }

  function hideModal() {
    $("modal").classList.add("hidden");
    $("modal-portrait").classList.add("hidden");
    $("modal-portrait").innerHTML = "";
  }

  function showClassPicker(first) {
    const port = $("modal-portrait");
    port.classList.remove("hidden");
    port.innerHTML = sprite("hero");
    showModal("Choose a class", first
      ? "The lantern will still be yours. Only the walk changes."
      : "Maren will pour you a new name for 40 coins. Hearts refill.");
    $("modal-ok").textContent = "Keep " + classBy().name;
    const grid = document.createElement("div");
    grid.className = "class-pick";
    Object.values(CLASSES).forEach((c) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "class-btn" + (state.classId === c.id ? " on" : "");
      btn.innerHTML = `<strong>${esc(c.name)}</strong><span>${esc(c.blurb)}</span><span>♥${c.hp} · atk ${c.atk} · def ${c.def}</span>`;
      btn.addEventListener("click", () => pickClass(c.id, first));
      grid.appendChild(btn);
    });
    $("modal-actions").appendChild(grid);
  }

  function pickClass(id, first) {
    if (!first && !spend(40)) {
      toast("The inn wants 40 coins to retrain.");
      return;
    }
    state.classId = id;
    state.pickedClass = true;
    fullHeal();
    note("You took the path of the " + classBy().name + ".");
    hideModal();
    toast("A " + classBy().name + ". The lantern agrees.");
    renderAll();
    save();
  }

  function ensureAudio() {
    try {
      if (!audio) audio = new (window.AudioContext || window.webkitAudioContext)();
      if (audio.state === "suspended" && audio.resume) audio.resume();
    } catch (e) { /* ignore */ }
    return audio;
  }

  function tone(freq, dur, type, vol) {
    if (state.mute) return;
    try {
      const ctx = ensureAudio();
      if (!ctx) return;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type || "sine";
      o.frequency.value = freq;
      g.gain.value = (vol || 0.03) * (state.sfxVol == null ? 0.55 : state.sfxVol);
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
      o.stop(ctx.currentTime + dur + 0.02);
    } catch (e) { /* ignore */ }
  }

  function musicBus() {
    const ctx = ensureAudio();
    if (!ctx) return null;
    if (!musicMaster) {
      musicMaster = ctx.createGain();
      musicMaster.connect(ctx.destination);
    }
    const on = state.musicOn !== false;
    const vol = (state.musicVol == null ? 0.38 : state.musicVol) * 0.18;
    musicMaster.gain.setTargetAtTime(on ? vol : 0, ctx.currentTime, 0.05);
    return musicMaster;
  }

  function playNote(semi, dur, wave, vol) {
    const ctx = ensureAudio();
    const bus = musicBus();
    if (!ctx || !bus || semi == null) return;
    const song = SONGS.find((s) => s.id === (state.musicId || "kettle")) || SONGS[0];
    const freq = song.root * Math.pow(2, semi / 12);
    const o = ctx.createOscillator();
    const f = ctx.createBiquadFilter();
    const g = ctx.createGain();
    o.type = wave || song.wave || "sine";
    o.frequency.value = freq;
    f.type = "lowpass";
    f.frequency.value = 1400;
    g.gain.value = 0.0001;
    o.connect(f);
    f.connect(g);
    g.connect(bus);
    const t = ctx.currentTime;
    g.gain.exponentialRampToValueAtTime(vol || 0.08, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.start(t);
    o.stop(t + dur + 0.02);
  }

  function stopMusic() {
    if (musicTimer) {
      clearInterval(musicTimer);
      musicTimer = null;
    }
    musicStep = 0;
  }

  function startMusic() {
    stopMusic();
    if (state.musicOn === false) {
      musicBus();
      return;
    }
    const song = SONGS.find((s) => s.id === (state.musicId || "kettle")) || SONGS[0];
    if (!ensureAudio() || !musicBus()) return;
    const len = Math.max(16, (song.melody && song.melody.length) || 16);
    const stepMs = Math.max(180, 30000 / Math.max(40, song.bpm));
    musicStep = 0;
    if (state.musicPad !== false) {
      playNote(0, (stepMs * len) / 900, "sine", 0.03);
      playNote(7, (stepMs * len) / 1100, "sine", 0.022);
    }
    const tickSong = () => {
      if (state.musicOn === false) return;
      const i = musicStep % len;
      const mel = song.melody[i];
      const bass = song.bass[i];
      const spark = song.spark[i];
      if (mel != null) playNote(mel, stepMs / 700, song.wave, 0.09);
      if (bass != null) playNote(bass - 12, stepMs / 420, "sine", 0.07);
      if (spark != null && state.musicBells !== false) playNote(spark, stepMs / 900, "sine", 0.05);
      if (i === 0) {
        playNote(0, stepMs / 180, "sine", 0.035);
        if (state.musicPad !== false) {
          playNote(7, stepMs / 140, "sine", 0.02);
        }
      }
      musicStep += 1;
      if (state.musicShuffle && musicStep > 0 && musicStep % (len * 4) === 0) {
        const pool = SONGS.filter((s) => s.id !== song.id);
        const next = pool[Math.floor(Math.random() * pool.length)];
        if (next) {
          state.musicId = next.id;
          startMusic();
        }
      }
    };
    tickSong();
    musicTimer = setInterval(tickSong, stepMs);
  }

  function applyMotionPref() {
    document.body.classList.toggle("still", !!state.reduceMotion);
    document.body.classList.toggle("big-type", !!state.bigType);
    document.body.classList.toggle("always-names", !!state.showNames);
  }

  function openSettings() {
    const box = $("settings");
    if (!box) return;
    ensureAudio();
    startMusic();
    $("set-music").checked = state.musicOn !== false;
    $("set-music-vol").value = Math.round((state.musicVol == null ? 0.38 : state.musicVol) * 100);
    $("set-sfx").checked = !state.mute;
    $("set-sfx-vol").value = Math.round((state.sfxVol == null ? 0.55 : state.sfxVol) * 100);
    $("set-still").checked = !!state.reduceMotion;
    if ($("set-follow")) $("set-follow").value = state.musicFollow || "pick";
    if ($("set-pace")) $("set-pace").value = state.fightSpeed || "cozy";
    if ($("set-watch")) $("set-watch").checked = state.autoWatch !== false;
    if ($("set-dmg")) $("set-dmg").checked = state.showDmg !== false;
    if ($("set-names")) $("set-names").checked = !!state.showNames;
    if ($("set-type")) $("set-type").checked = !!state.bigType;
    if ($("set-kindle")) $("set-kindle").checked = state.confirmKindle !== false;
    if ($("set-shuffle")) $("set-shuffle").checked = !!state.musicShuffle;
    if ($("set-bells")) $("set-bells").checked = state.musicBells !== false;
    if ($("set-pad")) $("set-pad").checked = state.musicPad !== false;
    const songs = $("set-songs");
    songs.innerHTML = "";
    SONGS.forEach((s) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "song-btn" + (state.musicId === s.id ? " on" : "");
      btn.innerHTML = `<strong>${esc(s.name)}</strong><span>${esc(s.blurb)}</span>`;
      btn.addEventListener("click", () => {
        state.musicId = s.id;
        state.musicFollow = "pick";
        if ($("set-follow")) $("set-follow").value = "pick";
        state.musicOn = true;
        $("set-music").checked = true;
        startMusic();
        openSettings();
        save();
      });
      songs.appendChild(btn);
    });
    box.classList.remove("hidden");
  }

  function closeSettings() {
    if ($("settings")) $("settings").classList.add("hidden");
    save();
  }

  function openDesk() {
    document.body.classList.add("setup");
    document.body.classList.remove("play");
  }

  function closeDesk() {
    document.body.classList.remove("setup");
    document.body.classList.add("play");
  }

  function setTab(id) {
    document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("on", t.dataset.tab === id));
    document.querySelectorAll(".tab-page").forEach((p) => p.classList.toggle("hidden", p.id !== "tab-" + id));
  }

  function setScene(scene) {
    state.scene = scene;
    syncFollowMusic();
    renderWorld();
  }

  function renderHud() {
    $("hero-name").textContent = state.name;
    $("level-num").textContent = state.level;
    $("day-num").textContent = state.day;
    if ($("season-name")) $("season-name").textContent = SEASON_LABEL[seasonId()];
    if ($("rank-name")) $("rank-name").textContent = villageRank().name;
    if ($("weather-name")) $("weather-name").textContent = isFestival() ? "festival" : (state.weather || "sunny");
    document.body.classList.toggle("festival", isFestival());
    if ($("fest-pill")) $("fest-pill").textContent = isFestival() ? (SEASON_LABEL[seasonId()] + " feast") : "";
    const dot = $("mail-dot");
    if (dot) dot.classList.toggle("hidden", unreadMail().length === 0);
    $("gold").textContent = fmt(state.gold);
    const need = xpNeeded(state.level);
    $("xp-label").textContent = Math.floor(state.xp) + " / " + need;
    $("xp-fill").style.width = Math.min(100, (state.xp / need) * 100) + "%";
    const hp = partyHp();
    const mx = partyMaxHp();
    $("hp-label").textContent = hp + " / " + mx;
    $("hp-fill").style.width = (mx ? Math.min(100, (hp / mx) * 100) : 0) + "%";
    $("hp-pill").classList.toggle("hurt", mx && hp / mx < 0.4);
    $("btn-mute").classList.toggle("muted", !!state.mute);
    const tag = $("paragon-tag");
    if (tag) {
      const k = para().kindles || 0;
      tag.textContent = "P" + k;
      tag.classList.toggle("hidden", k <= 0);
      tag.title = k ? (k + " kindles · " + (para().points || 0) + " unspent") : "";
    }
  }

  function renderFoeStage() {
    const stage = $("foe-stage");
    if (!stage) return;
    const f = state.fight;
    if (!f) {
      stage.classList.add("hidden");
      stage.innerHTML = "";
      return;
    }
    stage.classList.remove("hidden");
    stage.classList.toggle("keeper", !!f.keeper);
    const pct = f.foeMax ? Math.min(100, (f.foeHp / f.foeMax) * 100) : 0;
    const key = f.foeId + "|" + f.name;
    if (stage.dataset.foe === key && stage.querySelector(".mini-hp span")) {
      stage.querySelector(".mini-hp span").style.width = pct + "%";
      return;
    }
    stage.dataset.foe = key;
    stage.innerHTML = `<div class="foe-sprite">${sprite(f.art)}</div><div class="mini-hp"><span style="width:${pct}%"></span></div><strong>${esc(f.name)}</strong>`;
  }

  function renderFight() {
    const box = $("fight");
    const f = state.fight;
    document.body.classList.toggle("watching-fight", !!f);
    if ($("world")) $("world").classList.toggle("fighting", !!f);
    renderFoeStage();
    if (!f) {
      box.classList.add("hidden");
      return;
    }
    box.classList.remove("hidden");
    $("fight-art").innerHTML = sprite(f.art);
    box.classList.toggle("keeper", !!f.keeper);
    $("fight-name").textContent = f.name;
    $("fight-foe-hp").style.width = (f.foeMax ? Math.min(100, (f.foeHp / f.foeMax) * 100) : 0) + "%";
    $("fight-log").textContent = f.log;
  }

  function renderWorld() {
    const trail = trailById(state.trail);
    const scene = state.scene === "town" ? "town" : state.scene === "mill" ? "mill" : state.scene === "library" ? "library" : trail.art;
    $("world").className = "world painted scene-" + scene + " season-" + seasonId() + " wx-" + (state.weather || "sunny") + " tod-" + todId() + ((state.riteLeft || 0) > 0 ? " rite-on" : "") + (trail.far ? " far-path" : "") + (state.fight ? " fighting" : "");
    syncSceneVideo();
    renderWeather();
    const left = Math.max(0, (1 - state.progress) * trailDuration(trail));
    $("trail-name").textContent = state.fight
      ? (state.fight.name + " on the path")
      : state.scene === "town" ? "Idle-Cozy-Rpg" : trail.name;
    $("trail-sub").textContent = state.fight
      ? "watch the party · " + (state.fight.log || "they bowed first")
      : state.scene === "town"
        ? "the party is out on " + trail.name.toLowerCase()
        : state.scene === "mill"
          ? "flour on the wind · the wheel turning"
          : state.scene === "library"
            ? "the shelves lean in if you whisper"
            : trailDiffName(trailDiff(trail)) + " · back in " + Math.max(1, Math.ceil(left / 1000)) + "s";
    $("trail-fill").style.width = Math.min(100, state.progress * 100) + "%";
    const echoN = echoOf(trail.id);
    $("world-note").textContent = isFestival()
      ? "Festival day. The square set an extra plate."
      : state.scene === "town"
        ? ((state.riteLeft || 0) ? "A porch rite is burning · " + state.riteLeft + " loops." : "Lanterns, a stall, and a path that always leads back.")
        : (state.walks[trail.id] || 0) + " loops" + (echoN ? " · echo " + echoN : "") + ((state.streak && state.streak.id === trail.id && state.streak.n > 1) ? " · streak " + state.streak.n : "") + ".";

    const walk = $("walkers");
    walk.innerHTML = "";
    state.party.forEach((id) => {
      const el = document.createElement("div");
      el.className = "walker" + (curHp(id) <= 0 ? " down" : "");
      el.dataset.id = id;
      el.title = memberName(id) + " " + curHp(id) + "/" + maxHp(id);
      const pct = maxHp(id) ? (curHp(id) / maxHp(id)) * 100 : 0;
      el.innerHTML = sprite(memberArt(id)) + `<span class="mini-hp"><span style="width:${pct}%"></span></span><span class="dust"></span><span class="who">${esc(memberName(id))}</span>`;
      el.style.pointerEvents = "auto";
      el.style.cursor = "pointer";
      el.addEventListener("click", () => talkTo(id));
      walk.appendChild(el);
    });
    if (state.pet) {
      const pet = PETS.find((p) => p.id === state.pet);
      if (pet) {
        const el = document.createElement("div");
        el.className = "walker pet";
        el.title = pet.name;
        el.innerHTML = sprite(pet.art);
        walk.appendChild(el);
      }
    }
    renderDecor();
    renderForage();

    const spots = $("hotspots");
    spots.innerHTML = "";
    const millOpen = millUnlocked();
    const hot = state.scene === "town"
      ? [
          { label: "Inn", x: "8%", y: "30%", w: "22%", h: "34%", tab: "town", npc: "maren" },
          { label: "Stall", x: "32%", y: "48%", w: "16%", h: "22%", tab: "town" },
          { label: "Trail", x: "44%", y: "24%", w: "18%", h: "26%", scene: "trail" },
          { label: "Willow", x: "58%", y: "48%", w: "18%", h: "28%", tab: "pack" },
          { label: "Post", x: "76%", y: "34%", w: "16%", h: "24%", tab: "town", npc: "wren" },
        ].concat(millOpen ? [{ label: "Mill", x: "54%", y: "20%", w: "16%", h: "14%", scene: "mill", high: true }] : [])
          .concat(libraryUnlocked() ? [{ label: "Library", x: "28%", y: "20%", w: "16%", h: "14%", scene: "library", high: true }] : [])
      : state.scene === "mill"
        ? [
            { label: "Wheel", x: "18%", y: "32%", w: "24%", h: "32%", tab: "town", npc: "bram" },
            { label: "Town", chip: "left", scene: "town" },
            { label: "Trail", chip: "right", scene: "trail" },
          ]
      : state.scene === "library"
        ? [
            { label: "Iris", x: "38%", y: "34%", w: "24%", h: "28%", tab: "town", npc: "iris" },
            { label: "Town", chip: "left", scene: "town" },
            { label: "Trail", chip: "right", scene: "trail" },
          ]
      : [
          { label: "Town", chip: "left", scene: "town" },
          { label: "Hearts", chip: "right", tab: "fight" },
        ];
    hot.forEach((h) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "hot" + (h.chip ? " nav-chip nav-" + h.chip : "") + (h.high ? " high" : "");
      if (!h.chip) {
        btn.style.left = h.x;
        btn.style.top = h.y;
        btn.style.width = h.w;
        btn.style.height = h.h;
      }
      btn.innerHTML = `<span class="tag">${esc(h.label)}</span>`;
      btn.addEventListener("click", () => {
        if (h.scene) setScene(h.scene);
        if (h.tab) {
          openDesk();
          setTab(h.tab);
          if (h.npc) visitNpc(NPCS.find((n) => n.id === h.npc));
        }
      });
      spots.appendChild(btn);
    });
  }

  function openTrails() {
    openDesk();
    setTab("trails");
    const el = $("trails");
    if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function nextOpenTrail() {
    const open = allTrails().filter((t) => state.level >= t.level);
    if (!open.length) return TRAILS[0];
    const i = open.findIndex((t) => t.id === state.trail);
    return open[(i + 1) % open.length];
  }

  function pickTrail(t) {
    if (state.fight) {
      toast("Finish the scuffle first.");
      return;
    }
    if (state.level < t.level) {
      toast(t.name + " opens at level " + t.level + ".");
      return;
    }
    const already = state.trail === t.id;
    state.trail = t.id;
    state.progress = 0;
    state.scene = "trail";
    if (already) state.focus = t.id;
    syncFollowMusic();
    toast(already ? (t.name + " is your focus. Extra lessons here.") : ("The party turns toward " + t.name + "."));
    renderTrails();
    renderWorld();
    save();
  }

  function renderTrails() {
    const box = $("trails");
    if (!box) return;
    box.innerHTML = "";
    const list = allTrails();
    const open = list.filter((t) => state.level >= t.level);
    const locked = list.filter((t) => state.level < t.level).slice(0, 8);
    const sub = $("trails-sub");
    if (sub) {
      const nxt = locked[0];
      sub.textContent = open.length + " paths open now. "
        + (nxt ? ("Next: " + nxt.name + " at lv " + nxt.level + ".") : "The Farther Paths keep coming as you level.");
    }
    const nextBtn = $("btn-next-trail");
    if (nextBtn) {
      const n = nextOpenTrail();
      nextBtn.textContent = n && n.id !== state.trail ? ("Next: " + n.name) : "Next path";
    }
    const addHead = (text) => {
      const h = document.createElement("p");
      h.className = "trails-head";
      h.textContent = text;
      box.appendChild(h);
    };
    const addRow = (t, isLocked) => {
      const row = document.createElement("div");
      row.className = "row" + (state.trail === t.id ? " on" : "") + (isLocked ? " locked" : "");
      const walks = state.walks[t.id] || 0;
      const echo = echoOf(t.id);
      const studied = !!(para().codex && para().codex[t.id]);
      const focus = state.focus === t.id;
      const diff = trailDiffName(trailDiff(t));
      const extra = isLocked ? "" : (" · " + walks + " loops" + (echo ? " · echo " + echo : "") + (studied ? " · studied" : "") + (focus ? " · focus" : ""));
      row.innerHTML = `<span class="thumb" style="display:grid;place-items:center;font-size:22px;border-radius:12px">${t.icon}</span><div><h3>${esc(t.name)}</h3><p>${isLocked ? "Opens at lv " + t.level + " · " + diff : esc(t.hint) + " · " + diff + extra}</p></div><button class="buy-btn" ${isLocked ? "disabled" : ""}>${state.trail === t.id ? "walking" : "ramble"}</button>`;
      row.querySelector("button").addEventListener("click", () => pickTrail(t));
      box.appendChild(row);
    };
    addHead("Open now — tap Ramble");
    open.forEach((t) => addRow(t, false));
    if (locked.length) {
      addHead("More trails — unlock as you level");
      locked.forEach((t) => addRow(t, true));
    }
  }

  function renderParty() {
    const box = $("party");
    box.innerHTML = "";
    PARTY.forEach((m) => {
      const inParty = state.party.includes(m.id);
      const need = memberNeed(m);
      const cost = memberCost(m);
      const locked = state.level < need;
      const row = document.createElement("div");
      row.className = "row" + (inParty ? " on" : "") + (locked && !inParty ? " locked" : "");
      let label = inParty ? "gift" : fmt(cost);
      if (m.id === "hero") label = classBy().name;
      const role = m.id === "hero" ? classBy().name : m.role;
      const bond = inParty && m.id !== "hero" ? " · ♥" + bondOf(m.id) : "";
      row.innerHTML = `<span class="thumb">${sprite(m.id === "hero" ? heroArt() : m.art)}</span><div><h3>${m.id === "hero" ? esc(state.name) : esc(m.name)}</h3><p>${esc(role)} · ${m.id === "hero" ? esc(classBy().blurb) : esc(m.blurb)}${bond}</p></div><button class="buy-btn" ${(!inParty && (locked || state.gold < cost)) ? "disabled" : ""}>${locked && !inParty ? "lv " + need : label}</button>`;
      const btn = row.querySelector("button");
      if (m.id === "hero") {
        btn.disabled = false;
        btn.textContent = "rename";
        btn.addEventListener("click", () => {
          const next = prompt("What does the valley call you?", state.name);
          if (!next) return;
          state.name = next.trim().slice(0, 24) || state.name;
          renderHud();
          renderParty();
          save();
        });
      } else if (!inParty) {
        btn.addEventListener("click", () => {
          if (locked || !spend(memberCost(m))) return;
          state.party.push(m.id);
          setHp(m.id, maxHp(m.id));
          note(m.name + " packed a tiny bag and came along.");
          toast(m.name + " joined the ramble.");
          checkStory(false);
          renderParty();
          renderWorld();
          renderVitals();
          renderHud();
          save();
        });
      } else {
        btn.addEventListener("click", () => giftCompanion(m.id));
      }
      box.appendChild(row);
    });
  }

  function talkTo(id) {
    const lines = TALKS[id] || TALKS.hero;
    const who = memberName(id);
    const art = memberArt(id);
    const port = $("modal-portrait");
    port.classList.remove("hidden");
    port.innerHTML = sprite(art);
    showModal(who, pick(lines), "Mm.");
    const w = document.querySelector('.walker[data-id="' + id + '"]');
    if (w) punch(w, "talk");
    if (id !== "hero") {
      if (!state.bonds) state.bonds = {};
      state.bonds[id] = Math.min(40, bondOf(id) + 1);
    }
    bumpErrand("npc", 1);
    save();
  }

  function donateMuseum(id) {
    if (!state.museum) state.museum = {};
    if (state.museum[id]) return;
    if (!takePack(id, 1)) {
      toast("You do not have a " + itemName(id) + " to give.");
      return;
    }
    state.museum[id] = true;
    note("Iris shelved the " + itemName(id) + ".");
    toast("The cabinet accepted the " + itemName(id) + ".");
    checkStory(false);
    renderMuseum();
    renderPack();
    renderHud();
    save();
  }

  function giftCompanion(id) {
    const favs = FAVORITES[id] || ["biscuit"];
    const have = Object.keys(state.pack || {}).filter((item) => packCount(item) > 0);
    if (!have.length) {
      toast("The satchel is too empty to gift.");
      return;
    }
    const pickItem = have.find((item) => favs.includes(item)) || have[0];
    if (!takePack(pickItem, 1)) return;
    const liked = favs.includes(pickItem);
    const gain = liked ? 6 : 3;
    if (!state.bonds) state.bonds = {};
    state.bonds[id] = Math.min(40, bondOf(id) + gain);
    state.gaveGift = true;
    bumpErrand("gift", 1);
    toast(memberName(id) + (liked ? " lit up at the " : " accepted the ") + itemName(pickItem) + ". +" + gain + " ♥");
    checkStory(false);
    renderParty();
    renderPack();
    save();
  }

  function campTillMorning() {
    if (state.fight) {
      toast("Finish the scuffle first.");
      return;
    }
    state.dayAt -= DAY_MS;
    tickDay(Date.now());
    fullHeal();
    toast("The fire went small. Morning arrived politely.");
    note("You camped until the kettle of the sky whistled.");
    renderAll();
    save();
  }

  function renderCrafts() {
    const box = $("crafts");
    if (!box) return;
    box.innerHTML = "";
    CRAFTS.forEach((c) => {
      const have = Object.keys(c.needs).every((id) => packCount(id) >= c.needs[id]);
      const needTxt = Object.keys(c.needs).map((id) => c.needs[id] + " " + itemName(id)).join(", ");
      const owned = c.gear && state.ownedGear.includes(c.gear);
      const row = document.createElement("div");
      row.className = "row";
      row.innerHTML = `<span class="thumb" style="display:grid;place-items:center;font-size:22px;border-radius:12px">🔨</span><div><h3>${esc(c.name)}</h3><p>${owned ? "already made" : esc(needTxt)}</p></div><button class="buy-btn" ${have && !owned ? "" : "disabled"}>${owned ? "done" : "make"}</button>`;
      row.querySelector("button").addEventListener("click", () => {
        if (owned) return;
        if (!Object.keys(c.needs).every((id) => takePack(id, c.needs[id]))) return;
        if (c.gear) {
          if (!state.ownedGear.includes(c.gear)) state.ownedGear.push(c.gear);
        }
        if (c.item) addPack(c.item, c.n || 1);
        toast(c.say);
        bumpErrand("cook", 1);
        tone(392, 0.1, "sine", 0.04);
        renderCrafts();
        renderPack();
        renderGear();
        save();
      });
      box.appendChild(row);
    });
  }

  function renderGear() {
    const box = $("gear");
    box.innerHTML = "";
    ["weapon", "hat", "cloak", "boots", "charm"].forEach((slot) => {
      GEAR.filter((g) => g.slot === slot).forEach((g) => {
        const owned = state.ownedGear.includes(g.id);
        if (!owned && g.cost === 0 && !g.start) return;
        const worn = state.gear[slot] === g.id;
        const locked = state.level < g.level;
        const row = document.createElement("div");
        row.className = "row" + (worn ? " on" : "");
        let label = worn ? "wearing" : owned ? "wear" : fmt(g.cost);
        if (locked && !owned) label = "lv " + g.level;
        const tem = temperOf(g.id);
        const extra = (g.atk ? " · +" + g.atk + " atk" : "") + (tem ? " · temper " + tem : "");
        row.innerHTML = `<span class="thumb" style="display:grid;place-items:center;font-size:20px;border-radius:12px">${slot === "hat" ? "🎩" : slot === "cloak" ? "🧥" : slot === "boots" ? "🥾" : slot === "weapon" ? "🪵" : "🔮"}</span><div><h3>${esc(g.name)}</h3><p>${esc(g.blurb)}${extra}</p></div><button class="buy-btn" ${worn || (locked && !owned) || (!owned && state.gold < g.cost) ? "disabled" : ""}>${label}</button>`;
        row.querySelector("button").addEventListener("click", () => {
          if (worn) return;
          if (!owned) {
            if (locked || !spend(g.cost)) return;
            state.ownedGear.push(g.id);
            toast("Yours now: " + g.name + ".");
          }
          state.gear[slot] = g.id;
          renderGear();
          renderHud();
          save();
        });
        box.appendChild(row);
      });
    });
  }

  function renderClassBox() {
    const box = $("class-box");
    const c = classBy();
    box.innerHTML = "";
    const row = document.createElement("div");
    row.className = "row on";
    row.innerHTML = `<span class="thumb">${sprite(c.art)}</span><div><h3>${esc(c.name)}</h3><p>${esc(c.skill)}</p></div><button class="buy-btn">retrain · 40</button>`;
    row.querySelector("button").addEventListener("click", () => showClassPicker(false));
    box.appendChild(row);
  }

  function renderVitals() {
    const box = $("vitals");
    if (!box) return;
    box.innerHTML = "";
    state.party.forEach((id) => {
      const st = combatStats(id);
      const row = document.createElement("div");
      row.className = "row";
      const form = formOf(id);
      const formBtn = id === "hero" ? "" : `<button class="buy-btn" data-form="1">${form}</button>`;
      row.innerHTML = `<span class="thumb">${sprite(memberArt(id))}</span><div><h3>${esc(memberName(id))}</h3><p>♥ ${curHp(id)}/${st.hp} · atk ${st.atk} · def ${st.def}${st.pierce ? " · pierce " + st.pierce : ""} · ${form}</p></div><div class="desk-quick">${formBtn}<button class="buy-btn" data-heal="1" ${packCount("biscuit") ? "" : "disabled"}>heal</button></div>`;
      row.querySelector("[data-heal]").addEventListener("click", () => useHealItem("biscuit", id));
      const fb = row.querySelector("[data-form]");
      if (fb) fb.addEventListener("click", () => { toggleForm(id); renderVitals(); renderWorld(); save(); });
      box.appendChild(row);
    });
  }

  function useHealItem(item, id) {
    const spec = ITEMS[item];
    if (!spec || !spec.heal) return;
    if (partyHp() >= partyMaxHp()) {
      toast("Already warm enough.");
      return;
    }
    if (!takePack(item, 1)) {
      toast("No " + itemName(item) + " left.");
      return;
    }
    const amt = spec.heal + (state.classId === "cook" ? Math.ceil(spec.heal * 0.25) : 0);
    const got = id ? healMember(id, amt) : healLowest(amt);
    toast("+" + got + " hearts from " + itemName(item) + ".");
    puffHeart($("hp-pill"));
    floatDmg("+" + got, $("hp-pill"), true);
    renderVitals();
    renderHud();
    renderWorld();
    renderPack();
    save();
  }

  function innRest() {
    if (partyHp() >= partyMaxHp()) {
      toast("Already warm enough.");
      return;
    }
    if (!spend(8)) {
      toast("Maren wants 8 coins for a bed.");
      return;
    }
    fullHeal();
    toast("The inn quilt did the rest.");
    renderVitals();
    renderHud();
    renderWorld();
    save();
  }

  function renderPack() {
    const box = $("pack");
    const ids = Object.keys(state.pack).filter((id) => packCount(id) > 0);
    if (!ids.length) {
      box.innerHTML = `<p class="sub" style="margin:0;color:#5c5146">The satchel is politely empty. The trails will fill it.</p>`;
      return;
    }
    box.innerHTML = "";
    ids.forEach((id) => {
      const el = document.createElement("button");
      el.className = "seed";
      el.type = "button";
      const heal = ITEMS[id] && ITEMS[id].heal ? " · heal " + ITEMS[id].heal : "";
      el.innerHTML = `<span class="thumb">${itemThumb(id)}</span><span class="meta"><span class="name">${esc(itemName(id))} × ${packCount(id)}</span><span class="sub">stall ${stallRange(id)}${heal}</span></span>`;
      el.addEventListener("click", () => {
        if (ITEMS[id] && ITEMS[id].heal && partyHp() < partyMaxHp()) {
          useHealItem(id);
          return;
        }
        if (!takePack(id, 1)) return;
        addGold(stallPay(id, 1), el);
        renderPack();
        renderRecipes();
        renderNeighbors();
        save();
      });
      box.appendChild(el);
    });
  }

  function renderRecipes() {
    const box = $("recipes");
    box.innerHTML = "";
    RECIPES.forEach((r) => {
      const have = Object.keys(r.needs).every((id) => packCount(id) >= r.needs[id]);
      const needTxt = Object.keys(r.needs).map((id) => r.needs[id] + " " + itemName(id)).join(", ");
      const row = document.createElement("div");
      row.className = "row";
      row.innerHTML = `<span class="thumb" style="display:grid;place-items:center;font-size:22px;border-radius:12px">${itemIcon(r.id)}</span><div><h3>${esc(r.name)}</h3><p>${esc(needTxt)}${r.loops ? " · " + r.loops + " loops of comfort" : r.id === "oil" ? " · for the sconce" : " · a salve"}</p></div><button class="buy-btn" ${have ? "" : "disabled"}>cook</button>`;
      row.querySelector("button").addEventListener("click", () => {
        if (!Object.keys(r.needs).every((id) => takePack(id, r.needs[id]))) return;
        addPack(r.id, 1);
        if (r.loops) state.buffs.push({ id: r.id, left: r.loops, gold: r.gold, xp: r.xp });
        toast(r.say);
        bumpErrand("cook", 1);
        if (r.id === "oil") bumpErrand("oil", 1);
        tone(392, 0.12, "sine", 0.04);
        renderPack();
        renderRecipes();
        save();
      });
      box.appendChild(row);
    });
  }

  function renderNeighbors() {
    const box = $("neighbors");
    box.innerHTML = "";
    NPCS.forEach((npc) => {
      const q = currentQuest(npc);
      const hearts = state.hearts[npc.id] || 0;
      const done = state.questDoneDay[npc.id] === farmDay();
      const card = document.createElement("article");
      card.className = "npc-card";
      const want = q.kind === "walk"
        ? trailById(q.trail).name + " " + Math.min(q.n, Math.max(0, walkProgress(npc, q))) + "/" + q.n
        : "Give " + q.n;
      card.innerHTML = `<div class="port">${sprite(npc.art)}</div><div><h3>${esc(npc.name)} <span class="hearts">${"♥".repeat(hearts)}${"♡".repeat(Math.max(0, 5 - hearts))}</span></h3><p>${done ? "That's plenty for today. Sit a minute." : esc(q.say)}</p><button class="buy-btn" type="button">${done ? "Talk" : esc(want)}</button></div>`;
      card.querySelector("button").addEventListener("click", () => visitNpc(npc));
      box.appendChild(card);
    });
  }

  function visitNpc(npc) {
    if (!npc) return;
    bumpErrand("npc", 1);
    const q = currentQuest(npc);
    const done = state.questDoneDay[npc.id] === farmDay();
    const port = $("modal-portrait");
    port.classList.remove("hidden");
    port.innerHTML = sprite(npc.art);
    const chat = pick(npc.chat);
    if (done) {
      showModal(npc.name, chat + "\n\n" + npc.role[0].toUpperCase() + npc.role.slice(1) + ".", "Goodbye");
      return;
    }
    showModal(npc.name, chat + "\n\n" + q.say + "\n\nA penny profit of " + profitRange(q.pay + (q.kind === "item" ? lootValue(Array(q.n).fill(q.item)) : 0)) + ".", "Not yet");
    const extra = document.createElement("button");
    extra.className = "primary-btn";
    extra.textContent = q.kind === "walk" ? "I've walked it" : "Give " + q.n + " " + itemName(q.item);
    extra.disabled = !questReady(npc);
    extra.addEventListener("click", () => {
      if (!completeQuest(npc)) return;
      hideModal();
      toast(npc.name + " tucked the gift away like treasure.");
      renderPack();
      renderNeighbors();
      save();
    });
    $("modal-actions").appendChild(extra);
  }

  function renderShop() {
    const box = $("shop");
    box.innerHTML = "";
    const goods = [
      { title: "Inn stew", body: "Maren fills a bowl. The next two loops lean toward a 5% penny profit.", cost: 14, run: () => { state.buffs.push({ id: "inn", left: 2, gold: 0.22, xp: 0 }); toast("Warm all the way down."); } },
      { title: "Ask for a story", body: "Quill tells you where the next trail bends. +8 xp.", cost: 10, run: () => { addXp(8); toast("The map in your head grows a crease."); } },
      { title: "Boot polish", body: "Cob hums while she works. The next two loops hurry a little.", cost: 18, run: () => { state.buffs.push({ id: "polish", left: 2, gold: 0.05, xp: 0, speed: 0.12 }); toast("The boots look proud."); } },
      { title: "Pocket biscuits", body: "A tin of three. For scuffles and crumbs.", cost: 10, run: () => { addPack("biscuit", 3); toast("Crumbs secured."); renderPack(); } },
      { title: "Sack of flour", body: "Bram's extra. Two handfuls for a loaf.", cost: 12, run: () => { addPack("flour", 2); toast("The sack sighed flour."); renderPack(); } },
    ];
    if (todId() === "dusk" || todId() === "night") {
      goods.push({
        title: "Night stall",
        body: "A lantern vendor who only works when the sky agrees.",
        cost: 15,
        run: () => { addPack("glowbug", 1); addPack("tea", 1); toast("The stall packed itself into a glow."); renderPack(); },
      });
    }
    if (isFestival()) {
      goods.unshift({
        title: "Festival tart",
        body: "The square baked extra. +18 xp and a full kettle of hearts.",
        cost: 16,
        run: () => { addXp(18); fullHeal(); toast("Sugar, then courage."); },
      });
    }
    goods.forEach((g) => {
      const row = document.createElement("div");
      row.className = "row";
      row.innerHTML = `<span class="thumb" style="display:grid;place-items:center;font-size:22px;border-radius:12px">🧺</span><div><h3>${esc(g.title)}</h3><p>${esc(g.body)}</p></div><button class="buy-btn" ${state.gold < g.cost ? "disabled" : ""}>${fmt(g.cost)}</button>`;
      row.querySelector("button").addEventListener("click", () => {
        if (!spend(g.cost)) return;
        g.run();
        renderShop();
        save();
      });
      box.appendChild(row);
    });
  }

  function renderJournal() {
    const box = $("journal");
    $("journal-sub").textContent = classBy().name + " · lv " + state.level + " · " + Object.values(state.walks).reduce((a, b) => a + b, 0) + " loops";
    if (!state.journal.length) {
      box.innerHTML = `<p class="sub" style="margin:0;color:#5c5146">The first page is still warm.</p>`;
    } else {
      box.innerHTML = state.journal.map((j) => {
        const d = new Date(j.t);
        return `<div class="journal-item"><em>${d.toLocaleString()}</em>${esc(j.text)}</div>`;
      }).join("");
    }
    const be = $("bestiary");
    if (!be) return;
    const ids = Object.keys(FOES).filter((id) => state.seen[id]);
    if (!ids.length) {
      be.innerHTML = `<p class="sub" style="margin:0;color:#5c5146">No nods yet. The meadow will introduce you.</p>`;
      return;
    }
    be.innerHTML = "";
    ids.forEach((id) => {
      const f = FOES[id];
      const s = state.seen[id];
      const el = document.createElement("div");
      el.className = "be-card";
      el.innerHTML = `<div class="thumb">${sprite(f.art)}</div><strong>${esc(f.name)}</strong><span>${s.meets} meets · ${s.wins} sits</span>`;
      be.appendChild(el);
    });
  }

  function renderProfiles() {
    const box = $("profiles");
    const idx = loadIndex();
    box.innerHTML = "";
    idx.list.forEach((p) => {
      const row = document.createElement("div");
      row.className = "profile-row" + (p.id === idx.active ? " on" : "");
      row.innerHTML = `<div><strong>${esc(p.name)}</strong><span>${p.id === idx.active ? "the fire that's lit" : "asleep in another valley"}</span></div><button class="buy-btn" ${p.id === idx.active ? "disabled" : ""}>open</button><button class="buy-btn" data-del="1">forget</button>`;
      const [openBtn, delBtn] = row.querySelectorAll("button");
      openBtn.addEventListener("click", () => switchProfile(p.id));
      delBtn.addEventListener("click", () => deleteProfile(p.id));
      box.appendChild(row);
    });
  }

  function switchProfile(id) {
    save();
    const idx = loadIndex();
    idx.active = id;
    saveIndex(idx);
    load();
    catchUp();
    renderAll();
    toast("Another kettle, another name.");
  }

  function deleteProfile(id) {
    const idx = loadIndex();
    if (idx.list.length < 2) {
      toast("Keep at least one hearth.");
      return;
    }
    if (!confirm("Forget this hearth?")) return;
    localStorage.removeItem(slotKey(id));
    idx.list = idx.list.filter((p) => p.id !== id);
    if (idx.active === id) idx.active = idx.list[0].id;
    saveIndex(idx);
    load();
    renderAll();
  }

  function renderDebug() {
    const box = $("debug");
    box.innerHTML = "";
    [
      { label: "+25¢", run: () => addGold(0.25) },
      { label: "+1 level", run: () => { state.xp = xpNeeded(state.level); addXp(0); } },
      { label: "finish loop", run: () => { if (!state.fight) state.progress = 1; } },
      { label: "full heal", run: () => fullHeal() },
      { label: "+1 day", run: () => { state.dayAt -= DAY_MS; tickDay(Date.now()); } },
      { label: "fill pack", run: () => { Object.keys(ITEMS).forEach((id) => addPack(id, 3)); } },
      { label: "+1 paragon", run: () => { para().points = (para().points || 0) + 1; toast("The lantern ticked."); } },
      { label: "ready kindle", run: () => { state.level = Math.max(state.level, 12); } },
      { label: "+oil", run: () => addPack("oil", 3) },
      { label: "+pages", run: () => addPack("page", 4) },
    ].forEach((c) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = c.label;
      b.addEventListener("click", () => { c.run(); renderAll(); save(); });
      box.appendChild(b);
    });
  }

  function renderForage() {
    const layer = $("forage-layer");
    if (!layer) return;
    rollForage();
    layer.innerHTML = "";
    (state.forage || []).forEach((spot) => {
      if (spot.taken) return;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "forage-spot";
      btn.style.left = spot.x + "%";
      btn.style.top = spot.y + "%";
      btn.title = itemName(spot.item);
      btn.innerHTML = itemThumb(spot.item);
      btn.addEventListener("click", () => {
        if (spot.taken) return;
        spot.taken = true;
        addPack(spot.item, 1);
        puff(itemIcon(spot.item), btn);
        toast("Picked up " + itemName(spot.item) + ".");
        bumpErrand("forage", 1);
        if (state.autosell && state.autosell[spot.item] && ITEMS[spot.item] && !ITEMS[spot.item].heal) {
          takePack(spot.item, 1);
          addGold(stallPay(spot.item, 1));
        }
        renderForage();
        renderPack();
        save();
      });
      layer.appendChild(btn);
    });
  }

  function renderPets() {
    const box = $("pets");
    if (!box) return;
    box.innerHTML = "";
    PETS.forEach((p) => {
      const mine = state.pet === p.id;
      const locked = state.level < p.level;
      const row = document.createElement("div");
      row.className = "row" + (mine ? " on" : "");
      row.innerHTML = `<span class="thumb">${sprite(p.art)}</span><div><h3>${esc(p.name)}</h3><p>${esc(p.blurb)}</p></div><button class="buy-btn" ${mine || locked || state.gold < p.cost ? "disabled" : ""}>${mine ? "home" : locked ? "lv " + p.level : fmt(p.cost)}</button>`;
      row.querySelector("button").addEventListener("click", () => {
        if (mine || locked || !spend(p.cost)) return;
        state.pet = p.id;
        note(p.name + " chose the hearth.");
        toast(p.name + " followed you home.");
        checkStory(false);
        renderPets();
        renderWorld();
        renderHud();
        save();
      });
      box.appendChild(row);
    });
  }

  function renderStory() {
    const box = $("story");
    if (!box) return;
    const done = STORY.filter((ch) => state.story && state.story[ch.id]);
    if (!done.length) {
      box.innerHTML = `<p class="sub" style="margin:0;color:#5c5146">The first chapter is still being walked.</p>`;
      return;
    }
    box.innerHTML = done.map((ch) => `<div class="journal-item"><em>${esc(ch.title)}</em>${esc(ch.text)}</div>`).join("");
  }

  function renderStamps() {
    const box = $("stamps");
    if (!box) return;
    box.innerHTML = "";
    STAMPS.forEach((st) => {
      const on = st.test(state);
      const el = document.createElement("div");
      el.className = "be-card";
      el.style.opacity = on ? "1" : "0.4";
      el.innerHTML = `<div class="thumb" style="display:grid;place-items:center;font-size:26px;background:#efe2c4">${st.icon}</div><strong>${esc(st.name)}</strong><span>${on ? "kept" : "waiting"}</span>`;
      box.appendChild(el);
    });
  }

  function syncSceneVideo() {
    const v = $("scene-loop");
    const world = $("world");
    if (!v || !world) return;
    let src = "";
    if (state.scene === "town" && todId() === "night") src = "assets/town-night-loop.mp4";
    else if (state.scene === "mill") src = "assets/mill-loop.mp4";
    else if (state.scene === "trail" && trailById(state.trail).art === "brook") src = "assets/brook-loop.mp4";
    else if (state.scene === "trail" && trailById(state.trail).art === "dusk") src = "assets/dusk-loop.mp4";
    const on = !!src;
    world.classList.toggle("live-video", on);
    if (on && v.dataset.src !== src) {
      v.dataset.src = src;
      v.src = src;
    }
    if (on) {
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    } else {
      v.pause();
    }
    const fade = $("scene-fade");
    const key = (state.scene || "") + "|" + seasonId() + "|" + todId() + "|" + (state.weather || "");
    if (fade && fade.dataset.scene !== key) {
      fade.dataset.scene = key;
      fade.classList.add("on");
      setTimeout(() => fade.classList.remove("on"), 420);
    }
  }

  function burstLevel() {
    const fx = $("fx");
    if (!fx) return;
    const n = document.createElement("div");
    n.className = "fx-level";
    n.innerHTML = sprite("levelup");
    n.style.left = "50%";
    n.style.top = "42%";
    fx.appendChild(n);
    setTimeout(() => n.remove(), 1100);
  }

  function renderDecor() {
    const layer = $("decor-layer");
    if (!layer) return;
    layer.innerHTML = "";
    const hang = (state.cottage && state.cottage.porch) || todId() === "night" || ["woods", "hollow", "springs", "harbor", "dusk"].indexOf(trailById(state.trail).art) >= 0;
    const moths = trailById(state.trail).art === "dusk" || todId() === "night" || todId() === "dusk" || !!(state.cottage && state.cottage.sconce) || (state.riteLeft || 0) > 0;
    if (moths) {
      [[18, 30], [62, 24], [40, 42], [78, 36]].forEach((xy, i) => {
        const m = document.createElement("div");
        m.className = "dusk-moth";
        m.style.left = xy[0] + "%";
        m.style.top = xy[1] + "%";
        m.style.animationDelay = (-i * 1.8) + "s";
        m.innerHTML = sprite("moth");
        layer.appendChild(m);
      });
    }
    if (isFestival()) {
      const bunt = document.createElement("div");
      bunt.className = "decor-bunting";
      layer.appendChild(bunt);
    }
    if (seasonId() === "spring" || seasonId() === "summer") {
      [[22, 36], [68, 28], [44, 48]].forEach((xy, i) => {
        const b = document.createElement("div");
        b.className = "butterfly";
        b.style.left = xy[0] + "%";
        b.style.top = xy[1] + "%";
        b.style.animationDelay = (-i * 2.2) + "s";
        b.innerHTML = sprite("butterfly");
        layer.appendChild(b);
      });
    }
    if (state.scene === "town" || state.scene === "mill") {
      [[18, 18], [31, 16], [72, 20]].forEach((xy, i) => {
        const s = document.createElement("span");
        s.className = "chimney";
        s.style.left = xy[0] + "%";
        s.style.top = xy[1] + "%";
        s.style.animationDelay = (-i * 1.1) + "s";
        layer.appendChild(s);
      });
    }
    if (!hang && !isFestival()) return;
    const spots = [[12, 10], [78, 8], [46, 6], [88, 18]];
    spots.forEach((xy, i) => {
      const el = document.createElement("div");
      el.className = "decor-lantern";
      el.style.left = xy[0] + "%";
      el.style.top = xy[1] + "%";
      el.style.animationDelay = (-i * 0.7) + "s";
      el.innerHTML = sprite("lantern");
      layer.appendChild(el);
    });
  }

  function renderWeather() {
    const layer = $("weather-layer");
    if (!layer) return;
    const wx = state.weather || "sunny";
    const sn = seasonId();
    const key = wx + "-" + sn + (isFestival() ? "-f" : "");
    if (layer.dataset.wx === key && layer.childElementCount) return;
    layer.dataset.wx = key;
    layer.innerHTML = "";
    let kind = "";
    if (wx === "rain") kind = "drop";
    else if (wx === "snow") kind = "flake";
    else if (sn === "spring") kind = "petal";
    else if (sn === "autumn") kind = "leaf";
    else if (isFestival() || todId() === "night") kind = "spark";
    if (!kind) return;
    const n = kind === "drop" || kind === "flake" ? 28 : 16;
    for (let i = 0; i < n; i++) {
      const el = document.createElement("span");
      el.className = kind;
      if (kind === "flake") el.textContent = "❄";
      el.style.left = Math.random() * 100 + "%";
      el.style.animationDuration = (1.1 + Math.random() * 2.2) + "s";
      el.style.animationDelay = (-Math.random() * 3) + "s";
      layer.appendChild(el);
    }
  }

  function renderCottage() {
    const box = $("cottage");
    if (!box) return;
    box.innerHTML = "";
    COTTAGE.forEach((c) => {
      const owned = !!(state.cottage && state.cottage[c.id]);
      const row = document.createElement("div");
      row.className = "row" + (owned ? " on" : "");
      row.innerHTML = `<span class="thumb" style="display:grid;place-items:center;font-size:22px;border-radius:12px">${c.id === "kettle" ? "🫖" : c.id === "quilt" ? "🛏️" : c.id === "porch" ? "🏮" : c.id === "hivebox" ? "🐝" : c.id === "sconce" ? "🪔" : "🌱"}</span><div><h3>${esc(c.name)}</h3><p>${owned ? esc(c.text) : esc(c.blurb)}</p></div><button class="buy-btn" ${owned || state.gold < c.cost ? "disabled" : ""}>${owned ? "home" : fmt(c.cost)}</button>`;
      row.querySelector("button").addEventListener("click", () => {
        if (owned || !spend(c.cost)) return;
        state.cottage[c.id] = true;
        if (c.id === "quilt") fullHeal();
        note("The cottage gained a " + c.name.toLowerCase() + ".");
        checkStory(false);
        toast(c.text);
        renderCottage();
        renderHud();
        save();
      });
      box.appendChild(row);
    });
  }

  function renderTalents() {
    const box = $("talents");
    if (!box) return;
    const due = talentsDue();
    const have = (state.talents || []).map((id) => talentBy(id)).filter(Boolean);
    if (!have.length && !due) {
      box.innerHTML = `<p class="sub" style="margin:0;color:#5c5146">Reach level 3. The path will offer a habit.</p>`;
      return;
    }
    box.innerHTML = "";
    if (due) {
      const row = document.createElement("div");
      row.className = "row on";
      row.innerHTML = `<span class="thumb" style="display:grid;place-items:center;font-size:22px;border-radius:12px">✨</span><div><h3>${due} waiting</h3><p>The path has something to teach.</p></div><button class="buy-btn">choose</button>`;
      row.querySelector("button").addEventListener("click", showTalentPicker);
      box.appendChild(row);
    }
    have.forEach((t) => {
      const row = document.createElement("div");
      row.className = "row";
      row.innerHTML = `<span class="thumb" style="display:grid;place-items:center;font-size:20px;border-radius:12px">✦</span><div><h3>${esc(t.name)}</h3><p>${esc(t.text)}</p></div>`;
      box.appendChild(row);
    });
  }

  function showTalentPicker() {
    if (talentsDue() <= 0) return;
    const port = $("modal-portrait");
    port.classList.remove("hidden");
    port.innerHTML = sprite(heroArt());
    showModal("A habit", "The path offers one. You can only carry so many.");
    $("modal-ok").textContent = "Later";
    const grid = document.createElement("div");
    grid.className = "class-pick";
    TALENTS.filter((t) => !(state.talents || []).includes(t.id)).forEach((t) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "class-btn";
      btn.innerHTML = `<strong>${esc(t.name)}</strong><span>${esc(t.text)}</span>`;
      btn.addEventListener("click", () => {
        state.talents.push(t.id);
        note("You learned " + t.name + ".");
        hideModal();
        toast(t.name + ". It fits.");
        renderAll();
        save();
        if (talentsDue() > 0) setTimeout(showTalentPicker, 200);
      });
      grid.appendChild(btn);
    });
    $("modal-actions").appendChild(grid);
  }

  function openMail() {
    rollMail();
    const unread = unreadMail();
    const port = $("modal-portrait");
    port.classList.remove("hidden");
    if (!state.mail.length) {
      port.innerHTML = sprite("wren");
      showModal("Letters", "The crate is empty. Wren will fill it when the day turns.", "Alright");
      renderHud();
      return;
    }
    const letter = unread[0] || state.mail[0];
    const npc = NPCS.find((n) => n.id === letter.from) || NPCS[0];
    port.innerHTML = sprite(npc.art);
    const gift = letter.read ? "Already opened." : "Tucked inside: " + letter.n + " " + itemName(letter.item) + ".";
    showModal(npc.name + " writes", letter.text + "\n\n" + gift, unread.length ? "Open" : "Goodbye");
    if (!letter.read) {
      $("modal-ok").addEventListener("click", function once() {
        $("modal-ok").removeEventListener("click", once);
        if (letter.read) return;
        letter.read = true;
        addPack(letter.item, letter.n);
        toast(npc.name + " sent " + letter.n + " " + itemName(letter.item) + ".");
        renderPack();
        renderHud();
        save();
        if (unreadMail().length) setTimeout(openMail, 80);
      }, { once: true });
    }
    renderHud();
  }

  function renderErrands() {
    const box = $("errands");
    if (!box) return;
    seedErrands();
    box.innerHTML = "";
    (state.errands || []).forEach((e) => {
      const row = document.createElement("div");
      row.className = "row" + (e.done ? " on" : "");
      row.innerHTML = `<span class="thumb" style="display:grid;place-items:center;font-size:20px;border-radius:12px">📌</span><div><h3>${e.done ? "done" : e.progress + " / " + e.n}</h3><p>${esc(e.text)}</p></div><span class="buy-btn" style="pointer-events:none">${e.done ? "kept" : "+" + profitRange(e.gold)}</span>`;
      box.appendChild(row);
    });
  }

  function renderPond() {
    const box = $("pond");
    if (!box) return;
    tickPond();
    box.innerHTML = "";
    const row = document.createElement("div");
    row.className = "row";
    const ready = pondReady();
    row.innerHTML = `<span class="thumb" style="display:grid;place-items:center;font-size:22px;border-radius:12px">🎣</span><div><h3>${ready ? (state.pondFish || 0) + " waiting" : "asleep"}</h3><p>${ready ? "A polite tug now and then." : "Walk Willow Brook three times, or open the mill road."}</p></div><button class="buy-btn">reel</button>`;
    row.querySelector("button").addEventListener("click", collectPond);
    box.appendChild(row);
  }

  function renderMuseum() {
    const box = $("museum");
    if (!box) return;
    box.innerHTML = "";
    MUSEUM.forEach((m) => {
      const owned = !!(state.museum && state.museum[m.id]);
      const have = packCount(m.id) > 0;
      const infused = isInfused(m.id);
      const row = document.createElement("div");
      row.className = "row" + (owned ? " on" : "");
      const label = !owned ? "give" : infused ? "glowing" : "infuse";
      const can = (!owned && have) || (owned && !infused && packCount("dusk-wing") > 0);
      row.innerHTML = `<span class="thumb" style="display:grid;place-items:center;font-size:20px;border-radius:12px">${itemIcon(m.id)}</span><div><h3>${esc(m.name)}</h3><p>${!owned ? "give one to Iris" : infused ? "infused. The bonus doubled." : "on the shelf. A dusk wing would wake it twice."}</p></div><button class="buy-btn" ${can ? "" : "disabled"}>${label}</button>`;
      row.querySelector("button").addEventListener("click", () => {
        if (!owned) donateMuseum(m.id);
        else infuseMuseum(m.id);
        renderMuseum();
        renderHud();
        save();
      });
      box.appendChild(row);
    });
  }

  function renderHive() {
    const box = $("hive");
    if (!box) return;
    tickHive();
    box.innerHTML = "";
    const row = document.createElement("div");
    row.className = "row";
    const ready = hiveReady();
    row.innerHTML = `<span class="thumb" style="display:grid;place-items:center;font-size:22px;border-radius:12px">🐝</span><div><h3>${ready ? (state.hiveHoney || 0) + " waiting" : "asleep"}</h3><p>${ready ? "The porch is humming." : "Walk Honey Hollow twice, or build a porch hive."}</p></div><button class="buy-btn">collect</button>`;
    row.querySelector("button").addEventListener("click", collectHive);
    box.appendChild(row);
  }

  function renderAutosell() {
    const box = $("autosell");
    if (!box) return;
    const ids = ["herb", "moss", "sting", "salt", "kelp", "button"];
    box.innerHTML = ids.map((id) => {
      const on = !!(state.autosell && state.autosell[id]);
      return `<label><input type="checkbox" data-as="${id}" ${on ? "checked" : ""}/>sell ${esc(itemName(id))}</label>`;
    }).join("");
    box.querySelectorAll("input").forEach((inp) => {
      inp.addEventListener("change", () => {
        if (!state.autosell) state.autosell = {};
        state.autosell[inp.dataset.as] = inp.checked;
        save();
      });
    });
  }

  function renderMemories() {
    const box = $("memories");
    if (!box) return;
    if (!state.memories || !state.memories.length) {
      box.innerHTML = `<p class="sub" style="margin:0;color:#5c5146">The first memory is still being walked.</p>`;
      return;
    }
    box.innerHTML = state.memories.map((m) => `<div class="journal-item"><em>day ${m.day} · ${esc(m.title)}</em>${esc(m.text)}</div>`).join("");
  }

  function renderTemper() {
    const box = $("temper");
    if (!box) return;
    box.innerHTML = "";
    const worn = Object.keys(state.gear || {}).map((slot) => gearById(state.gear[slot])).filter(Boolean);
    if (!worn.length) {
      box.innerHTML = `<p class="sub" style="margin:0;color:#5c5146">Wear something. Then warm it.</p>`;
      return;
    }
    worn.forEach((g) => {
      const rank = temperOf(g.id);
      const cost = temperCost(rank);
      const maxed = rank >= TEMPER_MAX;
      const sparkOk = !cost.spark || packCount("ember") > 0 || packCount("starshard") > 0;
      const can = !maxed && packCount("oil") >= cost.oil && sparkOk;
      const need = maxed ? "maxed" : (cost.oil + " oil" + (cost.spark ? " + ember or starshard" : ""));
      const row = document.createElement("div");
      row.className = "row" + (rank ? " on" : "");
      row.innerHTML = `<span class="thumb" style="display:grid;place-items:center;font-size:20px;border-radius:12px">🔨</span><div><h3>${esc(g.name)} · ${rank}/${TEMPER_MAX}</h3><p>${need} · +${Math.floor(rank / 2)} atk from heat</p></div><button class="buy-btn" ${can ? "" : "disabled"}>${maxed ? "max" : "temper"}</button>`;
      row.querySelector("button").addEventListener("click", () => {
        if (!doTemper(g.id)) return;
        renderTemper();
        renderGear();
        renderHud();
        renderVitals();
        save();
      });
      box.appendChild(row);
    });
  }

  function renderRite() {
    const box = $("rite-box");
    if (!box) return;
    const left = state.riteLeft || 0;
    box.innerHTML = "";
    const row = document.createElement("div");
    row.className = "row" + (left ? " on" : "");
    row.innerHTML = `<span class="thumb" style="display:grid;place-items:center;font-size:22px;border-radius:12px">🪔</span><div><h3>${left ? left + " loops of light" : "the sconce is dark"}</h3><p>${packCount("oil")} oil in the satchel. Haste, mend, and luck for five loops.</p></div><button class="buy-btn" ${left || packCount("oil") < 1 ? "disabled" : ""}>pour</button>`;
    row.querySelector("button").addEventListener("click", () => {
      if (!lightRite()) return;
      renderRite();
      renderHud();
      renderWorld();
      save();
    });
    box.appendChild(row);
  }

  function renderCodex() {
    const box = $("codex");
    if (!box) return;
    box.innerHTML = "";
    const open = allTrails().filter((t) => state.level >= t.level || (state.walks && state.walks[t.id]));
    open.forEach((t) => {
      const on = !!(para().codex && para().codex[t.id]);
      const can = !on && packCount("page") >= 2 && packCount("oil") >= 1;
      const row = document.createElement("div");
      row.className = "row" + (on ? " on" : "");
      row.innerHTML = `<span class="thumb" style="display:grid;place-items:center;font-size:20px;border-radius:12px">${t.icon}</span><div><h3>${esc(t.name)}</h3><p>${on ? "filed. The moths know the bends." : "2 pages + 1 oil · echo-proof lessons"}</p></div><button class="buy-btn" ${can ? "" : "disabled"}>${on ? "kept" : "study"}</button>`;
      row.querySelector("button").addEventListener("click", () => {
        if (!studyTrail(t.id)) return;
        renderCodex();
        renderTrails();
        renderLantern();
        save();
      });
      box.appendChild(row);
    });
  }

  function renderBlessing() {
    const box = $("blessing");
    const sub = $("bless-sub");
    if (!box) return;
    const b = dayBlessing();
    const names = b.trails.map((id) => trailById(id).name).join(" · ");
    if (sub) sub.textContent = b.name + " · +" + Math.round(b.amt * 100) + "% " + b.stat + " on the favored paths.";
    box.innerHTML = `<div class="row on"><span class="thumb" style="display:grid;place-items:center;font-size:22px;border-radius:12px">🌤️</span><div><h3>${esc(b.name)}</h3><p>${esc(names)} lean ${esc(b.stat)} today. Resets with the kettle of morning.</p></div></div>`;
  }

  function renderStances() {
    const box = $("stances");
    if (!box) return;
    box.innerHTML = "";
    STANCES.forEach((s) => {
      const on = (state.stance || "kind") === s.id;
      const row = document.createElement("div");
      row.className = "row" + (on ? " on" : "");
      row.innerHTML = `<span class="thumb" style="display:grid;place-items:center;font-size:20px;border-radius:12px">${s.id === "guard" ? "🛡️" : s.id === "keen" ? "👁️" : "💛"}</span><div><h3>${esc(s.name)}</h3><p>${esc(s.text)}</p></div><button class="buy-btn" ${on ? "disabled" : ""}>${on ? "held" : "take"}</button>`;
      row.querySelector("button").addEventListener("click", () => {
        if (!setStance(s.id)) return;
        renderStances();
        renderVitals();
        renderHud();
        save();
      });
      box.appendChild(row);
    });
  }

  function renderAspects() {
    const box = $("aspects");
    if (!box) return;
    box.innerHTML = "";
    const open = canPickAspect();
    ASPECTS.forEach((a) => {
      const on = state.aspect === a.id;
      const row = document.createElement("div");
      row.className = "row" + (on ? " on" : "") + (!open ? " locked" : "");
      row.innerHTML = `<span class="thumb" style="display:grid;place-items:center;font-size:20px;border-radius:12px">${a.icon}</span><div><h3>${esc(a.name)}</h3><p>${esc(a.text)}</p></div><button class="buy-btn" ${!open || on ? "disabled" : ""}>${!open ? "lv 8" : on ? "held" : state.aspect ? "1 oil" : "take"}</button>`;
      row.querySelector("button").addEventListener("click", () => {
        if (!setAspect(a.id)) return;
        renderAspects();
        renderLantern();
        renderHud();
        save();
      });
      box.appendChild(row);
    });
  }

  function renderClassRanks() {
    const box = $("class-ranks");
    if (!box) return;
    const r = classRankOf();
    const oil = 1 + r;
    const can = r < CLASS_RANK_MAX && packCount("oil") >= oil && packCount("page") >= 1;
    box.innerHTML = "";
    const row = document.createElement("div");
    row.className = "row" + (r ? " on" : "");
    row.innerHTML = `<span class="thumb" style="display:grid;place-items:center;font-size:20px;border-radius:12px">📖</span><div><h3>${esc(classBy().name)} · lesson ${r}/${CLASS_RANK_MAX}</h3><p>Lessons survive kindle. ${r >= CLASS_RANK_MAX ? "This class is fully taught." : oil + " oil + 1 page."}</p></div><button class="buy-btn" ${can ? "" : "disabled"}>${r >= CLASS_RANK_MAX ? "max" : "study"}</button>`;
    row.querySelector("button").addEventListener("click", () => {
      if (!rankClass()) return;
      renderClassRanks();
      renderClassBox();
      renderHud();
      renderVitals();
      save();
    });
    box.appendChild(row);
  }

  function renderHelp() {
    const box = $("help-book");
    if (!box) return;
    const bless = dayBlessing();
    const trails = allTrails();
    const named = trails.filter((t) => !t.far);
    const far = trails.filter((t) => t.far);
    const synOn = SYNERGIES.filter((s) => s.need.every(partyHas));
    const secs = [];
    const sec = (title, body) => secs.push(`<article class="help-sec"><h3>${esc(title)}</h3>${body}</article>`);

    sec("How a loop works",
      "<p>On the painting, tap <strong>More trails</strong> (under the walk bar) or Satchel → Trails. <strong>Next path</strong> jumps to the next road you have leveled into. Open paths are at the top; locked ones sit under <em>More trails — unlock as you level</em>.</p>"
      + "<p>Tap a trail twice to set it as <strong>focus</strong> for extra XP. Win streaks on the same path lean loot a little more until you sit down or change roads.</p>");

    sec("Pennies",
      "<p>Every coin you <em>earn</em> is a 1–5% profit on a value: the path tip, the loot you found, a quest, a story gift. The stall pays the same thin cut. You start with 24¢. Beds, friends, and cottage upgrades still cost whole coins, so the valley is a grind on purpose.</p>"
      + "<p>Fortune, Honey hands, and kind weather only <em>lean</em> that 1–5% toward 5%. They never print coins.</p>");

    sec("Trails and difficulty",
      "<p>There are <strong>" + named.length + " named paths</strong>, then Farther Paths that keep unlocking every two levels after 32. Each row shows a grade:</p>"
      + "<ul><li><strong>gentle</strong> — early meadow and brook</li><li><strong>kind</strong> — harbor, woods, hollow</li><li><strong>firm</strong> — ruins through dusk</li><li><strong>steep</strong> — the late named roads</li><li><strong>far</strong> — Last Cart and the endless ladder</li></ul>"
      + "<p>Foes scale with <em>your</em> level, the <em>trail's</em> level, and that grade. A steep path at 28 is not the meadow.</p>"
      + "<p>Today's blessing: <strong>" + esc(bless.name) + "</strong> on " + bless.trails.map((id) => esc(trailById(id).name)).join(" and ") + " (" + bless.stat + ").</p>"
      + (far.length ? "<p>Farther Paths in view: " + far.map((t) => esc(t.name) + " (lv " + t.level + ")").join(", ") + ".</p>" : ""));

    sec("Scuffles",
      "<p>When a loop finishes, the satchel closes and you watch on the trail: your party on the left, the guest on the right. They lunge, nuzzle, and sit down. A small card keeps the log.</p>"
      + "<p>Hits use attack, defense, pierce, a little luck, and a lantern crit. Ward shrinks incoming damage. Mend multiplies heals and regen.</p>"
      + "<p><strong>Stance</strong> (Hearts tab) is free to change between loops:</p><ul>"
      + STANCES.map((s) => "<li><strong>" + esc(s.name) + "</strong> — " + esc(s.text) + "</li>").join("")
      + "</ul>"
      + "<p><strong>Front / back</strong> on companions: front hits harder and draws nuzzles. Back hits softer and takes less.</p>");

    sec("Party and bonds",
      "<p>Recruit from the Party tab when you have the pennies and the level. Gift them their favorite thing for extra ♥. Bond ranks add stats: 12 loot and mend, 24 fortune and ward, 36 crit and luck.</p>"
      + (synOn.length ? "<p>Active synergies: " + synOn.map((s) => esc(s.text)).join(" · ") + ".</p>" : "<p>Some pairs (Pip+Thimble, Wick+Lumen, Pearl+Nettle…) give a small extra when they walk together.</p>"));

    sec("Classes and lessons",
      "<p>Eight classes. Retrain at the inn for 40 coins. Every three levels you pick a talent. Class <strong>lessons</strong> (oil + a page, up to 5) survive kindle and lean that class's gifts.</p><ul>"
      + Object.values(CLASSES).map((c) => "<li><strong>" + esc(c.name) + "</strong> — " + esc(c.blurb) + "</li>").join("")
      + "</ul>");

    sec("The lantern (prestige)",
      "<p>At level 12, 50 loops, or a Starwell walk, you can <strong>Kindle</strong>. The valley forgets pockets, cottage, friends on the trail, and this run's temper. It keeps your name, class, autosell, paragon ranks, class lessons, lantern book, echoes, and infusions.</p>"
      + "<p>Kindle score looks at level, loops, stories, hearts, museum, trail tier, lifetime pennies, temper, bonds, echoes, and more. Points buy the paragon tree (soft-capped, never infinite).</p>"
      + "<p>Walk a trail 6+ times before kindling and it leaves an <strong>echo</strong> — extra finds next valley.</p>");

    sec("Aspects",
      "<p>A color for this walk. Free first pick at level 8 or after a kindle. Changing costs one oil.</p><ul>"
      + ASPECTS.map((a) => "<li><strong>" + a.icon + " " + esc(a.name) + "</strong> — " + esc(a.text) + "</li>").join("")
      + "</ul>");

    sec("Oil, temper, rites, book",
      "<p><strong>Lantern oil</strong> is cooked (wax+honey or wax+ember) or found on dusk roads. Spend it to:</p>"
      + "<ul><li><strong>Temper</strong> worn gear (Pack) — attack, loot lean, crit, ward. Resets on kindle.</li>"
      + "<li><strong>Porch rite</strong> — five loops of haste, mend, and luck.</li>"
      + "<li><strong>Lantern book</strong> — 2 pages + 1 oil files a trail forever.</li>"
      + "<li><strong>Class lesson</strong> and <strong>aspect change</strong>.</li></ul>");

    sec("Town",
      "<p>Neighbors have daily quests. The stall sells short buffs. The cottage is permanent this run. The cabinet takes one of each treasure; a <strong>dusk wing</strong> infuses a shelf and doubles its bonus (survives kindle).</p>"
      + "<p>Hive and pond fill while you ramble. Sell pack pays 1–5% of loot value.</p>");

    sec("Weather, seasons, ranks",
      "<p>Sunny leans pennies. Rain leans loot. Wind hurries. Snow teaches. Spring/summer/autumn/winter each nudge one stat. Festival days (every 8th) lean gold and XP.</p>"
      + "<p>Village rank rises with hearts, loops, and cabinet pieces. Higher ranks lean pennies a little.</p>");

    sec("Your sheet right now",
      "<p>Power " + powerRating() + " · " + esc(classBy().name) + " lv " + state.level + " · stance " + esc(currentStance().name)
      + (currentAspect() ? " · aspect " + esc(currentAspect().name) : " · no aspect yet")
      + " · " + fmt(state.gold) + " · heat " + (para().kindles || 0) + ".</p>"
      + "<p>Help stays in the satchel. The painting is the walk. The book is the math.</p>"
      + "<p><strong>Settings</strong> sits above the Idle-Cozy-Rpg title and again under Satchel. Fourteen tunes, shuffle, extra bells, a soft pad, follow-the-day / season / path, scuffle pace, and the quiet display knobs.</p>");

    box.innerHTML = secs.join("");
  }

  function renderLantern() {
    const scoreBox = $("lantern-score");
    const sheetBox = $("stat-sheet");
    const treeBox = $("paragon-tree");
    if (!scoreBox || !sheetBox || !treeBox) return;
    const p = para();
    const score = kindleScore();
    const gain = kindlePointsFrom(score);
    const ready = canKindle();
    const hero = combatStats("hero");
    const s = sheet();
    const power = powerRating();
    scoreBox.innerHTML =
      `<div class="stat-cell"><strong>Heat ${p.kindles || 0}</strong><span>${p.points || 0} unspent · ${paragonSpent()} spent</span></div>`
      + `<div class="stat-cell"><strong>Kindle score ${score}</strong><span>${ready ? "Would grant +" + gain : kindleWhyNot()}</span></div>`
      + `<div class="stat-cell"><strong>Power ${power}</strong><span>atk ${hero.atk} · def ${hero.def} · pierce ${hero.pierce || 0}</span></div>`
      + `<div class="stat-cell"><strong>Lifetime</strong><span>${p.lifetimeWalks || 0} loops · ${fmt(p.lifetimeGold || 0)} earned · best lv ${p.bestLevel || 1}</span></div>`;
    const btn = $("btn-kindle");
    if (btn) {
      btn.disabled = !ready;
      btn.textContent = ready ? ("Kindle the lantern · +" + gain) : "Lantern still warming";
    }
    const rows = [
      ["Might", fmtPct(s.might), "Attack +" + Math.round(s.might * 5)],
      ["Ward", (s.wardDR * 100).toFixed(1) + "% DR", "Defense +" + Math.round(s.ward * 4)],
      ["Grit", fmtPct(s.grit), "Hearts +" + Math.round(s.grit * 14)],
      ["Fortune", fmtPct(s.fortune), "Penny lean (still 1–5%)"],
      ["Insight", fmtPct(s.insight), "XP " + fmtPct(s.xp - 1)],
      ["Stride", fmtPct(s.stride), "Loop speed " + fmtPct(s.speed - 1)],
      ["Find", fmtPct(s.find), "Loot x" + s.loot.toFixed(2)],
      ["Luck", fmtPct(s.luck), "Rare x" + s.rare.toFixed(2)],
      ["Mend", "x" + s.mendMult.toFixed(2), "Heals and regen"],
      ["Haste", fmtPct(s.haste), "Scuffle step " + Math.round(fightStepMs()) + "ms"],
      ["Crit", (s.critChance * 100).toFixed(1) + "%", "x" + s.critMult.toFixed(2) + " on a lantern crit"],
      ["XP curve", String(xpNeeded(state.level)), "to reach lv " + (state.level + 1)],
      ["Temper", String(Object.values(state.temper || {}).reduce((a, n) => a + n, 0)), "ranks on worn things"],
      ["Echoes", String(Object.keys(para().mastered || {}).length), "trails the lantern kept"],
      ["Focus", trailById(state.focus || state.trail).name, "walk it again to set"],
      ["Stance", currentStance().name, currentStance().text],
      ["Aspect", currentAspect() ? currentAspect().name : "none", currentAspect() ? currentAspect().text : "pick at lv 8"],
    ];
    sheetBox.innerHTML = rows.map((r) =>
      `<div class="stat-cell"><strong>${esc(r[0])} ${esc(r[1])}</strong><span>${esc(r[2])}</span></div>`
    ).join("");
    treeBox.innerHTML = "";
    PARAGON_NODES.forEach((n) => {
      const rank = nodeRank(n.id);
      const cost = nodeCost(rank);
      const maxed = rank >= PARA_MAX;
      const can = !maxed && (p.points || 0) >= cost;
      const row = document.createElement("div");
      row.className = "row" + (rank ? " on" : "");
      row.innerHTML = `<span class="thumb" style="display:grid;place-items:center;font-size:20px;border-radius:12px">✦</span><div><h3>${esc(n.name)} · ${rank}/${PARA_MAX}</h3><p>${esc(n.text)} · ${fmtPct(rank * n.per)}</p></div><button class="buy-btn" ${can ? "" : "disabled"}>${maxed ? "max" : cost + " pt"}</button>`;
      row.querySelector("button").addEventListener("click", () => {
        if (!spendParagonNode(n.id)) {
          toast("The lantern wants more heat.");
          return;
        }
        toast(n.name + " grew to " + nodeRank(n.id) + ".");
        renderLantern();
        renderHud();
        renderVitals();
        save();
      });
      treeBox.appendChild(row);
    });
  }

  function renderAll() {
    ensureCombat();
    renderHud();
    renderWorld();
    renderFight();
    renderTrails();
    renderErrands();
    renderHive();
    renderPond();
    renderParty();
    renderPets();
    renderGear();
    renderClassBox();
    renderVitals();
    renderTalents();
    renderCottage();
    renderMuseum();
    renderPack();
    renderAutosell();
    renderRecipes();
    renderCrafts();
    renderNeighbors();
    renderShop();
    renderJournal();
    renderStory();
    renderStamps();
    renderMemories();
    renderLantern();
    renderTemper();
    renderRite();
    renderCodex();
    renderBlessing();
    renderStances();
    renderAspects();
    renderClassRanks();
    renderHelp();
    renderProfiles();
    renderDebug();
    $("btn-scene-town").classList.toggle("on", state.scene === "town");
    if ($("btn-scene-mill")) {
      $("btn-scene-mill").classList.toggle("on", state.scene === "mill");
      $("btn-scene-mill").classList.toggle("locked", !millUnlocked());
    }
    if ($("btn-scene-lib")) {
      $("btn-scene-lib").classList.toggle("on", state.scene === "library");
      $("btn-scene-lib").classList.toggle("locked", !libraryUnlocked());
    }
    $("btn-scene-trail").classList.toggle("on", state.scene !== "town" && state.scene !== "mill" && state.scene !== "library");
  }

  function tickRegen(now) {
    if (state.fight) return;
    const mend = sheet().mend;
    const gap = ((state.cottage && state.cottage.kettle) ? REGEN_MS * 0.65 : REGEN_MS) / Math.max(0.55, 1 + mend * 0.7);
    while (now - state.regenAt >= gap) {
      state.regenAt += gap;
      healAll(mend > 0.25 ? 2 : 1);
    }
  }

  function tick(now) {
    tickDay(Date.now());
    tickRegen(Date.now());
    if (state.fight) {
      stepFight(now);
      if (now - lastUi > 200) {
        lastUi = now;
        renderHud();
      }
      return;
    }
    const trail = trailById(state.trail);
    const dur = trailDuration(trail);
    const dt = Math.min(2000, now - (state._prev || now));
    state._prev = now;
    if (!livingMembers().length) {
      state.party.forEach((id) => setHp(id, 1));
    }
    state.progress += dt / dur;
    if (state.progress >= 1) {
      state.progress = 0.999;
      startFight(false);
      if (state.scene === "trail") $("say").classList.add("hidden");
    }
    if (now - lastUi > 200) {
      lastUi = now;
      $("trail-fill").style.width = Math.min(100, state.progress * 100) + "%";
      const left = Math.max(0, (1 - state.progress) * dur);
      if (state.scene === "trail" && !state.fight) {
        $("trail-sub").textContent = "back in " + Math.max(1, Math.ceil(left / 1000)) + "s";
      }
      $("day-num").textContent = state.day;
      $("hp-label").textContent = partyHp() + " / " + partyMaxHp();
      $("hp-fill").style.width = (partyMaxHp() ? Math.min(100, (partyHp() / partyMaxHp()) * 100) : 0) + "%";
    }
  }

  function sellAll() {
    let total = 0;
    Object.keys(state.pack).forEach((id) => {
      if (!ITEMS[id]) return;
      const n = packCount(id);
      if (!n) return;
      total += stallPay(id, n);
      delete state.pack[id];
    });
    if (!total) {
      toast("Nothing the stall wants just now.");
      return;
    }
    addGold(total);
    toast("The stall paid " + fmt(total) + " — a penny profit on the lot.");
    renderPack();
    renderRecipes();
    renderNeighbors();
    save();
  }

  function bind() {
    window.addEventListener("error", (e) => {
      try { toast("A small snag: " + (e.message || "unknown")); } catch (err) { /* ignore */ }
    });
    $("btn-desk").addEventListener("click", openDesk);
    $("btn-close-desk").addEventListener("click", closeDesk);
    $("btn-scene-town").addEventListener("click", () => { setScene("town"); renderAll(); save(); });
    $("btn-scene-mill").addEventListener("click", () => {
      if (!millUnlocked()) {
        toast("The mill road opens after a few loops, or level 4.");
        return;
      }
      setScene("mill");
      renderAll();
      save();
    });
    $("btn-scene-lib").addEventListener("click", () => {
      if (!libraryUnlocked()) {
        toast("The grove library opens around level 6, or after fifteen loops.");
        return;
      }
      setScene("library");
      renderAll();
      save();
    });
    $("btn-scene-trail").addEventListener("click", () => { setScene("trail"); renderAll(); save(); });
    if ($("btn-more-trails")) $("btn-more-trails").addEventListener("click", openTrails);
    if ($("btn-desk-paths")) $("btn-desk-paths").addEventListener("click", openTrails);
    if ($("btn-next-trail")) {
      $("btn-next-trail").addEventListener("click", () => {
        pickTrail(nextOpenTrail());
        closeDesk();
      });
    }
    $("btn-camp").addEventListener("click", campTillMorning);
    if ($("btn-kindle")) {
      $("btn-kindle").addEventListener("click", () => {
        if (!canKindle()) {
          toast(kindleWhyNot());
          return;
        }
        const gain = kindlePointsFrom(kindleScore());
        if (state.confirmKindle === false) {
          if (doKindle()) renderAll();
          return;
        }
        showModal(
          "Kindle the lantern?",
          "The valley will forget this walk: pockets, cottage, friends on the trail, and the map-creases.\n\nIt will keep your name, your class, autosell habits, and every paragon rank.\n\nYou would gain +" + gain + " heat to spend.",
          "Not yet"
        );
        const go = document.createElement("button");
        go.className = "primary-btn";
        go.textContent = "Kindle · +" + gain;
        go.addEventListener("click", () => {
          if (!doKindle()) return;
          hideModal();
          renderAll();
        });
        $("modal-actions").appendChild(go);
      });
    }
    if ($("coin-pill")) {
      $("coin-pill").addEventListener("click", () => { openDesk(); setTab("lantern"); });
    }
    $("btn-collect").addEventListener("click", sellAll);
    $("btn-mute").addEventListener("click", () => {
      state.mute = !state.mute;
      $("btn-mute").classList.toggle("muted", state.mute);
      save();
    });
    const openSet = () => { openSettings(); };
    if ($("btn-settings-brand")) $("btn-settings-brand").addEventListener("click", openSet);
    if ($("btn-settings-fab")) $("btn-settings-fab").addEventListener("click", openSet);
    if ($("settings-close")) $("settings-close").addEventListener("click", closeSettings);
    if ($("settings")) $("settings").addEventListener("click", (e) => { if (e.target.id === "settings") closeSettings(); });
    if ($("set-music")) {
      $("set-music").addEventListener("change", () => {
        state.musicOn = $("set-music").checked;
        if (state.musicOn) startMusic();
        else { stopMusic(); musicBus(); }
        save();
      });
    }
    if ($("set-music-vol")) {
      $("set-music-vol").addEventListener("input", () => {
        state.musicVol = Number($("set-music-vol").value) / 100;
        musicBus();
      });
      $("set-music-vol").addEventListener("change", save);
    }
    if ($("set-sfx")) {
      $("set-sfx").addEventListener("change", () => {
        state.mute = !$("set-sfx").checked;
        $("btn-mute").classList.toggle("muted", state.mute);
        save();
      });
    }
    if ($("set-sfx-vol")) {
      $("set-sfx-vol").addEventListener("input", () => {
        state.sfxVol = Number($("set-sfx-vol").value) / 100;
      });
      $("set-sfx-vol").addEventListener("change", save);
    }
    if ($("set-still")) {
      $("set-still").addEventListener("change", () => {
        state.reduceMotion = $("set-still").checked;
        applyMotionPref();
        save();
      });
    }
    if ($("set-follow")) {
      $("set-follow").addEventListener("change", () => {
        state.musicFollow = $("set-follow").value;
        syncFollowMusic();
        if (state.musicFollow === "pick" && state.musicOn !== false) startMusic();
        save();
      });
    }
    if ($("set-pace")) {
      $("set-pace").addEventListener("change", () => {
        state.fightSpeed = $("set-pace").value;
        save();
      });
    }
    if ($("set-watch")) {
      $("set-watch").addEventListener("change", () => {
        state.autoWatch = $("set-watch").checked;
        save();
      });
    }
    if ($("set-dmg")) {
      $("set-dmg").addEventListener("change", () => {
        state.showDmg = $("set-dmg").checked;
        save();
      });
    }
    if ($("set-names")) {
      $("set-names").addEventListener("change", () => {
        state.showNames = $("set-names").checked;
        applyMotionPref();
        save();
      });
    }
    if ($("set-type")) {
      $("set-type").addEventListener("change", () => {
        state.bigType = $("set-type").checked;
        applyMotionPref();
        save();
      });
    }
    if ($("set-kindle")) {
      $("set-kindle").addEventListener("change", () => {
        state.confirmKindle = $("set-kindle").checked;
        save();
      });
    }
    if ($("set-shuffle")) {
      $("set-shuffle").addEventListener("change", () => {
        state.musicShuffle = $("set-shuffle").checked;
        save();
      });
    }
    if ($("set-bells")) {
      $("set-bells").addEventListener("change", () => {
        state.musicBells = $("set-bells").checked;
        save();
      });
    }
    if ($("set-pad")) {
      $("set-pad").addEventListener("change", () => {
        state.musicPad = $("set-pad").checked;
        if (state.musicOn !== false) startMusic();
        save();
      });
    }
    if ($("set-next-song")) {
      $("set-next-song").addEventListener("click", () => {
        const i = SONGS.findIndex((s) => s.id === (state.musicId || "kettle"));
        const n = SONGS[(i + 1 + SONGS.length) % SONGS.length];
        state.musicId = n.id;
        state.musicFollow = "pick";
        if ($("set-follow")) $("set-follow").value = "pick";
        state.musicOn = true;
        if ($("set-music")) $("set-music").checked = true;
        startMusic();
        openSettings();
        save();
      });
    }
    document.addEventListener("pointerdown", function onceAudio() {
      document.removeEventListener("pointerdown", onceAudio);
      ensureAudio();
      startMusic();
    }, { once: true });
    $("hp-pill").addEventListener("click", () => { openDesk(); setTab("fight"); });
    $("btn-mail").addEventListener("click", openMail);
    $("btn-heal-biscuit").addEventListener("click", () => useHealItem("biscuit"));
    $("btn-rest").addEventListener("click", innRest);
    $("modal-ok").addEventListener("click", hideModal);
    $("modal").addEventListener("click", (e) => { if (e.target.id === "modal") hideModal(); });
    document.querySelectorAll(".tab").forEach((tab) => {
      tab.addEventListener("click", () => setTab(tab.dataset.tab));
    });
    $("btn-new-profile").addEventListener("click", () => {
      const name = ($("profile-name").value || "").trim().slice(0, 24) || "Wanderer";
      save();
      const idx = loadIndex();
      const id = "hearth-" + Date.now();
      idx.list.push({ id, name });
      idx.active = id;
      saveIndex(idx);
      state = fresh(name);
      save();
      $("profile-name").value = "";
      renderAll();
      showClassPicker(true);
      toast(name + "'s kettle is lit.");
    });
    $("btn-reset").addEventListener("click", () => {
      if (!confirm("Reset this hearth to the first morning?")) return;
      const name = state.name;
      state = fresh(name);
      save();
      renderAll();
      showClassPicker(true);
      toast("The valley forgot, gently.");
    });
    $("coin-pill").addEventListener("click", () => { openDesk(); setTab("pack"); });
  }

  function loop(now) {
    tick(now);
    requestAnimationFrame(loop);
  }

  load();
  applyMotionPref();
  bind();
  const away = catchUp();
  rollMail();
  if (!state.weather) rollWeather();
  rollForage();
  seedErrands();
  tickHive();
  tickPond();
  checkStory(true);
  renderAll();
  requestAnimationFrame(loop);

  if (!state.sawIntro) {
    state.sawIntro = true;
    save();
    const port = $("modal-portrait");
    port.classList.remove("hidden");
    port.innerHTML = sprite("hero");
    showModal(
      "Idle-Cozy-Rpg",
      "Idle-Cozy-Rpg game.\n\nA sleepy valley where adventuring is a stroll. Your party rambles, then politely scuffles. Hearts are real. Nobody stays down. Come back when the kettle sings.",
      "Choose a class"
    );
    $("modal-ok").addEventListener("click", function once() {
      $("modal-ok").removeEventListener("click", once);
      setTimeout(() => showClassPicker(true), 40);
    }, { once: true });
  } else if (!state.pickedClass) {
    showClassPicker(true);
  } else if (away) {
    showModal(
      "While you rested",
      "The party walked " + away.loops + " loops in about " + away.hours + " quiet hours.\n\nThey brought home " + fmt(away.gold) + " in pennies" + (away.loot ? " and " + away.loot : "") + ".",
      "Welcome back"
    );
  } else if (talentsDue() > 0) {
    showTalentPicker();
  } else if (unreadMail().length) {
    toast("A letter is waiting.");
  }

  window.addEventListener("beforeunload", save);
  setInterval(save, 20000);
})();
