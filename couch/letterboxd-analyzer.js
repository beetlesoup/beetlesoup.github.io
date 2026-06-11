// UPLOAD ZIP
(() => {
  const dropzone = document.getElementById("dropzone");
  const pickBtn = document.getElementById("pickBtn");
  const fileInput = document.getElementById("fileInput");
  const statusEl = document.getElementById("status");

  const EXPECTED = [
    "ratings.csv",
    "watched.csv",
    "diary.csv",
    "reviews.csv",
    "comments.csv",
    "lists.csv"
  ];

  function setStatus(html) {
    statusEl.innerHTML = html;
  }

  function isZip(file) {
    return file && (file.name.toLowerCase().endsWith(".zip") || file.type === "application/zip");
  }

  async function handleZip(file) {
    if (!isZip(file)) {
      setStatus(`<div class="bad">✗ Not a ZIP file. Upload your Letterboxd export .zip</div>`);
      return;
    }

    setStatus(`Unzipping…`);

    const buf = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(buf);

    // Collect file names (normalize to lower-case basenames)
    const names = [];
    zip.forEach((relativePath, zipEntry) => {
      if (!zipEntry.dir) names.push(relativePath);
    });

    const basenames = names.map(p => p.split("/").pop().toLowerCase());
    const found = EXPECTED.filter(x => basenames.includes(x));

    // Basic “looks like letterboxd export” check
    if (found.length === 0) {
      setStatus(`
        <div class="bad">✗ ZIP opened, but I don’t see the usual Letterboxd CSVs.</div>
        <div>Found files:</div>
        <pre style="white-space:pre-wrap">${names.slice(0, 80).join("\n")}${names.length>80 ? "\n…" : ""}</pre>
      `);
      return;
    }

    setStatus(`
      <div class="ok">✓ Export loaded.</div>
      <div>Detected:</div>
      <ul>${found.map(f => `<li>${f}</li>`).join("")}</ul>
      <div style="opacity:.8">Next: parse CSVs → compute stats.</div>
    `);

    // If you want, stash zip for next step:
    window.__lb_zip = zip; // yup, a little hacky but handy for step-by-step
  }

  function onFiles(files) {
    const file = files && files[0];
    if (!file) return;
    handleZip(file).catch(err => {
      console.error(err);
      setStatus(`<div class="bad">✗ Error reading ZIP: ${String(err.message || err)}</div>`);
    });
  }

  // Button → file picker
  pickBtn.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", (e) => onFiles(e.target.files));

  // Dropzone click also opens picker
  dropzone.addEventListener("click", () => fileInput.click());
  dropzone.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") fileInput.click();
  });

  // Drag/drop
  ["dragenter", "dragover"].forEach(evt => {
    dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add("dragover");
    });
  });
  ["dragleave", "drop"].forEach(evt => {
    dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove("dragover");
    });
  });
  dropzone.addEventListener("drop", (e) => {
    onFiles(e.dataTransfer.files);
  });

  setStatus(`Awaiting upload… 🇫🇷 allez, on y va.`);
})();

// best and worst years
async function parseCSV(text) {
  const lines = text.trim().split("\n");
  const headers = lines.shift().split(",").map(h => h.trim());
  return lines.map(line => {
    const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = values[i]?.replace(/^"|"$/g, "").trim();
    });
    return obj;
  });
}

async function computeBestWorstByYear() {
  const zip = window.__lb_zip;
  if (!zip) throw new Error("No ZIP loaded");

  // find ratings.csv
  const ratingsFile = Object.values(zip.files).find(f =>
    f.name.toLowerCase().endsWith("ratings.csv")
  );
  if (!ratingsFile) throw new Error("ratings.csv not found");

  const csvText = await ratingsFile.async("string");
  const rows = await parseCSV(csvText);

  // normalize + filter
  const films = rows
    .map(r => ({
      title: r.Name,
      year: Number(r.Year),
      rating: Number(r.Rating)
    }))
    .filter(f => f.year && f.rating);

  // group by year
  const byYear = {};
  for (const f of films) {
    byYear[f.year] ??= [];
    byYear[f.year].push(f);
  }

  // compute best/worst
  const results = Object.entries(byYear)
    .map(([year, list]) => {
      const sorted = [...list].sort((a, b) => b.rating - a.rating);
      return {
        year,
        best: sorted[0],
        worst: sorted[sorted.length - 1]
      };
    })
    .sort((a, b) => b.year - a.year); // newest first

  renderYearStats(results);
}

function renderYearStats(data) {
  const root = document.getElementById("yearResults");
  root.innerHTML = "";

  for (const { year, best, worst } of data) {
    const el = document.createElement("div");
    el.className = "year-row";
    el.innerHTML = `
      <h3>${year}</h3>
      <div><strong>Best:</strong> ${best.title} (${best.rating}★)</div>
      <div><strong>Worst:</strong> ${worst.title} (${worst.rating}★)</div>
    `;
    root.appendChild(el);
  }
}

// run it
computeBestWorstByYear().catch(err => {
  console.error(err);
  document.getElementById("yearResults").textContent =
    "Could not compute year stats.";
});