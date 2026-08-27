// =========================================================================
// Tour with Somjit - Master Application Engine (v6.0.0)
// Complete Universal CMS, Tour Editor, Clean Banners, Public Reviews
// =========================================================================

let livePublished = null;
let workingDraft = null;
let isAdminAuthenticated = false;

document.addEventListener("DOMContentLoaded", () => {
  initCloudPublishedData();
  setupMobileDrawer();
  setupKeyboardAdminShortcut();
});

// 1. Single Source of Truth Cloud Loader
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
  renderHeaderAndBranding(data);
  renderHostHero(data);
  renderAnnualToursGrid(data);
  renderWhyUsGrid(data);
  renderMomentsGallery(data);
  renderCustomerReviews(data);
  renderHomeFaqs(data);
  renderAboutAndPolicies(data);
  renderFooterAndContact(data);
  populateTourDropdown(data);
}

// Header & Branding
function renderHeaderAndBranding(data) {
  const brand = data.branding || {};
  const contact = data.contact || {};

  const titleElem = document.getElementById("dynSiteTitle");
  const subElem = document.getElementById("dynSiteSubtitle");
  const phoneLink = document.getElementById("dynHeaderPhoneLink");

  if (titleElem) titleElem.textContent = brand.site_title || "Tour with Somjit";
  if (subElem) subElem.textContent = brand.tagline || "সোমজিৎ ভট্টাচার্য";
  if (phoneLink && contact.primary_phone) phoneLink.href = `tel:${contact.primary_phone.replace(/\D/g, '')}`;
}

// Host Hero
function renderHostHero(data) {
  const host = data.host_profile || {};
  const social = data.social_links || {};

  const nameElem = document.getElementById("dynHostName");
  const taglineElem = document.getElementById("dynHostTagline");
  const bioElem = document.getElementById("dynHostBio");
  const avatarElem = document.getElementById("dynHostAvatar");
  const ytLink = document.getElementById("dynYtLink");
  const fbLink = document.getElementById("dynFbLink");
  const drawerYt = document.getElementById("dynDrawerYt");
  const drawerFb = document.getElementById("dynDrawerFb");

  if (nameElem) nameElem.textContent = host.name || "Somjit Bhattacharyya";
  if (taglineElem) taglineElem.textContent = host.title || "বাংলা ট্রাভেল ভ্লগার ও ট্যুর হোস্ট";
  if (bioElem) bioElem.textContent = host.bio || "";
  if (avatarElem && host.avatar) avatarElem.src = host.avatar;
  
  if (ytLink && social.youtube) ytLink.href = social.youtube;
  if (fbLink && social.facebook) fbLink.href = social.facebook;
  if (drawerYt && social.youtube) drawerYt.href = social.youtube;
  if (drawerFb && social.facebook) drawerFb.href = social.facebook;
}

// 6 Annual Tours Grid — 100% CLEAN 1:1 BANNERS (ZERO TEXT / BADGES OVERLAY)
function renderAnnualToursGrid(data) {
  const container = document.getElementById("annualToursGrid");
  if (!container) return;

  const tours = Object.values(data.tours || {});
  let html = "";

  tours.forEach(tour => {
    const imgUrl = tour.banner_image || "assets/images/tour_purulia_square.jpg";
    const waText = encodeURIComponent(`নমস্কার সোমজিৎ ভট্টাচার্য, আমি আপনার '${tour.title}' সম্পর্কে বিস্তারিত জানতে ও সিট বুকিং করতে চাই।`);

    html += `
      <div class="tour-card-sq">
        <div class="tour-banner-sq-wrap" onclick="openTourDetailsModal('${tour.id}')" title="সম্পূর্ণ ট্যুর প্ল্যান দেখুন">
          <img class="tour-banner-sq-img" src="${imgUrl}" alt="${escapeAttr(tour.title)}" loading="lazy">
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
        <i class="${f.icon || 'fa-solid fa-check'}"></i>
      </div>
      <div>
        <h4 class="speciality-title">${escapeHtml(f.title)}</h4>
        <p class="speciality-desc">${escapeHtml(f.desc)}</p>
      </div>
    </div>
  `).join("");
}

// Moments Gallery
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
        <div class="review-author-loc">${escapeHtml(r.location || '')} ${r.tour ? `• <span style="color:#d97706;">${escapeHtml(r.tour)}</span>` : ''}</div>
      </div>
    </div>
  `).join("");
}

// FAQs
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

// About & Policies
function renderAboutAndPolicies(data) {
  const policies = data.policies || {};
  const childList = document.getElementById("dynChildPolicyList");
  const cancelList = document.getElementById("dynCancelPolicyList");
  const aboutText = document.getElementById("dynAboutText");

  if (aboutText && data.about_company) aboutText.textContent = data.about_company;

  if (childList && policies.child_policy) {
    childList.innerHTML = policies.child_policy.map(item => `<li>${escapeHtml(item)}</li>`).join("");
  }
  if (cancelList && policies.cancellation_policy) {
    cancelList.innerHTML = policies.cancellation_policy.map(item => `<li>${escapeHtml(item)}</li>`).join("");
  }
}

// Footer & Contact
function renderFooterAndContact(data) {
  const contact = data.contact || {};
  const p1 = document.getElementById("dynFooterPhone1");
  const p2 = document.getElementById("dynFooterPhone2");
  const wa = document.getElementById("dynFooterWa");
  const addr = document.getElementById("dynFooterAddress");

  if (p1 && contact.primary_phone) {
    p1.textContent = contact.primary_phone;
    p1.href = `tel:${contact.primary_phone.replace(/\D/g, '')}`;
  }
  if (p2 && contact.secondary_phone) {
    p2.textContent = contact.secondary_phone;
    p2.href = `tel:${contact.secondary_phone.replace(/\D/g, '')}`;
  }
  if (wa && contact.whatsapp_numbers) wa.textContent = contact.whatsapp_numbers;
  if (addr && contact.address) addr.textContent = contact.address;
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

// 5. Public Customer Review Submission Modal
function openAddReviewModal() {
  showModal("addReviewModal");
}

function closeAddReviewModal() {
  hideModal("addReviewModal");
}

async function handlePublicReviewSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("revGuestName").value.trim();
  const phone = document.getElementById("revGuestPhone").value.trim();
  const city = document.getElementById("revGuestCity").value.trim();
  const tour = document.getElementById("revTourName").value.trim();
  const rating = parseInt(document.querySelector('input[name="revStar"]:checked')?.value || "5", 10);
  const comment = document.getElementById("revComment").value.trim();

  const newReview = {
    id: "rev-" + Date.now(),
    name: name,
    phone: phone,
    location: city,
    tour: tour,
    rating: rating,
    comment: comment,
    createdAt: new Date().toISOString()
  };

  // Push to local datasets
  if (!livePublished.customer_reviews) livePublished.customer_reviews = [];
  livePublished.customer_reviews.unshift(newReview);

  if (!workingDraft) workingDraft = JSON.parse(JSON.stringify(livePublished));
  if (!workingDraft.customer_reviews) workingDraft.customer_reviews = [];
  workingDraft.customer_reviews.unshift(newReview);

  renderCustomerReviews(livePublished);
  closeAddReviewModal();
  showToast("🎉 আপনার রিভিউ সফলভাবে জমা হয়েছে!");

  // Save to Firebase Cloud
  try {
    fetch(`https://tour-with-somjit-default-rtdb.firebaseio.com/customer_reviews.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(livePublished.customer_reviews)
    });
  } catch(err) {}
}

// 6. Lightbox Modal
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

// 7. Admin Authentication & Visual CMS
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
    showToast("✓ অ্যাডমিন CMS মোড সক্রিয় হয়েছে!");
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

// 8. Universal CMS Dashboard Population
function populateCmsDashboard() {
  const data = workingDraft || livePublished;
  if (!data) return;

  const toursCount = Object.keys(data.tours || {}).length;
  const dashCount = document.getElementById("dashToursCount");
  if (dashCount) dashCount.textContent = toursCount;

  // Render Tours List in CMS
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
          <button type="button" class="btn-cms-action open-drawer" style="padding:4px 10px; font-size:12px;" onclick="openEditTourModal('${t.id}')"><i class="fas fa-edit"></i> সম্পূর্ণ এডিট</button>
        </div>
      </div>
    `).join("");
  }

  // Profile Fields
  const host = data.host_profile || {};
  const social = data.social_links || {};
  if (document.getElementById("cmsHostName")) document.getElementById("cmsHostName").value = host.name || "";
  if (document.getElementById("cmsHostTitle")) document.getElementById("cmsHostTitle").value = host.title || "";
  if (document.getElementById("cmsHostBio")) document.getElementById("cmsHostBio").value = host.bio || "";
  if (document.getElementById("cmsYtUrl")) document.getElementById("cmsYtUrl").value = social.youtube || "";
  if (document.getElementById("cmsFbUrl")) document.getElementById("cmsFbUrl").value = social.facebook || "";

  // Contact Fields
  const contact = data.contact || {};
  if (document.getElementById("cmsPhone1")) document.getElementById("cmsPhone1").value = contact.primary_phone || "";
  if (document.getElementById("cmsPhone2")) document.getElementById("cmsPhone2").value = contact.secondary_phone || "";
  if (document.getElementById("cmsWaNums")) document.getElementById("cmsWaNums").value = contact.whatsapp_numbers || "";
  if (document.getElementById("cmsAddress")) document.getElementById("cmsAddress").value = contact.address || "";
  if (document.getElementById("cmsSheetsWebhook")) document.getElementById("cmsSheetsWebhook").value = contact.google_sheets_webhook || "";

  // Policies & About
  if (document.getElementById("cmsAboutText")) document.getElementById("cmsAboutText").value = data.about_company || "";
  const pol = data.policies || {};
  if (document.getElementById("cmsChildPolicy")) document.getElementById("cmsChildPolicy").value = (pol.child_policy || []).join("\n");
  if (document.getElementById("cmsCancelPolicy")) document.getElementById("cmsCancelPolicy").value = (pol.cancellation_policy || []).join("\n");

  // Why Us
  const whyUsContainer = document.getElementById("cmsWhyUsContainer");
  if (whyUsContainer) {
    const features = data.why_us_features || [];
    whyUsContainer.innerHTML = features.map((f, idx) => `
      <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px; margin-bottom:10px;">
        <label class="cms-label">ফিচার ${idx + 1} শিরোনাম</label>
        <input type="text" value="${escapeAttr(f.title)}" class="cms-input" style="margin-bottom:6px;" oninput="updateWhyUsItem(${idx}, 'title', this.value)">
        <label class="cms-label">বিবরণ</label>
        <textarea class="cms-input" style="height:55px; resize:none;" oninput="updateWhyUsItem(${idx}, 'desc', this.value)">${escapeHtml(f.desc)}</textarea>
      </div>
    `).join("");
  }

  // FAQ Editor
  const faqContainer = document.getElementById("cmsFaqContainer");
  if (faqContainer) {
    const faqs = data.faqs || [];
    faqContainer.innerHTML = faqs.map((faq, idx) => `
      <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px; margin-bottom:10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
          <label class="cms-label">প্রশ্ন ${idx + 1}</label>
          <button type="button" style="color:#ef4444; font-size:12px;" onclick="deleteFaqItem(${idx})"><i class="fas fa-trash"></i> ডিলিট</button>
        </div>
        <input type="text" value="${escapeAttr(faq.q)}" class="cms-input" style="margin-bottom:6px;" oninput="updateFaqItem(${idx}, 'q', this.value)">
        <label class="cms-label">উত্তর</label>
        <textarea class="cms-input" style="height:55px; resize:none;" oninput="updateFaqItem(${idx}, 'a', this.value)">${escapeHtml(faq.a)}</textarea>
      </div>
    `).join("");
  }

  // Reviews Manager
  const revContainer = document.getElementById("cmsReviewsListContainer");
  if (revContainer) {
    const reviews = data.customer_reviews || [];
    revContainer.innerHTML = reviews.map((r, idx) => `
      <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px; margin-bottom:8px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <strong>${escapeHtml(r.name)}</strong> (${r.rating || 5} ⭐)
          <button type="button" style="color:#ef4444; font-size:12px;" onclick="deleteCmsReview(${idx})"><i class="fas fa-trash"></i> ডিলিট</button>
        </div>
        <p style="font-size:12px; color:#475569; margin:4px 0;">"${escapeHtml(r.comment)}"</p>
        <div style="font-size:11px; color:#94a3b8;">${escapeHtml(r.location || '')} | ${escapeHtml(r.tour || '')}</div>
      </div>
    `).join("");
  }

  fetchAndRenderLeads();
}

// 9. Rich Tour Editor & Creator Modals
function openEditTourModal(tourId) {
  if (!workingDraft) workingDraft = JSON.parse(JSON.stringify(livePublished));
  const tour = workingDraft.tours[tourId];
  if (!tour) return;

  document.getElementById("cmsTourModalHeading").textContent = `ট্যুর এডিটর — ${tour.title}`;
  document.getElementById("editTourId").value = tour.id;
  document.getElementById("edTourTitle").value = tour.title || "";
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
    prev.innerHTML = `<img src="${tour.banner_image}" style="width:80px; height:80px; object-fit:cover; border-radius:6px;">`;
  } else if (prev) {
    prev.innerHTML = "";
  }

  showModal("cmsTourEditModal");
}

function openCreateTourModal() {
  if (!workingDraft) workingDraft = JSON.parse(JSON.stringify(livePublished));
  const newId = "tour-" + Date.now();

  document.getElementById("cmsTourModalHeading").textContent = "নতুন গ্রুপ ট্যুর যোগ করুন";
  document.getElementById("editTourId").value = newId;
  document.getElementById("edTourTitle").value = "";
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

  showModal("cmsTourEditModal");
}

function closeCmsTourModal() { hideModal("cmsTourEditModal"); }

function handleTourBannerFileSelect(e) {
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
      
      // Crop square
      const minDim = Math.min(img.width, img.height);
      const sx = (img.width - minDim) / 2;
      const sy = (img.height - minDim) / 2;
      ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);
      
      const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.82);
      document.getElementById("edTourBannerUrl").value = compressedDataUrl;
      document.getElementById("edTourBannerPreview").innerHTML = `<img src="${compressedDataUrl}" style="width:80px; height:80px; object-fit:cover; border-radius:6px;">`;
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

function handleSaveCmsTour(e) {
  e.preventDefault();
  const id = document.getElementById("editTourId").value;
  if (!workingDraft) workingDraft = JSON.parse(JSON.stringify(livePublished));
  if (!workingDraft.tours) workingDraft.tours = {};

  const existing = workingDraft.tours[id] || { id: id, itinerary: [] };

  existing.id = id;
  existing.title = document.getElementById("edTourTitle").value.trim();
  existing.dates = document.getElementById("edTourDates").value.trim();
  existing.duration = document.getElementById("edTourDuration").value.trim();
  existing.price = parseFloat(document.getElementById("edTourPrice").value) || 0;
  existing.starting_point = document.getElementById("edTourStarting").value.trim();
  existing.short_highlight = document.getElementById("edTourHighlight").value.trim();
  existing.hotel_info = document.getElementById("edTourHotel").value.trim();
  existing.transport_info = document.getElementById("edTourTransport").value.trim();
  existing.food_info = document.getElementById("edTourFood").value.trim();
  existing.banner_image = document.getElementById("edTourBannerUrl").value.trim() || existing.banner_image;

  workingDraft.tours[id] = existing;

  renderAnnualToursGrid(workingDraft);
  populateTourDropdown(workingDraft);
  populateCmsDashboard();
  closeCmsTourModal();
  showToast("✓ ট্যুর সংরক্ষিত হয়েছে! মূল সাইটে লাইভ করতে Publish চাপুন।");
}

function deleteCurrentCmsTour() {
  const id = document.getElementById("editTourId").value;
  if (confirm("আপনি কি নিশ্চিত এই ট্যুরটি মুছে ফেলতে চান?")) {
    if (workingDraft && workingDraft.tours && workingDraft.tours[id]) {
      delete workingDraft.tours[id];
      renderAnnualToursGrid(workingDraft);
      populateTourDropdown(workingDraft);
      populateCmsDashboard();
      closeCmsTourModal();
      showToast("✓ ট্যুর মুছে ফেলা হয়েছে!");
    }
  }
}

// 10. Universal In-Line CMS Updaters
function updateProfileField(key, val) {
  if (!workingDraft) workingDraft = JSON.parse(JSON.stringify(livePublished));
  if (!workingDraft.host_profile) workingDraft.host_profile = {};
  workingDraft.host_profile[key] = val;
  renderHostHero(workingDraft);
}

function updateSocialLink(key, val) {
  if (!workingDraft) workingDraft = JSON.parse(JSON.stringify(livePublished));
  if (!workingDraft.social_links) workingDraft.social_links = {};
  workingDraft.social_links[key] = val;
  renderHostHero(workingDraft);
}

function updateContactField(key, val) {
  if (!workingDraft) workingDraft = JSON.parse(JSON.stringify(livePublished));
  if (!workingDraft.contact) workingDraft.contact = {};
  workingDraft.contact[key] = val;
  renderFooterAndContact(workingDraft);
}

function updateAboutText(val) {
  if (!workingDraft) workingDraft = JSON.parse(JSON.stringify(livePublished));
  workingDraft.about_company = val;
  renderAboutAndPolicies(workingDraft);
}

function updatePolicyList(key, text) {
  if (!workingDraft) workingDraft = JSON.parse(JSON.stringify(livePublished));
  if (!workingDraft.policies) workingDraft.policies = {};
  workingDraft.policies[key] = text.split("\n").map(s => s.trim()).filter(s => s.length > 0);
  renderAboutAndPolicies(workingDraft);
}

function updateWhyUsItem(idx, field, val) {
  if (!workingDraft) workingDraft = JSON.parse(JSON.stringify(livePublished));
  if (workingDraft.why_us_features && workingDraft.why_us_features[idx]) {
    workingDraft.why_us_features[idx][field] = val;
    renderWhyUsGrid(workingDraft);
  }
}

function updateFaqItem(idx, field, val) {
  if (!workingDraft) workingDraft = JSON.parse(JSON.stringify(livePublished));
  if (workingDraft.faqs && workingDraft.faqs[idx]) {
    workingDraft.faqs[idx][field] = val;
    renderHomeFaqs(workingDraft);
  }
}

function addNewFaqItem() {
  if (!workingDraft) workingDraft = JSON.parse(JSON.stringify(livePublished));
  if (!workingDraft.faqs) workingDraft.faqs = [];
  workingDraft.faqs.push({ q: "নতুন প্রশ্ন লিখুন", a: "এখানে উত্তর লিখুন" });
  renderHomeFaqs(workingDraft);
  populateCmsDashboard();
}

function deleteFaqItem(idx) {
  if (!workingDraft) workingDraft = JSON.parse(JSON.stringify(livePublished));
  if (workingDraft.faqs) {
    workingDraft.faqs.splice(idx, 1);
    renderHomeFaqs(workingDraft);
    populateCmsDashboard();
  }
}

function deleteCmsReview(idx) {
  if (!workingDraft) workingDraft = JSON.parse(JSON.stringify(livePublished));
  if (workingDraft.customer_reviews) {
    workingDraft.customer_reviews.splice(idx, 1);
    renderCustomerReviews(workingDraft);
    populateCmsDashboard();
  }
}

function updateSheetsWebhook(url) {
  if (!workingDraft) workingDraft = JSON.parse(JSON.stringify(livePublished));
  if (!workingDraft.contact) workingDraft.contact = {};
  workingDraft.contact.google_sheets_webhook = url;
  showToast("✓ গুগল শিট Webhook ড্রাফটে সংরক্ষিত হয়েছে!");
}

// 11. Leads Manager
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

// 12. Cloud Publish Engine
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
