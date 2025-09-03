/* ---------- Map + data ---------- */
const map = L.map("map").setView([-0.0917, 34.768], 12); // Centered on Kisumu Central
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);


/* Approximate boundary polygon for Kisumu Central */
const kisumuCentralBoundary = [
  [-0.075, 34.74],  // near Kisumu Airport
  [-0.06, 34.77],   // near Kanyakwar
  [-0.08, 34.80],   // near Mamboleo
  [-0.11, 34.81],   // near Obunga / Manyatta
  [-0.13, 34.79],   // near Nyalenda
  [-0.12, 34.75],   // near Kisumu CBD
  [-0.09, 34.73],   // back to airport side
];

/* Draw the fence (polygon) */
L.polygon(kisumuCentralBoundary, {
  color: "red",       // border color
  weight: 3,          // border thickness
  fillColor: "#f03",  // inside color
  fillOpacity: 0.1    // transparency
}).addTo(map).bindPopup("Kisumu Central Boundary");


const dummyFacilities = [
  /* --- Railways Ward --- */
  {
    name: "Kisumu Mental Health Centre",
    lat: -0.0917,
    lng: 34.768,
    type: "mental",
    county: "Kisumu",
    subcounty: "Kisumu Central",
    constituency: "Kisumu Central",
    ward: "Railways",
  },
  {
    name: "Railways Border Wellness",
    lat: -0.12,
    lng: 34.77,
    type: "rehab",
    county: "Kisumu",
    subcounty: "Kisumu Central",
    constituency: "Kisumu Central",
    ward: "Railways",
  },
  {
    name: "CBD Support Clinic",
    lat: -0.095,
    lng: 34.763,
    type: "mental",
    county: "Kisumu",
    subcounty: "Kisumu Central",
    constituency: "Kisumu Central",
    ward: "Railways",
  },

  /* --- Migosi Ward --- */
  {
    name: "Migosi Wellness Clinic",
    lat: -0.096,
    lng: 34.785,
    type: "mental",
    county: "Kisumu",
    subcounty: "Kisumu Central",
    constituency: "Kisumu Central",
    ward: "Migosi",
  },
  {
    name: "Migosi Border Recovery",
    lat: -0.083,
    lng: 34.793,
    type: "rehab",
    county: "Kisumu",
    subcounty: "Kisumu Central",
    constituency: "Kisumu Central",
    ward: "Migosi",
  },
  {
    name: "Migosi Community Mental Care",
    lat: -0.09,
    lng: 34.788,
    type: "mental",
    county: "Kisumu",
    subcounty: "Kisumu Central",
    constituency: "Kisumu Central",
    ward: "Migosi",
  },

  /* --- Kondele Ward --- */
  {
    name: "Kondele Rehab Facility",
    lat: -0.088,
    lng: 34.775,
    type: "rehab",
    county: "Kisumu",
    subcounty: "Kisumu Central",
    constituency: "Kisumu Central",
    ward: "Kondele",
  },
  {
    name: "Kondele Border Mental Support",
    lat: -0.082,
    lng: 34.782,
    type: "mental",
    county: "Kisumu",
    subcounty: "Kisumu Central",
    constituency: "Kisumu Central",
    ward: "Kondele",
  },
  {
    name: "Kondele Community Clinic",
    lat: -0.085,
    lng: 34.778,
    type: "rehab",
    county: "Kisumu",
    subcounty: "Kisumu Central",
    constituency: "Kisumu Central",
    ward: "Kondele",
  },

  /* --- Nyalenda A Ward --- */
  {
    name: "Nyalenda Wellness Clinic",
    lat: -0.104,
    lng: 34.767,
    type: "mental",
    county: "Kisumu",
    subcounty: "Kisumu Central",
    constituency: "Kisumu Central",
    ward: "Nyalenda A",
  },
  {
    name: "Nyalenda Border Recovery",
    lat: -0.115,
    lng: 34.758,
    type: "rehab",
    county: "Kisumu",
    subcounty: "Kisumu Central",
    constituency: "Kisumu Central",
    ward: "Nyalenda A",
  },
  {
    name: "Nyalenda Family Support Unit",
    lat: -0.11,
    lng: 34.762,
    type: "mental",
    county: "Kisumu",
    subcounty: "Kisumu Central",
    constituency: "Kisumu Central",
    ward: "Nyalenda A",
  },

  /* --- Manyatta B Ward --- */
  {
    name: "Manyatta Recovery Centre",
    lat: -0.108,
    lng: 34.779,
    type: "rehab",
    county: "Kisumu",
    subcounty: "Kisumu Central",
    constituency: "Kisumu Central",
    ward: "Manyatta B",
  },
  {
    name: "Manyatta Border Wellness",
    lat: -0.113,
    lng: 34.791,
    type: "mental",
    county: "Kisumu",
    subcounty: "Kisumu Central",
    constituency: "Kisumu Central",
    ward: "Manyatta B",
  },
  {
    name: "Manyatta East Support Clinic",
    lat: -0.11,
    lng: 34.785,
    type: "rehab",
    county: "Kisumu",
    subcounty: "Kisumu Central",
    constituency: "Kisumu Central",
    ward: "Manyatta B",
  },

  /* --- Obunga Ward --- */
  {
    name: "Obunga Community Mental Unit",
    lat: -0.102,
    lng: 34.76,
    type: "mental",
    county: "Kisumu",
    subcounty: "Kisumu Central",
    constituency: "Kisumu Central",
    ward: "Obunga",
  },
  {
    name: "Obunga Border Recovery Home",
    lat: -0.11,
    lng: 34.751,
    type: "rehab",
    county: "Kisumu",
    subcounty: "Kisumu Central",
    constituency: "Kisumu Central",
    ward: "Obunga",
  },
  {
    name: "Obunga Lakeview Clinic",
    lat: -0.106,
    lng: 34.754,
    type: "mental",
    county: "Kisumu",
    subcounty: "Kisumu Central",
    constituency: "Kisumu Central",
    ward: "Obunga",
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
