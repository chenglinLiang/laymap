// One-shot: inject cost_snapshot_en after each cost_snapshot in cities.json.
// Keys are BVIDs; values are the English variants. "Info pending" is used for
// placeholders (matching the Chinese "信息待补充").
const fs = require("fs");
const path = require("path");

const EN = {
  BV1QQLFzrEDs: {
    monthly_rent: "350-400 RMB/month (2-bed); 150-200 RMB/month (single)",
    meals: "Fast food 7 RMB, generous portions",
    house_price: "<100k RMB/unit",
    utilities: "Info pending",
  },
  BV1hxg8zVE8i: {
    monthly_rent: "500-600 RMB/month",
    meals: "Breakfast under 10 RMB",
    house_price: "Info pending",
    utilities: "Info pending",
  },
  BV1jqDHYREs7: {
    monthly_rent: "500-600 RMB/month",
    meals: "Rice plate 15 RMB",
    house_price: "99k RMB/unit",
    utilities: "Info pending",
  },
  BV1GucuzwEFm: {
    monthly_rent: "800-1500 RMB/month (off-season)",
    meals: "Rice noodles 5-6 RMB, small eateries ~10 RMB",
    house_price: "Mid-range; specifics unavailable",
    utilities: "Info pending",
  },
  BV138TszsEzj: {
    monthly_rent: "500-600 RMB/month",
    meals: "Rice plate 5 RMB, veggies 10 RMB/large bag",
    house_price: "100k RMB/unit",
    utilities: "Info pending",
  },
  BV16bAhzyE1F: {
    monthly_rent: "300-800 RMB/month",
    meals: "Breakfast 1.5 RMB, cold jelly 5 RMB",
    house_price: "100k RMB/unit",
    utilities: "Info pending",
  },
  BV1yHQDYHEkd: {
    monthly_rent: "600-1000 RMB/month",
    meals: "Self-catering suggested; groceries from supermarkets",
    house_price: "Info pending",
    utilities: "Info pending",
  },
  BV1zQiKBBEgK: {
    monthly_rent: "800 RMB/month",
    meals: "Noodle bowl 6 RMB",
    house_price: "1.2M RMB/unit",
    utilities: "Info pending",
  },
  BV1G7MfzxES1: {
    monthly_rent: "600-700 RMB/month",
    meals: "Info pending",
    house_price: "Info pending",
    utilities: "Info pending",
  },
  BV1Jq4y1Z7P1: {
    monthly_rent: "800 RMB/month",
    meals: "Info pending",
    house_price: "12k RMB/\u33a1",
    utilities: "Info pending",
  },
  BV1iShczoEfK: {
    monthly_rent: "700-2000 RMB/month",
    meals: "Eating out ~10 RMB/meal",
    house_price: "Info pending",
    utilities: "Info pending",
  },
  BV1ZgSeB7EeE: {
    monthly_rent: "150-250 RMB/month",
    meals: "Rice plate 7 RMB",
    house_price: "80-90k RMB/unit",
    utilities: "Info pending",
  },
  BV1oLMMzXEyv: {
    monthly_rent: "400-500 RMB/month",
    meals: "Info pending",
    house_price: "100k RMB/unit",
    utilities: "Info pending",
  },
  BV1KA9CYuEKz: {
    monthly_rent: "500-600 RMB/month",
    meals: "Low prices at supermarkets and markets",
    house_price: "100k RMB/unit",
    utilities: "Info pending",
  },
  BV1FKyZB6EUU: {
    monthly_rent: "600-700 RMB/month",
    meals: "Rice noodles 7-8 RMB",
    house_price: "1.2M RMB/unit",
    utilities: "Info pending",
  },
  BV1sjeezuEwP: {
    monthly_rent: "700 RMB/month",
    meals: "Mini meat skewers 1 RMB each",
    house_price: "120k RMB/unit",
    utilities: "Info pending",
  },
  BV1ofLQ6mE8p: {
    monthly_rent: "600-800 RMB/month",
    meals: "Info pending",
    house_price: "150k RMB/unit",
    utilities: "Info pending",
  },
  BV1iebZzjE1J: {
    monthly_rent: "Info pending",
    meals: "Info pending",
    house_price: "60-80k RMB/unit",
    utilities: "Info pending",
  },
  BV18Ty5Y6EmX: {
    monthly_rent: "600-700 RMB/month (seaview <500 RMB, utilities incl.)",
    meals: "Info pending",
    house_price: "100-200k RMB/unit",
    utilities: "Included in rent",
  },
  BV12MpjzhE8V: {
    monthly_rent: "Info pending",
    meals: "Meal 7-8 RMB",
    house_price: "From 6000 RMB/\u33a1",
    utilities: "Info pending",
  },
  BV1inYkzyEGx: {
    monthly_rent: "Info pending",
    meals: "Pickled-cabbage bean hotpot 10 RMB/person",
    house_price: "300k RMB/unit",
    utilities: "Info pending",
  },
  BV1Tz28YQEcY: {
    monthly_rent: "600-3000 RMB/month",
    meals: "Street meals 18-20 RMB",
    house_price: "200k+ RMB/unit",
    utilities: "Info pending",
  },
  BV1ea4y167bT: {
    monthly_rent: "1200-1800 RMB/month",
    meals: "15-20 RMB/meal",
    house_price: "Info pending",
    utilities: "Info pending",
  },
  BV1WiCjYvE9y: {
    monthly_rent: "1000+ RMB/month",
    meals: "Mall area pricier; surrounding shops normal",
    house_price: "400k+ RMB/unit",
    utilities: "Info pending",
  },
  BV1YgAZzkERz: {
    monthly_rent: "600-700 RMB/month",
    meals: "Seafood 30 RMB/plate",
    house_price: "100-200k RMB/unit",
    utilities: "Info pending",
  },
  BV1ZxAzeuE2X: {
    monthly_rent: "500-1700 RMB/month",
    meals: "Info pending",
    house_price: "Info pending",
    utilities: "Info pending",
  },
  BV1iJf7YFENC: {
    monthly_rent: "Info pending",
    meals: "Info pending",
    house_price: "8k-30k RMB/unit",
    utilities: "Info pending",
  },
  BV1XWEs6BE4s: {
    monthly_rent: "300 RMB/month",
    meals: "Peaches 3-5 RMB/500g",
    house_price: "10-30k RMB/unit",
    utilities: "Info pending",
  },
  BV1AVQHYKEmR: {
    monthly_rent: "300-400 RMB/month",
    meals: "5 RMB noodle soups",
    house_price: "200k RMB/\u33a1",
    utilities: "Info pending",
  },
  BV1xg41127WJ: {
    monthly_rent: "600 RMB/month",
    meals: "Info pending",
    house_price: "Info pending",
    utilities: "Utilities ~409 RMB/month",
  },
  BV18tC8YEEC5: {
    monthly_rent: "300-500 RMB/month",
    meals: "Wide price range available",
    house_price: "Info pending",
    utilities: "Info pending",
  },
  BV1m7RsBJEwB: {
    monthly_rent: "Off-season 500-800 RMB/month; peak 1000-1500 RMB/month",
    meals: "Veggie dish 3 RMB, meat dish 6.8 RMB",
    house_price: "3800-3900 RMB/\u33a1, ~400k for 100\u33a1",
    utilities: "Info pending",
  },
  BV1AZUmBfEx6: {
    monthly_rent: "400-500 RMB/month",
    meals: "Info pending",
    house_price: "Under 100k RMB/unit",
    utilities: "Info pending",
  },
  BV15FXHB7Ebe: {
    monthly_rent: "500-600 RMB/month",
    meals: "10-15 RMB/meal",
    house_price: "30-50k RMB/unit",
    utilities: "Info pending",
  },
  BV1w16HBYEm3: {
    monthly_rent: "500-900 RMB/month",
    meals: "Seafood 90 RMB/large bag, knife-cut noodles 10 RMB",
    house_price: "70-200k RMB/unit",
    utilities: "Info pending",
  },
  BV1qxykYwEFF: {
    monthly_rent: "600-2000 RMB/month",
    meals: "Egg pulled noodles 10 RMB, beef/mutton paomo 18 RMB",
    house_price: "Info pending",
    utilities: "Info pending",
  },
  BV1mSjR6LECD: {
    monthly_rent: "200-800 RMB/month",
    meals: "Pork 2.5 RMB/500g, radish 5 RMB for 4",
    house_price: "Villa 2000-3000 RMB/month",
    utilities: "Info pending",
  },
  BV1PsaqzCE9x: {
    monthly_rent: "500 RMB/month",
    meals: "Info pending",
    house_price: "100k RMB/unit",
    utilities: "Info pending",
  },
  BV1isxYzvERQ: {
    monthly_rent: "900-1500 RMB/month",
    meals: "Rice plate 15 RMB",
    house_price: "Info pending",
    utilities: "Info pending",
  },
  BV1VDdoYhEQr: {
    monthly_rent: "Free",
    meals: "Mostly restaurants; low daily costs",
    house_price: "Info pending",
    utilities: "Info pending",
  },
  BV1rDC9BFEoc: {
    monthly_rent: "7800 RMB/month (lower off-season)",
    meals: "Info pending",
    house_price: "3-4k RMB/\u33a1, 200k RMB/unit",
    utilities: "Info pending",
  },
  BV14m4y137Tn: {
    monthly_rent: "650-1500 RMB/month",
    meals: "Breakfast under 5 RMB, lunch 15 RMB",
    house_price: "Info pending",
    utilities: "Info pending",
  },
  BV14k7p69EUp: {
    monthly_rent: "Off-season 400-500 RMB; peak 3000-4000 RMB",
    meals: "Buns & soy milk 3 RMB, coconut 3-5 RMB",
    house_price: "100k+ RMB/unit",
    utilities: "Info pending",
  },
  BV1PirfYUEeC: {
    monthly_rent: "600-700 RMB/month (off-season)",
    meals: "Pork knuckle rice 8 RMB",
    house_price: "30-40k RMB/unit",
    utilities: "Info pending",
  },
  BV1Yn4y1f7gB: {
    monthly_rent: "Under 1000 RMB/month",
    meals: "Info pending",
    house_price: "Info pending",
    utilities: "Info pending",
  },
  BV1rpXnYAEmA: {
    monthly_rent: "0-500 RMB/month",
    meals: "Info pending",
    house_price: "Info pending",
    utilities: "Info pending",
  },
  BV18s2AYjEKn: {
    monthly_rent: "1800 RMB/month",
    meals: "Veggie dish 10-13 RMB, meat dish 15-18 RMB",
    house_price: "Info pending",
    utilities: "Info pending",
  },
  BV1X94y1Z7XD: {
    monthly_rent: "600 RMB/month",
    meals: "Rice plate 15 RMB",
    house_price: "Info pending",
    utilities: "Info pending",
  },
  BV1Z3411w7f3: {
    monthly_rent: "300-800 RMB/month",
    meals: "Breakfast 20 RMB, ~200 RMB/day on average",
    house_price: "Info pending",
    utilities: "Info pending",
  },
};

const file = path.join(__dirname, "..", "src", "data", "cities.json");
let txt = fs.readFileSync(file, "utf8");

// Find each city by its BVID, then locate the cost_snapshot block that
// precedes that BVID and inject cost_snapshot_en right after it.
let inserted = 0;
let missing = 0;

for (const [bvid, en] of Object.entries(EN)) {
  const bvidIdx = txt.indexOf(`"bvid": "${bvid}"`);
  if (bvidIdx === -1) {
    console.error("BVID not found: " + bvid);
    missing++;
    continue;
  }
  // Search backwards from bvid for the closing of cost_snapshot block.
  // The block closes with `    },` at 4-space indent (it's a top-level city field).
  const costKey = '"cost_snapshot": {';
  const costIdx = txt.lastIndexOf(costKey, bvidIdx);
  if (costIdx === -1) {
    console.error("cost_snapshot not found before " + bvid);
    missing++;
    continue;
  }
  // Find the closing brace of cost_snapshot: first `\n    }` after costIdx.
  const closeRe = /\n    \},/;
  const m = txt.slice(costIdx).match(closeRe);
  if (!m) {
    console.error("cost_snapshot close not found for " + bvid);
    missing++;
    continue;
  }
  const closeAbs = costIdx + m.index + m[0].length;

  // Skip if already has cost_snapshot_en right after.
  const after = txt.slice(closeAbs, closeAbs + 60);
  if (after.includes('"cost_snapshot_en"')) {
    continue;
  }

  const enBlock =
    '\n    "cost_snapshot_en": {\n' +
    `      "monthly_rent": ${JSON.stringify(en.monthly_rent)},\n` +
    `      "meals": ${JSON.stringify(en.meals)},\n` +
    `      "house_price": ${JSON.stringify(en.house_price)},\n` +
    `      "utilities": ${JSON.stringify(en.utilities)}\n` +
    "    },";

  txt = txt.slice(0, closeAbs) + enBlock + txt.slice(closeAbs);
  inserted++;
}

fs.writeFileSync(file, txt);
console.log(`Inserted ${inserted} cost_snapshot_en blocks; missing=${missing}`);
