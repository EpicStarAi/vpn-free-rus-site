import type { Metadata } from "next";
import { AIInfluencerCatalog } from "@/components/AIInfluencerCatalog";
import { JsonLd } from "@/components/JsonLd";
import { aiAgentTypes, corporateConfig } from "@/data/corporate";

export const metadata: Metadata = {
  title: "AI-агенты для бизнеса",
  description:
    "Внедрение управляемых AI-агентов для продаж, маркетинга, поддержки, контента и аналитики с ручным подтверждением критических действий.",
};

const approvalItems = [
  "Посты и видеоролики",
  "Ответы клиентам",
  "Email-кампании",
  "Рекламные материалы",
  "Карточки товаров",
  "Контент-планы",
  "Заявки, сделки и отчёты AI-агентов",
];

export default function AITeamPage() {
  return (
    <main id="main" className="inner-page ai-team-page">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "AI-агенты для бизнеса",
          description: metadata.description,
          provider: { "@type": "Organization", name: corporateConfig.brand },
          areaServed: ["Москва", "Россия"],
          serviceType: "Внедрение AI-агентов и CRM",
        }}
      />
      <section className="ai-team-hero">
        <div className="section-shell">
          <span className="eyebrow eyebrow-light">AI-агенты · Approval Center · CRM</span>
          <h1>
            <span>AI-агенты</span>
            <span>для бизнеса</span>
          </h1>
          <p>
            Виртуальные сотрудники помогают готовить контент, обрабатывать
            обращения, квалифицировать лиды и анализировать процессы — в
            пределах настроенных ролей и правил.
          </p>
          <div className="ai-hero-points">
            <span>Роли под задачу</span>
            <span>AI и живые специалисты</span>
            <span>Подтверждение владельца</span>
            <span>Защита коммерческих данных</span>
          </div>
          <aside className="ai-control-note">
            Критические действия, публикации, платежи и внешние коммуникации
            могут проходить ручное подтверждение ответственным сотрудником.
          </aside>
        </div>
      </section>

      <section className="section-shell ai-agent-types">
        <div className="corp-section-title">
          <span className="eyebrow">Виртуальные сотрудники</span>
          <h2>Роли под конкретные процессы</h2>
        </div>
        <div>
          {aiAgentTypes.map((agent, index) => (
            <article key={agent}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{agent}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell ai-catalog-section" id="catalog">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Соберите свою команду</span>
            <h2>9 ролей. Один рабочий контур.</h2>
          </div>
          <p className="section-intro">
            Выберите нужные специализации. Мы уточним отрасль, язык, каналы и
            доступный способ работы до запуска.
          </p>
        </div>
        <AIInfluencerCatalog />
      </section>

      <section className="approval-section" id="approval">
        <div className="section-shell">
          <div className="approval-heading">
            <div>
              <span className="eyebrow eyebrow-light">DraftFly Approval Center</span>
              <h2>AI готовит. Владелец решает.</h2>
            </div>
            <p>
              Клиент не передаёт системе бесконтрольное управление бизнесом.
              Каждое внешнее действие проходит через понятную точку проверки.
            </p>
          </div>

          <div className="approval-flow" aria-label="Схема согласования материалов">
            <article>
              <span>01</span>
              <strong>Предприниматель ставит задачу</strong>
              <small>Цель, каналы, ограничения и срок</small>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>02</span>
              <strong>AI и специалисты готовят</strong>
              <small>Тексты, дизайн, видео и ответы</small>
            </article>
            <i aria-hidden="true">→</i>
            <article className="flow-highlight">
              <span>03</span>
              <strong>Черновики в DraftFly</strong>
              <small>Единая очередь согласования</small>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>04</span>
              <strong>Владелец проверяет</strong>
              <small>Approve · Edit · Reject</small>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>05</span>
              <strong>Публикация и аналитика</strong>
              <small>Только после подтверждения</small>
            </article>
          </div>

          <div className="decision-branches" aria-label="Варианты решения владельца">
            <article>
              <span>Approve</span>
              <strong>Публикация или отправка</strong>
              <small>Действие фиксируется в CRM и аналитике</small>
            </article>
            <article>
              <span>Edit</span>
              <strong>Вернуть на доработку</strong>
              <small>Комментарии снова получают AI и специалисты</small>
            </article>
            <article>
              <span>Reject</span>
              <strong>Отклонить материал</strong>
              <small>Черновик остаётся в истории без внешнего действия</small>
            </article>
          </div>

          <div className="approval-details">
            <div className="approval-list">
              <span>В центре согласования</span>
              {approvalItems.map((item) => (
                <strong key={item}><i aria-hidden="true">✓</i>{item}</strong>
              ))}
            </div>
            <aside className="draftfly-status">
              <span className="status-label">Честный статус продукта</span>
              <h3>От email-ответов — к AI CRM</h3>
              <p>
                Сейчас DraftFly ориентирован на подготовку email-ответов через
                Lemlist, Claude и Slack. Управление соцсетями, контентом,
                заявками и сделками — следующий этап развития полноценного
                approval-конвейера.
              </p>
              <div>
                <span><b>Сейчас</b>Email-черновики и согласование</span>
                <span><b>Развиваем</b>Контент, CRM и мультиканальность</span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-shell safe-positioning">
        <span className="eyebrow">Как мы работаем</span>
        <blockquote>
          «Верните бизнесу системное цифровое присутствие. Удалённая команда
          AI-агентов и специалистов создаёт контент, обрабатывает обращения и
          ведёт CRM, а каждое внешнее действие выполняется только после вашего
          подтверждения».
        </blockquote>
        <p>
          Мы работаем как технологическая и креативная команда. Доступность
          отдельных платформ, способы публикации и допустимые рекламные
          инструменты зависят от страны, правил площадок и статуса клиента.
          Перед запуском проводится проверка доступного рабочего контура.
          Доступы ограничиваются необходимым минимумом, а коммерческие данные
          используются только для согласованной задачи.
        </p>
        <a className="button button-dark" href="#catalog">Собрать команду</a>
      </section>
    </main>
  );
}
