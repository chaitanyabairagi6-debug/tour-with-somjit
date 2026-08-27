// =========================================================================
// Tour with Somjit - Public Application Engine (v9.0.0)
// =========================================================================

let liveSiteData = null;
const FIREBASE_DB_URL = "https://tour-with-somjit-default-rtdb.firebaseio.com/site_data.json";

document.addEventListener("DOMContentLoaded", () => {
  loadLiveSiteData();
});

// 1. Cloud Loader
async function loadLiveSiteData() {
  const cacheBuster = "?t=" + Date.now();
  try {
    const res = await fetch(FIREBASE_DB_URL + cacheBuster, { cache: "no-store" });
    const cloud = await res.json();
    if (cloud && typeof cloud === "object" && cloud.tours) {
      liveSiteData = cloud;
      localStorage.setItem("tws_live_site_data", JSON.stringify(cloud));
      renderPublicWebsite(liveSiteData);
      return;
    }
  } catch(err) {}

  const cached = localStorage.getItem("tws_live_site_data");
  if (cached) {
    liveSiteData = JSON.parse(cached);
  } else {
    liveSiteData = window.TWS_SITE_DATA || {};
  }
  renderPublicWebsite(liveSiteData);
}

// 2. Main Public Renderer
function renderPublicWebsite(data) {
  if (!data) return;
  renderHeadings(data);
  renderHostHero(data);
  renderToursGrid(data);
  renderSpecialities(data);
  renderGallery(data);
  renderCustomerReviews(data);
  renderFaqs(data);
  renderPolicies(data);
  renderFooterAndContact(data);
  populateBookingTourDropdown(data);
}

// Headings & Header
function renderHeadings(data) {
  const h = data.section_headings || {};
  const brand = data.branding || {};
  const contact = data.contact || {};

  const siteTitle = document.getElementById("dynSiteTitle");
  const siteSubtitle = document.getElementById("dynSiteSubtitle");
  const phoneLink = document.getElementById("dynHeaderPhoneLink");

  if (siteTitle) siteTitle.textContent = (h.header && h.header.site_title) ? h.header.site_title : (brand.site_title || "Tour with Somjit");
  if (siteSubtitle) siteSubtitle.textContent = (h.header && h.header.site_subtitle) ? h.header.site_subtitle : (brand.tagline || "সোমজিৎ ভট্টাচার্য");
  if (phoneLink && contact.primary_phone) phoneLink.href = `tel:${contact.primary_phone.replace(/\D/g, '')}`;

  const tH = h.tours || {};
  const tBadge = document.getElementById("dynToursBadge");
  const tTitle = document.getElementById("dynToursTitle");
  const tSub = document.getElementById("dynToursSubtitle");
  if (tBadge) tBadge.textContent = tH.badge || "২০২৬ ভ্রমণ ক্যালেন্ডার";
  if (tTitle) tTitle.textContent = tH.title || "আমাদের বছরের ৬টি বিশেষ গ্রুপ ট্যুর";
  if (tSub) tSub.textContent = tH.subtitle || "সোমজিৎ ভট্টাচার্যের আন্তরিক পরিচালনায় প্রতিটি ট্যুর সম্পূর্ণ পারিবারিক ও নিশ্চিত আনন্দের";

  const trmH = h.terms || {};
  const trmBadge = document.getElementById("dynTermsBadge");
  const trmTitle = document.getElementById("dynTermsTitle");
  const trmSub = document.getElementById("dynTermsSubtitle");
  if (trmBadge) trmBadge.textContent = trmH.badge || "Company Guidelines";
  if (trmTitle) trmTitle.textContent = trmH.title || "Terms & Conditions";
  if (trmSub) trmSub.textContent = trmH.subtitle || "General Policies, Child Guidelines & Cancellation Rules";

  const whyH = h.why_us || {};
  const wBadge = document.getElementById("dynWhyUsBadge");
  const wTitle = document.getElementById("dynWhyUsTitle");
  const wSub = document.getElementById("dynWhyUsSubtitle");
  if (wBadge) wBadge.textContent = whyH.badge || "নিরাপত্তা ও আন্তরিকতা";
  if (wTitle) wTitle.textContent = whyH.title || "আমাদের ট্যুরের বিশেষত্ব";
  if (wSub) wSub.textContent = whyH.subtitle || "কেন পরিবার ও প্রবীণদের প্রথম পছন্দ Tour with Somjit?";

  const revH = h.reviews || {};
  const rBadge = document.getElementById("dynReviewsBadge");
  const rTitle = document.getElementById("dynReviewsTitle");
  const rSub = document.getElementById("dynReviewsSubtitle");
  const rBtn = document.getElementById("dynReviewsBtnText");
  if (rBadge) rBadge.textContent = revH.badge || "ভ্রমণসঙ্গীদের অভিজ্ঞতা";
  if (rTitle) rTitle.textContent = revH.title || "কাস্টমার রেটিং ও মতামত";
  if (rSub) rSub.textContent = revH.subtitle || "আমাদের সাথে ঘুরে আসা পরিবার ও প্রবীণ সদস্যদের আন্তরিক রিভিউ";
  if (rBtn) rBtn.textContent = revH.btn_text || "✍️ আপনার রিভিউ ও রেটিং যোগ করুন";
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

// 6 Annual Tours Grid (Active WhatsApp for Closed Tours & Highlighting)
function renderToursGrid(data) {
  const container = document.getElementById("annualToursGrid");
  if (!container) return;

  const tours = Object.values(data.tours || {});
  let html = "";

  tours.forEach(tour => {
    const imgUrl = tour.banner_image || "assets/images/tour_purulia_square.jpg";
    const status = tour.status || "BOOKING_OPEN";

    let statusPillHtml = "";
    let cardClass = "tour-card-sq";
    let buttonHtml = "";

    if (status === "BOOKING_OPEN") {
      cardClass += " status-open";
      statusPillHtml = `<span class="tour-status-pill open"><i class="fas fa-circle" style="font-size:8px;"></i> Booking Open</span>`;
      const waText = encodeURIComponent(`নমস্কার সোমজিৎ ভট্টাচার্য, আমি আপনার '${tour.title}' সম্পর্কে বিস্তারিত জানতে ও সিট বুকিং করতে চাই।`);
      buttonHtml = `
        <a href="https://wa.me/919433074880?text=${waText}" target="_blank" class="btn-tour-wa">
          <i class="fa-brands fa-whatsapp"></i> WhatsApp বুকিং
        </a>
      `;
    } else if (status === "LIMITED_SEATS") {
      cardClass += " status-limited";
      statusPillHtml = `<span class="tour-status-pill limited"><i class="fas fa-exclamation-circle"></i> Limited Seats</span>`;
      const waText = encodeURIComponent(`নমস্কার সোমজিৎ ভট্টাচার্য, আমি আপনার '${tour.title}' ট্যুরে মাত্র কয়েকটি সিট বাকি দেখে দ্রুত বুকিং করতে চাই।`);
      buttonHtml = `
        <a href="https://wa.me/919433074880?text=${waText}" target="_blank" class="btn-tour-wa" style="background:#f59e0b;">
          <i class="fa-brands fa-whatsapp"></i> দ্রুত সিট বুকিং
        </a>
      `;
    } else if (status === "UPCOMING") {
      statusPillHtml = `<span class="tour-status-pill upcoming"><i class="fas fa-clock"></i> Coming Soon</span>`;
      const waText = encodeURIComponent(`নমস্কার সোমজিৎ ভট্টাচার্য, আপনার '${tour.title}' আসছে দেখে আমি এই ট্যুরটির বিষয়ে জানতে চাই।`);
      buttonHtml = `
        <a href="https://wa.me/919433074880?text=${waText}" target="_blank" class="btn-tour-wa" style="background:#0284c7;">
          <i class="fa-brands fa-whatsapp"></i> তথ্য জানতে WhatsApp
        </a>
      `;
    } else if (status === "BOOKING_CLOSED") {
      cardClass += " status-closed";
      statusPillHtml = `<span class="tour-status-pill closed"><i class="fas fa-lock"></i> Booking Closed</span>`;
      const waitlistMsg = encodeURIComponent(`নমস্কার সোমজিৎ ভট্টাচার্য, আমি আপনার '${tour.title}' ট্যুরের জন্য বিশেষ আগ্রহী। বর্তমানে এই ট্যুরের বুকিং সমাপ্ত হলেও, পরবর্তী ব্যাচ বা পুনরায় বুকিং ওপেন হলে অনুগ্রহ করে আমাকে অবশ্যই জানাবেন।`);
      buttonHtml = `
        <a href="https://wa.me/919433074880?text=${waitlistMsg}" target="_blank" class="btn-tour-wa btn-tour-waitlist" title="পরবর্তী ব্যাচে যাওয়ার জন্য জানান">
          <i class="fas fa-bell"></i> পরবর্তী বুকিংয়ে জানান
        </a>
      `;
    }

    html += `
      <div class="${cardClass}">
        <div class="tour-banner-sq-wrap" onclick="openTourDetailsModal('${tour.id}')" title="সম্পূর্ণ ট্যুর প্ল্যান দেখুন">
          <img class="tour-banner-sq-img" src="${imgUrl}" alt="${escapeAttr(tour.title)}" loading="lazy">
        </div>
        <div class="tour-card-sq-body">
          <div>${statusPillHtml}</div>
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
            ${buttonHtml}
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
function renderSpecialities(data) {
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
function renderGallery(data) {
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
function renderFaqs(data) {
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

// Policies & Terms & Conditions
function renderPolicies(data) {
  const policies = data.policies || {};
  const childList = document.getElementById("dynChildPolicyList");
  const cancelList = document.getElementById("dynCancelPolicyList");
  const aboutText = document.getElementById("dynAboutText");
  const privacyContent = document.getElementById("dynPrivacyPolicyContent");

  if (aboutText && data.about_company) aboutText.textContent = data.about_company;

  if (childList && policies.child_policy) {
    childList.innerHTML = policies.child_policy.map(item => `<li>${escapeHtml(item)}</li>`).join("");
  }
  if (cancelList && policies.cancellation_policy) {
    cancelList.innerHTML = policies.cancellation_policy.map(item => `<li>${escapeHtml(item)}</li>`).join("");
  }

  if (privacyContent && data.privacy_policy) {
    privacyContent.innerHTML = data.privacy_policy.map(p => `<p style="margin-bottom:10px;">${escapeHtml(p)}</p>`).join("");
  }
}

// Footer & Permanent Office Address
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
  if (addr) addr.textContent = contact.address || "Fatakgora, Chandannagar, Hooghly, West Bengal - 712136";
}

// 3. Tour Details Modal
let selectedTourForDetails = null;

function openTourDetailsModal(tourId) {
  if (!liveSiteData || !liveSiteData.tours || !liveSiteData.tours[tourId]) return;

  const tour = liveSiteData.tours[tourId];
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

  const statusWrap = document.getElementById("dtStatusBadgeWrap");
  const status = tour.status || "BOOKING_OPEN";
  const bookBtn = document.getElementById("dtBookBtn");

  if (statusWrap) {
    if (status === "BOOKING_OPEN") {
      statusWrap.innerHTML = `<span class="tour-status-pill open"><i class="fas fa-circle" style="font-size:8px;"></i> Booking Open</span>`;
      if (bookBtn) { bookBtn.style.background = "#16a34a"; bookBtn.innerHTML = '<i class="fab fa-whatsapp"></i> এই ট্যুরের জন্য সিট বুকিং করুন'; }
    } else if (status === "LIMITED_SEATS") {
      statusWrap.innerHTML = `<span class="tour-status-pill limited"><i class="fas fa-exclamation-circle"></i> Limited Seats</span>`;
      if (bookBtn) { bookBtn.style.background = "#f59e0b"; bookBtn.innerHTML = '<i class="fab fa-whatsapp"></i> দ্রুত সিট বুকিং করুন'; }
    } else if (status === "UPCOMING") {
      statusWrap.innerHTML = `<span class="tour-status-pill upcoming"><i class="fas fa-clock"></i> Coming Soon</span>`;
      if (bookBtn) { bookBtn.style.background = "#0284c7"; bookBtn.innerHTML = '<i class="fab fa-whatsapp"></i> তথ্য জানতে WhatsApp করুন'; }
    } else if (status === "BOOKING_CLOSED") {
      statusWrap.innerHTML = `<span class="tour-status-pill closed"><i class="fas fa-lock"></i> Booking Closed</span>`;
      if (bookBtn) { bookBtn.style.background = "#64748b"; bookBtn.innerHTML = '<i class="fas fa-bell"></i> পরবর্তী ব্যাচের জন্য WhatsApp করুন'; }
    }
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
    if (selectedTourForDetails.status === "BOOKING_CLOSED") {
      const waitlistMsg = encodeURIComponent(`নমস্কার সোমজিৎ ভট্টাচার্য, আমি আপনার '${selectedTourForDetails.title}' ট্যুরের জন্য আগ্রহী। পুনরায় বুকিং ওপেন হলে অনুগ্রহ করে আমাকে জানাবেন।`);
      window.open(`https://wa.me/919433074880?text=${waitlistMsg}`, "_blank");
    } else {
      openBookingModal(selectedTourForDetails.title);
    }
  }
}

// 4. Booking Modal & Google Sheets Webhook
function populateBookingTourDropdown(data) {
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

  // 1. Save to Firebase Realtime Database
  try {
    fetch(`https://tour-with-somjit-default-rtdb.firebaseio.com/leads/${leadData.id}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadData)
    });
  } catch(err) {}

  // 2. Auto-sync to Google Sheets Webhook
  const webhookUrl = (liveSiteData && liveSiteData.contact && liveSiteData.contact.google_sheets_webhook) ? liveSiteData.contact.google_sheets_webhook : "";
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
  window.open(`https://wa.me/919433074880?text=${encodeURIComponent(waMsg)}`, "_blank");
}

// 5. Public Reviews
function openAddReviewModal() { showModal("addReviewModal"); }
function closeAddReviewModal() { hideModal("addReviewModal"); }

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
    name, phone, location: city, tour, rating, comment,
    createdAt: new Date().toISOString()
  };

  if (!liveSiteData.customer_reviews) liveSiteData.customer_reviews = [];
  liveSiteData.customer_reviews.unshift(newReview);

  renderCustomerReviews(liveSiteData);
  closeAddReviewModal();
  showPublicToast("🎉 আপনার রিভিউ সফলভাবে জমা হয়েছে!");

  try {
    fetch(`https://tour-with-somjit-default-rtdb.firebaseio.com/customer_reviews.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(liveSiteData.customer_reviews)
    });
  } catch(err) {}
}

// 6. Privacy Policy Modal
function openPrivacyModal() { showModal("privacyPolicyModal"); }
function closePrivacyModal() { hideModal("privacyPolicyModal"); }

// 7. Lightbox Modal
let currentLightboxIdx = 0;

function openLightboxModal(idx) {
  const moments = (liveSiteData && liveSiteData.moments_gallery) ? liveSiteData.moments_gallery : [];
  if (!moments.length) return;

  currentLightboxIdx = (idx >= 0 && idx < moments.length) ? idx : 0;
  updateLightboxContent();
  showModal("galleryLightboxModal");
}

function closeLightboxModal() { hideModal("galleryLightboxModal"); }

function changeLightboxImage(dir) {
  const moments = (liveSiteData && liveSiteData.moments_gallery) ? liveSiteData.moments_gallery : [];
  if (!moments.length) return;

  currentLightboxIdx = (currentLightboxIdx + dir + moments.length) % moments.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const moments = (liveSiteData && liveSiteData.moments_gallery) ? liveSiteData.moments_gallery : [];
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

// 8. Mobile Drawer Navigation & Backdrop Overlay
function openNav() {
  const drawer = document.getElementById("mobileNavDrawer");
  const backdrop = document.getElementById("drawerBackdrop");
  if (drawer) drawer.classList.add("active");
  if (backdrop) backdrop.classList.add("active");
  document.body.classList.add("nav-drawer-open");
}

function closeNav() {
  const drawer = document.getElementById("mobileNavDrawer");
  const backdrop = document.getElementById("drawerBackdrop");
  if (drawer) drawer.classList.remove("active");
  if (backdrop) backdrop.classList.remove("active");
  document.body.classList.remove("nav-drawer-open");
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

function handleModalOverlayClick(e, modalId) {
  if (e.target.id === modalId) hideModal(modalId);
}

function showPublicToast(msg) {
  const toast = document.createElement("div");
  toast.textContent = msg;
  toast.style.cssText = "position:fixed; bottom:85px; left:50%; transform:translateX(-50%); background:#0f172a; color:#fbbf24; padding:10px 22px; border-radius:50px; font-weight:700; font-size:13.5px; z-index:999999; box-shadow:0 4px 16px rgba(0,0,0,0.3); border:1px solid #f59e0b;";
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
