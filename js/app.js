"use strict";

const SAFE_URL = /^https:\/\//i;

const els = {
  grid: document.getElementById("resource-grid"),
  empty: document.getElementById("empty-state"),
  search: document.getElementById("search-input"),
  count: document.getElementById("result-count"),
  footer: document.getElementById("footer-note"),
  crisisBanner: document.getElementById("crisis-banner"),
  crisisHeading: document.getElementById("crisis-heading"),
  crisisMessage: document.getElementById("crisis-message"),
  crisisList: document.getElementById("crisis-list"),
};

let organizations = [];

function externalLinkIcon() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.setAttribute("aria-hidden", "true");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M14 3h7v7M21 3l-9 9M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5");
  svg.appendChild(path);
  return svg;
}

function buildCard(org) {
  const card = document.createElement("article");
  card.className = "card";

  const name = document.createElement("h2");
  name.className = "card__name";
  name.textContent = org.name;
  card.appendChild(name);

  if (org.primaryLocation) {
    const loc = document.createElement("p");
    loc.className = "card__location";
    loc.textContent = org.primaryLocation;
    card.appendChild(loc);
  }

  const mission = document.createElement("p");
  mission.className = "card__mission";
  mission.textContent = org.missionStatement;
  card.appendChild(mission);

  if (org.description) {
    const details = document.createElement("details");
    details.className = "card__detail";
    const summary = document.createElement("summary");
    summary.textContent = "More about this program";
    const body = document.createElement("p");
    body.className = "card__detail-body";
    body.textContent = org.description;
    details.appendChild(summary);
    details.appendChild(body);
    card.appendChild(details);
  }

  if (org.notes) {
    const note = document.createElement("p");
    note.className = "card__note";
    note.textContent = org.notes;
    card.appendChild(note);
  }

  if (Array.isArray(org.tags) && org.tags.length > 0) {
    const tags = document.createElement("ul");
    tags.className = "card__tags";
    org.tags.forEach((tag) => {
      const li = document.createElement("li");
      li.className = "card__tag";
      li.textContent = tag.replace(/-/g, " ");
      tags.appendChild(li);
    });
    card.appendChild(tags);
  }

  const cta = document.createElement("div");
  cta.className = "card__cta";
  if (SAFE_URL.test(org.website)) {
    const link = document.createElement("a");
    link.className = "card__link";
    link.href = org.website;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.append("Visit website ");
    link.appendChild(externalLinkIcon());
    cta.appendChild(link);
  }
  card.appendChild(cta);

  return card;
}

function render(list) {
  els.grid.replaceChildren();
  list.forEach((org) => els.grid.appendChild(buildCard(org)));

  const total = organizations.length;
  const shown = list.length;
  els.empty.hidden = shown !== 0;
  els.count.textContent =
    shown === total
      ? `Showing all ${total} organizations`
      : `Showing ${shown} of ${total} organizations`;
}

function matches(org, query) {
  const haystack = [
    org.name,
    org.primaryLocation,
    org.missionStatement,
    org.notes,
    org.description,
    Array.isArray(org.tags) ? org.tags.join(" ") : "",
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

function onSearch() {
  const query = els.search.value.trim().toLowerCase();
  if (!query) {
    render(organizations);
    return;
  }
  render(organizations.filter((org) => matches(org, query)));
}

function renderCrisis(data) {
  if (!data || !Array.isArray(data.resources) || data.resources.length === 0) {
    return;
  }
  els.crisisHeading.textContent = data.heading || "Need help right now?";
  els.crisisMessage.textContent = data.message || "";
  els.crisisList.replaceChildren();

  data.resources.forEach((item) => {
    const li = document.createElement("li");
    const strong = document.createElement("strong");
    strong.textContent = `${item.name}: `;
    li.appendChild(strong);
    if (item.tel) {
      const link = document.createElement("a");
      link.href = `tel:${item.tel.replace(/[^0-9]/g, "")}`;
      link.textContent = item.action;
      li.appendChild(link);
    } else {
      li.append(item.action);
    }
    els.crisisList.appendChild(li);
  });

  els.crisisBanner.hidden = false;
}

async function loadJson(path) {
  const res = await fetch(path, { cache: "no-cache" });
  if (!res.ok) {
    throw new Error(`Failed to load ${path}: ${res.status}`);
  }
  return res.json();
}

async function init() {
  try {
    const crisis = await loadJson("data/crisis-resources.json");
    renderCrisis(crisis);
  } catch (err) {
    console.error(err);
  }

  try {
    const data = await loadJson("data/resources.json");
    organizations = (data.organizations || []).slice().sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    els.footer.textContent = data.footer || "";
    render(organizations);
    els.search.addEventListener("input", onSearch);
  } catch (err) {
    console.error(err);
    els.empty.hidden = false;
    els.empty.textContent = "We could not load the resource list right now. Please try again later.";
  }
}

document.addEventListener("DOMContentLoaded", init);
