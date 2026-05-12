import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useVelocity, useMotionValue, useAnimationFrame, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Plus, Minus, Search } from 'lucide-react';

// ─── CDN BASE ─────────────────────────────────────────────────────────────────
// /cdn-proxy is forwarded to rise-atseven.transforms.svdcdn.com by Vite proxy
// This strips the browser's Referer header, bypassing CDN hotlink protection
const img = (path, params = 'w=800&q=80&fm=webp&fit=crop') =>
  `/cdn-proxy/production/images/${path}?${params}`;

// ─── DATA ────────────────────────────────────────────────────────────────────

const navServices = [
  { label: 'Search & Growth Strategy', href: '#', image: '/menu/svc-search-growth.png' },
  { label: 'Onsite SEO',               href: '#', image: '/menu/svc-onsite-seo.jpg' },
  { label: 'Content Experience',       href: '#', image: '/menu/svc-content-experience.png' },
  { label: 'B2B Marketing',            href: '#', image: '/menu/svc-b2b.jpg' },
  { label: 'Digital PR',               href: '#', image: '/menu/svc-digital-pr.png' },
  { label: 'Social Media & Campaigns', href: '#', image: '/menu/svc-social-media.webp' },
  { label: 'Data & Insights',          href: '#', image: '/menu/svc-data-insights.jpg' },
  { label: 'Social SEO/Search',        href: '#', image: '/menu/svc-social-seo.png' },
];
const navIndustries = [
  { label: 'B2B Marketing', href: '#', image: '/menu/ind-b2b.jpg' },
];
const navInternational = [
  { label: 'US Digital PR',          href: '#', image: '/menu/intl-us.jpg' },
  { label: 'Spain Digital PR',       href: '#', image: '/menu/intl-spain.jpg' },
  { label: 'Germany Digital PR',     href: '#', image: '/menu/intl-germany.jpg' },
  { label: 'Netherlands Digital PR', href: '#', image: '/menu/intl-netherlands.jpg' },
];
const navAbout = [
  { label: 'About Us',        href: '#', image: '/menu/about-us.jpg' },
  { label: 'Meet The Risers', href: '#', image: '/menu/about-meet-risers.png' },
  { label: 'Culture',         href: '#', image: '/menu/about-culture.jpg' },
  { label: 'Testimonials',    href: '#', image: '/menu/about-testimonials.jpg' },
];
const navBlog = [
  { label: 'Blog',                        href: '#', image: '/menu/blog-blog.png' },
  { label: 'Category Leaderboard',        href: '#', image: '/menu/blog-category.png' },
  { label: 'Multi-Channel Search Report', href: '#', image: '/menu/blog-report.jpg' },
];

const NAV_DROPDOWNS = {
  services: {
    label: 'Services',
    width: 660,
    sectionLabel: 'Core Services',
    columns: [navServices.slice(0, 4), navServices.slice(4)],
    defaultImage: '/menu/svc-search-growth.png',
    cta: { label: 'View All Services', href: '#' },
  },
  industries: {
    label: 'Industries',
    width: 420,
    items: navIndustries,
    defaultImage: '/menu/ind-b2b.jpg',
  },
  international: {
    label: 'International',
    width: 480,
    items: navInternational,
    defaultImage: '/menu/intl-us.jpg',
  },
  about: {
    label: 'About',
    width: 480,
    items: navAbout,
    defaultImage: '/menu/about-us.jpg',
  },
  blog: {
    label: 'Blog & Resources',
    width: 500,
    items: navBlog,
    defaultImage: '/menu/blog-blog.png',
  },
};

const heroImages = [
  '/hero/emirates.webp',
  '/hero/redbull.webp',
  '/hero/astro.webp',
  '/hero/fashion.webp',
];

// SimpleIcons CDN — white icons for dark hero background
const platformLogos = [
  { name: 'Google',    src: 'https://cdn.simpleicons.org/google/ffffff' },
  { name: 'ChatGPT',   src: 'https://cdn.simpleicons.org/openai/ffffff' },
  { name: 'Gemini',    src: 'https://cdn.simpleicons.org/googlegemini/ffffff' },
  { name: 'TikTok',    src: 'https://cdn.simpleicons.org/tiktok/ffffff' },
  { name: 'YouTube',   src: 'https://cdn.simpleicons.org/youtube/ffffff' },
  { name: 'Pinterest', src: 'https://cdn.simpleicons.org/pinterest/ffffff' },
  { name: 'GIPHY',     src: 'https://cdn.simpleicons.org/giphy/ffffff' },
  { name: 'Reddit',    src: 'https://cdn.simpleicons.org/reddit/ffffff' },
  { name: 'Amazon',    src: 'https://cdn.simpleicons.org/amazondotcom/ffffff' },
];

// Real site award logos — with referrer bypass
const awardLogos = [
  { name: 'Global Search Awards',   src: img('Placeholder-logos/global-search-awards.png', 'w=200&q=80&fm=webp') },
  { name: 'European Search Awards', src: img('Placeholder-logos/Mask-group.png',           'w=200&q=80&fm=webp') },
  { name: 'UK Social Media Awards', src: img('Logos/Awards/White/UKSocial-Media-Awards-White.png', 'w=200&q=80&fm=webp') },
  { name: 'UK Content Awards',      src: img('Logos/Awards/White/UK-Content-Awards-White.png',     'w=200&q=80&fm=webp') },
];

// Client logos — local files where available, SimpleIcons CDN for the rest
const clientLogos = [
  { name: 'PlayStation',       src: 'https://cdn.simpleicons.org/playstation/111212' },
  { name: 'AXA',               src: 'https://cdn.simpleicons.org/axa/111212' },
  { name: 'Emirates',          src: '/client-logos/emirates.png' },
  { name: 'SharkNinja',        src: '/client-logos/shark-ninja.webp' },
  { name: 'Capital One',       src: 'https://cdn.simpleicons.org/capitalone/111212' },
  { name: 'Red Bull',          src: '/client-logos/red-bull.png' },
  { name: 'JD Sports',         src: null },
  { name: 'Kroger',            src: '/client-logos/kroger.png' },
  { name: 'HubSpot',           src: 'https://cdn.simpleicons.org/hubspot/111212' },
  { name: 'Xbox',              src: 'https://cdn.simpleicons.org/xbox/111212' },
  { name: 'SIXT',              src: 'https://cdn.simpleicons.org/sixt/111212' },
  { name: 'Revolution Beauty', src: null },
];

// ─── FEATURED WORK DATA ──────────────────────────────────────────────────────
const featuredWork = [
  {
    slug: 'sixt',              name: 'SIXT',                        years: '2023-2025',
    category: 'Car rental',    cardColor: '#FF7A45',
    headline: 'An extra 3m clicks regionally through SEO',
    img: '/work/sixt.jpg',
  },
  {
    slug: 'dojo-b2b',          name: 'Dojo - B2B',                  years: '2021-2025',
    category: 'Card Machines', cardColor: '#F4C9A8',
    headline: 'A B2B success story built on search-first strategy',
    img: '/work/dojo-b2b.jpg',
  },
  {
    slug: 'magnet-trade',      name: 'Magnet Trade - B2B',          years: '2023-2024',
    category: 'Kitchens',      cardColor: '#F08A4B',
    headline: 'Full-service SEO delivering 170%+ organic growth',
    img: '/work/magnet-trade.png',
  },
  {
    slug: 'esim',              name: 'Leading E Sim brand globally', years: '2023-2025',
    category: 'eSIMs',         cardColor: '#1F2937',
    headline: 'Increasing brand and non-brand visibility across UK & ES',
    img: '/work/esim.jpg',
  },
  {
    slug: 'jd-sports',         name: 'JD Sports',                   years: '2025',
    category: 'Sports Retail', cardColor: '#111212',
    headline: '65% up YoY in clicks for JD Sports FR, IT & ES',
    img: '/work/jd-sports.jpg',
  },
  {
    slug: 'parkdean',          name: 'Parkdean Resorts',            years: '2019-2025',
    category: 'Holiday Parks', cardColor: '#5BC4B5',
    headline: 'Dominating Google and AI search for Easter breaks',
    img: '/work/parkdean.jpg',
  },
  {
    slug: 'pooky',             name: 'Pooky',                       years: '2025',
    category: 'Rechargeable Lights', cardColor: '#5DD4C8',
    headline: 'Driving demand for Pooky Rechargeable Lights',
    img: '/work/pooky.jpg',
  },
  {
    slug: 'revolution-beauty', name: 'Revolution Beauty',           years: '2022-2025',
    category: 'Beauty Dupes',  cardColor: '#F4906B',
    headline: "Building the UK's leading beauty dupe brand",
    img: '/work/revolution-beauty.png',
  },
  {
    slug: 'lloyds-pharmacy',   name: 'Lloyds Pharmacy',            years: '2022-23',
    category: 'Healthcare',    cardColor: '#0064A8',
    headline: 'National reach through content & digital PR at scale',
    img: '/work/lloyds-pharmacy.png',
  },
  {
    slug: 'prettylittlething', name: 'PrettyLittleThing',          years: '2021-2023',
    category: 'Fashion',       cardColor: '#F9A8BE',
    headline: 'Category leadership in fast fashion search',
    img: '/work/prettylittlething.png',
  },
];

const ourServicesData = [
  { slug: 'digital-pr',         name: 'Digital PR',                href: '#', mediaSrc: '/services/digital-pr.png',         mediaType: 'image' },
  { slug: 'search-growth',      name: 'Search & Growth Strategy',  href: '#', mediaSrc: '/services/search-growth.png',      mediaType: 'image' },
  { slug: 'data-insights',      name: 'Data & Insights',           href: '#', mediaSrc: '/services/data-insights.jpg',      mediaType: 'image' },
  { slug: 'organic-social',     name: 'Organic Social & Content',  href: '#', mediaSrc: '/services/organic-social.png',     mediaType: 'image' },
  { slug: 'content-experience', name: 'Content Experience',        href: '#', mediaSrc: '/services/content-experience.jpg', mediaType: 'image' },
  { slug: 'onsite-seo',         name: 'Onsite SEO',                href: '#', mediaSrc: '/services/onsite-seo.png',         mediaType: 'image' },
];

const legacyCards = [
  {
    title: 'Pioneers',
    paragraphs: [
      "We're dedicated to creating the industry narrative that others follow 3 years from now. We paved the path for creative SEO, multi-channel search with Digital PR, and Social Search and we will continue to do it.",
      "We're on a mission to be the first search-first agency to win a Cannes Lion disrupting the status quo.",
    ],
    imageSrc: '/legacy/pioneers.webp',
    imageAlt: 'Person holding a "Don\'t Google it, TikTok it!" sign in front of Google',
    cardBg: '#0A0A0A',
    textColor: '#FFFFFF',
    rotation: 3,
    imageRotation: -2,
  },
  {
    title: 'Award Winning',
    paragraphs: [
      "A roll top bath full of 79 awards. Voted The Drum's best agency outside of London. We are official judges for industry awards including Global Search Awards and Global Content Marketing Awards.",
    ],
    imageSrc: '/legacy/award-winning.jpg',
    imageAlt: 'Two people celebrating at an awards event holding a PR Week trophy',
    cardBg: '#A8F0D0',
    textColor: '#0A0A0A',
    rotation: -3,
    imageRotation: 3,
  },
  {
    title: 'Speed',
    paragraphs: [
      "People ask us why we are called Rise at Seven? Ever heard the saying Early Bird catches the worm? Google is moving fast, but humans are moving faster. We chase consumers, not algorithms. We've created a service which takes ideas to result within 60 minutes.",
    ],
    imageSrc: '/legacy/speed.png',
    imageAlt: 'Person holding a "The whole SERP will be AI" sign at SEO Week',
    cardBg: '#FFFFFF',
    textColor: '#0A0A0A',
    rotation: 2,
    imageRotation: -3,
  },
];

const blogPosts = [
  {
    category: null,
    img: '/blog/post1.jpg',
    author: 'Ray Saddiq',
    readTime: '3 mins',
    title: 'Rise at Seven Appoints Hollie Lovell as Senior Operations Lead',
  },
  {
    category: null,
    img: '/blog/post2.png',
    author: 'Ray Saddiq',
    readTime: '2 mins',
    title: 'Rise at Seven Exits Sheffield and Triples Manchester as new HQ as they go for global expansion',
  },
  {
    category: 'News',
    img: '/blog/post3.jpg',
    author: 'Carrie Rose',
    readTime: '2 mins',
    title: "Ryan McNamara Is Now Rise at Seven's Global Operations Director",
  },
];


// ─── ATOMS ───────────────────────────────────────────────────────────────────

const Img = ({ src, alt = '', className = '', style, loading = 'lazy' }) => {
  const ref = useRef(null);
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => { if (ref.current) ref.current.style.display = 'none'; }}
    />
  );
};

// CSS-animation marquee — used by ClientLogos
const Marquee = ({ children, speed = 30, className = '' }) => (
  <div className={`overflow-hidden whitespace-nowrap ${className}`}>
    <div className="inline-flex items-center" style={{ animation: `marquee ${speed}s linear infinite` }}>
      {children}{children}
    </div>
  </div>
);

// Vertical-wipe hover animation — used by nav + footer links
// Clips to one line height; on hover the inner column slides up to reveal a ghost copy.
const SlideLink = ({ href, label, className = '' }) => (
  <a href={href} className={`group ${className}`}>
    <span className="overflow-hidden inline-block h-[1.2em] leading-[1.2] align-middle">
      <span className="flex flex-col transition-transform duration-[380ms] [transition-timing-function:cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-1/2 group-focus-visible:-translate-y-1/2 motion-reduce:!translate-y-0 motion-reduce:!transition-none">
        <span className="block leading-[1.2]">{label}</span>
        <span className="block leading-[1.2]" aria-hidden="true">{label}</span>
      </span>
    </span>
  </a>
);

// Scroll-velocity marquee helpers
const wrapNum = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const Btn = ({ children, dark = false, outline = false, icon = true, small = false, className = '', onClick }) => (
  <button
    onClick={onClick}
    className={[
      'inline-flex items-center gap-2 font-medium tracking-tightish leading-tight rounded-full transition-all duration-300 cursor-pointer hover:rounded-xl',
      small ? 'px-4 py-2.5 text-[13px]' : 'px-5 py-3 md:px-6 md:py-3.5 text-sm md:text-base',
      dark    ? 'bg-g-900 text-white'
      : outline ? 'border border-g-900 text-g-900 hover:bg-g-900 hover:text-white'
               : 'bg-mint text-g-900',
      className,
    ].join(' ')}
  >
    {children}
    {icon && <ArrowUpRight size={small ? 13 : 15} strokeWidth={2} />}
  </button>
);

const SocialIcon = ({ type }) => {
  const paths = {
    instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
    tiktok:    'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.73a8.18 8.18 0 0 0 4.79 1.53V6.79a4.85 4.85 0 0 1-1.02-.1z',
    x:         'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z',
    linkedin:  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    youtube:   'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
    facebook:  'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d={paths[type]} />
    </svg>
  );
};

// Real Rise at Seven SVG wordmark (extracted from site source)
const Logo = ({ white = false }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 168 21"
    className="h-[18px] md:h-[20px] w-auto"
    style={{ fill: white ? '#ffffff' : '#111212' }}
  >
    <path d="M91.3152 5.40061C91.3152 3.94241 92.5306 2.67359 93.9881 2.67359C95.7162 2.67359 96.797 3.83419 96.797 5.56225H99.7127C99.7127 2.1873 97.3096 0 93.9874 0C90.9371 0 88.3988 2.32257 88.3988 5.42766C88.3988 9.31596 90.883 10.2344 93.9874 11.4221C95.6627 12.07 97.2007 12.5563 97.2007 14.6895C97.2007 16.634 95.9867 18.0651 93.9874 18.0651C91.8813 18.0651 90.7477 16.3905 90.7477 14.446H87.832C87.832 18.0651 90.3426 20.7381 93.9874 20.7381C97.6323 20.7381 100.118 18.2816 100.118 14.6895C100.118 7.10161 91.3145 9.64061 91.3145 5.40061H91.3152Z" />
    <path d="M109.209 4.99609C104.834 4.99609 101.539 8.53405 101.539 12.8539C101.539 17.1737 104.888 20.738 109.155 20.738C112.422 20.738 115.203 18.713 116.337 15.662H113.529C112.718 17.2278 111.017 18.1733 109.262 18.1733C106.806 18.1733 104.915 16.4182 104.348 14.0963H116.743C116.797 13.6371 116.823 13.1508 116.823 12.6922C116.823 8.47926 113.447 4.99609 109.209 4.99609ZM104.348 11.9361C104.509 9.47823 106.751 7.56147 109.181 7.56147C111.611 7.56147 113.853 9.47823 114.014 11.9361H104.348Z" />
    <path d="M127.476 5.40039L123.575 16.0941L119.673 5.40039H116.676L122.617 20.3598H124.588L130.475 5.40039H127.476Z" />
    <path d="M137.942 4.99609C133.567 4.99609 130.273 8.53405 130.273 12.8539C130.273 17.1737 133.621 20.738 137.888 20.738C141.155 20.738 143.936 18.713 145.071 15.662H142.262C141.453 17.2278 139.75 18.1733 137.996 18.1733C135.538 18.1733 133.649 16.4182 133.081 14.0963H145.476C145.53 13.6371 145.556 13.1508 145.556 12.6922C145.556 8.47926 142.182 4.99609 137.942 4.99609ZM133.081 11.9361C133.243 9.47823 135.484 7.56147 137.915 7.56147C140.347 7.56147 142.586 9.47823 142.749 11.9361H133.081Z" />
    <path d="M147.473 8.21195V8.69013V20.3618H150.032V10.1815L167.216 20.3618V17.2405L147.473 5.40039V8.21195Z" />
    <path d="M67.8431 7.50804H67.789C66.6818 5.80635 64.7103 4.99609 62.713 4.99609C58.1775 4.99609 54.7734 8.3981 54.7734 12.935C54.7734 17.4719 58.2296 20.7387 62.713 20.7387C64.7651 20.7387 66.7359 19.8473 67.789 18.0387H67.8431V20.3606H70.652V5.40122H67.8431V7.50804ZM62.686 18.1733C59.823 18.1733 57.5823 15.7168 57.5823 12.9073C57.5823 10.0978 59.7425 7.56079 62.7124 7.56079C65.6822 7.56079 67.8972 9.90973 67.8972 12.9073C67.8972 15.9048 65.6024 18.1733 62.6867 18.1733H62.686Z" />
    <path d="M77.5832 0.378906H74.7736V5.40144H72.75V7.96681H74.7736V20.3608H77.5832V7.96681H80.0403V5.40144H77.5832V0.378906Z" />
    <path d="M18.3089 0.378906H15.5V3.2953H18.3089V0.378906Z" />
    <path d="M18.3089 5.02344H15.5V19.9828H18.3089V5.02344Z" />
    <path d="M25.8409 10.7205C24.8142 10.3959 23.5183 10.0996 23.5183 8.77603C23.5183 7.77639 24.3279 7.18256 25.2728 7.18256C26.4077 7.18256 27.0549 7.91166 27.1895 8.99178H29.9984C29.9443 6.39935 27.9727 4.61719 25.4087 4.61719C22.8447 4.61719 20.7088 6.3723 20.7088 8.93767C20.7088 14.2307 27.5412 12.6102 27.5412 15.743C27.5412 17.0389 26.6227 17.7951 25.381 17.7951C23.707 17.7951 22.9516 16.6074 22.8427 15.0681H20.0352C20.0352 17.417 21.1951 19.2269 23.4094 20.0094C24.0303 20.2252 24.6789 20.3604 25.3262 20.3604C28.1892 20.3604 30.3494 18.5248 30.3494 15.5807C30.3494 12.6366 28.296 11.476 25.8402 10.7205H25.8409Z" />
    <path d="M39.3637 4.61719C34.9891 4.61719 31.6953 8.15514 31.6953 12.475C31.6953 16.7948 35.0432 20.3591 39.3096 20.3591C42.577 20.3591 45.3581 18.3341 46.493 15.2831H43.6842C42.8746 16.8489 41.1722 17.7944 39.4178 17.7944C36.96 17.7944 35.0709 16.0393 34.5028 13.7174H46.8975C46.9516 13.2582 46.978 12.7719 46.978 12.3133C46.978 8.10036 43.6037 4.61719 39.3637 4.61719ZM34.5028 11.5565C34.6651 9.09864 36.9059 7.18188 39.3373 7.18188C41.7688 7.18188 44.0075 9.09932 44.1705 11.5565H34.5028Z" />
    <path d="M9.55945 12.1512C12.1519 11.2327 13.3395 9.09953 13.3395 6.39957C13.3395 4.67151 12.7728 2.88934 11.5046 1.67395C10.0998 0.297591 8.07419 0 6.18314 0H0V19.9826H2.91572V13.8069L13.3389 19.9826V16.8606L6.22575 12.5949L7.61496 12.5293C8.26222 12.5293 8.96359 12.3676 9.55809 12.1512H9.55945ZM4.91499 10.3156H2.91572V2.67359H5.99444C8.317 2.67359 10.4231 3.86192 10.4231 6.40024C10.4231 9.5865 7.50742 10.3156 4.91499 10.3156Z" />
  </svg>
);

const W = ({ children, className = '' }) => (
  <div className={`max-w-screen-xl mx-auto px-5 md:px-8 lg:px-12 xl:px-16 ${className}`}>
    {children}
  </div>
);

const displayCls = 'font-medium leading-[0.9] tracking-tight text-g-900';

// ─── NAV ─────────────────────────────────────────────────────────────────────

const DropdownLink = ({ label, href, onMouseEnter, onMouseLeave }) => (
  <a
    href={href}
    className="group block py-[9px]"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <span className="overflow-hidden block h-[1.25em] leading-[1.25]">
      <span className="flex flex-col transition-transform duration-[380ms] [transition-timing-function:cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-1/2 motion-reduce:!translate-y-0 motion-reduce:!transition-none">
        <span className="block leading-[1.25] text-[17px] font-medium text-g-900/60">{label}</span>
        <span className="block leading-[1.25] text-[17px] font-medium text-g-900" aria-hidden="true">{label}</span>
      </span>
    </span>
  </a>
);

const DesktopNav = ({ light = false }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [hoveredImg, setHoveredImg] = useState(null);
  const closeTimer = useRef(null);
  const navRef = useRef(null);

  const openMenu = key => {
    clearTimeout(closeTimer.current);
    setActiveMenu(prev => {
      if (prev !== key) setHoveredImg(null); // reset image when switching menus
      return key;
    });
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => {
      setActiveMenu(null);
      setHoveredImg(null);
    }, 300);
  };

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') { setActiveMenu(null); setHoveredImg(null); }
    };
    const onDown = e => {
      if (!navRef.current?.contains(e.target)) { setActiveMenu(null); setHoveredImg(null); }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
      clearTimeout(closeTimer.current);
    };
  }, []);

  const tc = light ? 'text-white' : 'text-g-900';
  const hc = light ? 'hover:text-white/70' : 'hover:text-g-400';

  return (
    <>
      {/* Page backdrop — pointer-events:none so it never blocks nav button mouse events.
          Closing happens via scheduleClose (mouse leaves nav) + mousedown-outside listener. */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            key="nav-backdrop"
            className="fixed inset-0 z-[50] pointer-events-none"
            style={{
              background: 'rgba(0,0,0,0.45)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>

      <nav ref={navRef} className="hidden lg:flex items-center gap-0.5 xl:gap-1">
        {/* Dropdown-enabled items */}
        {Object.entries(NAV_DROPDOWNS).map(([key, cfg]) => (
          <div
            key={key}
            className="relative"
            onMouseEnter={() => openMenu(key)}
            onMouseLeave={scheduleClose}
          >
            <button
              className={[
                'group flex items-center gap-1 text-[15px] font-medium tracking-tightish',
                'transition-colors duration-200 py-1.5 px-3 rounded-full border',
                activeMenu === key
                  ? light
                    ? 'text-white border-white/20 bg-white/10'
                    : 'text-g-900 border-g-900/15 bg-g-900/6'
                  : `${tc} ${hc} border-transparent`,
              ].join(' ')}
              aria-expanded={activeMenu === key}
              aria-haspopup="true"
            >
              <span className="overflow-hidden inline-block h-[1.2em] leading-[1.2]">
                <span className="flex flex-col transition-transform duration-[380ms] [transition-timing-function:cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-1/2 motion-reduce:!translate-y-0 motion-reduce:!transition-none">
                  <span className="block leading-[1.2]">{cfg.label}</span>
                  <span className="block leading-[1.2]" aria-hidden="true">{cfg.label}</span>
                </span>
              </span>
              <span className="text-[10px] leading-none opacity-50 ml-0.5">
                {activeMenu === key ? '−' : '+'}
              </span>
            </button>

            <AnimatePresence>
              {activeMenu === key && (
                // pt-2 creates invisible hover bridge — mouse in the gap still counts as "inside"
                // so the 300ms grace period is only needed for moving between separate items
                <motion.div
                  key={key + '-card'}
                  className="absolute top-full z-[90]"
                  style={{
                    width: cfg.width,
                    left: key === 'blog' ? 'auto' : 0,
                    right: key === 'blog' ? 0 : 'auto',
                    paddingTop: 8,
                  }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div
                    className="bg-white rounded-3xl"
                    style={{ boxShadow: '0 20px 60px -10px rgba(0,0,0,0.18), 0 4px 14px rgba(0,0,0,0.07)' }}
                  >
                    <div className="flex gap-4 p-5">
                      {/* LEFT: links */}
                      <div className="flex-1 min-w-0 py-2 pl-2">
                        {cfg.sectionLabel && (
                          <p className="text-[11px] text-g-300 tracking-[0.1em] uppercase font-medium mb-4">
                            {cfg.sectionLabel}
                          </p>
                        )}

                        {cfg.columns ? (
                          // Services: two-column grid
                          <div className="grid grid-cols-2 gap-x-6">
                            {cfg.columns.map((col, ci) => (
                              <div key={ci} className="flex flex-col">
                                {col.map(item => (
                                  <DropdownLink
                                    key={item.label}
                                    label={item.label}
                                    href={item.href}
                                    onMouseEnter={() => setHoveredImg(item.image)}
                                    onMouseLeave={() => setHoveredImg(null)}
                                  />
                                ))}
                              </div>
                            ))}
                          </div>
                        ) : (
                          // Other menus: single column
                          <div className="flex flex-col">
                            {cfg.items.map(item => (
                              <DropdownLink
                                key={item.label}
                                label={item.label}
                                href={item.href}
                                onMouseEnter={() => setHoveredImg(item.image)}
                                onMouseLeave={() => setHoveredImg(null)}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* RIGHT: image — own rounded container, padded from card edges */}
                      <div
                        className="relative flex-shrink-0 rounded-2xl overflow-hidden self-stretch"
                        style={{ width: 210, minHeight: 200 }}
                      >
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={hoveredImg || cfg.defaultImage}
                            src={hoveredImg || cfg.defaultImage}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover"
                            initial={{ opacity: 0, scale: 1.04 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.22, ease: 'easeOut' }}
                          />
                        </AnimatePresence>
                        {cfg.cta && (
                          <div className="absolute bottom-3 left-3 z-10">
                            <a
                              href={cfg.cta.href}
                              className="inline-flex items-center gap-1.5 bg-g-900 text-white text-[12px] font-semibold px-4 py-2.5 rounded-full hover:bg-g-800 transition-colors"
                            >
                              {cfg.cta.label} <ArrowUpRight size={12} strokeWidth={2.5} />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* Plain links */}
        {['Work', 'Careers', 'Webinar'].map(l => (
          <SlideLink
            key={l}
            href="#"
            label={l}
            className={`text-[15px] font-medium ${tc} ${hc} tracking-tightish transition-colors px-2.5 whitespace-nowrap`}
          />
        ))}
      </nav>
    </>
  );
};

const Hamburger = ({ open, onClick, dark = true }) => (
  <button onClick={onClick}
    className="flex flex-col gap-[5px] items-start justify-center w-10 h-8 flex-shrink-0"
    aria-label="Toggle menu">
    <span className={`block w-5 h-[1.5px] ${dark ? 'bg-g-900' : 'bg-white'} transition-all duration-500 origin-center ${open ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
    <span className={`block w-5 h-[1.5px] ${dark ? 'bg-g-900' : 'bg-white'} transition-all duration-500 origin-center ${open ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
  </button>
);

// ─── HEADER ───────────────────────────────────────────────────────────────────

const Header = ({ isMenuOpen, setIsMenuOpen }) => {
  const [scrollY, setScrollY] = useState(0);
  const [hidden, setHidden]   = useState(false);
  const prevY = useRef(0);

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      if (y > 120) setHidden(y > prevY.current);
      else         setHidden(false);
      prevY.current = y;
      setScrollY(y);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrolled  = scrollY > 80;
  const promoHide = scrollY > 20;
  // On dark hero (transparent header) → white text; on scrolled (light bg) → dark text
  const light = !scrolled;

  return (
    <header className={[
      'fixed top-0 left-0 w-full z-[100] transition-all duration-500',
      scrolled ? 'bg-g-100 shadow-[0_1px_0_0_rgba(17,18,18,0.08)]' : 'bg-transparent',
      hidden   ? '-translate-y-full' : 'translate-y-0',
    ].join(' ')}>
      {/* Promo bar */}
      <div className={`pt-2.5 px-2.5 w-full transition-all duration-300 ${
        promoHide ? 'opacity-0 pointer-events-none h-0 overflow-hidden !pt-0' : 'opacity-100'
      }`}>
        <a
          href="#"
          className="group flex justify-center items-center text-xs w-full py-2.5 px-5 text-center tracking-tight leading-none font-semibold rounded-2xl transition-all duration-300 hover:rounded-md text-g-900 bg-mint"
        >
          🚨 The Category Leaderboard — Live Now
        </a>
      </div>

      <div className="flex items-center justify-between px-4 md:px-5 lg:px-8 xl:px-12 py-3.5 max-w-screen-2xl mx-auto">
        <a href="#" className="flex-shrink-0"><Logo white={light} /></a>
        <DesktopNav light={light} />
        <div className="flex items-center gap-3">
          <button className={[
            'hidden sm:inline-flex items-center gap-2 text-[13px] font-semibold tracking-tightish leading-none',
            'px-5 py-3 rounded-full transition-all duration-300 hover:rounded-xl cursor-pointer',
            scrolled ? 'bg-g-900 text-white' : 'bg-white text-g-900',
          ].join(' ')}>
            Get In Touch <span className="text-[11px]">»</span>
          </button>
          <div className="lg:hidden">
            <Hamburger open={isMenuOpen} onClick={() => setIsMenuOpen(v => !v)} dark={scrolled} />
          </div>
        </div>
      </div>
    </header>
  );
};

// ─── MOBILE MENU ─────────────────────────────────────────────────────────────

const MobileMenu = ({ isOpen, onClose }) => {
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const toggle = k => setExpanded(expanded === k ? null : k);
  const accordions = [
    { key: 'services',      label: 'Services',      items: navServices },
    { key: 'industries',    label: 'Industries',    items: navIndustries },
    { key: 'international', label: 'International', items: navInternational },
    { key: 'about',         label: 'About',         items: navAbout },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          className="fixed inset-0 z-50 lg:hidden"
        >
          {/* Real site uses bg-grey-900/80 with backdrop-blur + rounded-3xl + m-2 */}
          <div className="absolute inset-0 bg-g-900/[0.92] backdrop-blur-sm rounded-3xl m-2" />
          <div className="relative h-full overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-3 sticky top-0 z-10">
              <Logo white />
              <Hamburger open onClick={onClose} dark={false} />
            </div>

            <nav className="px-4 pb-16 pt-4">
              {accordions.map(({ key, label, items }) => (
                <div key={key} className="border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <a href="#" className="group py-5 text-white text-4xl md:text-5xl tracking-tight font-medium leading-none">
                      <span className="overflow-hidden inline-block h-[1em] leading-none">
                        <span className="flex flex-col transition-transform duration-[380ms] [transition-timing-function:cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-1/2 motion-reduce:!translate-y-0 motion-reduce:!transition-none">
                          <span className="block leading-none">{label}</span>
                          <span className="block leading-none" aria-hidden="true">{label}</span>
                        </span>
                      </span>
                    </a>
                    <button
                      onClick={() => toggle(key)}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs border border-white/40 transition"
                    >
                      {expanded === key ? <Minus size={12} /> : <Plus size={12} />}
                    </button>
                  </div>
                  <AnimatePresence initial={false}>
                    {expanded === key && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-5 pl-1 flex flex-col gap-1">
                          {items.map(it => (
                            <a key={it.label} href={it.href}
                              className="text-white text-xl tracking-tight leading-tight font-medium inline-flex py-0.5">
                              {it.label}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {['Work', 'Careers', 'Blog & Resources', 'Webinar'].map(l => (
                <a key={l} href="#"
                  className="group block border-b border-white/10 py-5 text-white text-4xl md:text-5xl font-medium leading-none tracking-tight hover:text-mint transition-colors">
                  <span className="overflow-hidden inline-block h-[1em] leading-none">
                    <span className="flex flex-col transition-transform duration-[380ms] [transition-timing-function:cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-1/2 motion-reduce:!translate-y-0 motion-reduce:!transition-none">
                      <span className="block leading-none">{l}</span>
                      <span className="block leading-none" aria-hidden="true">{l}</span>
                    </span>
                  </span>
                </a>
              ))}

              <div className="pt-8 flex flex-col gap-6">
                <Btn className="!bg-mint !text-g-900 w-fit">Get in touch</Btn>
                <div className="flex gap-5 text-white/40">
                  {['instagram', 'tiktok', 'x', 'linkedin', 'youtube', 'facebook'].map(t => (
                    <a key={t} href="#" className="hover:text-white transition-colors"><SocialIcon type={t} /></a>
                  ))}
                </div>
                <div className="text-xs text-white/30 font-medium space-y-1">
                  <p>Sheffield · Manchester · London · New York</p>
                  <p>© 2025 Rise at Seven Ltd</p>
                </div>
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── SECTIONS ────────────────────────────────────────────────────────────────

// Award medallion SVG for the hero (white, minimal)
const AwardMedallion = ({ lines }) => (
  <div className="flex flex-col items-center gap-0.5 opacity-70 hover:opacity-100 transition-opacity">
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-white md:w-8 md:h-8">
      <circle cx="14" cy="14" r="12.5" stroke="currentColor" strokeWidth="1" />
      <circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
      <path d="M14 4 L15 9 L14 11 L13 9 Z" fill="currentColor" opacity="0.6" />
    </svg>
    {lines.map((l, i) => (
      <span key={i} className="text-white text-[6px] md:text-[7px] font-semibold text-center tracking-wider uppercase leading-none">{l}</span>
    ))}
  </div>
);

const Hero = () => {
  const [bgIdx] = useState(() => Math.floor(Math.random() * heroImages.length));

  return (
    <section className="relative bg-g-900 overflow-hidden flex flex-col" style={{ minHeight: '100svh' }}>
      {/* Background image — random on each page load */}
      <div className="absolute inset-0">
        <img
          src={heroImages[bgIdx]}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/45 to-black/75" />
      </div>

      {/* Main centered content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center pt-28 md:pt-36 pb-20 md:pb-28 px-5">

        {/* Awards */}
        <div className="text-center mb-8 md:mb-12">
          <p className="text-[8px] md:text-[9px] uppercase tracking-[0.15em] text-white/45 font-semibold mb-4 md:mb-5">
            #1 Most Recommended Content Marketing Agency
          </p>
          <div className="flex items-end justify-center gap-5 md:gap-8">
            <AwardMedallion lines={['Global', 'Search', 'Awards']} />
            <AwardMedallion lines={['The Drum']} />
            <AwardMedallion lines={['UK Social', 'Media Awards']} />
            <AwardMedallion lines={['Content', 'Awards']} />
          </div>
        </div>

        {/* Giant heading */}
        <h1
          className="font-medium text-white text-center leading-[0.88] tracking-tight"
          style={{ fontSize: 'clamp(3.5rem, 10.5vw, 13rem)' }}
        >
          We Create<br />
          <span className="inline-flex items-center gap-[0.12em]">
            Category
            <span
              className="inline-block rounded-xl md:rounded-2xl overflow-hidden align-middle"
              style={{ width: '0.58em', height: '0.58em', position: 'relative', top: '-0.04em' }}
            >
              <img
                src={heroImages[bgIdx]}
                alt=""
                className="w-full h-full object-cover"
              />
            </span>
            Leaders
          </span>
        </h1>

        <p className="mt-5 md:mt-7 text-white/50 text-sm md:text-base font-medium tracking-tightish">
          on every searchable platform
        </p>

        {/* Platform logos row */}
        <div className="mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-x-10">
          {platformLogos.map(l => (
            <div key={l.name} className="flex items-center gap-2 opacity-60 hover:opacity-90 transition-opacity">
              <img
                src={l.src}
                alt={l.name}
                className="h-5 md:h-6 w-auto object-contain block flex-shrink-0"
                onError={e => { e.currentTarget.style.display = 'none'; }}
              />
              <span className="text-white text-sm md:text-base font-medium tracking-tightish whitespace-nowrap">{l.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom text corners */}
      <div className="relative z-10 flex justify-between items-end px-5 md:px-8 lg:px-12 pb-6 md:pb-8">
        <p className="text-white/75 text-xs md:text-sm font-medium leading-relaxed max-w-[220px] sm:max-w-xs tracking-tightish">
          Organic media planners creating, distributing &amp; optimising{' '}
          <em className="not-italic font-semibold">search-first</em>{' '}
          content for SEO, Social, PR, AI and LLM search
        </p>
        <p className="text-white/75 text-xs md:text-sm font-medium text-right tracking-tightish">
          4 Global Offices serving<br />UK, USA (New York) &amp; EU
        </p>
      </div>
    </section>
  );
};


const ClientLogoItem = ({ logo }) => {
  const [failed, setFailed] = useState(false);
  return (
    <div className="flex-shrink-0 flex items-center h-7 lg:h-9">
      {(logo.src && !failed) ? (
        <img
          src={logo.src}
          alt={logo.name}
          draggable={false}
          loading="lazy"
          className="h-full w-auto object-contain max-w-[110px] lg:max-w-[140px]"
          style={{ filter: 'brightness(0)', opacity: 0.75 }}
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="text-xs lg:text-sm font-semibold tracking-tight text-g-900 opacity-50 whitespace-nowrap">{logo.name}</span>
      )}
    </div>
  );
};

const ClientLogos = () => (
  <section className="bg-g-100 border-y border-g-900/8 py-9 md:py-11 overflow-hidden">
    <div className="flex items-center">
      <p className="flex-shrink-0 pl-6 sm:pl-8 lg:pl-14 pr-5 lg:pr-8 text-[11px] lg:text-xs text-g-900/50 whitespace-nowrap font-medium tracking-tightish">
        The agency behind ...
      </p>
      <div
        className="flex-1 min-w-0 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 4%, black 96%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 4%, black 96%, transparent)',
        }}
      >
        <motion.div
          className="flex items-center gap-x-12 lg:gap-x-20 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 35, ease: 'linear', repeat: Infinity }}
        >
          {[...clientLogos, ...clientLogos].map((logo, i) => (
            <ClientLogoItem key={i} logo={logo} />
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

const DrivingDemand = () => (
  <section className="bg-g-100 py-16 lg:py-24">
    <W>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 lg:items-end">

        {/* Left — paragraph */}
        <div>
          <p className="text-base md:text-lg font-medium text-g-300 leading-snug max-w-sm tracking-tightish">
            A global team of search-first content marketers engineering semantic
            relevancy &amp; category signals for both the internet and people
          </p>
        </div>

        {/* Right — headline + CTAs */}
        <div className="flex flex-col gap-8">
          <h2 className="font-medium leading-[0.92] tracking-tight text-g-900">
            <span className="block" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5.5rem)' }}>
              Driving Demand &amp;
            </span>
            <span
              className="flex items-end gap-x-4 lg:gap-x-5"
              style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5.5rem)' }}
            >
              <span>Discovery</span>
              <span
                className="inline-block rounded-xl overflow-hidden flex-shrink-0 mb-1"
                style={{ width: 'clamp(56px, 5.5vw, 100px)', height: 'clamp(44px, 4.4vw, 80px)' }}
              >
                <img
                  src="/headline-inline/discovery-thumb.webp"
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </span>
            </span>
          </h2>

          <div className="flex items-center gap-5 flex-wrap">
            {/* Our Story — solid white pill */}
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm lg:text-base font-medium text-g-900 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>Our Story</span>
              <ArrowUpRight
                size={16}
                strokeWidth={2}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            {/* Our Services — plain text link */}
            <a
              href="#"
              className="group inline-flex items-center gap-1.5 text-sm lg:text-base font-medium text-g-900 hover:text-g-900/60 transition-colors"
            >
              <span>Our Services</span>
              <ArrowUpRight
                size={16}
                strokeWidth={2}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </W>
  </section>
);

// ─── FEATURED WORK ────────────────────────────────────────────────────────────

const cardTextDark = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 145;
};

const FeaturedWork = () => {
  const [activeIdx, setActiveIdx] = useState(null);
  const displayIdx = activeIdx ?? 0;
  const p = featuredWork[displayIdx];
  const dark = cardTextDark(p.cardColor);

  return (
    <section className="bg-[#0a0a0a] border-t border-white/[0.05] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16 py-24 lg:py-32">
        <p className="text-sm text-white/80 mb-12 font-normal tracking-[0.05em]">Featured Work</p>

        {/* ── DESKTOP: hover-driven two-column ── */}
        <div className="hidden lg:grid grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT — project list */}
          <div onMouseLeave={() => setActiveIdx(null)}>
            {featuredWork.map((proj, i) => {
              const isActive = activeIdx === i;
              const isDimmed = activeIdx !== null && !isActive;
              return (
                <a
                  key={proj.slug}
                  href="#"
                  className="flex items-start justify-between gap-4 cursor-pointer no-underline py-5 lg:py-7"
                  onMouseEnter={() => setActiveIdx(i)}
                >
                  <span
                    className="whitespace-nowrap font-medium leading-[1.05] block"
                    style={{
                      fontSize: isActive ? 'clamp(3rem,6vw,6.5rem)' : 'clamp(2.5rem,5vw,5.5rem)',
                      letterSpacing: '-0.025em',
                      color: isActive ? '#FFFFFF' : '#5A5A5A',
                      opacity: isDimmed ? 0.5 : 1,
                      transform: isActive ? 'translateX(12px)' : 'translateX(0)',
                      fontWeight: isActive ? 600 : 500,
                      transition: 'all 400ms cubic-bezier(0.22, 1, 0.36, 1)',
                      willChange: 'transform, color',
                    }}
                  >
                    {proj.name}
                  </span>
                  <span
                    className="text-xs tabular-nums whitespace-nowrap flex-shrink-0"
                    style={{
                      color: '#5A5A5A',
                      opacity: isActive ? 1 : 0.7,
                      alignSelf: 'flex-start',
                      paddingTop: '0.5rem',
                      transition: 'opacity 400ms',
                    }}
                  >
                    [{proj.years}]
                  </span>
                </a>
              );
            })}
          </div>

          {/* RIGHT — sticky two-card stack */}
          <div className="sticky top-24 self-start" style={{ height: 'calc(100vh - 8rem)' }}>
            <div aria-live="polite" className="h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={displayIdx}
                  className="flex flex-col gap-5 h-full"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                >
                  {/* Image card */}
                  <div className="relative rounded-2xl overflow-hidden bg-g-800 flex-[1.3]">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                    <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-[11px] font-medium">
                      <Search size={9} strokeWidth={2.5} />
                      {p.category}
                      <ArrowUpRight size={9} strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Headline card */}
                  <div
                    className="relative rounded-2xl flex flex-col justify-end overflow-hidden flex-1"
                    style={{ backgroundColor: p.cardColor, padding: '2rem 2.25rem' }}
                  >
                    <p
                      className="text-[9px] uppercase tracking-[0.15em] font-semibold mb-3"
                      style={{ color: dark ? 'rgba(0,0,0,0.38)' : 'rgba(255,255,255,0.38)' }}
                    >
                      {p.category}
                    </p>
                    <h3
                      className="font-medium leading-tight tracking-tight"
                      style={{
                        fontSize: 'clamp(1.5rem, 2vw, 2.1rem)',
                        color: dark ? '#0a0a0a' : '#ffffff',
                      }}
                    >
                      {p.headline}
                    </h3>
                    <div
                      className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium"
                      style={{
                        backgroundColor: dark ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.15)',
                        color: dark ? '#0a0a0a' : '#ffffff',
                      }}
                    >
                      <Search size={9} strokeWidth={2.5} />
                      {p.category}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── MOBILE: single-column linearized ── */}
        <div className="lg:hidden space-y-16">
          {featuredWork.map((proj) => {
            const isDark = cardTextDark(proj.cardColor);
            return (
              <div key={proj.slug}>
                <div className="flex items-baseline justify-between gap-3 mb-5">
                  <span className="text-white text-2xl font-medium tracking-tight">{proj.name}</span>
                  <span className="text-white/40 text-xs tabular-nums whitespace-nowrap">[{proj.years}]</span>
                </div>
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-g-800 mb-4">
                  <img src={proj.img} alt={proj.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-[11px] font-medium">
                    <Search size={9} strokeWidth={2.5} />
                    {proj.category}
                  </div>
                </div>
                <div
                  className="rounded-2xl p-6 flex items-end"
                  style={{ backgroundColor: proj.cardColor, minHeight: '9rem' }}
                >
                  <p
                    className="text-lg font-medium leading-snug tracking-tight"
                    style={{ color: isDark ? '#0a0a0a' : '#ffffff' }}
                  >
                    {proj.headline}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explore button */}
        <div className="flex justify-center py-20">
          <motion.a
            href="#"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-white/20 text-white/60 text-sm font-medium tracking-tight hover:bg-white hover:text-[#0a0a0a] transition-colors duration-300 no-underline"
            whileHover={{ scale: 1.05 }}
          >
            Explore Our Work
            <motion.span whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
              <ArrowUpRight size={14} strokeWidth={2} />
            </motion.span>
          </motion.a>
        </div>

      </div>
    </section>
  );
};

const OurServiceRow = ({ name, href, mediaSrc, mediaType }) => {
  const [active, setActive] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className="relative block"
      style={{ textDecoration: 'none' }}
    >
      {/* Top divider */}
      <div className="h-px bg-black/10" />

      {/* Fixed-height row — overflow-hidden keeps pill within column bounds */}
      <div className="relative flex items-center overflow-hidden h-[88px] md:h-[104px] lg:h-[120px]">

        {/* Pill — full column width, inset 8px top/bottom for pill shape, scaleX from left */}
        <AnimatePresence>
          {active && (
            <motion.div
              key="pill"
              initial={{ opacity: 0, scaleX: 0.88 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0.92 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute rounded-full overflow-hidden"
              style={{ top: 8, bottom: 8, left: 0, right: 0, originX: 0, willChange: 'transform, opacity' }}
            >
              {mediaType === 'video' ? (
                <video src={mediaSrc} autoPlay muted loop playsInline className="w-full h-full object-cover" />
              ) : (
                <img src={mediaSrc} alt="" className="w-full h-full object-cover" loading="lazy" />
              )}
              <div className="absolute inset-0 bg-black/35" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Arrow + service name — padding matches section header */}
        <div className="relative z-10 flex items-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <motion.span
            initial={false}
            animate={{ width: active ? 52 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden flex-shrink-0 inline-flex"
          >
            <motion.span
              initial={false}
              animate={{ x: active ? 0 : -36, opacity: active ? 1 : 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center"
              style={{ paddingRight: 16 }}
            >
              <ArrowUpRight className="text-white" size={36} strokeWidth={1.5} />
            </motion.span>
          </motion.span>

          <motion.h3
            initial={false}
            animate={{ color: active ? '#FFFFFF' : '#0A0A0A' }}
            transition={{ duration: 0.3 }}
            className="font-medium leading-none tracking-tight whitespace-nowrap"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 4rem)' }}
          >
            {name}
          </motion.h3>
        </div>
      </div>
    </a>
  );
};

const OurServices = () => (
  <section className="relative bg-[#EFEEE9] py-16 lg:py-24 overflow-hidden">

    {/* Header — padded, matches row text alignment */}
    <div className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 mb-8 lg:mb-10">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
        <h2 className="flex items-center gap-4 lg:gap-5">
          <span
            className="font-medium leading-none tracking-tight text-[#0A0A0A]"
            style={{ fontSize: 'clamp(3.5rem, 7.5vw, 9rem)' }}
          >
            Our
          </span>
          <span
            className="inline-block rounded-2xl overflow-hidden flex-shrink-0"
            style={{ width: 'clamp(64px, 6.5vw, 120px)', height: 'clamp(52px, 5vw, 92px)' }}
          >
            <img src="/services/title-thumbnail.jpg" alt="" className="w-full h-full object-cover" />
          </span>
          <span
            className="font-medium leading-none tracking-tight text-[#0A0A0A]"
            style={{ fontSize: 'clamp(3.5rem, 7.5vw, 9rem)' }}
          >
            Services
          </span>
        </h2>
        <a
          href="#"
          className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-white/40 hover:bg-white px-5 py-2.5 text-sm font-medium text-[#0A0A0A] transition-colors flex-shrink-0 self-start lg:self-auto"
        >
          View All Services <ArrowUpRight size={16} strokeWidth={2} />
        </a>
      </div>
    </div>

    {/* Full-bleed divider below header */}
    <div className="h-px bg-black/10" />

    {/* Full-width 2-column grid — vertical border between columns on lg+ */}
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x lg:divide-black/10">
      <div className="flex flex-col">
        {ourServicesData.slice(0, 3).map(s => <OurServiceRow key={s.slug} {...s} />)}
        <div className="h-px bg-black/10" />
      </div>
      <div className="flex flex-col">
        {ourServicesData.slice(3).map(s => <OurServiceRow key={s.slug} {...s} />)}
        <div className="h-px bg-black/10" />
      </div>
    </div>

  </section>
);

const MarqueeContent = () => (
  <div className="flex items-center gap-x-12 lg:gap-x-20 pr-12 lg:pr-20 flex-shrink-0">
    {/* Fix 1: ~10vw so several words fit on screen at once */}
    <span className="text-[clamp(4rem,10vw,11rem)] font-medium leading-[0.95] tracking-tight text-[#0A0A0A] whitespace-nowrap flex-shrink-0">
      Chasing Consumers
    </span>
    {/* Fix 2: image height proportional to new text size; grey fallback if file missing */}
    <img
      src="/marquee/woman-on-screen.webp"
      alt=""
      className="h-[clamp(70px,9vw,130px)] w-auto rounded-2xl object-cover flex-shrink-0 self-center bg-neutral-300"
      onError={(e) => { e.currentTarget.style.minWidth = '160px'; }}
      draggable={false}
    />
    <span className="text-[clamp(4rem,10vw,11rem)] font-medium leading-[0.95] tracking-tight text-[#0A0A0A] whitespace-nowrap flex-shrink-0">
      Not Algorithms
    </span>
    <img
      src="/marquee/group-photo.webp"
      alt=""
      className="h-[clamp(70px,9vw,130px)] w-auto rounded-2xl object-cover flex-shrink-0 self-center bg-neutral-300"
      onError={(e) => { e.currentTarget.style.minWidth = '160px'; }}
      draggable={false}
    />
  </div>
);

const MarqueeRow = ({ baseVelocity = -300 }) => {
  const xPx = useMotionValue(0);
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const prefersReducedMotion = useReducedMotion();

  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  const directionFactor = useRef(1);

  useAnimationFrame((_t, delta) => {
    if (prefersReducedMotion) return;

    const copyWidth = containerRef.current?.children[0]?.offsetWidth ?? 0;
    if (copyWidth === 0) return;

    if (scrollVelocity.get() < 0) directionFactor.current = -1;
    else if (scrollVelocity.get() > 0) directionFactor.current = 1;

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    let next = xPx.get() + moveBy;

    // Seamless pixel-based wrap: keep x in [-copyWidth, 0)
    while (next < -copyWidth) next += copyWidth;
    while (next > 0) next -= copyWidth;

    xPx.set(next);
  });

  return (
    <div className="whitespace-nowrap py-4 lg:py-8">
      <motion.div
        ref={containerRef}
        className="flex items-center whitespace-nowrap will-change-transform"
        style={{ x: xPx }}
      >
        {[0, 1, 2, 3].map(i => (
          <div key={i} className="flex items-center flex-shrink-0">
            <MarqueeContent />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const ScrollVelocityMarquee = () => (
  <section className="relative bg-[#EFEEE9] py-24 lg:py-36 overflow-hidden" aria-hidden="true">
    <MarqueeRow baseVelocity={-85} />
  </section>
);

const LegacyCard = ({ title, paragraphs, imageSrc, imageAlt, cardBg, textColor, rotation, imageRotation }) => (
  <div
    role="article"
    style={{
      width: '100%',
      height: '100%',
      backgroundColor: cardBg,
      color: textColor,
      borderRadius: '24px',
      transform: `rotate(${rotation}deg)`,
      transformOrigin: 'center center',
      padding: 'clamp(24px, 4.5vw, 48px) clamp(28px, 5vw, 56px)',
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.18), 0 10px 20px -8px rgba(0,0,0,0.10)',
    }}
  >
    <div className="h-full flex flex-col items-center justify-center text-center gap-5 md:gap-6">
      <div
        className="overflow-hidden flex-shrink-0"
        style={{
          width: 'clamp(120px, 30vw, 180px)',
          height: 'clamp(106px, 26vw, 160px)',
          borderRadius: '14px',
          transform: `rotate(${imageRotation}deg)`,
        }}
      >
        <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
      </div>
      <h3
        className="font-medium leading-[1.0] tracking-tight"
        style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
      >
        {title}
      </h3>
      <div className="flex flex-col gap-3 md:gap-4" style={{ maxWidth: 'min(360px, 75%)' }}>
        {paragraphs.map((p, i) => (
          <p key={i} className="text-xs md:text-sm leading-[1.55] opacity-90">{p}</p>
        ))}
      </div>
    </div>
  </div>
);

const LegacyInTheMaking = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Gentle spring for silky transitions — stiffness/damping tuned to feel responsive but smooth
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 });

  // All 3 cards visible in the fanned stack from the start. Each exits upward one by one.

  // Pioneers: front card, centered, exits upward during 0 → 0.4
  const y0 = useTransform(progress, [0, 0.4], ['0%', '-160%']);

  // Award Winning: starts 22% below (peeking behind Pioneers due to rotation),
  // rises to center as Pioneers exits (0→0.4), then exits upward (0.4→0.8)
  const y1 = useTransform(progress, [0, 0.4, 0.8], ['22%', '0%', '-160%']);

  // Speed: starts 42% below (lowest in the fan, still visible),
  // rises to 22% as Pioneers exits (0→0.4), then rises to center (0.4→0.8)
  const y2 = useTransform(progress, [0, 0.4, 0.8], ['42%', '22%', '0%']);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#EFEEE9]"
      style={{ height: '300vh' }}
    >
      {/* Sticky viewport — label at top, cards centered in remaining space */}
      <div className="sticky top-0 h-screen flex flex-col items-center overflow-hidden">

        {/* Label — top of viewport */}
        <p className="text-base font-bold text-[#0A0A0A] tracking-tight pt-10 md:pt-14">
          Legacy In The Making
        </p>

        {/* Cards — fill remaining height, centered */}
        <div className="flex-1 flex items-center justify-center w-full">
          <div
            className="relative"
            style={{ width: 'min(500px, 86vw)', aspectRatio: '1 / 1' }}
          >
            {/* Speed — back layer, slides up last */}
            <motion.div className="absolute inset-0" style={{ zIndex: 28, y: y2 }}>
              <LegacyCard {...legacyCards[2]} />
            </motion.div>

            {/* Award Winning — middle layer */}
            <motion.div className="absolute inset-0" style={{ zIndex: 29, y: y1 }}>
              <LegacyCard {...legacyCards[1]} />
            </motion.div>

            {/* Pioneers — front layer, exits first */}
            <motion.div className="absolute inset-0" style={{ zIndex: 30, y: y0 }}>
              <LegacyCard {...legacyCards[0]} />
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

const AuthorAvatar = ({ name }) => {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);
  return (
    <span
      className="w-5 h-5 rounded-full flex items-center justify-center text-white flex-shrink-0 bg-g-400"
      style={{ fontSize: '7px', fontWeight: 700 }}
    >
      {initials}
    </span>
  );
};

// Each card tracks the mouse inside its image and renders the mint circle AT the cursor position
const BlogCard = ({ post }) => {
  const imgRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e) => {
    const r = imgRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <a href="#" className="block">
      {/* Image with custom cursor */}
      <div
        ref={imgRef}
        className="relative aspect-square overflow-hidden rounded-2xl md:rounded-3xl mb-4 bg-g-150"
        style={{ cursor: 'none' }}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {post.category && (
          <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-semibold text-g-900 tracking-wide">
            {post.category}
          </span>
        )}

        <img
          src={post.img}
          alt={post.title}
          className="w-full h-full object-cover transition-all duration-500"
          style={{
            filter: hovered ? 'blur(3px)' : 'none',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }}
        />

        {/* Mint cursor circle — positioned exactly at mouse coords */}
        <div
          className="absolute pointer-events-none z-20 rounded-full bg-mint flex items-center justify-center shadow-lg"
          style={{
            width: 72, height: 72,
            left: pos.x, top: pos.y,
            transform: 'translate(-50%, -50%)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.2s',
          }}
        >
          <ArrowUpRight size={24} strokeWidth={2} className="text-g-900" />
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-2 text-xs font-medium mb-3 text-g-300">
        <AuthorAvatar name={post.author} />
        <span className="text-g-900/70">{post.author}</span>
        <span className="flex items-center gap-1">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
          </svg>
          {post.readTime}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-[15px] md:text-base lg:text-[17px] font-semibold text-g-900 leading-snug tracking-tight">
        {post.title}
      </h3>
    </a>
  );
};

const BlogPreview = () => (
  <section className="bg-g-100 py-14 md:py-20 lg:py-24">
    {/* Heading row — padded like the rest of the page */}
    <div className="px-5 md:px-8 lg:px-12 xl:px-16 mb-5 md:mb-7">
      <div className="flex items-center justify-between gap-6">
        <h2
          className="flex items-center gap-3 md:gap-4 font-bold text-g-900 leading-[0.9] tracking-tight"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 8rem)' }}
        >
          What&apos;s
          <span
            className="inline-block rounded-xl md:rounded-2xl overflow-hidden flex-shrink-0"
            style={{ width: '0.68em', height: '0.68em', position: 'relative', top: '-0.02em', verticalAlign: 'middle' }}
          >
            <img src="/blog/heading-inline.jpg" alt="" className="w-full h-full object-cover" />
          </span>
          New
        </h2>
        <a
          href="#"
          className="flex-shrink-0 flex items-center gap-1.5 px-5 py-3 rounded-full border border-g-900/20 bg-white text-g-900 text-sm font-medium tracking-tightish hover:bg-g-900 hover:text-white transition-colors whitespace-nowrap"
        >
          Explore More Thoughts <ArrowUpRight size={13} strokeWidth={2} />
        </a>
      </div>
    </div>

    {/* Divider — full width */}
    <div className="border-t border-g-900/10 mb-6 md:mb-8" />

    {/* Cards — full viewport width, minimal side padding */}
    <div className="px-3 md:px-5 lg:px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 lg:gap-5">
        {blogPosts.map((post, i) => (
          <BlogCard key={i} post={post} />
        ))}
      </div>
    </div>
  </section>
);

const ReadyToRise = () => {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Text travels from fully off-screen right (+100vw) to fully off-screen left (~-250vw)
  // Total travel ≈ 3.5× viewport width to clear the full nowrap text string
  const x = useTransform(scrollYProgress, v => (1.0 - v * 3.5) * window.innerWidth);
  // Subtle diagonal: starts 10vh below center, ends 10vh above center
  const y = useTransform(scrollYProgress, v => (0.1 - v * 0.2) * window.innerHeight);

  if (prefersReducedMotion) {
    return (
      <section className="bg-g-100 overflow-x-hidden py-24 flex items-center justify-center">
        <h2
          className="font-medium text-g-900 text-center"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '-0.04em', lineHeight: 1 }}
        >
          Ready to Rise at Seven?
        </h2>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="bg-g-100 relative" style={{ height: '200vh' }}>
      <div className="sticky top-0 w-full flex items-center overflow-hidden" style={{ height: '100vh' }}>
        <motion.h2
          className="font-medium text-g-900"
          style={{
            fontSize: 'clamp(8rem, 18vw, 22rem)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            willChange: 'transform',
            x,
            y,
            margin: 0,
          }}
        >
          Ready to Rise at Seven?
        </motion.h2>
      </div>
    </section>
  );
};

const Footer = () => {
  const [email, setEmail] = useState('');
  const socials = ['facebook', 'x', 'linkedin', 'youtube', 'tiktok', 'instagram'];

  return (
    <footer className="bg-g-100 px-3 pb-3 md:px-5 md:pb-5">
      <div className="bg-g-900 rounded-2xl md:rounded-3xl overflow-hidden">

        {/* ── Top: newsletter + 3 nav columns ── */}
        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">

          {/* Newsletter */}
          <div className="p-8 md:p-10 xl:p-12">
            <h3 className="text-white text-lg md:text-xl font-medium tracking-tight leading-snug mb-6">
              Stay updated with Rise news
            </h3>
            <div className="flex items-center gap-2 mb-7">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your Email Address"
                className="flex-1 min-w-0 bg-g-400 text-white placeholder-white/35 focus:outline-none text-sm font-medium px-4 py-3 rounded-full"
              />
              <button
                onClick={() => setEmail('')}
                aria-label="Subscribe"
                className="flex-shrink-0 w-10 h-10 rounded-full bg-mint text-g-900 flex items-center justify-center hover:brightness-110 transition"
              >
                <ArrowUpRight size={15} strokeWidth={2.5} />
              </button>
            </div>
            {/* Social icons */}
            <div className="flex flex-wrap gap-2">
              {socials.map(s => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="relative w-9 h-9 rounded-lg border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/35 transition-colors"
                >
                  <SocialIcon type={s} />
                  <span className="absolute top-1 right-1 text-white/40">
                    <ArrowUpRight size={7} strokeWidth={2.5} />
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Nav column 1 */}
          <div className="p-8 md:p-10 xl:p-12">
            <div className="space-y-4">
              {['Services', 'Work', 'About', 'Culture', 'Meet The Risers'].map(l => (
                <SlideLink
                  key={l} href="#" label={l}
                  className="block text-base font-medium text-white/70 hover:text-white tracking-tight transition-colors"
                />
              ))}
            </div>
          </div>

          {/* Nav column 2 */}
          <div className="p-8 md:p-10 xl:p-12">
            <div className="space-y-4">
              {['Testimonials', 'Blog & Resources', 'Webinars', 'Careers'].map(l => (
                <SlideLink
                  key={l} href="#" label={l}
                  className="block text-base font-medium text-white/70 hover:text-white tracking-tight transition-colors"
                />
              ))}
            </div>
          </div>

          {/* Offices column */}
          <div className="p-8 md:p-10 xl:p-12">
            <div className="space-y-4">
              {['Sheffield', 'Manchester', 'London', 'New York', 'Contact'].map(l => (
                <SlideLink
                  key={l} href="#" label={l}
                  className="block text-base font-medium text-white/70 hover:text-white tracking-tight transition-colors"
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Giant wordmark ── */}
        <div className="px-6 md:px-8 xl:px-10 pt-6 overflow-hidden">
          <p
            className="text-white font-medium leading-[0.82] tracking-tight select-none"
            style={{ fontSize: 'clamp(4.5rem, 13.5vw, 17rem)' }}
          >
            Rise at Seven<sup style={{ fontSize: '0.35em', verticalAlign: 'super', lineHeight: 0 }}>®</sup>
          </p>
        </div>

        {/* ── Copyright bar ── */}
        <div className="px-6 md:px-8 xl:px-10 py-5 mt-4 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-[11px] text-white/30 font-medium tracking-tight">
          <p>
            © 2025 Rise at Seven Ltd. All rights reserved &nbsp;•&nbsp; Company Number 11955187 &nbsp;•&nbsp; VAT Registered GB 322402945 &nbsp;•&nbsp;{' '}
            <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            &nbsp;•&nbsp;
            <a href="#" className="hover:text-white/60 transition-colors">Terms &amp; conditions</a>
          </p>
          <p className="flex-shrink-0">Website MadeByShape</p>
        </div>

      </div>
    </footer>
  );
};

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="bg-g-100 font-sans antialiased">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <main>
        <Hero />
        <ClientLogos />
        <DrivingDemand />
        <FeaturedWork />
        <OurServices />
        <ScrollVelocityMarquee />
        <LegacyInTheMaking />
        <BlogPreview />
        <ReadyToRise />
      </main>
      <Footer />
    </div>
  );
}
