import type { Locale } from "../../components/OrderModal";

type Item = { title: string; text: string };

export type SeagrassCopy = {
  colorJoin: string;
  heroAlts: string[];
  eyebrow: string;
  h1: [string, string];
  sub: string;
  ctaOrder: string;
  ctaB2B: string;
  trust: string[];
  galleryTitle: string;
  gallerySub: string;
  all: string;
  filterLabel: string;
  viewTop: string;
  viewSide: string;
  topSuffix: string;
  hintDesktop: string;
  hintMobile: string;
  orderLike: string;
  prefill: (name: string, colors: string) => string;
  detailsTitle: string;
  detailsText: string;
  detailsAlt: string;
  detailsPoints: Item[];
  usesTitle: string;
  uses: Item[];
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

export const COPY: Record<Locale, SeagrassCopy> = {
  ar: {
    colorJoin: " و",
    heroAlts: ["حقيبة خوص عنابية", "سلة خوص خضراء", "علبة خوص بغطاء", "سلة خوص بنفسجية صغيرة"],
    eyebrow: "خوصيات بروع",
    h1: ["خوصيات منسوجة", "بأيدٍ سعودية"],
    sub: "سلال وحقائب وصوانٍ تُنسج يدوياً من سعف النخيل، بالألوان التي تختارينها — لبيتك، لهديتك، أو لمشروعك.",
    ctaOrder: "اطلبي قطعتك",
    ctaB2B: "للشركات والجملة",
    trust: ["نسج يدوي بالكامل", "ألوان ومقاسات حسب الطلب", "للأفراد والشركات"],
    galleryTitle: "اختاري لونك",
    gallerySub: "قطع حقيقية من أعمال حرفياتنا. اطلبي مثلها، أو اختاري ألوانك ومقاسك الخاص.",
    all: "الكل",
    filterLabel: "تصفية حسب اللون",
    viewTop: "شاهدي النقشة من الأعلى",
    viewSide: "المنظر الجانبي",
    topSuffix: " — منظر من الأعلى",
    hintDesktop: "مرّري المؤشر على السلة لتشاهدي نقشة القاعدة من الأعلى.",
    hintMobile: "اضغطي «شاهدي النقشة من الأعلى» لرؤية القاعدة.",
    orderLike: "اطلبي مثلها",
    prefill: (name, colors) => `أرغب بقطعة مثل: ${name}${colors ? ` (${colors})` : ""}.\nالحجم والاستخدام: `,
    detailsTitle: "الجمال في التفاصيل",
    detailsText:
      "كل قطعة تبدأ بسعف نخيل يُصبغ ويُجدل شريطاً شريطاً، ثم يُخاط بعضه إلى بعض حتى تكتمل. لهذا لا توجد قطعتان متطابقتان تماماً.",
    detailsAlt: "قاعدة سلة خوص منسوجة بنقشة متعرجة من الأعلى",
    detailsPoints: [
      { title: "نقشة متعرجة في القاعدة", text: "تظهر عندما تنظرين إلى السلة من الأعلى، وتختلف ألوانها من قطعة لأخرى." },
      { title: "حافة مجدولة", text: "تُجدل الحافة بشكل منفصل لتمنح القطعة شكلاً متماسكاً." },
      { title: "مقابض من الحبل", text: "لحمل السلة بسهولة وتعليقها عند الحاجة." },
    ],
    usesTitle: "قطعة واحدة، استخدامات كثيرة",
    uses: [
      { title: "تخزين أنيق", text: "للبطانيات والألعاب والمناشف، بدل الصناديق البلاستيكية." },
      { title: "غطاء لأصيص النباتات", text: "تضيف دفئاً لزوايا البيت وتخفي الأصيص العادي." },
      { title: "مشوار السوق والبحر", text: "حقيبة خفيفة تلفت الأنظار أينما ذهبتِ." },
      { title: "ضيافة التمر والقهوة", text: "طبق تقديم بروح المجالس السعودية." },
    ],
    orderNow: "اطلبي الآن",
    b2bEyebrow: "للشركات والجملة",
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
    faqTitle: "أسئلة شائعة",
    finalTitle: "عندك فكرة لقطعة خوص؟",
    finalText: "شاركينا اللون والمقاس والاستخدام، وتبدأ الحرفية بنسجها لك.",
  },
  en: {
    colorJoin: " & ",
    heroAlts: ["Maroon palm-leaf tote", "Green palm-leaf basket", "Lidded palm-leaf box", "Small purple palm-leaf basket"],
    eyebrow: "Borooa palm-leaf weaving",
    h1: ["Palm-leaf weaving,", "handmade in Saudi Arabia"],
    sub: "Baskets, bags and trays woven by hand from palm fronds (khoos), in the colors you choose — for your home, as a gift, or for your business.",
    ctaOrder: "Order your piece",
    ctaB2B: "For businesses & wholesale",
    trust: ["Fully handwoven", "Custom colors & sizes", "For individuals and businesses"],
    galleryTitle: "Pick your color",
    gallerySub: "Real pieces made by our artisans. Order one like it, or choose your own colors and size.",
    all: "All",
    filterLabel: "Filter by color",
    viewTop: "View the base from above",
    viewSide: "Side view",
    topSuffix: " — top view",
    hintDesktop: "Hover over a basket to see its woven base from above.",
    hintMobile: "Tap “View the base from above” to see the woven base.",
    orderLike: "Order one like this",
    prefill: (name, colors) => `I'd like a piece like: ${name}${colors ? ` (${colors})` : ""}.\nSize and use: `,
    detailsTitle: "Beauty in the details",
    detailsText:
      "Every piece starts as palm fronds that are dyed and braided strip by strip, then stitched together until the shape is complete. That's why no two pieces are exactly alike.",
    detailsAlt: "Top view of a palm-leaf basket base woven in a zigzag pattern",
    detailsPoints: [
      { title: "A zigzag pattern in the base", text: "Visible when you look down into the basket, with colors that vary from piece to piece." },
      { title: "A braided rim", text: "The rim is braided separately to give the piece a firm, finished shape." },
      { title: "Rope handles", text: "For easy carrying, or for hanging when needed." },
    ],
    usesTitle: "One piece, many uses",
    uses: [
      { title: "Beautiful storage", text: "For blankets, toys and towels, instead of plastic boxes." },
      { title: "Plant pot cover", text: "Adds warmth to a corner and hides a plain pot." },
      { title: "Market & beach bag", text: "A light bag that turns heads wherever you go." },
      { title: "Dates & coffee service", text: "A serving tray with the spirit of a Saudi majlis." },
    ],
    orderNow: "Order now",
    b2bEyebrow: "For businesses & wholesale",
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
    faqTitle: "Frequently asked questions",
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
