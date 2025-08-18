export default function PricesPage() {
  return (
    <section style={{maxWidth:800, margin:"24px auto", lineHeight:1.6, padding:"0 16px"}}>
      <h2>Услуги и цены</h2>

      <h3>Пакет “Creative” — 15 000 ₽*</h3>
      <ul>
        <li>1–2 часа съёмки</li>
        <li>15 лучших фото с качественной ретушью</li>
        <li>Срок обработки: 1–2 недели</li>
      </ul>
      <p style={{opacity:.7}}>
        * Формат для модельных тестов, портретов и beauty-съёмок, съёмок с вашей стилизацией.
      </p>

      <h3>Пакет “Personal” — 35 000 ₽</h3>
      <ul>
        <li>1–2 часа съёмки (зависит от темпа)</li>
        <li>20 лучших фото с high-end ретушью</li>
        <li>Срок обработки: 1–2 недели</li>
      </ul>
    </section>
  );
}
