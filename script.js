/* ========================================================
   ONSK Single Page Application Router & Interactive UI Engine
   ======================================================== */

const SEO_REGISTRY = {
  home: {
    path: '/',
    title: 'ONSK - IT Software Solutions, Creative Media & AI OCR',
    description: 'Discover ONSK: an IT software company delivering AI-based OCR technology, intelligent document extraction, custom digital platforms, and managed enterprise systems.',
    canonical: 'https://onsk.co.in/'
  },
  products: {
    path: '/products',
    title: 'ONSK OCR Software - Handwriting Recognition & Data AI',
    description: 'Transform handwritten and printed documents with ONSK OCR software. Automate banking cheque processing, invoice ingestion, and intelligent data digitization.',
    canonical: 'https://onsk.co.in/products'
  },
  services: {
    path: '/services',
    title: 'Software Development & Creative Media Services - ONSK Satara',
    description: 'Scale your operations with ONSK services: custom product engineering, mobile apps, web development, graphics design, video editing, animation, AI ads, and UGC.',
    canonical: 'https://onsk.co.in/services'
  },
  about: {
    path: '/about',
    title: 'About ONSK - Overseas Network System & Knowledge Satara',
    description: 'Learn about ONSK (Overseas Network System & Knowledge), an MSME tech enterprise in Satara engineered to build scalable digital products and IT infrastructure.',
    canonical: 'https://onsk.co.in/about'
  },
  contact: {
    path: '/contact',
    title: 'Contact ONSK - Software & Media Consultation, Satara',
    description: 'Contact ONSK in Satara, Maharashtra for project inquiries, custom software development partnerships, creative digital briefs, or an interactive OCR demo.',
    canonical: 'https://onsk.co.in/contact'
  }
};

// Playground logic
const OCR_DEMO_DATA = {
  cheque: {
    sample: `
      <span style="color: #94a3b8; font-size: 0.8rem; font-family: monospace;">INPUT DOCUMENT: Bank_Cheque_4091.tif</span>
      <p style="color: #ffffff; font-weight: 600; margin: 0.6rem 0 0.3rem;">Pay to: Tech Enterprises Pvt Ltd</p>
      <p style="color: #ffffff; font-weight: 600;">Amount: INR 45,000.00 (Handwritten)</p>
      <p style="color: #64748b; font-size: 0.8rem; margin-top: 0.5rem;">Branch Code: SBIN000124 | Date: 06-Nov-2026</p>
    `,
    json: `{
  "status": "PARSED_SUCCESS",
  "document_type": "Banking Cheque",
  "payee": "Tech Enterprises Pvt Ltd",
  "amount_inr": 45000.00,
  "confidence_score": "99.82%",
  "extracted_at": "2026-11-06T11:00:00Z"
}`
  },
  invoice: {
    sample: `
      <span style="color: #94a3b8; font-size: 0.8rem; font-family: monospace;">INPUT DOCUMENT: Tax_Invoice_8832.pdf</span>
      <p style="color: #ffffff; font-weight: 600; margin: 0.6rem 0 0.3rem;">Vendor: Overseas Network Systems</p>
      <p style="color: #ffffff; font-weight: 600;">Tax Total: INR 1,18,000.00 (GST Included)</p>
      <p style="color: #64748b; font-size: 0.8rem; margin-top: 0.5rem;">GSTIN: 27AAAAA0000A1Z5 | PO: #78219</p>
    `,
    json: `{
  "status": "PARSED_SUCCESS",
  "document_type": "Tax Invoice",
  "vendor": "Overseas Network Systems",
  "tax_total_inr": 118000.00,
  "gstin": "27AAAAA0000A1Z5",
  "confidence_score": "99.94%"
}`
  },
  handwriting: {
    sample: `
      <span style="color: #94a3b8; font-size: 0.8rem; font-family: monospace;">INPUT DOCUMENT: Handwritten_Voucher_12.jpg</span>
      <p style="color: #ffffff; font-weight: 600; margin: 0.6rem 0 0.3rem;">Description: Field Equipment Transit</p>
      <p style="color: #ffffff; font-weight: 600;">Disbursed: INR 12,450.00 (Cash Voucher)</p>
      <p style="color: #64748b; font-size: 0.8rem; margin-top: 0.5rem;">Signatory: R. K. Kadam | Date: Today</p>
    `,
    json: `{
  "status": "PARSED_SUCCESS",
  "document_type": "Handwritten Cash Voucher",
  "handwriting_engine": "DeepNeural-Transcribe-v3",
  "disbursed_inr": 12450.00,
  "confidence_score": "98.71%"
}`
  }
};

function switchOcrDemo(key) {
  const tabs = document.querySelectorAll('.pg-tab-btn');
  tabs.forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('onclick').includes(key));
  });

  const contentDiv = document.getElementById('pgSampleContent');
  const codeDiv = document.getElementById('pgJsonOutput');

  if (contentDiv && codeDiv && OCR_DEMO_DATA[key]) {
    contentDiv.innerHTML = OCR_DEMO_DATA[key].sample;
    codeDiv.innerText = OCR_DEMO_DATA[key].json;
  }
}

function filterServices(category) {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('onclick').includes(category));
  });

  const categories = document.querySelectorAll('.service-category');
  categories.forEach(cat => {
    if (category === 'all') {
      cat.style.display = 'flex';
    } else {
      cat.style.display = cat.getAttribute('data-cat') === category ? 'flex' : 'none';
    }
  });
}

function setupServiceCardToggles() {
  const buttons = document.querySelectorAll('.learn-more-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.service-card');
      if (!card) return;
      const isExpanded = card.classList.toggle('expanded');
      btn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      
      const label = btn.querySelector('span');
      if (label) {
        label.innerText = isExpanded ? 'Show Less' : 'Learn More';
      }
      if (window.lucide) window.lucide.createIcons();
    });
  });
}

function copyContactText(text, btnElem) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = btnElem.innerText;
    btnElem.innerText = 'Copied!';
    btnElem.style.color = '#10b981';
    setTimeout(() => {
      btnElem.innerText = originalText;
      btnElem.style.color = '';
    }, 2000);
  });
}

function openEnquiryModal(preselectedService = 'General Inquiry') {
  const modal = document.getElementById('enquiryModalOverlay');
  const serviceDropdown = document.getElementById('m_service');
  if (!modal) return;

  if (serviceDropdown && preselectedService) {
    const options = Array.from(serviceDropdown.options);
    const match = options.find(opt => opt.value.toLowerCase().includes(preselectedService.toLowerCase()) || 
                                      opt.text.toLowerCase().includes(preselectedService.toLowerCase()));
    if (match) serviceDropdown.value = match.value;
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeEnquiryModal() {
  const modal = document.getElementById('enquiryModalOverlay');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function setupFormHandlers() {
  const modalForm = document.getElementById('modalEnquiryForm');
  if (modalForm) {
    modalForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await submitInquiryData({
        fullName: document.getElementById('m_fullName').value,
        email: document.getElementById('m_email').value,
        service: document.getElementById('m_service').value,
        message: document.getElementById('m_message').value,
        source: 'Modal Form'
      }, 'm_submitBtn', 'm_formStatus');
    });
  }

  const contactForm = document.getElementById('contactPageForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await submitInquiryData({
        fullName: document.getElementById('cp_fullName').value,
        email: document.getElementById('cp_email').value,
        service: document.getElementById('cp_service').value,
        message: document.getElementById('cp_message').value,
        source: 'Contact Page'
      }, 'cp_submitBtn', 'cp_formStatus');
    });
  }
}

async function submitInquiryData(payload, btnId, statusId) {
  const btn = document.getElementById(btnId);
  const status = document.getElementById(statusId);

  if (btn) btn.disabled = true;
  if (status) {
    status.className = 'form-feedback info';
    status.innerText = 'Submitting your inquiry...';
    status.classList.remove('hidden');
  }

  try {
    const response = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.ok && data.success) {
      if (status) {
        status.className = 'form-feedback success';
        status.innerText = 'Thank you! Your inquiry has been sent to our technical and creative leads.';
      }
      setTimeout(() => {
        if (btnId === 'm_submitBtn') closeEnquiryModal();
      }, 2500);
    } else {
      throw new Error(data.message || `Submission failed (HTTP ${response.status}).`);
    }
  } catch (err) {
    if (status) {
      status.className = 'form-feedback error';
      const reason = err instanceof Error ? err.message : 'Please try again later.';
      status.innerText = `We couldn't send your inquiry. ${reason} You can also reach us at +91 9970141332 or m920@gmail.com.`;
    }
  } finally {
    if (btn) btn.disabled = false;
  }
}

function initializeSite() {
  const modalClose = document.getElementById('modalCloseBtn');
  const modalOverlay = document.getElementById('enquiryModalOverlay');
  if (modalClose) modalClose.addEventListener('click', closeEnquiryModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeEnquiryModal();
    });
  }

  const backToTopBtn = document.getElementById('backToTopBtn');
  window.addEventListener('scroll', () => {
    if (backToTopBtn) {
      backToTopBtn.classList.toggle('visible', window.scrollY > 400);
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  setupServiceCardToggles();
  setupFormHandlers();

  const currentPath = window.location.pathname.replace(/^\/|\/$/g, '') || 'home';
  document.querySelectorAll('.nav-link').forEach((link) => {
    const isCurrent = link.id === `nav-${currentPath}`;
    link.classList.toggle('active', isCurrent);
    if (isCurrent) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  if (window.lucide) window.lucide.createIcons();
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initializeSite, { once: true });
} else {
  initializeSite();
}