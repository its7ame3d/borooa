export type ColorKey = "maroon" | "green" | "purple" | "pink";

export const COLORS: { key: ColorKey; label: string; labelEn: string; swatch: string }[] = [
  { key: "maroon", label: "عنابي", labelEn: "Maroon", swatch: "#7A1F2B" },
  { key: "green", label: "أخضر", labelEn: "Green", swatch: "#1F5C55" },
  { key: "purple", label: "بنفسجي", labelEn: "Purple", swatch: "#4B2A6B" },
  { key: "pink", label: "فوشي", labelEn: "Fuchsia", swatch: "#B02A78" },
];

export type Product = {
  id: string;
  name: string;
  nameEn: string;
  collection: string;
  collectionEn: string;
  colors: ColorKey[];
  image: string;
  topImage?: string;
  alt: string;
  altEn: string;
};

const dir = "/crafts/seagrass";

export const PRODUCTS: Product[] = [
  {
    id: "tote-maroon",
    name: "حقيبة خوص بمقابض منسوجة",
    nameEn: "Palm-leaf tote with woven handles",
    collection: "حقائب",
    collectionEn: "Bags",
    colors: ["maroon"],
    image: `${dir}/tote-maroon.webp`,
    alt: "حقيبة خوص عنابية بمقابض منسوجة ونقشة متعرجة",
    altEn: "Maroon palm-leaf tote with woven handles and a zigzag pattern",
  },
  {
    id: "basket-green",
    name: "سلة خوص بمقابض حبل",
    nameEn: "Palm-leaf basket with rope handles",
    collection: "سلال",
    collectionEn: "Baskets",
    colors: ["green"],
    image: `${dir}/basket-green.webp`,
    topImage: `${dir}/basket-green-top.webp`,
    alt: "سلة خوص بخطوط خضراء ومقابض من الحبل",
    altEn: "Palm-leaf basket with green stripes and rope handles",
  },
  {
    id: "lidded-box-green",
    name: "علبة خوص بغطاء",
    nameEn: "Lidded palm-leaf box",
    collection: "علب وصواني",
    collectionEn: "Boxes & trays",
    colors: ["green", "maroon"],
    image: `${dir}/lidded-box-green.webp`,
    alt: "علبة خوص خضراء بغطاء منسوج ومقبض مخروطي",
    altEn: "Green palm-leaf box with a woven lid and cone-shaped knob",
  },
  {
    id: "basket-purple",
    name: "سلة خوص بمقابض حبل",
    nameEn: "Palm-leaf basket with rope handles",
    collection: "سلال",
    collectionEn: "Baskets",
    colors: ["purple"],
    image: `${dir}/basket-purple.webp`,
    topImage: `${dir}/basket-purple-top.webp`,
    alt: "سلة خوص بنفسجية بنقشة متعرجة ومقابض من الحبل",
    altEn: "Purple palm-leaf basket with a zigzag pattern and rope handles",
  },
  {
    id: "tote-green",
    name: "حقيبة خوص بمقابض منسوجة",
    nameEn: "Palm-leaf tote with woven handles",
    collection: "حقائب",
    collectionEn: "Bags",
    colors: ["green"],
    image: `${dir}/tote-green.webp`,
    alt: "حقيبة خوص خضراء بمقابض منسوجة",
    altEn: "Green palm-leaf tote with woven handles",
  },
  {
    id: "small-maroon",
    name: "سلة خوص صغيرة",
    nameEn: "Small palm-leaf basket",
    collection: "سلال",
    collectionEn: "Baskets",
    colors: ["maroon"],
    image: `${dir}/small-maroon.webp`,
    topImage: `${dir}/small-maroon-top.webp`,
    alt: "سلة خوص صغيرة بحافة عنابية مجدولة",
    altEn: "Small palm-leaf basket with a braided maroon rim",
  },
  {
    id: "flat-bag-zigzag",
    name: "زنبيل خوص بنقشة متعرجة",
    nameEn: "Zigzag palm-leaf zanbil bag",
    collection: "حقائب",
    collectionEn: "Bags",
    colors: ["maroon", "green"],
    image: `${dir}/flat-bag-zigzag.webp`,
    alt: "زنبيل خوص بنقشة متعرجة عنابية وخضراء",
    altEn: "Palm-leaf zanbil bag with a maroon and green zigzag pattern",
  },
  {
    id: "basket-maroon",
    name: "سلة خوص بمقابض حبل",
    nameEn: "Palm-leaf basket with rope handles",
    collection: "سلال",
    collectionEn: "Baskets",
    colors: ["maroon"],
    image: `${dir}/basket-maroon.webp`,
    topImage: `${dir}/basket-maroon-top.webp`,
    alt: "سلة خوص بحافة عنابية ونقشة متعرجة",
    altEn: "Palm-leaf basket with a maroon rim and zigzag pattern",
  },
  {
    id: "tote-purple",
    name: "حقيبة خوص بمقابض منسوجة",
    nameEn: "Palm-leaf tote with woven handles",
    collection: "حقائب",
    collectionEn: "Bags",
    colors: ["pink"],
    image: `${dir}/tote-purple.webp`,
    alt: "حقيبة خوص فوشية بمقابض منسوجة",
    altEn: "Fuchsia palm-leaf tote with woven handles",
  },
  {
    id: "small-teal",
    name: "سلة خوص صغيرة",
    nameEn: "Small palm-leaf basket",
    collection: "سلال",
    collectionEn: "Baskets",
    colors: ["green", "maroon"],
    image: `${dir}/small-teal.webp`,
    topImage: `${dir}/small-teal-top.webp`,
    alt: "سلة خوص صغيرة بحافة خضراء وقاعدة عنابية",
    altEn: "Small palm-leaf basket with a green rim and maroon base",
  },
  {
    id: "pair-pink-maroon",
    name: "طقم سلتين",
    nameEn: "Set of two baskets",
    collection: "سلال",
    collectionEn: "Baskets",
    colors: ["pink", "maroon"],
    image: `${dir}/pair-pink-maroon.webp`,
    alt: "سلتا خوص بخطوط فوشية وعنابية",
    altEn: "Two palm-leaf baskets with fuchsia and maroon stripes",
  },
  {
    id: "small-purple",
    name: "سلة خوص صغيرة",
    nameEn: "Small palm-leaf basket",
    collection: "سلال",
    collectionEn: "Baskets",
    colors: ["purple"],
    image: `${dir}/small-purple.webp`,
    topImage: `${dir}/small-purple-top.webp`,
    alt: "سلة خوص صغيرة بحافة بنفسجية",
    altEn: "Small palm-leaf basket with a purple rim",
  },
  {
    id: "tray-yellow",
    name: "طبق خوص للتقديم",
    nameEn: "Palm-leaf serving tray",
    collection: "علب وصواني",
    collectionEn: "Boxes & trays",
    colors: [],
    image: `${dir}/tray-yellow.webp`,
    alt: "طبق خوص دائري بحافة صفراء",
    altEn: "Round palm-leaf tray with a yellow rim",
  },
];

export const B2B_IMAGE = {
  src: `${dir}/tray-pink-gift.webp`,
  alt: "صينية خوص فوشية تُعرض عليها علبة منتج",
  altEn: "Fuchsia palm-leaf tray presenting a product box",
};
