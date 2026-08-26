/**
 * Tour with Somjit - Master Visual CMS Engine
 * Professional Dynamic Content Management with Facebook-Style Tour Publisher,
 * Auto-Sort (Active top, Closed bottom), Move Up/Down Re-ordering,
 * Highlight Fix, Dynamic Company About & Team Manager, and Realtime Persistence.
 */

const DEFAULT_PIN = "1234";

// Initial Master Data Template
const DEFAULT_SITE_DATA = {
  branding: {
    logo_url: "assets/images/somjit_avatar.png",
    host_main_photo: "assets/images/somjit_host.jpg",
    host_avatar: "assets/images/somjit_avatar.png"
  },
  general: {
    agency_name: "Tour with Somjit",
    tagline: "সোমজিৎ ভট্টাচার্য-এর সাথে নিরাপদ ও ঘরোয়া গ্রুপ ট্যুর",
    hero_badge: "সোমজিৎ ভট্টাচার্য-এর অফিসিয়াল ট্যুর পোর্টাল",
    hero_headline_prefix: "সোমজিৎ ভট্টাচার্য-এর সাথে নিশ্চিন্ত ও",
    hero_headline_highlight: "ঘরোয়া গ্রুপ ট্যুর ২০২৬",
    hero_subtext: "প্রবীণ নাগরিক ও পরিবারের প্রতিটি সদস্যের জন্য সম্পূর্ণ নিরাপদ, আরামদায়ক ও নিখুঁত পরিকল্পনার অনন্য অভিজ্ঞতা। লাদাখের বরফাবৃত গিরিপথ থেকে সুন্দরবনের রাজকীয় ইলিশ উৎসব—আমি সোমজিৎ ভট্টাচার্য নিজে সাথে থেকে আপনাকে উপহার দেব একটি আজীবন মনে রাখার মতো আন্তরিক ভ্রমণ।",
    tour_section_subtitle: "আমাদের ২০২৬ সালের অফিশিয়াল ক্যালেন্ডার",
    tour_section_title: "সোমজিৎ ভট্টাচার্য-এর সিগনেচার গ্রুপ ট্যুরসমূহ",
    hero_points: [
      { icon: "fa-user-shield", text: "প্রথম দিন থেকে আমি সোমজিৎ ভট্টাচার্য নিজে সাথে থাকব" },
      { icon: "fa-lungs", text: "বড় অক্সিজেন সিলিন্ডার ও ক্যান ব্যাকআপ" },
      { icon: "fa-utensils", text: "নিজস্ব বাঙালি কুকিং টিমের ঘরোয়া রান্না" },
      { icon: "fa-couch", text: "টেম্পো ট্রাভেলারে নো ব্যাক সিট ও রোটেশন" }
    ],
    urgent_notice: "📢 ২০২৬ সালের প্রতিটি ট্যুরের সিট বুকিং দ্রুত গতিতে চলছে! আপনার পছন্দের গন্তব্যে সিট নিশ্চিত করতে আজই যোগাযোগ করুন।"
  },
  host: {
    name: "সোমজিৎ ভট্টাচার্য",
    title: "প্রতিষ্ঠাতা ও জনপ্রিয় বাংলা ট্রাভেল ভ্লগার",
    quote: "ট্যুরে আমরা শুধু স্থান দেখি না, একসাথে একটি পরিবার হয়ে উঠি। প্রবীণদের যত্ন, সঠিক পুষ্টিকর খাবার আর সর্বোচ্চ সুরক্ষাই আমার প্রথম অগ্রাধিকার।",
    youtube_url: "https://youtube.com/@somjitbhattacharyya",
    facebook_url: "https://facebook.com/somjit.bhattacharyya"
  },
  company_about: {
    badge: "আমাদের পরিচিতি ও টিম",
    title: "Tour with Somjit - অফিশিয়াল কোম্পানি বিবরণ",
    tagline: "Explore More. Experience More. | YOUR JOURNEY, OUR PASSION.",
    desc: "সোমজিৎ ভট্টাচার্য-এর আন্তরিক পরিচালনায় নিরাপদ, আরামদায়ক ও ঘরোয়া বাংলা গ্রুপ ট্যুর সংস্থা। আমরা প্রতিটি সফরকে পারিবারিক স্নেহ ও সর্বোচ্চ সুরক্ষা দিয়ে সাজাই।",
    address: "Fatakgora, Chandannagar, Hooghly, West Bengal - 712136",
    email: "iamsomjit@gmail.com",
    primary_phone: "9433074880",
    alt_phone: "8910073441",
    team: [
      { name: "সোমজিৎ ভট্টাচার্য", role: "প্রতিষ্ঠাতা ও হোস্ট (Founder & Host)", phone: "+91 9433074880", photo: "assets/images/somjit_avatar.png" },
      { name: "শর্মিষ্ঠা সরকার", role: "অ্যাডমিন ও কো-অর্ডিনেটর", phone: "+91 9432426448", photo: "assets/images/somjit_avatar.png" },
      { name: "ট্যুর টিম মেম্বার", role: "ট্যুর গাইড ও লজিস্টিকস", phone: "+91 8910073441", photo: "assets/images/somjit_avatar.png" }
    ]
  },
  trust_strip: [
    { icon: "fa-heartbeat", title: "মেডিক্যাল অক্সিজেন ব্যাকআপ", desc: "লাদাখ ও স্পিতিতে হাসপাতাল গ্রেড বড় সিলিন্ডার ও অক্সিজেন ক্যান" },
    { icon: "fa-bread-slice", title: "নিজস্ব বাঙালি বাবুর্চি", desc: "টাটকা ঘরোয়া বাঙালি খাবার, লাঞ্চ সহ সব মিল অন্তর্ভুক্ত" },
    { icon: "fa-chair", title: "আরামদায়ক আসন ব্যবস্থা", desc: "টেম্পো ট্রাভেলারে পেছনের খারাপ সিটে কাউকে বসানো হয় না" },
    { icon: "fa-hand-holding-heart", title: "প্রবীণ নাগরিকদের বিশেষ যত্ন", desc: "ধীরেসুস্থে দর্শন, কম মশলার সুষম খাবার ও পারিবারিক স্নেহ" }
  ],
  why_us: [
    { icon: "fa-user-friends", title: "সোমজিৎ ভট্টাচার্য-এর প্রত্যক্ষ নেতৃত্ব", desc: "আমি সোমজিৎ ভট্টাচার্য নিজে প্রতিটি ট্যুরে শুরু থেকে শেষ পর্যন্ত আপনাদের সাথে থাকি এবং প্রত্যেকের ব্যক্তিগত সুবিধা-অসুবিধার তদারকি করি।" },
    { icon: "fa-briefcase-medical", title: "মেডিক্যাল ও সুরক্ষা ফার্স্ট", desc: "উচ্চ উচ্চতার ট্যুরে পর্যাপ্ত অক্সিজেন সিলিন্ডার, ফার্স্ট এইড ও ব্যাকআপ সাপোর্ট থাকে যাতে প্রবীণ নাগরিকরা সম্পূর্ণ স্বাচ্ছন্দ্যে ঘুরে বেড়াতে পারেন।" },
    { icon: "fa-utensil-spoon", title: "খাঁটি বাঙালি বাবুর্চি ও ফ্রেশ মিল", desc: "বাইরের অস্বাস্থ্যকর খাবার নয়, পাহাড়ে বা জঙ্গলে আমাদের নিজস্ব কুকিং টিমের রান্না করা গরম ভাত, ডাল, মাছ, চিকেন ও বাঙালি পদ পরিবেশন করা হয়।" },
    { icon: "fa-handshake", title: "১০০% স্বচ্ছতা ও লুকানো চার্জ নেই", desc: "হোটেল, গাড়ি, সব মিল, পারমিট থেকে এন্ট্রি ফি—সবকিছু আগে থেকেই স্পষ্ট। কোনো লুকানো চার্জ বা পেছনের খারাপ সিটের ভোগান্তি নেই।" }
  ],
  food_section: {
    enabled: true,
    linked_tour_id: "sundarban-2026",
    badge: "পেটুক বাঙালির রাজকীয় রসনা তৃপ্তি",
    title: "১০+ পদের রাজকীয় ইলিশ ও খাঁটি বাঙালি ভোজন",
    desc: "ভ্রমণে যদি রসনা তৃপ্তি না থাকে তবে ভ্রমণ অসম্পূর্ণ! \"Tour with Somjit\"-এর প্রতিটি সফরে আমরা নিশ্চিত করি সর্বোচ্চ মানের টাটকা ও ঘরোয়া বাঙালি আহার। বিশেষ করে সুন্দরবন ইলিশ উৎসবে থাকছে পদ্মার টাটকা ইলিশের অবিস্মরণীয় বৈচিত্র্য।",
    tags: ["🐟 খাঁটি সর্ষে ইলিশ", "🍃 কলাপাতা ইলিশ পাতুরি", "🍚 সুগন্ধি ইলিশ বিরিয়ানি", "🍤 গলদা চিংড়ি মালাইকারি", "🍲 কচুর শাক দিয়ে ইলিশ মাথা", "🍗 কষা মটন ও চিকেন", "☕ খাঁটি দার্জিলিং চা"],
    day1: "লাঞ্চ: গরম ভাত, সোনা মুগ ডাল, বেগুনী, তোপসে ফ্রাই, গলদা চিংড়ি মালাইকারি, ইলিশ ভাপা, চাটনি, পাপড় ও রসগোল্লা। ডিনার: ফ্রাইড রাইস, চিলি চিকেন বা গরম রুটি ও কষা মটন কারি।",
    day2: "ব্রেকফাস্ট: রাধাবল্লভী, ছোলার ডাল ও জিলিপি। লাঞ্চ: ভাত, ইলিশের তেল, ইলিশ মাথা দিয়ে কচুর শাক, সর্ষে ইলিশ, ইলিশ পাতুরি ও মিষ্টি দই। ইভনিং: চিকেন পকোড়া ও চা। ডিনার: কাচ্চি বিরিয়ানি ও চিকেন চাপ।",
    day3: "লাঞ্চ: বিশেষ রাজকীয় ইলিশ বিরিয়ানি, ইলিশ দোপেঁয়াজা, আম-কাসুন্দি চাটনি ও মিষ্টিমুখ।"
  },
  vlogs: [
    {
      id: "vlog-1",
      title: "লাদাখ মহাবিস্ময় - খারদুংলা ও প্যাংগং লেকের অপরূপ রূপ",
      desc: "লেহ, নুব্রা ভ্যালি ও সিয়াচেন বেসক্যাম্প ভ্রমণের সম্পূর্ণ গাইড ও প্রস্তুতি।",
      youtube_url: "https://www.youtube.com/@somjitbhattacharyya",
      thumbnail_url: ""
    },
    {
      id: "vlog-2",
      title: "সুন্দরবন ইলিশ উৎসব - বিলাসবহুল লঞ্চে জঙ্গল সাফারি ও ইলিশ ভোজ",
      desc: "দেবী অন্নপূর্ণা লঞ্চ, সজনেখালি ও দোবাঁকি ক্যানোপি ওয়াকের রোমাঞ্চকর দৃশ্য।",
      youtube_url: "https://www.youtube.com/@somjitbhattacharyya",
      thumbnail_url: ""
    },
    {
      id: "vlog-3",
      title: "কিন্নর স্পিতি ভ্যালি - ছিটকুল শেষ গ্রাম ও চন্দ্রতাল লেক ট্রেক",
      desc: "হিমালয়ের দুর্গম কিন্নর কৈলাশ ও প্রাচীন গিউ মমির বাস্তব রহস্য উন্মোচন।",
      youtube_url: "https://www.youtube.com/@somjitbhattacharyya",
      thumbnail_url: ""
    }
  ],
  tours: {
    "ladakh-2026": {
      id: "ladakh-2026",
      title: "লাদাখ মহাবিস্ময় গ্রুপ ট্যুর ২০২৬",
      category: "ladakh",
      status: "open",
      is_featured: false,
      dates: "২৫শে মে – ১০ই জুন ২০২৬",
      duration: "১২ রাত / ১৩ দিন (শ্রীনগর থেকে চন্ডীগড়)",
      token_per_person: 5000,
      banner_image: "",
      caption_details: "সোমজিৎ ভট্টাচার্য-এর সাথে লাদাখ মহাবিস্ময় গ্রুপ ট্যুর ২০২৬!\n\n📌 ট্যুরের বিশেষ সুবিধাসমূহ:\n✓ প্রথম দিন থেকে শেষ দিন পর্যন্ত আমি সোমজিৎ ভট্টাচার্য নিজে সাথে থাকব\n✓ হাসপাতাল গ্রেড বড় অক্সিজেন সিলিন্ডার ব্যাকআপ ও পরিবার পিছু ১টি পোর্টেবল অক্সিজেন ক্যান\n✓ নিজস্ব বাঙালি কুকিং টিমের রান্না করা টাটকা ঘরোয়া খাবার (লাঞ্চ সহ সব মিল)\n✓ তুরতুক ও থাং গ্রাম (ভারত-পাকিস্তান শেষ সীমান্ত) ও সিয়াচেন বেসক্যাম্প দর্শন\n✓ টেম্পো ট্রাভেলারে পেছনের খারাপ সিটে কাউকে বসানো হয় না ও নিয়মিত সিট রোটেশন",
      plans: [
        { id: "ladakh_moriri_double", name: "সোমোরিরি সহ - ডাবল শেয়ারিং রুম", price: 49500 },
        { id: "ladakh_moriri_triple", name: "সোমোরিরি সহ - ট্রিপল শেয়ারিং রুম", price: 48500 }
      ]
    },
    "sundarban-2026": {
      id: "sundarban-2026",
      title: "দ্বিতীয় সুন্দরবন ইলিশ উৎসব ২০২৬",
      category: "sundarban",
      status: "few_seats",
      is_featured: true,
      dates: "২৪শে – ২৬শে জুলাই ২০২৬ (বা ১৪-১৬ই আগস্ট ২০২৬)",
      duration: "২ রাত / ৩ দিন (কলকাতা থেকে কলকাতা)",
      token_per_person: 2000,
      banner_image: "",
      caption_details: "দ্বিতীয় সুন্দরবন ইলিশ উৎসব ২০২৬!\n\n📌 প্রধান আকর্ষণ:\n✓ ১০+ পদের রাজকীয় ইলিশ মহোৎসব (সর্ষে ইলিশ, পাতুরি, বিরিয়ানি, মালাইকারি, মটন)\n✓ পাখিরালয়ের সাধারণ হোটেল নয়, দয়াপুরে প্রিমিয়াম লাক্সারী রিসর্টে থাকা (এসি+গিজার)\n✓ নবরূপে সজ্জিত বিলাসবহুল ৩-তলা লঞ্চ 'এম ভি দেবী অন্নপূর্ণা ২'-এ সাফারি\n✓ সজনেখালি, সুধন্যখালি ওয়াচ টাওয়ার, দোবাঁকি ক্যানোপি ও হ্যামিলটন সাহেবের কুঠি\n✓ কমপ্লিমেন্টারি রেনকোট, শাওয়ার কিট এবং বাউল গানের মনোমুগ্ধকর সাংস্কৃতিক সন্ধ্যা",
      plans: [
        { id: "sundarban_adult", name: "প্রাপ্তবয়স্ক প্যাকেজ (জনপ্রতি)", price: 7500 },
        { id: "sundarban_child", name: "বাচ্চা (৪ থেকে ৭ বছর)", price: 4000 }
      ]
    },
    "ranchi-2026": {
      id: "ranchi-2026",
      title: "সিটি অফ ফলস রাঁচি ও নেতারহাট গ্রুপ ট্যুর ২০২৬",
      category: "ranchi",
      status: "open",
      is_featured: false,
      dates: "২৫শে – ৩০শে আগস্ট ২০২৬",
      duration: "৩ রাত / ৪ দিন (রাঁচি থেকে রাঁচি)",
      token_per_person: 3000,
      banner_image: "",
      caption_details: "সিটি অফ ফলস রাঁচি ও নেতারহাট গ্রুপ ট্যুর ২০২৬!\n\n📌 প্রধান আকর্ষণ:\n✓ হুড্রু, জোহনা, সীতা, দশম ও ঝাড়খণ্ডের সর্বোচ্চ লোধ জলপ্রপাতের অপার সৌন্দর্য\n✓ মনোরম পাত্রাতু ভ্যালি, পাত্রাতু ড্যাম বোট রাইড, রক গার্ডেন ও পাইন ফরেস্ট\n✓ নেতারহাটে ম্যাগনোলিয়া সানসেট পয়েন্ট, সানরাইজ পয়েন্ট ও কোয়েল ভিউ দর্শন\n✓ রাঁচি ও নেতারহাটে সেরা এসি রুম ও গিজার এবং এসি টেম্পো ট্রাভেলার (নো ব্যাক সিট)\n✓ নিজস্ব বাঙালি কুকিং টিম এবং সবার জন্য কমপ্লিমেন্টারি প্রিমিয়াম রেনকোট",
      plans: [
        { id: "ranchi_double", name: "ডাবল শেয়ারিং এসি রুম (জনপ্রতি)", price: 13500 },
        { id: "ranchi_triple", name: "ট্রিপল শেয়ারিং এসি রুম (জনপ্রতি)", price: 13000 }
      ]
    },
    "spiti-2026": {
      id: "spiti-2026",
      title: "কিন্নর স্পিতি ভ্যালি গ্র্যান্ড গ্রুপ ট্যুর ২০২৬",
      category: "spiti",
      status: "open",
      is_featured: false,
      dates: "১৮ই সেপ্টেম্বর – ২রা অক্টোবর ২০২৬",
      duration: "১০ রাত / ১১ দিন (চন্ডীগড় থেকে চন্ডীগড়)",
      token_per_person: 5000,
      banner_image: "",
      caption_details: "কিন্নর স্পিতি ভ্যালি গ্র্যান্ড ট্যুর ২০২৬!\n\n📌 প্রধান আকর্ষণ:\n✓ চন্দ্রতাল ট্রেকে বড় অক্সিজেন সিলিন্ডার ও পরিবার পিছু পোর্টেবল অক্সিজেন ক্যান\n✓ সারাহানে ঐতিহাসিক ভীমাকালী মন্দিরের ঠিক পাশেই রাত্রিবাস ও আরতি দর্শন\n✓ ছিটকুলে বাছপা নদীর তীরে শেষ চেকপোস্ট পেরিয়ে আরও ৫ কিমি ভেতরের অপরূপ ভ্রমণ\n✓ ৫০০+ বছরের প্রাচীন ভারতের বিস্ময়কর 'গিউ মমি' ও ১০০০ বছরের টাবো মনাস্ট্রি\n✓ হিক্কিম সর্বোচ্চ পোস্ট অফিস, কোমিক উচ্চতম গ্রাম, চিচাম ব্রিজ ও নিজস্ব বাঙালি বাবুর্চি",
      plans: [
        { id: "spiti_double", name: "ডাবল শেয়ারিং রুম (জনপ্রতি)", price: 32500 },
        { id: "spiti_triple", name: "ট্রিপল শেয়ারিং রুম (জনপ্রতি)", price: 31500 }
      ]
    },
    "purulia-2026": {
      id: "purulia-2026",
      title: "পুরুলিয়া পলাশ উৎসব ও অযোধ্যা পাহাড় ২০২৬",
      category: "purulia",
      status: "closed",
      is_featured: false,
      dates: "১১ই – ১৪ই মার্চ ২০২৬",
      duration: "২ রাত / ৩ দিন (পুরুলিয়া)",
      token_per_person: 500,
      banner_image: "",
      caption_details: "পুরুলিয়া পলাশ উৎসব ও অযোধ্যা পাহাড় ২০২৬!\n\n📌 প্রধান আকর্ষণ:\n✓ মাঠা পাহাড়ের কোলে পলাশে ঘেরা অনন্য সুন্দর ইকো রিসর্টে ২ রাত অবস্থান\n✓ পাখি পাহাড়, খয়েরাবেড়া লেক, চড়িদা মুখোশ গ্রাম, বামনি ও মার্বেল লেক পরিদর্শন\n✓ হীরক রাজার দেশের জয়চণ্ডী পাহাড় এবং ইতিহাস প্রসিদ্ধ গড়পঞ্চকোট ভ্রমণ\n✓ রিসর্টের আঙিনায় পুরুলিয়ার বিখ্যাত ঐতিহ্যবাহী 'ছৌ নৃত্য'-এর জমকালো সান্ধ্য আসর\n✓ টাটা উইঙ্গার এসি গাড়ি, ব্রেকফাস্ট থেকে ডিনার সব মিল এবং ভেজ/নন-ভেজ সুস্বাদু খানা",
      plans: [
        { id: "purulia_double", name: "এসি প্রিমিয়াম কটেজ (ডাবল শেয়ারিং)", price: 8000 },
        { id: "purulia_triple", name: "এসি প্রিমিয়াম কটেজ (ট্রিপল শেয়ারিং)", price: 7500 }
      ]
    },
    "dooars-2026": {
      id: "dooars-2026",
      title: "ডুয়ার্স গরুমারা ও জলদাপাড়া প্রিমিয়াম ট্যুর ২০২৬",
      category: "dooars",
      status: "coming_soon",
      is_featured: false,
      dates: "১৩ই – ১৯শে নভেম্বর ২০২৬",
      duration: "৪ রাত / ৫ দিন",
      token_per_person: 3000,
      banner_image: "",
      caption_details: "ডুয়ার্স গরুমারা ও জলদাপাড়া প্রিমিয়াম ট্যুর ২০২৬!\n\n📌 প্রধান আকর্ষণ:\n✓ লাটাগুড়িতে ADB KANVAS (সুইমিং পুল) ও জলদাপাড়ায় Debrani Greenwood-এ থাকা\n✓ গরুমারা জাতীয় উদ্যানে ১টি সম্পূর্ণ কমপ্লিমেন্টারি জিপ সাফারি প্যাকেজে অন্তর্ভুক্ত\n✓ দলগাঁও ভিউ পয়েন্ট, বক্সা জিরো পয়েন্ট, জয়ন্তী রিভার বেড ও চিলাপাতা ওয়াইল্ডলাইফ\n✓ কোচবিহারের ঐতিহ্যবাহী রাজবাড়ী ও মদনমোহন মন্দির পরিদর্শন\n✓ লাটাগুড়িতে রাভা উপজাতির লোকনৃত্য ও জলদাপাড়ায় জমজমাট সান্ধ্য বনফায়ার",
      plans: [
        { id: "dooars_double", name: "ডাবল শেয়ারিং লাক্সারী রুম (জনপ্রতি)", price: 14900 },
        { id: "dooars_triple", name: "ট্রিপল শেয়ারিং লাক্সারী রুম (জনপ্রতি)", price: 14200 }
      ]
    }
  },
  faqs: [
    {
      q: "১. প্রবীণ নাগরিকদের (Senior Citizens) জন্য কি এই ট্যুরগুলি সম্পূর্ণ আরামদায়ক ও নিরাপদ?",
      a: "হ্যাঁ, সম্পূর্ণভাবে। আমাদের প্রতিটি ট্যুর বিশেষ করে ৫০+ এবং প্রবীণ নাগরিকদের শারীরিক স্বাচ্ছন্দ্য মাথায় রেখে ডিজাইন করা। টেম্পো ট্রাভেলারে কাউকে পেছনের অস্বস্তিকর সিটে বসানো হয় না, প্রতিদিন সিট রোটেশন হয়। লাদাখ ও স্পিতির মতো উচ্চস্থানের ট্যুরে সার্বক্ষণিক হাসপাতাল-গ্রেড বড় অক্সিজেন সিলিন্ডার এবং পরিবার পিছু পোর্টেবল অক্সিজেন ক্যান সাথে থাকে।"
    },
    {
      q: "২. খাবারের মান ও ব্যবস্থা কেমন থাকে? নিরামিষাশী বা ডায়াবেটিক রোগীদের আলাদা খাবার দেওয়া হয় কি?",
      a: "আমাদের নিজস্ব বাঙালি কুকিং টিম সাথে যায়। সকালের বেড টি, ব্রেকফাস্ট, লাঞ্চ, বিকেলের চা-স্ন্যাক্স থেকে রাতের ডিনার—সবই টাটকা ও ঘরোয়া বাঙালি স্বাদে রান্না হয়। নিরামিষাশী, ডায়াবেটিক বা তেল-মশলা কম খাওয়া বয়োজ্যেষ্ঠ সদস্যদের জন্য সম্পূর্ণ আলাদা ও পুষ্টিকর খাবারের বিশেষ ব্যবস্থা রাখা হয়।"
    },
    {
      q: "৩. আমি একা ভ্রমণ করতে চাইলে কি যেতে পারব? রুম শেয়ারিং কীভাবে হবে?",
      a: "অবশ্যই! আমাদের বহু সদস্য একাই ট্যুরে যোগ দেন এবং পরবর্তীতে একটি সুন্দর পরিবার হয়ে ওঠেন। একা এলে সমলিঙ্গের সহযাত্রীদের সাথে ডাবল বা ট্রিপল শেয়ারিং রুমে থাকার ব্যবস্থা করা হয়।"
    },
    {
      q: "৪. ট্রেন বা বিমানের টিকিট কি আপনারা কেটে দেবেন?",
      a: "আমাদের প্যাকেজ মূল্য মূলত পিকআপ স্টেশন থেকে ড্রপ স্টেশন পর্যন্ত স্থলভাগের সমস্ত খরচ অন্তর্ভুক্ত করে। তবে আপনি চাইলে আমাদের বিশ্বস্ত ট্রাভেল পার্টনার সামান্য সার্ভিস চার্জের বিনিময়ে আপনার কনফার্ম ট্রেন বা ফ্লাইটের টিকিট কেটে দেওয়ার পূর্ণ সহায়তা প্রদান করবেন।"
    },
    {
      q: "৫. বুকিং কীভাবে করব এবং অগ্রিম পেমেন্টের নিয়ম কী?",
      a: "আমাদের ওয়েবসাইটে 'বুকিং করুন' বোতামে ক্লিক করে ফর্মটি পূরণ করুন অথবা সরাসরি সোমজিৎ ভট্টাচার্য (+91 9433074880) বা অ্যাডমিন টিমের সাথে (+91 9432426448) WhatsApp-এ যোগাযোগ করুন।"
    }
  ],
  contact: {
    primary_phone: "9433074880",
    alt_phone: "8910073441",
    email: "iamsomjit@gmail.com",
    whatsapp_number: "919433074880",
    admin_name: "শর্মিষ্ঠা সরকার (Admin Team)",
    admin_phone: "9432426448",
    admin_phone_alt: "9123094168",
    address: "Fatakgora, Chandannagar, Hooghly, West Bengal - 712136"
  },
  footer: {
    about: "সোমজিৎ ভট্টাচার্য-এর আন্তরিক পরিচালনায় নিরাপদ, বিশ্বস্ত ও ঘরোয়া বাংলা গ্রুপ ট্যুর। প্রবীণ নাগরিক ও পরিবারের প্রতিটি সদস্যের জন্য তৈরি অবিস্মরণীয় ভ্রমণের ঠিকানা।",
    copyright: "© ২০২৬ Tour with Somjit. সর্বস্বত্ব সংরক্ষিত। ডিজাইন ও ডেভেলপমেন্ট: সোমজিৎ ভট্টাচার্য অফিশিয়াল ওয়েব টিম।"
  }
};

let adminData = JSON.parse(JSON.stringify(DEFAULT_SITE_DATA));
let activeEditingTourId = null;

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  initAuth();
  loadData();
  initTabs();
  initImageUploadListeners();
  renderAllForms();
  initAutoSaveListeners();
});

// Authentication System
function initAuth() {
  const overlay = document.getElementById("adminAuthOverlay");
  const pinInput = document.getElementById("adminPinInput");
  const loginBtn = document.getElementById("adminLoginBtn");

  const isAuthenticated = sessionStorage.getItem("tws_admin_auth");
  if (isAuthenticated === "true" && overlay) {
    overlay.style.display = "none";
  }

  if (loginBtn && pinInput) {
    loginBtn.addEventListener("click", () => {
      const enteredPin = pinInput.value.trim();
      const savedPin = localStorage.getItem("tws_admin_pin") || DEFAULT_PIN;
      if (enteredPin === savedPin) {
        sessionStorage.setItem("tws_admin_auth", "true");
        if (overlay) overlay.style.display = "none";
        showToast("সফলভাবে লগইন হয়েছে!");
      } else {
        alert("ভুল পিন (PIN)! সঠিক ৪ ডিজিটের পিন দিন। (ডিফল্ট পিন: 1234)");
      }
    });

    pinInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") loginBtn.click();
    });
  }
}

function adminLogout() {
  sessionStorage.removeItem("tws_admin_auth");
  location.reload();
}

// Deep Merge Helper
function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
      if (!target[key]) target[key] = {};
      deepMerge(target[key], source[key]);
    } else if (source[key] !== undefined) {
      target[key] = source[key];
    }
  }
  return target;
}

// Load Data
function loadData() {
  adminData = JSON.parse(JSON.stringify(DEFAULT_SITE_DATA));

  if (typeof window.TWS_SITE_DATA !== "undefined" && window.TWS_SITE_DATA.tours) {
    deepMerge(adminData, window.TWS_SITE_DATA);
  }

  const savedData = localStorage.getItem("tws_custom_site_data");
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData);
      deepMerge(adminData, parsed);
    } catch (e) {
      console.error("Local load error:", e);
    }
  }

  if (!adminData.tours || Object.keys(adminData.tours).length === 0) {
    adminData.tours = JSON.parse(JSON.stringify(DEFAULT_SITE_DATA.tours));
  }
}

// Navigation Tabs
function initTabs() {
  const navBtns = document.querySelectorAll(".admin-nav-item button");
  const tabPanes = document.querySelectorAll(".admin-tab-pane");

  navBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      navBtns.forEach(b => b.classList.remove("active"));
      tabPanes.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const targetId = btn.dataset.tab;
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add("active");
        if (targetId === "tabChatbot") loadChatbotDataFromFirebase();
        if (targetId === "tabBookingFields") renderAdminBookingFields();
      }
    });
  });
}

// Auto Save Listeners
function initAutoSaveListeners() {
  const inputs = document.querySelectorAll(".adm-input, .adm-textarea");
  inputs.forEach(input => {
    input.addEventListener("input", () => {
      saveAllData(false);
    });
  });
}

// Image File Upload Helper
function setupImageFileInput(fileInputId, textInputId, previewImgId) {
  const fileInput = document.getElementById(fileInputId);
  const textInput = document.getElementById(textInputId);
  const previewImg = document.getElementById(previewImgId);

  if (fileInput) {
    fileInput.addEventListener("change", function () {
      const file = this.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (e) {
        const base64Url = e.target.result;
        if (textInput) textInput.value = base64Url;
        if (previewImg) previewImg.src = base64Url;
        saveAllData(false);
        showToast("ছবি সফলভাবে আপলোড হয়েছে!");
      };
      reader.readAsDataURL(file);
    });
  }

  if (textInput) {
    textInput.addEventListener("input", function () {
      if (previewImg) previewImg.src = this.value || "assets/images/somjit_avatar.png";
      saveAllData(false);
    });
  }
}

function initImageUploadListeners() {
  setupImageFileInput("fileLogoUpload", "admLogoUrl", "previewLogoImg");
  setupImageFileInput("fileHostMainUpload", "admHostMainPhotoUrl", "previewHostMainImg");
  setupImageFileInput("fileHostAvatarUpload", "admHostAvatarUrl", "previewHostAvatarImg");
  setupImageFileInput("fileModalTourBannerUpload", "modalTourBanner", "previewModalTourBannerImg");
}

// Render All Admin Forms
function renderAllForms() {
  renderToursEditor();
  renderBrandingForm();
  renderGeneralForm();
  renderWhyUsForm();
  renderVlogsEditor();
  renderFoodForm();
  renderFaqEditor();
  renderCompanyAboutForm();
  renderContactForm();
  renderCloudSyncForm();
}

// 1. Tours Management (With Move Up/Down & Highlight Toggle Fix)
function renderToursEditor() {
  const container = document.getElementById("adminToursList");
  if (!container) return;

  if (!adminData.tours || Object.keys(adminData.tours).length === 0) {
    adminData.tours = JSON.parse(JSON.stringify(DEFAULT_SITE_DATA.tours));
  }

  const toursEntries = Object.entries(adminData.tours || {});
  
  if (toursEntries.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:2.5rem 1rem; background:#f8fafc; border:2px dashed #cbd5e1; border-radius:12px;">
        <p style="color:#64748b; font-size:1rem; margin-bottom:1rem;"><i class="fas fa-info-circle"></i> বর্তমানে কোনো ট্যুর তালিকায় নেই।</p>
        <button type="button" onclick="restoreDefaultTours()" class="btn-top btn-save-all">
          <i class="fas fa-undo"></i> ৬টি ডিফল্ট ট্যুর লোড করুন
        </button>
      </div>
    `;
    return;
  }

  let html = "";

  toursEntries.forEach(([tourId, tour], idx) => {
    const banner = tour.banner_image || "";
    const startPrice = (tour.plans && tour.plans.length > 0) ? tour.plans[0].price : 15000;
    const status = tour.status || "open";

    let statusPill = "";
    let itemStyle = "";
    
    // Highlight logic: only show orange border if tour is featured AND NOT CLOSED!
    const isActuallyFeatured = !!tour.is_featured && status !== "closed";

    if (status === "closed") {
      statusPill = `<span style="background:#ef4444; color:#fff; padding:2px 8px; border-radius:4px; font-size:0.75rem; font-weight:700;">🔴 বুকিং সমাপ্ত</span>`;
      itemStyle = "opacity: 0.72; background:#f8fafc; border: 1px dashed #cbd5e1;";
    } else if (status === "coming_soon") {
      statusPill = `<span style="background:#f59e0b; color:#fff; padding:2px 8px; border-radius:4px; font-size:0.75rem; font-weight:700;">🟡 কামিং সুন</span>`;
      itemStyle = "background:#fff;";
    } else if (status === "few_seats") {
      statusPill = `<span style="background:#dc2626; color:#fff; padding:2px 8px; border-radius:4px; font-size:0.75rem; font-weight:700;">🔥 সীমিত সিট</span>`;
      itemStyle = "background:#fff;";
    } else {
      statusPill = `<span style="background:#16a34a; color:#fff; padding:2px 8px; border-radius:4px; font-size:0.75rem; font-weight:700;">🟢 বুকিং চলছে</span>`;
      itemStyle = "background:#fff;";
    }

    const featuredBadge = isActuallyFeatured ? `<span style="background:#d97706; color:#fff; padding:2px 8px; border-radius:4px; font-size:0.75rem; font-weight:700; margin-left:4px;">⭐ হাইলাইটেড</span>` : "";

    html += `
      <div class="tour-edit-item" id="tourItem_${tour.id}" style="${itemStyle} ${isActuallyFeatured ? 'border:2px solid #d97706; box-shadow:0 4px 12px rgba(217,119,6,0.15);' : ''}">
        <div style="display:flex; gap:1.25rem; align-items:flex-start; flex-wrap:wrap;">
          
          <!-- Reorder buttons -->
          <div style="display:flex; flex-direction:column; gap:4px; justify-content:center; align-items:center; margin-right: -4px;">
            <button type="button" onclick="moveTourUp('${tour.id}')" class="btn-top" style="padding:4px 8px; font-size:0.75rem; background:#e2e8f0; color:#1e293b;" title="তালিকায় উপরে তুলুন" ${idx === 0 ? 'disabled style="opacity:0.3; cursor:not-allowed;"' : ''}>
              <i class="fas fa-arrow-up"></i>
            </button>
            <span style="font-size:0.72rem; font-weight:800; color:#64748b;">#${idx + 1}</span>
            <button type="button" onclick="moveTourDown('${tour.id}')" class="btn-top" style="padding:4px 8px; font-size:0.75rem; background:#e2e8f0; color:#1e293b;" title="তালিকায় নিচে নামান" ${idx === toursEntries.length - 1 ? 'disabled style="opacity:0.3; cursor:not-allowed;"' : ''}>
              <i class="fas fa-arrow-down"></i>
            </button>
          </div>

          <!-- 1:1 Square Thumbnail -->
          <div style="width:105px; height:105px; border-radius:8px; overflow:hidden; background:#1e293b; flex-shrink:0; border:1px solid #cbd5e1; position:relative; aspect-ratio:1/1;">
            <img src="${banner || 'assets/images/somjit_avatar.png'}" id="tourThumb_${tour.id}" style="width:100%; height:100%; object-fit:cover;">
          </div>
          
          <div style="flex:1; min-width:240px;">
            <div class="tour-edit-top" style="margin-bottom:0.4rem;">
              <div>
                <strong style="font-size:1.1rem; color:var(--admin-primary);">${tour.title}</strong>
                <div style="margin-top:4px;">
                  ${statusPill}
                  ${featuredBadge}
                  <span class="tour-badge-pill">${tour.dates || '২০২৬'}</span>
                </div>
              </div>
              <div style="display:flex; gap:6px; flex-wrap:wrap;">
                <button type="button" onclick="toggleTourHighlight('${tour.id}')" class="btn-top" style="background:${isActuallyFeatured ? '#d97706' : '#f1f5f9'}; color:${isActuallyFeatured ? '#fff' : '#334155'}; padding:5px 10px; font-size:0.8rem;" title="শীর্ষে হাইলাইট টগল করুন">
                  <i class="fas fa-star"></i> ${isActuallyFeatured ? 'আন-হাইলাইট' : 'হাইলাইট'}
                </button>
                <button type="button" onclick="openTourModal('${tour.id}')" class="btn-top" style="background:var(--admin-primary); color:#fff; padding:5px 12px; font-size:0.82rem;">
                  <i class="fas fa-edit"></i> এডিট
                </button>
                <button type="button" onclick="deleteTour('${tour.id}')" class="btn-top" style="background:#fee2e2; color:#ef4444; padding:5px 9px; font-size:0.82rem;">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>

            <div style="font-size:0.85rem; color:var(--admin-muted); margin-bottom:0.5rem;">
              <strong>মূল্য:</strong> ₹${startPrice.toLocaleString("en-IN")} | <strong>সময়কাল:</strong> ${tour.duration || 'দিন/রাত'}
            </div>

            <!-- Quick Status Switcher -->
            <div style="display:flex; align-items:center; gap:8px; background:#f1f5f9; padding:6px 12px; border-radius:6px;">
              <span style="font-size:0.82rem; font-weight:700;">স্ট্যাটাস:</span>
              <select onchange="changeTourStatusQuick('${tour.id}', this.value)" style="padding:3px 8px; border-radius:4px; font-size:0.82rem; border:1px solid #cbd5e1; font-weight:600;">
                <option value="open" ${status === 'open' ? 'selected' : ''}>🟢 বুকিং চলছে</option>
                <option value="few_seats" ${status === 'few_seats' ? 'selected' : ''}>🔥 সীমিত সিট বাকি</option>
                <option value="coming_soon" ${status === 'coming_soon' ? 'selected' : ''}>🟡 আগামী বছরের বুকিং কামিং সুন</option>
                <option value="closed" ${status === 'closed' ? 'selected' : ''}>🔴 এ বছরের বুকিং সমাপ্ত</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Move Tour Up
function moveTourUp(tourId) {
  const keys = Object.keys(adminData.tours);
  const idx = keys.indexOf(tourId);
  if (idx > 0) {
    const entries = Object.entries(adminData.tours);
    const temp = entries[idx];
    entries[idx] = entries[idx - 1];
    entries[idx - 1] = temp;

    const newObj = {};
    entries.forEach(([k, v]) => { newObj[k] = v; });
    adminData.tours = newObj;
    saveAllData(false);
    renderToursEditor();
    showToast("ট্যুরের ক্রম উপরে সরানো হয়েছে!");
  }
}

// Move Tour Down
function moveTourDown(tourId) {
  const keys = Object.keys(adminData.tours);
  const idx = keys.indexOf(tourId);
  if (idx < keys.length - 1) {
    const entries = Object.entries(adminData.tours);
    const temp = entries[idx];
    entries[idx] = entries[idx + 1];
    entries[idx + 1] = temp;

    const newObj = {};
    entries.forEach(([k, v]) => { newObj[k] = v; });
    adminData.tours = newObj;
    saveAllData(false);
    renderToursEditor();
    showToast("ট্যুরের ক্রম নিচে সরানো হয়েছে!");
  }
}

// Toggle Highlight
function toggleTourHighlight(tourId) {
  if (adminData.tours[tourId]) {
    const current = !!adminData.tours[tourId].is_featured;
    Object.values(adminData.tours).forEach(t => t.is_featured = false);
    adminData.tours[tourId].is_featured = !current;
    
    // If setting to featured, ensure status is not closed
    if (adminData.tours[tourId].is_featured && adminData.tours[tourId].status === "closed") {
      adminData.tours[tourId].status = "open";
    }

    saveAllData(false);
    renderToursEditor();
    showToast(adminData.tours[tourId].is_featured ? "⭐ ট্যুরটি সফলভাবে হাইলাইট করা হয়েছে!" : "ট্যুরটির হাইলাইট রিমুভ করা হয়েছে!");
  }
}

function changeTourStatusQuick(tourId, newStatus) {
  if (adminData.tours[tourId]) {
    adminData.tours[tourId].status = newStatus;
    // If closed, remove featured highlight border
    if (newStatus === "closed") {
      adminData.tours[tourId].is_featured = false;
    }
    saveAllData(false);
    renderToursEditor();
    showToast("ট্যুরের বুকিং স্ট্যাটাস পরিবর্তিত হয়েছে!");
  }
}

function restoreDefaultTours() {
  adminData.tours = JSON.parse(JSON.stringify(DEFAULT_SITE_DATA.tours));
  saveAllData(false);
  renderToursEditor();
  showToast("✓ ৬টি ডিফল্ট ট্যুর সফলভাবে লোড হয়েছে!");
}

let activeEditingTourGallery = [];

// Facebook-Style Tour Modal Publisher
function openTourModal(tourId) {
  activeEditingTourId = tourId;
  const modal = document.getElementById("tourEditModal");
  if (!modal) return;

  let tour = null;
  if (tourId && adminData.tours[tourId]) {
    tour = adminData.tours[tourId];
    document.getElementById("tourModalHeaderTitle").textContent = "ট্যুর এডিট: " + tour.title;
  } else {
    activeEditingTourId = "tour-" + Date.now();
    tour = {
      id: activeEditingTourId,
      title: "নতুন ট্যুর ২০২৬",
      category: "other",
      status: "open",
      is_featured: false,
      dates: "নভেম্বর ২০২৬",
      duration: "৪ রাত / ৫ দিন",
      token_per_person: 3000,
      banner_image: "",
      youtube_url: "",
      gallery: [],
      plans: [{ id: "p1", name: "ডাবল শেয়ারিং রুম (জনপ্রতি)", price: 15000 }],
      caption_details: "সোমজিৎ ভট্টাচার্য-এর সাথে আকর্ষণীয় গ্রুপ ট্যুর।\n\n📌 প্রধান আকর্ষণ:\n✓ আরামদায়ক এসি গাড়ি\n✓ নিজস্ব বাবুর্চির রান্না করা ঘরোয়া বাঙালি খাবার\n✓ প্রবীণ নাগরিকদের বিশেষ যত্ন ও সার্বক্ষণিক গাইডেন্স"
    };
    document.getElementById("tourModalHeaderTitle").textContent = "নতুন ট্যুর যোগ করুন";
  }

  document.getElementById("modalTourTitle").value = tour.title || "";
  document.getElementById("modalTourStatus").value = tour.status || "open";
  document.getElementById("modalTourFeatured").checked = !!tour.is_featured;
  document.getElementById("modalTourDates").value = tour.dates || "";
  document.getElementById("modalTourDuration").value = tour.duration || "";
  document.getElementById("modalTourBanner").value = tour.banner_image || "";
  
  const ytInput = document.getElementById("modalTourYoutube");
  if (ytInput) ytInput.value = tour.youtube_url || "";
  
  const previewImg = document.getElementById("previewModalTourBannerImg");
  if (previewImg) previewImg.src = tour.banner_image || "assets/images/somjit_avatar.png";

  document.getElementById("modalTourToken").value = tour.token_per_person || 3000;
  
  const priceVal = (tour.plans && tour.plans[0]) ? tour.plans[0].price : 15000;
  document.getElementById("modalTourPrice").value = priceVal;

  let fullCaption = tour.caption_details || "";
  if (!fullCaption && tour.inclusions && tour.inclusions.length > 0) {
    fullCaption = tour.inclusions.map(i => "✓ " + i).join("\n");
  }
  document.getElementById("modalTourCaption").value = fullCaption;

  // Initialize Gallery
  activeEditingTourGallery = tour.gallery ? JSON.parse(JSON.stringify(tour.gallery)) : [];
  renderTourModalGallery();

  modal.classList.add("active");
}

function renderTourModalGallery() {
  const container = document.getElementById("modalTourGalleryList");
  if (!container) return;

  if (activeEditingTourGallery.length === 0) {
    container.innerHTML = `<div style="font-size:0.85rem; color:var(--admin-muted); text-align:center; padding:0.6rem; background:#fff; border-radius:6px; border:1px dashed #cbd5e1;">কোনো অতিরিক্ত ছবি যোগ করা নেই। উপরের '+ নতুন ছবি যোগ করুন' বাটনে চাপ দিন।</div>`;
    return;
  }

  container.innerHTML = activeEditingTourGallery.map((g, idx) => `
    <div style="background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:0.75rem; display:flex; align-items:center; gap:10px;">
      <div style="width:50px; height:50px; border-radius:6px; overflow:hidden; background:#1e293b; flex-shrink:0; border:1px solid #cbd5e1;">
        <img src="${g.image || 'assets/images/somjit_avatar.png'}" id="previewTourGalleryImg_${idx}" style="width:100%; height:100%; object-fit:cover;">
      </div>
      <div style="flex:1; display:flex; gap:8px;">
        <input type="text" value="${g.caption || ''}" placeholder="ছবির নাম (উদা: হোটেল ও রুম)" onchange="activeEditingTourGallery[${idx}].caption = this.value;" class="adm-input" style="font-size:0.84rem; padding:5px 8px; flex:1;">
        <input type="text" id="tourGalleryInp_${idx}" value="${g.image || ''}" placeholder="ছবির URL লিঙ্ক" onchange="activeEditingTourGallery[${idx}].image = this.value; document.getElementById('previewTourGalleryImg_${idx}').src = this.value;" class="adm-input" style="font-size:0.84rem; padding:5px 8px; flex:1.5;">
      </div>
      <label class="btn-top btn-view-site" style="cursor:pointer; font-size:0.8rem; padding:6px 10px; margin:0; flex-shrink:0;">
        <i class="fas fa-upload"></i> ছবি
        <input type="file" accept="image/*" style="display:none;" onchange="uploadTourGalleryPhoto(${idx}, this)">
      </label>
      <button type="button" onclick="deleteTourGalleryItem(${idx})" style="background:#fee2e2; color:#ef4444; border:none; padding:6px 10px; border-radius:6px; cursor:pointer; flex-shrink:0;">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `).join("");
}

function addTourGalleryItem() {
  activeEditingTourGallery.push({
    caption: "হোটেল ও রিসোর্ট",
    image: ""
  });
  renderTourModalGallery();
}

function deleteTourGalleryItem(idx) {
  activeEditingTourGallery.splice(idx, 1);
  renderTourModalGallery();
}

function uploadTourGalleryPhoto(idx, fileInput) {
  if (fileInput.files && fileInput.files[0]) {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      const dataUrl = e.target.result;
      if (activeEditingTourGallery[idx]) {
        activeEditingTourGallery[idx].image = dataUrl;
        const prev = document.getElementById(`previewTourGalleryImg_${idx}`);
        if (prev) prev.src = dataUrl;
        const inp = document.getElementById(`tourGalleryInp_${idx}`);
        if (inp) inp.value = dataUrl;
      }
    };
    reader.readAsDataURL(file);
  }
}

function closeTourModal() {
  const modal = document.getElementById("tourEditModal");
  if (modal) modal.classList.remove("active");
}

function saveTourModalData() {
  if (!activeEditingTourId) return;

  const title = document.getElementById("modalTourTitle").value.trim();
  if (!title) {
    alert("দয়া করে ট্যুরের নাম লিখুন!");
    return;
  }

  const status = document.getElementById("modalTourStatus").value;
  let is_featured = document.getElementById("modalTourFeatured").checked;
  if (status === "closed") is_featured = false; // Closed tours cannot be featured

  const dates = document.getElementById("modalTourDates").value.trim();
  const duration = document.getElementById("modalTourDuration").value.trim();
  const banner = document.getElementById("modalTourBanner").value.trim();
  const youtube_url = document.getElementById("modalTourYoutube") ? document.getElementById("modalTourYoutube").value.trim() : "";
  const token = parseInt(document.getElementById("modalTourToken").value) || 3000;
  const price = parseInt(document.getElementById("modalTourPrice").value) || 15000;
  const caption = document.getElementById("modalTourCaption").value.trim();

  if (is_featured) {
    Object.values(adminData.tours).forEach(t => t.is_featured = false);
  }

  let existingTour = adminData.tours[activeEditingTourId] || {};
  let plans = existingTour.plans || [];
  if (plans.length === 0) {
    plans = [{ id: activeEditingTourId + "_p1", name: "ডাবল শেয়ারিং রুম (জনপ্রতি)", price: price }];
  } else {
    plans[0].price = price;
  }

  adminData.tours[activeEditingTourId] = {
    id: activeEditingTourId,
    title: title,
    category: existingTour.category || "other",
    status: status,
    is_featured: is_featured,
    dates: dates || "২০২৬",
    duration: duration || "দিন/রাত",
    token_per_person: token,
    banner_image: banner,
    youtube_url: youtube_url,
    gallery: activeEditingTourGallery,
    plans: plans,
    caption_details: caption,
    inclusions: caption ? caption.split("\n").map(l => l.trim()).filter(Boolean) : (existingTour.inclusions || []),
    itinerary: existingTour.itinerary || [
      { day: "দিন ১", title: "যাত্রা ও পৌঁছানো", desc: "স্টেশনে পিকআপ ও হোটেলে চেক-ইন।" },
      { day: "দিন ২", title: "সাইটসিয়িং", desc: "প্রধান দর্শনীয় স্থান ভ্রমণ।" }
    ]
  };

  saveAllData(false);
  renderToursEditor();
  closeTourModal();
  showToast("✓ ট্যুরের সমস্ত তথ্য সফলভাবে আপডেট হয়েছে!");
}

function addNewTour() {
  openTourModal(null);
}

function deleteTour(tourId) {
  if (confirm("আপনি কি নিশ্চিত এই ট্যুরটি মুছে ফেলতে চান?")) {
    delete adminData.tours[tourId];
    saveAllData(false);
    renderToursEditor();
    showToast("ট্যুর মুছে ফেলা হয়েছে!");
  }
}

// 2. Branding
function renderBrandingForm() {
  const b = adminData.branding || {};
  const logoInput = document.getElementById("admLogoUrl");
  const hostMainInput = document.getElementById("admHostMainPhotoUrl");
  const hostAvatarInput = document.getElementById("admHostAvatarUrl");

  if (logoInput) logoInput.value = b.logo_url || "";
  if (hostMainInput) hostMainInput.value = b.host_main_photo || "";
  if (hostAvatarInput) hostAvatarInput.value = b.host_avatar || "";

  const logoImg = document.getElementById("previewLogoImg");
  const hostMainImg = document.getElementById("previewHostMainImg");
  const hostAvatarImg = document.getElementById("previewHostAvatarImg");

  if (logoImg && b.logo_url) logoImg.src = b.logo_url;
  if (hostMainImg && b.host_main_photo) hostMainImg.src = b.host_main_photo;
  if (hostAvatarImg && b.host_avatar) hostAvatarImg.src = b.host_avatar;
}

// 3. General
function renderGeneralForm() {
  const g = adminData.general || {};
  document.getElementById("admAgencyName").value = g.agency_name || "";
  document.getElementById("admTagline").value = g.tagline || "";
  document.getElementById("admHeroBadge").value = g.hero_badge || "";
  document.getElementById("admHeroHeadlinePrefix").value = g.hero_headline_prefix || "";
  document.getElementById("admHeroHeadlineHighlight").value = g.hero_headline_highlight || "";
  document.getElementById("admHeroSubtext").value = g.hero_subtext || "";
  document.getElementById("admUrgentNotice").value = g.urgent_notice || "";

  const subTitleInput = document.getElementById("admTourSectionSubtitle");
  const mainTitleInput = document.getElementById("admTourSectionTitle");
  if (subTitleInput) subTitleInput.value = g.tour_section_subtitle || "আমাদের ২০২৬ সালের অফিশিয়াল ক্যালেন্ডার";
  if (mainTitleInput) mainTitleInput.value = g.tour_section_title || "সোমজিৎ ভট্টাচার্য-এর সিগনেচার গ্রুপ ট্যুরসমূহ";

  renderHeroPointsList();
}

function renderHeroPointsList() {
  const container = document.getElementById("adminHeroPointsList");
  if (!container) return;

  const points = (adminData.general && adminData.general.hero_points) || [];
  let html = "";

  points.forEach((p, idx) => {
    html += `
      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:0.75rem; margin-bottom:0.6rem; display:flex; gap:10px; align-items:center;">
        <input type="text" value="${p.icon || 'fa-check'}" onchange="updateHeroPoint(${idx}, 'icon', this.value)" class="adm-input" style="width:140px; font-size:0.85rem;" placeholder="fa-user-shield">
        <input type="text" value="${p.text || ''}" onchange="updateHeroPoint(${idx}, 'text', this.value)" class="adm-input" style="flex:1;" placeholder="পয়েন্ট টেক্সট">
        <button type="button" onclick="deleteHeroPoint(${idx})" style="background:#fee2e2; color:#ef4444; border:none; padding:6px 10px; border-radius:4px; cursor:pointer;">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
  });

  container.innerHTML = html;
}

function updateHeroPoint(idx, field, value) {
  if (adminData.general && adminData.general.hero_points && adminData.general.hero_points[idx]) {
    adminData.general.hero_points[idx][field] = value.trim();
    saveAllData(false);
  }
}

function addHeroPoint() {
  if (!adminData.general) adminData.general = {};
  if (!adminData.general.hero_points) adminData.general.hero_points = [];
  adminData.general.hero_points.push({ icon: "fa-check-circle", text: "নতুন বিশেষ সুবিধা" });
  saveAllData(false);
  renderHeroPointsList();
  showToast("নতুন পয়েন্ট যুক্ত হয়েছে!");
}

function deleteHeroPoint(idx) {
  if (confirm("আপনি কি নিশ্চিত এই পয়েন্টটি ডিলিট করতে চান?")) {
    adminData.general.hero_points.splice(idx, 1);
    saveAllData(false);
    renderHeroPointsList();
    showToast("পয়েন্ট মুছে ফেলা হয়েছে!");
  }
}

// 4. Dynamic Why Us & Trust Badges Manager
function renderWhyUsForm() {
  const trustContainer = document.getElementById("adminTrustStripList");
  if (trustContainer) {
    const list = adminData.trust_strip || [];
    let html = "";
    list.forEach((item, idx) => {
      html += `
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:1.25rem; margin-bottom:1rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
            <strong style="color:var(--admin-primary); font-size:1rem;"><i class="fas ${item.icon || 'fa-check'}"></i> ট্রাস্ট ব্যাজ #${idx + 1}</strong>
            <button type="button" onclick="deleteTrustItem(${idx})" style="background:#fee2e2; color:#ef4444; border:none; padding:4px 10px; border-radius:4px; cursor:pointer; font-size:0.82rem;">
              <i class="fas fa-trash"></i> ডিলিট
            </button>
          </div>
          <div class="form-grid-2">
            <div class="adm-form-group">
              <label class="adm-label">শিরোনাম (Title)</label>
              <input type="text" value="${item.title || ''}" onchange="updateTrustItem(${idx}, 'title', this.value)" class="adm-input">
            </div>
            <div class="adm-form-group">
              <label class="adm-label">আইকন ক্লাস (FontAwesome)</label>
              <input type="text" value="${item.icon || 'fa-heartbeat'}" onchange="updateTrustItem(${idx}, 'icon', this.value)" class="adm-input" placeholder="fa-heartbeat, fa-utensils">
            </div>
          </div>
          <div class="adm-form-group" style="margin-bottom:0;">
            <label class="adm-label">সংক্ষিপ্ত বিবরণ (Description)</label>
            <input type="text" value="${item.desc || ''}" onchange="updateTrustItem(${idx}, 'desc', this.value)" class="adm-input">
          </div>
        </div>
      `;
    });
    trustContainer.innerHTML = html;
  }

  const whyContainer = document.getElementById("adminWhyUsList");
  if (whyContainer) {
    const list = adminData.why_us || [];
    let html = "";
    list.forEach((item, idx) => {
      html += `
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:1.25rem; margin-bottom:1rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
            <strong style="color:var(--admin-primary); font-size:1rem;"><i class="fas ${item.icon || 'fa-star'}"></i> স্তম্ভ #${idx + 1}</strong>
            <button type="button" onclick="deleteWhyUsItem(${idx})" style="background:#fee2e2; color:#ef4444; border:none; padding:4px 10px; border-radius:4px; cursor:pointer; font-size:0.82rem;">
              <i class="fas fa-trash"></i> ডিলিট
            </button>
          </div>
          <div class="form-grid-2">
            <div class="adm-form-group">
              <label class="adm-label">স্তম্ভের নাম (Title)</label>
              <input type="text" value="${item.title || ''}" onchange="updateWhyUsItem(${idx}, 'title', this.value)" class="adm-input">
            </div>
            <div class="adm-form-group">
              <label class="adm-label">আইকন ক্লাস (FontAwesome)</label>
              <input type="text" value="${item.icon || 'fa-user-friends'}" onchange="updateWhyUsItem(${idx}, 'icon', this.value)" class="adm-input" placeholder="fa-user-friends, fa-utensil-spoon">
            </div>
          </div>
          <div class="adm-form-group" style="margin-bottom:0;">
            <label class="adm-label">বিস্তারিত বিবরণ (Description)</label>
            <textarea onchange="updateWhyUsItem(${idx}, 'desc', this.value)" class="adm-textarea" style="height:70px;">${item.desc || ''}</textarea>
          </div>
        </div>
      `;
    });
    whyContainer.innerHTML = html;
  }
}

function updateTrustItem(idx, field, val) {
  if (adminData.trust_strip && adminData.trust_strip[idx]) {
    adminData.trust_strip[idx][field] = val.trim();
    saveAllData(false);
  }
}

function addTrustItem() {
  if (!adminData.trust_strip) adminData.trust_strip = [];
  adminData.trust_strip.push({
    icon: "fa-star",
    title: "নতুন সুবিধা",
    desc: "প্রবীণ নাগরিক ও পরিবারের জন্য বিশেষ সুবিধা ও নিরাপত্তা"
  });
  saveAllData(false);
  renderWhyUsForm();
  showToast("নতুন ট্রাস্ট ব্যাজ যুক্ত হয়েছে!");
}

function deleteTrustItem(idx) {
  if (confirm("আপনি কি নিশ্চিত এই ট্রাস্ট ব্যাজটি মুছে ফেলতে চান?")) {
    adminData.trust_strip.splice(idx, 1);
    saveAllData(false);
    renderWhyUsForm();
    showToast("ট্রাস্ট ব্যাজ মুছে ফেলা হয়েছে!");
  }
}

function updateWhyUsItem(idx, field, val) {
  if (adminData.why_us && adminData.why_us[idx]) {
    adminData.why_us[idx][field] = val.trim();
    saveAllData(false);
  }
}

function addWhyUsItem() {
  if (!adminData.why_us) adminData.why_us = [];
  adminData.why_us.push({
    icon: "fa-shield-alt",
    title: "নতুন বিশেষ স্তম্ভ",
    desc: "সোমজিৎ ভট্টাচার্য-এর পরিচালনায় সম্পূর্ণ নিরাপদ ও আন্তরিক ভ্রমণ অভিজ্ঞতা।"
  });
  saveAllData(false);
  renderWhyUsForm();
  showToast("নতুন স্তম্ভ যুক্ত হয়েছে!");
}

function deleteWhyUsItem(idx) {
  if (confirm("আপনি কি নিশ্চিত এই স্তম্ভটি মুছে ফেলতে চান?")) {
    adminData.why_us.splice(idx, 1);
    saveAllData(false);
    renderWhyUsForm();
    showToast("স্তম্ভ মুছে ফেলা হয়েছে!");
  }
}

// 5. YouTube Vlogs
function extractYouTubeVideoId(url) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  return (match && match[1]) ? match[1] : null;
}

function renderVlogsEditor() {
  const container = document.getElementById("adminVlogsList");
  if (!container) return;

  const vlogs = adminData.vlogs || [];
  if (vlogs.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:2rem; background:#f8fafc; border:2px dashed #cbd5e1; border-radius:12px;">
        <i class="fab fa-youtube" style="font-size:2.5rem; color:#dc2626; margin-bottom:0.75rem;"></i>
        <h4 style="font-size:1.1rem; color:var(--admin-dark); margin-bottom:0.5rem;">কোনো YouTube ভিডিও যোগ করা নেই</h4>
        <p style="font-size:0.88rem; color:var(--admin-muted); margin-bottom:1rem;">উপরে '+ নতুন YouTube ভিডিও যোগ করুন' বোতামে চাপ দিয়ে ভিডিওর লিংক বসান।</p>
        <button type="button" onclick="addNewYouTubeVlog()" class="btn-top btn-save-all" style="background:#dc2626; margin:0 auto;">
          <i class="fas fa-plus"></i> প্রথম ভিডিও যোগ করুন
        </button>
      </div>
    `;
    return;
  }

  let html = "";
  vlogs.forEach((vlog, idx) => {
    const videoId = extractYouTubeVideoId(vlog.youtube_url);
    const thumb = vlog.thumbnail_url || (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "assets/images/somjit_host.jpg");

    html += `
      <div class="tour-edit-item" id="vlogItem_${idx}" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:1.25rem; margin-bottom:1.25rem; box-shadow:0 2px 10px rgba(0,0,0,0.03);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:8px;">
          <strong style="color:#dc2626; font-size:1.05rem; display:flex; align-items:center; gap:8px;">
            <i class="fab fa-youtube" style="font-size:1.3rem;"></i> ভিডিও #${idx + 1}
          </strong>
          <button type="button" onclick="deleteVlog(${idx})" style="background:#fee2e2; color:#ef4444; border:none; padding:5px 12px; border-radius:6px; cursor:pointer; font-weight:700; font-size:0.85rem;">
            <i class="fas fa-trash"></i> ডিলিট করুন
          </button>
        </div>

        <div style="display:flex; gap:1.25rem; flex-wrap:wrap;">
          <!-- Live Video Thumbnail Preview & Custom Upload -->
          <div style="width:190px; flex-shrink:0;">
            <div style="width:100%; aspect-ratio:16/9; border-radius:8px; overflow:hidden; background:#000; position:relative; box-shadow:0 4px 12px rgba(0,0,0,0.15); border:2px solid #e2e8f0;">
              <img src="${thumb}" id="vlogThumbPreview_${idx}" style="width:100%; height:100%; object-fit:cover; display:block;">
              <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.25); color:#fff; font-size:2rem; pointer-events:none;">
                <i class="fab fa-youtube" style="color:#ff0000; filter:drop-shadow(0 2px 8px rgba(0,0,0,0.5));"></i>
              </div>
            </div>
            <div style="margin-top:8px; display:flex; gap:6px;">
              <label class="btn-top btn-view-site" style="cursor:pointer; font-size:0.78rem; padding:5px 8px; flex:1; text-align:center; margin:0;">
                <i class="fas fa-upload"></i> থাম্বনেইল
                <input type="file" accept="image/*" style="display:none;" onchange="uploadVlogThumbnail(${idx}, this)">
              </label>
              <button type="button" onclick="resetVlogAutoThumb(${idx})" class="btn-top" style="font-size:0.78rem; padding:5px 8px; background:#f1f5f9; color:#475569;" title="YouTube থেকে অটো থাম্বনেইল নিন">
                অটো
              </button>
            </div>
          </div>

          <!-- Direct In-Place Edit Inputs -->
          <div style="flex:1; min-width:240px; display:flex; flex-direction:column; gap:10px;">
            <div class="adm-form-group" style="margin-bottom:0;">
              <label class="adm-label" style="font-size:0.88rem; font-weight:700;">ভিডিওর শিরোনাম (Title) *</label>
              <input type="text" id="vlogTitleInp_${idx}" value="${vlog.title || ''}" placeholder="যেমন: লাদাখ মহাবিস্ময় - খারদুংলা ও প্যাংগং লেক" onchange="updateVlogField(${idx}, 'title', this.value)" class="adm-input" style="padding:8px 12px; font-weight:700;">
            </div>

            <div class="adm-form-group" style="margin-bottom:0;">
              <label class="adm-label" style="font-size:0.88rem; font-weight:700; color:#dc2626;">YouTube ভিডিও লিংক (Video URL) *</label>
              <input type="url" id="vlogUrlInp_${idx}" value="${vlog.youtube_url || ''}" placeholder="https://www.youtube.com/watch?v=... বা https://youtu.be/..." oninput="updateVlogUrl(${idx}, this.value)" class="adm-input" style="padding:8px 12px; font-weight:600; border-color:#fca5a5;">
            </div>

            <div class="adm-form-group" style="margin-bottom:0;">
              <label class="adm-label" style="font-size:0.85rem;">ভিডিওর সংক্ষিপ্ত বিবরণ (Description)</label>
              <input type="text" id="vlogDescInp_${idx}" value="${vlog.desc || ''}" placeholder="যেমন: লেহ, নুব্রা ভ্যালি ও সিয়াচেন বেসক্যাম্প ভ্রমণের বাস্তব অনুভূতি।" onchange="updateVlogField(${idx}, 'desc', this.value)" class="adm-input" style="padding:7px 10px; font-size:0.88rem;">
            </div>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function updateVlogField(idx, field, val) {
  if (adminData.vlogs && adminData.vlogs[idx]) {
    adminData.vlogs[idx][field] = val.trim();
    saveAllData(false);
  }
}

let vlogFetchDebounce = {};

function updateVlogUrl(idx, val) {
  const cleanUrl = val.trim();
  if (adminData.vlogs && adminData.vlogs[idx]) {
    adminData.vlogs[idx].youtube_url = cleanUrl;
    const videoId = extractYouTubeVideoId(cleanUrl);
    const preview = document.getElementById(`vlogThumbPreview_${idx}`);
    if (videoId && preview && !adminData.vlogs[idx].thumbnail_url) {
      preview.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }

    // Auto-fetch YouTube Title and Description via oEmbed
    if (videoId && cleanUrl) {
      clearTimeout(vlogFetchDebounce[idx]);
      vlogFetchDebounce[idx] = setTimeout(async () => {
        showToast("🔍 YouTube থেকে টাইটেল ও থাম্বনেইল আনা হচ্ছে...");
        try {
          let metaUrl = `https://noembed.com/embed?url=${encodeURIComponent(cleanUrl)}`;
          let res = await fetch(metaUrl);
          let meta = await res.json();

          if (!meta || !meta.title) {
            metaUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(cleanUrl)}&format=json`;
            res = await fetch(metaUrl);
            meta = await res.json();
          }

          if (meta && meta.title) {
            adminData.vlogs[idx].title = meta.title;
            const titleInput = document.getElementById(`vlogTitleInp_${idx}`);
            if (titleInput) titleInput.value = meta.title;

            const defaultDesc = meta.author_name ? `${meta.author_name} - এর অফিসিয়াল ভ্রমণ ভিডিও ও সম্পূর্ণ গাইড।` : "সোমজিৎ ভট্টাচার্য-এর সাথে আকর্ষণীয় ভ্রমণ অভিজ্ঞতা।";
            const descInput = document.getElementById(`vlogDescInp_${idx}`);
            if (descInput) {
              adminData.vlogs[idx].desc = defaultDesc;
              descInput.value = defaultDesc;
            }

            if (meta.thumbnail_url && !adminData.vlogs[idx].thumbnail_url) {
              if (preview) preview.src = meta.thumbnail_url;
            }

            saveAllData(false);
            showToast(`✓ YouTube টাইটেল অটোমেটিক লোড হয়েছে: "${meta.title.slice(0, 30)}..."`);
          }
        } catch (err) {
          console.warn("oEmbed fetch note:", err);
        }
      }, 500);
    }

    saveAllData(false);
  }
}

function uploadVlogThumbnail(idx, fileInput) {
  if (fileInput.files && fileInput.files[0]) {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      const dataUrl = e.target.result;
      if (adminData.vlogs && adminData.vlogs[idx]) {
        adminData.vlogs[idx].thumbnail_url = dataUrl;
        const prev = document.getElementById(`vlogThumbPreview_${idx}`);
        if (prev) prev.src = dataUrl;
        saveAllData(false);
        showToast("কাস্টম থাম্বনেইল সফলভাবে আপলোড হয়েছে!");
      }
    };
    reader.readAsDataURL(file);
  }
}

function resetVlogAutoThumb(idx) {
  if (adminData.vlogs && adminData.vlogs[idx]) {
    adminData.vlogs[idx].thumbnail_url = "";
    const videoId = extractYouTubeVideoId(adminData.vlogs[idx].youtube_url);
    const prev = document.getElementById(`vlogThumbPreview_${idx}`);
    if (prev) {
      prev.src = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "assets/images/somjit_host.jpg";
    }
    saveAllData(false);
    showToast("YouTube অটো থাম্বনেইল সেট করা হয়েছে!");
  }
}

function addNewYouTubeVlog() {
  if (!adminData.vlogs) adminData.vlogs = [];
  adminData.vlogs.unshift({
    id: "vlog-" + Date.now(),
    title: "নতুন YouTube ট্রাভেল ভ্লগ",
    desc: "সোমজিৎ ভট্টাচার্য-এর সাথে আকর্ষণীয় ভ্রমণ অভিজ্ঞতা।",
    youtube_url: "",
    thumbnail_url: ""
  });
  saveAllData(false);
  renderVlogsEditor();
  showToast("নতুন ভিডিও কার্ড যোগ হয়েছে! লিংক ও শিরোনাম বসিয়ে দিন।");
}

function deleteVlog(idx) {
  if (confirm("আপনি কি নিশ্চিত এই ভিডিওটি মুছে ফেলতে চান?")) {
    adminData.vlogs.splice(idx, 1);
    saveAllData(false);
    renderVlogsEditor();
    showToast("ভিডিও মুছে ফেলা হয়েছে!");
  }
}

// 6. Food Menu
function renderFoodForm() {
  const f = adminData.food_section || {};
  const enabledToggle = document.getElementById("admFoodEnabled");
  const linkedTourSelect = document.getElementById("admFoodLinkedTour");

  if (enabledToggle) enabledToggle.checked = f.enabled !== false;
  
  if (linkedTourSelect) {
    linkedTourSelect.innerHTML = "";
    Object.values(adminData.tours || {}).forEach(t => {
      const opt = document.createElement("option");
      opt.value = t.id;
      opt.textContent = `${t.title} (${t.status === 'closed' ? '🔴 সমাপ্ত' : '🟢 চালু'})`;
      if (t.id === f.linked_tour_id) opt.selected = true;
      linkedTourSelect.appendChild(opt);
    });
  }

  document.getElementById("admFoodBadge").value = f.badge || "";
  document.getElementById("admFoodTitle").value = f.title || "";
  document.getElementById("admFoodDesc").value = f.desc || "";
  document.getElementById("admFoodTags").value = (f.tags || []).join(", ");
  document.getElementById("admFoodDay1").value = f.day1 || "";
  document.getElementById("admFoodDay2").value = f.day2 || "";
  document.getElementById("admFoodDay3").value = f.day3 || "";
}

// 7. FAQ Editor
function renderFaqEditor() {
  const container = document.getElementById("adminFaqList");
  if (!container) return;

  const faqs = adminData.faqs || [];
  let html = "";

  faqs.forEach((faq, idx) => {
    html += `
      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:1.2rem; margin-bottom:1rem;">
        <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
          <strong style="color:var(--admin-primary); font-size:1.02rem;">${faq.q}</strong>
          <button type="button" onclick="deleteFaq(${idx})" style="background:#fee2e2; color:#ef4444; border:none; padding:3px 8px; border-radius:4px; cursor:pointer;">
            <i class="fas fa-trash"></i>
          </button>
        </div>
        <p style="font-size:0.92rem; color:var(--admin-muted);">${faq.a}</p>
      </div>
    `;
  });

  container.innerHTML = html;
}

function openFaqModal() {
  document.getElementById("modalFaqQuestion").value = "";
  document.getElementById("modalFaqAnswer").value = "";
  const modal = document.getElementById("faqEditModal");
  if (modal) modal.classList.add("active");
}

function closeFaqModal() {
  const modal = document.getElementById("faqEditModal");
  if (modal) modal.classList.remove("active");
}

function saveFaqModalData() {
  const q = document.getElementById("modalFaqQuestion").value.trim();
  const a = document.getElementById("modalFaqAnswer").value.trim();

  if (!q || !a) {
    alert("দয়া করে প্রশ্ন ও উত্তর উভয়ই লিখুন!");
    return;
  }

  if (!adminData.faqs) adminData.faqs = [];
  adminData.faqs.push({ q: q, a: a });

  saveAllData(false);
  renderFaqEditor();
  closeFaqModal();
  showToast("নতুন প্রশ্ন সফলভাবে যুক্ত হয়েছে!");
}

function addNewFaq() {
  openFaqModal();
}

function deleteFaq(idx) {
  if (confirm("আপনি কি নিশ্চিত এই প্রশ্নটি মুছে ফেলতে চান?")) {
    adminData.faqs.splice(idx, 1);
    saveAllData(false);
    renderFaqEditor();
    showToast("প্রশ্ন মুছে ফেলা হয়েছে!");
  }
}

// 8. Company About & Team Manager
function renderCompanyAboutForm() {
  const c = adminData.company_about || {};
  
  const badgeInput = document.getElementById("admAboutBadge");
  const titleInput = document.getElementById("admAboutTitle");
  const taglineInput = document.getElementById("admAboutTagline");
  const descInput = document.getElementById("admAboutDesc");
  const teamHeadingInput = document.getElementById("admAboutTeamHeading");
  const addrInput = document.getElementById("admAboutAddress");
  const emailInput = document.getElementById("admAboutEmail");
  const phone1Input = document.getElementById("admAboutPhone1");
  const phone2Input = document.getElementById("admAboutPhone2");

  if (badgeInput) badgeInput.value = c.badge || "আমাদের পরিচিতি ও টিম";
  if (titleInput) titleInput.value = c.title || "Tour with Somjit - অফিশিয়াল কোম্পানি বিবরণ";
  if (taglineInput) taglineInput.value = c.tagline || "Explore More. Experience More. | YOUR JOURNEY, OUR PASSION.";
  if (descInput) descInput.value = c.desc || "সোমজিৎ ভট্টাচার্য-এর আন্তরিক পরিচালনায় নিরাপদ, আরামদায়ক ও ঘরোয়া বাংলা গ্রুপ ট্যুর সংস্থা।";
  if (teamHeadingInput) teamHeadingInput.value = c.team_heading || "আমাদের নিবেদিতপ্রাণ ম্যানেজমেন্ট টিম";
  if (addrInput) addrInput.value = c.address || "Fatakgora, Chandannagar, Hooghly, West Bengal - 712136";
  if (emailInput) emailInput.value = c.email || "iamsomjit@gmail.com";
  if (phone1Input) phone1Input.value = c.primary_phone || "9433074880";
  if (phone2Input) phone2Input.value = c.alt_phone || "8910073441";

  // Render Team Members
  const container = document.getElementById("adminTeamMembersList");
  if (!container) return;

  const team = c.team || [];
  let html = "";

  team.forEach((m, idx) => {
    html += `
      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:1.25rem; margin-bottom:1rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
          <strong style="color:var(--admin-primary); font-size:1rem;"><i class="fas fa-user-tie"></i> টিম মেম্বার #${idx + 1}</strong>
          <button type="button" onclick="deleteTeamMember(${idx})" style="background:#fee2e2; color:#ef4444; border:none; padding:4px 10px; border-radius:4px; cursor:pointer; font-size:0.82rem;">
            <i class="fas fa-trash"></i> ডিলিট
          </button>
        </div>
        <div class="form-grid-3" style="margin-bottom:0.75rem;">
          <div class="adm-form-group" style="margin-bottom:0;">
            <label class="adm-label">নাম (Name)</label>
            <input type="text" value="${m.name || ''}" onchange="updateTeamMember(${idx}, 'name', this.value)" class="adm-input">
          </div>
          <div class="adm-form-group" style="margin-bottom:0;">
            <label class="adm-label">পদবি / দায়িত্ব (Role)</label>
            <input type="text" value="${m.role || ''}" onchange="updateTeamMember(${idx}, 'role', this.value)" class="adm-input">
          </div>
          <div class="adm-form-group" style="margin-bottom:0;">
            <label class="adm-label">ফোন নম্বর (Phone)</label>
            <input type="text" value="${m.phone || ''}" onchange="updateTeamMember(${idx}, 'phone', this.value)" class="adm-input">
          </div>
        </div>

        <!-- Team Member Photo Upload / URL Edit -->
        <div style="background:#ffffff; border:1px dashed #cbd5e1; border-radius:8px; padding:0.75rem; display:flex; align-items:center; gap:12px;">
          <div style="width:52px; height:52px; border-radius:50%; overflow:hidden; border:2px solid var(--admin-primary); background:#f1f5f9; flex-shrink:0;">
            <img src="${m.photo || 'assets/images/somjit_avatar.png'}" id="previewTeamMemberImg_${idx}" style="width:100%; height:100%; object-fit:cover;">
          </div>
          <div style="flex:1;">
            <label style="font-size:0.8rem; font-weight:700; color:var(--admin-dark); margin-bottom:3px; display:block;">প্রোফাইল ছবি (URL বা আপলোড)</label>
            <input type="text" id="admTeamPhotoInp_${idx}" value="${m.photo || ''}" placeholder="ছবির অনলাইন লিংক পেস্ট করুন" onchange="updateTeamMember(${idx}, 'photo', this.value); document.getElementById('previewTeamMemberImg_${idx}').src = this.value;" class="adm-input" style="font-size:0.84rem; padding:5px 8px;">
          </div>
          <label class="btn-top btn-view-site" style="cursor:pointer; font-size:0.8rem; padding:6px 12px; margin:0; flex-shrink:0;">
            <i class="fas fa-upload"></i> ছবি আপলোড
            <input type="file" accept="image/*" style="display:none;" onchange="uploadTeamMemberPhoto(${idx}, this)">
          </label>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function updateTeamMember(idx, field, val) {
  if (adminData.company_about && adminData.company_about.team && adminData.company_about.team[idx]) {
    adminData.company_about.team[idx][field] = val.trim();
    saveAllData(false);
  }
}

function uploadTeamMemberPhoto(idx, fileInput) {
  if (fileInput.files && fileInput.files[0]) {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      const dataUrl = e.target.result;
      updateTeamMember(idx, 'photo', dataUrl);
      const prev = document.getElementById(`previewTeamMemberImg_${idx}`);
      if (prev) prev.src = dataUrl;
      const inp = document.getElementById(`admTeamPhotoInp_${idx}`);
      if (inp) inp.value = dataUrl;
      showToast(`টিম মেম্বার #${idx + 1}-এর ফটো সফলভাবে আপডেট হয়েছে!`);
    };
    reader.readAsDataURL(file);
  }
}

function addTeamMember() {
  if (!adminData.company_about) adminData.company_about = {};
  if (!adminData.company_about.team) adminData.company_about.team = [];
  adminData.company_about.team.push({
    name: "নতুন টিম মেম্বার",
    role: "ট্যুর ম্যানেজার / গাইড",
    phone: "+91 9433074880",
    photo: "assets/images/somjit_avatar.png"
  });
  saveAllData(false);
  renderCompanyAboutForm();
  showToast("নতুন টিম মেম্বার যুক্ত হয়েছে!");
}

function deleteTeamMember(idx) {
  if (confirm("আপনি কি নিশ্চিত এই টিম মেম্বারকে ডিলিট করতে চান?")) {
    adminData.company_about.team.splice(idx, 1);
    saveAllData(false);
    renderCompanyAboutForm();
    showToast("টিম মেম্বার মুছে ফেলা হয়েছে!");
  }
}

// 9. Contact & Footer
function renderContactForm() {
  const c = adminData.contact || {};
  document.getElementById("admPrimaryPhone").value = c.primary_phone || "9433074880";
  document.getElementById("admAltPhone").value = c.alt_phone || "8910073441";
  document.getElementById("admWhatsApp").value = c.whatsapp_number || "919433074880";
  document.getElementById("admAdminName").value = c.admin_name || "শর্মিষ্ঠা সরকার (Admin Team)";
  document.getElementById("admAdminPhone").value = c.admin_phone || "9432426448";
  document.getElementById("admAdminPhoneAlt").value = c.admin_phone_alt || "9123094168";
  document.getElementById("admAddress").value = c.address || "Fatakgora, Chandannagar, Hooghly, West Bengal - 712136";

  const h = adminData.host || {};
  document.getElementById("admHostName").value = h.name || "সোমজিৎ ভট্টাচার্য";
  document.getElementById("admHostTitle").value = h.title || "প্রতিষ্ঠাতা ও জনপ্রিয় বাংলা ট্রাভেল ভ্লগার";
  document.getElementById("admHostQuote").value = h.quote || "";
  document.getElementById("admHostYt").value = h.youtube_url || "";
  document.getElementById("admHostFb").value = h.facebook_url || "";

  const ft = adminData.footer || {};
  document.getElementById("admFooterAbout").value = ft.about || "";
  document.getElementById("admFooterCopyright").value = ft.copyright || "";
}

// 10. Realtime Cloud Sync
function renderCloudSyncForm() {
  const cloudUrlInput = document.getElementById("admCloudDbUrl");
  if (cloudUrlInput) {
    const savedUrl = localStorage.getItem("tws_cloud_db_url") || (window.TWS_CLOUD_CONFIG ? window.TWS_CLOUD_CONFIG.database_url : "https://tour-with-somjit-default-rtdb.firebaseio.com");
    cloudUrlInput.value = savedUrl;
  }
}

// Save All Master Data
async function saveAllData(notify = true) {
  adminData.branding = {
    logo_url: document.getElementById("admLogoUrl").value.trim(),
    host_main_photo: document.getElementById("admHostMainPhotoUrl").value.trim(),
    host_avatar: document.getElementById("admHostAvatarUrl").value.trim()
  };

  adminData.general = {
    agency_name: document.getElementById("admAgencyName").value.trim(),
    tagline: document.getElementById("admTagline").value.trim(),
    hero_badge: document.getElementById("admHeroBadge").value.trim(),
    hero_headline_prefix: document.getElementById("admHeroHeadlinePrefix").value.trim(),
    hero_headline_highlight: document.getElementById("admHeroHeadlineHighlight").value.trim(),
    hero_subtext: document.getElementById("admHeroSubtext").value.trim(),
    tour_section_subtitle: document.getElementById("admTourSectionSubtitle") ? document.getElementById("admTourSectionSubtitle").value.trim() : "আমাদের ২০২৬ সালের অফিশিয়াল ক্যালেন্ডার",
    tour_section_title: document.getElementById("admTourSectionTitle") ? document.getElementById("admTourSectionTitle").value.trim() : "সোমজিৎ ভট্টাচার্য-এর সিগনেচার গ্রুপ ট্যুরসমূহ",
    hero_points: adminData.general.hero_points || [],
    urgent_notice: document.getElementById("admUrgentNotice").value.trim()
  };

  adminData.host = {
    name: document.getElementById("admHostName").value.trim(),
    title: document.getElementById("admHostTitle").value.trim(),
    quote: document.getElementById("admHostQuote").value.trim(),
    youtube_url: document.getElementById("admHostYt").value.trim(),
    facebook_url: document.getElementById("admHostFb").value.trim()
  };

  const tagsArr = document.getElementById("admFoodTags").value.split(",").map(t => t.trim()).filter(Boolean);
  const enabledToggle = document.getElementById("admFoodEnabled");
  const linkedTourSelect = document.getElementById("admFoodLinkedTour");

  adminData.food_section = {
    enabled: enabledToggle ? enabledToggle.checked : true,
    linked_tour_id: linkedTourSelect ? linkedTourSelect.value : "sundarban-2026",
    badge: document.getElementById("admFoodBadge").value.trim(),
    title: document.getElementById("admFoodTitle").value.trim(),
    desc: document.getElementById("admFoodDesc").value.trim(),
    tags: tagsArr,
    day1: document.getElementById("admFoodDay1").value.trim(),
    day2: document.getElementById("admFoodDay2").value.trim(),
    day3: document.getElementById("admFoodDay3").value.trim()
  };

  const addrVal = document.getElementById("admAboutAddress") ? document.getElementById("admAboutAddress").value.trim() : "Fatakgora, Chandannagar, Hooghly, West Bengal - 712136";
  const emailVal = document.getElementById("admAboutEmail") ? document.getElementById("admAboutEmail").value.trim() : "iamsomjit@gmail.com";

  adminData.company_about = {
    badge: document.getElementById("admAboutBadge") ? document.getElementById("admAboutBadge").value.trim() : "আমাদের পরিচিতি ও টিম",
    title: document.getElementById("admAboutTitle") ? document.getElementById("admAboutTitle").value.trim() : "Tour with Somjit - অফিশিয়াল কোম্পানি বিবরণ",
    tagline: document.getElementById("admAboutTagline") ? document.getElementById("admAboutTagline").value.trim() : "Explore More. Experience More. | YOUR JOURNEY, OUR PASSION.",
    desc: document.getElementById("admAboutDesc") ? document.getElementById("admAboutDesc").value.trim() : "",
    team_heading: document.getElementById("admAboutTeamHeading") ? document.getElementById("admAboutTeamHeading").value.trim() : "আমাদের নিবেদিতপ্রাণ ম্যানেজমেন্ট টিম",
    address: addrVal,
    email: emailVal,
    primary_phone: document.getElementById("admAboutPhone1") ? document.getElementById("admAboutPhone1").value.trim() : "9433074880",
    alt_phone: document.getElementById("admAboutPhone2") ? document.getElementById("admAboutPhone2").value.trim() : "8910073441",
    team: adminData.company_about && adminData.company_about.team ? adminData.company_about.team : []
  };

  adminData.contact = {
    primary_phone: document.getElementById("admPrimaryPhone").value.trim(),
    alt_phone: document.getElementById("admAltPhone").value.trim(),
    email: emailVal,
    whatsapp_number: document.getElementById("admWhatsApp").value.trim(),
    admin_name: document.getElementById("admAdminName").value.trim(),
    admin_phone: document.getElementById("admAdminPhone").value.trim(),
    admin_phone_alt: document.getElementById("admAdminPhoneAlt").value.trim(),
    address: addrVal
  };

  adminData.footer = {
    about: document.getElementById("admFooterAbout").value.trim(),
    copyright: document.getElementById("admFooterCopyright").value.trim()
  };

  localStorage.setItem("tws_custom_site_data", JSON.stringify(adminData));

  const cloudUrl = localStorage.getItem("tws_cloud_db_url") || (window.TWS_CLOUD_CONFIG ? window.TWS_CLOUD_CONFIG.database_url : null);
  let cloudSuccess = false;

  if (cloudUrl) {
    try {
      const response = await fetch(`${cloudUrl.replace(/\/$/, '')}/site_data.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminData)
      });
      if (response.ok) cloudSuccess = true;
    } catch(err) {
      console.warn("Cloud push deferred");
    }
  }

  if (notify) {
    if (cloudSuccess) {
      showToast("☁️ ক্লাউড ডাটাবেস আপডেট হয়েছে! সমস্ত মোবাইল ও ডেক্সটপে লাইভ হয়েছে।");
    } else {
      showToast("✓ সমস্ত পরিবর্তন লোকাল মেমোরিতে সেভ হয়েছে!");
    }
  }
}

// Push to Cloud
async function pushToCloudNow() {
  const cloudUrl = document.getElementById("admCloudDbUrl") ? document.getElementById("admCloudDbUrl").value.trim() : "";
  if (!cloudUrl) {
    alert("দয়া করে ক্লাউড ডাটাবেস URL দিন!");
    return;
  }
  localStorage.setItem("tws_cloud_db_url", cloudUrl);
  showToast("ক্লাউড ডাটাবেসে আপলোড করা হচ্ছে...");
  
  try {
    const resp = await fetch(`${cloudUrl.replace(/\/$/, '')}/site_data.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adminData)
    });
    if (resp.ok) {
      alert("✓ অভিনন্দন! ক্লাউড ডাটাবেসে সমস্ত তথ্য সফলভাবে আপলোড হয়েছে। এখন সমস্ত মোবাইল ও ডেক্সটপে সাথে সাথে লাইভ দেখা যাবে।");
      showToast("✓ ক্লাউড সিঙ্ক সফল!");
    } else {
      alert("ℹ️ ক্লাউড ডাটাবেসে কানেক্ট করা যায়নি। URL সঠিক কিনা যাচাই করুন।");
    }
  } catch(e) {
    alert("ℹ️ ক্লাউড ডাটাবেস কানেকশন এরর: " + e.message);
  }
}

// Fetch from Cloud
async function fetchFromCloudNow() {
  const cloudUrl = document.getElementById("admCloudDbUrl") ? document.getElementById("admCloudDbUrl").value.trim() : "";
  if (!cloudUrl) {
    alert("দয়া করে ক্লাউড ডাটাবেস URL দিন!");
    return;
  }
  showToast("ক্লাউড থেকে ডাটা ফেচ করা হচ্ছে...");
  
  try {
    const resp = await fetch(`${cloudUrl.replace(/\/$/, '')}/site_data.json`, { cache: 'no-store' });
    if (resp.ok) {
      const cloudData = await resp.json();
      if (cloudData && typeof cloudData === "object") {
        deepMerge(adminData, cloudData);
        localStorage.setItem("tws_custom_site_data", JSON.stringify(adminData));
        renderAllForms();
        alert("✓ ক্লাউড ডাটাবেস থেকে সর্বশেষ ডাটা সফলভাবে ডাউনলোড হয়েছে!");
        showToast("✓ ক্লাউড ডাটা লোড সম্পন্ন!");
      }
    } else {
      alert("ℹ️ ক্লাউড ডাটা পাওয়া যায়নি।");
    }
  } catch(e) {
    alert("ℹ️ ক্লাউড ডাটা রিড এরর: " + e.message);
  }
}

// Copy Cross-Device Sync String
function copySyncString() {
  saveAllData(false);
  const syncStr = JSON.stringify(adminData);
  navigator.clipboard.writeText(syncStr).then(() => {
    alert("✓ আপনার সমস্ত এডিট করা ডাটার সিঙ্ক কোড ক্লিপবোর্ডে কপি হয়েছে!\n\nএটি WhatsApp-এ পাঠিয়ে ডেক্সটপের অ্যাডমিন প্যানেলে 'সিঙ্ক কোড পেস্ট করুন' অপশনে পেস্ট করে দিলেই সব আপডেট চলে আসবে।");
    showToast("✓ সিঙ্ক কোড কপি হয়েছে!");
  }).catch(() => {
    prompt("নিচের সিঙ্ক কোডটি কপি করে নিন:", syncStr);
  });
}

function importSyncString() {
  const code = prompt("মোবাইল থেকে কপি করা সিঙ্ক কোডটি এখানে পেস্ট করুন:");
  if (!code) return;

  try {
    const parsed = JSON.parse(code.trim());
    deepMerge(adminData, parsed);
    localStorage.setItem("tws_custom_site_data", JSON.stringify(adminData));
    renderAllForms();
    alert("✓ অভিনন্দন! মোবাইলের সমস্ত এডিট ডেক্সটপে সফলভাবে ইমপোর্ট হয়ে গেছে!");
    showToast("✓ সিঙ্ক সফল!");
  } catch(e) {
    alert("ভুল সিঙ্ক কোড! সঠিক কোড পেস্ট করুন।");
  }
}

// Export Master data.js File
function exportMasterDataJs() {
  saveAllData(false);
  const fileContent = `/**
 * Tour with Somjit - Master Database File (data.js)
 * Generated from Visual Admin Panel on ${new Date().toLocaleString()}
 */

window.TWS_SITE_DATA = ${JSON.stringify(adminData, null, 2)};
`;

  const blob = new Blob([fileContent], { type: "application/javascript;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "data.js";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);

  showToast("✓ নতুন data.js ফাইল সফলভাবে ডাউনলোড হয়েছে!");
  alert("✓ আপনার নতুন data.js ফাইলটি ডাউনলোড হয়েছে!\n\nএই ফাইলটি আপনার প্রোজেক্টের 'assets/js/data.js' ফাইলে রিপ্লেস করে জিপটি Netlify-তে ড্রপ করলে সারা পৃথিবীর সমস্ত ডিভাইস ও ভিজিটররা আপনার নতুন এডিট দেখতে পাবেন।");
}

function exportBackupJson() {
  saveAllData(false);
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(adminData, null, 2));
  const a = document.createElement("a");
  a.setAttribute("href", dataStr);
  a.setAttribute("download", "tour-with-somjit-complete-backup.json");
  document.body.appendChild(a);
  a.click();
  a.remove();
  showToast("ব্যাকআপ JSON ফাইল ডাউনলোড হয়েছে!");
}

function importBackupJson(fileInput) {
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const imported = JSON.parse(e.target.result);
      deepMerge(adminData, imported);
      localStorage.setItem("tws_custom_site_data", JSON.stringify(adminData));
      alert("ব্যাকআপ সফলভাবে রিস্টোর হয়েছে! পেজ রিলোড হচ্ছে...");
      location.reload();
    } catch(err) {
      alert("ভুল JSON ফাইল! সঠিক ব্যাকআপ ফাইল নির্বাচন করুন।");
    }
  };
  reader.readAsText(file);
}

function resetToDefaults() {
  if (confirm("আপনি কি নিশ্চিত সমস্ত সেটিংস ও কাস্টমাইজেশন মুছে দিয়ে ফ্যাক্টরি ডিফল্ট অবস্থায় ফিরে যেতে চান?")) {
    localStorage.removeItem("tws_custom_site_data");
    location.reload();
  }
}

function changeSecurityPin() {
  const current = prompt("বর্তমান ৪ ডিজিটের পিন দিন:");
  const savedPin = localStorage.getItem("tws_admin_pin") || DEFAULT_PIN;
  if (current !== savedPin) {
    alert("বর্তমান পিন সঠিক নয়!");
    return;
  }
  const newPin = prompt("নতুন ৪ ডিজিটের পিন লিখুন:");
  if (newPin && newPin.length === 4 && !isNaN(newPin)) {
    localStorage.setItem("tws_admin_pin", newPin);
    showToast("✓ নতুন সিকিউরিটি পিন সেট করা হয়েছে!");
  } else {
    alert("পিন অবশ্যই ৪ সংখ্যার হতে হবে!");
  }
}

function showToast(msg) {
  let toast = document.getElementById("adminToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "adminToast";
    toast.className = "admin-toast";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fas fa-check-circle" style="color:#10b981;"></i> ${msg}`;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3500);
}

// 12. Load Chatbot Data (Custom FAQs, Leads, Logs) from Firebase Realtime Database
let currentCustomFaqsList = [];

async function loadChatbotDataFromFirebase() {
  const faqsContainer = document.getElementById("adminCustomFaqsListContainer");
  const leadsContainer = document.getElementById("adminChatbotLeadsContainer");
  const logsContainer = document.getElementById("adminChatbotLogsContainer");
  const cloudUrl = localStorage.getItem("tws_cloud_db_url") || "https://tour-with-somjit-default-rtdb.firebaseio.com";

  // 1. Load Custom FAQs
  if (faqsContainer) {
    faqsContainer.innerHTML = `<p style="color:var(--admin-muted); text-align:center; padding:1rem;"><i class="fas fa-spinner fa-spin"></i> ট্রেইনিং ডাটা লোড হচ্ছে...</p>`;
    try {
      const resp = await fetch(`${cloudUrl.replace(/\/$/, '')}/ai_custom_faqs.json`, { cache: 'no-store' });
      if (resp.ok) {
        const data = await resp.json();
        currentCustomFaqsList = data && typeof data === "object" ? (Array.isArray(data) ? data : Object.values(data)) : [];
        renderAdminCustomFaqs(currentCustomFaqsList);
      }
    } catch(e) {
      faqsContainer.innerHTML = `<p style="color:#ef4444; text-align:center;">FAQ লোড ত্রুটি: ${e.message}</p>`;
    }
  }

  // 2. Load Leads
  if (leadsContainer) {
    leadsContainer.innerHTML = `<p style="color:var(--admin-muted); font-size:0.92rem; text-align:center; padding:1rem;"><i class="fas fa-spinner fa-spin"></i> Firebase থেকে লিডস লোড হচ্ছে...</p>`;
    try {
      const resp = await fetch(`${cloudUrl.replace(/\/$/, '')}/leads.json`, { cache: 'no-store' });
      if (resp.ok) {
        const leadsData = await resp.json();
        if (leadsData && typeof leadsData === "object" && Object.keys(leadsData).length > 0) {
          const leads = Object.values(leadsData).reverse();
          let tableHtml = `
            <table style="width:100%; border-collapse:collapse; font-size:0.92rem; text-align:left;">
              <thead>
                <tr style="background:#f1f5f9; border-bottom:2px solid #cbd5e1; color:#1e293b;">
                  <th style="padding:10px 12px;">তারিখ ও সময়</th>
                  <th style="padding:10px 12px;">ফোন নম্বর</th>
                  <th style="padding:10px 12px;">কাস্টমারের জিজ্ঞাসা</th>
                  <th style="padding:10px 12px; text-align:center;">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
          `;
          leads.forEach(lead => {
            const timeFormatted = lead.created_at ? new Date(lead.created_at).toLocaleString("bn-BD") : "সাম্প্রতিক";
            const cleanPhone = (lead.phone || "").replace(/[^0-9]/g, "");
            tableHtml += `
              <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:10px 12px; color:#64748b; font-size:0.85rem; white-space:nowrap;">${timeFormatted}</td>
                <td style="padding:10px 12px; font-weight:700; color:#1b4332;">
                  <a href="tel:${lead.phone}" style="color:#2563eb; text-decoration:none;"><i class="fas fa-phone-alt"></i> ${lead.phone}</a>
                </td>
                <td style="padding:10px 12px; color:#334155;">${lead.query || 'ট্যুর বুকিং ইনকোয়ারি'}</td>
                <td style="padding:10px 12px; text-align:center;">
                  <a href="https://wa.me/91${cleanPhone}?text=নমস্কার,%20Tour%20with%20Somjit%20থেকে%20যোগাযোগ%20করা%20হচ্ছে।" target="_blank" style="background:#25d366; color:#fff; padding:5px 12px; border-radius:99px; text-decoration:none; font-size:0.82rem; font-weight:700; display:inline-flex; align-items:center; gap:4px;">
                    <i class="fab fa-whatsapp"></i> WhatsApp
                  </a>
                </td>
              </tr>
            `;
          });
          tableHtml += `</tbody></table>`;
          leadsContainer.innerHTML = tableHtml;
        } else {
          leadsContainer.innerHTML = `<p style="color:var(--admin-muted); font-size:0.92rem; text-align:center; padding:1.5rem;"><i class="fas fa-info-circle"></i> এখনো কোনো নতুন লিড নেই। কাস্টমাররা চ্যাটবটে প্রশ্ন বা ফোন নম্বর দিলে স্বয়ংক্রিয়ভাবে এখানে চলে আসবে।</p>`;
        }
      }
    } catch(e) {
      leadsContainer.innerHTML = `<p style="color:#ef4444; text-align:center; padding:1rem;">ডাটাবেস রিড এরর: ${e.message}</p>`;
    }
  }

  // 3. Load Logs
  if (logsContainer) {
    logsContainer.innerHTML = `<p style="color:var(--admin-muted); font-size:0.92rem; text-align:center; padding:1rem;"><i class="fas fa-spinner fa-spin"></i> চ্যাট হিস্ট্রি লোড হচ্ছে...</p>`;
    try {
      const resp = await fetch(`${cloudUrl.replace(/\/$/, '')}/chat_logs.json`, { cache: 'no-store' });
      if (resp.ok) {
        const logsData = await resp.json();
        if (logsData && typeof logsData === "object" && Object.keys(logsData).length > 0) {
          let logsHtml = "";
          Object.entries(logsData).reverse().slice(0, 15).forEach(([sessId, msgs]) => {
            logsHtml += `<div style="background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:12px 14px; margin-bottom:12px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">`;
            logsHtml += `<div style="font-size:0.8rem; font-weight:700; color:#8b5cf6; margin-bottom:8px; display:flex; align-items:center; gap:6px;"><i class="fas fa-user-circle"></i> সেশন: ${sessId}</div>`;
            Object.values(msgs).forEach(m => {
              logsHtml += `<div style="font-size:0.9rem; margin-bottom:5px;"><strong style="color:#1b4332;">কাস্টমার:</strong> ${m.user_message}</div>`;
              logsHtml += `<div style="font-size:0.88rem; color:#475569; margin-bottom:10px; padding:6px 12px; background:#f8fafc; border-left:3px solid #10b981; border-radius:4px;"><strong style="color:#059669;">এআই বট:</strong> ${m.bot_response}</div>`;
            });
            logsHtml += `</div>`;
          });
          logsContainer.innerHTML = logsHtml || `<p style="text-align:center; color:var(--admin-muted); padding:1rem;">কোনো চ্যাট হিস্ট্রি এখনো নেই।</p>`;
        } else {
          logsContainer.innerHTML = `<p style="text-align:center; color:var(--admin-muted); padding:1rem;"><i class="fas fa-comments"></i> কোনো চ্যাট হিস্ট্রি এখনো নেই।</p>`;
        }
      }
    } catch(e){
      logsContainer.innerHTML = `<p style="color:#ef4444; text-align:center; padding:1rem;">চ্যাট হিস্ট্রি লোড এরর: ${e.message}</p>`;
    }
  }
}

function renderAdminCustomFaqs(faqs) {
  const container = document.getElementById("adminCustomFaqsListContainer");
  if (!container) return;

  if (!faqs || faqs.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:2rem; color:var(--admin-muted);">
        <i class="fas fa-robot" style="font-size:2rem; color:#10b981; margin-bottom:10px; display:block;"></i>
        কোনো কাস্টম FAQ এখনো তৈরি করা হয়নি। উপরের <strong>'+ নতুন AI FAQ ট্রেইনিং'</strong> বাটনে ক্লিক করে আপনি চ্যাটবটকে নতুন যেকোনো প্রশ্ন ও উত্তরের প্রশিক্ষণ দিতে পারেন।
      </div>
    `;
    return;
  }

  let html = `<div style="display:flex; flex-direction:column; gap:12px;">`;
  faqs.forEach((faq, index) => {
    html += `
      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-left:4px solid #f59e0b; border-radius:8px; padding:14px; display:flex; justify-content:space-between; align-items:flex-start; gap:12px;">
        <div style="flex:1;">
          <div style="font-size:1rem; font-weight:800; color:#0f172a; margin-bottom:6px;">
            <i class="fas fa-question-circle" style="color:#f59e0b;"></i> ${faq.question}
          </div>
          ${faq.keywords ? `<div style="font-size:0.8rem; color:#64748b; margin-bottom:8px;"><i class="fas fa-tags"></i> কিওয়ার্ড: <span style="background:#e2e8f0; padding:2px 6px; border-radius:4px;">${faq.keywords}</span></div>` : ''}
          <div style="font-size:0.92rem; color:#334155; line-height:1.55; white-space:pre-line;">${faq.answer}</div>
        </div>
        <div style="display:flex; gap:6px; flex-shrink:0;">
          <button type="button" onclick="editAiFaq(${index})" class="btn-top" style="background:#e2e8f0; color:#334155; padding:6px 12px; font-size:0.82rem;" title="এডিট করুন">
            <i class="fas fa-edit"></i>
          </button>
          <button type="button" onclick="deleteAiFaq(${index})" class="btn-top" style="background:#fee2e2; color:#dc2626; padding:6px 12px; font-size:0.82rem;" title="মুছে ফেলুন">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    `;
  });
  html += `</div>`;
  container.innerHTML = html;
}

function openNewAiFaqModal() {
  document.getElementById("modalAiFaqId").value = "";
  document.getElementById("modalAiFaqQuestion").value = "";
  document.getElementById("modalAiFaqKeywords").value = "";
  document.getElementById("modalAiFaqAnswer").value = "";
  const modal = document.getElementById("aiFaqModal");
  if (modal) modal.classList.add("active");
}

function editAiFaq(index) {
  const faq = currentCustomFaqsList[index];
  if (!faq) return;
  document.getElementById("modalAiFaqId").value = index;
  document.getElementById("modalAiFaqQuestion").value = faq.question || "";
  document.getElementById("modalAiFaqKeywords").value = faq.keywords || "";
  document.getElementById("modalAiFaqAnswer").value = faq.answer || "";
  const modal = document.getElementById("aiFaqModal");
  if (modal) modal.classList.add("active");
}

function closeAiFaqModal() {
  const modal = document.getElementById("aiFaqModal");
  if (modal) modal.classList.remove("active");
}

async function saveAiFaqModalData() {
  const idStr = document.getElementById("modalAiFaqId").value;
  const question = document.getElementById("modalAiFaqQuestion").value.trim();
  const keywords = document.getElementById("modalAiFaqKeywords").value.trim();
  const answer = document.getElementById("modalAiFaqAnswer").value.trim();

  if (!question || !answer) {
    alert("প্রশ্ন ও উত্তর উভয়ই পূরণ করতে হবে!");
    return;
  }

  const newFaq = { question, keywords, answer, updated_at: new Date().toISOString() };

  if (idStr !== "") {
    const idx = parseInt(idStr, 10);
    currentCustomFaqsList[idx] = newFaq;
  } else {
    currentCustomFaqsList.push(newFaq);
  }

  closeAiFaqModal();
  renderAdminCustomFaqs(currentCustomFaqsList);

  // Save to Firebase
  const cloudUrl = localStorage.getItem("tws_cloud_db_url") || "https://tour-with-somjit-default-rtdb.firebaseio.com";
  try {
    const resp = await fetch(`${cloudUrl.replace(/\/$/, '')}/ai_custom_faqs.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentCustomFaqsList)
    });
    if (resp.ok) {
      showToast("✓ কাস্টম FAQ সফলভাবে Firebase-এ সেভ হয়েছে!");
    }
  } catch(e) {
    alert("Firebase ক্লাউড সেভ ত্রুটি: " + e.message);
  }
}

async function deleteAiFaq(index) {
  if (!confirm("আপনি কি নিশ্চিত এই কাস্টম FAQ ট্রেইনিং মুছে ফেলতে চান?")) return;
  currentCustomFaqsList.splice(index, 1);
  renderAdminCustomFaqs(currentCustomFaqsList);

  const cloudUrl = localStorage.getItem("tws_cloud_db_url") || "https://tour-with-somjit-default-rtdb.firebaseio.com";
  try {
    await fetch(`${cloudUrl.replace(/\/$/, '')}/ai_custom_faqs.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentCustomFaqsList)
    });
    showToast("✓ FAQ মুছে ফেলা হয়েছে!");
  } catch(e) {
    alert("মুছে ফেলতে ব্যর্থ: " + e.message);
  }
}

// 13. Booking Form & Field Customizer Logic
function getBookingFieldsList() {
  const siteData = window.TWS_SITE_DATA || {};
  if (!siteData.booking_fields || !Array.isArray(siteData.booking_fields)) {
    siteData.booking_fields = [
      { id: "persons", label: "মোট যাত্রী সংখ্যা", type: "number", required: true, min: 1, max: 50, defaultVal: 1, placeholder: "1", width: "half" },
      { id: "guest_age", label: "মূল যাত্রীর বয়স", type: "number", required: true, min: 1, max: 100, placeholder: "উদাঃ 52", width: "half" },
      { id: "guest_name", label: "মূল যাত্রীর নাম", type: "text", required: true, placeholder: "আপনার পুরো নাম", width: "half" },
      { id: "guest_phone", label: "WhatsApp মোবাইল নম্বর", type: "tel", required: true, placeholder: "10 ডিজিট নম্বর", width: "half" },
      { id: "pickup_point", label: "পিকআপ পয়েন্ট (বিকল্প)", type: "text", required: false, placeholder: "যেমনঃ হাওড়া / শিয়ালদহ / বিমানবন্দর", width: "full" },
      { id: "food_choice", label: "খাবারের পছন্দ", type: "select", options: ["মাছ ও বাঙালি আমিষ", "খাঁটি নিরামিষ (Veg)", "জৈন খাবার (No Onion/Garlic)"], required: false, width: "full" },
      { id: "special_notes", label: "বিশেষ কোনো নির্দেশনা বা শারীরিক সমস্যা", type: "textarea", required: false, placeholder: "যদি কোনো বিশেষ পরামর্শ বা শারীরিক নির্দেশনা থাকে...", width: "full" }
    ];
    window.TWS_SITE_DATA = siteData;
  }
  return siteData.booking_fields;
}

function renderAdminBookingFields() {
  const container = document.getElementById("adminBookingFieldsListContainer");
  if (!container) return;

  const fields = getBookingFieldsList();

  let html = `<div style="display:flex; flex-direction:column; gap:10px;">`;
  fields.forEach((f, idx) => {
    const isCore = ["persons", "guest_name", "guest_phone"].includes(f.id);
    const typeLabelMap = {
      text: "টেক্সট বক্স (Text)",
      number: "সংখ্যা (Number)",
      tel: "ফোন নম্বর (Phone)",
      select: "ড্রপডাউন অপশন (Dropdown)",
      textarea: "বড় টেক্সট বক্স (Textarea)"
    };

    html += `
      <div style="background:#ffffff; border:1px solid #e2e8f0; border-left:4px solid ${f.required ? '#0284c7' : '#94a3b8'}; border-radius:10px; padding:14px; display:flex; justify-content:space-between; align-items:center; gap:12px; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
        <div style="flex:1;">
          <div style="font-size:1.02rem; font-weight:800; color:#0f172a; display:flex; align-items:center; gap:8px; margin-bottom:4px;">
            <span>${idx + 1}. ${escapeHtml(f.label)}</span>
            ${f.required ? '<span style="background:#dbeafe; color:#1e40af; font-size:0.75rem; font-weight:700; padding:2px 8px; border-radius:99px;">বাধ্যতামূলক</span>' : '<span style="background:#f1f5f9; color:#64748b; font-size:0.75rem; padding:2px 8px; border-radius:99px;">ঐচ্ছিক</span>'}
            <span style="background:#f0fdf4; color:#166534; font-size:0.75rem; padding:2px 8px; border-radius:99px;">${typeLabelMap[f.type] || f.type}</span>
            <span style="background:#fef3c7; color:#92400e; font-size:0.75rem; padding:2px 8px; border-radius:99px;">${f.width === 'half' ? 'অর্ধেক স্ক্রিন' : 'ফুল স্ক্রিন'}</span>
          </div>
          <div style="font-size:0.85rem; color:#64748b;">
            ${f.placeholder ? `হিন্টস: <em>"${escapeHtml(f.placeholder)}"</em>` : ''}
            ${f.type === 'select' && f.options ? ` | অপশন: ${f.options.join(', ')}` : ''}
          </div>
        </div>

        <div style="display:flex; align-items:center; gap:6px; flex-shrink:0;">
          <button type="button" onclick="moveBookingField(${idx}, -1)" class="btn-top" style="background:#f1f5f9; color:#475569; padding:5px 8px; font-size:0.82rem;" title="উপরে তুলুন" ${idx === 0 ? 'disabled style="opacity:0.4;"' : ''}>
            <i class="fas fa-arrow-up"></i>
          </button>
          <button type="button" onclick="moveBookingField(${idx}, 1)" class="btn-top" style="background:#f1f5f9; color:#475569; padding:5px 8px; font-size:0.82rem;" title="নিচে নামান" ${idx === fields.length - 1 ? 'disabled style="opacity:0.4;"' : ''}>
            <i class="fas fa-arrow-down"></i>
          </button>
          <button type="button" onclick="editBookingField(${idx})" class="btn-top" style="background:#e2e8f0; color:#334155; padding:5px 10px; font-size:0.82rem;" title="এডিট করুন">
            <i class="fas fa-edit"></i>
          </button>
          ${!isCore ? `
          <button type="button" onclick="deleteBookingField(${idx})" class="btn-top" style="background:#fee2e2; color:#dc2626; padding:5px 10px; font-size:0.82rem;" title="মুছে ফেলুন">
            <i class="fas fa-trash-alt"></i>
          </button>` : ''}
        </div>
      </div>
    `;
  });
  html += `</div>`;

  container.innerHTML = html;
}

function openNewBookingFieldModal() {
  document.getElementById("modalBookingFieldId").value = "";
  document.getElementById("modalBookingFieldIndex").value = "-1";
  document.getElementById("modalBookingFieldLabel").value = "";
  document.getElementById("modalBookingFieldType").value = "text";
  document.getElementById("modalBookingFieldWidth").value = "half";
  document.getElementById("modalBookingFieldPlaceholder").value = "";
  document.getElementById("modalBookingFieldOptions").value = "";
  document.getElementById("modalBookingFieldRequired").checked = false;
  
  toggleBookingFieldOptions();

  const modal = document.getElementById("bookingFieldEditModal");
  if (modal) modal.classList.add("active");
}

function editBookingField(index) {
  const fields = getBookingFieldsList();
  const f = fields[index];
  if (!f) return;

  document.getElementById("modalBookingFieldId").value = f.id;
  document.getElementById("modalBookingFieldIndex").value = index;
  document.getElementById("modalBookingFieldLabel").value = f.label || "";
  document.getElementById("modalBookingFieldType").value = f.type || "text";
  document.getElementById("modalBookingFieldWidth").value = f.width || "half";
  document.getElementById("modalBookingFieldPlaceholder").value = f.placeholder || "";
  document.getElementById("modalBookingFieldOptions").value = Array.isArray(f.options) ? f.options.join(", ") : (f.options || "");
  document.getElementById("modalBookingFieldRequired").checked = !!f.required;

  toggleBookingFieldOptions();

  const modal = document.getElementById("bookingFieldEditModal");
  if (modal) modal.classList.add("active");
}

function toggleBookingFieldOptions() {
  const type = document.getElementById("modalBookingFieldType").value;
  const optGroup = document.getElementById("bookingFieldOptionsGroup");
  if (optGroup) {
    optGroup.style.display = (type === "select") ? "block" : "none";
  }
}

function closeBookingFieldModal() {
  const modal = document.getElementById("bookingFieldEditModal");
  if (modal) modal.classList.remove("active");
}

function saveBookingFieldModalData() {
  const idx = parseInt(document.getElementById("modalBookingFieldIndex").value, 10);
  const idStr = document.getElementById("modalBookingFieldId").value;
  const label = document.getElementById("modalBookingFieldLabel").value.trim();
  const type = document.getElementById("modalBookingFieldType").value;
  const width = document.getElementById("modalBookingFieldWidth").value;
  const placeholder = document.getElementById("modalBookingFieldPlaceholder").value.trim();
  const optionsRaw = document.getElementById("modalBookingFieldOptions").value.trim();
  const required = document.getElementById("modalBookingFieldRequired").checked;

  if (!label) {
    alert("প্রশ্নের শিরোনাম (Field Label) অবশ্যই পূরণ করতে হবে!");
    return;
  }

  const fields = getBookingFieldsList();
  const fieldId = idStr || ("custom_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 5));

  const fieldObj = {
    id: fieldId,
    label: label,
    type: type,
    width: width,
    placeholder: placeholder,
    required: required
  };

  if (type === "select") {
    fieldObj.options = optionsRaw.split(",").map(o => o.trim()).filter(Boolean);
  }

  if (idx >= 0 && idx < fields.length) {
    fields[idx] = Object.assign({}, fields[idx], fieldObj);
  } else {
    fields.push(fieldObj);
  }

  window.TWS_SITE_DATA.booking_fields = fields;
  closeBookingFieldModal();
  renderAdminBookingFields();
  saveAllBookingFieldsToFirebase();
}

function moveBookingField(index, dir) {
  const fields = getBookingFieldsList();
  const targetIdx = index + dir;
  if (targetIdx < 0 || targetIdx >= fields.length) return;

  const temp = fields[index];
  fields[index] = fields[targetIdx];
  fields[targetIdx] = temp;

  window.TWS_SITE_DATA.booking_fields = fields;
  renderAdminBookingFields();
  saveAllBookingFieldsToFirebase();
}

function deleteBookingField(index) {
  const fields = getBookingFieldsList();
  const f = fields[index];
  if (!f) return;

  if (confirm(`আপনি কি নিশ্চিত "${f.label}" ফিল্ডটি বুকিং ফর্ম থেকে মুছে ফেলতে চান?`)) {
    fields.splice(index, 1);
    window.TWS_SITE_DATA.booking_fields = fields;
    renderAdminBookingFields();
    saveAllBookingFieldsToFirebase();
  }
}

async function saveAllBookingFieldsToFirebase() {
  const fields = getBookingFieldsList();
  saveAllData(false);

  const cloudUrl = localStorage.getItem("tws_cloud_db_url") || "https://tour-with-somjit-default-rtdb.firebaseio.com";
  try {
    const resp = await fetch(`${cloudUrl.replace(/\/$/, '')}/site_data/booking_fields.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields)
    });
    if (resp.ok) {
      showToast("✓ বুকিং ফর্ম ফিল্ড সফলভাবে Firebase-এ সেভ হয়েছে!");
    }
  } catch(e) {
    console.warn("Firebase save error:", e);
  }
}
