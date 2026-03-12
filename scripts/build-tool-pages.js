const fs = require('fs');
const path = require('path');

const TOOLS = [
  // --- Text Tools (1-20) ---
  { slug: 'word-counter', title: 'Word Counter', category: 'Text Tools', category_slug: 'text', icon: 'fas fa-font', description: 'Count words, characters, sentences and paragraphs instantly.', keywords: 'word counter, character counter, sentence count' },
  { slug: 'case-converter', title: 'Case Converter', category: 'Text Tools', category_slug: 'text', icon: 'fas fa-exchange-alt', description: 'Convert text between UPPERCASE, lowercase, Title Case, and more.', keywords: 'case converter, upper to lower, title case' },
  { slug: 'remove-duplicate-lines', title: 'Remove Duplicate Lines', category: 'Text Tools', category_slug: 'text', icon: 'fas fa-clone', description: 'Clean your lists by removing all duplicate lines.', keywords: 'remove duplicates, clean list, deduplicate' },
  { slug: 'text-reverser', title: 'Text Reverser', category: 'Text Tools', category_slug: 'text', icon: 'fas fa-backward', description: 'Flip your text backwards or reverse the order of lines.', keywords: 'reverse text, mirror text, reverse lines' },
  { slug: 'upsidedown-text', title: 'Upside Down Text', category: 'Text Tools', category_slug: 'text', icon: 'fas fa-level-down-alt', description: 'Flip your text upside down for social media and fun.', keywords: 'upside down text, flip text, rotate text' },
  { slug: 'morse-code-translator', title: 'Morse Code Translator', category: 'Text Tools', category_slug: 'text', icon: 'fas fa-ellipsis-h', description: 'Convert text to morse code and decode it back to text.', keywords: 'morse code, text to morse, morse decoder' },
  { slug: 'binary-to-text', title: 'Binary to Text', category: 'Text Tools', category_slug: 'text', icon: 'fas fa-01', description: 'Convert binary code (0101) into readable text.', keywords: 'binary to text, decode binary' },
  { slug: 'text-to-binary', title: 'Text to Binary', category: 'Text Tools', category_slug: 'text', icon: 'fas fa-01', description: 'Convert any text into its binary representation.', keywords: 'text to binary, encode binary' },
  { slug: 'remove-line-breaks', title: 'Remove Line Breaks', category: 'Text Tools', category_slug: 'text', icon: 'fas fa-align-left', description: 'Convert multi-line text into a single paragraph by removing breaks.', keywords: 'remove line breaks, text cleaner' },
  { slug: 'slug-generator', title: 'URL Slug Generator', category: 'Text Tools', category_slug: 'text', icon: 'fas fa-link', description: 'Convert text into SEO-friendly URL slugs.', keywords: 'slug generator, url slug, seo slug' },
  { slug: 'line-counter', title: 'Line Counter', category: 'Text Tools', category_slug: 'text', icon: 'fas fa-list-ol', description: 'Count the number of lines in your text block.', keywords: 'line counter, count lines' },
  { slug: 'sort-text-lines', title: 'Sort Text Lines', category: 'Text Tools', category_slug: 'text', icon: 'fas fa-sort-alpha-down', description: 'Sort lines of text alphabetically or numerically.', keywords: 'sort text, alphabetical sort, sort lines' },
  { slug: 'lorem-generator', title: 'Lorem Ipsum Generator', category: 'Text Tools', category_slug: 'text', icon: 'fas fa-paragraph', description: 'Generate placeholder lorem ipsum text for layouts.', keywords: 'lorem ipsum, placeholder text' },
  { slug: 'text-to-image', title: 'Text to Image', category: 'Text Tools', category_slug: 'text', icon: 'fas fa-image', description: 'Convert text snippets into high-quality images.', keywords: 'text to image, code snippet image' },
  { slug: 'markdown-to-html', title: 'Markdown to HTML', category: 'Text Tools', category_slug: 'text', icon: 'fab fa-markdown', description: 'Convert markdown syntax into clean HTML code.', keywords: 'markdown to html, md to html' },
  { slug: 'html-to-markdown', title: 'HTML to Markdown', category: 'Text Tools', category_slug: 'text', icon: 'fab fa-html5', description: 'Convert HTML source code back into simple Markdown.', keywords: 'html to markdown, html to md' },
  { slug: 'text-repeater', title: 'Text Repeater', category: 'Text Tools', category_slug: 'text', icon: 'fas fa-redo', description: 'Repeat a text string as many times as you want.', keywords: 'text repeater, repeat string' },
  { slug: 'add-line-numbers', title: 'Add Line Numbers', category: 'Text Tools', category_slug: 'text', icon: 'fas fa-list-ol', description: 'Add sequential line numbers to your text block.', keywords: 'add line numbers, line numbering' },
  { slug: 'text-replacer', title: 'Find & Replace', category: 'Text Tools', category_slug: 'text', icon: 'fas fa-search-plus', description: 'Find and replace words or patterns in your text.', keywords: 'find and replace, text replace' },
  { slug: 'remove-white-spaces', title: 'Remove White Spaces', category: 'Text Tools', category_slug: 'text', icon: 'fas fa-eraser', description: 'Remove extra spaces, tabs, and indentation from text.', keywords: 'remove spaces, trim text' },

  // --- Developer Tools (21-45) ---
  { slug: 'json-formatter', title: 'JSON Formatter', category: 'Developer Tools', category_slug: 'developer', icon: 'fas fa-code', description: 'Pretty-print and validate JSON instantly in your browser.', keywords: 'json formatter, json validate, beautify json' },
  { slug: 'base64-encoder', title: 'Base64 Encoder/Decoder', category: 'Developer Tools', category_slug: 'developer', icon: 'fas fa-binary', description: 'Encode and decode text to and from Base64 format.', keywords: 'base64 encoder, decode base64, encode base64' },
  { slug: 'uuid-generator', title: 'UUID Generator', category: 'Developer Tools', category_slug: 'developer', icon: 'fas fa-id-badge', description: 'Generate RFC4122 compliant UUIDv4 identifiers.', keywords: 'uuid generator, unique id, guid generator' },
  { slug: 'html-formatter', title: 'HTML Formatter', category: 'Developer Tools', category_slug: 'developer', icon: 'fas fa-file-code', description: 'Beautify and format your HTML code for readability.', keywords: 'html formatter, beautify html' },
  { slug: 'css-formatter', title: 'CSS Formatter', category: 'Developer Tools', category_slug: 'developer', icon: 'fab fa-css3', description: 'Format and prettify your CSS stylesheets.', keywords: 'css formatter, beautify css' },
  { slug: 'js-formatter', title: 'JavaScript Formatter', category: 'Developer Tools', category_slug: 'developer', icon: 'fab fa-js', description: 'Format and beautify your JavaScript code snippets.', keywords: 'js formatter, beautify js' },
  { slug: 'xml-formatter', title: 'XML Formatter', category: 'Developer Tools', category_slug: 'developer', icon: 'fas fa-file-excel', description: 'Format and validate your XML data instantly.', keywords: 'xml formatter, beautify xml' },
  { slug: 'sql-formatter', title: 'SQL Formatter', category: 'Developer Tools', category_slug: 'developer', icon: 'fas fa-database', description: 'Pretty-print and format your SQL queries.', keywords: 'sql formatter, beautify sql' },
  { slug: 'yaml-to-json', title: 'YAML to JSON', category: 'Developer Tools', category_slug: 'developer', icon: 'fas fa-file-alt', description: 'Convert YAML configuration files into JSON format.', keywords: 'yaml to json, yml to json' },
  { slug: 'json-to-yaml', title: 'JSON to YAML', category: 'Developer Tools', category_slug: 'developer', icon: 'fas fa-file-code', description: 'Convert JSON data into clean YAML syntax.', keywords: 'json to yaml, json to yml' },
  { slug: 'json-to-csv', title: 'JSON to CSV', category: 'Developer Tools', category_slug: 'developer', icon: 'fas fa-file-csv', description: 'Convert JSON arrays into downloadable CSV files.', keywords: 'json to csv, json to excel' },
  { slug: 'csv-to-json', title: 'CSV to JSON', category: 'Developer Tools', category_slug: 'developer', icon: 'fas fa-file-csv', description: 'Convert CSV data into JSON arrays and objects.', keywords: 'csv to json, excel to json' },
  { slug: 'url-encoder-decoder', title: 'URL Encoder/Decoder', category: 'Developer Tools', category_slug: 'developer', icon: 'fas fa-link', description: 'Safely encode or decode URL parameters.', keywords: 'url encode, url decode' },
  { slug: 'html-entities', title: 'HTML Entities', category: 'Developer Tools', category_slug: 'developer', icon: 'fas fa-code', description: 'Encode or decode special characters to HTML entities.', keywords: 'html entities, encode html' },
  { slug: 'jwt-decoder', title: 'JWT Decoder', category: 'Developer Tools', category_slug: 'developer', icon: 'fas fa-user-shield', description: 'Decode and inspect JSON Web Tokens (JWT) payload.', keywords: 'jwt decoder, inspect jwt' },
  { slug: 'crontab-generator', title: 'Cron Expression Generator', category: 'Developer Tools', category_slug: 'developer', icon: 'fas fa-clock', description: 'Generate cron schedules for automated tasks.', keywords: 'cron generator, crontab, cron schedule' },
  { slug: 'regex-tester', title: 'Regex Tester', category: 'Developer Tools', category_slug: 'developer', icon: 'fas fa-search', description: 'Test and validate your Regular Expressions.', keywords: 'regex tester, test regex' },
  { slug: 'css-gradient-generator', title: 'CSS Gradient Generator', category: 'Developer Tools', category_slug: 'developer', icon: 'fas fa-palette', description: 'Create beautiful CSS gradients visually.', keywords: 'css gradient, gradient generator' },
  { slug: 'css-box-shadow', title: 'Box Shadow Generator', category: 'Developer Tools', category_slug: 'developer', icon: 'fas fa-layer-group', description: 'Generate CSS box-shadow properties visually.', keywords: 'box shadow, css shadow' },
  { slug: 'css-border-radius', title: 'Border Radius Generator', category: 'Developer Tools', category_slug: 'developer', icon: 'fas fa-vector-square', description: 'Create custom CSS border-radius shapes.', keywords: 'border radius, css rounded' },
  { slug: 'js-minifier', title: 'JS Minifier', category: 'Developer Tools', category_slug: 'developer', icon: 'fab fa-js-square', description: 'Compress and minify your JavaScript files.', keywords: 'js minifier, compress js' },
  { slug: 'css-minifier', title: 'CSS Minifier', category: 'Developer Tools', category_slug: 'developer', icon: 'fab fa-css3-alt', description: 'Compress and minify your CSS stylesheets.', keywords: 'css minifier, compress css' },
  { slug: 'html-minifier', title: 'HTML Minifier', category: 'Developer Tools', category_slug: 'developer', icon: 'fas fa-file-code', description: 'Compress and minify your HTML code.', keywords: 'html minifier, compress html' },
  { slug: 'color-picker', title: 'Color Picker', category: 'Developer Tools', category_slug: 'developer', icon: 'fas fa-eye-dropper', description: 'Pick and convert colors between HEX, RGB, and HSL.', keywords: 'color picker, hex picker, rgb picker' },

  // --- Security Tools (46-60) ---
  { slug: 'password-generator', title: 'Password Generator', category: 'Security Tools', category_slug: 'security', icon: 'fas fa-key', description: 'Generate secure random passwords with one click.', keywords: 'password generator, random password, secure password' },
  { slug: 'md5-hash', title: 'MD5 Hash Generator', category: 'Security Tools', category_slug: 'security', icon: 'fas fa-fingerprint', description: 'Generate MD5 cryptographic hashes from any string.', keywords: 'md5 hash, generate md5' },
  { slug: 'sha1-hash', title: 'SHA1 Hash Generator', category: 'Security Tools', category_slug: 'security', icon: 'fas fa-fingerprint', description: 'Generate secure SHA1 hashes for your data.', keywords: 'sha1 hash, generate sha1' },
  { slug: 'sha256-hash', title: 'SHA256 Hash Generator', category: 'Security Tools', category_slug: 'security', icon: 'fas fa-shield-alt', description: 'Generate high-security SHA256 hashes.', keywords: 'sha256 hash, sha256 generator' },
  { slug: 'sha512-hash', title: 'SHA512 Hash Generator', category: 'Security Tools', category_slug: 'security', icon: 'fas fa-shield-alt', description: 'Generate ultra-secure SHA512 hashes.', keywords: 'sha512 hash, sha512 generator' },
  { slug: 'htaccess-generator', title: '.htaccess Generator', category: 'Security Tools', category_slug: 'security', icon: 'fas fa-server', description: 'Generate .htaccess rules for Apache servers.', keywords: 'htaccess generator, apache config' },
  { slug: 'password-strength', title: 'Password Strength Checker', category: 'Security Tools', category_slug: 'security', icon: 'fas fa-tasks', description: 'Check how strong and secure your password is.', keywords: 'password checker, password strength' },
  { slug: 'aes-encryption', title: 'AES Encryption/Decryption', category: 'Security Tools', category_slug: 'security', icon: 'fas fa-lock', description: 'Encrypt and decrypt text using AES standard.', keywords: 'aes encryption, secure text' },

  // --- Image Tools (61-80) ---
  { slug: 'image-compressor', title: 'Image Compressor', category: 'Image Tools', category_slug: 'image', icon: 'fas fa-file-image', description: 'Compress images in browser to reduce file size.', keywords: 'image compressor, optimize image' },
  { slug: 'image-resizer', title: 'Image Resizer', category: 'Image Tools', category_slug: 'image', icon: 'fas fa-expand-arrows-alt', description: 'Resize images by width and height instantly.', keywords: 'image resizer, resize image' },
  { slug: 'hex-to-rgb', title: 'HEX to RGB Converter', category: 'Image Tools', category_slug: 'image', icon: 'fas fa-palette', description: 'Convert HEX color codes to RGB format.', keywords: 'hex to rgb, color converter' },
  { slug: 'rgb-to-hex', title: 'RGB to HEX Converter', category: 'Image Tools', category_slug: 'image', icon: 'fas fa-palette', description: 'Convert RGB color values to HEX codes.', keywords: 'rgb to hex, color converter' },
  { slug: 'image-to-base64', title: 'Image to Base64', category: 'Image Tools', category_slug: 'image', icon: 'fas fa-code', description: 'Convert images into Base64 data strings.', keywords: 'image to base64, data uri' },
  { slug: 'base64-to-image', title: 'Base64 to Image', category: 'Image Tools', category_slug: 'image', icon: 'fas fa-image', description: 'Decode Base64 strings back into viewable images.', keywords: 'base64 to image, decode image' },
  { slug: 'svg-to-png', title: 'SVG to PNG Converter', category: 'Image Tools', category_slug: 'image', icon: 'fas fa-file-export', description: 'Convert SVG vector files into PNG images.', keywords: 'svg to png, vector to image' },
  { slug: 'png-to-jpg', title: 'PNG to JPG Converter', category: 'Image Tools', category_slug: 'image', icon: 'fas fa-exchange-alt', description: 'Convert PNG images into JPG format.', keywords: 'png to jpg, image converter' },
  { slug: 'jpg-to-png', title: 'JPG to PNG Converter', category: 'Image Tools', category_slug: 'image', icon: 'fas fa-exchange-alt', description: 'Convert JPG images into PNG format.', keywords: 'jpg to png, image converter' },
  { slug: 'favicon-generator', title: 'Favicon Generator', category: 'Image Tools', category_slug: 'image', icon: 'fas fa-icons', description: 'Create favicons for your website from images.', keywords: 'favicon generator, web icon' },
  { slug: 'image-cropper', title: 'Image Cropper', category: 'Image Tools', category_slug: 'image', icon: 'fas fa-crop', description: 'Crop and trim your images visually.', keywords: 'crop image, image trim' },
  { slug: 'webp-to-jpg', title: 'WebP to JPG Converter', category: 'Image Tools', category_slug: 'image', icon: 'fas fa-file-image', description: 'Convert modern WebP images to JPG format.', keywords: 'webp to jpg, webp converter' },

  // --- Converters (81-100) ---
  { slug: 'unit-converter', title: 'Unit Converter', category: 'Converters', category_slug: 'converters', icon: 'fas fa-exchange-alt', description: 'Convert between length, weight, and temp units.', keywords: 'unit converter, length converter' },
  { slug: 'timestamp-converter', title: 'Unix Timestamp Converter', category: 'Converters', category_slug: 'converters', icon: 'fas fa-calendar-check', description: 'Convert Unix timestamps to human-readable dates.', keywords: 'unix timestamp, date converter' },
  { slug: 'roman-numerals', title: 'Roman Numerals Converter', category: 'Converters', category_slug: 'converters', icon: 'fas fa-hashtag', description: 'Convert numbers to Roman numerals and back.', keywords: 'roman numerals, number converter' },
  { slug: 'number-to-words', title: 'Number to Words', category: 'Converters', category_slug: 'converters', icon: 'fas fa-spell-check', description: 'Convert numbers into written words.', keywords: 'number to words, spell numbers' },
  { slug: 'binary-to-hex', title: 'Binary to Hex', category: 'Converters', category_slug: 'converters', icon: 'fas fa-01', description: 'Convert binary code into hexadecimal values.', keywords: 'binary to hex, hex converter' },
  { slug: 'hex-to-binary', title: 'Hex to Binary', category: 'Converters', category_slug: 'converters', icon: 'fas fa-01', description: 'Convert hexadecimal values into binary code.', keywords: 'hex to binary, binary converter' },
  { slug: 'decimal-to-binary', title: 'Decimal to Binary', category: 'Converters', category_slug: 'converters', icon: 'fas fa-01', description: 'Convert decimal numbers into binary strings.', keywords: 'decimal to binary' },
  { slug: 'binary-to-decimal', title: 'Binary to Decimal', category: 'Converters', category_slug: 'converters', icon: 'fas fa-01', description: 'Convert binary strings into decimal numbers.', keywords: 'binary to decimal' },
  { slug: 'time-converter', title: 'Time Converter', category: 'Converters', category_slug: 'converters', icon: 'fas fa-clock', description: 'Convert between hours, minutes, seconds, and more.', keywords: 'time converter, duration converter' },
  { slug: 'speed-converter', title: 'Speed Converter', category: 'Converters', category_slug: 'converters', icon: 'fas fa-tachometer-alt', description: 'Convert between km/h, mph, and knots.', keywords: 'speed converter, kmh to mph' },

  // --- Utility & Math (101-120) ---
  { slug: 'age-calculator', title: 'Age Calculator', category: 'Utility Tools', category_slug: 'utility', icon: 'fas fa-calendar-alt', description: 'Calculate exact age from date of birth.', keywords: 'age calculator, dob calculator' },
  { slug: 'percentage-calculator', title: 'Percentage Calculator', category: 'Utility Tools', category_slug: 'utility', icon: 'fas fa-percent', description: 'Calculate percentages, increases, and decreases.', keywords: 'percentage calculator, math tools' },
  { slug: 'bmi-calculator', title: 'BMI Calculator', category: 'Utility Tools', category_slug: 'utility', icon: 'fas fa-weight', description: 'Calculate your Body Mass Index (BMI) easily.', keywords: 'bmi calculator, health tools' },
  { slug: 'qr-code-generator', title: 'QR Code Generator', category: 'Generators', category_slug: 'generators', icon: 'fas fa-qrcode', description: 'Create custom QR codes for links and text.', keywords: 'qr code, create qr code' },
  { slug: 'barcode-generator', title: 'Barcode Generator', category: 'Generators', category_slug: 'generators', icon: 'fas fa-barcode', description: 'Generate standard barcodes for products.', keywords: 'barcode generator, create barcode' },
  { slug: 'random-name-generator', title: 'Random Name Generator', category: 'Generators', category_slug: 'generators', icon: 'fas fa-user-tag', description: 'Generate random names for characters or testing.', keywords: 'random name, name generator' },
  { slug: 'random-number-generator', title: 'Random Number Generator', category: 'Generators', category_slug: 'generators', icon: 'fas fa-random', description: 'Pick random numbers within any range.', keywords: 'random number, pick random' },
  { slug: 'dice-roller', title: 'Dice Roller', category: 'Generators', category_slug: 'generators', icon: 'fas fa-dice', description: 'Roll virtual dice for games and decisions.', keywords: 'dice roller, roll dice' },
  { slug: 'flip-a-coin', title: 'Flip a Coin', category: 'Generators', category_slug: 'generators', icon: 'fas fa-coins', description: 'Heads or Tails? Flip a virtual coin instantly.', keywords: 'flip a coin, coin toss' },
  { slug: 'stopwatch', title: 'Stopwatch', category: 'Utility Tools', category_slug: 'utility', icon: 'fas fa-stopwatch', description: 'A precise online stopwatch with lap timing.', keywords: 'stopwatch, timer' },
  { slug: 'countdown-timer', title: 'Countdown Timer', category: 'Utility Tools', category_slug: 'utility', icon: 'fas fa-hourglass-start', description: 'Set a countdown timer for any duration.', keywords: 'countdown timer, alert' },
  { slug: 'metronome', title: 'Metronome', category: 'Utility Tools', category_slug: 'utility', icon: 'fas fa-drum', description: 'Keep the beat with our online metronome tool.', keywords: 'metronome, music tools' },
  { slug: 'screen-resolution', title: 'Screen Resolution Detector', category: 'Utility Tools', category_slug: 'utility', icon: 'fas fa-desktop', description: 'Detect your current screen resolution and window size.', keywords: 'screen resolution, window size' },
  { slug: 'my-ip', title: 'My IP Address', category: 'Utility Tools', category_slug: 'utility', icon: 'fas fa-network-wired', description: 'Find out your current public IP address.', keywords: 'my ip, what is my ip' },
  { slug: 'browser-info', title: 'Browser Info', category: 'Utility Tools', category_slug: 'utility', icon: 'fas fa-info-circle', description: 'Detect your browser, version, and OS details.', keywords: 'browser info, detect browser' }
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
