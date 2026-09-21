# Dr. Anil's Physiotherapy and Pain Relief Clinic Website

A modern, responsive **5-page physiotherapy clinic marketing website** for **Dr. Anil's Physiotherapy and Pain Relief Clinic**, located in **Miyapur, Hyderabad**.

Built strictly with clean **HTML5**, **CSS3**, **Vanilla JavaScript**, **Bootstrap 5**, and **Bootstrap Icons**. No heavy front-end frameworks (React/Next.js/Tailwind) are required, ensuring fast page load speed, high SEO scores, and straightforward maintenance.

---

## 1. Project Structure

```text
dr.anil_physiotherapy/
│
├── index.html              # Home page (Hero, Trust, 6 Services Preview, Why Choose Us, 3-Step Journey, Testimonials, FAQ)
├── about.html              # About Dr. Anil & Clinic (Clinical Focus, Values, 4-Pillar Approach, Environment)
├── services.html           # 8 Detailed Service Sections + Google Ads Landing Anchors + Process Timeline
├── blog.html               # Educational Blog (Category Filter, Live Search, Accessible Article Modal)
├── contact.html            # Contact & Booking (Validated Appointment Form, Hours, Map, Direct CTAs)
│
├── css/
│   └── style.css           # Master custom stylesheet & design system
│
├── js/
│   └── script.js           # Navigation, form validation, blog filter/modal, analytics & ads conversion tracker
│
├── assets/
│   ├── images/             # Optimized local clinical photography
│   └── icons/              # SVG clinic emblem logo & favicon
│
├── favicon.ico             # Browser favicon
├── robots.txt              # Search engine crawler directives
├── sitemap.xml             # XML sitemap for SEO indexing
└── README.md               # Project documentation
```

---

## 2. Official Brand Design System & Palette

| Token | Hex | Usage & Application |
| :--- | :--- | :--- |
| **Primary Dark** | `#0D3B66` | Main headings, navigation bar, strong text, footer |
| **Primary Blue** | `#0EA5E9` | Primary CTAs, active buttons, links, highlights |
| **Secondary Teal** | `#14B8A6` | Accent borders, medical icons, active states |
| **Fresh Green** | `#4CCB8F` | Highlights, success elements, wellness indicators |
| **Background Light** | `#F8FCFF` | Clean, luminous clinical page background |
| **Section Background** | `#E6F2F8` | Feature cards, alternating section backgrounds |
| **Text Dark** | `#1F2937` | High-contrast readable body & title typography |
| **Text Muted** | `#6B7280` | Subtext, captions, metadata |
| **Pure White** | `#FFFFFF` | Content cards, modals, form containers |

### Brand Gradient
- `linear-gradient(90deg, #4CCB8F 0%, #14B8A6 35%, #0EA5E9 70%, #0D3B66 100%)`
- Slogan / Tagline: **MOVE BETTER • LIVE PAIN-FREE**

### Typography Pairing
- **Headings:** *Poppins Bold* (Google Fonts) – Friendly, modern, clinical confidence.
- **Body & Controls:** *Inter* / *Poppins Regular* (Google Fonts) – High legibility for medical and clinical content.

---

## 3. SEO & Local Search Setup (Miyapur, Hyderabad)

1. **On-Page SEO**:
   - Unique `<title>` and `<meta name="description">` on all 5 pages.
   - Target keywords naturally integrated: *Physiotherapy clinic in Miyapur, Physiotherapist in Miyapur, Pain relief clinic in Miyapur, Back pain physiotherapy in Miyapur, Sports injury rehabilitation in Hyderabad*.
   - Semantic HTML5 structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
   - Single `<h1>` per page.
   - Open Graph (`og:*`) and Twitter Cards metadata on all pages.
2. **Schema.org Structured Data (JSON-LD)**:
   - `MedicalBusiness` / `LocalBusiness` schema with Miyapur coordinates and contact placeholders.
   - `FAQPage` schema on `index.html`.
   - `Blog` and `BlogPosting` schemas on `blog.html`.
   - `MedicalWebPage` and `Service` offer catalog on `services.html`.
3. **Official Social Media Integration**:
   - Facebook: [dranilsphysiotherapy](https://www.facebook.com/dranilsphysiotherapy/)
   - Instagram: [@dranilsphysiotherapy](https://www.instagram.com/dranilsphysiotherapy)
   - LinkedIn: [dr-anils-physiotherapy](https://www.linkedin.com/company/dr-anils-physiotherapy/)
   - Pinterest: [dranilsphysiotherapy](https://www.pinterest.com/dranilsphysiotherapy/)
   - X: [@dranilsphysio](https://x.com/dranilsphysio)
   - YouTube: [@DrAnilphysiotherapy](https://www.youtube.com/@DrAnilphysiotherapy)
   - Google Business Profile: [Dr. Anil's Clinic Share](https://share.google/oYsHqs1YdW2rj2v3g)

---

## 4. Google Ads & Meta Ads Readiness

### Conversion Event Dispatcher (`js/script.js`)
The website comes pre-configured with a universal `trackLeadEvent(eventName, payload)` function.

Events monitored out of the box:
- `appointment_form_submit` (Triggers `conversion` for Google Ads & `Lead` for Meta Pixel)
- `book_appointment_click` (Triggers `Schedule` for Meta Pixel)
- `phone_click` (Triggers `Contact` for Meta Pixel)
- `whatsapp_click` (Triggers `Contact` for Meta Pixel)
- `service_view` (Triggers `ViewContent` for Meta Pixel)
- `blog_article_view` (Triggers custom engagement event)

### How to Connect Verification IDs:
In `js/script.js`, replace the placeholder comment section:
```javascript
// GA4 Measurement ID: [ADD VERIFIED ID]
// Google Tag Manager ID: [ADD VERIFIED ID]
// Google Ads Conversion ID: [ADD VERIFIED ID]
// Google Ads Conversion Label: [ADD VERIFIED LABEL]
// Meta Pixel ID: [ADD VERIFIED ID]
```
Add your GTM or GA4/Google Ads snippet into `<head>` of each HTML page.

### Campaign Anchor Deep-Links:
Dedicated campaign landing anchors on `services.html`:
- Back & Neck Pain: `services.html#back-neck`
- Sports Rehabilitation: `services.html#sports-rehab`
- Orthopedic Care: `services.html#orthopedic`
- Post-Surgery Recovery: `services.html#post-surgery`
- Joint & Muscle Pain: `services.html#joint-muscle`
- Mobility & Conditioning: `services.html#mobility-strength`
- Posture Correction: `services.html#posture-correction`
- Chronic Pain Management: `services.html#chronic-pain`

---

## 5. Verified Information Placeholders

To maintain strict healthcare compliance and prevent misinformation, unverified details are clearly labeled with bracketed placeholders:
- Phone: `+91 63037 38848` / `+91 96037 26028`
- WhatsApp: `+91 96037 26028`
- Email: `dranilsphysio@gmail.com`
- Address: `Old Police Station Road, Opp. Canara Bank, Beside Saiteja Hospital, Nandini Nagar, Ambedkar Nagar, Hafeezpet, Miyapur, Hyderabad, Telangana 500049`
- Timings: `Mon - Sat: 9:30 AM - 1:30 PM, 2:30 PM - 9:00 PM (Sunday Closed)`

### Verified Doctor Credentials (Authenticated via University & Association Certificates):
1. **Dr. Anil Chand Gera / Dr. G. Anil Chand, PT** (Founder & Senior Consultant Physiotherapist):
   - **University Degrees:** Bachelor of Physiotherapy (BPT) &ndash; Dr. NTR University of Health Sciences, AP (Nov 2009, Regd. No. `0338039`, Issued 28-12-2010)
   - **Council Registration:** Life Member, The Indian Association of Physiotherapists (I.A.P. Reg. No. `L-32650`, Ref. No. `24550`, Dt. 17-04-2012)
   - **Clinical Experience:** 16+ Years Dedicated Practice
   - **Specialized Clinical Certifications & Fellowships (Authenticated):**
     1. **Advanced Biomechanical Corrections (ABC) – Level 3 Advanced Level:**
        - Specialization: *Osteopathy & Diversified Chiropractic Spine Manipulation*
        - Approved by: Indian School of Biomechanics & The Cortex / PIIMSR
        - Reg. No: `042 /ABC/Adv/Hyderabad/December-2025` (24 Credit Hours, 21-23 Nov 2025, Hyderabad)
     2. **Advanced Biomechanical Corrections of Extremities (ABCE):**
        - Specialization: *Osteopathy and Diversified Chiropractic Peripheral Manipulation*
        - Issuing Institute: Pearl International Institute of Medical Sciences and Research (PIIMSR)
        - Reg. No: `209 ABCE - HYD - 2023` (24 Credit Hours, 15-17 Dec 2023, Hyderabad)
     3. **Certified Diversified Needling Therapist:**
        - Issuing Body: Cortex Sports Therapy Association (CSTA)
        - Recognitions: Registered Under Ministry of Corporate Affairs, Ministry of MSME (Govt. of India)
        - Reg. No: `HR14202001660` | Course No: `CEP 784623` | 8 CEC Hours / 1.6 CPD Approved (Valid Worldwide)
     4. **PNF Therapy (Proprioceptive Neuromuscular Facilitation):**
        - Specialization: Practical Skills to Assess & Treat Neuro-Musculoskeletal Disorders
        - Issuing Body: Advanced Physical Therapy Academy (APTA), Govt. of India Reg. `BOZPS6725JSD001` (8 Credit Hours, 26 Nov 2022)
     5. **Reflex Release Techniques (RRT):**
        - Specialization: Practical Skills to Assess & Treat Neuro-Musculoskeletal Disorders
        - Issuing Body: Advanced Physical Therapy Academy (APTA), Govt. of India Reg. `BOZPS6725JSD001` (8 Credit Hours, 27 Nov 2022)

2. **Dr. Sudeeptha Meruga** (Consultant Physiotherapist & Musculoskeletal Therapist):
   - **Qualifications:**
     - Master of Physiotherapy in ORTHOPAEDICS (MPT Orthopaedics &ndash; First Division), Dr. NTR UHS (June 2010, Regd. No. `0843005M`, S. No. PP `000409`, Issued 01-10-2022)
     - Bachelor of Physiotherapy (BPT), Dr. NTR UHS (March 2007, Regd. No. `0239013`, Issued 12-01-2013)
   - **Registration:** Dr. NTR University of Health Sciences Verified (P.G. Regd. No. `0843005M` | U.G. Regd. No. `0239013`)
   - **Experience:** 17+ Years Specialized Practice (MPT Orthopaedics)
   - **Specialized Clinical Certifications & Fellowships (Authenticated):**
     1. **Certificate in Positional Release Therapy (C.P.R.T.):**
        - Issuing Academy: Physioneeds Academy, London, United Kingdom
        - Certificate Number: `ZKH6F0QA` (Date of Completion: June 17, 2026)
        - Academic Chancellor: Dr. Chakshu Bansal, Ph.D.
        - Institutional Accreditations: GeM, IAF, ISO 9001:2015, QCRO, EGAC, UN DESA, ADB, MSME, Skill India, International Register of Accredited Professionals
     2. **Online Certification Course in Kinesiology Taping:**
        - Issuing Institute: E-Physioneeds Academy (www.E-Physioneeds.com)
        - Certificate Number: `WN60T7LS` (Issue Date: 13th June 2025)
        - Faculty: Dr. Chakshu Bansal, Ph.D. & Prof. Krishna N. Sharma, Ph.D.
        - Accreditation: ISSA (International Sports Sciences Association) Accredited Provider

---

## 6. How to Run Locally

You can serve the static files with any lightweight local web server:

```bash
# Using Python 3:
python3 -m http.server 8080

# Or using npx serve:
npx -y serve .
```

Open your browser at `http://localhost:8080/`.
