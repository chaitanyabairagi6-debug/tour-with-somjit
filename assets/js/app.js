/**
 * Tour with Somjit - Master Application Controller
 * Handles Tours Rendering, Redesigned Booking Form, WhatsApp Dispatch,
 * YouTube Vlogs with Modal Player, Moments Gallery, and Firebase Sync.
 */

let currentTourId = "ladakh-2026";

document.addEventListener("DOMContentLoaded", () => {
  initLiveSiteData();
  initMobileDrawer();
  initBookingModal();
  renderHomeTours();
  renderHomeVlogs();
  renderHomeFaqs();
});

// 1. Live Site Data Loader & Firebase Fallback
function initLiveSiteData() {
  const localSaved = localStorage.getItem("tws_custom_site_data");
  if (localSaved) {
    try {
      const parsed = JSON.parse(localSaved);
      deepMerge(window.TWS_SITE_DATA, parsed);
    } catch(e) {}
  }

  // Fetch real-time from Firebase
  fetch("https://tour-with-somjit-default-rtdb.firebaseio.com/site_data.json", { cache: "no-store" })
    .then(res => res.json())
    .then(cloudData => {
      if (cloudData && typeof cloudData === "object") {
        deepMerge(window.TWS_SITE_DATA, cloudData);
        localStorage.setItem("tws_custom_site_data", JSON.stringify(window.TWS_SITE_DATA));
        renderHomeTours();
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

// 2. Mobile Drawer Navigation
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

// 3. Render Tours on Homepage (Matching Screenshot 1)
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
    const imgUrl = tourImgMap[tour.id] || tour.banner_image || "assets/images/card_ladakh.jpg";
    const destName = tour.category ? tour.category.charAt(0).toUpperCase() + tour.category.slice(1) : (tour.title.split(" ")[0] || "ট্যুর");
    
    // Bengali short name for badge
    let bnShortName = destName;
    if (tour.id.includes("dooars")) bnShortName = "ডুয়ার্স";
    else if (tour.id.includes("ladakh")) bnShortName = "লাদাখ";
    else if (tour.id.includes("sundarban")) bnShortName = "সুন্দরবন";
    else if (tour.id.includes("spiti")) bnShortName = "স্পিতি";
    else if (tour.id.includes("ranchi")) bnShortName = "রাঁচি";
    else if (tour.id.includes("purulia")) bnShortName = "পুরুলিয়া";

    html += `
      <div class="tour-card-compact" onclick="openItineraryModal('${tour.id}')">
        <div class="tour-card-cover">
          <img src="${imgUrl}" alt="${tour.title}" loading="lazy">
          <div class="tour-card-dest-name">${bnShortName}</div>
        </div>
        <div class="tour-card-bottom-info">
          <div class="tour-card-dates-col">
            <div class="tour-card-dates">${tour.dates || '২০২৬'}</div>
            <div class="tour-card-duration">${tour.duration || 'গ্রুপ ট্যুর'}</div>
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

// 4. Render Vlogs on Homepage
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
  vlogs.forEach(vlog => {
    const videoId = extractYouTubeVideoId(vlog.youtube_url);
    const thumb = vlog.thumbnail_url || (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "assets/images/card_ladakh.jpg");

    html += `
      <div class="vlog-card-item" onclick="playYouTubeVideo('${videoId || ''}', '${escapeAttr(vlog.title)}')">
        <div class="vlog-thumb-wrap">
          <img src="${thumb}" alt="${escapeAttr(vlog.title)}" loading="lazy">
          <div class="vlog-play-badge">
            <i class="fab fa-youtube"></i>
          </div>
        </div>
        <div class="vlog-info-wrap">
          <h4 class="vlog-title-text">${escapeHtml(vlog.title)}</h4>
          <p class="vlog-desc-text">${escapeHtml(vlog.desc || 'সোমজিৎ ভট্টাচার্য-এর সাথে আকর্ষণীয় ভ্রমণ অভিজ্ঞতা।')}</p>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
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

// 5. Render FAQs
function renderHomeFaqs() {
  const container = document.getElementById("homeFaqContainer");
  if (!container) return;

  const siteData = window.TWS_SITE_DATA || {};
  const faqs = siteData.faqs || [];

  let html = "";
  faqs.forEach((faq, idx) => {
    html += `
      <div class="faq-item-card" id="faqCard_${idx}">
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

// 6. Moments Gallery Horizontal Scroll
function scrollMoments(direction) {
  const track = document.getElementById("momentsTrack");
  if (track) {
    track.scrollBy({ left: direction * 180, behavior: "smooth" });
  }
}

// 7. Redesigned Booking Modal & WhatsApp Dispatch (Matching Screenshot 2)
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

// 8. Itinerary Modal
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

function escapeHtml(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(str) {
  return String(str || '').replace(/"/g, '&quot;');
}


function openPrivacyModal() {
  const modal = document.getElementById("privacyModal");
  if (modal) modal.classList.add("active");
}

function closePrivacyModal() {
  const modal = document.getElementById("privacyModal");
  if (modal) modal.classList.remove("active");
}
