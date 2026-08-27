/**
 * Tour with Somjit - Master Application Controller & In-Page Visual Editor
 * 100% In-Place Live Editing, Real-Time Cloud Sync to Firebase,
 * WhatsApp Booking, YouTube Player, and Anek Bangla Typography.
 */

let currentTourId = "ladakh-2026";
let isVisualEditMode = false;
let directUploadTarget = { section: "", key: "", elemId: "", isBg: false };

document.addEventListener("DOMContentLoaded", () => {
  initLiveSiteData();
  initMobileDrawer();
  initBookingModal();
  applyDynamicBrandingAndText();
  renderHomeTours();
  renderWhyUsFeatures();
  renderMomentsGallery();
  renderHomeVlogs();
  renderHomeFaqs();
});

// 1. Live Site Data Loader & Real-Time Sync
function initLiveSiteData() {
  const localSaved = localStorage.getItem("tws_custom_site_data");
  if (localSaved) {
    try {
      const parsed = JSON.parse(localSaved);
      deepMerge(window.TWS_SITE_DATA, parsed);
      applyDynamicBrandingAndText();
    } catch(e) {}
  }

  // Fetch real-time from Firebase Cloud
  fetch("https://tour-with-somjit-default-rtdb.firebaseio.com/site_data.json", { cache: "no-store" })
    .then(res => res.json())
    .then(cloudData => {
      if (cloudData && typeof cloudData === "object") {
        deepMerge(window.TWS_SITE_DATA, cloudData);
        localStorage.setItem("tws_custom_site_data", JSON.stringify(window.TWS_SITE_DATA));
        applyDynamicBrandingAndText();
        renderHomeTours();
        renderWhyUsFeatures();
        renderMomentsGallery();
        renderHomeVlogs();
        renderHomeFaqs();
        populateTourDropdown();
      }
    })
    .catch(() => {});
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

// 2. In-Page Visual Edit Mode Toggle
function toggleVisualEditMode() {
  if (isVisualEditMode) {
    exitVisualEditMode();
    return;
  }

  const authenticated = sessionStorage.getItem("tws_admin_authenticated");
  if (!authenticated) {
    const pin = prompt("🔐 অ্যাডমিন লাইভ এডিট মোড পিন দিন (Default: 1234 বা somjit2026):");
    if (pin === "1234" || pin === "somjit2026" || pin === "admin") {
      sessionStorage.setItem("tws_admin_authenticated", "true");
      enterVisualEditMode();
    } else if (pin !== null) {
      alert("❌ ভুল পিন! পুনরায় চেষ্টা করুন।");
    }
  } else {
    enterVisualEditMode();
  }
}

function enterVisualEditMode() {
  isVisualEditMode = true;
  document.body.classList.remove("normal-view-mode");
  document.body.classList.add("visual-edit-mode");

  const bar = document.getElementById("visualEditorBar");
  if (bar) bar.style.display = "block";

  const btnText = document.getElementById("editBtnText");
  if (btnText) btnText.textContent = "এডিট চলছে";

  renderHomeTours();
  renderWhyUsFeatures();
  renderMomentsGallery();
  renderHomeFaqs();

  showToast("🛠️ লাইভ এডিট মোড সক্রিয়! যেকোনো লেখায় বা ছবিতে ক্লিক করে এডিট করুন।");
}

function exitVisualEditMode() {
  isVisualEditMode = false;
  document.body.classList.remove("visual-edit-mode");
  document.body.classList.add("normal-view-mode");

  const bar = document.getElementById("visualEditorBar");
  if (bar) bar.style.display = "none";

  const btnText = document.getElementById("editBtnText");
  if (btnText) btnText.textContent = "এডিট মোড";

  renderHomeTours();
  renderWhyUsFeatures();
  renderMomentsGallery();
  renderHomeFaqs();
}

// 3. Prompt Text Edit
function promptEditText(section, key, labelName) {
  const siteData = window.TWS_SITE_DATA || {};
  if (!siteData[section]) siteData[section] = {};

  const currentVal = siteData[section][key] || "";
  const newVal = prompt(`${labelName} নতুন করে লিখুন:`, currentVal);

  if (newVal !== null && newVal.trim() !== "") {
    siteData[section][key] = newVal.trim();
    localStorage.setItem("tws_custom_site_data", JSON.stringify(siteData));
    applyDynamicBrandingAndText();
    showToast(`✓ '${labelName}' পরিবর্তন হয়েছে! সেভ করতে 'ফাইনাল সেভ' বোতাম চাপুন।`);
  }
}

// 4. Direct Image Upload Handler
function triggerDirectUpload(section, key, elemId, isBg = false) {
  directUploadTarget = { section, key, elemId, isBg };
  const fileInput = document.getElementById("globalDirectImageInput");
  if (fileInput) {
    fileInput.value = "";
    fileInput.click();
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
    localStorage.setItem("tws_custom_site_data", JSON.stringify(siteData));

    const elem = document.getElementById(elemId);
    if (elem) {
      if (isBg) {
        elem.style.backgroundImage = `linear-gradient(180deg, rgba(10,25,47,0.45) 0%, rgba(10,25,47,0.7) 100%), url('${dataUrl}')`;
      } else {
        elem.src = dataUrl;
      }
    }

    applyDynamicBrandingAndText();
    showToast("✓ ছবি সফলভাবে পরিবর্তন হয়েছে! সেভ করতে 'ফাইনাল সেভ' বোতাম চাপুন।");
  };

  reader.readAsDataURL(file);
}

// 5. Save Visual Edits Directly to Google Firebase Realtime Cloud
async function saveVisualEditsToCloud() {
  const siteData = window.TWS_SITE_DATA || {};
  showToast("⏳ গুগলের ক্লাউড সার্ভারে সেভ হচ্ছে...");

  try {
    const res = await fetch("https://tour-with-somjit-default-rtdb.firebaseio.com/site_data.json", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(siteData)
    });

    if (res.ok) {
      localStorage.setItem("tws_custom_site_data", JSON.stringify(siteData));
      alert("🎉 অসাধারণ! আপনার সমস্ত পরিবর্তন সরাসরি Google ক্লাউডে সেভ হয়ে গেছে এবং ওয়েবসাইটে লাইভ হয়ে গেছে!");
      exitVisualEditMode();
    } else {
      throw new Error("Server error");
    }
  } catch(err) {
    alert("✓ লোকাল ডিভাইসে সংরক্ষিত হয়েছে! (ইন্টারনেট কানেকশন চেক করুন)");
    exitVisualEditMode();
  }
}

// 6. Apply Dynamic Branding, Images & Text to DOM
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

  // Hero Subtitle & Heading
  const heroSubtitle = document.getElementById("dynHeroSubtitle");
  if (heroSubtitle) {
    heroSubtitle.textContent = general.hero_subtitle || "Somjit Bhattacharyya-র সাথে";
  }
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
    hostAvatar.src = branding.host_circle_avatar || branding.host_avatar || "assets/images/host_circle_avatar.png";
  }
  const hostTitle = document.getElementById("dynHostSectionTitle");
  if (hostTitle) hostTitle.textContent = host.host_section_title || "আপনার পরিচিত মুখ, আপনার ভ্রমণের সঙ্গী";
  const hostName = document.getElementById("dynHostName");
  if (hostName) hostName.textContent = host.host_name || "Somjit Bhattacharyya";
  const hostRole = document.getElementById("dynHostRole");
  if (hostRole) hostRole.textContent = host.host_role || "Founder & Host";
  const hostBio = document.getElementById("dynHostBio");
  if (hostBio) hostBio.textContent = host.host_bio || host.desc || "আমি Somjit Bhattacharyya, একজন ভ্রমণপ্রেমী ও গল্প বলার মানুষ...";
}

// 7. Mobile Drawer Navigation
function initMobileDrawer() {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const closeBtn = document.getElementById("closeMobileNavBtn");
  const drawer = document.getElementById("mobileNavDrawer");

  if (menuBtn && drawer) {
    menuBtn.onclick = () => drawer.classList.add("active");
  }
  if (closeBtn && drawer) {
    closeBtn.onclick = () => drawer.classList.remove("active");
  }
}

function closeNav() {
  const drawer = document.getElementById("mobileNavDrawer");
  if (drawer) drawer.classList.remove("active");
}

// 8. Render Tours on Homepage with Live Edit Hooks
function renderHomeTours() {
  const container = document.getElementById("homeToursList");
  if (!container) return;

  const siteData = window.TWS_SITE_DATA || {};
  const tours = siteData.tours || {};

  const tourImgMap = {
    "dooars-2026": "assets/images/card_dooars.jpg",
    "ladakh-2026": "assets/images/card_ladakh.jpg",
    "sundarban-2026": "assets/images/card_sundarban.jpg",
    "spiti-2026": "assets/images/moment_1.jpg",
    "ranchi-2026": "assets/images/moment_2.jpg",
    "purulia-2026": "assets/images/moment_3.jpg"
  };

  let html = "";
  Object.values(tours).forEach(tour => {
    const imgUrl = tour.banner_image || tourImgMap[tour.id] || "assets/images/card_ladakh.jpg";
    const destName = tour.category ? tour.category.charAt(0).toUpperCase() + tour.category.slice(1) : (tour.title.split(" ")[0] || "ট্যুর");
    
    let bnShortName = destName;
    if (tour.id.includes("dooars")) bnShortName = "ডুয়ার্স";
    else if (tour.id.includes("ladakh")) bnShortName = "লাদাখ";
    else if (tour.id.includes("sundarban")) bnShortName = "সুন্দরবন";
    else if (tour.id.includes("spiti")) bnShortName = "স্পিতি";
    else if (tour.id.includes("ranchi")) bnShortName = "রাঁচি";
    else if (tour.id.includes("purulia")) bnShortName = "পুরুলিয়া";

    html += `
      <div class="tour-card-compact" style="position:relative;">
        ${isVisualEditMode ? `
          <div class="tour-card-edit-overlay edit-only-btn">
            <button type="button" class="tour-card-edit-btn" onclick="openEditTourModal('${tour.id}', event)" title="ট্যুর তথ্য এডিট"><i class="fas fa-pencil-alt"></i></button>
            <button type="button" class="tour-card-edit-btn del" onclick="deleteTourItem('${tour.id}', event)" title="ট্যুর ডিলিট"><i class="fas fa-trash"></i></button>
          </div>
        ` : ''}
        <div class="tour-card-cover" onclick="openItineraryModal('${tour.id}')">
          <img src="${imgUrl}" alt="${escapeAttr(tour.title)}" loading="lazy">
          <div class="tour-card-dest-name">${escapeHtml(bnShortName)}</div>
        </div>
        <div class="tour-card-bottom-info" onclick="openItineraryModal('${tour.id}')">
          <div class="tour-card-dates-col">
            <div class="tour-card-dates">${escapeHtml(tour.dates || '২০২৬')}</div>
            <div class="tour-card-duration">${escapeHtml(tour.duration || 'গ্রুপ ট্যুর')}</div>
          </div>
          <div class="tour-card-arrow-btn">
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// 9. In-Page Tour Edit & Modal
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
  document.getElementById("edTourDetails").value = tour.caption_details || "";

  document.getElementById("editTourModalHeading").textContent = `এডিট: ${tour.title}`;
  document.getElementById("editTourModal").classList.add("active");
}

function openAddTourModal() {
  const newId = "tour-" + Date.now();
  document.getElementById("edTourId").value = newId;
  document.getElementById("edTourTitle").value = "নতুন আকর্ষণীয় ট্যুর";
  document.getElementById("edTourDates").value = "২০২৬";
  document.getElementById("edTourDuration").value = "5 Nights / 6 Days";
  document.getElementById("edTourBanner").value = "assets/images/card_ladakh.jpg";
  document.getElementById("edTourDetails").value = "এই ট্যুরের সম্পূর্ণ শিডিউল...";

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
  const details = document.getElementById("edTourDetails").value.trim();

  if (!title) {
    alert("দয়া করে ট্যুরের নাম দিন।");
    return;
  }

  const siteData = window.TWS_SITE_DATA || {};
  if (!siteData.tours) siteData.tours = {};

  if (!siteData.tours[tourId]) {
    siteData.tours[tourId] = { id: tourId, title, dates, duration, banner_image: banner, caption_details: details };
  } else {
    siteData.tours[tourId].title = title;
    siteData.tours[tourId].dates = dates;
    siteData.tours[tourId].duration = duration;
    siteData.tours[tourId].banner_image = banner;
    siteData.tours[tourId].caption_details = details;
  }

  localStorage.setItem("tws_custom_site_data", JSON.stringify(siteData));
  closeEditTourModal();
  renderHomeTours();
  populateTourDropdown();
  showToast("✓ ট্যুর আপডেট হয়েছে! ফাইনাল সেভ করতে 'ফাইনাল সেভ' বোতাম চাপুন।");
}

function deleteTourItem(tourId, event) {
  if (event) event.stopPropagation();
  if (confirm("আপনি কি নিশ্চিত এই ট্যুরটি ডিলিট করতে চান?")) {
    const siteData = window.TWS_SITE_DATA || {};
    if (siteData.tours && siteData.tours[tourId]) {
      delete siteData.tours[tourId];
      localStorage.setItem("tws_custom_site_data", JSON.stringify(siteData));
      renderHomeTours();
      populateTourDropdown();
      showToast("✓ ট্যুর ডিলিট হয়েছে!");
    }
  }
}

// 10. Render Why Us Features (4 Items)
function renderWhyUsFeatures() {
  const container = document.getElementById("dynWhyUsGrid");
  if (!container) return;

  const siteData = window.TWS_SITE_DATA || {};
  const features = siteData.why_us_features || [
    {"icon": "fas fa-user-friends", "title": "ছোট গ্রুপ ট্যুর", "desc": "আরামদায়ক ও পরিচিত পরিবেশ"},
    {"icon": "fas fa-hotel", "title": "ভালো থাকার ব্যবস্থা", "desc": "বাছাই করা Hotel & Resort"},
    {"icon": "fas fa-bus-alt", "title": "পরিকল্পিত ভ্রমণ", "desc": "Transport থেকে Sightseeing – সবকিছু পরিকল্পিত"},
    {"icon": "fas fa-user-check", "title": "Somjit-এর সাথে", "desc": "একই ভ্রমণ, একই আনন্দ"}
  ];

  let html = "";
  features.forEach((f, idx) => {
    html += `
      <div class="why-us-item" style="position:relative;">
        ${isVisualEditMode ? `
          <button type="button" class="btn-inline-edit edit-only-btn" onclick="editWhyUsItem(${idx})"><i class="fas fa-pencil-alt"></i></button>
        ` : ''}
        <div class="why-icon-circle"><i class="${f.icon || 'fas fa-star'}"></i></div>
        <h4 class="why-item-title">${escapeHtml(f.title)}</h4>
        <p class="why-item-desc">${escapeHtml(f.desc)}</p>
      </div>
    `;
  });

  container.innerHTML = html;
}

function editWhyUsItem(idx) {
  const siteData = window.TWS_SITE_DATA || {};
  if (!siteData.why_us_features) return;
  const item = siteData.why_us_features[idx];
  if (!item) return;

  const newTitle = prompt("বৈশিষ্ট্যের নাম:", item.title);
  if (newTitle !== null && newTitle.trim() !== "") {
    const newDesc = prompt("বিবরণ:", item.desc);
    if (newDesc !== null) {
      item.title = newTitle.trim();
      item.desc = newDesc.trim();
      localStorage.setItem("tws_custom_site_data", JSON.stringify(siteData));
      renderWhyUsFeatures();
      showToast("✓ বৈশিষ্ট্য আপডেট হয়েছে!");
    }
  }
}

// 11. Render Moments Gallery
function renderMomentsGallery() {
  const track = document.getElementById("momentsTrack");
  if (!track) return;

  const siteData = window.TWS_SITE_DATA || {};
  const moments = siteData.moments_gallery || [
    {"id": "m1", "image_url": "assets/images/moment_1.jpg", "caption": "ট্যুর মুহূর্ত ১"},
    {"id": "m2", "image_url": "assets/images/moment_2.jpg", "caption": "ট্যুর মুহূর্ত ২"},
    {"id": "m3", "image_url": "assets/images/moment_3.jpg", "caption": "ট্যুর মুহূর্ত ৩"}
  ];

  let html = "";
  moments.forEach((m, idx) => {
    html += `
      <div class="moment-card" style="position:relative;">
        ${isVisualEditMode ? `
          <div class="moment-card-edit-overlay edit-only-btn">
            <button type="button" class="tour-card-edit-btn" onclick="changeMomentPhoto(${idx})" title="ছবি বদলান"><i class="fas fa-camera"></i></button>
            <button type="button" class="tour-card-edit-btn del" onclick="deleteMomentPhoto(${idx})" title="মুহূর্ত ডিলিট"><i class="fas fa-trash"></i></button>
          </div>
        ` : ''}
        <img src="${m.image_url}" alt="${escapeAttr(m.caption || 'Tour Moment')}" loading="lazy">
      </div>
    `;
  });

  if (isVisualEditMode) {
    html += `
      <div class="add-moment-inline-card edit-only-btn" onclick="openAddMomentModal()">
        <i class="fas fa-plus-circle" style="font-size:1.5rem;"></i>
        <span>নতুন মুহূর্ত যোগ</span>
      </div>
    `;
  }

  track.innerHTML = html;
}

function openAddMomentModal() {
  const fileInput = document.getElementById("globalDirectImageInput");
  directUploadTarget = { section: "moments_gallery_new", key: "", elemId: "" };
  if (fileInput) {
    fileInput.value = "";
    fileInput.onchange = function() {
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const siteData = window.TWS_SITE_DATA || {};
          if (!siteData.moments_gallery) siteData.moments_gallery = [];
          siteData.moments_gallery.push({
            id: "m-" + Date.now(),
            image_url: e.target.result,
            caption: "নতুন ভ্রমণ মুহূর্ত"
          });
          localStorage.setItem("tws_custom_site_data", JSON.stringify(siteData));
          renderMomentsGallery();
          showToast("✓ নতুন মুহূর্ত যোগ হয়েছে!");
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
          if (siteData.moments_gallery && siteData.moments_gallery[idx]) {
            siteData.moments_gallery[idx].image_url = e.target.result;
            localStorage.setItem("tws_custom_site_data", JSON.stringify(siteData));
            renderMomentsGallery();
            showToast("✓ ছবি পরিবর্তন হয়েছে!");
          }
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
    if (siteData.moments_gallery) {
      siteData.moments_gallery.splice(idx, 1);
      localStorage.setItem("tws_custom_site_data", JSON.stringify(siteData));
      renderMomentsGallery();
      showToast("✓ মুহূর্তের ছবি ডিলিট হয়েছে!");
    }
  }
}

function scrollMoments(direction) {
  const track = document.getElementById("momentsTrack");
  if (track) {
    track.scrollBy({ left: direction * 180, behavior: "smooth" });
  }
}

// 12. Render Vlogs on Homepage
function renderHomeVlogs() {
  const container = document.getElementById("homeVlogsList");
  if (!container) return;

  const siteData = window.TWS_SITE_DATA || {};
  const vlogs = siteData.vlogs || [
    {
      id: "vlog-1",
      title: "লাদাখ মহাবিস্ময় - খারদুংলা, নুব্রা ও প্যাংগং লেক ভ্রমণ গাইড",
      desc: "সোমজিৎ ভট্টাচার্য-এর সাথে লাদাখের উঁচু গিরিপথ ও বরফাবৃত সুন্দর উপত্যকা।",
      youtube_url: "https://www.youtube.com/watch?v=0hYyW_pLh-Q"
    },
    {
      id: "vlog-2",
      title: "সুন্দরবন ইলিশ উৎসব - বিলাসবহুল লঞ্চে রাজকীয় ভ্রমণ",
      desc: "দেবী অন্নপূর্ণা লঞ্চে ৩ দিনে ৩০+ ইলিশ ও খাঁটি বাঙালি খাবারের আসর।",
      youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
  ];

  let html = "";
  vlogs.forEach((vlog, idx) => {
    const videoId = extractYouTubeVideoId(vlog.youtube_url);
    const thumb = vlog.thumbnail_url || (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "assets/images/card_ladakh.jpg");

    html += `
      <div class="vlog-card-item" style="position:relative;">
        ${isVisualEditMode ? `
          <button type="button" class="tour-card-edit-btn del edit-only-btn" style="position:absolute; top:8px; right:8px; z-index:100;" onclick="deleteVlogItem(${idx})" title="ভিডিও মুছুন"><i class="fas fa-trash"></i></button>
        ` : ''}
        <div class="vlog-thumb-wrap" onclick="playYouTubeVideo('${videoId || ''}', '${escapeAttr(vlog.title)}')">
          <img src="${thumb}" alt="${escapeAttr(vlog.title)}" loading="lazy">
          <div class="vlog-play-badge">
            <i class="fab fa-youtube"></i>
          </div>
        </div>
        <div class="vlog-info-wrap" onclick="playYouTubeVideo('${videoId || ''}', '${escapeAttr(vlog.title)}')">
          <h4 class="vlog-title-text">${escapeHtml(vlog.title)}</h4>
          <p class="vlog-desc-text">${escapeHtml(vlog.desc || 'সোমজিৎ ভট্টাচার্য-এর সাথে আকর্ষণীয় ভ্রমণ অভিজ্ঞতা।')}</p>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function openAddVlogModal() {
  const url = prompt("YouTube ভিডিওর লিংক দিন (Watch / Shorts / Live লিংক):");
  if (!url) return;

  const videoId = extractYouTubeVideoId(url);
  if (!videoId) {
    alert("❌ সঠিক YouTube লিংক পাওয়া যায়নি।");
    return;
  }

  const title = prompt("ভিডিওর শিরোনাম দিন:", "নতুন ভ্রমণ ভিডিও ভ্লগ") || "ভ্রমণ ভিডিও";
  const desc = prompt("ভিডিওর সংক্ষিপ্ত বিবরণ দিন:", "সোমজিৎ ভট্টাচার্য-এর সাথে ভ্রমণ ভিডিও") || "";

  const siteData = window.TWS_SITE_DATA || {};
  if (!siteData.vlogs) siteData.vlogs = [];

  siteData.vlogs.unshift({
    id: "vlog-" + Date.now(),
    title,
    desc,
    youtube_url: `https://www.youtube.com/watch?v=${videoId}`,
    thumbnail_url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  });

  localStorage.setItem("tws_custom_site_data", JSON.stringify(siteData));
  renderHomeVlogs();
  showToast("✓ নতুন YouTube ভিডিও যোগ হয়েছে!");
}

function deleteVlogItem(idx) {
  if (confirm("এই ভিডিওটি ডিলিট করতে চান?")) {
    const siteData = window.TWS_SITE_DATA || {};
    if (siteData.vlogs) {
      siteData.vlogs.splice(idx, 1);
      localStorage.setItem("tws_custom_site_data", JSON.stringify(siteData));
      renderHomeVlogs();
      showToast("✓ ভিডিও ডিলিট হয়েছে!");
    }
  }
}

function extractYouTubeVideoId(url) {
  if (!url) return null;
  url = url.trim();
  const patterns = [
    /[?&]v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/(?:embed|v|shorts|live)\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m && m[1]) return m[1];
  }
  return null;
}

function playYouTubeVideo(videoId, title) {
  if (!videoId) {
    alert("এই ভিডিওটির সঠিক YouTube লিংক পাওয়া যায়নি।");
    return;
  }
  const modal = document.getElementById("videoModal");
  const container = document.getElementById("videoIframeContainer");
  if (modal && container) {
    container.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    modal.classList.add("active");
  }
}

function closeVideoModal() {
  const modal = document.getElementById("videoModal");
  const container = document.getElementById("videoIframeContainer");
  if (container) container.innerHTML = "";
  if (modal) modal.classList.remove("active");
}

// 13. Render FAQs
function renderHomeFaqs() {
  const container = document.getElementById("homeFaqContainer");
  if (!container) return;

  const siteData = window.TWS_SITE_DATA || {};
  const faqs = siteData.faqs || [];

  let html = "";
  faqs.forEach((faq, idx) => {
    html += `
      <div class="faq-item-card" id="faqCard_${idx}" style="position:relative;">
        ${isVisualEditMode ? `
          <div style="position:absolute; top:10px; right:40px; z-index:100; display:flex; gap:6px;">
            <button type="button" class="tour-card-edit-btn" onclick="editFaqItem(${idx}, event)"><i class="fas fa-pencil-alt"></i></button>
            <button type="button" class="tour-card-edit-btn del" onclick="deleteFaqItem(${idx}, event)"><i class="fas fa-trash"></i></button>
          </div>
        ` : ''}
        <button class="faq-question-btn" onclick="toggleFaq(${idx})">
          <span>${escapeHtml(faq.q)}</span>
          <i class="fas fa-chevron-down faq-arrow-icon"></i>
        </button>
        <div class="faq-answer-drawer" id="faqAns_${idx}">
          <div class="faq-answer-text">${escapeHtml(faq.a)}</div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function openAddFaqModal() {
  const q = prompt("নতুন প্রশ্নটি লিখুন:");
  if (!q) return;
  const a = prompt("প্রশ্নটির উত্তর লিখুন:");
  if (!a) return;

  const siteData = window.TWS_SITE_DATA || {};
  if (!siteData.faqs) siteData.faqs = [];
  siteData.faqs.push({ q: q.trim(), a: a.trim() });

  localStorage.setItem("tws_custom_site_data", JSON.stringify(siteData));
  renderHomeFaqs();
  showToast("✓ নতুন FAQ যোগ হয়েছে!");
}

function editFaqItem(idx, event) {
  if (event) event.stopPropagation();
  const siteData = window.TWS_SITE_DATA || {};
  if (!siteData.faqs || !siteData.faqs[idx]) return;

  const faq = siteData.faqs[idx];
  const newQ = prompt("প্রশ্নটি এডিট করুন:", faq.q);
  if (newQ !== null && newQ.trim() !== "") {
    const newA = prompt("উত্তরটি এডিট করুন:", faq.a);
    if (newA !== null) {
      faq.q = newQ.trim();
      faq.a = newA.trim();
      localStorage.setItem("tws_custom_site_data", JSON.stringify(siteData));
      renderHomeFaqs();
      showToast("✓ FAQ আপডেট হয়েছে!");
    }
  }
}

function deleteFaqItem(idx, event) {
  if (event) event.stopPropagation();
  if (confirm("এই প্রশ্নটি ডিলিট করতে চান?")) {
    const siteData = window.TWS_SITE_DATA || {};
    if (siteData.faqs) {
      siteData.faqs.splice(idx, 1);
      localStorage.setItem("tws_custom_site_data", JSON.stringify(siteData));
      renderHomeFaqs();
      showToast("✓ FAQ ডিলিট হয়েছে!");
    }
  }
}

function toggleFaq(idx) {
  const card = document.getElementById(`faqCard_${idx}`);
  const drawer = document.getElementById(`faqAns_${idx}`);
  if (!card || !drawer) return;

  const isActive = card.classList.contains("active");
  document.querySelectorAll(".faq-item-card").forEach(c => c.classList.remove("active"));
  document.querySelectorAll(".faq-answer-drawer").forEach(d => d.style.maxHeight = null);

  if (!isActive) {
    card.classList.add("active");
    drawer.style.maxHeight = drawer.scrollHeight + "px";
  }
}

// 14. Booking Modal & WhatsApp Dispatch
function initBookingModal() {
  populateTourDropdown();
}

function populateTourDropdown() {
  const select = document.getElementById("bkTourSelect");
  if (!select) return;

  const siteData = window.TWS_SITE_DATA || {};
  const tours = siteData.tours || {};

  select.innerHTML = `<option value="" disabled selected>ট্যুর নির্বাচন করুন</option>`;
  Object.values(tours).forEach(t => {
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

  const modal = document.getElementById("bookingModal");
  if (modal) modal.classList.add("active");
}

function closeBookingModal() {
  const modal = document.getElementById("bookingModal");
  if (modal) modal.classList.remove("active");
}

function openAllToursModal() {
  openBookingModal();
}

async function handleGroupBookingSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("bkGuestName").value.trim();
  const age = document.getElementById("bkGuestAge").value.trim();
  const gender = document.querySelector('input[name="bkGender"]:checked') ? document.querySelector('input[name="bkGender"]:checked').value : "পুরুষ";
  const phone = document.getElementById("bkGuestPhone").value.trim();
  const persons = document.getElementById("bkPersons").value.trim();
  const tourSelect = document.getElementById("bkTourSelect");
  const tourName = tourSelect && tourSelect.selectedIndex > 0 ? tourSelect.options[tourSelect.selectedIndex].text : "আসন্ন গ্রুপ ট্যুর";
  const bedType = document.querySelector('input[name="bkBedType"]:checked') ? document.querySelector('input[name="bkBedType"]:checked').value : "ডবল বেড";
  const foodChoice = document.querySelector('input[name="bkFoodChoice"]:checked') ? document.querySelector('input[name="bkFoodChoice"]:checked').value : "আমিষ (Non Veg)";

  const bookingId = "TWS-" + Math.floor(1000 + Math.random() * 9000);

  // Save to Firebase
  const payload = {
    booking_id: bookingId,
    name: name,
    age: age,
    gender: gender,
    phone: phone,
    persons: persons,
    tour: tourName,
    bed_type: bedType,
    food_choice: foodChoice,
    created_at: new Date().toISOString()
  };

  try {
    fetch("https://tour-with-somjit-default-rtdb.firebaseio.com/bookings.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    fetch("https://tour-with-somjit-default-rtdb.firebaseio.com/leads.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: phone,
        name: name,
        query: `গ্রুপ বুকিং: ${tourName} (${persons} জন) - ${bedType}, ${foodChoice}`,
        created_at: new Date().toISOString(),
        source: "Group Booking Form"
      })
    });
  } catch(e) {}

  // Format WhatsApp Message
  const waMessage = 
`নমস্কার সোমজিৎ ভট্টাচার্য 🙏
আমি আপনার ওয়েবসাইট থেকে একটি গ্রুপ ট্যুর বুকিং আবেদন পাঠাচ্ছি:

📌 *বুকিং বিবরণ:*
🆔 *আইডি:* ${bookingId}
👤 *নাম:* ${name}
📅 *বয়স:* ${age} বছর
⚥ *লিঙ্গ:* ${gender}
📞 *মোবাইল:* ${phone}
👥 *কতজন গ্রুপে যাবে:* ${persons}
🏔️ *নির্বাচিত ট্যুর:* ${tourName}
🛏️ *বেডের ধরন:* ${bedType}
🍽️ *খাবারের পছন্দ:* ${foodChoice}

দয়া করে সিট কনফার্মেশন ও বিস্তারিত প্রক্রিয়া জানিয়ে দিন। ধন্যবাদ!`;

  const waNumber = "919433074880";
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  window.open(waUrl, "_blank");
  closeBookingModal();
  alert("✓ আপনার বুকিং অনুরোধ সফলভাবে পাঠানো হয়েছে! সোমজিৎ ভট্টাচার্য ও অ্যাডমিন টিম দ্রুত WhatsApp-এ যোগাযোগ করবেন।");
}

// 15. Itinerary Modal
function openItineraryModal(tourId) {
  const siteData = window.TWS_SITE_DATA || {};
  const tour = (siteData.tours && siteData.tours[tourId]) ? siteData.tours[tourId] : Object.values(siteData.tours || {})[0];
  if (!tour) return;

  currentTourId = tourId;
  document.getElementById("itinModalTitle").textContent = tour.title;
  document.getElementById("itinModalDates").textContent = `${tour.dates || '২০২৬'} • ${tour.duration || 'গ্রুপ ট্যুর'}`;
  
  const body = document.getElementById("itinModalBody");
  if (body) {
    const rawDetails = tour.caption_details || "এই ট্যুরের বিস্তারিত শিডিউল ও দর্শনীয় স্থানসমূহ শীঘ্রই আপডেট করা হবে।";
    body.innerHTML = `
      <div style="margin-bottom:1rem; white-space:pre-line;">${escapeHtml(rawDetails)}</div>
      ${tour.plans ? `
        <div style="background:#f1f5f9; padding:12px 14px; border-radius:10px; margin-top:1rem;">
          <strong style="color:#0f172a; display:block; margin-bottom:6px;"><i class="fas fa-tags" style="color:#d97706;"></i> উপলব্ধ প্যাকেজ ও রুমের ধরন:</strong>
          <ul style="list-style:none; padding-left:0; font-size:0.92rem;">
            ${tour.plans.map(p => `<li style="padding:3px 0;"><i class="fas fa-check" style="color:#16a34a; font-size:0.8rem;"></i> ${escapeHtml(p.name)} - <strong>₹${p.price.toLocaleString("en-IN")}</strong></li>`).join("")}
          </ul>
        </div>
      ` : ''}
    `;
  }

  const modal = document.getElementById("itineraryModal");
  if (modal) modal.classList.add("active");
}

function closeItineraryModal() {
  const modal = document.getElementById("itineraryModal");
  if (modal) modal.classList.remove("active");
}

function bookCurrentItineraryTour() {
  closeItineraryModal();
  const siteData = window.TWS_SITE_DATA || {};
  const tour = (siteData.tours && siteData.tours[currentTourId]) ? siteData.tours[currentTourId] : null;
  openBookingModal(tour ? tour.title : "");
}

// 16. Privacy Policy Modal
function openPrivacyModal() {
  const modal = document.getElementById("privacyModal");
  if (modal) modal.classList.add("active");
}

function closePrivacyModal() {
  const modal = document.getElementById("privacyModal");
  if (modal) modal.classList.remove("active");
}

// 17. Toast Notification Helper
function showToast(msg) {
  let toast = document.getElementById("twsLiveToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "twsLiveToast";
    toast.style.cssText = "position:fixed; bottom:75px; left:50%; transform:translateX(-50%); background:#0f172a; color:#fbbf24; border:1px solid #fbbf24; padding:10px 18px; border-radius:30px; font-size:0.88rem; font-weight:700; z-index:999999; box-shadow:0 6px 20px rgba(0,0,0,0.35); text-align:center; transition:opacity 0.3s ease; pointer-events:none;";
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
