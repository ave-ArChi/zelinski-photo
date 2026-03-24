export default function PricesPage() {
  return (
    <section className="pricing-page">
      <h1 className="page-title">Услуги и цены</h1>
      <div className="pricing-cards">

        <div className="pricing-card">
          <div className="pricing-name">Creative</div>
          <div className="pricing-price">15 000 ₽<span>*</span></div>
          <ul className="pricing-features">
            <li>1–2 часа съёмки</li>
            <li>15 лучших фото с качественной ретушью</li>
            <li>Срок обработки: 1–2 недели</li>
          </ul>
          <p className="pricing-note">
            * Формат для модельных тестов, портретов и beauty-съёмок, съёмок с вашей стилизацией.
          </p>
        </div>

        <div className="pricing-card featured">
          <div className="pricing-badge">Popular</div>
          <div className="pricing-name">Personal</div>
          <div className="pricing-price">35 000 ₽</div>
          <ul className="pricing-features">
            <li>1–2 часа съёмки (зависит от темпа)</li>
            <li>20 лучших фото с high-end ретушью</li>
            <li>Срок обработки: 1–2 недели</li>
          </ul>
        </div>

      </div>
    </section>
  );
}
