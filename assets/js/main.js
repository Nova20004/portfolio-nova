/* =========================================================
   NOVA — interactions
   Theme (dark/light) · Language (FR/EN) · Section navigation ·
   Reveal · Mobile menu · Project controls · Contact form
   ========================================================= */
(() => {
  'use strict';

  const root = document.documentElement;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const store = {
    get(key) { try { return localStorage.getItem(key); } catch (_) { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch (_) { /* storage unavailable */ } },
  };

  const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
  const mqDesktop = matchMedia('(min-width: 1024px)');
  const mqFinePointer = matchMedia('(hover: hover) and (pointer: fine)');

  const sections = $$('main > section[id]');
  const header = $('.site-header');

  /* ---------------------------------------------------------
     I18N — French is the source language written in the HTML;
     English strings live here, keyed by data-i18n attributes.
     --------------------------------------------------------- */
  const EN = {
    'skip': 'Skip to main content',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.mainLabel': 'Main navigation',
    'nav.mobileLabel': 'Mobile navigation',
    'nav.footerLabel': 'Footer navigation',
    'brand.home': 'NOVA — back to home',
    'lang.group': 'Choose language',

    'hero.status': 'Available — DevOps &amp; Automation roles',
    'hero.hello': 'Hi, I\'m',
    'hero.role': 'Web Developer focused on <span class="hero-focus">DevOps <span class="amp">&amp;</span> Automation</span>',
    'hero.pitch': 'Passionate about web development and infrastructure technologies, I am interested in designing, deploying, and maintaining reliable, high-performing applications. I am developing my skills in process automation, continuous integration and delivery (CI/CD), containerization, and Linux environment administration.',
    'hero.stackLabel': 'Core technologies',
    'hero.contact': 'Contact me',
    'hero.cv': 'Download my resume',
    'hero.photoAlt': 'Portrait of Joseph Si-Carlino',
    'hero.badgeA': 'DevOps · CI/CD',
    'hero.badgeB': 'Automation',
    'hero.scroll': 'Explore the sections',
    'social.label': 'Social networks',
    'social.linkedin': 'Joseph Si-Carlino on LinkedIn',
    'social.github': 'Joseph Si-Carlino on GitHub',
    'social.mail': 'Send an email to Joseph',

    'about.eyebrow': 'Profile',
    'about.title': 'About me',
    'about.who': 'Who am I?',
    'about.p1': 'A web developer by training, I built <strong>Next.js, React and PostgreSQL</strong> applications before turning to what happens after the code: how it is tested, shipped and monitored in production. Today I work in <strong>DevOps &amp; Automation</strong>: CI/CD pipelines, containerisation with Docker and automation of recurring tasks.',
    'about.p2': 'My time in <strong>IT support</strong> taught me the demands of the field: available services, incidents resolved fast and users properly supported. I combine both cultures, Dev and Ops, to ship faster without sacrificing stability.',
    'about.fact1t': 'Full-Stack',
    'about.fact1d': 'Next.js · React · PostgreSQL',
    'about.fact2d': 'CI/CD &amp; automation',
    'about.fact3t': 'Monitoring',
    'about.fact3d': 'Prometheus &amp; Grafana',
    'about.valueTitle': 'What I Bring',
    'about.v1t': 'Automation & Delivery',
    'about.v1d': 'Designing modern CI/CD pipelines and orchestration scripts to boost deployment velocity and secure releases.',
    'about.v2t': 'Reliability & Standardization',
    'about.v2d': 'Containerization (Docker) and immutable environments ensuring strict parity between development and production.',
    'about.v3t': 'Observability & Monitoring',
    'about.v3d': 'Granular service monitoring (Prometheus, Grafana) and automated alerts to catch regressions and minimize MTTR.',
    'about.v4t': 'Dev & Infra Synergy',
    'about.v4d': 'With a background in Full-Stack development, I build Developer Experience-driven (DX) infrastructure tailored to application needs.',

    'skills.eyebrow': 'Skills',
    'skills.title': 'Core skills',
    'skills.lead': 'Six complementary areas, from code to production. Honestly assessed levels, and continuous progress.',
    'skills.legend': 'Level legend',
    'skills.tools': 'Tools',
    'level.proficient': 'Proficient',
    'level.operational': 'Operational',
    'level.intermediate': 'Intermediate',
    'level.learning': 'Learning',
    'sk1.title': 'CI/CD &amp; Deployment',
    'sk1.value': 'I automate the delivery chain, from commit to Docker image, for fast and reproducible deployments.',
    'sk1.a': 'GitHub Actions pipelines: lint, tests and build',
    'sk1.b': 'Containerisation with Docker &amp; Docker Compose',
    'sk1.c': 'Git: branches, pull requests and code reviews',
    'sk1.d': 'Task and deployment automation',
    'sk2.title': 'System Administration',
    'sk2.value': 'Linux servers installed, configured and secured: a stable foundation to host applications.',
    'sk2.a': 'Installing and administering Linux / Ubuntu servers',
    'sk2.b': 'Nginx: reverse proxy and HTTPS',
    'sk2.c': 'Administration and automation scripts in Bash',
    'sk2.d': 'Hardening: key-based SSH, firewall, user permissions',
    'sk3.value': 'I describe infrastructure as code to keep it versioned and reproducible, with no manual setup.',
    'sk3.a': 'Terraform scripts to provision simple resources',
    'sk3.b': 'Ansible playbooks to configure servers',
    'sk3.c': 'Test environments recreated identically',
    'sk3.d': 'Configuration versioned with Git',
    'sk4.value': 'I am building my orchestration and cloud foundations by practising on local clusters and Google Cloud.',
    'sk4.a': 'Kubernetes concepts: Pods, Deployments, Services',
    'sk4.b': 'Deploying applications on a local cluster',
    'sk4.c': 'YAML manifests and kubectl commands',
    'sk4.d': 'GCP basics: Compute Engine and access management (IAM)',
    'sk5.title': 'Monitoring &amp; Observability',
    'sk5.value': 'I monitor servers and applications to catch a problem before it affects users.',
    'sk5.a': 'Metrics collection with Prometheus',
    'sk5.b': 'Grafana dashboards: CPU, RAM, requests',
    'sk5.c': 'Reading system and application logs for troubleshooting',
    'sk5.d': 'Simple threshold-based alerts',
    'sk6.title': 'Front-End &amp; Full-Stack Development',
    'sk6.value': 'My original background: modern, fast, typed web applications, and a real understanding of what I deploy.',
    'sk6.a': 'Next.js (SSR / SSG) and React applications',
    'sk6.b': 'TypeScript for reliable, maintainable code',
    'sk6.c': 'PostgreSQL relational databases',
    'sk6.d': 'Responsive interfaces with Tailwind CSS',

    'xp.eyebrow': 'Experience',
    'xp.title': 'My journey',
    'xp.lead': 'From IT support to full-stack development, then to automation: a path built to connect code and production.',
    'xp.tags': 'Technologies and tools used',
    'xp1.period': '3 months',
    'xp1.a': 'Set up CI/CD pipelines with GitHub Actions: lint, tests, build and Docker image creation on every push.',
    'xp1.b': 'Containerised applications with Docker and Docker Compose for identical environments from the developer\'s machine to the server.',
    'xp1.c': 'Automated recurring tasks (deployments, backups, updates) with Bash scripts to reduce manual work.',
    'xp2.period': '6 months · Internship',
    'xp2.role': 'Full-Stack Developer Intern',
    'xp2.a': 'Built modern web applications with Next.js and React: server-side rendering (SSR/SSG) and reusable components.',
    'xp2.b': 'Designed data schemas and API routes backed by PostgreSQL.',
    'xp2.c': 'Teamwork with Git: branches, pull requests and code reviews.',
    'xp3.period': '6 months',
    'xp3.role': 'IT Support Technician',
    'xp3.a': 'Diagnosed and resolved hardware, software and network incidents.',
    'xp3.b': 'Managed the IT fleet: installing, configuring and tracking workstations.',
    'xp3.c': 'Supported users and kept services in working order.',
    'tag.network': 'Networking',
    'tag.support': 'IT support',
    'tag.userSupport': 'User support',
    'tag.automation': 'Automation',
    'tag.assets': 'IT asset management',

    'projects.eyebrow': 'Projects',
    'projects.title': 'My projects',
    'projects.lead': 'Concrete, reproducible work, from code to monitoring: automate, ship, observe.',
    'projects.deliveryGroup': 'Automation &amp; Delivery',
    'projects.infraGroup': 'Infrastructure &amp; Observability',
    'projects.tech': 'Technologies',
    'projects.more': 'See all my projects',
    'btn.view': 'View project',
    'btn.code': 'Source code',
    'proj1.title': 'GitOps CI/CD Pipeline',
    'proj1.desc': 'Automated build, tests and Docker image creation for a web application with GitHub Actions. Every push is checked and produces a versioned image, ready to deploy.',
    'proj1.viewLabel': 'View the GitOps CI/CD pipeline project',
    'proj1.codeLabel': 'Source code of the GitOps CI/CD pipeline project',
    'proj2.title': 'Full-Stack Next.js Application',
    'proj2.alt': 'Interface of the full-stack Next.js application',
    'proj2.kicker': 'Web application',
    'proj2.desc': 'A fast web platform (SSR/SSG) with a built-in API and a relational database, fully containerised with Docker for an identical environment locally and on the server.',
    'proj2.viewLabel': 'View the Full-Stack Next.js application project',
    'proj2.codeLabel': 'Source code of the Full-Stack Next.js application project',
    'proj3.title': 'Automated Provisioning (IaC)',
    'proj3.desc': 'Declarative deployment of a base environment (web server and database) using infrastructure scripts: Terraform describes the resources, Ansible configures them, and the environment can be recreated identically in a few commands.',
    'proj3.viewLabel': 'View the Automated Provisioning project',
    'proj3.codeLabel': 'Source code of the Automated Provisioning project',
    'proj4.title': 'Local Monitoring Stack',
    'proj4.desc': 'Monitoring of a Linux server\'s resources (CPU, RAM, requests): metrics collected by Prometheus and visualised in Grafana dashboards, started with a single Docker Compose command.',
    'proj4.viewLabel': 'View the Monitoring Stack project',
    'proj4.codeLabel': 'Source code of the Monitoring Stack project',

    'contact.eyebrow': 'Contact',
    'contact.title': 'Contact me',
    'contact.heading': 'Let\'s work together',
    'contact.text': 'Looking for a DevOps &amp; Automation profile with a real development background? I\'m available for a full-time role or an assignment. Let\'s talk about your pipelines, your deployments and how I can help.',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.location': 'Location',
    'contact.follow': 'Follow me',
    'form.title': 'Offer me an opportunity',
    'form.name': 'Your name',
    'form.email': 'Your email',
    'form.subject': 'Opportunity type',
    'form.select': 'Select an option',
    'form.message': 'Your message',
    'form.namePh': 'Jane Smith',
    'form.emailPh': 'recruiter@company.com',
    'form.messagePh': 'Describe the role, the tech stack, the challenges…',
    'opt.devops': 'DevOps / Infrastructure role',
    'opt.sysadmin': 'System &amp; network administration',
    'opt.support': 'IT Support role',
    'opt.freelance': 'Freelance assignment',
    'opt.other': 'Other opportunity',

    'footer.rights': 'All rights reserved.',
    'footer.keys': 'Keyboard navigation',
    'footer.top': 'Back to top',
  };

  const UI = {
    fr: {
      title: document.title,
      description: $('meta[name="description"]').content,
      menuOpen: 'Ouvrir le menu',
      menuClose: 'Fermer le menu',
      toLight: 'Activer le thème clair',
      toDark: 'Activer le thème sombre',
      submit: 'Envoyer le message',
      sending: 'Envoi en cours…',
      invalid: 'Merci de compléter correctement tous les champs.',
      success: 'Merci ! Votre message a bien été envoyé.',
      error: 'Une erreur est survenue. Veuillez réessayer.',
      offline: 'Impossible d\'envoyer le message : vérifiez votre connexion.',
    },
    en: {
      title: 'NOVA | Joseph Si-Carlino — DevOps & Automation',
      description: 'Portfolio of Joseph Si-Carlino, a web developer focused on DevOps & Automation, with interests in CI/CD, containerization, automation, and Linux environments. Based in Antananarivo.',
      menuOpen: 'Open menu',
      menuClose: 'Close menu',
      toLight: 'Switch to light theme',
      toDark: 'Switch to dark theme',
      submit: 'Send message',
      sending: 'Sending…',
      invalid: 'Please fill in every field correctly.',
      success: 'Thank you! Your message has been sent.',
      error: 'Something went wrong. Please try again.',
      offline: 'Unable to send the message: check your connection.',
    },
  };

  const textNodes = $$('[data-i18n]').map((el) => ({ el, key: el.dataset.i18n, fr: el.innerHTML }));
  const attrNodes = $$('[data-i18n-attr]').flatMap((el) => el.dataset.i18nAttr.split('|').map((pair) => {
    const [attr, key] = pair.split(':');
    return { el, attr, key, fr: el.getAttribute(attr) };
  }));
  const missing = [...textNodes, ...attrNodes].filter((n) => !(n.key in EN)).map((n) => n.key);
  if (missing.length) console.warn('[i18n] missing EN keys:', [...new Set(missing)].join(', '));

  let lang = root.lang === 'en' ? 'en' : 'fr';
  const t = (key) => UI[lang][key];

  function applyLanguage(next) {
    lang = next === 'en' ? 'en' : 'fr';
    root.lang = lang;
    textNodes.forEach((n) => { n.el.innerHTML = lang === 'en' ? (EN[n.key] ?? n.fr) : n.fr; });
    attrNodes.forEach((n) => { n.el.setAttribute(n.attr, lang === 'en' ? (EN[n.key] ?? n.fr) : n.fr); });
    document.title = t('title');
    $('meta[name="description"]').setAttribute('content', t('description'));
    $$('[data-lang]').forEach((btn) => btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang)));
    refreshThemeLabel();
    refreshMenuLabel();
    if (!submitBtn.disabled) submitLabel.textContent = t('submit');
    formStatus.textContent = '';
  }

  /* ---------------------------------------------------------
     THEME — dark / light, persisted in localStorage
     --------------------------------------------------------- */
  const themeBtn = $('#theme-toggle');
  const currentTheme = () => (root.dataset.theme === 'dark' ? 'dark' : 'light');

  function refreshThemeLabel() {
    const label = currentTheme() === 'dark' ? t('toLight') : t('toDark');
    themeBtn.setAttribute('aria-label', label);
    themeBtn.title = label;
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    store.set('nova-theme', theme);
    refreshThemeLabel();
  }

  themeBtn.addEventListener('click', () => applyTheme(currentTheme() === 'dark' ? 'light' : 'dark'));

  /* ---------------------------------------------------------
     SCROLL STATE — header, timeline, and active navigation
     --------------------------------------------------------- */
  const timeline = $('.timeline');

  function updateScrollMetrics() {
    const remaining = root.scrollHeight - scrollY - innerHeight;
    header.classList.toggle('is-scrolled', scrollY > 24);
    if (timeline) {
      const r = timeline.getBoundingClientRect();
      if (r.height) timeline.style.setProperty('--tl', clamp((innerHeight * 0.65 - r.top) / r.height, 0, 1).toFixed(3));
    }
    if (remaining < 4) setActive(sections[sections.length - 1].id);
  }

  let scrollQueued = false;
  addEventListener('scroll', () => {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(() => { scrollQueued = false; updateScrollMetrics(); });
  }, { passive: true });
  addEventListener('resize', updateScrollMetrics);

  /* ---------------------------------------------------------
     ACTIVE SECTION
     --------------------------------------------------------- */
  const navLinks = $$('[data-nav]');
  let activeId = '';

  function setActive(id) {
    if (!id || id === activeId) return;
    activeId = id;
    navLinks.forEach((a) => {
      const match = a.hash === `#${id}`;
      a.classList.toggle('is-active', match);
      if (match) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
  }

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => sectionObserver.observe(s));

  /* ---------------------------------------------------------
     SCROLL REVEAL
     --------------------------------------------------------- */
  $$('[data-stagger]').forEach((group) => {
    Array.from(group.children).forEach((child, i) => child.style.setProperty('--d', `${(i % 4) * 0.09}s`));
  });

  const revealEls = $$('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      // A fast fling or an anchor jump can skip elements: reveal everything already passed.
      const index = revealEls.indexOf(entry.target);
      for (let i = 0; i <= index; i++) {
        const el = revealEls[i];
        if (el.classList.contains('is-visible')) continue;
        el.classList.add('is-visible');
        revealObserver.unobserve(el);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------------------------------------------------------
     MOBILE MENU
     --------------------------------------------------------- */
  const menuBtn = $('#menu-toggle');
  const menu = $('#mobile-menu');
  let menuOpen = false;
  let menuTimer = 0;

  function refreshMenuLabel() {
    menuBtn.setAttribute('aria-label', menuOpen ? t('menuClose') : t('menuOpen'));
  }

  function openMenu() {
    clearTimeout(menuTimer);
    menuOpen = true;
    menu.hidden = false;
    requestAnimationFrame(() => menu.classList.add('is-open'));
    menuBtn.setAttribute('aria-expanded', 'true');
    refreshMenuLabel();
    document.body.classList.add('menu-open');
  }

  function closeMenu(restoreFocus) {
    if (!menuOpen) return;
    menuOpen = false;
    menu.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    refreshMenuLabel();
    document.body.classList.remove('menu-open');
    menuTimer = setTimeout(() => { if (!menuOpen) menu.hidden = true; }, 320);
    if (restoreFocus) menuBtn.focus();
  }

  menuBtn.addEventListener('click', () => (menuOpen ? closeMenu(false) : openMenu()));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) closeMenu(false); });
  mqDesktop.addEventListener('change', (e) => { if (e.matches) closeMenu(false); });

  /* ---------------------------------------------------------
     KEYBOARD PILOTING  (J / K = next / previous, 1–6 = jump)
     --------------------------------------------------------- */
  const isTypingTarget = (el) => el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
  let jumpTarget = -1;
  let jumpAt = 0;

  function currentSectionIndex() {
    if (performance.now() - jumpAt < 900 && jumpTarget >= 0) return jumpTarget;
    let index = 0;
    sections.forEach((s, i) => { if (s.getBoundingClientRect().top - 120 <= 0) index = i; });
    return index;
  }

  function goToSection(i) {
    const index = clamp(i, 0, sections.length - 1);
    const section = sections[index];
    jumpTarget = index;
    jumpAt = performance.now();
    section.scrollIntoView({ behavior: mqReduce.matches ? 'auto' : 'smooth', block: 'start' });
    section.focus({ preventScroll: true });
    history.replaceState(null, '', `#${section.id}`);
  }

  document.addEventListener('keydown', (e) => {
    if (menuOpen && e.key === 'Escape') { closeMenu(true); return; }
    if (menuOpen && e.key === 'Tab') {
      const focusables = [menuBtn, ...$$('a', menu)];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      return;
    }
    if (menuOpen || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || isTypingTarget(e.target)) return;
    const key = e.key.toLowerCase();
    if (key === 'j') { e.preventDefault(); goToSection(currentSectionIndex() + 1); }
    else if (key === 'k') { e.preventDefault(); goToSection(currentSectionIndex() - 1); }
    else if (/^[1-6]$/.test(key)) { e.preventDefault(); goToSection(Number(key) - 1); }
  });

  /* ---------------------------------------------------------
     PROJECT CARD TILT + CURSOR GLOW
     --------------------------------------------------------- */
  if (mqFinePointer.matches) {
    $$('[data-tilt]').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
        card.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
        if (mqReduce.matches) return;
        card.style.transform = `perspective(1000px) rotateX(${((0.5 - y) * 1.5).toFixed(2)}deg) rotateY(${((x - 0.5) * 1.5).toFixed(2)}deg) translateY(-2px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('projects-modal');
    const btnOpen = document.getElementById('open-projects-modal');
    const btnClose = document.getElementById('close-projects-modal');
    const btnOk = document.getElementById('btn-modal-ok');
  
    const openModal = () => {
      modal.classList.add('is-active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };
  
    const closeModal = () => {
      modal.classList.remove('is-active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };
  
    if (btnOpen) btnOpen.addEventListener('click', openModal);
    if (btnClose) btnClose.addEventListener('click', closeModal);
    if (btnOk) btnOk.addEventListener('click', closeModal);
  
    // Fermeture en cliquant en dehors du cadre
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }
  
    // Fermeture avec la touche Échap (ESC)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('is-active')) {
        closeModal();
      }
    });
  });

  /* ---------------------------------------------------------
     CONTACT FORM (Formspree)
     --------------------------------------------------------- */
  const form = $('#contact-form');
  const formStatus = $('#form-status');
  const submitBtn = form.querySelector('[type="submit"]');
  const submitLabel = submitBtn.querySelector('.btn-label');

  function showStatus(type, message) {
    formStatus.className = `form-status is-${type}`;
    formStatus.textContent = message;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      const firstInvalid = form.querySelector(':invalid');
      if (firstInvalid) firstInvalid.focus();
      showStatus('error', t('invalid'));
      return;
    }
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'true');
    submitLabel.textContent = t('sending');
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      showStatus('success', t('success'));
    } catch (_) {
      showStatus('error', navigator.onLine ? t('error') : t('offline'));
    } finally {
      submitBtn.disabled = false;
      submitBtn.removeAttribute('aria-busy');
      submitLabel.textContent = t('submit');
    }
  });

  /* ---------------------------------------------------------
     LANGUAGE SWITCH
     --------------------------------------------------------- */
  $$('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      store.set('nova-lang', btn.dataset.lang);
      applyLanguage(btn.dataset.lang);
    });
  });

  /* ---------------------------------------------------------
     INIT
     --------------------------------------------------------- */
  $('#year').textContent = String(new Date().getFullYear());
  applyLanguage(lang);
  refreshThemeLabel();
  updateScrollMetrics();
  addEventListener('load', updateScrollMetrics);
})();
