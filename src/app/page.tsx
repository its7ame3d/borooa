const categories = [
  {
    title: "صنع في السعودية",
    description: "ندعم الحرفيين المحليين ونقدم جودة عالية",
  },
  {
    title: "منتجات الخوص",
    description: "أعمال يدوية أصيلة منسوجة ومصبوغة طبيعياً",
  },
  {
    title: "أكواب السيراميك",
    description: "صمم كوبك المفضل عبر لوحة التصميم التفاعلية",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <nav className="flex items-center justify-between border-b border-gray-100 px-6 py-5 sm:px-12">
        <span
          className="text-3xl font-bold text-pink-600"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          بروع
        </span>
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900">
            تسجيل الدخول
          </a>
          <a
            href="#"
            className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-orange-600"
          >
            السلة
          </a>
        </div>
      </nav>

      <main className="flex flex-1 flex-col items-center px-6 py-24 text-center sm:px-12">
        <h1
          className="max-w-2xl text-5xl font-bold leading-tight text-gray-900 sm:text-6xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          صُنع بحب، صُنع لك
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-gray-500">
          اكتشف مجموعة بروع الفريدة من الحرف اليدوية. من أعمال الخوص المنسوجة
          يدوياً إلى أكواب السيراميك التي تعكس ذوقك الخاص.
        </p>
        <a
          href="#"
          className="mt-10 rounded-xl bg-pink-600 px-10 py-4 text-lg font-bold text-white transition-colors hover:bg-pink-700"
        >
          صمم كوبك الآن
        </a>

        <div className="mt-20 grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.title}
              className="rounded-2xl border border-gray-200 p-8 text-center transition-shadow hover:shadow-md"
            >
              <h3 className="text-lg font-bold text-gray-900">{category.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
