import { LegalLayout } from '@/components/ui/LegalLayout';

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service">
      <section className="space-y-8 text-zinc-400 text-sm leading-relaxed">
        <div>
          <h3 className="text-white font-black uppercase tracking-widest mb-4">1. Членство в клубе</h3>
          <p>Доступ к инструментам YMC предоставляется пожизненно (Lifetime) после оплаты вступительного взноса. Передача доступа третьим лицам запрещена и может привести к аннулированию членства.</p>
        </div>
        <div>
          <h3 className="text-white font-black uppercase tracking-widest mb-4">2. Возвраты</h3>
          <p>В связи с цифровой природой продукта и мгновенным предоставлением доступа к приватным данным (связкам), все продажи являются окончательными. Возврат средств не предусмотрен.</p>
        </div>
        <div>
          <h3 className="text-white font-black uppercase tracking-widest mb-4">3. Отказ от ответственности</h3>
          <p>Администрация клуба предоставляет инструменты и информацию, но не гарантирует конкретную прибыль. Все торговые операции вы совершаете на свой страх и риск.</p>
        </div>
      </section>
    </LegalLayout>
  );
}