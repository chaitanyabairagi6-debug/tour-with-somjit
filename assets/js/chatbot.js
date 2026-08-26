/**
 * Tour with Somjit - Intelligent AI Travel Companion & Storyteller Engine
 * - Persona: Creator Somjit Bhattacharya (Warm, Respectful, Witty, Adventurous, Narrative Storyteller)
 * - Male Storytelling Voice (Bengali & English) with calm cadence & deliberate pauses
 * - Expert Travel & High-Altitude Advisory (Weather, 3-Layer Gear, AMS, Routes, Senior Care)
 * - Enthusiastic Handling of Unlisted / New Tour Destinations
 * - Grounded Website Database & Admin Firebase FAQ Training Priority
 * - Live Lead Capture & Chat Logging to Firebase Realtime Database
 */

(function() {
  const FIREBASE_DB_URL = "https://tour-with-somjit-default-rtdb.firebaseio.com";
  const CHAT_SESSION_ID = "session_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7);

  let isSpeechEnabled = true;
  let recognition = null;
  let isListening = false;
  let isChatOpen = false;
  let currentDetectedLang = 'bn'; // 'bn' or 'en'

  // Admin Custom FAQs Cache
  window.TWS_CUSTOM_FAQS = [];

  // 1. Fetch Admin Trained FAQs from Firebase
  async function fetchCustomFaqsFromFirebase() {
    try {
      const resp = await fetch(`${FIREBASE_DB_URL}/ai_custom_faqs.json`, { cache: 'no-store' });
      if (resp.ok) {
        const data = await resp.json();
        if (data && typeof data === "object") {
          window.TWS_CUSTOM_FAQS = Array.isArray(data) ? data : Object.values(data);
        }
      }
    } catch(e) {}
  }

  // 2. Language Detection
  function detectLanguage(text) {
    if (!text) return 'bn';
    const bnChars = (text.match(/[\u0980-\u09FF]/g) || []).length;
    const enWords = (text.match(/[a-zA-Z]{2,}/g) || []).length;
    if (bnChars > 0 && bnChars >= enWords) return 'bn';
    if (enWords > 0 && enWords > bnChars) return 'en';
    return 'bn';
  }

  // 3. Initialize Chatbot DOM
  function initChatbotUI() {
    if (document.getElementById("twsChatbotRoot")) return;

    fetchCustomFaqsFromFirebase();

    const root = document.createElement("div");
    root.id = "twsChatbotRoot";
    root.innerHTML = `
      <!-- Desktop Floating Launcher Button -->
      <div id="twsChatbotLauncher" class="tws-chatbot-launcher" title="সোমজিৎ এআই ট্রাভেল কম্প্যানিয়ন ও চ্যাট">
        <div class="tws-launcher-bubble">
          <span class="badge-ai"><i class="fas fa-sparkles"></i> এআই</span>
          <span>ভয়েস ও আড্ডায় কথা বলুন</span>
        </div>
        <div class="tws-launcher-btn">
          <img src="assets/images/somjit_host.jpg" alt="Somjit AI" class="tws-launcher-avatar" onerror="this.src='assets/images/somjit_avatar.png'">
          <div class="tws-launcher-status-dot"></div>
          <div class="tws-launcher-mic-icon"><i class="fas fa-microphone"></i></div>
        </div>
      </div>

      <!-- Chat Window -->
      <div id="twsChatWindow" class="tws-chat-window">
        <!-- Header -->
        <div class="tws-chat-header">
          <div class="tws-header-info">
            <img src="assets/images/somjit_host.jpg" alt="Somjit AI" class="tws-header-avatar" onerror="this.src='assets/images/somjit_avatar.png'">
            <div class="tws-header-text">
              <h3>সোমজিৎ ভট্টাচার্য (এআই ট্রাভেল বাডি)</h3>
              <span><i class="fas fa-circle" style="font-size:0.5rem;"></i> অনলাইন • গল্প, ট্রাভেল গাইড ও ভয়েস চ্যাট</span>
            </div>
          </div>
          <div class="tws-header-actions">
            <button id="twsSpeakerToggleBtn" class="tws-header-btn active-speaker" title="ভয়েস উত্তর চালু/বন্ধ">
              <i class="fas fa-volume-up"></i>
            </button>
            <button id="twsCloseChatBtn" class="tws-header-btn" title="চ্যাট বন্ধ করুন">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>

        <!-- Messages Area -->
        <div id="twsChatMessages" class="tws-chat-messages">
          <!-- Bot Welcome Message -->
          <div class="tws-msg-row bot">
            <img src="assets/images/somjit_host.jpg" alt="Somjit AI" class="tws-msg-avatar" onerror="this.src='assets/images/somjit_avatar.png'">
            <div class="tws-msg-bubble">
              নমস্কার! 🙏 আমি <strong>সোমজিৎ ভট্টাচার্য</strong>-এর অফিশিয়াল <strong>এআই ট্রাভেল কম্প্যানিয়ন ও অ্যাসিস্ট্যান্ট</strong>।<br><br>
              ভ্রমণ মানে তো শুধু জায়গা ঘোরা নয়, নতুন মানুষ চেনা আর গল্প জমানো! আমাদের ২০২৬ সালের লাদাখ, সুন্দরবন ইলিশ উৎসব, স্পিতি ভ্যালি কিংবা পাহাড়ি ভ্রমণের প্রস্তুতি ও নিরাপত্তা নিয়ে আপনার যেকোনো প্রশ্ন করুন।<br><br>
              নিচে <strong>মাইক বোতাম</strong> চেপে সরাসরি বাংলায় কথা বলুন বা ইংরেজিতেও প্রশ্ন করতে পারেন!
              
              <div class="tws-chat-actions">
                <button class="tws-action-pill" onclick="twsSendPreset('সোমজিতদা কেমন আছেন? আপনার ভিডিও দারুণ লাগে!')"><i class="fas fa-smile-beam"></i> কেমন আছেন সোমজিৎদা?</button>
                <button class="tws-action-pill" onclick="twsSendPreset('৬০ বছর বয়সে কি লাদাখ যাওয়া নিরাপদ ও কী কী সতর্কতা?')"><i class="fas fa-heartbeat"></i> ৬০ বছর বয়সে লাদাখ?</button>
                <button class="tws-action-pill" onclick="twsSendPreset('লাদাখ ও পাহাড়ি ভ্রমণের পোশাক ও মেডিসিন গাইড দিন')"><i class="fas fa-hiking"></i> পাহাড়ি ট্রিপের প্রস্তুতি</button>
                <button class="tws-action-pill" onclick="twsSendPreset('সোমজিৎ ভট্টাচার্যের সঙ্গে ঘোরার স্পেশাল সুবিধা কী?')"><i class="fas fa-star"></i> সোমজিৎদার সাথে সুবিধা</button>
                <button class="tws-action-pill book" onclick="twsSendPreset('আসন্ন ২০২৬ গ্রুপ ট্যুর শিডিউল ও সিট বুকিং নিয়ম')"><i class="fas fa-calendar-alt"></i> ২০২৬ ট্যুর ক্যালেন্ডার</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Chips Bar -->
        <div class="tws-chat-chips">
          <button class="tws-chip-btn" onclick="twsSendPreset('মেঘালয় বা সিকিমে কি আপনার কোনো গ্রুপ ট্যুর হবে?')">🌄 অন্যান্য নতুন গন্তব্য</button>
          <button class="tws-chip-btn" onclick="twsSendPreset('লাদাখ মহাবিস্ময় ট্যুর ২০২৬-এর খরচ ও বিশেষ সুবিধা')">🏔️ লাদাখ ২০২৬</button>
          <button class="tws-chip-btn" onclick="twsSendPreset('সুন্দরবন ইলিশ উৎসবের মেনু ও প্যাকেজ বিবরণ')">🐟 ইলিশ উৎসব মেনু</button>
          <button class="tws-chip-btn" onclick="twsSendPreset('পাহাড়ের উচ্চতায় AMS ও ঠান্ডার প্রস্তুতি')">🛡️ AMS ও ফার্স্ট এইড</button>
          <button class="tws-chip-btn" onclick="twsSendPreset('Is Ladakh safe for senior citizens?')">🇬🇧 English Advisory</button>
          <button class="tws-chip-btn" onclick="twsSendPreset('সোমজিৎ ভট্টাচার্য-এর অফিস ও ফোন নম্বর')">📍 অফিস ও হেল্পলাইন</button>
        </div>

        <!-- Voice Listening Wave Bar -->
        <div id="twsVoiceIndicator" class="tws-voice-indicator">
          <span><i class="fas fa-microphone-alt"></i> আপনার কথা শুনছি, বলুন... / Listening...</span>
          <div class="tws-wave-bars">
            <div class="tws-wave-bar"></div>
            <div class="tws-wave-bar"></div>
            <div class="tws-wave-bar"></div>
            <div class="tws-wave-bar"></div>
          </div>
        </div>

        <!-- Input Bar -->
        <div class="tws-chat-input-bar">
          <input type="text" id="twsChatInput" class="tws-chat-input" placeholder="বাংলা বা ইংরেজিতে প্রশ্ন লিখুন বা মাইকে বলুন..." autocomplete="off">
          <button id="twsMicBtn" class="tws-chat-mic-btn" title="মাইক চেপে মুখে কথা বলুন">
            <i class="fas fa-microphone"></i>
          </button>
          <button id="twsSendBtn" class="tws-chat-send-btn" title="বার্তা পাঠান">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(root);
    setupChatListeners();
    initSpeechRecognition();
  }

  // 4. Setup Listeners
  function setupChatListeners() {
    const launcher = document.getElementById("twsChatbotLauncher");
    const closeBtn = document.getElementById("twsCloseChatBtn");
    const sendBtn = document.getElementById("twsSendBtn");
    const input = document.getElementById("twsChatInput");
    const micBtn = document.getElementById("twsMicBtn");
    const speakerBtn = document.getElementById("twsSpeakerToggleBtn");

    if (launcher) launcher.addEventListener("click", () => toggleChatWindow());
    if (closeBtn) closeBtn.addEventListener("click", () => toggleChatWindow(false));

    if (sendBtn) sendBtn.addEventListener("click", handleUserSubmit);
    if (input) {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleUserSubmit();
      });
    }

    if (micBtn) micBtn.addEventListener("click", toggleVoiceRecognition);
    if (speakerBtn) speakerBtn.addEventListener("click", toggleSpeaker);
  }

  window.twsOpenChatbot = function(forceOpen = true) {
    const win = document.getElementById("twsChatWindow");
    if (!win) return;
    isChatOpen = forceOpen;
    win.classList.toggle("active", isChatOpen);

    if (isChatOpen) {
      fetchCustomFaqsFromFirebase();
      setTimeout(() => {
        const inp = document.getElementById("twsChatInput");
        if (inp && window.innerWidth > 768) inp.focus();
      }, 300);
    }
  };

  function toggleChatWindow(state) {
    const nextState = state !== undefined ? state : !isChatOpen;
    window.twsOpenChatbot(nextState);
  }

  function toggleSpeaker() {
    isSpeechEnabled = !isSpeechEnabled;
    const btn = document.getElementById("twsSpeakerToggleBtn");
    if (btn) {
      btn.classList.toggle("active-speaker", isSpeechEnabled);
      btn.innerHTML = isSpeechEnabled ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
      btn.title = isSpeechEnabled ? "ভয়েস উত্তর চালু রয়েছে" : "ভয়েস উত্তর বন্ধ রয়েছে";
    }
    if (!isSpeechEnabled && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  // 5. Speech Recognition (Speech-to-Text)
  function initSpeechRecognition() {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) return;

    recognition = new SpeechRec();
    recognition.lang = "bn-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      isListening = true;
      const micBtn = document.getElementById("twsMicBtn");
      const indicator = document.getElementById("twsVoiceIndicator");
      if (micBtn) micBtn.classList.add("listening");
      if (indicator) indicator.classList.add("active");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const input = document.getElementById("twsChatInput");
      if (input) {
        input.value = transcript;
        handleUserSubmit();
      }
    };

    recognition.onerror = () => stopListening();
    recognition.onend = () => stopListening();
  }

  function toggleVoiceRecognition() {
    if (!recognition) {
      alert("আপনার ব্রাউজারে স্পিচ রিকগনিশন সক্রিয় নেই। অনুগ্রহ করে গুগল ক্রোম বা মাইক্রোসফট এজ ব্রাউজার ব্যবহার করুন।");
      return;
    }
    if (isListening) {
      recognition.stop();
      stopListening();
    } else {
      try {
        recognition.lang = currentDetectedLang === 'en' ? 'en-IN' : 'bn-IN';
        recognition.start();
      } catch(e) {
        recognition.stop();
      }
    }
  }

  function stopListening() {
    isListening = false;
    const micBtn = document.getElementById("twsMicBtn");
    const indicator = document.getElementById("twsVoiceIndicator");
    if (micBtn) micBtn.classList.remove("listening");
    if (indicator) indicator.classList.remove("active");
  }

  // 6. Speech Synthesis (Male Storytelling Voice - Bengali & English)
  function speakMaleVoice(text, lang = 'bn') {
    if (!isSpeechEnabled || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const cleanText = text.replace(/<[^>]*>/g, "").replace(/[*#_✓📌•👉▶️]/g, "").replace(/https?:\/\/\S+/g, "").trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const voices = window.speechSynthesis.getVoices();

    if (lang === 'en') {
      utterance.lang = "en-IN";
      utterance.rate = 0.90;  // Calm narrative pace
      utterance.pitch = 0.84; // Warm, mature masculine pitch

      const maleEnVoice = voices.find(v => 
        (v.lang.includes("en") || v.lang.includes("ENG")) && 
        (v.name.toLowerCase().includes("male") || v.name.toLowerCase().includes("david") || v.name.toLowerCase().includes("guy") || v.name.toLowerCase().includes("pradeep") || v.name.toLowerCase().includes("ravi") || v.name.toLowerCase().includes("george"))
      ) || voices.find(v => v.lang.includes("en-IN")) || voices.find(v => v.lang.includes("en"));
      if (maleEnVoice) utterance.voice = maleEnVoice;
    } else {
      utterance.lang = "bn-IN";
      utterance.rate = 0.88;  // Calm, deliberate storytelling pacing
      utterance.pitch = 0.82; // Warm, deep, friendly Bengali male voice

      const maleBnVoice = voices.find(v => 
        v.lang.includes("bn") && 
        (v.name.toLowerCase().includes("male") || v.name.toLowerCase().includes("bashkar") || v.name.toLowerCase().includes("somjit") || v.name.toLowerCase().includes("google বাংলা"))
      ) || voices.find(v => v.lang.includes("bn")) || voices.find(v => v.lang.includes("IN"));
      if (maleBnVoice) utterance.voice = maleBnVoice;
    }

    window.speechSynthesis.speak(utterance);
  }

  // 7. Preset trigger
  window.twsSendPreset = function(text) {
    if (!isChatOpen) window.twsOpenChatbot(true);
    const input = document.getElementById("twsChatInput");
    if (input) input.value = text;
    handleUserSubmit();
  };

  // 8. Handle Submission
  function handleUserSubmit() {
    const input = document.getElementById("twsChatInput");
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    input.value = "";
    currentDetectedLang = detectLanguage(text);
    appendMessage("user", text);

    setTimeout(() => {
      const replyObj = generateGroundedAnswer(text, currentDetectedLang);
      appendMessage("bot", replyObj.html, replyObj.voiceText, replyObj.lang);
      logChatToFirebase(text, replyObj.voiceText);
    }, 350);
  }

  function appendMessage(sender, htmlContent, voiceText = "", lang = 'bn') {
    const container = document.getElementById("twsChatMessages");
    if (!container) return;

    const timeStr = new Date().toLocaleTimeString(lang === 'en' ? "en-US" : "bn-BD", { hour: '2-digit', minute: '2-digit' });
    const row = document.createElement("div");
    row.className = `tws-msg-row ${sender}`;

    if (sender === "bot") {
      row.innerHTML = `
        <img src="assets/images/somjit_host.jpg" alt="Somjit AI" class="tws-msg-avatar" onerror="this.src='assets/images/somjit_avatar.png'">
        <div class="tws-msg-bubble">
          ${htmlContent}
          <div class="tws-msg-time">${timeStr}</div>
        </div>
      `;
      if (voiceText) {
        speakMaleVoice(voiceText, lang);
      }
    } else {
      row.innerHTML = `
        <div class="tws-msg-bubble">
          ${escapeHtml(htmlContent)}
          <div class="tws-msg-time" style="color:rgba(255,255,255,0.7);">${timeStr}</div>
        </div>
      `;
    }

    container.appendChild(row);
    container.scrollTop = container.scrollHeight;
  }

  // 9. Master Grounded Knowledge Engine with Somjit Persona & Advisory
  function generateGroundedAnswer(rawQuery, lang = 'bn') {
    const query = rawQuery.toLowerCase();
    const isEn = lang === 'en';
    const tours = window.TOURS_DATA || (window.TWS_SITE_DATA ? window.TWS_SITE_DATA.tours : null) || {};

    // PRIORITY 1: Check Admin Custom Trained FAQs from Firebase
    if (window.TWS_CUSTOM_FAQS && Array.isArray(window.TWS_CUSTOM_FAQS)) {
      for (const faq of window.TWS_CUSTOM_FAQS) {
        if (!faq || !faq.question || !faq.answer) continue;
        const qText = faq.question.toLowerCase().trim();
        const kwList = (faq.keywords || "").toLowerCase().split(/[\s,]+/).filter(k => k.length > 2);
        
        let isMatch = query.includes(qText);
        if (!isMatch && kwList.length > 0) {
          const matchCount = kwList.filter(kw => query.includes(kw)).length;
          if (matchCount >= 2 || (kwList.length === 1 && matchCount === 1)) {
            isMatch = true;
          }
        }

        if (isMatch) {
          const customHtml = `
            <strong>🎯 ${escapeHtml(faq.question)}</strong><br><br>
            ${escapeHtml(faq.answer).replace(/\n/g, '<br>')}
            <div class="tws-chat-actions">
              <a href="https://wa.me/919433074880" target="_blank" class="tws-action-pill wa"><i class="fab fa-whatsapp"></i> WhatsApp</a>
              <a href="tel:+919433074880" class="tws-action-pill"><i class="fas fa-phone-alt"></i> কল করুন</a>
            </div>
          `;
          return { html: customHtml, voiceText: faq.answer, lang: isEn ? 'en' : 'bn' };
        }
      }
    }

    // PRIORITY 2: Greetings, Compliments & Somjit Bonding (আড্ডা, শুভেচ্ছা ও ভিডিও প্রশংসা)
    if (query.includes("কেমন আছেন") || query.includes("সোমজিত বাবু") || query.includes("somjit babu") || query.includes("ভিডিও দেখি") || query.includes("ভিডিওগুলো দেখি") || query.includes("ঘুরতে চাই") || query.includes("দেখা করব") || query.includes("ভালোবাসি") || query.includes("fan") || query.includes("ভক্ত") || query.includes("hello somjit") || query.includes("hi somjit") || (query.startsWith("নমস্কার") && query.length < 25) || (query.startsWith("hello") && query.length < 15)) {
      if (isEn) {
        const html = `
          নমস্কার! Hello my fellow travel friend! 😊<br><br>
          It warms my heart so much to hear your love and that you follow our travel adventures! Your continuous love and encouragement is truly the fuel that inspires us to pack our bags and explore every hidden corner of our incredible country.<br><br>
          I would love to meet you in person and have hearty travel addas on one of our upcoming group trips! Are you planning to visit any special destination soon?
          
          <div class="tws-chat-actions">
            <button class="tws-action-pill" onclick="twsSendPreset('আসন্ন ২০২৬ গ্রুপ ট্যুর শিডিউল')"><i class="fas fa-calendar-alt"></i> 2026 Tour Calendar</button>
            <a href="https://wa.me/919433074880?text=Hello%20Somjit,%20I%20love%20your%20videos%20and%20want%20to%20connect!" target="_blank" class="tws-action-pill wa"><i class="fab fa-whatsapp"></i> Connect on WhatsApp</a>
          </div>
        `;
        const voiceText = `নমস্কার! শুনে ভীষণ ভালো লাগলো যে আপনি আমার ট্রাভেল ভিডিওগুলো দেখেন। আপনাদের এই ভালোবাসা আর উৎসাহই তো নতুন নতুন জায়গায় ছুটে যাওয়ার আসল শক্তি! খুব শীঘ্রই আমাদের কোনো এক গ্রুপ ট্রিপে আপনার সাথে সামনাসামনি দেখা আর জমিয়ে আড্ডা হবে আশা করছি। আপনি এখন কোনো বিশেষ জায়গায় যাওয়ার প্ল্যান করছেন নাকি?`;
        return { html, voiceText, lang: 'en' };
      } else {
        const html = `
          নমস্কার! শুনে ভীষণ ভালো লাগলো যে আপনি আমার ট্রাভেল ভিডিওগুলো নিয়মিত দেখেন! 😊🙏<br><br>
          আপনাদের এই আন্তরিক ভালোবাসা, সুন্দর কমেন্টস আর উৎসাহই তো ব্যাকপ্যাক গুছিয়ে নতুন নতুন অদেখা জায়গায় ছুটে যাওয়ার আসল শক্তি! খুব শীঘ্রই আমাদের কোনো এক সিগনেচার গ্রুপ ট্রিপে আপনার সাথে সামনাসামনি দেখা হবে আর ট্রাভেল নিয়ে জমিয়ে আড্ডা হবে আশা করছি।<br><br>
          আপনি কি এখন কোনো বিশেষ জায়গায় যাওয়ার প্ল্যান করছেন? আমাকে বলুন, সেরা গাইড দিয়ে সাহায্য করছি!
          
          <div class="tws-chat-actions">
            <button class="tws-action-pill" onclick="twsSendPreset('আসন্ন ২০২৬ গ্রুপ ট্যুর শিডিউল')"><i class="fas fa-calendar-alt"></i> ২০২৬ ট্যুর ক্যালেন্ডার</button>
            <a href="https://wa.me/919433074880?text=নমস্কার%20সোমজিৎদা,%20আপনার%20ভিডিও%20দারুণ%20লাগে!" target="_blank" class="tws-action-pill wa"><i class="fab fa-whatsapp"></i> WhatsApp-এ আড্ডা</a>
          </div>
        `;
        const voiceText = `নমস্কার! শুনে ভীষণ ভালো লাগলো যে আপনি আমার ট্রাভেল ভিডিওগুলো দেখেন। আপনাদের এই ভালোবাসা আর উৎসাহই তো নতুন নতুন জায়গায় ছুটে যাওয়ার আসল শক্তি! খুব শীঘ্রই আমাদের কোনো এক গ্রুপ ট্রিপে আপনার সাথে সামনাসামনি দেখা আর জমিয়ে আড্ডা হবে আশা করছি। আপনি এখন কোনো বিশেষ জায়গায় যাওয়ার প্ল্যান করছেন নাকি?`;
        return { html, voiceText, lang: 'bn' };
      }
    }

    // PRIORITY 3: Handling Unlisted / New Tour Destinations (তালিকাবহির্ভূত নতুন জায়গার জিজ্ঞাসা)
    const unlistedDestinations = [
      "মেঘালয়", "meghalaya", "শিলং", "shillong", "আন্দামান", "andaman", "ভুটান", "bhutan", 
      "অরুণাচল", "arunachal", "সিকিম", "sikkim", "দার্জিলিং", "darjeeling", "কাশ্মীর", "kashmir", 
      "গোয়া", "goa", "কেরালা", "kerala", "বালি", "bali", "থাইল্যান্ড", "thailand", "নেপাল", "nepal", 
      "রাজস্থান", "rajasthan", "উত্তরাখণ্ড", "uttarakhand", "লাক্ষাদ্বীপ", "lakshadweep", "ভিয়েতনাম", "vietnam"
    ];

    const matchedUnlisted = unlistedDestinations.find(d => query.includes(d));
    if (matchedUnlisted) {
      if (isEn) {
        const html = `
          <strong>🌄 What a fantastic destination!</strong><br><br>
          Honestly speaking, beyond our regular signature tours, we are very seriously planning exciting group trips to this wonderful destination! Our team has a full roadmap in progress to curate an unforgettable experience here soon.<br><br>
          Please connect with us on WhatsApp or leave your contact details—the moment our detailed itinerary, dates, and roadmap are finalized, we will gladly inform you first before public release!
          
          <div class="tws-chat-actions">
            <a href="https://wa.me/919433074880?text=Hello%20Somjit,%20please%20notify%20me%20when%20trips%20to%20${matchedUnlisted}%20are%20announced!" target="_blank" class="tws-action-pill wa"><i class="fab fa-whatsapp"></i> Notify Me on WhatsApp</a>
            <button class="tws-action-pill book" onclick="twsSendPreset('আসন্ন ২০২৬ গ্রুপ ট্যুর শিডিউল')"><i class="fas fa-mountain"></i> Check Active 2026 Tours</button>
          </div>
        `;
        const voiceText = `আরে দারুণ একটি জায়গার কথা বললেন তো! সত্যি বলতে আমাদের নিয়মিত ট্যুরগুলোর বাইরে এই চমৎকার জায়গাটি নিয়েও আমরা সিরিয়াসলি ভাবনা-চিন্তা করছি। খুব শীঘ্রই আপনাদের পছন্দের এই রুটে একটি দারুণ গ্রুপ ট্যুর আয়োজন করার পুরো পরিকল্পনা রয়েছে। আপনি দয়া করে আমাদের হোয়াটসঅ্যাপে একটু যুক্ত থাকুন বা আপনার কন্টাক্ট ডিটেইলস দিয়ে রাখুন—আমাদের সমস্ত প্ল্যান ও রোডম্যাপ রেডি হওয়ামাত্রই আমরা সবার আগে আপনাকে ইনফর্ম করে দেবো!`;
        return { html, voiceText, lang: 'en' };
      } else {
        const html = `
          <strong>🌄 আরে দারুণ একটি জায়গার কথা বললেন তো!</strong><br><br>
          সত্যি বলতে আমাদের নিয়মিত ট্যুরগুলোর বাইরে এই চমৎকার জায়গাটি নিয়েও আমরা সিরিয়াসলি ভাবনা-চিন্তা করছি। খুব শীঘ্রই ভ্রমণপিপাসু বন্ধুদের পছন্দের এই রুটেও একটি জমজমাট সিগনেচার গ্রুপ ট্যুর আয়োজন করার পুরো পরিকল্পনা রয়েছে!<br><br>
          আপনি দয়া করে আমাদের হোয়াটসঅ্যাপে একটু যুক্ত থাকুন বা নিচে আপনার কন্টাক্ট দিয়ে রাখুন—আমাদের সমস্ত প্ল্যান, বাজেট ও রোডম্যাপ রেডি হওয়ামাত্রই আমরা সবার আগে আপনাকে ইনফর্ম করে দেবো!
          
          <div class="tws-chat-actions">
            <a href="https://wa.me/919433074880?text=নমস্কার%20সোমজিৎদা,%20নতুন%20ট্যুর%20প্ল্যান%20হলে%20আমাকে%20জানাবেন।" target="_blank" class="tws-action-pill wa"><i class="fab fa-whatsapp"></i> WhatsApp-এ নাম নথিভুক্ত করুন</a>
            <button class="tws-action-pill book" onclick="twsSendPreset('আসন্ন ২০২৬ গ্রুপ ট্যুর শিডিউল')"><i class="fas fa-mountain"></i> বর্তমান ২০২৬ ট্যুর দেখুন</button>
          </div>
        `;
        const voiceText = `আরে দারুণ একটি জায়গার কথা বললেন তো! সত্যি বলতে আমাদের নিয়মিত ট্যুরগুলোর বাইরে এই চমৎকার জায়গাটি নিয়েও আমরা সিরিয়াসলি ভাবনা-চিন্তা করছি। খুব শীঘ্রই আপনাদের পছন্দের এই রুটে একটি দারুণ গ্রুপ ট্যুর আয়োজন করার পুরো পরিকল্পনা রয়েছে। আপনি দয়া করে আমাদের হোয়াটসঅ্যাপে একটু যুক্ত থাকুন বা আপনার কন্টাক্ট ডিটেইলস দিয়ে রাখুন—আমাদের সমস্ত প্ল্যান ও রোডম্যাপ রেডি হওয়ামাত্রই আমরা সবার আগে আপনাকে ইনফর্ম করে দেবো!`;
        return { html, voiceText, lang: 'bn' };
      }
    }

    // PRIORITY 4: Expert High-Altitude & Tough Terrain Advisory (পোশাক, আবহাওয়া, ফার্স্ট এইড ও AMS গাইড)
    if (query.includes("পোশাক") || query.includes("জ্যাকেট") || query.includes("gear") || query.includes("packing") || query.includes("clothes") || query.includes("ams") || query.includes("ফার্স্ট এইড") || query.includes("first aid") || query.includes("মেডিসিন") || query.includes("medicine") || query.includes("diamox") || query.includes("ডায়ামক্স") || query.includes("প্রস্তুতি") || query.includes("উচ্চতা") || query.includes("খাবার")) {
      if (isEn) {
        const html = `
          <strong>🏔️ Expert Travel Advisory & Packing Checklist for High Altitudes (Ladakh / Spiti):</strong><br><br>
          
          🌤️ <strong>1. Weather & Best Season:</strong><br>
          • <strong>Best Window:</strong> May to September. Day temperatures are pleasant (15°C–20°C), but night temperatures can plunge near freezing (0°C to -4°C) with sudden wind chills at Khardung La & Chang La.<br><br>
          
          🧥 <strong>2. 3-Layer Clothing Rule:</strong><br>
          • <em>Base Layer:</em> Quality thermal innerwear (top & bottom).<br>
          • <em>Mid Layer:</em> Warm fleece jacket or woolen sweater.<br>
          • <em>Outer Layer:</em> Windproof & waterproof heavy down jacket.<br>
          • <em>Accessories:</em> UV400 sunglasses, high-SPF 50+ sunscreen, lip balm, woolen gloves, and sturdy trekking shoes.<br><br>
          
          🩺 <strong>3. AMS Prevention & Medical Kit:</strong><br>
          • <strong>Acclimatization:</strong> First 24–48 hours in Leh strictly dedicated to relaxed rest (no climbing stairs or running).<br>
          • <strong>Essential Kit:</strong> Diamox (consult your physician), ORS/Electrolytes for constant hydration, Paracetamol, Vomistop, pain spray, and Band-Aids.<br>
          • <strong>Safety Backup:</strong> Every vehicle in our group carries a dedicated hospital-grade large oxygen cylinder.<br><br>
          
          🛣️ <strong>4. Route & Contingency:</strong><br>
          • We always prioritize the Srinagar–Leh Highway for gradual ascent and maintain buffer contingency in itineraries.
          
          <div class="tws-chat-actions">
            <button class="tws-action-pill book" onclick="openItineraryModal('ladakh-2026')"><i class="fas fa-map-marked-alt"></i> View Ladakh Itinerary</button>
            <a href="https://wa.me/919433074880" target="_blank" class="tws-action-pill wa"><i class="fab fa-whatsapp"></i> Ask Somjit on WhatsApp</a>
          </div>
        `;
        const voiceText = `High altitude trips require smart preparation. Follow the three-layer clothing rule with thermals, fleece, and down jackets. For AMS prevention, take total rest during the first two days in Leh and stay hydrated. Our group vehicles always carry hospital-grade large oxygen cylinders for your safety.`;
        return { html, voiceText, lang: 'en' };
      } else {
        const html = `
          <strong>🏔️ পাহাড়ি ও লাদাখ-স্পিতি ভ্রমণের বিশেষজ্ঞ প্রস্তুতি ও সেফটি গাইড:</strong><br><br>
          
          🌤️ <strong>১. আবহাওয়া ও সেরা সময়:</strong><br>
          • লাদাখের সেরা সময় হলো <strong>মে থেকে সেপ্টেম্বর</strong>। দিনে মিষ্টি রোদ ও মনোরম তাপমাত্রা (১৫-২০° সে.) থাকলেও রাত নামলেই তাপমাত্রা হিমাঙ্কের কাছে নেমে যায়। খারদুংলা বা চাংলা পাসে যেকোনো মুহূর্তে দমকা ঠান্ডা হাওয়া বা তুষারপাত হতে পারে।<br><br>
          
          🧥 <strong>২. পোশাকের 'থ্রি-লেয়ার' নিয়ম:</strong><br>
          • <em>প্রথম লেয়ার:</em> ভালো কোয়ালিটির থার্মাল ইনার (টপ ও বটম)।<br>
          • <em>দ্বিতীয় লেয়ার:</em> ফ্লিস জ্যাকেট বা উলের সোয়েটার।<br>
          • <em>তৃতীয় লেয়ার:</em> উইন্ডপ্রুফ ও ওয়াটারপ্রুফ ভারী ডাউন জ্যাকেট।<br>
          • <em>অতিরিক্ত:</em> UV সানগ্লাস, ৫০+ SPF সানস্ক্রিন, লিপবাম, উলের গ্লাভস ও গ্রিপযুক্ত ট্রেকিং জুতো।<br><br>
          
          🩺 <strong>৩. ফার্স্ট এইড ও AMS (উচ্চতাজনিত সমস্যা) সতর্কতা:</strong><br>
          • <strong>অ্যাক্লিমাটাইজেশন:</strong> লেহ-তে পৌঁছে প্রথম ২৪ থেকে ৪৮ ঘণ্টা সম্পূর্ণ বিশ্রাম নিতে হবে (দৌড়াদৌড়ি বা সিঁড়ি ভাঙা বারণ)।<br>
          • <strong>প্রয়োজনীয় ওষুধ:</strong> ডাক্তারের পরামর্শে ডায়ামক্স (Diamox), প্রচুর ওআরএস (ORS) বা ইলেকট্রোলাইট জল, প্যারাসিটামল, বমির ওষুধ ও পেইন স্প্রে।<br>
          • <strong>আমাদের ব্যাকআপ:</strong> আমাদের প্রতিটি গাড়িতেই থাকে <strong>হাসপাতাল গ্রেড বড় অক্সিজেন সিলিন্ডার</strong> এবং পরিবার পিছু পোর্টেবল ক্যান।
          
          <div class="tws-chat-actions">
            <button class="tws-action-pill book" onclick="openItineraryModal('ladakh-2026')"><i class="fas fa-map-marked-alt"></i> সম্পূর্ণ লাদাখ রুট</button>
            <a href="https://wa.me/919433074880?text=নমস্কার%20সোমজিৎদা,%20লাদাখ%20ট্যুরের%20প্রস্তুতি%20সম্পর্কে%20জানতে%20চাই।" target="_blank" class="tws-action-pill wa"><i class="fab fa-whatsapp"></i> WhatsApp পরামর্শ</a>
          </div>
        `;
        const voiceText = `পাহাড়ি ট্রিপে সবসময় থ্রি-লেয়ার পোশাকের নিয়ম মেনে চলুন। থার্মাল ইনার, ফ্লিস এবং উইন্ডপ্রুফ ডাউন জ্যাকেট সাথে রাখবেন। উচ্চতায় উঠলে প্রথম দু'দিন বিশ্রাম নেওয়া ও প্রচুর জল খাওয়া খুব জরুরি। আমাদের প্রতিটি গাড়িতে বড় অক্সিজেন সিলিন্ডারের পূর্ণ ব্যাকআপ থাকে।`;
        return { html, voiceText, lang: 'bn' };
      }
    }

    // PRIORITY 5: Senior Citizen Advisory (৬০ বছর বয়সে লাদাখ যাওয়া কি ঠিক হবে?)
    if (query.includes("৬০") || query.includes("60") || query.includes("senior") || query.includes("বয়স") || query.includes("age") || query.includes("প্রবীণ") || query.includes("অসুস্থ") || query.includes("হার্ট") || query.includes("প্রেসার")) {
      if (isEn) {
        const html = `
          <strong>🛡️ Senior Citizen Safety & Health Advisory (Ladakh / Spiti):</strong><br><br>
          Yes, senior citizens can travel very comfortably with us! Our tours are specially designed with family and senior safety in mind:<br><br>
          ✓ <strong>Hospital-Grade Oxygen Cylinders:</strong> Fitted in every vehicle plus portable oxygen cans per family.<br>
          ✓ <strong>Relaxed Acclimatization:</strong> 2 days of zero-rush rest in Leh to adapt naturally.<br>
          ✓ <strong>Fair Tempo Seat Rotation:</strong> Seniors are never placed in bumpy rear seats.<br>
          ✓ <strong>Personal Host Guidance:</strong> Somjit personally monitors everyone's health and pulse oximeter readings.<br><br>
          💡 <em>Medical Tip:</em> If you have preexisting cardiovascular or high blood pressure conditions, please carry routine medications and consult your personal physician before departure.
          
          <div class="tws-chat-actions">
            <button class="tws-action-pill" onclick="openItineraryModal('ladakh-2026')"><i class="fas fa-map-marked-alt"></i> View Ladakh Itinerary</button>
            <a href="https://wa.me/919433074880" target="_blank" class="tws-action-pill wa"><i class="fab fa-whatsapp"></i> Chat on WhatsApp</a>
          </div>
        `;
        const voiceText = `Yes, senior citizens can comfortably join our tours. We carry hospital-grade large oxygen cylinders in every vehicle, ensure a 2-day gradual acclimatization in Leh, and provide fair seat rotation so seniors never get bad rear seats. Somjit Bhattacharyya personally takes care of every traveler.`;
        return { html, voiceText, lang: 'en' };
      } else {
        const html = `
          <strong>🛡️ প্রবীণ ও ৬০+ বয়সে লাদাখ ভ্রমণের নিরাপত্তা পরামর্শ:</strong><br><br>
          হ্যাঁ, ৬০ বছর বয়সে বা যেকোনো বয়সেই আমাদের সাথে লাদাখ যাওয়া সম্পূর্ণ সম্ভব ও নিরাপদ। প্রবীণদের কথা মাথায় রেখেই আমাদের ট্যুর বিশেষভাবে পরিচালিত হয়:<br><br>
          ✓ <strong>হাসপাতাল গ্রেড বড় অক্সিজেন সিলিন্ডার:</strong> প্রতিটি গাড়িতে বড় অক্সিজেন সিলিন্ডার এবং পরিবার পিছু ১টি পোর্টেবল অক্সিজেন ক্যান থাকে।<br>
          ✓ <strong>ধীরগতির অ্যাক্লিমাটাইজেশন:</strong> লেহ-তে পৌঁছে প্রথম ২ দিন কোনো তাড়াহুড়ো না করে আবহাওয়ার সাথে মানিয়ে নেওয়ার জন্য সম্পূর্ণ বিশ্রাম রাখা হয়।<br>
          ✓ <strong>নিয়মিত পালস অক্সিমিটার চেক:</strong> প্রতিদিন সবার অক্সিজেন লেভেল মনিটর করা হয়।<br>
          ✓ <strong>টেম্পো ট্রাভেলারে সিট রোটেশন:</strong> প্রবীণদের কোনো খারাপ বা পেছনের ঝাঁকুনিযুক্ত সিটে বসানো হয় না।<br>
          ✓ <strong>সোমজিৎ ভট্টাচার্যের ব্যক্তিগত যত্ন:</strong> প্রথম থেকে শেষ দিন সোমজিৎ ভট্টাচার্য নিজে সাথে থেকে পরিবারের মতো দেখভাল করেন।<br><br>
          💡 <em>পরামর্শ:</em> আপনার যদি উচ্চ রক্তচাপ বা হার্টের ক্রনিক সমস্যা থাকে, তাহলে নিয়মিত ওষুধপত্র সাথে রাখুন এবং ট্যুরে যাওয়ার পূর্বে একবার আপনার পারিবারিক ডাক্তারের পরামর্শ নেওয়া ভালো।
          
          <div class="tws-chat-actions">
            <button class="tws-action-pill" onclick="openItineraryModal('ladakh-2026')"><i class="fas fa-map-marked-alt"></i> লাদাখ ভ্রমণসূচী দেখুন</button>
            <a href="https://wa.me/919433074880?text=নমস্কার%20সোমজিৎ%20ভট্টাচার্য,%20প্রবীণদের%20লাদাখ%20ট্যুর%20সম্পর্কে%20জানতে%20চাই।" target="_blank" class="tws-action-pill wa"><i class="fab fa-whatsapp"></i> WhatsApp পরামর্শ</a>
          </div>
        `;
        const voiceText = `৬০ বছর বয়সে বা যেকোনো বয়সেই আমাদের সাথে নিশ্চিন্তে লাদাখ যেতে পারেন। প্রতিটি গাড়িতে হাসপাতাল গ্রেড বড় অক্সিজেন সিলিন্ডার থাকে, লেহ-তে পৌঁছে দুই দিন ধীরেসুস্থে বিশ্রাম দেওয়া হয় এবং সোমজিৎ ভট্টাচার্য নিজে সার্বক্ষণিক সাথে থেকে পরিবারের মতো যত্ন নেন।`;
        return { html, voiceText, lang: 'bn' };
      }
    }

    // PRIORITY 6: Why Tour With Somjit / Special Host Benefits (সোমজিৎ ভট্টাচার্যের সঙ্গে ঘোরার স্পেশাল সুবিধা)
    if (query.includes("সুবিধা") || query.includes("কেন যাব") || query.includes("why") || query.includes("benefit") || query.includes("special") || query.includes("বৈশিষ্ট্য")) {
      if (isEn) {
        const html = `
          <strong>🌟 Signature Benefits of Traveling with Somjit Bhattacharyya:</strong><br><br>
          ১. <strong>100% Personal Presence:</strong> Somjit personally leads and travels with every group from start to finish, never leaving you to third-party agents.<br>
          ২. <strong>Dedicated Bengali Cooking Team:</strong> Even in high mountains, our private Bengali cook team serves piping hot, home-style Bengali meals daily.<br>
          ৩. <strong>Fair Tempo Seat Rotation:</strong> Complete transparency in vehicle seating—no one is permanently stuck in rear seats.<br>
          ৪. <strong>Hospital-Grade Medical Care:</strong> Large oxygen cylinders and emergency support at high altitudes.<br>
          ৫. <strong>Transparent & Minimal Token Booking:</strong> Clear pricing with zero hidden charges.
          
          <div class="tws-chat-actions">
            <a href="https://wa.me/919433074880" target="_blank" class="tws-action-pill wa"><i class="fab fa-whatsapp"></i> Talk to Somjit on WhatsApp</a>
            <a href="tel:+919433074880" class="tws-action-pill"><i class="fas fa-phone-alt"></i> Call Now</a>
          </div>
        `;
        const voiceText = `The biggest advantage of traveling with Somjit Bhattacharyya is his personal presence on every tour from start to finish, our dedicated Bengali cooking team serving hot home meals in the mountains, and hospital-grade oxygen backup for senior safety.`;
        return { html, voiceText, lang: 'en' };
      } else {
        const html = `
          <strong>🌟 সোমজিৎ ভট্টাচার্যের সঙ্গে ঘোরার স্পেশাল সুবিধাসমূহ:</strong><br><br>
          ১. <strong>১০০% ব্যক্তিগত সাহচর্য:</strong> কোনো থার্ড পার্টি গাইডের হাতে ছেড়ে দেওয়া হয় না; প্রথম দিন থেকে শেষ দিন পর্যন্ত <strong>সোমজিৎ ভট্টাচার্য নিজে গ্রুপে সাথে থাকেন</strong>।<br>
          ২. <strong>নিজস্ব বাঙালি বাবুর্চি টিম:</strong> লাদাখ বা স্পিতির মতো পাহাড়ি অঞ্চলেও আমাদের রান্নার টিম সাথে যায় এবং প্রতিদিন গরম, সুস্বাদু ঘরোয়া বাঙালি খাবার পরিবেশন করে।<br>
          ৩. <strong>স্বচ্ছ সিট রোটেশন পলিসি:</strong> টেম্পো ট্রাভেলারে কোনো সিট সিন্ডিকেট নেই—সবাইকে পর্যায়ক্রমে সমান আরামদায়ক সিট দেওয়া হয়।<br>
          ৪. <strong>প্রবীণ ও পারিবারিক নিরাপত্তা:</strong> হাসপাতাল গ্রেড বড় অক্সিজেন সিলিন্ডার ও প্রাথমিক চিকিৎসার পূর্ণ ব্যবস্থা।<br>
          ৫. <strong>স্বচ্ছ টোকেন বুকিং:</strong> কোনো লুকানো খরচ নেই এবং সামান্য টোকেন মানি দিয়ে সিট কনফার্ম করার সুবিধা।
          
          <div class="tws-chat-actions">
            <a href="https://wa.me/919433074880?text=নমস্কার%20সোমজিৎ%20ভট্টাচার্য,%20ট্যুরের%20বিস্তারিত%20জানতে%20চাই।" target="_blank" class="tws-action-pill wa"><i class="fab fa-whatsapp"></i> সোমজিৎদার সাথে কথা বলুন</a>
            <a href="tel:+919433074880" class="tws-action-pill"><i class="fas fa-phone-alt"></i> ফোন করুন</a>
          </div>
        `;
        const voiceText = `সোমজিৎ ভট্টাচার্যের সাথে ঘোরার সবচেয়ে বড় সুবিধা হলো, প্রথম থেকে শেষ দিন সোমজিৎদা নিজে সাথে থাকেন। পাহাড়েও আমাদের নিজস্ব বাঙালি বাবুর্চি গরম রান্না পরিবেশন করে এবং গাড়িতে বড় অক্সিজেন সিলিন্ডারের পূর্ণ নিরাপত্তা থাকে।`;
        return { html, voiceText, lang: 'bn' };
      }
    }

    // PRIORITY 7: Upcoming Tours & Annual Schedule (আসন্ন গ্রুপ ট্যুর ও বার্ষিক ক্যালেন্ডার)
    if (query.includes("আসন্ন") || query.includes("schedule") || query.includes("calendar") || query.includes("upcoming") || query.includes("বার্ষিক") || query.includes("কবে কবে") || query.includes("শিডিউল")) {
      if (isEn) {
        const html = `
          <strong>📅 2026 Signature Tour Calendar by Somjit Bhattacharyya:</strong><br><br>
          We organize 5 to 6 signature group trips annually with complete personal host supervision:<br><br>
          🏔️ <strong>1. Ladakh Mahabismay Tour:</strong> 25 May – 10 June 2026 (12N/13D) • Booking Open (Token ₹5,000)<br>
          🐟 <strong>2. 2nd Sundarban Hilsa Festival:</strong> 24–26 July & 14–16 Aug 2026 (2N/3D) • Booking Open (Token ₹3,000)<br>
          ⛰️ <strong>3. Kinnaur Spiti Valley & Chandratal:</strong> 21 Sep – 5 Oct 2026 (14N/15D) • Booking Open (Token ₹5,000)<br>
          🌿 <strong>4. Dooars & Ranchi Signature Trips:</strong> Successfully conducted recently & seasonal departures.<br><br>
          👉 <em>Note:</em> Seats in each group are limited to maintain comfort and personal care.
          
          <div class="tws-chat-actions">
            <button class="tws-action-pill book" onclick="openBookingModal('ladakh-2026')"><i class="fas fa-ticket-alt"></i> Book Ladakh Seat</button>
            <button class="tws-action-pill book" onclick="openBookingModal('sundarban-2026')"><i class="fas fa-fish"></i> Book Sundarban</button>
          </div>
        `;
        const voiceText = `We organize five to six signature group tours every year. Currently, bookings are actively open for Ladakh in May-June, Sundarban Hilsa Festival in July-August, and Kinnaur Spiti Valley in September-October.`;
        return { html, voiceText, lang: 'en' };
      } else {
        const html = `
          <strong>📅 সোমজিৎ ভট্টাচার্য-এর ২০২৬ সিগনেচার ট্যুর শিডিউল:</strong><br><br>
          আমরা বছরে সাধারণত ৫ থেকে ৬টি সিগনেচার গ্রুপ ট্যুর নিয়ে যাই, যেখানে সোমজিৎদা নিজে উপস্থিত থাকেন:<br><br>
          🏔️ <strong>১. লাদাখ মহাবিস্ময় ট্যুর:</strong> ২৫শে মে – ১০ই জুন ২০২৬ (১২ রাত / ১৩ দিন) • <span style="color:#16a34a; font-weight:700;">বুকিং চলছে (টোকেন ₹৫,০০০)</span><br>
          🐟 <strong>২. দ্বিতীয় সুন্দরবন ইলিশ উৎসব:</strong> ২৪-২৬শে জুলাই ও ১৪-১৬ই আগস্ট ২০২৬ (২ রাত / ৩ দিন) • <span style="color:#16a34a; font-weight:700;">বুকিং চলছে (টোকেন ₹৩,০০০)</span><br>
          ⛰️ <strong>৩. কিন্নর স্পিতি ভ্যালি ও চন্দ্রতাল:</strong> ২১শে সেপ্টেম্বর – ৫ই অক্টোবর ২০২৬ (১৪ রাত / ১৫ দিন) • <span style="color:#16a34a; font-weight:700;">বুকিং চলছে (টোকেন ₹৫,০০০)</span><br>
          🌿 <strong>৪. ডুয়ার্স ও রাঁচি ট্যুর:</strong> সম্প্রতি রাঁচি সফলভাবে সম্পন্ন হয়েছে এবং ডুয়ার্স সিজন অনুযায়ী আয়োজিত হয়।
          
          <div class="tws-chat-actions">
            <button class="tws-action-pill book" onclick="openBookingModal('ladakh-2026')"><i class="fas fa-ticket-alt"></i> লাদাখ বুকিং</button>
            <button class="tws-action-pill book" onclick="openBookingModal('sundarban-2026')"><i class="fas fa-fish"></i> সুন্দরবন বুকিং</button>
          </div>
        `;
        const voiceText = `আমরা বছরে প্রায় পাঁচ থেকে ছয়টি সিগনেচার গ্রুপ ট্যুর নিয়ে যাই। বর্তমানে আমাদের মে-জুনের লাদাখ মহাবিস্ময়, জুলাই-আগস্টের সুন্দরবন ইলিশ উৎসব এবং সেপ্টেম্বর-অক্টোবরের কিন্নর স্পিতি ভ্যালির বুকিং চলছে।`;
        return { html, voiceText, lang: 'bn' };
      }
    }

    // PRIORITY 8: Ladakh Mahabismay 2026
    if (query.includes("লাদাখ") || query.includes("ladakh") || query.includes("লেহ") || query.includes("leh")) {
      const ladakh = tours["ladakh-2026"] || {};
      const dates = ladakh.dates || "২৫শে মে – ১০ই জুন ২০২৬";
      const duration = ladakh.duration || "১২ রাত / ১৩ দিন (শ্রীনগর থেকে চন্ডীগড়)";

      if (isEn) {
        const html = `
          <strong>🏔️ Ladakh Mahabismay Group Tour 2026:</strong><br><br>
          • <strong>Dates:</strong> ${dates}<br>
          • <strong>Duration:</strong> ${duration}<br>
          • <strong>Cost:</strong> ₹47,000 – ₹49,500 per person<br>
          • <strong>Seat Booking Token:</strong> Only ₹5,000 per person<br><br>
          📌 <strong>Key Highlights:</strong><br>
          ✓ Somjit Bhattacharyya personally travels with the group.<br>
          ✓ Hospital-grade large oxygen cylinder backup in every vehicle.<br>
          ✓ Hot Bengali meals prepared by our private cooking team.<br>
          ✓ Excursion to India-Pakistan border last village <strong>Turtuk & Thang</strong> and <strong>Siachen Base Camp</strong>.<br>
          ✓ Scenic Nubra Valley, Pangong Lake, Khardung La & Kargil War Memorial.
          
          <div class="tws-chat-actions">
            <button class="tws-action-pill" onclick="openItineraryModal('ladakh-2026')"><i class="fas fa-map-marked-alt"></i> Full Itinerary</button>
            <button class="tws-action-pill book" onclick="openBookingModal('ladakh-2026')"><i class="fas fa-ticket-alt"></i> Book Ladakh Seat</button>
            <a href="https://wa.me/919433074880?text=Hello%20Somjit,%20I%20am%20interested%20in%20Ladakh%202026%20tour." target="_blank" class="tws-action-pill wa"><i class="fab fa-whatsapp"></i> WhatsApp</a>
          </div>
        `;
        const voiceText = `Our Ladakh Mahabismay tour starts from May 25th for 12 nights and 13 days. It includes hospital-grade oxygen backup, private Bengali cooks, and visits to Turtuk, Thang last village, and Siachen Base Camp. Token booking is 5000 rupees per person.`;
        return { html, voiceText, lang: 'en' };
      } else {
        const html = `
          <strong>🏔️ লাদাখ মহাবিস্ময় গ্রুপ ট্যুর ২০২৬:</strong><br><br>
          • <strong>তারিখ:</strong> ${dates}<br>
          • <strong>সময়সীমা:</strong> ${duration}<br>
          • <strong>প্যাকেজ মূল্য:</strong> ₹৪৭,০০০ – ₹৪৯,৫০০ (রুম অনুযায়ী)<br>
          • <strong>টোকেন মানি (বুকিং):</strong> মাত্র ₹৫,০০০ জনপ্রতি<br><br>
          📌 <strong>ট্যুরের বিশেষ আকর্ষণসমূহ:</strong><br>
          ✓ প্রথম দিন থেকে শেষ দিন <strong>আমি সোমজিৎ ভট্টাচার্য নিজে সাথে থাকব</strong><br>
          ✓ হাসপাতাল গ্রেড বড় অক্সিজেন সিলিন্ডার ও পোর্টেবল ক্যান ব্যাকআপ<br>
          ✓ নিজস্ব বাঙালি কুকিং টিমের রান্না করা গরম টাটকা খাবার<br>
          ✓ ভারত-পাকিস্তান শেষ সীমান্ত <strong>তুরতুক ও থাং গ্রাম</strong> এবং <strong>সিয়াচেন বেসক্যাম্প</strong> দর্শন<br>
          ✓ টেম্পো ট্রাভেলারে ফেয়ার সিট রোটেশন পলিসি
          
          <div class="tws-chat-actions">
            <button class="tws-action-pill" onclick="openItineraryModal('ladakh-2026')"><i class="fas fa-map-marked-alt"></i> সম্পূর্ণ ভ্রমণসূচী</button>
            <button class="tws-action-pill book" onclick="openBookingModal('ladakh-2026')"><i class="fas fa-ticket-alt"></i> লাদাখ সিট বুকিং</button>
            <a href="https://wa.me/919433074880?text=নমস্কার%20সোমজিৎ%20ভট্টাচার্য,%20লাদাখ%20ট্যুর%20২০২৬%20সম্পর্কে%20জানতে%20চাই।" target="_blank" class="tws-action-pill wa"><i class="fab fa-whatsapp"></i> WhatsApp</a>
          </div>
        `;
        const voiceText = `লাদাখ মহাবিস্ময় ট্যুর ২৫শে মে থেকে শুরু হচ্ছে। ১২ রাত ১৩ দিনের সম্পূর্ণ ট্যুরে সোমজিৎ ভট্টাচার্য নিজে সাথে থাকবেন। হাসপাতাল গ্রেড অক্সিজেন সিলিন্ডার এবং নিজস্ব বাঙালি রাঁধুনির খাবারের ব্যবস্থা রয়েছে। সিট বুকিংয়ের জন্য জনপ্রতি টোকেন মানি ৫ হাজার টাকা।`;
        return { html, voiceText, lang: 'bn' };
      }
    }

    // PRIORITY 9: Sundarban Hilsa Festival 2026
    if (query.includes("সুন্দরবন") || query.includes("sundarban") || query.includes("ইলিশ") || query.includes("hilsa")) {
      const sundarban = tours["sundarban-2026"] || {};
      const dates = sundarban.dates || "২৪-২৬শে জুলাই ও ১৪-১৬ই আগস্ট ২০২৬";

      if (isEn) {
        const html = `
          <strong>🐟 2nd Sundarban Hilsa Festival 2026:</strong><br><br>
          • <strong>Dates:</strong> ${dates}<br>
          • <strong>Duration:</strong> 2 Nights / 3 Days (Kolkata Esplanade AC Pickup & Drop)<br>
          • <strong>Package Price:</strong> ₹7,000 – ₹8,500 per person<br>
          • <strong>Token Booking:</strong> Only ₹3,000 per person<br><br>
          📌 <strong>Festival Highlights:</strong><br>
          ✓ Luxury Safari on Cruise <strong>'Devi Annapurna'</strong>.<br>
          ✓ 30+ royal Bengali dishes with fresh Hilsa (Ilish Bhapa, Paturi, Biryani, Sorshe Ilish, Pabda).<br>
          ✓ Jungle safari at Sajnekhali, Sudhanyakhali & Dobanki Canopy Walk.
          
          <div class="tws-chat-actions">
            <button class="tws-action-pill" onclick="openItineraryModal('sundarban-2026')"><i class="fas fa-map-marked-alt"></i> View Menu & Plan</button>
            <button class="tws-action-pill book" onclick="openBookingModal('sundarban-2026')"><i class="fas fa-ticket-alt"></i> Book Sundarban</button>
          </div>
        `;
        const voiceText = `The 2nd Sundarban Hilsa Festival will be held in late July and mid August. Experience luxury cruising on boat Devi Annapurna with over 30 traditional Bengali and Hilsa delicacies.`;
        return { html, voiceText, lang: 'en' };
      } else {
        const html = `
          <strong>🐟 দ্বিতীয় সুন্দরবন ইলিশ উৎসব ২০২৬:</strong><br><br>
          • <strong>তারিখ:</strong> ${dates}<br>
          • <strong>সময়সীমা:</strong> ২ রাত / ৩ দিন (ধর্মতলা থেকে এসি বাসে পিকআপ ও ড্রপ)<br>
          • <strong>প্যাকেজ মূল্য:</strong> ₹৭,০০০ – ₹৮,৫০০ জনপ্রতি<br>
          • <strong>টোকেন মানি:</strong> মাত্র ₹৩,০০০ জনপ্রতি<br><br>
          📌 <strong>প্রধান আকর্ষণ:</strong><br>
          ✓ বিলাসবহুল লঞ্চ <strong>'দেবী অন্নপূর্ণা'</strong>-তে সুন্দরবন জঙ্গল সাফারি<br>
          ✓ ৩ দিনে ৩০টিরও বেশি রাজকীয় বাঙালি ও ইলিশ মাছের পদ<br>
          ✓ ইলিশ ভাপা, ইলিশ পাতুড়ি, ইলিশ বিরিয়ানি, সর্ষে ইলিশ ও পাবদা মাছ<br>
          ✓ সজনেখালি, সুধন্যখালি ও দোবাঁকি ক্যানোপি ওয়াকে বাঘের সন্ধান
          
          <div class="tws-chat-actions">
            <button class="tws-action-pill" onclick="openItineraryModal('sundarban-2026')"><i class="fas fa-map-marked-alt"></i> মেনু ও ভ্রমণসূচী</button>
            <button class="tws-action-pill book" onclick="openBookingModal('sundarban-2026')"><i class="fas fa-ticket-alt"></i> সুন্দরবন সিট বুকিং</button>
          </div>
        `;
        const voiceText = `সুন্দরবন ইলিশ উৎসব ২৪শে থেকে ২৬শে জুলাই এবং ১৪ থেকে ১৬ই আগস্ট অনুষ্ঠিত হবে। বিলাসবহুল লঞ্চ দেবী অন্নপূর্ণাতে ৩০টির বেশি ইলিশ ও খাঁটি বাঙালি খাবারের সাথে সুন্দরবন ভ্রমণের সুবর্ণ সুযোগ।`;
        return { html, voiceText, lang: 'bn' };
      }
    }

    // PRIORITY 10: Kinnaur Spiti 2026
    if (query.includes("স্পিতি") || query.includes("spiti") || query.includes("কিন্নর") || query.includes("kinnaur")) {
      const spiti = tours["spiti-2026"] || {};
      const dates = spiti.dates || "২১শে সেপ্টেম্বর – ৫ই অক্টোবর ২০২৬";

      if (isEn) {
        const html = `
          <strong>⛰️ Kinnaur Spiti Valley & Chandratal Lake 2026:</strong><br><br>
          • <strong>Dates:</strong> ${dates}<br>
          • <strong>Duration:</strong> 14 Nights / 15 Days (Kalka to Chandigarh)<br>
          • <strong>Cost:</strong> ₹47,500 per person • <strong>Token:</strong> ₹5,000<br><br>
          📌 <strong>Highlights:</strong> Chitkul last village, Kalpa Kinnaur Kailash view, Nako lake, Gue monastery (500-yr natural mummy), Kaza, Key monastery, Hikkim highest post office, and camping at Chandratal Lake.
          
          <div class="tws-chat-actions">
            <button class="tws-action-pill" onclick="openItineraryModal('spiti-2026')"><i class="fas fa-map-marked-alt"></i> View Itinerary</button>
            <button class="tws-action-pill book" onclick="openBookingModal('spiti-2026')"><i class="fas fa-ticket-alt"></i> Book Spiti Seat</button>
          </div>
        `;
        const voiceText = `Kinnaur Spiti Valley and Chandratal Lake tour is scheduled from 21st September to 5th October 2026. Somjit Bhattacharyya personally leads the entire 15 days journey.`;
        return { html, voiceText, lang: 'en' };
      } else {
        const html = `
          <strong>⛰️ কিন্নর স্পিতি ভ্যালি ও চন্দ্রতাল লেক ২০২৬:</strong><br><br>
          • <strong>তারিখ:</strong> ${dates}<br>
          • <strong>সময়সীমা:</strong> ১৪ রাত / ১৫ দিন (কালকা থেকে চন্ডীগড়)<br>
          • <strong>প্যাকেজ মূল্য:</strong> ₹৪৭,৫০০ জনপ্রতি • <strong>টোকেন মানি:</strong> মাত্র ₹৫,০০০<br><br>
          📌 <strong>প্রধান আকর্ষণ:</strong> ছিটকুল (ভারতের শেষ গ্রাম), কল্পা (কিন্নর কৈলাশ ভিউ), ন্যাকো লেক, গিউ মনাস্ট্রি (৫০০ বছরের প্রাকৃতিক মমি), কাজা, কি মনাস্ট্রি, হিচিম ও অপূর্ব চন্দ্রতাল লেকে ক্যাম্পিং।
          
          <div class="tws-chat-actions">
            <button class="tws-action-pill" onclick="openItineraryModal('spiti-2026')"><i class="fas fa-map-marked-alt"></i> স্পিতি ভ্রমণসূচী</button>
            <button class="tws-action-pill book" onclick="openBookingModal('spiti-2026')"><i class="fas fa-ticket-alt"></i> স্পিতি সিট বুকিং</button>
          </div>
        `;
        const voiceText = `কিন্নর স্পিতি ভ্যালি ও চন্দ্রতাল লেক ট্যুর ২১শে সেপ্টেম্বর থেকে ৫ই অক্টোবর অনুষ্ঠিত হবে। ছিটকুল শেষ গ্রাম, কিন্নর কৈলাশ ও চন্দ্রতাল লেক সহ সম্পূর্ণ প্যাকেজে সোমজিৎ ভট্টাচার্য নিজে সাথে থাকছেন।`;
        return { html, voiceText, lang: 'bn' };
      }
    }

    // DEFAULT FALLBACK (Conversational, Witty & Adventure-Loving)
    if (isEn) {
      const html = `
        I am <strong>Somjit Bhattacharyya's official AI Travel Companion</strong>! 🌄<br><br>
        Whether you want to explore the magical mountains of Ladakh & Spiti, celebrate the royal Hilsa feast in Sundarban, get high-altitude packing advice, or plan a custom group journey—I am here to guide you with pure travel passion.<br><br>
        What would you like to explore today?
        
        <div class="tws-chat-actions">
          <button class="tws-action-pill" onclick="twsSendPreset('Is Ladakh safe for senior citizens?')"><i class="fas fa-heartbeat"></i> Senior Safety in Ladakh</button>
          <button class="tws-action-pill" onclick="twsSendPreset('2026 Tour Calendar')"><i class="fas fa-calendar-alt"></i> 2026 Tour Schedule</button>
          <a href="https://wa.me/919433074880" target="_blank" class="tws-action-pill wa"><i class="fab fa-whatsapp"></i> WhatsApp Somjit</a>
        </div>
      `;
      const voiceText = `I am Somjit Bhattacharyya's official travel companion. From Ladakh high passes to Sundarban boat safaris, I am here to help you plan your dream adventure. What would you like to explore?`;
      return { html, voiceText, lang: 'en' };
    } else {
      const html = `
        আমি <strong>সোমজিৎ ভট্টাচার্য</strong>-এর অফিসিয়াল <strong>এআই ট্রাভেল বাডি ও অ্যাসিস্ট্যান্ট</strong>! 🌄<br><br>
        লাদাখের বরফাবৃত গিরিপথ হোক কিংবা সুন্দরবনের খাঁড়িতে রাজকীয় ইলিশ উৎসব—ভ্রমণের গল্প, পাহাড়ি পথের প্রস্তুতি, কিংবা আমাদের আসন্ন ২০২৬ গ্রুপ ট্যুর নিয়ে আপনার যেকোনো জিজ্ঞাসা মন খুলে বলতে পারেন!<br><br>
        আপনি কোন জায়গাটি নিয়ে জানতে চান?
        
        <div class="tws-chat-actions">
          <button class="tws-action-pill" onclick="twsSendPreset('৬০ বছর বয়সে কি লাদাখ যাওয়া নিরাপদ?')"><i class="fas fa-heartbeat"></i> ৬০ বছর বয়সে লাদাখ?</button>
          <button class="tws-action-pill" onclick="twsSendPreset('সোমজিৎ ভট্টাচার্যের সঙ্গে ঘোরার স্পেশাল সুবিধা কী?')"><i class="fas fa-star"></i> সোমজিৎদার সুবিধা</button>
          <a href="https://wa.me/919433074880" target="_blank" class="tws-action-pill wa"><i class="fab fa-whatsapp"></i> WhatsApp-এ কথা বলুন</a>
        </div>
      `;
      const voiceText = `আমি সোমজিৎ ভট্টাচার্যের অফিশিয়াল এআই ট্রাভেল বাডি। লাদাখের পাহাড় হোক বা সুন্দরবনের জঙ্গল, ভ্রমণের যেকোনো প্রস্তুতি বা আসন্ন ট্যুর নিয়ে আপনার যা জানতে ইচ্ছা করে বলুন!`;
      return { html, voiceText, lang: 'bn' };
    }
  }

  // 10. Log Leads & Chat Sessions to Firebase
  async function logChatToFirebase(userMsg, botReply) {
    const phoneMatch = userMsg.match(/(?:\+91|0)?[6-9]\d{9}/);
    if (phoneMatch) {
      const detectedPhone = phoneMatch[0];
      const leadData = {
        phone: detectedPhone,
        query: userMsg,
        created_at: new Date().toISOString(),
        source: "AI Voice & Text Chatbot"
      };
      try {
        await fetch(`${FIREBASE_DB_URL}/leads.json`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadData)
        });
      } catch(e) {}
    }

    const logItem = {
      timestamp: new Date().toISOString(),
      user_message: userMsg,
      bot_response: botReply
    };

    try {
      await fetch(`${FIREBASE_DB_URL}/chat_logs/${CHAT_SESSION_ID}.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logItem)
      });
    } catch(e) {}
  }

  function escapeHtml(text) {
    if (!text) return "";
    const div = document.createElement("div");
    div.innerText = text;
    return div.innerHTML;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initChatbotUI);
  } else {
    initChatbotUI();
  }
})();
