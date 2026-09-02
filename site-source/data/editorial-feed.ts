export type EditorialUpdate = {
  time: string;
  title: string;
  agency: string;
  sourceType: string;
  sourceDate: string;
  verifiedAt: string;
  sourceLabel: string;
  href: string;
  why: string;
};

export const fallbackEditorialUpdates: EditorialUpdate[] = [
  {
    time: "09:12",
    title: "Банк России объяснил, почему снижение ставки до 14% остаётся плавным",
    agency: "Банк России",
    sourceType: "Резюме обсуждения",
    sourceDate: "05.08.2026",
    verifiedAt: "22.08.2026, 09:06",
    sourceLabel: "cbr.ru / резюме по ставке",
    href: "https://www.cbr.ru/dkp/mp_dec/decision_key_rate/summary_key_rate_05082026/",
    why:
      "Траектория ставки напрямую влияет на стоимость кредитов, доходность вкладов и темп охлаждения спроса.",
  },
  {
    time: "11:05",
    title: "Росстат опубликовал недельную оценку цен за 11–17 августа",
    agency: "Росстат",
    sourceType: "Официальная статистика",
    sourceDate: "19.08.2026",
    verifiedAt: "22.08.2026, 10:58",
    sourceLabel: "rosstat.gov.ru / цены и инфляция",
    href: "https://rosstat.gov.ru/compendium/document/50798",
    why:
      "Еженедельный срез показывает, подтверждается ли замедление цен между ежемесячными публикациями.",
  },
  {
    time: "14:18",
    title: "Первая оценка ВВП за II квартал задаёт новый контекст для прогноза",
    agency: "Росстат",
    sourceType: "Предварительная оценка",
    sourceDate: "12.08.2026",
    verifiedAt: "22.08.2026, 14:03",
    sourceLabel: "rosstat.gov.ru / национальные счета",
    href: "https://rosstat.gov.ru/statistics/accounts/comments",
    why:
      "Динамика выпуска помогает отделить временное охлаждение спроса от более устойчивого изменения экономики.",
  },
  {
    time: "15:02",
    title: "Банк России обновил среднесрочный прогноз после июльского решения",
    agency: "Банк России",
    sourceType: "Пресс-релиз",
    sourceDate: "24.07.2026",
    verifiedAt: "22.08.2026, 14:51",
    sourceLabel: "cbr.ru / решение по ставке",
    href: "https://www.cbr.ru/press/pr/?file=24072026_133000key.htm",
    why:
      "Прогноз регулятора показывает, какие риски могут замедлить дальнейшее смягчение денежной политики.",
  },
  {
    time: "16:20",
    title: "Росстат добавил июльский индекс цен производителей",
    agency: "Росстат",
    sourceType: "Официальная статистика",
    sourceDate: "19.08.2026",
    verifiedAt: "22.08.2026, 16:11",
    sourceLabel: "rosstat.gov.ru / срочные публикации",
    href: "https://rosstat.gov.ru/compendium/document/50798",
    why:
      "Издержки производителей часто становятся ранним сигналом будущего давления на потребительские цены.",
  },
];
