(function () {
  var STORAGE_KEY = 'site-lang';

  var translations = {
    'meta.description': {
      en: "Khaled Wadi's portfolio - full-stack web developer showcasing projects, technical skills, and experience.",
      nl: 'Portfolio van Khaled Wadi - fullstack webontwikkelaar met projecten, technische vaardigheden en ervaring.'
    },
    'nav.home': { en: 'Home', nl: 'Home' },
    'nav.work': { en: 'Work', nl: 'Werk' },
    'nav.skills': { en: 'Skills', nl: 'Vaardigheden' },
    'nav.about': { en: 'About', nl: 'Over mij' },
    'nav.cv': { en: 'CV', nl: 'CV' },
    'nav.contact': { en: 'Contact', nl: 'Contact' },
    'nav.toggleAria': { en: 'Toggle navigation', nl: 'Navigatiemenu wisselen' },

    'home.title': {
      en: 'I\'M A <span class="text-brand">SOFTWARE DEVELOPER</span> FROM NETHERLANDS',
      nl: 'IK BEN EEN <span class="text-brand">SOFTWARE ONTWIKKELAAR</span> UIT NEDERLAND'
    },
    'home.lead': {
      en: 'I am a motivated Software Development student with a passion for programming and problem-solving. With a strong foundation in web development, databases, and software development, I seek to enhance my programming skills and contribute to innovative IT solutions.',
      nl: 'Ik ben een gemotiveerde Software Development student met een passie voor programmeren en probleemoplossing. Met een sterke basis in webontwikkeling, databases en softwareontwikkeling wil ik mijn programmeervaardigheden verder ontwikkelen en bijdragen aan innovatieve IT-oplossingen.'
    },
    'home.cta': { en: 'Explore my work', nl: 'Bekijk mijn werk' },

    'work.label': { en: 'WORK', nl: 'WERK' },
    'work.heading': { en: 'My recent projects', nl: 'Mijn recente projecten' },
    'work.liveSite': { en: 'Live site', nl: 'Live website' },

    'work.bariq.tagline': { en: 'Full-Stack Business Operations Platform', nl: 'Fullstack platform voor bedrijfsvoering' },
    'work.bariq.desc': {
      en: 'Bariq Autocare is a production full-stack platform I built for a car detailing business in the Amsterdam area. It replaces workflows spread across WhatsApp and spreadsheets with a customer-facing website and an internal dashboard for managing bookings, customers, services, availability, invoicing, and analytics. I developed the system end to end with real-time data synchronization, automated SEO monitoring, testing, and deployment.',
      nl: 'Bariq Autocare is een productieplatform dat ik volledig heb gebouwd voor een autodetailingbedrijf in de regio Amsterdam. Het vervangt workflows verspreid over WhatsApp en spreadsheets door een klantgerichte website en een intern dashboard voor het beheren van boekingen, klanten, diensten, beschikbaarheid, facturatie en analyses. Ik ontwikkelde het systeem end-to-end met realtime datasynchronisatie, geautomatiseerde SEO-monitoring, tests en deployment.'
    },
    'work.wadigrow.tagline': { en: 'Agency platform & social automation system', nl: 'Agencyplatform & social-mediaautomatisering' },
    'work.wadigrow.desc': {
      en: 'WadiGrow is a full-stack agency platform I built to combine lead generation, client operations, and social media automation in one system. Beyond the multilingual public website, the platform includes an authenticated client dashboard and an Instagram automation pipeline that generates, quality-checks, schedules, and publishes content through the Instagram Graph API, with rate-limited engagement and audit logging.',
      nl: 'WadiGrow is een fullstack agencyplatform dat ik heb gebouwd om leadgeneratie, klantbeheer en social-mediaautomatisering in één systeem te combineren. Naast de meertalige publieke website bevat het platform een beveiligd klantdashboard en een Instagram-automatiseringspijplijn die content genereert, controleert, plant en publiceert via de Instagram Graph API, met rate-limited interactie en auditlogging.'
    },
    'work.cenya.tagline': { en: 'Multi-Tenant Scheduling & Automation SaaS', nl: 'Multi-tenant planning- & automatiserings-SaaS' },
    'work.cenya.desc': {
      en: 'Cenya is a multi-tenant SaaS platform I built for appointment-based businesses to automate scheduling through WhatsApp. It connects customer conversations with business calendars to handle bookings, rescheduling, cancellations, and reminders automatically. I developed the platform end to end, including client and admin dashboards, secure WhatsApp webhooks, calendar synchronization, tenant-isolated data access, and a serverless automation backend built with Supabase.',
      nl: 'Cenya is een multi-tenant SaaS-platform dat ik heb gebouwd voor afspraakgebaseerde bedrijven om planning via WhatsApp te automatiseren. Het koppelt klantgesprekken aan bedrijfsagenda\'s om boekingen, verzettingen, annuleringen en herinneringen automatisch af te handelen. Ik ontwikkelde het platform end-to-end, inclusief klant- en beheerdersdashboards, beveiligde WhatsApp-webhooks, agendasynchronisatie, tenant-geïsoleerde gegevenstoegang en een serverless automatiseringsbackend gebouwd met Supabase.'
    },
    'work.naqsha.tagline': { en: 'Bilingual commerce & booking platform', nl: 'Tweetalig commerce- & boekingsplatform' },
    'work.naqsha.desc': {
      en: 'Naqsha is a bilingual commerce and booking platform I built for a Palestinian cultural fashion brand in the Netherlands. The platform combines an Arabic/English storefront with full RTL/LTR support, collection and rental management, appointment booking, customer reviews, and a private admin interface for managing the catalog. I designed the experience around the business\'s existing WhatsApp-based sales workflow rather than forcing a traditional e-commerce checkout.',
      nl: 'Naqsha is een tweetalig commerce- en boekingsplatform dat ik heb gebouwd voor een Palestijns cultureel modemerk in Nederland. Het platform combineert een Arabisch/Engelse webshop met volledige RTL/LTR-ondersteuning, collectie- en verhuurbeheer, afsprakenboeking, klantreviews en een privé beheerdersinterface voor het catalogusbeheer. Ik ontwierp de ervaring rond de bestaande op WhatsApp gebaseerde verkoopworkflow van het bedrijf in plaats van een traditionele e-commerce-afrekenprocedure te forceren.'
    },
    'work.mixmagic.tagline': { en: 'Custom e-commerce & product configuration platform', nl: 'E-commerce & productconfiguratieplatform op maat' },
    'work.mixmagic.desc': {
      en: 'Mix Magic is a full-stack e-commerce platform I built for a perfume business in The Hague, centered around an interactive configurator for custom fragrances. Customers compose scents by ingredient weight, while the platform translates those selections into validated formulas and authoritative server-side pricing before Stripe checkout. I also built the multilingual storefront, loyalty and gift-card systems, workshop bookings, customer accounts, and administration tools on Supabase and PostgreSQL.',
      nl: 'Mix Magic is een fullstack e-commerceplatform dat ik heb gebouwd voor een parfumbedrijf in Den Haag, gecentreerd rond een interactieve configurator voor persoonlijke geuren. Klanten stellen geuren samen op basis van ingrediëntgewicht, terwijl het platform deze keuzes vertaalt naar gevalideerde formules en gezaghebbende server-side prijzen vóór het Stripe-afrekenen. Ik bouwde ook de meertalige webshop, loyaliteits- en cadeaukaartsystemen, workshopboekingen, klantaccounts en beheertools op Supabase en PostgreSQL.'
    },
    'work.yaqeen.tagline': { en: 'Event ticketing & cultural commerce platform', nl: 'Ticketing- & commerceplatform voor culturele evenementen' },
    'work.yaqeen.desc': {
      en: 'Yaqeen is a bilingual event ticketing and commerce platform I helped build for a cultural organization, combining event discovery, ticket sales, QR-based check-in, an online shop, reviews, partner applications, and administration tools. My work focused on production hardening and core workflows, including offline-capable ticket scanning, server-authoritative coupon pricing, secure transactional emails, protected media delivery, and integrations with both Stripe and Mollie.',
      nl: 'Yaqeen is een tweetalig ticketing- en commerceplatform voor evenementen waar ik aan heb meegewerkt voor een culturele organisatie, met evenementontdekking, ticketverkoop, QR-gebaseerde check-in, een webshop, reviews, partneraanvragen en beheertools. Mijn werk richtte zich op productiehardening en kernworkflows, waaronder offline ticketscanning, server-gezaghebbende couponprijzen, beveiligde transactionele e-mails, beveiligde media-aflevering en integraties met zowel Stripe als Mollie.'
    },
    'work.luchtleven.tagline': { en: 'Privacy-First Personal Finance PWA', nl: 'Privacyvriendelijke PWA voor persoonlijke financiën' },
    'work.luchtleven.desc': {
      en: 'LuchtLeven is a privacy-first personal finance PWA I developed for multilingual, manual-first budgeting. The app combines transactions, category budgets, savings goals, recurring expenses, multi-currency accounts, and financial insights in an installable offline-capable experience. My work focused on the core product and production hardening, including flexible salary-cycle budgeting, robust CSV/JSON imports, consistent currency conversion, Arabic RTL support, AI-assisted insights, and per-user data security with Supabase.',
      nl: 'LuchtLeven is een privacyvriendelijke PWA voor persoonlijke financiën die ik ontwikkelde voor meertalig, handmatig gericht budgetteren. De app combineert transacties, categoriebudgetten, spaardoelen, terugkerende uitgaven, multi-valuta rekeningen en financiële inzichten in een installeerbare, offline werkende ervaring. Mijn werk richtte zich op het kernproduct en productiehardening, waaronder flexibele salariscyclusbudgettering, robuuste CSV/JSON-imports, consistente valutaconversie, Arabische RTL-ondersteuning, AI-ondersteunde inzichten en gebruikersgebonden gegevensbeveiliging met Supabase.'
    },
    'work.tuliptale.tagline': { en: 'Automated publishing & fulfillment platform', nl: 'Geautomatiseerd publicatie- & fulfillmentplatform' },
    'work.tuliptale.desc': {
      en: 'TulipTale is an automated publishing and fulfillment platform I built for personalized bilingual children\'s books. The system turns incoming Etsy orders into generated stories and illustrations, builds RTL/LTR-aware book layouts, routes every book through human approval, exports print-ready PDFs, and submits approved orders for printing and shipping. I designed the workflow around idempotent integrations, reliable retries, consistent character generation, and minimal manual operation.',
      nl: 'TulipTale is een geautomatiseerd publicatie- en fulfillmentplatform dat ik heb gebouwd voor gepersonaliseerde tweetalige kinderboeken. Het systeem zet binnenkomende Etsy-bestellingen om in gegenereerde verhalen en illustraties, bouwt RTL/LTR-bewuste boeklay-outs, stuurt elk boek door menselijke goedkeuring, exporteert printklare PDF\'s en dient goedgekeurde bestellingen in voor printen en verzending. Ik ontwierp de workflow rond idempotente integraties, betrouwbare herhalingen, consistente karaktergeneratie en minimale handmatige handelingen.'
    },

    'skills.label': { en: 'SKILLS', nl: 'VAARDIGHEDEN' },
    'skills.heading': { en: 'My technical skills & tools', nl: 'Mijn technische vaardigheden & tools' },
    'skills.languages.heading': { en: 'Programming languages', nl: 'Programmeertalen' },
    'skills.level.advanced': { en: 'Advanced', nl: 'Gevorderd' },
    'skills.level.intermediate': { en: 'Intermediate', nl: 'Gemiddeld' },
    'skills.devtools.heading': { en: 'Development tools', nl: 'Ontwikkeltools' },
    'skills.other.heading': { en: 'Other skills', nl: 'Overige vaardigheden' },
    'skills.other.networking': { en: 'Networking & Troubleshooting', nl: 'Netwerken & Probleemoplossing' },
    'skills.other.rest': { en: 'REST APIs, Authentication, Serverless Functions', nl: "REST API's, Authenticatie, Serverless Functions" },
    'skills.other.responsive': { en: 'Responsive Web Design, SEO, Performance Optimization', nl: 'Responsive webdesign, SEO, prestatie-optimalisatie' },
    'skills.other.testing': { en: 'E2E Testing, Analytics, Email Integrations, i18n/Localization', nl: 'E2E-testen, analytics, e-mailintegraties, i18n/lokalisatie' },
    'skills.qualities.heading': { en: 'Professional qualities', nl: 'Professionele kwaliteiten' },
    'skills.quality.logical': { en: 'Logical Thinking', nl: 'Logisch denken' },
    'skills.quality.problem': { en: 'Problem Solving', nl: 'Probleemoplossend vermogen' },
    'skills.quality.creativity': { en: 'Creativity', nl: 'Creativiteit' },
    'skills.quality.learning': { en: 'Learning Oriented', nl: 'Leergericht' },
    'skills.quality.teamwork': { en: 'Teamwork', nl: 'Teamwork' },
    'skills.quality.selfmotivated': { en: 'Self-Motivated', nl: 'Zelfgemotiveerd' },
    'skills.quality.detail': { en: 'Detail-Oriented', nl: 'Detailgericht' },
    'skills.quality.adaptable': { en: 'Adaptable', nl: 'Aanpasbaar' },
    'skills.quality.product': { en: 'Product-Minded', nl: 'Productgericht' },
    'skills.quality.independent': { en: 'Independent', nl: 'Zelfstandig' },
    'skills.quality.results': { en: 'Results-Driven', nl: 'Resultaatgericht' },
    'skills.quality.ownership': { en: 'Strong Ownership', nl: 'Sterk verantwoordelijkheidsgevoel' },

    'about.label': { en: 'ABOUT', nl: 'OVER MIJ' },
    'about.heading': { en: 'My education & experience', nl: 'Mijn opleiding & ervaring' },
    'about.education.heading': { en: 'Education', nl: 'Opleiding' },
    'about.experience.heading': { en: 'Experience', nl: 'Werkervaring' },
    'about.edu1.desc': {
      en: 'Completed Software Development program, focusing on programming, web development, and software engineering principles.',
      nl: 'Software Development opleiding afgerond, met focus op programmeren, webontwikkeling en software engineering principes.'
    },
    'about.edu2.desc': {
      en: 'Completed ICT Support program with focus on technical problem-solving, system maintenance, and customer support skills.',
      nl: 'ICT Support opleiding afgerond met focus op technische probleemoplossing, systeembeheer en klantenservice vaardigheden.'
    },
    'about.edu3.desc': {
      en: 'Completed practical education focusing on foundational skills and work-oriented learning.',
      nl: 'Praktijkonderwijs afgerond, gericht op basisvaardigheden en werkgericht leren.'
    },
    'about.edu4.desc': {
      en: 'Completed International Transition Class program.',
      nl: 'Internationale Schakelklas (ISK) afgerond.'
    },
    'about.exp1.desc': {
      en: '• Designing UI/UX for 360Models, a 3D asset management and configurator platform<br>• Designing dashboards for organizations, users and product configurators',
      nl: '• UI/UX ontwerpen voor 360Models, een 3D-assetbeheer- en configuratorplatform<br>• Dashboards ontwerpen voor organisaties, gebruikers en productconfiguratoren'
    },
    'about.exp2.desc': {
      en: '• Solving technical problems via Topdesk<br>• Supporting users with laptop and software issues<br>• Improving customer and communication skills',
      nl: '• Technische problemen oplossen via Topdesk<br>• Gebruikers ondersteunen bij laptop- en softwareproblemen<br>• Klantgerichtheid en communicatieve vaardigheden verbeteren'
    },
    'about.exp3.desc': {
      en: '• Managing school agenda and appointments<br>• Welcoming visitors and providing administrative support',
      nl: '• Schoolagenda en afspraken beheren<br>• Bezoekers ontvangen en administratieve ondersteuning bieden'
    },
    'about.exp4.desc': {
      en: '• Customer service and inventory management<br>• Responsible for product restocking and inventory',
      nl: '• Klantenservice en voorraadbeheer<br>• Verantwoordelijk voor het aanvullen van producten en voorraad'
    },
    'about.exp5.desc': {
      en: '• Efficient service and hygiene management<br>• Customer service and team collaboration',
      nl: '• Efficiënte service en hygiënebeheer<br>• Klantenservice en samenwerking in teamverband'
    },

    'cv.heading': { en: 'My resume', nl: 'Mijn cv' },
    'cv.lead': {
      en: 'Take a look at my full CV for a detailed overview of my education, experience, and skills.',
      nl: 'Bekijk mijn volledige cv voor een gedetailleerd overzicht van mijn opleiding, ervaring en vaardigheden.'
    },
    'cv.open': { en: 'Open my CV', nl: 'Open mijn cv' },
    'cv.download': { en: 'Download CV', nl: 'Download cv' },

    'contact.heading': { en: "Interested in working together? Let's talk", nl: 'Interesse in samenwerken? Laten we praten' },
    'contact.name.placeholder': { en: 'Enter your name', nl: 'Vul je naam in' },
    'contact.email.placeholder': { en: 'Enter your email', nl: 'Vul je e-mailadres in' },
    'contact.subject.placeholder': { en: 'Enter subject', nl: 'Vul onderwerp in' },
    'contact.message.placeholder': { en: 'Enter your message', nl: 'Typ je bericht' },
    'contact.send': { en: 'Send message', nl: 'Bericht verzenden' },
    'contact.success': {
      en: 'Thank you for your message! I will get back to you soon.',
      nl: 'Bedankt voor je bericht! Ik neem snel contact met je op.'
    },
    'contact.error': {
      en: 'Something went wrong. Please try again.',
      nl: 'Er is iets misgegaan. Probeer het opnieuw.'
    },

    'footer.designedBy': { en: 'Designed by', nl: 'Ontworpen door' },
    'footer.emailAria': { en: 'Email', nl: 'E-mail' }
  };

  var currentLang = 'nl';

  function translate(key, lang) {
    var entry = translations[key];
    if (!entry) return null;
    return entry[lang] || entry.en || null;
  }

  function applyLanguage(lang) {
    if (lang !== 'en' && lang !== 'nl') lang = 'nl';
    currentLang = lang;

    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var value = translate(el.getAttribute('data-i18n'), lang);
      if (value !== null) el.textContent = value;
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var value = translate(el.getAttribute('data-i18n-html'), lang);
      if (value !== null) el.innerHTML = value;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var value = translate(el.getAttribute('data-i18n-placeholder'), lang);
      if (value !== null) el.setAttribute('placeholder', value);
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var value = translate(el.getAttribute('data-i18n-aria'), lang);
      if (value !== null) el.setAttribute('aria-label', value);
    });

    document.querySelectorAll('[data-i18n-content]').forEach(function (el) {
      var value = translate(el.getAttribute('data-i18n-content'), lang);
      if (value !== null) el.setAttribute('content', value);
    });

    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      var isActive = btn.getAttribute('data-lang-btn') === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* localStorage unavailable (private mode, etc.) - ignore */
    }
  }

  window.t = function (key) {
    return translate(key, currentLang) || key;
  };

  document.addEventListener('DOMContentLoaded', function () {
    var savedLang = null;
    try {
      savedLang = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      /* localStorage unavailable - ignore */
    }

    applyLanguage(savedLang || 'nl');

    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLanguage(btn.getAttribute('data-lang-btn'));
      });
    });
  });
})();
