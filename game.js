(() => {
  const SAVE_KEY = "idle-cozy-gladiators-v2";
  const OLD_KEYS = ["idle-cozy-gladiators-v1"];
  const PROFILE_INDEX = "idle-cozy-gladiators-profiles";
  const SAVE_PREFIX = "idle-cozy-glad-slot-";
  const PARA_MAX = 20;
  const TEMPER_MAX = 8;
  const PARTY_MAX = 6;
  const OFFLINE_CAP_MS = 8 * 60 * 60 * 1000;
  const DAY_MS = 6 * 60 * 1000;
  const REGEN_MS = 12000;
  const FIGHT_STEP_MS = 880;
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
    straw: { name: "Yard straw", sell: 3, icon: "🌾" },
    soup: { name: "Gate soup", sell: 8, icon: "🍲", heal: 10 },
    tea: { name: "Sand tea", sell: 6, icon: "🍵", heal: 8 },
    ribbon: { name: "Crowd ribbon", sell: 9, icon: "🎀" },
    sandal: { name: "Lost sandal", sell: 7, icon: "👡" },
    plume: { name: "Olive plume", sell: 14, icon: "🪶" },
    oil: { name: "Warm oil", sell: 12, icon: "🧴", heal: 6 },
    honey: { name: "Kettle honey", sell: 18, icon: "🍯" },
    ticket: { name: "Paper ticket", sell: 11, icon: "🎫" },
    wreath: { name: "Practice wreath", sell: 22, icon: "🌿" },
    buckle: { name: "Loose buckle", sell: 8, icon: "🔗" },
    flour: { name: "Gate flour", sell: 7, icon: "🌾" },
    loaf: { name: "Sand loaf", sell: 28, icon: "🍞", heal: 14 },
    salve: { name: "Honey salve", sell: 36, icon: "🩹", heal: 16 },
    jam: { name: "Festival jam", sell: 32, icon: "🫙", heal: 8 },
    coin: { name: "Lucky copper", sell: 16, icon: "🪙" },
    dummyhead: { name: "Dummy smile", sell: 20, icon: "😊" },
    star: { name: "Sand star", sell: 70, icon: "✨" },
    liontuft: { name: "Lion tuft", sell: 40, icon: "🦁" },
    steam: { name: "Bottled steam", sell: 26, icon: "💨" },
    ink: { name: "Gate ink", sell: 10, icon: "🖋️" },
    towel: { name: "Bath towel", sell: 15, icon: "🧺" },
    cocoa: { name: "Night cocoa", sell: 34, icon: "☕", heal: 12 },
    relish: { name: "Chili relish", sell: 24, icon: "🌶️" },
    wax: { name: "Banner wax", sell: 13, icon: "🕯️" },
    salt: { name: "Harbor salt", sell: 9, icon: "🧂" },
    thyme: { name: "Ridge thyme", sell: 13, icon: "🌱" },
    frostberry: { name: "Frostberry", sell: 14, icon: "🫐" },
    blossom: { name: "Gate blossom", sell: 12, icon: "🌸" },
    leaf: { name: "Harvest leaf", sell: 11, icon: "🍂" },
    clay: { name: "Kiln clay", sell: 15, icon: "🏺" },
    glaze: { name: "Honey glaze", sell: 28, icon: "🧴" },
    page: { name: "Loose page", sell: 15, icon: "📄" },
    ember: { name: "Kind ember", sell: 32, icon: "🔥" },
    wish: { name: "Well wish", sell: 95, icon: "💫" },
    broth: { name: "Night broth", sell: 38, icon: "🍜", heal: 14 },
    oatcake: { name: "Yard cakes", sell: 18, icon: "🍪", heal: 7 },
    cider: { name: "Autumn cider", sell: 40, icon: "🍎", heal: 10 },
    frostjam: { name: "Frost jam", sell: 44, icon: "❄️", heal: 8 },
    moontea: { name: "Moon tea", sell: 52, icon: "🌙", heal: 12 },
  };

  const CLASSES = {
    gate: {
      id: "gate", name: "Gate-guard", art: "you",
      blurb: "Balanced. The sand already knows your step.",
      hp: 32, atk: 6, def: 4,
      gold: 0, xp: 0, loot: 0.06, speed: 0,
      luck: 0.02, crit: 0.02, mend: 0, ward: 0.03, grit: 0.02, pierce: 0, haste: 0,
      skill: "Kind gate — a little of everything, and the crowd likes you.",
    },
    shield: {
      id: "shield", name: "Shield-sitter", art: "shield",
      blurb: "Stout. The tap hits you last.",
      hp: 46, atk: 6, def: 7,
      gold: 0.04, xp: 0, loot: 0, speed: -0.04,
      luck: 0, crit: 0, mend: 0, ward: 0.1, grit: 0.1, pierce: 0, haste: -0.02,
      skill: "Quilted rim — take a quarter less from taps.",
    },
    net: {
      id: "net", name: "Net-weaver", art: "net",
      blurb: "The crate introduces itself.",
      hp: 28, atk: 6, def: 3,
      gold: 0, xp: 0, loot: 0.16, speed: 0.04,
      luck: 0.08, crit: 0.03, mend: 0, ward: 0, grit: 0, pierce: 1, haste: 0,
      skill: "Soft mesh — extra finds after every card.",
    },
    foot: {
      id: "foot", name: "Fancy-foot", art: "foot",
      blurb: "The sand hurries for you.",
      hp: 26, atk: 8, def: 2,
      gold: 0, xp: 0, loot: 0.04, speed: 0.12,
      luck: 0.04, crit: 0.1, mend: 0, ward: 0, grit: 0, pierce: 1, haste: 0.06,
      skill: "Ribbon step — crits lean in, cards finish sooner.",
    },
    lantern: {
      id: "lantern", name: "Lantern-blade", art: "lantern",
      blurb: "Hits first, bruises easier.",
      hp: 24, atk: 11, def: 2,
      gold: 0, xp: 0.12, loot: 0, speed: 0,
      luck: 0, crit: 0.07, mend: 0, ward: 0, grit: -0.04, pierce: 2, haste: 0.03,
      skill: "Warm spark — taps ignore two defense.",
    },
    cook: {
      id: "cook", name: "Sand-cook", art: "cook",
      blurb: "The kettle is a kind of sword.",
      hp: 34, atk: 5, def: 4,
      gold: 0.08, xp: 0, loot: 0, speed: 0,
      luck: 0, crit: 0, mend: 0.16, ward: 0.03, grit: 0.04, pierce: 0, haste: 0,
      skill: "Second helping — meals heal more, and a spare loaf sometimes.",
    },
    singer: {
      id: "singer", name: "Crowd-singer", art: "singer",
      blurb: "Songs shorten the wait and fill the stands.",
      hp: 28, atk: 5, def: 3,
      gold: 0.1, xp: 0.1, loot: 0, speed: 0.08,
      luck: 0, crit: 0, mend: 0.1, ward: 0, grit: 0, pierce: 0, haste: 0.05,
      skill: "Walking song — heal a little after every card. Crowd fills faster.",
    },
    bath: {
      id: "bath", name: "Bath-ward", art: "brin",
      blurb: "Steam first. The tap arrives second.",
      hp: 36, atk: 5, def: 5,
      gold: 0, xp: 0, loot: 0, speed: 0,
      luck: 0, crit: 0, mend: 0.18, ward: 0.08, grit: 0.06, pierce: 0, haste: 0,
      skill: "Warm water — regen while you walk, and sits mend faster.",
    },
    steward: {
      id: "steward", name: "Gate-steward", art: "shield",
      blurb: "The stands pay you to be polite.",
      hp: 34, atk: 6, def: 5,
      gold: 0.14, xp: 0, loot: 0.04, speed: 0,
      luck: 0.03, crit: 0, mend: 0.04, ward: 0.04, grit: 0.04, pierce: 0, haste: 0,
      skill: "Kind accounts — crowd fills faster, purses lean kinder.",
    },
  };

  const TALENTS = [
    { id: "deep-crate", name: "Deep crate", text: "Loot chance +10%.", loot: 0.1 },
    { id: "kind-taps", name: "Kind taps", text: "+2 attack.", atk: 2 },
    { id: "quilted", name: "Quilted", text: "+8 max hearts.", hp: 8 },
    { id: "short-card", name: "Short card", text: "Cards run a little faster.", speed: 0.08 },
    { id: "story-ear", name: "Story ear", text: "Experience +10%.", xp: 0.1 },
    { id: "honey-hands", name: "Honey hands", text: "Copper profits lean toward 5%.", gold: 0.08 },
    { id: "keen-seam", name: "Keen seam", text: "Crit chance +6%.", crit: 0.06 },
    { id: "soft-hide", name: "Soft hide", text: "Ward +6%. Taps land softer.", ward: 0.06 },
    { id: "quick-kettle", name: "Quick kettle", text: "Mend +8%. Heals go further.", mend: 0.08 },
    { id: "loud-hands", name: "Loud hands", text: "Crowd fills a little faster.", luck: 0.03, gold: 0.04 },
    { id: "night-eyes", name: "Night eyes", text: "Night cards pay extra lessons.", xp: 0.06, crit: 0.03 },
    { id: "rake-mind", name: "Rake mind", text: "The dummy is twice as talkative.", loot: 0.04, speed: 0.03 },
  ];

  const PARAGON_NODES = [
    { id: "might", name: "Kind steel", stat: "might", per: 0.045, text: "A little more poke. Crits lean in." },
    { id: "ward", name: "Quilted hide", stat: "ward", per: 0.04, text: "Taps land softer." },
    { id: "grit", name: "Deep kettle", stat: "grit", per: 0.055, text: "More hearts to share." },
    { id: "fortune", name: "Honey math", stat: "fortune", per: 0.045, text: "Coppers lean kinder." },
    { id: "insight", name: "Lantern lesson", stat: "insight", per: 0.05, text: "Experience sticks." },
    { id: "stride", name: "Short sand", stat: "stride", per: 0.04, text: "The card hurries for you." },
    { id: "find", name: "Soft crate", stat: "find", per: 0.045, text: "More finds on every card." },
    { id: "luck", name: "Lucky crumb", stat: "luck", per: 0.035, text: "Rares and crits say yes more often." },
    { id: "mend", name: "Steam hands", stat: "mend", per: 0.05, text: "Heals and regen go further." },
    { id: "haste", name: "Quick courtesy", stat: "haste", per: 0.035, text: "Bouts resolve sooner." },
  ];

  const SCHOOL = [
    { id: "kettle", name: "Copper kettle", cost: 70, text: "Hearts mend a little faster at home.", blurb: "Steam is a kind of clock." },
    { id: "straw", name: "Straw beds", cost: 180, text: "+4 max hearts for everyone.", blurb: "The inn's cousin." },
    { id: "rake", name: "Sand rake", cost: 260, text: "The dummy pays twice as kindly.", blurb: "A tidy yard is a loud yard." },
    { id: "banner", name: "Gate banner", cost: 360, text: "Loot +8%. Night is polite.", blurb: "A cloth that waits up." },
    { id: "dummy", name: "Smiling dummy", cost: 420, text: "Dummy straw arrives even while you bout.", blurb: "It never sits down first." },
    { id: "baths", name: "Steam annex", cost: 720, text: "Copper profits lean kinder. Towels sometimes arrive.", blurb: "The sand starts at the stoop." },
    { id: "stands", name: "Kind stands", cost: 540, text: "Crowd fills faster. Festival leans louder.", blurb: "Benches that remember names." },
    { id: "kitchen", name: "Gate kitchen", cost: 480, text: "Cooked food heals more. Spare soup some mornings.", blurb: "Cassia's cousin lives here." },
    { id: "archive", name: "Card archive", cost: 640, text: "Filing a card costs less ink. Lessons stick.", blurb: "Pippa would faint politely." },
    { id: "forge", name: "Otto's corner", cost: 800, text: "Oil-polish is cheaper. Worn things hit a little more.", blurb: "A nail that knows your name." },
  ];

  const PETS = [
    { id: "cub", name: "Cub", art: "cub", cost: 55, level: 2, loot: 0.05, gold: 0, heal: 1, blurb: "A wreath for a hat. Approves of naps." },
    { id: "hen", name: "Sand-hen", art: "henpet", cost: 95, level: 5, loot: 0, gold: 0.07, heal: 0, blurb: "Shaped like lunch. Pays in coppers and crumbs." },
    { id: "kettlepet", name: "Pipkin", art: "kettle", cost: 160, level: 8, loot: 0, gold: 0.05, mend: 0.06, heal: 1, blurb: "A kettle that follows. Approves of sitting." },
  ];

  const FOES = {
    dummy: { id: "dummy", name: "Smiling dummy", art: "dummy", hp: 12, atk: 3, def: 0, grow: 1.1, verb: "wobbled into" },
    hen: { id: "hen", name: "Helmet hen", art: "hen", hp: 13, atk: 3, def: 1, grow: 1.1, verb: "pecked, politely," },
    pillow: { id: "pillow", name: "Pillow boar", art: "pillow", hp: 16, atk: 4, def: 1, grow: 1.15, verb: "nuzzled" },
    crab: { id: "crab", name: "Teacup crab", art: "crab", hp: 18, atk: 5, def: 3, grow: 1.2, verb: "pinched, kindly," },
    flour: { id: "flour", name: "Flour golem", art: "flour", hp: 22, atk: 5, def: 2, grow: 1.25, verb: "dusted" },
    lion: { id: "lion", name: "Sleepy lion", art: "lion", hp: 28, atk: 7, def: 3, grow: 1.3, verb: "yawned at" },
    ribbon: { id: "ribbon", name: "Ribbon serpent", art: "ribbon", hp: 24, atk: 6, def: 2, grow: 1.28, verb: "looped" },
    kettle: { id: "kettle", name: "Wandering kettle", art: "kettle", hp: 26, atk: 6, def: 3, grow: 1.28, verb: "steamed" },
    star: { id: "star", name: "Festival star", art: "star", hp: 34, atk: 9, def: 3, grow: 1.35, verb: "glimmered at" },
    banner: { id: "banner", name: "Banner dummy", art: "dummy", hp: 20, atk: 4, def: 2, grow: 1.2, verb: "flapped at" },
    saltcrab: { id: "saltcrab", name: "Salt crab", art: "crab", hp: 24, atk: 6, def: 4, grow: 1.26, verb: "salted" },
    steamcrab: { id: "steamcrab", name: "Steam crab", art: "crab", hp: 26, atk: 6, def: 3, grow: 1.27, verb: "misted" },
    frostboar: { id: "frostboar", name: "Frost pillow", art: "pillow", hp: 30, atk: 6, def: 3, grow: 1.3, verb: "nuzzled, coldly," },
    harvest: { id: "harvest", name: "Harvest loaf", art: "flour", hp: 28, atk: 6, def: 3, grow: 1.28, verb: "crumbed" },
    crownlion: { id: "crownlion", name: "Wreath lion", art: "lion", hp: 36, atk: 8, def: 4, grow: 1.34, verb: "yawned, crowned," },
    nightkettle: { id: "nightkettle", name: "Night kettle", art: "kettle", hp: 32, atk: 7, def: 3, grow: 1.32, verb: "steamed at dusk" },
    wellstar: { id: "wellstar", name: "Well star", art: "star", hp: 42, atk: 10, def: 4, grow: 1.4, verb: "wished at" },
    guest: { id: "guest", name: "Visiting steward", art: "shield", hp: 38, atk: 8, def: 5, grow: 1.36, verb: "bowed into" },
  };

  const CARDS = [
    {
      id: "practice", name: "Practice yard", hint: "Dummies, hens, and kind sand.",
      ms: 8000, level: 1, gold: [4, 7], xp: 3, art: "yard", icon: "🪵",
      loot: [["straw", 0.55], ["soup", 0.35], ["sandal", 0.25]], rare: ["dummyhead", 0.08],
      foes: ["dummy", "hen"],
      says: [
        "The dummy bowed first. You bowed back. Straw applauded.",
        "A hen in a helmet demanded a rematch. You shared soup instead.",
        "The rake left a sandal nobody claimed. It fits someone.",
      ],
    },
    {
      id: "market", name: "Market exhibition", hint: "Pillows, crabs, and a polite crowd.",
      ms: 14000, level: 2, gold: [8, 13], xp: 6, art: "market", icon: "🏪",
      loot: [["ribbon", 0.4], ["ticket", 0.35], ["buckle", 0.3]], rare: ["plume", 0.1],
      foes: ["pillow", "crab"],
      says: [
        "A pillow boar nuzzled the shield and left a ribbon.",
        "A crab wore a teacup and demanded a flourish. You bowed.",
        "Vela sold a ticket to a pigeon. The pigeon paid in crumbs.",
      ],
    },
    {
      id: "afternoon", name: "Afternoon card", hint: "Flour in the air. Honey in the stands.",
      ms: 20000, level: 4, gold: [14, 22], xp: 10, art: "arena", icon: "☀️",
      loot: [["flour", 0.45], ["honey", 0.28], ["oil", 0.3]], rare: ["loaf", 0.1],
      foes: ["flour", "pillow", "crab"],
      says: [
        "The flour golem sneezed a loaf into your crate.",
        "The stands hummed. Someone threw a plume and meant it kindly.",
        "Oil for the shield, honey for the throat. The sand approved.",
      ],
    },
    {
      id: "moon", name: "Moon-sand night", hint: "Lanterns. Lions who would rather nap.",
      ms: 28000, level: 6, gold: [22, 34], xp: 16, art: "night", icon: "🌙",
      loot: [["oil", 0.4], ["steam", 0.3], ["cocoa", 0.22]], rare: ["liontuft", 0.12],
      foes: ["lion", "ribbon", "kettle"],
      says: [
        "The lion yawned. You yawned. The crowd gave you both a wreath.",
        "A ribbon serpent tied itself into a bow and left the extra.",
        "A kettle wandered on, offered tea, and wandered off famous.",
      ],
    },
    {
      id: "festival", name: "Festival games", hint: "Jam, stars, and extra clapping.",
      ms: 24000, level: 8, gold: [28, 42], xp: 20, art: "arena", icon: "🎉",
      loot: [["jam", 0.4], ["ticket", 0.35], ["wreath", 0.28]], rare: ["star", 0.12],
      foes: ["star", "hen", "flour"],
      says: [
        "A star sat in the sand and asked to be counted.",
        "Jam on the shield is still a win, according to Cassia.",
        "The festival forgot to end. You let it keep a minute.",
      ],
    },
    {
      id: "champion", name: "Champion's kettle", hint: "The last mapped card. The sand stays small.",
      ms: 36000, level: 12, gold: [48, 72], xp: 32, art: "arena", icon: "🏆",
      loot: [["wreath", 0.4], ["star", 0.22], ["liontuft", 0.28]], rare: ["star", 0.16],
      foes: ["lion", "star", "kettle"],
      says: [
        "Ludo poured tea in the middle of the sand. Everyone sat.",
        "The last tap felt like the first. The coliseum stayed small. You did not.",
        "A wreath landed on the dummy. The dummy did not argue.",
      ],
    },
    {
      id: "dawn", name: "Dawn warmup", hint: "The sand is still yawning. So are the hens.",
      ms: 10000, level: 2, gold: [6, 10], xp: 4, art: "arena", icon: "🌅", scene: "arena",
      loot: [["straw", 0.4], ["oatcake", 0.3], ["blossom", 0.22]], rare: ["tea", 0.1],
      foes: ["hen", "dummy", "banner"],
      says: [
        "The first clap of the day was a hen. You took it as a compliment.",
        "Dawn oil is thinner. The shield did not mind.",
        "Someone left oatcakes on the gate. The dummy was already chewing.",
      ],
    },
    {
      id: "salt", name: "Salt-wind card", hint: "Crabs who have been to the harbor and have opinions.",
      ms: 18000, level: 5, gold: [16, 24], xp: 12, art: "market", icon: "⚓", scene: "market",
      loot: [["salt", 0.5], ["ticket", 0.3], ["oil", 0.22]], rare: ["coin", 0.12],
      foes: ["saltcrab", "crab", "pillow"],
      says: [
        "A salt crab demanded a rematch in writing. Pippa took notes.",
        "The wind tasted like tickets. Vela called that inventory.",
        "You bowed. The harbor, somewhere, bowed back.",
      ],
    },
    {
      id: "kiln", name: "Kiln-yard card", hint: "Clay that wants to be a mug, then a fight, then a mug.",
      ms: 22000, level: 7, gold: [20, 30], xp: 15, art: "yard", icon: "🔥", scene: "yard",
      loot: [["clay", 0.45], ["ember", 0.28], ["glaze", 0.22]], rare: ["ember", 0.12],
      foes: ["flour", "banner", "kettle"],
      says: [
        "The kiln offered you a mug that was still becoming a mug.",
        "Clay stuck to Rook. He claimed it was armor.",
        "Otto would approve of these stitches of fire.",
      ],
    },
    {
      id: "steam", name: "Steam exhibition", hint: "The baths host a bout. Towels are legal equipment.",
      ms: 20000, level: 7, gold: [18, 28], xp: 14, art: "baths", icon: "♨️", scene: "baths",
      loot: [["steam", 0.45], ["towel", 0.35], ["tea", 0.28]], rare: ["salve", 0.12],
      foes: ["steamcrab", "kettle", "ribbon"],
      says: [
        "The pool was already the right temperature. You did not ask how.",
        "A crab wore a towel as a cape and retired undefeated, briefly.",
        "Nona rang the ladle. Everyone sat, then stood, then sat again.",
      ],
    },
    {
      id: "blossom", name: "Blossom card", hint: "Spring only pretends to be serious.",
      ms: 21000, level: 8, gold: [20, 32], xp: 16, art: "arena", icon: "🌸", scene: "arena",
      loot: [["blossom", 0.5], ["ribbon", 0.3], ["honey", 0.22]], rare: ["jam", 0.12],
      foes: ["hen", "ribbon", "star"],
      says: [
        "Petals counted the taps and lost count on purpose.",
        "A ribbon serpent wore blossoms and demanded to be painted.",
        "The stands sneezed kindly. You called it applause.",
      ],
    },
    {
      id: "harvest", name: "Harvest card", hint: "Loaves with opinions. Leaves that keep score.",
      ms: 23000, level: 8, gold: [22, 34], xp: 17, art: "arena", icon: "🍂", scene: "arena",
      loot: [["leaf", 0.45], ["flour", 0.35], ["cider", 0.22]], rare: ["cider", 0.12],
      foes: ["harvest", "flour", "pillow"],
      says: [
        "A loaf bowed. You buttered the rematch.",
        "Harvest leaves stuck to the shield like medals.",
        "Cassia claimed this card as a cousin of dinner.",
      ],
    },
    {
      id: "frost", name: "Frost card", hint: "Winter keeps a spare bout in the sand.",
      ms: 26000, level: 10, gold: [26, 40], xp: 20, art: "arena", icon: "❄️", scene: "arena",
      loot: [["frostberry", 0.45], ["towel", 0.28], ["cocoa", 0.22]], rare: ["frostjam", 0.12],
      foes: ["frostboar", "lion", "ribbon"],
      says: [
        "The pillow had frost on its stitches and still wanted a hug.",
        "Cocoa steamed in the stands. The lion asked for a cup.",
        "Winter held its breath. Then it let you have some of the quiet.",
      ],
    },
    {
      id: "lanterns", name: "Lantern night", hint: "Paper lights. A kettle that forgot to go home.",
      ms: 32000, level: 11, gold: [32, 48], xp: 24, art: "arena", icon: "🏮", scene: "arena",
      loot: [["oil", 0.4], ["wax", 0.32], ["moontea", 0.2]], rare: ["star", 0.12],
      foes: ["nightkettle", "ribbon", "star"],
      says: [
        "The lanterns leaned in to hear Calla. One of them stayed.",
        "A night kettle offered the last cup and meant it.",
        "You walked the sand until your thoughts were the same color as the lamps.",
      ],
    },
    {
      id: "guest", name: "Visiting wreath", hint: "Another school came for tea and a tap.",
      ms: 24000, level: 6, gold: [24, 38], xp: 18, art: "arena", icon: "🤝", scene: "arena",
      loot: [["wreath", 0.35], ["ticket", 0.35], ["tea", 0.3]], rare: ["plume", 0.14],
      foes: ["guest", "banner", "lion"],
      says: [
        "They bowed first. You bowed longer. The stands called it a draw, then a win.",
        "Their steward left a wreath and took a recipe.",
        "Two schools, one kettle. The sand was wide enough.",
      ],
    },
    {
      id: "starwell", name: "Star-kettle", hint: "A well full of yes. End of the mapped card.",
      ms: 42000, level: 16, gold: [70, 110], xp: 44, art: "arena", icon: "✨", scene: "arena",
      loot: [["star", 0.35], ["wish", 0.2], ["moontea", 0.28]], rare: ["wish", 0.14],
      foes: ["wellstar", "crownlion", "nightkettle"],
      says: [
        "You looked in. The well looked back, kindly, and handed you a star.",
        "A wish floated up like steam. You bottled the leftover warmth.",
        "The last tap felt like the first. The coliseum stayed small. You did not.",
      ],
    },
  ];

  const ROSTER = [
    { id: "hero", name: "You", role: "Keeper", art: "you", cost: 0, level: 1, hp: 32, atk: 6, def: 4, blurb: "Wooden sword. Kind pockets.", bonus: () => ({}) },
    { id: "rook", name: "Rook", role: "Shield-sitter", art: "shield", cost: 80, level: 2, hp: 30, atk: 6, def: 6, blurb: "Sits down last. Stands up first.", bonus: () => ({ ward: 0.08, gold: 0.04 }) },
    { id: "nett", name: "Nett", role: "Net-weaver", art: "net", cost: 180, level: 4, hp: 18, atk: 6, def: 3, blurb: "Finds what the sand is hiding.", bonus: () => ({ loot: 0.16, luck: 0.05, speed: 0.03 }) },
    { id: "fizz", name: "Fizz", role: "Fancy-foot", art: "foot", cost: 260, level: 5, hp: 16, atk: 8, def: 2, blurb: "Crits, then curtsies.", bonus: () => ({ crit: 0.1, haste: 0.05, speed: 0.06 }) },
    { id: "lux", name: "Lux", role: "Lantern-blade", art: "lantern", cost: 360, level: 6, hp: 18, atk: 9, def: 2, blurb: "Lights the rare corners.", bonus: () => ({ pierce: 2, xp: 0.08, crit: 0.04 }) },
    { id: "pot", name: "Pot", role: "Sand-cook", art: "cook", cost: 440, level: 8, hp: 24, atk: 4, def: 4, blurb: "Soup for bruises. Flour for courage.", bonus: () => ({ mend: 0.14, gold: 0.06 }) },
    { id: "calla", name: "Calla", role: "Crowd-singer", art: "singer", cost: 560, level: 9, hp: 20, atk: 5, def: 3, blurb: "Songs that make the wait shorter.", bonus: () => ({ xp: 0.2, gold: 0.08, speed: 0.06, mend: 0.06 }) },
    { id: "brin", name: "Brin", role: "Bath-ward", art: "brin", cost: 680, level: 10, hp: 26, atk: 5, def: 5, blurb: "Steam first. The tap can wait.", bonus: () => ({ mend: 0.16, ward: 0.06, grit: 0.04 }) },
    { id: "moss", name: "Moss", role: "Yard-raker", art: "moss", cost: 760, level: 11, hp: 24, atk: 6, def: 4, blurb: "The dummy votes for him. So does the straw.", bonus: () => ({ loot: 0.1, gold: 0.06, speed: 0.04, luck: 0.03 }) },
  ];

  const GEAR = [
    { id: "cap", slot: "hat", name: "Yard cap", cost: 0, level: 1, start: true, blurb: "Already warm." },
    { id: "plume-hat", slot: "hat", name: "Olive plume", cost: 45, level: 3, loot: 0.06, luck: 0.03, blurb: "Slightly more finds." },
    { id: "wreath-hat", slot: "hat", name: "Practice wreath", cost: 220, level: 8, xp: 0.08, atk: 1, crit: 0.04, blurb: "Lessons stick." },
    { id: "sash", slot: "cloak", name: "Honey sash", cost: 0, level: 1, start: true, blurb: "Home on your shoulders." },
    { id: "quilt", slot: "cloak", name: "Quilted sash", cost: 90, level: 3, gold: 0.1, ward: 0.03, blurb: "Pockets for coppers." },
    { id: "night-cloak", slot: "cloak", name: "Night banner", cost: 360, level: 10, gold: 0.12, xp: 0.05, luck: 0.04, blurb: "Night likes you." },
    { id: "sandals", slot: "boots", name: "Sand sandals", cost: 0, level: 1, start: true, blurb: "They know the yard." },
    { id: "stout", slot: "boots", name: "Otto's stout sandals", cost: 70, level: 2, gold: 0.06, speed: 0.08, ward: 0.02, blurb: "Shorter cards." },
    { id: "cloudstep", slot: "boots", name: "Ribbon sandals", cost: 280, level: 9, speed: 0.16, haste: 0.05, blurb: "The sand hurries for you." },
    { id: "copper", slot: "charm", name: "Lucky copper", cost: 0, level: 1, start: true, blurb: "A small yes." },
    { id: "tea-tin", slot: "charm", name: "Tea tin", cost: 55, level: 3, gold: 0.04, loot: 0.05, mend: 0.04, blurb: "Smells like arriving." },
    { id: "moon-locket", slot: "charm", name: "Moon locket", cost: 400, level: 12, gold: 0.08, xp: 0.08, loot: 0.08, atk: 1, crit: 0.05, luck: 0.04, blurb: "The night remembers you." },
    { id: "harbor-charm", slot: "charm", name: "Ticket charm", cost: 0, level: 1, gold: 0.04, loot: 0.06, blurb: "Crafted from ticket and ribbon." },
    { id: "ember-charm", slot: "charm", name: "Kettle bead", cost: 0, level: 1, gold: 0.05, atk: 1, blurb: "Crafted kettle-warm." },
    { id: "stick", slot: "weapon", name: "Practice stick", cost: 0, level: 1, start: true, atk: 2, blurb: "A tap and a poke." },
    { id: "spoon-lance", slot: "weapon", name: "Spoon lance", cost: 90, level: 4, atk: 4, blurb: "Pot approved." },
    { id: "lantern-blade", slot: "weapon", name: "Lantern blade", cost: 280, level: 8, atk: 6, pierce: 1, crit: 0.04, blurb: "Warm at both ends." },
    { id: "steam-cap", slot: "hat", name: "Steam cap", cost: 160, level: 6, mend: 0.06, ward: 0.03, blurb: "Nona's spare." },
    { id: "harvest-cloak", slot: "cloak", name: "Harvest cloak", cost: 200, level: 7, gold: 0.08, xp: 0.04, blurb: "Leaves in the lining." },
    { id: "frost-boots", slot: "boots", name: "Frost sandals", cost: 240, level: 10, speed: 0.08, ward: 0.04, blurb: "Winter hurries less." },
    { id: "star-charm", slot: "charm", name: "Star bead", cost: 520, level: 14, luck: 0.06, xp: 0.08, crit: 0.04, blurb: "The well said keep it." },
    { id: "rake-staff", slot: "weapon", name: "Kind rake", cost: 180, level: 6, atk: 5, loot: 0.05, blurb: "Moss approved." },
  ];

  const RECIPES = [
    { id: "soup", name: "Gate soup", needs: { straw: 2, flour: 1 }, say: "The house smells like coming home.", buff: { mend: 0.06, left: 3 } },
    { id: "tea", name: "Sand tea", needs: { honey: 1 }, say: "Steam like a small blessing.", buff: { haste: 0.04, left: 3 } },
    { id: "loaf", name: "Sand loaf", needs: { flour: 2, honey: 1 }, say: "Cassia would approve of the crust." },
    { id: "salve", name: "Honey salve", needs: { honey: 1, oil: 1 }, say: "For the sitting-down minutes." },
    { id: "jam", name: "Festival jam", needs: { honey: 1, ribbon: 1 }, say: "A jar of clapping." },
    { id: "cocoa", name: "Night cocoa", needs: { honey: 1, steam: 1 }, say: "The moon asked for a cup.", buff: { luck: 0.06, left: 4 } },
    { id: "oatcake", name: "Yard cakes", needs: { flour: 1, straw: 1 }, say: "Breakfast that travels.", buff: { speed: 0.05, left: 3 } },
    { id: "broth", name: "Night broth", needs: { soup: 1, oil: 1 }, say: "Deep sand in a bowl.", buff: { mend: 0.08, left: 4 } },
    { id: "cider", name: "Autumn cider", needs: { leaf: 2, honey: 1 }, say: "Steam and spice from the air.", buff: { gold: 0.08, left: 4 } },
    { id: "frostjam", name: "Frost jam", needs: { frostberry: 2 }, say: "A jar of quiet.", buff: { ward: 0.05, left: 3 } },
    { id: "moontea", name: "Moon tea", needs: { steam: 1, oil: 1, honey: 1 }, say: "It tastes like staying up.", buff: { xp: 0.1, haste: 0.04, left: 5 } },
  ];

  const CRAFTS = [
    { id: "harbor-charm", name: "Ticket charm", needs: { ticket: 1, ribbon: 1 }, say: "Vela would call this accounting." },
    { id: "ember-charm", name: "Kettle bead", needs: { oil: 1, wax: 1 }, say: "Warm in the pocket." },
    { id: "wreath", name: "Practice wreath", needs: { straw: 2, ribbon: 1 }, say: "The dummy looked prouder." },
    { id: "wax", name: "Banner wax", needs: { oil: 1, honey: 1 }, say: "The cloth learned to shine." },
    { id: "glaze", name: "Honey glaze", needs: { honey: 1, clay: 1 }, say: "A mug that remembers hands." },
    { id: "star-charm", name: "Star bead", needs: { star: 1, oil: 1 }, say: "The well said keep it." },
  ];

  const SHOP = [
    { id: "soup", cost: 12 },
    { id: "tea", cost: 9 },
    { id: "oil", cost: 16 },
    { id: "honey", cost: 24 },
    { id: "salve", cost: 48 },
    { id: "plume", cost: 20 },
    { id: "ink", cost: 14 },
    { id: "wax", cost: 18 },
    { id: "ticket", cost: 16 },
    { id: "steam", cost: 22 },
    { id: "oatcake", cost: 11 },
  ];

  const MUSEUM = [
    { id: "dummyhead", name: "First smile", need: "dummyhead", gold: 0.03, blurb: "The dummy that started it." },
    { id: "plume", name: "Olive plume", need: "plume", loot: 0.04, blurb: "A feather that learned your name." },
    { id: "liontuft", name: "Lion tuft", need: "liontuft", ward: 0.03, blurb: "Given, not taken." },
    { id: "star", name: "Sand star", need: "star", xp: 0.05, luck: 0.03, blurb: "It asked to be kept." },
    { id: "wreath", name: "Practice wreath", need: "wreath", gold: 0.04, blurb: "The shelf's favorite hat." },
    { id: "ember", name: "Kind ember", need: "ember", haste: 0.03, blurb: "Still warm. On purpose." },
    { id: "wish", name: "Well wish", need: "wish", luck: 0.05, xp: 0.04, blurb: "It asked to stay." },
    { id: "clay", name: "First mug", need: "clay", gold: 0.03, blurb: "Otto labeled the space." },
    { id: "frostberry", name: "Winter yes", need: "frostberry", ward: 0.03, blurb: "Cold, then kind." },
  ];

  const NPCS = [
    {
      id: "cassia", name: "Cassia", role: "the kettle", art: "cassia",
      wants: ["flour", "loaf", "honey"],
      say: "Bring flour and I will pretend it was always soup.",
      thanks: "The pot remembered your footsteps.",
      gifts: { 1: ["soup", 2], 3: ["loaf", 2], 5: ["honey", 3] },
    },
    {
      id: "ludo", name: "Ludo", role: "retired champion", art: "ludo",
      wants: ["tea", "wreath", "cocoa"],
      say: "I traded the wreath for a cup. I would trade again.",
      thanks: "Sit. The sand can wait one sip.",
      gifts: { 1: ["tea", 2], 3: ["wreath", 1], 5: ["star", 1] },
    },
    {
      id: "pippa", name: "Pippa", role: "the scribe", art: "pippa",
      wants: ["ink", "page", "ribbon"],
      say: "The card wants a better sentence. So do I.",
      thanks: "I wrote you in the margin. The margin liked it.",
      gifts: { 1: ["ink", 2], 3: ["page", 2], 5: ["ticket", 3] },
    },
    {
      id: "otto", name: "Otto", role: "the armorer", art: "otto",
      wants: ["buckle", "oil", "clay"],
      say: "A buckle that wandered off. It misses its belt.",
      thanks: "Your sandals wrote. They are happy.",
      gifts: { 1: ["oil", 1], 3: ["buckle", 2], 5: ["ember", 1] },
    },
    {
      id: "nona", name: "Nona", role: "the baths", art: "nona",
      wants: ["towel", "steam", "salve"],
      say: "Steam keeps a list. You are on it, kindly.",
      thanks: "The water was already the right temperature.",
      gifts: { 1: ["towel", 1], 3: ["steam", 2], 5: ["salve", 2] },
    },
    {
      id: "vela", name: "Vela", role: "tickets", art: "vela",
      wants: ["ticket", "coin", "plume"],
      say: "Someone left a ticket with your name, even before it did.",
      thanks: "The tin coughed up a kindness. I forwarded it.",
      gifts: { 1: ["ticket", 2], 3: ["coin", 1], 5: ["plume", 2] },
    },
  ];

  const STORY = [
    { id: "first-card", title: "The first card", text: "You came home with straw and a new crease in the sand.", gold: 8, test: (s) => Object.values(s.bouts || {}).reduce((a, b) => a + b, 0) >= 1 },
    { id: "first-friend", title: "A packed crate", text: "Someone else thought the gate was worth following.", gold: 16, test: (s) => (s.party || []).length >= 2 },
    { id: "first-keeper", title: "A moss wreath", text: "The sand introduced its steward. You bowed. They bowed back.", gold: 24, test: (s) => Object.values(s.bouts || {}).some((n) => n >= 8) },
    { id: "school", title: "A school of your own", text: "The ludus learned your footsteps.", gold: 20, test: (s) => Object.keys(s.school || {}).length >= 1 },
    { id: "post", title: "A name that travels", text: "Pippa filed you under 'comes home.'", item: "ribbon", n: 1, test: (s) => (s.hearts && s.hearts.pippa) >= 1 },
    { id: "festival", title: "A table in the stands", text: "The town set an extra place and did not say for whom.", gold: 30, test: (s) => !!s.sawFestival },
    { id: "bonded", title: "A known bout", text: "A companion started finishing your sentences with soup.", gold: 22, test: (s) => Object.values(s.bonds || {}).some((n) => n >= 12) },
    { id: "moon", title: "The sand in white", text: "Night showed you a card it had been saving.", item: "cocoa", n: 1, test: (s) => (s.bouts && s.bouts.moon) >= 1 },
    { id: "champion", title: "The last mapped tap", text: "The kettle said yes. The coliseum stayed small. You did not.", gold: 80, test: (s) => (s.bouts && s.bouts.champion) >= 1 },
    { id: "full-table", title: "A crowded gate", text: "Five kinds of footsteps, one kettle.", gold: 40, test: (s) => (s.party || []).length >= 5 },
    { id: "shelf", title: "A shelf with your handwriting", text: "Ludo labeled a space and left it empty for later.", gold: 24, test: (s) => Object.keys(s.museum || {}).length >= 3 },
    { id: "kindled", title: "A wreath that remembers", text: "You came home to a town that had forgotten your crate and kept your math.", gold: 16, test: (s) => (s.paragon && s.paragon.kindles) >= 1 },
    { id: "dawn", title: "A morning that waited", text: "The sand yawned. You yawned back. That counted.", gold: 12, test: (s) => (s.bouts && s.bouts.dawn) >= 1 },
    { id: "salt", title: "A wind with opinions", text: "The harbor sent a crab. You sent a bow.", item: "salt", n: 2, test: (s) => (s.bouts && s.bouts.salt) >= 1 },
    { id: "kiln", title: "A mug that fought first", text: "Clay learned your name before it learned to be a cup.", item: "ember", n: 1, test: (s) => (s.bouts && s.bouts.kiln) >= 1 },
    { id: "steam", title: "A towel that kept score", text: "The baths hosted a bout and called it hygiene.", item: "steam", n: 2, test: (s) => (s.bouts && s.bouts.steam) >= 1 },
    { id: "guest", title: "A school that visited", text: "They came for tea. They left with a recipe. You kept a wreath.", gold: 28, test: (s) => (s.bouts && s.bouts.guest) >= 1 },
    { id: "starwell", title: "A well full of yes", text: "The last mapped card. The sand stayed small.", gold: 90, test: (s) => (s.bouts && s.bouts.starwell) >= 1 },
    { id: "titled", title: "A name the stands keep", text: "The crowd decided you were worth a second clap.", gold: 22, test: (s) => ((s.titles || (s.paragon && s.paragon.titles) || []).length >= 1) },
    { id: "filed", title: "A card that stays", text: "Pippa filed a loop so the wreath would remember the bends.", gold: 20, test: (s) => !!(s.paragon && s.paragon.codex && Object.keys(s.paragon.codex).length) },
    { id: "oiled", title: "A shine that lasts", text: "Otto nodded at the rim. That was the whole review.", gold: 18, test: (s) => Object.values(s.temper || {}).some((n) => n >= 1) },
    { id: "trained", title: "A dummy that teaches", text: "Someone sat with the straw and came back taller.", gold: 14, test: (s) => !!s.everTrained },
    { id: "full-hearts", title: "A neighbor who stays", text: "Five hearts. One kettle. No hurry.", gold: 36, test: (s) => Object.values(s.hearts || {}).some((n) => n >= 5) },
  ];

  const STAMPS = [
    { id: "walker", name: "Bouted", icon: "🏛", test: (s) => Object.values(s.bouts || {}).reduce((a, b) => a + b, 0) >= 25 },
    { id: "host", name: "Host", icon: "🫖", test: (s) => (s.party || []).length >= 4 },
    { id: "keeper", name: "Steward", icon: "👑", test: (s) => Object.values(s.bouts || {}).some((n) => n >= 16) },
    { id: "cook", name: "Kettle", icon: "🍲", test: (s) => (s.pack && ((s.pack.soup || 0) + (s.pack.tea || 0))) >= 1 },
    { id: "post", name: "Posted", icon: "✉", test: (s) => (s.mail || []).some((m) => m.read) },
    { id: "pet", name: "Lap", icon: "🐾", test: (s) => !!s.pet },
    { id: "story", name: "Chaptered", icon: "📖", test: (s) => Object.keys(s.story || {}).length >= 5 },
    { id: "champ", name: "Kettled", icon: "🏆", test: (s) => (s.bouts && s.bouts.champion) >= 1 },
    { id: "gift", name: "Given", icon: "🎁", test: (s) => !!s.gaveGift },
    { id: "board", name: "Boarded", icon: "📌", test: (s) => (s.errandsDone || 0) >= 5 },
    { id: "dummy", name: "Raked", icon: "🪵", test: (s) => !!s.dummyCollected },
    { id: "booth", name: "Ticketed", icon: "🎫", test: (s) => !!s.boothCollected },
    { id: "shelf", name: "Shelved", icon: "🏺", test: (s) => Object.keys(s.museum || {}).length >= 3 },
    { id: "kindle", name: "Hung", icon: "🌿", test: (s) => (s.paragon && s.paragon.kindles) >= 1 },
    { id: "dawn", name: "Early", icon: "🌅", test: (s) => (s.bouts && s.bouts.dawn) >= 3 },
    { id: "season", name: "Seasoned", icon: "🍂", test: (s) => ["blossom", "harvest", "frost"].filter((id) => s.bouts && s.bouts[id]).length >= 2 },
    { id: "guest", name: "Hosted", icon: "🤝", test: (s) => (s.bouts && s.bouts.guest) >= 1 },
    { id: "star", name: "Wished", icon: "✨", test: (s) => (s.bouts && s.bouts.starwell) >= 1 },
    { id: "title", name: "Named", icon: "🎖", test: (s) => ((s.titles || (s.paragon && s.paragon.titles) || []).length >= 2) },
    { id: "oil", name: "Shined", icon: "✨", test: (s) => Object.values(s.temper || {}).reduce((a, n) => a + n, 0) >= 6 },
    { id: "file", name: "Filed", icon: "📒", test: (s) => Object.keys((s.paragon && s.paragon.codex) || {}).length >= 3 },
    { id: "hearts5", name: "Kept", icon: "♥", test: (s) => Object.values(s.hearts || {}).some((n) => n >= 5) },
  ];

  const ERRANDS = [
    { id: "bout-any", kind: "bouts", n: 3, text: "Walk any card three times today.", gold: 20, xp: 6 },
    { id: "forage", kind: "forage", n: 2, text: "Pick two finds off the painted world.", gold: 12, xp: 4 },
    { id: "gift", kind: "gift", n: 1, text: "Give a neighbor something from the crate.", gold: 14, xp: 4 },
    { id: "cook", kind: "cook", n: 1, text: "Cook or craft one thing.", gold: 16, xp: 5 },
    { id: "npc", kind: "npc", n: 1, text: "Visit a neighbor and talk a minute.", gold: 10, xp: 4 },
    { id: "dummy", kind: "dummy", n: 1, text: "Collect whatever the dummy offered.", gold: 14, xp: 4 },
    { id: "booth", kind: "booth", n: 1, text: "Check Vela's tin.", gold: 12, xp: 4 },
    { id: "oil", kind: "oil", n: 1, text: "Oil-polish one worn thing.", gold: 16, xp: 5 },
    { id: "rite", kind: "rite", n: 1, text: "Pour a steam rite before a card.", gold: 14, xp: 4 },
    { id: "train", kind: "train", n: 1, text: "Send someone to sit with the dummy.", gold: 12, xp: 4 },
    { id: "title", kind: "title", n: 1, text: "Let the crowd name you once.", gold: 20, xp: 6 },
    { id: "file", kind: "file", n: 1, text: "File a card in the archive.", gold: 18, xp: 5 },
  ];

  const ART = {
    you: "assets/glad-you.jpg",
    shield: "assets/glad-shield.jpg",
    net: "assets/glad-net.jpg",
    foot: "assets/glad-foot.jpg",
    lantern: "assets/glad-lantern.jpg",
    cook: "assets/glad-cook.jpg",
    singer: "assets/glad-singer.jpg",
    dummy: "assets/foe-dummy.jpg",
    hen: "assets/foe-hen.jpg",
    pillow: "assets/foe-pillow.jpg",
    crab: "assets/foe-crab.jpg",
    flour: "assets/foe-flour.jpg",
    lion: "assets/foe-lion.jpg",
    ribbon: "assets/foe-ribbon.jpg",
    kettle: "assets/foe-kettle.jpg",
    star: "assets/foe-star.jpg",
    cassia: "assets/npc-cassia.jpg",
    ludo: "assets/npc-ludo.jpg",
    pippa: "assets/npc-pippa.jpg",
    otto: "assets/npc-otto.jpg",
    nona: "assets/npc-nona.jpg",
    vela: "assets/npc-vela.jpg",
    cub: "assets/pet-cub.jpg",
    henpet: "assets/pet-hen.jpg",
    brin: "assets/glad-brin.jpg",
    moss: "assets/glad-moss.jpg",
  };

  const RANKS = [
    { at: 1, name: "Newcomer" },
    { at: 4, name: "Gate-friend" },
    { at: 8, name: "Sand-sitter" },
    { at: 12, name: "Crowd-darling" },
    { at: 16, name: "Kettle Champion" },
    { at: 22, name: "Lantern of the Sand" },
    { at: 28, name: "Well-friend" },
    { at: 36, name: "Keeper of the Kettle" },
  ];

  const TITLES = [
    { id: "kind-gate", name: "Kind Gate", crowd: 70, gold: 0.04, text: "The stands learned your name." },
    { id: "loud-sand", name: "Loud Sand", crowd: 80, loot: 0.05, text: "Clapping that arrives early." },
    { id: "honey-stands", name: "Honey Stands", crowd: 90, xp: 0.05, gold: 0.03, text: "The benches brought jam." },
    { id: "night-darling", name: "Night Darling", crowd: 95, luck: 0.04, haste: 0.03, text: "Lamps wait up for you." },
    { id: "kettle-voice", name: "Kettle Voice", crowd: 100, mend: 0.06, gold: 0.05, text: "Even the pot claps." },
  ];

  let state;
  let audio;
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
  function pennies(n) { return Math.round((Number(n) || 0) * 100) / 100; }

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

  function fmtPct(n) {
    const v = (Number(n) || 0) * 100;
    const shown = Math.abs(v) >= 10 ? v.toFixed(0) : v.toFixed(1);
    return (v >= 0 ? "+" : "") + shown + "%";
  }

  function softCap(n, k) {
    n = Math.max(0, Number(n) || 0);
    if (k <= 0) return n;
    return n / (1 + n / k);
  }

  function xpNeeded(level) {
    const lv = Math.max(1, level);
    const late = lv > 18 ? 1 + (lv - 18) * 0.035 : 1;
    return Math.floor(16 * Math.pow(lv, 1.55) * late);
  }

  function art(id) { return ART[id] || ""; }
  function imgTag(id, alt) {
    const src = art(id);
    return src ? `<img src="${src}" alt="${esc(alt || "")}" />` : "";
  }

  function seasonId() {
    return SEASONS[Math.floor(((state.day - 1) % 112) / 28)] || "spring";
  }

  function isFestival() {
    const d = ((state.day - 1) % 28) + 1;
    return d === 14 || d === 28;
  }

  function timeOfDay() {
    const t = ((Date.now() - state.dayAt) / DAY_MS) % 1;
    if (t < 0.18) return "morning";
    if (t < 0.5) return "noon";
    if (t < 0.72) return "dusk";
    return "night";
  }

  function rankName() {
    let name = RANKS[0].name;
    RANKS.forEach((r) => { if (state.level >= r.at) name = r.name; });
    return name;
  }

  function classBy() { return CLASSES[state.classId] || CLASSES.gate; }
  function cardById(id) { return CARDS.find((c) => c.id === id) || CARDS[0]; }
  function memberById(id) { return ROSTER.find((m) => m.id === id); }
  function gearById(id) { return GEAR.find((g) => g.id === id); }
  function itemName(id) { return (ITEMS[id] && ITEMS[id].name) || id; }

  function totalBouts() {
    return Object.values(state.bouts || {}).reduce((a, b) => a + b, 0);
  }

  function cardUnlocked(card) {
    if (card.id === "practice") return true;
    if (card.id === "dawn") return totalBouts() >= 2 || state.level >= 2;
    if (card.id === "market") return totalBouts() >= 3 || state.level >= 2;
    if (card.id === "afternoon") return state.level >= 4 || totalBouts() >= 8;
    if (card.id === "salt") return state.level >= 5 || (state.bouts && state.bouts.market >= 3);
    if (card.id === "kiln") return state.level >= 7 || (state.bouts && state.bouts.afternoon >= 2);
    if (card.id === "steam") return state.level >= 7 || (state.school && state.school.baths) || (state.hearts && state.hearts.nona >= 1);
    if (card.id === "moon") return state.level >= 6 || (state.bouts && state.bouts.afternoon >= 3);
    if (card.id === "blossom") return seasonId() === "spring" || state.level >= 8 || (state.bouts && state.bouts.dawn >= 3);
    if (card.id === "harvest") return seasonId() === "autumn" || state.level >= 8 || (state.bouts && state.bouts.afternoon >= 4);
    if (card.id === "frost") return seasonId() === "winter" || state.level >= 10 || (state.bouts && state.bouts.moon >= 1);
    if (card.id === "festival") return state.level >= 8 || state.sawFestival || isFestival();
    if (card.id === "lanterns") return state.level >= 11 || (state.bouts && state.bouts.moon >= 3);
    if (card.id === "guest") return !!state.rival || (state.bouts && state.bouts.guest >= 1) || stewardWins() >= 2;
    if (card.id === "champion") return state.level >= 12 || (state.bouts && state.bouts.moon >= 4);
    if (card.id === "starwell") return state.level >= 16 || (state.bouts && state.bouts.champion >= 2);
    return state.level >= card.level;
  }

  function stewardWins() {
    return Object.values(state.seen || {}).reduce((n, s) => n + ((s && s.wins) || 0), 0);
  }

  function npcWant(npc) {
    const list = npc.wants || [npc.want];
    const h = state.hearts[npc.id] || 0;
    return list[Math.min(h, list.length - 1)];
  }

  function ownedTitles() {
    const fromPara = (para().titles || []);
    const fromState = state.titles || [];
    const set = {};
    fromPara.concat(fromState).forEach((id) => { set[id] = true; });
    return Object.keys(set);
  }

  function hasTitle(id) { return ownedTitles().indexOf(id) >= 0; }

  function circuitOf(id) { return (state.circuit && state.circuit[id]) || 0; }
  function cardHeld(id) { return circuitOf(id) >= 8; }

  function temperOf(id) { return (state.temper && state.temper[id]) || 0; }
  function temperCost(rank) {
    return { oil: 1 + Math.floor(rank / 2) + ((state.school && state.school.forge) ? 0 : 0), spark: rank >= 4 };
  }

  function blankParagon() {
    return {
      kindles: 0, points: 0, tree: {},
      lifetimeBouts: 0, lifetimeGold: 0, lifetimeXp: 0,
      bestLevel: 1, bestBouts: 0, lastScore: 0, lastGain: 0,
      codex: {}, titles: [],
    };
  }

  function para() {
    if (!state.paragon) state.paragon = blankParagon();
    if (!state.paragon.tree) state.paragon.tree = {};
    if (!state.paragon.codex) state.paragon.codex = {};
    if (!state.paragon.titles) state.paragon.titles = [];
    return state.paragon;
  }

  function nodeRank(id) { return (para().tree && para().tree[id]) || 0; }
  function nodeCost(rank) { return 1 + Math.floor(rank * 1.25); }

  function paragonSpent() {
    return PARAGON_NODES.reduce((s, n) => {
      const r = nodeRank(n.id);
      let cost = 0;
      for (let i = 0; i < r; i++) cost += nodeCost(i);
      return s + cost;
    }, 0);
  }

  function talentSum(k) {
    return (state.talents || []).reduce((s, id) => {
      const t = TALENTS.find((x) => x.id === id);
      return s + ((t && t[k]) || 0);
    }, 0);
  }

  function talentsDue() {
    const earned = Math.floor(state.level / 3);
    return Math.max(0, earned - (state.talents || []).length);
  }

  function bondOf(id) { return (state.bonds && state.bonds[id]) || 0; }

  function packCount(id) { return (state.pack && state.pack[id]) || 0; }

  function addPack(id, n) {
    if (!state.pack) state.pack = {};
    state.pack[id] = (state.pack[id] || 0) + (n || 1);
  }

  function takePack(id, n) {
    n = n || 1;
    if (packCount(id) < n) return false;
    state.pack[id] -= n;
    if (state.pack[id] <= 0) delete state.pack[id];
    return true;
  }

  function ensureCombat() {
    if (!state.hp) state.hp = {};
    if (!state.party || !state.party.length) state.party = ["hero"];
    if (!state.party.includes("hero")) state.party.unshift("hero");
    state.party.forEach((id) => {
      if (state.hp[id] == null) state.hp[id] = maxHp(id);
    });
  }

  function classHp() { return (classBy().hp || 32) + talentSum("hp") + ((state.school && state.school.straw) ? 4 : 0); }

  function maxHp(id) {
    const m = memberById(id);
    if (!m) return 10;
    const grit = sheet().grit;
    const extra = Math.round(softCap(grit, 1.2) * 18);
    if (id === "hero") return classHp() + extra + Math.floor((state.level - 1) * 1.6);
    return m.hp + extra + Math.floor((state.level - 1) * 0.8);
  }

  function curHp(id) { return Math.max(0, state.hp[id] == null ? maxHp(id) : state.hp[id]); }
  function setHp(id, n) { state.hp[id] = Math.max(0, Math.min(maxHp(id), n)); }

  function partyHp() { return state.party.reduce((s, id) => s + curHp(id), 0); }
  function partyMaxHp() { return state.party.reduce((s, id) => s + maxHp(id), 0); }
  function livingMembers() {
    return state.party.filter((id) => curHp(id) > 0 && id !== state.training);
  }

  function memberName(id) {
    if (id === "hero") return state.name || "You";
    const m = memberById(id);
    return m ? m.name : id;
  }

  function combatStats(id) {
    const s = sheet();
    const m = memberById(id);
    const atkGear = Object.values(state.gear || {}).reduce((n, gid) => {
      const g = gearById(gid);
      return n + ((g && g.atk) || 0) + Math.floor(temperOf(gid) / 2);
    }, 0);
    const forge = (state.school && state.school.forge) ? 1 : 0;
    if (id === "hero") {
      const c = classBy();
      return {
        atk: c.atk + talentSum("atk") + atkGear + forge + Math.floor((state.level - 1) * 0.35) + Math.round(s.might * 4),
        def: c.def + Math.floor((state.level - 1) * 0.15) + Math.floor(Object.values(state.temper || {}).reduce((a, n) => a + n, 0) / 6),
        pierce: (c.pierce || 0) + (s.pierce || 0),
      };
    }
    return {
      atk: (m ? m.atk : 4) + Math.floor((state.level - 1) * 0.2) + Math.round(s.might * 2),
      def: m ? m.def : 2,
      pierce: s.pierce || 0,
    };
  }

  function bonuses() {
    const b = {
      gold: 1, xp: 1, loot: 1, speed: 1,
      might: 0, ward: 0, grit: 0, fortune: 0, insight: 0, stride: 0,
      find: 0, luck: 0, mend: 0, haste: 0, pierce: 0, crit: 0, critDmg: 0, atk: 0, hp: 0,
    };
    const addTo = (src) => {
      if (!src) return;
      Object.keys(b).forEach((k) => { if (src[k]) b[k] += src[k]; });
    };
    addTo(classBy());
    state.party.forEach((id) => {
      const m = memberById(id);
      if (!m || !m.bonus) return;
      const src = m.bonus();
      if (id === state.training) {
        Object.keys(src).forEach((k) => { if (src[k]) b[k] += src[k] * 0.5; });
      } else addTo(src);
    });
    Object.keys(state.gear || {}).forEach((slot) => addTo(gearById(state.gear[slot])));
    (state.buffs || []).forEach((buff) => addTo(buff));
    NPCS.forEach((npc) => { b.gold += (state.hearts[npc.id] || 0) * 0.02; });
    ownedTitles().forEach((id) => addTo(TITLES.find((t) => t.id === id)));
    ["gold", "xp", "loot", "speed", "crit", "ward", "mend", "luck", "atk", "hp"].forEach((k) => {
      if (k !== "atk" && k !== "hp") b[k] += talentSum(k);
    });
    if (state.school && state.school.banner) b.loot += 0.08;
    if (state.school && state.school.baths) b.gold += 0.1;
    if (state.school && state.school.stands) b.gold += 0.04;
    if (state.school && state.school.kitchen) b.mend += 0.05;
    if (state.school && state.school.archive) b.xp += 0.06;
    if (state.school && state.school.forge) b.might += 0.03;
    if (state.riteLeft > 0) { b.haste += 0.08; b.mend += 0.08; b.luck += 0.04; }
    if (state.focus && cardHeld(state.focus)) b.gold += 0.04;
    if (state.focus === state.card) b.loot += 0.05;
    if (cardHeld(state.card)) { b.gold += 0.08; b.speed += 0.04; }
    if (para().codex && para().codex[state.card]) { b.xp += 0.08; b.loot += 0.04; }
    if (state.purse) { b.gold += 0.8; }
    if (state.classId === "bath") b.mend += 0.04;
    if (state.classId === "steward") b.gold += 0.04;
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
    Object.keys(state.museum || {}).forEach((id) => addTo(MUSEUM.find((x) => x.id === id)));
    PARAGON_NODES.forEach((n) => { b[n.stat] += nodeRank(n.id) * n.per; });
    b.gold += b.fortune;
    b.xp += b.insight;
    b.loot += b.find;
    b.speed += b.stride;
    b.crit += b.might * 0.12 + b.luck * 0.35;
    b.critDmg += b.might * 0.18;
    if (state.classId === "singer") b.gold += 0.04;
    return b;
  }

  function sheet() {
    const b = bonuses();
    return {
      raw: b,
      gold: b.gold, xp: b.xp,
      loot: Math.max(0.15, b.loot),
      speed: b.speed,
      might: b.might, ward: b.ward, grit: b.grit,
      fortune: b.fortune, insight: b.insight, stride: b.stride,
      find: b.find, luck: b.luck, mend: b.mend, haste: b.haste, pierce: b.pierce,
      critChance: Math.min(0.62, 0.04 + softCap(b.crit, 0.7)),
      critMult: 1.5 + softCap(b.critDmg, 1.25),
      wardDR: softCap(b.ward, 0.48),
      mendMult: 1 + softCap(b.mend, 1.05),
      rare: Math.min(0.85, b.loot * (1 + softCap(b.luck, 0.6))),
    };
  }

  function cardDuration(card) {
    const spd = Math.max(0.42, Math.min(2.4, bonuses().speed));
    return card.ms / spd;
  }

  function fightStepMs() {
    return FIGHT_STEP_MS / Math.max(0.52, 1 + sheet().haste);
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

  function lootValue(ids) {
    return (ids || []).reduce((sum, id) => sum + ((ITEMS[id] && ITEMS[id].sell) || 0), 0);
  }

  const TRACKS = [
    {
      id: "entry",
      name: "Entry of the Gladiators",
      hint: "Fučík's march. Brass, drums, the walk into the sand.",
      file: "assets/music/entry-gladiators.mp3",
    },
    {
      id: "farewell",
      name: "The Gladiators' Farewell",
      hint: "A slower band march. Sand after the bout.",
      file: "assets/music/gladiators-farewell.mp3",
    },
    {
      id: "moonlight",
      name: "Moonlight Sonata",
      hint: "Calm night. Beethoven, piano, lamps in the stands.",
      file: "assets/music/moonlight.mp3",
    },
    {
      id: "humoresque",
      name: "Humoresque",
      hint: "Light and a little wry. Dvořák on old strings.",
      file: "assets/music/humoresque.mp3",
    },
    {
      id: "ave",
      name: "Ave Maria",
      hint: "Quiet and kind. Gounod, for the baths and dusk.",
      file: "assets/music/ave-maria.mp3",
    },
  ];

  let musicEl = null;

  function ensureAudio() {
    try {
      if (!audio) audio = new (window.AudioContext || window.webkitAudioContext)();
      if (audio.state === "suspended") audio.resume();
    } catch (e) { /* ignore */ }
    return audio;
  }

  function sfxOn() { return state && state.sfx !== false && !state.mute; }
  function musicOn() { return state && state.music !== false && !state.mute; }
  function sfxVol() { return Math.max(0, Math.min(1, Number(state.sfxVol == null ? 0.7 : state.sfxVol))); }
  function musicVol() { return Math.max(0, Math.min(1, Number(state.musicVol == null ? 0.42 : state.musicVol))); }

  function tone(freq, dur, type, vol) {
    if (!sfxOn()) return;
    try {
      const ctx = ensureAudio();
      if (!ctx) return;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type || "sine";
      o.frequency.value = freq;
      g.gain.value = (vol || 0.04) * sfxVol();
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (dur || 0.08));
      o.connect(g); g.connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + (dur || 0.08));
    } catch (e) { /* ignore */ }
  }

  function currentTrack() {
    return TRACKS.find((t) => t.id === (state && state.track)) || TRACKS[0];
  }

  function applyMusicVolume() {
    if (musicEl) musicEl.volume = musicOn() ? musicVol() : 0;
  }

  function startMusic() {
    ensureAudio();
    if (!musicOn()) { stopMusic(); return; }
    const t = currentTrack();
    if (!musicEl) {
      musicEl = new Audio();
      musicEl.loop = true;
      musicEl.preload = "auto";
    }
    const src = t.file;
    const abs = new URL(src, window.location.href).href;
    if (musicEl.src !== abs) {
      musicEl.src = src;
    }
    applyMusicVolume();
    const play = musicEl.play();
    if (play && play.catch) play.catch(() => { /* wait for a click */ });
  }

  function stopMusic() {
    if (!musicEl) return;
    musicEl.pause();
  }

  function setTrack(id) {
    state.track = id;
    if (musicEl) {
      musicEl.pause();
      musicEl.src = currentTrack().file;
    }
    if (musicOn()) startMusic();
    renderSettings();
    save();
  }

  function puff(text, el) {
    const fx = $("fx");
    if (!fx) return;
    const n = document.createElement("div");
    n.className = "puff";
    n.textContent = text;
    const r = el && el.getBoundingClientRect ? el.getBoundingClientRect() : { left: innerWidth / 2, top: innerHeight / 2, width: 0, height: 0 };
    n.style.left = (r.left + r.width / 2) + "px";
    n.style.top = (r.top + r.height / 2) + "px";
    fx.appendChild(n);
    setTimeout(() => n.remove(), 900);
  }

  function flyCoin(el) {
    const fx = $("fx");
    if (!fx) return;
    const n = document.createElement("div");
    n.className = "coin-fly";
    n.textContent = "¢";
    n.style.fontSize = "22px";
    n.style.fontWeight = "800";
    n.style.color = "#e8b84a";
    const r = el && el.getBoundingClientRect ? el.getBoundingClientRect() : { left: innerWidth / 2, top: innerHeight / 2, width: 0 };
    n.style.left = (r.left + r.width / 2) + "px";
    n.style.top = r.top + "px";
    n.style.setProperty("--dx", (80 + Math.random() * 40) + "px");
    n.style.setProperty("--dy", (-100 - Math.random() * 40) + "px");
    fx.appendChild(n);
    setTimeout(() => n.remove(), 700);
  }

  function floatDmg(text, el, heal) {
    const fx = $("fx");
    if (!fx) return;
    const n = document.createElement("div");
    n.className = "dmg-num" + (heal ? " heal" : "");
    n.textContent = text;
    const r = el && el.getBoundingClientRect ? el.getBoundingClientRect() : { left: innerWidth / 2, top: 160, width: 40, height: 40 };
    n.style.left = (r.left + r.width / 2) + "px";
    n.style.top = r.top + "px";
    fx.appendChild(n);
    setTimeout(() => n.remove(), 850);
  }

  function burstLevel() {
    const fx = $("fx");
    if (!fx) return;
    const n = document.createElement("div");
    n.className = "fx-level";
    n.textContent = "✦";
    n.style.fontSize = "72px";
    n.style.color = "#e8b84a";
    n.style.left = "50%";
    n.style.top = "40%";
    fx.appendChild(n);
    setTimeout(() => n.remove(), 1100);
  }

  function toast(text) {
    const el = $("toast");
    el.textContent = text;
    el.classList.remove("hidden");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.add("hidden"), 2800);
  }

  function showSay(text, artId) {
    const el = $("say");
    el.innerHTML = (artId && art(artId) ? `<div class="say-art">${imgTag(artId, "")}</div>` : "") + esc(text);
    el.classList.remove("hidden");
    clearTimeout(sayTimer);
    sayTimer = setTimeout(() => el.classList.add("hidden"), 3200);
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
    const port = $("modal-portrait");
    if (port) {
      port.classList.add("hidden");
      port.innerHTML = "";
    }
    Array.from(actions.children).forEach((child) => {
      if (child.id !== "modal-ok") child.remove();
    });
    if (okBtn.parentNode !== actions) actions.appendChild(okBtn);
    $("modal").classList.remove("hidden");
  }

  function hideModal() {
    const modal = $("modal");
    if (modal) modal.classList.add("hidden");
    const port = $("modal-portrait");
    if (port) {
      port.classList.add("hidden");
      port.innerHTML = "";
    }
  }

  function note(text) {
    state.journal.unshift({ t: Date.now(), text });
    state.journal = state.journal.slice(0, 40);
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
    puff("+" + fmt(n), el || $("coin-pill"));
    flyCoin(el || $("coin-pill"));
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

  function healMember(id, n) {
    const got = Math.round((n || 0) * sheet().mendMult);
    const before = curHp(id);
    setHp(id, curHp(id) + got);
    return curHp(id) - before;
  }

  function healAll(n) {
    state.party.forEach((id) => healMember(id, n));
  }

  function healLowest(n) {
    let id = state.party[0];
    let worst = 2;
    state.party.forEach((m) => {
      const r = curHp(m) / Math.max(1, maxHp(m));
      if (r < worst) { worst = r; id = m; }
    });
    return healMember(id, n);
  }

  function slotKey(id) { return SAVE_PREFIX + id; }

  const memoryStore = {};
  function storeGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return memoryStore[key] || null; }
  }
  function storeSet(key, val) {
    try { localStorage.setItem(key, val); } catch (e) { memoryStore[key] = val; }
  }

  function loadIndex() {
    try {
      const raw = storeGet(PROFILE_INDEX);
      if (raw) {
        const idx = JSON.parse(raw);
        if (idx && idx.list && idx.list.length) return idx;
      }
    } catch (e) { /* ignore */ }
    const id = "p1";
    const idx = { active: id, list: [{ id, name: "Rowan" }] };
    saveIndex(idx);
    return idx;
  }

  function saveIndex(idx) { storeSet(PROFILE_INDEX, JSON.stringify(idx)); }

  function fresh(name) {
    const now = Date.now();
    return {
      name: name || "Rowan",
      classId: "gate",
      gold: 24,
      xp: 0,
      level: 1,
      day: 1,
      dayAt: now,
      weather: "sunny",
      lastTick: now,
      mute: false,
      music: true,
      sfx: true,
      musicVol: 0.42,
      sfxVol: 0.7,
      track: "entry",
      scene: "arena",
      card: "practice",
      progress: 0,
      crowd: 0,
      fight: null,
      party: ["hero"],
      hp: { hero: 32 },
      pack: { soup: 2, tea: 1, straw: 3 },
      school: {},
      gear: { hat: "cap", cloak: "sash", boots: "sandals", charm: "copper", weapon: "stick" },
      pet: "",
      hearts: {},
      bonds: {},
      mail: [],
      mailDay: 0,
      journal: [{ t: now, text: "The sand was already warm." }],
      story: {},
      seen: {},
      bouts: {},
      talents: [],
      paragon: blankParagon(),
      forage: [],
      forageDay: 0,
      errands: [],
      errandsDay: 0,
      errandProg: {},
      errandsDone: 0,
      autosell: {},
      buffs: [],
      dummyAt: now,
      dummyReady: 0,
      boothAt: now,
      boothReady: 0,
      regenAt: now,
      sawFestival: false,
      gaveGift: false,
      museum: {},
      memories: [],
      lead: "hero",
      training: "",
      temper: {},
      riteLeft: 0,
      circuit: {},
      purse: false,
      purseLeft: 0,
      rival: null,
      focus: "practice",
      titles: [],
      everTrained: false,
    };
  }

  function load() {
    const idx = loadIndex();
    let raw = storeGet(slotKey(idx.active));
    if (!raw) raw = storeGet(SAVE_KEY);
    if (!raw) {
      for (let i = 0; i < OLD_KEYS.length; i++) {
        raw = storeGet(OLD_KEYS[i]);
        if (raw) break;
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
    storeSet(slotKey(idx.active), blob);
    storeSet(SAVE_KEY, blob);
    const row = idx.list.find((p) => p.id === idx.active);
    if (row) row.name = state.name;
    saveIndex(idx);
  }

  function switchProfile(id) {
    save();
    const idx = loadIndex();
    idx.active = id;
    saveIndex(idx);
    load();
    applyOffline();
    renderAll();
  }

  function newProfile(name) {
    save();
    const idx = loadIndex();
    const id = "p" + Date.now().toString(36);
    idx.list.push({ id, name: name || "Keeper" });
    idx.active = id;
    saveIndex(idx);
    state = fresh(name || "Keeper");
    save();
    renderAll();
  }

  function resetProfile() {
    const name = state.name;
    state = fresh(name);
    save();
    renderAll();
    toast("The sand forgot, kindly.");
  }

  function rollWeather() {
    const opts = WEATHERS[seasonId()] || WEATHERS.spring;
    state.weather = pick(opts);
  }

  function rollMail() {
    if (state.mailDay >= state.day) return;
    state.mailDay = state.day;
    if (Math.random() > 0.62) return;
    const writers = NPCS.filter((n) => (state.hearts[n.id] || 0) > 0 || n.id === "pippa" || n.id === "cassia");
    const npc = pick(writers);
    const gifts = {
      cassia: [["soup", 1], ["loaf", 1], ["flour", 2]],
      ludo: [["tea", 2], ["wreath", 1]],
      pippa: [["ink", 2], ["ribbon", 1]],
      otto: [["buckle", 2], ["oil", 1]],
      nona: [["towel", 1], ["steam", 1]],
      vela: [["ticket", 2], ["coin", 1]],
    };
    const notes = {
      cassia: ["The pot asked after you. I packed a little of last night.", "Eat. Then bout. Then eat again."],
      ludo: ["The wreath is heavier when you hang it yourself. Sit first.", "A cup that wandered off the tray. It is yours now."],
      pippa: ["A line I liked. I thought you should have a copy in crumbs.", "The card moved. I redrew it. Then it moved back."],
      otto: ["Your sandals wrote. They are happy. I sent a buckle anyway.", "Oil for the rim. The dummy approved."],
      nona: ["Steam wrote a letter and erased it. I kept the warmth.", "A towel that remembered your name."],
      vela: ["This one had your name on it, even before it did.", "The tin coughed up a kindness. I forwarded it."],
    };
    const gift = pick(gifts[npc.id] || gifts.pippa);
    state.mail.unshift({
      id: "m-" + Date.now() + "-" + Math.floor(Math.random() * 99),
      from: npc.id,
      text: pick(notes[npc.id] || notes.pippa),
      item: gift[0],
      n: gift[1],
      read: false,
      day: state.day,
    });
    state.mail = state.mail.slice(0, 16);
  }

  function rollForage() {
    if (state.forageDay >= state.day && state.forage && state.forage.length) return;
    state.forageDay = state.day;
    const pool = ["straw", "sandal", "ribbon", "coin", "ticket", "oil"];
    const n = 2 + (Math.random() < 0.4 ? 1 : 0);
    state.forage = [];
    for (let i = 0; i < n; i++) {
      state.forage.push({
        id: "f-" + i + "-" + state.day,
        item: pick(pool),
        x: 12 + Math.random() * 70,
        y: 42 + Math.random() * 28,
      });
    }
  }

  function seedErrands() {
    if (state.errandsDay >= state.day && state.errands && state.errands.length) return;
    state.errandsDay = state.day;
    const pool = ERRANDS.slice();
    state.errands = [];
    state.errandProg = {};
    for (let i = 0; i < 2 && pool.length; i++) {
      const e = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
      state.errands.push({ id: e.id, kind: e.kind, n: e.n, text: e.text, gold: e.gold, xp: e.xp, done: false });
    }
  }

  function bumpErrand(kind, n) {
    (state.errands || []).forEach((e) => {
      if (e.done || e.kind !== kind) return;
      state.errandProg[e.id] = (state.errandProg[e.id] || 0) + (n || 1);
      if (state.errandProg[e.id] >= e.n) {
        e.done = true;
        state.errandsDone = (state.errandsDone || 0) + 1;
        addGold(e.gold);
        addXp(e.xp);
        toast("The board paid " + fmt(e.gold) + ".");
      }
    });
  }

  function tickDummy(now) {
    const gap = (state.school && state.school.rake) ? 18000 : 28000;
    if (!state.dummyAt || state.dummyAt > now) state.dummyAt = now;
    let steps = 0;
    while (now - state.dummyAt >= gap && steps < 48) {
      state.dummyAt += gap;
      state.dummyReady = (state.dummyReady || 0) + 1;
      steps += 1;
    }
    if (steps >= 48) state.dummyAt = now;
  }

  function tickBooth(now) {
    const gap = 40000;
    if (!state.boothAt || state.boothAt > now) state.boothAt = now;
    let steps = 0;
    while (now - state.boothAt >= gap && steps < 48) {
      state.boothAt += gap;
      state.boothReady = (state.boothReady || 0) + 1;
      steps += 1;
    }
    if (steps >= 48) state.boothAt = now;
  }

  function collectDummy() {
    const n = state.dummyReady || 0;
    if (!n) { toast("The dummy is still practicing its smile."); return; }
    state.dummyReady = 0;
    state.dummyCollected = true;
    addPack("straw", n);
    if (state.school && state.school.dummy) addPack("dummyhead", 1);
    bumpErrand("dummy", 1);
    toast("The dummy left " + n + " straw.");
    renderDummy();
    renderPack();
    save();
  }

  function collectBooth() {
    const n = state.boothReady || 0;
    if (!n) { toast("Vela's tin is still thinking."); return; }
    state.boothReady = 0;
    state.boothCollected = true;
    addPack("ticket", n);
    if (Math.random() < 0.25) addPack("coin", 1);
    bumpErrand("booth", 1);
    toast("The tin coughed up " + n + " ticket" + (n > 1 ? "s" : "") + ".");
    renderBooth();
    renderPack();
    save();
  }

  function checkStory(silent) {
    STORY.forEach((ch) => {
      if (state.story[ch.id]) return;
      if (!ch.test(state)) return;
      state.story[ch.id] = state.day;
      if (ch.gold) {
        if (silent) creditGold(ch.gold);
        else addGold(ch.gold);
      }
      if (ch.item) addPack(ch.item, ch.n || 1);
      note(ch.title + " — " + ch.text);
      if (!silent) toast(ch.title + ".");
    });
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
      if (state.school && state.school.baths && Math.random() < 0.45) addPack("towel", 1);
      seedErrands();
      checkStory(true);
      if (isFestival()) {
        state.memories.push({ day: state.day, text: "The stands set an extra place." });
        state.memories = state.memories.slice(-12);
      }
    }
  }

  function applyOffline() {
    const now = Date.now();
    const raw = Math.min(OFFLINE_CAP_MS, Math.max(0, now - (state.lastTick || now)));
    if (raw < 8000) return;
    tickDay(now);
    tickDummy(now);
    tickBooth(now);
    const card = cardById(state.card);
    const dur = cardDuration(card);
    let left = raw;
    let loops = 0;
    let gold = 0;
    let xp = 0;
    while (left > 400 && loops < 80) {
      const need = (1 - (state.progress || 0)) * dur;
      if (left < need) {
        state.progress += left / dur;
        break;
      }
      left -= need;
      state.progress = 0;
      const foe = scaledFoe(pick(card.foes));
      const win = resolveFightInstant(foe);
      const r = grantLoop(card, true, win);
      gold += r.gold;
      xp += r.xp;
      loops += 1;
    }
    state.lastTick = now;
    if (loops) {
      showModal(
        "While you rested",
        "The roster walked " + loops + " card" + (loops > 1 ? "s" : "") + " without you.\n\nThey brought " + fmt(gold) + " and a pocket of sand.",
        "Come in"
      );
    }
    save();
  }

  function scaledFoe(id) {
    const base = FOES[id] || FOES.dummy;
    const lv = Math.max(1, state.level);
    const heat = 1 + (para().kindles || 0) * 0.018;
    const hp = Math.round((base.hp + (lv - 1) * base.grow * 1.15) * heat);
    return {
      id: base.id, name: base.name, art: base.art, verb: base.verb,
      hp, max: hp,
      atk: Math.round((base.atk + (lv - 1) * 0.38) * heat),
      def: Math.round((base.def + (lv - 1) * 0.22) * heat),
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
      if (state.purse) dmg *= 1.22;
    }
    else if (Math.random() < s.critChance) {
      dmg *= s.critMult;
      state._lastCrit = true;
    } else {
      state._lastCrit = false;
    }
    return Math.max(1, Math.round(dmg));
  }

  function pickTarget(living) {
    if (state.lead && living.includes(state.lead) && Math.random() < 0.42) return state.lead;
    if (state.classId === "shield" && living.includes("hero") && Math.random() < 0.55) return "hero";
    if (living.includes("rook") && Math.random() < 0.4) return "rook";
    if (living.includes("brin") && Math.random() < 0.28) return "brin";
    return pick(living);
  }

  function tryAutoHeal() {
    const need = state.party.find((id) => curHp(id) > 0 && curHp(id) / maxHp(id) < 0.28);
    if (!need) return "";
    if (packCount("salve") && takePack("salve", 1)) {
      healMember(need, 16);
      return "Honey salve for " + memberName(need) + ".";
    }
    if (packCount("soup") && takePack("soup", 1)) {
      healMember(need, 10);
      return memberName(need) + " sipped soup.";
    }
    return "";
  }

  function afterFightHeals() {
    if (state.classId === "singer" || state.party.includes("calla")) healAll(2);
    if (state.classId === "cook" && Math.random() < 0.35) addPack("loaf", 1);
    const pet = PETS.find((p) => p.id === state.pet);
    if (pet && pet.heal) healAll(pet.heal);
  }

  function tryGrantTitle(silent) {
    const crowd = state.crowd || 0;
    TITLES.forEach((t) => {
      if (hasTitle(t.id) || crowd < t.crowd) return;
      para().titles.push(t.id);
      if (!state.titles) state.titles = [];
      if (state.titles.indexOf(t.id) < 0) state.titles.push(t.id);
      state.crowd = Math.max(40, crowd - 20);
      note("The stands named you " + t.name + ".");
      bumpErrand("title", 1);
      if (!silent) toast("Title: " + t.name + ".");
    });
  }

  function autoSellFound(found) {
    (found || []).forEach((id) => {
      if (!state.autosell[id]) return;
      if (!takePack(id, 1)) return;
      creditGold(stallPay(id, 1));
    });
  }

  function grantLoop(card, silent, won) {
    const s = sheet();
    const xpScale = 1 + softCap(s.insight, 1.2);
    const xp = Math.round(card.xp * s.xp * xpScale * (won ? 1 : 0.4));
    const found = [];
    if (won) {
      card.loot.forEach(([id, chance]) => {
        if (Math.random() < Math.min(0.88, chance * s.loot)) {
          addPack(id, 1);
          found.push(id);
        }
      });
      if (Math.random() < Math.min(0.55, card.rare[1] * s.rare)) {
        addPack(card.rare[0], 1);
        found.push(card.rare[0]);
      }
      if (state.classId === "net" && Math.random() < 0.55) {
        const extra = pick(["straw", "ribbon", "sandal"]);
        addPack(extra, 1);
        found.push(extra);
      }
      if (state.classId === "cook" && Math.random() < 0.35) {
        addPack("loaf", 1);
        found.push("loaf");
      }
      const wxLoot = {
        rain: ["steam", "towel"],
        wind: ["ticket", "plume"],
        snow: ["frostberry", "cocoa"],
        sunny: ["blossom", "honey"],
      };
      if (Math.random() < 0.22) {
        const extra = pick(wxLoot[state.weather] || wxLoot.sunny);
        addPack(extra, 1);
        found.push(extra);
      }
      const snLoot = { spring: "blossom", summer: "honey", autumn: "leaf", winter: "frostberry" };
      if (Math.random() < 0.18 && snLoot[seasonId()]) {
        addPack(snLoot[seasonId()], 1);
        found.push(snLoot[seasonId()]);
      }
      if (card.id === "steam") healAll(3);
      if (card.id === "frost") healAll(2);
      if (state._keeper) {
        const tip = pennyProfit(12 + state.level * 2);
        if (silent) creditGold(tip);
        else addGold(tip);
        addPack(card.rare[0], 1);
        found.push(card.rare[0]);
        note("The steward of " + card.name + " sat down and left a gift.");
      }
      const crowdPay = Math.floor((state.crowd || 0) / 40);
      if (crowdPay && !silent) addGold(pennyProfit(crowdPay * 4));
      else if (crowdPay) creditGold(pennyProfit(crowdPay * 4));
      const crowdGain = 8 + (state.classId === "singer" || state.classId === "steward" ? 6 : 0) + ((state.school && state.school.stands) ? 4 : 0) + (state.party.includes("calla") ? 3 : 0);
      state.crowd = Math.min(100, (state.crowd || 0) + crowdGain);
      tryGrantTitle(silent);
    } else {
      state.crowd = Math.max(0, (state.crowd || 0) - 12);
    }
    if (!state.circuit) state.circuit = {};
    if (won) state.circuit[card.id] = Math.min(20, (state.circuit[card.id] || 0) + 1);
    state.focus = card.id;
    if (state.riteLeft > 0) state.riteLeft -= 1;
    if (state.purseLeft > 0) {
      state.purseLeft -= 1;
      if (state.purseLeft <= 0) state.purse = false;
    }
    if (state.training) {
      state.everTrained = true;
      if (!state.bonds) state.bonds = {};
      if (state.training !== "hero") state.bonds[state.training] = Math.min(40, (state.bonds[state.training] || 0) + 1);
    }
    const cardBase = rand(card.gold[0], card.gold[1] + 1) * (won ? 1 : 0.35) * (state.purse ? 1.35 : 1);
    const gold = pennyProfit(cardBase) + (won ? pennyProfit(lootValue(found)) : 0);
    state._keeper = false;
    state.bouts[card.id] = (state.bouts[card.id] || 0) + 1;
    const p = para();
    p.lifetimeBouts = (p.lifetimeBouts || 0) + 1;
    if (totalBouts() > (p.bestBouts || 0)) p.bestBouts = totalBouts();
    state.party.forEach((id) => {
      if (id === "hero") return;
      if (!state.bonds) state.bonds = {};
      state.bonds[id] = Math.min(40, (state.bonds[id] || 0) + 1);
    });
    state.buffs = (state.buffs || []).map((buff) => ({ ...buff, left: buff.left - 1 })).filter((buff) => buff.left > 0);
    checkStory(silent);
    bumpErrand("bouts", 1);
    autoSellFound(found);
    state.lastSay = won ? pick(card.says) : "The roster sat down, shared soup, and the sand wandered off first.";
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
    return { gold, xp, found, card: card.name, won };
  }

  function resolveFightInstant(foe) {
    let rounds = 0;
    while (foe.hp > 0 && livingMembers().length && rounds < 24) {
      livingMembers().forEach((id) => {
        if (foe.hp <= 0) return;
        let pierce = combatStats(id).pierce || 0;
        if (id === "hero" && state.classId === "lantern") pierce = Math.max(pierce, 2);
        foe.hp -= hitDmg(combatStats(id).atk, foe.def, pierce);
      });
      if (foe.hp <= 0) break;
      const living = livingMembers();
      if (!living.length) break;
      const target = pickTarget(living);
      let dmg = hitDmg(foe.atk, combatStats(target).def, 0, true);
      if (state.classId === "shield") dmg = Math.max(1, Math.floor(dmg * 0.75));
      setHp(target, curHp(target) - dmg);
      tryAutoHeal();
      rounds += 1;
    }
    const win = foe.hp <= 0 && livingMembers().length > 0;
    seeFoe(foe.id, win);
    if (win) afterFightHeals();
    else state.party.forEach((id) => { if (curHp(id) <= 0) setHp(id, 1); });
    return win;
  }

  function startFight(silent) {
    if (!livingMembers().length) {
      state.party.forEach((id) => setHp(id, Math.max(1, Math.floor(maxHp(id) * 0.35))));
    }
    const card = cardById(state.card);
    const foe = scaledFoe(pick(card.foes));
    const bouts = (state.bouts[card.id] || 0) + 1;
    const keeper = bouts % KEEPER_EVERY === 0;
    if (keeper) {
      foe.hp = Math.round(foe.hp * 2.15);
      foe.max = foe.hp;
      foe.atk += 2;
      foe.def += 1;
      foe.name = "Steward " + foe.name;
      foe.keeper = true;
      state._keeper = true;
    }
    if (silent) {
      const win = resolveFightInstant(foe);
      return grantLoop(card, true, win);
    }
    if (card.scene) setScene(card.scene);
    else if (card.id === "practice" || card.id === "kiln") setScene("yard");
    else if (card.id === "market" || card.id === "salt") setScene("market");
    else if (card.id === "steam") setScene("baths");
    else setScene("arena");
    closeDesk();
    state.fight = {
      foeId: foe.id, name: foe.name, art: foe.art, verb: foe.verb,
      foeHp: foe.hp, foeMax: foe.max, atk: foe.atk, def: foe.def,
      keeper: !!keeper,
      log: keeper
        ? foe.name + " waits in the middle of the sand, wearing a little wreath."
        : foe.name + " stands on the sand, politely.",
      next: performance.now() + 520,
      turn: "party",
      idx: 0,
    };
    renderWorld();
    renderPit(true);
    renderFight();
    return null;
  }

  function partyAct(id, foe) {
    const st = combatStats(id);
    let pierce = st.pierce || 0;
    const close = bondOf(id) >= 12 ? 0.12 : 0;
    const critTag = () => (state._lastCrit ? " A lantern crit." : "");
    if (id === "hero" && state.classId === "lantern") pierce = Math.max(pierce, 2);
    if (id === "pot" && Math.random() < 0.38 + close) {
      const got = healLowest(6);
      return { dmg: 0, skipHit: true, log: "Pot poured soup (+" + got + ")." };
    }
    if (id === "calla" && Math.random() < 0.3 + close) {
      healAll(2);
      const dmg = hitDmg(st.atk, foe.def, pierce);
      return { dmg, log: "Calla sang. Everyone mended. A note hit for " + dmg + "." + critTag() };
    }
    if (id === "nett" && Math.random() < 0.28) {
      const crumb = pick(["straw", "ribbon", "sandal"]);
      addPack(crumb, 1);
      const dmg = hitDmg(st.atk, foe.def, pierce);
      return { dmg, log: "Nett pinched a " + itemName(crumb) + " and tapped for " + dmg + "." + critTag() };
    }
    if (id === "rook" && Math.random() < 0.3) state._guard = true;
    let dmg = hitDmg(st.atk, foe.def, pierce);
    let extra = critTag();
    if (id === "fizz" && Math.random() < 0.22) {
      dmg = Math.round(dmg * 2);
      extra = " A tidy crit.";
    }
    if (id === "lux" && pierce > 1) extra += " The lantern found a seam.";
    if (id === "rook" && state._guard) extra += " Rim up.";
    if (id === "hero" && state.classId === "shield") extra += " The shield sat down last.";
    return { dmg, log: memberName(id) + " tapped for " + dmg + "." + extra };
  }

  function endFight(win) {
    const f = state.fight;
    const card = cardById(state.card);
    if (f) seeFoe(f.foeId, win);
    playPit("foe", win ? "recoil" : "bow");
    livingMembers().forEach((id) => playPit(id, win ? "bow" : "recoil"));
    state.fight = f ? Object.assign({}, f, { done: true, log: win ? "They bowed. The sand applauded." : "Everyone sat down for a sip." }) : null;
    renderFight();
    if (win) afterFightHeals();
    else {
      state.party.forEach((id) => { if (curHp(id) <= 0) setHp(id, 1); });
      toast("The roster sat down. The sand waited.");
    }
    const r = grantLoop(card, false, win);
    state.lastArt = (f && f.art) || "dummy";
    setTimeout(() => {
      state.fight = null;
      hidePit();
      renderFight();
      renderWorld();
      showSay(state.lastSay, state.lastArt);
    }, 700);
    if (r.found.length) toast("Found " + r.found.map(itemName).join(", ") + ".");
    state.progress = 0;
    renderPack();
    renderRecipes();
    renderNeighbors();
    renderJournal();
    renderVitals();
    renderHud();
    save();
    return r;
  }

  function stepFight(now) {
    const f = state.fight;
    if (!f || f.done || now < f.next) return;
    const living = livingMembers();
    if (!living.length) { endFight(false); return; }
    if (f.turn === "party") {
      const id = living[f.idx % living.length];
      const act = partyAct(id, f);
      if (act.skipHit) {
        f.log = act.log;
        playPit(id, "heal");
      } else {
        f.foeHp = Math.max(0, f.foeHp - act.dmg);
        f.log = act.log;
        playPit(id, "lunge");
        playPit("foe", "recoil");
        popClash();
        floatDmg("-" + (act.dmg || 0), pitEl("foe"), false);
      }
      tone(520 + (act.dmg || 4) * 12, 0.07, "triangle", 0.03);
      if (f.foeHp <= 0) { endFight(true); return; }
      f.idx += 1;
      if (f.idx >= living.length) {
        f.turn = "foe";
        f.idx = 0;
      }
      f.next = now + fightStepMs();
      renderFight();
      updatePitHp();
      return;
    }
    const target = pickTarget(living);
    let dmg = hitDmg(f.atk, combatStats(target).def, 0, true);
    if (state.classId === "shield") dmg = Math.max(1, Math.floor(dmg * 0.75));
    if (state._guard && target === "rook") { dmg = Math.max(1, Math.floor(dmg * 0.6)); state._guard = false; }
    setHp(target, curHp(target) - dmg);
    f.log = f.name + " " + (f.verb || "tapped") + " " + memberName(target) + " for " + dmg + ".";
    playPit("foe", "lunge");
    playPit(target, "recoil");
    popClash();
    floatDmg("-" + dmg, pitEl(target), false);
    const heal = tryAutoHeal();
    if (heal) {
      f.log += " " + heal;
      playPit(target, "heal");
    }
    tone(280, 0.08, "sine", 0.03);
    if (!livingMembers().length) { endFight(false); return; }
    f.turn = "party";
    f.next = now + fightStepMs();
    renderFight();
    updatePitHp();
    renderVitals();
    renderHud();
  }

  function kindleScore() {
    const bouts = totalBouts();
    const stories = Object.keys(state.story || {}).length;
    const hearts = Object.values(state.hearts || {}).reduce((a, b) => a + b, 0);
    const museum = Object.keys(state.museum || {}).length;
    const cardTier = CARDS.reduce((m, t) => ((state.bouts && state.bouts[t.id]) ? Math.max(m, t.level) : m), 0);
    return Math.round(bouts * 1.2 + state.level * 3 + stories * 4 + hearts * 2 + museum * 5 + cardTier * 2);
  }

  function kindlePointsFrom(score) {
    return Math.max(1, Math.floor(score / 28));
  }

  function canKindle() {
    return state.level >= 10 || totalBouts() >= 30 || (para().kindles > 0 && state.level >= 6);
  }

  function kindleWhyNot() {
    if (canKindle()) return "";
    return "The wreath wants more sand. Reach level 10, or thirty cards.";
  }

  function doKindle() {
    if (!canKindle()) return false;
    const score = kindleScore();
    const gain = kindlePointsFrom(score);
    const p = para();
    p.kindles += 1;
    p.points = (p.points || 0) + gain;
    p.lastScore = score;
    p.lastGain = gain;
    const keep = {
      name: state.name,
      classId: state.classId,
      mute: state.mute,
      music: state.music,
      sfx: state.sfx,
      musicVol: state.musicVol,
      sfxVol: state.sfxVol,
      track: state.track,
      autosell: state.autosell,
      paragon: p,
    };
    state = Object.assign(fresh(keep.name), keep);
    note("You hung the wreath. The town kept the math.");
    toast("+" + gain + " wreath heat.");
    save();
    return true;
  }

  function spendParagonNode(id) {
    const rank = nodeRank(id);
    if (rank >= PARA_MAX) return false;
    const cost = nodeCost(rank);
    const p = para();
    if ((p.points || 0) < cost) return false;
    p.points -= cost;
    p.tree[id] = rank + 1;
    return true;
  }

  function setScene(id) {
    state.scene = id;
    const fade = $("scene-fade");
    if (fade) {
      fade.classList.add("on");
      setTimeout(() => fade.classList.remove("on"), 280);
    }
  }

  function setTab(id) {
    document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("on", t.dataset.tab === id));
    document.querySelectorAll(".tab-page").forEach((p) => p.classList.toggle("hidden", p.id !== "tab-" + id));
  }

  function openDesk() { document.body.classList.add("setup"); }
  function closeDesk() { document.body.classList.remove("setup"); }

  function openMail() {
    const unread = (state.mail || []).filter((m) => !m.read);
    if (!unread.length && !(state.mail || []).length) {
      toast("The tin is empty. Tomorrow, maybe.");
      return;
    }
    const m = unread[0] || state.mail[0];
    m.read = true;
    const npc = NPCS.find((n) => n.id === m.from);
    if (m.item) addPack(m.item, m.n || 1);
    showModal(
      (npc ? npc.name : "A neighbor") + " wrote",
      m.text + (m.item ? "\n\nTucked in: " + itemName(m.item) + (m.n > 1 ? " ×" + m.n : "") + "." : ""),
      "Keep it"
    );
    const port = $("modal-portrait");
    if (npc) {
      port.innerHTML = imgTag(npc.art, npc.name);
      port.classList.remove("hidden");
    }
    renderHud();
    renderPack();
    save();
  }

  function useHealItem(id) {
    if (!takePack(id, 1)) {
      toast("The crate has no " + itemName(id) + " just now.");
      return;
    }
    const heal = (ITEMS[id] && ITEMS[id].heal) || 8;
    healAll(heal);
    toast("Shared " + itemName(id) + ".");
    renderVitals();
    renderPack();
    renderHud();
    save();
  }

  function innRest() {
    if (!spend(8)) { toast("The baths want 8¢."); return; }
    healAll(999);
    toast("Steam, then standing up.");
    renderVitals();
    renderHud();
    save();
  }

  function campTillMorning() {
    state.dayAt = Date.now() - DAY_MS;
    tickDay(Date.now());
    healAll(6);
    toast("Morning arrived. The sand was already warm.");
    renderAll();
    save();
  }

  function showTalentPicker() {
    if (talentsDue() <= 0) return;
    const have = new Set(state.talents || []);
    const opts = TALENTS.filter((t) => !have.has(t.id));
    if (!opts.length) return;
    showModal("A habit learned", "The sand taught you something. Pick one.", "Later");
    const box = document.createElement("div");
    box.className = "class-pick";
    opts.slice(0, 6).forEach((t) => {
      const b = document.createElement("button");
      b.className = "class-btn";
      b.innerHTML = `<strong>${esc(t.name)}</strong><span>${esc(t.text)}</span>`;
      b.addEventListener("click", () => {
        state.talents.push(t.id);
        hideModal();
        toast(t.name + ".");
        renderTalents();
        renderHud();
        save();
      });
      box.appendChild(b);
    });
    $("modal-actions").appendChild(box);
  }

  function pickForage(spot) {
    state.forage = (state.forage || []).filter((f) => f.id !== spot.id);
    addPack(spot.item, 1);
    bumpErrand("forage", 1);
    toast("Picked up " + itemName(spot.item) + ".");
    tone(740, 0.06, "sine", 0.03);
    renderWorld();
    renderPack();
    save();
  }

  function talkNpc(npc) {
    bumpErrand("npc", 1);
    const want = npcWant(npc);
    const have = packCount(want);
    showModal(npc.name, npc.say + (have ? "\n\nYou have " + itemName(want) + "." : "\n\nThey would like " + itemName(want) + "."), "Later");
    const port = $("modal-portrait");
    port.innerHTML = imgTag(npc.art, npc.name);
    port.classList.remove("hidden");
    if (have) {
      const go = document.createElement("button");
      go.className = "primary-btn";
      go.textContent = "Give " + itemName(want);
      go.addEventListener("click", () => {
        if (!takePack(want, 1)) return;
        state.hearts[npc.id] = Math.min(5, (state.hearts[npc.id] || 0) + 1);
        state.gaveGift = true;
        bumpErrand("gift", 1);
        addGold(6);
        note(npc.name + " kept the " + itemName(want) + ".");
        hideModal();
        toast(npc.thanks);
        renderNeighbors();
        renderPack();
        save();
      });
      $("modal-actions").appendChild(go);
    }
  }

  function cookRecipe(rec) {
    for (const [id, n] of Object.entries(rec.needs)) {
      if (packCount(id) < n) { toast("Need more " + itemName(id) + "."); return; }
    }
    Object.entries(rec.needs).forEach(([id, n]) => takePack(id, n));
    addPack(rec.id, 1);
    bumpErrand("cook", 1);
    toast(rec.say);
    renderPack();
    renderRecipes();
    save();
  }

  function craftItem(rec) {
    for (const [id, n] of Object.entries(rec.needs)) {
      if (packCount(id) < n) { toast("Need more " + itemName(id) + "."); return; }
    }
    Object.entries(rec.needs).forEach(([id, n]) => takePack(id, n));
    if (GEAR.find((g) => g.id === rec.id)) {
      state.gear = state.gear || {};
      state._gear = state._gear || {};
      const g = GEAR.find((x) => x.id === rec.id);
      state._gear[g.id] = true;
      state.gear[g.slot] = g.id;
      toast(rec.say);
    } else {
      addPack(rec.id, 1);
      toast(rec.say);
    }
    bumpErrand("cook", 1);
    renderPack();
    renderCrafts();
    renderGear();
    save();
  }

  function sellOne(id) {
    if (!takePack(id, 1)) return;
    addGold(stallPay(id, 1));
    renderPack();
    save();
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
    if (!total) { toast("Nothing the stall wants just now."); return; }
    addGold(total);
    toast("The stall paid " + fmt(total) + " — a copper profit on the lot.");
    renderPack();
    renderRecipes();
    renderNeighbors();
    save();
  }

  function renderHud() {
    $("hero-name").textContent = state.name || "Rowan";
    $("level-num").textContent = state.level;
    $("season-name").textContent = SEASON_LABEL[seasonId()];
    $("day-num").textContent = state.day;
    $("weather-name").textContent = state.weather;
    $("rank-name").textContent = rankName();
    const p = para();
    $("paragon-tag").textContent = "W" + (p.kindles || 0);
    $("paragon-tag").classList.toggle("hidden", !(p.kindles));
    document.body.classList.toggle("festival", isFestival());
    const need = xpNeeded(state.level);
    $("xp-label").textContent = state.xp + " / " + need;
    $("xp-fill").style.width = Math.min(100, (state.xp / need) * 100) + "%";
    $("hp-label").textContent = partyHp() + " / " + partyMaxHp();
    $("hp-fill").style.width = (partyMaxHp() ? Math.min(100, (partyHp() / partyMaxHp()) * 100) : 0) + "%";
    $("hp-pill").classList.toggle("hurt", partyHp() / Math.max(1, partyMaxHp()) < 0.4);
    $("gold").textContent = fmt(state.gold);
    $("btn-mute").classList.toggle("muted", !musicOn() && !sfxOn());
    const unread = (state.mail || []).some((m) => !m.read);
    $("mail-dot").classList.toggle("hidden", !unread);
  }

  function renderWorld() {
    const w = $("world");
    const tod = timeOfDay();
    const sn = seasonId();
    w.className = "world painted " +
      "scene-" + (state.scene || "arena") +
      " season-" + sn +
      " tod-" + tod +
      " wx-" + (state.weather || "sunny");
    const card = cardById(state.card);
    $("card-name").textContent = card.name;
    $("world-note").textContent = isFestival()
      ? "Festival day. The stands brought jam."
      : (state.weather === "rain" ? "A soft rain on the sand." : state.weather === "snow" ? "Quiet snow on the arches." : card.hint);
    const layer = $("weather-layer");
    layer.innerHTML = "";
    if (state.weather === "rain") {
      for (let i = 0; i < 28; i++) {
        const d = document.createElement("span");
        d.className = "drop";
        d.style.left = (Math.random() * 100) + "%";
        d.style.animationDuration = (0.7 + Math.random() * 0.6) + "s";
        layer.appendChild(d);
      }
    }
    if (state.weather === "snow") {
      for (let i = 0; i < 22; i++) {
        const d = document.createElement("span");
        d.className = "flake";
        d.textContent = "❄";
        d.style.left = (Math.random() * 100) + "%";
        d.style.animationDuration = (3 + Math.random() * 3) + "s";
        layer.appendChild(d);
      }
    }
    const spots = $("hotspots");
    spots.innerHTML = "";
    const chips = [
      { id: "arena", label: "Arena", left: true },
      { id: "yard", label: "Yard" },
      { id: "market", label: "Market" },
      { id: "baths", label: "Baths" },
    ];
    chips.forEach((c, i) => {
      const b = document.createElement("button");
      b.className = "hot nav-chip " + (i === 0 ? "nav-left" : "nav-right");
      if (i > 1) b.style.top = "max(118px, calc(104px + env(safe-area-inset-top)))";
      if (i === 3) b.style.top = "max(158px, calc(144px + env(safe-area-inset-top)))";
      b.innerHTML = `<span class="tag">${c.label}</span>`;
      b.addEventListener("click", () => { setScene(c.id); renderWorld(); save(); });
      spots.appendChild(b);
    });
    const forage = $("forage-layer");
    forage.innerHTML = "";
    (state.forage || []).forEach((f) => {
      const b = document.createElement("button");
      b.className = "forage-spot";
      b.style.left = f.x + "%";
      b.style.top = f.y + "%";
      b.title = itemName(f.item);
      b.textContent = (ITEMS[f.item] && ITEMS[f.item].icon) || "•";
      b.addEventListener("click", () => pickForage(f));
      forage.appendChild(b);
    });
    const walk = $("walkers");
    walk.innerHTML = "";
    state.party.forEach((id) => {
      const m = memberById(id);
      const el = document.createElement("button");
      el.className = "walker" + (curHp(id) <= 0 ? " down" : "");
      el.innerHTML = imgTag(id === "hero" ? classBy().art : (m && m.art), memberName(id)) +
        `<span class="mini-hp"><span style="width:${Math.max(0, (curHp(id) / maxHp(id)) * 100)}%"></span></span>`;
      el.title = memberName(id);
      el.addEventListener("click", () => { openDesk(); setTab("hearts"); });
      walk.appendChild(el);
    });
    if (state.pet) {
      const pet = PETS.find((p) => p.id === state.pet);
      if (pet) {
        const el = document.createElement("div");
        el.className = "walker pet";
        el.innerHTML = imgTag(pet.art, pet.name);
        el.title = pet.name;
        walk.appendChild(el);
      }
    }
    $("crowd-fill").style.width = Math.min(100, state.crowd || 0) + "%";
    if (state.fight) renderPit(false);
    else hidePit();
  }

  function pitEl(id) {
    return document.querySelector('.pit-fighter[data-id="' + id + '"]');
  }

  function hidePit() {
    const pit = $("pit");
    const world = $("world");
    if (pit) pit.classList.add("hidden");
    if (world) world.classList.remove("bout");
  }

  function fighterChip(id, artId, name, hp, max, bench) {
    const down = hp <= 0;
    return `<div class="pit-fighter${bench ? " bench" : ""}${down ? " down" : ""}" data-id="${esc(id)}"><div class="pit-sprite">${imgTag(artId, name)}</div><strong>${esc(name)}</strong><div class="bar"><span style="width:${max ? Math.max(0, Math.min(100, (hp / max) * 100)) : 0}%"></span></div></div>`;
  }

  function renderPit(rebuild) {
    const pit = $("pit");
    const world = $("world");
    if (!pit || !world || !state.fight) { hidePit(); return; }
    world.classList.add("bout");
    pit.classList.remove("hidden");
    const f = state.fight;
    const partyBox = $("pit-party");
    const foeBox = $("pit-foe");
    if (rebuild || !partyBox.children.length) {
      const living = livingMembers();
      const shown = (living.length ? living : state.party).slice(0, 3);
      partyBox.innerHTML = shown.map((id, i) => {
        const m = memberById(id);
        const artId = id === "hero" ? classBy().art : (m && m.art);
        return fighterChip(id, artId, memberName(id), curHp(id), maxHp(id), i > 0);
      }).join("");
      foeBox.innerHTML = fighterChip("foe", f.art, f.name, f.foeHp, f.foeMax, false);
    } else {
      updatePitHp();
    }
    const log = $("pit-log");
    if (log) log.textContent = f.log || "";
    const sub = $("card-sub");
    if (sub) sub.textContent = "watching the sand";
  }

  function updatePitHp() {
    if (!state.fight) return;
    document.querySelectorAll("#pit-party .pit-fighter").forEach((el) => {
      const id = el.dataset.id;
      const span = el.querySelector(".bar span");
      if (span && maxHp(id)) span.style.width = Math.max(0, Math.min(100, (curHp(id) / maxHp(id)) * 100)) + "%";
      el.classList.toggle("down", curHp(id) <= 0);
    });
    const foe = pitEl("foe");
    if (foe) {
      const span = foe.querySelector(".bar span");
      const f = state.fight;
      if (span && f.foeMax) span.style.width = Math.max(0, Math.min(100, (f.foeHp / f.foeMax) * 100)) + "%";
    }
    const log = $("pit-log");
    if (log) log.textContent = state.fight.log || "";
  }

  function playPit(id, cls) {
    const el = pitEl(id);
    if (!el) return;
    el.classList.remove("lunge", "recoil", "heal", "bow");
    void el.offsetWidth;
    el.classList.add(cls);
  }

  function popClash() {
    const el = $("pit-clash");
    if (!el) return;
    el.classList.remove("pop");
    void el.offsetWidth;
    el.classList.add("pop");
  }

  function renderFight() {
    const box = $("fight");
    if (!box) return;
    if (!state.fight) { box.classList.add("hidden"); return; }
    const f = state.fight;
    box.classList.add("hidden");
    box.classList.toggle("keeper", !!f.keeper);
    if ($("fight-art")) $("fight-art").innerHTML = imgTag(f.art, f.name);
    if ($("fight-name")) $("fight-name").textContent = f.name;
    if ($("fight-foe-hp")) $("fight-foe-hp").style.width = (f.foeMax ? Math.max(0, (f.foeHp / f.foeMax) * 100) : 0) + "%";
    if ($("fight-log")) $("fight-log").textContent = f.log;
    const log = $("pit-log");
    if (log) log.textContent = f.log || "";
  }

  function rowHtml(thumb, title, sub, btn) {
    return `<span class="thumb">${thumb}</span><div><h3>${title}</h3><p>${sub}</p></div>${btn || ""}`;
  }

  function renderCards() {
    const box = $("cards");
    box.innerHTML = "";
    CARDS.forEach((c) => {
      const open = cardUnlocked(c);
      const on = state.card === c.id;
      const row = document.createElement("div");
      row.className = "row" + (on ? " on" : "") + (open ? "" : " locked");
      const n = (state.bouts[c.id] || 0);
      row.innerHTML = rowHtml(
        esc(c.icon),
        esc(c.name) + (on ? " · walking" : ""),
        open ? (esc(c.hint) + " · " + n + " walks") : ("Opens around level " + c.level),
        open ? `<button class="buy-btn">${on ? "on" : "walk"}</button>` : `<button class="buy-btn" disabled>soon</button>`
      );
      const b = row.querySelector("button");
      if (open) b.addEventListener("click", () => {
        state.card = c.id;
        state.progress = 0;
        if (c.id === "moon" || c.id === "champion") setScene("arena");
        if (c.id === "practice") setScene("yard");
        if (c.id === "market") setScene("market");
        toast("The card is " + c.name + ".");
        renderCards();
        renderWorld();
        save();
      });
      box.appendChild(row);
    });
  }

  function renderErrands() {
    const box = $("errands");
    box.innerHTML = "";
    seedErrands();
    (state.errands || []).forEach((e) => {
      const have = state.errandProg[e.id] || 0;
      const row = document.createElement("div");
      row.className = "row" + (e.done ? " on" : "");
      row.innerHTML = rowHtml("📌", esc(e.text), (e.done ? "Done." : have + " / " + e.n) + " · " + fmt(e.gold), "");
      box.appendChild(row);
    });
  }

  function renderDummy() {
    const box = $("dummy");
    box.innerHTML = "";
    const row = document.createElement("div");
    row.className = "row";
    const n = state.dummyReady || 0;
    row.innerHTML = rowHtml(imgTag("dummy", "dummy"), "Practice dummy", n ? n + " straw waiting" : "Still smiling.", `<button class="buy-btn"${n ? "" : " disabled"}>collect</button>`);
    row.querySelector("button").addEventListener("click", collectDummy);
    box.appendChild(row);
  }

  function renderBooth() {
    const box = $("booth");
    box.innerHTML = "";
    const row = document.createElement("div");
    row.className = "row";
    const n = state.boothReady || 0;
    row.innerHTML = rowHtml(imgTag("vela", "Vela"), "Vela's tin", n ? n + " ticket" + (n > 1 ? "s" : "") + " waiting" : "The tin is thinking.", `<button class="buy-btn"${n ? "" : " disabled"}>collect</button>`);
    row.querySelector("button").addEventListener("click", collectBooth);
    box.appendChild(row);
  }

  function renderRoster() {
    const box = $("roster");
    box.innerHTML = "";
    ROSTER.forEach((m) => {
      const inP = state.party.includes(m.id);
      const row = document.createElement("div");
      row.className = "row" + (inP ? " on" : "");
      let btn = "";
      if (m.id === "hero") btn = `<button class="buy-btn" disabled>you</button>`;
      else if (inP) btn = `<button class="buy-btn">sit</button>`;
      else if (state.level < m.level) btn = `<button class="buy-btn" disabled>lv ${m.level}</button>`;
      else btn = `<button class="buy-btn">${fmt(m.cost)}</button>`;
      row.innerHTML = rowHtml(imgTag(m.art, m.name), esc(m.name) + " · " + esc(m.role), esc(m.blurb), btn);
      const b = row.querySelector("button");
      if (m.id !== "hero") b.addEventListener("click", () => {
        if (inP) {
          state.party = state.party.filter((id) => id !== m.id);
        } else {
          if (state.level < m.level) { toast("They are still stretching."); return; }
          if (state.party.length >= PARTY_MAX) { toast("The sand is only so wide."); return; }
          if (!state._recruited) state._recruited = {};
          if (!state._recruited[m.id]) {
            if (!spend(m.cost)) { toast("The crate is short."); return; }
            state._recruited[m.id] = true;
            note(m.name + " packed a bag.");
          }
          state.party.push(m.id);
          if (state.hp[m.id] == null) state.hp[m.id] = maxHp(m.id);
        }
        renderRoster();
        renderVitals();
        renderWorld();
        renderHud();
        save();
      });
      box.appendChild(row);
    });
  }

  function renderPets() {
    const box = $("pets");
    box.innerHTML = "";
    PETS.forEach((p) => {
      const on = state.pet === p.id;
      const row = document.createElement("div");
      row.className = "row" + (on ? " on" : "");
      const owned = state._pets && state._pets[p.id];
      row.innerHTML = rowHtml(
        imgTag(p.art, p.name),
        esc(p.name),
        esc(p.blurb),
        on ? `<button class="buy-btn">home</button>` :
          (state.level < p.level ? `<button class="buy-btn" disabled>lv ${p.level}</button>` :
            `<button class="buy-btn">${owned ? "call" : fmt(p.cost)}</button>`)
      );
      row.querySelector("button").addEventListener("click", () => {
        if (on) { state.pet = ""; }
        else {
          if (state.level < p.level) return;
          if (!(state._pets && state._pets[p.id])) {
            if (!spend(p.cost)) { toast("Not enough coppers."); return; }
            state._pets = state._pets || {};
            state._pets[p.id] = true;
          }
          state.pet = p.id;
        }
        renderPets();
        renderWorld();
        save();
      });
      box.appendChild(row);
    });
  }

  function renderGear() {
    const box = $("gear");
    box.innerHTML = "";
    const slots = ["hat", "cloak", "boots", "charm", "weapon"];
    slots.forEach((slot) => {
      GEAR.filter((g) => g.slot === slot).forEach((g) => {
        const on = state.gear && state.gear[slot] === g.id;
        const owned = g.start || (state._gear && state._gear[g.id]);
        const row = document.createElement("div");
        row.className = "row" + (on ? " on" : "");
        let btn = on ? `<button class="buy-btn">on</button>` :
          (state.level < g.level ? `<button class="buy-btn" disabled>lv ${g.level}</button>` :
            `<button class="buy-btn">${owned ? "wear" : fmt(g.cost)}</button>`);
        row.innerHTML = rowHtml("✦", esc(g.name), esc(g.blurb), btn);
        row.querySelector("button").addEventListener("click", () => {
          if (on) return;
          if (state.level < g.level) return;
          if (!owned && g.cost) {
            if (!spend(g.cost)) { toast("The stall wants more."); return; }
            state._gear = state._gear || {};
            state._gear[g.id] = true;
          }
          if (!owned && !g.cost && !g.start) return;
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
    box.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "class-pick";
    Object.values(CLASSES).forEach((c) => {
      const b = document.createElement("button");
      b.className = "class-btn" + (state.classId === c.id ? " on" : "");
      b.innerHTML = `<strong>${esc(c.name)}</strong><span>${esc(c.blurb)}</span>`;
      b.addEventListener("click", () => {
        if (state.classId === c.id) return;
        if (totalBouts() < 1 && c.id !== "gate") {
          toast("Walk one card first, then pick a habit.");
          return;
        }
        state.classId = c.id;
        ensureCombat();
        setHp("hero", maxHp("hero"));
        toast("The sand will still call you kindly.");
        renderClassBox();
        renderHud();
        renderWorld();
        save();
      });
      wrap.appendChild(b);
    });
    box.appendChild(wrap);
    const skill = document.createElement("p");
    skill.style.cssText = "margin:8px 0 0;font-size:0.8rem;color:#5c5146";
    skill.textContent = classBy().skill;
    box.appendChild(skill);
  }

  function renderVitals() {
    const box = $("vitals");
    box.innerHTML = "";
    state.party.forEach((id) => {
      const row = document.createElement("div");
      row.className = "row";
      const m = memberById(id);
      row.innerHTML = rowHtml(
        imgTag(id === "hero" ? classBy().art : (m && m.art), memberName(id)),
        esc(memberName(id)),
        curHp(id) + " / " + maxHp(id) + " hearts",
        ""
      );
      box.appendChild(row);
    });
  }

  function renderTalents() {
    const box = $("talents");
    box.innerHTML = "";
    if (talentsDue() > 0) {
      const row = document.createElement("div");
      row.className = "row on";
      row.innerHTML = rowHtml("✦", "A habit is waiting", "The sand taught you something.", `<button class="buy-btn">pick</button>`);
      row.querySelector("button").addEventListener("click", showTalentPicker);
      box.appendChild(row);
    }
    (state.talents || []).forEach((id) => {
      const t = TALENTS.find((x) => x.id === id);
      if (!t) return;
      const row = document.createElement("div");
      row.className = "row on";
      row.innerHTML = rowHtml("✦", esc(t.name), esc(t.text), "");
      box.appendChild(row);
    });
    if (!talentsDue() && !(state.talents || []).length) {
      box.innerHTML = `<div class="row"><span class="thumb">✦</span><div><h3>Not yet</h3><p>Every three levels the sand teaches a habit.</p></div></div>`;
    }
  }

  function renderPack() {
    const box = $("pack");
    box.innerHTML = "";
    const keys = Object.keys(state.pack || {}).filter((id) => packCount(id) > 0);
    if (!keys.length) {
      box.innerHTML = `<div class="row"><span class="thumb">📦</span><div><h3>Empty crate</h3><p>The sand will fill it.</p></div></div>`;
      renderAutosell();
      return;
    }
    keys.forEach((id) => {
      const it = ITEMS[id] || { name: id, icon: "•", sell: 0 };
      const n = packCount(id);
      const btn = document.createElement("button");
      btn.className = "seed";
      btn.innerHTML = `<span class="thumb">${esc(it.icon || "•")}</span><span class="meta"><span class="name">${esc(it.name)} ×${n}</span><span class="sub">sell one · ${profitRange(it.sell)}</span></span>`;
      btn.addEventListener("click", () => sellOne(id));
      box.appendChild(btn);
    });
    renderAutosell();
  }

  function renderAutosell() {
    const box = $("autosell");
    box.innerHTML = "";
    ["straw", "sandal", "ribbon", "ticket", "flour"].forEach((id) => {
      const lab = document.createElement("label");
      const on = !!(state.autosell && state.autosell[id]);
      lab.innerHTML = `<input type="checkbox" ${on ? "checked" : ""}/> auto ${esc(itemName(id))}`;
      lab.querySelector("input").addEventListener("change", (e) => {
        state.autosell[id] = e.target.checked;
        save();
      });
      box.appendChild(lab);
    });
  }

  function renderRecipes() {
    const box = $("recipes");
    box.innerHTML = "";
    RECIPES.forEach((r) => {
      const need = Object.entries(r.needs).map(([id, n]) => n + " " + itemName(id)).join(", ");
      const ok = Object.entries(r.needs).every(([id, n]) => packCount(id) >= n);
      const row = document.createElement("div");
      row.className = "row";
      row.innerHTML = rowHtml((ITEMS[r.id] && ITEMS[r.id].icon) || "🍲", esc(r.name), need, `<button class="buy-btn"${ok ? "" : " disabled"}>cook</button>`);
      row.querySelector("button").addEventListener("click", () => cookRecipe(r));
      box.appendChild(row);
    });
  }

  function renderCrafts() {
    const box = $("crafts");
    box.innerHTML = "";
    CRAFTS.forEach((r) => {
      const need = Object.entries(r.needs).map(([id, n]) => n + " " + itemName(id)).join(", ");
      const ok = Object.entries(r.needs).every(([id, n]) => packCount(id) >= n);
      const row = document.createElement("div");
      row.className = "row";
      row.innerHTML = rowHtml("🔨", esc(r.name), need, `<button class="buy-btn"${ok ? "" : " disabled"}>make</button>`);
      row.querySelector("button").addEventListener("click", () => craftItem(r));
      box.appendChild(row);
    });
  }

  function renderNeighbors() {
    const box = $("neighbors");
    box.innerHTML = "";
    NPCS.forEach((npc) => {
      const h = state.hearts[npc.id] || 0;
      const card = document.createElement("div");
      card.className = "npc-card";
      card.innerHTML = `<div class="port">${imgTag(npc.art, npc.name)}</div><div><h3>${esc(npc.name)} <span class="hearts">${"♥".repeat(h)}${"♡".repeat(5 - h)}</span></h3><p>${esc(npc.role)} · wants ${esc(itemName(npcWant(npc)))}</p><button class="buy-btn">visit</button></div>`;
      card.querySelector("button").addEventListener("click", () => talkNpc(npc));
      box.appendChild(card);
    });
  }

  function renderShop() {
    const box = $("shop");
    box.innerHTML = "";
    SHOP.forEach((s) => {
      const it = ITEMS[s.id];
      const row = document.createElement("div");
      row.className = "row";
      row.innerHTML = rowHtml(esc(it.icon), esc(it.name), "Otto's crate", `<button class="buy-btn">${fmt(s.cost)}</button>`);
      row.querySelector("button").addEventListener("click", () => {
        if (!spend(s.cost)) { toast("Short on coppers."); return; }
        addPack(s.id, 1);
        toast(it.name + ".");
        renderShop();
        renderPack();
        save();
      });
      box.appendChild(row);
    });
  }

  function renderSchool() {
    const box = $("school");
    box.innerHTML = "";
    SCHOOL.forEach((u) => {
      const on = !!(state.school && state.school[u.id]);
      const row = document.createElement("div");
      row.className = "row" + (on ? " on" : "");
      row.innerHTML = rowHtml("🏛", esc(u.name), esc(u.text), on ? `<button class="buy-btn" disabled>in</button>` : `<button class="buy-btn">${fmt(u.cost)}</button>`);
      row.querySelector("button").addEventListener("click", () => {
        if (on) return;
        if (!spend(u.cost)) { toast("The ludus wants more coppers."); return; }
        state.school[u.id] = true;
        note("The school learned " + u.name + ".");
        renderSchool();
        renderHud();
        save();
      });
      box.appendChild(row);
    });
  }

  function renderMuseum() {
    const box = $("museum");
    box.innerHTML = "";
    MUSEUM.forEach((m) => {
      const on = !!(state.museum && state.museum[m.id]);
      const row = document.createElement("div");
      row.className = "row" + (on ? " on" : "");
      row.innerHTML = rowHtml("🏺", esc(m.name), esc(m.blurb), on ? `<button class="buy-btn" disabled>kept</button>` : `<button class="buy-btn"${packCount(m.need) ? "" : " disabled"}>give</button>`);
      row.querySelector("button").addEventListener("click", () => {
        if (on) return;
        if (!takePack(m.need, 1)) { toast("The shelf is still waiting."); return; }
        state.museum[m.id] = true;
        toast("The shelf remembered.");
        renderMuseum();
        renderPack();
        save();
      });
      box.appendChild(row);
    });
  }

  function renderJournal() {
    $("journal-sub").textContent = totalBouts() + " cards · " + (state.mail || []).length + " letters.";
    const box = $("journal");
    box.innerHTML = (state.journal || []).slice(0, 16).map((j) =>
      `<div class="journal-item"><em>day ${esc(String(state.day))}</em>${esc(j.text)}</div>`
    ).join("") || `<div class="journal-item">The sand was already warm.</div>`;
    renderStory();
    renderBestiary();
    renderStamps();
    renderMemories();
  }

  function renderStory() {
    const box = $("story");
    box.innerHTML = STORY.map((ch) => {
      const on = !!state.story[ch.id];
      return `<div class="journal-item"><em>${on ? "chapter" : "unwritten"}</em><strong>${esc(ch.title)}</strong>${on ? " — " + esc(ch.text) : ""}</div>`;
    }).join("");
  }

  function renderBestiary() {
    const box = $("bestiary");
    box.innerHTML = "";
    Object.values(FOES).forEach((f) => {
      const seen = state.seen[f.id];
      const card = document.createElement("div");
      card.className = "be-card";
      card.innerHTML = `<div class="thumb">${seen ? imgTag(f.art, f.name) : "?"}</div><strong>${seen ? esc(f.name) : "???"}</strong><span>${seen ? seen.meets + " meets · " + seen.wins + " bows" : "not yet"}</span>`;
      box.appendChild(card);
    });
  }

  function renderStamps() {
    const box = $("stamps");
    box.innerHTML = "";
    STAMPS.forEach((s) => {
      const on = s.test(state);
      const card = document.createElement("div");
      card.className = "be-card";
      card.innerHTML = `<div class="thumb">${esc(s.icon)}</div><strong>${on ? esc(s.name) : "···"}</strong><span>${on ? "kept" : "waiting"}</span>`;
      box.appendChild(card);
    });
  }

  function renderMemories() {
    const box = $("memories");
    box.innerHTML = (state.memories || []).slice().reverse().map((m) =>
      `<div class="journal-item"><em>day ${esc(String(m.day))}</em>${esc(m.text)}</div>`
    ).join("") || `<div class="journal-item">The sand is still writing.</div>`;
  }

  function renderLantern() {
    const p = para();
    const score = kindleScore();
    const gain = kindlePointsFrom(score);
    $("wreath-score").innerHTML = [
      ["Heat", String(p.points || 0), "unspent"],
      ["Hung", String(p.kindles || 0), "times"],
      ["Score", String(score), "this walk"],
      ["Next", "+" + gain, canKindle() ? "ready" : kindleWhyNot()],
    ].map((r) => `<div class="stat-cell"><strong>${esc(r[0])} ${esc(r[1])}</strong><span>${esc(r[2])}</span></div>`).join("");
    $("btn-kindle").disabled = !canKindle();
    const s = sheet();
    $("stat-sheet").innerHTML = [
      ["Coppers", fmtPct(s.gold - 1), "profit lean"],
      ["Lessons", fmtPct(s.xp - 1), "experience"],
      ["Finds", fmtPct(s.loot - 1), "crate luck"],
      ["Stride", fmtPct(s.speed - 1), "card speed"],
      ["Crit", fmtPct(s.critChance), "lantern taps"],
      ["Ward", fmtPct(s.wardDR), "softer hits"],
      ["Mend", fmtPct(s.mend), "soup math"],
      ["Haste", fmtPct(s.haste), "bout courtesy"],
    ].map((r) => `<div class="stat-cell"><strong>${esc(r[0])} ${esc(r[1])}</strong><span>${esc(r[2])}</span></div>`).join("");
    const tree = $("paragon-tree");
    tree.innerHTML = "";
    PARAGON_NODES.forEach((n) => {
      const rank = nodeRank(n.id);
      const cost = nodeCost(rank);
      const maxed = rank >= PARA_MAX;
      const can = !maxed && (p.points || 0) >= cost;
      const row = document.createElement("div");
      row.className = "row" + (rank ? " on" : "");
      row.innerHTML = rowHtml("✦", esc(n.name) + " · " + rank + "/" + PARA_MAX, esc(n.text) + " · " + fmtPct(rank * n.per), `<button class="buy-btn"${can ? "" : " disabled"}>${maxed ? "max" : cost + " pt"}</button>`);
      row.querySelector("button").addEventListener("click", () => {
        if (!spendParagonNode(n.id)) { toast("The wreath wants more heat."); return; }
        toast(n.name + " grew to " + nodeRank(n.id) + ".");
        renderLantern();
        renderHud();
        save();
      });
      tree.appendChild(row);
    });
  }

  function renderProfiles() {
    const box = $("profiles");
    box.innerHTML = "";
    const idx = loadIndex();
    idx.list.forEach((p) => {
      const row = document.createElement("div");
      row.className = "profile-row" + (p.id === idx.active ? " on" : "");
      row.innerHTML = `<div><strong>${esc(p.name)}</strong><span>${p.id === idx.active ? "on the sand" : "asleep"}</span></div>`;
      const go = document.createElement("button");
      go.className = "buy-btn";
      go.textContent = p.id === idx.active ? "here" : "wake";
      go.disabled = p.id === idx.active;
      go.addEventListener("click", () => switchProfile(p.id));
      row.appendChild(go);
      box.appendChild(row);
    });
  }

  function renderSettings() {
    const box = $("set-tracks");
    if (!box) return;
    if ($("set-music")) $("set-music").checked = state.music !== false;
    if ($("set-sfx")) $("set-sfx").checked = state.sfx !== false;
    if ($("set-mvol")) $("set-mvol").value = String(Math.round(musicVol() * 100));
    if ($("set-svol")) $("set-svol").value = String(Math.round(sfxVol() * 100));
    box.innerHTML = "";
    TRACKS.forEach((t) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "set-track" + (currentTrack().id === t.id ? " on" : "");
      b.innerHTML = `<strong>${esc(t.name)}</strong><span>${esc(t.hint)}</span>`;
      b.addEventListener("click", () => setTrack(t.id));
      box.appendChild(b);
    });
    if ($("set-note")) $("set-note").textContent = currentTrack().name + " — " + currentTrack().hint;
  }

  function openSettings() {
    closeDesk();
    document.body.classList.add("settings-open");
    $("settings").classList.remove("hidden");
    renderSettings();
    startMusic();
  }

  function closeSettings() {
    document.body.classList.remove("settings-open");
    if ($("settings")) $("settings").classList.add("hidden");
  }

  function renderDebug() {
    const box = $("debug");
    box.innerHTML = "";
    [
      ["+50¢", () => addGold(50)],
      ["+lv", () => { addXp(xpNeeded(state.level)); }],
      ["heal", () => { healAll(999); renderVitals(); renderHud(); }],
      ["day", () => { state.dayAt -= DAY_MS; tickDay(Date.now()); renderAll(); }],
      ["fest", () => { state.day = 14; state.sawFestival = true; renderAll(); }],
    ].forEach(([label, fn]) => {
      const b = document.createElement("button");
      b.textContent = label;
      b.addEventListener("click", () => { fn(); save(); });
      box.appendChild(b);
    });
  }

  function renderAll() {
    ensureCombat();
    renderHud();
    renderWorld();
    renderFight();
    renderCards();
    renderErrands();
    renderDummy();
    renderBooth();
    renderRoster();
    renderPets();
    renderGear();
    renderClassBox();
    renderVitals();
    renderTalents();
    renderPack();
    renderRecipes();
    renderCrafts();
    renderNeighbors();
    renderShop();
    renderSchool();
    renderMuseum();
    renderJournal();
    renderLantern();
    renderProfiles();
    renderDebug();
    renderSettings();
    $("btn-scene-arena").classList.toggle("on", state.scene === "arena");
    $("btn-scene-yard").classList.toggle("on", state.scene === "yard");
    $("btn-scene-market").classList.toggle("on", state.scene === "market");
    $("btn-scene-baths").classList.toggle("on", state.scene === "baths");
  }

  function tickRegen(now) {
    if (state.fight) return;
    if (!state.regenAt || state.regenAt > now) state.regenAt = now;
    const mend = sheet().mend;
    const gap = ((state.school && state.school.kettle) ? REGEN_MS * 0.65 : REGEN_MS) / Math.max(0.55, 1 + mend * 0.7);
    let steps = 0;
    while (now - state.regenAt >= gap && steps < 40) {
      state.regenAt += gap;
      healAll(mend > 0.25 ? 2 : 1);
      steps += 1;
    }
    if (steps >= 40) state.regenAt = now;
  }

  function tick(now) {
    try {
    tickDay(Date.now());
    tickRegen(Date.now());
    tickDummy(Date.now());
    tickBooth(Date.now());
    if (state.fight) {
      stepFight(now);
      if (now - lastUi > 200) {
        lastUi = now;
        renderHud();
      }
      return;
    }
    const card = cardById(state.card);
    const dur = cardDuration(card);
    const dt = Math.min(2000, now - (state._prev || now));
    state._prev = now;
    if (!livingMembers().length) {
      state.party.forEach((id) => setHp(id, 1));
    }
    state.progress += dt / dur;
    if (state.progress >= 1) {
      state.progress = 0.999;
      startFight(false);
    }
    if (now - lastUi > 200) {
      lastUi = now;
      $("card-fill").style.width = Math.min(100, state.progress * 100) + "%";
      const left = Math.max(0, (1 - state.progress) * dur);
      $("card-sub").textContent = state.fight
        ? "watching the sand — no click needed"
        : "bout in " + Math.max(1, Math.ceil(left / 1000)) + "s — just watch";
      $("crowd-fill").style.width = Math.min(100, state.crowd || 0) + "%";
      $("day-num").textContent = state.day;
      $("hp-label").textContent = partyHp() + " / " + partyMaxHp();
      $("hp-fill").style.width = (partyMaxHp() ? Math.min(100, (partyHp() / partyMaxHp()) * 100) : 0) + "%";
    }
    } catch (err) {
      if (!state._tickErr) {
        state._tickErr = true;
        try { toast("A small snag: " + (err && err.message ? err.message : "tick")); } catch (e) { /* ignore */ }
      }
    }
  }

  function bind() {
    window.addEventListener("error", (e) => {
      try { toast("A small snag: " + (e.message || "unknown")); } catch (err) { /* ignore */ }
    });
    $("btn-desk").addEventListener("click", () => { closeSettings(); openDesk(); });
    $("btn-close-desk").addEventListener("click", closeDesk);
    if ($("btn-settings")) $("btn-settings").addEventListener("click", openSettings);
    if ($("btn-close-settings")) $("btn-close-settings").addEventListener("click", closeSettings);
    if ($("set-music")) $("set-music").addEventListener("change", (e) => {
      state.music = e.target.checked;
      if (state.music) startMusic(); else stopMusic();
      renderHud();
      save();
    });
    if ($("set-sfx")) $("set-sfx").addEventListener("change", (e) => {
      state.sfx = e.target.checked;
      renderHud();
      save();
    });
    if ($("set-mvol")) $("set-mvol").addEventListener("input", (e) => {
      state.musicVol = Number(e.target.value) / 100;
      applyMusicVolume();
      save();
    });
    if ($("set-svol")) $("set-svol").addEventListener("input", (e) => {
      state.sfxVol = Number(e.target.value) / 100;
      save();
    });
    document.addEventListener("pointerdown", () => { if (musicOn()) startMusic(); }, { once: true });
    $("btn-scene-arena").addEventListener("click", () => { setScene("arena"); renderAll(); save(); });
    $("btn-scene-yard").addEventListener("click", () => { setScene("yard"); renderAll(); save(); });
    $("btn-scene-market").addEventListener("click", () => { setScene("market"); renderAll(); save(); });
    $("btn-scene-baths").addEventListener("click", () => { setScene("baths"); renderAll(); save(); });
    $("btn-collect").addEventListener("click", sellAll);
    $("btn-mute").addEventListener("click", () => {
      openSettings();
    });
    $("hp-pill").addEventListener("click", () => { openDesk(); setTab("hearts"); });
    $("coin-pill").addEventListener("click", () => { openDesk(); setTab("wreath"); });
    $("btn-mail").addEventListener("click", openMail);
    $("btn-heal-soup").addEventListener("click", () => useHealItem("soup"));
    $("btn-rest").addEventListener("click", innRest);
    $("btn-camp").addEventListener("click", campTillMorning);
    $("btn-kindle").addEventListener("click", () => {
      if (!canKindle()) { toast(kindleWhyNot()); return; }
      const gain = kindlePointsFrom(kindleScore());
      showModal(
        "Hang the wreath?",
        "Idle-Cozy-Gladiators will forget this walk: crate, school, friends on the roster, and the map-creases.\n\nIt will keep your name, your class, autosell habits, and every wreath rank.\n\nYou would gain +" + gain + " heat to spend.",
        "Not yet"
      );
      const go = document.createElement("button");
      go.className = "primary-btn";
      go.textContent = "Hang · +" + gain;
      go.addEventListener("click", () => {
        if (!doKindle()) return;
        hideModal();
        renderAll();
      });
      $("modal-actions").appendChild(go);
    });
    $("btn-new-profile").addEventListener("click", () => {
      const name = ($("profile-name").value || "").trim() || "Keeper";
      newProfile(name);
      $("profile-name").value = "";
    });
    $("btn-reset").addEventListener("click", () => {
      showModal("Reset this hearth?", "The sand forgets this walk. Other hearths stay.", "Keep it");
      const go = document.createElement("button");
      go.className = "danger-btn";
      go.style.marginTop = "0";
      go.textContent = "Forget";
      go.addEventListener("click", () => { resetProfile(); hideModal(); });
      $("modal-actions").appendChild(go);
    });
    $("modal-ok").addEventListener("click", hideModal);
    document.querySelectorAll(".tab").forEach((t) => {
      t.addEventListener("click", () => setTab(t.dataset.tab));
    });
    document.addEventListener("visibilitychange", () => { if (document.hidden) save(); });
    window.addEventListener("beforeunload", save);
  }

  function boot() {
    try {
      load();
      applyOffline();
      if (!(state.journal && state.journal.length)) note("The sand was already warm.");
      bind();
      renderAll();
      if (totalBouts() === 0 && state.level <= 1) {
        showModal(
          "Welcome to Idle-Cozy-Gladiators",
          "You do not have to click the sand.\n\nThe roster already walks. In a few seconds a guest steps out and they tap, recoil, and bow.\n\nLudus (gold button, bottom right) is only for cards, friends, and soup.",
          "Got it — I'll watch"
        );
        const port = $("modal-portrait");
        if (port) {
          port.innerHTML = imgTag("you", "You");
          port.classList.remove("hidden");
        }
      }
    } catch (err) {
      try { toast("A small snag: " + (err && err.message ? err.message : "boot")); } catch (e) { /* ignore */ }
    }
    let acc = 0;
    let last = performance.now();
    const loop = (now) => {
      const dt = now - last;
      last = now;
      acc += dt;
      if (acc > 50) {
        tick(now);
        acc = 0;
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
    setInterval(() => { try { save(); } catch (e) { /* ignore */ } }, 20000);
  }

  boot();
})();
