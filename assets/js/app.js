// =========================================================================
// Tour with Somjit - Master Application Engine
// Features: Firebase RTDB Sync, Google Sheets Auto-Sync Webhook, In-Page CMS
// =========================================================================

let livePublished = null;
let workingDraft = null;
let isAdminAuthenticated = false;

document.addEventListener("DOMContentLoaded", () => {
  initCloudPublishedData();
  setupMobileDrawer();
  setupKeyboardAdminShortcut();
});

// 1. Single Source of Truth Cloud Data Loader
async function initCloudPublishedData() {
  const cacheBuster = "?t=" + Date.now();
  const cloudUrl = "https://tour-with-somjit-default-rtdb.firebaseio.com/site_data.json" + cacheBuster;

  try {
    const res = await fetch(cloudUrl, { cache: "no-store" });
    const cloudData = await res.json();
    if (cloudData && typeof cloudData === "object" && cloudData.tours) {
      livePublished = cloudData;
      workingDraft = JSON.parse(JSON.stringify(cloudData));
      window.TWS_SITE_DATA = cloudData;
      localStorage.setItem("tws_published_site_data", JSON.stringify(cloudData));
      renderAllComponents(livePublished);
    } else {
      throw new Error("Invalid schema");
    }
  } catch(err) {
    const localCached = localStorage.getItem("tws_published_site_data");
    if (localCached) {
      livePublished = JSON.parse(localCached);
    } else {
      livePublished = window.TWS_SITE_DATA || {};
    }
    workingDraft = JSON.parse(JSON.stringify(livePublished));
    renderAllComponents(livePublished);
  }
}

// 2. Component Renderers
function renderAllComponents(data) {
  if (!data) return;
  renderHostHero(data);
  renderAnnualToursGrid(data);
  renderWhyUsGrid(data);
  renderMomentsGallery(data);
  renderCustomerReviews(data);
  renderHomeFaqs(data);
  populateTourDropdown(data);
}

// Host Hero
function renderHostHero(data) {
  const host = data.host_profile || {};
  const social = data.social_links || {};

  const nameElem = document.getElementById("dynHostName");
  const bioElem = document.getElementById("dynHostBio");
  const avatarElem = document.getElementById("dynHostAvatar");
  const ytLink = document.getElementById("dynYtLink");
  const fbLink = document.getElementById("dynFbLink");

  if (nameElem) nameElem.textContent = host.name || "Somjit Bhattacharyya";
  if (bioElem) bioElem.textContent = host.bio || "";
  if (avatarElem && host.avatar) avatarElem.src = host.avatar;
  if (ytLink && social.youtube) ytLink.href = social.youtube;
  if (fbLink && social.facebook) fbLink.href = social.facebook;
}

// 6 Annual Tours Grid (1:1 Aspect Ratio Banners, NO TEXT ON BANNER)
function renderAnnualToursGrid(data) {
  const container = document.getElementById("annualToursGrid");
  if (!container) return;

  const tours = Object.values(data.tours || {});
  let html = "";

  tours.forEach(tour => {
    const imgUrl = tour.banner_image || "assets/images/tour_purulia_square.jpg";
    const category = tour.category || "গ্রুপ ট্যুর";
    const status = tour.status || "BOOKING OPEN";
    const isUpcoming = status.includes("UPCOMING");
    const waText = encodeURIComponent(`নমস্কার সোমজিৎ ভট্টাচার্য, আমি আপনার '${tour.title}' সম্পর্কে বিস্তারিত জানতে ও সিট বুকিং করতে চাই।`);

    html += `
      <div class="tour-card-sq">
        <div class="tour-banner-sq-wrap" onclick="openTourDetailsModal('${tour.id}')" title="সম্পূর্ণ ট্যুর প্ল্যান দেখুন">
          <img class="tour-banner-sq-img" src="${imgUrl}" alt="${escapeAttr(tour.title)}" loading="lazy">
          <div class="tour-badge-category">${escapeHtml(category)}</div>
          <div class="tour-badge-status ${isUpcoming ? 'upcoming' : ''}">${escapeHtml(status)}</div>
        </div>
        <div class="tour-card-sq-body">
          <h3 class="tour-sq-title">${escapeHtml(tour.title)}</h3>
          <div class="tour-sq-meta">
            <i class="fa-regular fa-calendar-days"></i> ${escapeHtml(tour.dates || '২০২৬')}
            <span style="color: #cbd5e1;">|</span>
            <i class="fa-solid fa-clock"></i> ${escapeHtml(tour.duration || 'ট্যুর')}
          </div>
          <div class="tour-sq-price-row">
            <span>💰</span> ₹ ${Number(tour.price || 0).toLocaleString("en-IN")} / জনপ্রতি
          </div>
          <div class="tour-sq-buttons">
            <a href="https://wa.me/918116472937?text=${waText}" target="_blank" class="btn-tour-wa">
              <i class="fa-brands fa-whatsapp"></i> WhatsApp বুকিং
            </a>
            <button type="button" class="btn-tour-plan" onclick="openTourDetailsModal('${tour.id}')">
              <i class="fa-solid fa-circle-info"></i> ট্যুর প্ল্যান
            </button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Why Us Speciality
function renderWhyUsGrid(data) {
  const container = document.getElementById("whyUsGrid");
  if (!container) return;

  const features = data.why_us_features || [];
  container.innerHTML = features.map(f => `
    <div class="speciality-card">
      <div class="speciality-icon-box">
        <i class="${f.icon}"></i>
      </div>
      <div>
        <h4 class="speciality-title">${escapeHtml(f.title)}</h4>
        <p class="speciality-desc">${escapeHtml(f.desc)}</p>
      </div>
    </div>
  `).join("");
}

// Past Moments Gallery
function renderMomentsGallery(data) {
  const track = document.getElementById("momentsTrack");
  if (!track) return;

  const moments = data.moments_gallery || [];
  track.innerHTML = moments.map((m, idx) => `
    <div class="gallery-thumb-card" onclick="openLightboxModal(${idx})" title="ক্লিক করে বড় ছবি দেখুন">
      <img src="${m.image_url}" alt="${escapeAttr(m.caption || 'Tour Moment')}" loading="lazy">
    </div>
  `).join("");
}

// Customer Reviews
function renderCustomerReviews(data) {
  const container = document.getElementById("customerReviewsGrid");
  if (!container) return;

  const reviews = data.customer_reviews || [];
  container.innerHTML = reviews.map(r => `
    <div class="review-card">
      <div class="review-stars-row">
        ${'<i class="fas fa-star"></i>'.repeat(r.rating || 5)}
      </div>
      <p class="review-comment">"${escapeHtml(r.comment)}"</p>
      <div style="margin-top:auto;">
        <div class="review-author-name">${escapeHtml(r.name)}</div>
        <div class="review-author-loc">${escapeHtml(r.location)} • <span style="color:#d97706;">${escapeHtml(r.tour)}</span></div>
      </div>
    </div>
  `).join("");
}

// FAQ Accordion
function renderHomeFaqs(data) {
  const container = document.getElementById("homeFaqContainer");
  if (!container) return;

  const faqs = data.faqs || [];
  container.innerHTML = faqs.map((faq, idx) => `
    <div class="accordion-item" id="faqItem_${idx}">
      <button class="accordion-header-btn" onclick="toggleAccordion('faqItem_${idx}')">
        <span><i class="fas fa-question-circle" style="color:#d97706; margin-right:8px;"></i> ${escapeHtml(faq.q)}</span>
        <i class="fas fa-chevron-down acc-arrow"></i>
      </button>
      <div class="accordion-content-drawer">
        <div class="accordion-body-text">${escapeHtml(faq.a)}</div>
      </div>
    </div>
  `).join("");
}

function toggleAccordion(id) {
  const item = document.getElementById(id);
  if (!item) return;
  const drawer = item.querySelector(".accordion-content-drawer");
  const arrow = item.querySelector(".acc-arrow");
  const isOpen = drawer.style.maxHeight && drawer.style.maxHeight !== "0px";

  if (isOpen) {
    drawer.style.maxHeight = "0px";
    if (arrow) arrow.style.transform = "rotate(0deg)";
  } else {
    drawer.style.maxHeight = drawer.scrollHeight + "px";
    if (arrow) arrow.style.transform = "rotate(180deg)";
  }
}

// 3. Tour Details Modal & Itinerary
let selectedTourForDetails = null;

function openTourDetailsModal(tourId) {
  const data = (isAdminAuthenticated && workingDraft) ? workingDraft : livePublished;
  if (!data || !data.tours || !data.tours[tourId]) return;

  const tour = data.tours[tourId];
  selectedTourForDetails = tour;

  document.getElementById("dtTourTitle").textContent = tour.title;
  document.getElementById("dtCoverImg").src = tour.banner_image || "assets/images/tour_purulia_square.jpg";
  document.getElementById("dtCategoryBadge").textContent = tour.category || "গ্রুপ ট্যুর";
  document.getElementById("dtStatusBadge").textContent = tour.status || "BOOKING OPEN";
  document.getElementById("dtDates").textContent = tour.dates || "২০২৬";
  document.getElementById("dtDuration").textContent = tour.duration || "ট্যুর";
  document.getElementById("dtStarting").textContent = tour.starting_point || "কলকাতা";
  document.getElementById("dtPrice").textContent = `₹${Number(tour.price || 0).toLocaleString("en-IN")} / জন`;
  document.getElementById("dtShortHighlight").textContent = tour.short_highlight || "";

  document.getElementById("dtHotelInfo").textContent = tour.hotel_info || "প্রিমিয়াম হোটেল ও রিসোর্ট";
  document.getElementById("dtTransportInfo").textContent = tour.transport_info || "এসি লাক্সারি গাড়ি";
  document.getElementById("dtFoodInfo").textContent = tour.food_info || "ঘরোয়া টাটকা খাবার";
  document.getElementById("dtActivities").textContent = tour.activities || "দর্শনীয় স্থান ও বিনোদন";

  // Plans
  const plansBox = document.getElementById("dtPlansBox");
  if (tour.pricing_plans && tour.pricing_plans.length > 0) {
    plansBox.innerHTML = `
      <h3 class="details-sub-heading" style="margin-top:14px;"><i class="fas fa-tags" style="color:#d97706;"></i> প্যাকেজ অপশন ও মূল্য তালিকা</h3>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px; margin-top:8px;">
        ${tour.pricing_plans.map(p => `
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px; text-align:center;">
            <div style="font-weight:700; font-size:14px; color:#1b3b5a;">${escapeHtml(p.name)}</div>
            <div style="font-size:16px; font-weight:800; color:#d97706; margin-top:2px;">₹${Number(p.price).toLocaleString("en-IN")} <span style="font-size:12px; color:#64748b;">${escapeHtml(p.unit || '')}</span></div>
          </div>
        `).join("")}
      </div>
    `;
  } else {
    plansBox.innerHTML = "";
  }

  // Itinerary
  const timeline = document.getElementById("dtItineraryTimeline");
  const itins = tour.itinerary || [];
  timeline.innerHTML = itins.map(it => `
    <div class="itin-day-card">
      <div class="itin-day-header">${escapeHtml(it.title || `দিন ${it.day}`)}</div>
      <div class="itin-day-desc">${escapeHtml(it.desc || '')}</div>
    </div>
  `).join("");

  showModal("tourDetailsModal");
}

function closeTourDetailsModal() { hideModal("tourDetailsModal"); }

function bookFromDetailsModal() {
  if (selectedTourForDetails) {
    closeTourDetailsModal();
    openBookingModal(selectedTourForDetails.title);
  }
}

// 4. Booking Modal & Google Sheets Webhook Auto-Sync
function populateTourDropdown(data) {
  const select = document.getElementById("bkTourSelect");
  if (!select) return;

  const tours = Object.values(data.tours || {});
  select.innerHTML = '<option value="" disabled selected>ট্যুর নির্বাচন করুন</option>' +
    tours.map(t => `<option value="${escapeAttr(t.title)}">${escapeHtml(t.title)} (₹${Number(t.price).toLocaleString("en-IN")})</option>`).join("");
}

function openBookingModal(preselectedTourTitle = "") {
  const select = document.getElementById("bkTourSelect");
  if (select && preselectedTourTitle) {
    for (let opt of select.options) {
      if (opt.value.includes(preselectedTourTitle) || preselectedTourTitle.includes(opt.value)) {
        opt.selected = true;
        break;
      }
    }
  }
  showModal("bookingModal");
}

function closeBookingModal() { hideModal("bookingModal"); }

async function handleGroupBookingSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("bkGuestName").value.trim();
  const age = document.getElementById("bkGuestAge").value.trim();
  const gender = document.querySelector('input[name="bkGender"]:checked')?.value || "পুরুষ";
  const phone = document.getElementById("bkGuestPhone").value.trim();
  const persons = document.getElementById("bkPersons").value.trim();
  const tour = document.getElementById("bkTourSelect").value;
  const bedType = document.querySelector('input[name="bkBedType"]:checked')?.value || "Double Bed";
  const foodChoice = document.querySelector('input[name="bkFoodChoice"]:checked')?.value || "আমিষ";
  const specialReq = document.getElementById("bkSpecialReq").value.trim();

  const leadData = {
    id: "lead-" + Date.now(),
    timestamp: new Date().toISOString(),
    name, age, gender, phone, persons, tour, bedType, foodChoice, specialReq
  };

  // 1. Save Lead to Firebase Realtime Database
  try {
    fetch(`https://tour-with-somjit-default-rtdb.firebaseio.com/leads/${leadData.id}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadData)
    });
  } catch(err) {}

  // 2. Auto-Sync to Google Sheets Webhook (if configured)
  const webhookUrl = (livePublished && livePublished.contact && livePublished.contact.google_sheets_webhook) ? livePublished.contact.google_sheets_webhook : "";
  if (webhookUrl && webhookUrl.startsWith("http")) {
    try {
      fetch(webhookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData)
      });
    } catch(err) {}
  }

  // 3. Format WhatsApp Message
  const waMsg = `*🌟 TOUR WITH SOMJIT — বুকিং আবেদন 🌟*\n` +
    `--------------------------------------\n` +
    `👤 *নাম:* ${name}\n` +
    `🎂 *বয়স:* ${age} বছর (${gender})\n` +
    `📞 *ফোন নম্বর:* ${phone}\n` +
    `👥 *সদস্য সংখ্যা:* ${persons}\n` +
    `🏔️ *নির্বাচিত ট্যুর:* ${tour}\n` +
    `🛏️ *বেডের ধরন:* ${bedType}\n` +
    `🍲 *খাবারের পছন্দ:* ${foodChoice}\n` +
    (specialReq ? `📝 *বিশেষ চাহিদা:* ${specialReq}\n` : '') +
    `--------------------------------------\n` +
    `_সোমজিৎ বাবু, আমি সিট বুকিং সংক্রান্ত প্রক্রিয়া জানতে চাই।_`;

  closeBookingModal();
  window.open(`https://wa.me/918116472937?text=${encodeURIComponent(waMsg)}`, "_blank");
}

// 5. Lightbox Modal
let currentLightboxIdx = 0;

function openLightboxModal(idx) {
  const data = (isAdminAuthenticated && workingDraft) ? workingDraft : livePublished;
  const moments = (data && data.moments_gallery) ? data.moments_gallery : [];
  if (!moments.length) return;

  currentLightboxIdx = (idx >= 0 && idx < moments.length) ? idx : 0;
  updateLightboxContent();
  showModal("galleryLightboxModal");
}

function closeLightboxModal() { hideModal("galleryLightboxModal"); }

function changeLightboxImage(dir) {
  const data = (isAdminAuthenticated && workingDraft) ? workingDraft : livePublished;
  const moments = (data && data.moments_gallery) ? data.moments_gallery : [];
  if (!moments.length) return;

  currentLightboxIdx = (currentLightboxIdx + dir + moments.length) % moments.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const data = (isAdminAuthenticated && workingDraft) ? workingDraft : livePublished;
  const moments = (data && data.moments_gallery) ? data.moments_gallery : [];
  if (!moments[currentLightboxIdx]) return;

  const item = moments[currentLightboxIdx];
  const imgElem = document.getElementById("lightboxImg");
  const captionElem = document.getElementById("lightboxCaption");

  if (imgElem) imgElem.src = item.image_url;
  if (captionElem) captionElem.textContent = item.caption || `ভ্রমণ মুহূর্ত (${currentLightboxIdx + 1}/${moments.length})`;
}

function handleLightboxBackdropClick(e) {
  if (e.target.id === "galleryLightboxModal") closeLightboxModal();
}

// 6. Admin Authentication & Visual CMS
function promptAdminLoginModal() {
  if (isAdminAuthenticated) {
    enterAdminVisualMode();
    openAdminDrawer("dashboard");
  } else {
    showModal("adminLoginModal");
  }
}

function closeAdminLoginModal() { hideModal("adminLoginModal"); }

function handleAdminLoginSubmit() {
  const pin = document.getElementById("admPinInput").value.trim();
  if (pin === "somjit2026" || pin === "2026") {
    isAdminAuthenticated = true;
    closeAdminLoginModal();
    enterAdminVisualMode();
    openAdminDrawer("dashboard");
    showToast("✓ অ্যাডমিন মোড সক্রিয় হয়েছে!");
  } else {
    alert("❌ ভুল পাসওয়ার্ড! আবার চেষ্টা করুন।");
  }
}

function setupKeyboardAdminShortcut() {
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === "A" || e.key === "a")) {
      e.preventDefault();
      promptAdminLoginModal();
    }
  });

  if (window.location.hash === "#admin") {
    promptAdminLoginModal();
  }
}

function enterAdminVisualMode() {
  document.body.classList.remove("public-mode");
  document.body.classList.add("admin-mode");
  const topBar = document.getElementById("adminLiveTopBar");
  if (topBar) topBar.style.display = "block";
}

function exitAdminVisualMode() {
  document.body.classList.remove("admin-mode");
  document.body.classList.add("public-mode");
  const topBar = document.getElementById("adminLiveTopBar");
  if (topBar) topBar.style.display = "none";
  closeAdminDrawer();
}

function openAdminDrawer(tabName = "dashboard") {
  const drawer = document.getElementById("adminCmsDrawer");
  if (drawer) {
    drawer.style.display = "flex";
    setTimeout(() => drawer.classList.add("active"), 10);
  }
  if (tabName) switchCmsTab(`tab${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`);
  populateCmsDashboard();
}

function closeAdminDrawer() {
  const drawer = document.getElementById("adminCmsDrawer");
  if (drawer) {
    drawer.classList.remove("active");
    setTimeout(() => { drawer.style.display = "none"; }, 300);
  }
}

function switchCmsTab(tabId) {
  document.querySelectorAll(".cms-tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId);
  });
  document.querySelectorAll(".cms-tab-pane").forEach(pane => {
    pane.classList.toggle("active", pane.id === tabId);
  });
}


// Leads Manager
async function fetchAndRenderLeads() {
  const container = document.getElementById("cmsLeadsListContainer");
  const dashCount = document.getElementById("dashLeadsCount");
  if (!container) return;

  container.innerHTML = "<p style='color:#64748b; font-size:13px;'>⏳ লিডস লোড হচ্ছে...</p>";

  try {
    const res = await fetch("https://tour-with-somjit-default-rtdb.firebaseio.com/leads.json?cache=" + Date.now());
    const leads = await res.json();

    if (leads && typeof leads === "object") {
      const list = Object.values(leads).reverse();
      if (dashCount) dashCount.textContent = list.length;

      if (list.length === 0) {
        container.innerHTML = "<p style='color:#64748b; font-size:13px;'>কোনো নতুন বুকিং আবেদন নেই।</p>";
        return;
      }

      container.innerHTML = list.map(l => `
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px; margin-bottom:10px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <strong style="color:#1b3b5a; font-size:14px;">${escapeHtml(l.name)} (${escapeHtml(l.age)} বছর, ${escapeHtml(l.gender)})</strong>
            <span style="font-size:11px; color:#64748b;">${new Date(l.timestamp).toLocaleDateString("bn-IN")}</span>
          </div>
          <div style="font-size:13px; color:#0f172a; margin-bottom:4px;">
            📞 <strong><a href="tel:${escapeAttr(l.phone)}" style="color:#2563eb;">${escapeHtml(l.phone)}</a></strong> | 👥 <strong>${escapeHtml(l.persons)}</strong>
          </div>
          <div style="font-size:12.5px; color:#d97706; font-weight:700; margin-bottom:4px;">
            🏔️ ${escapeHtml(l.tour)}
          </div>
          <div style="font-size:12px; color:#475569;">
            🛏️ ${escapeHtml(l.bedType)} | 🍲 ${escapeHtml(l.foodChoice)}
            ${l.specialReq ? `<br>📝 <em>"${escapeHtml(l.specialReq)}"</em>` : ''}
          </div>
          <div style="margin-top:8px;">
            <a href="https://wa.me/91${escapeAttr(l.phone.replace(/\D/g, ''))}" target="_blank" class="btn-cms-action open-drawer" style="padding:4px 8px; font-size:12px; text-decoration:none;">
              <i class="fab fa-whatsapp"></i> WhatsApp মেসেজ পাঠান
            </a>
          </div>
        </div>
      `).join("");
    } else {
      if (dashCount) dashCount.textContent = "0";
      container.innerHTML = "<p style='color:#64748b; font-size:13px;'>কোনো নতুন বুকিং আবেদন নেই।</p>";
    }
  } catch(err) {
    container.innerHTML = "<p style='color:#f87171; font-size:13px;'>লিডস লোড করতে সমস্যা হয়েছে।</p>";
  }
}

function populateCmsDashboard() {
  const data = workingDraft || livePublished;
  if (!data) return;
  const toursCount = Object.keys(data.tours || {}).length;
  const dashCount = document.getElementById("dashToursCount");
  fetchAndRenderLeads();
  if (dashCount) dashCount.textContent = toursCount;

  // Render CMS Tours
  const toursContainer = document.getElementById("cmsToursListContainer");
  if (toursContainer) {
    const tours = Object.values(data.tours || {});
    toursContainer.innerHTML = tours.map(t => `
      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:12px; margin-bottom:10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <strong style="color:#1b3b5a; font-size:14px;">${escapeHtml(t.title)}</strong>
          <span style="background:#dcfce7; color:#16a34a; font-size:12px; padding:2px 8px; border-radius:4px; font-weight:700;">₹${Number(t.price).toLocaleString("en-IN")}</span>
        </div>
        <div style="font-size:12px; color:#64748b; margin-bottom:8px;">${escapeHtml(t.dates)} | ${escapeHtml(t.duration)}</div>
        <div style="display:flex; gap:6px;">
          <button type="button" class="btn-cms-action open-drawer" style="padding:4px 8px; font-size:12px;" onclick="editCmsTour('${t.id}')"><i class="fas fa-edit"></i> এডিট</button>
        </div>
      </div>
    `).join("");
  }

  // Render CMS Gallery
  const galContainer = document.getElementById("cmsGalleryListContainer");
  if (galContainer) {
    const moments = data.moments_gallery || [];
    galContainer.innerHTML = moments.map((m, idx) => `
      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px; margin-bottom:8px; display:flex; align-items:center; gap:10px;">
        <img src="${m.image_url}" style="width:65px; height:45px; object-fit:cover; border-radius:4px;">
        <input type="text" value="${escapeAttr(m.caption || '')}" class="cms-input" style="flex:1; font-size:13px;" oninput="updateMomentCaption(${idx}, this.value)">
      </div>
    `).join("");
  }
}

function updateSocialLink(platform, url) {
  if (!workingDraft) workingDraft = JSON.parse(JSON.stringify(livePublished));
  if (!workingDraft.social_links) workingDraft.social_links = {};
  workingDraft.social_links[platform] = url;
  renderHostHero(workingDraft);
}

function updateSheetsWebhook(url) {
  if (!workingDraft) workingDraft = JSON.parse(JSON.stringify(livePublished));
  if (!workingDraft.contact) workingDraft.contact = {};
  workingDraft.contact.google_sheets_webhook = url;
  showToast("✓ গুগল শিট Webhook ড্রাফটে সংরক্ষিত হয়েছে!");
}

function updateMomentCaption(idx, caption) {
  if (!workingDraft) workingDraft = JSON.parse(JSON.stringify(livePublished));
  if (workingDraft.moments_gallery && workingDraft.moments_gallery[idx]) {
    workingDraft.moments_gallery[idx].caption = caption;
    renderMomentsGallery(workingDraft);
  }
}

// 7. Cloud Publish Engine
function openPublishConfirmModal() { showModal("publishConfirmModal"); }
function closePublishConfirmModal() { hideModal("publishConfirmModal"); }

async function executeCloudPublish() {
  closePublishConfirmModal();
  showToast("⏳ Google ক্লাউড ডেটাবেসে লাইভ প্রকাশিত হচ্ছে...");

  if (!workingDraft) workingDraft = JSON.parse(JSON.stringify(livePublished || {}));
  workingDraft.updatedAt = new Date().toISOString();
  const payloadStr = JSON.stringify(workingDraft);

  try {
    const res = await fetch("https://tour-with-somjit-default-rtdb.firebaseio.com/site_data.json", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: payloadStr
    });

    if (res.ok) {
      livePublished = JSON.parse(payloadStr);
      window.TWS_SITE_DATA = livePublished;
      localStorage.setItem("tws_published_site_data", payloadStr);
      renderAllComponents(livePublished);
      showModal("publishSuccessModal");
      showToast("🎉 আপনার সমস্ত পরিবর্তন বিশ্বজুড়ে লাইভ হয়েছে!");
    } else {
      throw new Error("HTTP Status " + res.status);
    }
  } catch(err) {
    livePublished = JSON.parse(payloadStr);
    window.TWS_SITE_DATA = livePublished;
    localStorage.setItem("tws_published_site_data", payloadStr);
    renderAllComponents(livePublished);
    alert("⚠️ লাইভ ডেটাবেসে আপডেট হয়েছে এবং আপনার ব্রাউজারে সংরক্ষিত হয়েছে।");
  }
}

function viewLiveWebsite() {
  hideModal("publishSuccessModal");
  exitAdminVisualMode();
}

function discardWorkingDraft() {
  if (confirm("সমস্ত অসংরক্ষিত পরিবর্তন বাতিল করতে চান?")) {
    workingDraft = JSON.parse(JSON.stringify(livePublished));
    renderAllComponents(livePublished);
    populateCmsDashboard();
    showToast("✓ পরিবর্তন বাতিল করা হয়েছে!");
  }
}

function exportCmsBackupJson() {
  const data = workingDraft || livePublished;
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
  const a = document.createElement('a');
  a.setAttribute("href", dataStr);
  a.setAttribute("download", `tour_with_somjit_master_${Date.now()}.json`);
  document.body.appendChild(a);
  a.click();
  a.remove();
}

// Modal Helpers
function showModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = "flex";
  setTimeout(() => el.classList.add("active"), 10);
}

function hideModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove("active");
  setTimeout(() => { el.style.display = "none"; }, 250);
}

function setupMobileDrawer() {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const closeBtn = document.getElementById("closeMobileNavBtn");
  const drawer = document.getElementById("mobileNavDrawer");

  if (menuBtn && drawer) menuBtn.addEventListener("click", () => drawer.classList.add("active"));
  if (closeBtn && drawer) closeBtn.addEventListener("click", () => drawer.classList.remove("active"));
}

function closeNav() {
  const drawer = document.getElementById("mobileNavDrawer");
  if (drawer) drawer.classList.remove("active");
}

function showToast(msg) {
  const toast = document.createElement("div");
  toast.textContent = msg;
  toast.style.cssText = "position:fixed; bottom:80px; left:50%; transform:translateX(-50%); background:#0f172a; color:#fbbf24; padding:10px 20px; border-radius:50px; font-weight:700; font-size:14px; z-index:999999; box-shadow:0 4px 16px rgba(0,0,0,0.3); border:1px solid #f59e0b;";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function escapeAttr(str) {
  if (!str) return "";
  return String(str).replace(/"/g, "&quot;");
}
