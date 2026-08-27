
// Fast Client-Side Image Compressor to keep Firebase payloads ultralight (<100KB)
function compressImageFile(file, maxWidth, maxHeight, quality, callback) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      // Determine output format
      const mimeType = file.type === "image/png" ? "image/png" : "image/jpeg";
      const compressedDataUrl = canvas.toDataURL(mimeType, quality);
      callback(compressedDataUrl);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}


function showModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.style.display = "flex";
    setTimeout(() => el.classList.add("active"), 10);
  }
}
function hideModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove("active");
    setTimeout(() => { if (!el.classList.contains("active")) el.style.display = "none"; }, 250);
  }
}
/**
 * Tour with Somjit - Unified Visual CMS & Application Controller
 * Single Source of Truth Cloud Database Integration,
 * Draft & Publish Workflow, Senior Citizen Friendly UI,
 * and Formatted WhatsApp Booking Integration.
 */

let currentTourDetailsId = "ladakh-2026";
let workingDraft = null;
let livePublished = null;
let isAdminAuthenticated = false;

document.addEventListener("DOMContentLoaded", () => {
  initCloudPublishedData();
  initMobileDrawer();
  initBookingModal();
  setupKeyboardAdminShortcut();
});

// 1. Single Source of Truth Cloud Data Loader
async function initCloudPublishedData() {
  // Use cache-busting timestamp to guarantee 100% fresh published data
  const cacheBuster = "?t=" + Date.now();
  const cloudUrl = "https://tour-with-somjit-default-rtdb.firebaseio.com/site_data.json" + cacheBuster;

  try {
    const res = await fetch(cloudUrl, { cache: "no-store" });
    const cloudData = await res.json();
    if (cloudData && typeof cloudData === "object") {
      livePublished = cloudData;
      workingDraft = JSON.parse(JSON.stringify(cloudData));
      window.TWS_SITE_DATA = cloudData;
      localStorage.setItem("tws_published_site_data", JSON.stringify(cloudData));
      renderAllComponents(livePublished);
    } else {
      throw new Error("No data returned");
    }
  } catch(err) {
    const localCached = localStorage.getItem("tws_published_site_data");
    if (localCached) {
      livePublished = JSON.parse(localCached);
      workingDraft = JSON.parse(JSON.stringify(livePublished));
      window.TWS_SITE_DATA = livePublished;
    } else {
      livePublished = window.TWS_SITE_DATA || {};
      workingDraft = JSON.parse(JSON.stringify(livePublished));
    }
    renderAllComponents(livePublished);
  }
}

function renderAllComponents(data) {
  if (!data) return;
  applyDynamicBrandingAndText(data);
  renderHomeTours(data);
  renderWhyUsFeatures(data);
  renderMomentsGallery(data);
  renderHomeFaqs(data);
  populateTourDropdown(data);
}

// 2. Apply Dynamic Branding, Images & Text to DOM
function applyDynamicBrandingAndText(data) {
  const branding = data.branding || {};
  const general = data.general || {};
  const host = data.company_about || {};
  const contact = data.contact || {};

  // Logos
  let logoUrl = branding.logo_url || "assets/images/somjit_profile_avatar.png";
  if (logoUrl.includes("brand_logo_redesign") || logoUrl.includes("official_brand_logo")) {
    logoUrl = "assets/images/somjit_profile_avatar.png";
  }
  const headerLogo = document.getElementById("dynHeaderLogo");
  const drawerLogo = document.getElementById("dynDrawerLogo");
  const footerLogo = document.getElementById("dynFooterLogo");
  if (headerLogo) headerLogo.src = logoUrl;
  if (drawerLogo) drawerLogo.src = logoUrl;
  if (footerLogo) footerLogo.src = logoUrl;

  // Hero Background
  const heroBgContainer = document.getElementById("dynHeroBgContainer");
  if (heroBgContainer) {
    const bgUrl = branding.hero_bg || "assets/images/hero_scenic_bg.jpg";
    heroBgContainer.style.backgroundImage = `linear-gradient(180deg, rgba(10,25,47,0.45) 0%, rgba(10,25,47,0.7) 100%), url('${bgUrl}')`;
  }

  // Hero Somjit Cutout
  const heroHostCutout = document.getElementById("dynHeroHostCutout");
  if (heroHostCutout) {
    heroHostCutout.src = branding.hero_host_cutout || "assets/images/somjit_hero_cutout.png";
  }

  // Tagline, Subtitle & Heading
  const heroTagline = document.getElementById("dynHeroTagline");
  if (heroTagline) heroTagline.textContent = branding.tagline || "Explore More. Experience More.";

  const heroSubtitle = document.getElementById("dynHeroSubtitle");
  if (heroSubtitle) heroSubtitle.textContent = general.hero_subtitle || "Somjit Bhattacharyya-র সঙ্গে";

  const heroHeading = document.getElementById("dynHeroHeading");
  if (heroHeading) {
    heroHeading.innerHTML = general.hero_heading ? general.hero_heading.replace(/\n/g, "<br>") : "আপনার পরবর্তী<br>ভ্রমণ";
  }

  // Hero CTA Buttons
  const btnTours = document.getElementById("dynHeroBtnTours");
  if (btnTours) btnTours.textContent = general.hero_btn_tours || "আসন্ন ট্যুর দেখুন";
  const btnCall = document.getElementById("dynHeroBtnCall");
  if (btnCall) btnCall.textContent = general.hero_btn_call || "ফোন করে জানুন";

  // Section Titles
  const toursTitle = document.getElementById("dynToursSectionTitle");
  if (toursTitle) toursTitle.textContent = general.tours_section_title || "এই মাসের আসন্ন ট্যুর";

  const whyUsTitle = document.getElementById("dynWhyUsTitle");
  if (whyUsTitle) whyUsTitle.textContent = general.why_us_title || "কেন আমাদের সাথে যাবেন?";

  const momentsTitle = document.getElementById("dynMomentsTitle");
  if (momentsTitle) momentsTitle.textContent = general.moments_section_title || "আমাদের সাথে কিছু মুহূর্ত";

  // Host Profile Section
  const hostAvatar = document.getElementById("dynHostAvatar");
  if (hostAvatar) {
    hostAvatar.src = branding.host_circle_avatar || "assets/images/host_circle_avatar.png";
  }
  const hostTitle = document.getElementById("dynHostSectionTitle");
  if (hostTitle) hostTitle.textContent = host.host_section_title || "আপনার পরিচিত মুখ, আপনার ভ্রমণের সঙ্গী";
  const hostName = document.getElementById("dynHostName");
  if (hostName) hostName.textContent = host.host_name || "Somjit Bhattacharyya";
  const hostRole = document.getElementById("dynHostRole");
  if (hostRole) hostRole.textContent = host.host_role || "Founder & Host";
  const hostBio = document.getElementById("dynHostBio");
  if (hostBio) hostBio.textContent = host.host_bio || "আমি Somjit Bhattacharyya, একজন ভ্রমণপ্রেমী...";

  // Contact Helplines
  const hostPhone = document.getElementById("dynHostPhone");
  if (hostPhone && contact.host_phone) {
    hostPhone.textContent = contact.host_phone;
    hostPhone.href = `tel:${contact.host_phone.replace(/\s+/g, '')}`;
  }
  const adminPhone = document.getElementById("dynAdminPhone");
  if (adminPhone && contact.admin_phone) {
    adminPhone.textContent = contact.admin_phone;
    adminPhone.href = `tel:${contact.admin_phone.replace(/\s+/g, '')}`;
  }
  const addressElem = document.getElementById("dynAddress");
  if (addressElem && contact.address) addressElem.textContent = contact.address;
}

// 3. Render Upcoming Tours on Homepage (3–4 Highlights)
function renderHomeTours(data) {
  const container = document.getElementById("homeToursList");
  if (!container) return;

  const tours = Object.values(data.tours || {});
  const publishedTours = tours.filter(t => t.status !== "DRAFT");
  const highlightTours = publishedTours.slice(0, 4);

  let html = "";
  highlightTours.forEach(tour => {
    const imgUrl = tour.banner_image || "assets/images/card_ladakh.jpg";
    const category = tour.category || "গ্রুপ ট্যুর";
    const status = tour.status || "BOOKING OPEN";
    const isFew = status.includes("FEW") || status.includes("সীমিত");

    html += `
      <div class="tour-card-item">
        <div class="tour-card-cover-wrap" onclick="openTourDetailsModal('${tour.id}')" style="cursor:pointer;">
          <img src="${imgUrl}" alt="${escapeAttr(tour.title)}" loading="lazy">
          <div class="tour-card-category-badge">${escapeHtml(category)}</div>
          <div class="tour-card-status-badge ${isFew ? 'few' : ''}">${escapeHtml(status)}</div>
          <div class="tour-card-price-badge">₹${Number(tour.price || 0).toLocaleString("en-IN")}</div>
        </div>
        <div class="tour-card-body">
          <h3 class="tour-card-title">${escapeHtml(tour.title)}</h3>
          <div class="tour-card-meta-row">
            <span><i class="fas fa-calendar-alt" style="color:#d97706;"></i> ${escapeHtml(tour.dates || '২০২৬')}</span>
            <span><i class="fas fa-clock" style="color:#d97706;"></i> ${escapeHtml(tour.duration || 'গ্রুপ ট্যুর')}</span>
          </div>
          <p class="tour-card-highlight">${escapeHtml(tour.short_highlight || 'সোমজিৎ ভট্টাচার্য-এর সাথে নিশ্চিত গ্রুপ ট্যুর।')}</p>
          <div class="tour-card-action-row">
            <button type="button" class="btn-card-details" onclick="openTourDetailsModal('${tour.id}')">
              <i class="fas fa-info-circle"></i> ট্যুর বিবরণী
            </button>
            <button type="button" class="btn-card-book" onclick="openBookingModal('${escapeAttr(tour.title)}')">
              <i class="fab fa-whatsapp"></i> বুকিং করুন
            </button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// 4. Tour Details Modal with Full Day-wise Itinerary
function openTourDetailsModal(tourId) {
  const currentData = isAdminAuthenticated && workingDraft ? workingDraft : livePublished;
  const tour = (currentData && currentData.tours && currentData.tours[tourId]) ? currentData.tours[tourId] : null;
  if (!tour) return;

  currentTourDetailsId = tourId;
  document.getElementById("dtCoverImg").src = tour.banner_image || "assets/images/card_ladakh.jpg";
  document.getElementById("dtCategoryBadge").textContent = tour.category || "গ্রুপ ট্যুর";
  document.getElementById("dtStatusBadge").textContent = tour.status || "BOOKING OPEN";
  document.getElementById("dtTourTitle").textContent = tour.title;
  document.getElementById("dtDates").textContent = tour.dates || "২০২৬";
  document.getElementById("dtDuration").textContent = tour.duration || "গ্রুপ ট্যুর";
  document.getElementById("dtStarting").textContent = tour.starting_point || "কলকাতা / নির্ধারিত স্থান";
  document.getElementById("dtPrice").textContent = `₹${Number(tour.price || 0).toLocaleString("en-IN")} / জন`;
  document.getElementById("dtShortHighlight").textContent = tour.short_highlight || "";

  document.getElementById("dtHotelInfo").textContent = tour.hotel_info || "বাছাই করা পরিচ্ছন্ন ও আরামদায়ক হোটেল/রিসোর্ট।";
  document.getElementById("dtTransportInfo").textContent = tour.transport_info || "সম্পূর্ণ সফরের জন্য এক্সক্লুসিভ আরামদায়ক গাড়ি।";
  document.getElementById("dtFoodInfo").textContent = tour.food_info || "সকালের নাস্তা, দুপুরের খাবার ও রাতের পুষ্টিকর আহার।";
  document.getElementById("dtActivities").textContent = tour.activities || "পরিকল্পিত দর্শনীয় স্থান ভ্রমণ ও মনোরম অভিজ্ঞতা।";

  // Render Day-wise Timeline
  const timeline = document.getElementById("dtItineraryTimeline");
  if (tour.itinerary && tour.itinerary.length > 0) {
    timeline.innerHTML = tour.itinerary.map(item => `
      <div class="itin-day-card">
        <div class="itin-day-header"><i class="fas fa-map-pin" style="color:#d97706;"></i> ${escapeHtml(item.day)}: ${escapeHtml(item.title)}</div>
        <div class="itin-day-desc">${escapeHtml(item.desc)}</div>
      </div>
    `).join("");
  } else {
    timeline.innerHTML = `<p style="color:#64748b;">এই ট্যুরের সম্পূর্ণ দিনভিত্তিক শিডিউল শীঘ্রই আপডেট করা হবে।</p>`;
  }

  // Render Plans
  const plansBox = document.getElementById("dtPlansBox");
  if (tour.plans && tour.plans.length > 0) {
    plansBox.innerHTML = `
      <strong style="display:block; color:#92400e; margin-bottom:6px;"><i class="fas fa-tags"></i> প্যাকেজ ও শেয়ারিং অপশন:</strong>
      <ul style="list-style:none; padding:0;">
        ${tour.plans.map(p => `<li style="padding:2px 0;"><i class="fas fa-check-circle" style="color:#16a34a;"></i> ${escapeHtml(p.name)}: <strong>₹${Number(p.price).toLocaleString("en-IN")}</strong></li>`).join("")}
      </ul>
    `;
    plansBox.style.display = "block";
  } else {
    plansBox.style.display = "none";
  }

  showModal("tourDetailsModal");
}

function closeTourDetailsModal() {
  hideModal("tourDetailsModal");
}

function bookFromDetailsModal() {
  closeTourDetailsModal();
  const currentData = isAdminAuthenticated && workingDraft ? workingDraft : livePublished;
  const tour = (currentData && currentData.tours) ? currentData.tours[currentTourDetailsId] : null;
  openBookingModal(tour ? tour.title : "");
}

// 5. All Tours Catalog Modal
function openAllToursModal() {
  const currentData = isAdminAuthenticated && workingDraft ? workingDraft : livePublished;
  const tours = Object.values(currentData.tours || {});
  const container = document.getElementById("allToursCatalogList");

  container.innerHTML = tours.map(tour => `
    <div class="tour-card-item" style="margin-bottom:16px;">
      <div class="tour-card-cover-wrap" onclick="closeAllToursModal(); openTourDetailsModal('${tour.id}');" style="cursor:pointer;">
        <img src="${tour.banner_image || 'assets/images/card_ladakh.jpg'}" alt="${escapeAttr(tour.title)}">
        <div class="tour-card-category-badge">${escapeHtml(tour.category || 'ট্যুর')}</div>
        <div class="tour-card-status-badge">${escapeHtml(tour.status || 'BOOKING OPEN')}</div>
        <div class="tour-card-price-badge">₹${Number(tour.price || 0).toLocaleString("en-IN")}</div>
      </div>
      <div class="tour-card-body">
        <h3 class="tour-card-title">${escapeHtml(tour.title)}</h3>
        <div class="tour-card-meta-row">
          <span><i class="fas fa-calendar-alt"></i> ${escapeHtml(tour.dates || '২০২৬')}</span>
          <span><i class="fas fa-clock"></i> ${escapeHtml(tour.duration || 'গ্রুপ ট্যুর')}</span>
        </div>
        <div class="tour-card-action-row">
          <button type="button" class="btn-card-details" onclick="closeAllToursModal(); openTourDetailsModal('${tour.id}');">
            ট্যুর বিবরণী
          </button>
          <button type="button" class="btn-card-book" onclick="closeAllToursModal(); openBookingModal('${escapeAttr(tour.title)}');">
            বুকিং করুন
          </button>
        </div>
      </div>
    </div>
  `).join("");

  showModal("allToursModal");
}

function closeAllToursModal() {
  hideModal("allToursModal");
}

// 6. Senior-Friendly Group Booking Form & WhatsApp Formatter
function initBookingModal() {
  populateTourDropdown(livePublished || window.TWS_SITE_DATA);
}

function populateTourDropdown(data) {
  const select = document.getElementById("bkTourSelect");
  if (!select || !data) return;

  const tours = Object.values(data.tours || {});
  select.innerHTML = `<option value="" disabled selected>ট্যুর নির্বাচন করুন</option>`;
  tours.forEach(t => {
    const opt = document.createElement("option");
    opt.value = t.title;
    opt.textContent = `${t.title} (${t.dates || '২০২৬'})`;
    select.appendChild(opt);
  });
}

function openBookingModal(preselectedTourTitle) {
  populateTourDropdown(isAdminAuthenticated && workingDraft ? workingDraft : livePublished);
  const select = document.getElementById("bkTourSelect");
  if (select && preselectedTourTitle) {
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].value === preselectedTourTitle || select.options[i].text.includes(preselectedTourTitle)) {
        select.selectedIndex = i;
        break;
      }
    }
  }
  showModal("bookingModal");
}

function closeBookingModal() {
  hideModal("bookingModal");
}

async function handleGroupBookingSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("bkGuestName").value.trim();
  const age = document.getElementById("bkGuestAge").value.trim();
  const gender = document.querySelector('input[name="bkGender"]:checked') ? document.querySelector('input[name="bkGender"]:checked').value : "পুরুষ";
  const phone = document.getElementById("bkGuestPhone").value.trim();
  const groupSize = document.getElementById("bkPersons").value.trim();
  const tourSelect = document.getElementById("bkTourSelect");
  const tour = tourSelect && tourSelect.selectedIndex > 0 ? tourSelect.options[tourSelect.selectedIndex].text : "আসন্ন গ্রুপ ট্যুর";
  const bedType = document.querySelector('input[name="bkBedType"]:checked') ? document.querySelector('input[name="bkBedType"]:checked').value : "Double Bed";
  const foodPref = document.querySelector('input[name="bkFoodChoice"]:checked') ? document.querySelector('input[name="bkFoodChoice"]:checked').value : "আমিষ";
  const specialReq = document.getElementById("bkSpecialReq") ? document.getElementById("bkSpecialReq").value.trim() : "";

  // Cloud logging to Firebase
  const bookingPayload = {
    name, age, gender, phone, group_size: groupSize, tour, bed_type: bedType, food_preference: foodPref, special_requirement: specialReq,
    created_at: new Date().toISOString(), status: "NEW"
  };

  try {
    fetch("https://tour-with-somjit-default-rtdb.firebaseio.com/bookings.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingPayload)
    });
    fetch("https://tour-with-somjit-default-rtdb.firebaseio.com/leads.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone, name,
        query: `বুকিং আবেদন: ${tour} (${groupSize}) - ${bedType}, ${foodPref}`,
        created_at: new Date().toISOString(), status: "NEW"
      })
    });
  } catch(e) {}

  // Auto-formatted WhatsApp Message (Matching User Spec)
  const waText = 
`TOUR WITH SOMJIT
GROUP TOUR BOOKING ENQUIRY

Name: ${name}
Age: ${age}
Gender: ${gender}
Phone: ${phone}
Group Size: ${groupSize}
Tour: ${tour}
Bed Type: ${bedType}
Food Preference: ${foodPref}
${specialReq ? `Additional Requirement: ${specialReq}` : ''}`;

  const waNumber = (livePublished && livePublished.contact && livePublished.contact.whatsapp) ? livePublished.contact.whatsapp : "919433074880";
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;

  window.open(waUrl, "_blank");
  closeBookingModal();
  alert("✓ আপনার বুকিং আবেদন তৈরি হয়েছে! সোমজিৎ ভট্টাচার্য ও অ্যাডমিন টিম দ্রুত WhatsApp-এ যোগাযোগ করবেন।");
}

// 7. Render Why Us Features (4 Senior-Friendly Pillars)
function renderWhyUsFeatures(data) {
  const container = document.getElementById("dynWhyUsGrid");
  if (!container) return;

  const features = data.why_us_features || [];
  container.innerHTML = features.map(f => `
    <div class="why-us-item">
      <div class="why-icon-circle"><i class="${f.icon || 'fas fa-star'}"></i></div>
      <h4 class="why-item-title">${escapeHtml(f.title)}</h4>
      <p class="why-item-desc">${escapeHtml(f.desc)}</p>
    </div>
  `).join("");
}

// 8. Render Moments Gallery
function renderMomentsGallery(data) {
  const track = document.getElementById("momentsTrack");
  if (!track) return;

  const moments = data.moments_gallery || [];
  track.innerHTML = moments.map((m, idx) => `
    <div class="moment-card" onclick="openLightboxModal(${idx})" title="ক্লিক করে বড় ছবি দেখুন">
      <img src="${m.image_url}" alt="${escapeAttr(m.caption || 'Tour Moment')}" loading="lazy">
    </div>
  `).join("");
}

function scrollMoments(direction) {
  const track = document.getElementById("momentsTrack");
  if (track) track.scrollBy({ left: direction * 260, behavior: "smooth" });
}

// 9. Render FAQ Accordion
function renderHomeFaqs(data) {
  const container = document.getElementById("homeFaqContainer");
  if (!container) return;

  const faqs = data.faqs || [];
  container.innerHTML = faqs.map((faq, idx) => `
    <div class="accordion-item" id="faqAcc_${idx}">
      <button class="accordion-header-btn" onclick="toggleAccordion('faqAcc_${idx}')">
        <span class="acc-title"><i class="fas fa-question-circle" style="color:#d97706; margin-right:8px;"></i> ${escapeHtml(faq.q)}</span>
        <i class="fas fa-chevron-down acc-arrow"></i>
      </button>
      <div class="accordion-content-drawer">
        <div class="accordion-body-text">${escapeHtml(faq.a)}</div>
      </div>
    </div>
  `).join("");
}

function toggleAccordion(itemId) {
  const item = document.getElementById(itemId);
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

// =========================================================================
// 10. UNIFIED IN-PAGE VISUAL CMS DRAWER & DRAFT/PUBLISH CONTROLLER
// =========================================================================
function setupKeyboardAdminShortcut() {
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === "A" || e.key === "a")) {
      e.preventDefault();
      promptAdminLoginModal();
    }
  });
}

function promptAdminLoginModal() {
  if (isAdminAuthenticated) {
    openAdminDrawer("dashboard");
    return;
  }
  showModal("adminLoginModal");
  setTimeout(() => { document.getElementById("admPinInput").focus(); }, 150);
}

function closeAdminLoginModal() {
  hideModal("adminLoginModal");
  document.getElementById("admPinInput").value = "";
}

function handleAdminLoginSubmit() {
  const pin = document.getElementById("admPinInput").value.trim();
  // Secure internal authentication check
  if (pin === "somjit2026" || pin === "admin2026") {
    isAdminAuthenticated = true;
    sessionStorage.setItem("tws_admin_session", "active");
    closeAdminLoginModal();
    enterAdminVisualMode();
  } else {
    alert("❌ সঠিক অ্যাডমিন পাসওয়ার্ড প্রদান করুন।");
  }
}

function enterAdminVisualMode() {
  document.body.classList.remove("public-mode");
  document.body.classList.add("admin-mode");
  document.getElementById("adminLiveTopBar").style.display = "block";
  
  // Initialize working draft from published
  if (!workingDraft && livePublished) {
    workingDraft = JSON.parse(JSON.stringify(livePublished));
  }
  
  populateCmsFields();
  openAdminDrawer("dashboard");
  showToast("🛠️ ভিজ্যুয়াল CMS ড্রয়ার চালু হয়েছে! যেকোনো পরিবর্তন করে 'Publish Changes' চাপুন।");
}

function exitAdminVisualMode() {
  document.body.classList.remove("admin-mode");
  document.body.classList.add("public-mode");
  document.getElementById("adminLiveTopBar").style.display = "none";
  closeAdminDrawer();
  renderAllComponents(livePublished);
}

function openAdminDrawer(tabName = "dashboard") {
  populateCmsFields();
  if (tabName) switchCmsTab(`tab${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`);
  const drawer = document.getElementById("adminCmsDrawer");
  drawer.style.display = "flex";
  setTimeout(() => drawer.classList.add("active"), 10);
}

function closeAdminDrawer() {
  const drawer = document.getElementById("adminCmsDrawer");
  drawer.classList.remove("active");
  setTimeout(() => { if (!drawer.classList.contains("active")) drawer.style.display = "none"; }, 300);
}

function switchCmsTab(tabId) {
  document.querySelectorAll(".cms-tab-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".cms-tab-pane").forEach(p => p.classList.remove("active"));

  const btn = document.querySelector(`.cms-tab-btn[data-tab="${tabId}"]`);
  const pane = document.getElementById(tabId);
  if (btn) btn.classList.add("active");
  if (pane) pane.classList.add("active");

  if (tabId === "tabTours") renderCmsToursList();
  if (tabId === "tabLeads") renderCmsLeadsList();
  if (tabId === "tabGallery") renderCmsGalleryList();
  if (tabId === "tabFaqPolicies") renderCmsFaqList();
}

// Populate CMS form fields
function populateCmsFields() {
  const data = workingDraft || livePublished || {};
  const branding = data.branding || {};
  const general = data.general || {};
  const host = data.company_about || {};
  const contact = data.contact || {};

  if (document.getElementById("cmsLogoUrl")) document.getElementById("cmsLogoUrl").value = branding.logo_url || "";
  if (document.getElementById("cmsHeroBgUrl")) document.getElementById("cmsHeroBgUrl").value = branding.hero_bg || "";
  if (document.getElementById("cmsHeroCutoutUrl")) document.getElementById("cmsHeroCutoutUrl").value = branding.hero_host_cutout || "";
  if (document.getElementById("cmsTagline")) document.getElementById("cmsTagline").value = branding.tagline || "";
  if (document.getElementById("cmsHeroSubtitle")) document.getElementById("cmsHeroSubtitle").value = general.hero_subtitle || "";
  if (document.getElementById("cmsHeroHeading")) document.getElementById("cmsHeroHeading").value = general.hero_heading || "";

  if (document.getElementById("cmsHostAvatarUrl")) document.getElementById("cmsHostAvatarUrl").value = branding.host_circle_avatar || "";
  if (document.getElementById("cmsHostName")) document.getElementById("cmsHostName").value = host.host_name || "";
  if (document.getElementById("cmsHostRole")) document.getElementById("cmsHostRole").value = host.host_role || "";
  if (document.getElementById("cmsHostBio")) document.getElementById("cmsHostBio").value = host.host_bio || "";

  if (document.getElementById("cmsHostPhone")) document.getElementById("cmsHostPhone").value = contact.host_phone || "";
  if (document.getElementById("cmsAdminPhone")) document.getElementById("cmsAdminPhone").value = contact.admin_phone || "";
  if (document.getElementById("cmsAddress")) document.getElementById("cmsAddress").value = contact.address || "";

  const toursCount = Object.keys(data.tours || {}).length;
  if (document.getElementById("dashToursCount")) document.getElementById("dashToursCount").textContent = toursCount;
}

// Real-time In-Place DOM Update for Text Fields
function updateDraftField(section, key, value, domId, isHtml = false) {
  if (!workingDraft) workingDraft = JSON.parse(JSON.stringify(livePublished));
  if (!workingDraft[section]) workingDraft[section] = {};
  workingDraft[section][key] = value;

  const elem = document.getElementById(domId);
  if (elem) {
    if (isHtml) elem.innerHTML = value.replace(/\n/g, "<br>");
    else elem.textContent = value;
  }
}

// Direct CMS Image Upload with live DOM reflection
function handleCmsImageUpload(section, key, input, domId, isBg = false) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];
  showToast("⏳ ছবি অপ্টিমাইজ হচ্ছে...");

  const maxDim = isBg ? 1200 : 600;
  compressImageFile(file, maxDim, maxDim, 0.82, function(compressedUrl) {
    if (!workingDraft) workingDraft = JSON.parse(JSON.stringify(livePublished));
    if (!workingDraft[section]) workingDraft[section] = {};
    workingDraft[section][key] = compressedUrl;

    const elem = document.getElementById(domId);
    if (elem) {
      if (isBg) {
        elem.style.backgroundImage = `linear-gradient(180deg, rgba(10,25,47,0.45) 0%, rgba(10,25,47,0.7) 100%), url('${compressedUrl}')`;
      } else {
        elem.src = compressedUrl;
      }
    }
    populateCmsFields();
    showToast("✓ ছবি সফলভাবে যুক্ত হয়েছে! লাইভ করতে 'Publish Changes' চাপুন।");
  });
}

// Render CMS Tours List
function renderCmsToursList() {
  const container = document.getElementById("cmsToursListContainer");
  if (!container) return;

  const tours = Object.values((workingDraft && workingDraft.tours) ? workingDraft.tours : (livePublished.tours || {}));
  container.innerHTML = tours.map(t => `
    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:12px; margin-bottom:10px; display:flex; align-items:center; gap:12px;">
      <img src="${t.banner_image || 'assets/images/card_ladakh.jpg'}" style="width:60px; height:45px; object-fit:cover; border-radius:4px;">
      <div style="flex:1;">
        <strong style="color:#0f172a; display:block; font-size:0.95rem;">${escapeHtml(t.title)}</strong>
        <span style="font-size:0.82rem; color:#64748b;">${escapeHtml(t.dates || '')} • <strong>₹${Number(t.price || 0).toLocaleString("en-IN")}</strong></span>
        <span style="display:inline-block; font-size:0.75rem; background:#e0f2fe; color:#0369a1; padding:2px 6px; border-radius:4px; font-weight:700; margin-left:6px;">${escapeHtml(t.status || 'OPEN')}</span>
      </div>
      <button type="button" class="btn-cms-action open-drawer" style="padding:4px 8px; font-size:0.8rem;" onclick="openEditTourModal('${t.id}')">
        <i class="fas fa-pencil-alt"></i>
      </button>
      <button type="button" class="btn-cms-action discard-btn" style="padding:4px 8px; font-size:0.8rem;" onclick="deleteCmsTour('${t.id}')">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `).join("");
}

function openAddTourModal() {
  const newId = "tour-" + Date.now();
  document.getElementById("edTourId").value = newId;
  document.getElementById("edTourTitle").value = "নতুন আকর্ষণীয় সিগনেচার গ্রুপ ট্যুর";
  document.getElementById("edTourCategory").value = "পাহাড় / জঙ্গল";
  document.getElementById("edTourStatus").value = "BOOKING OPEN";
  document.getElementById("edTourDates").value = "২০২৬";
  document.getElementById("edTourDuration").value = "5 Nights / 6 Days";
  document.getElementById("edTourStarting").value = "কলকাতা / নির্ধারিত স্টেশন";
  document.getElementById("edTourPrice").value = "18500";
  document.getElementById("edTourBanner").value = "assets/images/card_ladakh.jpg";
  document.getElementById("edTourShortHighlight").value = "সোমজিৎ ভট্টাচার্য-এর সাথে আনন্দঘন ভ্রমণ অভিজ্ঞতা।";
  document.getElementById("edTourHotel").value = "বাছাই করা পরিচ্ছন্ন ও আরামদায়ক হোটেল";
  document.getElementById("edTourTransport").value = "আরামদায়ক এক্সক্লুসিভ রিজার্ভ গাড়ি";
  document.getElementById("edTourFood").value = "টাটকা পুষ্টিকর বাঙালি ও ভারতীয় খাবার";

  document.getElementById("editTourModalHeading").textContent = "নতুন ট্যুর যোগ করুন";
  showModal("editTourModal");
}

function openEditTourModal(tourId) {
  const data = workingDraft || livePublished;
  const tour = data.tours ? data.tours[tourId] : null;
  if (!tour) return;

  document.getElementById("edTourId").value = tourId;
  document.getElementById("edTourTitle").value = tour.title || "";
  document.getElementById("edTourCategory").value = tour.category || "";
  document.getElementById("edTourStatus").value = tour.status || "BOOKING OPEN";
  document.getElementById("edTourDates").value = tour.dates || "";
  document.getElementById("edTourDuration").value = tour.duration || "";
  document.getElementById("edTourStarting").value = tour.starting_point || "";
  document.getElementById("edTourPrice").value = tour.price || "15000";
  document.getElementById("edTourBanner").value = tour.banner_image || "";
  document.getElementById("edTourShortHighlight").value = tour.short_highlight || "";
  document.getElementById("edTourHotel").value = tour.hotel_info || "";
  document.getElementById("edTourTransport").value = tour.transport_info || "";
  document.getElementById("edTourFood").value = tour.food_info || "";

  document.getElementById("editTourModalHeading").textContent = `এডিট: ${tour.title}`;
  showModal("editTourModal");
}

function closeEditTourModal() {
  hideModal("editTourModal");
}

function handleTourImageFile(input) {
  if (input.files && input.files[0]) {
    showToast("⏳ ছবি অপ্টিমাইজ হচ্ছে...");
    compressImageFile(input.files[0], 800, 600, 0.8, function(compressedUrl) {
      document.getElementById("edTourBanner").value = compressedUrl;
      showToast("✓ ছবি লোড হয়েছে!");
    });
  }
}

function saveTourModalData() {
  const tourId = document.getElementById("edTourId").value;
  const title = document.getElementById("edTourTitle").value.trim();
  const category = document.getElementById("edTourCategory").value.trim();
  const status = document.getElementById("edTourStatus").value;
  const dates = document.getElementById("edTourDates").value.trim();
  const duration = document.getElementById("edTourDuration").value.trim();
  const starting = document.getElementById("edTourStarting").value.trim();
  const price = Number(document.getElementById("edTourPrice").value) || 0;
  const banner = document.getElementById("edTourBanner").value.trim();
  const highlight = document.getElementById("edTourShortHighlight").value.trim();
  const hotel = document.getElementById("edTourHotel").value.trim();
  const transport = document.getElementById("edTourTransport").value.trim();
  const food = document.getElementById("edTourFood").value.trim();

  if (!title) { alert("ট্যুরের নাম আবশ্যক।"); return; }

  if (!workingDraft) workingDraft = JSON.parse(JSON.stringify(livePublished));
  if (!workingDraft.tours) workingDraft.tours = {};

  if (!workingDraft.tours[tourId]) {
    workingDraft.tours[tourId] = { id: tourId, title, category, status, dates, duration, starting_point: starting, price, banner_image: banner, short_highlight: highlight, hotel_info: hotel, transport_info: transport, food_info: food };
  } else {
    Object.assign(workingDraft.tours[tourId], { title, category, status, dates, duration, starting_point: starting, price, banner_image: banner, short_highlight: highlight, hotel_info: hotel, transport_info: transport, food_info: food });
  }

  closeEditTourModal();
  renderCmsToursList();
  renderHomeTours(workingDraft);
  populateTourDropdown(workingDraft);
  showToast("✓ ট্যুর ড্রাফটে সংরক্ষিত হয়েছে!");
}

function deleteCmsTour(tourId) {
  if (confirm("আপনি কি নিশ্চিত এই ট্যুরটি ডিলিট করতে চান?")) {
    if (!workingDraft) workingDraft = JSON.parse(JSON.stringify(livePublished));
    delete workingDraft.tours[tourId];
    renderCmsToursList();
    renderHomeTours(workingDraft);
    populateTourDropdown(workingDraft);
    showToast("✓ ট্যুর ড্রাফট থেকে ডিলিট হয়েছে!");
  }
}

// Render CMS Gallery List
function renderCmsGalleryList() {
  const container = document.getElementById("cmsGalleryListContainer");
  if (!container) return;

  const moments = (workingDraft && workingDraft.moments_gallery) ? workingDraft.moments_gallery : (livePublished.moments_gallery || []);
  container.innerHTML = moments.map((m, idx) => `
    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:12px; margin-bottom:12px;">
      <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
        <img src="${m.image_url}" style="width:80px; height:55px; object-fit:cover; border-radius:6px; cursor:pointer;" onclick="openLightboxModal(${idx})" title="ক্লিক করে বড় দেখুন">
        <div style="flex:1;">
          <input type="text" value="${escapeAttr(m.caption || '')}" placeholder="ছবির ক্যাপশন" class="cms-input" style="font-size:0.88rem; margin-bottom:4px;" oninput="updateCmsMomentCaption(${idx}, this.value)">
        </div>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center; gap:6px;">
        <label class="btn-cms-action open-drawer" style="padding:5px 10px; font-size:0.8rem; cursor:pointer;">
          <i class="fas fa-sync-alt"></i> ছবি পরিবর্তন
          <input type="file" accept="image/*" style="display:none;" onchange="handleReplaceCmsMoment(${idx}, this)">
        </label>
        <div style="display:flex; gap:4px;">
          ${idx > 0 ? `<button type="button" class="btn-cms-action" style="background:#f1f5f9; color:#0f172a; padding:4px 8px;" onclick="moveCmsMoment(${idx}, -1)" title="উপরে নিন"><i class="fas fa-arrow-up"></i></button>` : ''}
          ${idx < moments.length - 1 ? `<button type="button" class="btn-cms-action" style="background:#f1f5f9; color:#0f172a; padding:4px 8px;" onclick="moveCmsMoment(${idx}, 1)" title="নিচে নিন"><i class="fas fa-arrow-down"></i></button>` : ''}
          <button type="button" class="btn-cms-action discard-btn" style="padding:5px 10px; font-size:0.8rem;" onclick="deleteCmsMoment(${idx})">
            <i class="fas fa-trash"></i> ডিলিট
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

function handleReplaceCmsMoment(idx, input) {
  if (input.files && input.files[0]) {
    showToast("⏳ নতুন ছবি অপ্টিমাইজ হচ্ছে...");
    compressImageFile(input.files[0], 800, 550, 0.82, function(compressedUrl) {
      if (!workingDraft) workingDraft = JSON.parse(JSON.stringify(livePublished));
      workingDraft.moments_gallery[idx].image_url = compressedUrl;
      renderCmsGalleryList();
      renderMomentsGallery(workingDraft);
      showToast("✓ ছবি সফলভাবে পরিবর্তন হয়েছে! লাইভ করতে 'Publish Changes' চাপুন।");
    });
  }
}

function moveCmsMoment(idx, direction) {
  if (!workingDraft) workingDraft = JSON.parse(JSON.stringify(livePublished));
  const newIdx = idx + direction;
  if (newIdx >= 0 && newIdx < workingDraft.moments_gallery.length) {
    const temp = workingDraft.moments_gallery[idx];
    workingDraft.moments_gallery[idx] = workingDraft.moments_gallery[newIdx];
    workingDraft.moments_gallery[newIdx] = temp;
    renderCmsGalleryList();
    renderMomentsGallery(workingDraft);
    showToast("✓ ছবির ক্রম পরিবর্তন হয়েছে!");
  }
}

function updateCmsMomentCaption(idx, val) {
  if (!workingDraft) workingDraft = JSON.parse(JSON.stringify(livePublished));
  workingDraft.moments_gallery[idx].caption = val;
  renderMomentsGallery(workingDraft);
}

function openAddMomentModal() {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.onchange = function() {
    if (this.files && this.files[0]) {
      showToast("⏳ ছবি অপ্টিমাইজ হচ্ছে...");
      compressImageFile(this.files[0], 700, 500, 0.8, function(compressedUrl) {
        if (!workingDraft) workingDraft = JSON.parse(JSON.stringify(livePublished));
        if (!workingDraft.moments_gallery) workingDraft.moments_gallery = [];
        workingDraft.moments_gallery.push({ id: "m-" + Date.now(), image_url: compressedUrl, caption: "নতুন ভ্রমণ মুহূর্ত" });
        renderCmsGalleryList();
        renderMomentsGallery(workingDraft);
        showToast("✓ নতুন মুহূর্ত গ্যালারিতে যোগ হয়েছে!");
      });
    }
  };
  fileInput.click();
}

function deleteCmsMoment(idx) {
  if (confirm("এই ছবিটি ডিলিট করতে চান?")) {
    if (!workingDraft) workingDraft = JSON.parse(JSON.stringify(livePublished));
    workingDraft.moments_gallery.splice(idx, 1);
    renderCmsGalleryList();
    renderMomentsGallery(workingDraft);
    showToast("✓ ছবি ডিলিট হয়েছে!");
  }
}

// Render CMS FAQ List
function renderCmsFaqList() {
  const container = document.getElementById("cmsFaqListContainer");
  if (!container) return;

  const faqs = (workingDraft && workingDraft.faqs) ? workingDraft.faqs : (livePublished.faqs || []);
  container.innerHTML = faqs.map((f, idx) => `
    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px; margin-bottom:10px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
        <strong style="color:#0f172a; font-size:0.92rem;">প্রশ্ন ${idx + 1}</strong>
        <button type="button" class="btn-cms-action discard-btn" style="padding:2px 6px; font-size:0.75rem;" onclick="deleteCmsFaq(${idx})"><i class="fas fa-trash"></i></button>
      </div>
      <input type="text" value="${escapeAttr(f.q)}" placeholder="প্রশ্ন" class="cms-input" style="font-size:0.9rem; margin-bottom:6px;" onchange="updateCmsFaq(${idx}, 'q', this.value)">
      <textarea class="cms-textarea" style="font-size:0.88rem; min-height:60px;" placeholder="উত্তর" onchange="updateCmsFaq(${idx}, 'a', this.value)">${escapeHtml(f.a)}</textarea>
    </div>
  `).join("");
}

function updateCmsFaq(idx, field, val) {
  if (!workingDraft) workingDraft = JSON.parse(JSON.stringify(livePublished));
  workingDraft.faqs[idx][field] = val.trim();
  renderHomeFaqs(workingDraft);
}

function cmsAddFaqPrompt() {
  const q = prompt("নতুন প্রশ্নটি লিখুন:");
  if (!q) return;
  const a = prompt("উত্তরটি লিখুন:");
  if (!a) return;

  if (!workingDraft) workingDraft = JSON.parse(JSON.stringify(livePublished));
  if (!workingDraft.faqs) workingDraft.faqs = [];
  workingDraft.faqs.push({ q: q.trim(), a: a.trim() });
  renderCmsFaqList();
  renderHomeFaqs(workingDraft);
  showToast("✓ নতুন FAQ যোগ হয়েছে!");
}

function deleteCmsFaq(idx) {
  if (confirm("এই প্রশ্নটি ডিলিট করতে চান?")) {
    if (!workingDraft) workingDraft = JSON.parse(JSON.stringify(livePublished));
    workingDraft.faqs.splice(idx, 1);
    renderCmsFaqList();
    renderHomeFaqs(workingDraft);
    showToast("✓ FAQ ডিলিট হয়েছে!");
  }
}

// Render CMS Leads
async function renderCmsLeadsList() {
  const container = document.getElementById("cmsLeadsListContainer");
  if (!container) return;

  container.innerHTML = `<p style="color:#64748b; font-size:0.9rem;">লোডিং লিডস...</p>`;
  try {
    const res = await fetch("https://tour-with-somjit-default-rtdb.firebaseio.com/bookings.json");
    const data = await res.json();
    if (data && typeof data === "object") {
      const list = Object.entries(data).reverse();
      if (document.getElementById("dashLeadsCount")) document.getElementById("dashLeadsCount").textContent = list.length;
      container.innerHTML = list.map(([key, item]) => `
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:12px; margin-bottom:10px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <strong style="color:#0f172a; font-size:0.95rem;">${escapeHtml(item.name || 'গ্রাহক')} (${escapeHtml(item.group_size || '১')})</strong>
            <span style="font-size:0.75rem; background:#dcfce7; color:#166534; padding:2px 6px; border-radius:4px; font-weight:700;">${escapeHtml(item.status || 'NEW')}</span>
          </div>
          <p style="font-size:0.85rem; color:#475569; margin-bottom:4px;">
            📞 <a href="tel:${item.phone}" style="font-weight:700; color:#d97706;">${escapeHtml(item.phone || '')}</a> • ট্যুর: <strong>${escapeHtml(item.tour || '')}</strong>
          </p>
          <p style="font-size:0.82rem; color:#64748b;">
            বেড: ${escapeHtml(item.bed_type || '')} | খাবার: ${escapeHtml(item.food_preference || '')}
          </p>
        </div>
      `).join("");
    } else {
      container.innerHTML = `<p style="color:#64748b; font-size:0.9rem;">কোনো নতুন বুকিং আবেদন নেই।</p>`;
    }
  } catch(e) {
    container.innerHTML = `<p style="color:#64748b; font-size:0.9rem;">লিডস লোড করা সম্ভব হয়নি।</p>`;
  }
}

// Discard Working Draft
function discardWorkingDraft() {
  if (confirm("আপনি কি সমস্ত অসংরক্ষিত ড্রাফট পরিবর্তন বাতিল করতে চান?")) {
    workingDraft = JSON.parse(JSON.stringify(livePublished));
    renderAllComponents(livePublished);
    populateCmsFields();
    showToast("✓ ড্রাফট পরিবর্তন বাতিল করা হয়েছে!");
  }
}

// Cloud Publish Engine
function openPublishConfirmModal() {
  showModal("publishConfirmModal");
}

function closePublishConfirmModal() {
  hideModal("publishConfirmModal");
}

async function executeCloudPublish() {
  closePublishConfirmModal();
  showToast("⏳ Google ক্লাউডে লাইভ প্রকাশ হচ্ছে...");

  if (!workingDraft) workingDraft = JSON.parse(JSON.stringify(livePublished || window.TWS_SITE_DATA || {}));
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
      showToast("🎉 আপনার পরিবর্তন সফলভাবে বিশ্বজুড়ে লাইভ হয়েছে!");
    } else {
      throw new Error("Firebase HTTP Status: " + res.status);
    }
  } catch(err) {
    console.error("Cloud publish error:", err);
    // Fallback: save to localStorage and notify admin
    livePublished = JSON.parse(payloadStr);
    window.TWS_SITE_DATA = livePublished;
    localStorage.setItem("tws_published_site_data", payloadStr);
    renderAllComponents(livePublished);
    alert("⚠️ লাইভ ডেটাবেস সংযোগে সময় লেগেছে (" + err.message + ")। আপনার ডিভাইসে ড্রাফট সংরক্ষিত হয়েছে এবং পুনরায় চেষ্টা করা হচ্ছে।");
  }
}

function viewLiveWebsite() {
  hideModal("publishSuccessModal");
  exitAdminVisualMode();
}

// Backup & Recovery JSON
function exportCmsBackupJson() {
  const data = workingDraft || livePublished;
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `tour_with_somjit_backup_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast("✓ ডেটা ব্যাকআপ ফাইল ডাউনলোড সম্পন্ন!");
}

function importCmsBackupJson(input) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (imported && imported.branding && imported.tours) {
        workingDraft = imported;
        renderAllComponents(workingDraft);
        populateCmsFields();
        showToast("✓ ব্যাকআপ সফলভাবে ইমপোর্ট হয়েছে! লাইভ করতে 'Publish Changes' চাপুন।");
      } else {
        alert("❌ ভুল ফাইল ফরম্যাট!");
      }
    } catch(err) {
      alert("❌ ব্যাকআপ ফাইল পড়া সম্ভব হয়নি।");
    }
  };
  reader.readAsText(file);
}

// Drawer & Modal helpers
function initMobileDrawer() {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const closeBtn = document.getElementById("closeMobileNavBtn");
  const drawer = document.getElementById("mobileNavDrawer");

  if (menuBtn && drawer) menuBtn.onclick = () => drawer.classList.add("active");
  if (closeBtn && drawer) closeBtn.onclick = () => drawer.classList.remove("active");
}

function closeNav() {
  const drawer = document.getElementById("mobileNavDrawer");
  if (drawer) drawer.classList.remove("active");
}

function openPrivacyModal() { showModal("privacyModal"); }
function closePrivacyModal() { hideModal("privacyModal"); }

function showToast(msg) {
  let toast = document.getElementById("twsUnifiedToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "twsUnifiedToast";
    toast.style.cssText = "position:fixed; bottom:75px; left:50%; transform:translateX(-50%); background:#0f172a; color:#fbbf24; border:1px solid #fbbf24; padding:10px 20px; border-radius:30px; font-size:0.95rem; font-weight:700; z-index:9999999; box-shadow:0 8px 24px rgba(0,0,0,0.4); text-align:center; transition:opacity 0.3s ease; pointer-events:none;";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = "1";
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => { toast.style.opacity = "0"; }, 3200);
}

function escapeHtml(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(str) {
  return String(str || '').replace(/"/g, '&quot;');
}


// =========================================================================
// LIGHTBOX VIEWER CONTROLLER (Touch / Click to Open Image)
// =========================================================================
let currentLightboxIdx = 0;

function openLightboxModal(idx) {
  const data = (isAdminAuthenticated && workingDraft) ? workingDraft : livePublished;
  const moments = (data && data.moments_gallery) ? data.moments_gallery : [];
  if (!moments.length) return;

  currentLightboxIdx = (idx >= 0 && idx < moments.length) ? idx : 0;
  updateLightboxContent();
  showModal("galleryLightboxModal");
}

function closeLightboxModal() {
  hideModal("galleryLightboxModal");
}

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

function handleLightboxBackdropClick(event) {
  if (event.target.id === "galleryLightboxModal") {
    closeLightboxModal();
  }
}

// Keyboard arrow navigation for lightbox
document.addEventListener("keydown", (e) => {
  const modal = document.getElementById("galleryLightboxModal");
  if (modal && modal.classList.contains("active")) {
    if (e.key === "ArrowLeft") changeLightboxImage(-1);
    if (e.key === "ArrowRight") changeLightboxImage(1);
    if (e.key === "Escape") closeLightboxModal();
  }
});
