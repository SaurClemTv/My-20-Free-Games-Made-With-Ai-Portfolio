(() => {
  const SAVE_KEY = "idle-cozy-farmer-v2";
  const OLD_KEY = "idle-cozy-farmer-v1";
  const PROFILE_INDEX = "idle-cozy-farmer-profiles";
  const SAVE_PREFIX = "idle-cozy-farmer-slot-";
  const PLOT_COUNT = 16;
  const START_UNLOCKED = 4;
  const SEED_SCALE = 50;
  const START_COINS = 400;
  const COST_SCALE = 5;
  const OFFLINE_CAP_MS = 8 * 60 * 60 * 1000;
  const DAY_MS = 8 * 60 * 1000;

  const SEASONS = ["spring", "summer", "autumn", "winter"];
  const SEASON_LABEL = { spring: "Spring", summer: "Summer", autumn: "Autumn", winter: "Winter" };
  const WEATHERS = {
    spring: ["sunny", "rain", "wind"],
    summer: ["sunny", "sunny", "rain"],
    autumn: ["sunny", "wind", "rain"],
    winter: ["snow", "sunny", "wind"],
  };
  const WEATHER_SAY = {
    sunny: "clear and kind",
    rain: "a soft rain",
    wind: "a busy wind",
    snow: "quiet snow",
  };

  const CROPS = [
    { id: "turnip", name: "Turnip", grow: 5000, cost: 2, sell: 6, unlock: 0, seasons: ["spring", "autumn"], kind: "veg", art: "turnip", hint: "A polite first crop." },
    { id: "radish", name: "Radish", grow: 4000, cost: 2, sell: 5, unlock: 10, seasons: ["spring"], kind: "veg", art: "radish", hint: "A peppery button." },
    { id: "lettuce", name: "Lettuce", grow: 7000, cost: 3, sell: 8, unlock: 18, seasons: ["spring"], kind: "veg", art: "lettuce", hint: "Crisp as a good morning." },
    { id: "carrot", name: "Carrot", grow: 12000, cost: 8, sell: 22, unlock: 40, seasons: ["spring", "autumn"], kind: "veg", art: "carrot", hint: "Sweet and stubborn." },
    { id: "onion", name: "Onion", grow: 14000, cost: 7, sell: 20, unlock: 50, seasons: ["spring", "autumn"], kind: "veg", art: "onion", hint: "Makes the stew honest." },
    { id: "potato", name: "Potato", grow: 16000, cost: 10, sell: 26, unlock: 70, seasons: ["spring", "autumn"], kind: "veg", art: "potato", hint: "Quiet gold under dirt." },
    { id: "peas", name: "Peas", grow: 11000, cost: 6, sell: 17, unlock: 60, seasons: ["spring"], kind: "veg", art: "peas", hint: "Little green bells." },
    { id: "cabbage", name: "Cabbage", grow: 18000, cost: 12, sell: 32, unlock: 90, seasons: ["spring", "autumn"], kind: "veg", art: "cabbage", hint: "A round green planet." },
    { id: "garlic", name: "Garlic", grow: 15000, cost: 9, sell: 25, unlock: 110, seasons: ["autumn"], kind: "veg", art: "garlic", hint: "Keeps the cold polite." },
    { id: "beet", name: "Beet", grow: 17000, cost: 11, sell: 30, unlock: 130, seasons: ["autumn"], kind: "veg", art: "beet", hint: "Ruby in the soil." },
    { id: "parsnip", name: "Parsnip", grow: 19000, cost: 13, sell: 34, unlock: 160, seasons: ["autumn", "winter"], kind: "veg", art: "parsnip", hint: "Sweet after frost." },
    { id: "leek", name: "Leek", grow: 16000, cost: 10, sell: 28, unlock: 170, seasons: ["winter", "spring"], kind: "veg", art: "leek", hint: "A winter ribbon." },
    { id: "spinach", name: "Spinach", grow: 8000, cost: 5, sell: 14, unlock: 85, seasons: ["spring", "autumn"], kind: "veg", art: "spinach", hint: "Dark and decent." },
    { id: "cucumber", name: "Cucumber", grow: 20000, cost: 14, sell: 38, unlock: 210, seasons: ["summer"], kind: "veg", art: "cucumber", hint: "Cooler than the well." },
    { id: "chili", name: "Chili", grow: 22000, cost: 18, sell: 50, unlock: 260, seasons: ["summer"], kind: "veg", art: "chili", hint: "A small argument." },
    { id: "eggplant", name: "Eggplant", grow: 30000, cost: 28, sell: 78, unlock: 340, seasons: ["summer"], kind: "veg", art: "eggplant", hint: "Purple lanterns." },
    { id: "tomato", name: "Tomato", grow: 32000, cost: 36, sell: 96, unlock: 320, seasons: ["summer"], kind: "veg", art: "tomato", hint: "Sun in a skin." },
    { id: "corn", name: "Corn", grow: 36000, cost: 42, sell: 110, unlock: 380, seasons: ["summer"], kind: "grain", art: "corn", hint: "Two little lanterns." },
    { id: "wheat", name: "Wheat", grow: 25000, cost: 20, sell: 58, unlock: 150, seasons: ["summer", "autumn"], kind: "grain", art: "wheat", hint: "Gold you can plant." },
    { id: "rye", name: "Rye", grow: 27000, cost: 22, sell: 62, unlock: 190, seasons: ["autumn"], kind: "grain", art: "rye", hint: "Darker bread, darker dusk." },
    { id: "oats", name: "Oats", grow: 23000, cost: 18, sell: 52, unlock: 175, seasons: ["spring", "summer"], kind: "grain", art: "oats", hint: "Breakfast for the barn." },
    { id: "barley", name: "Barley", grow: 26000, cost: 21, sell: 60, unlock: 200, seasons: ["summer"], kind: "grain", art: "barley", hint: "The kettle's cousin." },
    { id: "rice", name: "Rice", grow: 40000, cost: 40, sell: 115, unlock: 480, seasons: ["summer"], kind: "grain", art: "rice", hint: "Needs a kind puddle." },
    { id: "hops", name: "Hops", grow: 38000, cost: 44, sell: 120, unlock: 560, seasons: ["summer", "autumn"], kind: "grain", art: "hops", hint: "Green cones for the mill." },
    { id: "berry", name: "Berry", grow: 40000, cost: 55, sell: 155, unlock: 450, seasons: ["summer"], kind: "fruit", art: "berry", hint: "Jam in waiting." },
    { id: "blueberry", name: "Blueberry", grow: 42000, cost: 58, sell: 162, unlock: 500, seasons: ["summer"], kind: "fruit", art: "blueberry", hint: "Ink-sweet." },
    { id: "grapes", name: "Grapes", grow: 50000, cost: 70, sell: 200, unlock: 750, seasons: ["autumn"], kind: "fruit", art: "grapes", hint: "A cluster of evenings." },
    { id: "apple", name: "Apple", grow: 55000, cost: 80, sell: 230, unlock: 820, seasons: ["autumn"], kind: "fruit", art: "apple", hint: "The orchard starts here." },
    { id: "peach", name: "Peach", grow: 52000, cost: 76, sell: 220, unlock: 880, seasons: ["summer"], kind: "fruit", art: "peach", hint: "Velvet summer." },
    { id: "cherry", name: "Cherry", grow: 48000, cost: 72, sell: 210, unlock: 900, seasons: ["spring", "summer"], kind: "fruit", art: "cherry", hint: "A brief red week." },
    { id: "lemon", name: "Lemon", grow: 60000, cost: 90, sell: 250, unlock: 1100, seasons: ["summer"], kind: "fruit", art: "lemon", hint: "Sunshine that pucker-talks." },
    { id: "melon", name: "Melon", grow: 65000, cost: 110, sell: 310, unlock: 1250, seasons: ["summer"], kind: "fruit", art: "melon", hint: "A heavy gift." },
    { id: "watermelon", name: "Watermelon", grow: 72000, cost: 130, sell: 370, unlock: 1500, seasons: ["summer"], kind: "fruit", art: "watermelon", hint: "A picnic in armor." },
    { id: "pumpkin", name: "Pumpkin", grow: 70000, cost: 140, sell: 420, unlock: 1400, seasons: ["autumn"], kind: "veg", art: "pumpkin", hint: "A porch-sized prize." },
    { id: "sunflower", name: "Sunflower", grow: 45000, cost: 60, sell: 170, unlock: 520, seasons: ["summer"], kind: "flower", art: "sunflower", hint: "A face for the sky." },
    { id: "lavender", name: "Lavender", grow: 34000, cost: 50, sell: 145, unlock: 700, seasons: ["spring", "summer"], kind: "herb", art: "lavender", hint: "The kettle's friend." },
    { id: "rose", name: "Rose", grow: 36000, cost: 55, sell: 160, unlock: 780, seasons: ["summer"], kind: "flower", art: "rose", hint: "For the table, not the stew." },
    { id: "tulip", name: "Tulip", grow: 20000, cost: 24, sell: 70, unlock: 240, seasons: ["spring"], kind: "flower", art: "tulip", hint: "A cup of color." },
    { id: "mint", name: "Mint", grow: 10000, cost: 8, sell: 24, unlock: 220, seasons: ["spring", "summer"], kind: "herb", art: "mint", hint: "It will take the whole bed if you let it." },
    { id: "flax", name: "Flax", grow: 30000, cost: 26, sell: 74, unlock: 400, seasons: ["summer"], kind: "herb", art: "flax", hint: "Blue for linen." },
    { id: "cotton", name: "Cotton", grow: 44000, cost: 48, sell: 140, unlock: 650, seasons: ["summer"], kind: "herb", art: "cotton", hint: "Clouds you can fold." },
    { id: "sugarcane", name: "Cane", grow: 50000, cost: 64, sell: 180, unlock: 980, seasons: ["summer"], kind: "grain", art: "sugarcane", hint: "Sweet sticks." },
    { id: "coffee", name: "Coffee", grow: 80000, cost: 160, sell: 480, unlock: 2200, seasons: ["summer"], kind: "herb", art: "coffee", hint: "For people who rise before the hens." },
    { id: "ginger", name: "Ginger", grow: 28000, cost: 30, sell: 88, unlock: 610, seasons: ["autumn"], kind: "herb", art: "ginger", hint: "Warm in the throat." },
    { id: "olive", name: "Olive", grow: 90000, cost: 200, sell: 560, unlock: 2800, seasons: ["autumn"], kind: "fruit", art: "olive", hint: "A patient tree." },
    { id: "mushroom", name: "Mushroom", grow: 28000, cost: 48, sell: 130, unlock: 600, seasons: ["autumn", "winter"], kind: "veg", art: "mushroom", hint: "Grows in hush." },
    { id: "moon", name: "Moonbloom", grow: 120000, cost: 380, sell: 1250, unlock: 4500, seasons: ["autumn", "winter"], kind: "magic", art: "moon", hint: "Opens only for dusk." },
  ];

  const ANIMALS = [
    { id: "chicken", name: "Hen", cost: 80, interval: 10000, value: 4, produce: "egg", produceName: "egg", max: 12, art: "chicken", blurb: "Lays a warm egg." },
    { id: "quail", name: "Quail", cost: 60, interval: 8000, value: 3, produce: "quail-egg", produceName: "quail egg", max: 14, art: "quail", blurb: "Tiny eggs, tiny opinions." },
    { id: "duck", name: "Duck", cost: 140, interval: 14000, value: 7, produce: "down", produceName: "down", max: 8, art: "duck", blurb: "Soft feathers, soft jokes." },
    { id: "goose", name: "Goose", cost: 180, interval: 16000, value: 9, produce: "quill", produceName: "quill", max: 8, art: "goose", blurb: "Honks, then writes." },
    { id: "turkey", name: "Turkey", cost: 220, interval: 20000, value: 12, produce: "feather", produceName: "feather", max: 6, art: "turkey", blurb: "A parade in the yard." },
    { id: "rabbit", name: "Rabbit", cost: 110, interval: 12000, value: 6, produce: "pelt", produceName: "pelt", max: 10, art: "rabbit", blurb: "Quiet company." },
    { id: "cat", name: "Cat", cost: 90, interval: 18000, value: 5, produce: "mouse", produceName: "caught mouse", max: 4, art: "cat", blurb: "Pays in fewer mice." },
    { id: "pig", name: "Pig", cost: 260, interval: 20000, value: 15, produce: "truffle", produceName: "truffle", max: 8, art: "pig", blurb: "Finds treasure with a snout." },
    { id: "cow", name: "Cow", cost: 280, interval: 22000, value: 14, produce: "milk", produceName: "milk", max: 8, art: "cow", blurb: "Slow, generous milk." },
    { id: "ox", name: "Ox", cost: 360, interval: 28000, value: 18, produce: "yoke", produceName: "day of labor", max: 4, art: "ox", blurb: "The field's oldest friend." },
    { id: "sheep", name: "Sheep", cost: 320, interval: 26000, value: 16, produce: "wool", produceName: "wool", max: 8, art: "sheep", blurb: "A walking cloud." },
    { id: "llama", name: "Llama", cost: 380, interval: 24000, value: 19, produce: "fleece", produceName: "fleece", max: 6, art: "llama", blurb: "Judges you, then gifts fleece." },
    { id: "goat", name: "Goat", cost: 400, interval: 24000, value: 20, produce: "cheese", produceName: "cheese", max: 6, art: "goat", blurb: "Trouble, then cheese." },
    { id: "donkey", name: "Donkey", cost: 340, interval: 30000, value: 17, produce: "pack", produceName: "pack run", max: 4, art: "donkey", blurb: "Carries more than pride." },
    { id: "horse", name: "Horse", cost: 520, interval: 32000, value: 26, produce: "manure", produceName: "manure", max: 4, art: "horse", blurb: "Gold, if you garden." },
    { id: "peacock", name: "Peacock", cost: 600, interval: 36000, value: 30, produce: "plume", produceName: "plume", max: 3, art: "peacock", blurb: "Beauty with a rent." },
    { id: "silkworm", name: "Silkworms", cost: 480, interval: 20000, value: 22, produce: "silk", produceName: "silk", max: 10, art: "silkworm", blurb: "A quiet factory." },
    { id: "bees", name: "Hive", cost: 700, interval: 35000, value: 40, produce: "honey", produceName: "honey", max: 6, art: "bees", blurb: "Gold in a jar." },
  ];

  const GOODS = {
    egg: { name: "Egg", sell: 4 },
    "quail-egg": { name: "Quail egg", sell: 3 },
    down: { name: "Down", sell: 7 },
    quill: { name: "Quill", sell: 9 },
    feather: { name: "Feather", sell: 12 },
    pelt: { name: "Pelt", sell: 6 },
    mouse: { name: "Caught mouse", sell: 5 },
    truffle: { name: "Truffle", sell: 15 },
    milk: { name: "Milk", sell: 14 },
    yoke: { name: "Day of labor", sell: 18 },
    wool: { name: "Wool", sell: 16 },
    fleece: { name: "Fleece", sell: 19 },
    cheese: { name: "Cheese", sell: 20 },
    pack: { name: "Pack run", sell: 17 },
    manure: { name: "Manure", sell: 26 },
    plume: { name: "Plume", sell: 30 },
    silk: { name: "Silk", sell: 22 },
    honey: { name: "Honey", sell: 40 },
    flower: { name: "Wildflower", sell: 8 },
    acorn: { name: "Acorn", sell: 6 },
    snowdrop: { name: "Snowdrop", sell: 10 },
    stew: { name: "Turnip stew", sell: 28 },
    jam: { name: "Berry jam", sell: 420 },
    pie: { name: "Pumpkin pie", sell: 680 },
    tea: { name: "Lavender tea", sell: 210 },
    broth: { name: "Mushroom broth", sell: 320 },
    loaf: { name: "Honey loaf", sell: 180 },
    cider: { name: "Apple cider", sell: 520 },
    salad: { name: "Spring salad", sell: 40 },
    relish: { name: "Chili relish", sell: 140 },
    oatcake: { name: "Oat cakes", sell: 70 },
    rosejam: { name: "Rose jelly", sell: 520 },
    moontea: { name: "Moon tea", sell: 1600 },
    flour: { name: "Flour", sell: 40 },
    pastry: { name: "Plain pastry", sell: 90 },
    dumplings: { name: "Herb dumplings", sell: 80 },
    tart: { name: "Berry tart", sell: 480 },
  };

  const VILLAGES = [
    { id: "willowbrook", name: "Willowbrook", note: "Your first kettle." },
    { id: "millford", name: "Millford", note: "The wheel never sleeps." },
    { id: "harbor", name: "Harbor Hollow", note: "Salt on the wind." },
    { id: "meadow", name: "High Meadow", note: "The sky is closer here." },
  ];

  const PARCELS = [
    { name: "Home garden", village: "willowbrook" },
    { name: "Orchard lane", village: "willowbrook" },
    { name: "Bee-side rows", village: "willowbrook" },
    { name: "Mill pond lots", village: "millford" },
    { name: "Stonebridge beds", village: "millford" },
    { name: "Kiln-yard plots", village: "millford" },
    { name: "Harbor terrace", village: "harbor" },
    { name: "Salt-wind beds", village: "harbor" },
    { name: "Net-shed garden", village: "harbor" },
    { name: "High meadow", village: "meadow" },
    { name: "Cloud pasture", village: "meadow" },
    { name: "Ridge thyme lots", village: "meadow" },
  ];

  const RECIPES = [
    { id: "stew", name: "Turnip stew", needs: { turnip: 3 }, cottage: 0, say: "The house smells like coming home." },
    { id: "loaf", name: "Honey loaf", needs: { wheat: 2, honey: 1 }, cottage: 0, say: "Mabel would approve of the crust." },
    { id: "jam", name: "Berry jam", needs: { berry: 2 }, cottage: 1, say: "Ruby in a jar." },
    { id: "tea", name: "Lavender tea", needs: { lavender: 1, honey: 1 }, cottage: 1, say: "Steam like a small blessing." },
    { id: "broth", name: "Mushroom broth", needs: { mushroom: 2, potato: 1 }, cottage: 1, say: "Deep woods in a bowl." },
    { id: "pie", name: "Pumpkin pie", needs: { pumpkin: 1, wheat: 1, milk: 1 }, cottage: 2, say: "A holiday that fits on a plate." },
    { id: "salad", name: "Spring salad", needs: { lettuce: 2, radish: 1 }, cottage: 0, say: "Crunch like a good decision." },
    { id: "cider", name: "Apple cider", needs: { apple: 2 }, cottage: 1, say: "Steam and spice from the air." },
    { id: "relish", name: "Chili relish", needs: { chili: 2, onion: 1 }, cottage: 1, say: "It wakes the bread." },
    { id: "oatcake", name: "Oat cakes", needs: { oats: 2, egg: 1 }, cottage: 0, say: "Breakfast that travels." },
    { id: "rosejam", name: "Rose jelly", needs: { rose: 2, berry: 1 }, cottage: 2, say: "A jar of June." },
    { id: "moontea", name: "Moon tea", needs: { moon: 1, lavender: 1 }, cottage: 2, say: "It tastes like staying up." },
    { id: "pastry", name: "Plain pastry", needs: { flour: 2, milk: 1 }, cottage: 1, say: "A blank page for jam." },
    { id: "dumplings", name: "Herb dumplings", needs: { flour: 1, leek: 1 }, cottage: 0, say: "Soft clouds in a broth." },
    { id: "tart", name: "Berry tart", needs: { flour: 1, berry: 1, egg: 1 }, cottage: 2, say: "The tin wears a crown." },
  ];

  const GRAINS = ["wheat", "rye", "oats", "barley", "rice"];

  const ORDERS = [
    { village: "willowbrook", title: "Mabel's tin", needs: { wheat: 4, egg: 2 }, say: "For the morning rolls, before the oven starts gossiping." },
    { village: "willowbrook", title: "Theo's lunch", needs: { potato: 3, onion: 1 }, say: "Workshop food. He will eat it standing up." },
    { village: "willowbrook", title: "Iris's kettle", needs: { lavender: 2 }, say: "Tea for the sleepless lane." },
    { village: "millford", title: "Mill bag", needs: { wheat: 6 }, say: "The wheel is hungry again." },
    { village: "millford", title: "Forge supper", needs: { stew: 1 }, say: "Nell said anything hot." },
    { village: "millford", title: "Dark loaves", needs: { rye: 4 }, say: "Bram wants the dusk bread." },
    { village: "harbor", title: "Boat basket", needs: { mint: 2, cucumber: 2 }, say: "Salt wants something green." },
    { village: "harbor", title: "Net twine", needs: { flax: 3 }, say: "Sela is mending the week." },
    { village: "meadow", title: "High flock feed", needs: { oats: 5 }, say: "The ridge is loud with sheep." },
    { village: "meadow", title: "Pressed page", needs: { rose: 2 }, say: "Vita's book has an empty leaf." },
  ];

  const NPCS = [
    {
      id: "mabel",
      name: "Mabel",
      role: "the baker",
      village: "willowbrook",
      art: "mabel",
      chat: [
        "The oven's been gossiping about you.",
        "A farm that feeds a village is a kind of hymn.",
        "Flour on the nose is a professional credential.",
      ],
      wants: [
        { item: "wheat", n: 3, pay: 90, say: "Three sheaves for the morning loaves?" },
        { item: "egg", n: 4, pay: 40, say: "Eggs, dear. The custard is waiting." },
        { item: "berry", n: 2, pay: 360, say: "Berries for a tart, if the bushes were kind." },
        { item: "milk", n: 2, pay: 50, say: "A little milk and the rolls will sing." },
      ],
    },
    {
      id: "theo",
      name: "Theo",
      role: "the carpenter",
      village: "willowbrook",
      art: "theo",
      chat: [
        "I measured the porch twice. Still crooked. That's charm.",
        "Good wood listens if you plane it slowly.",
        "Your fence could use a friend. I brought nails just in case.",
      ],
      wants: [
        { item: "potato", n: 4, pay: 80, say: "Lunch for the workshop — four potatoes?" },
        { item: "wool", n: 2, pay: 50, say: "Wool for the winter mittens I keep promising." },
        { item: "pumpkin", n: 1, pay: 480, say: "A pumpkin for the bench-side lantern?" },
        { item: "acorn", n: 3, pay: 30, say: "Acorns. The squirrels and I have a treaty." },
      ],
    },
    {
      id: "iris",
      name: "Iris",
      role: "the herbalist",
      village: "willowbrook",
      art: "iris",
      chat: [
        "The hills are speaking lavender today.",
        "Moonbloom only trusts people who wait.",
        "Tea first. Then we can talk about miracles.",
      ],
      wants: [
        { item: "lavender", n: 2, pay: 320, say: "Two sprigs. The sleepless in town will thank you." },
        { item: "mushroom", n: 3, pay: 420, say: "Mushrooms, gathered or grown — I don't mind." },
        { item: "moon", n: 1, pay: 1400, say: "A single moonbloom, if the dusk was generous." },
        { item: "flower", n: 3, pay: 36, say: "Wildflowers. They remember the path better than we do." },
      ],
    },
    {
      id: "bram",
      name: "Bram",
      role: "the miller",
      village: "millford",
      art: "bram",
      chat: ["The wheel ate another boot. Not mine, this time.", "Grain in, flour out. Same as kindness."],
      wants: [
        { item: "wheat", n: 5, pay: 160, say: "Five sheaves and the mill sings." },
        { item: "rye", n: 4, pay: 150, say: "Rye for the dark loaves." },
        { item: "hops", n: 2, pay: 280, say: "Hops. The evening shift is thirsty." },
      ],
    },
    {
      id: "nell",
      name: "Nell",
      role: "the smith",
      village: "millford",
      art: "nell",
      chat: ["I can fix a hoe or a heart. Hoes are easier.", "Sparks look like fireflies if you squint."],
      wants: [
        { item: "yoke", n: 1, pay: 40, say: "A day's ox labor for the bellows." },
        { item: "wool", n: 3, pay: 70, say: "Wool to pad the hammer-hand." },
      ],
    },
    {
      id: "odo",
      name: "Odo",
      role: "the fisher",
      village: "harbor",
      art: "odo",
      chat: ["The tide keeps its own ledger.", "I brought salt. You brought dirt. Fair trade."],
      wants: [
        { item: "lemon", n: 1, pay: 280, say: "A lemon for the catch." },
        { item: "mint", n: 2, pay: 60, say: "Mint. Anything green that smells like land." },
        { item: "cucumber", n: 2, pay: 90, say: "Cucumbers. The boat gets thirsty." },
      ],
    },
    {
      id: "sela",
      name: "Sela",
      role: "the net-mender",
      village: "harbor",
      art: "sela",
      chat: ["Knots are just patient loops.", "Harbor gossip travels faster than gulls."],
      wants: [
        { item: "flax", n: 3, pay: 240, say: "Flax for new twine." },
        { item: "silk", n: 2, pay: 60, say: "Silk thread for the fancy nets." },
      ],
    },
    {
      id: "rowan",
      name: "Rowan",
      role: "the shepherd",
      village: "meadow",
      art: "rowan",
      chat: ["The wind up here has opinions.", "Count sheep. Then count them again."],
      wants: [
        { item: "oats", n: 4, pay: 140, say: "Oats for the high flock." },
        { item: "fleece", n: 2, pay: 55, say: "Llama fleece to mix with wool." },
      ],
    },
    {
      id: "vita",
      name: "Vita",
      role: "the botanist",
      village: "meadow",
      art: "vita",
      chat: ["Every ridge has a different thyme.", "I came for the sky. I stayed for the dirt."],
      wants: [
        { item: "mint", n: 3, pay: 80, say: "Mint. It has already escaped, hasn't it?" },
        { item: "rose", n: 2, pay: 360, say: "Roses for the pressed book." },
        { item: "moon", n: 1, pay: 1400, say: "Moonbloom, if the dusk was kind." },
      ],
    },
  ];

  const DECOR = [
    { id: "scarecrow", name: "Scarecrow", cost: 180, bonus: "Crops hurry a little.", x: "51%", y: "42%", art: "scarecrow" },
    { id: "lantern", name: "Path lantern", cost: 220, bonus: "One extra forage after dusk.", x: "50%", y: "36%", art: "lantern" },
    { id: "birdbath", name: "Birdbath", cost: 260, bonus: "Birds leave one more wild thing.", x: "78%", y: "38%", art: "birdbath" },
    { id: "bench", name: "Yard bench", cost: 200, bonus: "Sit once a day. Same kindness as a well-wish.", x: "42%", y: "80%", art: "bench" },
  ];

  const SOILS = {
    loam: { id: "loam", name: "Loam", kinds: ["veg", "grain", "fruit", "flower", "herb", "magic"], say: "Kind to almost everything." },
    clay: { id: "clay", name: "Clay", kinds: ["veg", "grain"], say: "Holds water. Roots and grain like it." },
    sand: { id: "sand", name: "Sand", kinds: ["flower", "herb", "fruit"], say: "Drains fast. Flowers and fruit smile." },
    silt: { id: "silt", name: "Silt", kinds: ["veg", "herb", "magic"], say: "Soft and rich. Greens and hush-crops hurry." },
    chalk: { id: "chalk", name: "Chalk", kinds: ["flower", "grain"], say: "Bright and thin. Flowers and grain manage." },
  };
  const SOIL_ORDER = ["loam", "clay", "sand", "silt", "chalk"];

  const PLOT_PRICES = [0, 0, 0, 0, 45, 90, 160, 260, 400, 620, 950, 1400, 2100, 3200, 4800, 7200].map((n) => n * 5);

  const WAGE = {
    plant: 2,
    harvest: 2,
    barn: 2,
    forage: 2,
    cook: 4,
    visit: 4,
    sellTax: 0.1,
    courier: 0.15,
  };

  const PARAGON = [
    { id: "root", name: "Hearth star", blurb: "The first ember. Every other gift grows from this.", cost: 1, max: 1, req: [], branch: "hearth" },
    { id: "look", name: "The cat remembers", blurb: "Animal looks stay with you when the farm folds.", cost: 2, max: 1, req: ["root"], branch: "hearth" },
    { id: "purse", name: "Fuller purse", blurb: "Start each new farm with +200 coins per rank.", cost: 1, max: 5, req: ["root"], branch: "purse" },
    { id: "margin", name: "Honest margin", blurb: "Crew profit leans toward 2% instead of 1%. Still pennies.", cost: 2, max: 4, req: ["purse"], branch: "purse" },
    { id: "crumbs", name: "Kinder crumbs", blurb: "Hand sales lean toward the high end of 1–5%. Still pennies.", cost: 2, max: 3, req: ["purse"], branch: "purse" },
    { id: "stars", name: "Star harvest", blurb: "+15% stars the next time you prestige, per rank.", cost: 3, max: 3, req: ["margin", "crumbs"], branch: "purse" },
    { id: "plots", name: "Open beds", blurb: "Home garden starts with +1 unlocked plot per rank.", cost: 1, max: 4, req: ["root"], branch: "land" },
    { id: "wages", name: "Fairer wages", blurb: "Crew jobs cost 1 less coin per rank (never below 1).", cost: 2, max: 2, req: ["plots"], branch: "land" },
    { id: "crew", name: "Familiar faces", blurb: "Planter and harvester start hired on a new farm.", cost: 3, max: 1, req: ["wages"], branch: "land" },
    { id: "hearts", name: "Known on the lane", blurb: "Neighbors start at one heart. They already know your gate.", cost: 3, max: 1, req: ["crew"], branch: "land" },
    { id: "thumb", name: "Green memory", blurb: "Begin with +1 Green Thumb rank. Crops remember how to hurry.", cost: 2, max: 3, req: ["root"], branch: "green" },
    { id: "seed", name: "Seed ledger", blurb: "Seeds cost 4% less per rank. The tin remembers bulk.", cost: 2, max: 3, req: ["thumb"], branch: "green" },
    { id: "glass", name: "Remembered glass", blurb: "Start with a greenhouse. Any crop, any season.", cost: 4, max: 1, req: ["seed"], branch: "green" },
    { id: "hands", name: "Old calluses", blurb: "Turnip, carrot, and wheat begin at mastery 1 on a new farm.", cost: 2, max: 1, req: ["thumb"], branch: "green" },
    { id: "fair", name: "Fair week", blurb: "Festivals last the whole season, not just the opening two days.", cost: 3, max: 1, req: ["hearts"], branch: "land" },
    { id: "favor", name: "A pocket ribbon", blurb: "Start each farm with 1 almanac favor.", cost: 2, max: 1, req: ["look"], branch: "hearth" },
    { id: "loam", name: "Home loam", blurb: "Home garden is always loam, even after the soil forgets.", cost: 2, max: 1, req: ["plots"], branch: "land" },
    { id: "road", name: "Known cart", blurb: "The peddler visits twice a week instead of once.", cost: 2, max: 1, req: ["favor"], branch: "hearth" },
    { id: "mill", name: "Mill key", blurb: "You already know flour. The windmill treats you like staff.", cost: 2, max: 1, req: ["hands"], branch: "green" },
    { id: "board", name: "Notice nail", blurb: "Filling a village order also grants a ribbon.", cost: 2, max: 1, req: ["road"], branch: "hearth" },
    { id: "judge", name: "Keen eye", blurb: "Harvests lean one grade finer. Prize is easier.", cost: 3, max: 2, req: ["seed"], branch: "green" },
    { id: "rich", name: "Remembered loam", blurb: "Fields start at 85 fertility instead of 70.", cost: 2, max: 1, req: ["loam"], branch: "land" },
    { id: "husbandry", name: "Quiet hands", blurb: "Animals start in a kinder mood on a new farm.", cost: 2, max: 1, req: ["crew"], branch: "land" },
    { id: "palate", name: "Long table", blurb: "A served meal lasts two days instead of one.", cost: 3, max: 1, req: ["mill"], branch: "green" },
  ];

  const PARAGON_BRANCH = {
    hearth: "Hearth",
    purse: "Purse",
    land: "Land",
    green: "Green",
  };

  const PARAGON_STORY = [
    { runs: 1, title: "The soil forgets", text: "You folded a whole year into a single star. The kettle is new. Your hands remember." },
    { runs: 3, title: "A lane of hearths", text: "Three farms, same hill. The neighbors greet you like weather." },
    { runs: 7, title: "Star garden", text: "Iris says some people plant crops. You plant lives." },
  ];

  const MASTERY_STEPS = [0, 10, 40, 120, 360];

  const FESTIVALS = {
    spring: { id: "blossom", name: "Blossom Fair", kinds: ["flower", "herb"], ids: ["peas", "lettuce", "tulip"], say: "Ribbon on the gate. Flowers and herbs hurry." },
    summer: { id: "midsummer", name: "Midsummer Market", kinds: ["fruit", "veg"], ids: [], say: "Stalls in the heat. Fruit and greens are the toast." },
    autumn: { id: "harvest", name: "Harvest Home", kinds: ["grain", "veg"], ids: ["pumpkin", "apple"], say: "Barn doors open. Grain and roots are welcome." },
    winter: { id: "hearth", name: "Hearth Night", kinds: ["herb", "magic"], ids: ["mushroom", "leek", "parsnip"], say: "Everyone is in the kitchen. Roots and hush-crops glow." },
  };

  const WEEK_GOALS = [
    { title: "Twenty honest harvests", kind: "harvest", n: 20, say: "Fill the tin. The week will take care of itself." },
    { title: "Something on the stove", kind: "cook", n: 3, say: "Three recipes. The house should smell like a decision." },
    { title: "Gifts on the lane", kind: "gift", n: 4, say: "Four parcels for neighbors. Hearts remember." },
    { title: "Barn morning", kind: "barn", n: 10, say: "Ten collections from the paddock." },
    { title: "The wild fence", kind: "forage", n: 6, say: "Six wild things. The lane leaves presents." },
    { title: "A mixed tin", kind: "kinds", n: 5, say: "Harvest five different crops this week." },
    { title: "Prize week", kind: "prize", n: 3, say: "Three prize harvests. The soil was listened to." },
    { title: "Full troughs", kind: "feed", n: 6, say: "Feed the pens six times. They remember kindness." },
  ];

  const HEART_PERKS = {
    mabel: { name: "Baker's friend", blurb: "Kitchen wages drop by 1." },
    theo: { name: "Measured gates", blurb: "New plots cost 12% less." },
    iris: { name: "Lane of herbs", blurb: "One extra forage along the fence." },
    bram: { name: "Mill song", blurb: "Grain grows 6% faster." },
    nell: { name: "Soft hammer", blurb: "Animals produce a little sooner." },
    odo: { name: "Tide gifts", blurb: "One extra forage by the water-side." },
    sela: { name: "Patient loops", blurb: "Flax, cotton, and hops grow 6% faster." },
    rowan: { name: "High flock", blurb: "Animals produce a little sooner." },
    vita: { name: "Pressed book", blurb: "Flowers and herbs grow 6% faster." },
  };

  const GRADE_NAME = { 1: "poor", 2: "fair", 3: "fine", 4: "prize" };
  const FEED = {
    chicken: ["oats", "wheat", "barley"],
    quail: ["oats", "wheat"],
    duck: ["oats", "lettuce"],
    goose: ["oats", "wheat"],
    turkey: ["corn", "oats"],
    rabbit: ["carrot", "lettuce", "cabbage"],
    cat: ["milk", "mouse", "fish"],
    pig: ["potato", "carrot", "stew"],
    cow: ["oats", "wheat"],
    ox: ["oats", "wheat"],
    sheep: ["oats", "wheat"],
    llama: ["oats"],
    goat: ["oats", "apple"],
    donkey: ["oats", "carrot"],
    horse: ["oats", "apple", "carrot"],
    peacock: ["corn", "wheat"],
    silkworm: ["mulberry", "lettuce", "flax"],
    bees: ["flower", "lavender", "sunflower"],
  };
  const MEAL_BUFF = {
    stew: { grow: 0.96, say: "A full belly. The beds hurry a little." },
    loaf: { crumbs: 1, say: "Honey on the tongue. Hand sales lean kinder today." },
    tea: { mood: 1, say: "The animals settle when you do." },
    salad: { forage: 1, say: "You notice more along the fence." },
    cider: { grow: 0.95, say: "Warm cider. Roots listen." },
    oatcake: { feed: 1, say: "Breakfast shared. The barn is easier." },
    broth: { fert: 1, say: "The soil feels spoken-to." },
    pie: { grow: 0.93, crumbs: 1, say: "A holiday mood. Everything tries harder." },
    jam: { crumbs: 1, say: "A spoon of summer. Sales smile." },
    dumplings: { grow: 0.97, say: "Soft and steady. The day is kinder." },
    tart: { crumbs: 1, grow: 0.97, say: "The tin wears a crown. So does the farm." },
  };
  const CONTRACTS = [
    { title: "Mabel's festival tin", needs: { wheat: 8, egg: 4 }, say: "A whole morning of rolls for the lane." },
    { title: "Mill week bag", needs: { wheat: 10, rye: 4 }, say: "The wheel will not wait." },
    { title: "Harbor crate", needs: { mint: 4, cucumber: 3 }, say: "The boats leave at dusk." },
    { title: "High flock order", needs: { oats: 8, wool: 3 }, say: "The ridge is loud with sheep." },
    { title: "Iris's night shelf", needs: { lavender: 3, mushroom: 2 }, say: "For the sleepless and the feverish." },
    { title: "Nell's forge supper", needs: { stew: 2, loaf: 1 }, say: "Anything hot. Twice." },
    { title: "Pressed meadow page", needs: { rose: 2, tulip: 2 }, say: "Vita's book has empty leaves." },
    { title: "Sela's twine week", needs: { flax: 5, silk: 2 }, say: "Nets for the next tide." },
  ];

  const STORY = [
    { at: 0, title: "A kettle, a key", text: "Someone left the cottage unlocked and the kettle already warm. The cat has decided you live here." },
    { at: 80, title: "First neighbors", text: "Mabel waved from the lane as if you had always been expected. Theo measured your gate with his eyes." },
    { at: 400, title: "The hill remembers", text: "Iris says this soil has been kind for a hundred springs. You are only the newest pair of hands." },
    { at: 1400, title: "Harvest dusk", text: "The wind smells like pie and woodsmoke. You stop counting coins long enough to watch the thatch go gold." },
    { at: 4500, title: "Moon garden", text: "A flower opens that should not exist, and the cat does not even look surprised." },
  ];

  const LETTERS = {
    spring: [
      "The lane is loud with birds. Plant something small and let the rain finish the sentence.",
      "Mabel folded a recipe into this letter. It is only 'add butter until it feels like Sunday.'",
      "The cat sat on the blotter. I think she meant to send her regards.",
    ],
    summer: [
      "Theo left a note on the well: 'Don't forget to sit down.' The sun agrees.",
      "The mill is humming in the heat. Bram says grain is gossip that became bread.",
      "Bring lemons if you have them. Harbor Hollow is pretending it is a picnic.",
    ],
    autumn: [
      "Mabel is taking pie orders. The hills have started wearing copper.",
      "Acorn treaty is on again. Theo signed for the squirrels.",
      "If the pumpkin is heavy, you did it right. If it is smug, even better.",
    ],
    winter: [
      "Iris hung a sprig of something over your door. She said it was for luck. It smells like patience.",
      "The snow keeps its own ledger. Count harvests, not flakes.",
      "Come by the hearth if the wind gets opinions. We have tea and leftover year.",
    ],
  };

  const ART = {
    plot: "assets/plot.png",
    sprout: "assets/crop-sprout.png",
    turnip: "assets/crop-turnip.png",
    carrot: "assets/crop-carrot.png",
    wheat: "assets/crop-wheat.png",
    berry: "assets/crop-berry.png",
    pumpkin: "assets/crop-pumpkin.png",
    moon: "assets/crop-moon.png",
    potato: "assets/crop-potato.png",
    corn: "assets/crop-corn.png",
    tomato: "assets/crop-tomato.png",
    sunflower: "assets/crop-sunflower.png",
    lavender: "assets/crop-lavender.png",
    mushroom: "assets/crop-mushroom.png",
    chicken: "assets/animal-chicken.png",
    cow: "assets/animal-cow.png",
    bees: "assets/animal-bees.png",
    sheep: "assets/animal-sheep.png",
    duck: "assets/animal-duck.png",
    goat: "assets/animal-goat.png",
    mabel: "assets/npc-mabel.png",
    theo: "assets/npc-theo.png",
    iris: "assets/npc-iris.png",
    scarecrow: "assets/decor-scarecrow.png",
    lantern: "assets/decor-lantern.png",
    stew: "assets/food-stew.png",
    panel: "assets/panel.png",
    cabbage: "assets/crop-cabbage.png",
    apple: "assets/crop-apple.png",
    pig: "assets/animal-pig.png",
    rabbit: "assets/animal-rabbit.png",
    onion: "assets/crop-onion.png",
    beet: "assets/crop-beet.png",
    radish: "assets/crop-radish.png",
    grapes: "assets/crop-grapes.png",
    rose: "assets/crop-rose.png",
    chili: "assets/crop-chili.png",
    cat: "assets/animal-cat.png",
    horse: "assets/animal-horse.png",
    lettuce: "assets/crop-lettuce.png",
    garlic: "assets/crop-garlic.png",
    leek: "assets/crop-leek.png",
    peach: "assets/crop-peach.png",
    lemon: "assets/crop-lemon.png",
    cucumber: "assets/crop-cucumber.png",
    eggplant: "assets/crop-eggplant.png",
    tulip: "assets/crop-tulip.png",
    watermelon: "assets/crop-watermelon.png",
    coffee: "assets/crop-coffee.png",
    goose: "assets/animal-goose.png",
    turkey: "assets/animal-turkey.png",
    llama: "assets/animal-llama.png",
    donkey: "assets/animal-donkey.png",
    peacock: "assets/animal-peacock.png",
    flour: "assets/food-flour.png",
    birdbath: "assets/decor-birdbath.png",
    bench: "assets/decor-bench.png",
    spinach: "assets/crop-spinach.png",
    parsnip: "assets/crop-parsnip.png",
    rye: "assets/crop-rye.png",
    oats: "assets/crop-oats.png",
    hops: "assets/crop-hops.png",
    blueberry: "assets/crop-blueberry.png",
    cherry: "assets/crop-cherry.png",
    melon: "assets/crop-melon.png",
    mint: "assets/crop-mint.png",
    flax: "assets/crop-flax.png",
    cotton: "assets/crop-cotton.png",
    sugarcane: "assets/crop-sugarcane.png",
    ginger: "assets/crop-ginger.png",
    olive: "assets/crop-olive.png",
    ox: "assets/animal-ox.png",
    peas: "assets/crop-peas.png",
    barley: "assets/crop-barley.png",
    rice: "assets/crop-rice.png",
    quail: "assets/animal-quail.png",
    silkworm: "assets/animal-silkworm.png",
    pastry: "assets/food-pastry.png",
    dumplings: "assets/food-dumplings.png",
    tart: "assets/food-tart.png",
    bram: "assets/npc-bram.png",
    nell: "assets/npc-nell.png",
    odo: "assets/npc-odo.png",
    sela: "assets/npc-sela.png",
    rowan: "assets/npc-rowan.png",
    vita: "assets/npc-vita.png",
    jam: "assets/food-jam.png",
    pie: "assets/food-pie.png",
    tea: "assets/food-tea.png",
    loaf: "assets/food-loaf.png",
    cider: "assets/food-cider.png",
    salad: "assets/food-salad.png",
    broth: "assets/food-broth.png",
    oatcake: "assets/food-oatcake.png",
    relish: "assets/food-relish.png",
    rosejam: "assets/food-rosejam.png",
  };
  const keyed = {};
  const LOOK_N = 30;

  function rollLook() {
    return Math.floor(Math.random() * LOOK_N);
  }

  const LOOK_STYLE = ["gouache", "woodcut", "wash", "felt", "glass", "ink", "stitch"];
  function lookWrap(html, look, drawn) {
    look = ((look % LOOK_N) + LOOK_N) % LOOK_N;
    const style = LOOK_STYLE[look % LOOK_STYLE.length];
    return `<span class="look look-${look} style-${style}${drawn ? " drawn" : ""}">${html}</span>`;
  }

  const $ = (id) => document.getElementById(id);
  const cropById = (id) => CROPS.find((c) => c.id === id);
  const animalById = (id) => ANIMALS.find((a) => a.id === id);
  const npcById = (id) => NPCS.find((n) => n.id === id);

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
        if (px[i] < 90 && px[i + 1] > 170 && px[i + 2] > 190) px[i + 3] = 0;
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
        keyed[name] = location.protocol === "file:" ? src : keyCyan(img);
        resolve();
      };
      img.onerror = () => resolve();
      img.src = src;
    });
  }

  function loadArt() {
    const jobs = Object.entries(ART).map(([name, src]) => loadOneArt(name, src));
    Object.keys(ART).forEach((name) => {
      for (let i = 1; i <= 9; i++) {
        jobs.push(loadOneArt(name + "_v" + i, "assets/var/" + name + "-" + i + ".png"));
      }
    });
    return Promise.all(jobs);
  }

  function sprite(id) {
    return keyed[id] ? `<img src="${keyed[id]}" alt="" draggable="false">` : "";
  }

  function plantArt(id, stage, look) {
    look = look == null ? 0 : look;
    if (stage < 0.34 && keyed.sprout) return lookWrap(sprite("sprout"), look, false);
    const crop = cropById(id);
    const art = (crop && crop.art) || id;
    const vkey = art + "_v" + look;
    if (keyed[vkey]) return lookWrap(sprite(vkey), look, true);
    if (keyed[art]) return lookWrap(sprite(art), look, false);
    if (keyed[id]) return lookWrap(sprite(id), look, false);
    return lookWrap(plantSvg(id, stage), look, false);
  }

  function goodArt(id) {
    const look = (id || "").length % LOOK_N;
    if (cropById(id)) return plantArt(id, 1, look);
    const fromAnimal = {
      egg: "chicken", "quail-egg": "chicken", down: "duck", quill: "duck", feather: "chicken",
      pelt: "rabbit", mouse: "cat", truffle: "pig", milk: "cow", yoke: "horse",
      wool: "sheep", fleece: "sheep", cheese: "goat", pack: "goat", manure: "horse",
      plume: "duck", silk: "bees", honey: "bees",
    };
    if (fromAnimal[id]) return animalArt(fromAnimal[id], look);
    if (id === "flower") return plantArt("lavender", 1, look);
    if (id === "acorn") return plantArt("potato", 1, look);
    if (id === "snowdrop") return plantArt("moon", 1, look);
    if (keyed[id] && (GOODS[id] || id === "flour" || id === "pastry" || id === "dumplings" || id === "tart")) {
      return lookWrap(sprite(id), look, false);
    }
    if (id === "moontea") {
      return keyed.tea ? lookWrap(sprite("tea"), look, false) : (keyed.stew ? lookWrap(sprite("stew"), look, false) : plantArt("berry", 1, look));
    }
    if (keyed[id]) return lookWrap(sprite(id), look, false);
    return `<span class="thumb-dot"></span>`;
  }

  function animalArt(id, look) {
    look = look == null ? 0 : look;
    const a = animalById(id);
    const art = (a && a.art) || id;
    const vkey = art + "_v" + look;
    if (keyed[vkey]) return lookWrap(sprite(vkey), look, true);
    if (keyed[art]) return lookWrap(sprite(art), look, false);
    if (keyed[id]) return lookWrap(sprite(id), look, false);
    return lookWrap(animalSvg(id), look, false);
  }

  function parcelMeta(i) {
    if (PARCELS[i]) return PARCELS[i];
    const v = VILLAGES[i % VILLAGES.length].id;
    return { name: "Hearthvale parcel " + (i + 1), village: v };
  }

  function makePlots(unlocked) {
    return Array.from({ length: PLOT_COUNT }, (_, i) => ({
      unlocked: i < unlocked,
      crop: null,
      plantedAt: 0,
      invested: 0,
      look: 0,
      lastCrop: null,
      pest: false,
    }));
  }

  function soilForIndex(index) {
    if (index === 0) return "loam";
    return SOIL_ORDER[index % SOIL_ORDER.length];
  }

  function makeField(index) {
    const meta = parcelMeta(index);
    return {
      name: meta.name,
      village: meta.village,
      soil: soilForIndex(index),
      amends: 0,
      fertility: 70,
      plots: makePlots(index === 0 ? START_UNLOCKED : 4),
    };
  }

  function fieldPrice(owned) {
    return Math.round(160 * COST_SCALE * Math.pow(2.15, Math.max(0, owned - 1)));
  }

  function currentField() {
    if (!state.fields || !state.fields.length) state.fields = [makeField(0)];
    if (state.viewField < 0 || state.viewField >= state.fields.length) state.viewField = 0;
    return state.fields[state.viewField];
  }

  function plots() {
    return currentField().plots;
  }

  function eachPlot(fn) {
    state.fields.forEach((f, fi) => {
      f.plots.forEach((p, pi) => fn(p, pi, f, fi));
    });
  }

  function villageName(id) {
    const v = VILLAGES.find((x) => x.id === id);
    return v ? v.name : id;
  }

  const HOTSPOTS = [
    { id: "house", left: "58%", top: "14%", width: "10%", height: "16%", freq: 294,
      lines: ["The little house is a long walk up the lane.", "Smoke from a far chimney. The kettle is still on.", "From here the cottage looks like a sugar lump."] },
    { id: "well", left: "37%", top: "66%", width: "6%", height: "12%", freq: 220,
      lines: ["The well tastes like rain and old coins.", "Something plinks far below. Probably a wish.", "Cool water. The tomatoes would write a thank-you."] },
    { id: "cat", left: "38%", top: "64%", width: "5%", height: "8%", freq: 392,
      lines: ["Mrrp. That is the entire review.", "The cat has scheduled a nap on the well.", "She blinks slowly. You have been approved."] },
    { id: "windmill", left: "70%", top: "15%", width: "8%", height: "16%", freq: 196,
      lines: ["The mill turns like a slow song.", "Bram would say the wind is on the payroll.", "Four arms, one job, no complaints."] },
  ];

  const ANIMAL_TALK = {
    chicken: ["She is already planning an egg.", "Bok. That meant yes."],
    quail: ["A very small bird with a very large agenda."],
    duck: ["The puddle is her office."],
    goose: ["Honk. You are behind on paperwork."],
    turkey: ["He struts as if the field is a parade."],
    rabbit: ["Nose twitch. That was a full conversation."],
    cat: ["She already claimed the well. This is a courtesy visit."],
    pig: ["The snout has found a rumor of truffles."],
    cow: ["She chews. Time passes correctly."],
    ox: ["A nod. The field is heard."],
    sheep: ["A cloud with legs, billing you in wool."],
    llama: ["Judged. Softly. Then fleece."],
    goat: ["The fence is a suggestion."],
    donkey: ["He will carry it. After a think."],
    horse: ["A huff of gold air."],
    peacock: ["Beauty has a rent. He collected."],
    silkworm: ["A quiet factory, currently on lunch."],
    bees: ["The hive sounds like a tiny market."],
  };

  function farmSay(text, x, y, freq) {
    const el = $("say");
    if (!el) return;
    el.textContent = text;
    el.classList.remove("hidden");
    tone(freq || 330, 0.11, "triangle", 0.035);
    clearTimeout(farmSay._t);
    farmSay._t = setTimeout(() => el.classList.add("hidden"), 3200);
  }

  function renderHotspots() {
    const box = $("hotspots");
    if (!box) return;
    box.innerHTML = "";
    HOTSPOTS.forEach((h) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "hot" + (h.id === "windmill" ? " mill-hot" : h.id === "well" ? " well-hot" : "");
      b.style.left = h.left;
      b.style.top = h.top;
      b.style.width = h.width;
      b.style.height = h.height;
      b.title = h.id;
      b.setAttribute("aria-label", h.id);
      b.addEventListener("click", (e) => {
        e.stopPropagation();
        if (h.id === "house") {
          setDesk(true);
          setTab("crew");
        }
        if (h.id === "well" && state.wishDay !== farmDay() && spend(1)) {
          state.wishDay = farmDay();
          toast("A coin for the well. Crops listen a little closer today.");
          save();
        }
        if (h.id === "windmill") millOnce(false);
        if (h.id === "cat" && state.catDay !== farmDay()) {
          state.catDay = farmDay();
          addPantry("mouse", 1, itemBasis("mouse"));
          toast("A courtesy mouse. She expects no thanks.");
          renderPantry();
          save();
        }
        const line = h.lines[Math.floor(Math.random() * h.lines.length)];
        const r = b.getBoundingClientRect();
        const wr = $("world").getBoundingClientRect();
        farmSay(line, r.left - wr.left + r.width / 2, r.top - wr.top, h.freq);
      });
      box.appendChild(b);
    });
  }

  const PEN_SLOTS = {
    chicken:  { left: 3.2,  top: 32.6, w: 3.7, h: 8.4 },
    quail:    { left: 11.4, top: 33.0, w: 3.5, h: 7.8 },
    duck:     { left: 19.6, top: 32.8, w: 3.9, h: 8.4 },
    goose:    { left: 28.4, top: 33.0, w: 3.9, h: 8.4 },
    turkey:   { left: 37.0, top: 32.6, w: 3.7, h: 8.2 },
    rabbit:   { left: 45.4, top: 33.2, w: 3.5, h: 7.8 },
    cat:      { left: 3.8,  top: 52.2, w: 3.5, h: 7.9 },
    pig:      { left: 12.2, top: 53.0, w: 3.9, h: 8.3 },
    cow:      { left: 21.0, top: 52.4, w: 4.0, h: 8.5 },
    ox:       { left: 30.0, top: 52.8, w: 4.0, h: 8.4 },
    sheep:    { left: 38.8, top: 53.0, w: 3.7, h: 8.1 },
    llama:    { left: 47.0, top: 53.4, w: 3.6, h: 8.0 },
    goat:     { left: 3.0,  top: 73.4, w: 3.8, h: 9.0 },
    donkey:   { left: 11.8, top: 73.2, w: 3.9, h: 9.1 },
    horse:    { left: 20.8, top: 72.8, w: 4.2, h: 9.4 },
    peacock:  { left: 30.0, top: 73.4, w: 3.8, h: 8.7 },
    silkworm: { left: 38.4, top: 73.8, w: 3.6, h: 8.2 },
    bees:     { left: 46.6, top: 73.4, w: 3.5, h: 8.4 },
  };

  const YARD_ART = [
    { kind: "tree", left: 7.2, top: 22.5, w: 5.2, h: 12.0 },
    { kind: "tree", left: 41.0, top: 23.0, w: 4.6, h: 11.0 },
    { kind: "flowers", left: 15.2, top: 41.5, w: 4.0, h: 5.5 },
    { kind: "flowers", left: 33.4, top: 42.0, w: 4.2, h: 5.6 },
    { kind: "hay", left: 6.4, top: 42.8, w: 4.4, h: 6.2 },
    { kind: "barrel", left: 24.6, top: 42.4, w: 3.2, h: 6.4 },
    { kind: "trough", left: 16.0, top: 62.4, w: 5.6, h: 4.8 },
    { kind: "crate", left: 34.8, top: 62.8, w: 3.8, h: 5.4 },
    { kind: "bucket", left: 26.2, top: 63.2, w: 2.6, h: 4.4 },
    { kind: "flowers", left: 8.6, top: 63.0, w: 3.6, h: 5.0 },
    { kind: "hay", left: 42.4, top: 62.2, w: 4.2, h: 6.0 },
    { kind: "wheel", left: 1.6, top: 60.8, w: 4.0, h: 7.2 },
  ];

  function penRect(id) {
    return PEN_SLOTS[id] || { left: 2, top: 40, w: 7, h: 12 };
  }

  function renderYard() {
    const box = $("paddock");
    if (!box) return;
    box.innerHTML = "";
    YARD_ART.forEach((art) => {
      const el = document.createElement("span");
      el.className = "yard-art art-" + art.kind;
      el.style.left = art.left + "%";
      el.style.top = art.top + "%";
      el.style.width = art.w + "%";
      el.style.height = art.h + "%";
      el.setAttribute("aria-hidden", "true");
      box.appendChild(el);
    });
    ANIMALS.forEach((a, i) => {
      const n = state.animals[a.id] || 0;
      const mood = animalMood(a.id);
      const b = document.createElement("button");
      b.type = "button";
      const slot = penRect(a.id);
      b.className = "stall yard-pet in-pen pen-" + a.id + " pet-" + a.id + (n < 1 ? " empty-pen" : "");
      b.style.left = slot.left + "%";
      b.style.top = slot.top + "%";
      b.style.width = slot.w + "%";
      b.style.height = slot.h + "%";
      b.dataset.animal = a.id;
      b.title = n < 1
        ? a.name + " — empty stall"
        : a.name + " × " + n + " · " + "♥".repeat(Math.max(1, mood)) + (isFed(a.id) ? " · fed" : " · hungry");
      const frame = `<span class="pen-frame" aria-hidden="true"></span>`;
      if (n >= 1) {
        if (state.animalLook[a.id] == null) state.animalLook[a.id] = rollLook();
        b.innerHTML = frame + animalArt(a.id, state.animalLook[a.id]) + (n > 1 ? `<span class="pen-n">×${n}</span>` : "") + `<span class="pen-name">${a.name}${mood ? " " + "♥".repeat(mood) : ""}</span>`;
      } else {
        b.innerHTML = frame + `<span class="pen-name">${a.name}</span>`;
      }
      b.addEventListener("click", (e) => {
        e.stopPropagation();
        if (n < 1) {
          setDesk(true);
          setTab("garden");
          toast("The " + a.name.toLowerCase() + " stall is empty. Buy one in Desk → Garden.");
          return;
        }
        if (feedAnimal(a.id)) return;
        if (!state.pets) state.pets = {};
        if (state.pets[a.id] !== farmDay()) {
          state.pets[a.id] = farmDay();
          toast(a.name + " leans in. They'll work a little sooner today.");
          save();
        }
        const lines = ANIMAL_TALK[a.id] || ["A soft noise. Friendship, probably."];
        const line = lines[Math.floor(Math.random() * lines.length)];
        farmSay(line, 0, 0, 349);
      });
      box.appendChild(b);
    });
  }

  function ownedVillages() {
    const set = {};
    state.fields.forEach((f) => { set[f.village] = true; });
    return VILLAGES.filter((v) => set[v.id]);
  }

  function defaultState() {
    const now = Date.now();
    const animals = {};
    const bins = {};
    const lastAnimal = {};
    ANIMALS.forEach((a) => {
      animals[a.id] = 0;
      bins[a.id] = 0;
      lastAnimal[a.id] = now;
    });
    return {
      coins: START_COINS,
      grindScale: SEED_SCALE,
      lifetime: 0,
      harvested: 0,
      fields: [makeField(0)],
      viewField: 0,
      selected: "turnip",
      seedCat: "all",
      viewVillage: "willowbrook",
      autoCrops: ["turnip"],
      autoAnimals: [],
      autoRecipes: [],
      autoNpcs: [],
      plantCursor: 0,
      animalLook: {},
      animals,
      bins,
      lastAnimal,
      pantry: {},
      pantryCost: {},
      upgrades: { thumb: 0, market: 0, farmhand: false, planter: false, greenhouse: false, cottage: 0, barnMax: 0, compost: 0, roads: false, nightMarket: false },
      decor: { scarecrow: false, lantern: false },
      hearts: { mabel: 0, theo: 0, iris: 0 },
      quests: {},
      discovered: { turnip: true },
      stories: [0],
      mail: { day: 0, unread: true, body: LETTERS.spring[0] },
      lastYear: 1,
      wishDay: 0,
      pets: {},
      peddlerDay: 0,
      watered: {},
      cooked: {},
      ordersDone: {},
      catDay: 0,
      forage: [],
      weather: "sunny",
      lastFarmDay: 1,
      muted: false,
      musicOn: true,
      musicVol: 0.4,
      track: "chores",
      seenWelcome: false,
      lastTick: now,
      startedAt: now,
      auto: { plant: false, harvest: false, barn: false, sell: false, forage: false, deliver: false, cook: false },
      books: { wages: 0, tax: 0, jobs: 0 },
      paragon: defaultParagon(),
      mastery: {},
      almanac: { week: 0, goal: 0, progress: 0, done: false, favors: 0, seen: {} },
      festDone: "",
      festWins: [],
      pantryGrade: {},
      care: {},
      notes: {},
      meal: null,
      contract: null,
    };
  }

  function defaultParagon() {
    return {
      stars: 0,
      spent: 0,
      nodes: {},
      runs: 0,
      bestDay: 1,
      bestLife: 0,
      bestHarvest: 0,
      history: [],
    };
  }

  let state = defaultState();
  let audioCtx = null;
  let amb = null;
  let shopTimer = 0;

  function farmDay() {
    return 1 + Math.floor((Date.now() - state.startedAt) / DAY_MS);
  }
  function seasonId() {
    return SEASONS[Math.floor((farmDay() - 1) / 7) % 4];
  }
  function inSeason(crop) {
    return crop && crop.seasons.indexOf(seasonId()) >= 0;
  }
  function canPlant(crop) {
    if (!crop || state.lifetime < crop.unlock) return false;
    return inSeason(crop) || state.upgrades.greenhouse;
  }
  function growTime(crop, plot, field) {
    if (!crop) return 2000;
    let t = crop.grow * Math.pow(0.88, state.upgrades.thumb);
    if (inSeason(crop)) t *= 0.9;
    if (state.weather === "rain") t *= 0.82;
    if (state.weather === "snow" && !state.upgrades.greenhouse) t *= 1.12;
    if (state.decor.scarecrow) t *= 0.97;
    if (state.upgrades.compost) t *= Math.pow(0.94, state.upgrades.compost);
    t *= Math.pow(0.99, Math.min(8, (state.paragon && state.paragon.runs) || 0));
    t *= Math.pow(0.96, masteryRank(crop.id));
    if (festBoost(crop)) t *= 0.88;
    if (crop.kind === daySpecialty()) t *= 0.94;
    if (state.wishDay === farmDay()) t *= 0.97;
    field = field || currentField();
    if (soilMatch(crop, field)) t *= 0.92;
    if (plot && plot.lastCrop && plot.lastCrop !== crop.id) t *= 0.95;
    const fi = field && state.fields ? state.fields.indexOf(field) : state.viewField;
    if (state.watered && state.watered[String(fi)] === farmDay()) t *= 0.93;
    if (heartPerk("bram") && crop.kind === "grain") t *= 0.94;
    if (heartPerk("vita") && (crop.kind === "flower" || crop.kind === "herb")) t *= 0.94;
    if (heartPerk("sela") && (crop.id === "flax" || crop.id === "cotton" || crop.id === "hops")) t *= 0.94;
    const fert = fieldFertility(field);
    t *= 1 + (50 - fert) * 0.004;
    if (plot && plot.pest) t *= 1.28;
    t *= mealGrow();
    return Math.max(1100, Math.round(t));
  }
  function seedCost(crop) {
    if (!crop) return 1;
    let n = crop.cost * SEED_SCALE;
    n *= Math.pow(0.96, nodeRank("seed"));
    n *= Math.pow(0.96, Math.max(0, masteryRank(crop.id) - 1));
    return Math.max(1, Math.round(n));
  }

  function itemBasis(id) {
    const crop = cropById(id);
    if (crop) return seedCost(crop);
    const rec = RECIPES.find((r) => r.id === id);
    if (rec) {
      return Object.keys(rec.needs).reduce((sum, k) => sum + itemBasis(k) * rec.needs[k], 0);
    }
    return Math.max(1, (GOODS[id] ? GOODS[id].sell : 1) * SEED_SCALE);
  }

  function grindRate(auto, basis, grade) {
    basis = Math.max(0, Number(basis) || 0);
    if (auto) {
      const lean = nodeRank("margin") >= 1 || ((state.books.jobs + state.harvested + farmDay() + Math.floor(basis)) % 2) === 1;
      return lean ? 0.02 : 0.01;
    }
    const g = grade == null ? 2 : Math.max(1, Math.min(4, Math.round(grade)));
    let r = 0.01 * g;
    if (g >= 4) r = 0.05;
    if (nodeRank("crumbs") >= 1) r = Math.min(0.05, r + 0.01);
    if (nodeRank("crumbs") >= 3) r = 0.05;
    if (mealHas("crumbs")) r = Math.min(0.05, r + 0.01);
    r += 0.001 * (state.upgrades.market || 0);
    return Math.min(0.05, Math.max(0.01, r));
  }

  function grindProfit(basis, auto, grade) {
    basis = Math.max(0, Math.round(Number(basis) || 0));
    if (basis <= 0) return 0;
    const rate = grindRate(auto, basis, grade);
    let profit = Math.floor(basis * rate);
    if (auto) {
      const floor1 = Math.floor(basis * 0.01);
      const cap2 = Math.floor(basis * 0.02);
      profit = Math.max(floor1, Math.min(cap2 > 0 ? cap2 : 1, profit));
      if (profit < 1 && basis >= 50) profit = 1;
      if (cap2 > 0) profit = Math.min(profit, cap2);
    } else {
      const floor1 = Math.floor(basis * 0.01);
      const cap5 = Math.floor(basis * 0.05);
      profit = Math.max(floor1, profit);
      if (profit < 1 && basis >= 20) profit = 1;
      if (cap5 > 0) profit = Math.min(profit, cap5);
    }
    return profit;
  }

  function grindPayout(basis, auto, grade) {
    basis = Math.max(0, Math.round(Number(basis) || 0));
    if (basis <= 0) return 0;
    return basis + grindProfit(basis, auto, grade);
  }

  function grindPct(basis, auto, grade) {
    const extra = grindProfit(basis, auto, grade);
    if (!basis || extra <= 0) return 0;
    return Math.max(1, Math.round((extra / basis) * 100));
  }

  function sellValue(id, auto) {
    return grindPayout(itemBasis(id), !!auto);
  }
  function nextPlotIndex() {
    return plots().findIndex((p) => !p.unlocked);
  }
  function plotPriceAt(i) {
    let p = PLOT_PRICES[i];
    if (p == null) return null;
    if (p <= 0) return 0;
    if (heartPerk("theo")) p = Math.max(1, Math.round(p * 0.88));
    return p;
  }
  function nextPlotPrice() {
    const i = nextPlotIndex();
    return i < 0 ? null : plotPriceAt(i);
  }
  function thumbCost() {
    return Math.round(100 * COST_SCALE * Math.pow(2.15, state.upgrades.thumb));
  }
  function marketCost() {
    return Math.round(150 * COST_SCALE * Math.pow(2.35, state.upgrades.market));
  }
  function animalCost(a) {
    return Math.round(a.cost * COST_SCALE);
  }
  function decorCost(d) {
    return Math.round(d.cost * COST_SCALE);
  }
  function pantryCount(id) {
    return state.pantry[id] || 0;
  }
  function pantryUnitCost(id) {
    const have = pantryCount(id);
    if (have <= 0) return itemBasis(id);
    const bag = state.pantryCost || {};
    return (bag[id] != null ? bag[id] : itemBasis(id) * have) / have;
  }
  function addPantry(id, n, spent, grade) {
    n = n || 1;
    if (!state.pantryCost) state.pantryCost = {};
    if (!state.pantryGrade) state.pantryGrade = {};
    const add = spent != null ? spent : n * itemBasis(id);
    const g = grade == null ? 2 : grade;
    state.pantry[id] = pantryCount(id) + n;
    state.pantryCost[id] = (state.pantryCost[id] || 0) + add;
    state.pantryGrade[id] = (state.pantryGrade[id] || 0) + g * n;
    state.discovered[id] = true;
  }
  function takePantry(id, n) {
    if (pantryCount(id) < n) return false;
    if (!state.pantryCost) state.pantryCost = {};
    if (!state.pantryGrade) state.pantryGrade = {};
    const unit = pantryUnitCost(id);
    const g = pantryGradeOf(id);
    state.pantry[id] -= n;
    state.pantryCost[id] = (state.pantryCost[id] || 0) - unit * n;
    state.pantryGrade[id] = (state.pantryGrade[id] || 0) - g * n;
    if (state.pantry[id] <= 0) {
      delete state.pantry[id];
      delete state.pantryCost[id];
      delete state.pantryGrade[id];
    }
    return true;
  }
  function pantrySpendOf(id, n) {
    return pantryUnitCost(id) * n;
  }
  function itemName(id) {
    const c = cropById(id);
    if (c) return c.name;
    if (GOODS[id]) return GOODS[id].name;
    return id;
  }

  function slotKey(id) {
    return SAVE_PREFIX + id;
  }

  function readIndex() {
    try {
      const raw = localStorage.getItem(PROFILE_INDEX);
      if (raw) {
        const idx = JSON.parse(raw);
        if (idx && Array.isArray(idx.slots) && idx.slots.length) return idx;
      }
    } catch (e) {}
    return null;
  }

  function writeIndex(idx) {
    localStorage.setItem(PROFILE_INDEX, JSON.stringify(idx));
  }

  function ensureIndex() {
    let idx = readIndex();
    if (idx) return idx;
    const id = "p-home";
    idx = { active: id, slots: [{ id, name: "Home farm", updated: Date.now(), coins: START_COINS, day: 1 }] };
    const legacy = localStorage.getItem(SAVE_KEY) || localStorage.getItem(OLD_KEY);
    if (legacy) localStorage.setItem(slotKey(id), legacy);
    writeIndex(idx);
    return idx;
  }

  function hydrate(saved) {
    const base = defaultState();
    if (!saved || typeof saved !== "object") {
      state = base;
      return;
    }
    state = {
      ...base,
      ...saved,
      upgrades: { ...base.upgrades, ...(saved.upgrades || {}) },
      decor: { ...base.decor, ...(saved.decor || {}) },
      hearts: { ...base.hearts, ...(saved.hearts || {}) },
      pantry: saved.pantry || {},
      pantryCost: saved.pantryCost || {},
      animals: { ...base.animals, ...(saved.animals || {}) },
      bins: { ...base.bins, ...(saved.bins || {}) },
      lastAnimal: { ...base.lastAnimal, ...(saved.lastAnimal || {}) },
      discovered: { ...base.discovered, ...(saved.discovered || {}) },
      auto: { ...base.auto, ...(saved.auto || {}) },
      books: { ...base.books, ...(saved.books || {}) },
      paragon: {
        ...base.paragon,
        ...(saved.paragon || {}),
        nodes: { ...base.paragon.nodes, ...((saved.paragon && saved.paragon.nodes) || {}) },
        history: (saved.paragon && saved.paragon.history) || [],
      },
      autoCrops: saved.autoCrops || base.autoCrops,
      autoAnimals: saved.autoAnimals || [],
      autoRecipes: saved.autoRecipes || [],
      autoNpcs: saved.autoNpcs || [],
      animalLook: saved.animalLook || {},
      mastery: { ...base.mastery, ...(saved.mastery || {}) },
      almanac: {
        ...base.almanac,
        ...(saved.almanac || {}),
        seen: { ...((saved.almanac && saved.almanac.seen) || {}) },
      },
      festWins: saved.festWins || [],
    };
    if (saved.plots && !saved.fields) {
      state.fields = [{ name: "Home garden", village: "willowbrook", plots: saved.plots }];
      state.viewField = 0;
    }
    if (!Array.isArray(state.fields) || !state.fields.length) state.fields = base.fields;
    ANIMALS.forEach((a) => {
      if (state.animals[a.id] == null) state.animals[a.id] = 0;
      if (state.bins[a.id] == null) state.bins[a.id] = 0;
      if (state.lastAnimal[a.id] == null) state.lastAnimal[a.id] = Date.now();
    });
    NPCS.forEach((n) => {
      if (state.hearts[n.id] == null) state.hearts[n.id] = 0;
    });
    if (!state.pantryCost) state.pantryCost = {};
    ensureParagon();
    Object.keys(state.pantry).forEach((id) => {
      if (state.pantryCost[id] == null) state.pantryCost[id] = pantryCount(id) * itemBasis(id);
    });
    if (Array.isArray(state.fields)) {
      eachPlot((plot) => {
        if (plot.crop && !plot.invested) {
          const c = cropById(plot.crop);
          plot.invested = c ? seedCost(c) : 0;
        }
      });
    }
    if (!state.mastery) state.mastery = {};
    if (!state.pets) state.pets = {};
    if (!state.watered) state.watered = {};
    if (!state.cooked) state.cooked = {};
    if (!state.ordersDone) state.ordersDone = {};
    if (!state.pantryGrade) state.pantryGrade = {};
    if (!state.care) state.care = {};
    if (!state.notes) state.notes = {};
    if (state.musicOn == null) state.musicOn = true;
    if (state.musicVol == null) state.musicVol = 0.4;
    const old = { barn: "reel", hayride: "chores", cider: "porch", rain: "fair" };
    if (old[state.track]) state.track = old[state.track];
    if (!state.track || !TRACKS[state.track]) state.track = "chores";
    if (Array.isArray(state.fields)) {
      state.fields.forEach((f) => {
        if (f.fertility == null) f.fertility = 70;
        (f.plots || []).forEach((p) => { if (p.pest == null) p.pest = false; });
      });
    }
    if (Array.isArray(state.forage) && state.forage.length) {
      const layout = [
        { x: "50%", y: "40%" },
        { x: "88%", y: "36%" },
        { x: "48%", y: "88%" },
        { x: "52%", y: "32%" },
        { x: "18%", y: "26%" },
        { x: "92%", y: "72%" },
        { x: "80%", y: "42%" },
      ];
      state.forage.forEach((spot, i) => {
        const p = layout[i % layout.length];
        spot.x = p.x;
        spot.y = p.y;
      });
    }
    if (Array.isArray(state.fields)) {
      state.fields.forEach((f, i) => {
        if (!f.soil) f.soil = soilForIndex(i);
        if (f.amends == null) f.amends = 0;
        (f.plots || []).forEach((p) => {
          if (p.lastCrop == null) p.lastCrop = null;
        });
      });
    }
    ensureAlmanac();
    if ((state.grindScale || 10) !== SEED_SCALE) {
      const mul = SEED_SCALE / (state.grindScale || 10);
      state.coins = Math.round((state.coins || 0) * mul);
      state.lifetime = Math.round((state.lifetime || 0) * mul);
      if (state.pantryCost) {
        Object.keys(state.pantryCost).forEach((k) => {
          state.pantryCost[k] = Math.round((state.pantryCost[k] || 0) * mul);
        });
      }
      if (Array.isArray(state.fields)) {
        eachPlot((plot) => {
          if (plot.invested) plot.invested = Math.round(plot.invested * mul);
        });
      }
      state.grindScale = SEED_SCALE;
    }
  }

  function load() {
    try {
      const idx = ensureIndex();
      let raw = localStorage.getItem(slotKey(idx.active));
      if (!raw) raw = localStorage.getItem(SAVE_KEY) || localStorage.getItem(OLD_KEY);
      if (!raw) {
        state = defaultState();
        return;
      }
      hydrate(JSON.parse(raw));
    } catch (e) {
      state = defaultState();
    }
  }

  function save() {
    try {
      state.lastTick = Date.now();
      const idx = ensureIndex();
      const blob = JSON.stringify(state);
      localStorage.setItem(slotKey(idx.active), blob);
      localStorage.setItem(SAVE_KEY, blob);
      const slot = idx.slots.find((s) => s.id === idx.active);
      if (slot) {
        slot.updated = Date.now();
        slot.coins = Math.floor(state.coins);
        slot.day = farmDay();
        slot.stars = unspentStars();
        slot.runs = (state.paragon && state.paragon.runs) || 0;
      }
      writeIndex(idx);
    } catch (e) {
      toast("Save failed — this browser may be out of room.");
    }
  }

  function refreshAll() {
    buildField();
    renderFieldBar();
    renderSeeds();
    renderBarn();
    renderShop();
    renderCrew();
    renderPantry();
    renderRecipes();
    renderVillage();
    renderDecorShop();
    renderDecor();
    renderHotspots();
    renderYard();
    renderForage();
    renderWeather();
    renderProfiles();
    renderDebug();
    renderParagon();
    renderJournal();
    paintAll();
  }

  function activeSlot() {
    const idx = ensureIndex();
    return idx.slots.find((s) => s.id === idx.active) || idx.slots[0];
  }

  function switchProfile(id) {
    const idx = ensureIndex();
    if (id === idx.active) return;
    save();
    idx.active = id;
    writeIndex(idx);
    const raw = localStorage.getItem(slotKey(id));
    hydrate(raw ? JSON.parse(raw) : defaultState());
    applyOffline();
    if (!state.forage.length) rollForage();
    refreshAll();
    save();
    toast("Now playing " + (activeSlot().name || "a farm") + ".");
  }

  function createProfile(name) {
    save();
    const idx = ensureIndex();
    const id = "p" + Date.now().toString(36);
    const label = (name || "").trim() || "Farm " + (idx.slots.length + 1);
    idx.slots.push({ id, name: label, updated: Date.now(), coins: START_COINS, day: 1 });
    idx.active = id;
    writeIndex(idx);
    state = defaultState();
    state.seenWelcome = true;
    localStorage.setItem(slotKey(id), JSON.stringify(state));
    refreshAll();
    save();
    toast(label + " is a fresh field.");
  }

  function renameProfile(id, name) {
    const idx = ensureIndex();
    const slot = idx.slots.find((s) => s.id === id);
    if (!slot) return;
    slot.name = (name || "").trim() || slot.name;
    writeIndex(idx);
    renderProfiles();
  }

  function deleteProfile(id) {
    const idx = ensureIndex();
    if (idx.slots.length <= 1) {
      toast("Keep at least one farm.");
      return;
    }
    idx.slots = idx.slots.filter((s) => s.id !== id);
    localStorage.removeItem(slotKey(id));
    if (idx.active === id) idx.active = idx.slots[0].id;
    writeIndex(idx);
    const raw = localStorage.getItem(slotKey(idx.active));
    hydrate(raw ? JSON.parse(raw) : defaultState());
    refreshAll();
    toast("That farm was cleared from this computer.");
  }

  function resetActiveFarm() {
    const name = (activeSlot() && activeSlot().name) || "This farm";
    state = defaultState();
    refreshAll();
    save();
    showModal("A clean slate", name + " starts again. The kettle is new. The soil forgets.\nStars, the paragon tree, and crop mastery were wiped with it.\nOther local farms were left alone.", "Begin again");
  }

  function ensureParagon() {
    if (!state.paragon || typeof state.paragon !== "object") state.paragon = defaultParagon();
    const p = state.paragon;
    if (!p.nodes || typeof p.nodes !== "object") p.nodes = {};
    if (!Array.isArray(p.history)) p.history = [];
    if (p.stars == null) p.stars = 0;
    if (p.spent == null) p.spent = 0;
    if (p.runs == null) p.runs = 0;
    if (p.bestDay == null) p.bestDay = 1;
    if (p.bestLife == null) p.bestLife = 0;
    if (p.bestHarvest == null) p.bestHarvest = 0;
    return p;
  }

  function nodeDef(id) {
    return PARAGON.find((n) => n.id === id);
  }

  function nodeRank(id) {
    if (!state || !state.paragon || !state.paragon.nodes) return 0;
    return Math.max(0, state.paragon.nodes[id] || 0);
  }

  function hasNode(id) {
    return nodeRank(id) > 0;
  }

  function unspentStars() {
    const p = ensureParagon();
    return Math.max(0, (p.stars || 0) - (p.spent || 0));
  }

  function nodeUnlocked(id) {
    const n = nodeDef(id);
    if (!n) return false;
    return n.req.every((r) => hasNode(r));
  }

  function nodeCost(id) {
    const n = nodeDef(id);
    if (!n) return null;
    const rank = nodeRank(id);
    if (rank >= n.max) return null;
    return n.cost;
  }

  function wageNow(kind) {
    const n = WAGE[kind];
    if (n == null) return 0;
    if (kind === "sellTax" || kind === "courier") return n;
    let w = Math.max(1, n - nodeRank("wages"));
    if (kind === "cook" && heartPerk("mabel")) w = Math.max(1, w - 1);
    return w;
  }

  function heartPerk(id) {
    return (state.hearts && (state.hearts[id] || 0) >= 5);
  }

  function masteryCount(id) {
    return (state.mastery && state.mastery[id]) || 0;
  }

  function masteryRank(id) {
    const n = masteryCount(id);
    let r = 0;
    for (let i = 1; i < MASTERY_STEPS.length; i++) if (n >= MASTERY_STEPS[i]) r = i;
    return r;
  }

  function noteMastery(id, n) {
    if (!id) return;
    if (!state.mastery) state.mastery = {};
    const before = masteryRank(id);
    state.mastery[id] = masteryCount(id) + (n || 1);
    const after = masteryRank(id);
    if (after > before) {
      const crop = cropById(id);
      toast((crop ? crop.name : itemName(id)) + " feels familiar now. Mastery " + after + ".");
    }
  }

  function farmYear() {
    return 1 + Math.floor((farmDay() - 1) / 28);
  }

  function daySpecialty() {
    const kinds = ["veg", "grain", "fruit", "flower", "herb"];
    return kinds[(farmDay() + 2) % kinds.length];
  }

  function fieldSoil(field) {
    const id = (field && field.soil) || "loam";
    return SOILS[id] || SOILS.loam;
  }

  function soilMatch(crop, field) {
    if (!crop) return false;
    const s = fieldSoil(field);
    return s.kinds.indexOf(crop.kind) >= 0;
  }

  function preferredSoil(crop) {
    if (!crop) return "loam";
    if (crop.kind === "grain") return "clay";
    if (crop.kind === "fruit") return "sand";
    if (crop.kind === "flower") return "chalk";
    if (crop.kind === "herb" || crop.kind === "magic") return "silt";
    return "loam";
  }

  function amendCost(field) {
    return Math.round(70 * COST_SCALE * Math.pow(1.8, (field && field.amends) || 0));
  }

  function peddlerVisits() {
    const d = dayInSeason();
    if (hasNode("road")) return d === 2 || d === 5;
    return d === 3;
  }

  function peddlerCrop() {
    const open = CROPS.filter((c) => state.lifetime >= c.unlock);
    if (!open.length) return cropById("turnip");
    const stall = open.filter((c) => c.kind === daySpecialty());
    const pool = stall.length ? stall : open;
    return pool[farmDay() % pool.length];
  }

  function weekIndex() {
    return Math.floor((farmDay() - 1) / 7);
  }

  function villageOrder(villageId) {
    const list = ORDERS.filter((o) => o.village === villageId);
    if (!list.length) return null;
    return list[weekIndex() % list.length];
  }

  function orderKey(villageId) {
    return villageId + "-" + weekIndex();
  }

  function orderReady(order) {
    return order && Object.keys(order.needs).every((id) => pantryCount(id) >= order.needs[id]);
  }

  function fillOrder(villageId) {
    const order = villageOrder(villageId);
    const key = orderKey(villageId);
    if (!order || (state.ordersDone && state.ordersDone[key])) {
      toast("That notice is already taken care of.");
      return;
    }
    if (!orderReady(order)) {
      toast("The basket is still light.");
      return;
    }
    let spent = 0;
    Object.keys(order.needs).forEach((id) => {
      spent += pantrySpendOf(id, order.needs[id]);
      takePantry(id, order.needs[id]);
    });
    if (!state.ordersDone) state.ordersDone = {};
    state.ordersDone[key] = true;
    const keep = grindPayout(spent, false);
    addCoins(keep);
    if (hasNode("board")) {
      ensureAlmanac();
      state.almanac.favors = (state.almanac.favors || 0) + 1;
    }
    toast(order.title + " is filled. Back " + fmt(keep) + " · +" + fmt(keep - spent) + " pennies (" + grindPct(spent, false) + "%).");
    renderPantry();
    renderVillage();
    save();
  }

  function cookRank(id) {
    const n = (state.cooked && state.cooked[id]) || 0;
    if (n >= 20) return 2;
    if (n >= 6) return 1;
    return 0;
  }

  function noteCook(id) {
    if (!state.cooked) state.cooked = {};
    const before = cookRank(id);
    state.cooked[id] = (state.cooked[id] || 0) + 1;
    if (cookRank(id) > before) toast(itemName(id) + " has become a house habit. The kitchen wage drops for it.");
  }

  function recipeWage(rec) {
    return Math.max(1, wageNow("cook") - cookRank(rec.id));
  }

  function millOnce(silent) {
    const id = GRAINS.find((g) => pantryCount(g) >= 2);
    if (!id) {
      if (!silent) toast("The mill wants 2 grain (wheat, rye, oats, barley, or rice).");
      return false;
    }
    const spent = pantrySpendOf(id, 2);
    takePantry(id, 2);
    addPantry("flour", 1, spent);
    if (!silent) toast("The mill turned. " + itemName(id) + " became flour.");
    renderPantry();
    renderRecipes();
    save();
    return true;
  }

  function waterCurrentField() {
    if (!state.watered) state.watered = {};
    const i = String(state.viewField);
    if (state.watered[i] === farmDay()) {
      toast("This soil is already wet.");
      return;
    }
    state.watered[i] = farmDay();
    toast("You watered " + currentField().name + ". Beds here hurry until morning.");
    paintAll();
    save();
  }

  function pickLetter() {
    const pack = LETTERS[seasonId()] || LETTERS.spring;
    const list = Array.isArray(pack) ? pack : [pack];
    return list[Math.abs(farmDay() * 13) % list.length];
  }

  function showBoot(err) {
    const el = $("boot-err");
    const msg = err && err.message ? err.message : String(err || "unknown");
    if (el) {
      el.classList.remove("hidden");
      el.textContent = "The farm stumbled: " + msg;
    }
    try { console.error(err); } catch (e) {}
  }

  function exportFarm() {
    try {
      save();
      const slot = activeSlot() || {};
      const blob = JSON.stringify({ v: 2, name: slot.name || "farm", savedAt: Date.now(), state: state }, null, 2);
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([blob], { type: "application/json" }));
      a.download = "idle-cozy-farmer-" + (slot.name || "farm").replace(/\s+/g, "-").toLowerCase() + ".json";
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      toast("A copy of this farm is in your downloads.");
    } catch (e) {
      toast("Could not write the farm file.");
    }
  }

  function importFarm(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onerror = () => toast("That file would not open.");
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result || ""));
        const saved = data && data.state ? data.state : data;
        if (!saved || typeof saved !== "object") throw new Error("empty");
        hydrate(saved);
        applyOffline();
        if (!state.forage.length) rollForage();
        refreshAll();
        save();
        toast("Loaded " + ((data && data.name) || "a farm") + " onto this profile.");
      } catch (e) {
        toast("That was not a farm save.");
      }
    };
    reader.readAsText(file);
  }

  function dayInSeason() {
    return (farmDay() - 1) % 7;
  }

  function festivalNow() {
    const f = FESTIVALS[seasonId()];
    if (!f) return null;
    if (hasNode("fair") || dayInSeason() <= 1) return f;
    return null;
  }

  function festKey() {
    return seasonId() + "-" + (farmYear() - 1);
  }

  function festBoost(crop) {
    const f = festivalNow();
    if (!f || !crop) return false;
    if (f.kinds && f.kinds.indexOf(crop.kind) >= 0) return true;
    return !!(f.ids && f.ids.indexOf(crop.id) >= 0);
  }

  function festivalWant() {
    const f = festivalNow();
    if (!f) return null;
    const pool = CROPS.filter((c) => festBoost(c) && (state.lifetime >= c.unlock));
    if (!pool.length) return { item: "turnip", n: 3 };
    const crop = pool[farmDay() % pool.length];
    return { item: crop.id, n: 3 };
  }

  function ensureAlmanac() {
    if (!state.almanac || typeof state.almanac !== "object") {
      state.almanac = { week: 0, goal: 0, progress: 0, done: false, favors: 0, seen: {} };
    }
    if (!state.almanac.seen) state.almanac.seen = {};
    if (state.almanac.favors == null) state.almanac.favors = 0;
    const w = Math.floor((farmDay() - 1) / 7);
    if (state.almanac.week !== w) {
      state.almanac.week = w;
      state.almanac.goal = w % WEEK_GOALS.length;
      state.almanac.progress = 0;
      state.almanac.done = false;
      state.almanac.seen = {};
    }
    return state.almanac;
  }

  function currentGoal() {
    ensureAlmanac();
    return WEEK_GOALS[state.almanac.goal] || WEEK_GOALS[0];
  }

  function bumpAlmanac(kind, n, extra) {
    const a = ensureAlmanac();
    const g = currentGoal();
    if (!g || a.done) return;
    if (g.kind === "kinds") {
      if (kind !== "harvest" || !extra) return;
      a.seen[extra] = true;
      a.progress = Object.keys(a.seen).length;
    } else if (g.kind === kind) {
      a.progress += n || 1;
    } else {
      return;
    }
    if (a.progress >= g.n && !a.done) {
      a.done = true;
      a.favors = (a.favors || 0) + 1;
      toast("Almanac: " + g.title + " is done. A ribbon for the book.");
    }
  }

  function spendFavor(what) {
    const a = ensureAlmanac();
    const cost = what === "master" ? 2 : 1;
    if ((a.favors || 0) < cost) {
      toast("The almanac has no ribbons left for that.");
      return;
    }
    if (what === "forage") {
      a.favors -= cost;
      rollForage();
      renderForage();
      toast("The fence grew wild again.");
    } else if (what === "master") {
      const crop = cropById(state.selected);
      if (!crop) {
        toast("Pick a seed in the tin first.");
        return;
      }
      a.favors -= cost;
      noteMastery(crop.id, 10);
      renderSeeds();
    }
    renderAlmanacBits();
    save();
  }

  function renderAlmanacBits() {
    const journalTab = $("tab-journal");
    if ($("journal") && journalTab && !journalTab.classList.contains("hidden")) renderJournal();
    const villageTab = $("tab-village");
    if ($("village") && villageTab && !villageTab.classList.contains("hidden")) renderVillage();
  }

  function animalInterval(a) {
    let t = a.interval;
    if (heartPerk("rowan") || heartPerk("nell")) t *= 0.92;
    if (state.pets && state.pets[a.id] === farmDay()) t *= 0.9;
    const mood = animalMood(a.id);
    t *= Math.pow(0.92, mood);
    if (mealHas("feed")) t *= 0.94;
    return Math.max(3600, Math.round(t));
  }

  function ensureCare(id) {
    if (!state.care) state.care = {};
    if (!state.care[id]) state.care[id] = { mood: hasNode("husbandry") ? 1 : 0, fedDay: 0 };
    return state.care[id];
  }

  function isFed(id) {
    const c = state.care && state.care[id];
    return !!(c && c.fedDay === farmDay());
  }

  function animalMood(id) {
    const c = ensureCare(id);
    let m = c.mood || 0;
    if (state.pets && state.pets[id] === farmDay()) m += 1;
    if (c.fedDay === farmDay()) m += 1;
    if (mealHas("mood")) m += 1;
    return Math.max(0, Math.min(3, m));
  }

  function feedFood(id) {
    const list = FEED[id] || ["oats", "wheat"];
    return list.find((f) => pantryCount(f) > 0) || null;
  }

  function feedAnimal(id) {
    if (isFed(id) && !mealHas("feed")) {
      return false;
    }
    if (isFed(id)) return false;
    const food = feedFood(id);
    if (!food) {
      toast((animalById(id) || { name: "They" }).name + " wants " + (FEED[id] || ["oats"]).map(itemName).join(" or ") + ".");
      return true;
    }
    const spent = pantrySpendOf(food, 1);
    if (!takePantry(food, 1)) return false;
    const c = ensureCare(id);
    c.fedDay = farmDay();
    c.mood = Math.min(3, (c.mood || 0) + 1);
    bumpAlmanac("feed", 1);
    critterAct(id, "eating", itemName(food));
    toast((animalById(id) || { name: "They" }).name + " ate " + itemName(food) + ". Mood " + "♥".repeat(animalMood(id)) + ".");
    renderYard();
    renderBarn();
    renderPantry();
    save();
    return true;
  }

  function mealHas(key) {
    const m = state.meal;
    if (!m || !m.id) return false;
    const last = hasNode("palate") ? 1 : 0;
    if (farmDay() > (m.day || 0) + last) return false;
    const buff = MEAL_BUFF[m.id];
    return !!(buff && buff[key]);
  }

  function mealGrow() {
    const m = state.meal;
    if (!m || !mealHas("grow") && !(m.id && MEAL_BUFF[m.id] && MEAL_BUFF[m.id].grow)) return 1;
    if (farmDay() > (m.day || 0) + (hasNode("palate") ? 1 : 0)) return 1;
    const buff = MEAL_BUFF[m.id];
    return (buff && buff.grow) || 1;
  }

  function serveMeal(id) {
    const rec = RECIPES.find((r) => r.id === id);
    if (!rec || !MEAL_BUFF[id]) {
      toast("That is food for the pantry, not the table.");
      return;
    }
    if (pantryCount(id) < 1) {
      toast("Cook it first.");
      return;
    }
    const spent = pantrySpendOf(id, 1);
    if (!takePantry(id, 1)) return;
    state.meal = { id, day: farmDay(), spent };
    toast(MEAL_BUFF[id].say);
    renderRecipes();
    renderPantry();
    save();
  }

  function fieldFertility(field) {
    field = field || currentField();
    if (!field) return 70;
    if (field.fertility == null) field.fertility = hasNode("rich") ? 85 : 70;
    return Math.max(0, Math.min(100, field.fertility));
  }

  function spendFertility(field, n) {
    field.fertility = Math.max(0, fieldFertility(field) - n);
  }

  function addFertility(field, n) {
    field.fertility = Math.min(100, fieldFertility(field) + n);
  }

  function harvestGrade(crop, plot, field) {
    let q = 2;
    field = field || currentField();
    if (soilMatch(crop, field)) q += 1;
    const fi = field && state.fields ? state.fields.indexOf(field) : state.viewField;
    if (state.watered && state.watered[String(fi)] === farmDay()) q += 1;
    if (!inSeason(crop) && !state.upgrades.greenhouse) q -= 1;
    if (state.weather === "snow" && !state.upgrades.greenhouse) q -= 1;
    if (state.weather === "rain" && soilMatch(crop, field)) q += 1;
    if (plot && plot.lastCrop && plot.lastCrop !== crop.id) q += 1;
    if (plot && plot.lastCrop && plot.lastCrop === crop.id) q -= 1;
    const fert = fieldFertility(field);
    if (fert < 28) q -= 1;
    if (fert >= 80) q += 1;
    if (plot && plot.pest) q -= 2;
    if (masteryRank(crop.id) >= 2) q += 1;
    if (mealHas("grow") || mealHas("crumbs")) q += 1;
    q += nodeRank("judge");
    if (festBoost(crop)) q += 1;
    return Math.max(1, Math.min(4, q));
  }

  function pantryGradeOf(id) {
    const n = pantryCount(id);
    if (n <= 0) return 2;
    const g = state.pantryGrade && state.pantryGrade[id];
    if (g == null) return 2;
    return Math.max(1, Math.min(4, Math.round(g / n)));
  }

  function weekContract() {
    return CONTRACTS[weekIndex() % CONTRACTS.length];
  }

  function ensureContract() {
    const key = weekIndex();
    if (!state.contract || state.contract.week !== key) {
      const c = weekContract();
      state.contract = { week: key, title: c.title, needs: c.needs, say: c.say, done: false };
    }
    return state.contract;
  }

  function gainHeart(npcId) {
    const before = state.hearts[npcId] || 0;
    state.hearts[npcId] = Math.min(5, before + 1);
    if (before < 5 && state.hearts[npcId] >= 5 && HEART_PERKS[npcId]) {
      const p = HEART_PERKS[npcId];
      toast((npcById(npcId) || { name: npcId }).name + " — " + p.name + ". " + p.blurb);
    }
  }

  function prestigeBreakdown() {
    const life = state.lifetime || 0;
    const day = farmDay();
    const harvests = state.harvested || 0;
    const fromLife = Math.floor(Math.sqrt(life / 1250));
    const fromDay = Math.floor(day / 7);
    const fromCut = Math.floor(harvests / 40);
    const fromLand = Math.max(0, ((state.fields && state.fields.length) || 1) - 1);
    const raw = fromLife + fromDay + fromCut + fromLand;
    const bonus = Math.floor(raw * 0.15 * nodeRank("stars"));
    return { fromLife, fromDay, fromCut, fromLand, bonus, total: raw + bonus, day, life, harvests };
  }

  function prestigeGain() {
    return prestigeBreakdown().total;
  }

  function canPrestige() {
    return prestigeGain() >= 1 && (farmDay() >= 7 || state.lifetime >= 3000);
  }

  function applyParagonStart() {
    ensureParagon();
    state.coins += 200 * nodeRank("purse");
    if (hasNode("rich") && state.fields) {
      state.fields.forEach((f) => { if ((f.fertility || 0) < 85) f.fertility = 85; });
    }
    if (hasNode("husbandry")) {
      ANIMALS.forEach((a) => { ensureCare(a.id).mood = Math.max(ensureCare(a.id).mood || 0, 1); });
    }
    const extra = nodeRank("plots");
    if (state.fields && state.fields[0]) {
      state.fields[0].plots.forEach((p, i) => {
        if (i < START_UNLOCKED + extra) p.unlocked = true;
      });
    }
    applyParagonLive();
  }

  function applyParagonLive() {
    ensureParagon();
    if (nodeRank("thumb") > (state.upgrades.thumb || 0)) {
      state.upgrades.thumb = Math.max(state.upgrades.thumb || 0, nodeRank("thumb"));
    }
    if (hasNode("glass")) state.upgrades.greenhouse = true;
    if (hasNode("crew")) {
      state.auto.plant = true;
      state.auto.harvest = true;
    }
    if (hasNode("hearts")) {
      NPCS.forEach((n) => {
        state.hearts[n.id] = Math.max(state.hearts[n.id] || 0, 1);
      });
    }
    if (hasNode("hands")) {
      if (!state.mastery) state.mastery = {};
      ["turnip", "carrot", "wheat"].forEach((id) => {
        if (masteryCount(id) < 10) state.mastery[id] = 10;
      });
    }
    if (hasNode("favor")) {
      ensureAlmanac();
      state.almanac.favors = (state.almanac.favors || 0) + 1;
    }
    if (hasNode("loam") && state.fields && state.fields[0]) state.fields[0].soil = "loam";
    if (hasNode("mill")) state.discovered.flour = true;
  }

  function beginKeptRun(paragon, looks, mastery, favors) {
    state = defaultState();
    state.paragon = paragon;
    state.animalLook = looks || {};
    state.mastery = mastery || {};
    state.almanac.favors = favors || 0;
    state.seenWelcome = true;
    applyParagonStart();
    if (!state.forage.length) rollForage();
    state.weather = weatherForDay(farmDay());
    refreshAll();
    save();
  }

  function doPrestige() {
    if (!canPrestige()) {
      toast("This farm is still too young to fold into a star. Last a week, or earn 3,000 coins.");
      return;
    }
    const gain = prestigeGain();
    const keep = JSON.parse(JSON.stringify(ensureParagon()));
    keep.stars = (keep.stars || 0) + gain;
    keep.runs = (keep.runs || 0) + 1;
    keep.bestDay = Math.max(keep.bestDay || 1, farmDay());
    keep.bestLife = Math.max(keep.bestLife || 0, state.lifetime);
    keep.bestHarvest = Math.max(keep.bestHarvest || 0, state.harvested);
    keep.history = (keep.history || []).concat([{
      run: keep.runs,
      day: farmDay(),
      life: state.lifetime,
      harvests: state.harvested,
      stars: gain,
      at: Date.now(),
    }]).slice(-12);
    const looks = hasNode("look") ? { ...(state.animalLook || {}) } : {};
    const mastery = JSON.parse(JSON.stringify(state.mastery || {}));
    const favors = (state.almanac && state.almanac.favors) || 0;
    beginKeptRun(keep, looks, mastery, favors);
    showModal(
      "A new hearth",
      `The old farm folded into ${gain} star${gain === 1 ? "" : "s"}.\nThis is run ${keep.runs}. The soil forgets. The stars and your hands remember.\nUnspent stars: ${unspentStars()}.`,
      "Begin again"
    );
  }

  function restartRun() {
    const keep = JSON.parse(JSON.stringify(ensureParagon()));
    const looks = hasNode("look") ? { ...(state.animalLook || {}) } : {};
    const mastery = JSON.parse(JSON.stringify(state.mastery || {}));
    const favors = (state.almanac && state.almanac.favors) || 0;
    beginKeptRun(keep, looks, mastery, favors);
    showModal(
      "Same stars, new soil",
      "The farm starts over. Your paragon tree and unspent stars stayed. You did not earn stars this time.",
      "Begin again"
    );
  }

  function renderProfiles() {
    const box = $("profiles");
    if (!box) return;
    const idx = ensureIndex();
    box.innerHTML = "";
    idx.slots.forEach((slot) => {
      const row = document.createElement("div");
      row.className = "profile-row" + (slot.id === idx.active ? " on" : "");
      const when = slot.updated ? new Date(slot.updated).toLocaleString() : "new";
      row.innerHTML = `<div><strong></strong><span></span></div>
        <button type="button" class="once-btn">${slot.id === idx.active ? "playing" : "play"}</button>
        <button type="button" class="once-btn">forget</button>`;
      row.querySelector("strong").textContent = slot.name;
      row.querySelector("span").textContent = `${fmt(slot.coins || 0)} coins · day ${slot.day || 1}${slot.runs ? " · run " + slot.runs : ""}${slot.stars ? " · ★" + slot.stars : ""} · ${when}`;
      const buttons = row.querySelectorAll("button");
      buttons[0].disabled = slot.id === idx.active;
      buttons[0].addEventListener("click", () => switchProfile(slot.id));
      buttons[1].addEventListener("click", () => {
        if (confirm("Forget " + slot.name + "? This cannot be undone.")) deleteProfile(slot.id);
      });
      row.querySelector("strong").addEventListener("dblclick", () => {
        const next = prompt("Rename this farm", slot.name);
        if (next != null) renameProfile(slot.id, next);
      });
      box.appendChild(row);
    });
  }

  function renderDebug() {
    const box = $("debug");
    if (!box) return;
    const tools = [
      { label: "+100 coins", run: () => addCoins(100, null, true) },
      { label: "+1,000 coins", run: () => addCoins(1000, null, true) },
      { label: "Unlock catalog", run: () => { state.lifetime = Math.max(state.lifetime, 99999); renderSeeds(); } },
      { label: "Skip a farm day", run: () => { state.startedAt -= DAY_MS; refreshDay(); paintAll(); } },
      { label: "Ripen this field", run: () => {
        plots().forEach((p) => { if (p.crop) p.plantedAt = 0; });
        plots().forEach((_, i) => paintPlot(i));
      } },
      { label: "+5 stars", run: () => { ensureParagon().stars += 5; renderParagon(); paintAll(); save(); } },
      { label: "+1 ribbon", run: () => { ensureAlmanac().favors += 1; renderAlmanacBits(); } },
      { label: "Dump save", run: () => {
        const blob = JSON.stringify(state, null, 2);
        showModal("Save dump", blob.slice(0, 1800) + (blob.length > 1800 ? "\n…" : ""), "Close");
      } },
    ];
    box.innerHTML = "";
    tools.forEach((t) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = t.label;
      b.addEventListener("click", () => { t.run(); save(); refreshAll(); });
      box.appendChild(b);
    });
  }

  function addCoins(n, el, silent) {
    if (n <= 0) return;
    state.coins += n;
    state.lifetime += n;
    $("coins").textContent = fmt(state.coins);
    $("coin-pill").classList.remove("flash");
    void $("coin-pill").offsetWidth;
    $("coin-pill").classList.add("flash");
    if (el) puff(el, `+${fmt(n)}`);
    if (!silent) tone(523.25, 0.07, "triangle", 0.03);
    unlockStories();
    queueShop();
  }

  function spend(n) {
    if (state.coins < n) {
      $("coin-pill").classList.remove("flash");
      void $("coin-pill").offsetWidth;
      $("coin-pill").classList.add("flash");
      tone(180, 0.1, "sawtooth", 0.02);
      return false;
    }
    state.coins -= n;
    $("coins").textContent = fmt(state.coins);
    queueShop();
    return true;
  }

  function payBooks(n, kind) {
    n = Math.max(0, Math.floor(n));
    if (n <= 0) return true;
    if (state.coins < n) return false;
    state.coins -= n;
    if (kind === "tax") state.books.tax += n;
    else state.books.wages += n;
    state.books.jobs += 1;
    $("coins").textContent = fmt(state.coins);
    if ($("wage-num")) $("wage-num").textContent = fmt(state.books.wages + state.books.tax);
    return true;
  }

  function unpaid(job) {
    if (unpaid._t && Date.now() - unpaid._t < 2200) return;
    unpaid._t = Date.now();
    toast("The " + job + " won't work without pay. That's a wage: money for someone else's time.");
  }

  function rotationCrops() {
    const ids = state.autoCrops && state.autoCrops.length ? state.autoCrops : [state.selected];
    const list = ids.map(cropById).filter((c) => c && canPlant(c));
    if (list.length) return list;
    return CROPS.filter((c) => canPlant(c));
  }

  function crewCrop() {
    const list = rotationCrops();
    if (!list.length) return null;
    const c = list[state.plantCursor % list.length];
    state.plantCursor = (state.plantCursor || 0) + 1;
    return c;
  }

  const workQ = [];
  let handBusy = false;
  let handEl = null;

  function worldPct(el) {
    if (!el || !$("world")) return { x: 72, y: 68 };
    const wr = $("world").getBoundingClientRect();
    const r = el.getBoundingClientRect();
    if (!r.width) return { x: 72, y: 68 };
    return {
      x: ((r.left + r.width / 2 - wr.left) / wr.width) * 100,
      y: ((r.top + r.height * 0.55 - wr.top) / wr.height) * 100,
    };
  }

  function farmerHtml(kind) {
    const art = { plant: "theo", harvest: "sela", barn: "rowan", forage: "iris", cook: "mabel", sell: "bram", you: "theo" }[kind];
    if (art && keyed[art]) return sprite(art);
    return `<span class="farmer-body" data-job="${kind || "you"}"><span class="farmer-hat"></span><span class="farmer-head"></span><span class="farmer-torso"></span></span>`;
  }

  function ensureHand() {
    const box = $("hands");
    if (!box) return null;
    if (!handEl || !handEl.parentNode) {
      handEl = document.createElement("div");
      handEl.className = "hand";
      handEl.innerHTML = farmerHtml("you");
      handEl.style.left = "62%";
      handEl.style.top = "22%";
      box.appendChild(handEl);
    }
    return handEl;
  }

  function enqueueWork(kind, x, y, fn, say) {
    if (workQ.length > 14) {
      try { if (fn) fn(); } catch (e) {}
      return;
    }
    workQ.push({ kind, x, y, fn, say });
  }

  function tickHands() {
    if (handBusy || !workQ.length) return;
    const job = workQ.shift();
    const el = ensureHand();
    if (!el) {
      try { if (job.fn) job.fn(); } catch (e) {}
      return;
    }
    handBusy = true;
    el.className = "hand going hand-" + (job.kind || "you");
    el.innerHTML = farmerHtml(job.kind);
    el.style.left = job.x + "%";
    el.style.top = job.y + "%";
    setTimeout(() => {
      el.classList.add("work");
      try { if (job.fn) job.fn(); } catch (e) {}
      if (job.say) puff(el, job.say);
      setTimeout(() => {
        el.classList.remove("work");
        handBusy = false;
      }, 420);
    }, 520);
  }

  function plotWorkFx(el, kind) {
    if (!el) return;
    el.classList.add("worked", "worked-" + (kind || "hoe"));
    setTimeout(() => el.classList.remove("worked", "worked-hoe", "worked-pick"), 560);
  }

  function critterAct(id, cls, label) {
    const stall = document.querySelector('.stall[data-animal="' + id + '"]');
    if (!stall) return;
    stall.classList.add(cls);
    if (label) puff(stall, label);
    setTimeout(() => stall.classList.remove(cls), 700);
  }

  function plantOne(plot, i, f, fi, crop, wage) {
    if (!spend(seedCost(crop))) return false;
    if (wage) payBooks(wage, "wage");
    plot.crop = crop.id;
    plot.plantedAt = Date.now();
    plot.invested = seedCost(crop) + (wage || 0);
    plot.look = rollLook();
    plot.pest = false;
    spendFertility(f, 6);
    if (fi === state.viewField) {
      paintPlot(i);
      const el = $("field") && $("field").children[i];
      if (el) plotWorkFx(el, "hoe");
    }
    return true;
  }

  function jobPlant(all) {
    let n = 0;
    let lastName = "";
    const wage = wageNow("plant");
    let queued = false;
    eachPlot((plot, i, f, fi) => {
      if (plot._busy) return;
      if (!plot.unlocked || plot.crop) return;
      const crop = crewCrop();
      if (!crop) return;
      if (state.coins < seedCost(crop) + wage) {
        if (n === 0) unpaid("planter");
        return;
      }
      lastName = crop.name;
      if (fi === state.viewField && (!queued || all)) {
        plot._busy = true;
        const el = $("field") && $("field").children[i];
        const pos = worldPct(el);
        enqueueWork("plant", pos.x, pos.y, () => {
          plot._busy = false;
          plantOne(plot, i, f, fi, crop, wage);
          renderSeeds();
        }, crop.name);
        queued = true;
        n += 1;
      } else if (fi !== state.viewField) {
        if (plantOne(plot, i, f, fi, crop, wage)) n += 1;
      }
    });
    if (n) {
      setLesson(`Planter is in the beds` + (lastName ? ` (last: ${lastName})` : "") + `. Watch them work. Wage ${wage} a plot.`);
      renderSeeds();
    }
    return n;
  }

  function jobHarvest(all) {
    let n = 0;
    const wage = wageNow("harvest");
    let queued = false;
    eachPlot((plot, i, f, fi) => {
      if (plot._busy) return;
      if (!plot.unlocked || !plot.crop) return;
      const crop = cropById(plot.crop);
      if (Date.now() - plot.plantedAt < growTime(crop, plot, f)) return;
      if (state.coins < wage) {
        if (n === 0) unpaid("harvester");
        return;
      }
      if (fi === state.viewField && (!queued || all)) {
        plot._busy = true;
        const el = $("field") && $("field").children[i];
        const pos = worldPct(el);
        enqueueWork("harvest", pos.x, pos.y, () => {
          plot._busy = false;
          if (!payBooks(wage, "wage")) return;
          harvestAt(plot, i, fi, true, el, wage);
          if (el) plotWorkFx(el, "pick");
        }, crop.name);
        queued = true;
        n += 1;
      } else if (fi !== state.viewField) {
        if (!payBooks(wage, "wage")) {
          unpaid("harvester");
          return;
        }
        harvestAt(plot, i, fi, true, null, wage);
        n += 1;
      }
    });
    if (n) setLesson(`Harvester is picking. Watch the beds. Wage ${wage} a plot.`);
    return n;
  }

  function jobBarn() {
    let n = 0;
    const wage = wageNow("barn");
    let queued = false;
    ANIMALS.forEach((a) => {
      if (state.autoAnimals.length && state.autoAnimals.indexOf(a.id) < 0) return;
      if ((state.bins[a.id] || 0) <= 0) return;
      if (state.coins < wage) {
        if (n === 0) unpaid("barn hand");
        return;
      }
      if (!queued) {
        const stall = document.querySelector('.stall[data-animal="' + a.id + '"]');
        const pos = worldPct(stall);
        enqueueWork("barn", pos.x, pos.y, () => {
          if (!payBooks(wage, "wage")) return;
          collectAnimal(a.id, false, wage);
          critterAct(a.id, "eating", a.produceName);
        }, a.produceName);
        queued = true;
        n += 1;
      }
    });
    if (n) setLesson(`Barn hand is in the stalls. Watch them collect. Wage ${wage}.`);
    return n;
  }

  function jobForage() {
    let n = 0;
    if (!state.forage.length) return 0;
    const wage = wageNow("forage");
    let queued = false;
    state.forage.forEach((spot) => {
      if (spot.taken) return;
      if (state.coins < wage) {
        if (n === 0) unpaid("forager");
        return;
      }
      if (!queued) {
        const btn = document.querySelector(".forage-spot");
        const pos = worldPct(btn) || { x: 50, y: 40 };
        enqueueWork("forage", pos.x, pos.y, () => {
          if (spot.taken) return;
          if (!payBooks(wage, "wage")) return;
          spot.taken = true;
          addPantry(spot.id, 1, itemBasis(spot.id) + wage);
          bumpAlmanac("forage", 1);
          renderForage();
          renderPantry();
        }, itemName(spot.id));
        queued = true;
        n += 1;
      }
    });
    if (n) setLesson(`Forager is along the lane. Wage ${wage}.`);
    return n;
  }

  function emptyPantryBasis() {
    let basis = 0;
    let pts = 0;
    let nAll = 0;
    Object.keys(state.pantry).forEach((id) => {
      const n = pantryCount(id);
      if (n <= 0) return;
      basis += state.pantryCost && state.pantryCost[id] != null ? state.pantryCost[id] : n * itemBasis(id);
      pts += pantryGradeOf(id) * n;
      nAll += n;
      delete state.pantry[id];
      if (state.pantryCost) delete state.pantryCost[id];
      if (state.pantryGrade) delete state.pantryGrade[id];
    });
    state._lastGrade = nAll ? Math.round(pts / nAll) : 2;
    return Math.round(basis);
  }

  function jobSell() {
    const basis = emptyPantryBasis();
    if (!basis) return 0;
    const keep = grindPayout(basis, true, state._lastGrade);
    const profit = keep - basis;
    const pct = grindPct(basis, true);
    addCoins(keep, null, true);
    state.books.jobs += 1;
    renderPantry();
    renderVillage();
    setLesson(`You paid ${fmt(basis)} in seeds and wages. Crew sale returns that plus ${fmt(profit)} (${pct}%). Hired hands keep a 1–2% grind. Never more.`);
    toast(`Paid ${fmt(basis)} · back ${fmt(keep)} · +${fmt(profit)} (${pct}% pennies)`);
    return keep;
  }

  function jobCook() {
    const pool = RECIPES.filter((rec) => !state.autoRecipes.length || state.autoRecipes.indexOf(rec.id) >= 0);
    const r = pool.find((rec) => state.upgrades.cottage >= rec.cottage && Object.keys(rec.needs).every((id) => pantryCount(id) >= rec.needs[id]));
    if (!r) return 0;
    const wage = recipeWage(r);
    if (!payBooks(wage, "wage")) {
      unpaid("cook");
      return 0;
    }
    let spent = wage;
    Object.keys(r.needs).forEach((id) => {
      spent += pantrySpendOf(id, r.needs[id]);
      takePantry(id, r.needs[id]);
    });
    addPantry(r.id, 1, spent);
    noteCook(r.id);
    bumpAlmanac("cook", 1);
    renderPantry();
    renderRecipes();
    setLesson(`Cook made ${r.name}. Kitchen wage ${wage}. ${r.say}`);
    return 1;
  }

  function jobDeliver() {
    let n = 0;
    NPCS.forEach((npc) => {
      if (state.autoNpcs.length && state.autoNpcs.indexOf(npc.id) < 0) return;
      if (state.quests[npc.id] === farmDay()) return;
      const want = npc.wants[farmDay() % npc.wants.length];
      if (pantryCount(want.item) < want.n) return;
      const basis = pantrySpendOf(want.item, want.n);
      takePantry(want.item, want.n);
      state.quests[npc.id] = farmDay();
      gainHeart(npc.id);
      bumpAlmanac("gift", 1);
      addCoins(grindPayout(basis, true), null, true);
      n += 1;
    });
    if (n) {
      renderPantry();
      renderVillage();
      setLesson(`Courier finished ${n} errand${n > 1 ? "s" : ""}. The thank-you is a 1–2% crew grind.`);
    }
    return n;
  }

  function runFarmOnce() {
    const visit = wageNow("visit");
    if (!payBooks(visit, "wage")) {
      unpaid("crew");
      return;
    }
    const h = jobHarvest(true);
    const b = jobBarn();
    const f = jobForage();
    const p = jobPlant(true);
    const did = h + b + f + p;
    toast(did ? `Crew pass: pick ${h}, barn ${b}, forage ${f}, plant ${p}. Visit wage ${visit}.` : `Crew looked around. Visit wage ${visit} anyway — you still hired the hour.`);
    save();
  }

  let lastCrew = 0;
  function tickCrew() {
    const any = Object.keys(state.auto).some((k) => state.auto[k]);
    if (!any) return;
    const now = Date.now();
    if (now - lastCrew < Math.max(600, 900 - Math.min(280, (state.books.jobs || 0)))) return;
    lastCrew = now;
    if (state.auto.harvest) jobHarvest();
    if (state.auto.barn) jobBarn();
    if (state.auto.forage) jobForage();
    if (state.auto.deliver) jobDeliver();
    if (state.auto.cook) jobCook();
    if (state.auto.sell) jobSell();
    if (state.auto.plant) jobPlant();
  }

  function setLesson(text) {
    const el = $("crew-lesson");
    if (el) el.textContent = text;
  }

  function renderCrew() {
    const box = $("crew");
    if (!box) return;
    const jobs = [
      { key: "plant", title: "Planter", body: `Fills empty plots with your selected seed. Wage ${wageNow("plant")} per plot, plus the seed.`, once: "Plant now" },
      { key: "harvest", title: "Harvester", body: `Picks every ripe crop. Wage ${wageNow("harvest")} per plot.`, once: "Pick now" },
      { key: "barn", title: "Barn hand", body: `Collects eggs, milk, honey, and the rest. Wage ${wageNow("barn")} per kind.`, once: "Collect" },
      { key: "forage", title: "Forager", body: `Picks wild things along the fence. Wage ${wageNow("forage")} each.`, once: "Gather" },
      { key: "sell", title: "Market clerk", body: "Sells the pantry. Crew keeps a 1–2% grind on what you paid. Hand sales are 1–5% pennies.", once: "Sell" },
      { key: "cook", title: "Cook", body: `Makes one recipe you can afford. Kitchen wage ${wageNow("cook")}.`, once: "Cook" },
      { key: "deliver", title: "Courier", body: "Delivers neighbor gifts for a 1–2% crew grind. Hand gifts are 1–5% pennies.", once: "Deliver" },
    ];
    const run = {
      plant: jobPlant,
      harvest: jobHarvest,
      barn: jobBarn,
      forage: jobForage,
      sell: jobSell,
      cook: jobCook,
      deliver: jobDeliver,
    };
    box.innerHTML = "";
    const picks = document.createElement("div");
    picks.className = "pickers";
    picks.innerHTML = `
      <label>Planter grows
        <select id="pick-crops" multiple></select>
      </label>
      <label>Barn collects
        <select id="pick-animals" multiple></select>
      </label>
      <label>Cook makes
        <select id="pick-recipes" multiple></select>
      </label>
      <label>Courier visits
        <select id="pick-npcs" multiple></select>
      </label>
      <p class="lesson">Hold Ctrl (or Cmd) to pick several. Empty barn/cook/courier lists mean “everyone.” Planter list is the rotation it plants.</p>
    `;
    box.appendChild(picks);
    const fill = (sel, items, selected, labelFn, idFn) => {
      sel.innerHTML = "";
      items.forEach((it) => {
        const id = idFn(it);
        const o = document.createElement("option");
        o.value = id;
        o.textContent = labelFn(it);
        o.selected = selected.indexOf(id) >= 0;
        sel.appendChild(o);
      });
      sel.addEventListener("change", () => {
        const vals = [...sel.selectedOptions].map((o) => o.value);
        if (sel.id === "pick-crops") state.autoCrops = vals.length ? vals : [state.selected];
        if (sel.id === "pick-animals") state.autoAnimals = vals;
        if (sel.id === "pick-recipes") state.autoRecipes = vals;
        if (sel.id === "pick-npcs") state.autoNpcs = vals;
        save();
      });
    };
    fill($("pick-crops"), CROPS.filter((c) => state.lifetime >= c.unlock), state.autoCrops || [], (c) => c.name, (c) => c.id);
    fill($("pick-animals"), ANIMALS, state.autoAnimals || [], (a) => a.name, (a) => a.id);
    fill($("pick-recipes"), RECIPES, state.autoRecipes || [], (r) => r.name, (r) => r.id);
    fill($("pick-npcs"), NPCS, state.autoNpcs || [], (n) => n.name + " (" + villageName(n.village) + ")", (n) => n.id);
    jobs.forEach((job) => {
      const on = !!state.auto[job.key];
      const row = document.createElement("div");
      row.className = "crew-row";
      row.innerHTML = `<div><h3>${job.title}</h3><p>${job.body}</p></div><button type="button" class="once-btn">${job.once}</button><button type="button" class="toggle${on ? " on" : ""}" aria-pressed="${on}" title="Keep them hired"></button>`;
      const buttons = row.querySelectorAll("button");
      buttons[0].addEventListener("click", () => {
        run[job.key]();
        save();
      });
      buttons[1].addEventListener("click", () => {
        state.auto[job.key] = !state.auto[job.key];
        renderCrew();
        save();
        if (state.auto[job.key]) {
          run[job.key]();
          setLesson(`${job.title} is hired. They work by themselves. Flip the switch off to do it free with your own hands.`);
        } else {
          setLesson(`${job.title} went home. Doing it yourself costs time, not coins.`);
        }
      });
      box.appendChild(row);
    });
  }

  function queueShop() {
    clearTimeout(shopTimer);
    shopTimer = setTimeout(() => {
      renderShop();
      renderDecorShop();
      renderRecipes();
    }, 40);
  }

  function fmt(n) {
    if (n >= 1e6) return (n / 1e6).toFixed(2) + "m";
    if (n >= 1e4) return (n / 1e3).toFixed(1) + "k";
    return String(Math.floor(n));
  }

  function pick(arr) {
    return arr[Math.abs(farmDay() * 17 + arr.length * 3) % arr.length];
  }
  function weatherForDay(day) {
    const list = WEATHERS[SEASONS[Math.floor((day - 1) / 7) % 4]];
    return list[day % list.length];
  }

  function rollForage() {
    const season = seasonId();
    const kinds = {
      spring: ["flower", "flower", "lavender"],
      summer: ["flower", "berry", "sunflower"],
      autumn: ["acorn", "mushroom", "flower"],
      winter: ["snowdrop", "mushroom", "acorn"],
    }[season];
    const spots = [
      { x: "50%", y: "40%" },
      { x: "88%", y: "36%" },
      { x: "48%", y: "88%" },
    ];
    if (state.decor.lantern) spots.push({ x: "52%", y: "32%" });
    if (heartPerk("iris")) spots.push({ x: "18%", y: "26%" });
    if (heartPerk("odo")) spots.push({ x: "92%", y: "72%" });
    if (state.decor && state.decor.birdbath) spots.push({ x: "80%", y: "42%" });
    state.forage = spots.map((p, i) => ({
      id: kinds[i % kinds.length],
      x: p.x,
      y: p.y,
      taken: false,
    }));
  }

  function refreshDay() {
    const day = farmDay();
    if (day === state.lastFarmDay) return;
    const prevSeason = SEASONS[Math.floor((state.lastFarmDay - 1) / 7) % 4];
    state.lastFarmDay = day;
    state.weather = weatherForDay(day);
    rollForage();
    state.mail = { day, unread: true, body: pickLetter() };
    ensureAlmanac();
    const fest = festivalNow();
    const year = farmYear();
    if ((state.lastYear || 1) < year) {
      state.lastYear = year;
      showModal(
        "Year " + year,
        "The hill turned another ring. Harvests " + state.harvested + ", coins earned " + fmt(state.lifetime) + ", stars waiting " + prestigeGain() + ".\nThe kettle does not keep score. You might.",
        "Another spring then"
      );
    }
    if (prevSeason !== seasonId()) {
      toast(`${SEASON_LABEL[seasonId()]} has come to the hill.` + (fest ? " " + fest.name + " begins. " + fest.say : ""));
    } else if (fest && dayInSeason() === 0) {
      toast(fest.name + " is on. " + fest.say);
    } else {
      toast(`A new morning. ${WEATHER_SAY[state.weather]}. Today's kind stall: ${daySpecialty()}.`);
    }
    renderForage();
    renderWeather();
    paintWorld();
    renderVillage();
    $("mail-dot").classList.toggle("hidden", !state.mail.unread);
    if (state.fields) {
      state.fields.forEach((f) => {
        const planted = (f.plots || []).filter((p) => p.crop).length;
        if (planted === 0) addFertility(f, 4 + (mealHas("fert") ? 3 : 0));
        else spendFertility(f, Math.min(8, planted));
      });
    }
    if (!state.decor.scarecrow && (state.weather === "wind" || (seasonId() === "summer" && state.weather === "sunny"))) {
      const ripe = [];
      eachPlot((plot, i, f, fi) => {
        if (plot.unlocked && plot.crop && !plot.pest) ripe.push(plot);
      });
      if (ripe.length && ((farmDay() * 17) % 5) === 0) {
        ripe[(farmDay() * 3) % ripe.length].pest = true;
        toast("Pests found a bed. A scarecrow would have argued.");
      }
    }
    if (state.care) {
      Object.keys(state.care).forEach((id) => {
        const c = state.care[id];
        if (c.fedDay !== farmDay() && c.fedDay !== farmDay() - 1) c.mood = Math.max(0, (c.mood || 0) - 1);
      });
    }
    ensureContract();
    const c = state.contract;
    if (c && !c.done) {
      state.mail.body = (state.mail.body || "") + "\n\nWeekly notice — " + c.title + ": " + Object.keys(c.needs).map((id) => c.needs[id] + " " + itemName(id)).join(", ") + ". " + c.say;
    }
    const meal = state.meal;
    if (meal && farmDay() > (meal.day || 0) + (hasNode("palate") ? 1 : 0)) state.meal = null;
    renderYard();
    renderFieldBar();
    save();
  }

  function applyOffline() {
    const now = Date.now();
    const elapsed = Math.min(OFFLINE_CAP_MS, Math.max(0, now - (state.lastTick || now)));
    if (elapsed < 4000) {
      state.lastTick = now;
      return 0;
    }
    let gained = 0;
    ANIMALS.forEach((a) => {
      const count = state.animals[a.id] || 0;
      if (!count) {
        state.lastAnimal[a.id] = now;
        return;
      }
      const last = state.lastAnimal[a.id] || state.lastTick;
      const gap = animalInterval(a);
      const ticks = Math.floor((now - last) / gap);
      if (ticks > 0) {
        const made = ticks * count;
        if (state.upgrades.farmhand) addPantry(a.produce, made);
        else state.bins[a.id] = Math.min(999, (state.bins[a.id] || 0) + made);
        state.lastAnimal[a.id] = last + ticks * gap;
      }
    });
    eachPlot((plot, i, f) => {
      if (!plot.unlocked || !plot.crop) return;
      const crop = cropById(plot.crop);
      if (!crop) return;
      const g = growTime(crop, plot, f);
      const extra = now - plot.plantedAt;
      if (extra < g) return;
      if (state.upgrades.farmhand) {
        if (state.upgrades.planter) {
          const cycles = Math.floor(extra / g);
          addPantry(crop.id, cycles);
          state.harvested += cycles;
          noteMastery(crop.id, cycles);
          bumpAlmanac("harvest", cycles, crop.id);
          plot.lastCrop = crop.id;
          plot.plantedAt = now - (extra % g);
        } else {
          addPantry(crop.id, 1);
          state.harvested += 1;
          noteMastery(crop.id, 1);
          bumpAlmanac("harvest", 1, crop.id);
          plot.lastCrop = crop.id;
          plot.crop = null;
          plot.plantedAt = 0;
        }
      }
    });
    state.lastTick = now;
    return gained;
  }

  function plantSvg(id, stage) {
    const s = Math.max(0.2, stage);
    if (s < 0.34) {
      return `<svg viewBox="0 0 64 64"><path d="M32 52 C31 40 28 34 32 24" stroke="#3d6848" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="28" cy="26" rx="7" ry="4" fill="#5c8a62" transform="rotate(-30 28 26)"/></svg>`;
    }
    return `<svg viewBox="0 0 64 64"><ellipse cx="32" cy="44" rx="14" ry="10" fill="#4f7a55"/><circle cx="32" cy="28" r="10" fill="#e8b84a"/></svg>`;
  }

  function animalSvg() {
    return `<svg viewBox="0 0 64 64"><ellipse cx="32" cy="40" rx="16" ry="12" fill="#f4efe2"/></svg>`;
  }

  function buildField() {
    const field = $("field");
    field.innerHTML = "";
    plots().forEach((plot, i) => {
      const btn = document.createElement("button");
      btn.className = "plot";
      btn.type = "button";
      btn.dataset.i = String(i);
      btn.innerHTML = `<span class="bed">${sprite("plot")}</span><span class="plant"></span>`;
      btn.addEventListener("click", () => onPlot(i, btn));
      field.appendChild(btn);
    });
  }

  function renderFieldBar() {
    const bar = $("field-bar");
    if (!bar) return;
    const f = currentField();
    const price = fieldPrice(state.fields.length);
    bar.innerHTML = "";
    const prev = document.createElement("button");
    prev.type = "button";
    prev.className = "once-btn";
    prev.textContent = "←";
    prev.disabled = state.viewField <= 0;
    prev.addEventListener("click", () => showField(state.viewField - 1));
    const label = document.createElement("div");
    label.className = "field-label";
    const soil = fieldSoil(f);
    const fert = fieldFertility(f);
    label.innerHTML = `<strong>${f.name}</strong><span>${villageName(f.village)} · ${soil.name} · soil ${fert} · ${state.viewField + 1}/${state.fields.length}</span>`;
    label.title = "Double-click to rename. " + soil.say + " Fertility " + fert + "/100. Rest, manure, or compost feeds the soil.";
    label.addEventListener("dblclick", () => {
      const next = prompt("Name this field", f.name);
      if (next == null) return;
      f.name = (next || "").trim() || f.name;
      renderFieldBar();
      paintWorld();
      save();
    });
    const next = document.createElement("button");
    next.type = "button";
    next.className = "once-btn";
    next.textContent = "→";
    next.disabled = state.viewField >= state.fields.length - 1;
    next.addEventListener("click", () => showField(state.viewField + 1));
    const buy = document.createElement("button");
    buy.type = "button";
    buy.className = "buy-btn";
    buy.textContent = "Field " + fmt(price);
    buy.title = "Buy another 4×4 field";
    buy.disabled = state.coins < price;
    buy.addEventListener("click", buyField);
    const water = document.createElement("button");
    water.type = "button";
    water.className = "once-btn";
    const wet = state.watered && state.watered[String(state.viewField)] === farmDay();
    water.textContent = wet ? "Wet" : "Water";
    water.disabled = !!wet;
    water.title = "Water this field once a day. Beds here hurry until morning.";
    water.addEventListener("click", waterCurrentField);
    const seed = document.createElement("button");
    seed.type = "button";
    seed.className = "once-btn";
    const sel = cropById(state.selected);
    seed.textContent = sel ? sel.name : "Seed";
    seed.title = "Open the seed tin";
    seed.addEventListener("click", () => {
      setDesk(true);
      setTab("garden");
    });
    bar.appendChild(prev);
    bar.appendChild(label);
    bar.appendChild(next);
    const dung = document.createElement("button");
    dung.type = "button";
    dung.className = "once-btn";
    const canDung = pantryCount("manure") > 0 || (state.upgrades.compost || 0) > 0;
    dung.textContent = fert >= 100 ? "Rich" : "Feed soil";
    dung.disabled = fert >= 100 || !canDung;
    dung.title = "Spread manure from the horse, or use the compost heap.";
    dung.addEventListener("click", () => {
      if (fert >= 100) return;
      if (pantryCount("manure") > 0) {
        takePantry("manure", 1);
        addFertility(f, 18);
        toast(f.name + " took the manure. Fertility " + fieldFertility(f) + ".");
      } else if ((state.upgrades.compost || 0) > 0) {
        addFertility(f, 8 + state.upgrades.compost * 2);
        toast("Compost into " + f.name + ". Fertility " + fieldFertility(f) + ".");
      } else {
        toast("Need horse manure in the pantry, or a compost heap.");
        return;
      }
      renderFieldBar();
      renderPantry();
      save();
    });
    bar.appendChild(seed);
    bar.appendChild(water);
    bar.appendChild(dung);
    bar.appendChild(buy);
  }

  function showField(i) {
    if (i < 0 || i >= state.fields.length) return;
    state.viewField = i;
    buildField();
    plots().forEach((_, pi) => paintPlot(pi));
    renderFieldBar();
    renderShop();
    paintWorld();
  }

  function buyField() {
    const price = fieldPrice(state.fields.length);
    if (!spend(price)) return;
    state.fields.push(makeField(state.fields.length));
    state.viewField = state.fields.length - 1;
    const f = currentField();
    toast(`Deed signed: ${f.name} in ${villageName(f.village)}. As many as you like — the kingdom has room.`);
    buildField();
    plots().forEach((_, pi) => paintPlot(pi));
    renderFieldBar();
    renderVillage();
    renderShop();
    save();
  }

  function stageBucket(ratio) {
    if (ratio >= 1) return 3;
    if (ratio >= 0.78) return 2;
    if (ratio >= 0.34) return 1;
    return 0;
  }

  function ensurePlotShell(el) {
    if (!el.querySelector(".bed") || !el.querySelector(".plant")) {
      el.innerHTML = `<span class="bed">${sprite("plot")}</span><span class="plant"></span>`;
    } else if (keyed.plot && !el.querySelector(".bed img")) {
      el.querySelector(".bed").innerHTML = sprite("plot");
    }
  }

  function paintPlot(i) {
    const plot = plots()[i];
    const el = $("field").children[i];
    if (!el) return;
    el.classList.toggle("locked", !plot.unlocked);
    ["veg", "grain", "fruit", "flower", "herb", "magic"].forEach((k) => el.classList.remove("kind-" + k));
    if (!plot.unlocked) {
      el.classList.remove("ready", "growing");
      el.innerHTML = `<span class="bed">${sprite("plot")}</span><span class="price">${fmt(plotPriceAt(i))}</span>`;
      el.title = `Clear this plot for ${fmt(plotPriceAt(i))} coins`;
      el.dataset.art = "locked";
      return;
    }
    if (!plot.crop) {
      el.classList.remove("ready", "growing");
      ensurePlotShell(el);
      const ghost = cropById(state.selected);
      if (ghost && canPlant(ghost)) {
        el.querySelector(".plant").innerHTML = plantArt(ghost.id, 0.22, 0);
        el.classList.add("ghost-seed");
        el.title = "Plant " + ghost.name + " · " + fmt(seedCost(ghost)) + " · looks " + GRADE_NAME[harvestGrade(ghost, plot, currentField())];
      } else {
        el.querySelector(".plant").innerHTML = `<span class="plant-plus">+</span>`;
        el.classList.remove("ghost-seed");
        el.title = ghost ? ghost.name + " is out of season — pick another seed in Desk → Garden" : "Empty soil — pick a seed in Desk → Garden, then click here";
      }
      el.dataset.art = "empty";
      return;
    }
    el.classList.remove("ghost-seed");
    const crop = cropById(plot.crop);
    if (!crop) {
      plot.crop = null;
      el.dataset.art = "empty";
      el.querySelector(".plant").innerHTML = `<span class="plant-plus">+</span>`;
      return;
    }
    const g = growTime(crop, plot, currentField());
    const t = Date.now() - plot.plantedAt;
    const ratio = Math.min(1, t / g);
    const ready = ratio >= 1;
    const bucket = stageBucket(ratio);
    el.classList.toggle("ready", ready);
    el.classList.toggle("growing", !ready);
    ["veg", "grain", "fruit", "flower", "herb", "magic"].forEach((k) => el.classList.toggle("kind-" + k, crop.kind === k));
    el.style.setProperty("--stage", String(0.35 + ratio * 0.65));
    ensurePlotShell(el);
    const key = `${crop.id}-${bucket}-${plot.look || 0}`;
    if (el.dataset.art !== key) {
      el.dataset.art = key;
      el.querySelector(".plant").innerHTML = plantArt(crop.id, ratio, plot.look || 0);
    }
    el.title = (ready ? `${crop.name} is ready` : `${crop.name} · ${Math.ceil((g - t) / 1000)}s`) + " · " + GRADE_NAME[harvestGrade(crop, plot, currentField())] + (plot.pest ? " · pests" : "");
    el.classList.toggle("pest", !!plot.pest);
  }

  function onPlot(i, el) {
    const plot = plots()[i];
    if (!plot.unlocked) {
      if (spend(plotPriceAt(i))) {
        plot.unlocked = true;
        tone(392, 0.1, "sine", 0.04);
        paintAll();
        save();
      }
      return;
    }
    if (plot.crop) {
      const crop = cropById(plot.crop);
      if (!crop) {
        plot.crop = null;
        paintPlot(i);
        return;
      }
      if (Date.now() - plot.plantedAt >= growTime(crop, plot, currentField())) harvest(i, el);
      else toast(crop.name + " still needs " + Math.ceil((growTime(crop, plot, currentField()) - (Date.now() - plot.plantedAt)) / 1000) + "s.");
      return;
    }
    const crop = cropById(state.selected);
    if (!crop) {
      toast("Open Desk → Garden and tap a seed first.");
      setDesk(true);
      setTab("garden");
      return;
    }
    if (!canPlant(crop)) {
      toast(state.lifetime < crop.unlock
        ? crop.name + " is still locked. Earn " + fmt(crop.unlock) + " first."
        : crop.name + " is sleeping until its season. A greenhouse would help.");
      setDesk(true);
      setTab("garden");
      return;
    }
    if (state.coins < seedCost(crop)) {
      toast("Need " + fmt(seedCost(crop)) + " coins for " + crop.name + ".");
      return;
    }
    if (!spend(seedCost(crop))) return;
    plot.crop = crop.id;
    plot.plantedAt = Date.now();
    plot.invested = seedCost(crop);
    plot.look = rollLook();
    plot.pest = false;
    spendFertility(currentField(), 6);
    tone(330, 0.08, "sine", 0.03);
    paintPlot(i);
    const planted = $("field").children[i];
    if (planted) {
      planted.classList.add("just-planted");
      plotWorkFx(planted, "hoe");
      const pos = worldPct(planted);
      enqueueWork("you", pos.x, pos.y, null, crop.name);
      setTimeout(() => planted.classList.remove("just-planted"), 700);
    }
    save();
  }

  function harvest(i, el, silent) {
    harvestAt(plots()[i], i, state.viewField, silent, el);
  }

  function harvestAt(plot, i, fi, silent, el, extraWage) {
    const crop = cropById(plot.crop);
    if (!crop) return;
    const spent = (plot.invested || seedCost(crop)) + (extraWage || 0);
    const field = (state.fields && state.fields[fi]) || currentField();
    const grade = harvestGrade(crop, plot, field);
    plot.lastCrop = crop.id;
    plot.crop = null;
    plot.plantedAt = 0;
    plot.invested = 0;
    plot.pest = false;
    state.harvested += 1;
    addPantry(crop.id, 1, spent, grade);
    noteMastery(crop.id, 1);
    bumpAlmanac("harvest", 1, crop.id);
    if (grade >= 4) bumpAlmanac("prize", 1);
    if (soilMatch(crop, field) && state.watered && state.watered[String(fi)] === farmDay()) {
      if (!state.notes) state.notes = {};
      if (!state.notes[crop.id]) {
        state.notes[crop.id] = true;
        toast(crop.name + " taught you its best bed. The book keeps the note.");
      }
    }
    if (!silent && fi === state.viewField) {
      const cell = el || ($("field") && $("field").children[i]);
      puff(cell, crop.name + " · " + GRADE_NAME[grade]);
      if (cell) plotWorkFx(cell, "pick");
    }
    if (!silent) tone(523.25, 0.07, "triangle", 0.03);
    if (state.upgrades.planter && !state.auto.plant && canPlant(crop) && state.coins >= seedCost(crop)) {
      state.coins -= seedCost(crop);
      plot.crop = crop.id;
      plot.plantedAt = Date.now();
      plot.invested = seedCost(crop);
      plot.look = rollLook();
      plot.pest = false;
      spendFertility(field, 6);
      queueShop();
    }
    if (fi === state.viewField) paintPlot(i);
    $("coins").textContent = fmt(state.coins);
    renderSeeds();
    renderPantry();
    save();
  }

  function gatherAll() {
    eachPlot((plot, i, f, fi) => {
      if (!plot.unlocked || !plot.crop) return;
      const crop = cropById(plot.crop);
      if (Date.now() - plot.plantedAt >= growTime(crop, plot, f)) harvestAt(plot, i, fi, fi !== state.viewField);
    });
    ANIMALS.forEach((a) => collectAnimal(a.id, false));
    save();
    toast("Gathered what was ready.");
  }

  function sellPantry() {
    const basis = emptyPantryBasis();
    if (!basis) {
      toast("The pantry is already empty.");
      return;
    }
    const keep = grindPayout(basis, false, state._lastGrade);
    addCoins(keep);
    renderPantry();
    renderVillage();
    save();
    const extra = keep - basis;
    const pct = grindPct(basis, false, state._lastGrade);
    toast(extra > 0 ? `Hand sale paid ${fmt(basis)} · back ${fmt(keep)} · +${fmt(extra)} (${pct}% pennies)` : `Hand sale ${fmt(keep)} · paid ${fmt(basis)} · no extra`);
  }

  function collectAnimal(id, doSave = true, extraWage) {
    const a = animalById(id);
    const amt = state.bins[id] || 0;
    if (!a || amt <= 0) return;
    state.bins[id] = 0;
    addPantry(a.produce, amt, amt * itemBasis(a.produce) + (extraWage || 0), Math.min(4, 1 + animalMood(id)));
    bumpAlmanac("barn", amt);
    puff(document.querySelector(`[data-animal="${id}"]`), `+${amt} ${a.produceName}`);
    if (doSave) save();
    renderBarn();
    renderPantry();
  }

  function tickAnimals() {
    const now = Date.now();
    ANIMALS.forEach((a) => {
      const count = state.animals[a.id] || 0;
      if (!count) return;
      const last = state.lastAnimal[a.id] || now;
      const gap = animalInterval(a);
      if (now - last >= gap) {
        const ticks = Math.floor((now - last) / gap);
        const made = ticks * count;
        if (state.upgrades.farmhand) addPantry(a.produce, made);
        else state.bins[a.id] = Math.min(999, (state.bins[a.id] || 0) + made);
        state.lastAnimal[a.id] = last + ticks * gap;
        critterAct(a.id, "producing", "+" + a.produceName);
        renderBarn();
        if (state.upgrades.farmhand) renderPantry();
      }
    });
  }

  function tickFarmhand() {
    if (!state.upgrades.farmhand || state.auto.harvest) return;
    eachPlot((plot, i, f, fi) => {
      if (!plot.unlocked || !plot.crop) return;
      const crop = cropById(plot.crop);
      if (Date.now() - plot.plantedAt >= growTime(crop, plot, f)) harvestAt(plot, i, fi, true);
    });
  }

  function renderSeeds() {
    const cats = $("seed-cats");
    if (cats) {
      const kinds = ["all", "veg", "grain", "fruit", "flower", "herb", "spring", "summer", "autumn", "winter"];
      cats.innerHTML = "";
      kinds.forEach((k) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "cat" + (state.seedCat === k ? " on" : "");
        b.textContent = k;
        b.addEventListener("click", () => {
          state.seedCat = k;
          renderSeeds();
        });
        cats.appendChild(b);
      });
    }
    const box = $("seeds");
    box.innerHTML = "";
    CROPS.forEach((crop) => {
      const cat = state.seedCat || "all";
      if (cat !== "all" && crop.kind !== cat && crop.seasons.indexOf(cat) < 0) return;
      const locked = state.lifetime < crop.unlock;
      const seasonOk = canPlant(crop);
      const btn = document.createElement("button");
      btn.className = "seed" + (state.selected === crop.id ? " selected" : "") + (locked ? " locked" : "") + (seasonOk && !locked ? " in-season" : "") + (!locked && festBoost(crop) ? " fair" : "");
      btn.type = "button";
      btn.disabled = locked;
      const m = masteryRank(crop.id);
      const tag = locked
        ? `earn ${fmt(crop.unlock)} first`
        : `${fmt(seedCost(crop))} · ${Math.round(growTime(crop) / 1000)}s · +${fmt(grindProfit(seedCost(crop), false))}¢` +
          (inSeason(crop) ? ` · in` : state.upgrades.greenhouse ? ` · glass` : ` · off`) +
          (m ? ` · M${m}` : "") +
          (festBoost(crop) ? ` · fair` : "") +
          (crop.kind === daySpecialty() ? ` · stall` : "") +
          (soilMatch(crop, currentField()) ? ` · ${fieldSoil(currentField()).name}` : "");
      btn.innerHTML = `<span class="thumb">${plantArt(crop.id, 1, rollLook())}</span><span class="meta"><span class="name">${crop.name}</span><span class="sub">${tag}</span></span>`;
      btn.addEventListener("click", () => {
        state.selected = crop.id;
        renderSeeds();
        if ($("field")) {
          plots().forEach((p, i) => {
            if (p.unlocked && !p.crop) paintPlot(i);
          });
        }
        renderFieldBar();
        toast("Click a + bed on the brown dirt to plant " + crop.name + ".");
        tone(440, 0.05, "sine", 0.025);
      });
      box.appendChild(btn);
    });
  }

  function renderBarn() {
    const box = $("barn");
    box.innerHTML = "";
    ANIMALS.forEach((a) => {
      const count = state.animals[a.id] || 0;
      const bin = state.bins[a.id] || 0;
      const cap = a.max + (state.upgrades.barnMax || 0) * 4;
      const atMax = count >= cap;
      const row = document.createElement("div");
      row.className = "row";
      row.dataset.animal = a.id;
      const mood = animalMood(a.id);
      const food = (FEED[a.id] || ["oats"]).map(itemName).join("/");
      const action = bin
        ? `<button class="collect-chip" type="button">${bin} ${a.produceName}${bin > 1 ? "s" : ""}</button>`
        : `<button class="buy-btn" type="button" ${atMax ? "disabled" : ""}>${atMax ? "full" : fmt(animalCost(a))}</button>`;
      row.innerHTML = `<span class="thumb">${animalArt(a.id, count ? (state.animalLook[a.id] || 0) : rollLook())}</span><div><h3>${a.name} × ${count}${count ? " · " + "♥".repeat(Math.max(0, mood)) : ""}</h3><p>${a.blurb}${count ? " · likes " + food + (isFed(a.id) ? " · fed" : " · hungry") : ""}</p></div>${action}${count ? `<button class="once-btn" type="button">feed</button>` : ""}`;
      const buttons = row.querySelectorAll("button");
      buttons[0].addEventListener("click", () => {
        if (bin) collectAnimal(a.id);
        else if (!atMax && spend(animalCost(a))) {
          state.animals[a.id] = count + 1;
          if (state.animalLook[a.id] == null) state.animalLook[a.id] = rollLook();
          state.lastAnimal[a.id] = Date.now();
          ensureCare(a.id);
          tone(494, 0.09, "triangle", 0.035);
          renderBarn();
          renderYard();
          save();
        }
      });
      if (buttons[1]) buttons[1].addEventListener("click", () => feedAnimal(a.id));
      box.appendChild(row);
    });
  }

  function renderShop() {
    const box = $("shop");
    const plotPrice = nextPlotPrice();
    const items = [
      {
        title: "Another plot (this field)",
        body: plotPrice == null ? "This field's fence is full — buy another field." : "Clear one more bed on " + currentField().name + ".",
        label: plotPrice == null ? "full" : fmt(plotPrice),
        disabled: plotPrice == null || state.coins < plotPrice,
        run: () => {
          const i = nextPlotIndex();
          if (i < 0 || !spend(plotPriceAt(i))) return;
          plots()[i].unlocked = true;
          paintAll();
        },
      },
      {
        title: "Another field in Hearthvale",
        body: "A new page of 16 plots. Willowbrook, Millford, Harbor Hollow, High Meadow — buy as many as you want.",
        label: fmt(fieldPrice(state.fields.length)),
        disabled: state.coins < fieldPrice(state.fields.length),
        run: buyField,
      },
      {
        title: "Amend this field's soil",
        body: fieldSoil(currentField()).name + " — " + fieldSoil(currentField()).say + " Sets the soil to suit the seed you have selected.",
        label: fmt(amendCost(currentField())),
        disabled: state.coins < amendCost(currentField()),
        run: () => {
          const f = currentField();
          const cost = amendCost(f);
          if (!spend(cost)) return;
          const crop = cropById(state.selected);
          f.soil = preferredSoil(crop);
          f.amends = (f.amends || 0) + 1;
          toast(f.name + " is " + fieldSoil(f).name + " now. " + fieldSoil(f).say);
          renderFieldBar();
          paintAll();
        },
      },
      {
        title: "Barn loft",
        body: `Room for more animals. +4 cap each. ${state.upgrades.barnMax || 0}/6`,
        label: (state.upgrades.barnMax || 0) >= 6 ? "max" : fmt(220 * COST_SCALE * Math.pow(2, state.upgrades.barnMax || 0)),
        disabled: (state.upgrades.barnMax || 0) >= 6 || state.coins < 220 * COST_SCALE * Math.pow(2, state.upgrades.barnMax || 0),
        run: () => {
          const cost = Math.round(220 * COST_SCALE * Math.pow(2, state.upgrades.barnMax || 0));
          if ((state.upgrades.barnMax || 0) >= 6 || !spend(cost)) return;
          state.upgrades.barnMax = (state.upgrades.barnMax || 0) + 1;
          renderBarn();
        },
      },
      {
        title: "Compost heap",
        body: "Everything grows a little faster. Stacks 5 times.",
        label: (state.upgrades.compost || 0) >= 5 ? "max" : fmt(90 * COST_SCALE * Math.pow(2, state.upgrades.compost || 0)),
        disabled: (state.upgrades.compost || 0) >= 5 || state.coins < 90 * COST_SCALE * Math.pow(2, state.upgrades.compost || 0),
        run: () => {
          const cost = Math.round(90 * COST_SCALE * Math.pow(2, state.upgrades.compost || 0));
          if ((state.upgrades.compost || 0) >= 5 || !spend(cost)) return;
          state.upgrades.compost = (state.upgrades.compost || 0) + 1;
        },
      },
      {
        title: "Village roads",
        body: "The lane is nicer. The 1–2% crew grind does not change.",
        label: state.upgrades.roads ? "paved" : fmt(800 * COST_SCALE),
        disabled: state.upgrades.roads || state.coins < 800 * COST_SCALE,
        run: () => {
          if (state.upgrades.roads || !spend(800 * COST_SCALE)) return;
          state.upgrades.roads = true;
        },
      },
      {
        title: "Night market charter",
        body: "A lamp on the stall. Profit is still 1–5% pennies.",
        label: state.upgrades.nightMarket ? "signed" : fmt(1200 * COST_SCALE),
        disabled: state.upgrades.nightMarket || state.coins < 1200 * COST_SCALE,
        run: () => {
          if (state.upgrades.nightMarket || !spend(1200 * COST_SCALE)) return;
          state.upgrades.nightMarket = true;
        },
      },
      {
        title: "Green thumb",
        body: `Crops hurry by 12%. ${state.upgrades.thumb}/8`,
        label: state.upgrades.thumb >= 8 ? "max" : fmt(thumbCost()),
        disabled: state.upgrades.thumb >= 8 || state.coins < thumbCost(),
        run: () => {
          if (state.upgrades.thumb >= 8 || !spend(thumbCost())) return;
          state.upgrades.thumb += 1;
        },
      },
      {
        title: "Market stall",
        body: `Hand-sale grind leans a hair higher, still capped at 5%. ${state.upgrades.market}/8`,
        label: state.upgrades.market >= 8 ? "max" : fmt(marketCost()),
        disabled: state.upgrades.market >= 8 || state.coins < marketCost(),
        run: () => {
          if (state.upgrades.market >= 8 || !spend(marketCost())) return;
          state.upgrades.market += 1;
        },
      },
      {
        title: "Farmhand",
        body: "Harvests into the pantry while you rest.",
        label: state.upgrades.farmhand ? "hired" : fmt(2500 * COST_SCALE),
        disabled: state.upgrades.farmhand || state.coins < 2500 * COST_SCALE,
        run: () => {
          if (state.upgrades.farmhand || !spend(2500 * COST_SCALE)) return;
          state.upgrades.farmhand = true;
        },
      },
      {
        title: "Seed planter",
        body: "Replants the same crop after harvest.",
        label: state.upgrades.planter ? "set" : fmt(4000 * COST_SCALE),
        disabled: state.upgrades.planter || state.coins < 4000 * COST_SCALE,
        run: () => {
          if (state.upgrades.planter || !spend(4000 * COST_SCALE)) return;
          state.upgrades.planter = true;
        },
      },
      {
        title: "Greenhouse glass",
        body: "Plant any crop in any season.",
        label: state.upgrades.greenhouse ? "built" : fmt(6000 * COST_SCALE),
        disabled: state.upgrades.greenhouse || state.coins < 6000 * COST_SCALE,
        run: () => {
          if (state.upgrades.greenhouse || !spend(6000 * COST_SCALE)) return;
          state.upgrades.greenhouse = true;
          toast("The glass house holds a private spring.");
        },
      },
      {
        title: "Cottage comfort",
        body: `Kettle, then pantry, then a real kitchen. ${state.upgrades.cottage}/2`,
        label: state.upgrades.cottage >= 2 ? "home" : fmt([400 * COST_SCALE, 2200 * COST_SCALE][state.upgrades.cottage]),
        disabled: state.upgrades.cottage >= 2 || state.coins < [400 * COST_SCALE, 2200 * COST_SCALE][state.upgrades.cottage],
        run: () => {
          const cost = [400 * COST_SCALE, 2200 * COST_SCALE][state.upgrades.cottage];
          if (state.upgrades.cottage >= 2 || !spend(cost)) return;
          state.upgrades.cottage += 1;
          toast(state.upgrades.cottage === 1 ? "You hung curtains. The light got softer." : "A real stove. The recipes deepen.");
        },
      },
    ];
    box.innerHTML = "";
    items.forEach((item) => {
      const row = document.createElement("div");
      row.className = "row";
      row.innerHTML = `<span class="thumb" style="display:grid;place-items:center;font-size:22px">🧺</span><div><h3>${item.title}</h3><p>${item.body}</p></div><button class="buy-btn" ${item.disabled ? "disabled" : ""}>${item.label}</button>`;
      row.querySelector("button").addEventListener("click", () => {
        item.run();
        renderShop();
        renderSeeds();
        renderRecipes();
        save();
      });
      box.appendChild(row);
    });
  }

  function renderPantry() {
    const box = $("pantry");
    const ids = Object.keys(state.pantry).filter((id) => pantryCount(id) > 0);
    if (!ids.length) {
      box.innerHTML = `<p class="sub" style="margin:0;color:#5c5146">Nothing on the shelves yet. Harvest, gather, or collect the barn.</p>`;
      return;
    }
    box.innerHTML = "";
    ids.forEach((id) => {
      const n = pantryCount(id);
      const el = document.createElement("button");
      el.className = "pantry-item seed";
      el.type = "button";
      const unit = pantryUnitCost(id);
      const g = pantryGradeOf(id);
      el.innerHTML = `<span class="thumb">${goodArt(id)}</span><span class="meta"><span class="name">${itemName(id)} × ${n} · ${GRADE_NAME[g]}</span><span class="sub">in it ${fmt(Math.round(unit))} · hand +${fmt(grindProfit(unit, false, g))} (${grindPct(unit, false, g)}%) · crew +${fmt(grindProfit(unit, true, g))} (${grindPct(unit, true, g)}%)</span></span>`;
      el.addEventListener("click", () => {
        const spent = pantryUnitCost(id);
        const grade = pantryGradeOf(id);
        if (!takePantry(id, 1)) return;
        addCoins(grindPayout(spent, false, grade), el);
        renderPantry();
        renderVillage();
        save();
      });
      box.appendChild(el);
    });
  }

  function renderRecipes() {
    const box = $("recipes");
    box.innerHTML = "";
    const mill = document.createElement("div");
    mill.className = "row";
    const canMill = GRAINS.some((g) => pantryCount(g) >= 2);
    mill.innerHTML = `<span class="thumb">${goodArt("flour")}</span><div><h3>Hand mill</h3><p>Two grain become one flour. Same as clicking the windmill. Cost stays in the bag.</p></div><button class="buy-btn" ${canMill ? "" : "disabled"}>mill</button>`;
    mill.querySelector("button").addEventListener("click", () => millOnce(false));
    box.appendChild(mill);
    RECIPES.forEach((r) => {
      const locked = state.upgrades.cottage < r.cottage;
      const have = Object.keys(r.needs).every((id) => pantryCount(id) >= r.needs[id]);
      const rank = cookRank(r.id);
      const needTxt = Object.keys(r.needs).map((id) => `${r.needs[id]} ${itemName(id)}`).join(", ");
      const row = document.createElement("div");
      row.className = "row";
      const canServe = !locked && pantryCount(r.id) > 0 && MEAL_BUFF[r.id];
      row.innerHTML = `<span class="thumb">${goodArt(r.id)}</span><div><h3>${r.name}${rank ? " · K" + rank : ""}</h3><p>${locked ? "The kitchen isn't ready." : needTxt + " · wage " + recipeWage(r) + (MEAL_BUFF[r.id] ? " · can serve" : "")}</p></div><button class="buy-btn" ${locked || !have ? "disabled" : ""}>${locked ? "later" : "cook"}</button>${canServe ? `<button class="once-btn" type="button">serve</button>` : ""}`;
      const buttons = row.querySelectorAll("button");
      buttons[0].addEventListener("click", () => {
        if (locked || !have) return;
        let spent = 0;
        Object.keys(r.needs).forEach((id) => {
          spent += pantrySpendOf(id, r.needs[id]);
          takePantry(id, r.needs[id]);
        });
        addPantry(r.id, 1, spent, 3);
        noteCook(r.id);
        bumpAlmanac("cook", 1);
        toast(r.say);
        tone(392, 0.12, "sine", 0.04);
        renderPantry();
        renderRecipes();
        save();
      });
      if (buttons[1]) buttons[1].addEventListener("click", () => serveMeal(r.id));
      box.appendChild(row);
    });
  }

  function todaysWant(npc) {
    return npc.wants[farmDay() % npc.wants.length];
  }

  function almanacCard() {
    const a = ensureAlmanac();
    const g = currentGoal();
    const fest = festivalNow();
    const wrap = document.createElement("div");
    wrap.className = "almanac-card";
    const left = g.n ? Math.min(g.n, a.progress) : 0;
    wrap.innerHTML = `<strong>Almanac · week ${a.week + 1}</strong>
      <p>${a.done ? "This week's page is full." : g.title + " — " + g.say}<br>${left}/${g.n}${a.done ? " · done" : ""} · ribbons ${a.favors || 0}</p>`;
    if (fest) {
      const want = festivalWant();
      const key = festKey();
      const done = state.festDone === key;
      const p = document.createElement("p");
      p.innerHTML = `<strong>${fest.name}</strong> — ${fest.say}` + (want && !done ? `<br>Fair basket: ${want.n} ${itemName(want.item)}.` : done ? "<br>The fair already took your basket." : "");
      wrap.appendChild(p);
      if (want && !done) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "buy-btn";
        btn.textContent = "Take a basket";
        btn.disabled = pantryCount(want.item) < want.n;
        btn.addEventListener("click", () => {
          const spent = pantrySpendOf(want.item, want.n);
          if (!takePantry(want.item, want.n)) return;
          state.festDone = key;
          if (!state.festWins) state.festWins = [];
          if (state.festWins.indexOf(key) < 0) state.festWins.push(key);
          const keep = grindPayout(spent, false);
          addCoins(keep);
          a.favors = (a.favors || 0) + 1;
          toast(fest.name + " kept the basket. +" + fmt(keep - spent) + " pennies (" + grindPct(spent, false) + "%). A ribbon for the book.");
          renderPantry();
          renderVillage();
          renderJournal();
          save();
        });
        wrap.appendChild(btn);
      }
    }
    const spend = document.createElement("div");
    spend.className = "almanac-spend";
    const b1 = document.createElement("button");
    b1.type = "button";
    b1.className = "once-btn";
    b1.textContent = "Ribbon: wild fence (1)";
    b1.disabled = (a.favors || 0) < 1;
    b1.addEventListener("click", () => spendFavor("forage"));
    const b2 = document.createElement("button");
    b2.type = "button";
    b2.className = "once-btn";
    b2.textContent = "Ribbon: +10 mastery on selected seed (2)";
    b2.disabled = (a.favors || 0) < 2;
    b2.addEventListener("click", () => spendFavor("master"));
    spend.appendChild(b1);
    spend.appendChild(b2);
    wrap.appendChild(spend);
    return wrap;
  }

  function peddlerCard() {
    const wrap = document.createElement("div");
    wrap.className = "almanac-card";
    if (!peddlerVisits()) {
      wrap.innerHTML = "<strong>Lane cart</strong><p>The peddler comes mid-week" + (hasNode("road") ? ", and again before the weekend" : "") + ". Today the lane is empty.</p>";
      return wrap;
    }
    const crop = peddlerCrop();
    const n = 3;
    const cost = seedCost(crop) * n;
    const used = state.peddlerDay === farmDay();
    wrap.innerHTML = `<strong>Peddler is in</strong><p>A cart with a kettle on the step. Packets of ${crop.name} — ${n} for ${fmt(cost)}. Paid cost goes in the bag, same as if you grew them.</p>`;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "buy-btn";
    btn.textContent = used ? "already traded" : "Buy packet " + fmt(cost);
    btn.disabled = used || state.coins < cost;
    btn.addEventListener("click", () => {
      if (state.peddlerDay === farmDay() || !spend(cost)) return;
      addPantry(crop.id, n, cost);
      state.peddlerDay = farmDay();
      toast("The peddler wrapped " + n + " " + crop.name + " in brown paper.");
      renderPantry();
      renderVillage();
      save();
    });
    wrap.appendChild(btn);
    return wrap;
  }

  function renderVillage() {
    const box = $("village");
    box.innerHTML = "";
    box.appendChild(almanacCard());
    box.appendChild(peddlerCard());
    const owned = ownedVillages();
    owned.forEach((v) => {
      const order = villageOrder(v.id);
      if (!order) return;
      const key = orderKey(v.id);
      const done = !!(state.ordersDone && state.ordersDone[key]);
      const needTxt = Object.keys(order.needs).map((id) => order.needs[id] + " " + itemName(id)).join(", ");
      let orderSpent = 0;
      Object.keys(order.needs).forEach((id) => { orderSpent += pantrySpendOf(id, order.needs[id]); });
      const card = document.createElement("div");
      card.className = "almanac-card";
      card.innerHTML = `<strong>${v.name} notice · ${order.title}</strong><p>${order.say}<br>${needTxt}${done ? " · filled" : " · +" + fmt(grindProfit(orderSpent, false)) + " pennies (" + grindPct(orderSpent, false) + "%)"}</p>`;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "buy-btn";
      btn.textContent = done ? "filled" : "Fill order";
      btn.disabled = done || !orderReady(order);
      btn.addEventListener("click", () => fillOrder(v.id));
      card.appendChild(btn);
      box.appendChild(card);
    });
    const nav = document.createElement("div");
    nav.className = "cats";
    owned.forEach((v) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "cat" + (state.viewVillage === v.id ? " on" : "");
      b.textContent = v.name;
      b.addEventListener("click", () => {
        state.viewVillage = v.id;
        renderVillage();
      });
      nav.appendChild(b);
    });
    box.appendChild(nav);
    NPCS.forEach((npc) => {
      if (npc.village && npc.village !== state.viewVillage) return;
      if (owned.every((v) => v.id !== npc.village) && npc.village !== "willowbrook") return;
      const want = todaysWant(npc);
      const hearts = state.hearts[npc.id] || 0;
      const done = state.quests[npc.id] === farmDay();
      const card = document.createElement("article");
      card.className = "npc-card";
      const perk = HEART_PERKS[npc.id];
      const perkLine = perk ? (hearts >= 5 ? perk.name + " — " + perk.blurb : "At 5 hearts: " + perk.blurb) : "";
      card.innerHTML = `<div class="port">${sprite(npc.art)}</div><div><h3>${npc.name} <span class="hearts">${"♥".repeat(hearts)}${"♡".repeat(Math.max(0, 5 - hearts))}</span></h3><p>${done ? "That's plenty for today. Sit a minute." : want.say}${perkLine ? "<br>" + perkLine : ""}</p><button class="buy-btn" type="button">${done ? "Talk" : "Give " + want.n + " " + itemName(want.item)}</button></div>`;
      card.querySelector("button").addEventListener("click", () => visitNpc(npc));
      box.appendChild(card);
    });
  }

  function visitNpc(npc) {
    const want = todaysWant(npc);
    const done = state.quests[npc.id] === farmDay();
    const chat = pick(npc.chat);
    const port = $("modal-portrait");
    port.classList.remove("hidden");
    port.innerHTML = sprite(npc.art);
    if (done) {
      showModal(npc.name, chat + "\n\n" + npc.role[0].toUpperCase() + npc.role.slice(1) + " looks content.", "Goodbye");
      return;
    }
    showModal(npc.name, chat + "\n\n" + want.say, "Not yet");
    const extra = document.createElement("button");
    extra.className = "primary-btn";
    extra.textContent = `Give ${want.n} ${itemName(want.item)}`;
    extra.disabled = pantryCount(want.item) < want.n;
    extra.addEventListener("click", () => {
      const spent = pantrySpendOf(want.item, want.n);
      if (!takePantry(want.item, want.n)) return;
      state.quests[npc.id] = farmDay();
      gainHeart(npc.id);
      bumpAlmanac("gift", 1);
      const keep = grindPayout(spent, false);
      addCoins(keep);
      hideModal();
      toast(`${npc.name} tucked the gift away. +${fmt(keep - spent)} pennies (${grindPct(spent, false)}%).`);
      renderPantry();
      renderVillage();
      save();
    });
    $("modal-actions").appendChild(extra);
  }

  function renderDecorShop() {
    const box = $("decor-shop");
    box.innerHTML = "";
    DECOR.forEach((d) => {
      const owned = state.decor[d.id];
      const row = document.createElement("div");
      row.className = "row";
      row.innerHTML = `<span class="thumb">${sprite(d.art || d.id) || sprite(d.id)}</span><div><h3>${d.name}</h3><p>${d.bonus}</p></div><button class="buy-btn" ${owned || state.coins < decorCost(d) ? (owned ? "disabled" : "") : ""} ${owned ? "disabled" : ""}>${owned ? "placed" : fmt(decorCost(d))}</button>`;
      row.querySelector("button").addEventListener("click", () => {
        if (owned || !spend(decorCost(d))) return;
        state.decor[d.id] = true;
        renderDecor();
        renderDecorShop();
        save();
        toast(`${d.name} found a place in the yard.`);
      });
      box.appendChild(row);
    });
  }

  function renderDecor() {
    const layer = $("decor-layer");
    if (!layer) return;
    layer.innerHTML = "";
    DECOR.forEach((d) => {
      if (!state.decor[d.id]) return;
      const el = document.createElement("div");
      el.className = "decor-item";
      el.style.left = d.x;
      el.style.top = d.y;
      el.innerHTML = sprite(d.art || d.id) || sprite(d.id);
      el.title = d.name + " — " + d.bonus;
      if (d.id === "bench") {
        el.dataset.use = "1";
        el.style.cursor = "pointer";
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          if (state.wishDay === farmDay()) {
            farmSay("The bench already held you once today.", 0, 0, 220);
            return;
          }
          state.wishDay = farmDay();
          toast("You sat. The field exhaled. Same gift as a well-wish.");
          save();
          paintWorld();
        });
      }
      layer.appendChild(el);
    });
  }

  function renderForage() {
    const layer = $("forage-layer");
    if (!layer) return;
    layer.innerHTML = "";
    if (!state.forage.length) rollForage();
    state.forage.forEach((spot, i) => {
      if (spot.taken) return;
      const btn = document.createElement("button");
      btn.className = "forage-spot";
      btn.type = "button";
      btn.style.left = spot.x;
      btn.style.top = spot.y;
      btn.title = "A little something wild";
      btn.innerHTML = goodArt(spot.id);
      btn.addEventListener("click", () => {
        spot.taken = true;
        addPantry(spot.id, 1);
        bumpAlmanac("forage", 1);
        puff(btn, itemName(spot.id));
        tone(349, 0.08, "sine", 0.03);
        btn.classList.add("gone");
        setTimeout(() => {
          renderForage();
          renderPantry();
        }, 280);
        save();
      });
      layer.appendChild(btn);
    });
  }

  function renderWeather() {
    const layer = $("weather-layer");
    if (!layer) return;
    layer.innerHTML = "";
    if (state.weather === "wind") {
      for (let i = 0; i < 8; i++) {
        const el = document.createElement("span");
        el.className = "gust";
        el.style.top = 10 + Math.random() * 70 + "%";
        el.style.animationDelay = -Math.random() * 2 + "s";
        el.style.animationDuration = 1.6 + Math.random() + "s";
        layer.appendChild(el);
      }
      return;
    }
    if (state.weather !== "rain" && state.weather !== "snow") return;
    const n = 36;
    for (let i = 0; i < n; i++) {
      const el = document.createElement("span");
      el.className = state.weather === "rain" ? "drop" : "flake";
      el.style.left = Math.random() * 100 + "%";
      el.style.animationDuration = 1.4 + Math.random() * 1.8 + "s";
      el.style.animationDelay = -Math.random() * 2 + "s";
      if (state.weather === "snow") el.textContent = "❄";
      layer.appendChild(el);
    }
  }

  function renderJournal() {
    const box = $("journal");
    const cropsFound = CROPS.filter((c) => state.discovered[c.id]).length;
    const cooked = RECIPES.filter((r) => state.discovered[r.id]).length;
    box.innerHTML = "";
    const stats = document.createElement("div");
    stats.className = "story";
    const p = ensureParagon();
    box.appendChild(almanacCard());
    stats.innerHTML = `<strong>Ledger</strong><br>Lifetime earned ${fmt(state.lifetime)} · harvests ${state.harvested}<br>Wages paid to workers ${fmt(state.books.wages)} · village tax ${fmt(state.books.tax)} · jobs hired ${state.books.jobs}<br>Sales return what you spent plus 1–5% pennies (crew 1–2%)<br>Crops known ${cropsFound}/${CROPS.length} · recipes tasted ${cooked}/${RECIPES.length}<br>Cottage ${state.upgrades.cottage}/2 · greenhouse ${state.upgrades.greenhouse ? "yes" : "not yet"}<br>Paragon run ${p.runs + 1} · stars held ${unspentStars()} · farms folded ${p.runs} · best day ${p.bestDay}<br>Year ${farmYear()} · fairs kept ${(state.festWins || []).length}`;
    box.appendChild(stats);
    STORY.forEach((s, i) => {
      if (state.stories.indexOf(i) < 0) return;
      const el = document.createElement("div");
      el.className = "story";
      el.innerHTML = `<strong>${s.title}</strong><br>${s.text}`;
      box.appendChild(el);
    });
    PARAGON_STORY.forEach((s) => {
      if ((p.runs || 0) < s.runs) return;
      const el = document.createElement("div");
      el.className = "story";
      el.innerHTML = `<strong>${s.title}</strong><br>${s.text}`;
      box.appendChild(el);
    });
    (state.festWins || []).forEach((key) => {
      const season = (key.split("-")[0] || "spring");
      const f = FESTIVALS[season];
      if (!f) return;
      const el = document.createElement("div");
      el.className = "story";
      el.innerHTML = `<strong>${f.name} kept</strong><br>You carried a basket to the fair. The hill still talks about it.`;
      box.appendChild(el);
    });
    CROPS.forEach((c) => {
      const row = document.createElement("div");
      row.className = "journal-row";
      const known = state.discovered[c.id];
      const rank = masteryRank(c.id);
      const cuts = masteryCount(c.id);
      row.innerHTML = `<span class="thumb">${known ? plantArt(c.id, 1) : ""}</span><span class="meta"><span class="name">${known ? c.name : "???"}${rank ? " · M" + rank : ""}</span><span class="sub">${known ? c.hint + " · " + c.seasons.join(", ") + " · " + cuts + " harvested" : "Not yet grown."}</span></span>`;
      box.appendChild(row);
    });
  }

  function buyParagon(id) {
    if (!nodeUnlocked(id)) {
      toast("That gift still needs a branch below it.");
      return;
    }
    const cost = nodeCost(id);
    if (cost == null) {
      toast("That gift is already as full as it gets.");
      return;
    }
    if (unspentStars() < cost) {
      toast("You need more unspent stars. Prestige a longer farm.");
      return;
    }
    ensureParagon();
    state.paragon.nodes[id] = nodeRank(id) + 1;
    state.paragon.spent += cost;
    applyParagonLive();
    renderParagon();
    renderCrew();
    renderSeeds();
    renderShop();
    renderVillage();
    paintAll();
    save();
    const n = nodeDef(id);
    toast((n && n.name) + " took " + cost + " star" + (cost === 1 ? "" : "s") + ".");
  }

  function renderParagon() {
    const box = $("paragon");
    if (!box) return;
    ensureParagon();
    const p = state.paragon;
    const br = prestigeBreakdown();
    const ready = canPrestige();
    box.innerHTML = "";

    const stats = document.createElement("div");
    stats.className = "para-stats";
    stats.innerHTML = `<strong>Run ${p.runs + 1}</strong> · unspent ★ ${unspentStars()} · earned ${p.stars} · spent ${p.spent}<br>
      Farms folded ${p.runs} · best day ${p.bestDay} · best lifetime ${fmt(p.bestLife)} · best harvests ${p.bestHarvest}<br>
      This farm: day ${br.day} · earned ${fmt(br.life)} · harvests ${br.harvests}<br>
      <div class="para-break">
        <span>From coins: ★${br.fromLife}</span>
        <span>From days: ★${br.fromDay}</span>
        <span>From harvests: ★${br.fromCut}</span>
        <span>From extra fields: ★${br.fromLand}</span>
        <span>Star harvest bonus: ★${br.bonus}</span>
        <span><strong>If you prestige now: ★${br.total}</strong></span>
      </div>
      Last a week (or earn 3,000 coins) and have at least 1 star waiting. Days give a star every 7. Coins give stars from √(lifetime/1,250). Harvests give one per 40. Extra fields add one each.`;
    box.appendChild(stats);

    const actions = document.createElement("div");
    actions.className = "para-actions";
    const prest = document.createElement("button");
    prest.type = "button";
    prest.className = "primary-btn";
    prest.disabled = !ready;
    prest.textContent = ready ? `Prestige for ★${br.total}` : "Prestige (not yet)";
    prest.addEventListener("click", () => {
      if (!canPrestige()) return;
      if (confirm("Fold this farm into " + prestigeGain() + " star" + (prestigeGain() === 1 ? "" : "s") + "? The soil resets. The paragon tree stays.")) {
        doPrestige();
      }
    });
    const restart = document.createElement("button");
    restart.type = "button";
    restart.className = "ghost-btn";
    restart.textContent = "Restart run";
    restart.addEventListener("click", () => {
      if (confirm("Restart this farm? You keep the paragon tree and unspent stars. You will not earn stars for this run.")) {
        restartRun();
      }
    });
    actions.appendChild(prest);
    actions.appendChild(restart);
    box.appendChild(actions);

    const tree = document.createElement("div");
    tree.className = "para-tree";
    Object.keys(PARAGON_BRANCH).forEach((branch) => {
      const col = document.createElement("div");
      col.className = "para-branch";
      const h = document.createElement("h3");
      h.textContent = PARAGON_BRANCH[branch];
      col.appendChild(h);
      PARAGON.filter((n) => n.branch === branch).forEach((n) => {
        const rank = nodeRank(n.id);
        const open = nodeUnlocked(n.id);
        const cost = nodeCost(n.id);
        const maxed = rank >= n.max;
        const el = document.createElement("div");
        el.className = "para-node" + (maxed ? " owned maxed" : rank ? " owned" : open ? " ready" : " locked");
        const need = n.req.length ? "Needs " + n.req.map((id) => (nodeDef(id) || { name: id }).name).join(" + ") : "The first gift";
        el.innerHTML = `<h4>${n.name}</h4><p>${n.blurb}<br>${need}.</p><div class="para-row"><span class="rank">${rank}/${n.max}</span></div>`;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "buy-btn";
        btn.textContent = maxed ? "max" : !open ? "locked" : "★" + cost;
        btn.disabled = maxed || !open || unspentStars() < cost;
        btn.addEventListener("click", () => buyParagon(n.id));
        el.querySelector(".para-row").appendChild(btn);
        col.appendChild(el);
      });
      tree.appendChild(col);
    });
    box.appendChild(tree);

    if (p.history && p.history.length) {
      const hist = document.createElement("div");
      hist.className = "para-hist";
      p.history.slice().reverse().forEach((h) => {
        const row = document.createElement("div");
        row.className = "story";
        row.innerHTML = `<strong>Run ${h.run} folded</strong><br>Day ${h.day} · earned ${fmt(h.life)} · harvests ${h.harvests || 0} · +★${h.stars}`;
        hist.appendChild(row);
      });
      box.appendChild(hist);
    }
  }

  function unlockStories() {
    STORY.forEach((s, i) => {
      if (state.lifetime >= s.at && state.stories.indexOf(i) < 0) {
        state.stories.push(i);
        toast(s.title);
      }
    });
  }

  function paintWorld() {
    const season = seasonId();
    const world = $("world");
    world.className = "world painted season-" + season + " weather-" + (state.weather || "sunny");
    if (festivalNow()) world.classList.add("festive");
    const hour = new Date().getHours();
    let sky = "";
    if (hour >= 21 || hour < 5) sky = "night";
    else if (hour < 10) sky = "morning";
    else if (hour < 16) sky = "noon";
    if ($("sky")) $("sky").className = "sky " + sky;
    if ($("season-name")) $("season-name").textContent = SEASON_LABEL[season];
    if ($("year-num")) $("year-num").textContent = String(farmYear());
    if ($("day-num")) $("day-num").textContent = String(farmDay());
    if ($("weather")) $("weather").textContent = WEATHER_SAY[state.weather] || state.weather;
    const fest = festivalNow();
    const fl = $("fest-line");
    if (fl) {
      fl.textContent = fest ? " · " + fest.name : "";
      fl.classList.toggle("on", !!fest);
    }
    const f = currentField();
    const run = (state.paragon && state.paragon.runs) || 0;
    const wet = state.watered && state.watered[String(state.viewField)] === farmDay();
    const note = $("world-note");
    if (note) {
      const bits = [f.name, villageName(f.village), fieldSoil(f).name];
      if (run) bits.push("run " + (run + 1));
      if (wet) bits.push("watered");
      if (peddlerVisits()) bits.push("peddler");
      if (state.wishDay === farmDay()) bits.push("wished");
      note.textContent = bits.join(" · ");
    }
  }

  function paintAll() {
    plots().forEach((_, i) => paintPlot(i));
    renderFieldBar();
    if ($("coins")) $("coins").textContent = fmt(state.coins);
    if ($("btn-mute")) {
      $("btn-mute").classList.toggle("muted", !!state.muted);
      $("btn-mute").textContent = state.muted ? "×" : "♪";
    }
    if ($("mail-dot")) $("mail-dot").classList.toggle("hidden", !(state.mail && state.mail.unread));
    if ($("wage-num")) $("wage-num").textContent = fmt((state.books && state.books.wages || 0) + (state.books && state.books.tax || 0));
    if ($("star-num")) $("star-num").textContent = String(unspentStars());
    if ($("field")) {
      $("field").classList.toggle("watered", !!(state.watered && state.watered[String(state.viewField)] === farmDay()));
    }
    paintWorld();
  }

  function puff(el, text) {
    if (!el) return;
    const r = el.getBoundingClientRect();
    const n = document.createElement("div");
    n.className = "puff";
    n.textContent = text;
    n.style.left = r.left + r.width / 2 + "px";
    n.style.top = r.top + 8 + "px";
    $("fx").appendChild(n);
    setTimeout(() => n.remove(), 900);
    for (let i = 0; i < 6; i++) {
      const s = document.createElement("span");
      s.className = "burst";
      s.style.left = r.left + r.width / 2 + "px";
      s.style.top = r.top + r.height / 2 + "px";
      s.style.setProperty("--dx", Math.round(Math.random() * 72 - 36) + "px");
      s.style.setProperty("--dy", Math.round(Math.random() * -56 - 8) + "px");
      $("fx").appendChild(s);
      setTimeout(() => s.remove(), 720);
    }
  }

  function toast(text) {
    const el = $("toast");
    if (!el) return;
    el.textContent = text;
    el.classList.remove("hidden");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.add("hidden"), 2800);
  }

  const TRACKS = {
    chores: {
      name: "Morning Chores",
      blurb: "Fingerpicked guitar at first light. Hens, kettle, dew.",
      bpm: 82,
      feel: "pick",
      boom: [98, 0, 0, 0, 0, 0, 0, 0, 73.4, 0, 0, 0, 0, 0, 0, 0, 98, 0, 0, 0, 0, 0, 0, 0, 73.4, 0, 0, 0, 87.3, 0, 0, 0],
      chuck: [0, 0, 0, 0, [196, 246.9, 293.7], 0, 0, 0, 0, 0, 0, 0, [196, 246.9, 293.7], 0, 0, 0, 0, 0, 0, 0, [196, 246.9, 293.7], 0, 0, 0, 0, 0, 0, 0, [174.6, 220, 261.6], 0, 0, 0],
      fiddle: [0, 0, 392, 0, 329.6, 0, 293.7, 0, 329.6, 0, 392, 0, 440, 0, 392, 0, 329.6, 0, 392, 0, 440, 0, 493.9, 0, 440, 0, 392, 0, 329.6, 0, 293.7, 0],
      harp: [196, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 146.8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    reel: {
      name: "Harvest Reel",
      blurb: "Fiddle over a porch guitar. Sheaves and sawdust.",
      bpm: 100,
      feel: "reel",
      boom: [73.4, 0, 0, 0, 0, 0, 0, 0, 110, 0, 0, 0, 0, 0, 0, 0, 73.4, 0, 0, 0, 0, 0, 0, 0, 98, 0, 0, 0, 110, 0, 0, 0],
      chuck: [0, 0, 0, 0, [146.8, 185, 220], 0, 0, 0, 0, 0, 0, 0, [146.8, 185, 220], 0, 0, 0, 0, 0, 0, 0, [146.8, 185, 220], 0, 0, 0, 0, 0, 0, 0, [196, 246.9, 293.7], 0, 0, 0],
      fiddle: [293.7, 329.6, 370, 440, 493.9, 440, 370, 329.6, 293.7, 370, 440, 587.3, 440, 370, 329.6, 293.7, 293.7, 329.6, 370, 440, 370, 329.6, 293.7, 246.9, 220, 246.9, 293.7, 370, 329.6, 293.7, 246.9, 220],
      harp: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    porch: {
      name: "Porch Harmonica",
      blurb: "A reed and a rocking chair. Evening on the step.",
      bpm: 68,
      feel: "porch",
      boom: [65.4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49, 0, 0, 0, 0, 0, 0, 0, 58.3, 0, 0, 0, 0, 0, 0, 0],
      chuck: [0, 0, 0, 0, 0, 0, 0, 0, [130.8, 164.8, 196], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [130.8, 164.8, 196], 0, 0, 0, 0, 0, 0, 0],
      fiddle: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      harp: [261.6, 0, 0, 0, 329.6, 0, 0, 0, 392, 0, 0, 0, 329.6, 0, 0, 0, 349.2, 0, 0, 329.6, 0, 0, 293.7, 0, 261.6, 0, 0, 0, 196, 0, 0, 0],
    },
    fair: {
      name: "County Fair Waltz",
      blurb: "Three-step in the sawdust. Pie ribbons and fiddles.",
      bpm: 88,
      feel: "waltz",
      boom: [98, 0, 0, 0, 0, 0, 73.4, 0, 0, 0, 0, 0, 98, 0, 0, 0, 0, 0, 73.4, 0, 0, 87.3, 0, 0],
      chuck: [0, 0, [196, 246.9, 293.7], 0, 0, 0, 0, 0, [174.6, 220, 261.6], 0, 0, 0, 0, 0, [196, 246.9, 293.7], 0, 0, 0, 0, 0, [174.6, 220, 261.6], 0, 0, 0],
      fiddle: [392, 0, 493.9, 0, 587.3, 0, 493.9, 0, 440, 0, 392, 0, 329.6, 0, 392, 0, 440, 0, 493.9, 0, 440, 0, 392, 0],
      harp: [196, 0, 0, 0, 0, 0, 146.8, 0, 0, 0, 0, 0, 196, 0, 0, 0, 0, 0, 174.6, 0, 0, 0, 0, 0],
    },
    jig: {
      name: "Orchard Jig",
      blurb: "Apples in the skirt. A bright little skip down the lane.",
      bpm: 112,
      feel: "reel",
      boom: [87.3, 0, 0, 0, 0, 0, 130.8, 0, 0, 0, 0, 0, 87.3, 0, 0, 0, 0, 0, 116.5, 0, 0, 0, 130.8, 0, 87.3, 0, 0, 0, 0, 0, 65.4, 0],
      chuck: [0, 0, [174.6, 220, 261.6], 0, 0, 0, 0, 0, [174.6, 220, 261.6], 0, 0, 0, 0, 0, [174.6, 220, 261.6], 0, 0, 0, 0, 0, [196, 246.9, 293.7], 0, 0, 0, 0, 0, [174.6, 220, 261.6], 0, 0, 0, [130.8, 164.8, 196], 0],
      fiddle: [349.2, 392, 440, 523.3, 440, 392, 349.2, 293.7, 349.2, 440, 523.3, 587.3, 523.3, 440, 392, 349.2, 392, 440, 523.3, 440, 392, 349.2, 293.7, 261.6, 293.7, 349.2, 392, 440, 392, 349.2, 293.7, 261.6],
      harp: [174.6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 196, 0, 0, 0, 0, 0, 0, 0, 174.6, 0, 0, 0, 0, 0, 130.8, 0],
    },
    lullaby: {
      name: "Hayloft Lullaby",
      blurb: "Moon on the rafters. The loft talks itself to sleep.",
      bpm: 58,
      feel: "porch",
      boom: [61.7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49, 0, 0, 0, 0, 0, 0, 0, 55, 0, 0, 0, 0, 0, 0, 0],
      chuck: [0, 0, 0, 0, 0, 0, 0, 0, [123.5, 155.6, 185], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [110, 146.8, 164.8], 0, 0, 0, 0, 0, 0, 0],
      fiddle: [246.9, 0, 0, 293.7, 0, 0, 329.6, 0, 0, 293.7, 0, 246.9, 0, 0, 220, 0, 246.9, 0, 0, 220, 0, 196, 0, 0, 185, 0, 0, 196, 0, 0, 164.8, 0],
      harp: [123.5, 0, 0, 0, 185, 0, 0, 0, 246.9, 0, 0, 0, 185, 0, 0, 0, 110, 0, 0, 0, 164.8, 0, 0, 0, 196, 0, 0, 0, 164.8, 0, 0, 0],
    },
    mill: {
      name: "Mill Wheel",
      blurb: "The wheel never sleeps. Grain in, flour out, same as kindness.",
      bpm: 90,
      feel: "pick",
      boom: [87.3, 0, 0, 0, 0, 0, 0, 0, 65.4, 0, 0, 0, 0, 0, 0, 0, 87.3, 0, 0, 0, 0, 0, 0, 0, 73.4, 0, 0, 0, 65.4, 0, 0, 0],
      chuck: [0, 0, 0, 0, [174.6, 207.7, 261.6], 0, 0, 0, 0, 0, 0, 0, [174.6, 207.7, 261.6], 0, 0, 0, 0, 0, 0, 0, [174.6, 207.7, 261.6], 0, 0, 0, 0, 0, 0, 0, [146.8, 174.6, 220], 0, 0, 0],
      fiddle: [349.2, 0, 392, 0, 349.2, 0, 293.7, 0, 261.6, 0, 293.7, 0, 349.2, 0, 392, 0, 440, 0, 392, 0, 349.2, 0, 293.7, 0, 261.6, 0, 293.7, 0, 261.6, 0, 220, 0],
      harp: [174.6, 0, 0, 0, 0, 0, 0, 0, 130.8, 0, 0, 0, 0, 0, 0, 0, 174.6, 0, 0, 0, 0, 0, 0, 0, 146.8, 0, 0, 0, 0, 0, 0, 0],
    },
    market: {
      name: "Sunday Market",
      blurb: "Baskets, gossip, and a fiddle by the jam stall.",
      bpm: 94,
      feel: "reel",
      boom: [98, 0, 0, 0, 0, 0, 0, 0, 73.4, 0, 0, 0, 0, 0, 0, 0, 98, 0, 0, 0, 0, 0, 0, 0, 82.4, 0, 0, 0, 73.4, 0, 0, 0],
      chuck: [0, 0, 0, 0, [196, 246.9, 293.7], 0, 0, 0, 0, 0, 0, 0, [196, 246.9, 293.7], 0, 0, 0, 0, 0, 0, 0, [196, 246.9, 293.7], 0, 0, 0, 0, 0, 0, 0, [164.8, 196, 246.9], 0, 0, 0],
      fiddle: [392, 440, 493.9, 392, 587.3, 0, 493.9, 440, 392, 329.6, 392, 440, 493.9, 440, 392, 0, 392, 440, 493.9, 587.3, 493.9, 440, 392, 329.6, 293.7, 329.6, 392, 440, 392, 329.6, 293.7, 246.9],
      harp: [196, 0, 0, 246.9, 0, 0, 293.7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 196, 0, 0, 0, 246.9, 0, 0, 0, 164.8, 0, 0, 0, 196, 0, 0, 0],
    },
  };

  function ensureAudio() {
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) audioCtx = new AC();
    }
    if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
    if (audioCtx && !amb && state.musicOn !== false && !state.muted) startAmb();
  }

  function musicGainVal() {
    const v = state.musicVol == null ? 0.4 : state.musicVol;
    return Math.max(0.0001, Math.min(1, v)) * 0.38;
  }

  function bus() {
    return amb && amb.out ? amb.out : audioCtx.destination;
  }

  function pluck(freq, t, dur, gain) {
    if (!audioCtx || !freq) return;
    const o1 = audioCtx.createOscillator();
    const o2 = audioCtx.createOscillator();
    const f = audioCtx.createBiquadFilter();
    const g = audioCtx.createGain();
    o1.type = "triangle";
    o2.type = "sine";
    o1.frequency.setValueAtTime(freq, t);
    o2.frequency.setValueAtTime(freq * 2.002, t);
    f.type = "lowpass";
    f.frequency.setValueAtTime(1400, t);
    f.frequency.exponentialRampToValueAtTime(420, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o1.connect(f);
    o2.connect(f);
    f.connect(g);
    g.connect(bus());
    o1.start(t);
    o2.start(t);
    o1.stop(t + dur + 0.03);
    o2.stop(t + dur + 0.03);
  }

  function fiddleNote(freq, t, dur, gain) {
    if (!audioCtx || !freq) return;
    const o1 = audioCtx.createOscillator();
    const o2 = audioCtx.createOscillator();
    const lfo = audioCtx.createOscillator();
    const lfoG = audioCtx.createGain();
    const f = audioCtx.createBiquadFilter();
    const g = audioCtx.createGain();
    o1.type = "sine";
    o2.type = "sine";
    o1.frequency.setValueAtTime(freq, t);
    o2.frequency.setValueAtTime(freq * 1.004, t);
    lfo.type = "sine";
    lfo.frequency.value = 5.2;
    lfoG.gain.value = freq * 0.006;
    lfo.connect(lfoG);
    lfoG.connect(o1.frequency);
    f.type = "bandpass";
    f.frequency.value = freq * 2;
    f.Q.value = 1.2;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(gain, t + 0.05);
    g.gain.setValueAtTime(gain * 0.85, t + dur * 0.7);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o1.connect(f);
    o2.connect(f);
    f.connect(g);
    g.connect(bus());
    o1.start(t);
    o2.start(t);
    lfo.start(t);
    o1.stop(t + dur + 0.04);
    o2.stop(t + dur + 0.04);
    lfo.stop(t + dur + 0.04);
  }

  function harmonica(freq, t, dur, gain) {
    if (!audioCtx || !freq) return;
    [1, 1.5, 2].forEach((mul, n) => {
      const o = audioCtx.createOscillator();
      const f = audioCtx.createBiquadFilter();
      const g = audioCtx.createGain();
      o.type = "triangle";
      o.frequency.setValueAtTime(freq * mul, t);
      f.type = "bandpass";
      f.frequency.value = freq * mul;
      f.Q.value = 4;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(gain / (n + 1.4), t + 0.06);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(f);
      f.connect(g);
      g.connect(bus());
      o.start(t);
      o.stop(t + dur + 0.04);
    });
  }

  function boot(t) {
    if (!audioCtx) return;
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(72, t);
    o.frequency.exponentialRampToValueAtTime(38, t + 0.12);
    g.gain.setValueAtTime(0.14, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
    o.connect(g);
    g.connect(bus());
    o.start(t);
    o.stop(t + 0.16);
  }

  function playStep(step, t) {
    const tr = TRACKS[state.track] || TRACKS.chores;
    const len = (tr.boom && tr.boom.length) || 32;
    const i = step % len;
    const beat = 60 / tr.bpm;
    if (tr.boom[i]) {
      pluck(tr.boom[i], t, beat * 0.85, 0.28);
      if (tr.feel !== "porch") boot(t);
    }
    const chuck = tr.chuck[i];
    if (chuck && chuck.length) {
      chuck.forEach((f, n) => pluck(f, t + n * 0.006, beat * 0.28, 0.1));
    }
    if (tr.fiddle[i]) {
      const hold = tr.feel === "reel" ? beat * 0.42 : beat * 0.7;
      fiddleNote(tr.fiddle[i], t, hold, tr.feel === "waltz" ? 0.11 : 0.09);
    }
    if (tr.harp[i]) harmonica(tr.harp[i], t, beat * (tr.feel === "porch" ? 1.6 : 1.1), 0.08);
  }

  function startAmb() {
    if (!audioCtx || amb) return;
    if (state.musicOn === false || state.muted) return;
    const out = audioCtx.createGain();
    out.gain.value = musicGainVal();
    out.connect(audioCtx.destination);
    const id = state.track;
    const mapped = { barn: "reel", hayride: "chores", cider: "porch", rain: "fair" }[id] || id;
    if (!TRACKS[state.track] && TRACKS[mapped]) state.track = mapped;
    const tr = TRACKS[state.track] || TRACKS.chores;
    const stepDur = 60 / tr.bpm / 2;
    amb = { out, step: 0, next: audioCtx.currentTime + 0.08, stepDur, id: 0 };
    const tick = () => {
      if (!amb || !audioCtx) return;
      const now = audioCtx.currentTime;
      while (amb.next < now + 0.2) {
        playStep(amb.step, amb.next);
        amb.step += 1;
        amb.next += amb.stepDur;
      }
      amb.id = setTimeout(tick, 30);
    };
    tick();
  }

  function stopAmb() {
    if (!amb) return;
    clearTimeout(amb.id);
    try { amb.out.disconnect(); } catch (e) {}
    amb = null;
  }

  function restartMusic() {
    stopAmb();
    if (state.musicOn !== false && !state.muted) {
      ensureAudio();
      startAmb();
    }
    paintSettings();
  }

  function setSettingsOpen(open) {
    const pan = $("settings-panel");
    if (!pan) return;
    pan.classList.toggle("hidden", !open);
    if (open) paintSettings();
  }

  function paintSettings() {
    const music = $("set-music");
    const sfx = $("set-sfx");
    const vol = $("set-vol");
    if (music) {
      music.classList.toggle("on", state.musicOn !== false && !state.muted);
      music.setAttribute("aria-pressed", state.musicOn !== false && !state.muted ? "true" : "false");
    }
    if (sfx) {
      sfx.classList.toggle("on", !state.muted);
      sfx.setAttribute("aria-pressed", !state.muted ? "true" : "false");
    }
    if (vol) vol.value = String(Math.round((state.musicVol == null ? 0.4 : state.musicVol) * 100));
    const box = $("set-tracks");
    if (!box) return;
    box.innerHTML = "";
    Object.keys(TRACKS).forEach((id) => {
      const t = TRACKS[id];
      const b = document.createElement("button");
      b.type = "button";
      b.className = "track-btn" + (state.track === id ? " on" : "");
      b.innerHTML = `<strong>${t.name}</strong><span>${t.blurb}</span>`;
      b.addEventListener("click", () => {
        state.track = id;
        state.musicOn = true;
        save();
        restartMusic();
        toast("Now playing: " + t.name);
      });
      box.appendChild(b);
    });
  }

  function tone(freq, dur, type, gain) {
    if (state.muted) return;
    ensureAudio();
    if (!audioCtx) return;
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.value = gain;
    g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
    o.connect(g).connect(audioCtx.destination);
    o.start();
    o.stop(audioCtx.currentTime + dur);
  }

  function showModal(title, body, ok) {
    $("modal-title").textContent = title;
    $("modal-body").textContent = body;
    $("modal-ok").textContent = ok || "Alright";
    const actions = $("modal-actions");
    [...actions.querySelectorAll("button")].forEach((b) => {
      if (b.id !== "modal-ok") b.remove();
    });
    $("modal").classList.remove("hidden");
  }

  function hideModal() {
    $("modal").classList.add("hidden");
    $("modal-portrait").classList.add("hidden");
    $("modal-portrait").innerHTML = "";
  }

  function setDesk(open) {
    document.body.classList.toggle("setup", !!open);
    document.body.classList.toggle("play", !open);
    $("btn-desk").classList.toggle("hidden", !!open);
    if (open) {
      renderCrew();
      renderSeeds();
      renderBarn();
      renderShop();
    }
  }

  function openMail() {
    state.mail.unread = false;
    $("mail-dot").classList.add("hidden");
    $("modal-portrait").classList.add("hidden");
    showModal("A letter on the table", state.mail.body || LETTERS[seasonId()], "Fold it away");
    save();
  }

  function loop() {
    refreshDay();
    plots().forEach((plot, i) => {
      if (plot.unlocked && plot.crop) paintPlot(i);
    });
    tickAnimals();
    tickFarmhand();
    tickHands();
    tickCrew();
    $("day-num").textContent = String(farmDay());
    requestAnimationFrame(loop);
  }

  function setTab(name) {
    document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("on", t.dataset.tab === name));
    ["crew", "garden", "kitchen", "village", "journal", "paragon", "saves"].forEach((id) => {
      $("tab-" + id).classList.toggle("hidden", id !== name);
    });
    if (name === "crew") renderCrew();
    if (name === "garden") {
      renderSeeds();
      renderBarn();
      renderShop();
    }
    if (name === "kitchen") {
      renderPantry();
      renderRecipes();
    }
    if (name === "village") {
      renderVillage();
      renderDecorShop();
    }
    if (name === "journal") renderJournal();
    if (name === "paragon") renderParagon();
    if (name === "saves") {
      renderProfiles();
      renderDebug();
    }
  }

  function onEl(id, ev, fn) {
    const el = $(id);
    if (!el) return;
    el.addEventListener(ev, fn);
  }

  function bind() {
    onEl("btn-collect", "click", gatherAll);
    onEl("btn-sell", "click", sellPantry);
    onEl("btn-run", "click", runFarmOnce);
    onEl("btn-run-desk", "click", runFarmOnce);
    onEl("btn-desk", "click", () => { setSettingsOpen(false); setDesk(true); });
    onEl("btn-close-desk", "click", () => setDesk(false));
    onEl("btn-settings", "click", () => {
      const pan = $("settings-panel");
      const open = pan && pan.classList.contains("hidden");
      if (open) setDesk(false);
      setSettingsOpen(open);
      ensureAudio();
    });
    onEl("set-close", "click", () => setSettingsOpen(false));
    onEl("set-music", "click", () => {
      state.musicOn = state.musicOn === false;
      if (state.musicOn) state.muted = false;
      save();
      restartMusic();
    });
    onEl("set-sfx", "click", () => {
      state.muted = !state.muted;
      if (state.muted) stopAmb();
      else {
        state.musicOn = true;
        restartMusic();
      }
      paintAll();
      save();
    });
    onEl("set-vol", "input", () => {
      const el = $("set-vol");
      state.musicVol = (el ? Number(el.value) : 40) / 100;
      if (amb && amb.out) amb.out.gain.value = musicGainVal();
      save();
    });
    onEl("btn-reset", "click", () => {
      const name = (activeSlot() && activeSlot().name) || "this farm";
      if (confirm("Reset " + name + "? Coins, fields, pantry, crew, stars, the paragon tree, and crop mastery all go back to nothing. Other local farms stay.")) {
        resetActiveFarm();
      }
    });
    onEl("btn-export", "click", exportFarm);
    onEl("import-save", "change", (e) => {
      const file = e.target.files && e.target.files[0];
      importFarm(file);
      e.target.value = "";
    });
    onEl("btn-new-profile", "click", () => {
      createProfile($("profile-name").value);
      $("profile-name").value = "";
    });
    onEl("profile-name", "keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        createProfile($("profile-name").value);
        $("profile-name").value = "";
      }
    });
    onEl("tax-pill", "click", () => {
      $("modal-portrait").classList.add("hidden");
      showModal(
        "Wages and tax",
        `Wages paid to workers: ${fmt(state.books.wages)}\nVillage tax paid: ${fmt(state.books.tax)}\nJobs hired: ${state.books.jobs}\n\nA wage is money you pay a person for their time.\nA tax is a share a place keeps for things everyone uses.\nHand sales pay 1–5% pennies on loot value. Crew sales pay a bare 1–2%.`,
        "Back to the field"
      );
    });
    onEl("btn-mail", "click", openMail);
    onEl("btn-mute", "click", () => {
      state.muted = !state.muted;
      if (state.muted) stopAmb();
      else restartMusic();
      paintAll();
      paintSettings();
      save();
    });
    onEl("modal-ok", "click", hideModal);
    onEl("coin-pill", "click", () => {
      $("modal-portrait").classList.add("hidden");
      showModal(
        "The ledger",
        `In your pocket: ${fmt(state.coins)}\nEarned all told: ${fmt(state.lifetime)}\nWages paid: ${fmt(state.books.wages)}\nVillage tax: ${fmt(state.books.tax)}\nHarvests gathered: ${state.harvested}\nSeason: ${SEASON_LABEL[seasonId()]}\nParagon run ${((state.paragon && state.paragon.runs) || 0) + 1} · unspent stars ${unspentStars()}\nHand sales: 1–5% pennies on loot. Crew: 1–2%.`,
        "Tuck it away"
      );
    });
    onEl("star-pill", "click", () => {
      setDesk(true);
      setTab("paragon");
    });
    document.querySelectorAll(".tab").forEach((t) => {
      t.addEventListener("click", () => setTab(t.dataset.tab));
    });
    document.addEventListener("keydown", (e) => {
      if (e.target.matches("input, textarea")) return;
      const n = Number(e.key);
      if (n >= 1 && n <= 6) {
        const open = CROPS.filter((c) => state.lifetime >= c.unlock);
        if (open[n - 1]) {
          state.selected = open[n - 1].id;
          renderSeeds();
        }
      }
      if (e.code === "Space") {
        e.preventDefault();
        gatherAll();
      }
      if (e.key === "Escape") setDesk(false);
      if (e.key === "Tab" && e.target === document.body) {
        e.preventDefault();
        setDesk(!document.body.classList.contains("setup"));
      }
    });
    document.addEventListener("pointerdown", ensureAudio, { once: true });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) save();
    });
    window.addEventListener("beforeunload", save);
  }

  try {
    load();
    applyOffline();
    if (!state.forage.length) rollForage();
    state.weather = weatherForDay(farmDay());
  } catch (e) {
    showBoot(e);
  }

  loadArt().then(() => {
    try {
      refreshAll();
      bind();
      save();
      requestAnimationFrame(loop);

      if (!state.seenWelcome) {
        state.seenWelcome = true;
        save();
        showModal(
          "Idle-Cozy-Farmer",
          "A sleepy hill farm. The soil works while the kettle sings.\n\nPlant, tend, and sell for pennies. Neighbors ask for small kindnesses. Come back when the beds are ready.",
          "Come in"
        );
      } else if (state.mail && state.mail.unread) {
        showModal("While you rested", "The farm kept its own counsel.\nThere is a letter on the table, and wild things along the fence.", "I'm home");
      }

      setInterval(save, 4000);
    } catch (e) {
      showBoot(e);
    }
  }).catch((e) => showBoot(e));
})();
