import Link from "next/link";
import { influencers } from "@/data/influencers";

export function AIInfluencerShowcase() {
  return (
    <section className="ai-showcase" id="ai-team">
      <div className="section-shell">
        <div className="ai-showcase-heading">
          <div>
            <span className="eyebrow eyebrow-light">Управляемые цифровые роли</span>
            <h2>База AI-инфлюенсеров</h2>
          </div>
          <p>
            Не просто персонажи, а виртуальная команда, связанная с контент-планом,
            знаниями компании, CRM, аналитикой и обязательным согласованием.
          </p>
        </div>
        <div className="ai-showcase-grid">
          {influencers.slice(0, 6).map((influencer) => (
            <article key={influencer.id}>
              <div className={`ai-avatar avatar-${influencer.accent}`} aria-hidden="true">
                <span>{influencer.initials}</span>
                <i />
              </div>
              <div>
                <span>{influencer.mode}</span>
                <h3>{influencer.name}</h3>
                <strong>{influencer.role}</strong>
              </div>
            </article>
          ))}
        </div>
        <div className="ai-showcase-cta">
          <div>
            <strong>AI + специалист + контроль владельца</strong>
            <span>Соберите роли под продажи, контент, поддержку и аналитику.</span>
          </div>
          <Link className="button button-primary" href="/ai-agents">
            Открыть каталог <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
