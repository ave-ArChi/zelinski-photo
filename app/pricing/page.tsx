import { getContent } from "@/app/lib/data";

export const dynamic = "force-dynamic";

export default function PricesPage() {
  const { packages } = getContent();
  return (
    <section className="pricing-page">
      <h1 className="page-title">Услуги и цены</h1>
      <div className="pricing-cards">
        {packages.map((pkg, i) => (
          <div key={i} className={`pricing-card ${i === 1 ? "featured" : ""}`}>
            {i === 1 && <div className="pricing-badge">Popular</div>}
            <div className="pricing-name">{pkg.name}</div>
            <div className="pricing-price">{pkg.price}</div>
            <ul className="pricing-features">
              {pkg.features.map((f, fi) => <li key={fi}>{f}</li>)}
            </ul>
            {pkg.note && <p className="pricing-note">{pkg.note}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
