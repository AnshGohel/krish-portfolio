/* ===================================================================
   MAKWANA KRRISH - PORTFOLIO INTERACTIVE JAVASCRIPT
   Features:
   - Dynamic Electrical Circuit Canvas (Nodes & Energy Pulses)
   - Dark/Light Theme Switching
   - Skills Category Filtering
   - Interactive Resume Modal & Printable PDF Trigger
   - Click-to-Copy Contact Details
   - Dynamic Quick-Template Contact Form
   - Active Navigation Scroll Spy
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCircuitCanvas();
  initSkillsFilter();
  initResumeModal();
  initContactActions();
  initScrollSpy();
  initQuickTemplates();
});

/* -------------------------------------------------------------
   1. Theme Management (Dark / Light)
   ------------------------------------------------------------- */
function initTheme() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('krrish_theme') || (prefersDark ? 'dark' : 'dark'); // default dark for electrical tech theme

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('krrish_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (!themeBtn) return;
  if (theme === 'light') {
    themeBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
    themeBtn.setAttribute('title', 'Switch to Dark Mode');
  } else {
    themeBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;
    themeBtn.setAttribute('title', 'Switch to Light Mode');
  }
}

/* -------------------------------------------------------------
   2. Electrical Circuit Background Canvas Animation
   ------------------------------------------------------------- */
function initCircuitCanvas() {
  const canvas = document.getElementById('circuit-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const nodeCount = Math.min(Math.floor((width * height) / 22000), 55);
  const nodes = [];

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 1.5,
      pulse: Math.random() * Math.PI * 2,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const lineColor = isLight ? 'rgba(2, 132, 199, ' : 'rgba(0, 240, 255, ';
    const nodeColor = isLight ? '#0284c7' : '#00f0ff';

    // Update & draw nodes
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      node.x += node.vx;
      node.y += node.vy;
      node.pulse += 0.03;

      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      // Glow pulse
      const pulseSize = node.radius + Math.sin(node.pulse) * 0.8;
      ctx.beginPath();
      ctx.arc(node.x, node.y, Math.max(pulseSize, 1), 0, Math.PI * 2);
      ctx.fillStyle = nodeColor;
      ctx.fill();

      // Connect nodes within threshold (Circuit Grid Effect)
      for (let j = i + 1; j < nodes.length; j++) {
        const other = nodes[j];
        const dx = node.x - other.x;
        const dy = node.y - other.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          const alpha = (1 - dist / 140) * (isLight ? 0.25 : 0.35);
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = lineColor + alpha + ')';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Occasional spark/pulse along wire
          if (Math.sin(node.pulse * 1.5) > 0.985) {
            const sparkT = (Math.sin(node.pulse) + 1) / 2;
            const sx = node.x + (other.x - node.x) * sparkT;
            const sy = node.y + (other.y - node.y) * sparkT;
            ctx.beginPath();
            ctx.arc(sx, sy, 2, 0, Math.PI * 2);
            ctx.fillStyle = '#10b981';
            ctx.fill();
          }
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* -------------------------------------------------------------
   3. Skills Category Filter
   ------------------------------------------------------------- */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* -------------------------------------------------------------
   4. Resume Modal & Print/PDF Functionality
   ------------------------------------------------------------- */
function initResumeModal() {
  const openBtns = document.querySelectorAll('.open-resume-modal');
  const modal = document.getElementById('resume-modal');
  const closeBtn = document.getElementById('close-resume-modal');
  const printBtn = document.getElementById('print-resume-btn');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* -------------------------------------------------------------
   5. Contact Actions (Copy to Clipboard & Toast)
   ------------------------------------------------------------- */
function initContactActions() {
  const copyButtons = document.querySelectorAll('.copy-trigger');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        });
      }
    });
  });

  // Contact form submission handling (Direct delivery to krrishmakwanad@gmail.com)
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const submitBtn = document.getElementById('submit-btn') || form.querySelector('button[type="submit"]');
      const originalBtnHTML = submitBtn ? submitBtn.innerHTML : 'Send Message';

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-msg').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in all fields before sending.');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>⏳ Delivering message to krrishmakwanad@gmail.com...</span>`;
      }

      try {
        const response = await fetch("https://formsubmit.co/ajax/krrishmakwanad@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: name,
            email: email,
            message: message,
            _subject: `New Portfolio Message from ${name} (${email})`,
            _replyto: email
          })
        });

        const data = await response.json();

        if (response.ok && (data.success === "true" || data.success === true || response.status === 200)) {
          showToast(`✓ Message delivered directly to krrishmakwanad@gmail.com!`);
          form.reset();
          if (submitBtn) {
            submitBtn.innerHTML = `<span>✓ Message Sent Successfully!</span>`;
            setTimeout(() => {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalBtnHTML;
            }, 3500);
          }
        } else {
          throw new Error(data.message || 'Server error');
        }
      } catch (err) {
        // Graceful fallback to email client / Gmail
        showToast('Opening your email client to send to krrishmakwanad@gmail.com...');
        const subject = encodeURIComponent(`Engineering Inquiry from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        const mailtoUrl = `mailto:krrishmakwanad@gmail.com?subject=${subject}&body=${body}`;
        
        setTimeout(() => {
          window.location.href = mailtoUrl;
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHTML;
          }
        }, 600);
      }
    });
  }
}

/* -------------------------------------------------------------
   6. Quick Templates for Contact Form
   ------------------------------------------------------------- */
function initQuickTemplates() {
  const templatePills = document.querySelectorAll('.template-pill');
  const messageInput = document.getElementById('contact-msg');

  templatePills.forEach(pill => {
    pill.addEventListener('click', () => {
      const template = pill.getAttribute('data-template');
      if (messageInput && template) {
        messageInput.value = template;
        messageInput.focus();
        showToast('Template filled into message box!');
      }
    });
  });
}

/* -------------------------------------------------------------
   7. Scroll Spy & Active Nav Link
   ------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* -------------------------------------------------------------
   Toast Notification Helper
   ------------------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.right = '24px';
    toast.style.backgroundColor = '#00f0ff';
    toast.style.color = '#0a0e17';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '8px';
    toast.style.fontWeight = '600';
    toast.style.fontSize = '0.9rem';
    toast.style.boxShadow = '0 10px 25px rgba(0, 240, 255, 0.4)';
    toast.style.zIndex = '9999';
    toast.style.transition = 'all 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
  }, 3200);
}
