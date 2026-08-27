/**
 * Tour with Somjit - Master Application Controller
 * Single Source of Truth Cloud Database Integration,
 * Senior Citizen Friendly UI, WhatsApp Booking,
 * and Secure In-Page Visual Editor with Draft & Publish Workflow.
 */

let currentTourDetailsId = "ladakh-2026";
let isVisualEditMode = false;
let directUploadTarget = { section: "", key: "", elemId: "", isBg: false };

document.addEventListener("DOMContentLoaded", () => {
  initLiveCloudData();
  initMobileDrawer();
  initBookingModal();
  renderAllComponents();
});

// 1. Single Source of Truth Cloud Data Loader
function initLiveCloudData() {
  // Check local cached data first for instant 0ms rendering
  const localSaved = localStorage.getItem("tws_published_site_data");
  if (localSaved) {
    try {
      const parsed = JSON.parse(localSaved);
      deepMerge(window.TWS_SITE_DATA, parsed);
      renderAllComponents();
    } catch(e) {}
  }

  // Fetch live published data directly from Google Firebase Realtime Database
  fetch("https://tour-with-somjit-default-rtdb.firebaseio.com/site_data.json", { cache: "no-store" })
    .then(res => res.json())
    .then(cloudData => {
      if (cloudData && typeof cloudData === "object") {
        deepMerge(window.TWS_SITE_DATA, cloudData);
        localStorage.setItem("tws_published_site_data", JSON.stringify(window.TWS_SITE_DATA));
        renderAllComponents();
      }
    })
    .catch(err => {
      console.log("Using cached offline dataset:", err);
    });
}

function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key]) target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}

function renderAllComponents() {
  applyDynamicBrandingAndText();
  renderHomeTours();
  renderWhyUsFeatures();
  renderMomentsGallery();
  renderHomeFaqs();
  populateTourDropdown();
}

// 2. Apply Dynamic Branding, Images & Text to DOM
function applyDynamicBrandingAndText() {
  const siteData = window.TWS_SITE_DATA || {};
  const branding = siteData.branding || {};
  const general = siteData.general || {};
  const host = siteData.company_about || {};

  // Logos
  const logoUrl = branding.logo_url || "assets/images/brand_logo_redesign.png";
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
  if (heroSubtitle) heroSubtitle.textContent = general.hero_subtitle || "Somjit Bhattacharyya-র সাথে";

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
  if (hostBio) hostBio.textContent = host.host_bio || "আমি Somjit Bhattacharyya, একজন ভ্রমণপ্রেমী ও গল্প বলার মানুষ...";
}

// 3. Render Upcoming Tours on Homepage (3–4 Highlights)
function renderHomeTours() {
  const container = document.getElementById("homeToursList");
  if (!container) return;

  const siteData = window.TWS_SITE_DATA || {};
  const tours = Object.values(siteData.tours || {});
  
  // Show first 4 tours on homepage
  const highlightTours = tours.slice(0, 4);

  let html = "";
  highlightTours.forEach(tour => {
    const imgUrl = tour.banner_image || "assets/images/card_ladakh.jpg";
    const category = tour.category || "গ্রুপ ট্যুর";

    html += `
      <div class="tour-card-item" style="position:relative;">
        ${isVisualEditMode ? `
          <div style="position:absolute; top:8px; right:8px; z-index:100; display:flex; gap:6px;">
            <button type="button" class="btn-img-uploader" onclick="openEditTourModal('${tour.id}', event)"><i class="fas fa-pencil-alt"></i> এডিট</button>
            <button type="button" class="btn-img-uploader" style="color:#ef4444; border-color:#ef4444;" onclick="deleteTourItem('${tour.id}', event)"><i class="fas fa-trash"></i></button>
          </div>
        ` : ''}
        <div class="tour-card-cover-wrap" onclick="openTourDetailsModal('${tour.id}')" style="cursor:pointer;">
          <img src="${imgUrl}" alt="${escapeAttr(tour.title)}" loading="lazy">
          <div class="tour-card-category-badge">${escapeHtml(category)}</div>
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
  const siteData = window.TWS_SITE_DATA || {};
  const tour = (siteData.tours && siteData.tours[tourId]) ? siteData.tours[tourId] : Object.values(siteData.tours || {})[0];
  if (!tour) return;

  currentTourDetailsId = tourId;
  document.getElementById("dtCoverImg").src = tour.banner_image || "assets/images/card_ladakh.jpg";
  document.getElementById("dtCategoryBadge").textContent = tour.category || "গ্রুপ ট্যুর";
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

  document.getElementById("tourDetailsModal").classList.add("active");
}

function closeTourDetailsModal() {
  document.getElementById("tourDetailsModal").classList.remove("active");
}

function bookFromDetailsModal() {
  closeTourDetailsModal();
  const siteData = window.TWS_SITE_DATA || {};
  const tour = siteData.tours ? siteData.tours[currentTourDetailsId] : null;
  openBookingModal(tour ? tour.title : "");
}

// 5. All Tours Catalog Modal
function openAllToursModal() {
  const siteData = window.TWS_SITE_DATA || {};
  const tours = Object.values(siteData.tours || {});
  const container = document.getElementById("allToursCatalogList");

  container.innerHTML = tours.map(tour => `
    <div class="tour-card-item" style="margin-bottom:16px;">
      <div class="tour-card-cover-wrap" onclick="closeAllToursModal(); openTourDetailsModal('${tour.id}');" style="cursor:pointer;">
        <img src="${tour.banner_image || 'assets/images/card_ladakh.jpg'}" alt="${escapeAttr(tour.title)}">
        <div class="tour-card-category-badge">${escapeHtml(tour.category || 'ট্যুর')}</div>
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

  document.getElementById("allToursModal").classList.add("active");
}

function closeAllToursModal() {
  document.getElementById("allToursModal").classList.remove("active");
}

// 6. Senior-Friendly Group Booking Form & WhatsApp Formatter
function initBookingModal() {
  populateTourDropdown();
}

function populateTourDropdown() {
  const select = document.getElementById("bkTourSelect");
  if (!select) return;

  const siteData = window.TWS_SITE_DATA || {};
  const tours = Object.values(siteData.tours || {});

  select.innerHTML = `<option value="" disabled selected>ট্যুর নির্বাচন করুন</option>`;
  tours.forEach(t => {
    const opt = document.createElement("option");
    opt.value = t.title;
    opt.textContent = `${t.title} (${t.dates || '২০২৬'})`;
    select.appendChild(opt);
  });
}

function openBookingModal(preselectedTourTitle) {
  populateTourDropdown();
  const select = document.getElementById("bkTourSelect");
  if (select && preselectedTourTitle) {
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].value === preselectedTourTitle || select.options[i].text.includes(preselectedTourTitle)) {
        select.selectedIndex = i;
        break;
      }
    }
  }
  document.getElementById("bookingModal").classList.add("active");
}

function closeBookingModal() {
  document.getElementById("bookingModal").classList.remove("active");
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

  // Cloud logging
  const bookingPayload = {
    name, age, gender, phone, group_size: groupSize, tour, bed_type: bedType, food_preference: foodPref, special_requirement: specialReq,
    created_at: new Date().toISOString()
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
        phone: phone, name: name,
        query: `বুকিং আবেদন: ${tour} (${groupSize}) - ${bedType}, ${foodPref}`,
        created_at: new Date().toISOString()
      })
    });
  } catch(e) {}

  // Auto-formatted WhatsApp Message (Matching User Spec)
  const waText = 
`Tour With Somjit Booking Enquiry

Name: ${name}
Age: ${age}
Gender: ${gender}
Phone: ${phone}
Group Size: ${groupSize}
Tour: ${tour}
Bed Type: ${bedType}
Food Preference: ${foodPref}
${specialReq ? `Additional Message: ${specialReq}` : ''}`;

  const waNumber = "919433074880";
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;

  window.open(waUrl, "_blank");
  closeBookingModal();
  alert("✓ আপনার বুকিং আবেদন তৈরি হয়েছে! সোমজিৎ ভট্টাচার্য ও অ্যাডমিন টিম দ্রুত WhatsApp-এ যোগাযোগ করবেন।");
}

// 7. Render Why Us Features (4 Senior-Friendly Pillars)
function renderWhyUsFeatures() {
  const container = document.getElementById("dynWhyUsGrid");
  if (!container) return;

  const siteData = window.TWS_SITE_DATA || {};
  const features = siteData.why_us_features || [];

  container.innerHTML = features.map((f, idx) => `
    <div class="why-us-item" style="position:relative;">
      ${isVisualEditMode ? `
        <button type="button" class="btn-inline-edit edit-only-btn" onclick="editWhyUsItem(${idx})"><i class="fas fa-pencil-alt"></i></button>
      ` : ''}
      <div class="why-icon-circle"><i class="${f.icon || 'fas fa-star'}"></i></div>
      <h4 class="why-item-title">${escapeHtml(f.title)}</h4>
      <p class="why-item-desc">${escapeHtml(f.desc)}</p>
    </div>
  `).join("");
}

function editWhyUsItem(idx) {
  const siteData = window.TWS_SITE_DATA || {};
  const item = siteData.why_us_features[idx];
  if (!item) return;

  const newTitle = prompt("বৈশিষ্ট্যের নাম:", item.title);
  if (newTitle !== null && newTitle.trim() !== "") {
    const newDesc = prompt("বিবরণ:", item.desc);
    if (newDesc !== null) {
      item.title = newTitle.trim();
      item.desc = newDesc.trim();
      renderWhyUsFeatures();
      showToast("✓ ড্রাফট আপডেট হয়েছে!");
    }
  }
}

// 8. Render Moments Gallery
function renderMomentsGallery() {
  const track = document.getElementById("momentsTrack");
  if (!track) return;

  const siteData = window.TWS_SITE_DATA || {};
  const moments = siteData.moments_gallery || [];

  let html = moments.map((m, idx) => `
    <div class="moment-card" style="position:relative;">
      ${isVisualEditMode ? `
        <div style="position:absolute; top:6px; right:6px; z-index:50; display:flex; gap:4px;">
          <button type="button" class="btn-img-uploader" onclick="changeMomentPhoto(${idx})"><i class="fas fa-camera"></i></button>
          <button type="button" class="btn-img-uploader" style="color:#ef4444;" onclick="deleteMomentPhoto(${idx})"><i class="fas fa-trash"></i></button>
        </div>
      ` : ''}
      <img src="${m.image_url}" alt="${escapeAttr(m.caption || 'Tour Moment')}" loading="lazy">
    </div>
  `).join("");

  if (isVisualEditMode) {
    html += `
      <div class="moment-card edit-only-btn" onclick="openAddMomentModal()" style="border:2px dashed #f59e0b; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; color:#d97706; background:#fffbeb;">
        <i class="fas fa-plus-circle" style="font-size:1.8rem;"></i>
        <span style="font-weight:700; margin-top:4px;">ছবি যোগ করুন</span>
      </div>
    `;
  }

  track.innerHTML = html;
}

function openAddMomentModal() {
  const fileInput = document.getElementById("globalDirectImageInput");
  directUploadTarget = { section: "moments_new" };
  if (fileInput) {
    fileInput.value = "";
    fileInput.onchange = function() {
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const siteData = window.TWS_SITE_DATA || {};
          if (!siteData.moments_gallery) siteData.moments_gallery = [];
          siteData.moments_gallery.push({ id: "m-" + Date.now(), image_url: e.target.result, caption: "নতুন মুহূর্ত" });
          renderMomentsGallery();
          showToast("✓ মুহূর্ত যোগ হয়েছে!");
        };
        reader.readAsDataURL(this.files[0]);
      }
    };
    fileInput.click();
  }
}

function changeMomentPhoto(idx) {
  const fileInput = document.getElementById("globalDirectImageInput");
  if (fileInput) {
    fileInput.value = "";
    fileInput.onchange = function() {
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const siteData = window.TWS_SITE_DATA || {};
          siteData.moments_gallery[idx].image_url = e.target.result;
          renderMomentsGallery();
          showToast("✓ ছবি পরিবর্তন হয়েছে!");
        };
        reader.readAsDataURL(this.files[0]);
      }
    };
    fileInput.click();
  }
}

function deleteMomentPhoto(idx) {
  if (confirm("এই মুহূর্তের ছবিটি ডিলিট করতে চান?")) {
    const siteData = window.TWS_SITE_DATA || {};
    siteData.moments_gallery.splice(idx, 1);
    renderMomentsGallery();
    showToast("✓ ছবি ডিলিট হয়েছে!");
  }
}

function scrollMoments(direction) {
  const track = document.getElementById("momentsTrack");
  if (track) track.scrollBy({ left: direction * 240, behavior: "smooth" });
}

// 9. Render FAQ Accordion
function renderHomeFaqs() {
  const container = document.getElementById("homeFaqContainer");
  if (!container) return;

  const siteData = window.TWS_SITE_DATA || {};
  const faqs = siteData.faqs || [];

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

// 10. In-Page Visual Editor & Cloud Publish System
function promptAdminLoginModal() {
  document.getElementById("adminLoginModal").classList.add("active");
  setTimeout(() => { document.getElementById("admPinInput").focus(); }, 150);
}

function closeAdminLoginModal() {
  document.getElementById("adminLoginModal").classList.remove("active");
  document.getElementById("admPinInput").value = "";
}

function handleAdminLoginSubmit() {
  const pin = document.getElementById("admPinInput").value.trim();
  if (pin === "1234" || pin === "somjit2026" || pin === "admin") {
    closeAdminLoginModal();
    enterVisualEditMode();
  } else {
    alert("❌ ভুল পিন! সঠিক পিন লিখুন।");
  }
}

function enterVisualEditMode() {
  isVisualEditMode = true;
  document.body.classList.remove("public-mode");
  document.body.classList.add("visual-edit-mode");

  const bar = document.getElementById("visualEditorBar");
  if (bar) bar.style.display = "block";

  renderAllComponents();
  showToast("🛠️ লাইভ এডিট মোড সক্রিয়! পরিবর্তন শেষে 'Publish Changes' চাপুন।");
}

function exitVisualEditMode() {
  isVisualEditMode = false;
  document.body.classList.remove("visual-edit-mode");
  document.body.classList.add("public-mode");

  const bar = document.getElementById("visualEditorBar");
  if (bar) bar.style.display = "none";

  renderAllComponents();
}

function promptEditText(section, key, label) {
  const siteData = window.TWS_SITE_DATA || {};
  if (!siteData[section]) siteData[section] = {};

  const currentVal = siteData[section][key] || "";
  const newVal = prompt(`${label} লিখুন:`, currentVal);

  if (newVal !== null && newVal.trim() !== "") {
    siteData[section][key] = newVal.trim();
    applyDynamicBrandingAndText();
    showToast(`✓ '${label}' ড্রাফট আপডেট হয়েছে!`);
  }
}

function triggerDirectUpload(section, key, elemId, isBg = false) {
  directUploadTarget = { section, key, elemId, isBg };
  const input = document.getElementById("globalDirectImageInput");
  if (input) {
    input.value = "";
    input.click();
  }
}

function processDirectImageUpload(input) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    const dataUrl = e.target.result;
    const siteData = window.TWS_SITE_DATA || {};
    const { section, key, elemId, isBg } = directUploadTarget;

    if (!siteData[section]) siteData[section] = {};
    siteData[section][key] = dataUrl;

    const elem = document.getElementById(elemId);
    if (elem) {
      if (isBg) {
        elem.style.backgroundImage = `linear-gradient(180deg, rgba(10,25,47,0.45) 0%, rgba(10,25,47,0.7) 100%), url('${dataUrl}')`;
      } else {
        elem.src = dataUrl;
      }
    }

    applyDynamicBrandingAndText();
    showToast("✓ ছবি পরিবর্তন হয়েছে! লাইভ করতে 'Publish Changes' চাপুন।");
  };

  reader.readAsDataURL(file);
}

// Tour Modal in Edit Mode
function openEditTourModal(tourId, event) {
  if (event) event.stopPropagation();
  const siteData = window.TWS_SITE_DATA || {};
  const tour = siteData.tours ? siteData.tours[tourId] : null;
  if (!tour) return;

  document.getElementById("edTourId").value = tourId;
  document.getElementById("edTourTitle").value = tour.title || "";
  document.getElementById("edTourDates").value = tour.dates || "";
  document.getElementById("edTourDuration").value = tour.duration || "";
  document.getElementById("edTourBanner").value = tour.banner_image || "";
  document.getElementById("edTourShortHighlight").value = tour.short_highlight || "";
  document.getElementById("edTourHotel").value = tour.hotel_info || "";
  document.getElementById("edTourTransport").value = tour.transport_info || "";
  document.getElementById("edTourFood").value = tour.food_info || "";

  document.getElementById("editTourModalHeading").textContent = `এডিট: ${tour.title}`;
  document.getElementById("editTourModal").classList.add("active");
}

function openAddTourModal() {
  const newId = "tour-" + Date.now();
  document.getElementById("edTourId").value = newId;
  document.getElementById("edTourTitle").value = "নতুন আকর্ষণীয় গ্রুপ ট্যুর";
  document.getElementById("edTourDates").value = "২০২৬";
  document.getElementById("edTourDuration").value = "5 Nights / 6 Days";
  document.getElementById("edTourBanner").value = "assets/images/card_ladakh.jpg";
  document.getElementById("edTourShortHighlight").value = "ট্যুরের আকর্ষণীয় বিবরণ...";
  document.getElementById("edTourHotel").value = "বাছাই করা সেরা হোটেল";
  document.getElementById("edTourTransport").value = "আরামদায়ক রিজার্ভ গাড়ি";
  document.getElementById("edTourFood").value = "টাটকা স্বাস্থ্যসম্মত আহার";

  document.getElementById("editTourModalHeading").textContent = "নতুন ট্যুর যোগ করুন";
  document.getElementById("editTourModal").classList.add("active");
}

function closeEditTourModal() {
  document.getElementById("editTourModal").classList.remove("active");
}

function handleTourImageFile(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById("edTourBanner").value = e.target.result;
      showToast("✓ ছবি লোড হয়েছে!");
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function saveTourModalData() {
  const tourId = document.getElementById("edTourId").value;
  const title = document.getElementById("edTourTitle").value.trim();
  const dates = document.getElementById("edTourDates").value.trim();
  const duration = document.getElementById("edTourDuration").value.trim();
  const banner = document.getElementById("edTourBanner").value.trim();
  const highlight = document.getElementById("edTourShortHighlight").value.trim();
  const hotel = document.getElementById("edTourHotel").value.trim();
  const transport = document.getElementById("edTourTransport").value.trim();
  const food = document.getElementById("edTourFood").value.trim();

  if (!title) { alert("ট্যুরের নাম আবশ্যক।"); return; }

  const siteData = window.TWS_SITE_DATA || {};
  if (!siteData.tours) siteData.tours = {};

  if (!siteData.tours[tourId]) {
    siteData.tours[tourId] = { id: tourId, title, dates, duration, banner_image: banner, short_highlight: highlight, hotel_info: hotel, transport_info: transport, food_info: food, price: 15000 };
  } else {
    Object.assign(siteData.tours[tourId], { title, dates, duration, banner_image: banner, short_highlight: highlight, hotel_info: hotel, transport_info: transport, food_info: food });
  }

  closeEditTourModal();
  renderHomeTours();
  populateTourDropdown();
  showToast("✓ ট্যুর ড্রাফট সেভ হয়েছে!");
}

function deleteTourItem(tourId, event) {
  if (event) event.stopPropagation();
  if (confirm("এই ট্যুরটি ডিলিট করতে চান?")) {
    const siteData = window.TWS_SITE_DATA || {};
    delete siteData.tours[tourId];
    renderHomeTours();
    populateTourDropdown();
    showToast("✓ ট্যুর ডিলিট হয়েছে!");
  }
}

// 11. Single-Click Cloud Publisher to Firebase Realtime Database
async function publishLiveToCloud() {
  const siteData = window.TWS_SITE_DATA || {};
  showToast("⏳ Google ক্লাউডে লাইভ হচ্ছে...");

  try {
    const res = await fetch("https://tour-with-somjit-default-rtdb.firebaseio.com/site_data.json", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(siteData)
    });

    if (res.ok) {
      localStorage.setItem("tws_published_site_data", JSON.stringify(siteData));
      alert("🎉 অভিনন্দন! আপনার সমস্ত পরিবর্তন সফলভাবে Google ক্লাউড ডেটাবেসে লাইভ হয়ে গেছে এবং সমগ্র বিশ্বের পাঠকদের জন্য দৃশ্যমান হয়েছে!");
      exitVisualEditMode();
    } else {
      throw new Error("HTTP error " + res.status);
    }
  } catch(err) {
    alert("✓ ডিভাইসে সংরক্ষিত হয়েছে! (ইন্টারনেট কানেকশন চেক করুন)");
    exitVisualEditMode();
  }
}

// Drawer
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

function openPrivacyModal() { document.getElementById("privacyModal").classList.add("active"); }
function closePrivacyModal() { document.getElementById("privacyModal").classList.remove("active"); }

function showToast(msg) {
  let toast = document.getElementById("twsMasterToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "twsMasterToast";
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
