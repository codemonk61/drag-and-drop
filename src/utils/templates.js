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
        props: { padding: 16, bgColor: '#ffffff', textColor: '#1a1a1a', image: null, title: 'TRAFASA', links: 'Home,Shop,Collections,About,Contact', blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
      },
      {
        id: 'tpl-hero-1', type: 'HERO_BANNER', children: [],
        props: { padding: 80, bgColor: '#f5f0eb', textColor: '#1a1a1a', image: null, title: 'New Season Arrivals', subtitle: 'Discover the latest trends in fashion and lifestyle', buttonText: 'Shop Now', buttonBg: '#1a1a1a', buttonColor: '#ffffff', overlayOpacity: 0, textAlign: 'center', blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
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
          { name: 'Classic Tee', price: '$49.00', image: null },
          { name: 'Linen Shirt', price: '$89.00', image: null },
          { name: 'Wool Blazer', price: '$199.00', image: null },
          { name: 'Denim Jacket', price: '$149.00', image: null },
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
        props: { padding: 40, bgColor: '#1a1a1a', textColor: '#ffffff', brandName: 'TRAFASA', description: 'Premium fashion & lifestyle store', col1Title: 'Shop', col1Links: 'New Arrivals,Best Sellers,Sale,Collections', col2Title: 'Help', col2Links: 'FAQ,Shipping,Returns,Contact Us', col3Title: 'About', col3Links: 'Our Story,Careers,Press,Blog', copyright: '© 2026 TRAFASA. All rights reserved.', blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
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
        props: { padding: 16, bgColor: '#ffffff', textColor: '#1a1a1a', image: null, title: 'TRAFASA', links: 'Home,Shop,Collections,About,Contact', blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
      },
      {
        id: 'tpl2-hero', type: 'HERO_BANNER', children: [],
        props: { padding: 100, bgColor: '#0f0f0f', textColor: '#ffffff', image: null, title: 'The New Collection', subtitle: 'Explore our latest arrivals crafted with precision and style', buttonText: 'Explore Now', buttonBg: '#ffffff', buttonColor: '#0f0f0f', overlayOpacity: 0, textAlign: 'center', blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
      },
      {
        id: 'tpl2-collections', type: 'COLLECTION_LIST', children: [],
        props: { padding: 60, bgColor: '#ffffff', textColor: '#1a1a1a', title: 'Shop by Category', columns: 3, collections: JSON.stringify([
          { name: 'Women', image: null },
          { name: 'Men', image: null },
          { name: 'Accessories', image: null },
        ]), blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
      },
      {
        id: 'tpl2-products', type: 'PRODUCT_GRID', children: [],
        props: { padding: 60, bgColor: '#faf9f7', textColor: '#1a1a1a', title: 'Best Sellers', subtitle: 'Our most popular items', columns: 4, products: JSON.stringify([
          { name: 'Classic Tee', price: '$49.00', image: null },
          { name: 'Linen Shirt', price: '$89.00', image: null },
          { name: 'Wool Blazer', price: '$199.00', image: null },
          { name: 'Denim Jacket', price: '$149.00', image: null },
        ]), blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
      },
      {
        id: 'tpl2-about', type: 'IMAGE_WITH_TEXT', children: [],
        props: { padding: 60, bgColor: '#ffffff', textColor: '#1a1a1a', image: null, title: 'Our Story', description: 'Founded with a passion for quality and design, we create timeless pieces that inspire confidence.', buttonText: 'Learn More', buttonBg: '#1a1a1a', buttonColor: '#ffffff', imagePosition: 'left', blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
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
        props: { padding: 40, bgColor: '#0f0f0f', textColor: '#ffffff', brandName: 'TRAFASA', description: 'Premium fashion & lifestyle store', col1Title: 'Shop', col1Links: 'New Arrivals,Best Sellers,Sale,Collections', col2Title: 'Help', col2Links: 'FAQ,Shipping,Returns,Contact Us', col3Title: 'About', col3Links: 'Our Story,Careers,Press,Blog', copyright: '© 2026 TRAFASA. All rights reserved.', blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
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
        props: { padding: 16, bgColor: '#ffffff', textColor: '#1a1a1a', image: null, title: 'STUDIO', links: 'Work,About,Contact', blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
      },
      {
        id: 'tpl3-hero', type: 'HERO_BANNER', children: [],
        props: { padding: 120, bgColor: '#faf9f7', textColor: '#1a1a1a', image: null, title: 'We Create Beautiful Things', subtitle: 'A design studio focused on crafting meaningful digital experiences', buttonText: 'View Our Work', buttonBg: '#1a1a1a', buttonColor: '#ffffff', overlayOpacity: 0, textAlign: 'center', blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
      },
      {
        id: 'tpl3-about', type: 'IMAGE_WITH_TEXT', children: [],
        props: { padding: 80, bgColor: '#ffffff', textColor: '#1a1a1a', image: null, title: 'About Us', description: 'We are a team of designers and developers passionate about creating exceptional digital products that make a difference.', buttonText: 'Meet the Team', buttonBg: '#1a1a1a', buttonColor: '#ffffff', imagePosition: 'right', blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
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
        props: { padding: 40, bgColor: '#1a1a1a', textColor: '#ffffff', brandName: 'STUDIO', description: 'Design & Development Studio', col1Title: 'Services', col1Links: 'Web Design,Branding,Development,Consulting', col2Title: 'Connect', col2Links: 'Twitter,Instagram,Dribbble,LinkedIn', col3Title: 'Legal', col3Links: 'Privacy,Terms,Cookies', copyright: '© 2026 STUDIO. All rights reserved.', blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400 },
      },
    ],
  },
];
