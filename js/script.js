/**
 * DR. ANIL'S PHYSIOTHERAPY AND PAIN RELIEF CLINIC - MIYAPUR, HYDERABAD
 * Master JavaScript File
 * 
 * Includes:
 * 1. Analytics & Ads Tracking Infrastructure (GA4, GTM, Google Ads, Meta Pixel)
 * 2. Sticky Header & Scroll Spy
 * 3. Appointment / Contact Form Interactive Validation
 * 4. Blog Engine (Category Filter, Live Search, Modal Reader)
 * 5. Micro-interactions & Accessible Modal Helpers
 */

/* ==========================================================================
   1. ANALYTICS & ADS TRACKING DISPATCHER
   ==========================================================================
   
   TRACKING PLACEHOLDERS FOR VERIFIED IDS:
   - GA4 Measurement ID: [ADD VERIFIED ID]
   - Google Tag Manager ID: [ADD VERIFIED ID]
   - Google Ads Conversion ID: [ADD VERIFIED ID]
   - Google Ads Conversion Label: [ADD VERIFIED LABEL]
   - Meta Pixel ID: [ADD VERIFIED ID]
   
   To connect:
   1. Replace placeholders above in your tag manager / snippet.
   2. Ensure gtag.js or fbq script is loaded in <head>.
   3. trackLeadEvent will automatically route events to both engines.
   ========================================================================== */

/**
 * Universal Event Tracker for Google Ads, Meta Ads, and GA4
 * @param {string} eventName - Standardized event name (e.g. 'book_appointment_click', 'whatsapp_click')
 * @param {object} eventParams - Optional metadata payload
 */
function trackLeadEvent(eventName, eventParams = {}) {
  const timestamp = new Date().toISOString();
  const payload = { ...eventParams, timestamp, clinic: "Dr. Anil's Physiotherapy - Miyapur" };

  // 1. Log cleanly in development / testing
  console.info(`[Analytics & Ads Event] -> "${eventName}"`, payload);

  // 2. Google Tag Manager / dataLayer push
  if (window.dataLayer && Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: eventName,
      ...payload
    });
  }

  // 3. Google Analytics 4 & Google Ads Conversion Tracking (gtag)
  if (typeof window.gtag === 'function') {
    // Standard GA4 event
    window.gtag('event', eventName, payload);

    // Google Ads conversion trigger placeholder
    if (eventName === 'appointment_form_submit') {
      // Connect verified Google Ads conversion tag here:
      // window.gtag('event', 'conversion', {
      //   'send_to': '[ADD VERIFIED ID]/[ADD VERIFIED LABEL]',
      //   ...payload
      // });
    }
  }

  // 4. Meta Pixel (Facebook & Instagram Advertising)
  if (typeof window.fbq === 'function') {
    switch (eventName) {
      case 'appointment_form_submit':
        window.fbq('track', 'Lead', payload);
        break;
      case 'book_appointment_click':
        window.fbq('track', 'Schedule', payload);
        break;
      case 'whatsapp_click':
      case 'phone_click':
        window.fbq('track', 'Contact', payload);
        break;
      case 'service_view':
        window.fbq('track', 'ViewContent', { content_type: 'service', ...payload });
        break;
      default:
        window.fbq('trackCustom', eventName, payload);
    }
  }
}

// Global delegated event listeners for CTAs & Ads conversions
document.addEventListener('DOMContentLoaded', () => {
  // Sticky header scroll behavior
  const header = document.querySelector('.site-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // Track Phone CTA clicks
  document.querySelectorAll('a[href^="tel:"]').forEach(el => {
    el.addEventListener('click', () => {
      trackLeadEvent('phone_click', {
        label: el.innerText.trim() || 'Call Button',
        source: el.getAttribute('data-source') || 'Direct CTA'
      });
    });
  });

  // Track WhatsApp CTA clicks
  document.querySelectorAll('a[href*="whatsapp.com"], a[href*="wa.me"], .btn-whatsapp, .fab-btn-whatsapp').forEach(el => {
    el.addEventListener('click', () => {
      trackLeadEvent('whatsapp_click', {
        label: el.innerText.trim() || 'WhatsApp CTA',
        source: el.getAttribute('data-source') || 'Floating Button'
      });
    });
  });

  // Track "Book an Appointment" CTA button clicks
  document.querySelectorAll('.btn-book-cta, a[href*="contact.html#book"]').forEach(el => {
    el.addEventListener('click', () => {
      trackLeadEvent('book_appointment_click', {
        placement: el.getAttribute('data-placement') || 'Page Content CTA'
      });
    });
  });

  // Close mobile navigation menu on nav-link click
  const navCollapse = document.getElementById('navbarMainMenu');
  if (navCollapse) {
    const navLinks = navCollapse.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.bootstrap && bootstrap.Collapse) {
          const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse && navCollapse.classList.contains('show')) {
            bsCollapse.hide();
          }
        }
      });
    });
  }

  /* ==========================================================================
     2. APPOINTMENT & CONTACT FORM VALIDATION
     ========================================================================== */
  const appointmentForm = document.getElementById('appointmentForm');
  if (appointmentForm) {
    const nameInput = document.getElementById('fullName');
    const phoneInput = document.getElementById('phoneNumber');
    const emailInput = document.getElementById('emailAddress');
    const serviceInput = document.getElementById('serviceRequired');
    const dateInput = document.getElementById('preferredDate');
    const timeInput = document.getElementById('preferredTime');
    const messageInput = document.getElementById('patientMessage');
    const formFeedback = document.getElementById('formFeedbackAlert');

    // Validation patterns
    const phoneRegex = /^[6-9]\d{9}$/; // Indian 10-digit mobile format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateField = (input, isValid) => {
      if (isValid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        input.setAttribute('aria-invalid', 'false');
      } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        input.setAttribute('aria-invalid', 'true');
      }
      return isValid;
    };

    // Live validation on blur
    if (nameInput) {
      nameInput.addEventListener('blur', () => {
        validateField(nameInput, nameInput.value.trim().length >= 2);
      });
    }

    if (phoneInput) {
      phoneInput.addEventListener('blur', () => {
        const cleaned = phoneInput.value.replace(/[\s\-+]/g, '');
        const valid = phoneRegex.test(cleaned) || cleaned.length >= 10;
        validateField(phoneInput, valid);
      });
    }

    if (emailInput) {
      emailInput.addEventListener('blur', () => {
        validateField(emailInput, emailRegex.test(emailInput.value.trim()));
      });
    }

    if (serviceInput) {
      serviceInput.addEventListener('change', () => {
        validateField(serviceInput, serviceInput.value !== '');
      });
    }

    // Submit handler
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let formIsValid = true;

      // Validate Name
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        validateField(nameInput, false);
        formIsValid = false;
      } else {
        validateField(nameInput, true);
      }

      // Validate Phone
      const cleanedPhone = phoneInput.value.replace(/[\s\-+]/g, '');
      if (!cleanedPhone || cleanedPhone.length < 10) {
        validateField(phoneInput, false);
        formIsValid = false;
      } else {
        validateField(phoneInput, true);
      }

      // Validate Email
      if (!emailRegex.test(emailInput.value.trim())) {
        validateField(emailInput, false);
        formIsValid = false;
      } else {
        validateField(emailInput, true);
      }

      // Validate Service
      if (!serviceInput.value) {
        validateField(serviceInput, false);
        formIsValid = false;
      } else {
        validateField(serviceInput, true);
      }

      if (!formIsValid) {
        // Scroll to first invalid field
        const firstInvalid = appointmentForm.querySelector('.is-invalid');
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      // Payload for tracking
      const formData = {
        name: nameInput.value.trim(),
        phone: cleanedPhone,
        email: emailInput.value.trim(),
        service: serviceInput.value,
        date: dateInput ? dateInput.value : '',
        time: timeInput ? timeInput.value : '',
        has_message: messageInput ? Boolean(messageInput.value.trim()) : false
      };

      // Dispatch Conversion Events
      trackLeadEvent('appointment_form_submit', formData);

      // Save to sessionStorage for fallback or state retention
      try {
        sessionStorage.setItem('last_lead_name', formData.name);
        sessionStorage.setItem('last_lead_service', formData.service);
        sessionStorage.setItem('dr_anil_last_lead', JSON.stringify(formData));
      } catch (err) {
        console.warn('Session storage error:', err);
      }

      // Provide visual button feedback
      const submitBtn = document.getElementById('submitAppointmentBtn') || appointmentForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Confirming Appointment...';
      }

      if (formFeedback) {
        formFeedback.className = 'alert alert-success d-flex align-items-start gap-3 p-3 mt-4 border-0 shadow-sm';
        formFeedback.style.backgroundColor = '#EBF6F5';
        formFeedback.style.color = '#123B5D';
        formFeedback.innerHTML = `
          <i class="bi bi-check-circle-fill text-teal fs-4"></i>
          <div>
            <h5 class="fw-bold mb-1" style="font-family: var(--font-heading);">Appointment Enquiry Received!</h5>
            <p class="mb-0" style="font-size: 0.94rem;">Redirecting to confirmation page...</p>
          </div>
        `;
      }

      // Redirect to thank-you.html with details
      const redirectUrl = `thank-you.html?name=${encodeURIComponent(formData.name)}&service=${encodeURIComponent(formData.service)}`;
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 350);
    });
  }

  // Universal Form Handler: Ensure all forms across site redirect to thank-you.html upon valid submission
  document.addEventListener('submit', (e) => {
    const form = e.target;
    if (!form || form.id === 'appointmentForm' || form.tagName !== 'FORM') return;
    
    e.preventDefault();
    const nameInput = form.querySelector('input[name*="name" i], input[id*="name" i]');
    const serviceInput = form.querySelector('select[name*="service" i], select[id*="service" i], input[name*="service" i]');
    const name = nameInput ? nameInput.value.trim() : '';
    const service = serviceInput ? serviceInput.value.trim() : '';
    
    try {
      if (name) sessionStorage.setItem('last_lead_name', name);
      if (service) sessionStorage.setItem('last_lead_service', service);
    } catch (err) {}
    
    const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Processing...';
    }
    
    const redirectUrl = `thank-you.html?name=${encodeURIComponent(name)}&service=${encodeURIComponent(service)}`;
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 250);
  });

  /* ==========================================================================
     3. BLOG ENGINE: CATEGORY FILTER, SEARCH & MODAL VIEWER
     ========================================================================== */
  const blogArticles = [
    {
      id: "posture-habits-desk-workers",
      title: "5 Simple Ways to Support Better Posture Every Day",
      category: "Posture & Ergonomics",
      categorySlug: "posture",
      date: "September 4, 2026",
      readTime: "4 min read",
      image: "assets/images/blog-featured.jpg",
      excerpt: "Prolonged sitting at desks and computer workstations often creates neck stiffness and lower back fatigue. Here are 5 practical, evidence-supported ergonomic adjustments you can implement immediately.",
      content: `
        <p>In modern desk-bound routines across Hyderabad's corporate and tech corridors, prolonged sitting places sustained stress on spinal discs, cervical extensors, and pelvic stabilizers. Fortunately, meaningful posture improvement does not require rigid bracing or complicated devices.</p>
        <h4 class="fw-bold mt-4 mb-2 text-navy">1. Calibrate Your Eye Level</h4>
        <p>Ensure the top third of your computer monitor sits level with your natural horizontal gaze. Tilting your head downwards by even 15 degrees multiplies the effective gravitational weight experienced by your cervical spine from approximately 5 kg to over 12 kg.</p>
        <h4 class="fw-bold mt-4 mb-2 text-navy">2. The 45-Minute Movement Rule</h4>
        <p>The human spine is engineered for dynamic movement, not prolonged static loading. Every 45 minutes, stand up, take 10 steps, and perform 5 gentle thoracic extensions (placing hands on lower back and gently looking up).</p>
        <h4 class="fw-bold mt-4 mb-2 text-navy">3. Optimize Seat Depth & Hip Angle</h4>
        <p>Adjust chair height so your hips rest slightly higher than your knees (an angle of roughly 100 to 110 degrees). This reduces posterior pelvic tilt and encourages the natural inward curve (lordosis) of your lumbar spine.</p>
        <h4 class="fw-bold mt-4 mb-2 text-navy">4. Gentle Scapular Retractions</h4>
        <p>Throughout your workday, squeeze your shoulder blades gently down and back for 3 seconds, repeating 5 times. This activates the rhomboids and mid-trapezius muscles without straining your neck.</p>
        <h4 class="fw-bold mt-4 mb-2 text-navy">5. Professional Movement Assessment</h4>
        <p>If you experience persistent discomfort, tingling, or radiating pain into your shoulders or arms, consult a qualified physiotherapist for an individual postural and musculoskeletal examination.</p>
      `
    },
    {
      id: "understanding-back-pain",
      title: "Understanding Back Pain: Common Causes & Recovery Steps",
      category: "Back & Neck",
      categorySlug: "back-neck",
      date: "August 28, 2026",
      readTime: "5 min read",
      image: "assets/images/blog-1.jpg",
      excerpt: "Back discomfort is one of the most frequent reasons patients visit a physiotherapy clinic. Understand the difference between acute strain, postural fatigue, and disc issues.",
      content: `
        <p>Back discomfort affects millions of individuals across all age brackets. Understanding the root factors behind back symptoms is the first step toward effective, structured recovery.</p>
        <h4 class="fw-bold mt-4 mb-2 text-navy">Common Contributors to Lumbar Strain</h4>
        <p>Most non-specific lower back pain is associated with muscular fatigue, sudden unconditioned lifting, or ligamentous tension. Sedentary habits weaken deep core stabilizers such as the transverse abdominis and multifidus.</p>
        <h4 class="fw-bold mt-4 mb-2 text-navy">The Role of Evidence-Informed Physiotherapy</h4>
        <p>Modern physiotherapy emphasizes guided active movement over prolonged bed rest. Individualized exercise prescriptions improve blood flow, restore articular range of motion, and build durable functional strength.</p>
        <p>Always seek professional clinical guidance if back pain persists beyond several days or interferes with normal daily living.</p>
      `
    },
    {
      id: "exercises-better-mobility",
      title: "Simple Exercises for Better Mobility and Joint Freedom",
      category: "Mobility",
      categorySlug: "mobility",
      date: "August 20, 2026",
      readTime: "4 min read",
      image: "assets/images/blog-2.jpg",
      excerpt: "Daily joint mobility routines preserve flexibility, reduce stiffness upon waking, and maintain healthy joint lubrication as we age.",
      content: `
        <p>Joint mobility refers to the active, controlled range of motion available around an articulation. Maintaining mobility supports joint cartilage nutrition via synovial fluid circulation.</p>
        <h4 class="fw-bold mt-4 mb-2 text-navy">Key Mobility Movements</h4>
        <p>Gentle ankle circles, hip openers (such as the 90/90 stretch), cat-cow spinal waves, and thoracic rotations help release daily tension and prepare muscles for load bearing.</p>
        <p>Perform these movements smoothly without forcing painful end-ranges.</p>
      `
    },
    {
      id: "how-physiotherapy-supports-recovery",
      title: "How Physiotherapy Supports Recovery After Musculoskeletal Injuries",
      category: "Rehabilitation",
      categorySlug: "rehab",
      date: "August 12, 2026",
      readTime: "6 min read",
      image: "assets/images/blog-3.jpg",
      excerpt: "Explore the clinical science behind how targeted physical therapy accelerates tissue healing, restores motor control, and prevents re-injury.",
      content: `
        <p>Physiotherapy is an allied healthcare discipline centered on restoring human movement, alleviating mechanical distress, and promoting long-term physical independence.</p>
        <h4 class="fw-bold mt-4 mb-2 text-navy">Phase-Based Rehabilitation</h4>
        <p>Effective recovery follows structured phases: acute pain modulation, gentle range restoration, progressive loading and hypertrophy, and finally return-to-sport or functional daily activity.</p>
        <p>Each patient at Dr. Anil's clinic receives targeted guidance matched to their specific functional goals and biomechanical requirements.</p>
      `
    },
    {
      id: "sports-injury-prevention",
      title: "Sports Injury Prevention Tips for Runners and Weekend Athletes",
      category: "Sports Rehab",
      categorySlug: "sports",
      date: "August 05, 2026",
      readTime: "5 min read",
      image: "assets/images/blog-5.jpg",
      excerpt: "Smart training principles, adequate recovery periods, and neuromuscular warmup drills protect joints and ligaments during sports participation.",
      content: `
        <p>Whether playing weekend badminton or training for a half-marathon, sports-related strains often occur due to rapid training spikes without adequate recovery.</p>
        <h4 class="fw-bold mt-4 mb-2 text-navy">Fundamental Injury Prevention Rules</h4>
        <ul>
          <li><strong>The 10% Rule:</strong> Avoid increasing weekly running volume or training intensity by more than 10% per week.</li>
          <li><strong>Dynamic Warmups:</strong> Prioritize leg swings, high knees, and glute activation over prolonged static stretching before explosive sessions.</li>
          <li><strong>Cross-Training:</strong> Incorporate resistance exercises to strengthen supporting tendons and joints.</li>
        </ul>
      `
    },
    {
      id: "when-to-consider-physiotherapy",
      title: "When Should You Consider Consulting a Physiotherapist?",
      category: "Rehabilitation",
      categorySlug: "rehab",
      date: "July 27, 2026",
      readTime: "4 min read",
      image: "assets/images/blog-6.jpg",
      excerpt: "Learn how to recognize early movement limitations and when professional assessment helps prevent minor discomfort from becoming chronic.",
      content: `
        <p>Many people wait until pain significantly disrupts sleep or daily routines before seeking help. Early physiotherapy intervention often leads to faster, more sustainable outcomes.</p>
        <h4 class="fw-bold mt-4 mb-2 text-navy">Key Indicators to Seek Care</h4>
        <p>If you experience joint stiffness lasting longer than two weeks, pain during specific daily movements (climbing stairs, lifting objects), recurring sports sprains, or post-surgical stiffness, an evaluation can clarify the source of limitation.</p>
      `
    }
  ];

  const blogGrid = document.getElementById('blogArticleGrid');
  const searchInput = document.getElementById('blogSearchInput');
  const categoryFilters = document.querySelectorAll('.blog-filter-btn');
  const emptyState = document.getElementById('blogEmptyState');

  let currentCategory = 'all';
  let searchQuery = '';

  const renderArticles = () => {
    if (!blogGrid) return;

    const filtered = blogArticles.filter(item => {
      const matchesCategory = currentCategory === 'all' || item.categorySlug === currentCategory;
      const matchesSearch = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      blogGrid.innerHTML = '';
      if (emptyState) emptyState.classList.remove('d-none');
      return;
    }

    if (emptyState) emptyState.classList.add('d-none');

    blogGrid.innerHTML = filtered.map(art => `
      <div class="col-lg-4 col-md-6 mb-4">
        <article class="blog-card h-100">
          <div class="blog-card-img">
            <img src="${art.image}" alt="${art.title}" loading="lazy">
          </div>
          <div class="blog-card-body">
            <div class="blog-meta">
              <span class="blog-category-pill">${art.category}</span>
              <span><i class="bi bi-clock me-1"></i>${art.readTime}</span>
            </div>
            <h3 class="fs-5 fw-bold mb-2">
              <a href="javascript:void(0)" class="text-navy article-modal-trigger" data-id="${art.id}">${art.title}</a>
            </h3>
            <p class="text-muted-custom fs-6 mb-3 flex-grow-1">${art.excerpt}</p>
            <div class="d-flex align-items-center justify-content-between pt-3 border-top border-light-subtle">
              <span class="small text-muted-custom">${art.date}</span>
              <button type="button" class="btn btn-sm btn-outline-navy article-modal-trigger rounded-pill px-3" data-id="${art.id}">
                Read Article <i class="bi bi-arrow-right ms-1"></i>
              </button>
            </div>
          </div>
        </article>
      </div>
    `).join('');

    // Attach article modal triggers
    blogGrid.querySelectorAll('.article-modal-trigger').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        const articleId = trigger.getAttribute('data-id');
        openArticleModal(articleId);
      });
    });
  };

  // Open Article Modal Function
  const openArticleModal = (articleId) => {
    const article = blogArticles.find(a => a.id === articleId);
    if (!article) return;

    trackLeadEvent('blog_article_view', { article_id: articleId, title: article.title });

    const modalTitle = document.getElementById('blogModalTitle');
    const modalMeta = document.getElementById('blogModalMeta');
    const modalBody = document.getElementById('blogModalBody');
    const modalImage = document.getElementById('blogModalImage');

    if (modalTitle) modalTitle.textContent = article.title;
    if (modalMeta) {
      modalMeta.innerHTML = `
        <span class="badge bg-light text-navy border px-2 py-1">${article.category}</span>
        <span class="text-muted small ms-2"><i class="bi bi-calendar3 me-1"></i>${article.date}</span>
        <span class="text-muted small ms-3"><i class="bi bi-clock me-1"></i>${article.readTime}</span>
        <span class="text-muted small ms-3"><i class="bi bi-geo-alt me-1"></i>Miyapur, Hyderabad</span>
      `;
    }
    if (modalImage) {
      modalImage.src = article.image;
      modalImage.alt = article.title;
    }
    if (modalBody) {
      modalBody.innerHTML = article.content;
    }

    const modalElement = document.getElementById('articleReaderModal');
    if (modalElement && window.bootstrap && bootstrap.Modal) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  };

  // Search input handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderArticles();
    });
  }

  // Category filter handlers
  categoryFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      renderArticles();
    });
  });

  // Initial render of articles if on blog page
  if (blogGrid) {
    renderArticles();
  }

  /* ==========================================================================
     EXPERIENCE STATS NUMBER COUNTER ANIMATION
     ========================================================================== */
  const statsCard = document.querySelector('.experience-stats-card');
  const statNumbers = document.querySelectorAll('.exp-stat-number[data-target]');

  if (statNumbers.length > 0) {
    let hasAnimated = false;

    const animateNumber = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10) || 0;
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1800; // 1.8 seconds smooth count
      const startTime = performance.now();

      // Quartic ease-out: rapid acceleration then buttery smooth deceleration
      const easeOutQuart = (x) => 1 - Math.pow(1 - x, 4);

      const updateCounter = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.round(easeOutQuart(progress) * target);

        el.textContent = current + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          el.textContent = target + suffix;
        }
      };

      requestAnimationFrame(updateCounter);
    };

    const triggerAllCounters = () => {
      if (hasAnimated) return;
      hasAnimated = true;
      statNumbers.forEach((el, index) => {
        // Slight stagger for a lively feel
        setTimeout(() => {
          animateNumber(el);
        }, index * 80);
      });
    };

    if ('IntersectionObserver' in window && statsCard) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            triggerAllCounters();
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.2,
        rootMargin: '0px 0px -30px 0px'
      });

      observer.observe(statsCard);
    } else {
      // Fallback
      triggerAllCounters();
    }
  }
});

