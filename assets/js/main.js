/* =========================================================
   NOVA — interactions
   Theme (dark/light) · Language (FR/EN) · Space engine ·
   Scroll HUD · Reveal · Mobile menu · Keyboard piloting · Form
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
    'hero.role': 'DevOps <span class="amp">&amp;</span> Automation',
    'hero.pitch': 'Trained as a <strong>Web Developer</strong>, I grew my profile towards infrastructure to build reliable, automated environments. I put my coding background to work for DevOps: <strong>building CI/CD pipelines, automating deployments and monitoring</strong>. My goal: reduce friction between development and production while keeping applications stable.',
    'hero.stackLabel': 'Core technologies',
    'hero.contact': 'Contact me',
    'hero.cv': 'Download my resume',
    'hero.photoAlt': 'Portrait of Joseph Si-carlino',
    'hero.badgeA': 'DevOps · CI/CD',
    'hero.badgeB': 'Automation',
    'hero.scroll': 'Scroll to lift off',
    'social.label': 'Social networks',
    'social.linkedin': 'Joseph Si-carlino on LinkedIn',
    'social.github': 'Joseph Si-carlino on GitHub',
    'social.mail': 'Send an email to Joseph',

    'about.eyebrow': 'Sector 02 · Profile',
    'about.title': 'About me',
    'about.who': 'Who am I?',
    'about.p1': 'A web developer by training, I built <strong>Next.js, React and PostgreSQL</strong> applications before turning to what happens after the code: how it is tested, shipped and monitored in production. Today I work in <strong>DevOps &amp; Automation</strong>: CI/CD pipelines, containerisation with Docker and automation of recurring tasks.',
    'about.p2': 'My time in <strong>IT support</strong> taught me the demands of the field: available services, incidents resolved fast and users properly supported. I combine both cultures, Dev and Ops, to ship faster without sacrificing stability.',
    'about.fact1t': 'Full-Stack',
    'about.fact1d': 'Next.js · React · PostgreSQL',
    'about.fact2d': 'CI/CD &amp; automation',
    'about.fact3t': 'Monitoring',
    'about.fact3d': 'Prometheus &amp; Grafana',
    'about.valueTitle': 'What I bring',
    'about.v1t': 'Automation',
    'about.v1d': 'CI/CD pipelines and Bash scripts that remove manual chores and reduce deployment errors.',
    'about.v2t': 'Reliability',
    'about.v2d': 'Containerised, reproducible environments: what works locally works in production.',
    'about.v3t': 'Monitoring',
    'about.v3d': 'Metrics and dashboards to spot a problem before it reaches users.',
    'about.v4t': 'Coding culture',
    'about.v4d': 'Real full-stack experience that helps me understand developers\' needs and smooth the path to production.',

    'skills.eyebrow': 'Sector 03 · Arsenal',
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

    'xp.eyebrow': 'Sector 04 · Trajectory',
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

    'projects.eyebrow': 'Sector 05 · Work',
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

    'contact.eyebrow': 'Sector 06 · Transmission',
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
    'footer.keys': 'Keyboard piloting',
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
      sending: 'Transmission en cours…',
      invalid: 'Merci de compléter correctement tous les champs.',
      success: 'Merci ! Votre message a bien été envoyé.',
      error: 'Une erreur est survenue. Veuillez réessayer.',
      offline: 'Impossible d\'envoyer le message : vérifiez votre connexion.',
    },
    en: {
      title: 'NOVA | Joseph Si-carlino — DevOps & Automation',
      description: 'Portfolio of Joseph Si-carlino: DevOps & Automation. CI/CD pipelines, Docker containerisation, automation and monitoring, backed by solid full-stack development experience. Based in Antananarivo.',
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
    refreshHud();
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
    space.refreshColors();
    if (paused) space.render(0);
  }

  themeBtn.addEventListener('click', () => applyTheme(currentTheme() === 'dark' ? 'light' : 'dark'));

  /* ---------------------------------------------------------
     SPACE ENGINE — particle network (constellation): drifting
     points linked by thin lines, pushed away by the pointer.
     Scrolling makes the field flow past like a ship moving
     forward; fast scrolling stretches points into streaks.
     --------------------------------------------------------- */
  const space = (() => {
    const canvas = $('#space');
    const ctx = canvas.getContext('2d');
    const CRUISE = 0.025;
    const LINK_DIST = 150;
    const REPULSE_DIST = 100;
    const DRIFT = 90;
    const FLOW = 0.35;
    const DOT_ALPHA = 0.5;
    const LINK_ALPHA = 0.3;
    let w = 0, h = 0, particles = [];
    let starRgb = '255,255,255';
    let linkRgb = '255,255,255';
    let velocity = CRUISE;
    let target = CRUISE;
    const pointer = { x: -1e4, y: -1e4 };

    function refreshColors() {
      const cs = getComputedStyle(root);
      const read = (name) => cs.getPropertyValue(name).trim().replace(/\s+/g, '');
      starRgb = read('--star-rgb') || starRgb;
      linkRgb = read('--link-rgb') || linkRgb;
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = innerWidth;
      h = innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(clamp(w * h / 30000, 10, 30));
      particles = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = DRIFT * (0.35 + Math.random() * 0.65);
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: 1 + Math.random() * 2.5,
        };
      });
      render(0);
    }

    function render(dt) {
      velocity += (target - velocity) * Math.min(1, dt * 2.4);
      const flow = (velocity - CRUISE) * 2600 * FLOW;
      const warp = clamp((Math.abs(velocity) - 0.1) / 0.9, 0, 1);
      const linkAlpha = LINK_ALPHA * (1 - warp);
      const ease = Math.min(1, dt * 10);

      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = 'round';

      for (const p of particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt - flow * dt;

        if (p.x < 0 || p.x > w) { p.vx = -p.vx; p.x = clamp(p.x, 0, w); }
        if (Math.abs(flow) > 20) {
          if (p.y < -10) p.y += h + 20;
          else if (p.y > h + 10) p.y -= h + 20;
        } else if (p.y < 0 || p.y > h) {
          p.vy = -p.vy;
          p.y = clamp(p.y, 0, h);
        }

        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const d = Math.hypot(dx, dy);
        if (d > 0 && d < REPULSE_DIST) {
          const push = (REPULSE_DIST - d) * ease;
          p.x += (dx / d) * push;
          p.y += (dy / d) * push;
        }

        if (warp > 0.02) {
          ctx.strokeStyle = `rgba(${starRgb},${DOT_ALPHA * (0.4 + warp * 0.6)})`;
          ctx.lineWidth = p.r * 0.9;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x, p.y + flow * (0.04 + warp * 0.06));
          ctx.stroke();
        }

        ctx.fillStyle = `rgba(${starRgb},${DOT_ALPHA})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (linkAlpha > 0.01) {
        ctx.lineWidth = 1;
        for (let i = 0; i < particles.length; i++) {
          const a = particles[i];
          for (let j = i + 1; j < particles.length; j++) {
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d2 = dx * dx + dy * dy;
            if (d2 > LINK_DIST * LINK_DIST) continue;
            ctx.strokeStyle = `rgba(${linkRgb},${(1 - Math.sqrt(d2) / LINK_DIST) * linkAlpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    }

    return {
      resize,
      render,
      refreshColors,
      setThrust(scrollVelocity) { target = CRUISE + clamp(scrollVelocity / 2600, -2.2, 2.2); },
      setPointer(x, y) { pointer.x = x; pointer.y = y; },
      settle() { velocity = target = CRUISE; },
      get speed() { return Math.abs(velocity); },
    };
  })();

  /* ---------------------------------------------------------
     SCROLL METRICS — progress bar, flight rail, timeline beam
     --------------------------------------------------------- */
  const progressTargets = [$('.flight-progress'), $('.flight-rail'), $('.nebula')].filter(Boolean);
  const shipTargets = $$('.rail-ship, .flight-progress-ship');
  const railShip = $('.rail-ship');
  const timeline = $('.timeline');
  const heroVisual = $('[data-parallax]');
  const hudSpeed = $('#hud-speed');
  const hudSector = $('#hud-sector');
  const hudName = $('#hud-name');
  let lastProgress = -1;

  function updateScrollMetrics() {
    const max = root.scrollHeight - innerHeight;
    const p = max > 0 ? clamp(scrollY / max, 0, 1) : 0;
    if (Math.abs(p - lastProgress) > 0.0005) {
      lastProgress = p;
      progressTargets.forEach((el) => el.style.setProperty('--p', p.toFixed(4)));
    }
    header.classList.toggle('is-scrolled', scrollY > 24);
    if (timeline) {
      const r = timeline.getBoundingClientRect();
      timeline.style.setProperty('--tl', clamp((innerHeight * 0.65 - r.top) / r.height, 0, 1).toFixed(3));
    }
    if (max - scrollY < 4) setActive(sections[sections.length - 1].id);
  }

  function placeRailMarkers() {
    const max = root.scrollHeight - innerHeight;
    $$('.rail-marker').forEach((m) => {
      const section = document.getElementById(m.hash.slice(1));
      const at = max > 0 ? clamp((section.offsetTop - 1) / max, 0, 1) : 0;
      m.style.setProperty('--at', `${(at * 100).toFixed(2)}%`);
    });
  }

  let scrollQueued = false;
  addEventListener('scroll', () => {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(() => { scrollQueued = false; updateScrollMetrics(); });
  }, { passive: true });

  /* ---------------------------------------------------------
     ANIMATION LOOP (disabled when reduced motion is requested)
     --------------------------------------------------------- */
  let paused = mqReduce.matches;
  let rafId = 0, lastT = 0, lastY = scrollY, scrollVel = 0, dir = 1, hudTimer = 0, lastShipRot = '';

  function loop(time) {
    const dt = Math.min(0.05, (time - lastT) / 1000 || 0.016);
    lastT = time;
    const y = scrollY;
    scrollVel += ((y - lastY) / dt - scrollVel) * Math.min(1, dt * 8);
    lastY = y;
    if (Math.abs(scrollVel) > 30) dir = scrollVel > 0 ? 1 : -1;

    space.setThrust(scrollVel);
    space.render(dt);

    const thrust = clamp(0.45 + Math.abs(scrollVel) / 1400, 0.45, 1.8).toFixed(2);
    shipTargets.forEach((el) => el.style.setProperty('--thrust', thrust));
    const rot = dir > 0 ? '180deg' : '0deg';
    if (rot !== lastShipRot) {
      lastShipRot = rot;
      railShip.style.setProperty('--ship-rot', rot);
    }

    if (heroVisual && y < innerHeight * 1.3) {
      heroVisual.style.transform = `translate3d(0, ${(y * 0.16).toFixed(1)}px, 0)`;
    }

    if (time - hudTimer > 120) {
      hudTimer = time;
      hudSpeed.textContent = space.speed.toFixed(2);
    }
    rafId = requestAnimationFrame(loop);
  }

  function start() {
    if (rafId || paused) return;
    lastT = performance.now();
    lastY = scrollY;
    rafId = requestAnimationFrame(loop);
  }

  function stop() {
    cancelAnimationFrame(rafId);
    rafId = 0;
    space.settle();
    space.render(0);
    if (heroVisual) heroVisual.style.transform = '';
  }

  mqReduce.addEventListener('change', (e) => {
    paused = e.matches;
    if (paused) stop(); else start();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(rafId); rafId = 0; } else { start(); }
  });

  if (mqFinePointer.matches) {
    addEventListener('pointermove', (e) => space.setPointer(e.clientX, e.clientY), { passive: true });
    document.documentElement.addEventListener('pointerleave', () => space.setPointer(-1e4, -1e4));
  }

  let resizeTimer = 0;
  addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      space.resize();
      placeRailMarkers();
      updateScrollMetrics();
    }, 150);
  });

  /* ---------------------------------------------------------
     ACTIVE SECTION + HUD
     --------------------------------------------------------- */
  const navLinks = $$('[data-nav]');
  let activeId = '';

  function refreshHud() {
    const index = sections.findIndex((s) => s.id === activeId);
    hudSector.textContent = String(Math.max(index, 0) + 1).padStart(2, '0');
    const link = $(`.nav-links a[href="#${activeId || 'home'}"]`);
    hudName.textContent = link ? link.textContent.toUpperCase() : '';
  }

  function setActive(id) {
    if (!id || id === activeId) return;
    activeId = id;
    navLinks.forEach((a) => {
      const match = a.hash === `#${id}`;
      a.classList.toggle('is-active', match);
      if (a.closest('.flight-rail')) return;
      if (match) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
    refreshHud();
  }

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => sectionObserver.observe(s));

  /* ---------------------------------------------------------
     SCROLL REVEAL — "warp in"
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
    section.scrollIntoView({ behavior: paused ? 'auto' : 'smooth', block: 'start' });
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
        if (paused) return;
        card.style.transform = `perspective(1000px) rotateX(${((0.5 - y) * 6).toFixed(2)}deg) rotateY(${((x - 0.5) * 8).toFixed(2)}deg) translateY(-6px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }

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
  space.refreshColors();
  space.resize();
  applyLanguage(lang);
  refreshThemeLabel();
  placeRailMarkers();
  updateScrollMetrics();
  start();
  addEventListener('load', () => { placeRailMarkers(); updateScrollMetrics(); });
})();
