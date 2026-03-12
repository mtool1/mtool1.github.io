// List of tools, categories, SEO metadata
const TOOLS = [
  { 
    slug: 'word-counter', 
    title: 'Word Counter', 
    category: 'Text Tools', 
    category_slug: 'text',
    icon: 'fas fa-font',
    description: 'Count words, characters, sentences and paragraphs instantly.', 
    keywords: 'word counter, character counter, sentence count'
  },
  { 
    slug: 'password-generator', 
    title: 'Password Generator', 
    category: 'Security Tools', 
    category_slug: 'security',
    icon: 'fas fa-key',
    description: 'Generate secure random passwords with one click.', 
    keywords: 'password generator, random password, secure password'
  },
  { 
    slug: 'json-formatter', 
    title: 'JSON Formatter', 
    category: 'Developer Tools', 
    category_slug: 'developer',
    icon: 'fas fa-code',
    description: 'Pretty-print and validate JSON instantly in your browser.', 
    keywords: 'json formatter, json validate, beautify json'
  },
  { 
    slug: 'base64-encoder', 
    title: 'Base64 Encoder/Decoder', 
    category: 'Developer Tools', 
    category_slug: 'developer',
    icon: 'fas fa-binary',
    description: 'Encode and decode text to and from Base64 format.', 
    keywords: 'base64 encoder, decode base64, encode base64'
  },
  { 
    slug: 'uuid-generator', 
    title: 'UUID Generator', 
    category: 'Developer Tools', 
    category_slug: 'developer',
    icon: 'fas fa-id-badge',
    description: 'Generate RFC4122 compliant UUIDv4 identifiers.', 
    keywords: 'uuid generator, unique id, guid generator'
  },
  { 
    slug: 'image-compressor', 
    title: 'Image Tools', 
    category_slug: 'image',
    icon: 'fas fa-file-image',
    description: 'Compress images in browser to reduce file size and load time.', 
    keywords: 'image compressor, optimize image, jpg png compress'
  },
  { 
    slug: 'image-resizer', 
    title: 'Image Resizer', 
    category: 'Image Tools', 
    category_slug: 'image',
    icon: 'fas fa-expand-arrows-alt',
    description: 'Resize images using width and height settings instantly.', 
    keywords: 'image resizer, resize image, image scale'
  },
  { 
    slug: 'age-calculator', 
    title: 'Age Calculator', 
    category: 'Utility Tools', 
    category_slug: 'utility',
    icon: 'fas fa-calendar-alt',
    description: 'Calculate age quickly from date of birth.', 
    keywords: 'age calculator, date of birth age'
  },
  { 
    slug: 'unit-converter', 
    title: 'Unit Converter', 
    category: 'Converters', 
    category_slug: 'converters',
    icon: 'fas fa-exchange-alt',
    description: 'Convert between common units (length, mass, temperature).', 
    keywords: 'unit converter, length converter, weight converter'
  },
  { 
    slug: 'lorem-generator', 
    title: 'Lorem Ipsum Generator', 
    category: 'Generators', 
    category_slug: 'generators',
    icon: 'fas fa-paragraph',
    description: 'Generate placeholder lorem ipsum text for layouts.', 
    keywords: 'lorem ipsum generator, placeholder text'
  }
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
