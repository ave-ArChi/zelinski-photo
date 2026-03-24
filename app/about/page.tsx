export default function AboutPage() {
  return (
    <section className="about-page">
      <h1 className="page-title">About &amp; Contacts</h1>
      <p className="about-body">
{`Привет! Меня зовут Мадина, я профессиональный фотограф и ретушёр.
Имею 7-летний опыт коммерческих и творческих съёмок, модельных тестов и бьюти фотографии, знаю всё о качественной, красивой и естественной ретуши.
Обожаю весь процесс от подготовки до воплощения идеи. Организовываю и стилизую съёмки, занимаюсь креативным мейкапом по запросу.
Помогаю воплощать самые необычные идеи.`}
      </p>
      <div className="about-contacts">
        <div className="contact-row">
          <span>Telegram</span>
          <a href="https://t.me/madinazelinski" target="_blank" rel="noopener noreferrer">
            t.me/madinazelinski
          </a>
        </div>
      </div>
    </section>
  );
}
