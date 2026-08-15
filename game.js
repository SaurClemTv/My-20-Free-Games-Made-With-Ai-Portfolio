(() => {
  "use strict";

  const TILE = 48;
  const VIEW_W = 1280;
  const VIEW_H = 720;
  const T = { AIR: 0, GRASS: 1, DIRT: 2, BRICK: 3, ITEM: 4, USED: 5, WOOD: 6, TUBE: 7, SPRING: 8, WATER: 9, LEAF: 10, STONE: 11, SAND: 12, SPIKE: 13, ICE: 14, MUD: 15, LAVA: 16 };

  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  const overlay = document.getElementById("overlay");
  const hudEl = document.getElementById("hud");
  const hudHearts = document.getElementById("hud-hearts");
  const hudStars = document.getElementById("hud-stars");
  const hintEl = document.getElementById("hint");
  const muteBtn = document.getElementById("btn-mute");
  const guideEl = document.getElementById("guide");
  const hudBoard = document.getElementById("hud-board");
  const hudWorld = document.getElementById("hud-world");
  const guideFab = document.getElementById("btn-guide");
  const viewHub = document.getElementById("view-hub");
  const viewMaps = document.getElementById("view-maps");
  const viewStatus = document.getElementById("view-status");
  const mapGrid = document.getElementById("map-grid");
  const toastEl = document.getElementById("toast");
  const toastKicker = document.getElementById("toast-kicker");
  const toastTitle = document.getElementById("toast-title");
  const toastBody = document.getElementById("toast-body");
  const hudNotes = document.getElementById("hud-notes");
  const journalList = document.getElementById("journal-list");

  const keys = Object.create(null);
  const input = { left: false, right: false, jump: false, jumpPressed: false, shoot: false, mountPressed: false };
  let jumpLatch = false;
  let mountLatch = false;
  let guideOpen = false;
  let guideFrom = null;

  const cam = { x: 0, y: 0, tx: 0, ty: 0, shake: 0 };
  const mouse = { x: VIEW_W * 0.6, y: VIEW_H * 0.5, worldX: 0, worldY: 0, on: false };
  const particles = [];
  const bullets = [];
  const pops = [];

  const GUNS = {
    blaster: { id: "blaster", name: "Star Blaster", speed: 580, cd: 0.16, dmg: 1, life: 1.15, color: "#7ee0d2", core: "#fff6c8" }
  };
  const MAPS = [
    { id: "meadow", name: "Meadow Mile", tag: "World 1 · grassland", locked: false, blurb: "Sunny grass, pollinators, and soil. Learn why meadows stay open and green." },
    { id: "brook", name: "Brook Bend", tag: "World 2 · freshwater", locked: true, blurb: "A living stream. Hop stones, watch the water cycle, and keep your boots dry." },
    { id: "canopy", name: "Canopy Climb", tag: "World 3 · forest", locked: true, blurb: "Climb the layers of a tree. Leaves, light, and the air we breathe." },
    { id: "dune", name: "Dune Drift", tag: "World 4 · desert", locked: true, blurb: "Wind, sand, and water-wise plants. Lean into the gusts — they are teachers." },
    { id: "tide", name: "Tide Pool", tag: "World 5 · shore", locked: true, blurb: "Where ocean meets rock. Tides, salt, and tiny cities in every puddle." },
    { id: "orchard", name: "Night Orchard", tag: "World 6 · night", locked: true, blurb: "Moon, moths, and fruit trees. Learn why darkness is a habitat too." },
    { id: "cave", name: "Cave Glow", tag: "World 7 · underground", locked: true, blurb: "No sun, just stone and drip. How caves grow, and who lives without light." },
    { id: "prairie", name: "Prairie Storm", tag: "World 8 · grassland weather", locked: true, blurb: "Big sky, tall grass, and weather. Lightning, wind, and why prairies need fire." },
    { id: "alpine", name: "Alpine Pass", tag: "World 9 · mountain", locked: true, blurb: "Thin air and old ice. Glaciers, snowpack, and plants that hug the rock." },
    { id: "bog", name: "Bog Lantern", tag: "World 10 · peatland", locked: true, blurb: "Sour water, soft mud, and plants that eat bugs. Peat is a thousand-year sponge." },
    { id: "volcano", name: "Volcano Rim", tag: "World 11 · fire rock", locked: true, blurb: "Lava, ash, and brand-new land. How the inside of Earth writes the surface." },
    { id: "aurora", name: "Aurora Ridge", tag: "World 12 · polar sky", locked: true, blurb: "A magnetic night. Solar wind, Earth’s shield, and lights that are not fire." },
    { id: "savanna", name: "Savanna Crown", tag: "World 13 · grassland trees", locked: true, blurb: "Acacias, grazers, and a sky that never ends. Why a few trees can make a whole kingdom." },
    { id: "mangrove", name: "Mangrove Maze", tag: "World 14 · salt forest", locked: true, blurb: "Trees that drink the sea. Roots like stilts, nurseries for fish, and land that walks into the tide." },
    { id: "cloudforest", name: "Cloud Forest", tag: "World 15 · mountain mist", locked: true, blurb: "A forest inside a cloud. Epiphytes, drip, and leaves that drink the fog." },
    { id: "canyon", name: "Canyon Echo", tag: "World 16 · carved rock", locked: true, blurb: "A river wrote this book of stone. Layers, time, and an echo that measures the walls." },
    { id: "kelp", name: "Kelp Cathedral", tag: "World 17 · sea forest", locked: true, blurb: "Giant algae, not trees. Holdfasts, blades, and a forest that sways with the swell." },
    { id: "tundra", name: "Tundra Thaw", tag: "World 18 · frozen soil", locked: true, blurb: "A short wild summer on frozen ground. Permafrost, burst blooms, and a land that stores winter." },
    { id: "terrace", name: "Terrace Paddy", tag: "World 19 · living farm", locked: true, blurb: "Steps of water and grain. How people and wetlands learned to share a hillside." },
    { id: "crystal", name: "Crystal Grotto", tag: "World 20 · minerals", locked: true, blurb: "A cave of gems. How crystals grow, why they have faces, and what heat and time can build." },
    { id: "steam", name: "Steam Basin", tag: "World 21 · hot water", locked: true, blurb: "Rainbow microbes and boiling pools. Life that likes it hot, and water that never quite sits still." },
    { id: "redwood", name: "Redwood Rise", tag: "World 22 · giant trees", locked: true, blurb: "The tallest living things. Fog for a drink, thick bark, and a forest that remembers centuries." },
    { id: "atoll", name: "Atoll Ring", tag: "World 23 · coral island", locked: true, blurb: "A ring of life around a quiet lagoon. How coral builds land, and why the water stays so clear." },
    { id: "crater", name: "Crater Garden", tag: "World 24 · new ground", locked: true, blurb: "A scar that became a home. Pioneer plants, impact rock, and how life returns first." }
  ];
  const JOURNAL = {
    "meadow-pollen": { world: "Meadow Mile", title: "Pollen hitchhikers", body: "Bees, butterflies, and even the wind move tiny pollen grains from flower to flower. That trip is how many plants make seeds and fruit." },
    "meadow-grass": { world: "Meadow Mile", title: "Grass grows from the bottom", body: "Most meadow grasses grow from the base, not the tip. Grazing or a careful mow does not kill them the way chopping a tree would." },
    "meadow-soil": { world: "Meadow Mile", title: "Soil is alive", body: "A handful of healthy dirt holds worms, fungi, and leftover leaves. They mix air and food into the ground so new plants can root." },
    "meadow-open": { world: "Meadow Mile", title: "Why a meadow is not a forest", body: "Meadows stay sunny because grazing, fire, or wet soil keeps tall trees from taking over. Sun-loving flowers need that open sky." },
    "brook-cycle": { world: "Brook Bend", title: "The water cycle", body: "The sun lifts water as invisible vapor. High up it cools into clouds. Rain (or snow) falls, then streams carry it downhill toward lakes and the sea — and the trip starts again." },
    "brook-erosion": { world: "Brook Bend", title: "Water shapes the land", body: "Moving water picks up sand and pebbles and sets them down later. Over years that carving is called erosion. It bends brooks into curves." },
    "brook-wetland": { world: "Brook Bend", title: "Wetlands are sponges", body: "Muddy banks and reed beds soak up extra rain, slow floods, and filter dirt out of the water. Lots of young fish and bugs start life here." },
    "brook-oxygen": { world: "Brook Bend", title: "Riffles mix air", body: "Where a brook chatters over stones, it folds oxygen into the water. Many stream animals need that dissolved air the same way we need a breath." },
    "canopy-photo": { world: "Canopy Climb", title: "Photosynthesis", body: "Green leaves catch sunlight and use it with air and water to make sugar. A leftover gift is oxygen — the same gas we breathe." },
    "canopy-layers": { world: "Canopy Climb", title: "A forest has floors", body: "Floor, understory, canopy. Each layer gets a different amount of light, so different plants and animals make their homes there." },
    "canopy-rings": { world: "Canopy Climb", title: "Tree rings", body: "In many climates a tree adds a light band (fast spring growth) and a darker band (slower summer wood) each year. Count pairs to guess its age." },
    "canopy-shade": { world: "Canopy Climb", title: "The canopy takes the sun", body: "High leaves grab most of the light. The forest floor stays cooler and dimmer, which is why shade plants have bigger, darker leaves." },
    "dune-wind": { world: "Dune Drift", title: "Wind writes the dunes", body: "Sand grains hop in a bouncing dance called saltation. Wind piles them into dunes that slowly walk downwind, one grain at a time." },
    "dune-water": { world: "Dune Drift", title: "Desert plants save water", body: "Cactus skin is waxy and stems are fat so they can store rain. Many desert plants open their pores at night, when the air is cooler and less water escapes." },
    "dune-heat": { world: "Dune Drift", title: "Deserts can be cold", body: "Dry air does not hold heat well. After a scorching day, nights in a desert often turn chilly. Life here is built for both extremes." },
    "dune-sand": { world: "Dune Drift", title: "Sand is leftover rock", body: "Most sand is tiny bits of quartz and other minerals, worn off bigger rocks by wind and water over thousands of years." },
    "tide-tides": { world: "Tide Pool", title: "The moon pulls the sea", body: "The moon’s gravity tugs Earth’s oceans into bulges. As Earth turns, those bulges slide past the shore — high tide, then low tide, about twice a day." },
    "tide-pools": { world: "Tide Pool", title: "A puddle is a city", body: "When the tide goes out, water stays in rocky bowls. Crabs, snails, anemones, and baby fish wait there until the ocean comes back." },
    "tide-salt": { world: "Tide Pool", title: "Why the sea is salty", body: "Rivers dissolve a little salt from rocks and carry it to the ocean. Water evaporates; the salt stays. Over ages the sea grew salty." },
    "tide-shell": { world: "Tide Pool", title: "A shell is a home", body: "Many mollusks grow a hard calcium shell from minerals in the water. When they die, empty shells become homes for hermit crabs and grit for new sand." },
    "orchard-moon": { world: "Night Orchard", title: "Moonlight is borrowed", body: "The moon does not make its own light. We see it because it reflects the sun. The shape we see is the sunlit half turning toward or away from us." },
    "orchard-night": { world: "Night Orchard", title: "Night shift", body: "Moths, bats, and owls work after dark. Many night flowers are pale and sweet-smelling so pollinators can find them without bright color." },
    "orchard-fruit": { world: "Night Orchard", title: "Fruit is a seed taxi", body: "A fruit is a plant’s way of moving seeds. Animals eat the sweet part and drop the seed somewhere new, often with a little fertilizer." },
    "orchard-stars": { world: "Night Orchard", title: "Stars are suns", body: "Each star is a giant ball of hot gas, like our sun but much farther away. The patterns we name (constellations) are just our view from Earth." },
    "cave-karst": { world: "Cave Glow", title: "Water carves caves", body: "Rain picks up a little acid from soil and slowly dissolves limestone. Over thousands of years those cracks grow into rooms and tunnels." },
    "cave-drip": { world: "Cave Glow", title: "Stalactites hang", body: "Mineral-rich drips leave a ring of stone on the ceiling. That hanging spike is a stalactite. The pile that grows up from the floor is a stalagmite. They can meet and become a column." },
    "cave-dark": { world: "Cave Glow", title: "Life without sunlight", body: "No plants grow in true cave dark. Bats, cave fish, and bugs eat what washes in, or eat each other. Some cave animals have tiny eyes or none at all." },
    "cave-echo": { world: "Cave Glow", title: "Echoes map a room", body: "Sound bounces off stone. Bats send clicks and listen to the bounce — echolocation — to hunt and steer in the dark. We hear a simpler version as an echo." },
    "prairie-sky": { world: "Prairie Storm", title: "Weather is moving air", body: "Sun warms some ground more than other ground. Warm air rises, cooler air slides in, and that flow is wind. Pile on moisture and you get clouds, rain, or a storm." },
    "prairie-lightning": { world: "Prairie Storm", title: "Lightning is a giant spark", body: "Storm clouds rub ice bits together until the cloud is charged. A huge spark jumps to the ground or another cloud. The boom is thunder — air slamming back after the spark heats it." },
    "prairie-fire": { world: "Prairie Storm", title: "Prairies need fire", body: "Many tall-grass prairies stay prairie because fire or grazing knocks back trees. Grass crowns sit underground, so the green comes back. Some seeds even wait for a burn." },
    "prairie-root": { world: "Prairie Storm", title: "Roots deeper than the grass", body: "Prairie grasses can send roots many feet down. That hidden forest of roots holds soil in a storm and stores carbon and water." },
    "alpine-glacier": { world: "Alpine Pass", title: "Glaciers are rivers of ice", body: "Snow that does not melt packs into ice. The ice creeps downhill, carving U-shaped valleys and carrying rocks like a slow conveyor." },
    "alpine-air": { world: "Alpine Pass", title: "Air gets thinner up high", body: "There is less air pressing down on a mountain, so each breath holds less oxygen. Alpine animals have more blood or bigger lungs to cope." },
    "alpine-snow": { world: "Alpine Pass", title: "Snowpack is a water tank", body: "Winter snow stores water on the peaks. Spring melt feeds brooks and towns downhill. A warm winter with less snow can mean a thirsty summer." },
    "alpine-plant": { world: "Alpine Pass", title: "Tiny plants, tough lives", body: "Alpine flowers stay low so the wind does not rip them. Many grow in cushions, bloom fast in a short summer, and hold heat close to the rock." },
    "bog-peat": { world: "Bog Lantern", title: "Peat is unfinished soil", body: "In a bog, plants die faster than they rot because the water is cold and sour. Half-rotted moss piles up as peat — a sponge that can be thousands of years old." },
    "bog-acid": { world: "Bog Lantern", title: "Sour water, few trees", body: "Sphagnum moss makes the water acidic. Few trees like that, so a bog stays open and wet. The moss also holds many times its weight in water." },
    "bog-meat": { world: "Bog Lantern", title: "Some plants hunt", body: "Sundews and pitcher plants live where soil is poor. They trap insects and digest them for nitrogen — a fertilizer the peat will not give them." },
    "bog-carbon": { world: "Bog Lantern", title: "Bogs lock carbon", body: "Because peat does not fully rot, the carbon in those old plants stays underground. Draining a bog lets that carbon leak back into the air." },
    "volcano-lava": { world: "Volcano Rim", title: "Lava is melted rock", body: "Deep Earth is hot enough to melt rock into magma. When it reaches the air it is called lava. It cools into new stone — basalt, pumice, or obsidian." },
    "volcano-ring": { world: "Volcano Rim", title: "A ring of fire", body: "Most volcanoes sit where Earth’s crust plates crunch or pull apart. The Pacific’s rim is crowded with them because those plates are busy." },
    "volcano-soil": { world: "Volcano Rim", title: "Ash can feed a garden", body: "After a blast, volcanic ash weathers into mineral-rich soil. That is why farms often hug old volcanoes — once the land is cool and safe." },
    "volcano-hot": { world: "Volcano Rim", title: "The ground can boil water", body: "Rain that seeps down near magma comes back as hot springs or steam. That geothermal heat is the same energy some towns use to make electricity." },
    "aurora-wind": { world: "Aurora Ridge", title: "The sun blows a wind", body: "The sun flings a stream of charged bits called the solar wind. Earth has a magnetic field that steers most of it around us like a shield." },
    "aurora-lights": { world: "Aurora Ridge", title: "Auroras are not fire", body: "When solar-wind bits sneak in at the poles, they bump gases in the upper air. Oxygen glows green or red; nitrogen can look purple or blue." },
    "aurora-poles": { world: "Aurora Ridge", title: "Why the poles glow", body: "Earth’s magnetic field dives in near the poles, so the solar wind has an easier door there. That is why auroras favor high latitudes." },
    "aurora-night": { world: "Aurora Ridge", title: "Polar night, polar day", body: "Near the poles, winter can be weeks of twilight or dark, and summer can be a sun that never sets. Tilt of Earth’s axis makes that long night and long day." },
    "savanna-tree": { world: "Savanna Crown", title: "A tree that leaks water", body: "Many acacias have tiny leaves that fold in heat so they lose less water. A flat crown also lets light reach the grass, so grazers and trees can share the same sun." },
    "savanna-graze": { world: "Savanna Crown", title: "Grazers keep the lawn", body: "Hooves and hungry mouths knock back seedlings. Without grazers or fire, a savanna can thicken into woodland. The open look is a living bargain." },
    "savanna-termite": { world: "Savanna Crown", title: "Mounds are air conditioners", body: "Termite mounds are chimneys. The insects farm fungus and vent heat so the nest stays livable. Abandoned mounds become mineral-rich hills for plants." },
    "savanna-rain": { world: "Savanna Crown", title: "A wet season, then a wait", body: "Savannas often have one long dry stretch and one rainy burst. Grasses brown, then green overnight. Animals follow the water more than the calendar." },
    "mangrove-salt": { world: "Mangrove Maze", title: "Trees that spit salt", body: "Mangrove roots take in seawater, then the tree dumps extra salt through special leaves or keeps it in old tissue it later sheds. That trick lets a forest stand in the tide." },
    "mangrove-roots": { world: "Mangrove Maze", title: "Stilts in the mud", body: "Prop roots and breathing tubes hold the tree in soft mud and lift its mouth above the water. When the tide drops, those roots look like a maze of knees." },
    "mangrove-nursery": { world: "Mangrove Maze", title: "A nursery for the sea", body: "Baby fish, crabs, and shrimp hide among the roots. Later they swim to reefs and open water. Cut the mangrove and those nurseries vanish." },
    "mangrove-storm": { world: "Mangrove Maze", title: "A living seawall", body: "Tangled roots slow storm waves and trap silt. The forest grows the shoreline instead of letting it wash away. People and birds both use that shield." },
    "cloud-fog": { world: "Cloud Forest", title: "Leaves that drink clouds", body: "In a cloud forest the air is a wet blanket. Leaves and moss comb tiny drops out of fog — a second rain that never needed a storm." },
    "cloud-epiphyte": { world: "Cloud Forest", title: "Gardens in the air", body: "Epiphytes are plants that sit on other plants without stealing food. They catch rain, dust, and fallen leaves in the canopy and make hanging soil." },
    "cloud-drip": { world: "Cloud Forest", title: "Drip is a river", body: "Water that condenses on leaves runs down trunks as stemflow. That drip feeds streams far below and keeps the mountain spongy even in a dry week." },
    "cloud-cool": { world: "Cloud Forest", title: "A coat of mist", body: "Clouds block harsh sun and keep the forest cool. Many frogs, ferns, and orchids need that constant damp. When the cloud lifts for good, those species fade." },
    "canyon-layer": { world: "Canyon Echo", title: "Rock is a calendar", body: "Each colored band is a chapter: sand here, mud there, an old sea, a dune. The youngest layers sit on top unless the land later folded them." },
    "canyon-river": { world: "Canyon Echo", title: "A river cuts down", body: "The water did not fill a ready-made canyon. It sawed downward as the land rose, grain by grain. Side canyons join like branches on a stone tree." },
    "canyon-echo": { world: "Canyon Echo", title: "Echoes measure walls", body: "Sound that hits a cliff comes back. The wait tells you how far the wall is — the same idea bats use, just slower and louder." },
    "canyon-varnish": { world: "Canyon Echo", title: "Desert varnish", body: "A dark skin on canyon rock is not paint. Wind-blown clay and tiny microbes leave a mineral stain that can take centuries to grow." },
    "kelp-not-tree": { world: "Kelp Cathedral", title: "Kelp is not a tree", body: "Giant kelp is brown algae. It has a holdfast instead of roots, a stipe instead of a trunk, and gas bladders that lift the blades toward the light." },
    "kelp-fast": { world: "Kelp Cathedral", title: "The fastest forest", body: "Some giant kelp can grow a foot in a day in cold, rich water. The forest can rise and vanish with the seasons, unlike a wood that takes decades." },
    "kelp-otter": { world: "Kelp Cathedral", title: "Otters keep the woods", body: "Sea otters eat urchins. Urchins eat kelp. When otters are gone, urchins can mow a forest into a bare urchin barren. One hunter holds up a whole habitat." },
    "kelp-light": { world: "Kelp Cathedral", title: "Green light under the sea", body: "Water swallows red first. Deeper down, the world looks blue-green. Kelp pigments are tuned to catch that leftover light and still make sugar." },
    "tundra-perma": { world: "Tundra Thaw", title: "Soil that stays frozen", body: "Permafrost is ground that stays frozen for years. Only a thin top thaws in summer. That lid keeps old plants from rotting and holds a huge store of carbon." },
    "tundra-burst": { world: "Tundra Thaw", title: "A summer in a hurry", body: "The growing season can be weeks. Flowers bloom all at once, insects hatch in a cloud, and birds race to raise chicks before the freeze returns." },
    "tundra-low": { world: "Tundra Thaw", title: "No tall trees", body: "Wind, ice, and a frozen floor stop deep roots. Tundra plants hug the ground as cushions and mats. A shrub the size of your hand may be decades old." },
    "tundra-thaw": { world: "Tundra Thaw", title: "When the freezer fails", body: "If permafrost thaws too deep, the ground slumps, lakes drain or grow, and locked carbon can leak as gas. The land’s shape itself starts to move." },
    "terrace-step": { world: "Terrace Paddy", title: "A hillside of shelves", body: "Farmers cut steps so water can sit on a slope instead of racing off. Each shelf is a tiny wetland that grows grain and stops the soil from leaving." },
    "terrace-water": { world: "Terrace Paddy", title: "Shared water, shared rules", body: "Paddies need the right depth at the right time. Villages often built canals and turns so every field got a drink. The farm is also a water machine." },
    "terrace-mud": { world: "Terrace Paddy", title: "Mud that feeds", body: "Flooded soil is low in air, so special microbes help rice get nitrogen. The mud looks sleepy, but it is a busy kitchen for the grain." },
    "terrace-bird": { world: "Terrace Paddy", title: "A farm that is a wetland", body: "Frogs, fish, and wading birds use paddies like marshes. A well-kept terrace can feed people and still be a stop on a migration." },
    "crystal-grow": { world: "Crystal Grotto", title: "Crystals grow, they are not carved", body: "A crystal is atoms lining up again and again. Given space, time, and a rich fluid, it builds flat faces because that is the cheapest way for those atoms to sit." },
    "crystal-quartz": { world: "Crystal Grotto", title: "Quartz is everywhere", body: "Silicon and oxygen are common in Earth’s crust. Together they make quartz — the clear or milky points in many geodes and the grit in a lot of sand." },
    "crystal-color": { world: "Crystal Grotto", title: "Color is a guest", body: "Pure crystals can be clear. A pinch of another metal — iron, copper, manganese — tints them purple, green, or gold. The guest atom is the paint." },
    "crystal-geode": { world: "Crystal Grotto", title: "A hollow rock, a secret room", body: "A geode starts as a bubble in lava or a pocket in limestone. Mineral water seeps in and grows crystals inward, so the treasure hides until the rock is opened." },
    "steam-thermo": { world: "Steam Basin", title: "Life that likes it hot", body: "Thermophiles are microbes built for boiling-adjacent water. Their proteins do not unwind in heat. Some of their tools are used in labs to copy DNA." },
    "steam-color": { world: "Steam Basin", title: "Rainbows that are alive", body: "The rings of orange, green, and yellow around a hot spring are mats of different microbes, each parked at the temperature it can stand." },
    "steam-water": { world: "Steam Basin", title: "Rain that comes back cooked", body: "Water seeps down, meets hot rock, and returns as a spring or geyser. Dissolved minerals paint the crust white, rust, or mustard." },
    "steam-care": { world: "Steam Basin", title: "Thin crust, real heat", body: "The pretty rim can be a weak lid over scalding water. Rangers teach a simple rule: stay on the path. The habitat is fragile and the water is not a bath." },
    "redwood-tall": { world: "Redwood Rise", title: "How a tree gets that tall", body: "Redwoods lift water in a continuous column, helped by fog that condenses on needles. The top of a giant may drink cloud more than groundwater." },
    "redwood-bark": { world: "Redwood Rise", title: "Bark like a fire coat", body: "Thick, spongy bark does not burn easily. After a ground fire, the giant often still stands, and the open floor lets its seedlings find light." },
    "redwood-age": { world: "Redwood Rise", title: "A living archive", body: "A ring is a year. Count inward and you can read droughts and wet years. Some coast redwoods have been recording weather for more than a thousand summers." },
    "redwood-fog": { world: "Redwood Rise", title: "Fog is a watering can", body: "Summer on the coast can be rainless. Night and morning fog drip from the crown and soak the soil. Lose the fog, and the giants get thirsty." },
    "atoll-ring": { world: "Atoll Ring", title: "A ring around a ghost", body: "An atoll often starts as a reef hugging a volcanic island. The island sinks or wears away. The coral keeps growing upward and leaves a ring around a lagoon." },
    "atoll-coral": { world: "Atoll Ring", title: "Animals that build rock", body: "Coral polyps are tiny animals with stinging arms. They host algae that feed them sugar. Together they lay down limestone and make the only rock that is also a city." },
    "atoll-clear": { world: "Atoll Ring", title: "Why the water is so clear", body: "Lagoon water is often low in plankton food. That is why you can see the sand. The reef’s richness is in the structure, not in a green soup." },
    "atoll-bleach": { world: "Atoll Ring", title: "When coral turns white", body: "If water stays too warm, polyps evict their algae and look bleached. They can recover if the heat passes. If it does not, the city starves." },
    "crater-hit": { world: "Crater Garden", title: "A visitor from space", body: "Some craters are from asteroids or comets. The blast flips rock, melts grains, and leaves a bowl. Other craters are volcanic. Rangers read the rock to tell which." },
    "crater-first": { world: "Crater Garden", title: "Who arrives first", body: "After a blast, lichens and tough herbs show up before trees. They break rock, catch dust, and write the first thin soil. Succession is a queue, not a race." },
    "crater-lake": { world: "Crater Garden", title: "A bowl that holds a lake", body: "If the floor is sealed, rain makes a crater lake. With no river in or out, the water’s chemistry can turn strange — salty, sour, or crystal clear." },
    "crater-life": { world: "Crater Garden", title: "A scar can be a refuge", body: "Steep walls keep some animals in and some troubles out. Isolated crater floors sometimes grow plants or insects found nowhere else." }
  };
  let currentMap = "meadow";
  let currentGun = "blaster";
  let progress = { cleared: {}, journal: {} };
  let toastT = 0;

  let assets = {};
  let tileset = {};
  let world = null;
  let player = null;
  let state = "boot";
  let muted = false;
  let audio = null;
  let hintT = 0;
  let last = 0;
  let acc = 0;
  let time = 0;
  let winT = 0;

  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function aabb(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }
  function rand(a, b) { return a + Math.random() * (b - a); }

  // --- input ---
  const jumpKeys = new Set(["Space", "ArrowUp", "KeyW"]);
  const leftKeys = new Set(["ArrowLeft", "KeyA"]);
  const rightKeys = new Set(["ArrowRight", "KeyD"]);
  const shootKeys = new Set(["KeyJ", "KeyK", "KeyX", "KeyZ"]);

  function syncInput() {
    input.left = !!(keys.ArrowLeft || keys.KeyA);
    input.right = !!(keys.ArrowRight || keys.KeyD);
    const jumpHeld = !!(keys.Space || keys.ArrowUp || keys.KeyW);
    input.jumpPressed = jumpHeld && !jumpLatch;
    jumpLatch = jumpHeld;
    input.jump = jumpHeld;
    input.shoot = !!(keys.KeyJ || keys.KeyK || keys.KeyX || keys.KeyZ || keys.Mouse);
    const mountHeld = !!(keys.KeyS || keys.ArrowDown);
    input.mountPressed = mountHeld && !mountLatch;
    mountLatch = mountHeld;
  }

  window.addEventListener("keydown", (e) => {
    keys[e.code] = true;
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) e.preventDefault();
    if (e.code === "Escape" && guideOpen) { e.preventDefault(); closeGuide(); unlockAudio(); return; }
    if (e.code === "KeyG" && !guideOpen) { e.preventDefault(); openGuide(); unlockAudio(); return; }
    if (e.code === "Escape" && state === "play") pauseGame();
    else if (e.code === "Escape" && state === "pause") resumeGame();
    if ((e.code === "KeyR") && (state === "dead" || state === "win") && !guideOpen) startRun(currentMap);
    if (e.code === "Enter" && state === "pause" && !guideOpen) { e.preventDefault(); resumeGame(); }
    if (e.code === "Enter" && (state === "hub" || state === "maps") && !guideOpen) {
      e.preventDefault();
      startRun(nextPlayMap());
    }
    if ((e.code === "Enter" || e.code === "Space") && (state === "dead" || state === "win") && !guideOpen) {
      e.preventDefault();
      startRun(currentMap);
    }
    if (e.code === "Escape" && (state === "maps" || state === "dead" || state === "win") && !guideOpen) {
      e.preventDefault();
      showHub();
    }
    unlockAudio();
  });
  window.addEventListener("keyup", (e) => { keys[e.code] = false; });

  function canvasPoint(e) {
    const r = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - r.left) * (VIEW_W / r.width),
      y: (e.clientY - r.top) * (VIEW_H / r.height)
    };
  }
  function setMouse(e, on) {
    const p = canvasPoint(e);
    mouse.x = p.x;
    mouse.y = p.y;
    mouse.on = on;
    mouse.worldX = mouse.x + cam.x;
    mouse.worldY = mouse.y + cam.y;
  }
  canvas.addEventListener("mousemove", (e) => setMouse(e, true));
  canvas.addEventListener("mouseenter", (e) => setMouse(e, true));
  canvas.addEventListener("mouseleave", () => { mouse.on = false; });
  canvas.addEventListener("mousedown", (e) => { setMouse(e, true); keys.Mouse = true; unlockAudio(); canvas.focus(); });
  window.addEventListener("mouseup", () => { keys.Mouse = false; });
  canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    unlockAudio();
    const t = e.changedTouches[0];
    const r = canvas.getBoundingClientRect();
    const x = (t.clientX - r.left) / r.width;
    const y = (t.clientY - r.top) / r.height;
    if (y < 0.55) { keys.Space = true; }
    else if (x < 0.33) keys.KeyA = true;
    else if (x > 0.66) keys.KeyD = true;
    else keys.KeyJ = true;
  }, { passive: false });
  canvas.addEventListener("touchend", () => {
    keys.Space = keys.KeyA = keys.KeyD = keys.KeyJ = false;
  });

  muteBtn.addEventListener("click", () => {
    muted = !muted;
    muteBtn.classList.toggle("muted", muted);
    muteBtn.textContent = muted ? "♫" : "♪";
    if (audio && muted) audio.stopMusic();
    else if (audio && !muted && state === "play") audio.startMusic();
  });

  // --- audio ---
  function unlockAudio() {
    if (!audio) audio = makeAudio();
    audio.unlock();
  }

  function makeAudio() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return { unlock() {}, beep() {}, startMusic() {}, stopMusic() {} };
    const ac = new AC();
    let musicTimer = null;
    let step = 0;

    function envGain(t, dur, peak, type) {
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.type = type;
      o.connect(g); g.connect(ac.destination);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(peak, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.start(t); o.stop(t + dur + 0.02);
      return o;
    }

    const api = {
      unlock() { if (ac.state === "suspended") ac.resume(); },
      beep(kind) {
        if (muted) return;
        const t = ac.currentTime;
        if (kind === "jump") {
          const o = envGain(t, 0.14, 0.08, "square");
          o.frequency.setValueAtTime(420, t);
          o.frequency.exponentialRampToValueAtTime(680, t + 0.12);
        } else if (kind === "djump") {
          const o = envGain(t, 0.12, 0.07, "square");
          o.frequency.setValueAtTime(560, t);
          o.frequency.exponentialRampToValueAtTime(920, t + 0.1);
        } else if (kind === "land") {
          const o = envGain(t, 0.08, 0.05, "triangle");
          o.frequency.value = 140;
        } else if (kind === "shoot") {
          const o = envGain(t, 0.09, 0.06, "square");
          o.frequency.setValueAtTime(880, t);
          o.frequency.exponentialRampToValueAtTime(240, t + 0.08);
        } else if (kind === "star") {
          const o = envGain(t, 0.18, 0.07, "sine");
          o.frequency.setValueAtTime(880, t);
          o.frequency.exponentialRampToValueAtTime(1320, t + 0.16);
        } else if (kind === "stomp") {
          const o = envGain(t, 0.12, 0.08, "triangle");
          o.frequency.setValueAtTime(220, t);
          o.frequency.exponentialRampToValueAtTime(90, t + 0.1);
        } else if (kind === "hurt") {
          const o = envGain(t, 0.22, 0.08, "sawtooth");
          o.frequency.setValueAtTime(300, t);
          o.frequency.exponentialRampToValueAtTime(80, t + 0.2);
        } else if (kind === "break") {
          const o = envGain(t, 0.1, 0.06, "square");
          o.frequency.value = 180;
        } else if (kind === "spring") {
          const o = envGain(t, 0.2, 0.08, "square");
          o.frequency.setValueAtTime(300, t);
          o.frequency.exponentialRampToValueAtTime(900, t + 0.18);
        } else if (kind === "win") {
          [523, 659, 784, 1046].forEach((f, i) => {
            const o = envGain(t + i * 0.12, 0.28, 0.07, "triangle");
            o.frequency.value = f;
          });
        } else if (kind === "skate") {
          const o = envGain(t, 0.16, 0.06, "triangle");
          o.frequency.setValueAtTime(180, t);
          o.frequency.exponentialRampToValueAtTime(320, t + 0.14);
        } else if (kind === "glide") {
          const o = envGain(t, 0.1, 0.03, "sine");
          o.frequency.value = 640;
        }
      },
      startMusic() {
        if (muted || musicTimer) return;
        const scale = [262, 294, 330, 392, 440, 523, 392, 330];
        const bass = [131, 165, 196, 165];
        musicTimer = setInterval(() => {
          if (muted || ac.state !== "running") return;
          const t = ac.currentTime;
          const o = envGain(t, 0.22, 0.028, "triangle");
          o.frequency.value = scale[step % scale.length];
          if (step % 2 === 0) {
            const b = envGain(t, 0.28, 0.02, "sine");
            b.frequency.value = bass[(step / 2 | 0) % bass.length];
          }
          step++;
        }, 280);
      },
      stopMusic() {
        if (musicTimer) clearInterval(musicTimer);
        musicTimer = null;
      }
    };
    return api;
  }

  function sfx(k) { if (audio) audio.beep(k); }

  // --- images ---
  function loadImage(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  function makeCanvas(w, h, draw) {
    const c = document.createElement("canvas");
    c.width = w; c.height = h;
    draw(c.getContext("2d"), w, h);
    return c;
  }

  function buildTileset() {
    const S = TILE;
    function dirtFill(g, x, y, w, h, seed) {
      g.fillStyle = "#b57a45";
      g.fillRect(x, y, w, h);
      g.fillStyle = "#9a6236";
      for (let i = 0; i < 14; i++) {
        const px = x + ((seed * 17 + i * 23) % Math.max(1, w - 4));
        const py = y + ((seed * 11 + i * 19) % Math.max(1, h - 4));
        g.beginPath(); g.arc(px, py, 1.6, 0, Math.PI * 2); g.fill();
      }
      g.fillStyle = "#c9925c";
      for (let i = 0; i < 8; i++) {
        const px = x + ((seed * 13 + i * 29) % Math.max(1, w - 3));
        const py = y + ((seed * 7 + i * 31) % Math.max(1, h - 3));
        g.fillRect(px, py, 2, 2);
      }
    }

    tileset.grass = makeCanvas(S, S, (g) => {
      dirtFill(g, 0, 14, S, S - 14, 3);
      g.fillStyle = "#5aaa3e";
      g.fillRect(0, 8, S, 10);
      g.fillStyle = "#7ed957";
      g.beginPath();
      g.moveTo(0, 14);
      for (let x = 0; x <= S; x += 6) g.quadraticCurveTo(x + 3, 2 + (x % 12 === 0 ? 2 : 0), x + 6, 14);
      g.lineTo(S, 16); g.lineTo(0, 16); g.fill();
      g.fillStyle = "#98e86a";
      g.fillRect(0, 10, S, 3);
    });

    tileset.dirt = makeCanvas(S, S, (g) => dirtFill(g, 0, 0, S, S, 8));

    tileset.brick = makeCanvas(S, S, (g) => {
      g.fillStyle = "#6b3a28";
      g.fillRect(0, 0, S, S);
      g.fillStyle = "#d07a48";
      g.fillRect(2, 2, S - 4, S - 4);
      g.strokeStyle = "#f0c09a";
      g.lineWidth = 2;
      g.strokeRect(4, 4, S - 8, S - 8);
      g.fillStyle = "#b55e36";
      g.fillRect(6, 22, S - 12, 3);
      g.fillRect(18, 8, 3, S - 16);
    });

    tileset.item = makeCanvas(S, S, (g) => {
      g.fillStyle = "#8a5a12";
      g.fillRect(0, 0, S, S);
      const grd = g.createLinearGradient(0, 0, S, S);
      grd.addColorStop(0, "#ffe27a");
      grd.addColorStop(1, "#e0a22a");
      g.fillStyle = grd;
      g.fillRect(3, 3, S - 6, S - 6);
      g.fillStyle = "#fff6c8";
      g.beginPath();
      const cx = S / 2, cy = S / 2, r = 11;
      for (let i = 0; i < 5; i++) {
        const a = -Math.PI / 2 + i * Math.PI * 2 / 5;
        const b = a + Math.PI / 5;
        g.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
        g.lineTo(cx + Math.cos(b) * r * 0.45, cy + Math.sin(b) * r * 0.45);
      }
      g.closePath(); g.fill();
    });

    tileset.used = makeCanvas(S, S, (g) => {
      g.fillStyle = "#6d5340";
      g.fillRect(0, 0, S, S);
      g.fillStyle = "#a88868";
      g.fillRect(3, 3, S - 6, S - 6);
    });

    tileset.wood = makeCanvas(S, S, (g) => {
      g.clearRect(0, 0, S, S);
      g.fillStyle = "#8b5a2b";
      g.fillRect(0, 10, S, 22);
      g.fillStyle = "#d4a05a";
      g.fillRect(0, 8, S, 16);
      g.fillStyle = "#7ed957";
      g.fillRect(0, 6, S, 5);
      g.strokeStyle = "#b47a38";
      g.beginPath(); g.moveTo(0, 18); g.lineTo(S, 18); g.stroke();
    });

    tileset.tube = makeCanvas(S, S, (g) => {
      g.fillStyle = "#c45c32";
      g.fillRect(6, 0, S - 12, S);
      g.fillStyle = "#e88955";
      g.fillRect(10, 0, 10, S);
      g.fillStyle = "#9a3e20";
      g.fillRect(S - 14, 0, 6, S);
    });

    tileset.tubeTop = makeCanvas(S, S, (g) => {
      g.fillStyle = "#c45c32";
      g.fillRect(2, 10, S - 4, S - 10);
      g.fillStyle = "#e88955";
      g.fillRect(2, 4, S - 4, 16);
      g.fillStyle = "#5aaa3e";
      g.fillRect(2, 2, S - 4, 6);
    });

    tileset.spring = makeCanvas(S, S, (g) => {
      g.fillStyle = "#f3e2c0";
      g.fillRect(18, 22, 12, 24);
      g.fillStyle = "#ff8fb3";
      g.beginPath(); g.ellipse(24, 18, 20, 14, 0, 0, Math.PI * 2); g.fill();
      g.fillStyle = "#fff0c8";
      g.beginPath(); g.arc(16, 14, 4, 0, Math.PI * 2); g.fill();
      g.beginPath(); g.arc(28, 12, 3, 0, Math.PI * 2); g.fill();
    });

    tileset.water = makeCanvas(S, S, (g) => {
      g.fillStyle = "#3d8ec9";
      g.fillRect(0, 0, S, S);
      g.fillStyle = "#5eb0e0";
      g.fillRect(0, 0, S, 10);
      g.fillStyle = "rgba(255,255,255,0.35)";
      g.fillRect(4, 16, 18, 3);
      g.fillRect(22, 28, 16, 3);
    });

    tileset.leaf = makeCanvas(S, S, (g) => {
      g.clearRect(0, 0, S, S);
      g.fillStyle = "#3f7a32";
      g.beginPath(); g.ellipse(24, 22, 22, 10, 0, 0, Math.PI * 2); g.fill();
      g.fillStyle = "#7ed957";
      g.beginPath(); g.ellipse(24, 18, 20, 8, 0, 0, Math.PI * 2); g.fill();
    });

    tileset.stone = makeCanvas(S, S, (g) => {
      g.fillStyle = "#6d7278";
      g.fillRect(0, 0, S, S);
      g.fillStyle = "#9aa1a8";
      g.fillRect(2, 2, S - 4, S - 4);
      g.fillStyle = "#5a6066";
      g.fillRect(8, 20, 14, 8);
      g.fillRect(26, 10, 12, 10);
    });

    tileset.sand = makeCanvas(S, S, (g) => {
      g.fillStyle = "#e0c07a";
      g.fillRect(0, 0, S, S);
      g.fillStyle = "#c9a45a";
      for (let i = 0; i < 16; i++) g.fillRect((i * 11) % 44, (i * 17) % 44, 3, 2);
      g.fillStyle = "#f0d89a";
      g.fillRect(0, 0, S, 6);
    });

    tileset.spike = makeCanvas(S, S, (g) => {
      g.clearRect(0, 0, S, S);
      g.fillStyle = "#3f7a32";
      g.fillRect(20, 22, 8, 26);
      g.fillStyle = "#7ed957";
      g.beginPath();
      g.moveTo(24, 2); g.lineTo(36, 28); g.lineTo(12, 28); g.fill();
      g.fillStyle = "#c45c32";
      g.beginPath(); g.moveTo(8, 18); g.lineTo(18, 26); g.lineTo(8, 26); g.fill();
      g.beginPath(); g.moveTo(40, 18); g.lineTo(30, 26); g.lineTo(40, 26); g.fill();
    });

    tileset.ice = makeCanvas(S, S, (g) => {
      g.fillStyle = "#b8dcf0";
      g.fillRect(0, 0, S, S);
      g.fillStyle = "#e8f6ff";
      g.fillRect(0, 0, S, 8);
      g.fillStyle = "rgba(255,255,255,0.55)";
      g.fillRect(6, 16, 14, 3);
      g.fillRect(22, 28, 18, 2);
    });

    tileset.mud = makeCanvas(S, S, (g) => {
      g.fillStyle = "#5a4030";
      g.fillRect(0, 0, S, S);
      g.fillStyle = "#7a5840";
      g.fillRect(0, 0, S, 10);
      g.fillStyle = "#3d2a22";
      g.fillRect(8, 18, 12, 6);
      g.fillRect(26, 28, 10, 5);
    });

    tileset.lava = makeCanvas(S, S, (g) => {
      g.fillStyle = "#c43c14";
      g.fillRect(0, 0, S, S);
      g.fillStyle = "#f0a020";
      g.fillRect(0, 0, S, 8);
      g.fillStyle = "#ffee88";
      g.fillRect(10, 16, 16, 4);
      g.fillRect(24, 30, 12, 3);
    });
  }

  async function loadAssets() {
    const pack = {
      idle: "assets/player/idle.png",
      walk1: "assets/player/walk1.png",
      walk2: "assets/player/walk2.png",
      jump: "assets/player/jump.png",
      glide: "assets/player/glide.png",
      shoot: "assets/player/shoot.png",
      sprout: "assets/enemies/sprout.png",
      sproutWalk: "assets/enemies/sprout-walk.png",
      puff: "assets/enemies/puff.png",
      puffFlap: "assets/enemies/puff-flap.png",
      star: "assets/ui/star.png",
      heart: "assets/ui/heart.png",
      sky: "assets/bg/sky.jpg",
      hills: "assets/bg/hills.jpg",
      brickTex: "assets/tiles/brick.jpg",
      meadowSky: "assets/bg/meadow-sky.jpg",
      meadowSkyA: "assets/bg/meadow-sky-a.jpg",
      meadowSkyB: "assets/bg/meadow-sky-b.jpg",
      meadowSkyC: "assets/bg/meadow-sky-c.jpg",
      brookSky: "assets/bg/brook-sky.jpg",
      brookSkyA: "assets/bg/brook-sky-a.jpg",
      brookSkyB: "assets/bg/brook-sky-b.jpg",
      brookSkyC: "assets/bg/brook-sky-c.jpg",
      canopySky: "assets/bg/canopy-sky.jpg",
      canopySkyA: "assets/bg/canopy-sky-a.jpg",
      canopySkyB: "assets/bg/canopy-sky-b.jpg",
      canopySkyC: "assets/bg/canopy-sky-c.jpg",
      duneSky: "assets/bg/dune-sky.jpg",
      duneSkyA: "assets/bg/dune-sky-a.jpg",
      duneSkyB: "assets/bg/dune-sky-b.jpg",
      duneSkyC: "assets/bg/dune-sky-c.jpg",
      tideSky: "assets/bg/tide-sky.jpg",
      tideSkyA: "assets/bg/tide-sky-a.jpg",
      tideSkyB: "assets/bg/tide-sky-b.jpg",
      tideSkyC: "assets/bg/tide-sky-c.jpg",
      orchardSky: "assets/bg/orchard-sky.jpg",
      caveSky: "assets/bg/cave-sky.jpg",
      prairieSky: "assets/bg/prairie-sky.jpg",
      alpineSky: "assets/bg/alpine-sky.jpg",
      bogSky: "assets/bg/bog-sky.jpg",
      volcanoSky: "assets/bg/volcano-sky.jpg",
      auroraSky: "assets/bg/aurora-sky.jpg",
      meadowHill1: "assets/props/meadow-hill1.png",
      meadowHill2: "assets/props/meadow-hill2.png",
      meadowHill3: "assets/props/meadow-hill3.png",
      meadowHill4: "assets/props/meadow-hill4.png",
      brookHill1: "assets/props/brook-hill-a.png",
      brookHill2: "assets/props/brook-hill-b.png",
      brookHill3: "assets/props/brook-hill-c.png",
      canopyHill1: "assets/props/canopy-hill-a.png",
      canopyHill2: "assets/props/canopy-hill-b.png",
      canopyHill3: "assets/props/canopy-hill-c.png",
      duneHill1: "assets/props/dune-hill-a.png",
      duneHill2: "assets/props/dune-hill-b.png",
      duneHill3: "assets/props/dune-hill-c.png",
      tideHill1: "assets/props/tide-hill-a.png",
      tideHill2: "assets/props/tide-hill-b.png",
      tideHill3: "assets/props/tide-hill-c.png",
      meadowTree: "assets/props/meadow-tree.png",
      meadowTree2: "assets/props/meadow-tree2.png",
      meadowTree3: "assets/props/meadow-tree3.png",
      meadowBush: "assets/props/meadow-bush.png",
      meadowBush2: "assets/props/meadow-bush2.png",
      meadowFlower1: "assets/props/meadow-flower1.png",
      meadowFlower2: "assets/props/meadow-flower2.png",
      meadowCloud1: "assets/props/meadow-cloud1.png",
      meadowCloud2: "assets/props/meadow-cloud2.png",
      meadowCloud3: "assets/props/meadow-cloud3.png",
      brookReeds: "assets/props/brook-reeds.png",
      brookReeds2: "assets/props/brook-reeds2.png",
      brookWillow: "assets/props/brook-willow.png",
      brookRock: "assets/props/brook-rock.png",
      brookLily: "assets/props/brook-lily.png",
      brookCloud1: "assets/props/brook-cloud1.png",
      canopyVines: "assets/props/canopy-vines.png",
      canopyVines2: "assets/props/canopy-vines2.png",
      canopyTrunk: "assets/props/canopy-trunk.png",
      canopyMush: "assets/props/canopy-mush.png",
      canopyLeaf: "assets/props/canopy-leaf.png",
      duneRock: "assets/props/dune-rock.png",
      duneRock2: "assets/props/dune-rock2.png",
      duneCactus: "assets/props/dune-cactus.png",
      duneCactus2: "assets/props/dune-cactus2.png",
      duneBush: "assets/props/dune-bush.png",
      tideRock: "assets/props/tide-rock.png",
      tideRock2: "assets/props/tide-rock2.png",
      tideDrift: "assets/props/tide-drift.png",
      tideKelp: "assets/props/tide-kelp.png",
      tideShell: "assets/props/tide-shell.png",
      meadowGround: "assets/tiles/meadow-ground.jpg",
      meadowFill: "assets/tiles/meadow-fill.jpg",
      meadowGrassTop: "assets/tiles/meadow-grass-top.png",
      brookGround: "assets/tiles/brook-ground.jpg",
      canopyGround: "assets/tiles/canopy-ground.jpg",
      duneGround: "assets/tiles/dune-ground.jpg",
      duneFill: "assets/tiles/dune-fill.jpg",
      tideGround: "assets/tiles/tide-ground.jpg",
      waterStrip: "assets/tiles/water-strip.jpg",
      woodStrip: "assets/tiles/wood-strip.jpg",
      leafStrip: "assets/tiles/leaf-strip.jpg",
      mite: "assets/props/mite.png",
      drip: "assets/props/drip.png",
      hopper: "assets/props/hopper.png",
      crab: "assets/props/crab.png",
      sign: "assets/props/sign.png",
      itemBlock: "assets/props/item-block.png",
      savannaSky: "assets/bg/savanna-sky.jpg",
      mangroveSky: "assets/bg/mangrove-sky.jpg",
      cloudforestSky: "assets/bg/cloudforest-sky.jpg",
      canyonSky: "assets/bg/canyon-sky.jpg",
      kelpSky: "assets/bg/kelp-sky.jpg",
      tundraSky: "assets/bg/tundra-sky.jpg",
      terraceSky: "assets/bg/terrace-sky.jpg",
      crystalSky: "assets/bg/crystal-sky.jpg",
      steamSky: "assets/bg/steam-sky.jpg",
      redwoodSky: "assets/bg/redwood-sky.jpg",
      atollSky: "assets/bg/atoll-sky.jpg",
      craterSky: "assets/bg/crater-sky.jpg",
      savannaHill: "assets/props/savanna-hill.png",
      mangroveHill: "assets/props/mangrove-hill.png",
      cloudforestHill: "assets/props/cloudforest-hill.png",
      canyonHill: "assets/props/canyon-hill.png",
      kelpHill: "assets/props/kelp-hill.png",
      tundraHill: "assets/props/tundra-hill.png",
      terraceHill: "assets/props/terrace-hill.png",
      crystalHill: "assets/props/crystal-hill.png",
      steamHill: "assets/props/steam-hill.png",
      redwoodHill: "assets/props/redwood-hill.png",
      atollHill: "assets/props/atoll-hill.png",
      craterHill: "assets/props/crater-hill.png",
      savannaTree: "assets/props/savanna-tree.png",
      savannaBush: "assets/props/savanna-bush.png",
      mangroveRoot: "assets/props/mangrove-root.png",
      cloudFern: "assets/props/cloud-fern.png",
      canyonSpire: "assets/props/canyon-spire.png",
      kelpBlade: "assets/props/kelp-blade.png",
      tundraShrub: "assets/props/tundra-shrub.png",
      tundraRock: "assets/props/tundra-rock.png",
      terraceRice: "assets/props/terrace-rice.png",
      crystalSpire: "assets/props/crystal-spire.png",
      crystalCluster: "assets/props/crystal-cluster.png",
      steamVent: "assets/props/steam-vent.png",
      redwoodTrunk: "assets/props/redwood-trunk.png",
      atollPalm: "assets/props/atoll-palm.png",
      craterRock: "assets/props/crater-rock.png",
      craterPlant: "assets/props/crater-plant.png"
    };
    const entries = await Promise.all(Object.entries(pack).map(async ([k, src]) => {
      return [k, await loadImage(src)];
    }));
    assets = Object.fromEntries(entries);
    buildTileset();
  }

  // --- world ---
  function tileAt(tx, ty) {
    if (!world || ty < 0 || ty >= world.h || tx < 0 || tx >= world.w) return T.AIR;
    return world.tiles[ty][tx];
  }
  function setTile(tx, ty, v) {
    if (ty < 0 || tx < 0 || tx >= world.w || ty >= world.h) return;
    world.tiles[ty][tx] = v;
  }
  function solidType(t) {
    return t === T.GRASS || t === T.DIRT || t === T.BRICK || t === T.ITEM || t === T.USED || t === T.TUBE || t === T.STONE || t === T.SAND || t === T.ICE || t === T.MUD;
  }
  function oneWay(t) { return t === T.WOOD || t === T.SPRING || t === T.LEAF; }

  function buildWorld() {
    if (currentMap === "brook") return buildBrook();
    if (currentMap === "canopy") return buildCanopy();
    if (currentMap === "dune") return buildDune();
    if (currentMap === "tide") return buildTide();
    if (currentMap === "orchard") return buildOrchard();
    if (currentMap === "cave") return buildCave();
    if (currentMap === "prairie") return buildPrairie();
    if (currentMap === "alpine") return buildAlpine();
    if (currentMap === "bog") return buildBog();
    if (currentMap === "volcano") return buildVolcano();
    if (currentMap === "aurora") return buildAurora();
    if (currentMap === "savanna") return buildSavanna();
    if (currentMap === "mangrove") return buildMangrove();
    if (currentMap === "cloudforest") return buildCloudForest();
    if (currentMap === "canyon") return buildCanyon();
    if (currentMap === "kelp") return buildKelp();
    if (currentMap === "tundra") return buildTundra();
    if (currentMap === "terrace") return buildTerrace();
    if (currentMap === "crystal") return buildCrystal();
    if (currentMap === "steam") return buildSteam();
    if (currentMap === "redwood") return buildRedwood();
    if (currentMap === "atoll") return buildAtoll();
    if (currentMap === "crater") return buildCrater();
    return buildMeadow();
  }

  function buildMeadow() {
    const W = 216, H = 16;
    const tiles = Array.from({ length: H }, () => new Uint8Array(W));
    const coins = [];
    const enemies = [];
    const movers = [];
    const boards = [];
    const notes = [];
    const signs = [];

    const fillGround = (x0, x1, gy = 13) => {
      for (let x = x0; x < x1; x++) {
        tiles[gy][x] = T.GRASS;
        for (let y = gy + 1; y < H; y++) tiles[y][x] = T.DIRT;
      }
    };
    const clearCol = (x0, x1) => {
      for (let x = x0; x < x1; x++) for (let y = 0; y < H; y++) tiles[y][x] = T.AIR;
    };
    const row = (x0, x1, y, t) => { for (let x = x0; x < x1; x++) tiles[y][x] = t; };
    const star = (x, y) => coins.push({ x: x * TILE + 12, y: y * TILE + 10, w: 24, h: 24, taken: false, bob: Math.random() * 6 });
    const sprout = (x, y) => enemies.push({ kind: "sprout", x: x * TILE + 6, y: y * TILE + 10, w: 36, h: 38, vx: -50, vy: 0, hp: 2, alive: true, hurt: 0, frame: 0 });
    const puff = (x, y) => enemies.push({ kind: "puff", x: x * TILE + 4, y: y * TILE + 4, w: 40, h: 34, vx: -30, vy: 0, hp: 1, alive: true, hurt: 0, frame: 0, baseY: y * TILE + 4 });
    const parkBoard = (x, y) => boards.push({ x: x * TILE + 6, y: y * TILE + 28, w: 36, h: 14, taken: false, bob: 0 });
    const note = (x, y, id) => notes.push({ x: x * TILE + 10, y: y * TILE + 8, w: 28, h: 28, id, taken: false, bob: 0 });
    const sign = (x, y, id) => signs.push({ x: x * TILE + 4, y: y * TILE - 20, w: 40, h: 68, id, read: false });

    fillGround(0, 216);
    parkBoard(9, 12);
    sign(11, 13, "meadow-open");
    note(22, 8, "meadow-pollen");

    // intro terrace
    row(14, 18, 11, T.WOOD);
    star(15, 10); star(16, 10);
    row(20, 23, 9, T.WOOD);
    star(21, 8);

    // first pit
    clearCol(28, 32);
    star(29, 10); star(30, 9);

    // first pest
    sprout(36, 12);
    star(38, 12); star(39, 12);

    // brick stair + item
    tiles[12][42] = T.BRICK; tiles[11][43] = T.BRICK; tiles[12][43] = T.DIRT;
    tiles[10][44] = T.ITEM; tiles[11][44] = T.BRICK; tiles[12][44] = T.DIRT;
    tiles[11][45] = T.BRICK; tiles[12][45] = T.DIRT;
    tiles[12][46] = T.BRICK;
    star(44, 8); star(47, 12);

    // second pit with coin arc
    clearCol(50, 57);
    star(51, 10); star(52, 8); star(53, 7); star(54, 8); star(55, 10);
    row(52, 55, 11, T.WOOD);

    // meadow stretch
    sprout(60, 12);
    tiles[10][63] = T.ITEM; tiles[10][64] = T.BRICK; tiles[10][65] = T.ITEM;
    star(63, 8); star(65, 8);
    sprout(70, 12);
    note(66, 9, "meadow-grass");

    // garden tubes
    tiles[12][74] = T.TUBE; tiles[11][74] = T.TUBE;
    tiles[12][75] = T.TUBE; tiles[11][75] = T.TUBE;
    tiles[10][74] = T.TUBE; tiles[10][75] = T.TUBE;
    star(77, 12);
    sprout(80, 12);

    // mid platforms + puffs
    row(84, 90, 10, T.WOOD);
    puff(86, 7);
    star(85, 9); star(87, 9); star(89, 9);
    row(91, 96, 8, T.GRASS);
    for (let x = 91; x < 96; x++) tiles[9][x] = T.DIRT;
    star(92, 6); star(93, 6); star(94, 6);
    puff(93, 4);

    // checkpoint meadow
    sprout(100, 12);
    row(104, 108, 11, T.WOOD);
    tiles[9][106] = T.ITEM;
    star(106, 7);
    sign(102, 13, "meadow-soil");

    // climb
    row(110, 113, 11, T.BRICK);
    row(113, 116, 9, T.BRICK);
    row(116, 120, 7, T.WOOD);
    star(117, 6); star(118, 6);
    tiles[11][118] = T.SPRING;
    puff(117, 4);
    row(121, 125, 8, T.GRASS);
    for (let x = 121; x < 125; x++) { tiles[9][x] = T.DIRT; tiles[10][x] = T.DIRT; }
    star(122, 6); star(123, 6);

    // drop back + pit
    clearCol(126, 132);
    row(127, 131, 10, T.WOOD);
    star(128, 8); star(129, 8);

    // gauntlet
    sprout(134, 12); sprout(138, 12); sprout(142, 12);
    puff(136, 9); puff(140, 8);
    tiles[10][136] = T.BRICK; tiles[10][140] = T.ITEM;
    star(135, 12); star(139, 12); star(143, 12);

    // moving island pit
    clearCol(146, 158);
    movers.push({ x: 148 * TILE, y: 11 * TILE, w: TILE * 3, h: 20, minX: 147 * TILE, maxX: 155 * TILE, vx: 70 });
    star(150, 8); star(152, 7); star(154, 8);
    tiles[11][158] = T.SPRING;

    // high garden
    parkBoard(161, 7);
    row(160, 168, 8, T.WOOD);
    puff(162, 5); puff(166, 4);
    star(161, 7); star(163, 7); star(165, 7); star(167, 7);
    tiles[10][164] = T.ITEM;
    sprout(170, 12);

    // last climb
    row(174, 177, 11, T.BRICK);
    row(177, 180, 9, T.BRICK);
    row(180, 184, 7, T.WOOD);
    star(181, 6); star(182, 5); star(183, 6);
    tiles[11][182] = T.SPRING;

    // flag garden
    row(190, 198, 12, T.GRASS);
    for (let x = 190; x < 198; x++) tiles[13][x] = T.DIRT;
    tiles[11][192] = T.ITEM;
    star(191, 11); star(193, 11); star(195, 11);

    // end wall so you cannot run off
    for (let y = 0; y < H; y++) tiles[y][214] = T.DIRT;

    const flag = { x: 196 * TILE + 8, y: 8 * TILE, w: 28, h: 5 * TILE, got: false };
    note(194, 11, "meadow-open");

    return {
      w: W, h: H, tiles, coins, enemies, movers, boards, notes, signs, flag,
      spawnX: 3 * TILE, spawnY: 11 * TILE, winds: [],
      theme: { id: "meadow", ambient: "pollen", hill: "rgba(126, 217, 87, 0.15)", skyTop: "#7eb7e6", skyBot: "#f7e2c0" }
    };
  }

  function levelKit(W, H) {
    const tiles = Array.from({ length: H }, () => new Uint8Array(W));
    const coins = [];
    const enemies = [];
    const movers = [];
    const boards = [];
    const notes = [];
    const signs = [];
    const winds = [];
    const fillGround = (x0, x1, gy = 13, top = T.GRASS) => {
      for (let x = x0; x < x1; x++) {
        tiles[gy][x] = top;
        for (let y = gy + 1; y < H; y++) tiles[y][x] = T.DIRT;
      }
    };
    const fillWater = (x0, x1, y0, y1) => {
      for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) tiles[y][x] = T.WATER;
    };
    const clearCol = (x0, x1) => {
      for (let x = x0; x < x1; x++) for (let y = 0; y < H; y++) tiles[y][x] = T.AIR;
    };
    const row = (x0, x1, y, t) => { for (let x = x0; x < x1; x++) tiles[y][x] = t; };
    const star = (x, y) => coins.push({ x: x * TILE + 12, y: y * TILE + 10, w: 24, h: 24, taken: false, bob: Math.random() * 6 });
    const sprout = (x, y) => enemies.push({ kind: "sprout", x: x * TILE + 6, y: y * TILE + 10, w: 36, h: 38, vx: -50, vy: 0, hp: 2, alive: true, hurt: 0, frame: 0 });
    const puff = (x, y) => enemies.push({ kind: "puff", x: x * TILE + 4, y: y * TILE + 4, w: 40, h: 34, vx: -30, vy: 0, hp: 1, alive: true, hurt: 0, frame: 0, baseY: y * TILE + 4 });
    const drip = (x, y) => enemies.push({ kind: "drip", x: x * TILE + 4, y: y * TILE + 4, w: 40, h: 34, vx: -24, vy: 0, hp: 1, alive: true, hurt: 0, frame: 0, baseY: y * TILE + 4 });
    const mite = (x, y) => enemies.push({ kind: "mite", x: x * TILE + 6, y: y * TILE + 10, w: 36, h: 38, vx: -76, vy: 0, hp: 2, alive: true, hurt: 0, frame: 0 });
    const hopper = (x, y) => enemies.push({ kind: "hopper", x: x * TILE + 6, y: y * TILE + 10, w: 36, h: 38, vx: -40, vy: 0, hp: 2, alive: true, hurt: 0, frame: 0, hop: 0 });
    const crab = (x, y) => enemies.push({ kind: "crab", x: x * TILE + 6, y: y * TILE + 14, w: 38, h: 32, vx: -40, vy: 0, hp: 2, alive: true, hurt: 0, frame: 0 });
    const moth = (x, y) => enemies.push({ kind: "moth", x: x * TILE + 4, y: y * TILE + 4, w: 40, h: 34, vx: -28, vy: 0, hp: 1, alive: true, hurt: 0, frame: 0, baseY: y * TILE + 4 });
    const bat = (x, y) => enemies.push({ kind: "bat", x: x * TILE + 4, y: y * TILE + 4, w: 40, h: 34, vx: -50, vy: 0, hp: 1, alive: true, hurt: 0, frame: 0, baseY: y * TILE + 4 });
    const spark = (x, y) => enemies.push({ kind: "spark", x: x * TILE + 4, y: y * TILE + 4, w: 36, h: 32, vx: -40, vy: 0, hp: 1, alive: true, hurt: 0, frame: 0, baseY: y * TILE + 4 });
    const spore = (x, y) => enemies.push({ kind: "spore", x: x * TILE + 4, y: y * TILE + 4, w: 36, h: 32, vx: -20, vy: 0, hp: 1, alive: true, hurt: 0, frame: 0, baseY: y * TILE + 4 });
    const ember = (x, y) => enemies.push({ kind: "ember", x: x * TILE + 6, y: y * TILE + 10, w: 36, h: 38, vx: -55, vy: 0, hp: 2, alive: true, hurt: 0, frame: 0, hop: 0 });
    const wisp = (x, y) => enemies.push({ kind: "wisp", x: x * TILE + 4, y: y * TILE + 4, w: 40, h: 34, vx: -32, vy: 0, hp: 1, alive: true, hurt: 0, frame: 0, baseY: y * TILE + 4 });
    const parkBoard = (x, y) => boards.push({ x: x * TILE + 6, y: y * TILE + 28, w: 36, h: 14, taken: false, bob: 0 });
    const note = (x, y, id) => notes.push({ x: x * TILE + 10, y: y * TILE + 8, w: 28, h: 28, id, taken: false, bob: 0 });
    const sign = (x, y, id) => signs.push({ x: x * TILE + 4, y: y * TILE - 20, w: 40, h: 68, id, read: false });
    const pack = (flag, spawnX, spawnY, theme) => ({
      w: W, h: H, tiles, coins, enemies, movers, boards, notes, signs, winds, flag,
      spawnX, spawnY, theme
    });
    return { W, H, tiles, coins, enemies, movers, boards, notes, signs, winds, fillGround, fillWater, clearCol, row, star, sprout, puff, drip, mite, hopper, crab, moth, bat, spark, spore, ember, wisp, parkBoard, note, sign, pack };
  }

  function buildBrook() {
    const L = levelKit(200, 16);
    const { fillGround, fillWater, row, star, drip, mite, parkBoard, note, sign, pack } = L;
    fillGround(0, 22, 13, T.STONE);
    fillGround(22, 28, 13, T.GRASS);
    parkBoard(8, 12);
    sign(12, 13, "brook-cycle");
    star(14, 12); star(15, 12);
    note(18, 12, "brook-cycle");

    fillWater(28, 48, 13, 16);
    row(30, 32, 12, T.LEAF);
    row(35, 37, 11, T.LEAF);
    row(40, 42, 12, T.LEAF);
    row(44, 46, 10, T.WOOD);
    star(31, 11); star(36, 10); star(41, 11); star(45, 9);
    drip(36, 8);
    note(45, 9, "brook-erosion");

    fillGround(48, 70, 13, T.STONE);
    mite(54, 12);
    L.tiles[10][58] = T.ITEM;
    L.tiles[10][59] = T.BRICK;
    star(58, 8);
    sign(62, 13, "brook-wetland");
    drip(64, 9);

    fillWater(70, 96, 12, 16);
    row(72, 75, 11, T.LEAF);
    row(78, 81, 10, T.LEAF);
    row(84, 87, 9, T.WOOD);
    L.movers.push({ x: 88 * TILE, y: 11 * TILE, w: TILE * 3, h: 20, minX: 86 * TILE, maxX: 95 * TILE, vx: 60 });
    star(73, 10); star(79, 9); star(85, 8);
    drip(80, 7);
    note(85, 8, "brook-oxygen");

    fillGround(96, 124, 13, T.GRASS);
    mite(102, 12); mite(110, 12);
    row(106, 110, 11, T.WOOD);
    L.tiles[9][108] = T.ITEM;
    star(108, 7);
    sign(116, 13, "brook-erosion");

    fillWater(124, 150, 13, 16);
    row(126, 128, 12, T.LEAF);
    row(131, 133, 11, T.STONE);
    row(136, 138, 10, T.LEAF);
    row(141, 144, 9, T.WOOD);
    L.tiles[11][146] = T.SPRING;
    star(127, 11); star(132, 10); star(137, 9); star(142, 8);
    drip(132, 8); drip(140, 6);

    fillGround(150, 200, 13, T.STONE);
    mite(158, 12);
    row(164, 170, 10, T.WOOD);
    star(166, 9); star(168, 9);
    parkBoard(172, 12);
    for (let y = 0; y < 16; y++) L.tiles[y][198] = T.STONE;
    star(184, 12); star(186, 12);
    const flag = { x: 186 * TILE + 8, y: 8 * TILE, w: 28, h: 5 * TILE, got: false };
    return pack(flag, 3 * TILE, 11 * TILE, { id: "brook", ambient: "mist", hill: "rgba(80, 150, 180, 0.2)", skyTop: "#6aa8c8", skyBot: "#d7e8f2" });
  }

  function buildCanopy() {
    const L = levelKit(160, 20);
    const { fillGround, row, star, puff, mite, parkBoard, note, sign, pack } = L;
    fillGround(0, 160, 17, T.DIRT);
    for (let x = 0; x < 160; x++) if (L.tiles[17][x] === T.DIRT) L.tiles[17][x] = T.GRASS;
    parkBoard(7, 16);
    sign(11, 17, "canopy-layers");
    note(16, 16, "canopy-layers");
    star(18, 16); star(19, 16);
    mite(24, 16);

    row(28, 32, 15, T.LEAF);
    row(34, 38, 13, T.WOOD);
    star(30, 14); star(36, 12);
    note(36, 12, "canopy-photo");
    puff(36, 10);

    row(40, 44, 11, T.LEAF);
    row(46, 50, 9, T.WOOD);
    L.tiles[15][48] = T.SPRING;
    star(42, 10); star(48, 8);
    mite(42, 10);

    row(52, 58, 8, T.LEAF);
    sign(54, 8, "canopy-photo");
    puff(55, 5);
    star(53, 7); star(56, 7);

    row(60, 64, 12, T.WOOD);
    row(66, 70, 10, T.LEAF);
    row(72, 76, 8, T.WOOD);
    L.movers.push({ x: 68 * TILE, y: 14 * TILE, w: TILE * 3, h: 20, minX: 64 * TILE, maxX: 78 * TILE, vx: 70 });
    star(62, 11); star(68, 9); star(74, 7);
    mite(62, 11);
    note(74, 7, "canopy-rings");

    row(80, 86, 7, T.LEAF);
    L.tiles[15][82] = T.SPRING;
    puff(83, 4);
    star(81, 6); star(84, 6);
    sign(82, 7, "canopy-rings");

    row(90, 96, 6, T.WOOD);
    row(98, 104, 5, T.LEAF);
    star(92, 5); star(100, 4);
    puff(100, 2);
    note(100, 4, "canopy-shade");

    row(108, 114, 8, T.WOOD);
    row(116, 122, 6, T.LEAF);
    L.tiles[16][118] = T.SPRING;
    mite(110, 7);
    star(110, 7); star(118, 5);

    row(126, 136, 4, T.WOOD);
    sign(128, 4, "canopy-shade");
    star(130, 3); star(132, 3); star(134, 3);
    puff(132, 1);
    L.tiles[10][130] = T.ITEM;
    parkBoard(134, 3);

    for (let y = 0; y < 20; y++) L.tiles[y][158] = T.DIRT;
    const flag = { x: 132 * TILE + 8, y: 0, w: 28, h: 4 * TILE, got: false };
    return pack(flag, 3 * TILE, 15 * TILE, { id: "canopy", ambient: "leaves", hill: "rgba(50, 90, 40, 0.22)", skyTop: "#6a8a78", skyBot: "#e8d9a0" });
  }

  function buildDune() {
    const L = levelKit(210, 16);
    const { fillGround, clearCol, row, star, hopper, parkBoard, note, sign, pack } = L;
    fillGround(0, 26, 13, T.SAND);
    parkBoard(8, 12);
    sign(12, 13, "dune-sand");
    note(18, 12, "dune-sand");
    star(16, 12); star(17, 12);
    hopper(22, 12);

    clearCol(26, 34);
    row(27, 29, 12, T.SAND);
    row(30, 33, 10, T.SAND);
    star(28, 11); star(31, 9);
    L.winds.push({ x: 26 * TILE, y: 4 * TILE, w: 20 * TILE, h: 8 * TILE, vx: 220 });

    fillGround(34, 58, 13, T.SAND);
    L.tiles[12][40] = T.SPIKE;
    L.tiles[12][48] = T.SPIKE;
    sign(42, 13, "dune-water");
    hopper(44, 12); hopper(52, 12);
    note(50, 12, "dune-water");
    star(38, 12); star(46, 12);

    clearCol(58, 72);
    row(60, 63, 11, T.SAND);
    row(65, 68, 9, T.WOOD);
    row(69, 71, 11, T.SAND);
    star(61, 10); star(66, 8); star(70, 10);
    L.winds.push({ x: 58 * TILE, y: 2 * TILE, w: 16 * TILE, h: 10 * TILE, vx: 260 });

    fillGround(72, 100, 13, T.SAND);
    L.tiles[10][80] = T.ITEM;
    L.tiles[12][86] = T.SPIKE;
    hopper(78, 12); hopper(90, 12);
    sign(84, 13, "dune-wind");
    note(92, 12, "dune-wind");
    star(80, 8); star(88, 12);

    clearCol(100, 118);
    row(102, 106, 12, T.SAND);
    row(108, 112, 10, T.SAND);
    row(114, 117, 8, T.WOOD);
    L.tiles[11][110] = T.SPRING;
    star(104, 11); star(110, 9); star(115, 7);
    L.winds.push({ x: 100 * TILE, y: 3 * TILE, w: 18 * TILE, h: 8 * TILE, vx: -180 });

    fillGround(118, 150, 13, T.SAND);
    hopper(124, 12); hopper(134, 12);
    L.tiles[12][128] = T.SPIKE;
    sign(140, 13, "dune-heat");
    note(144, 12, "dune-heat");
    parkBoard(146, 12);
    star(130, 12); star(142, 12);

    clearCol(150, 164);
    row(152, 156, 11, T.WOOD);
    L.movers.push({ x: 154 * TILE, y: 10 * TILE, w: TILE * 3, h: 20, minX: 151 * TILE, maxX: 163 * TILE, vx: 80 });
    star(155, 8); star(158, 7);

    fillGround(164, 210, 13, T.SAND);
    hopper(172, 12);
    row(180, 188, 10, T.WOOD);
    star(182, 9); star(186, 9);
    for (let y = 0; y < 16; y++) L.tiles[y][208] = T.SAND;
    const flag = { x: 194 * TILE + 8, y: 8 * TILE, w: 28, h: 5 * TILE, got: false };
    return pack(flag, 3 * TILE, 11 * TILE, { id: "dune", ambient: "sand", hill: "rgba(210, 170, 80, 0.22)", skyTop: "#f0c878", skyBot: "#f7e2b8" });
  }

  function buildTide() {
    const L = levelKit(200, 16);
    const { fillGround, fillWater, row, star, crab, drip, parkBoard, note, sign, pack } = L;
    fillGround(0, 24, 13, T.STONE);
    parkBoard(8, 12);
    sign(12, 13, "tide-tides");
    note(18, 12, "tide-tides");
    star(16, 12); star(17, 12);
    crab(20, 12);

    fillWater(24, 46, 13, 16);
    row(26, 28, 12, T.STONE);
    row(31, 33, 12, T.LEAF);
    row(36, 38, 11, T.STONE);
    row(41, 44, 12, T.LEAF);
    star(27, 11); star(32, 11); star(37, 10); star(42, 11);
    drip(32, 8);
    note(37, 10, "tide-pools");

    fillGround(46, 68, 13, T.STONE);
    crab(52, 12); crab(60, 12);
    sign(56, 13, "tide-pools");
    L.tiles[10][58] = T.ITEM;
    star(58, 8);

    fillWater(68, 98, 12, 16);
    row(70, 73, 11, T.STONE);
    row(76, 79, 10, T.LEAF);
    row(82, 85, 11, T.STONE);
    row(88, 92, 9, T.WOOD);
    L.movers.push({ x: 84 * TILE, y: 11 * TILE, w: TILE * 3, h: 20, minX: 80 * TILE, maxX: 96 * TILE, vx: 55 });
    star(71, 10); star(77, 9); star(83, 10); star(90, 8);
    drip(78, 7);
    note(90, 8, "tide-salt");
    sign(70, 11, "tide-salt");

    fillGround(98, 122, 13, T.STONE);
    crab(104, 12); crab(114, 12);
    L.tiles[12][108] = T.SPIKE;
    star(110, 12);
    sign(118, 13, "tide-shell");

    fillWater(122, 148, 13, 16);
    row(124, 126, 12, T.LEAF);
    row(129, 132, 11, T.STONE);
    row(135, 138, 10, T.LEAF);
    row(141, 145, 9, T.WOOD);
    L.tiles[11][140] = T.SPRING;
    star(125, 11); star(130, 10); star(136, 9); star(143, 8);
    drip(130, 8); crab(130, 10);
    note(143, 8, "tide-shell");

    fillGround(148, 200, 13, T.STONE);
    crab(156, 12);
    row(164, 172, 10, T.WOOD);
    star(166, 9); star(170, 9);
    parkBoard(176, 12);
    for (let y = 0; y < 16; y++) L.tiles[y][198] = T.STONE;
    const flag = { x: 186 * TILE + 8, y: 8 * TILE, w: 28, h: 5 * TILE, got: false };
    return pack(flag, 3 * TILE, 11 * TILE, { id: "tide", ambient: "spray", hill: "rgba(70, 130, 160, 0.2)", skyTop: "#4a7aa0", skyBot: "#f0d8b0" });
  }

  function buildOrchard() {
    const L = levelKit(190, 16);
    const { fillGround, clearCol, row, star, moth, mite, parkBoard, note, sign, pack } = L;
    fillGround(0, 28, 13, T.GRASS);
    parkBoard(8, 12);
    sign(12, 13, "orchard-moon");
    note(18, 12, "orchard-moon");
    star(16, 12); star(17, 12);
    moth(22, 9);

    row(24, 30, 10, T.WOOD);
    star(26, 9); star(28, 9);
    L.tiles[10][32] = T.ITEM;
    mite(34, 12);

    clearCol(40, 52);
    row(42, 46, 11, T.WOOD);
    row(47, 51, 9, T.LEAF);
    star(43, 10); star(48, 8);
    moth(48, 6);
    note(48, 8, "orchard-night");

    fillGround(52, 80, 13, T.GRASS);
    sign(58, 13, "orchard-night");
    mite(62, 12); moth(70, 8);
    row(66, 72, 10, T.WOOD);
    star(68, 9);
    L.tiles[11][74] = T.SPRING;

    clearCol(80, 98);
    row(82, 86, 11, T.LEAF);
    row(88, 93, 9, T.WOOD);
    L.movers.push({ x: 86 * TILE, y: 12 * TILE, w: TILE * 3, h: 20, minX: 82 * TILE, maxX: 96 * TILE, vx: 70 });
    star(83, 10); star(90, 8);
    moth(90, 6);
    note(90, 8, "orchard-fruit");

    fillGround(98, 128, 13, T.GRASS);
    sign(104, 13, "orchard-fruit");
    mite(110, 12); mite(118, 12);
    row(112, 118, 10, T.WOOD);
    L.tiles[8][115] = T.ITEM;
    star(115, 6);
    moth(115, 4);

    clearCol(128, 146);
    row(130, 134, 11, T.WOOD);
    row(136, 142, 8, T.LEAF);
    L.tiles[11][138] = T.SPRING;
    star(132, 10); star(138, 7);
    moth(138, 5);
    note(138, 7, "orchard-stars");

    fillGround(146, 190, 13, T.GRASS);
    sign(154, 13, "orchard-stars");
    moth(160, 8);
    row(166, 174, 10, T.WOOD);
    star(168, 9); star(172, 9);
    parkBoard(176, 12);
    for (let y = 0; y < 16; y++) L.tiles[y][188] = T.DIRT;
    const flag = { x: 178 * TILE + 8, y: 8 * TILE, w: 28, h: 5 * TILE, got: false };
    return pack(flag, 3 * TILE, 11 * TILE, { id: "orchard", ambient: "firefly", hill: "rgba(30, 40, 70, 0.25)", skyTop: "#1a2440", skyBot: "#3a2a50" });
  }

  function buildCave() {
    const L = levelKit(190, 16);
    const { fillGround, clearCol, row, star, bat, mite, parkBoard, note, sign, pack } = L;
    fillGround(0, 190, 13, T.STONE);
    parkBoard(8, 12);
    sign(12, 13, "cave-karst");
    note(18, 12, "cave-karst");
    star(16, 12); star(17, 12);
    bat(22, 8);

    row(26, 32, 10, T.STONE);
    star(28, 9);
    mite(30, 9);
    note(28, 9, "cave-drip");

    clearCol(36, 50);
    row(38, 42, 11, T.STONE);
    row(44, 48, 9, T.STONE);
    L.tiles[12][40] = T.SPIKE;
    star(39, 10); star(46, 8);
    bat(46, 6);

    fillGround(50, 78, 13, T.STONE);
    sign(56, 13, "cave-drip");
    bat(62, 7); mite(68, 12);
    row(64, 70, 10, T.WOOD);
    L.tiles[8][66] = T.ITEM;
    star(66, 6);

    clearCol(78, 98);
    row(80, 84, 12, T.STONE);
    row(86, 90, 10, T.STONE);
    row(92, 96, 8, T.WOOD);
    L.movers.push({ x: 84 * TILE, y: 11 * TILE, w: TILE * 3, h: 20, minX: 80 * TILE, maxX: 96 * TILE, vx: 55 });
    star(82, 11); star(88, 9); star(94, 7);
    bat(88, 6);
    note(94, 7, "cave-dark");

    fillGround(98, 128, 13, T.STONE);
    sign(106, 13, "cave-dark");
    mite(112, 12); bat(118, 8);
    L.tiles[12][116] = T.SPIKE;
    star(120, 12);

    clearCol(128, 148);
    row(130, 134, 11, T.STONE);
    row(136, 142, 8, T.WOOD);
    L.tiles[11][138] = T.SPRING;
    star(132, 10); star(138, 7);
    bat(138, 4);
    note(138, 7, "cave-echo");

    fillGround(148, 190, 13, T.STONE);
    sign(156, 13, "cave-echo");
    bat(162, 8);
    row(168, 176, 10, T.WOOD);
    star(170, 9); star(174, 9);
    parkBoard(178, 12);
    for (let y = 0; y < 16; y++) L.tiles[y][188] = T.STONE;
    const flag = { x: 180 * TILE + 8, y: 8 * TILE, w: 28, h: 5 * TILE, got: false };
    return pack(flag, 3 * TILE, 11 * TILE, { id: "cave", ambient: "dust", dark: true, hill: "rgba(10, 12, 18, 0.4)", skyTop: "#12151c", skyBot: "#2a2430" });
  }

  function buildPrairie() {
    const L = levelKit(210, 16);
    const { fillGround, clearCol, row, star, hopper, spark, parkBoard, note, sign, pack } = L;
    fillGround(0, 30, 13, T.GRASS);
    parkBoard(8, 12);
    sign(12, 13, "prairie-sky");
    note(18, 12, "prairie-sky");
    star(16, 12); star(17, 12);
    hopper(24, 12);

    row(28, 34, 11, T.WOOD);
    star(30, 10);
    spark(32, 8);

    clearCol(36, 50);
    row(38, 42, 12, T.GRASS);
    row(44, 48, 10, T.WOOD);
    star(40, 11); star(46, 9);
    L.winds.push({ x: 36 * TILE, y: 2 * TILE, w: 16 * TILE, h: 10 * TILE, vx: 0 });

    fillGround(50, 82, 13, T.GRASS);
    sign(58, 13, "prairie-lightning");
    hopper(62, 12); spark(70, 8);
    L.tiles[10][66] = T.ITEM;
    star(66, 8);
    note(74, 12, "prairie-lightning");

    clearCol(82, 102);
    row(84, 88, 11, T.WOOD);
    row(90, 96, 9, T.LEAF);
    L.movers.push({ x: 88 * TILE, y: 12 * TILE, w: TILE * 3, h: 20, minX: 84 * TILE, maxX: 100 * TILE, vx: 90 });
    star(86, 10); star(92, 8);
    spark(92, 6);
    note(92, 8, "prairie-fire");

    fillGround(102, 140, 13, T.GRASS);
    sign(110, 13, "prairie-fire");
    hopper(116, 12); hopper(126, 12);
    spark(120, 8);
    row(122, 130, 10, T.WOOD);
    star(124, 9);
    note(132, 12, "prairie-root");

    clearCol(140, 160);
    row(142, 146, 11, T.WOOD);
    row(150, 156, 8, T.LEAF);
    L.tiles[11][148] = T.SPRING;
    star(144, 10); star(152, 7);
    spark(152, 5);

    fillGround(160, 210, 13, T.GRASS);
    sign(168, 13, "prairie-root");
    hopper(174, 12);
    row(182, 190, 10, T.WOOD);
    star(184, 9); star(188, 9);
    parkBoard(194, 12);
    for (let y = 0; y < 16; y++) L.tiles[y][208] = T.DIRT;
    const flag = { x: 198 * TILE + 8, y: 8 * TILE, w: 28, h: 5 * TILE, got: false };
    return pack(flag, 3 * TILE, 11 * TILE, { id: "prairie", ambient: "rain", gust: 1.6, hill: "rgba(80, 110, 50, 0.2)", skyTop: "#5a6a80", skyBot: "#c8b890" });
  }

  function buildAlpine() {
    const L = levelKit(200, 18);
    const { fillGround, clearCol, row, star, hopper, moth, parkBoard, note, sign, pack } = L;
    fillGround(0, 24, 15, T.ICE);
    parkBoard(8, 14);
    sign(12, 15, "alpine-snow");
    note(18, 14, "alpine-snow");
    star(16, 14); star(17, 14);
    hopper(20, 14);

    row(24, 30, 13, T.ICE);
    star(26, 12);
    note(26, 12, "alpine-glacier");

    clearCol(32, 48);
    row(34, 38, 14, T.ICE);
    row(40, 44, 12, T.STONE);
    row(45, 47, 10, T.ICE);
    star(36, 13); star(42, 11); star(46, 9);
    L.tiles[13][42] = T.SPIKE;

    fillGround(48, 74, 15, T.STONE);
    for (let x = 48; x < 74; x++) L.tiles[15][x] = T.ICE;
    sign(54, 15, "alpine-glacier");
    hopper(60, 14);
    moth(66, 10);
    L.tiles[12][64] = T.ITEM;
    star(64, 10);

    clearCol(74, 96);
    row(76, 80, 13, T.ICE);
    row(82, 88, 11, T.WOOD);
    L.movers.push({ x: 82 * TILE, y: 13 * TILE, w: TILE * 3, h: 20, minX: 78 * TILE, maxX: 94 * TILE, vx: 60 });
    star(78, 12); star(86, 10);
    moth(86, 8);
    note(86, 10, "alpine-air");

    fillGround(96, 128, 15, T.ICE);
    sign(104, 15, "alpine-air");
    hopper(110, 14); hopper(118, 14);
    L.tiles[14][114] = T.SPIKE;
    row(120, 126, 12, T.STONE);
    star(122, 11);
    note(122, 11, "alpine-plant");

    clearCol(128, 150);
    row(130, 134, 13, T.ICE);
    row(136, 142, 10, T.WOOD);
    L.tiles[13][138] = T.SPRING;
    star(132, 12); star(138, 9);
    moth(138, 6);

    fillGround(150, 200, 15, T.ICE);
    sign(158, 15, "alpine-plant");
    hopper(164, 14);
    row(172, 180, 12, T.WOOD);
    star(174, 11); star(178, 11);
    parkBoard(182, 14);
    for (let y = 0; y < 18; y++) L.tiles[y][198] = T.STONE;
    const flag = { x: 186 * TILE + 8, y: 10 * TILE, w: 28, h: 5 * TILE, got: false };
    return pack(flag, 3 * TILE, 13 * TILE, { id: "alpine", ambient: "snow", hill: "rgba(180, 200, 220, 0.2)", skyTop: "#8ab0d0", skyBot: "#f2f6fa" });
  }

  function buildBog() {
    const L = levelKit(200, 16);
    const { fillGround, fillWater, row, star, spore, mite, parkBoard, note, sign, pack } = L;
    fillGround(0, 22, 13, T.MUD);
    parkBoard(8, 12);
    sign(12, 13, "bog-peat");
    note(18, 12, "bog-peat");
    star(16, 12); star(17, 12);
    mite(20, 12);

    fillWater(22, 44, 13, 16);
    row(24, 27, 12, T.LEAF);
    row(30, 33, 11, T.MUD);
    row(36, 40, 12, T.LEAF);
    star(25, 11); star(31, 10); star(38, 11);
    spore(31, 8);
    note(31, 10, "bog-acid");

    fillGround(44, 70, 13, T.MUD);
    sign(50, 13, "bog-acid");
    mite(56, 12); spore(62, 8);
    L.tiles[10][58] = T.ITEM;
    star(58, 8);
    L.tiles[12][64] = T.SPIKE;

    fillWater(70, 98, 12, 16);
    row(72, 75, 11, T.LEAF);
    row(78, 82, 10, T.WOOD);
    row(85, 88, 11, T.MUD);
    L.movers.push({ x: 86 * TILE, y: 11 * TILE, w: TILE * 3, h: 20, minX: 80 * TILE, maxX: 96 * TILE, vx: 50 });
    star(73, 10); star(80, 9); star(86, 10);
    spore(80, 7);
    note(80, 9, "bog-meat");
    sign(72, 11, "bog-meat");

    fillGround(98, 128, 13, T.MUD);
    mite(106, 12); mite(116, 12);
    sign(110, 13, "bog-carbon");
    row(118, 124, 10, T.WOOD);
    star(120, 9);
    note(120, 9, "bog-carbon");

    fillWater(128, 152, 13, 16);
    row(130, 133, 12, T.LEAF);
    row(136, 140, 10, T.WOOD);
    L.tiles[11][138] = T.SPRING;
    star(131, 11); star(138, 9);
    spore(138, 6);

    fillGround(152, 200, 13, T.MUD);
    mite(160, 12);
    row(170, 178, 10, T.WOOD);
    star(172, 9); star(176, 9);
    parkBoard(182, 12);
    for (let y = 0; y < 16; y++) L.tiles[y][198] = T.MUD;
    const flag = { x: 186 * TILE + 8, y: 8 * TILE, w: 28, h: 5 * TILE, got: false };
    return pack(flag, 3 * TILE, 11 * TILE, { id: "bog", ambient: "spores", hill: "rgba(50, 70, 40, 0.25)", skyTop: "#4a6050", skyBot: "#c8c090" });
  }

  function buildVolcano() {
    const L = levelKit(205, 16);
    const { fillGround, clearCol, row, star, ember, spark, parkBoard, note, sign, pack } = L;
    fillGround(0, 24, 13, T.STONE);
    parkBoard(8, 12);
    sign(12, 13, "volcano-lava");
    note(18, 12, "volcano-lava");
    star(16, 12); star(17, 12);
    ember(20, 12);

    for (let y = 13; y < 16; y++) for (let x = 24; x < 42; x++) L.tiles[y][x] = T.LAVA;
    row(26, 29, 12, T.STONE);
    row(32, 35, 11, T.STONE);
    row(38, 41, 12, T.STONE);
    star(27, 11); star(33, 10); star(39, 11);
    spark(33, 8);

    fillGround(42, 68, 13, T.STONE);
    sign(48, 13, "volcano-ring");
    ember(54, 12); ember(62, 12);
    L.tiles[12][58] = T.SPIKE;
    note(64, 12, "volcano-ring");
    star(50, 12);

    for (let y = 12; y < 16; y++) for (let x = 68; x < 92; x++) L.tiles[y][x] = T.LAVA;
    row(70, 74, 11, T.STONE);
    row(77, 81, 9, T.WOOD);
    row(84, 88, 11, T.STONE);
    L.movers.push({ x: 78 * TILE, y: 12 * TILE, w: TILE * 3, h: 20, minX: 72 * TILE, maxX: 90 * TILE, vx: 70 });
    star(72, 10); star(79, 8); star(86, 10);
    spark(79, 6);
    note(79, 8, "volcano-soil");

    fillGround(92, 124, 13, T.STONE);
    sign(100, 13, "volcano-soil");
    ember(106, 12); spark(114, 8);
    L.tiles[10][110] = T.ITEM;
    star(110, 8);
    L.tiles[12][118] = T.SPIKE;

    for (let y = 13; y < 16; y++) for (let x = 124; x < 148; x++) L.tiles[y][x] = T.LAVA;
    row(126, 130, 12, T.STONE);
    row(133, 138, 10, T.WOOD);
    L.tiles[11][136] = T.SPRING;
    star(128, 11); star(135, 9);
    spark(135, 6);
    note(135, 9, "volcano-hot");

    fillGround(148, 205, 13, T.STONE);
    sign(156, 13, "volcano-hot");
    ember(164, 12);
    row(172, 180, 10, T.WOOD);
    star(174, 9); star(178, 9);
    parkBoard(186, 12);
    for (let y = 0; y < 16; y++) L.tiles[y][203] = T.STONE;
    const flag = { x: 192 * TILE + 8, y: 8 * TILE, w: 28, h: 5 * TILE, got: false };
    return pack(flag, 3 * TILE, 11 * TILE, { id: "volcano", ambient: "ember", hill: "rgba(80, 30, 20, 0.25)", skyTop: "#4a2830", skyBot: "#e0a060" });
  }

  function buildAurora() {
    const L = levelKit(195, 16);
    const { fillGround, clearCol, row, star, wisp, hopper, parkBoard, note, sign, pack } = L;
    fillGround(0, 26, 13, T.ICE);
    parkBoard(8, 12);
    sign(12, 13, "aurora-wind");
    note(18, 12, "aurora-wind");
    star(16, 12); star(17, 12);
    wisp(22, 8);

    clearCol(26, 44);
    row(28, 32, 12, T.ICE);
    row(34, 38, 10, T.STONE);
    row(40, 43, 12, T.ICE);
    star(30, 11); star(36, 9); star(41, 11);
    wisp(36, 6);
    note(36, 9, "aurora-lights");

    fillGround(44, 72, 13, T.STONE);
    for (let x = 44; x < 72; x++) L.tiles[13][x] = T.ICE;
    sign(50, 13, "aurora-lights");
    hopper(56, 12); wisp(64, 8);
    L.tiles[10][60] = T.ITEM;
    star(60, 8);

    clearCol(72, 96);
    row(74, 78, 11, T.ICE);
    row(80, 86, 9, T.WOOD);
    L.movers.push({ x: 82 * TILE, y: 12 * TILE, w: TILE * 3, h: 20, minX: 76 * TILE, maxX: 94 * TILE, vx: 65 });
    star(76, 10); star(84, 8);
    wisp(84, 5);
    note(84, 8, "aurora-poles");

    fillGround(96, 128, 13, T.ICE);
    sign(104, 13, "aurora-poles");
    hopper(110, 12); hopper(118, 12);
    wisp(114, 7);
    row(120, 126, 10, T.WOOD);
    star(122, 9);
    note(122, 9, "aurora-night");

    clearCol(128, 150);
    row(130, 134, 11, T.ICE);
    row(136, 142, 8, T.WOOD);
    L.tiles[11][138] = T.SPRING;
    star(132, 10); star(138, 7);
    wisp(138, 4);

    fillGround(150, 195, 13, T.ICE);
    sign(158, 13, "aurora-night");
    wisp(164, 8);
    row(170, 178, 10, T.WOOD);
    star(172, 9); star(176, 9);
    parkBoard(182, 12);
    for (let y = 0; y < 16; y++) L.tiles[y][193] = T.STONE;
    const flag = { x: 184 * TILE + 8, y: 8 * TILE, w: 28, h: 5 * TILE, got: false };
    return pack(flag, 3 * TILE, 11 * TILE, { id: "aurora", ambient: "aurora", hill: "rgba(40, 60, 90, 0.2)", skyTop: "#0c1830", skyBot: "#1c3050", aurora: true });
  }

  function buildHabitat(cfg) {
    const L = levelKit(cfg.w || 188, cfg.h || 16);
    const { fillGround, fillWater, clearCol, row, star, parkBoard, note, sign, pack } = L;
    const mobs = {
      sprout: L.sprout, puff: L.puff, drip: L.drip, mite: L.mite,
      hopper: L.hopper, crab: L.crab, moth: L.moth, bat: L.bat,
      spark: L.spark, spore: L.spore, ember: L.ember, wisp: L.wisp
    };
    const gy = cfg.gy || 13;
    const top = cfg.top || T.GRASS;
    const plat = cfg.plat || T.WOOD;
    const notes = cfg.notes || [];
    const walk = cfg.walk || "sprout";
    const fly = cfg.fly || null;
    fillGround(0, L.W, gy, top);
    parkBoard(8, gy - 1);
    if (notes[0]) { sign(12, gy, notes[0]); note(18, gy - 1, notes[0]); }
    star(15, gy - 1); star(16, gy - 1); star(17, gy - 1);
    if (mobs[walk]) mobs[walk](22, gy - 1);

    clearCol(28, 36);
    if (cfg.water) fillWater(28, 36, gy, L.H);
    row(30, 33, gy - 1, plat);
    star(31, gy - 2);
    if (notes[1]) note(31, gy - 2, notes[1]);

    fillGround(36, 58, gy, top);
    if (mobs[walk]) mobs[walk](42, gy - 1);
    L.tiles[gy - 3][48] = T.ITEM;
    star(48, gy - 5);
    if (notes[1]) sign(52, gy, notes[1]);
    star(54, gy - 1);

    row(60, 64, gy - 2, plat);
    row(66, 70, gy - 4, cfg.high || T.LEAF);
    star(62, gy - 3); star(68, gy - 5);
    if (fly && mobs[fly]) mobs[fly](67, gy - 7);

    clearCol(72, 88);
    if (cfg.water) fillWater(72, 88, gy, L.H);
    L.movers.push({ x: 74 * TILE, y: (gy - 2) * TILE, w: TILE * 3, h: 20, minX: 73 * TILE, maxX: 86 * TILE, vx: cfg.vx || 64 });
    star(78, gy - 4); star(82, gy - 5);
    if (notes[2]) note(80, gy - 4, notes[2]);

    fillGround(88, 118, gy, top);
    if (mobs[walk]) mobs[walk](96, gy - 1);
    if (mobs[walk]) mobs[walk](110, gy - 1);
    if (cfg.hazard) L.tiles[gy - 1][102] = T.SPIKE;
    if (notes[2]) sign(108, gy, notes[2]);
    star(104, gy - 1); star(114, gy - 1);

    row(120, 126, gy - 3, plat);
    L.tiles[gy - 2][124] = T.SPRING;
    star(122, gy - 4);
    if (notes[3]) note(122, gy - 4, notes[3]);
    if (fly && mobs[fly]) mobs[fly](124, gy - 6);

    clearCol(128, 144);
    if (cfg.water) fillWater(128, 144, gy, L.H);
    row(130, 133, gy - 1, cfg.step || T.STONE);
    row(136, 140, gy - 3, T.WOOD);
    star(131, gy - 2); star(138, gy - 4);

    fillGround(144, L.W, gy, top);
    if (notes[3]) sign(150, gy, notes[3]);
    if (mobs[walk]) mobs[walk](154, gy - 1);
    parkBoard(160, gy - 1);
    row(166, 174, gy - 3, T.WOOD);
    star(168, gy - 4); star(172, gy - 4);
    const wall = top === T.SAND ? T.SAND : (top === T.STONE ? T.STONE : (top === T.ICE ? T.ICE : T.DIRT));
    for (let y = 0; y < L.H; y++) L.tiles[y][L.W - 2] = wall;
    const flag = { x: (L.W - 16) * TILE + 8, y: (gy - 5) * TILE, w: 28, h: 5 * TILE, got: false };
    if (cfg.extra) cfg.extra(L);
    return pack(flag, 3 * TILE, (gy - 2) * TILE, cfg.theme);
  }

  function buildSavanna() {
    return buildHabitat({
      top: T.GRASS, plat: T.WOOD, walk: "hopper", fly: "puff", hazard: true,
      notes: ["savanna-tree", "savanna-graze", "savanna-termite", "savanna-rain"],
      theme: { id: "savanna", ambient: "pollen", hill: "rgba(196, 160, 70, 0.2)", skyTop: "#f0c878", skyBot: "#f7e0a8" }
    });
  }
  function buildMangrove() {
    return buildHabitat({
      top: T.MUD, plat: T.WOOD, walk: "crab", fly: "drip", water: true,
      notes: ["mangrove-salt", "mangrove-roots", "mangrove-nursery", "mangrove-storm"],
      theme: { id: "mangrove", ambient: "mist", hill: "rgba(40, 90, 70, 0.22)", skyTop: "#4a7a78", skyBot: "#c8d8c0" }
    });
  }
  function buildCloudForest() {
    return buildHabitat({
      w: 176, h: 18, gy: 15, top: T.GRASS, plat: T.LEAF, high: T.WOOD, walk: "mite", fly: "spore",
      notes: ["cloud-fog", "cloud-epiphyte", "cloud-drip", "cloud-cool"],
      theme: { id: "cloudforest", ambient: "mist", hill: "rgba(80, 110, 90, 0.22)", skyTop: "#8aa898", skyBot: "#e8efe4" }
    });
  }
  function buildCanyon() {
    return buildHabitat({
      top: T.STONE, plat: T.STONE, step: T.BRICK, walk: "hopper", fly: "bat", hazard: true,
      notes: ["canyon-layer", "canyon-river", "canyon-echo", "canyon-varnish"],
      theme: { id: "canyon", ambient: "dust", hill: "rgba(180, 90, 50, 0.22)", skyTop: "#e09060", skyBot: "#f2c8a0" }
    });
  }
  function buildKelp() {
    return buildHabitat({
      top: T.STONE, plat: T.LEAF, walk: "crab", fly: "drip", water: true, vx: 48,
      notes: ["kelp-not-tree", "kelp-fast", "kelp-otter", "kelp-light"],
      theme: { id: "kelp", ambient: "spray", hill: "rgba(30, 90, 80, 0.22)", skyTop: "#1c5a68", skyBot: "#4aa090" }
    });
  }
  function buildTundra() {
    return buildHabitat({
      top: T.ICE, plat: T.ICE, walk: "hopper", fly: "wisp",
      notes: ["tundra-perma", "tundra-burst", "tundra-low", "tundra-thaw"],
      theme: { id: "tundra", ambient: "snow", hill: "rgba(180, 200, 220, 0.2)", skyTop: "#9bb8d0", skyBot: "#eef4f8" }
    });
  }
  function buildTerrace() {
    return buildHabitat({
      top: T.GRASS, plat: T.WOOD, walk: "sprout", fly: "puff", water: true,
      notes: ["terrace-step", "terrace-water", "terrace-mud", "terrace-bird"],
      theme: { id: "terrace", ambient: "mist", hill: "rgba(90, 140, 80, 0.2)", skyTop: "#7aa8b0", skyBot: "#d8ead0" }
    });
  }
  function buildCrystal() {
    return buildHabitat({
      top: T.STONE, plat: T.ICE, walk: "mite", fly: "spark", dark: false,
      notes: ["crystal-grow", "crystal-quartz", "crystal-color", "crystal-geode"],
      theme: { id: "crystal", ambient: "dust", hill: "rgba(90, 50, 140, 0.22)", skyTop: "#2a1848", skyBot: "#6a48a0" }
    });
  }
  function buildSteam() {
    return buildHabitat({
      top: T.STONE, plat: T.STONE, walk: "ember", fly: "spark", hazard: true, water: true,
      notes: ["steam-thermo", "steam-color", "steam-water", "steam-care"],
      theme: { id: "steam", ambient: "ember", hill: "rgba(180, 90, 50, 0.2)", skyTop: "#d89870", skyBot: "#f0d0a8" }
    });
  }
  function buildRedwood() {
    return buildHabitat({
      w: 176, h: 20, gy: 17, top: T.GRASS, plat: T.WOOD, high: T.LEAF, walk: "sprout", fly: "puff",
      notes: ["redwood-tall", "redwood-bark", "redwood-age", "redwood-fog"],
      theme: { id: "redwood", ambient: "leaves", hill: "rgba(60, 80, 40, 0.22)", skyTop: "#6a8060", skyBot: "#e4d8b0" }
    });
  }
  function buildAtoll() {
    return buildHabitat({
      top: T.SAND, plat: T.STONE, walk: "crab", fly: "drip", water: true,
      notes: ["atoll-ring", "atoll-coral", "atoll-clear", "atoll-bleach"],
      theme: { id: "atoll", ambient: "spray", hill: "rgba(60, 160, 170, 0.2)", skyTop: "#3cb0c8", skyBot: "#f2d8b8" }
    });
  }
  function buildCrater() {
    return buildHabitat({
      top: T.STONE, plat: T.BRICK, walk: "ember", fly: "wisp", hazard: true,
      notes: ["crater-hit", "crater-first", "crater-lake", "crater-life"],
      theme: { id: "crater", ambient: "dust", hill: "rgba(120, 70, 80, 0.22)", skyTop: "#6a4058", skyBot: "#e0b090" }
    });
  }

  function tilesOverlapping(x, y, w, h) {
    const x0 = Math.floor(x / TILE);
    const y0 = Math.floor(y / TILE);
    const x1 = Math.floor((x + w - 0.01) / TILE);
    const y1 = Math.floor((y + h - 0.01) / TILE);
    const out = [];
    for (let ty = y0; ty <= y1; ty++) {
      for (let tx = x0; tx <= x1; tx++) {
        const t = tileAt(tx, ty);
        if (t === T.AIR) continue;
        out.push({ tx, ty, t, x: tx * TILE, y: ty * TILE, w: TILE, h: TILE });
      }
    }
    return out;
  }

  function moveSolid(body, filter) {
    body.x += body.vx * (1 / 60);
    let hits = tilesOverlapping(body.x, body.y, body.w, body.h);
    for (const t of hits) {
      if (!filter(t, "x")) continue;
      if (body.vx > 0) body.x = t.x - body.w;
      else if (body.vx < 0) body.x = t.x + t.w;
      body.vx = 0;
    }
    for (const m of world.movers) {
      if (aabb(body, m) && filter({ t: T.WOOD, x: m.x, y: m.y, w: m.w, h: m.h }, "x")) {
        if (body.vx > 0) body.x = m.x - body.w;
        else if (body.vx < 0) body.x = m.x + m.w;
        body.vx = 0;
      }
    }

    body.y += body.vy * (1 / 60);
    body.grounded = false;
    body.onSpring = false;
    body.onMover = null;
    hits = tilesOverlapping(body.x, body.y, body.w, body.h);
    for (const t of hits) {
      if (!filter(t, "y")) continue;
      if (body.vy > 0) {
        body.y = t.y - body.h;
        body.grounded = true;
        if (t.t === T.SPRING) body.onSpring = true;
        body.vy = 0;
      } else if (body.vy < 0) {
        body.y = t.y + t.h;
        body.vy = 0;
        body.bump = t;
      }
    }
    for (const m of world.movers) {
      const feet = body.y + body.h;
      const prevFeet = feet - body.vy * (1 / 60);
      if (body.x + body.w > m.x + 2 && body.x < m.x + m.w - 2 && prevFeet <= m.y + 6 && feet >= m.y && body.vy >= 0) {
        body.y = m.y - body.h;
        body.vy = 0;
        body.grounded = true;
        body.onMover = m;
      }
    }
  }

  function playerFilter(tile, axis) {
    if (tile.t === T.SPRING) return axis === "y";
    if (oneWay(tile.t)) {
      if (axis !== "y") return false;
      return player.vy >= 0 && (player.y + player.h - player.vy / 60) <= tile.y + 8;
    }
    return solidType(tile.t);
  }

  function makePlayer() {
    return {
      x: world.spawnX, y: world.spawnY, w: 26, h: 42,
      vx: 0, vy: 0, facing: 1,
      grounded: false, coyote: 0, buffer: 0, airJump: true,
      hp: 3, maxHp: 3, inv: 0, stars: 0,
      shootCd: 0, squish: 1, squishV: 1,
      anim: 0, bump: null, onSpring: false, onMover: null,
      dead: false, shootFlash: 0,
      hasBoard: false, skating: false, gliding: false, glideSfx: 0
    };
  }

  function burst(x, y, n, cols, speed) {
    for (let i = 0; i < n; i++) {
      const a = rand(0, Math.PI * 2);
      const s = rand(40, speed);
      particles.push({
        x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 40,
        life: rand(0.25, 0.6), max: 0.6, r: rand(2, 5),
        col: cols[i % cols.length]
      });
    }
  }

  function doJump(vy, air) {
    player.vy = vy;
    player.grounded = false;
    player.coyote = 0;
    player.buffer = 0;
    player.squish = air ? 1.1 : 1.18;
    player.squishV = air ? 0.82 : 0.78;
    sfx(air ? "djump" : "jump");
    burst(
      player.x + 13,
      player.y + player.h,
      air ? 8 : 5,
      air ? ["#7ee0d2", "#fff6c8", "#3cb8a9"] : ["#d4a05a", "#fff4e3"],
      air ? 140 : 80
    );
  }

  function gun() {
    return GUNS[currentGun] || GUNS.blaster;
  }

  function aimVector() {
    const ox = player.x + player.w * 0.5;
    const oy = player.y + 18;
    mouse.worldX = mouse.x + cam.x;
    mouse.worldY = mouse.y + cam.y;
    let dx = mouse.on ? (mouse.worldX - ox) : player.facing;
    let dy = mouse.on ? (mouse.worldY - oy) : 0;
    const len = Math.hypot(dx, dy);
    if (len < 4) return { ox, oy, dx: player.facing, dy: 0 };
    return { ox, oy, dx: dx / len, dy: dy / len };
  }

  function faceAim() {
    if (!mouse.on) return;
    const ox = player.x + player.w * 0.5;
    if (mouse.worldX < ox - 4) player.facing = -1;
    else if (mouse.worldX > ox + 4) player.facing = 1;
  }

  function shoot() {
    if (player.shootCd > 0) return;
    const g = gun();
    const aim = aimVector();
    player.shootCd = g.cd;
    player.shootFlash = 0.08;
    player.facing = aim.dx < 0 ? -1 : 1;
    bullets.push({
      x: aim.ox + aim.dx * 24,
      y: aim.oy + aim.dy * 24,
      w: 12, h: 10,
      vx: aim.dx * g.speed,
      vy: aim.dy * g.speed,
      life: g.life,
      dmg: g.dmg,
      color: g.color,
      core: g.core
    });
    burst(aim.ox + aim.dx * 28, aim.oy + aim.dy * 28, 4, [g.color, g.core, "#3cb8a9"], 160);
    cam.shake = Math.max(cam.shake, 3);
    sfx("shoot");
  }

  function hurtPlayer(srcX) {
    if (player.inv > 0 || player.dead) return;
    player.hp -= 1;
    player.inv = 1.25;
    player.skating = false;
    player.vx = (player.x + player.w / 2 < srcX ? -1 : 1) * -180;
    player.vy = -260;
    cam.shake = 10;
    sfx("hurt");
    burst(player.x + 13, player.y + 20, 10, ["#e85d4c", "#fff4e3", "#f0c14a"], 220);
    refreshHud();
    if (player.hp <= 0) die("Pip ran out of hearts.");
  }

  function die(reason) {
    if (player.dead) return;
    player.dead = true;
    player.hp = 0;
    refreshHud();
    if (audio) audio.stopMusic();
    state = "dead";
    canvas.classList.remove("aiming");
    showStatus("Oh no!", reason || "Pip tumbled out of the meadow.", "Try again", () => startRun(currentMap));
  }

  function win() {
    if (world.flag.got) return;
    world.flag.got = true;
    state = "win";
    winT = 0;
    if (audio) audio.stopMusic();
    sfx("win");
    canvas.classList.remove("aiming");
    progress.cleared[currentMap] = true;
    saveProgress();
    const map = MAPS.find((m) => m.id === currentMap);
    const next = {
      meadow: "Brook Bend is open.",
      brook: "Canopy Climb is open.",
      canopy: "Dune Drift is open.",
      dune: "Tide Pool is open.",
      tide: "Night Orchard is open.",
      orchard: "Cave Glow is open.",
      cave: "Prairie Storm is open.",
      prairie: "Alpine Pass is open.",
      alpine: "Bog Lantern is open.",
      bog: "Volcano Rim is open.",
      volcano: "Aurora Ridge is open.",
      aurora: "Savanna Crown is open.",
      savanna: "Mangrove Maze is open.",
      mangrove: "Cloud Forest is open.",
      cloudforest: "Canyon Echo is open.",
      canyon: "Kelp Cathedral is open.",
      kelp: "Tundra Thaw is open.",
      tundra: "Terrace Paddy is open.",
      terrace: "Crystal Grotto is open.",
      crystal: "Steam Basin is open.",
      steam: "Redwood Rise is open.",
      redwood: "Atoll Ring is open.",
      atoll: "Crater Garden is open.",
      crater: "You have walked every habitat in Cozy-Platformer."
    }[currentMap] || "The next mile is waiting.";
    const found = journalCount();
    showStatus(
      `${map ? map.name : "Map"} cleared!`,
      `Stars ${player.stars}  ·  hearts left ${player.hp}  ·  journal ${found}/${Object.keys(JOURNAL).length}. ${next}`,
      "Play again",
      () => startRun(currentMap)
    );
  }

  function showStatus(title, lead, btn, onClick, keysLine) {
    overlay.hidden = false;
    viewHub.hidden = true;
    viewMaps.hidden = true;
    viewStatus.hidden = false;
    viewStatus.innerHTML = `
      <p class="kicker">cozy-platformer</p>
      <h1>${title}</h1>
      <p class="lead">${lead}</p>
      <div class="title-actions">
        <button type="button" id="btn-status-main" class="play-btn">${btn}</button>
        <button type="button" id="btn-status-maps" class="guide-btn">Maps</button>
        <button type="button" id="btn-status-hub" class="guide-btn">Hub</button>
        <button type="button" id="btn-guide-again" class="guide-btn">Field Guide</button>
      </div>
      <p class="keys">${keysLine || "Enter or R to retry · Esc for the Hub · G for the Field Guide"}</p>`;
    document.getElementById("btn-status-main").addEventListener("click", onClick || (() => startRun(currentMap)));
    document.getElementById("btn-status-maps").addEventListener("click", showMaps);
    document.getElementById("btn-status-hub").addEventListener("click", showHub);
    document.getElementById("btn-guide-again").addEventListener("click", openGuide);
    syncChrome();
  }

  function showHub() {
    if (audio) audio.stopMusic();
    state = "hub";
    overlay.hidden = false;
    viewHub.hidden = false;
    viewMaps.hidden = true;
    viewStatus.hidden = true;
    hudEl.hidden = true;
    hintEl.hidden = true;
    canvas.classList.remove("aiming");
    updateLoadout();
    syncChrome();
  }

  function showMaps() {
    if (audio) audio.stopMusic();
    state = "maps";
    overlay.hidden = false;
    viewHub.hidden = true;
    viewMaps.hidden = false;
    viewStatus.hidden = true;
    hudEl.hidden = true;
    hintEl.hidden = true;
    canvas.classList.remove("aiming");
    renderMapGrid();
    syncChrome();
  }

  function renderMapGrid() {
    applyUnlocks();
    mapGrid.innerHTML = "";
    for (const m of MAPS) {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "map-card" + (m.locked ? " locked" : "");
      card.disabled = m.locked;
      const done = !!progress.cleared[m.id];
      card.style.backgroundImage = "url('assets/bg/" + m.id + "-sky.jpg')";
      card.innerHTML = `<span class="map-tag">${m.tag}${m.locked ? " · locked" : done ? " · cleared" : " · open"}</span><strong>${m.name}</strong><span class="blurb">${m.locked ? "Clear the previous mile to unlock." : m.blurb}</span>`;
      if (!m.locked) card.addEventListener("click", () => startRun(m.id));
      mapGrid.appendChild(card);
    }
  }

  function pauseGame() {
    state = "pause";
    canvas.classList.remove("aiming");
    if (audio) audio.stopMusic();
    showStatus("Paused", "Cozy-Platformer will wait.", "Resume", resumeGame, "Esc or Enter to resume · Hub for the menu · G for the Field Guide");
    syncChrome();
  }
  function resumeGame() {
    if (guideOpen) return;
    overlay.hidden = true;
    state = "play";
    canvas.classList.add("aiming");
    if (audio) audio.startMusic();
    canvas.focus();
    syncChrome();
  }

  function openGuide(tab) {
    if (guideOpen) {
      if (tab) selectGuideTab(tab);
      return;
    }
    guideFrom = state;
    guideOpen = true;
    guideEl.hidden = false;
    fillJournal();
    if (tab) selectGuideTab(tab);
    if (state === "play") {
      state = "pause";
      if (audio) audio.stopMusic();
    }
    overlay.hidden = true;
  }

  function closeGuide() {
    if (!guideOpen) return;
    guideOpen = false;
    guideEl.hidden = true;
    const from = guideFrom;
    guideFrom = null;
    if (from === "play") resumeGame();
    else if (from === "pause") showStatus("Paused", "Cozy-Platformer will wait.", "Resume", resumeGame, "Esc or Enter to resume · Hub for the menu · G for the Field Guide");
    else if (from === "hub") showHub();
    else if (from === "maps") showMaps();
    else if (from === "dead" || from === "win") overlay.hidden = false;
    syncChrome();
  }

  function selectGuideTab(name) {
    guideEl.querySelectorAll(".tab").forEach((t) => t.classList.toggle("on", t.getAttribute("data-tab") === name));
    guideEl.querySelectorAll(".guide-page").forEach((p) => {
      p.hidden = p.getAttribute("data-page") !== name;
    });
    if (name === "journal") fillJournal();
  }

  function bindGuideUi() {
    const play = document.getElementById("btn-play");
    const maps = document.getElementById("btn-maps");
    const mapsBack = document.getElementById("btn-maps-back");
    if (play) play.addEventListener("click", () => { unlockAudio(); startRun(nextPlayMap()); });
    if (maps) maps.addEventListener("click", () => { unlockAudio(); showMaps(); });
    if (mapsBack) mapsBack.addEventListener("click", showHub);

    const openers = ["btn-guide", "btn-guide-title"];
    for (const id of openers) {
      const el = document.getElementById(id);
      if (el) el.addEventListener("click", () => { unlockAudio(); openGuide(); });
    }
    const closer = document.getElementById("guide-close");
    if (closer) closer.addEventListener("click", closeGuide);
    const pauseBtn = document.getElementById("btn-pause");
    if (pauseBtn) pauseBtn.addEventListener("click", () => { unlockAudio(); if (state === "play") pauseGame(); });
    const notesBtn = document.getElementById("hud-notes");
    if (notesBtn) notesBtn.addEventListener("click", () => { unlockAudio(); openGuide("journal"); });
    const toastClose = document.getElementById("toast-close");
    if (toastClose) toastClose.addEventListener("click", () => { if (toastEl) toastEl.hidden = true; toastT = 0; });
    guideEl.querySelectorAll(".tab").forEach((tab) => {
      tab.addEventListener("click", () => selectGuideTab(tab.getAttribute("data-tab")));
    });
  }

  function refreshHud() {
    hudHearts.innerHTML = "";
    for (let i = 0; i < player.maxHp; i++) {
      const img = document.createElement("img");
      img.src = "assets/ui/heart.png";
      img.alt = "";
      if (i >= player.hp) img.className = "gone";
      hudHearts.appendChild(img);
    }
    hudStars.textContent = String(player.stars);
    if (hudWorld) {
      const map = MAPS.find((m) => m.id === currentMap);
      hudWorld.textContent = map ? map.name : "Meadow Mile";
    }
    if (hudNotes) {
      const n = Object.keys(progress.journal || {}).length;
      const max = Object.keys(JOURNAL).length;
      hudNotes.textContent = "Journal " + n + "/" + max;
    }
    const starIcon = document.querySelector(".hud-star-icon");
    if (starIcon) starIcon.src = "assets/ui/star.png";
    if (hudBoard) {
      if (!player.hasBoard) hudBoard.hidden = true;
      else {
        hudBoard.hidden = false;
        hudBoard.classList.toggle("on", player.skating);
        hudBoard.textContent = player.skating ? "skating" : "board";
      }
    }
  }

  function loadProgress() {
    try {
      const raw = localStorage.getItem("cozy-platformer-progress");
      if (raw) progress = Object.assign({ cleared: {}, journal: {} }, JSON.parse(raw));
    } catch (e) { progress = { cleared: {}, journal: {} }; }
    applyUnlocks();
  }
  function saveProgress() {
    try { localStorage.setItem("cozy-platformer-progress", JSON.stringify(progress)); } catch (e) { /* file:// may still work */ }
    applyUnlocks();
  }
  function nextPlayMap() {
    applyUnlocks();
    if (progress.lastMap) {
      const last = MAPS.find((m) => m.id === progress.lastMap);
      if (last && !last.locked) return last.id;
    }
    for (const m of MAPS) {
      if (!m.locked && !progress.cleared[m.id]) return m.id;
    }
    for (let i = MAPS.length - 1; i >= 0; i--) {
      if (!MAPS[i].locked) return MAPS[i].id;
    }
    return "meadow";
  }

  function setMenuArt() {
    const id = (progress.lastMap && MAPS.find((m) => m.id === progress.lastMap && !m.locked))
      ? progress.lastMap
      : nextPlayMap();
    overlay.style.backgroundImage = "linear-gradient(180deg, rgba(28,46,34,0.35), rgba(28,46,34,0.62)), url('assets/bg/" + id + "-sky.jpg')";
    overlay.style.backgroundSize = "cover";
    overlay.style.backgroundPosition = "center";
  }

  function updateLoadout() {
    const el = document.getElementById("hub-loadout");
    if (!el) return;
    applyUnlocks();
    const id = nextPlayMap();
    const map = MAPS.find((m) => m.id === id);
    const n = journalCount();
    el.textContent = "Star Blaster · " + (map ? map.name : "Meadow Mile") + " · journal " + n + "/" + Object.keys(JOURNAL).length;
    setMenuArt();
  }

  function syncChrome() {
    const pause = document.getElementById("btn-pause");
    if (pause) pause.hidden = state !== "play";
  }

  function applyUnlocks() {
    MAPS[0].locked = false;
    for (let i = 1; i < MAPS.length; i++) {
      MAPS[i].locked = !progress.cleared[MAPS[i - 1].id];
    }
  }
  function journalCount() { return Object.keys(progress.journal || {}).length; }

  function showToast(kicker, title, body) {
    if (!toastEl) return;
    toastKicker.textContent = kicker;
    toastTitle.textContent = title;
    toastBody.textContent = body;
    toastEl.hidden = false;
    toastT = 6.5;
  }

  function collectJournal(id, kicker) {
    const entry = JOURNAL[id];
    if (!entry) return;
    const first = !progress.journal[id];
    progress.journal[id] = true;
    saveProgress();
    showToast(kicker || "Ranger note", entry.title, entry.body);
    if (first) {
      sfx("star");
      refreshHud();
    }
  }

  function fillJournal() {
    if (!journalList) return;
    journalList.innerHTML = "";
    const ids = Object.keys(JOURNAL);
    for (const id of ids) {
      const j = JOURNAL[id];
      const found = !!progress.journal[id];
      const card = document.createElement("article");
      card.className = "journal-card" + (found ? "" : " locked");
      card.innerHTML = found
        ? `<p class="stat">${j.world}</p><h3>${j.title}</h3><p>${j.body}</p>`
        : `<p class="stat">${j.world}</p><h3>Unread ranger note</h3><p>Find this sign or page in ${j.world}.</p>`;
      journalList.appendChild(card);
    }
  }

  function spawnAmbient(dt) {
    if (!world || !world.theme) return;
    if (Math.random() > 0.45) return;
    const kind = world.theme.ambient;
    const x = cam.x + rand(0, VIEW_W);
    const y = cam.y + rand(-20, VIEW_H * 0.7);
    if (kind === "pollen") {
      particles.push({ x, y, vx: rand(-20, 20), vy: rand(10, 30), life: 1.8, max: 1.8, r: 2, col: "#ffe27a", float: true });
    } else if (kind === "mist") {
      particles.push({ x, y, vx: rand(-30, -8), vy: rand(-6, 12), life: 2, max: 2, r: rand(3, 7), col: "rgba(200,230,245,0.7)", float: true });
    } else if (kind === "leaves") {
      particles.push({ x, y, vx: rand(-40, 10), vy: rand(20, 50), life: 2.2, max: 2.2, r: rand(2, 4), col: rand(0, 1) > 0.5 ? "#c45c32" : "#7ed957", float: true });
    } else if (kind === "sand") {
      particles.push({ x, y, vx: rand(40, 120), vy: rand(-10, 20), life: 1.4, max: 1.4, r: 2, col: "#e0c07a", float: true });
    } else if (kind === "spray") {
      particles.push({ x, y: cam.y + VIEW_H - rand(20, 80), vx: rand(-20, 20), vy: rand(-80, -20), life: 1.1, max: 1.1, r: 2, col: "rgba(220,240,255,0.8)", float: true });
    } else if (kind === "firefly") {
      particles.push({ x, y, vx: rand(-16, 16), vy: rand(-16, 16), life: 1.6, max: 1.6, r: rand(1.5, 3), col: "#d8f06a", float: true });
    } else if (kind === "dust") {
      particles.push({ x, y, vx: rand(-8, 8), vy: rand(4, 16), life: 2, max: 2, r: 2, col: "rgba(180,170,150,0.45)", float: true });
    } else if (kind === "rain") {
      particles.push({ x, y, vx: rand(-30, -10), vy: rand(180, 280), life: 0.7, max: 0.7, r: 1.4, col: "rgba(180,210,230,0.7)", float: true });
    } else if (kind === "snow") {
      particles.push({ x, y, vx: rand(-20, 20), vy: rand(20, 50), life: 2.4, max: 2.4, r: rand(1.5, 3), col: "#f4f8ff", float: true });
    } else if (kind === "spores") {
      particles.push({ x, y, vx: rand(-12, 12), vy: rand(-8, 18), life: 2, max: 2, r: 2, col: "rgba(160,180,90,0.55)", float: true });
    } else if (kind === "ember") {
      particles.push({ x, y, vx: rand(-10, 10), vy: rand(-40, -10), life: 1.2, max: 1.2, r: rand(1.5, 3), col: rand(0, 1) > 0.5 ? "#f0a020" : "#c43c14", float: true });
    } else if (kind === "aurora") {
      particles.push({ x, y, vx: rand(-10, 10), vy: rand(-20, 8), life: 2, max: 2, r: rand(2, 4), col: rand(0, 1) > 0.5 ? "rgba(80,220,160,0.5)" : "rgba(140,120,255,0.45)", float: true });
    }
  }

  function takeStar(c) {
    c.taken = true;
    player.stars += 1;
    refreshHud();
    sfx("star");
    burst(c.x + 12, c.y + 12, 8, ["#f0c14a", "#fff6c8", "#ffe27a"], 180);
    pops.push({ x: c.x, y: c.y, t: 0 });
  }

  function bumpBlock(tile) {
    if (tile.t === T.ITEM) {
      setTile(tile.tx, tile.ty, T.USED);
      const c = { x: tile.x + 12, y: tile.y - 20, w: 24, h: 24, taken: false, bob: 0 };
      world.coins.push(c);
      takeStar(c);
      burst(tile.x + 24, tile.y, 8, ["#ffe27a", "#fff6c8"], 160);
    } else if (tile.t === T.BRICK) {
      setTile(tile.tx, tile.ty, T.AIR);
      sfx("break");
      burst(tile.x + 24, tile.y + 24, 12, ["#d07a48", "#f0c09a", "#6b3a28"], 200);
    }
  }

  function killEnemy(e, stomp) {
    e.alive = false;
    sfx("stomp");
    cam.shake = stomp ? 7 : 4;
    if (e.kind === "sprout") burst(e.x + 18, e.y + 16, 14, ["#5aaa3e", "#c45c32", "#7ed957"], 200);
    else burst(e.x + 20, e.y + 16, 12, ["#f3e2c0", "#ff8fb3", "#2a241c"], 180);
  }

  // --- update ---
  function updatePlay(dt) {
    time += dt;
    hintT += dt;
    if (hintT > 12) hintEl.hidden = true;

    syncInput();
    player.bump = null;

    if (input.mountPressed && player.hasBoard) {
      player.skating = !player.skating;
      sfx("skate");
      burst(player.x + 13, player.y + player.h, 8, ["#3cb8a9", "#2a241c", "#fff6c8"], 120);
      refreshHud();
    }

    const skating = player.skating;
    const foot = tileAt(Math.floor((player.x + player.w / 2) / TILE), Math.floor((player.y + player.h + 2) / TILE));
    const onSand = foot === T.SAND;
    const onIce = foot === T.ICE;
    const onMud = foot === T.MUD;
    const accel = skating ? (player.grounded ? 2200 : 2000) : (player.grounded ? (onMud ? 1400 : 2600) : 2400);
    const maxV = skating ? (onMud ? 280 : 460) : (onSand ? 360 : onIce ? 400 : onMud ? 160 : 310);
    let friction = skating ? (player.grounded ? 380 : 160) : (player.grounded ? 2200 : 280);
    if (onSand && player.grounded) friction *= 0.28;
    if (onIce && player.grounded) friction *= 0.12;
    if (onMud && player.grounded) friction *= 2.4;

    if (input.left && !input.right) {
      player.vx -= accel * dt;
      if (!mouse.on) player.facing = -1;
    } else if (input.right && !input.left) {
      player.vx += accel * dt;
      if (!mouse.on) player.facing = 1;
    } else {
      const s = Math.sign(player.vx);
      player.vx -= s * friction * dt;
      if (Math.sign(player.vx) !== s) player.vx = 0;
    }
    player.vx = clamp(player.vx, -maxV, maxV);

    if (player.grounded) {
      player.coyote = 0.18;
      player.airJump = true;
    } else {
      player.coyote -= dt;
    }
    if (input.jumpPressed) player.buffer = 0.2;
    else player.buffer -= dt;

    if (player.buffer > 0) {
      const canGroundJump = player.grounded || player.coyote > 0;
      if (canGroundJump) {
        doJump(-640, false);
        player.airJump = true;
      } else if (player.airJump) {
        doJump(-600, true);
        player.airJump = false;
      }
    }
    if (!input.jump && player.vy < -120) player.vy *= Math.pow(0.55, dt * 8);

    player.gliding = !player.grounded && input.jump && player.vy > 40;
    let grav = 1480;
    if (player.vy > 0) grav = 1780;
    if (Math.abs(player.vy) < 80 && !player.grounded) grav = 700;
    if (player.gliding) {
      grav = skating ? 420 : 260;
      player.glideSfx -= dt;
      if (player.glideSfx <= 0) { sfx("glide"); player.glideSfx = 0.28; }
    }
    const fallCap = player.gliding ? (skating ? 210 : 125) : 820;
    player.vy = Math.min(player.vy + grav * dt, fallCap);

    const wasGround = player.grounded;
    moveSolid(player, playerFilter);

    for (const w of world.winds || []) {
      if (aabb(player, w)) player.vx += w.vx * dt;
    }
    if (world.theme && world.theme.gust) {
      player.vx += Math.sin(time * world.theme.gust) * 240 * dt;
    }
    const poked = tilesOverlapping(player.x + 6, player.y + player.h - 12, player.w - 12, 10).some((t) => t.t === T.SPIKE);
    if (poked) hurtPlayer(player.x + player.w / 2);

    if (player.skating && player.grounded && Math.abs(player.vx) > 80 && Math.random() < 0.35) {
      burst(player.x + player.w / 2, player.y + player.h, 1, ["#3cb8a9", "#fff4e3"], 40);
    }
    if (player.onMover) player.x += player.onMover.vx * dt;
    if (player.onSpring) {
      player.vy = -820;
      player.grounded = false;
      player.airJump = true;
      player.squish = 1.25;
      player.squishV = 0.7;
      sfx("spring");
      burst(player.x + 13, player.y + player.h, 8, ["#ff8fb3", "#fff0c8"], 140);
    }
    if (!wasGround && player.grounded) {
      player.squish = 1.22;
      player.squishV = 0.72;
      sfx("land");
      burst(player.x + 13, player.y + player.h, 6, ["#b57a45", "#7ed957"], 70);
    }
    if (player.bump) bumpBlock(player.bump);

    player.squish = lerp(player.squish, 1, 12 * dt);
    player.squishV = lerp(player.squishV, 1, 12 * dt);
    player.inv = Math.max(0, player.inv - dt);
    player.shootCd = Math.max(0, player.shootCd - dt);
    player.shootFlash = Math.max(0, player.shootFlash - dt);
    player.anim += dt * (player.grounded && Math.abs(player.vx) > 30 ? 10 : 6);

    mouse.worldX = mouse.x + cam.x;
    mouse.worldY = mouse.y + cam.y;
    faceAim();
    if (input.shoot) shoot();

    const hazard = tilesOverlapping(player.x + 4, player.y + player.h - 10, player.w - 8, 8);
    if (hazard.some((t) => t.t === T.WATER)) {
      burst(player.x + 13, player.y + player.h, 14, ["#3d8ec9", "#fff4e3"], 180);
      die("Pip slipped into the water. Streams and bogs are habitats — hop the stones and lilies.");
      return;
    }
    if (hazard.some((t) => t.t === T.LAVA)) {
      burst(player.x + 13, player.y + player.h, 16, ["#f0a020", "#c43c14", "#fff4e3"], 220);
      die("Pip found the lava. Melted rock is not a bath — stay on the cooled stone.");
      return;
    }

    if (player.y > world.h * TILE + 8) {
      burst(player.x + 13, player.y, 16, ["#e85d4c", "#fff4e3", "#7ee0d2"], 240);
      die("Pip fell out of the habitat.");
      return;
    }

    for (const m of world.movers) {
      m.x += m.vx * dt;
      if (m.x < m.minX) { m.x = m.minX; m.vx *= -1; }
      if (m.x + m.w > m.maxX) { m.x = m.maxX - m.w; m.vx *= -1; }
    }

    for (const e of world.enemies) {
      if (!e.alive) continue;
      if (e.y > world.h * TILE + 80) { e.alive = false; continue; }
      e.hurt = Math.max(0, e.hurt - dt);
      e.frame += dt * 8;
      if (e.kind === "sprout" || e.kind === "mite" || e.kind === "hopper" || e.kind === "crab" || e.kind === "ember") {
        e.vy = Math.min(e.vy + 1800 * dt, 700);
        if (e.kind === "hopper" || e.kind === "ember") {
          e.hop = (e.hop || 0) - dt;
          if (e.grounded && e.hop <= 0) { e.vy = e.kind === "ember" ? -480 : -420; e.hop = e.kind === "ember" ? 1.1 : 1.4; }
        }
        const ahead = e.x + (e.vx > 0 ? e.w + 2 : -2);
        const footX = Math.floor(ahead / TILE);
        const footY = Math.floor((e.y + e.h + 2) / TILE);
        if (!solidType(tileAt(footX, footY)) && !oneWay(tileAt(footX, footY))) e.vx *= -1;
        moveSolid(e, (tile, axis) => {
          if (oneWay(tile.t)) return axis === "y" && e.vy >= 0;
          return solidType(tile.t);
        });
        if (e.vx === 0) e.vx = (Math.random() < 0.5 ? -1 : 1) * (e.kind === "mite" ? 76 : e.kind === "crab" ? 40 : 50);
      } else {
        e.x += e.vx * dt;
        e.y = e.baseY + Math.sin(time * 2.4 + e.x * 0.01) * 16;
        if (e.x < 2 || solidType(tileAt(Math.floor((e.x + (e.vx > 0 ? e.w : 0)) / TILE), Math.floor((e.y + 10) / TILE)))) {
          e.vx *= -1;
        }
      }

      if (player.inv > 0) continue;
      if (!aabb(player, e)) continue;
      const stomp = player.vy > 80 && (player.y + player.h) - e.y < 22;
      if (stomp) {
        killEnemy(e, true);
        player.vy = -500;
        player.airJump = true;
        player.squish = 1.2;
      } else {
        hurtPlayer(e.x + e.w / 2);
      }
    }

    for (const b of bullets) {
      b.x += b.vx * dt;
      b.life -= dt;
      const tx = Math.floor((b.x + 6) / TILE);
      const ty = Math.floor((b.y + 5) / TILE);
      const tt = tileAt(tx, ty);
      if (solidType(tt) || tt === T.WOOD) { b.life = 0; burst(b.x, b.y, 4, ["#7ee0d2"], 80); }
      for (const e of world.enemies) {
        if (!e.alive || e.hurt > 0) continue;
        if (aabb(b, e)) {
          e.hp -= (b.dmg || 1);
          e.hurt = 0.12;
          b.life = 0;
          burst(b.x, b.y, 6, ["#7ee0d2", "#fff6c8"], 140);
          if (e.hp <= 0) killEnemy(e, false);
          else e.vx = Math.sign(e.x - b.x) * Math.abs(e.vx || 50);
        }
      }
    }
    for (let i = bullets.length - 1; i >= 0; i--) if (bullets[i].life <= 0) bullets.splice(i, 1);

    for (const c of world.coins) {
      if (c.taken) continue;
      c.bob += dt * 3;
      if (aabb(player, { x: c.x, y: c.y + Math.sin(c.bob) * 4, w: c.w, h: c.h })) takeStar(c);
    }

    for (const b of world.boards) {
      if (b.taken) continue;
      b.bob += dt * 3;
      if (aabb(player, b)) {
        b.taken = true;
        player.hasBoard = true;
        player.skating = true;
        sfx("skate");
        burst(b.x + 16, b.y, 10, ["#3cb8a9", "#2a241c", "#fff6c8"], 160);
        pops.push({ x: b.x, y: b.y, t: 0, label: "skate!" });
        refreshHud();
      }
    }

    for (const n of world.notes || []) {
      if (n.taken) continue;
      n.bob += dt * 3;
      if (aabb(player, n)) collectJournal(n.id, "Ranger note");
      if (progress.journal[n.id]) n.taken = true;
    }
    for (const s of world.signs || []) {
      if (s.read) continue;
      if (aabb(player, s)) {
        s.read = true;
        collectJournal(s.id, "Ranger sign");
      }
    }

    if (aabb(player, world.flag)) win();

    spawnAmbient(dt);
    if (toastT > 0) {
      toastT -= dt;
      if (toastT <= 0 && toastEl) toastEl.hidden = true;
    }

    for (const p of particles) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += p.float ? 30 * dt : 700 * dt;
      p.life -= dt;
    }
    for (let i = particles.length - 1; i >= 0; i--) if (particles[i].life <= 0) particles.splice(i, 1);
    for (const p of pops) p.t += dt;
    for (let i = pops.length - 1; i >= 0; i--) if (pops[i].t > 0.4) pops.splice(i, 1);

    const look = player.facing * 90;
    cam.tx = player.x + player.w / 2 - VIEW_W * 0.38 + look;
    cam.ty = player.y + player.h / 2 - VIEW_H * 0.58;
    cam.x = lerp(cam.x, cam.tx, 1 - Math.pow(0.001, dt));
    cam.y = lerp(cam.y, cam.ty, 1 - Math.pow(0.002, dt));
    const maxX = world.w * TILE - VIEW_W;
    const maxY = world.h * TILE - VIEW_H + 24;
    cam.x = clamp(cam.x, 0, Math.max(0, maxX));
    cam.y = clamp(cam.y, 0, Math.max(0, maxY));
    cam.shake = Math.max(0, cam.shake - dt * 28);
  }

  // --- draw ---
  function drawSprite(img, x, y, w, h, flip, flash, filter) {
    if (!img) return false;
    ctx.save();
    ctx.translate(x + w / 2, y + h / 2);
    if (flip) ctx.scale(-1, 1);
    if (flash) ctx.filter = "brightness(2)";
    else if (filter) ctx.filter = filter;
    ctx.drawImage(img, -w / 2, -h / 2, w, h);
    ctx.restore();
    return true;
  }

  function hash32(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  const SCENERY = {
    meadow: {
      skies: ["meadowSkyB"],
      hills: [
        { key: "meadowHill4", w: 520, h: 200 }
      ],
      clouds: [],
      props: [
        { keys: ["meadowTree", "meadowTree2", "meadowTree3"], min: 7, span: 8, w: 118, h: 158, yOff: -150, ground: [1], sway: 1.4 },
        { keys: ["meadowBush", "meadowBush2"], min: 4, span: 5, w: 72, h: 58, yOff: -52, ground: [1], sway: 1.8 },
        { keys: ["meadowFlower1", "meadowFlower2"], min: 3, span: 4, w: 54, h: 46, yOff: -42, ground: [1], sway: 2.2 }
      ]
    },
    brook: {
      skies: ["brookSkyB"],
      hills: [
        { key: "brookHill1", w: 560, h: 190 }
      ],
      clouds: [],
      props: [
        { keys: ["brookWillow"], min: 10, span: 7, w: 140, h: 170, yOff: -162, ground: [1, 11], sway: 1.6 },
        { keys: ["brookReeds", "brookReeds2"], min: 4, span: 4, w: 48, h: 82, yOff: -78, ground: [1, 11], sway: 2.4 },
        { keys: ["brookRock"], min: 6, span: 6, w: 58, h: 42, yOff: -38, ground: [1, 11], sway: 0 },
        { keys: ["brookLily"], min: 5, span: 5, w: 50, h: 28, yOff: -10, ground: [9], sway: 1.2 }
      ]
    },
    canopy: {
      skies: ["canopySkyC"],
      hills: [
        { key: "canopyHill1", w: 540, h: 230 }
      ],
      clouds: [],
      props: [
        { keys: ["canopyTrunk"], min: 11, span: 8, w: 90, h: 200, yOff: -196, ground: [1], sway: 0.4 },
        { keys: ["canopyVines", "canopyVines2"], min: 5, span: 5, w: 78, h: 86, yOff: -82, ground: [1, 6, 10], hang: true, sway: 3 },
        { keys: ["canopyMush"], min: 6, span: 6, w: 44, h: 40, yOff: -36, ground: [1], sway: 0.6 },
        { keys: ["canopyLeaf"], min: 8, span: 7, w: 70, h: 54, yOff: -200, ground: [1, 6], hang: true, sway: 2.6 }
      ]
    },
    dune: {
      skies: ["duneSkyB"],
      hills: [
        { key: "duneHill1", w: 560, h: 190 }
      ],
      clouds: [],
      props: [
        { keys: ["duneCactus", "duneCactus2"], min: 7, span: 6, w: 48, h: 86, yOff: -82, ground: [12], sway: 0.5 },
        { keys: ["duneRock", "duneRock2"], min: 5, span: 6, w: 64, h: 50, yOff: -46, ground: [12], sway: 0 },
        { keys: ["duneBush"], min: 6, span: 5, w: 56, h: 40, yOff: -36, ground: [12], sway: 1.1 }
      ]
    },
    tide: {
      skies: ["tideSkyB"],
      hills: [
        { key: "tideHill2", w: 540, h: 210 }
      ],
      clouds: [],
      props: [
        { keys: ["tideRock", "tideRock2"], min: 5, span: 5, w: 62, h: 50, yOff: -46, ground: [11], sway: 0 },
        { keys: ["tideDrift"], min: 8, span: 7, w: 90, h: 36, yOff: -32, ground: [11, 12], sway: 0.3 },
        { keys: ["tideKelp"], min: 6, span: 5, w: 40, h: 78, yOff: -74, ground: [11, 9], sway: 2.5 },
        { keys: ["tideShell"], min: 4, span: 5, w: 34, h: 24, yOff: -20, ground: [11, 12], sway: 0 }
      ]
    },
    savanna: {
      skies: ["savannaSky"],
      hills: [{ key: "savannaHill", w: 540, h: 200 }],
      clouds: [],
      props: [
        { keys: ["savannaTree"], min: 8, span: 7, w: 130, h: 150, yOff: -146, ground: [1], sway: 0.8 },
        { keys: ["savannaBush"], min: 5, span: 5, w: 64, h: 44, yOff: -40, ground: [1], sway: 1.2 }
      ]
    },
    mangrove: {
      skies: ["mangroveSky"],
      hills: [{ key: "mangroveHill", w: 540, h: 200 }],
      clouds: [],
      props: [
        { keys: ["mangroveRoot"], min: 6, span: 5, w: 90, h: 110, yOff: -106, ground: [15, 11], sway: 0.6 },
        { keys: ["brookReeds", "brookReeds2"], min: 4, span: 4, w: 46, h: 78, yOff: -74, ground: [15, 11], sway: 2.2 }
      ]
    },
    cloudforest: {
      skies: ["cloudforestSky"],
      hills: [{ key: "cloudforestHill", w: 540, h: 220 }],
      clouds: [],
      props: [
        { keys: ["cloudFern"], min: 5, span: 5, w: 70, h: 80, yOff: -76, ground: [1], sway: 1.8 },
        { keys: ["canopyVines", "canopyVines2"], min: 6, span: 5, w: 74, h: 84, yOff: -80, ground: [1, 6, 10], hang: true, sway: 2.8 }
      ]
    },
    canyon: {
      skies: ["canyonSky"],
      hills: [{ key: "canyonHill", w: 560, h: 220 }],
      clouds: [],
      props: [
        { keys: ["canyonSpire"], min: 8, span: 6, w: 70, h: 130, yOff: -126, ground: [11], sway: 0 },
        { keys: ["duneRock", "duneRock2"], min: 5, span: 5, w: 60, h: 46, yOff: -42, ground: [11], sway: 0 }
      ]
    },
    kelp: {
      skies: ["kelpSky"],
      hills: [{ key: "kelpHill", w: 540, h: 230 }],
      clouds: [],
      props: [
        { keys: ["kelpBlade"], min: 4, span: 4, w: 46, h: 140, yOff: -136, ground: [11, 9], sway: 3.2 },
        { keys: ["tideKelp"], min: 6, span: 5, w: 40, h: 78, yOff: -74, ground: [11, 9], sway: 2.4 }
      ]
    },
    tundra: {
      skies: ["tundraSky"],
      hills: [{ key: "tundraHill", w: 540, h: 190 }],
      clouds: [],
      props: [
        { keys: ["tundraShrub"], min: 5, span: 5, w: 70, h: 48, yOff: -44, ground: [14, 1], sway: 1.1 },
        { keys: ["tundraRock"], min: 7, span: 6, w: 58, h: 40, yOff: -36, ground: [14, 11], sway: 0 }
      ]
    },
    terrace: {
      skies: ["terraceSky"],
      hills: [{ key: "terraceHill", w: 560, h: 200 }],
      clouds: [],
      props: [
        { keys: ["terraceRice"], min: 4, span: 4, w: 70, h: 36, yOff: -32, ground: [1, 9], sway: 1.4 },
        { keys: ["meadowBush2"], min: 7, span: 6, w: 60, h: 48, yOff: -44, ground: [1], sway: 1.2 }
      ]
    },
    crystal: {
      skies: ["crystalSky"],
      hills: [{ key: "crystalHill", w: 520, h: 220 }],
      clouds: [],
      props: [
        { keys: ["crystalSpire"], min: 6, span: 5, w: 48, h: 90, yOff: -86, ground: [11], sway: 0 },
        { keys: ["crystalCluster"], min: 5, span: 5, w: 56, h: 50, yOff: -46, ground: [11], sway: 0.3 }
      ]
    },
    steam: {
      skies: ["steamSky"],
      hills: [{ key: "steamHill", w: 540, h: 200 }],
      clouds: [],
      props: [
        { keys: ["steamVent"], min: 7, span: 6, w: 64, h: 70, yOff: -66, ground: [11], sway: 0.8 },
        { keys: ["duneRock2"], min: 5, span: 5, w: 58, h: 44, yOff: -40, ground: [11], sway: 0 }
      ]
    },
    redwood: {
      skies: ["redwoodSky"],
      hills: [{ key: "redwoodHill", w: 540, h: 240 }],
      clouds: [],
      props: [
        { keys: ["redwoodTrunk"], min: 10, span: 8, w: 80, h: 220, yOff: -216, ground: [1], sway: 0.2 },
        { keys: ["canopyFern", "cloudFern"], min: 5, span: 5, w: 66, h: 70, yOff: -66, ground: [1], sway: 1.5 }
      ]
    },
    atoll: {
      skies: ["atollSky"],
      hills: [{ key: "atollHill", w: 540, h: 200 }],
      clouds: [],
      props: [
        { keys: ["atollPalm"], min: 8, span: 6, w: 100, h: 150, yOff: -146, ground: [12], sway: 1.6 },
        { keys: ["tideShell", "tideRock2"], min: 4, span: 4, w: 40, h: 30, yOff: -26, ground: [12, 11], sway: 0 }
      ]
    },
    crater: {
      skies: ["craterSky"],
      hills: [{ key: "craterHill", w: 560, h: 210 }],
      clouds: [],
      props: [
        { keys: ["craterRock"], min: 6, span: 5, w: 70, h: 54, yOff: -50, ground: [11], sway: 0 },
        { keys: ["craterPlant"], min: 5, span: 5, w: 50, h: 46, yOff: -42, ground: [11, 1], sway: 0.9 }
      ]
    }
  };

  function themeSky(id) {
    if (!id) return assets.meadowSky || assets.sky;
    return assets[id + "Sky"] || assets.meadowSky || assets.sky;
  }

  function sceneryOf(id) {
    return SCENERY[id] || null;
  }

  function drawSkyPanels(id) {
    const spec = sceneryOf(id);
    const picked = spec && spec.skies
      ? spec.skies.map((k) => assets[k]).find(Boolean)
      : null;
    const img = picked || themeSky(id);
    if (!img) return;
    // One painting only. Crop inside it as you walk — never a second sky.
    const srcW = img.width || VIEW_W;
    const srcH = img.height || VIEW_H;
    const maxShift = Math.max(0, srcW - Math.floor(srcW * 0.82));
    const span = Math.max(1, (world && world.w * TILE) - VIEW_W);
    const t = world ? cam.x / span : 0;
    const sx = maxShift * Math.max(0, Math.min(1, t));
    const sw = srcW - maxShift;
    ctx.drawImage(img, sx, 0, sw, srcH, 0, 0, VIEW_W, VIEW_H);
  }

  function drawOneHill(spec) {
    if (!spec || !spec.hills || !spec.hills.length) return;
    const piece = spec.hills.map((h) => ({ ...h, img: assets[h.key] })).find((h) => h.img);
    if (!piece) return;
    const w = piece.w;
    const h = piece.h;
    const x = (VIEW_W - w) * 0.5;
    const y = VIEW_H - h - 56;
    ctx.globalAlpha = 0.93;
    ctx.drawImage(piece.img, x, y, w, h);
    ctx.globalAlpha = 1;
  }

  function drawFarLayer(list, par, yBase) {
    if (!list || !list.length) return;
    const ready = list.map((h) => ({ ...h, img: assets[h.key] })).filter((h) => h.img);
    if (!ready.length) return;
    const worldW = (world && world.w * TILE) || VIEW_W * 4;
    let x = 30;
    let n = 0;
    const id = (world && world.theme && world.theme.id) || "x";
    while (x < worldW + 500) {
      const hsh = hash32(id + ":" + n + ":" + (ready[0].key || ""));
      const piece = ready[hsh % ready.length];
      const scale = 0.72 + (hsh % 45) / 100;
      const w = piece.w * scale;
      const h = piece.h * scale;
      const flip = (hsh & 2) === 0;
      const yJitter = (hsh % 28) - 8;
      const sx = x - cam.x * par;
      const sy = yBase - h + yJitter - cam.y * (par * 0.18);
      if (sx < VIEW_W + 50 && sx + w > -50) {
        ctx.save();
        ctx.globalAlpha = 0.94;
        ctx.translate(sx + w / 2, sy + h / 2);
        if (flip) ctx.scale(-1, 1);
        ctx.drawImage(piece.img, -w / 2, -h / 2, w, h);
        ctx.restore();
      }
      x += w * 0.68 + 90 + (hsh % 170);
      n++;
    }
  }

  function drawClouds(spec) {
    if (!spec || !spec.clouds || !spec.clouds.length) return;
    const ready = spec.clouds.map((c) => ({ ...c, img: assets[c.key] })).filter((c) => c.img);
    if (!ready.length) return;
    const worldW = (world && world.w * TILE) || VIEW_W * 4;
    const id = (world && world.theme && world.theme.id) || "x";
    let x = 80;
    let n = 0;
    while (x < worldW + 400) {
      const hsh = hash32(id + "-cld-" + n);
      const piece = ready[hsh % ready.length];
      const scale = 0.7 + (hsh % 50) / 100;
      const w = piece.w * scale;
      const h = piece.h * scale;
      const y = 40 + (hsh % 180);
      const sx = x - cam.x * 0.07;
      if (sx < VIEW_W + 40 && sx + w > -40) {
        ctx.save();
        ctx.globalAlpha = 0.82;
        if ((hsh & 1) === 0) {
          ctx.translate(sx + w / 2, y + h / 2);
          ctx.scale(-1, 1);
          ctx.drawImage(piece.img, -w / 2, -h / 2, w, h);
        } else {
          ctx.drawImage(piece.img, sx, y, w, h);
        }
        ctx.restore();
      }
      x += 260 + (hsh % 280);
      n++;
    }
  }

  function drawBg() {
    const theme = (world && world.theme) || {};
    const g = ctx.createLinearGradient(0, 0, 0, VIEW_H);
    g.addColorStop(0, theme.skyTop || "#7eb7e6");
    g.addColorStop(0.55, theme.skyBot || "#f7e2c0");
    g.addColorStop(1, theme.skyBot || "#f7e2c0");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, VIEW_W, VIEW_H);

    drawSkyPanels(theme.id);

    const spec = sceneryOf(theme.id);
    const oneBg = spec && spec.skies && spec.skies.length === 1;
    if (oneBg) {
      drawOneHill(spec);
      const wash = ctx.createLinearGradient(0, VIEW_H * 0.68, 0, VIEW_H);
      wash.addColorStop(0, "rgba(0,0,0,0)");
      wash.addColorStop(1, theme.hill || "rgba(126, 217, 87, 0.16)");
      ctx.fillStyle = wash;
      ctx.fillRect(0, VIEW_H * 0.68, VIEW_W, VIEW_H * 0.32);
    } else if (spec) {
      drawClouds(spec);
      if (spec.hills) {
        drawFarLayer(spec.hills, 0.24, VIEW_H - 70);
        const wash = ctx.createLinearGradient(0, VIEW_H * 0.62, 0, VIEW_H);
        wash.addColorStop(0, "rgba(0,0,0,0)");
        wash.addColorStop(1, theme.hill || "rgba(126, 217, 87, 0.16)");
        ctx.fillStyle = wash;
        ctx.fillRect(0, VIEW_H * 0.62, VIEW_W, VIEW_H * 0.38);
      }
    } else {
      ctx.fillStyle = theme.hill || "rgba(126, 217, 87, 0.12)";
      for (let i = 0; i < 14; i++) {
        const hsh = hash32((theme.id || "m") + "-blob-" + i);
        const x = (i * 340 + (hsh % 120)) - cam.x * 0.22;
        if (x > VIEW_W + 120 || x < -200) continue;
        ctx.beginPath();
        ctx.ellipse(x, VIEW_H - 64 - cam.y * 0.04, 90 + (hsh % 50), 26 + (hsh % 14), 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function drawStripTile(img, tx, ty, sx, sy, band) {
    if (!img) return false;
    const srcW = img.width || 1;
    const srcH = img.height || 1;
    const sliceW = Math.max(20, Math.floor(srcW / 22));
    const span = Math.max(1, srcW - sliceW);
    const srcX = ((tx * sliceW) % span + span) % span;
    let srcY = 0;
    let srcHgt = srcH;
    if (band === "top") {
      srcHgt = Math.floor(srcH * 0.4);
    } else if (band === "cap") {
      srcHgt = Math.floor(srcH * 0.26);
    } else if (band === "fill") {
      srcY = Math.floor(srcH * 0.34);
      srcHgt = Math.floor(srcH * 0.6);
      srcY = Math.min(srcH - srcHgt, srcY + ((ty * 19) % 36));
    } else if (band === "water") {
      if (tileAt(tx, ty - 1) !== T.WATER) srcHgt = Math.floor(srcH * 0.48);
      else {
        srcY = Math.floor(srcH * 0.42);
        srcHgt = Math.floor(srcH * 0.52);
      }
    }
    ctx.drawImage(img, srcX, srcY, sliceW, Math.max(8, srcHgt), sx, sy, TILE, TILE);
    return true;
  }

  function themeGround(id) {
    if (id === "brook") return assets.brookGround;
    if (id === "canopy" || id === "cloudforest" || id === "redwood") return assets.canopyGround;
    if (id === "dune" || id === "atoll") return assets.duneGround || assets.duneFill;
    if (id === "tide" || id === "kelp") return assets.tideGround;
    if (id === "canyon" || id === "crystal" || id === "steam" || id === "crater") return assets.tideGround;
    if (id === "mangrove") return assets.brookGround;
    if (id === "tundra") return assets.meadowFill;
    return assets.meadowGround;
  }

  function themeFill(id) {
    if (id === "brook" || id === "mangrove") return assets.brookGround;
    if (id === "canopy" || id === "cloudforest" || id === "redwood") return assets.canopyGround;
    if (id === "dune" || id === "atoll") return assets.duneFill || assets.duneGround;
    if (id === "tide" || id === "kelp" || id === "canyon" || id === "crystal" || id === "steam" || id === "crater") return assets.tideGround;
    return assets.meadowFill || assets.meadowGround;
  }

  function drawTile(t, tx, ty, sx, sy) {
    const id = (world && world.theme && world.theme.id) || "meadow";
    let painted = false;
    if (t === T.GRASS) painted = drawStripTile(themeGround(id), tx, ty, sx, sy, "top");
    else if (t === T.DIRT) painted = drawStripTile(themeFill(id), tx, ty, sx, sy, "fill");
    else if (t === T.SAND) painted = drawStripTile(assets.duneGround || assets.duneFill, tx, ty, sx, sy, tileAt(tx, ty - 1) === T.AIR ? "top" : "fill");
    else if (t === T.STONE) painted = drawStripTile(id === "tide" ? assets.tideGround : assets.brookGround, tx, ty, sx, sy, tileAt(tx, ty - 1) === T.AIR ? "top" : "fill");
    else if (t === T.WOOD) painted = drawStripTile(assets.woodStrip, tx, ty, sx, sy, "cap");
    else if (t === T.WATER) painted = drawStripTile(assets.waterStrip, tx, ty, sx, sy, "water");
    else if (t === T.LEAF) painted = drawStripTile(assets.leafStrip, tx, ty, sx, sy, "top");
    else if (t === T.MUD) painted = drawStripTile(assets.brookGround, tx, ty, sx, sy, tileAt(tx, ty - 1) === T.AIR ? "top" : "fill");
    else if (t === T.ITEM && assets.itemBlock) {
      ctx.drawImage(assets.itemBlock, sx, sy, TILE, TILE);
      painted = true;
    }

    let img = null;
    if (!painted) {
      if (t === T.GRASS) img = tileset.grass;
      else if (t === T.DIRT) img = tileset.dirt;
      else if (t === T.BRICK) img = tileset.brick;
      else if (t === T.ITEM) img = tileset.item;
      else if (t === T.USED) img = tileset.used;
      else if (t === T.WOOD) img = tileset.wood;
      else if (t === T.TUBE) img = tileAt(tx, ty - 1) !== T.TUBE ? tileset.tubeTop : tileset.tube;
      else if (t === T.SPRING) img = tileset.spring;
      else if (t === T.WATER) img = tileset.water;
      else if (t === T.LEAF) img = tileset.leaf;
      else if (t === T.STONE) img = tileset.stone;
      else if (t === T.SAND) img = tileset.sand;
      else if (t === T.SPIKE) img = tileset.spike;
      else if (t === T.ICE) img = tileset.ice;
      else if (t === T.MUD) img = tileset.mud;
      else if (t === T.LAVA) img = tileset.lava;
    } else {
      if (t === T.TUBE) img = tileAt(tx, ty - 1) !== T.TUBE ? tileset.tubeTop : tileset.tube;
      else if (t === T.SPRING) img = tileset.spring;
      else if (t === T.SPIKE) img = tileset.spike;
      else if (t === T.USED) img = tileset.used;
      else if (t === T.BRICK) img = tileset.brick;
      else if (t === T.ICE) img = tileset.ice;
      else if (t === T.MUD) img = tileset.mud;
      else if (t === T.LAVA) img = tileset.lava;
    }
    if (img) {
      if (t === T.SPRING) {
        const squash = 1 + Math.sin(time * 6 + tx) * 0.06;
        ctx.drawImage(img, sx, sy + TILE * (1 - squash), TILE, TILE * squash);
      } else if (t === T.LEAF) {
        const tilt = Math.sin(time * 2.4 + tx) * 0.08;
        ctx.save();
        ctx.translate(sx + TILE / 2, sy + 22);
        ctx.rotate(tilt);
        ctx.drawImage(img, -TILE / 2, -22, TILE, TILE);
        ctx.restore();
      } else {
        ctx.drawImage(img, sx, sy, TILE, TILE);
      }
    }
    if (t === T.WATER) {
      const phase = time * 3.2 + tx * 0.8 + ty * 0.4;
      ctx.fillStyle = "rgba(255,255,255,0.32)";
      ctx.fillRect(sx + ((phase * 18) % TILE), sy + 6 + Math.sin(phase) * 3, 16, 3);
      ctx.fillRect(sx + ((phase * 11 + 20) % TILE), sy + 20 + Math.cos(phase) * 2, 12, 2);
    } else if (t === T.LAVA) {
      const pulse = 0.35 + 0.3 * Math.sin(time * 7 + tx + ty);
      ctx.fillStyle = "rgba(255,238,136," + pulse.toFixed(3) + ")";
      ctx.fillRect(sx + 6, sy + 4 + Math.sin(time * 8 + tx) * 3, 22, 6);
      ctx.fillStyle = "rgba(196,60,20,0.35)";
      ctx.fillRect(sx, sy + 28 + Math.sin(time * 5 + ty) * 2, TILE, 8);
    } else if (t === T.GRASS) {
      const wid = world && world.theme && world.theme.id;
      const top = (wid === "meadow" || wid === "canopy" || wid === "savanna" || wid === "terrace" || wid === "redwood" || wid === "cloudforest" || !wid) ? assets.meadowGrassTop : null;
      if (top) {
        const srcW = top.width || TILE;
        const sw = Math.max(24, Math.floor(srcW / 18));
        const sxSrc = ((tx * sw) % Math.max(1, srcW - sw) + Math.max(1, srcW - sw)) % Math.max(1, srcW - sw);
        const sway = Math.sin(time * 2.4 + tx * 0.55) * 2;
        ctx.drawImage(top, sxSrc, 0, sw, top.height || TILE, sx, sy - 16 + sway * 0.15, TILE, 22);
      } else if (wid === "meadow" || wid === "canopy") {
        ctx.strokeStyle = "#8ee86a";
        ctx.lineWidth = 2;
        for (let i = 0; i < 3; i++) {
          const sway = Math.sin(time * 3.1 + tx * 0.6 + i) * 4;
          ctx.beginPath();
          ctx.moveTo(sx + 8 + i * 14, sy + 16);
          ctx.quadraticCurveTo(sx + 8 + i * 14 + sway, sy + 6, sx + 8 + i * 14 + sway * 1.3, sy + 1);
          ctx.stroke();
        }
      }
    } else if (t === T.ICE) {
      ctx.fillStyle = "rgba(255,255,255," + (0.25 + 0.2 * Math.sin(time * 5 + tx)).toFixed(3) + ")";
      ctx.fillRect(sx + 8 + Math.sin(time * 2 + ty) * 4, sy + 10, 10, 2);
    } else if (t === T.ITEM) {
      const tw = 0.5 + 0.5 * Math.sin(time * 8 + tx);
      ctx.fillStyle = "rgba(255,246,200," + (0.2 + tw * 0.35).toFixed(3) + ")";
      ctx.beginPath();
      ctx.arc(sx + 24, sy + 24, 6 + tw * 3, 0, Math.PI * 2);
      ctx.fill();
    } else if (t === T.SPIKE) {
      const sway = Math.sin(time * 2 + tx) * 2;
      ctx.save();
      ctx.translate(sx + 24, sy + 48);
      ctx.rotate(sway * 0.03);
      ctx.restore();
    }
  }

  function drawWorld() {
    const x0 = Math.max(0, Math.floor(cam.x / TILE) - 1);
    const y0 = Math.max(0, Math.floor(cam.y / TILE) - 1);
    const x1 = Math.min(world.w - 1, Math.ceil((cam.x + VIEW_W) / TILE) + 1);
    const y1 = Math.min(world.h - 1, Math.ceil((cam.y + VIEW_H) / TILE) + 1);
    for (let ty = y0; ty <= y1; ty++) {
      for (let tx = x0; tx <= x1; tx++) {
        const t = world.tiles[ty][tx];
        if (t === T.AIR) continue;
        drawTile(t, tx, ty, tx * TILE - cam.x, ty * TILE - cam.y);
      }
    }
    for (const m of world.movers) {
      for (let i = 0; i < 3; i++) {
        const mx = m.x - cam.x + i * TILE;
        const my = m.y - cam.y - 8;
        if (!drawStripTile(assets.woodStrip, Math.floor(m.x / TILE) + i, 0, mx, my, "cap")) {
          ctx.drawImage(tileset.wood, mx, my, TILE, TILE);
        }
      }
    }
    drawThemeDeco();
  }

  function drawThemeDeco() {
    if (!world || !world.theme) return;
    const spec = sceneryOf(world.theme.id);
    if (!spec || !spec.props) return;
    const x0 = Math.floor(cam.x / TILE) - 3;
    const x1 = Math.ceil((cam.x + VIEW_W) / TILE) + 3;
    const id = world.theme.id;
    for (const deco of spec.props) {
      const variants = (deco.keys || []).map((k) => assets[k]).filter(Boolean);
      if (!variants.length) continue;
      for (let tx = x0; tx <= x1; tx++) {
        const hsh = hash32(id + deco.keys[0] + ":" + tx);
        const stride = deco.min + (hsh % Math.max(1, deco.span || 4));
        if ((tx + (hsh % 3)) % stride !== 0) continue;
        if ((hsh % 5) === 0) continue;
        let gy = -1;
        for (let ty = 0; ty < world.h; ty++) {
          if (deco.ground.indexOf(tileAt(tx, ty)) >= 0) { gy = ty; break; }
        }
        if (gy < 0) continue;
        const img = variants[hsh % variants.length];
        const scale = 0.82 + (hsh % 28) / 100;
        const w = deco.w * scale;
        const h = deco.h * scale;
        const x = tx * TILE - cam.x + TILE / 2 - w / 2 + ((hsh % 17) - 8);
        const y = gy * TILE - cam.y + deco.yOff * scale;
        const sway = Math.sin(time * 1.5 + tx * 0.7) * (deco.hang ? (deco.sway || 3) : (deco.sway || 1.4));
        const flip = (hsh & 4) === 0;
        ctx.save();
        ctx.translate(x + w / 2, y + h);
        ctx.rotate(sway * 0.014);
        if (flip) ctx.scale(-1, 1);
        drawSprite(img, -w / 2, -h, w, h, false, false);
        ctx.restore();
      }
    }
  }

  function drawFlag() {
    const f = world.flag;
    const x = f.x - cam.x;
    const y = f.y - cam.y;
    ctx.fillStyle = "#c48a4a";
    ctx.fillRect(x + 10, y, 6, f.h);
    ctx.fillStyle = "#e85d4c";
    ctx.beginPath();
    ctx.moveTo(x + 16, y + 4);
    for (let i = 0; i <= 6; i++) {
      const px = x + 16 + i * 6 + Math.sin(time * 5 + i * 0.7) * 5;
      const py = y + 6 + i * 5.2;
      ctx.lineTo(px, py);
    }
    for (let i = 6; i >= 0; i--) {
      const px = x + 16 + i * 6 + Math.sin(time * 5 + i * 0.7 + 1) * 5;
      const py = y + 34 - i * 0.4;
      ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#fff6c8";
    const cx = x + 30 + Math.sin(time * 5) * 3, cy = y + 18;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const a = -Math.PI / 2 + i * 1.256 + time * 0.4;
      ctx.lineTo(cx + Math.cos(a) * 6, cy + Math.sin(a) * 6);
      ctx.lineTo(cx + Math.cos(a + 0.628) * 3, cy + Math.sin(a + 0.628) * 3);
    }
    ctx.fill();
  }

  function drawBoard(x, y, w, facing) {
    const h = 10;
    ctx.save();
    ctx.translate(x + w / 2, y + h / 2);
    if (facing < 0) ctx.scale(-1, 1);
    ctx.fillStyle = "#2a241c";
    ctx.fillRect(-w / 2, -h / 2 + 2, w, h - 2);
    ctx.fillStyle = "#3cb8a9";
    ctx.fillRect(-w / 2 + 2, -h / 2, w - 4, 6);
    ctx.fillStyle = "#fff6c8";
    ctx.fillRect(-6, -2, 3, 3);
    ctx.fillRect(4, -2, 3, 3);
    ctx.fillStyle = "#6b4224";
    ctx.beginPath(); ctx.arc(-w / 2 + 8, 5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(w / 2 - 8, 5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  function drawGlide(cx, cy, facing) {
    const flap = Math.sin(time * 10) * 6;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.fillStyle = "rgba(126, 224, 210, 0.7)";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-facing * 28, flap - 8, -facing * 36, 16 + flap);
    ctx.quadraticCurveTo(-facing * 10, 10, 0, 6);
    ctx.fill();
    ctx.restore();
  }

  function playerFrame() {
    if (player.shootFlash > 0 && assets.shoot) return assets.shoot;
    if (player.gliding && assets.glide) return assets.glide;
    if (!player.grounded && assets.jump) return assets.jump;
    if (player.grounded && Math.abs(player.vx) > 40) {
      const frames = [assets.walk1, assets.idle, assets.walk2, assets.walk1].filter(Boolean);
      if (frames.length) return frames[Math.floor(player.anim) % frames.length];
    }
    return assets.idle;
  }

  function drawEntities() {
    for (const c of world.coins) {
      if (c.taken) continue;
      const y = c.y + Math.sin(c.bob) * 4;
      const spin = Math.max(0.18, Math.abs(Math.cos(c.bob * 1.6)));
      ctx.save();
      ctx.translate(c.x - cam.x + 14, y - cam.y + 14);
      ctx.scale(spin, 1);
      if (!drawSprite(assets.star, -14, -14, 28, 28, false, false)) {
        ctx.fillStyle = "#f0c14a";
        ctx.beginPath(); ctx.arc(0, 0, 10, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    }
    for (const p of pops) {
      ctx.globalAlpha = 1 - p.t / 0.4;
      ctx.fillStyle = "#fff6c8";
      ctx.font = "bold 18px Nunito";
      ctx.fillText(p.label || "+1", p.x - cam.x, p.y - cam.y - p.t * 40);
      ctx.globalAlpha = 1;
    }

    for (const board of world.boards) {
      if (board.taken) continue;
      drawBoard(board.x - cam.x, board.y - cam.y + Math.sin(board.bob) * 3, 36, 1);
    }
    for (const n of world.notes || []) {
      if (n.taken) continue;
      const x = n.x - cam.x;
      const y = n.y - cam.y + Math.sin(n.bob) * 4;
      ctx.save();
      ctx.translate(x + 14, y + 12);
      ctx.rotate(Math.sin(n.bob * 2) * 0.12);
      ctx.fillStyle = "#fff6c8";
      ctx.fillRect(-10, -12, 20, 24);
      ctx.strokeStyle = "#8a5a12";
      ctx.strokeRect(-10, -12, 20, 24);
      ctx.fillStyle = "#e85d4c";
      ctx.fillRect(-7, -7, 14, 3);
      ctx.fillStyle = "#c48a4a";
      ctx.fillRect(-7, -1, 14, 2);
      ctx.restore();
    }
    for (const s of world.signs || []) {
      const x = s.x - cam.x;
      const y = s.y - cam.y;
      if (!drawSprite(assets.sign, x - 4, y - 8, 52, 80, false, false)) {
        ctx.fillStyle = "#8b5a2b";
        ctx.fillRect(x + 16, y + 28, 8, 40);
        ctx.fillStyle = "#d4a05a";
        ctx.fillRect(x, y, 40, 32);
        ctx.fillStyle = "#6b4224";
        ctx.fillRect(x + 6, y + 8, 28, 4);
        ctx.fillRect(x + 6, y + 16, 20, 4);
      }
    }

    for (const e of world.enemies) {
      if (!e.alive) continue;
      const flip = e.vx > 0;
      const flash = e.hurt > 0;
      const flying = e.kind === "puff" || e.kind === "drip" || e.kind === "moth" || e.kind === "bat" || e.kind === "spark" || e.kind === "spore" || e.kind === "wisp";
      const themed = (e.kind === "mite" && assets.mite)
        || (e.kind === "drip" && assets.drip)
        || (e.kind === "hopper" && assets.hopper)
        || (e.kind === "crab" && assets.crab)
        || null;
      const img = themed || (flying ? assets.puff : assets.sprout);
      const hue = themed ? ""
        : e.kind === "drip" ? "hue-rotate(170deg)"
        : e.kind === "mite" ? "hue-rotate(-50deg) saturate(1.3)"
        : e.kind === "hopper" ? "hue-rotate(35deg) saturate(1.2)"
        : e.kind === "crab" ? "hue-rotate(-15deg) saturate(1.4)"
        : e.kind === "moth" ? "hue-rotate(260deg)"
        : e.kind === "bat" ? "hue-rotate(200deg) saturate(0.4) brightness(0.7)"
        : e.kind === "spark" ? "hue-rotate(50deg) saturate(1.8) brightness(1.3)"
        : e.kind === "spore" ? "hue-rotate(90deg) saturate(0.8)"
        : e.kind === "ember" ? "hue-rotate(10deg) saturate(1.6) brightness(1.15)"
        : e.kind === "wisp" ? "hue-rotate(140deg) brightness(1.4)" : "";
      let use = img;
      if (!themed && flying && assets.puffFlap && Math.sin(e.frame * 1.8) > 0) use = assets.puffFlap;
      if (!themed && !flying && assets.sproutWalk && Math.sin(e.frame * 1.4) > 0) use = assets.sproutWalk;
      const flap = flying ? 1 + Math.sin(e.frame * 1.8) * 0.12 : 1;
      const hopSq = (e.kind === "hopper" || e.kind === "ember") && !e.grounded ? 0.88 : 1;
      const bob = flying ? Math.sin(e.frame) * 3 : Math.sin(e.frame) * 2;
      const ew = (flying ? 50 : 46);
      const eh = (flying ? 42 : 48) * flap * hopSq;
      if (!drawSprite(use || img, e.x - cam.x, e.y - cam.y + bob, ew, eh, flip, flash, hue)) {
        ctx.fillStyle = flying ? "#f3e2c0" : "#5aaa3e";
        ctx.beginPath(); ctx.ellipse(e.x - cam.x + 20, e.y - cam.y + 18, 18, 16, 0, 0, Math.PI * 2); ctx.fill();
      }
    }

    const blink = player.inv > 0 && Math.floor(time * 16) % 2 === 0;
    if (!blink) {
      const breathe = player.grounded && Math.abs(player.vx) < 30 ? 1 + Math.sin(time * 3) * 0.03 : 1;
      const sw = 64 * player.squish;
      const sh = 78 * player.squishV * (player.skating ? 0.92 : 1) * breathe;
      const sx = player.x + player.w / 2 - sw / 2 - cam.x;
      const sy = player.y + player.h - sh + 4 - cam.y;
      if (player.skating && Math.abs(player.vx) > 80) {
        ctx.globalAlpha = 0.22;
        drawSprite(playerFrame(), sx - player.facing * 10, sy, sw, sh, player.facing < 0, false);
        ctx.globalAlpha = 1;
      }
      if (player.gliding) drawGlide(sx + sw / 2, sy + sh * 0.45, player.facing);
      const frame = playerFrame();
      if (!drawSprite(frame, sx, sy, sw, sh, player.facing < 0, player.shootFlash > 0)) {
        ctx.fillStyle = "#e85d4c";
        ctx.fillRect(sx + 16, sy, 32, 20);
        ctx.fillStyle = "#f7d9a8";
        ctx.beginPath(); ctx.arc(sx + 32, sy + 28, 14, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#3d6b9a";
        ctx.fillRect(sx + 18, sy + 38, 28, 24);
      }
      if (player.skating) {
        drawBoard(player.x + player.w / 2 - 20 - cam.x, player.y + player.h - 6 - cam.y, 40, player.facing);
        const spin = time * 18 * Math.sign(player.vx || player.facing);
        ctx.fillStyle = "#fff6c8";
        const bx = player.x + player.w / 2 - cam.x;
        const by = player.y + player.h + 2 - cam.y;
        ctx.save();
        ctx.translate(bx - 10, by);
        ctx.rotate(spin);
        ctx.fillRect(-2, -2, 4, 4);
        ctx.restore();
        ctx.save();
        ctx.translate(bx + 10, by);
        ctx.rotate(spin);
        ctx.fillRect(-2, -2, 4, 4);
        ctx.restore();
      }
    }

    if (world.theme && world.theme.gust) {
      ctx.strokeStyle = "rgba(255,255,255,0.22)";
      ctx.lineWidth = 2;
      for (let i = 0; i < 6; i++) {
        const y = ((time * 80 + i * 90) % (VIEW_H + 40)) - 20;
        const x = 40 + i * 200 + Math.sin(time * world.theme.gust) * 80;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 50 + Math.sin(time * 3 + i) * 10, y + 4);
        ctx.stroke();
      }
    }

    for (const b of bullets) {
      ctx.save();
      ctx.translate(b.x - cam.x, b.y - cam.y);
      ctx.rotate(Math.atan2(b.vy, b.vx));
      ctx.fillStyle = "rgba(126,224,210,0.25)";
      ctx.beginPath();
      ctx.ellipse(-12, 0, 14, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = b.color || "#7ee0d2";
      ctx.beginPath();
      ctx.ellipse(0, 0, 10, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = b.core || "#fff6c8";
      ctx.beginPath();
      ctx.ellipse(2, 0, 4, 3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    for (const p of particles) {
      ctx.globalAlpha = Math.max(0, p.life / p.max);
      ctx.fillStyle = p.col;
      ctx.beginPath();
      ctx.arc(p.x - cam.x, p.y - cam.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function draw() {
    ctx.save();
    if (cam.shake > 0) {
      ctx.translate((Math.random() - 0.5) * cam.shake, (Math.random() - 0.5) * cam.shake);
    }
    ctx.imageSmoothingEnabled = true;
    drawBg();
    if (world) {
      drawWorld();
      drawFlag();
      drawEntities();
    }
    ctx.restore();
    if (state === "play" && world && world.theme && world.theme.dark && player) {
      const px = player.x + player.w / 2 - cam.x;
      const py = player.y + player.h / 2 - cam.y;
      const g = ctx.createRadialGradient(px, py, 70, px, py, 360);
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(0.55, "rgba(0,0,0,0.35)");
      g.addColorStop(1, "rgba(0,0,0,0.82)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, VIEW_W, VIEW_H);
    }
    if (state === "play" && world && world.theme && world.theme.aurora) {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < 4; i++) {
        const y = 40 + i * 38 + Math.sin(time * 0.7 + i) * 16;
        ctx.fillStyle = i % 2 ? "rgba(70, 220, 160, 0.08)" : "rgba(130, 110, 255, 0.08)";
        ctx.beginPath();
        ctx.moveTo(0, y);
        for (let x = 0; x <= VIEW_W; x += 40) {
          ctx.lineTo(x, y + Math.sin(time * 1.2 + x * 0.02 + i) * 22);
        }
        ctx.lineTo(VIEW_W, y + 50);
        ctx.lineTo(0, y + 50);
        ctx.fill();
      }
      ctx.restore();
    }
    if (state === "play" && mouse.on) drawCrosshair();
  }

  function drawCrosshair() {
    const x = mouse.x;
    const y = mouse.y;
    ctx.strokeStyle = "rgba(255, 246, 200, 0.95)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.moveTo(x - 16, y); ctx.lineTo(x - 6, y);
    ctx.moveTo(x + 6, y); ctx.lineTo(x + 16, y);
    ctx.moveTo(x, y - 16); ctx.lineTo(x, y - 6);
    ctx.moveTo(x, y + 6); ctx.lineTo(x, y + 16);
    ctx.stroke();
    ctx.fillStyle = "#e85d4c";
    ctx.beginPath();
    ctx.arc(x, y, 2.2, 0, Math.PI * 2);
    ctx.fill();
  }

  function startRun(mapId) {
    const spec = MAPS.find((m) => m.id === mapId);
    if (spec && spec.locked) {
      showMaps();
      return;
    }
    currentMap = (spec && !spec.locked) ? spec.id : "meadow";
    progress.lastMap = currentMap;
    saveProgress();
    world = buildWorld();
    player = makePlayer();
    player.gun = currentGun;
    bullets.length = 0;
    particles.length = 0;
    pops.length = 0;
    cam.x = 0; cam.y = 80; cam.shake = 0;
    hintT = 0;
    hintEl.hidden = false;
    hudEl.hidden = false;
    overlay.hidden = true;
    viewHub.hidden = true;
    viewMaps.hidden = true;
    viewStatus.hidden = true;
    state = "play";
    canvas.classList.add("aiming");
    if (toastEl) toastEl.hidden = true;
    toastT = 0;
    refreshHud();
    if (audio) audio.startMusic();
    canvas.focus();
    syncChrome();
  }

  function frame(ts) {
    if (!last) last = ts;
    let dt = (ts - last) / 1000;
    last = ts;
    if (dt > 0.05) dt = 0.05;
    acc += dt;
    const step = 1 / 60;
    while (acc >= step) {
      if (state === "play") updatePlay(step);
      acc -= step;
    }
    draw();
    requestAnimationFrame(frame);
  }

  async function boot() {
    ctx.fillStyle = "#7eb7e6";
    ctx.fillRect(0, 0, VIEW_W, VIEW_H);
    ctx.fillStyle = "#fff4e3";
    ctx.font = "600 28px Nunito";
    ctx.textAlign = "center";
    ctx.fillText("Cozy-Platformer", VIEW_W / 2, VIEW_H / 2);
    await loadAssets();
    world = buildWorld();
    player = makePlayer();
    cam.x = 0; cam.y = 40;
    loadProgress();
    bindGuideUi();
    renderMapGrid();
    showHub();
    requestAnimationFrame(frame);
  }

  boot();
})();
