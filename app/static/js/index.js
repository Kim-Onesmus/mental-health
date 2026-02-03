/* ================= MAP SETUP ================= */
const map = L.map("map").setView([-0.0917, 34.768], 12);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

/* ========== Kisumu Central Boundary ========== */
const kisumuCentralBoundary = [
  [-0.075, 34.74],
  [-0.06, 34.77],
  [-0.08, 34.8],
  [-0.11, 34.81],
  [-0.13, 34.79],
  [-0.12, 34.75],
  [-0.09, 34.73],
];

L.polygon(kisumuCentralBoundary, {
  color: "red",
  weight: 3,
  fillOpacity: 0.1,
})
  .addTo(map)
  .bindPopup("Kisumu Central Boundary");

/* ================= ICONS ================= */
const mentalIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const rehabIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const youAreHereIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

/* ================= GLOBALS ================= */
let allFacilities = [];
let markers = [];
let routeControls = [];
let userLocation = null;

/* ================= HELPERS ================= */
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function clearMarkers() {
  markers.forEach((m) => map.removeLayer(m));
  markers = [];
}

function clearRoutes() {
  routeControls.forEach((r) => r.remove());
  routeControls = [];
}

/* ================= FILTER LOGIC ================= */
function getFilteredFacilities(filters = {}) {
  return allFacilities.filter((f) => {
    for (let key in filters) {
      if (filters[key] && f[key]?.toLowerCase() !== filters[key].toLowerCase())
        return false;
    }
    return true;
  });
}

/* ================= RENDER ================= */
function renderFacilities(facilities) {
  clearMarkers();
  clearRoutes();

  facilities.forEach((f) => {
    const icon = f.type === "rehab" ? rehabIcon : mentalIcon;

    const marker = L.marker([f.lat, f.lng], { icon })
      .bindPopup(() => {
        let html = `<strong>${f.name}</strong><br>${f.ward}`;
        if (userLocation) {
          const d = getDistanceKm(
            userLocation.lat,
            userLocation.lng,
            f.lat,
            f.lng,
          ).toFixed(2);
          html += `<br><em>${d} km away</em>`;
        }
        return html;
      })
      .addTo(map);

    markers.push(marker);
  });
}

/* ================= FETCH FROM DJANGO ================= */
async function loadFacilities() {
  try {
    const res = await fetch("/api/facilities/");
    const data = await res.json();

    allFacilities = data.map((f) => ({
      id: f.id,
      name: f.name,
      lat: f.lat,
      lng: f.lng,
      type: f.type === "mental_health" ? "mental" : "rehab",
      county: f.county,
      subcounty: f.subcounty,
      constituency: f.constituency,
      ward: f.ward,
    }));

    renderFacilities(allFacilities);
  } catch (err) {
    console.error("Error loading facilities:", err);
  }
}

/* ================= GEOLOCATION ================= */
function onLocationSuccess(pos) {
  userLocation = {
    lat: pos.coords.latitude,
    lng: pos.coords.longitude,
  };

  L.marker([userLocation.lat, userLocation.lng], { icon: youAreHereIcon })
    .addTo(map)
    .bindPopup("You are here")
    .openPopup();

  map.setView([userLocation.lat, userLocation.lng], 13);
  renderFacilities(allFacilities);
}

/* ================= INIT ================= */
loadFacilities();

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(onLocationSuccess);
}
