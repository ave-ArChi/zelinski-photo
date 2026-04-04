import { getContent } from "@/app/lib/data";

export const dynamic = "force-dynamic";

export default function AboutPage() {
  const { about } = getContent();
  return (
    <section className="about-page">
      <h1 className="page-title">About &amp; Contacts</h1>
      <p className="about-body">{about}</p>
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
