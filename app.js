/* Northampton Electricians — static site logic */

// ---------- DATA ----------
const SERVICES = [
  ["siren", "Emergency Electrical Callouts", "24/7 rapid response for power loss, faults and unsafe wiring."],
  ["plug", "Socket & Plug Installation", "New sockets, USB outlets and replacements, fitted to regs."],
  ["lightbulb", "Lighting Installation & Repairs", "Indoor, outdoor, LED upgrades and full lighting design."],
  ["clipboard-check", "Electrical Inspections", "EICR reports and certified condition checks for any property."],
  ["zap", "Fuse Box Checks & Upgrades", "Consumer unit upgrades, RCD protection and fault finding."],
  ["chef-hat", "Cooker Hood & Appliance Wiring", "Safe wiring for ovens, hobs, hoods and kitchen appliances."],
  ["shield-check", "Landlord Safety Checks", "EICR certificates that meet UK landlord legal requirements."],
  ["wrench", "Domestic Electrical Repairs", "Tracing faults, fixing dead circuits and tripping breakers."],
  ["building-2", "Commercial Electrical Work", "Shops, offices and units — installs, maintenance, compliance."],
  ["cog", "General Electrical Maintenance", "Planned upkeep keeping homes and businesses running safely."],
];

const WHY = [
  ["clock", "Open 24 hours", "Round-the-clock callouts for urgent electrical issues."],
  ["map-pin", "Local to Northampton", "Based in NN3 — fast response across town and nearby."],
  ["star", "5.0 Google rating", "20+ verified reviews from happy local customers."],
  ["badge-pound-sterling", "Competitive prices", "Honest quotes, no call-out tricks, no hidden fees."],
  ["timer", "Fast response times", "We aim to be on-site quickly when it matters most."],
  ["smile", "Friendly & professional", "Tidy work, respectful of your home or business."],
  ["briefcase", "Domestic & commercial", "From a single socket to a full commercial fit-out."],
];

const REVIEWS = [
  ["I can highly recommend, excellent job at a very competitive price.", "Verified Google Customer", "Northampton"],
  ["Manuel went to the property, inspected the work and gave a competitive quote.", "Verified Google Customer", "Landlord, Northampton"],
  ["Had a new plug fitted for my chimney/cooker hood.", "Verified Google Customer", "Homeowner, Northampton"],
];

// ---------- RENDERERS ----------
function renderServices() {
  const grid = document.getElementById("services-grid");
  if (!grid) return;

  grid.innerHTML = SERVICES.map(([icon, title, desc], i) => `
    <article data-reveal data-reveal-delay="${i * 60}" class="svc-card group h-full bg-white p-6 rounded-xl border border-border shadow-sm">
      <div class="flex items-start gap-4">
        <div class="svc-icon shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-surface text-electric transition-colors">
          <i data-lucide="${icon}" class="w-6 h-6"></i>
        </div>
        <div class="flex-1">
          <h3 class="font-display text-lg font-semibold text-navy leading-snug">${title}</h3>
          <p class="mt-2 text-sm text-muted leading-relaxed">${desc}</p>
        </div>
      </div>
    </article>
  `).join("");
}

function renderWhy() {
  const grid = document.getElementById("why-grid");
  if (!grid) return;

  grid.innerHTML = WHY.map(([icon, title, desc], i) => `
    <li data-reveal data-reveal-delay="${i * 60}">
      <div class="h-full bg-white rounded-xl border border-border p-5 flex items-start gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
        <span class="inline-flex w-10 h-10 rounded-lg bg-electric/10 text-electric items-center justify-center shrink-0">
          <i data-lucide="${icon}" class="w-5 h-5"></i>
        </span>
        <div>
          <h3 class="font-display font-semibold text-navy text-base">${title}</h3>
          <p class="mt-1 text-sm text-muted leading-relaxed">${desc}</p>
        </div>
      </div>
    </li>
  `).join("");
}

function renderReviews() {
  const grid = document.getElementById("reviews-grid");
  if (!grid) return;

  const stars = `<span class="flex items-center gap-0.5 text-amber-400">${'<i data-lucide="star" class="w-4 h-4 fill-amber-400"></i>'.repeat(5)}</span>`;

  grid.innerHTML = REVIEWS.map(([quote, name, role], i) => `
    <figure data-reveal data-reveal-delay="${i * 100}" class="relative h-full bg-surface rounded-xl border border-border p-7 hover:shadow-md transition-shadow">
      <i data-lucide="quote" class="absolute top-5 right-5 w-7 h-7 text-electric/20"></i>
      ${stars}
      <blockquote class="mt-4 text-navy text-[17px] leading-relaxed font-medium">"${quote}"</blockquote>
      <figcaption class="mt-6 pt-5 border-t border-border flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center font-semibold">${name.charAt(0)}</div>
        <div>
          <p class="text-sm font-semibold text-navy">${name}</p>
          <p class="text-xs text-muted">${role}</p>
        </div>
      </figcaption>
    </figure>
  `).join("");
}

// ---------- INTERACTIONS ----------
function setupHeader() {
  const header = document.getElementById("site-header");
  if (!header) return;

  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();

  window.addEventListener("scroll", onScroll, { passive: true });
}

function setupMobileMenu() {
  const btn = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");
  const icon = document.getElementById("menu-icon");

  if (!btn || !menu || !icon) return;

  btn.addEventListener("click", () => {
    const open = menu.classList.toggle("hidden") === false;
    icon.setAttribute("data-lucide", open ? "x" : "menu");

    if (window.lucide) window.lucide.createIcons();
  });

  document.querySelectorAll(".mobile-link").forEach((a) =>
    a.addEventListener("click", () => {
      menu.classList.add("hidden");
      icon.setAttribute("data-lucide", "menu");

      if (window.lucide) window.lucide.createIcons();
    })
  );
}

function setupReveal() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const delay = parseInt(e.target.dataset.revealDelay || "0", 10);

          setTimeout(() => {
            e.target.classList.add("is-visible");
          }, delay);

          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll("[data-reveal]").forEach((el) => obs.observe(el));
}

// ---------- TOAST ----------
function toast(msg, type = "success") {
  let el = document.getElementById("toast");

  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    document.body.appendChild(el);
  }

  el.textContent = msg;
  el.className = "show " + type;

  clearTimeout(el._t);

  el._t = setTimeout(() => {
    el.classList.remove("show");
  }, 3800);
}

// ---------- QUOTE FORM ----------
// This sends quote requests to Web3Forms.
// Go to Web3Forms, copy your Access Key, then paste it below.
async function submitQuote(data) {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      access_key: "PASTE_YOUR_WEB3FORMS_ACCESS_KEY_HERE",
      subject: `New quote request — ${data.job_type || "Electrical work"}`,
      from_name: "Northampton Electricians Website",
      name: data.name,
      phone: data.phone,
      email: data.email,
      job_type: data.job_type,
      message: data.message || "No message provided"
    })
  });

  const result = await res.json();
  return { ok: result.success };
}

function setupForm() {
  const form = document.getElementById("quote-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());

    if (!data.name || !data.phone || !data.email || !data.job_type) {
      toast("Please fill in your name, phone, email and job type.", "error");
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = "Sending…";

    try {
      const res = await submitQuote(data);

      if (res.ok) {
        toast("Quote request sent! We'll be in touch shortly.", "success");
        form.reset();
      } else {
        toast("Could not send. Please call 07376 944959.", "error");
      }
    } catch {
      toast("Could not send. Please call 07376 944959.", "error");
    } finally {
      btn.disabled = false;
      btn.innerHTML = original;

      if (window.lucide) window.lucide.createIcons();
    }
  });
}

// ---------- INIT ----------
document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  renderServices();
  renderWhy();
  renderReviews();

  if (window.lucide) window.lucide.createIcons();

  setupHeader();
  setupMobileMenu();
  setupReveal();
  setupForm();
});
