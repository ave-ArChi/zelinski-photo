export default function PricingPage() {
  return (
    <section className="pt-10 max-w-2xl">
      <h1 className="text-center tracking-widest text-sm uppercase text-neutral-700">Услуги и цены</h1>

      <div className="mt-10 text-center space-y-1">
        <h2 className="text-sm tracking-widest uppercase text-neutral-700">Пакет "Creative"</h2>
        <div className="text-lg mt-2">15 000 ₽*</div>
        <ul className="mt-4 list-disc list-inside text-neutral-800 text-sm space-y-1 text-left mx-auto w-fit">
          <li>1–2 часа съёмки</li>
          <li>15 лучших фото с качественной ретушью</li>
          <li>Время на обработку — 1–2 недели</li>
        </ul>
        <p className="mt-6 text-xs text-neutral-500 italic">
          *Данный формат предназначен для съёмки модельных тестов, проведения портретных и beauty‑съёмок, съёмок с вашей стилизацией
        </p>
      </div>

      <div className="mt-14 text-center space-y-1">
        <h2 className="text-sm tracking-widest uppercase text-neutral-700">Пакет "Personal"</h2>
        <div className="text-lg mt-2">35 000 ₽</div>
        <ul className="mt-4 list-disc list-inside text-neutral-800 text-sm space-y-1 text-left mx-auto w-fit">
          <li>1–2 часа съёмки (зависит от комфортного для вас темпа)</li>
          <li>20 лучших фото с high‑end ретушью</li>
          <li>Время на обработку — 1–2 недели</li>
        </ul>
      </div>

      <p className="mt-10 text-sm text-neutral-700">
        Записываясь на персональную съёмку, вы получаете не только красивые фото в итоге, а также предварительную индивидуальную разработку идеи, помощь с выбором локаций и луков, сопровождение на каждом этапе подготовки, помощь с позированием.
      </p>
    </section>
  );
}