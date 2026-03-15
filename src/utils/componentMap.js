import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import Section from '../components/Section';
import Button from '../components/Button';
import ImageBlock from '../components/ImageBlock';
import TextBlock from '../components/TextBlock';
import Divider from '../components/Divider';
import Spacer from '../components/Spacer';
import Testimonial from '../components/Testimonial';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';
import FeatureGrid from '../components/FeatureGrid';
import VideoBlock from '../components/VideoBlock';
import BannerStrip from '../components/BannerStrip';
import CollectionList from '../components/CollectionList';
import ImageWithText from '../components/ImageWithText';
import Row from '../components/Row';
import Column from '../components/Column';
import Grid from '../components/Grid';
import Carousel from '../components/Carousel';
import Slide from '../components/Slide';
import InfoCard from '../components/InfoCard';
import IconCard from '../components/IconCard';

export const COMPONENT_MAP = {
  HEADER: Header,
  HERO_BANNER: HeroBanner,
  SECTION: Section,
  CARD: ProductCard,
  BUTTON: Button,
  IMAGE: ImageBlock,
  TEXT: TextBlock,
  DIVIDER: Divider,
  SPACER: Spacer,
  TESTIMONIAL: Testimonial,
  NEWSLETTER: Newsletter,
  FOOTER: Footer,
  PRODUCT_GRID: ProductGrid,
  FEATURE_GRID: FeatureGrid,
  VIDEO: VideoBlock,
  BANNER_STRIP: BannerStrip,
  COLLECTION_LIST: CollectionList,
  IMAGE_WITH_TEXT: ImageWithText,
  ROW: Row,
  COLUMN: Column,
  GRID: Grid,
  CAROUSEL: Carousel,
  SLIDE: Slide,
  INFO_CARD: InfoCard,
  ICON_CARD: IconCard,
};

// These block types can accept children (nested blocks you can drag inside)
export const CONTAINER_TYPES = new Set([
  'ROW', 'COLUMN', 'GRID', 'CAROUSEL', 'SLIDE',
  'SECTION', 'HERO_BANNER', 'IMAGE_WITH_TEXT', 'FOOTER', 'NEWSLETTER', 'TESTIMONIAL',
]);

export const INITIAL_PROPS = {
  HEADER: {
    padding: 16, bgColor: '#ffffff', textColor: '#1a1a1a', image: null,
    title: 'TRAFASA', links: 'Home,Shop,Collections,About,Contact',
    linkUrls: '/,/shop,/collections,/about,/contact',
    blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
  },
  HERO_BANNER: {
    padding: 80, bgColor: '#f5f0eb', textColor: '#1a1a1a', image: null,
    title: 'New Season Arrivals', subtitle: 'Discover the latest trends in fashion and lifestyle',
    buttonText: 'Shop Now', buttonBg: '#1a1a1a', buttonColor: '#ffffff',
    buttonLink: '', openNewTab: false,
    overlayOpacity: 0, textAlign: 'center',
    blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
  },
  SECTION: {
    padding: 60, bgColor: '#ffffff', textColor: '#1a1a1a',
    title: 'About Our Brand',
    description: 'We believe in creating timeless pieces that blend quality craftsmanship with modern design.',
    textAlign: 'center',
    blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
  },
  CARD: {
    padding: 0, bgColor: '#ffffff', textColor: '#1a1a1a', image: null,
    title: 'Product Name', price: '$129.00', comparePrice: '$159.00', badge: 'New',
    blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
  },
  BUTTON: {
    text: 'Shop Now', bgColor: '#1a1a1a', textColor: '#ffffff',
    paddingX: 32, paddingY: 14, borderRadius: 0, borderWidth: 0, borderColor: '#1a1a1a',
    fontSize: 14, fontWeight: '500', fullWidth: false,
    showArrow: false, link: '', openNewTab: false, align: 'center',
    blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
  },
  IMAGE: {
    padding: 0, bgColor: '#f5f0eb', image: null, alt: 'Image',
    aspectRatio: '16/9', objectFit: 'cover', borderRadius: 0,
    blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
  },
  TEXT: {
    padding: 40, bgColor: '#ffffff', textColor: '#1a1a1a',
    content: 'Add your text content here.',
    fontSize: 16, fontWeight: 'normal', textAlign: 'left', lineHeight: 1.7,
    blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
  },
  DIVIDER: {
    padding: 20, bgColor: '#ffffff', lineColor: '#e5e5e5',
    lineWidth: 1, lineStyle: 'solid', width: 100,
    blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
  },
  SPACER: {
    height: 60, bgColor: 'transparent',
    blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
  },
  TESTIMONIAL: {
    padding: 60, bgColor: '#faf9f7', textColor: '#1a1a1a',
    quote: '"This is by far the best shopping experience I\'ve ever had."',
    author: 'Sarah Johnson', role: 'Verified Buyer', rating: 5, image: null,
    blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
  },
  NEWSLETTER: {
    padding: 60, bgColor: '#1a1a1a', textColor: '#ffffff',
    title: 'Stay in the Loop', subtitle: 'Subscribe to get special offers and exclusive deals.',
    buttonText: 'Subscribe', buttonBg: '#ffffff', buttonColor: '#1a1a1a',
    inputPlaceholder: 'Enter your email',
    blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
  },
  FOOTER: {
    padding: 40, bgColor: '#1a1a1a', textColor: '#ffffff',
    brandName: 'TRAFASA', description: 'Premium fashion & lifestyle store',
    col1Title: 'Shop', col1Links: 'New Arrivals,Best Sellers,Sale,Collections',
    col2Title: 'Help', col2Links: 'FAQ,Shipping,Returns,Contact Us',
    col3Title: 'About', col3Links: 'Our Story,Careers,Press,Blog',
    copyright: '© 2026 TRAFASA. All rights reserved.',
    blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
  },
  PRODUCT_GRID: {
    padding: 60, bgColor: '#ffffff', textColor: '#1a1a1a',
    title: 'Featured Products', subtitle: 'Handpicked for you', columns: 4,
    products: JSON.stringify([
      { name: 'Classic Tee', price: '$49.00', image: null, link: '', openNewTab: false },
      { name: 'Linen Shirt', price: '$89.00', image: null, link: '', openNewTab: false },
      { name: 'Wool Blazer', price: '$199.00', image: null, link: '', openNewTab: false },
      { name: 'Denim Jacket', price: '$149.00', image: null, link: '', openNewTab: false },
    ]),
    blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
  },
  FEATURE_GRID: {
    padding: 60, bgColor: '#ffffff', textColor: '#1a1a1a', title: 'Why Choose Us',
    features: JSON.stringify([
      { icon: 'truck', title: 'Free Shipping', desc: 'On orders over $50' },
      { icon: 'shield', title: 'Secure Payment', desc: '100% protected' },
      { icon: 'refresh', title: 'Easy Returns', desc: '30-day return policy' },
      { icon: 'headphones', title: '24/7 Support', desc: 'Always here to help' },
    ]),
    blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
  },
  VIDEO: {
    padding: 40, bgColor: '#000000', textColor: '#ffffff',
    url: '', title: 'Watch Our Story', aspectRatio: '16/9',
    blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
  },
  BANNER_STRIP: {
    padding: 12, bgColor: '#1a1a1a', textColor: '#ffffff',
    text: 'FREE SHIPPING ON ORDERS OVER $50 | USE CODE: WELCOME10',
    fontSize: 12, fontWeight: '500',
    blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
  },
  COLLECTION_LIST: {
    padding: 60, bgColor: '#ffffff', textColor: '#1a1a1a',
    title: 'Shop by Category', columns: 3,
    collections: JSON.stringify([
      { name: 'Women', image: null },
      { name: 'Men', image: null },
      { name: 'Accessories', image: null },
    ]),
    blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
  },
  IMAGE_WITH_TEXT: {
    padding: 60, bgColor: '#ffffff', textColor: '#1a1a1a', image: null,
    title: 'Our Story',
    description: 'Founded with a passion for quality and design, we create timeless pieces that inspire confidence.',
    buttonText: 'Learn More', buttonBg: '#1a1a1a', buttonColor: '#ffffff',
    buttonLink: '', openNewTab: false, imagePosition: 'left',
    blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
  },
  ROW: {
    padding: 20, gap: 16, bgColor: '#ffffff', alignItems: 'stretch',
    justifyContent: 'flex-start', wrap: false, borderRadius: 0,
    blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
  },
  COLUMN: {
    padding: 16, gap: 12, bgColor: 'transparent', alignItems: 'stretch',
    justifyContent: 'flex-start', flex: '1 1 0%', borderRadius: 8,
    showBorder: true, borderColor: '#e5e7eb',
    blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
  },
  GRID: {
    padding: 20, gap: 16, columns: 3, bgColor: '#ffffff',
    textColor: '#1a1a1a', title: '', borderRadius: 0,
    blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
  },
  CAROUSEL: {
    bgColor: '#f0f4ff', borderRadius: 0, minHeight: 450,
    autoPlay: true, interval: 5, showArrows: true, showDots: true,
    dotColor: 'rgba(255,255,255,0.5)', dotActiveColor: '#f97316',
    blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
  },
  SLIDE: {
    bgColor: '#f0f4ff', textColor: '#1a1a1a', image: null,
    tag: '', title: 'Slide Title', titleSize: 48,
    description: '', descSize: 16,
    buttonText: 'VIEW MORE', buttonLink: '', buttonBg: '#6366f1', buttonColor: '#ffffff',
    openNewTab: false, overlayOpacity: 0, padding: 60, minHeight: 450,
    verticalAlign: 'center', horizontalAlign: 'flex-start',
    blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
  },
  INFO_CARD: {
    bgColor: '#ffffff', textColor: '#1a1a1a', image: null,
    title: 'Category Title', aspectRatio: '4/3', borderRadius: 12,
    padding: 16, fontSize: 14, showArrow: true, link: '',
    blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
  },
  ICON_CARD: {
    icon: 'bolt', iconImage: null, iconSize: 48, iconColor: '#ffffff',
    title: 'Feature Title', titleSize: 16,
    description: 'Feature description goes here', descSize: 13,
    textColor: '#ffffff', padding: 24,
    blockWidth: 100, blockMinHeight: 0, blockMaxWidth: 1400,
  },
};

export const BLOCK_CATEGORIES = [
  {
    name: 'Containers',
    blocks: [
      { type: 'ROW', label: 'Row (Horizontal)', icon: 'columns' },
      { type: 'COLUMN', label: 'Column', icon: 'sidebar' },
      { type: 'GRID', label: 'Grid', icon: 'grid' },
      { type: 'CAROUSEL', label: 'Carousel / Slider', icon: 'carousel' },
      { type: 'SLIDE', label: 'Slide', icon: 'image' },
    ],
  },
  {
    name: 'Layout',
    blocks: [
      { type: 'HEADER', label: 'Header', icon: 'layout' },
      { type: 'FOOTER', label: 'Footer', icon: 'footer' },
      { type: 'DIVIDER', label: 'Divider', icon: 'minus' },
      { type: 'SPACER', label: 'Spacer', icon: 'space' },
    ],
  },
  {
    name: 'Hero',
    blocks: [
      { type: 'HERO_BANNER', label: 'Hero Banner', icon: 'image' },
      { type: 'BANNER_STRIP', label: 'Announcement Bar', icon: 'megaphone' },
      { type: 'IMAGE_WITH_TEXT', label: 'Image with Text', icon: 'columns' },
    ],
  },
  {
    name: 'Content',
    blocks: [
      { type: 'SECTION', label: 'Section', icon: 'section' },
      { type: 'TEXT', label: 'Text Block', icon: 'type' },
      { type: 'IMAGE', label: 'Image', icon: 'image' },
      { type: 'VIDEO', label: 'Video', icon: 'play' },
      { type: 'FEATURE_GRID', label: 'Feature Grid', icon: 'grid' },
      { type: 'TESTIMONIAL', label: 'Testimonial', icon: 'quote' },
      { type: 'ICON_CARD', label: 'Icon Card', icon: 'bolt' },
      { type: 'INFO_CARD', label: 'Info Card', icon: 'infocard' },
    ],
  },
  {
    name: 'Commerce',
    blocks: [
      { type: 'CARD', label: 'Product Card', icon: 'tag' },
      { type: 'PRODUCT_GRID', label: 'Product Grid', icon: 'grid' },
      { type: 'COLLECTION_LIST', label: 'Collections', icon: 'folder' },
      { type: 'BUTTON', label: 'Button', icon: 'pointer' },
      { type: 'NEWSLETTER', label: 'Newsletter', icon: 'mail' },
    ],
  },
];

const SIZE_SETTINGS = [
  { key: 'blockWidth', label: 'Width (%)', type: 'range', min: 20, max: 100 },
  { key: 'blockMinHeight', label: 'Min Height (px)', type: 'range', min: 0, max: 800 },
  { key: 'blockMaxWidth', label: 'Max Width (px)', type: 'range', min: 200, max: 1400 },
];

export const BLOCK_SETTINGS = {
  HEADER: [
    { key: 'title', label: 'Store Name', type: 'text' },
    { key: 'links', label: 'Nav Links (comma separated)', type: 'text' },
    { key: 'linkUrls', label: 'Link URLs (comma separated)', type: 'text' },
    { key: 'bgColor', label: 'Background', type: 'color' },
    { key: 'textColor', label: 'Text Color', type: 'color' },
    { key: 'padding', label: 'Padding', type: 'range', min: 0, max: 60 },
    { key: 'image', label: 'Logo Image', type: 'image' },
  ],
  HERO_BANNER: [
    { key: 'title', label: 'Heading', type: 'text' },
    { key: 'subtitle', label: 'Subheading', type: 'text' },
    { key: 'buttonText', label: 'Button Text', type: 'text' },
    { key: 'buttonLink', label: 'Button Link URL', type: 'text' },
    { key: 'openNewTab', label: 'Open in New Tab', type: 'toggle' },
    { key: 'buttonBg', label: 'Button Background', type: 'color' },
    { key: 'buttonColor', label: 'Button Text Color', type: 'color' },
    { key: 'textAlign', label: 'Text Align', type: 'select', options: ['left', 'center', 'right'] },
    { key: 'bgColor', label: 'Background', type: 'color' },
    { key: 'textColor', label: 'Text Color', type: 'color' },
    { key: 'image', label: 'Background Image', type: 'image' },
    { key: 'overlayOpacity', label: 'Overlay Darkness', type: 'range', min: 0, max: 80 },
    { key: 'padding', label: 'Padding', type: 'range', min: 20, max: 200 },
  ],
  SECTION: [
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'textAlign', label: 'Text Align', type: 'select', options: ['left', 'center', 'right'] },
    { key: 'bgColor', label: 'Background', type: 'color' },
    { key: 'textColor', label: 'Text Color', type: 'color' },
    { key: 'padding', label: 'Padding', type: 'range', min: 0, max: 120 },
  ],
  CARD: [
    { key: 'title', label: 'Product Name', type: 'text' },
    { key: 'price', label: 'Price', type: 'text' },
    { key: 'comparePrice', label: 'Compare Price', type: 'text' },
    { key: 'badge', label: 'Badge', type: 'text' },
    { key: 'image', label: 'Product Image', type: 'image' },
    { key: 'bgColor', label: 'Background', type: 'color' },
    { key: 'textColor', label: 'Text Color', type: 'color' },
  ],
  BUTTON: [
    { key: 'text', label: 'Button Text', type: 'text' },
    { key: 'link', label: 'Link URL', type: 'text' },
    { key: 'openNewTab', label: 'Open in New Tab', type: 'toggle' },
    { key: 'showArrow', label: 'Show Arrow Icon', type: 'toggle' },
    { key: 'align', label: 'Alignment', type: 'select', options: ['flex-start', 'center', 'flex-end'] },
    { key: 'bgColor', label: 'Background', type: 'color' },
    { key: 'textColor', label: 'Text Color', type: 'color' },
    { key: 'paddingX', label: 'Horizontal Padding', type: 'range', min: 8, max: 64 },
    { key: 'paddingY', label: 'Vertical Padding', type: 'range', min: 4, max: 32 },
    { key: 'borderRadius', label: 'Border Radius', type: 'range', min: 0, max: 50 },
    { key: 'fontSize', label: 'Font Size', type: 'range', min: 10, max: 24 },
    { key: 'fontWeight', label: 'Font Weight', type: 'select', options: ['normal', '500', '600', 'bold'] },
    { key: 'fullWidth', label: 'Full Width', type: 'toggle' },
    { key: 'borderWidth', label: 'Border Width', type: 'range', min: 0, max: 4 },
    { key: 'borderColor', label: 'Border Color', type: 'color' },
  ],
  IMAGE: [
    { key: 'image', label: 'Image', type: 'image' },
    { key: 'alt', label: 'Alt Text', type: 'text' },
    { key: 'aspectRatio', label: 'Aspect Ratio', type: 'select', options: ['auto', '1/1', '4/3', '16/9', '21/9'] },
    { key: 'objectFit', label: 'Object Fit', type: 'select', options: ['cover', 'contain', 'fill'] },
    { key: 'borderRadius', label: 'Border Radius', type: 'range', min: 0, max: 32 },
    { key: 'bgColor', label: 'Background', type: 'color' },
    { key: 'padding', label: 'Padding', type: 'range', min: 0, max: 80 },
  ],
  TEXT: [
    { key: 'content', label: 'Content', type: 'textarea' },
    { key: 'fontSize', label: 'Font Size', type: 'range', min: 12, max: 32 },
    { key: 'fontWeight', label: 'Font Weight', type: 'select', options: ['normal', '500', '600', 'bold'] },
    { key: 'textAlign', label: 'Text Align', type: 'select', options: ['left', 'center', 'right'] },
    { key: 'lineHeight', label: 'Line Height', type: 'range', min: 1, max: 2.5, step: 0.1 },
    { key: 'bgColor', label: 'Background', type: 'color' },
    { key: 'textColor', label: 'Text Color', type: 'color' },
    { key: 'padding', label: 'Padding', type: 'range', min: 0, max: 120 },
  ],
  DIVIDER: [
    { key: 'lineColor', label: 'Line Color', type: 'color' },
    { key: 'lineWidth', label: 'Line Thickness', type: 'range', min: 1, max: 8 },
    { key: 'lineStyle', label: 'Line Style', type: 'select', options: ['solid', 'dashed', 'dotted'] },
    { key: 'width', label: 'Width (%)', type: 'range', min: 10, max: 100 },
    { key: 'bgColor', label: 'Background', type: 'color' },
    { key: 'padding', label: 'Padding', type: 'range', min: 0, max: 60 },
  ],
  SPACER: [
    { key: 'height', label: 'Height', type: 'range', min: 10, max: 200 },
    { key: 'bgColor', label: 'Background', type: 'color' },
  ],
  TESTIMONIAL: [
    { key: 'quote', label: 'Quote', type: 'textarea' },
    { key: 'author', label: 'Author Name', type: 'text' },
    { key: 'role', label: 'Role/Title', type: 'text' },
    { key: 'rating', label: 'Rating (1-5)', type: 'range', min: 1, max: 5 },
    { key: 'image', label: 'Author Photo', type: 'image' },
    { key: 'bgColor', label: 'Background', type: 'color' },
    { key: 'textColor', label: 'Text Color', type: 'color' },
    { key: 'padding', label: 'Padding', type: 'range', min: 20, max: 120 },
  ],
  NEWSLETTER: [
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'text' },
    { key: 'inputPlaceholder', label: 'Placeholder Text', type: 'text' },
    { key: 'buttonText', label: 'Button Text', type: 'text' },
    { key: 'buttonBg', label: 'Button Background', type: 'color' },
    { key: 'buttonColor', label: 'Button Text Color', type: 'color' },
    { key: 'bgColor', label: 'Background', type: 'color' },
    { key: 'textColor', label: 'Text Color', type: 'color' },
    { key: 'padding', label: 'Padding', type: 'range', min: 20, max: 120 },
  ],
  FOOTER: [
    { key: 'brandName', label: 'Brand Name', type: 'text' },
    { key: 'description', label: 'Description', type: 'text' },
    { key: 'col1Title', label: 'Column 1 Title', type: 'text' },
    { key: 'col1Links', label: 'Column 1 Links', type: 'text' },
    { key: 'col2Title', label: 'Column 2 Title', type: 'text' },
    { key: 'col2Links', label: 'Column 2 Links', type: 'text' },
    { key: 'col3Title', label: 'Column 3 Title', type: 'text' },
    { key: 'col3Links', label: 'Column 3 Links', type: 'text' },
    { key: 'copyright', label: 'Copyright', type: 'text' },
    { key: 'bgColor', label: 'Background', type: 'color' },
    { key: 'textColor', label: 'Text Color', type: 'color' },
    { key: 'padding', label: 'Padding', type: 'range', min: 20, max: 80 },
  ],
  PRODUCT_GRID: [
    { key: 'title', label: 'Section Title', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'text' },
    { key: 'columns', label: 'Columns', type: 'range', min: 2, max: 6 },
    { key: 'products', label: 'Products', type: 'product-list' },
    { key: 'bgColor', label: 'Background', type: 'color' },
    { key: 'textColor', label: 'Text Color', type: 'color' },
    { key: 'padding', label: 'Padding', type: 'range', min: 20, max: 120 },
  ],
  FEATURE_GRID: [
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'features', label: 'Features', type: 'feature-list' },
    { key: 'bgColor', label: 'Background', type: 'color' },
    { key: 'textColor', label: 'Text Color', type: 'color' },
    { key: 'padding', label: 'Padding', type: 'range', min: 20, max: 120 },
  ],
  VIDEO: [
    { key: 'url', label: 'Video URL (YouTube/Vimeo)', type: 'text' },
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'aspectRatio', label: 'Aspect Ratio', type: 'select', options: ['16/9', '4/3', '1/1'] },
    { key: 'bgColor', label: 'Background', type: 'color' },
    { key: 'textColor', label: 'Text Color', type: 'color' },
    { key: 'padding', label: 'Padding', type: 'range', min: 0, max: 80 },
  ],
  BANNER_STRIP: [
    { key: 'text', label: 'Banner Text', type: 'text' },
    { key: 'fontSize', label: 'Font Size', type: 'range', min: 10, max: 18 },
    { key: 'fontWeight', label: 'Font Weight', type: 'select', options: ['normal', '500', '600', 'bold'] },
    { key: 'bgColor', label: 'Background', type: 'color' },
    { key: 'textColor', label: 'Text Color', type: 'color' },
    { key: 'padding', label: 'Padding', type: 'range', min: 4, max: 24 },
  ],
  COLLECTION_LIST: [
    { key: 'title', label: 'Section Title', type: 'text' },
    { key: 'columns', label: 'Columns', type: 'range', min: 2, max: 5 },
    { key: 'collections', label: 'Collections', type: 'collection-list' },
    { key: 'bgColor', label: 'Background', type: 'color' },
    { key: 'textColor', label: 'Text Color', type: 'color' },
    { key: 'padding', label: 'Padding', type: 'range', min: 20, max: 120 },
  ],
  IMAGE_WITH_TEXT: [
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'buttonText', label: 'Button Text', type: 'text' },
    { key: 'buttonLink', label: 'Button Link URL', type: 'text' },
    { key: 'openNewTab', label: 'Open in New Tab', type: 'toggle' },
    { key: 'buttonBg', label: 'Button Background', type: 'color' },
    { key: 'buttonColor', label: 'Button Text Color', type: 'color' },
    { key: 'imagePosition', label: 'Image Position', type: 'select', options: ['left', 'right'] },
    { key: 'image', label: 'Image', type: 'image' },
    { key: 'bgColor', label: 'Background', type: 'color' },
    { key: 'textColor', label: 'Text Color', type: 'color' },
    { key: 'padding', label: 'Padding', type: 'range', min: 20, max: 120 },
  ],
  ROW: [
    { key: 'gap', label: 'Gap (px)', type: 'range', min: 0, max: 48 },
    { key: 'padding', label: 'Padding', type: 'range', min: 0, max: 80 },
    { key: 'bgColor', label: 'Background', type: 'color' },
    { key: 'alignItems', label: 'Vertical Align', type: 'select', options: ['stretch', 'flex-start', 'center', 'flex-end'] },
    { key: 'justifyContent', label: 'Horizontal Align', type: 'select', options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'] },
    { key: 'wrap', label: 'Wrap Items', type: 'toggle' },
    { key: 'borderRadius', label: 'Border Radius', type: 'range', min: 0, max: 24 },
  ],
  COLUMN: [
    { key: 'gap', label: 'Gap (px)', type: 'range', min: 0, max: 48 },
    { key: 'padding', label: 'Padding', type: 'range', min: 0, max: 80 },
    { key: 'bgColor', label: 'Background', type: 'color' },
    { key: 'flex', label: 'Flex', type: 'select', options: ['1 1 0%', '2 1 0%', '3 1 0%', '0 0 auto'] },
    { key: 'alignItems', label: 'Align Items', type: 'select', options: ['stretch', 'flex-start', 'center', 'flex-end'] },
    { key: 'borderRadius', label: 'Border Radius', type: 'range', min: 0, max: 24 },
    { key: 'showBorder', label: 'Show Border', type: 'toggle' },
    { key: 'borderColor', label: 'Border Color', type: 'color' },
  ],
  GRID: [
    { key: 'columns', label: 'Columns', type: 'range', min: 1, max: 6 },
    { key: 'gap', label: 'Gap (px)', type: 'range', min: 0, max: 48 },
    { key: 'padding', label: 'Padding', type: 'range', min: 0, max: 80 },
    { key: 'bgColor', label: 'Background', type: 'color' },
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'textColor', label: 'Text Color', type: 'color' },
    { key: 'borderRadius', label: 'Border Radius', type: 'range', min: 0, max: 24 },
  ],
  CAROUSEL: [
    { key: 'minHeight', label: 'Min Height (px)', type: 'range', min: 200, max: 800 },
    { key: 'bgColor', label: 'Background', type: 'color' },
    { key: 'borderRadius', label: 'Border Radius', type: 'range', min: 0, max: 24 },
    { key: 'autoPlay', label: 'Auto Play', type: 'toggle' },
    { key: 'interval', label: 'Slide Interval (sec)', type: 'range', min: 2, max: 15 },
    { key: 'showArrows', label: 'Show Arrows', type: 'toggle' },
    { key: 'showDots', label: 'Show Dots', type: 'toggle' },
    { key: 'dotColor', label: 'Dot Color', type: 'color' },
    { key: 'dotActiveColor', label: 'Active Dot Color', type: 'color' },
  ],
  SLIDE: [
    { key: 'image', label: 'Background Image', type: 'image' },
    { key: 'tag', label: 'Tag/Label', type: 'text' },
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'titleSize', label: 'Title Size (px)', type: 'range', min: 20, max: 72 },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'descSize', label: 'Description Size', type: 'range', min: 12, max: 24 },
    { key: 'buttonText', label: 'Button Text', type: 'text' },
    { key: 'buttonLink', label: 'Button Link', type: 'text' },
    { key: 'buttonBg', label: 'Button Background', type: 'color' },
    { key: 'buttonColor', label: 'Button Text Color', type: 'color' },
    { key: 'openNewTab', label: 'Open in New Tab', type: 'toggle' },
    { key: 'bgColor', label: 'Background Color', type: 'color' },
    { key: 'textColor', label: 'Text Color', type: 'color' },
    { key: 'overlayOpacity', label: 'Overlay Darkness', type: 'range', min: 0, max: 80 },
    { key: 'padding', label: 'Padding', type: 'range', min: 20, max: 120 },
    { key: 'minHeight', label: 'Min Height (px)', type: 'range', min: 200, max: 800 },
    { key: 'verticalAlign', label: 'Vertical Align', type: 'select', options: ['flex-start', 'center', 'flex-end'] },
    { key: 'horizontalAlign', label: 'Horizontal Align', type: 'select', options: ['flex-start', 'center', 'flex-end'] },
  ],
  INFO_CARD: [
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'image', label: 'Image', type: 'image' },
    { key: 'link', label: 'Link URL', type: 'text' },
    { key: 'aspectRatio', label: 'Image Ratio', type: 'select', options: ['1/1', '4/3', '3/4', '16/9'] },
    { key: 'borderRadius', label: 'Border Radius', type: 'range', min: 0, max: 24 },
    { key: 'fontSize', label: 'Font Size', type: 'range', min: 12, max: 24 },
    { key: 'showArrow', label: 'Show Arrow', type: 'toggle' },
    { key: 'bgColor', label: 'Background', type: 'color' },
    { key: 'textColor', label: 'Text Color', type: 'color' },
    { key: 'padding', label: 'Padding', type: 'range', min: 8, max: 32 },
  ],
  ICON_CARD: [
    { key: 'icon', label: 'Icon', type: 'select', options: ['bolt', 'shield', 'globe', 'diamond', 'truck', 'refresh', 'headphones', 'users', 'certificate', 'star'] },
    { key: 'iconImage', label: 'Custom Icon Image', type: 'image' },
    { key: 'iconSize', label: 'Icon Size (px)', type: 'range', min: 24, max: 80 },
    { key: 'iconColor', label: 'Icon Color', type: 'color' },
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'titleSize', label: 'Title Size (px)', type: 'range', min: 12, max: 28 },
    { key: 'description', label: 'Description', type: 'text' },
    { key: 'descSize', label: 'Description Size', type: 'range', min: 10, max: 18 },
    { key: 'textColor', label: 'Text Color', type: 'color' },
    { key: 'padding', label: 'Padding', type: 'range', min: 8, max: 48 },
  ],
};

// Append size settings to every block type
Object.keys(BLOCK_SETTINGS).forEach(key => {
  BLOCK_SETTINGS[key] = [...BLOCK_SETTINGS[key], ...SIZE_SETTINGS];
});
