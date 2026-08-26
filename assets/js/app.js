/**
 * Tour with Somjit - Public Interactive App Engine
 * High-legibility Bengali Tourism Portal with Real-time Dynamic CMS Sync,
 * Click-anywhere Details Modal, Booking Status, and Featured Tour Priority.
 */

// Default Master Tour Database
let TOURS_DATA = {
  "ladakh-2026": {
    id: "ladakh-2026",
    title: "লাদাখ মহাবিস্ময় গ্রুপ ট্যুর ২০২৬",
    category: "ladakh",
    status: "open",
    is_featured: true,
    dates: "২৫শে মে – ১০ই জুন ২০২৬",
    train_dates: "২৫শে মে (শিয়ালদাহ) – ১০ই জুন ২০২৬ (হাওড়া)",
    pickup_drop: "২৭শে মে সকাল ৭টায় জম্মু স্টেশন পিকআপ | ৮ই জুন চন্ডীগড় স্টেশন ড্রপ",
    duration: "১২ রাত / ১৩ দিন (শ্রীনগর থেকে চন্ডীগড়)",
    token_per_person: 5000,
    banner_image: "",
    caption_details: "সোমজিৎ ভট্টাচার্য-এর সাথে লাদাখ মহাবিস্ময় গ্রুপ ট্যুর ২০২৬!\n\n📌 ট্যুরের বিশেষ সুবিধাসমূহ:\n✓ প্রথম দিন থেকে শেষ দিন পর্যন্ত আমি সোমজিৎ ভট্টাচার্য নিজে সাথে থাকব\n✓ হাসপাতাল গ্রেড বড় অক্সিজেন সিলিন্ডার ব্যাকআপ ও পরিবার পিছু ১টি পোর্টেবল অক্সিজেন ক্যান\n✓ নিজস্ব বাঙালি কুকিং টিমের রান্না করা টাটকা ঘরোয়া খাবার (লাঞ্চ সহ সব মিল)\n✓ তুরতুক ও থাং গ্রাম (ভারত-পাকিস্তান শেষ সীমান্ত) ও সিয়াচেন বেসক্যাম্প দর্শন\n✓ টেম্পো ট্রাভেলারে পেছনের খারাপ সিটে কাউকে বসানো হয় না ও নিয়মিত সিট রোটেশন",
    plans: [
      { id: "ladakh_moriri_double", name: "সোমোরিরি সহ - ডাবল শেয়ারিং রুম", price: 49500 },
      { id: "ladakh_moriri_triple", name: "সোমোরিরি সহ - ট্রিপল শেয়ারিং রুম", price: 48500 },
      { id: "ladakh_nomoriri_double", name: "সোমোরিরি ছাড়া - ডাবল শেয়ারিং রুম", price: 48000 },
      { id: "ladakh_nomoriri_triple", name: "সোমোরিরি ছাড়া - ট্রিপল শেয়ারিং রুম", price: 47000 }
    ],
    itinerary: [
      { day: "দিন ১", title: "জম্মু থেকে শ্রীনগর যাত্রা", desc: "জম্মু স্টেশন থেকে সকাল ৭টায় পিকআপ। বানিহাল টানেল পেরিয়ে বিকেলে ডাল লেকের শহর শ্রীনগরে পৌঁছানো ও রাত্রিযাপন।" },
      { day: "দিন ২", title: "শ্রীনগর → সোনমার্গ → জোজিলা পাস → দ্রাস → কার্গিল", desc: "সকালে জোজিলা পাস অতিক্রম। দ্রাসে কার্গিল ওয়ার মেমোরিয়াল দর্শন এবং সন্ধ্যায় কার্গিলে রাত্রিযাপন।" },
      { day: "দিন ৩", title: "কার্গিল → লামায়ুরু → ম্যাগনেটিক হিল → লেহ", desc: "লামায়ুরু মুনল্যান্ড ও প্রাচীন মনাস্ট্রি, ম্যাগনেটিক হিল ও সঙ্গম পয়েন্ট দর্শন করে লেহ পৌঁছানো।" },
      { day: "দিন ৪", title: "লেহ লোকাল সাইটসিয়িং ও অ্যাক্লিমেটাইজেশন", desc: "শান্তি স্তূপ, লেহ প্যালেস, শে প্যালেস, সিন্ধু ঘাট ও ঐতিহ্যবাহী লেহ মার্কেট ভ্রমণ।" },
      { day: "দিন ৫", title: "লেহ → খারদুংলা পাস (১৮,৩৮০ ফুট) → নুব্রা ভ্যালি", desc: "বিশ্বের অন্যতম সর্বোচ্চ খারদুংলা পাস পেরিয়ে ডিস্কিট মনাস্ট্রি ও হুন্ডারে ডাবল-হাম্প উটের সাফারি।" },
      { day: "দিন ৬", title: "তুরতুক ও থাং গ্রাম (ভারত-পাকিস্তান সীমান্ত)", desc: "বালতিস্তানের ঐতিহ্যবাহী তুরতুক ও শেষ সীমান্ত গ্রাম থাং পরিদর্শন এবং স্থানীয়দের সাথে মেলামেশা।" },
      { day: "দিন ৭", title: "নুব্রা → সিয়াচেন বেস ক্যাম্প ও ওপি বাবা মন্দির", desc: "বিশ্বের সর্বোচ্চ রণক্ষেত্র সিয়াচেন গ্লেসিয়ার বেস ক্যাম্পের ঐতিহাসিক ও আবেগঘন অনুভূতি।" },
      { day: "দিন ৮", title: "নুব্রা → শ্যোক নদী রুট → প্যাংগং লেক", desc: "শ্যোক উপত্যকা হয়ে স্পাংমিক গ্রামে অপরূপ নীল জলের প্যাংগং লেকে সূর্যাস্ত ও রাত কাটানো।" },
      { day: "দিন ৯", title: "প্যাংগং → চুশুল → সোল্ডা → সুমদো → সোমোরিরি লেক", desc: "প্যাংগং থেকে অফবিট চুশুল রুট হয়ে সোমোরিরি ও কোরজক মনাস্ট্রি পরিদর্শন।" },
      { day: "দিন ১০", title: "সোমোরিরি → সো-কার লেক → তাগলাংলা পাস → কেলং", desc: "সো-কার লেক ও মোর প্লেনস হয়ে জিস্পা/কেলংয়ে পাহাড়ি পরিবেশে রাত্রিযাপন।" },
      { day: "দিন ১১", title: "কেলং → অটল টানেল → মানালি", desc: "ঐতিহাসিক অটল টানেল পেরিয়ে সুদৃশ্য মানালিতে পৌঁছানো ও মল রোডে কেনাকাটা।" },
      { day: "দিন ১২", title: "মানালি লোকাল ভ্রমণ ও আরামদায়ক বিশ্রাম", desc: "হিড়িম্বা দেবী মন্দির, বশিষ্ট উষ্ণ প্রস্রবণ ও সোলাং ভ্যালিতে অবসর যাপন।" },
      { day: "দিন ১৩", title: "মানালি → কুল্লু শাল ফ্যাক্টরি → চন্ডীগড় ড্রপ", desc: "কুল্লু শাল ফ্যাক্টরি দর্শন শেষে সন্ধ্যায় চন্ডীগড় স্টেশনে ড্রপ ও ট্রেনের উদ্দেশ্যে রওনা।" }
    ],
    inclusions: [
      "শ্রীনগর থেকে চন্ডীগড় পর্যন্ত সমস্ত এসি/নন-এসি টেম্পো ট্রাভেলার (পেছনের সিটে কেউ বসবে না)",
      "১২ রাতের সমস্ত প্রিমিয়াম হোটেল ও রিসর্টে থাকা",
      "নিজস্ব বাঙালি বাবুর্চির রান্না করা সকালের বেড টি, ব্রেকফাস্ট, লাঞ্চ, ইভনিং স্ন্যাক্স ও ডিনার",
      "হাসপাতাল গ্রেড বড় অক্সিজেন সিলিন্ডার ব্যাকআপ ও পরিবার পিছু ১টি পোর্টেবল অক্সিজেন ক্যান",
      "লাদাখ ইনার লাইন পারমিট, ওয়াইল্ডলাইফ ফি ও এনভায়রনমেন্টাল ফি",
      "জনপ্রতি প্রতিদিন ২ লিটার সিলড মিনারেল ওয়াটার",
      "সোমজিৎ ভট্টাচার্য-এর সার্বক্ষণিক ব্যক্তিগত সাহচর্য ও সার্বিক গাইডেন্স"
    ]
  },
  "sundarban-2026": {
    id: "sundarban-2026",
    title: "দ্বিতীয় সুন্দরবন ইলিশ উৎসব ২০২৬",
    category: "sundarban",
    status: "few_seats",
    is_featured: false,
    dates: "২৪শে – ২৬শে জুলাই ২০২৬ (বা ১৪-১৬ই আগস্ট ২০২৬)",
    train_dates: "২৪শে জুলাই সকাল ৭:৩০ ধর্মতলা কে সি দাশ – ২৬শে জুলাই রবিবার সন্ধ্যা ৭:৩০ ফেরা",
    pickup_drop: "ধর্মতলা কে সি দাশ (সকাল ৭:৩০) ও সায়েন্স সিটি ফায়ার স্টেশন স্টপেজ",
    duration: "২ রাত / ৩ দিন (কলকাতা থেকে কলকাতা)",
    token_per_person: 2000,
    banner_image: "",
    caption_details: "দ্বিতীয় সুন্দরবন ইলিশ উৎসব ২০২৬!\n\n📌 প্রধান আকর্ষণ:\n✓ ১০+ পদের রাজকীয় ইলিশ মহোৎসব (সর্ষে ইলিশ, পাতুরি, বিরিয়ানি, মালাইকারি, মটন)\n✓ পাখিরালয়ের সাধারণ হোটেল নয়, দয়াপুরে প্রিমিয়াম লাক্সারী রিসর্টে থাকা (এসি+গিজার)\n✓ নবরূপে সজ্জিত বিলাসবহুল ৩-তলা লঞ্চ 'এম ভি দেবী অন্নপূর্ণা ২'-এ সাফারি\n✓ সজনেখালি, সুধন্যখালি ওয়াচ টাওয়ার, দোবাঁকি ক্যানোপি ও হ্যামিলটন সাহেবের কুঠি\n✓ কমপ্লিমেন্টারি রেনকোট, শাওয়ার কিট এবং বাউল গানের মনোমুগ্ধকর সাংস্কৃতিক সন্ধ্যা",
    plans: [
      { id: "sundarban_adult", name: "প্রাপ্তবয়স্ক প্যাকেজ (জনপ্রতি)", price: 7500 },
      { id: "sundarban_child", name: "বাচ্চা (৪ থেকে ৭ বছর)", price: 4000 },
      { id: "sundarban_infant", name: "শিশু (৪ বছরের নিচে - সম্পূর্ণ ফ্রি)", price: 0 }
    ],
    itinerary: [
      { day: "দিন ১", title: "কলকাতা → গদখালি → দয়াপুর লাক্সারী রিসর্ট", desc: "সকাল ৭:৩০ ধর্মতলা থেকে এসি বাসে যাত্রা। গদখালি থেকে বিলাসবহুল লঞ্চে দয়াপুর রিসর্টে চেক-ইন। মধ্যাহ্নে ইলিশের পদ সহ রাজকীয় ভোজ। বিকেলে লঞ্চে পাখিরালয় সূর্যাস্ত ও সন্ধ্যায় ঝুমুর নাচ ও চা-স্ন্যাক্স।" },
      { day: "দিন ২", title: "জঙ্গল সাফারি ও সুন্দরবনের প্রধান ওয়াচ টাওয়ার", desc: "লঞ্চে সকালের চা ও লুচি-আলুরদম খেয়ে সজনেখালি মিউজিয়াম, সুধন্যখালি ও দোবাঁকি ক্যানোপি ওয়াক ভ্রমণ। লঞ্চে গরম ইলিশ পাতুরি ও মধ্যাহ্নভোজ। সন্ধ্যায় জমজমাট গ্রামীণ বাউল গানের আসর ও স্পেশাল চিকেন/মটন ডিনার।" },
      { day: "দিন ৩", title: "গ্রাম্য সংস্কৃতি, হ্যামিলটন এস্টেট ও কলকাতা ফেরা", desc: "সকালে বেকন বাংলো ও হ্যামিলটন সাহেবের ঐতিহ্যবাহী কুঠি দর্শন। দুপুরের ইলিশ বিরিয়ানি খেয়ে লঞ্চে গদখালি ও সেখান থেকে এসি বাসে ধর্মতলায় ফেরা।" }
    ],
    inclusions: [
      "কলকাতা ধর্মতলা থেকে গদখালি যাওয়া ও আসার এসি লাক্সারী বাস",
      "দয়াপুরে প্রিমিয়াম লাক্সারী রিসর্টে ২ রাত এসি রুম ও গিজার সুবিধা সহ অবস্থান",
      "নবরূপে সজ্জিত বিলাসবহুল ৩-তলা লঞ্চ 'এম ভি দেবী অন্নপূর্ণা ২'-এ সাফারি",
      "১০+ পদের রাজকীয় ইলিশ মহোৎসব (সর্ষে ইলিশ, ইলিশ পাতুরি, ইলিশ বিরিয়ানি, ইলিশ ভাজা, ইলিশের মাথা দিয়ে কচুর শাক, গলদা চিংড়ি মালাইকারি ইত্যাদি)",
      "সুন্দরবন জঙ্গল পারমিট, সরকারি গাইড ফি ও ফরেস্ট এন্ট্রি চার্জ",
      "কমপ্লিমেন্টারি প্রিমিয়াম রেনকোট, ডেন্টাল ও শাওয়ার কিট এবং বিশেষ উপহার",
      "ঝুমুর নাচ ও গ্রামীণ বাউল গানের প্রাণবন্ত সাংস্কৃতিক সন্ধ্যা"
    ]
  },
  "ranchi-2026": {
    id: "ranchi-2026",
    title: "সিটি অফ ফলস রাঁচি ও নেতারহাট গ্রুপ ট্যুর ২০২৬",
    category: "ranchi",
    status: "open",
    is_featured: false,
    dates: "২৫শে – ৩০শে আগস্ট ২০২৬",
    train_dates: "২৫শে আগস্ট রাত ৯:১০ হাওড়া (ক্রিয়োগা এক্সপ্রেস) – ৩০শে আগস্ট সকালে হাওড়া ফেরা",
    pickup_drop: "২৬শে আগস্ট ভোরে রাঁচি স্টেশন পিকআপ | ২৯শে আগস্ট রাতে রাঁচি স্টেশন ড্রপ",
    duration: "৩ রাত / ৪ দিন (রাঁচি থেকে রাঁচি)",
    token_per_person: 3000,
    banner_image: "",
    caption_details: "সিটি অফ ফলস রাঁচি ও নেতারহাট গ্রুপ ট্যুর ২০২৬!\n\n📌 প্রধান আকর্ষণ:\n✓ হুড্রু, জোহনা, সীতা, দশম ও ঝাড়খণ্ডের সর্বোচ্চ লোধ জলপ্রপাতের অপার সৌন্দর্য\n✓ মনোরম পাত্রাতু ভ্যালি, পাত্রাতু ড্যাম বোট রাইড, রক গার্ডেন ও পাইন ফরেস্ট\n✓ নেতারহাটে ম্যাগনোলিয়া সানসেট পয়েন্ট, সানরাইজ পয়েন্ট ও কোয়েল ভিউ দর্শন\n✓ রাঁচি ও নেতারহাটে সেরা এসি রুম ও গিজার এবং এসি টেম্পো ট্রাভেলার (নো ব্যাক সিট)\n✓ নিজস্ব বাঙালি কুকিং টিম এবং সবার জন্য কমপ্লিমেন্টারি প্রিমিয়াম রেনকোট",
    plans: [
      { id: "ranchi_double", name: "ডাবল শেয়ারিং এসি রুম (জনপ্রতি)", price: 13500 },
      { id: "ranchi_triple", name: "ট্রিপল শেয়ারিং এসি রুম (জনপ্রতি)", price: 13000 }
    ],
    itinerary: [
      { day: "দিন ১", title: "রাঁচি পৌঁছানো ও জলপ্রপাত ভ্রমণ", desc: "রাঁচি স্টেশনে পিকআপ ও এসি হোটেলে ফ্রেশ হয়ে হুড্রু ফলস, জোহনা ফলস ও সীতা ফলস দর্শন।" },
      { day: "দিন ২", title: "দশম ফলস ও পাত্রাতু ভ্যালি ড্রাইভ", desc: "সকালে দশম ফলস এবং বিকেলে আঁকাবাঁকা পাত্রাতু ভ্যালি ও পাত্রাতু ড্যামে রোমাঞ্চকর বোট রাইড।" },
      { day: "দিন ৩", title: "রাঁচি → নেতারহাট সানসেট ও পাইন বন", desc: "নেতারহাটে যাত্রা। কোয়েল ভিউ পয়েন্ট, নেতারহাট স্কুল, পাইন ফরেস্ট এবং ম্যাগনোলিয়া পয়েন্টে সূর্যাস্ত দর্শন।" },
      { day: "দিন ৪", title: "সানরাইজ পয়েন্ট, লোধ জলপ্রপাত ও রাঁচি ড্রপ", desc: "সকালে নেতারহাট সানরাইজ দর্শন, ঝাড়খণ্ডের সর্বোচ্চ লোধ ফলস ঘুরে রাতে রাঁচি স্টেশনে ড্রপ।" }
    ],
    inclusions: [
      "রাঁচিতে ২ রাত ও নেতারহাটে ১ রাত সেরা এসি হোটেলে থাকা",
      "সমস্ত সাইটসিয়িংয়ের জন্য এসি টেম্পো ট্রাভেলার (পেছনের অস্বস্তিকর সিট খালি রাখা হবে)",
      "নিজস্ব বাঙালি বাবুর্চির রান্না করা ঘরোয়া বাঙালি খাবার (লাঞ্চ সহ সব মিল)",
      "বর্ষার জন্য প্রত্যেক সদস্যের জন্য বিনামূল্যে আকর্ষণীয় রেনকোট",
      "প্রতিদিন জনপ্রতি ২ লিটার সিলড মিনারেল ওয়াটার",
      "সোমজিৎ ভট্টাচার্য-এর সার্বক্ষণিক ব্যক্তিগত তত্ত্বাবধান"
    ]
  },
  "spiti-2026": {
    id: "spiti-2026",
    title: "কিন্নর স্পিতি ভ্যালি গ্র্যান্ড গ্রুপ ট্যুর ২০২৬",
    category: "spiti",
    status: "open",
    is_featured: false,
    dates: "১৮ই সেপ্টেম্বর – ২রা অক্টোবর ২০২৬",
    train_dates: "১৮ই সেপ্টেম্বর রাত ৯:৫৫ হাওড়া – ২রা অক্টোবর সকালে হাওড়া ফেরা",
    pickup_drop: "২০শে সেপ্টেম্বর সকালে চন্ডীগড় / শিমলা স্টেশন পিকআপ | ৩০শে সেপ্টেম্বর চন্ডীগড় ড্রপ",
    duration: "১০ রাত / ১১ দিন (চন্ডীগড় থেকে চন্ডীগড়)",
    token_per_person: 5000,
    banner_image: "",
    caption_details: "কিন্নর স্পিতি ভ্যালি গ্র্যান্ড ট্যুর ২০২৬!\n\n📌 প্রধান আকর্ষণ:\n✓ চন্দ্রতাল ট্রেকে বড় অক্সিজেন সিলিন্ডার ও পরিবার পিছু পোর্টেবল অক্সিজেন ক্যান\n✓ সারাহানে ঐতিহাসিক ভীমাকালী মন্দিরের ঠিক পাশেই রাত্রিবাস ও আরতি দর্শন\n✓ ছিটকুলে বাছপা নদীর তীরে শেষ চেকপোস্ট পেরিয়ে আরও ৫ কিমি ভেতরের অপরূপ ভ্রমণ\n✓ ৫০০+ বছরের প্রাচীন ভারতের বিস্ময়কর 'গিউ মমি' ও ১০০০ বছরের টাবো মনাস্ট্রি\n✓ হিক্কিম সর্বোচ্চ পোস্ট অফিস, কোমিক উচ্চতম গ্রাম, চিচাম ব্রিজ ও নিজস্ব বাঙালি বাবুর্চি",
    plans: [
      { id: "spiti_double", name: "ডাবল শেয়ারিং রুম (জনপ্রতি)", price: 32500 },
      { id: "spiti_triple", name: "ট্রিপল শেয়ারিং রুম (জনপ্রতি)", price: 31500 }
    ],
    itinerary: [
      { day: "দিন ১", title: "চন্ডীগড় → শিমলা", desc: "চন্ডীগড় স্টেশনে পিকআপ ও পাহাড়ি পথে শিমলা পৌঁছে রাত্রিযাপন।" },
      { day: "দিন ২", title: "শিমলা → নারকান্দা হাটু পিক → সারাহান", desc: "হাটু পিকে হিমালয়ের চূড়া দর্শন করে সারাহানে ভীমাকালী মন্দিরের সান্নিধ্যে থাকা।" },
      { day: "দিন ৩", title: "সারাহান → সাংলা ও ছিটকুল শেষ গ্রাম", desc: "সাংলা উপত্যকা ও ছিটকুলে বাছপা নদীর তীরে ভারত-তিব্বত শেষ সীমান্ত দর্শন।" },
      { day: "দিন ৪", title: "সাংলা → কল্পা (কিন্নর কৈলাশ দর্শন)", desc: "কিন্নর কৈলাশ শিবলিঙ্গ চূড়ার অপার্থিব রূপ ও আত্মিক প্রশান্তি।" },
      { day: "দিন ৫", title: "কল্পা → খাব সঙ্গম → নাকো লেক", desc: "সতলজ ও স্পিতি নদীর সঙ্গম খাব পেরিয়ে নাকো লেক ও নাকো গ্রামে রাত্রিযাপন।" },
      { day: "দিন ৬", title: "নাকো → ৫০০ বছরের গিউ মমি → টাবো মনাস্ট্রি", desc: "ভারতের বিস্ময়কর প্রাকৃতিক গিউ মমি ও ১০০০ বছরের প্রাচীন টাবো মনাস্ট্রি।" },
      { day: "দিন ৭", title: "টাবো → ঢাক্কার মনাস্ট্রি → পিন ভ্যালি → কাজা", desc: "ঢাক্কার ভিউ ও পিন ভ্যালির শেষ গ্রাম মুদ ভিলেজ ভ্রমণ শেষে কাজা পৌঁছানো।" },
      { day: "দিন ৮", title: "কাজা লোকাল (কী মনাস্ট্রি, কিব্বার, চিচাম ব্রিজ, হিক্কিম, কোমিক)", desc: "বিশ্বের সর্বোচ্চ পোস্ট অফিস হিক্কিম, উচ্চতম গ্রাম কোমিক ও এশিয়ার সর্বোচ্চ চিচাম ব্রিজ।" },
      { day: "দিন ৯", title: "কাজা → কুঞ্জুম পাস → চন্দ্রতাল লেক ট্রেক", desc: "কুঞ্জুম দেবী দর্শন ও রূপকথার মতো চন্দ্রতাল লেকের তীরে প্রাকৃতিক সৌন্দর্য উপভোগ।" },
      { day: "দিন ১০", title: "চন্দ্রতাল → বাটাল → সিসু → অটল টানেল → মানালি", desc: "রোমাঞ্চকর চন্দ্রা নদী ড্রাইভ ও অটল টানেল হয়ে মানালিতে আরামদায়ক রাত্রিযাপন।" },
      { day: "দিন ১১", title: "মানালি → চন্ডীগড় স্টেশন ড্রপ", desc: "মানালি থেকে চন্ডীগড় যাত্রা এবং সন্ধ্যায় স্টেশনে শুভ বিদায়।" }
    ],
    inclusions: [
      "চন্ডীগড় থেকে চন্ডীগড় পর্যন্ত সমস্ত যাতায়াত (এসি টেম্পো ট্রাভেলার, নো ব্যাক সিট)",
      "১০ রাতের চমৎকার হোটেল ও হোমস্টেতে থাকা",
      "চন্দ্রতাল ট্রেকে বড় অক্সিজেন সিলিন্ডার ও পোর্টেবল অক্সিজেন ক্যান সাপোর্ট",
      "নিজস্ব বাবুর্চির রান্না করা ঘরোয়া বাঙালি খাবার (লাঞ্চ সহ সব মিল)",
      "নারকান্দা হাটু পিক লোকাল ট্রান্সপোর্ট ও মনাস্ট্রি পারমিট ফি",
      "সোমজিৎ ভট্টাচার্য-এর প্রত্যক্ষ নেতৃত্ব ও সার্বক্ষণিক সহায়তা"
    ]
  },
  "purulia-2026": {
    id: "purulia-2026",
    title: "পুরুলিয়া পলাশ উৎসব ও অযোধ্যা পাহাড় ২০২৬",
    category: "purulia",
    status: "closed",
    is_featured: false,
    dates: "১১ই – ১৪ই মার্চ ২০২৬",
    train_dates: "১১ই মার্চ রাতে হাওড়া (চক্রধরপুর প্যাসেঞ্জার) – ১৪ই মার্চ পুরুলিয়া থেকে ফেরা",
    pickup_drop: "১২ই মার্চ সকালে বরাভূম পিকআপ | ১৪ই মার্চ পুরুলিয়া জংশন ড্রপ",
    duration: "২ রাত / ৩ দিন (পুরুলিয়া)",
    token_per_person: 500,
    banner_image: "",
    caption_details: "পুরুলিয়া পলাশ উৎসব ও অযোধ্যা পাহাড় ২০২৬!\n\n📌 প্রধান আকর্ষণ:\n✓ মাঠা পাহাড়ের কোলে পলাশে ঘেরা অনন্য সুন্দর ইকো রিসর্টে ২ রাত অবস্থান\n✓ পাখি পাহাড়, খয়েরাবেড়া লেক, চড়িদা মুখোশ গ্রাম, বামনি ও মার্বেল লেক পরিদর্শন\n✓ হীরক রাজার দেশের জয়চণ্ডী পাহাড় এবং ইতিহাস প্রসিদ্ধ গড়পঞ্চকোট ভ্রমণ\n✓ রিসর্টের আঙিনায় পুরুলিয়ার বিখ্যাত ঐতিহ্যবাহী 'ছৌ নৃত্য'-এর জমকালো সান্ধ্য আসর\n✓ টাটা উইঙ্গার এসি গাড়ি, ব্রেকফাস্ট থেকে ডিনার সব মিল এবং ভেজ/নন-ভেজ সুস্বাদু খানা",
    plans: [
      { id: "purulia_double", name: "এসি প্রিমিয়াম কটেজ (ডাবল শেয়ারিং)", price: 8000 },
      { id: "purulia_triple", name: "এসি প্রিমিয়াম কটেজ (ট্রিপল শেয়ারিং)", price: 7500 },
      { id: "purulia_tent", name: "সুইস টেন্ট উইথ কুলার ও গিজার", price: 6500 }
    ],
    itinerary: [
      { day: "দিন ১", title: "বরাভূম পিকআপ ও অযোধ্যা পাহাড় সাইটসিয়িং", desc: "বরাভূম স্টেশনে পিকআপ, রিসর্টে ব্রেকফাস্ট করে পাখি পাহাড়, খয়েরাবেড়া লেক ও চড়িদা মুখোশ গ্রাম ভ্রমণ।" },
      { day: "দিন ২", title: "জলপ্রপাত, মার্বেল লেক ও ছৌ নৃত্য", desc: "বামনি ও গাঙকোচা ফলস, আপার ড্যাম ও লোয়ার ড্যাম দর্শন। সন্ধ্যায় রিসর্টে ঐতিহ্যবাহী ছৌ নৃত্য উপভোগ।" },
      { day: "দিন ৩", title: "জয়চণ্ডী পাহাড়, গড়পঞ্চকোট ও পুরুলিয়া ড্রপ", desc: "হীরক রাজার দেশের জয়চণ্ডী পাহাড় ও গড়পঞ্চকোট মন্দির দর্শন করে পুরুলিয়া স্টেশনে ড্রপ।" }
    ],
    inclusions: [
      "মাঠা পাহাড়ের কোলে সুদৃশ্য ইকো রিসর্টে ২ রাত থাকা",
      "বরাভূম থেকে পুরুলিয়া পর্যন্ত টাটা উইঙ্গার এসি গাড়ি",
      "ব্রেকফাস্ট, লাঞ্চ, সান্ধ্য স্ন্যাক্স ও ডিনার (ভেজ ও সুস্বাদু নন-ভেজ পদ)",
      "রিসর্টের প্রাঙ্গণে পুরুলিয়ার ঐতিহ্যবাহী লাইভ ছৌ নৃত্য",
      "মাত্র ₹৫০০ অগ্রিম টোকেন দিয়ে সিট কনফার্মেশনের সুবিধা"
    ]
  },
  "dooars-2026": {
    id: "dooars-2026",
    title: "ডুয়ার্স গরুমারা ও জলদাপাড়া প্রিমিয়াম ট্যুর ২০২৬",
    category: "dooars",
    status: "coming_soon",
    is_featured: false,
    dates: "১৩ই – ১৯শে নভেম্বর ২০২৬",
    train_dates: "১৩ই নভেম্বর কাঞ্চনকন্যা এক্সপ্রেস (শিয়ালদহ) – ১৯শে নভেম্বর সকালে ফেরা",
    pickup_drop: "১৪ই নভেম্বর সকালে নিউ মাল জংশন পিকআপ | ১৮ই নভেম্বর নিউ কোচবিহার ড্রপ",
    duration: "৪ রাত / ৫ দিন",
    token_per_person: 3000,
    banner_image: "",
    caption_details: "ডুয়ার্স গরুমারা ও জলদাপাড়া প্রিমিয়াম ট্যুর ২০২৬!\n\n📌 প্রধান আকর্ষণ:\n✓ লাটাগুড়িতে ADB KANVAS (সুইমিং পুল) ও জলদাপাড়ায় Debrani Greenwood-এ থাকা\n✓ গরুমারা জাতীয় উদ্যানে ১টি সম্পূর্ণ কমপ্লিমেন্টারি জিপ সাফারি প্যাকেজে অন্তর্ভুক্ত\n✓ দলগাঁও ভিউ পয়েন্ট, বক্সা জিরো পয়েন্ট, জয়ন্তী রিভার বেড ও চিলাপাতা ওয়াইল্ডলাইফ\n✓ কোচবিহারের ঐতিহ্যবাহী রাজবাড়ী ও মদনমোহন মন্দির পরিদর্শন\n✓ লাটাগুড়িতে রাভা উপজাতির লোকনৃত্য ও জলদাপাড়ায় জমজমাট সান্ধ্য বনফায়ার",
    plans: [
      { id: "dooars_double", name: "ডাবল শেয়ারিং লাক্সারী রুম (জনপ্রতি)", price: 14900 },
      { id: "dooars_triple", name: "ট্রিপল শেয়ারিং লাক্সারী রুম (জনপ্রতি)", price: 14200 }
    ],
    itinerary: [
      { day: "দিন ১", title: "নিউ মাল পিকআপ ও লাটাগুড়ি ADB KANVAS রিসর্ট", desc: "লাটাগুড়ির প্রিমিয়াম ADB KANVAS রিসর্টে চেক-ইন। বিকেলে গরুমারা জাতীয় উদ্যানে কমপ্লিমেন্টারি জিপ সাফারি।" },
      { day: "দিন ২", title: "দলগাঁও ভিউ পয়েন্ট, ঝালং, বিন্দু ও রাভা নৃত্য", desc: "ভুটান সীমান্তের জলঢাকা নদী ও চা বাগান পরিদর্শন। সন্ধ্যায় রিসর্টে রাভা উপজাতীয় নৃত্য।" },
      { day: "দিন ৩", title: "জলদাপাড়া Debrani Greenwood রিসর্ট ও চিলাপাতা", desc: "জলদাপাড়ায় চেক-ইন ও চিলাপাতা জঙ্গলে নাল রাজার গড় ও ওয়াইল্ডলাইফ সাফারি।" },
      { day: "দিন ৪", title: "বক্সা জিরো পয়েন্ট, জয়ন্তী রিভার বেড ও বনফায়ার", desc: "জয়ন্তী পাহাড়ের দৃশ্য, ভুটান সীমান্ত ও চুনিয়া ওয়াচ টাওয়ার। সন্ধ্যায় জমজমাট বনফায়ার।" },
      { day: "দিন ৫", title: "কোচবিহার রাজবাড়ী ও মদনমোহন মন্দির দর্শন", desc: "ঐতিহাসিক রাজবাড়ী দর্শন করে সন্ধ্যায় নিউ কোচবিহার স্টেশনে ড্রপ।" }
    ],
    inclusions: [
      "লাটাগুড়িতে ২ রাত (ADB KANVAS) ও জলদাপাড়ায় ২ রাত (Debrani Greenwood) থাকা",
      "১টি কমপ্লিমেন্টারি গরুমারা জিপ সাফারি ও সমস্ত এসি যাতায়াত",
      "সকালের চা থেকে রাতের ডিনার পর্যন্ত সব রাজকীয় খাওয়াদাওয়া",
      "লাটাগুড়িতে রাভা নৃত্য ও জলদাপাড়ায় সান্ধ্য বনফায়ার"
    ]
  }
};

let currentTourId = "ladakh-2026";

// Sync Master Data (Priority: Cloud Database > LocalStorage > Bundled site_data.js)
(function initMasterDataSync() {
  if (typeof window.TWS_SITE_DATA !== "undefined") {
    TOURS_DATA = window.TWS_SITE_DATA.tours || TOURS_DATA;
  }

  const savedData = localStorage.getItem("tws_custom_site_data");
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData);
      if (parsed.tours && Object.keys(parsed.tours).length > 0) {
        TOURS_DATA = parsed.tours;
      }
    } catch (e) {
      console.error(e);
    }
  }

  // Realtime Background Cloud Sync (Async)
  const cloudUrl = localStorage.getItem("tws_cloud_db_url") || (window.TWS_CLOUD_CONFIG ? window.TWS_CLOUD_CONFIG.database_url : null);
  if (cloudUrl) {
    fetch(`${cloudUrl.replace(/\/$/, '')}/site_data.json`, { cache: 'no-store' })
      .then(res => res.json())
      .then(cloudData => {
        if (cloudData && typeof cloudData === 'object') {
          console.log("☁️ Real-time Cloud Data synced successfully!");
          localStorage.setItem("tws_custom_site_data", JSON.stringify(cloudData));
          if (cloudData.tours) TOURS_DATA = cloudData.tours;
          renderDynamicContentFromAdmin();
        }
      })
      .catch(err => {
        console.log("Offline or Local mode active.");
      });
  }
})();

// DOM Ready Lifecycle
document.addEventListener("DOMContentLoaded", () => {
  initA11yControls();
  initCategoryFilters();
  initMonthlyCalendar();
  initBookingModal();
  initItineraryModal();
  updateBookingIdPreview();
  renderDynamicContentFromAdmin();
  initFaqAccordion();
  initMobileDrawer();
});

// Open Featured / Active Tour Details Directly
function openFeaturedTourDetails() {
  const tours = Object.values(TOURS_DATA);
  const featuredTour = tours.find(t => t.is_featured && t.status !== 'closed') || tours.find(t => t.status === 'open' || t.status === 'few_seats') || tours[0];
  if (featuredTour) {
    const toursSection = document.getElementById("tours");
    if (toursSection) {
      toursSection.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      openItineraryModal(featuredTour.id);
    }, 400);
  }
}

// Monthly Calendar Interactive Filter
function initMonthlyCalendar() {
  const monthBtns = document.querySelectorAll(".month-btn");
  monthBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      monthBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const month = btn.dataset.month;
      const tourId = btn.dataset.tourId;

      if (tourId && TOURS_DATA[tourId]) {
        openItineraryModal(tourId);
      } else if (month !== "all") {
        alert("এই মাসে নতুন স্পেশাল অফবিট ট্যুর শীঘ্রই ঘোষণা করা হবে! অগ্রিম নোটিফিকেশন পেতে WhatsApp-এ মেসেজ করুন।");
      }

      // Filter Cards
      const tourCards = document.querySelectorAll(".tour-card");
      tourCards.forEach(card => {
        if (month === "all") {
          card.style.display = "flex";
        } else if (tourId) {
          const onclickAttr = card.getAttribute("onclick") || "";
          if (onclickAttr.includes(tourId)) {
            card.style.display = "flex";
          } else {
            card.style.display = "none";
          }
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// 1. Accessibility Controls
function initA11yControls() {
  const fontBtns = document.querySelectorAll(".font-ctrl-btn[data-size]");
  const themeToggleBtn = document.getElementById("themeToggleBtn");

  const storedTheme = localStorage.getItem("tws_theme");
  if (storedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i> লাইট মোড';
  }

  const storedFontSize = localStorage.getItem("tws_font_size");
  if (storedFontSize) {
    document.body.className = document.body.className.replace(/\bfont-\w+\b/g, "");
    if (storedFontSize !== "normal") document.body.classList.add(storedFontSize);
    fontBtns.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.size === storedFontSize);
    });
  }

  fontBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const sizeClass = btn.dataset.size;
      fontBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      document.body.className = document.body.className.replace(/\bfont-\w+\b/g, "");
      if (sizeClass !== "normal") {
        document.body.classList.add(sizeClass);
      }
      localStorage.setItem("tws_font_size", sizeClass);
    });
  });

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("tws_theme", isDark ? "dark" : "light");
      themeToggleBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i> লাইট মোড' : '<i class="fas fa-moon"></i> ডার্ক মোড';
    });
  }
}

// 2. Smart TV Mode QR Code
function initTvMode() {
  const tvBtn = document.getElementById("tvModeBtn");
  const tvQrModal = document.getElementById("tvQrModal");
  const closeTvQrBtn = document.getElementById("closeTvQrModalBtn");

  if (tvBtn && tvQrModal) {
    tvBtn.addEventListener("click", () => {
      tvQrModal.classList.add("active");
    });
  }

  if (closeTvQrBtn && tvQrModal) {
    closeTvQrBtn.addEventListener("click", () => {
      tvQrModal.classList.remove("active");
    });
  }
}

// 3. Category Filters
function initCategoryFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.dataset.filter;
      const tourCards = document.querySelectorAll(".tour-card");
      tourCards.forEach(card => {
        if (filterValue === "all" || card.dataset.category === filterValue) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// 4. FAQ Accordion Trigger
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const btn = item.querySelector(".faq-question-btn");
    const answer = item.querySelector(".faq-answer");

    if (btn && answer) {
      btn.onclick = () => {
        const isActive = item.classList.contains("active");

        faqItems.forEach(otherItem => {
          otherItem.classList.remove("active");
          const ans = otherItem.querySelector(".faq-answer");
          if (ans) ans.style.maxHeight = null;
        });

        if (!isActive) {
          item.classList.add("active");
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      };
    }
  });
}

// 5. Mobile Drawer Navigation
function initMobileDrawer() {
  const openBtn = document.getElementById("mobileMenuBtn");
  const closeBtn = document.getElementById("closeMobileNavBtn");
  const drawer = document.getElementById("mobileNavDrawer");
  const drawerLinks = document.querySelectorAll(".mobile-nav-item a");

  if (openBtn && drawer) {
    openBtn.onclick = () => drawer.classList.add("active");
  }
  if (closeBtn && drawer) {
    closeBtn.onclick = () => drawer.classList.remove("active");
  }
  drawerLinks.forEach(link => {
    link.onclick = () => {
      if (drawer) drawer.classList.remove("active");
    };
  });
}

// 6. Booking Modal & Price Calculator
function initBookingModal() {
  const modal = document.getElementById("bookingModal");
  const closeBtn = document.getElementById("closeBookingModalBtn");
  const tourSelect = document.getElementById("bookingTourSelect");
  const planSelect = document.getElementById("bookingPlanSelect");
  const bookingForm = document.getElementById("bookingForm");

  renderDynamicBookingFields();

  if (tourSelect) {
    tourSelect.innerHTML = "";
    Object.values(TOURS_DATA).forEach(tour => {
      const opt = document.createElement("option");
      opt.value = tour.id;
      opt.textContent = `${tour.title} (${tour.dates || '২০২৬'})`;
      tourSelect.appendChild(opt);
    });

    tourSelect.onchange = () => {
      currentTourId = tourSelect.value;
      populateTourPlans(currentTourId);
      recalculateBooking();
    };
  }

  if (planSelect) planSelect.onchange = recalculateBooking;
  if (closeBtn && modal) closeBtn.onclick = () => modal.classList.remove("active");

  if (bookingForm) {
    bookingForm.onsubmit = (e) => {
      e.preventDefault();
      handleBookingSubmission();
    };
  }
}

function renderDynamicBookingFields() {
  const container = document.getElementById("dynamicBookingFieldsContainer");
  if (!container) return;

  const siteData = window.TWS_SITE_DATA || {};
  const fields = siteData.booking_fields || [
    { id: "persons", label: "মোট যাত্রী সংখ্যা", type: "number", required: true, min: 1, max: 50, defaultVal: 1, width: "half" },
    { id: "guest_age", label: "মূল যাত্রীর বয়স", type: "number", required: true, placeholder: "উদাঃ 52", width: "half" },
    { id: "guest_name", label: "মূল যাত্রীর নাম", type: "text", required: true, placeholder: "আপনার পুরো নাম", width: "half" },
    { id: "guest_phone", label: "WhatsApp মোবাইল নম্বর", type: "tel", required: true, placeholder: "10 ডিজিট নম্বর", width: "half" }
  ];

  let html = "";
  let pendingHalf = null;

  fields.forEach(f => {
    const isHalf = f.width === "half";
    let inputHtml = "";

    if (f.type === "select") {
      const opts = (f.options || []).map(o => `<option value="${escapeHtmlAttr(o)}">${escapeHtml(o)}</option>`).join("");
      inputHtml = `<select id="dynBooking_${f.id}" class="form-select" ${f.required ? 'required' : ''}>${opts}</select>`;
    } else if (f.type === "textarea") {
      inputHtml = `<textarea id="dynBooking_${f.id}" class="form-input" style="height:70px;" placeholder="${escapeHtmlAttr(f.placeholder || '')}" ${f.required ? 'required' : ''}></textarea>`;
    } else {
      inputHtml = `<input type="${f.type || 'text'}" id="dynBooking_${f.id}" class="form-input" placeholder="${escapeHtmlAttr(f.placeholder || '')}" value="${f.defaultVal !== undefined ? f.defaultVal : ''}" ${f.min ? `min="${f.min}"` : ''} ${f.max ? `max="${f.max}"` : ''} ${f.required ? 'required' : ''}>`;
    }

    const fieldBlock = `
      <div class="form-group" style="margin-bottom:0.75rem;">
        <label class="form-label">${escapeHtml(f.label)} ${f.required ? '<span class="req">*</span>' : ''}</label>
        ${inputHtml}
      </div>
    `;

    if (isHalf) {
      if (!pendingHalf) {
        pendingHalf = fieldBlock;
      } else {
        html += `<div class="form-row">${pendingHalf}${fieldBlock}</div>`;
        pendingHalf = null;
      }
    } else {
      if (pendingHalf) {
        html += `<div class="form-row">${pendingHalf}<div></div></div>`;
        pendingHalf = null;
      }
      html += fieldBlock;
    }
  });

  if (pendingHalf) {
    html += `<div class="form-row">${pendingHalf}<div></div></div>`;
  }

  container.innerHTML = html;

  // Bind calculation to persons input
  const personsInput = document.getElementById("dynBooking_persons");
  if (personsInput) {
    personsInput.addEventListener("input", recalculateBooking);
  }
}

function escapeHtmlAttr(str) {
  return String(str || '').replace(/"/g, '&quot;');
}

function populateTourPlans(tourId) {
  const planSelect = document.getElementById("bookingPlanSelect");
  if (!planSelect) return;

  const tour = TOURS_DATA[tourId] || Object.values(TOURS_DATA)[0];
  if (!tour) return;

  planSelect.innerHTML = "";
  (tour.plans || []).forEach((plan, idx) => {
    const opt = document.createElement("option");
    opt.value = plan.id;
    opt.dataset.price = plan.price;
    opt.textContent = `${plan.name} - ₹${plan.price.toLocaleString("en-IN")}`;
    if (idx === 0) opt.selected = true;
    planSelect.appendChild(opt);
  });
}

function openBookingModal(tourId) {
  const modal = document.getElementById("bookingModal");
  const tourSelect = document.getElementById("bookingTourSelect");

  renderDynamicBookingFields();

  if (tourId && TOURS_DATA[tourId]) {
    currentTourId = tourId;
    if (tourSelect) tourSelect.value = tourId;
  }

  populateTourPlans(currentTourId);
  recalculateBooking();
  updateBookingIdPreview();

  if (modal) modal.classList.add("active");
}

function generateBookingId() {
  const randNum = Math.floor(1000 + Math.random() * 9000);
  return `TWS-2026-${randNum}`;
}

function updateBookingIdPreview() {
  const previewEl = document.getElementById("calcBookingId");
  if (previewEl && !previewEl.dataset.generatedId) {
    const id = generateBookingId();
    previewEl.dataset.generatedId = id;
    previewEl.textContent = id;
  }
}

function recalculateBooking() {
  const planSelect = document.getElementById("bookingPlanSelect");
  const personsInput = document.getElementById("dynBooking_persons") || document.getElementById("bookingPersonsInput");
  const unitPriceEl = document.getElementById("calcUnitPrice");
  const totalAmountEl = document.getElementById("calcTotalAmount");
  const tokenAmountEl = document.getElementById("calcTokenAmount");
  const balanceAmountEl = document.getElementById("calcBalanceAmount");

  if (!planSelect) return;

  const selectedOpt = planSelect.options[planSelect.selectedIndex];
  const unitPrice = selectedOpt ? parseInt(selectedOpt.dataset.price || 0) : 0;
  const persons = Math.max(1, parseInt(personsInput ? personsInput.value : 1) || 1);

  const tour = TOURS_DATA[currentTourId] || Object.values(TOURS_DATA)[0];
  const tokenPerPerson = (tour && tour.token_per_person) ? tour.token_per_person : 3000;

  const totalAmount = unitPrice * persons;
  const tokenAmount = Math.min(totalAmount, tokenPerPerson * persons);
  const balanceAmount = Math.max(0, totalAmount - tokenAmount);

  if (unitPriceEl) unitPriceEl.textContent = `₹${unitPrice.toLocaleString("en-IN")}`;
  if (totalAmountEl) totalAmountEl.textContent = `₹${totalAmount.toLocaleString("en-IN")}`;
  if (tokenAmountEl) tokenAmountEl.textContent = `₹${tokenAmount.toLocaleString("en-IN")}`;
  if (balanceAmountEl) balanceAmountEl.textContent = `₹${balanceAmount.toLocaleString("en-IN")}`;
}

async function handleBookingSubmission() {
  const siteData = window.TWS_SITE_DATA || {};
  const fields = siteData.booking_fields || [];
  
  const guestNameEl = document.getElementById("dynBooking_guest_name") || document.getElementById("bookingGuestName");
  const guestAgeEl = document.getElementById("dynBooking_guest_age") || document.getElementById("bookingGuestAge");
  const guestPhoneEl = document.getElementById("dynBooking_guest_phone") || document.getElementById("bookingGuestPhone");
  const personsEl = document.getElementById("dynBooking_persons") || document.getElementById("bookingPersonsInput");

  const guestName = guestNameEl ? guestNameEl.value.trim() : "";
  const guestAge = guestAgeEl ? guestAgeEl.value.trim() : "";
  const guestPhone = guestPhoneEl ? guestPhoneEl.value.trim() : "";
  const persons = personsEl ? personsEl.value : "1";

  const planSelect = document.getElementById("bookingPlanSelect");
  const planName = planSelect && planSelect.selectedIndex >= 0 ? planSelect.options[planSelect.selectedIndex].text : "স্ট্যান্ডার্ড প্যাকেজ";
  const bookingId = document.getElementById("calcBookingId").dataset.generatedId || generateBookingId();
  const totalAmount = document.getElementById("calcTotalAmount").textContent;
  const tokenAmount = document.getElementById("calcTokenAmount").textContent;
  const balanceAmount = document.getElementById("calcBalanceAmount").textContent;

  const tour = TOURS_DATA[currentTourId] || Object.values(TOURS_DATA)[0];

  // Collect custom fields
  let customFieldsText = "";
  const bookingPayload = {
    booking_id: bookingId,
    tour_id: currentTourId,
    tour_title: tour.title,
    tour_dates: tour.dates || '২০২৬',
    plan_name: planName,
    persons: persons,
    guest_name: guestName,
    guest_age: guestAge,
    guest_phone: guestPhone,
    total_amount: totalAmount,
    token_amount: tokenAmount,
    balance_amount: balanceAmount,
    created_at: new Date().toISOString(),
    custom_data: {}
  };

  fields.forEach(f => {
    if (["persons", "guest_name", "guest_age", "guest_phone"].includes(f.id)) return;
    const el = document.getElementById(`dynBooking_${f.id}`);
    if (el && el.value.trim()) {
      customFieldsText += `\n📌 *${f.label}:* ${el.value.trim()}`;
      bookingPayload.custom_data[f.label] = el.value.trim();
    }
  });

  // Save to Firebase Realtime Database
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
        phone: guestPhone,
        name: guestName,
        query: `বুকিং আবেদন: ${tour.title} (${planName}) - ${persons} জন`,
        created_at: new Date().toISOString(),
        source: "Online Booking Form"
      })
    });
  } catch(e) {}

  let waNumber = "919433074880";
  if (siteData.contact && siteData.contact.whatsapp_number) {
    waNumber = siteData.contact.whatsapp_number.replace(/\+/g, "");
  }

  const waMessage = 
`নমস্কার সোমজিৎ ভট্টাচার্য 🙏
আমি আপনার "Tour with Somjit" ওয়েবসাইট থেকে একটি ট্যুর বুকিংয়ের জন্য আবেদন করছি।

📌 *বুকিং বিবরণ:*
🏷️ *বুকিং আইডি:* ${bookingId}
🌄 *ট্যুরের নাম:* ${tour.title}
📅 *তারিখ:* ${tour.dates || '২০২৬'}
👤 *মূল যাত্রীর নাম:* ${guestName} (${guestAge} বছর)
📱 *হোয়াটসঅ্যাপ নম্বর:* ${guestPhone}
👥 *মোট যাত্রীর সংখ্যা:* ${persons} জন
🏨 *রুম ও প্যাকেজ:* ${planName}${customFieldsText}
────────────────────
💰 *মোট প্যাকেজ মূল্য:* ${totalAmount}
🔖 *প্রাথমিক অগ্রিম টোকেন:* ${tokenAmount}
💵 *অবশিষ্ট বকেয়া:* ${balanceAmount}

দয়া করে বুকিং কনফার্মেশন ও পেমেন্টের বিবরণ জানিয়ে দিন। ধন্যবাদ!`;

  const encodedMsg = encodeURIComponent(waMessage);
  const waUrl = `https://wa.me/${waNumber}?text=${encodedMsg}`;

  window.open(waUrl, "_blank");
  showConfirmationVoucher(bookingId, tour, guestName, guestAge, guestPhone, persons, planName, totalAmount, tokenAmount, balanceAmount);
}

function showConfirmationVoucher(bookingId, tour, name, age, phone, persons, plan, total, token, balance) {
  const modalBody = document.querySelector("#bookingModal .modal-body");
  if (!modalBody) return;

  modalBody.innerHTML = `
    <div style="text-align:center; padding: 1rem 0;">
      <div style="font-size:3rem; color: #16a34a; margin-bottom: 0.5rem;"><i class="fas fa-check-circle"></i></div>
      <h3 style="font-size:1.45rem; font-weight:800; color: #1b4332;">আপনার বুকিং অনুরোধ সফলভাবে পাঠানো হয়েছে!</h3>
      <p style="color:#475569; margin-bottom: 1rem;">সোমজিৎ ভট্টাচার্য ও আমাদের অ্যাডমিন টিম দ্রুত আপনার সাথে যোগাযোগ করবেন।</p>
      
      <div class="voucher-card" id="printableVoucher">
        <div style="display:flex; justify-content:space-between; border-bottom:1px solid #e2e8f0; padding-bottom:0.75rem; margin-bottom:1rem;">
          <div style="text-align:left;">
            <h4 style="font-size:1.15rem; font-weight:800; color:#1b4332;">Tour with Somjit</h4>
            <span style="font-size:0.82rem; color:#64748b;">সোমজিৎ ভট্টাচার্য-এর অফিসিয়াল ট্যুর বুকিং ভাউচার</span>
          </div>
          <div style="text-align:right;">
            <span style="font-size:0.8rem; background:#d8f3dc; color:#1b4332; padding:3px 8px; border-radius:4px; font-weight:700;">PROVISIONAL</span>
          </div>
        </div>
        
        <div class="voucher-id">${bookingId}</div>
        <div style="font-size:1.15rem; font-weight:700; color:#0f172a; margin-bottom:0.5rem;">${tour.title}</div>
        <div style="font-size:0.92rem; color:#d97706; font-weight:600; margin-bottom:1rem;"><i class="fas fa-calendar-alt"></i> ${tour.dates || '২০২৬'}</div>

        <div style="background:#f8fafc; border-radius:8px; padding:1rem; text-align:left; font-size:0.92rem; line-height:1.7; margin-bottom:1rem;">
          <div><strong>মূল অতিথি:</strong> ${name} (বয়স: ${age})</div>
          <div><strong>যোগাযোগ:</strong> ${phone}</div>
          <div><strong>যাত্রী সংখ্যা:</strong> ${persons} জন</div>
          <div><strong>প্যাকেজ ধরন:</strong> ${plan}</div>
          <hr style="margin: 0.5rem 0; border:none; border-top: 1px dashed #cbd5e1;">
          <div><strong>মোট প্যাকেজ মূল্য:</strong> ${total}</div>
          <div><strong>প্রাথমিক টোকেন মানি:</strong> ${token}</div>
          <div><strong>ট্যুর শুরুর পূর্বে প্রদেয়:</strong> ${balance}</div>
        </div>

        <div style="display:flex; gap:10px; justify-content:center;" class="modal-actions">
          <button onclick="window.print()" class="btn-view-details" style="background:#1e293b; color:#fff;">
            <i class="fas fa-print"></i> ভাউচার প্রিন্ট করুন
          </button>
          <button onclick="location.reload()" class="btn-book-now">
            <i class="fas fa-check"></i> সম্পন্ন
          </button>
        </div>
      </div>
    </div>
  `;
}

// 7. Full Details & Day-Wise Itinerary Modal
function initItineraryModal() {
  const modal = document.getElementById("itineraryModal");
  const closeBtn = document.getElementById("closeItineraryModalBtn");
  if (closeBtn && modal) {
    closeBtn.onclick = () => modal.classList.remove("active");
  }
}

function getYouTubeVideoId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

function openItineraryModal(tourId) {
  const modal = document.getElementById("itineraryModal");
  const titleEl = document.getElementById("itineraryModalTitle");
  const contentEl = document.getElementById("itineraryModalContent");

  const tour = TOURS_DATA[tourId];
  if (!tour || !modal) return;

  if (titleEl) titleEl.textContent = `${tour.title} - সম্পূর্ণ ভ্রমণ তথ্য ও সুবিধা`;

  const banner = tour.banner_image || "";
  let bannerHtml = "";
  if (banner) {
    bannerHtml = `
      <div style="width:100%; border-radius:12px; overflow:hidden; margin-bottom:1.5rem; background:#0f172a; text-align:center; box-shadow:0 4px 16px rgba(0,0,0,0.1);">
        <img src="${banner}" style="width:100%; max-height:420px; object-fit:contain; display:block; margin:0 auto;">
      </div>
    `;
  }

  // YouTube Video Integration
  let videoHtml = "";
  if (tour.youtube_url) {
    const ytId = getYouTubeVideoId(tour.youtube_url);
    if (ytId) {
      videoHtml = `
        <div style="background:#0f172a; border-radius:12px; overflow:hidden; margin-bottom:1.5rem; box-shadow:0 4px 16px rgba(0,0,0,0.12);">
          <div style="background:#dc2626; color:#ffffff; padding:7px 14px; font-size:0.88rem; font-weight:700; display:flex; align-items:center; gap:8px;">
            <i class="fab fa-youtube" style="font-size:1.1rem;"></i> এই ট্যুরের অফিসিয়াল ভিডিও গাইড ও ভ্লগ
          </div>
          <div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden;">
            <iframe src="https://www.youtube.com/embed/${ytId}?rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position:absolute; top:0; left:0; width:100%; height:100%; border:none;"></iframe>
          </div>
        </div>
      `;
    }
  }

  // Hotel, Room & Sightseeing Gallery
  let galleryHtml = "";
  if (tour.gallery && Array.isArray(tour.gallery) && tour.gallery.length > 0) {
    const validGallery = tour.gallery.filter(g => g && (g.image || typeof g === "string"));
    if (validGallery.length > 0) {
      galleryHtml = `
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:1.25rem; margin-bottom:1.5rem;">
          <h4 style="font-size:1.1rem; font-weight:800; color:var(--forest-primary); margin-bottom:0.85rem; display:flex; align-items:center; gap:8px;">
            <i class="fas fa-hotel" style="color:#d97706;"></i> হোটেল, রুম ও ভ্রমণের নির্বাচিত ছবি:
          </h4>
          <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(170px, 1fr)); gap:12px;">
            ${validGallery.map(g => {
              const imgUrl = g.image || g;
              const cap = g.caption || "ছবি দেখুন";
              return `
                <div style="background:#fff; border-radius:8px; overflow:hidden; border:1px solid #cbd5e1; box-shadow:0 2px 8px rgba(0,0,0,0.05); cursor:pointer;" onclick="window.open('${imgUrl}', '_blank')" title="ক্লিক করে বড় সাইজে দেখুন">
                  <div style="aspect-ratio:4/3; width:100%; overflow:hidden; background:#1e293b;">
                    <img src="${imgUrl}" style="width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.3s ease;" onmouseover="this.style.transform='scale(1.06)'" onmouseout="this.style.transform='scale(1)'">
                  </div>
                  <div style="padding:6px 8px; font-size:0.82rem; font-weight:700; color:var(--slate-800); text-align:center; background:#f8fafc; border-top:1px solid #f1f5f9;">
                    ${cap}
                  </div>
                </div>
              `;
            }).join("")}
          </div>
          <div style="font-size:0.78rem; color:var(--slate-500); text-align:right; margin-top:8px;">
            🔍 যেকোনো ছবিতে ক্লিক করে বড় সাইজে দেখতে পারেন
          </div>
        </div>
      `;
    }
  }

  // Check booking status
  let statusBadgeHtml = "";
  let bookingActionHtml = "";

  if (tour.status === "closed") {
    statusBadgeHtml = `<span style="background:#fee2e2; color:#ef4444; padding:4px 12px; border-radius:999px; font-weight:700; font-size:0.88rem;">🔴 এ বছরের বুকিং সমাপ্ত (Booking Closed)</span>`;
    bookingActionHtml = `
      <button class="btn-submit-booking" style="background:#64748b; cursor:not-allowed;" disabled>
        <i class="fas fa-ban"></i> এ বছরের বুকিং সমাপ্ত
      </button>
    `;
  } else if (tour.status === "coming_soon") {
    statusBadgeHtml = `<span style="background:#fef3c7; color:#d97706; padding:4px 12px; border-radius:999px; font-weight:700; font-size:0.88rem;">🟡 আগামী বছরের বুকিং শীঘ্রই আসছে</span>`;
    bookingActionHtml = `
      <a href="https://wa.me/919433074880?text=${encodeURIComponent('নমস্কার সোমজিৎ ভট্টাচার্য, আমি ' + tour.title + ' ট্যুরটির আগামী বছরের বুকিং নোটিফিকেশন পেতে আগ্রহী।')}" target="_blank" class="btn-submit-booking" style="background:#f59e0b; text-decoration:none;">
        <i class="fab fa-whatsapp"></i> আগামী বছরের জন্য আগ্রহ প্রকাশ করুন
      </a>
    `;
  } else {
    statusBadgeHtml = `<span style="background:#dcfce7; color:#16a34a; padding:4px 12px; border-radius:999px; font-weight:700; font-size:0.88rem;">🟢 ২০২৬ বুকিং চলছে</span>`;
    bookingActionHtml = `
      <button onclick="closeAndBook('${tour.id}')" class="btn-submit-booking" style="max-width:320px; margin:0 auto;">
        <i class="fas fa-ticket-alt"></i> এই ট্যুরটি বুকিং করুন
      </button>
    `;
  }

  let html = `
    ${bannerHtml}
    ${videoHtml}
    <div style="background:var(--forest-surface); border:1px solid var(--forest-soft); padding:1rem; border-radius:8px; margin-bottom:1.5rem;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:6px;">
        <div style="font-weight:700; color:var(--forest-primary); font-size:1.05rem;">📅 সময়কাল: ${tour.duration || 'দিন/রাত'} (${tour.dates || '২০২৬'})</div>
        ${statusBadgeHtml}
      </div>
      <div style="font-size:0.92rem; color:var(--slate-700);">📍 পিকআপ ও ড্রপ: ${tour.pickup_drop || 'কলকাতা / শিয়ালদহ / নির্ধারিত স্টেশন'}</div>
      ${tour.train_dates ? `<div style="font-size:0.92rem; color:var(--slate-700);">🚆 ট্রেন সূচি: ${tour.train_dates}</div>` : ''}
    </div>
  `;

  // If user provided a Facebook-style full caption, render it formatted!
  if (tour.caption_details) {
    html += `
      <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:10px; padding:1.25rem; font-size:0.98rem; line-height:1.75; color:#1e293b; margin-bottom:1.5rem; white-space: pre-line;">
        ${tour.caption_details}
      </div>
    `;
  } else if (tour.itinerary && tour.itinerary.length > 0) {
    html += `
      <h4 style="font-size:1.15rem; font-weight:800; color:var(--slate-900); margin-bottom:1rem; display:flex; align-items:center; gap:6px;">
        <i class="fas fa-map-marked-alt" style="color:var(--forest-primary)"></i> দিন ভিত্তিক বিস্তারিত ভ্রমণসূচী:
      </h4>
      <div style="margin-bottom:1.5rem;">
    `;
    tour.itinerary.forEach(item => {
      html += `
        <div class="itinerary-day-box">
          <div class="itinerary-day-title">${item.day}: ${item.title}</div>
          <div style="font-size:0.94rem; color:var(--slate-700);">${item.desc}</div>
        </div>
      `;
    });
    html += `</div>`;
  }

  if (tour.inclusions && tour.inclusions.length > 0 && !tour.caption_details) {
    html += `
      <h4 style="font-size:1.15rem; font-weight:800; color:var(--slate-900); margin-bottom:1rem; display:flex; align-items:center; gap:6px;">
        <i class="fas fa-check-double" style="color:var(--whatsapp-green)"></i> এই প্যাকেজে অন্তর্ভুক্ত সুবিধাসমূহ:
      </h4>
      <ul class="tour-highlights-list" style="margin-bottom:1.5rem;">
    `;
    tour.inclusions.forEach(inc => {
      html += `<li>${inc}</li>`;
    });
    html += `</ul>`;
  }

  html += `
    ${galleryHtml}
    <div style="text-align:center; padding-top:1rem; border-top:1px solid var(--slate-200);">
      ${bookingActionHtml}
    </div>
  `;

  if (contentEl) contentEl.innerHTML = html;
  modal.classList.add("active");
}

function closeAndBook(tourId) {
  const itinModal = document.getElementById("itineraryModal");
  if (itinModal) itinModal.classList.remove("active");
  openBookingModal(tourId);
}

// 8. Render All Dynamic Content from Master State
function renderDynamicContentFromAdmin() {
  const savedData = localStorage.getItem("tws_custom_site_data");
  let data = null;
  if (savedData) {
    try { data = JSON.parse(savedData); } catch(e){}
  }

  // 1. Branding Images
  if (data && data.branding) {
    if (data.branding.logo_url) {
      document.querySelectorAll(".dyn-logo-img").forEach(el => el.src = data.branding.logo_url);
    }
    if (data.branding.host_main_photo) {
      const hostImg = document.getElementById("dynHostMainPhoto");
      if (hostImg) hostImg.src = data.branding.host_main_photo;
    }
  }

  // 2. General & Hero Text
  if (data && data.general) {
    const g = data.general;
    if (g.urgent_notice) {
      const bar = document.getElementById("urgentNoticeBar");
      if (bar) {
        bar.style.display = "block";
        bar.textContent = g.urgent_notice;
      }
    }
    if (g.agency_name) {
      document.querySelectorAll(".dyn-agency-name").forEach(el => el.textContent = g.agency_name);
    }
    if (g.tagline) {
      document.querySelectorAll(".dyn-tagline").forEach(el => el.textContent = g.tagline);
    }
    if (g.hero_badge) {
      const el = document.getElementById("dynHeroBadge");
      if (el) el.innerHTML = `<i class="fas fa-compass"></i> ${g.hero_badge}`;
    }
    if (g.hero_headline_prefix || g.hero_headline_highlight) {
      const el = document.getElementById("dynHeroHeadline");
      if (el) {
        el.innerHTML = `${g.hero_headline_prefix || "সোমজিৎ ভট্টাচার্য-এর সাথে নিশ্চিন্ত ও"} <span class="highlight">${g.hero_headline_highlight || "ঘরোয়া গ্রুপ ট্যুর ২০২৬"}</span>`;
      }
    }
    if (g.hero_subtext) {
      const el = document.getElementById("dynHeroSubtext");
      if (el) el.textContent = g.hero_subtext;
    }
    if (g.tour_section_subtitle) {
      const el = document.getElementById("dynTourSectionSubtitle");
      if (el) el.textContent = g.tour_section_subtitle;
    }
    if (g.tour_section_title) {
      const el = document.getElementById("dynTourSectionTitle");
      if (el) el.textContent = g.tour_section_title;
    }
    if (g.hero_points && g.hero_points.length >= 4) {
      const container = document.getElementById("dynHeroPointsGrid");
      if (container) {
        container.innerHTML = g.hero_points.map(p => `
          <div class="hero-point">
            <i class="fas ${p.icon || 'fa-check'}"></i>
            <span>${p.text}</span>
          </div>
        `).join("");
      }
    }
  }

  // 3. Host Profile
  if (data && data.host) {
    const h = data.host;
    if (h.name) {
      const el = document.getElementById("dynHostName");
      if (el) el.textContent = h.name;
    }
    if (h.title) {
      const el = document.getElementById("dynHostTitle");
      if (el) el.textContent = h.title;
    }
    if (h.quote) {
      const el = document.getElementById("dynHostQuote");
      if (el) el.textContent = `"${h.quote}"`;
    }
    if (h.youtube_url) {
      const el = document.getElementById("dynHostYtBtn");
      if (el) el.href = h.youtube_url;
    }
    if (h.facebook_url) {
      const el = document.getElementById("dynHostFbBtn");
      if (el) el.href = h.facebook_url;
    }
  }

  // 4. Render Dynamic Tour Cards (Sorted with Featured Tour on Top!)
  renderTourCardsGrid();

  // 5. Render Dynamic YouTube Vlogs
  renderVlogsGrid(data ? data.vlogs : null);

  // 6. Render Dynamic Trust Strip & Why Us
  if (data && data.trust_strip) {
    const container = document.getElementById("dynTrustStripGrid");
    if (container && data.trust_strip.length >= 4) {
      container.innerHTML = data.trust_strip.map(item => `
        <div class="trust-item">
          <div class="trust-icon-box"><i class="fas ${item.icon || 'fa-check'}"></i></div>
          <div class="trust-text">
            <h4>${item.title}</h4>
            <p>${item.desc}</p>
          </div>
        </div>
      `).join("");
    }
  }

  if (data && data.why_us) {
    const container = document.getElementById("dynWhyUsGrid");
    if (container && data.why_us.length >= 4) {
      container.innerHTML = data.why_us.map(item => `
        <div class="why-card">
          <div class="why-icon"><i class="fas ${item.icon || 'fa-star'}"></i></div>
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
        </div>
      `).join("");
    }
  }

  // 7. Render Food Section & Visibility
  if (data && data.food_section) {
    const f = data.food_section;
    const foodSection = document.getElementById("food");
    
    // Check if linked tour is closed or section is disabled
    const linkedTour = (data.tours && f.linked_tour_id) ? data.tours[f.linked_tour_id] : (TOURS_DATA[f.linked_tour_id || "sundarban-2026"] || null);
    const isClosed = linkedTour && linkedTour.status === "closed";

    if (foodSection) {
      if (f.enabled === false || isClosed) {
        foodSection.style.display = "none";
      } else {
        foodSection.style.display = "block";
      }
    }

    if (f.badge) {
      const el = document.getElementById("dynFoodBadge");
      if (el) el.innerHTML = `<i class="fas fa-crown"></i> ${f.badge}`;
    }
    if (f.title) {
      const el = document.getElementById("dynFoodTitle");
      if (el) el.textContent = f.title;
    }
    if (f.desc) {
      const el = document.getElementById("dynFoodDesc");
      if (el) el.textContent = f.desc;
    }
    if (f.tags && f.tags.length > 0) {
      const el = document.getElementById("dynFoodTags");
      if (el) el.innerHTML = f.tags.map(t => `<span class="food-tag">${t}</span>`).join("");
    }
    if (f.day1) {
      const el = document.getElementById("dynFoodDay1");
      if (el) el.textContent = f.day1;
    }
    if (f.day2) {
      const el = document.getElementById("dynFoodDay2");
      if (el) el.textContent = f.day2;
    }
    if (f.day3) {
      const el = document.getElementById("dynFoodDay3");
      if (el) el.textContent = f.day3;
    }
  }

  // 8. Render FAQs
  if (data && data.faqs && data.faqs.length > 0) {
    const container = document.getElementById("dynFaqAccordion");
    if (container) {
      container.innerHTML = data.faqs.map(faq => `
        <div class="faq-item">
          <button class="faq-question-btn">
            <span>${faq.q}</span>
            <i class="fas fa-chevron-down faq-icon-arrow"></i>
          </button>
          <div class="faq-answer">
            <div class="faq-answer-inner">${faq.a}</div>
          </div>
        </div>
      `).join("");
      initFaqAccordion();
    }
  }

  // 8.5. Render Company About & Team Grid
  if (data && data.company_about) {
    const c = data.company_about;
    const badgeEl = document.getElementById("dynAboutBadge");
    const titleEl = document.getElementById("dynAboutTitle");
    const taglineEl = document.getElementById("dynAboutTagline");
    const descEl = document.getElementById("dynAboutDesc");
    const teamHeadEl = document.getElementById("dynTeamSubHeading");
    const addrEl = document.getElementById("dynAboutAddress");
    const emailEl = document.getElementById("dynAboutEmail");
    const phone1El = document.getElementById("dynAboutPhone1");
    const phone2El = document.getElementById("dynAboutPhone2");

    if (badgeEl && c.badge) badgeEl.innerHTML = `<i class="fas fa-building"></i> ${c.badge}`;
    if (titleEl && c.title) titleEl.textContent = c.title;
    if (taglineEl && c.tagline) taglineEl.textContent = c.tagline;
    if (descEl && c.desc) descEl.textContent = c.desc;
    if (teamHeadEl && c.team_heading) teamHeadEl.innerHTML = `<i class="fas fa-users"></i> ${c.team_heading}`;
    if (addrEl && c.address) addrEl.textContent = c.address;
    if (emailEl && c.email) emailEl.textContent = c.email;
    if (phone1El && c.primary_phone) phone1El.textContent = c.primary_phone;
    if (phone2El && c.alt_phone) phone2El.textContent = c.alt_phone;

    const teamContainer = document.getElementById("dynTeamGrid");
    if (teamContainer && c.team && c.team.length > 0) {
      teamContainer.innerHTML = c.team.map(m => `
        <div style="background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:1.5rem 1.25rem; text-align:center; box-shadow:0 4px 15px rgba(0,0,0,0.03);">
          <div style="width:75px; height:75px; border-radius:50%; margin:0 auto 0.85rem auto; overflow:hidden; border:3px solid var(--forest-primary); background:#f1f5f9; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
            <img src="${m.photo || 'assets/images/somjit_avatar.png'}" style="width:100%; height:100%; object-fit:cover; display:block;">
          </div>
          <h4 style="font-size:1.1rem; font-weight:800; color:var(--forest-primary); margin-bottom:4px;">${m.name}</h4>
          <div style="font-size:0.86rem; color:var(--slate-600); margin-bottom:10px; font-weight:600;">${m.role}</div>
          <a href="tel:${m.phone ? m.phone.replace(/[^0-9\+]/g, '') : ''}" style="display:inline-flex; align-items:center; gap:6px; color:#16a34a; font-size:0.88rem; font-weight:700; text-decoration:none; background:#f0fdf4; padding:5px 14px; border-radius:999px; border:1px solid #bbf7d0;">
            <i class="fas fa-phone-alt"></i> ${m.phone || ''}
          </a>
        </div>
      `).join("");
    }
  }

  // 9. Contact & Footer Texts
  if (data && data.contact) {
    const c = data.contact;
    if (c.primary_phone) {
      document.querySelectorAll(".dyn-primary-phone").forEach(el => el.textContent = c.primary_phone);
      document.querySelectorAll(".dyn-primary-phone-link").forEach(el => el.href = `tel:+91${c.primary_phone}`);
    }
    if (c.whatsapp_number) {
      document.querySelectorAll(".dyn-whatsapp-link").forEach(el => el.href = `https://wa.me/${c.whatsapp_number.replace(/\+/g, '')}`);
    }
    if (c.admin_name) {
      const el = document.getElementById("dynAdminName");
      if (el) el.textContent = c.admin_name;
    }
    if (c.admin_phone) {
      const el = document.getElementById("dynAdminPhone");
      if (el) el.textContent = c.admin_phone;
    }
    if (c.address) {
      const el = document.getElementById("dynAddress");
      if (el) el.textContent = c.address;
    }
  }

  if (data && data.footer) {
    if (data.footer.about) {
      const el = document.getElementById("dynFooterAbout");
      if (el) el.textContent = data.footer.about;
    }
    if (data.footer.copyright) {
      const el = document.getElementById("dynFooterCopyright");
      if (el) el.textContent = data.footer.copyright;
    }
  }
}

// Render Tour Cards Grid with Featured Sort & Click-Anywhere Action
function renderTourCardsGrid() {
  const container = document.getElementById("dynToursGrid");
  if (!container) return;

  // Smart Automatic Sort:
  // 1. Featured tour always #1
  // 2. Open / Few seats tours next
  // 3. Coming soon next
  // 4. Closed tours always at the very bottom/end
  const tours = Object.values(TOURS_DATA).sort((a, b) => {
    if (a.is_featured && !b.is_featured) return -1;
    if (!a.is_featured && b.is_featured) return 1;

    const aIsOpen = (a.status === "open" || a.status === "few_seats");
    const bIsOpen = (b.status === "open" || b.status === "few_seats");
    if (aIsOpen && !bIsOpen) return -1;
    if (!aIsOpen && bIsOpen) return 1;

    if (a.status === "coming_soon" && b.status === "closed") return -1;
    if (a.status === "closed" && b.status === "coming_soon") return 1;

    return 0;
  });

  let html = "";

  tours.forEach(tour => {
    const startPrice = (tour.plans && tour.plans.length > 0) ? Math.min(...tour.plans.map(p => p.price)) : 15000;
    const banner = tour.banner_image || "";
    const status = tour.status || "open";

    // 1:1 Banner Render
    let bannerHtml = "";
    if (banner) {
      bannerHtml = `<img src="${banner}" alt="${tour.title}" class="tour-img">`;
    } else {
      let gradient = "linear-gradient(135deg, #1e3a8a, #0f172a)";
      let icon = "fa-mountain";
      let iconColor = "#93c5fd";

      if (tour.category === "sundarban") { gradient = "linear-gradient(135deg, #065f46, #064e3b)"; icon = "fa-fish"; iconColor = "#6ee7b7"; }
      else if (tour.category === "ranchi") { gradient = "linear-gradient(135deg, #1e293b, #334155)"; icon = "fa-water"; iconColor = "#38bdf8"; }
      else if (tour.category === "spiti") { gradient = "linear-gradient(135deg, #312e81, #1e1b4b)"; icon = "fa-snowflake"; iconColor = "#c7d2fe"; }
      else if (tour.category === "purulia") { gradient = "linear-gradient(135deg, #9a3412, #7c2d12)"; icon = "fa-tree"; iconColor = "#fdba74"; }
      else if (tour.category === "dooars") { gradient = "linear-gradient(135deg, #14532d, #052e16)"; icon = "fa-paw"; iconColor = "#86efac"; }

      bannerHtml = `
        <div class="tour-img-bg" style="background: ${gradient};">
          <i class="fas ${icon} tour-img-icon" style="color:${iconColor};"></i>
          <div class="tour-img-dest">${tour.title}</div>
          <div style="font-size:0.88rem; opacity:0.85;">${tour.route || tour.duration || ''}</div>
        </div>
      `;
    }

    // Status Badges & Buttons
    let statusBadgeTop = `<div class="tour-badge-top" style="background:#16a34a;"><i class="fas fa-check-circle"></i> ২০২৬ বুকিং চলছে</div>`;
    let bookBtnHtml = `
      <button onclick="event.stopPropagation(); openBookingModal('${tour.id}')" class="btn-book-now">
        <i class="fas fa-ticket-alt"></i> সিট বুক করুন
      </button>
    `;

    if (status === "closed") {
      statusBadgeTop = `<div class="tour-badge-top" style="background:#ef4444;"><i class="fas fa-ban"></i> এ বছরের বুকিং সমাপ্ত</div>`;
      bookBtnHtml = `
        <button onclick="event.stopPropagation();" class="btn-book-now" style="background:#94a3b8; cursor:not-allowed;">
          <i class="fas fa-lock"></i> বুকিং সমাপ্ত
        </button>
      `;
    } else if (status === "coming_soon") {
      statusBadgeTop = `<div class="tour-badge-top" style="background:#f59e0b;"><i class="far fa-clock"></i> আগামী বছরের বুকিং শীঘ্রই</div>`;
      bookBtnHtml = `
        <button onclick="event.stopPropagation(); window.open('https://wa.me/919433074880?text=${encodeURIComponent('নমস্কার সোমজিৎ ভট্টাচার্য, আমি ' + tour.title + ' ট্যুরটির আগামী বছরের বুকিং তথ্য পেতে আগ্রহী।')}', '_blank')" class="btn-book-now" style="background:#f59e0b;">
          <i class="fab fa-whatsapp"></i> নোটিফিকেশন নিন
        </button>
      `;
    } else if (status === "few_seats") {
      statusBadgeTop = `<div class="tour-badge-top" style="background:#dc2626;"><i class="fas fa-fire"></i> সীমিত সিট বাকি!</div>`;
      bookBtnHtml = `
        <button onclick="event.stopPropagation(); openBookingModal('${tour.id}')" class="btn-book-now" style="background:#dc2626;">
          <i class="fas fa-bolt"></i> দ্রুত বুক করুন
        </button>
      `;
    }

    // Featured Highlight
    let featuredRibbon = "";
    let featuredCardStyle = "";
    if (tour.is_featured) {
      featuredRibbon = `<div style="background:#d97706; color:#fff; text-align:center; padding:5px 10px; font-size:0.82rem; font-weight:800; letter-spacing:0.5px;"><i class="fas fa-star"></i> বর্তমানে এই ট্যুরের বুকিং চলছে (প্রধান আকর্ষণ)</div>`;
      featuredCardStyle = "border: 2px solid #f59e0b; box-shadow: 0 10px 25px rgba(245, 158, 11, 0.25);";
    }

    // Extract first 3 highlights/caption lines
    let highlightsList = tour.inclusions || [];
    if (tour.caption_details) {
      highlightsList = tour.caption_details.split("\n").map(l => l.trim()).filter(l => l.length > 5).slice(0, 4);
    }

    html += `
      <div class="tour-card ${status === 'closed' ? 'status-closed' : ''}" data-category="${tour.category || 'all'}" onclick="openItineraryModal('${tour.id}')" style="cursor:pointer; ${featuredCardStyle}" title="সম্পূর্ণ বিস্তারিত তথ্য দেখতে ক্লিক করুন">
        ${featuredRibbon}
        <div class="tour-image-container">
          ${bannerHtml}
          ${statusBadgeTop}
          <div class="tour-duration-badge"><i class="far fa-clock"></i> ${tour.duration || 'দিন/রাত'}</div>
          <div class="tour-host-badge"><i class="fas fa-user-check"></i> সম্পূর্ণ ট্যুরের সঙ্গে থাকছি আমি সোমজিৎ ভট্টাচার্য</div>
        </div>
        <div class="tour-card-body">
          <div class="tour-dates-row">
            <i class="fas fa-calendar-alt"></i> ${tour.dates || '২০২৬'}
          </div>
          <h3 class="tour-card-title">${tour.title}</h3>
          
          <ul class="tour-highlights-list">
            ${highlightsList.slice(0, 4).map(h => `<li>${h.replace(/^[✓•\-\*]\s*/, '')}</li>`).join("")}
          </ul>

          <div style="font-size:0.82rem; color:#2563eb; font-weight:700; margin-bottom:0.75rem;">
            👉 বিস্তারিত বিবরণ দেখতে কার্ডের যেকোনো জায়গায় টাচ করুন
          </div>

          <div class="tour-price-box">
            <div>
              <div class="price-label">প্যাকেজ শুরু মাত্র</div>
              <div class="price-amount">₹${startPrice.toLocaleString("en-IN")} <span style="font-size:0.9rem; font-weight:500;">/জনপ্রতি</span></div>
              <div class="price-note">টোকেন মাত্র ₹${(tour.token_per_person || 3000).toLocaleString("en-IN")}</div>
            </div>
            <div style="text-align:right;">
              <span style="font-size:0.82rem; background:#d8f3dc; color:#1b4332; padding:3px 8px; border-radius:4px; font-weight:700;">সব মিল অন্তর্ভুক্ত</span>
            </div>
          </div>

          <div class="tour-card-actions">
            <button onclick="event.stopPropagation(); openItineraryModal('${tour.id}')" class="btn-view-details">
              <i class="fas fa-list-ul"></i> সম্পূর্ণ ডিটেইলস
            </button>
            ${bookBtnHtml}
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Render YouTube Vlogs Grid
function extractVideoIdHelper(url) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  return (match && match[1]) ? match[1] : null;
}

function renderVlogsGrid(customVlogs) {
  const container = document.getElementById("dynVlogsGrid");
  if (!container) return;

  const vlogs = customVlogs || (window.TWS_SITE_DATA && window.TWS_SITE_DATA.vlogs) || [];
  if (!vlogs || vlogs.length === 0) return;

  let html = "";
  vlogs.forEach(v => {
    const videoId = extractVideoIdHelper(v.youtube_url);
    const thumb = v.thumbnail_url || (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "assets/images/somjit_host.jpg");
    const link = v.youtube_url || "https://youtube.com/@somjitbhattacharyya";

    html += `
      <a href="${link}" target="_blank" class="vlog-card" title="ভিডিও দেখতে ক্লিক করুন">
        <div class="vlog-thumbnail">
          <img src="${thumb}" alt="${v.title}" class="vlog-thumb-img" loading="lazy">
          <div class="vlog-play-btn"><i class="fas fa-play"></i></div>
          <span style="position:absolute; bottom:8px; right:8px; background:rgba(0,0,0,0.75); color:#fff; font-size:0.75rem; font-weight:700; padding:2px 8px; border-radius:4px; display:inline-flex; align-items:center; gap:4px;">
            <i class="fab fa-youtube" style="color:#ff0000;"></i> YouTube
          </span>
        </div>
        <div class="vlog-info">
          <h4>${v.title}</h4>
          <p>${v.desc || 'সোমজিৎ ভট্টাচার্য-এর সাথে আকর্ষণীয় ভ্রমণ অভিজ্ঞতা।'}</p>
        </div>
      </a>
    `;
  });

  container.innerHTML = html;
}
