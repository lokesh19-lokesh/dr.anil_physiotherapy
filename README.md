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

## 2. Design System & Palette

| Token | Hex | Usage |
| :--- | :--- | :--- |
| **Deep Navy** | `#123B5D` | Headings, primary buttons, sticky navbar, footer |
| **Soft Teal** | `#3B8C8C` | Secondary accents, icons, links, highlight badges |
| **Warm Sand** | `#D9B98C` | Premium decorative accents, subtle borders |
| **Warm Off-White** | `#F8F7F4` | Main page background |
| **Charcoal** | `#1F2933` | Body typography |
| **Muted Gray** | `#667085` | Supporting text, captions, metadata |
| **White** | `#FFFFFF` | Cards, modals, contrast sections |

### Typography Pairing
- **Headings:** *Playfair Display* (Google Fonts) – Sophisticated, calm, clinical editorial feel.
- **Body & Controls:** *Inter* (Google Fonts) – Ultra-legible, crisp, modern UI typography.

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
- Phone: `[ADD VERIFIED PHONE NUMBER]`
- WhatsApp: `[ADD VERIFIED WHATSAPP NUMBER]`
- Email: `[ADD VERIFIED EMAIL ADDRESS]`
- Address: `[ADD VERIFIED CLINIC ADDRESS, MIYAPUR, HYDERABAD]`
- Timings: `[ADD VERIFIED CLINIC TIMINGS]`
- Doctor Qualifications: `[ADD VERIFIED QUALIFICATIONS]`
- Experience: `[ADD VERIFIED EXPERIENCE]`
- Professional Registration: `[ADD VERIFIED PROFESSIONAL REGISTRATION]`

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
