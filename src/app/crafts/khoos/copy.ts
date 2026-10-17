import type { Locale } from "../../components/OrderModal";

type Item = { title: string; text: string };
type UseItem = Item & { alt: string };

export type KhoosCopy = {
  colorJoin: string;
  heroAlts: string[];
  eyebrow: string;
  h1: [string, string];
  sub: string;
  ctaOrder: string;
  ctaB2B: string;
  trust: string[];
  gallerySeoTitle: string;
  galleryTitle: string;
  gallerySub: string;
  all: string;
  filterLabel: string;
  topSuffix: string;
  hintDesktop: string;
  hintMobile: string;
  orderLike: string;
  prefill: (name: string, colors: string) => string;
  detailsSeoTitle: string;
  detailsTitle: string;
  detailsText: string;
  detailsAlt: string;
  usesSeoTitle: string;
  usesTitle: string;
  uses: UseItem[];
  orderNow: string;
  b2bEyebrow: string;
  b2bTitle: [string, string];
  b2bText: string;
  whatsappLabel: string;
  whatsappText: string;
  emailSubject: string;
  b2bCaption: string;
  sectors: Item[];
  stepsTitle: string;
  steps: Item[];
  faqTitle: string;
  finalTitle: string;
  finalText: string;
};

export const COPY: Record<Locale, KhoosCopy> = {
  ar: {
    colorJoin: " و",
    heroAlts: [
      "حقيبة خوص يدوية عنابية بمقابض منسوجة",
      "سلة خوص يدوية خضراء بمقابض من الحبل",
      "علبة خوص يدوية بغطاء منسوج",
      "سلة خوص صغيرة يدوية بحافة بنفسجية",
    ],
    eyebrow: "خوصيات بروع",
    h1: ["خوصيات منسوجة", "بأيدٍ سعودية"],
    sub: "سلال وحقائب وصوانٍ تُنسج يدوياً من سعف النخيل، بالألوان التي تختارها — لبيتك، لهديتك، أو لمشروعك.",
    ctaOrder: "اطلب قطعتك",
    ctaB2B: "للشركات والجملة",
    trust: ["نسج يدوي بالكامل", "ألوان ومقاسات حسب الطلب", "للأفراد والشركات"],
    gallerySeoTitle: "سلال وحقائب خوص منسوجة يدوياً",
    galleryTitle: "اختر لونك",
    gallerySub: "قطع حقيقية من أعمال حرفياتنا. اطلب مثلها، أو اختر ألوانك ومقاسك الخاص.",
    all: "الكل",
    filterLabel: "تصفية حسب اللون",
    topSuffix: " — منظر من الأعلى",
    hintDesktop: "مرّر المؤشر على السلة لتشاهد نقشة القاعدة من الأعلى.",
    hintMobile: "اضغط على السلة لتشاهد نقشة القاعدة من الأعلى.",
    orderLike: "اطلب مثلها",
    prefill: (name, colors) => `أرغب بقطعة مثل: ${name}${colors ? ` (${colors})` : ""}.\nالحجم والاستخدام: `,
    detailsSeoTitle: "كيف يُنسج الخوص",
    detailsTitle: "الجمال في التفاصيل",
    detailsText:
      "كل قطعة تبدأ بسعف نخيل يُصبغ ويُجدل شريطاً شريطاً، ثم يُخاط بعضه إلى بعض حتى تكتمل. لهذا لا توجد قطعتان متطابقتان تماماً.",
    detailsAlt: "قاعدة سلة خوص منسوجة بنقشة متعرجة من الأعلى",
    usesSeoTitle: "استخدامات سلال الخوص في البيت",
    usesTitle: "قطعة واحدة، استخدامات كثيرة",
    uses: [
      {
        title: "تخزين أنيق",
        text: "للبطانيات والألعاب والمناشف، بدل الصناديق البلاستيكية.",
        alt: "سلة خوص يدوية لتخزين البطانيات والألعاب",
      },
      {
        title: "غطاء لأصيص النباتات",
        text: "تضيف دفئاً لزوايا البيت وتخفي الأصيص العادي.",
        alt: "سلة خوص صغيرة تُستخدم غطاءً لأصيص النباتات",
      },
      {
        title: "مشوار السوق والبحر",
        text: "حقيبة خفيفة تلفت الأنظار أينما ذهبت.",
        alt: "حقيبة خوص يدوية للسوق والبحر",
      },
      {
        title: "ضيافة التمر والقهوة",
        text: "طبق تقديم بروح المجالس السعودية.",
        alt: "طبق خوص لتقديم التمر والقهوة",
      },
    ],
    orderNow: "اطلب الآن",
    b2bEyebrow: "خوصيات للشركات والفنادق والجملة",
    b2bTitle: ["لمسة سعودية أصيلة", "يتذكرها ضيوفكم وعملاؤكم"],
    b2bText:
      "ننسج لكم قطع الخوص بالكميات والألوان التي تناسب مشروعكم، من الضيافة إلى التغليف والهدايا. ولأن كل قطعة تُنسج يدوياً، نحدد معكم المدة حسب الكمية.",
    whatsappLabel: "تواصلوا معنا عبر واتساب",
    whatsappText: "مرحباً بروع، أرغب بطلب خوصيات لمشروعنا.\nنوع النشاط:\nالكمية التقريبية:\nالاستخدام:",
    emailSubject: "طلب خوصيات للشركات",
    b2bCaption: "اعرضوا منتجاتكم على صينية خوص بألوان مختارة",
    sectors: [
      { title: "الفنادق والمنتجعات", text: "سلال للغرف وصواني للضيافة تعكس هوية المكان." },
      { title: "المقاهي والمطاعم", text: "أطباق تقديم وسلال تمنح طاولاتكم طابعاً محلياً." },
      { title: "هدايا الشركات", text: "هدايا للموظفين والعملاء تُصنع يدوياً ولا تُنسى." },
      { title: "المتاجر والعلامات التجارية", text: "تغليف وعرض منتجاتكم بلمسة سعودية أصيلة." },
      { title: "الأعراس والمناسبات", text: "توزيعات وضيافة منسوجة بألوان مناسبتكم." },
    ],
    stepsTitle: "كيف نعمل معكم",
    steps: [
      { title: "أخبرونا بمشروعكم", text: "نوع النشاط، الاستخدام، والكمية التقريبية." },
      { title: "نتفق على التفاصيل", text: "الألوان والمقاسات والمدة المناسبة للكمية." },
      { title: "تُنسج القطع يدوياً", text: "تعمل الحرفيات على طلبكم حسب ما اتفقنا عليه." },
    ],
    faqTitle: "أسئلة شائعة عن الخوصيات",
    finalTitle: "عندك فكرة لقطعة خوص؟",
    finalText: "شاركنا اللون والمقاس والاستخدام، وتبدأ الحرفية بنسجها لك.",
  },
  en: {
    colorJoin: " & ",
    heroAlts: [
      "Handwoven maroon palm-leaf tote with woven handles",
      "Handwoven green palm-leaf basket with rope handles",
      "Handwoven palm-leaf box with a woven lid",
      "Small handwoven palm-leaf basket with a purple rim",
    ],
    eyebrow: "Borooa palm-leaf weaving",
    h1: ["Palm-leaf weaving,", "handmade in Saudi Arabia"],
    sub: "Baskets, bags and trays woven by hand from palm fronds (khoos), in the colors you choose — for your home, as a gift, or for your business.",
    ctaOrder: "Order your piece",
    ctaB2B: "For businesses & wholesale",
    trust: ["Fully handwoven", "Custom colors & sizes", "For individuals and businesses"],
    gallerySeoTitle: "Handwoven palm-leaf baskets & bags",
    galleryTitle: "Pick your color",
    gallerySub: "Real pieces made by our artisans. Order one like it, or choose your own colors and size.",
    all: "All",
    filterLabel: "Filter by color",
    topSuffix: " — top view",
    hintDesktop: "Hover over a basket to see its woven base from above.",
    hintMobile: "Tap a basket to see its woven base from above.",
    orderLike: "Order one like this",
    prefill: (name, colors) => `I'd like a piece like: ${name}${colors ? ` (${colors})` : ""}.\nSize and use: `,
    detailsSeoTitle: "How palm-leaf (khoos) weaving is made",
    detailsTitle: "Beauty in the details",
    detailsText:
      "Every piece starts as palm fronds that are dyed and braided strip by strip, then stitched together until the shape is complete. That's why no two pieces are exactly alike.",
    detailsAlt: "Top view of a palm-leaf basket base woven in a zigzag pattern",
    usesSeoTitle: "Ways to use palm-leaf baskets at home",
    usesTitle: "One piece, many uses",
    uses: [
      {
        title: "Beautiful storage",
        text: "For blankets, toys and towels, instead of plastic boxes.",
        alt: "Handwoven palm-leaf storage basket for blankets and toys",
      },
      {
        title: "Plant pot cover",
        text: "Adds warmth to a corner and hides a plain pot.",
        alt: "Small palm-leaf basket used as a plant pot cover",
      },
      {
        title: "Market & beach bag",
        text: "A light bag that turns heads wherever you go.",
        alt: "Handwoven palm-leaf tote for the market and beach",
      },
      {
        title: "Dates & coffee service",
        text: "A serving tray with the spirit of a Saudi majlis.",
        alt: "Palm-leaf tray for serving dates and coffee",
      },
    ],
    orderNow: "Order now",
    b2bEyebrow: "Palm-leaf weaving for businesses, hotels & wholesale",
    b2bTitle: ["An authentic Saudi touch", "your guests and clients will remember"],
    b2bText:
      "We weave palm-leaf pieces in the quantities and colors your project needs, from hospitality to packaging and gifts. Because every piece is woven by hand, we agree the timeline with you based on quantity.",
    whatsappLabel: "Message us on WhatsApp",
    whatsappText: "Hello Borooa, we'd like to order palm-leaf pieces for our business.\nBusiness type:\nApproximate quantity:\nUse:",
    emailSubject: "Palm-leaf weaving for business",
    b2bCaption: "Present your products on a palm-leaf tray in colors you choose",
    sectors: [
      { title: "Hotels & resorts", text: "Room baskets and hospitality trays that reflect your venue." },
      { title: "Cafés & restaurants", text: "Serving trays and baskets that give your tables local character." },
      { title: "Corporate gifts", text: "Handmade gifts for employees and clients that people remember." },
      { title: "Retail & brands", text: "Package and display your products with an authentic Saudi touch." },
      { title: "Weddings & events", text: "Favors and hospitality pieces woven in your event colors." },
    ],
    stepsTitle: "How we work with you",
    steps: [
      { title: "Tell us about your project", text: "Business type, use, and approximate quantity." },
      { title: "We agree on the details", text: "Colors, sizes, and a timeline that fits the quantity." },
      { title: "Your pieces are handwoven", text: "Our artisans make your order as agreed." },
    ],
    faqTitle: "Palm-leaf weaving FAQs",
    finalTitle: "Have an idea for a palm-leaf piece?",
    finalText: "Tell us the color, size and use, and an artisan will weave it for you.",
  },
};

export const FAQS_EN = [
  {
    q: "What sizes are available for palm-leaf baskets?",
    a: "Tell us the size and use you have in mind in your request details, and we'll make it for you.",
  },
  {
    q: "Can I choose the weaving colors?",
    a: "Yes, you can choose from the available colors to suit your taste and use.",
  },
  {
    q: "Can I order a piece like the ones in the photos?",
    a: "Yes. Tap “Order one like this” under any piece and it will be added to your request details, then add the size and use you want.",
  },
  {
    q: "Do you take business and wholesale orders?",
    a: "Yes, we take orders from hotels, cafés, companies and events. Tell us the quantity and use, and we'll agree the colors, sizes and timeline with you.",
  },
  {
    q: "Can pieces be made in our brand colors?",
    a: "We can match colors close to your brand within the dyes available, and we'll confirm the options with you before we start.",
  },
];
