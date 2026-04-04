function doLogout() {
  document.getElementById("logout-form").submit();
}

/* ────────────────────── DASHBOARD TABS ────────────────────── */

const crumbs = {
  dashboard: "Overview &amp; summary",
  organizations: "Registered stakeholders",
  map: "Geographic distribution",
  reports: "Analytics &amp; exports",
  settings: "Account &amp; preferences",
};

function switchTab(name) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  const page = document.getElementById("page-" + name);
  if (page) page.classList.add("active");

  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.remove("active"));
  const link = document.querySelector('.tab[data-tab="' + name + '"]');
  if (link) link.classList.add("active");

  document.getElementById("page-title").textContent =
    name.charAt(0).toUpperCase() + name.slice(1);
  document.getElementById("page-crumb").innerHTML = crumbs[name] || "";

  if (window.innerWidth < 768) {
    document.getElementById("sidebar").classList.add("-translate-x-full");
    document.getElementById("sidebar-overlay").classList.add("hidden");
  }

  if (name === "map") initMap();
  if (name === "reports") initReportBars();
}

document.querySelectorAll(".tab[data-tab]").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    switchTab(this.dataset.tab);
  });
});

/* ────────────────────── SIDEBAR / DROPDOWN ────────────────────── */

function toggleSidebar() {
  const sb = document.getElementById("sidebar");
  const ov = document.getElementById("sidebar-overlay");
  const isOpen = !sb.classList.contains("-translate-x-full");
  sb.classList.toggle("-translate-x-full", isOpen);
  ov.classList.toggle("hidden", isOpen);
}

function toggleDropdown() {
  document.getElementById("dropdown").classList.toggle("hidden");
}
document.addEventListener("click", (e) => {
  if (!e.target.closest('[onclick="toggleDropdown()"]')) {
    document.getElementById("dropdown").classList.add("hidden");
  }
});

/* ────────────────────── ORG FILTER ────────────────────── */

function filterOrgs(el, type) {
  document.querySelectorAll(".fp").forEach((b) => {
    b.classList.remove("on", "bg-secondary", "text-white", "border-secondary");
    b.classList.add("border-gray-200", "text-gray-500");
  });
  el.classList.add("on", "bg-secondary", "text-white", "border-secondary");
  el.classList.remove("border-gray-200", "text-gray-500");
  document.querySelectorAll(".org-card").forEach((card) => {
    card.style.display =
      type === "all" || card.dataset.type === type ? "" : "none";
  });
}

/* ────────────────────── MAP ────────────────────── */

let mapInitialized = false;
let map;
let markers = [];
let facilitiesData = [];

function initMap() {
  if (mapInitialized) return;
  mapInitialized = true;

  setTimeout(() => {
    // Initialize map, center tightly on Kenya Lake Region
    map = L.map("map").setView([-0.35, 34.85], 9);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Tight Kenya Lake Region bounds (Uganda completely off-screen)
    const kenyaLakeRegionBounds = L.latLngBounds([
      [-1.3, 34.0], // Southwest: Migori / Homa Bay
      [0.5, 35.0], // Northeast: Busia / Kakamega border
    ]);

    map.fitBounds(kenyaLakeRegionBounds);

    fetchFacilities();
  }, 100);
}


/* ────────────────────── FETCH FROM DATABASE ────────────────────── */

function fetchFacilities() {

fetch("/api/facilities/") // your backend endpoint
.then(res => res.json())
.then(data => {

facilitiesData = data.filter(f => 
    f.status === "approved" && 
    f.county === "Kisumu"
);

populateFilters(facilitiesData);
renderMarkers(facilitiesData);

});

}



/* ────────────────────── RENDER MARKERS ────────────────────── */

// Define your custom icon
const mentalIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function renderMarkers(data) {
  // Clear existing markers
  markers.forEach(m => map.removeLayer(m.marker));
  markers = [];

  data.forEach(f => {
    // Use custom icon marker
    const marker = L.marker([f.lat, f.lng], { icon: mentalIcon }).addTo(map);

    // Bind tooltip
    marker.bindTooltip(
      `
      <div style="font-family:Geist,sans-serif;min-width:180px">
        <p style="font-weight:600;font-size:13px;color:#111;margin-bottom:4px">
          ${f.name}
        </p>
        <p style="font-size:11px;color:#6b7280">
          <span style="font-weight:600">Location: </span> ${f.sub_county}, ${f.county}
        </p>
        <p style="font-size:11px;color:#6b7280">
          <span style="font-weight:600">Organization Type: </span> ${f.type}
        </p>
        <p style="font-size:11px;color:#6b7280">
          <span style="font-weight:600">Year Founded: </span> ${f.year_founded}
        </p>
      </div>
    `,
      {
        direction: "top",
        offset: [0, -10],
        opacity: 1,
      },
    );

    markers.push({
      marker,
      data: f
    });
  });
}



/* ────────────────────── FILTERS ────────────────────── */

function populateFilters(data){

populateSelect("filter-type", unique(data,"org_type"));
populateSelect("filter-youth", unique(data,"is_youth_org"));
populateSelect("filter-disability", unique(data,"is_disability_org"));
populateSelect("filter-female", unique(data,"is_female_led"));

}


function populateSelect(id, values){

const select = document.getElementById(id);

values.forEach(v=>{
if(!v) return;

const option = document.createElement("option");
option.value = v;
option.textContent = v.charAt(0).toUpperCase() + v.slice(1);

select.appendChild(option);

});

}


/* ────────────────────── APPLY FILTERS ────────────────────── */

function applyMapFilters(){

const type = document.getElementById("filter-type").value;
const youth = document.getElementById("filter-youth").value;
const disability = document.getElementById("filter-disability").value;
const female = document.getElementById("filter-female").value;


const filtered = facilitiesData.filter(f=>{

return (
(!type || f.org_type === type) &&
(!youth || f.is_youth_org === youth) &&
(!disability || f.is_disability_org === disability) &&
(!female || f.is_female_led === female)

);

});

renderMarkers(filtered);

}


/* ────────────────────── RESET ────────────────────── */

function resetMapFilters(){

document.querySelectorAll("#page-map select").forEach(s=>s.value="");
renderMarkers(facilitiesData);

}


/* ────────────────────── EVENTS ────────────────────── */

document.addEventListener("change", function(e){

if(e.target.closest("#page-map select")){
applyMapFilters();
}

});


/* ────────────────────── HELPERS ────────────────────── */

function unique(arr,key){
return [...new Set(arr.map(item=>item[key]))];
}

/* ────────────────────── REPORTS ────────────────────── */

let reportBarsAnimated = false;
function initReportBars() {
  if (reportBarsAnimated) return;
  reportBarsAnimated = true;
  setTimeout(() => {
    document.querySelectorAll(".rbar").forEach((b) => {
      b.style.width = b.dataset.w;
    });
  }, 200);
}

/* ────────────────────── ADD FACILITY MODAL ────────────────────── */

const stepNames = [
  "Basic Information",
  "Online Presence",
  "Classification",
  "Mental Health Focus",
  "Achievements & Advertising",
];

let currentStep = 1;
const totalSteps = 5;

function openFacilityModal() {
  const orgStatus = document.body.dataset.orgStatus;

  if (orgStatus !== "approved") {
    const toast = document.createElement("div");
    toast.className =
      "fixed bottom-6 right-6 z-[70] flex items-center gap-3 bg-red-600 text-white px-5 py-4 rounded-2xl shadow-2xl text-[13.5px] font-medium";

    toast.innerHTML = `
      <svg class="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd"
          d="M18 10A8 8 0 112 10a8 8 0 0116 0zm-9-4a1 1 0 012 0v4a1 1 0 11-2 0V6zm1 8a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
          clip-rule="evenodd"/>
      </svg>
      Your organization must be approved before adding a facility.
    `;

    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
    return;
  }

  currentStep = 1;
  renderModalStep();
  document.getElementById("facility-modal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeFacilityModal() {
  document.getElementById("facility-modal").classList.add("hidden");
  document.body.style.overflow = "";
}

document
  .getElementById("facility-modal")
  .addEventListener("click", function (e) {
    if (e.target === this) closeFacilityModal();
  });

// ══════════════════════════════════════════════════════════════════════
// FORM VALIDATION SYSTEM FOR FACILITY MODAL
// ══════════════════════════════════════════════════════════════════════

const requiredFieldsByStep = {
  1: ["name", "public_email", "contact_number_1", "year_founded", "registration_status", "country_of_registration"],
  2: [],
  3: ["org_type","county","sub_county","latitude","longitude","funding_source","is_youth_org","is_disability_org","is_female_led","areas_of_intervention"],
  4: ["mh_focus_areas","mh_service_categories"],
  5: []
};

const fieldValidators = {
  email: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
  tel: val => /^[\+\d\s\-\(\)]+$/.test(val) && val.length >= 6,
  number: val => !isNaN(val) && val !== "" && val !== null,
  url: val => val === "" || /^https?:\/\//.test(val),
  select: val => val !== "" && val !== null && val !== undefined,
  text: val => val.trim() !== ""
};

function validateStep(stepNum) {
  const stepPanel = document.getElementById("step-" + stepNum);
  if (!stepPanel) return true;

  const requiredFields = requiredFieldsByStep[stepNum] || [];
  const errors = [];

  requiredFields.forEach(fieldName => {
    const inputs = stepPanel.querySelectorAll(`[name="${fieldName}"]`);
    if (inputs.length === 0) return;

    if (inputs.length === 1) {
      const input = inputs[0];
      const value = input.value.trim();
      const type = input.type || "text";
      let isValid = false;
      const friendlyName = getFieldLabel(stepPanel, fieldName);

      if (type === "email") isValid = fieldValidators.email(value);
      else if (type === "tel") isValid = fieldValidators.tel(value);
      else if (type === "number") isValid = fieldValidators.number(value);
      else if (type === "url") isValid = fieldValidators.url(value);
      else if (input.tagName === "SELECT") isValid = fieldValidators.select(value);
      else isValid = fieldValidators.text(value);

      if (!isValid) { errors.push(friendlyName); highlightError(input); }
      else { clearHighlightError(input); }
    } else {
      const checkedCount = Array.from(inputs).filter(i => i.checked).length;
      const friendlyName = getCheckboxGroupLabel(stepPanel, fieldName);

      if (checkedCount === 0) {
        errors.push(friendlyName);
        inputs.forEach(i => {
          const wrapper = i.closest(".check-tile") || i.parentElement;
          wrapper?.classList.add("border-red-500", "ring-2", "ring-red-200");
        });
      } else {
        inputs.forEach(i => {
          const wrapper = i.closest(".check-tile") || i.parentElement;
          wrapper?.classList.remove("border-red-500", "ring-2", "ring-red-200");
        });
      }
    }
  });

  // Conditional youth_type check
  if (stepNum === 3) {
    const youthOrgSelect = stepPanel.querySelector('[name="is_youth_org"]');
    if (youthOrgSelect?.value === "yes") {
      const youthTypeSelect = stepPanel.querySelector('[name="youth_type"]');
      if (!fieldValidators.select(youthTypeSelect?.value)) {
        errors.push("Youth Type (required when Youth Organization is Yes)");
        highlightError(youthTypeSelect);
      } else clearHighlightError(youthTypeSelect);
    }
  }

  if (errors.length > 0) { showValidationError(errors, stepNum); return false; }
  return true;
}

function getFieldLabel(stepPanel, fieldName) {
  const label = stepPanel.querySelector(`label[for="${fieldName}"]`) || stepPanel.querySelector(`[name="${fieldName}"]`)?.previousElementSibling;
  if (label) return label.textContent.replace("*","").trim();

  const friendlyNames = {
    name: "Organization Name",
    public_email: "Public Contact Email",
    contact_number_1: "Contact Number 1",
    year_founded: "Year Founded",
    registration_status: "Registration Status",
    country_of_registration: "Country of First Registration",
    org_type: "Type of Organization",
    county: "County Located",
    sub_county: "Sub-County",
    latitude: "Latitude",
    longitude: "Longitude",
    funding_source: "Main Funding Sources",
    is_youth_org: "Youth Organization",
    is_disability_org: "Disability Org",
    is_female_led: "Female-led",
    areas_of_intervention: "Areas of Intervention",
    mh_focus_areas: "Mental Health Focus Areas",
    mh_service_categories: "MH Service Categories",
  };
  return friendlyNames[fieldName] || fieldName.replace(/_/g," ");
}

function getCheckboxGroupLabel(stepPanel, fieldName) {
  const checkboxes = stepPanel.querySelectorAll(`[name="${fieldName}"]`);
  if (checkboxes.length === 0) return fieldName.replace(/_/g," ");
  return getFieldLabel(stepPanel, fieldName);
}

function highlightError(input) {
  input.classList.add("border-red-500","border-2","focus:border-red-500","focus:ring-red-200");
  input.classList.remove("border-gray-200","border");
}

function clearHighlightError(input) {
  input.classList.remove("border-red-500","border-2","focus:border-red-500","focus:ring-red-200");
  input.classList.add("border-gray-200","border");
}

function showValidationError(errors, stepNum) {
  const toast = document.createElement("div");
  toast.className = "fixed bottom-6 right-6 z-[70] flex items-start gap-3 bg-red-600 text-white px-5 py-4 rounded-2xl shadow-2xl text-[13px] max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-300";
  const errorList = errors.filter((e,i,a)=>a.indexOf(e)===i).map(e=>`<li class="ml-4">• ${e}</li>`).join("");
  toast.innerHTML = `
    <svg class="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
    </svg>
    <div class="flex-1">
      <p class="font-semibold">Step ${stepNum}: Please fill in all required fields:</p>
      <ul class="text-[12px] mt-2">${errorList}</ul>
    </div>
  `;
  document.body.appendChild(toast);
  setTimeout(()=>toast.remove(),7000);
}

// ────────────────────── CORE MODAL NAVIGATION ──────────────────────

function renderModalStep() {
  document.querySelectorAll(".step-panel").forEach(p => p.classList.remove("active"));
  const panel = document.getElementById("step-" + currentStep);
  if (panel) panel.classList.add("active");

  const nameEl = document.getElementById("modal-step-name");
  if (nameEl) nameEl.textContent = `Step ${currentStep} — ${stepNames[currentStep-1]}`;

  const pct = (currentStep/totalSteps)*100;
  document.getElementById("modal-progress-bar").style.width = pct+"%";

  document.querySelectorAll(".step-pill").forEach(pill => {
    const s = parseInt(pill.dataset.step);
    const numEl = pill.querySelector(".step-pill-num");
    pill.classList.remove("text-gray-400","text-primary","bg-primary/10");

    if(s < currentStep){
      numEl.className = "step-pill-num w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold bg-emerald-500 text-white";
      numEl.textContent="✓"; pill.classList.add("text-emerald-600");
    } else if(s===currentStep){
      numEl.className = "step-pill-num w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold bg-primary text-white";
      numEl.textContent=s; pill.classList.add("text-primary","bg-primary/10"); pill.style.fontWeight="600";
    } else{
      numEl.className = "step-pill-num w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold bg-gray-200 text-gray-500";
      numEl.textContent=s; pill.classList.add("text-gray-400"); pill.style.fontWeight="500";
    }
  });

  const backBtn = document.getElementById("modal-back");
  backBtn.style.visibility = currentStep>1?"visible":"hidden";

  document.getElementById("step-label").textContent=`Step ${currentStep} of ${totalSteps}`;

  const nextBtn = document.getElementById("modal-next");
  if(currentStep===totalSteps){
    nextBtn.innerHTML=`Submit for Review <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>`;
    nextBtn.type="button";
    nextBtn.onclick=()=>{ if(validateStep(currentStep)){document.getElementById("facility-form")?.requestSubmit();} };
  } else{
    nextBtn.innerHTML=`Next <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>`;
    nextBtn.type="button";
    nextBtn.onclick=()=>{ if(validateStep(currentStep)) modalStep(1); };
  }
}

function modalStep(dir){
  currentStep = Math.max(1, Math.min(totalSteps, currentStep+dir));
  renderModalStep();
  const body = document.querySelector("#facility-modal .overflow-y-auto");
  if(body) body.scrollTop=0;
}

// ────────────────────── OTHER FUNCTIONS ──────────────────────

function submitFacility(){
  closeFacilityModal();
  const toast = document.createElement("div");
  toast.className="fixed bottom-6 right-6 z-[70] flex items-center gap-3 bg-gray-900 text-white px-5 py-4 rounded-2xl shadow-2xl text-[13.5px] font-medium";
  toast.style.cssText="animation: fadeUp .3s ease forwards";
  toast.innerHTML=`<svg class="w-5 h-5 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg> Facility submitted! IDL team will review and notify you by email.`;
  document.body.appendChild(toast);
  setTimeout(()=>toast.remove(),5000);
}

function toggleYouthType(){
  const sel=document.getElementById("youth-org-select");
  document.getElementById("youth-type-wrap").classList.toggle("hidden",sel.value!=="yes");
}

function toggleHearOther(){
  const sel=document.getElementById("hear-select");
  const wrap=document.getElementById("hear-other-wrap");
  const input=document.getElementById("hear-other-input");
  const isOther=sel.value==="Other";
  wrap.classList.toggle("hidden",!isOther);
  if(isOther){
    wrap.style.opacity="0";
    wrap.style.transform="translateY(-4px)";
    wrap.style.transition="opacity .2s, transform .2s";
    requestAnimationFrame(()=>{ wrap.style.opacity="1"; wrap.style.transform="translateY(0)"; input.focus(); });
  }
}

/* ────────────────────── PASSWORD STRENGTH VALIDATOR ────────────────────── */

const rules = [
  { id: "chk-length", test: (pw) => pw.length >= 8 },
  { id: "chk-upper", test: (pw) => /[A-Z]/.test(pw) },
  { id: "chk-lower", test: (pw) => /[a-z]/.test(pw) },
  { id: "chk-number", test: (pw) => /[0-9]/.test(pw) },
  { id: "chk-special", test: (pw) => /[^A-Za-z0-9]/.test(pw) },
];

const strengthLevels = [
  { label: "Too weak", color: "#ef4444", bars: 1 },
  { label: "Weak", color: "#f97316", bars: 2 },
  { label: "Fair", color: "#eab308", bars: 3 },
  { label: "Strong", color: "#22c55e", bars: 4 },
];

function checkPasswordStrength() {
  const pw = document.getElementById("reg-password").value;
  const cpw = document.getElementById("reg-confirm").value;

  // Run rule checks (excluding match)
  let passed = 0;
  rules.forEach((r) => {
    const el = document.getElementById(r.id);
    const ok = r.test(pw);
    if (ok) {
      el.classList.add("chk-pass");
      passed++;
    } else {
      el.classList.remove("chk-pass");
    }
  });

  // Match check
  const matchEl = document.getElementById("chk-match");
  const matchMsg = document.getElementById("pw-match-msg");
  const matches = pw.length > 0 && pw === cpw;

  if (matches) {
    matchEl.classList.add("chk-pass");
    matchMsg.textContent = "✓ Passwords match";
    matchMsg.className = "text-[11px] mt-1.5 text-emerald-600 font-medium";
  } else {
    matchEl.classList.remove("chk-pass");
    if (cpw.length > 0) {
      matchMsg.textContent = "✗ Passwords do not match";
      matchMsg.className = "text-[11px] mt-1.5 text-red-500 font-medium";
    } else {
      matchMsg.textContent = "";
      matchMsg.className = "text-[11px] mt-1.5 hidden";
    }
  }

  // Update strength bar & label
  const label = document.getElementById("pw-strength-label");
  const bars = [1, 2, 3, 4].map((i) => document.getElementById("bar-" + i));
  const allCorePass = passed === rules.length; // all 5 non-match rules

  if (pw.length === 0) {
    label.textContent = "—";
    label.style.color = "#d1d5db";
    bars.forEach((b) => {
      b.style.background = "#e5e7eb";
    });
  } else {
    // score 1-4 based on how many rules pass
    const score = Math.min(4, Math.max(1, passed));
    const lvl = strengthLevels[score - 1];
    label.textContent = lvl.label;
    label.style.color = lvl.color;
    bars.forEach((b, i) => {
      b.style.background = i < lvl.bars ? lvl.color : "#e5e7eb";
    });
  }

  // Enable submit only when ALL rules pass + passwords match
  const submitBtn = document.getElementById("reg-submit-btn");
  const allGood = passed === rules.length && matches;
  submitBtn.disabled = !allGood;
  submitBtn.classList.toggle("enabled", allGood);
}

/* ── Show/hide password toggle ── */
function togglePw(inputId, eyeId) {
  const input = document.getElementById(inputId);
  const eye = document.getElementById(eyeId);
  const isHidden = input.type === "password";
  input.type = isHidden ? "text" : "password";
  // Swap icon: open eye when visible, closed when hidden
  eye.innerHTML = isHidden
    ? `<path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>`
    : `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
}

/* ────────────────────── YEAR DROPDOWN ────────────────────── */

window.addEventListener("DOMContentLoaded", () => {
  const sel = document.getElementById("year-founded");
  if (sel) {
    for (let y = 2026; y >= 1970; y--) {
      const opt = document.createElement("option");
      opt.value = y;
      opt.textContent = y;
      sel.appendChild(opt);
    }
  }
  // Init settings tab
  showSettingsTab("profile");
  if (document.body.dataset.openAddFacility === "1") {
    openFacilityModal();
  }
});

/* ────────────────────── SETTINGS SUB-TABS ────────────────────── */

function showSettingsTab(name) {
  document.querySelectorAll(".stab-panel").forEach((p) => {
    p.classList.add("hidden");
    p.classList.remove("active");
  });
  const panel = document.getElementById("stab-" + name);
  if (panel) {
    panel.classList.remove("hidden");
    panel.classList.add("active");
  }
  document.querySelectorAll(".stab").forEach((btn) => {
    const isActive = btn.getAttribute("onclick")?.includes("'" + name + "'");
    btn.classList.toggle("active", isActive);
    btn.classList.toggle("text-gray-500", !isActive);
    btn.classList.toggle("text-white", isActive);
  });
}

/* ────────────────────── APPLICATION STATUS DEMO ────────────────────── */

function setAppStatus(status) {
  const badge = document.getElementById("app-status-badge");
  const rejNote = document.getElementById("app-rejection-note");
  const editSect = document.getElementById("app-edit-section");

  if (status === "pending") {
    badge.className =
      "inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 text-[12px] font-semibold px-3 py-1.5 rounded-full";
    badge.innerHTML =
      '<span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>Pending Review';
    rejNote.classList.add("hidden");
    editSect.classList.add("hidden");
  } else if (status === "approved") {
    badge.className =
      "inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[12px] font-semibold px-3 py-1.5 rounded-full";
    badge.innerHTML =
      '<span class="w-2 h-2 rounded-full bg-emerald-500"></span>Approved';
    rejNote.classList.add("hidden");
    editSect.classList.remove("hidden");
  } else if (status === "rejected") {
    badge.className =
      "inline-flex items-center gap-1.5 bg-red-50 text-red-700 border border-red-200 text-[12px] font-semibold px-3 py-1.5 rounded-full";
    badge.innerHTML =
      '<span class="w-2 h-2 rounded-full bg-red-500"></span>Rejected';
    rejNote.classList.remove("hidden");
    rejNote.style.display = "flex";
    editSect.classList.remove("hidden");
  }
}

/* ────────────────────── EDIT FACILITY MODAL ────────────────────── */

const facilityData = {
  approved: {
    name: "Amani Counseling Centre",
    location: "Nairobi, Westlands",
    type: "Local NGO",
    statusLabel: "Approved",
    statusBg: "bg-emerald-50",
    statusText: "text-emerald-700",
    statusBorder: "border-emerald-200",
    dotClass: "bg-emerald-500",
    note: {
      type: "success",
      title: "Approved by IDL — 20 Mar 2026",
      body: "Your facility is live on the public dashboard. Updates will be re-reviewed by IDL before going live.",
    },
    email: "contact@amanicounseling.org",
    phone: "+254 712 345 678",
    website: "https://amanicounseling.org",
    county: "Nairobi",
    subcounty: "Westlands",
    year: "2014",
    reached: "4200",
    funding: "3500000",
    focus: ["Psychotherapy & Counseling"],
    achievements:
      "Provided free psychotherapy to over 4,200 individuals across Nairobi. Established 3 community counseling centres and trained 120 community health volunteers.",
  },
  pending: {
    name: "Youth Connect Wellness",
    location: "Kisumu",
    type: "Community-Based Org",
    statusLabel: "Pending Review",
    statusBg: "bg-amber-50",
    statusText: "text-amber-700",
    statusBorder: "border-amber-200",
    dotClass: "bg-amber-400 animate-pulse",
    note: {
      type: "info",
      title: "Currently Under Review",
      body: "Your submission is being reviewed. You can update details now — changes will be included in the ongoing review.",
    },
    email: "info@youthconnect.co.ke",
    phone: "+254 723 456 789",
    website: "",
    county: "Kisumu",
    subcounty: "Kisumu Central",
    year: "2022",
    reached: "1100",
    funding: "800000",
    focus: ["School Mental Health", "Child & Adolescent MH"],
    achievements:
      "School-based MH programmes in 12 public schools in Kisumu County, reaching over 1,100 students.",
  },
  rejected: {
    name: "Beacon Hope Initiative",
    location: "Eldoret",
    type: "Local NGO",
    statusLabel: "Rejected",
    statusBg: "bg-red-50",
    statusText: "text-red-700",
    statusBorder: "border-red-200",
    dotClass: "bg-red-500",
    note: {
      type: "error",
      title: "Rejected by IDL — 14 Mar 2026",
      body: "The MH focus areas do not match your described services. Registration certificate could not be verified. Fix the issues below and resubmit.",
    },
    email: "info@beaconhope.org",
    phone: "+254 734 567 890",
    website: "https://beaconhope.org",
    county: "Eldoret",
    subcounty: "Eldoret East",
    year: "2021",
    reached: "800",
    funding: "600000",
    focus: ["Maternal MH"],
    achievements:
      "Supported 800 mothers across Uasin Gishu County with post-partum mental health counseling.",
  },
};

const allMhCategories = [
  "Psychotherapy & Counseling",
  "Mental Wellness Clinic",
  "Psychiatry",
  "School Mental Health",
  "Community Mental Health",
  "Child & Adolescent MH",
  "Maternal MH",
  "MH Screening & Assessments",
  "Men's Mental Health",
  "Rehabilitation",
];

const noteStyles = {
  success: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    icon: "text-emerald-500",
    title: "text-emerald-800",
    body: "text-emerald-700",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: "text-blue-500",
    title: "text-blue-800",
    body: "text-blue-700",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",
  },
  error: {
    bg: "bg-red-50",
    border: "border-red-200",
    icon: "text-red-500",
    title: "text-red-800",
    body: "text-red-700",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
  },
};

function openEditFacilityModal(key) {
  const d = facilityData[key];
  const ns = noteStyles[d.note.type];

  const mhHtml = allMhCategories
    .map((cat) => {
      const on = d.focus.includes(cat);
      return `<label class="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border ${on ? "border-primary bg-primary/[.06] text-primary font-semibold" : "border-gray-200 text-gray-700"} cursor-pointer hover:border-primary/40 hover:bg-primary/[.03] transition-all text-[12px]">
            <input type="checkbox" class="accent-primary w-3.5 h-3.5 flex-shrink-0" ${on ? "checked" : ""}> ${cat}
        </label>`;
    })
    .join("");

  const submitLabel =
    key === "rejected" ? "Fix & Resubmit" : "Save & Resubmit for Review";

  document.getElementById("edit-facility-modal").innerHTML = `
    <div class="bg-white w-full sm:rounded-3xl sm:max-w-3xl max-h-[96vh] sm:max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
            <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg class="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/></svg>
                </div>
                <div>
                    <h2 class="text-[15px] font-bold text-gray-900">${d.name}</h2>
                    <div class="flex items-center gap-2 mt-0.5">
                        <span class="inline-flex items-center gap-1 ${d.statusBg} ${d.statusText} ${d.statusBorder} border text-[11px] font-semibold px-2 py-0.5 rounded-full">
                            <span class="w-1.5 h-1.5 rounded-full ${d.dotClass}"></span>${d.statusLabel}
                        </span>
                        <span class="text-[11.5px] text-gray-400">${d.location} · ${d.type}</span>
                    </div>
                </div>
            </div>
            <button onclick="closeEditFacilityModal()" class="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors flex-shrink-0">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
            </button>
        </div>

        <!-- IDL note -->
        <div class="flex items-start gap-3 mx-6 mt-5 flex-shrink-0 ${ns.bg} border ${ns.border} rounded-2xl px-4 py-3.5">
            <svg class="w-4 h-4 ${ns.icon} flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="${ns.d}" clip-rule="evenodd"/></svg>
            <div>
                <p class="text-[12.5px] font-semibold ${ns.title}">${d.note.title}</p>
                <p class="text-[12px] ${ns.body} mt-0.5 leading-relaxed">${d.note.body}</p>
            </div>
        </div>

        <!-- Scrollable form -->
        <div class="flex-1 overflow-y-auto px-6 py-5 space-y-6">

            <div>
                <p class="text-[10.5px] font-semibold text-gray-400 uppercase tracking-widest mb-3 pb-1.5 border-b border-gray-100">Basic Information</p>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div class="sm:col-span-3"><label class="field-label">Name of Organization</label><input type="text" value="${d.name}" class="field"></div>
                    <div class="sm:col-span-2"><label class="field-label">Contact Email <span class="text-primary">*</span></label><input type="email" value="${d.email}" class="field"></div>
                    <div><label class="field-label">Contact Number <span class="text-primary">*</span></label><input type="tel" value="${d.phone}" class="field"></div>
                    <div class="sm:col-span-2"><label class="field-label">Website</label><input type="url" value="${d.website}" placeholder="https://..." class="field"></div>
                    <div><label class="field-label">Year Founded</label><input type="number" value="${d.year}" min="1970" max="2026" class="field"></div>
                </div>
            </div>

            <div>
                <p class="text-[10.5px] font-semibold text-gray-400 uppercase tracking-widest mb-3 pb-1.5 border-b border-gray-100">Location</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label class="field-label">County <span class="text-primary">*</span></label><input type="text" value="${d.county}" class="field"></div>
                    <div><label class="field-label">Sub-County <span class="text-primary">*</span></label><input type="text" value="${d.subcounty}" class="field"></div>
                </div>
            </div>

            <div>
                <p class="text-[10.5px] font-semibold text-gray-400 uppercase tracking-widest mb-3 pb-1.5 border-b border-gray-100">MH Service Categories <span class="text-primary">*</span></p>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">${mhHtml}</div>
            </div>

            <div>
                <p class="text-[10.5px] font-semibold text-gray-400 uppercase tracking-widest mb-3 pb-1.5 border-b border-gray-100">Impact & Achievements</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="sm:col-span-2"><label class="field-label">Achievements &amp; Key Milestones</label><textarea rows="3" class="field resize-none">${d.achievements}</textarea></div>
                    <div><label class="field-label">Persons Reached</label><input type="number" value="${d.reached}" class="field"></div>
                    <div><label class="field-label">MH Funding Used (KES)</label><input type="number" value="${d.funding}" class="field"></div>
                </div>
            </div>

            <div>
                <p class="text-[10.5px] font-semibold text-gray-400 uppercase tracking-widest mb-3 pb-1.5 border-b border-gray-100">Supporting Documents <span class="text-gray-400 font-normal normal-case text-[11px]">— optional</span></p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label class="field-label">Updated Logo</label><input type="file" accept=".png,.jpg,.jpeg" class="field text-[12px] py-2 cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[11.5px] file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"></div>
                    <div><label class="field-label">Registration Certificate</label><input type="file" accept=".pdf,.png,.jpg" class="field text-[12px] py-2 cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[11.5px] file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"></div>
                </div>
            </div>

        </div>

        <!-- Footer -->
        <div class="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-white flex-shrink-0">
            <button onclick="closeEditFacilityModal()" class="text-[13px] font-semibold text-gray-500 hover:text-gray-800 px-4 py-2.5 rounded-xl hover:bg-gray-100 transition-colors">Cancel</button>
            <button onclick="saveEditFacility('${key}')" class="flex items-center gap-2 bg-primary hover:bg-secondary text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-[0_2px_10px_rgba(188,36,75,.3)]">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                ${submitLabel}
            </button>
        </div>
    </div>`;

  document.getElementById("edit-facility-modal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeEditFacilityModal() {
  document.getElementById("edit-facility-modal").classList.add("hidden");
  document.body.style.overflow = "";
}

function saveEditFacility(key) {
  closeEditFacilityModal();
  const label =
    key === "rejected"
      ? "resubmitted for IDL review"
      : "saved & resubmitted for review";
  const toast = document.createElement("div");
  toast.className =
    "fixed bottom-6 right-6 z-[70] flex items-center gap-3 bg-gray-900 text-white px-5 py-4 rounded-2xl shadow-2xl text-[13.5px] font-medium";
  toast.style.animation = "fadeUp .3s ease forwards";
  toast.innerHTML = `<svg class="w-5 h-5 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg> Facility ${label}. IDL will notify you by email.`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 5000);
}

document.addEventListener("click", (e) => {
  if (e.target === document.getElementById("edit-facility-modal"))
    closeEditFacilityModal();
});
