const fs = require('fs');
const path = require('path');

const TOOLS = [
  { slug: 'word-counter', title: 'Word Counter', category: 'Text Tools', category_slug: 'text', icon: 'fas fa-font', description: 'Count words, characters, sentences and paragraphs instantly.', keywords: 'word counter, character counter, sentence count' },
  { slug: 'password-generator', title: 'Password Generator', category: 'Security Tools', category_slug: 'security', icon: 'fas fa-key', description: 'Generate secure random passwords with one click.', keywords: 'password generator, random password, secure password' },
  { slug: 'json-formatter', title: 'JSON Formatter', category: 'Developer Tools', category_slug: 'developer', icon: 'fas fa-code', description: 'Pretty-print and validate JSON instantly in your browser.', keywords: 'json formatter, json validate, beautify json' },
  { slug: 'base64-encoder', title: 'Base64 Encoder/Decoder', category: 'Developer Tools', category_slug: 'developer', icon: 'fas fa-binary', description: 'Encode and decode text to and from Base64 format.', keywords: 'base64 encoder, decode base64, encode base64' },
  { slug: 'uuid-generator', title: 'UUID Generator', category: 'Developer Tools', category_slug: 'developer', icon: 'fas fa-id-badge', description: 'Generate RFC4122 compliant UUIDv4 identifiers.', keywords: 'uuid generator, unique id, guid generator' },
  { slug: 'image-compressor', title: 'Image Compressor', category: 'Image Tools', category_slug: 'image', icon: 'fas fa-file-image', description: 'Compress images in browser to reduce file size and load time.', keywords: 'image compressor, optimize image, jpg png compress' },
  { slug: 'image-resizer', title: 'Image Resizer', category: 'Image Tools', category_slug: 'image', icon: 'fas fa-expand-arrows-alt', description: 'Resize images using width and height settings instantly.', keywords: 'image resizer, resize image, image scale' },
  { slug: 'age-calculator', title: 'Age Calculator', category: 'Utility Tools', category_slug: 'utility', icon: 'fas fa-calendar-alt', description: 'Calculate age quickly from date of birth.', keywords: 'age calculator, date of birth age' },
  { slug: 'unit-converter', title: 'Unit Converter', category: 'Converters', category_slug: 'converters', icon: 'fas fa-exchange-alt', description: 'Convert between common units (length, mass, temperature).', keywords: 'unit converter, length converter, weight converter' },
  { slug: 'lorem-generator', title: 'Lorem Ipsum Generator', category: 'Generators', category_slug: 'generators', icon: 'fas fa-paragraph', description: 'Generate placeholder lorem ipsum text for layouts.', keywords: 'lorem ipsum generator, placeholder text' }
];

const CATEGORIES = [
  { name: 'Text Tools', slug: 'text' },
  { name: 'Image Tools', slug: 'image' },
  { name: 'Developer Tools', slug: 'developer' },
  { name: 'Converters', slug: 'converters' },
  { name: 'Generators', slug: 'generators' },
  { name: 'Security Tools', slug: 'security' },
  { name: 'Utility Tools', slug: 'utility' }
];

const rootUrl = 'https://mtool1.github.io';

function generateMeta(title, description, canonical, base = '') {
  const prefix = base ? '../' : '';
  const pagePath = base ? `tools/${base}.html` : '';
  
  return `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} - MegaTools</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonical}">
  
  <!-- Multilingual Hreflang Tags -->
  <link rel="alternate" hreflang="en" href="${rootUrl}/${pagePath}" />
  <link rel="alternate" hreflang="hi" href="${rootUrl}/${pagePath}?lang=hi" />
  <link rel="alternate" hreflang="es" href="${rootUrl}/${pagePath}?lang=es" />
  <link rel="alternate" hreflang="x-default" href="${rootUrl}/${pagePath}" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${prefix}icons/og-image.png">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${prefix}icons/og-image.png">
  
  <link rel="icon" href="${prefix}icons/icon-192.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="${prefix}icons/icon-192.svg">
  <link rel="manifest" href="${prefix}manifest.json">
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="${prefix}css/style.css">`;
}

function generateJSONLD(title, description, url, type = 'SoftwareApplication', tool = null) {
  let schema = {
    "@context": "https://schema.org",
    "@type": type,
    "name": title,
    "description": description,
    "url": url,
    "applicationCategory": tool ? tool.category : "Utility",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "MegaTools"
    }
  };

  if (tool) {
    schema["featureList"] = tool.keywords;
  }

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function generateNavbar(base = '') {
  const prefix = base ? '../' : '';
  return `
  <nav class="navbar">
    <div class="nav-container">
      <a href="${prefix}index.html" class="brand">
        <span class="brand-accent"><i class="fas fa-tools"></i></span> MegaTools
      </a>
      <div class="nav-links">
        <a href="${prefix}index.html" class="nav-link" data-i18n="nav_home">Home</a>
        <a href="${prefix}about.html" class="nav-link" data-i18n="nav_about">About</a>
        <a href="${prefix}contact.html" class="nav-link" data-i18n="nav_contact">Contact</a>
      </div>
      <div class="nav-actions">
        <div class="nav-search">
          <i class="fas fa-search"></i>
          <input type="search" data-search-input placeholder="Search tools..." data-i18n-placeholder="search_placeholder">
        </div>
        <select data-language-select aria-label="Select language" class="btn btn-outline">
          <option value="en">EN</option>
          <option value="hi">HI</option>
          <option value="es">ES</option>
        </select>
        <button class="btn btn-outline" data-theme-toggle aria-label="Toggle dark mode">
          <i class="fas fa-moon"></i>
        </button>
      </div>
    </div>
  </nav>`;
}

function generateFooter(base = '') {
  const prefix = base ? '../' : '';
  return `
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-col">
        <a href="${prefix}index.html" class="brand mb-4">
          <span class="brand-accent"><i class="fas fa-tools"></i></span> MegaTools
        </a>
        <p class="text-muted" data-i18n="footer_about">The ultimate collection of 200+ browser-based tools for modern professionals. Fast, secure, and privacy-first.</p>
      </div>
      <div class="footer-col">
        <h4 data-i18n="footer_links">Quick Links</h4>
        <div class="footer-links">
          <a href="${prefix}index.html" class="footer-link" data-i18n="nav_home">Home</a>
          <a href="${prefix}about.html" class="footer-link" data-i18n="nav_about">About</a>
          <a href="${prefix}privacy.html" class="footer-link" data-i18n="nav_privacy">Privacy Policy</a>
          <a href="${prefix}contact.html" class="footer-link" data-i18n="nav_contact">Contact</a>
        </div>
      </div>
      <div class="footer-col">
        <h4 data-i18n="footer_categories">Categories</h4>
        <div class="footer-links">
          <a href="${prefix}category-text-tools.html" class="footer-link" data-i18n="cat_text">Text Tools</a>
          <a href="${prefix}category-image-tools.html" class="footer-link" data-i18n="cat_image">Image Tools</a>
          <a href="${prefix}category-developer-tools.html" class="footer-link" data-i18n="cat_dev">Developer Tools</a>
          <a href="${prefix}category-security-tools.html" class="footer-link" data-i18n="cat_sec">Security Tools</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 MegaTools. <span data-i18n="footer_rights">All rights reserved.</span></p>
      <div class="flex gap-4">
        <a href="#" class="footer-link"><i class="fab fa-twitter"></i></a>
        <a href="#" class="footer-link"><i class="fab fa-github"></i></a>
      </div>
    </div>
  </footer>`;
}

function pageTemplate(title, description, canonical, content, base = '', tool = null) {
  const prefix = base ? '../' : '';
  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  ${generateMeta(title, description, canonical, base)}
  ${generateJSONLD(title, description, canonical, tool ? 'SoftwareApplication' : 'WebPage', tool)}
</head>
<body>
  ${generateNavbar(base)}
  <main class="main-content">
    ${content}
  </main>
  ${generateFooter(base)}
  <script src="${prefix}js/site-data.js"></script>
  <script src="${prefix}js/i18n.js"></script>
  <script src="${prefix}js/main.js"></script>
  ${base ? `<script src="${prefix}js/tools/${base}.js"></script>` : ''}
</body>
</html>`;
}

function generateLongSeoText(tool) {
  let text = `
  <section class="mt-8 pt-8 border-t">
    <h2>Complete Guide to Using ${tool.title} Online</h2>
    <p>${tool.title} is a professional-grade, high-performance online utility specifically designed to ${tool.description.toLowerCase()} Our platform provides a seamless experience for developers, content creators, and digital marketers worldwide who need reliable browser-based tools without the overhead of heavy software installations.</p>
    
    <h3 class="mt-4">Why our ${tool.title} is the Best Choice for You</h3>
    <p>In today's fast-paced digital environment, speed and privacy are paramount. Our ${tool.title} is built using advanced client-side technologies, meaning all computations are performed directly in your browser. Your sensitive data never travels across the internet to reach a server, providing an unparalleled level of security. Whether you are working on sensitive code snippets, private documents, or corporate assets, our tool ensures your information stays where it belongs—on your machine.</p>
    
    <h4 class="mt-4">Key Features and Benefits:</h4>
    <ul>
      <li><strong>Maximum Privacy & Security:</strong> Zero data transmission. All operations occur locally within your browser's sandbox environment.</li>
      <li><strong>Industry-Leading Performance:</strong> Optimized JavaScript algorithms ensure that even complex tasks like image compression or large-scale text analysis are completed in milliseconds.</li>
      <li><strong>Universal Compatibility:</strong> Fully responsive design that works flawlessly on any device, from high-end workstations to mobile smartphones.</li>
      <li><strong>Multilingual Interface:</strong> Support for English, Hindi, and Spanish, making it accessible to a global audience.</li>
      <li><strong>100% Free Forever:</strong> No hidden costs, no premium tiers, and no account creation required for any of our 200+ tools.</li>
    </ul>

    <h3 class="mt-4">How to Use the ${tool.title} Effectively</h3>
    <p>Using our tool is straightforward and intuitive. Simply input your data into the provided fields above, and our real-time engine will process it instantly. For developer tools like the JSON Formatter or Base64 Encoder, you'll see formatted results immediately as you type. For image-based utilities, simply drag and drop your files to see instant previews of the optimized results.</p>
    
    <h3 class="mt-4">Frequently Asked Questions (FAQ)</h3>
    <div class="faq mt-2">
      <details class="mb-4 p-4 border rounded">
        <summary class="font-bold cursor-pointer">Is this ${tool.title} really free to use?</summary>
        <p class="mt-2 text-muted">Yes, MegaTools provides all its utilities, including the ${tool.title}, completely free of charge. There are no daily limits, no watermarks, and no registration required.</p>
      </details>
      <details class="mb-4 p-4 border rounded">
        <summary class="font-bold cursor-pointer">Does my data get stored on your servers?</summary>
        <p class="mt-2 text-muted">Absolutely not. We take privacy seriously. Our architecture is designed so that all processing happens locally in your browser. We do not have access to your data, and we do not store any information you input into the tools.</p>
      </details>
      <details class="mb-4 p-4 border rounded">
        <summary class="font-bold cursor-pointer">Can I use this tool on my mobile phone?</summary>
        <p class="mt-2 text-muted">Yes! MegaTools is fully responsive and mobile-friendly. You can use the ${tool.title} on any smartphone or tablet with a modern web browser.</p>
      </details>
      <details class="mb-4 p-4 border rounded">
        <summary class="font-bold cursor-pointer">Do I need an internet connection to use the tool?</summary>
        <p class="mt-2 text-muted">You need an internet connection to load the page initially. However, once loaded, many of our tools can continue to function offline because they run entirely on your local device.</p>
      </details>
    </div>

    <h3 class="mt-8">The Future of Online Utilities</h3>
    <p>MegaTools is on a mission to provide 200+ essential browser-based tools for everyone. From basic text manipulation to advanced developer utilities and image processing, we are building a one-stop destination for digital productivity. Our commitment to open-source principles and privacy-first design sets us apart in the crowded landscape of online tools.</p>
    
    <p class="mt-4 text-sm text-muted">Related Keywords: ${tool.keywords}</p>
  </section>`;
  
  return text;
}

function buildToolPages() {
  TOOLS.forEach(tool => {
    const content = `
    <div class="tool-container fade-in">
      <div class="mb-8">
        <span class="tool-category">${tool.category}</span>
        <h1><i class="${tool.icon}"></i> ${tool.title}</h1>
        <p class="text-muted">${tool.description}</p>
      </div>
      
      <div id="tool-ui" class="tool-ui-wrapper">
        <div class="text-center py-12">
          <i class="fas fa-spinner fa-spin fa-3x text-primary mb-4"></i>
          <p class="text-muted">Initializing tool interface...</p>
        </div>
      </div>

      ${generateLongSeoText(tool)}
      
      <section class="mt-12 pt-8 border-t">
        <h3>Related Tools</h3>
        <div class="tool-grid mt-6">
          ${TOOLS.filter(t => t.slug !== tool.slug && t.category_slug === tool.category_slug)
            .slice(0, 3)
            .map(t => `
              <div class="tool-card">
                <a href="${t.slug}.html" class="card-link">
                  <span class="tool-category">${t.category}</span>
                  <h3 style="font-size: 1.1rem; margin-top: 0.5rem;"><i class="${t.icon}"></i> ${t.title}</h3>
                </a>
              </div>
            `).join('')}
        </div>
      </section>
    </div>`;
    
    const page = pageTemplate(tool.title, tool.description, `${rootUrl}/tools/${tool.slug}.html`, content, tool.slug, tool);
    fs.writeFileSync(path.join(__dirname, '..', 'tools', `${tool.slug}.html`), page, 'utf8');
  });
}

function buildCategoryPages() {
  CATEGORIES.forEach(cat => {
    const filtered = TOOLS.filter(t => t.category_slug === cat.slug);
    const content = `
    <div class="fade-in">
      <div class="text-center mb-12">
        <h1 style="font-size: 3rem;">${cat.name}</h1>
        <p class="text-muted" style="font-size: 1.25rem;">Browse our collection of professional ${cat.name.toLowerCase()} for your daily workflow.</p>
      </div>
      <div class="tool-grid">
        ${filtered.map(tool => `
          <div class="tool-card">
            <a href="tools/${tool.slug}.html" class="card-link">
              <span class="tool-category">${tool.category}</span>
              <h3 style="margin-top: 0.5rem;"><i class="${tool.icon}"></i> ${tool.title}</h3>
              <p>${tool.description}</p>
            </a>
          </div>
        `).join('')}
      </div>
    </div>`;
    
    const filename = `category-${cat.slug}-tools.html`;
    const page = pageTemplate(cat.name, `Explore our free ${cat.name} and online utilities.`, `${rootUrl}/${filename}`, content);
    fs.writeFileSync(path.join(__dirname, '..', filename), page, 'utf8');
  });
}

function buildStaticPages() {
  const pages = [
    { slug: 'about', title: 'About MegaTools', content: '<h1>About MegaTools</h1><p>MegaTools is the ultimate collection of 200+ free, fast, and secure online tools designed to help professionals, developers, and students with their daily tasks.</p><p>Our mission is to provide the most accessible and private tool suite on the web. Every tool we build runs entirely in your browser, ensuring that your data stays with you.</p>' },
    { slug: 'privacy', title: 'Privacy Policy', content: '<h1>Privacy Policy</h1><p>Your privacy is our priority. MegaTools is designed to be privacy-first. All processing is done locally in your browser using JavaScript. We do not store, collect, or transmit any of your personal data or tool inputs to our servers.</p>' },
    { slug: 'contact', title: 'Contact Us', content: '<h1>Contact Us</h1><p>Have a question, feedback, or a tool request? We would love to hear from you. Reach out to us at support@megafreetools.com</p>' }
  ];

  pages.forEach(p => {
    const page = pageTemplate(p.title, `${p.title} - Free Professional Online Tools`, `${rootUrl}/${p.slug}.html`, `<div class="tool-container fade-in">${p.content}</div>`);
    fs.writeFileSync(path.join(__dirname, '..', `${p.slug}.html`), page, 'utf8');
  });
}

function buildHome() {
  const featuredTools = TOOLS.slice(0, 6);
  const content = `
    <section class="hero">
      <div class="hero-container fade-in">
        <h1 data-i18n="hero_title">200+ Free Professional Browser Tools</h1>
        <p data-i18n="hero_subtitle">Fast, privacy-first tool suite for developers, creators, and marketers. All tools run 100% in your browser.</p>
        <div class="nav-search" style="display: block; max-width: 600px; margin: 2rem auto 0;">
          <i class="fas fa-search" style="left: 1.5rem;"></i>
          <input type="search" data-search-input placeholder="Find the right tool (e.g., word counter, password generator...)" style="width: 100%; padding: 1.25rem 1.25rem 1.25rem 3.5rem; font-size: 1.1rem; border-radius: 999px;">
        </div>
      </div>
    </section>

    <div class="main-content">
      <div class="categories fade-in">
        <button class="category-pill active" data-category="all" data-i18n="cat_all">All Tools</button>
        ${CATEGORIES.map(cat => `<button class="category-pill" data-category="${cat.slug}">${cat.name}</button>`).join('\n')}
      </div>

      <div class="tool-grid" data-tools-list>
        <!-- Tools will be injected here by JS -->
      </div>

      <section class="mt-12 pt-12 border-t text-center fade-in">
        <h2 style="font-size: 2.5rem;" data-i18n="seo_title">Why Use MegaTools?</h2>
        <div class="grid mt-8" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; text-align: left;">
          <div class="p-6 border rounded-lg">
            <h3 class="text-primary mb-2"><i class="fas fa-shield-alt"></i> <span data-i18n="feature_privacy_title">Privacy-First</span></h3>
            <p class="text-muted" data-i18n="feature_privacy_desc">All tools run entirely in your browser. Your data never leaves your device, ensuring 100% privacy and security.</p>
          </div>
          <div class="p-6 border rounded-lg">
            <h3 class="text-primary mb-2"><i class="fas fa-bolt"></i> <span data-i18n="feature_speed_title">Blazing Fast</span></h3>
            <p class="text-muted" data-i18n="feature_speed_desc">Built with optimized JavaScript for instant results. No page reloads or server delays.</p>
          </div>
          <div class="p-6 border rounded-lg">
            <h3 class="text-primary mb-2"><i class="fas fa-globe"></i> <span data-i18n="feature_global_title">Global Support</span></h3>
            <p class="text-muted" data-i18n="feature_global_desc">Available in English, Hindi, and Spanish to serve users worldwide.</p>
          </div>
        </div>
      </section>
    </div>`;

  const page = pageTemplate('MegaTools - 200+ Professional Online Browser Tools', 'Access 200+ fast, private, and free online browser tools. Word counter, password generator, JSON formatter, image tools, and more.', rootUrl, content);
  fs.writeFileSync(path.join(__dirname, '..', 'index.html'), page, 'utf8');
}

// Execute build
console.log('Building pages with advanced SEO...');
buildToolPages();
buildCategoryPages();
buildStaticPages();
buildHome();
console.log('Build complete! All pages are now optimized for global ranking.');
