import { LegalLayout } from '@/components/ui/LegalLayout';

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <section className="space-y-8 text-zinc-400 text-sm leading-relaxed">
        <div>
          <h3 className="text-white font-black uppercase tracking-widest mb-4">1. Сбор данных</h3>
          <p>Мы собираем только минимально необходимую информацию: адрес вашего публичного крипто-кошелька, IP-адрес (для защиты от фрода) и технические данные об устройстве. Мы НЕ собираем ваши имена, телефоны или почтовые адреса (кроме администраторов).</p>
        </div>
        <div>
          <h3 className="text-white font-black uppercase tracking-widest mb-4">2. Использование информации</h3>
          <p>Данные используются исключительно для аналитики трафика, предотвращения Sybil-атак и обеспечения работы закрытого доступа к инструментам клуба.</p>
        </div>
        <div>
          <h3 className="text-white font-black uppercase tracking-widest mb-4">3. Безопасность</h3>
          <p>Ваш доступ привязан к владению NFT-пассом или подтверждению транзакции в смарт-контракте. Мы не имеем доступа к вашим приватным ключам или сид-фразам.</p>
        </div>
      </section>
    </LegalLayout>
  );
}