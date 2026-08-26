# Tour with Somjit (সোমজিৎ ভট্টাচার্য-এর সাথে গ্রুপ ট্যুর ২০২৬)

An accessible, high-conversion Bengali Tourism Web Portal and Built-in Visual Admin CMS designed for Bengali Travel Vlogger **Somjit Bhattacharyya** (সোমজিৎ ভট্টাচার্য) and his travel agency **"Tour with Somjit"**.

---

## 🌟 Key Innovations Built for Mature & Smart TV Audiences

1. **📺 Smart TV & 10-Foot UI Optimization**:
   - **One-Click TV WhatsApp QR Code Modal**: For viewers watching on Android TV / Smart TV browsers, clicking **"📺 টিভি মোড / QR কোড"** displays a large scannable QR Code on the TV screen. Senior travelers can scan the TV screen with their phone camera to open WhatsApp directly without typing any 10-digit number!
   - **Ultra-Large Senior Citizen Typography**: 4-level font scale (`A-`, `A`, `A+`, `A++`) and High Contrast Dark/Light mode with local persistence.
   - **Senior Citizen Care Badges**: Medical Oxygen Cylinder & portable can backup, dedicated Bengali Cook (no hotel food), No Rear Cramped Seats in Tempo Travellers with seat rotation.

2. **🔐 Built-in Official Admin CMS (`admin.html`) - Zero Coding Required**:
   - **Password / PIN Protected**: Accessible at `http://localhost:8080/admin.html` (Default PIN: `1234`).
   - **Visual Content Management**:
     - Edit Agency name, Taglines, Emergency Announcement Banners.
     - Edit Phone Numbers & WhatsApp numbers.
     - Manage all 6 Tours (Modify Titles, Dates, Prices, Tokens, Highlights).
     - Update Food & Hilsa Festival Menus.
     - Add / Delete FAQs.
     - Export Full JSON Data Backup & Change Admin Security PIN.
   - **Instant Reflection**: Any changes saved in the Admin Dashboard instantly update the live website without editing any code!

3. **2026 Signature Tour Catalog**:
   - **লাদাখ মহাবিস্ময় (12N/13D, May 25 – June 10, 2026)**: Srinagar to Chandigarh, Pangong, Tso Moriri, Turtuk, Siachen Base Camp, Bengali Cook.
   - **দ্বিতীয় সুন্দরবন ইলিশ উৎসব (2N/3D, July 24–26, 2026)**: AC Luxury Bus from Kolkata, Dayapur AC Resort, MV Devi Annapurna 2 Luxury Launch, 10+ Hilsa delicacies.
   - **সিটি অফ ফলস রাঁচি ও নেতারহাট (3N/4D, Aug 25–30, 2026)**: Hudru, Jonha, Dassam, Lodh Falls, Patratu Valley & Dam, Magnolia Sunset Point.
   - **কিন্নর স্পিতি ভ্যালি গ্র্যান্ড ট্যুর (10N/11D, Sept 18 – Oct 2, 2026)**: Chandratal Lake trek, Chitkul border village, 500-year Giu Mummy, Tabo Monastery.
   - **পুরুলিয়া পলাশ উৎসব ও অযোধ্যা পাহাড় (2N/3D, March 11–14, 2026)**: Matha Hill Eco Resort, Live Chau Dance, Bamni Falls, Joychandi Pahar.
   - **ডুয়ার্স গরুমারা ও জলদাপাড়া (4N/5D, Nov 13–19, 2026)**: ADB KANVAS Luxury Resort, Complimentary Gorumara Jeep Safari, Rabha Tribal Dance & Bonfire.

4. **Real-time Live Price Calculator & Instant WhatsApp Booking**:
   - Form fields: Primary Guest Name, Age, WhatsApp Number, Tour Selection, Room/Sharing Plan, and Total Persons.
   - Calculates Total Price, Advance Token Money, and Balance Payable dynamically.
   - Auto-generates unique Customer Booking ID (e.g., `TWS-2026-8492`).
   - One-Click WhatsApp confirmation redirect (`wa.me/919433074880`) with a structured, polite Bengali message containing full pricing and guest details.
   - Instant Printable Booking Voucher generation (`window.print()`).

---

## 📁 Directory Structure

```text
tour-with-somjit/
│
├── index.html                   # Public Bengali Web Portal
├── admin.html                   # Official Admin CMS & Visual Editor
├── elementor-template.json      # WordPress Elementor Template Export
├── README.md                    # Documentation & Setup Manual
├── data_store.py                # Python Master Data Model for all 6 tours
│
└── assets/
    ├── css/
    │   ├── styles.css           # Public responsive stylesheet (A11y, Dark mode, TV)
    │   └── admin.css            # Admin dashboard stylesheet
    ├── js/
    │   ├── app.js               # Public interactive tour engine & Admin sync
    │   └── admin.js             # Admin CMS logic, PIN auth & data persistence
    └── images/
        ├── somjit_host.jpg      # Host close-up portrait
        └── somjit_avatar.png    # Somjit circular brand avatar
```

---

## 🚀 How to Run & Access

1. **Start Local Server**:
```powershell
cd C:\Users\USER\.gemini\antigravity\scratch\tour-with-somjit
python -m http.server 8080
```

2. **Public Website**: Visit `http://localhost:8080` (or `http://192.168.73.112:8080` from mobile on same Wi-Fi).
3. **Official Admin Panel**: Visit `http://localhost:8080/admin.html` (PIN: `1234`).
