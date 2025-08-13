/* ---------- Map + data ---------- */
const map = L.map("map").setView([0.0236, 37.9062], 6);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

const dummyFacilities = [
  // ===== NAIROBI =====
  {
    name: "Nairobi Wellness Centre",
    lat: -1.2833,
    lng: 36.8219,
    type: "mental",
    county: "Nairobi",
    subcounty: "Central",
    constituency: "Westlands",
    ward: "Kangemi",
  },
  {
    name: "Nairobi Rehab Clinic",
    lat: -1.29,
    lng: 36.82,
    type: "rehab",
    county: "Nairobi",
    subcounty: "Central",
    constituency: "Starehe",
    ward: "Pangani",
  },
  {
    name: "Langata Recovery Home",
    lat: -1.318,
    lng: 36.789,
    type: "rehab",
    county: "Nairobi",
    subcounty: "Langata",
    constituency: "Langata",
    ward: "Karen",
  },
  {
    name: "Kibera Mental Support",
    lat: -1.3134,
    lng: 36.8226,
    type: "mental",
    county: "Nairobi",
    subcounty: "Kibra",
    constituency: "Kibra",
    ward: "Laini Saba",
  },
  {
    name: "Eastleigh Mental Health Unit",
    lat: -1.283,
    lng: 36.855,
    type: "mental",
    county: "Nairobi",
    subcounty: "Kamukunji",
    constituency: "Kamukunji",
    ward: "Eastleigh North",
  },
  {
    name: "Donholm Recovery Centre",
    lat: -1.297,
    lng: 36.89,
    type: "rehab",
    county: "Nairobi",
    subcounty: "Embakasi West",
    constituency: "Embakasi West",
    ward: "Umoja",
  },
  {
    name: "Ruaraka Rehab Home",
    lat: -1.23,
    lng: 36.87,
    type: "rehab",
    county: "Nairobi",
    subcounty: "Ruaraka",
    constituency: "Ruaraka",
    ward: "Baba Dogo",
  },
  {
    name: "South B Mental Support Unit",
    lat: -1.315,
    lng: 36.85,
    type: "mental",
    county: "Nairobi",
    subcounty: "Makadara",
    constituency: "Makadara",
    ward: "South B",
  },
  {
    name: "Dagoretti Wellness Centre",
    lat: -1.308,
    lng: 36.72,
    type: "mental",
    county: "Nairobi",
    subcounty: "Dagoretti North",
    constituency: "Dagoretti North",
    ward: "Kileleshwa",
  },
  {
    name: "Kasarani Recovery Clinic",
    lat: -1.223,
    lng: 36.89,
    type: "rehab",
    county: "Nairobi",
    subcounty: "Kasarani",
    constituency: "Kasarani",
    ward: "Clay City",
  },
  {
    name: "Karen Hills Recovery",
    lat: -1.345,
    lng: 36.722,
    type: "rehab",
    county: "Nairobi",
    subcounty: "Langata",
    constituency: "Langata",
    ward: "Karen",
  },
  {
    name: "Githurai Mental Wellness",
    lat: -1.173,
    lng: 36.94,
    type: "mental",
    county: "Nairobi",
    subcounty: "Kasarani",
    constituency: "Kasarani",
    ward: "Githurai",
  },

  // ===== KISUMU =====
  {
    name: "Kisumu Mental Health",
    lat: -0.0917,
    lng: 34.768,
    type: "mental",
    county: "Kisumu",
    subcounty: "Kisumu Central",
    constituency: "Kisumu Central",
    ward: "Railways",
  },
  {
    name: "Kisumu West Rehab",
    lat: -0.095,
    lng: 34.73,
    type: "rehab",
    county: "Kisumu",
    subcounty: "Kisumu West",
    constituency: "Kisumu West",
    ward: "Ojolla",
  },
  {
    name: "Obunga Mental Unit",
    lat: -0.102,
    lng: 34.76,
    type: "mental",
    county: "Kisumu",
    subcounty: "Kisumu Central",
    constituency: "Kisumu Central",
    ward: "Obunga",
  },
  {
    name: "Ahero Recovery Home",
    lat: -0.171,
    lng: 34.92,
    type: "rehab",
    county: "Kisumu",
    subcounty: "Nyando",
    constituency: "Nyando",
    ward: "Ahero",
  },
  {
    name: "Maseno Mental Support",
    lat: 0.003,
    lng: 34.606,
    type: "mental",
    county: "Kisumu",
    subcounty: "Kisumu West",
    constituency: "Kisumu West",
    ward: "Maseno",
  },
  {
    name: "Nyamasaria Recovery Centre",
    lat: -0.11,
    lng: 34.8,
    type: "rehab",
    county: "Kisumu",
    subcounty: "Kisumu East",
    constituency: "Kisumu East",
    ward: "Manyatta",
  },

  // ===== SIAYA =====
  {
    name: "Siaya Wellness Centre",
    lat: 0.061,
    lng: 34.288,
    type: "mental",
    county: "Siaya",
    subcounty: "Siaya",
    constituency: "Alego Usonga",
    ward: "Siaya Township",
  },
  {
    name: "Bondo Recovery Facility",
    lat: 0.091,
    lng: 34.278,
    type: "rehab",
    county: "Siaya",
    subcounty: "Bondo",
    constituency: "Bondo",
    ward: "Bondo Township",
  },
  {
    name: "Ugunja Mental Health",
    lat: 0.174,
    lng: 34.365,
    type: "mental",
    county: "Siaya",
    subcounty: "Ugunja",
    constituency: "Ugunja",
    ward: "Ugunja",
  },
  {
    name: "Usenge Rehab Centre",
    lat: 0.028,
    lng: 34.023,
    type: "rehab",
    county: "Siaya",
    subcounty: "Bondo",
    constituency: "Bondo",
    ward: "Usenge",
  },
  {
    name: "Yala Mental Wellness",
    lat: 0.088,
    lng: 34.535,
    type: "mental",
    county: "Siaya",
    subcounty: "Gem",
    constituency: "Gem",
    ward: "Yala Township",
  },

  // ===== HOMA BAY =====
  {
    name: "Homa Bay Mental Clinic",
    lat: -0.527,
    lng: 34.457,
    type: "mental",
    county: "Homa Bay",
    subcounty: "Homa Bay Town",
    constituency: "Homa Bay Town",
    ward: "Asego",
  },
  {
    name: "Mbita Recovery Facility",
    lat: -0.422,
    lng: 34.208,
    type: "rehab",
    county: "Homa Bay",
    subcounty: "Mbita",
    constituency: "Suba North",
    ward: "Mbita Township",
  },
  {
    name: "Ndhiwa Wellness Home",
    lat: -0.747,
    lng: 34.418,
    type: "mental",
    county: "Homa Bay",
    subcounty: "Ndhiwa",
    constituency: "Ndhiwa",
    ward: "Ndhiwa",
  },
  {
    name: "Kendu Bay Rehab",
    lat: -0.36,
    lng: 34.642,
    type: "rehab",
    county: "Homa Bay",
    subcounty: "Rachuonyo North",
    constituency: "Karachuonyo",
    ward: "Kendu Bay",
  },
  {
    name: "Rusinga Island Wellness",
    lat: -0.405,
    lng: 34.201,
    type: "mental",
    county: "Homa Bay",
    subcounty: "Mbita",
    constituency: "Suba North",
    ward: "Rusinga Island",
  },

  // ===== MIGORI =====
  {
    name: "Migori Mental Support",
    lat: -1.063,
    lng: 34.473,
    type: "mental",
    county: "Migori",
    subcounty: "Migori",
    constituency: "Suna East",
    ward: "Migori Township",
  },
  {
    name: "Awendo Recovery Home",
    lat: -0.902,
    lng: 34.6,
    type: "rehab",
    county: "Migori",
    subcounty: "Awendo",
    constituency: "Awendo",
    ward: "Awendo",
  },
  {
    name: "Rongo Mental Health Unit",
    lat: -0.847,
    lng: 34.605,
    type: "mental",
    county: "Migori",
    subcounty: "Rongo",
    constituency: "Rongo",
    ward: "Rongo",
  },
  {
    name: "Isebania Rehab Clinic",
    lat: -1.223,
    lng: 34.482,
    type: "rehab",
    county: "Migori",
    subcounty: "Kuría West",
    constituency: "Kuría West",
    ward: "Isebania",
  },
  {
    name: "Macalder Wellness",
    lat: -0.97,
    lng: 34.47,
    type: "mental",
    county: "Migori",
    subcounty: "Nyatike",
    constituency: "Nyatike",
    ward: "Macalder",
  },

  // ===== KISII =====
  {
    name: "Kisii Mental Hospital",
    lat: -0.6817,
    lng: 34.7667,
    type: "mental",
    county: "Kisii",
    subcounty: "Kisii Central",
    constituency: "Kisii Central",
    ward: "Nyanchwa",
  },
  {
    name: "Ogembo Recovery Centre",
    lat: -0.802,
    lng: 34.723,
    type: "rehab",
    county: "Kisii",
    subcounty: "Gucha",
    constituency: "Bomachoge Borabu",
    ward: "Ogembo",
  },
  {
    name: "Suneka Wellness Unit",
    lat: -0.766,
    lng: 34.724,
    type: "mental",
    county: "Kisii",
    subcounty: "Kisii South",
    constituency: "Bomachoge Chache",
    ward: "Suneka",
  },
  {
    name: "Tabaka Rehab Home",
    lat: -0.812,
    lng: 34.655,
    type: "rehab",
    county: "Kisii",
    subcounty: "South Mugirango",
    constituency: "South Mugirango",
    ward: "Tabaka",
  },
  {
    name: "Nyamache Mental Support",
    lat: -0.851,
    lng: 34.823,
    type: "mental",
    county: "Kisii",
    subcounty: "Nyamache",
    constituency: "Bomachoge Borabu",
    ward: "Nyamache",
  },

  // ===== NYAMIRA =====
  {
    name: "Nyamira Mental Wellness",
    lat: -0.563,
    lng: 34.935,
    type: "mental",
    county: "Nyamira",
    subcounty: "Nyamira North",
    constituency: "North Mugirango",
    ward: "Ikonge",
  },
  {
    name: "Keroka Rehab Clinic",
    lat: -0.758,
    lng: 34.943,
    type: "rehab",
    county: "Nyamira",
    subcounty: "Masaba North",
    constituency: "West Mugirango",
    ward: "Keroka",
  },
  {
    name: "Borabu Mental Unit",
    lat: -0.653,
    lng: 35.067,
    type: "mental",
    county: "Nyamira",
    subcounty: "Borabu",
    constituency: "Borabu",
    ward: "Matutu",
  },
  {
    name: "Nyansiongo Recovery Home",
    lat: -0.659,
    lng: 35.018,
    type: "rehab",
    county: "Nyamira",
    subcounty: "Borabu",
    constituency: "Borabu",
    ward: "Nyansiongo",
  },
  {
    name: "Ekerenyo Wellness",
    lat: -0.509,
    lng: 34.879,
    type: "mental",
    county: "Nyamira",
    subcounty: "Nyamira North",
    constituency: "North Mugirango",
    ward: "Ekerenyo",
  },
];



/* ---------- Icons ---------- */
const youAreHereIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const mentalIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const rehabIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

/* ---------- Globals ---------- */
let markers = []; // facility markers on map
let routeControls = []; // routing controls so we can remove them later
let userLocation = null; // {lat, lng}
const maxRoutes = 3; // how many nearest routes to draw

/* ---------- Helpers ---------- */
function getDistanceKm(lat1, lon1, lat2, lon2) {
  // Haversine distance (km)
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function clearMarkers() {
  markers.forEach((m) => map.removeLayer(m));
  markers = [];
}
function clearRoutes() {
  routeControls.forEach((rc) => {
    try {
      rc.remove();
    } catch (e) {}
  });
  routeControls = [];
}

/* Ensure inputs become selects so we can populate options dynamically */
function ensureSelectOrCreate(id, classes = "") {
  const old = document.getElementById(id);
  if (!old) return null;
  if (old.tagName.toLowerCase() === "select") return old;
  // create select and replace input
  const sel = document.createElement("select");
  sel.id = id;
  sel.className = old.className || classes;
  const wrapper = old.parentNode;
  wrapper.replaceChild(sel, old);
  return sel;
}

/* ---------- UI elements ---------- */
const regionSelect = document.getElementById("region"); // should exist
const typeSelect = document.getElementById("facilityType"); // should exist
const subcountySelect =
  ensureSelectOrCreate("subcounty") || document.getElementById("subcounty");
const constituencySelect =
  ensureSelectOrCreate("constituency") ||
  document.getElementById("constituency");
const wardSelect =
  ensureSelectOrCreate("ward") || document.getElementById("ward");
const locationStatus = document.getElementById("locationStatus");

/* Set region options to only Nairobi & Kisumu (plus All) */
function initRegionOptions() {
  regionSelect.innerHTML = `
    <option value="">All</option>
    <option value="Nairobi">Nairobi</option>
    <option value="Kisumu">Kisumu</option>
    <option value="Siaya">Siaya</option>
    <option value="Homa Bay">Homa Bay</option>
    <option value="Migori">Migori</option>
    <option value="Kisii">Kisii</option>
    <option value="Nyamira">Nyamira</option>
  `;
}

/* Build unique sorted values for a key from a dataset */
function uniqueValues(data, key) {
  const vals = Array.from(new Set(data.map((d) => d[key])));
  return vals.filter(Boolean).sort();
}

/* Populate a select with given items (strings) */
function populateSelect(selectEl, items, placeholder = "All") {
  if (!selectEl) return;
  selectEl.innerHTML = "";
  const allOpt = document.createElement("option");
  allOpt.value = "";
  allOpt.textContent = placeholder;
  selectEl.appendChild(allOpt);
  items.forEach((it) => {
    const opt = document.createElement("option");
    opt.value = it;
    opt.textContent = it;
    selectEl.appendChild(opt);
  });
}

/* Get facilities that match current (partial) filter selection */
function getFilteredFacilities({
  type = "",
  county = "",
  subcounty = "",
  constituency = "",
  ward = "",
} = {}) {
  return dummyFacilities.filter((f) => {
    if (type && f.type.toLowerCase() !== type.toLowerCase()) return false;
    if (county && f.county.toLowerCase() !== county.toLowerCase()) return false;
    if (subcounty && f.subcounty.toLowerCase() !== subcounty.toLowerCase())
      return false;
    if (
      constituency &&
      f.constituency.toLowerCase() !== constituency.toLowerCase()
    )
      return false;
    if (ward && f.ward.toLowerCase() !== ward.toLowerCase()) return false;
    return true;
  });
}

/* Populate cascading selects based on current upstream selections */
function populateCascades() {
  const typeVal = (typeSelect.value || "").trim();
  const countyVal = (regionSelect.value || "").trim();

  // base filtered by type and county (if set) to build subcounties
  const baseFiltered = getFilteredFacilities({
    type: typeVal,
    county: countyVal,
  });
  const subcounties = uniqueValues(baseFiltered, "subcounty");
  populateSelect(
    subcountySelect,
    subcounties.length ? subcounties : [],
    "All subcounties"
  );

  // populate constituencies based on current subcounty selection (or baseFiltered)
  const subVal = (subcountySelect.value || "").trim();
  const consFiltered = getFilteredFacilities({
    type: typeVal,
    county: countyVal,
    subcounty: subVal,
  });
  const constituencies = uniqueValues(consFiltered, "constituency");
  populateSelect(
    constituencySelect,
    constituencies.length ? constituencies : [],
    "All constituencies"
  );

  // populate wards based on current constituency (or consFiltered)
  const conVal = (constituencySelect.value || "").trim();
  const wardsFiltered = getFilteredFacilities({
    type: typeVal,
    county: countyVal,
    subcounty: subVal,
    constituency: conVal,
  });
  const wards = uniqueValues(wardsFiltered, "ward");
  populateSelect(wardSelect, wards.length ? wards : [], "All wards");
}

/* ---------- Marker rendering and routing ---------- */
function renderMarkersAndRoutes(filteredFacilities) {
  clearRoutes();
  clearMarkers();

  if (!filteredFacilities.length) {
    locationStatus.textContent = "No facilities match the filters.";
    return;
  }

  // create markers and add popup info (distance if available)
  const group = [];
  filteredFacilities.forEach((f) => {
    const icon = f.type === "rehab" ? rehabIcon : mentalIcon;
    const marker = L.marker([f.lat, f.lng], { icon })
      .bindPopup(() => {
        let html = `<strong>${f.name}</strong><br>${f.county} - ${f.subcounty}<br>${f.constituency}, ${f.ward}`;
        if (userLocation) {
          const d = getDistanceKm(
            userLocation.lat,
            userLocation.lng,
            f.lat,
            f.lng
          ).toFixed(2);
          html += `<br><em>Distance: ${d} km</em>`;
        }
        return html;
      })
      .addTo(map);
    markers.push(marker);
    group.push([f.lat, f.lng]);
  });

  // fit map to markers
  try {
    const bounds = L.latLngBounds(group);
    map.fitBounds(bounds, { padding: [50, 50] });
  } catch (e) {
    // ignore if one marker only / invalid
  }

  // if we have user location, compute nearest and draw routes
  if (userLocation) {
    // compute distances
    const withDistance = filteredFacilities.map((f) => ({
      ...f,
      distance: getDistanceKm(userLocation.lat, userLocation.lng, f.lat, f.lng),
    }));
    withDistance.sort((a, b) => a.distance - b.distance);
    const nearest = withDistance.slice(0, maxRoutes);

    // update status text with filters + nearest list
    const filtersSummary = `Filters: ${typeSelect.value || "All types"} | ${
      regionSelect.value || "All counties"
    } | ${subcountySelect.value || "All subcounties"} | ${
      constituencySelect.value || "All constituencies"
    } | ${wardSelect.value || "All wards"}`;
    const nearestSummary = nearest
      .map((n) => `${n.name} (${n.distance.toFixed(2)} km)`)
      .join(" — ");
    // locationStatus.textContent = `${filtersSummary} — Nearest: ${nearestSummary}`;

    // draw routes to nearest
    nearest.forEach((n) => {
      const rc = L.Routing.control({
        waypoints: [
          L.latLng(userLocation.lat, userLocation.lng),
          L.latLng(n.lat, n.lng),
        ],
        routeWhileDragging: false,
        draggableWaypoints: false,
        addWaypoints: false,
        showAlternatives: false,
        show: false,
        createMarker: () => null,
        lineOptions: { styles: [{ color: "#b4244b", weight: 4 }] },
      }).addTo(map);
      routeControls.push(rc);
    });
  } else {
    // no user location: just show filters summary
    // locationStatus.textContent = `Filters: ${
    //   typeSelect.value || "All types"
    // } | ${regionSelect.value || "All counties"} | ${
    //   subcountySelect.value || "All subcounties"
    // } | ${constituencySelect.value || "All constituencies"} | ${
    //   wardSelect.value || "All wards"
    // }`;
  }
}

/* ---------- Main filter apply function ---------- */
function applyFilters() {
  const typeVal = (typeSelect.value || "").trim();
  const countyVal = (regionSelect.value || "").trim();
  const subVal = (subcountySelect.value || "").trim();
  const conVal = (constituencySelect.value || "").trim();
  const wardVal = (wardSelect.value || "").trim();

  const filtered = getFilteredFacilities({
    type: typeVal,
    county: countyVal,
    subcounty: subVal,
    constituency: conVal,
    ward: wardVal,
  });

  renderMarkersAndRoutes(filtered);
}

/* ---------- Events: cascading + filter on change ---------- */
function wireEvents() {
  // when facility type changes we must rebuild downstream selects
  typeSelect.addEventListener("change", () => {
    populateCascades();
    applyFilters();
  });

  regionSelect.addEventListener("change", () => {
    // reset downstream values and populate based on selected county
    populateCascades();
    applyFilters();
  });

  // when subcounty changes, repopulate constituencies and wards
  subcountySelect.addEventListener("change", () => {
    // repopulate constituencies and wards according to current selection
    const typeVal = typeSelect.value || "";
    const countyVal = regionSelect.value || "";
    const subVal = subcountySelect.value || "";
    const consOptions = uniqueValues(
      getFilteredFacilities({
        type: typeVal,
        county: countyVal,
        subcounty: subVal,
      }),
      "constituency"
    );
    populateSelect(constituencySelect, consOptions, "All constituencies");
    // clear ward
    populateSelect(wardSelect, [], "All wards");
    applyFilters();
  });

  constituencySelect.addEventListener("change", () => {
    const typeVal = typeSelect.value || "";
    const countyVal = regionSelect.value || "";
    const subVal = subcountySelect.value || "";
    const conVal = constituencySelect.value || "";
    const wardOptions = uniqueValues(
      getFilteredFacilities({
        type: typeVal,
        county: countyVal,
        subcounty: subVal,
        constituency: conVal,
      }),
      "ward"
    );
    populateSelect(wardSelect, wardOptions, "All wards");
    applyFilters();
  });

  wardSelect.addEventListener("change", applyFilters);
}

/* ---------- Geolocation ---------- */
function onLocationSuccess(position) {
  userLocation = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };
  // place user marker
  L.marker([userLocation.lat, userLocation.lng], { icon: youAreHereIcon })
    .addTo(map)
    .bindPopup("Your location")
    .openPopup();
  map.setView([userLocation.lat, userLocation.lng], 10);

  // After we have location, re-apply filters so distances/routes are shown
  applyFilters();
}

function onLocationError(err) {
  console.warn("Location error:", err);
  locationStatus.textContent =
    "Location access denied or unavailable. Showing all facilities.";
  // still render default view
  applyFilters();
}

/* ---------- Initialization ---------- */
initRegionOptions();
populateCascades(); // fill subcounty/constituency/ward based on initial (empty) filters
wireEvents();
applyFilters(); // initial render

// ask for location (non-blocking; if user denies we'll still work)
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError, {
    enableHighAccuracy: true,
    timeout: 10000,
  });
} else {
  locationStatus.textContent =
    "Geolocation not supported. Showing all facilities.";
}
