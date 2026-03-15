// Pre-built starter templates for quick page creation
export const TEMPLATES = [
  {
    id: 'blank',
    name: 'Blank Page',
    description: 'Start from scratch',
    icon: 'blank',
    layout: [],
  },
  {
    id: 'luxe',
    name: 'LUXE Fashion Store',
    description: 'Premium 13-section storefront: carousel hero, categories, products, about, testimonials, features, newsletter & footer',
    icon: 'store',
    layout: [
      // ── 1. ANNOUNCEMENT BAR ──
      {
        id: 'luxe-banner', type: 'BANNER_STRIP', children: [],
        props: {
          padding: 10, bgColor: '#0c0c0c', textColor: '#d4af37',
          text: 'SUMMER SALE — UP TO 40% OFF  |  FREE SHIPPING ON ORDERS OVER $75  |  USE CODE: LUXE40',
          fontSize: 11, fontWeight: '600',
          blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
        },
      },
      // ── 2. HEADER ──
      {
        id: 'luxe-header', type: 'HEADER', children: [],
        props: {
          padding: 18, bgColor: '#ffffff', textColor: '#0c0c0c', image: null,
          title: 'LUXE', links: 'Home,New In,Women,Men,Accessories,Sale',
          linkUrls: '/,/new,/women,/men,/accessories,/sale',
          blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
        },
      },
      // ── 3. HERO CAROUSEL ──
      {
        id: 'luxe-carousel', type: 'CAROUSEL', children: [
          {
            id: 'luxe-slide-1', type: 'SLIDE', children: [],
            props: {
              bgColor: '#1a1a2e', textColor: '#ffffff', image: null,
              tag: 'NEW COLLECTION', title: 'Elegance\nRedefined', titleSize: 56,
              description: 'Discover our latest collection of premium fashion pieces designed for the modern individual.',
              descSize: 16,
              buttonText: 'SHOP NOW', buttonLink: '/new', buttonBg: '#d4af37', buttonColor: '#0c0c0c',
              openNewTab: false, overlayOpacity: 0, padding: 80, minHeight: 520,
              verticalAlign: 'center', horizontalAlign: 'flex-start',
              blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
            },
          },
          {
            id: 'luxe-slide-2', type: 'SLIDE', children: [],
            props: {
              bgColor: '#2d1b4e', textColor: '#ffffff', image: null,
              tag: 'LIMITED EDITION', title: 'The Autumn\nCapsule', titleSize: 56,
              description: 'Hand-selected pieces that transition seamlessly from day to night.',
              descSize: 16,
              buttonText: 'EXPLORE', buttonLink: '/collections/autumn', buttonBg: '#ffffff', buttonColor: '#2d1b4e',
              openNewTab: false, overlayOpacity: 0, padding: 80, minHeight: 520,
              verticalAlign: 'center', horizontalAlign: 'flex-start',
              blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
            },
          },
          {
            id: 'luxe-slide-3', type: 'SLIDE', children: [],
            props: {
              bgColor: '#1b3a2d', textColor: '#ffffff', image: null,
              tag: 'JUST DROPPED', title: 'Sustainable\nLuxury', titleSize: 56,
              description: 'Ethically sourced, beautifully crafted. Fashion that feels good.',
              descSize: 16,
              buttonText: 'DISCOVER', buttonLink: '/sustainable', buttonBg: '#d4af37', buttonColor: '#0c0c0c',
              openNewTab: false, overlayOpacity: 0, padding: 80, minHeight: 520,
              verticalAlign: 'center', horizontalAlign: 'flex-start',
              blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
            },
          },
        ],
        props: {
          bgColor: '#1a1a2e', borderRadius: 0, minHeight: 520,
          autoPlay: true, interval: 6, showArrows: true, showDots: true,
          dotColor: 'rgba(255,255,255,0.3)', dotActiveColor: '#d4af37',
          blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
        },
      },
      // ── 4. SHOP BY CATEGORY ──
      {
        id: 'luxe-section-cat', type: 'SECTION', children: [
          {
            id: 'luxe-cat-grid', type: 'GRID', children: [
              {
                id: 'luxe-cat-1', type: 'INFO_CARD', children: [],
                props: {
                  bgColor: '#f8f7f4', textColor: '#0c0c0c', image: null,
                  title: 'Women', aspectRatio: '3/4', borderRadius: 8,
                  padding: 16, fontSize: 15, showArrow: true, link: '/women',
                  blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
                },
              },
              {
                id: 'luxe-cat-2', type: 'INFO_CARD', children: [],
                props: {
                  bgColor: '#f0ebe4', textColor: '#0c0c0c', image: null,
                  title: 'Men', aspectRatio: '3/4', borderRadius: 8,
                  padding: 16, fontSize: 15, showArrow: true, link: '/men',
                  blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
                },
              },
              {
                id: 'luxe-cat-3', type: 'INFO_CARD', children: [],
                props: {
                  bgColor: '#e8e3db', textColor: '#0c0c0c', image: null,
                  title: 'Accessories', aspectRatio: '3/4', borderRadius: 8,
                  padding: 16, fontSize: 15, showArrow: true, link: '/accessories',
                  blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
                },
              },
            ],
            props: {
              padding: 0, gap: 20, columns: 3, bgColor: 'transparent',
              textColor: '#1a1a1a', title: '', borderRadius: 0,
              blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
            },
          },
        ],
        props: {
          padding: 60, bgColor: '#ffffff', textColor: '#0c0c0c',
          title: 'Shop by Category',
          description: 'Find your perfect style across our curated collections.',
          textAlign: 'center',
          blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
        },
      },
      // ── 5. TRENDING PRODUCTS ──
      {
        id: 'luxe-products', type: 'PRODUCT_GRID', children: [],
        props: {
          padding: 70, bgColor: '#faf9f7', textColor: '#0c0c0c',
          title: 'Trending Now', subtitle: 'The pieces everyone is loving this season', columns: 4,
          products: JSON.stringify([
            { name: 'Silk Wrap Dress', price: '$189.00', image: null, link: '/product/silk-wrap', openNewTab: false },
            { name: 'Cashmere Cardigan', price: '$245.00', image: null, link: '/product/cashmere', openNewTab: false },
            { name: 'Leather Tote Bag', price: '$320.00', image: null, link: '/product/leather-tote', openNewTab: false },
            { name: 'Tailored Wool Coat', price: '$495.00', image: null, link: '/product/wool-coat', openNewTab: false },
          ]),
          blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
        },
      },
      // ── 6. ABOUT / BRAND STORY ──
      {
        id: 'luxe-about', type: 'IMAGE_WITH_TEXT', children: [],
        props: {
          padding: 80, bgColor: '#ffffff', textColor: '#0c0c0c', image: null,
          title: 'Crafted with Purpose',
          description: 'At LUXE, every stitch tells a story. We partner with artisan workshops across Europe to bring you pieces that are not just worn — they\'re experienced. Our commitment to sustainable materials and ethical production means you can feel as good as you look.',
          buttonText: 'Our Story', buttonBg: '#0c0c0c', buttonColor: '#ffffff',
          buttonLink: '/about', openNewTab: false, imagePosition: 'left',
          blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
        },
      },
      // ── 7. NEW ARRIVALS ──
      {
        id: 'luxe-new-arrivals', type: 'PRODUCT_GRID', children: [],
        props: {
          padding: 70, bgColor: '#f5f0eb', textColor: '#0c0c0c',
          title: 'New Arrivals', subtitle: 'Fresh drops added every week', columns: 4,
          products: JSON.stringify([
            { name: 'Ribbed Knit Top', price: '$79.00', image: null, link: '/product/ribbed-knit', openNewTab: false },
            { name: 'Pleated Midi Skirt', price: '$125.00', image: null, link: '/product/pleated-midi', openNewTab: false },
            { name: 'Gold Chain Necklace', price: '$165.00', image: null, link: '/product/gold-chain', openNewTab: false },
            { name: 'Suede Ankle Boots', price: '$275.00', image: null, link: '/product/suede-boots', openNewTab: false },
          ]),
          blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
        },
      },
      // ── 8. BRAND VALUES — ICON CARDS ──
      {
        id: 'luxe-values-section', type: 'SECTION', children: [
          {
            id: 'luxe-values-grid', type: 'GRID', children: [
              {
                id: 'luxe-value-1', type: 'ICON_CARD', children: [],
                props: {
                  icon: 'diamond', iconImage: null, iconSize: 40, iconColor: '#d4af37',
                  title: 'Premium Materials', titleSize: 15,
                  description: 'Only the finest fabrics and leathers sourced from trusted partners', descSize: 12,
                  textColor: '#ffffff', padding: 28,
                  blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
                },
              },
              {
                id: 'luxe-value-2', type: 'ICON_CARD', children: [],
                props: {
                  icon: 'globe', iconImage: null, iconSize: 40, iconColor: '#d4af37',
                  title: 'Sustainable Fashion', titleSize: 15,
                  description: 'Ethically made with eco-friendly processes and fair trade practices', descSize: 12,
                  textColor: '#ffffff', padding: 28,
                  blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
                },
              },
              {
                id: 'luxe-value-3', type: 'ICON_CARD', children: [],
                props: {
                  icon: 'certificate', iconImage: null, iconSize: 40, iconColor: '#d4af37',
                  title: 'Artisan Crafted', titleSize: 15,
                  description: 'Handcrafted by skilled artisans with decades of expertise', descSize: 12,
                  textColor: '#ffffff', padding: 28,
                  blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
                },
              },
              {
                id: 'luxe-value-4', type: 'ICON_CARD', children: [],
                props: {
                  icon: 'star', iconImage: null, iconSize: 40, iconColor: '#d4af37',
                  title: 'Timeless Design', titleSize: 15,
                  description: 'Classic silhouettes designed to transcend seasons and trends', descSize: 12,
                  textColor: '#ffffff', padding: 28,
                  blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
                },
              },
            ],
            props: {
              padding: 0, gap: 24, columns: 4, bgColor: 'transparent',
              textColor: '#ffffff', title: '', borderRadius: 0,
              blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
            },
          },
        ],
        props: {
          padding: 70, bgColor: '#0c0c0c', textColor: '#ffffff',
          title: 'The LUXE Difference',
          description: 'What sets us apart from the rest.',
          textAlign: 'center',
          blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
        },
      },
      // ── 9. TESTIMONIAL ──
      {
        id: 'luxe-testimonial', type: 'TESTIMONIAL', children: [],
        props: {
          padding: 80, bgColor: '#faf9f7', textColor: '#0c0c0c',
          quote: '"The quality is exceptional — every piece from LUXE feels like it was made just for me. The attention to detail is unmatched."',
          author: 'Amara Williams', role: 'Loyal Customer since 2023', rating: 5, image: null,
          blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
        },
      },
      // ── 10. FEATURED COLLECTION CTA ──
      {
        id: 'luxe-cta', type: 'HERO_BANNER', children: [],
        props: {
          padding: 100, bgColor: '#2d1b4e', textColor: '#ffffff', image: null,
          title: 'The Evening Edit',
          subtitle: 'Curated pieces for unforgettable nights. From cocktail dresses to statement jewelry.',
          buttonText: 'Shop the Edit', buttonBg: '#d4af37', buttonColor: '#0c0c0c',
          buttonLink: '/collections/evening', openNewTab: false,
          overlayOpacity: 0, textAlign: 'center',
          blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
        },
      },
      // ── 11. WHY SHOP WITH US ──
      {
        id: 'luxe-features', type: 'FEATURE_GRID', children: [],
        props: {
          padding: 60, bgColor: '#ffffff', textColor: '#0c0c0c', title: 'Why Shop With LUXE',
          features: JSON.stringify([
            { icon: 'truck', title: 'Free Express Shipping', desc: 'Complimentary on all orders over $75' },
            { icon: 'shield', title: 'Secure Checkout', desc: 'SSL encrypted with all major cards accepted' },
            { icon: 'refresh', title: '30-Day Returns', desc: 'Easy, hassle-free returns on all items' },
            { icon: 'headphones', title: 'Personal Styling', desc: 'Complimentary styling advice via chat' },
          ]),
          blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
        },
      },
      // ── 12. NEWSLETTER ──
      {
        id: 'luxe-newsletter', type: 'NEWSLETTER', children: [],
        props: {
          padding: 70, bgColor: '#0c0c0c', textColor: '#ffffff',
          title: 'Join the LUXE Circle',
          subtitle: 'Be the first to access new collections, exclusive offers, and styling tips. Get 15% off your first order.',
          buttonText: 'Subscribe', buttonBg: '#d4af37', buttonColor: '#0c0c0c',
          inputPlaceholder: 'Enter your email address',
          blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
        },
      },
      // ── 13. FOOTER ──
      {
        id: 'luxe-footer', type: 'FOOTER', children: [],
        props: {
          padding: 50, bgColor: '#0c0c0c', textColor: '#ffffff',
          brandName: 'LUXE',
          description: 'Premium fashion for the modern individual. Ethically made, beautifully designed.',
          col1Title: 'Shop',
          col1Links: 'New Arrivals|/new,Women|/women,Men|/men,Accessories|/accessories,Sale|/sale',
          col2Title: 'Customer Care',
          col2Links: 'Shipping & Returns|/shipping,Size Guide|/size-guide,FAQ|/faq,Contact Us|/contact',
          col3Title: 'Company',
          col3Links: 'Our Story|/about,Sustainability|/sustainability,Careers|/careers,Press|/press',
          copyright: '© 2026 LUXE. All rights reserved. Made with care.',
          blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
        },
      },
    ],
  },
  {
    id: 'landing',
    name: 'Landing Page',
    description: 'Hero, features, testimonial, newsletter & footer',
    icon: 'landing',
    layout: [
      {
        id: 'tpl-banner-1', type: 'BANNER_STRIP', children: [],
        props: { padding: 12, bgColor: '#1a1a1a', textColor: '#ffffff', text: 'FREE SHIPPING ON ORDERS OVER $50 | USE CODE: WELCOME10', fontSize: 12, fontWeight: '500', blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
      },
      {
        id: 'tpl-header-1', type: 'HEADER', children: [],
        props: { padding: 16, bgColor: '#ffffff', textColor: '#1a1a1a', image: null, title: 'TRAFASA', links: 'Home,Shop,Collections,About,Contact', linkUrls: '/,/shop,/collections,/about,/contact', blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
      },
      {
        id: 'tpl-hero-1', type: 'HERO_BANNER', children: [],
        props: { padding: 80, bgColor: '#f5f0eb', textColor: '#1a1a1a', image: null, title: 'New Season Arrivals', subtitle: 'Discover the latest trends in fashion and lifestyle', buttonText: 'Shop Now', buttonBg: '#1a1a1a', buttonColor: '#ffffff', buttonLink: '/shop', openNewTab: false, overlayOpacity: 0, textAlign: 'center', blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
      },
      {
        id: 'tpl-features-1', type: 'FEATURE_GRID', children: [],
        props: { padding: 60, bgColor: '#ffffff', textColor: '#1a1a1a', title: 'Why Choose Us', features: JSON.stringify([
          { icon: 'truck', title: 'Free Shipping', desc: 'On orders over $50' },
          { icon: 'shield', title: 'Secure Payment', desc: '100% protected' },
          { icon: 'refresh', title: 'Easy Returns', desc: '30-day return policy' },
          { icon: 'headphones', title: '24/7 Support', desc: 'Always here to help' },
        ]), blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
      },
      {
        id: 'tpl-products-1', type: 'PRODUCT_GRID', children: [],
        props: { padding: 60, bgColor: '#ffffff', textColor: '#1a1a1a', title: 'Featured Products', subtitle: 'Handpicked for you', columns: 4, products: JSON.stringify([
          { name: 'Classic Tee', price: '$49.00', image: null, link: '', openNewTab: false },
          { name: 'Linen Shirt', price: '$89.00', image: null, link: '', openNewTab: false },
          { name: 'Wool Blazer', price: '$199.00', image: null, link: '', openNewTab: false },
          { name: 'Denim Jacket', price: '$149.00', image: null, link: '', openNewTab: false },
        ]), blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
      },
      {
        id: 'tpl-testimonial-1', type: 'TESTIMONIAL', children: [],
        props: { padding: 60, bgColor: '#faf9f7', textColor: '#1a1a1a', quote: '"This is by far the best shopping experience I\'ve ever had."', author: 'Sarah Johnson', role: 'Verified Buyer', rating: 5, image: null, blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
      },
      {
        id: 'tpl-newsletter-1', type: 'NEWSLETTER', children: [],
        props: { padding: 60, bgColor: '#1a1a1a', textColor: '#ffffff', title: 'Stay in the Loop', subtitle: 'Subscribe to get special offers and exclusive deals.', buttonText: 'Subscribe', buttonBg: '#ffffff', buttonColor: '#1a1a1a', inputPlaceholder: 'Enter your email', blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
      },
      {
        id: 'tpl-footer-1', type: 'FOOTER', children: [],
        props: { padding: 40, bgColor: '#1a1a1a', textColor: '#ffffff', brandName: 'TRAFASA', description: 'Premium fashion & lifestyle store', col1Title: 'Shop', col1Links: 'New Arrivals|/new,Best Sellers|/best,Sale|/sale,Collections|/collections', col2Title: 'Help', col2Links: 'FAQ|/faq,Shipping|/shipping,Returns|/returns,Contact Us|/contact', col3Title: 'About', col3Links: 'Our Story|/about,Careers|/careers,Press|/press,Blog|/blog', copyright: '© 2026 TRAFASA. All rights reserved.', blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
      },
    ],
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce Store',
    description: 'Full store with categories, products & about section',
    icon: 'store',
    layout: [
      {
        id: 'tpl2-header', type: 'HEADER', children: [],
        props: { padding: 16, bgColor: '#ffffff', textColor: '#1a1a1a', image: null, title: 'TRAFASA', links: 'Home,Shop,Collections,About,Contact', linkUrls: '/,/shop,/collections,/about,/contact', blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
      },
      {
        id: 'tpl2-hero', type: 'HERO_BANNER', children: [],
        props: { padding: 100, bgColor: '#0f0f0f', textColor: '#ffffff', image: null, title: 'The New Collection', subtitle: 'Explore our latest arrivals crafted with precision and style', buttonText: 'Explore Now', buttonBg: '#ffffff', buttonColor: '#0f0f0f', buttonLink: '/new', openNewTab: false, overlayOpacity: 0, textAlign: 'center', blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
      },
      {
        id: 'tpl2-collections', type: 'COLLECTION_LIST', children: [],
        props: { padding: 60, bgColor: '#ffffff', textColor: '#1a1a1a', title: 'Shop by Category', columns: 3, collections: JSON.stringify([
          { name: 'Women', image: null, link: '/women' },
          { name: 'Men', image: null, link: '/men' },
          { name: 'Accessories', image: null, link: '/accessories' },
        ]), blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
      },
      {
        id: 'tpl2-products', type: 'PRODUCT_GRID', children: [],
        props: { padding: 60, bgColor: '#faf9f7', textColor: '#1a1a1a', title: 'Best Sellers', subtitle: 'Our most popular items', columns: 4, products: JSON.stringify([
          { name: 'Classic Tee', price: '$49.00', image: null, link: '', openNewTab: false },
          { name: 'Linen Shirt', price: '$89.00', image: null, link: '', openNewTab: false },
          { name: 'Wool Blazer', price: '$199.00', image: null, link: '', openNewTab: false },
          { name: 'Denim Jacket', price: '$149.00', image: null, link: '', openNewTab: false },
        ]), blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
      },
      {
        id: 'tpl2-about', type: 'IMAGE_WITH_TEXT', children: [],
        props: { padding: 60, bgColor: '#ffffff', textColor: '#1a1a1a', image: null, title: 'Our Story', description: 'Founded with a passion for quality and design, we create timeless pieces that inspire confidence.', buttonText: 'Learn More', buttonBg: '#1a1a1a', buttonColor: '#ffffff', buttonLink: '/about', openNewTab: false, imagePosition: 'left', blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
      },
      {
        id: 'tpl2-features', type: 'FEATURE_GRID', children: [],
        props: { padding: 60, bgColor: '#f5f0eb', textColor: '#1a1a1a', title: 'Why Shop With Us', features: JSON.stringify([
          { icon: 'truck', title: 'Free Shipping', desc: 'On all orders over $50' },
          { icon: 'shield', title: 'Secure Checkout', desc: 'SSL encrypted payments' },
          { icon: 'refresh', title: 'Easy Returns', desc: '30-day hassle-free returns' },
          { icon: 'headphones', title: 'Customer Support', desc: 'Available 24/7 for you' },
        ]), blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
      },
      {
        id: 'tpl2-newsletter', type: 'NEWSLETTER', children: [],
        props: { padding: 60, bgColor: '#1a1a1a', textColor: '#ffffff', title: 'Join Our Community', subtitle: 'Be the first to know about new arrivals and exclusive offers.', buttonText: 'Subscribe', buttonBg: '#ffffff', buttonColor: '#1a1a1a', inputPlaceholder: 'Enter your email', blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
      },
      {
        id: 'tpl2-footer', type: 'FOOTER', children: [],
        props: { padding: 40, bgColor: '#0f0f0f', textColor: '#ffffff', brandName: 'TRAFASA', description: 'Premium fashion & lifestyle store', col1Title: 'Shop', col1Links: 'New Arrivals|/new,Best Sellers|/best,Sale|/sale,Collections|/collections', col2Title: 'Help', col2Links: 'FAQ|/faq,Shipping|/shipping,Returns|/returns,Contact Us|/contact', col3Title: 'About', col3Links: 'Our Story|/about,Careers|/careers,Press|/press,Blog|/blog', copyright: '© 2026 TRAFASA. All rights reserved.', blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
      },
    ],
  },
  {
    id: 'portfolio',
    name: 'Portfolio / Brand',
    description: 'Minimal brand page with about, video & contact',
    icon: 'portfolio',
    layout: [
      {
        id: 'tpl3-header', type: 'HEADER', children: [],
        props: { padding: 16, bgColor: '#ffffff', textColor: '#1a1a1a', image: null, title: 'STUDIO', links: 'Work,About,Contact', linkUrls: '/work,/about,/contact', blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
      },
      {
        id: 'tpl3-hero', type: 'HERO_BANNER', children: [],
        props: { padding: 120, bgColor: '#faf9f7', textColor: '#1a1a1a', image: null, title: 'We Create Beautiful Things', subtitle: 'A design studio focused on crafting meaningful digital experiences', buttonText: 'View Our Work', buttonBg: '#1a1a1a', buttonColor: '#ffffff', buttonLink: '/work', openNewTab: false, overlayOpacity: 0, textAlign: 'center', blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
      },
      {
        id: 'tpl3-about', type: 'IMAGE_WITH_TEXT', children: [],
        props: { padding: 80, bgColor: '#ffffff', textColor: '#1a1a1a', image: null, title: 'About Us', description: 'We are a team of designers and developers passionate about creating exceptional digital products that make a difference.', buttonText: 'Meet the Team', buttonBg: '#1a1a1a', buttonColor: '#ffffff', buttonLink: '/about', openNewTab: false, imagePosition: 'right', blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
      },
      {
        id: 'tpl3-video', type: 'VIDEO', children: [],
        props: { padding: 60, bgColor: '#0f0f0f', textColor: '#ffffff', url: '', title: 'Watch Our Story', aspectRatio: '16/9', blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
      },
      {
        id: 'tpl3-section', type: 'SECTION', children: [],
        props: { padding: 80, bgColor: '#faf9f7', textColor: '#1a1a1a', title: 'Get in Touch', description: 'Ready to start your project? We\'d love to hear from you. Drop us a line and let\'s create something amazing together.', textAlign: 'center', blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
      },
      {
        id: 'tpl3-footer', type: 'FOOTER', children: [],
        props: { padding: 40, bgColor: '#1a1a1a', textColor: '#ffffff', brandName: 'STUDIO', description: 'Design & Development Studio', col1Title: 'Services', col1Links: 'Web Design|/services/web,Branding|/services/branding,Development|/services/dev,Consulting|/services/consulting', col2Title: 'Connect', col2Links: 'Twitter|#,Instagram|#,Dribbble|#,LinkedIn|#', col3Title: 'Legal', col3Links: 'Privacy|/privacy,Terms|/terms,Cookies|/cookies', copyright: '© 2026 STUDIO. All rights reserved.', blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
      },
    ],
  },
];
