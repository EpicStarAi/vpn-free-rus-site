import { VpnAdPage, vpnAdMetadata } from "@/components/VpnAdPage";

export const metadata = vpnAdMetadata(
  "AI-агенты",
  "Страница об AI-агентах сокращена до рекламного перехода. Подключайте VPN FREE RUS — это основной сервис.",
);

export default function Page() {
  return (
    <VpnAdPage
      eyebrow="Платформа · переход"
      title="AI-агенты"
      text="Страница об AI-агентах сокращена до рекламного перехода. Подключайте VPN FREE RUS — это основной сервис."
      points={[
    "Обзор платформы",
    "Фокус на VPN",
    "Тест за 2 минуты"
      ]}
    />
  );
}
