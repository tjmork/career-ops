import fs from "fs";

const p = process.argv[2];
const s = fs.readFileSync(p, "utf8");
console.log("length", s.length);

const desc = s.match(/"description"\s*:\s*"((?:[^"\\]|\\.)*)"/);
if (desc) {
  console.log("\n--- description (escaped) ---\n");
  console.log(JSON.parse('"' + desc[1].replace(/^"|"$/g, "") + '"').slice(0, 8000));
}

// Try __NEXT_DATA__ style
const nd = s.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
if (nd) {
  try {
    const j = JSON.parse(nd[1]);
    const str = JSON.stringify(j, null, 0);
    const hit = str.match(/Software Engineer.{0,500}/);
    console.log("\nnext hit", hit?.[0]);
  } catch (e) {
    console.log("next parse err", e.message);
  }
}

// Raw search for common JD phrases
for (const needle of [
  "Responsibilities",
  "Qualifications",
  "Required",
  "Trimble",
  "Westminster",
]) {
  const i = s.indexOf(needle);
  if (i >= 0) console.log(needle, "at", i, s.slice(i, i + 400).replace(/\s+/g, " "));
}

const keys = [
  "encodedHtmlDescription",
  "htmlDescription",
  "job_description",
  "jobDescription",
  "posting",
  "qualifications",
  "responsibility",
  "jobReqId",
  "department",
];
for (const k of keys) {
  let idx = 0;
  let c = 0;
  while (c < 3) {
    const i = s.indexOf(`"${k}"`, idx);
    if (i < 0) break;
    console.log("KEY", k, "at", i, "snippet:", s.slice(i, i + 120).replace(/\s+/g, " "));
    idx = i + 1;
    c++;
  }
}
