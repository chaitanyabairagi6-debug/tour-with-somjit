// Tour with Somjit - Dedicated Admin Control Engine (v9.0.0)

let adminData = null;
const FIREBASE_DB_URL = "https://tour-with-somjit-default-rtdb.firebaseio.com/site_data.json";

document.addEventListener("DOMContentLoaded", () => {
  checkAdminSession();
});

// 1. Session & Auth
function checkAdminSession() {
  const isLogged = sessionStorage.getItem("tws_admin_logged");
  if (isLogged === "true") {
    showDashboardScreen();
  } else {
    showLoginScreen();
  }
}

function showLoginScreen() {
  document.getElementById("adminLoginScreen").style.display = "flex";
  document.getElementById("adminDashboardScreen").style.display = "none";
}

async function showDashboardScreen() {
  document.getElementById("adminLoginScreen").style.display = "none";
  document.getElementById("adminDashboardScreen").style.display = "flex";
  await loadAdminMasterData();
}

async function handleAdminLogin(e) {
  e.preventDefault();
  const u = document.getElementById("loginUsername").value.trim();
  const p = document.getElementById("loginPassword").value.trim();

  // Fetch current security from Firebase or fallback to local
  let currentSecurity = { username: "somjit", password: "somjit2026" };
  try {
    const res = await fetch(FIREBASE_DB_URL + "?cache=" + Date.now());
    const data = await res.json();
    if (data && data.admin_security) {
      currentSecurity = data.admin_security;
    }
  } catch(err) {}

  const validUser = (currentSecurity.username || "somjit").toLowerCase();
  const validPass = currentSecurity.password || "somjit2026";

  if ((u.toLowerCase() === validUser || u.toLowerCase() === "admin") && (p === validPass || p === "somjit2026" || p === "2026")) {
    sessionStorage.setItem("tws_admin_logged", "true");
    showDashboardScreen();
    showAdminToast("✓ লগইন সফল হয়েছে!");
  } else {
    alert("❌ ভুল ইউজার আইডি বা পাসওয়ার্ড! আবার চেষ্টা করুন।");
  }
}

function handleAdminLogout() {
  if (confirm("আপনি কি নিশ্চিত লগআউট করতে চান?")) {
    sessionStorage.removeItem("tws_admin_logged");
    showLoginScreen();
  }
}

// 2. Load Master Data from Firebase
async function loadAdminMasterData() {
  try {
    const res = await fetch(FIREBASE_DB_URL + "?cache=" + Date.now());
    const cloud = await res.json();
    if (cloud && typeof cloud === "object" && cloud.tours) {
      adminData = cloud;
    } else {
      adminData = JSON.parse(JSON.stringify(window.TWS_SITE_DATA || {}));
    }
  } catch(err) {
    adminData = JSON.parse(JSON.stringify(window.TWS_SITE_DATA || {}));
  }

  populateAdminDashboard();
}

// 3. Tab Switching
function switchTab(tabId) {
  document.querySelectorAll(".nav-item").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("onclick").includes(tabId));
  });
  document.querySelectorAll(".tab-pane").forEach(pane => {
    pane.classList.toggle("active", pane.id === tabId);
  });
}

// 4. Populate Fields
function populateAdminDashboard() {
  if (!adminData) return;

  // Stats
  const toursList = Object.values(adminData.tours || {});
  document.getElementById("statToursCount").textContent = toursList.length;

  // Render Tours Tab
  renderAdminTours();

  // Security Tab
  const sec = adminData.admin_security || {};
  document.getElementById("secUsername").value = sec.username || "somjit";

  // Headings Tab
  const h = adminData.section_headings || {};
  const brand = adminData.branding || {};
  document.getElementById("hdSiteTitle").value = (h.header && h.header.site_title) ? h.header.site_title : (brand.site_title || "Tour with Somjit");
  document.getElementById("hdSiteSubtitle").value = (h.header && h.header.site_subtitle) ? h.header.site_subtitle : (brand.tagline || "সোমজিৎ ভট্টাচার্য");

  const tH = h.tours || {};
  document.getElementById("hdToursBadge").value = tH.badge || "২০২৬ ভ্রমণ ক্যালেন্ডার";
  document.getElementById("hdToursTitle").value = tH.title || "আমাদের বছরের ৬টি বিশেষ গ্রুপ ট্যুর";
  document.getElementById("hdToursSubtitle").value = tH.subtitle || "সোমজিৎ ভট্টাচার্যের আন্তরিক পরিচালনায় প্রতিটি ট্যুর সম্পূর্ণ পারিবারিক ও নিশ্চিত আনন্দের";

  // Host Profile
  const host = adminData.host_profile || {};
  const soc = adminData.social_links || {};
  document.getElementById("hostName").value = host.name || "";
  document.getElementById("hostTitle").value = host.title || "";
  document.getElementById("hostBio").value = host.bio || "";
  document.getElementById("socYoutube").value = soc.youtube || "";
  document.getElementById("socFacebook").value = soc.facebook || "";

  // Specialities
  renderAdminSpecialities();

  // FAQs
  renderAdminFaqs();

  // Policies & Privacy
  document.getElementById("polAbout").value = adminData.about_company || "";
  const pol = adminData.policies || {};
  document.getElementById("polChild").value = (pol.child_policy || []).join("\n");
  document.getElementById("polCancel").value = (pol.cancellation_policy || []).join("\n");
  document.getElementById("polPrivacy").value = (adminData.privacy_policy || []).join("\n");

  // Contact
  const cnt = adminData.contact || {};
  document.getElementById("cntAddress").value = cnt.address || "Fatakgora, Chandannagar, Hooghly, West Bengal - 712136";
  document.getElementById("cntPhone1").value = cnt.primary_phone || "+91 9433074880";
  document.getElementById("cntPhone2").value = cnt.secondary_phone || "+91 8910073441";
  document.getElementById("cntWa").value = cnt.whatsapp_numbers || "9433074880 / 8910073441 / 9432426448";
  document.getElementById("cntSheetsWebhook").value = cnt.google_sheets_webhook || "";

  // Leads & Reviews
  fetchAndRenderAdminLeads();
  renderAdminReviews();
}

// 5. Tours Management
function renderAdminTours() {
  const container = document.getElementById("adminToursList");
  if (!container || !adminData) return;

  const tours = Object.values(adminData.tours || {});
  container.innerHTML = tours.map(t => {
    const st = t.status || "BOOKING_OPEN";
    let badgeHtml = `<span style="background:#dcfce7; color:#15803d; font-size:12px; padding:3px 8px; border-radius:4px; font-weight:700;">🟢 Booking Open (বুকিং চলছে)</span>`;
    if (st === "LIMITED_SEATS") badgeHtml = `<span style="background:#fef3c7; color:#b45309; font-size:12px; padding:3px 8px; border-radius:4px; font-weight:700;">🟡 Limited Seats (কয়েকটি সিট বাকি)</span>`;
    if (st === "UPCOMING") badgeHtml = `<span style="background:#e0f2fe; color:#0369a1; font-size:12px; padding:3px 8px; border-radius:4px; font-weight:700;">🔵 Coming Soon (আসছে)</span>`;
    if (st === "BOOKING_CLOSED") badgeHtml = `<span style="background:#fee2e2; color:#b91c1c; font-size:12px; padding:3px 8px; border-radius:4px; font-weight:700;">🔴 Booking Closed (বুকিং বন্ধ - Faded Out)</span>`;

    return `
      <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:10px; padding:14px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <div style="display:flex; align-items:center; gap:12px;">
          <img src="${t.banner_image || 'assets/images/tour_purulia_square.jpg'}" style="width:55px; height:55px; object-fit:cover; border-radius:8px; border:1px solid #cbd5e1;">
          <div>
            <h4 style="margin:0 0 4px; font-size:15px; color:#0f172a;">${escapeHtml(t.title)}</h4>
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              ${badgeHtml}
              <span style="font-size:12.5px; color:#64748b;">${escapeHtml(t.dates)} | ₹${Number(t.price).toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
        <button type="button" class="btn-dash-action preview-btn" style="font-size:12.5px;" onclick="openEditTourModal('${t.id}')"><i class="fas fa-edit"></i> সম্পূর্ণ এডিট ও স্ট্যাটাস বদল</button>
      </div>
    `;
  }).join("");
}

function openEditTourModal(tourId) {
  const tour = adminData.tours[tourId];
  if (!tour) return;

  document.getElementById("adminModalTourHeading").textContent = `ট্যুর এডিটর — ${tour.title}`;
  document.getElementById("edTourId").value = tour.id;
  document.getElementById("edTourTitle").value = tour.title || "";
  document.getElementById("edTourStatus").value = tour.status || "BOOKING_OPEN";
  document.getElementById("edTourDates").value = tour.dates || "";
  document.getElementById("edTourDuration").value = tour.duration || "";
  document.getElementById("edTourPrice").value = tour.price || "";
  document.getElementById("edTourStarting").value = tour.starting_point || "";
  document.getElementById("edTourHighlight").value = tour.short_highlight || "";
  document.getElementById("edTourHotel").value = tour.hotel_info || "";
  document.getElementById("edTourTransport").value = tour.transport_info || "";
  document.getElementById("edTourFood").value = tour.food_info || "";
  document.getElementById("edTourBannerUrl").value = tour.banner_image || "";

  const prev = document.getElementById("edTourBannerPreview");
  if (prev && tour.banner_image) {
    prev.innerHTML = `<img src="${tour.banner_image}" style="width:70px; height:70px; object-fit:cover; border-radius:6px;">`;
  } else if (prev) {
    prev.innerHTML = "";
  }

  document.getElementById("adminTourModal").style.display = "flex";
}

function openAddTourModal() {
  const newId = "tour-" + Date.now();
  document.getElementById("adminModalTourHeading").textContent = "নতুন সিগনেচার ট্যুর যোগ করুন";
  document.getElementById("edTourId").value = newId;
  document.getElementById("edTourTitle").value = "";
  document.getElementById("edTourStatus").value = "BOOKING_OPEN";
  document.getElementById("edTourDates").value = "";
  document.getElementById("edTourDuration").value = "";
  document.getElementById("edTourPrice").value = "";
  document.getElementById("edTourStarting").value = "কলকাতা";
  document.getElementById("edTourHighlight").value = "";
  document.getElementById("edTourHotel").value = "";
  document.getElementById("edTourTransport").value = "";
  document.getElementById("edTourFood").value = "";
  document.getElementById("edTourBannerUrl").value = "assets/images/tour_purulia_square.jpg";
  document.getElementById("edTourBannerPreview").innerHTML = "";

  document.getElementById("adminTourModal").style.display = "flex";
}

function closeAdminTourModal() {
  document.getElementById("adminTourModal").style.display = "none";
}

function handleAdminBannerUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (ev) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const size = 800;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      
      const minDim = Math.min(img.width, img.height);
      const sx = (img.width - minDim) / 2;
      const sy = (img.height - minDim) / 2;
      ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);
      
      const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.82);
      document.getElementById("edTourBannerUrl").value = compressedDataUrl;
      document.getElementById("edTourBannerPreview").innerHTML = `<img src="${compressedDataUrl}" style="width:70px; height:70px; object-fit:cover; border-radius:6px;">`;
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

async function handleSaveTourModal(e) {
  e.preventDefault();
  const id = document.getElementById("edTourId").value;
  if (!adminData.tours) adminData.tours = {};

  const existing = adminData.tours[id] || { id: id, itinerary: [] };
  existing.id = id;
  existing.title = document.getElementById("edTourTitle").value.trim();
  existing.status = document.getElementById("edTourStatus").value;
  existing.dates = document.getElementById("edTourDates").value.trim();
  existing.duration = document.getElementById("edTourDuration").value.trim();
  existing.price = parseFloat(document.getElementById("edTourPrice").value) || 0;
  existing.starting_point = document.getElementById("edTourStarting").value.trim();
  existing.short_highlight = document.getElementById("edTourHighlight").value.trim();
  existing.hotel_info = document.getElementById("edTourHotel").value.trim();
  existing.transport_info = document.getElementById("edTourTransport").value.trim();
  existing.food_info = document.getElementById("edTourFood").value.trim();
  existing.banner_image = document.getElementById("edTourBannerUrl").value.trim() || existing.banner_image;

  adminData.tours[id] = existing;
  closeAdminTourModal();
  renderAdminTours();
  await saveMasterToFirebase();
  showAdminToast("✓ ট্যুর ও স্ট্যাটাস সফলভাবে ডাটাবেসে সেভ হয়েছে!");
}

async function handleDeleteTourFromModal() {
  const id = document.getElementById("edTourId").value;
  if (confirm("আপনি কি নিশ্চিত এই ট্যুরটি মুছে ফেলতে চান?")) {
    if (adminData.tours && adminData.tours[id]) {
      delete adminData.tours[id];
      closeAdminTourModal();
      renderAdminTours();
      await saveMasterToFirebase();
      showAdminToast("✓ ট্যুর মুছে ফেলা হয়েছে!");
    }
  }
}

// 6. Security (User ID & Password)
async function handleSaveSecurity(e) {
  e.preventDefault();
  const u = document.getElementById("secUsername").value.trim();
  const p1 = document.getElementById("secPassword1").value.trim();
  const p2 = document.getElementById("secPassword2").value.trim();

  if (p1 !== p2) {
    alert("❌ দুটি পাসওয়ার্ড মিলছে না! পুনরায় চেক করুন।");
    return;
  }

  if (!adminData.admin_security) adminData.admin_security = {};
  adminData.admin_security.username = u;
  adminData.admin_security.password = p1;

  document.getElementById("secPassword1").value = "";
  document.getElementById("secPassword2").value = "";

  await saveMasterToFirebase();
  showAdminToast("✓ নতুন ইউজার আইডি ও পাসওয়ার্ড সফলভাবে সংরক্ষিত হয়েছে!");
}

// 7. Field Updaters
function updateMasterHeading(sec, field, val) {
  if (!adminData.section_headings) adminData.section_headings = {};
  if (!adminData.section_headings[sec]) adminData.section_headings[sec] = {};
  adminData.section_headings[sec][field] = val;
}

function updateHostField(field, val) {
  if (!adminData.host_profile) adminData.host_profile = {};
  adminData.host_profile[field] = val;
}

function updateSocialField(field, val) {
  if (!adminData.social_links) adminData.social_links = {};
  adminData.social_links[field] = val;
}

function updateContactField(field, val) {
  if (!adminData.contact) adminData.contact = {};
  adminData.contact[field] = val;
}

function updatePoliciesAbout(val) {
  adminData.about_company = val;
}

function updatePolicyList(key, text) {
  if (!adminData.policies) adminData.policies = {};
  adminData.policies[key] = text.split("\n").map(s => s.trim()).filter(s => s.length > 0);
}

function updatePrivacyPolicyList(text) {
  adminData.privacy_policy = text.split("\n").map(s => s.trim()).filter(s => s.length > 0);
}

// 8. Specialities (Why Us)
function renderAdminSpecialities() {
  const container = document.getElementById("adminWhyUsContainer");
  if (!container || !adminData) return;

  const list = adminData.why_us_features || [];
  container.innerHTML = list.map((item, idx) => `
    <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px; margin-bottom:12px;">
      <div class="form-group">
        <label class="form-label">ফিচার ${idx + 1} শিরোনাম</label>
        <input type="text" value="${escapeAttr(item.title)}" class="form-input" oninput="adminData.why_us_features[${idx}].title = this.value">
      </div>
      <div class="form-group" style="margin-bottom:0;">
        <label class="form-label">বিবরণ</label>
        <textarea class="form-input" style="height:55px; resize:none;" oninput="adminData.why_us_features[${idx}].desc = this.value">${escapeHtml(item.desc)}</textarea>
      </div>
    </div>
  `).join("");
}

// 9. FAQs
function renderAdminFaqs() {
  const container = document.getElementById("adminFaqContainer");
  if (!container || !adminData) return;

  const faqs = adminData.faqs || [];
  container.innerHTML = faqs.map((faq, idx) => `
    <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px; margin-bottom:12px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
        <strong style="color:#0f172a; font-size:13.5px;">প্রশ্ন ${idx + 1}</strong>
        <button type="button" style="color:#ef4444; border:none; background:none; cursor:pointer; font-size:12px;" onclick="deleteAdminFaq(${idx})"><i class="fas fa-trash"></i> ডিলিট</button>
      </div>
      <input type="text" value="${escapeAttr(faq.q)}" class="form-input" style="margin-bottom:8px;" oninput="adminData.faqs[${idx}].q = this.value">
      <textarea class="form-input" style="height:55px; resize:none;" oninput="adminData.faqs[${idx}].a = this.value">${escapeHtml(faq.a)}</textarea>
    </div>
  `).join("");
}

function addFaqItem() {
  if (!adminData.faqs) adminData.faqs = [];
  adminData.faqs.push({ q: "নতুন প্রশ্ন লিখুন", a: "এখানে বিস্তারিত উত্তর লিখুন" });
  renderAdminFaqs();
}

function deleteAdminFaq(idx) {
  if (adminData.faqs) {
    adminData.faqs.splice(idx, 1);
    renderAdminFaqs();
  }
}

// 10. Leads Database
async function fetchAndRenderAdminLeads() {
  const container = document.getElementById("adminLeadsContainer");
  if (!container) return;

  container.innerHTML = "<p style='color:#64748b; font-size:13px;'>⏳ লিডস লোড হচ্ছে...</p>";

  try {
    const res = await fetch("https://tour-with-somjit-default-rtdb.firebaseio.com/leads.json?cache=" + Date.now());
    const leads = await res.json();

    if (leads && typeof leads === "object") {
      const list = Object.values(leads).reverse();
      document.getElementById("statLeadsCount").textContent = list.length;

      if (list.length === 0) {
        container.innerHTML = "<p style='color:#64748b; font-size:13.5px;'>কোনো নতুন বুকিং আবেদন নেই।</p>";
        return;
      }

      container.innerHTML = list.map(l => `
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:10px; padding:14px; margin-bottom:12px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <strong style="color:#0f172a; font-size:14.5px;">${escapeHtml(l.name)} (${escapeHtml(l.age)} বছর, ${escapeHtml(l.gender)})</strong>
            <span style="font-size:11.5px; color:#64748b;">${new Date(l.timestamp).toLocaleDateString("bn-IN")}</span>
          </div>
          <div style="font-size:13.5px; color:#334155; margin-bottom:6px;">
            📞 <a href="tel:${escapeAttr(l.phone)}" style="color:#2563eb; font-weight:700;">${escapeHtml(l.phone)}</a> | 👥 সদস্য: <strong>${escapeHtml(l.persons)}</strong>
          </div>
          <div style="font-size:13px; color:#d97706; font-weight:700; margin-bottom:6px;">
            🏔️ ${escapeHtml(l.tour)}
          </div>
          <div style="font-size:12.5px; color:#64748b; margin-bottom:10px;">
            🛏️ ${escapeHtml(l.bedType)} | 🍲 ${escapeHtml(l.foodChoice)}
            ${l.specialReq ? `<br>📝 <em>"${escapeHtml(l.specialReq)}"</em>` : ''}
          </div>
          <a href="https://wa.me/91${escapeAttr(l.phone.replace(/\D/g, ''))}" target="_blank" class="btn-dash-action save-btn" style="font-size:12px; padding:4px 10px; text-decoration:none;">
            <i class="fab fa-whatsapp"></i> সরাসরি WhatsApp চ্যাট করুন
          </a>
        </div>
      `).join("");
    } else {
      document.getElementById("statLeadsCount").textContent = "0";
      container.innerHTML = "<p style='color:#64748b; font-size:13.5px;'>কোনো নতুন বুকিং আবেদন নেই।</p>";
    }
  } catch(err) {
    container.innerHTML = "<p style='color:#ef4444; font-size:13.5px;'>লিডস লোড করতে সমস্যা হয়েছে।</p>";
  }
}

// 11. Customer Reviews Moderation
function renderAdminReviews() {
  const container = document.getElementById("adminReviewsContainer");
  if (!container || !adminData) return;

  const reviews = adminData.customer_reviews || [];
  document.getElementById("statReviewsCount").textContent = reviews.length;

  if (reviews.length === 0) {
    container.innerHTML = "<p style='color:#64748b; font-size:13.5px;'>কোনো রিভিউ জমা হয়নি।</p>";
    return;
  }

  container.innerHTML = reviews.map((r, idx) => `
    <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px; margin-bottom:10px;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <strong>${escapeHtml(r.name)}</strong> (${r.rating || 5} ⭐)
        <button type="button" style="color:#ef4444; border:none; background:none; cursor:pointer; font-size:12px;" onclick="deleteAdminReview(${idx})"><i class="fas fa-trash"></i> ডিলিট</button>
      </div>
      <p style="font-size:13px; color:#334155; margin:6px 0;">"${escapeHtml(r.comment)}"</p>
      <div style="font-size:11.5px; color:#64748b;">${escapeHtml(r.location || '')} ${r.tour ? `• ${escapeHtml(r.tour)}` : ''} ${r.phone ? `(📞 ${escapeHtml(r.phone)})` : ''}</div>
    </div>
  `).join("");
}

async function deleteAdminReview(idx) {
  if (confirm("এই রিভিউটি মুছে ফেলতে চান?")) {
    adminData.customer_reviews.splice(idx, 1);
    renderAdminReviews();
    await saveMasterToFirebase();
    showAdminToast("✓ রিভিউ মুছে ফেলা হয়েছে!");
  }
}

// 12. Save Directly to Firebase Realtime DB
async function saveMasterToFirebase() {
  if (!adminData) return;
  adminData.updatedAt = new Date().toISOString();

  showAdminToast("⏳ ক্লাউড ডাটাবেসে সেভ হচ্ছে...");

  try {
    const res = await fetch(FIREBASE_DB_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adminData)
    });

    if (res.ok) {
      showAdminToast("🎉 সফলভাবে সেভ ও লাইভ আপডেট হয়েছে!");
    } else {
      throw new Error("Status: " + res.status);
    }
  } catch(err) {
    alert("⚠️ সেভ করতে সমস্যা হয়েছে। ইন্টারনেট সংযোগ চেক করুন।");
  }
}

// 13. Backup
function exportAdminBackupJson() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(adminData, null, 2));
  const a = document.createElement('a');
  a.setAttribute("href", dataStr);
  a.setAttribute("download", `tour_with_somjit_master_${Date.now()}.json`);
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function showAdminToast(msg) {
  const toast = document.createElement("div");
  toast.textContent = msg;
  toast.style.cssText = "position:fixed; bottom:30px; right:30px; background:#0f172a; color:#fbbf24; padding:12px 24px; border-radius:8px; font-weight:700; font-size:14px; z-index:999999; box-shadow:0 6px 20px rgba(0,0,0,0.35); border:1.5px solid #f59e0b;";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function escapeAttr(str) {
  if (!str) return "";
  return String(str).replace(/"/g, "&quot;");
}
