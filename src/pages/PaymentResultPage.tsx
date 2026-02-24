import { Link, useLocation, useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const PaymentResultPage = () => {
  const { status } = useParams();
  const q = useQuery();
  const order = q.get('o');

  const map: Record<string, { title: string; desc: string }>= {
    sucesso: { title: 'Pagamento aprovado!', desc: 'Seu pedido foi confirmado. Em breve você receberá as atualizações.' },
    pendente: { title: 'Pagamento pendente', desc: 'Assim que o pagamento for confirmado, seu pedido será processado.' },
    erro: { title: 'Pagamento não concluído', desc: 'O pagamento não foi aprovado. Você pode tentar novamente.' },
  };

  const info = map[String(status || '').toLowerCase()] || { title: 'Status do pagamento', desc: 'Confira as informações do seu pedido.' };

  return (
    <Layout>
      <div className="container py-20 text-center">
        <h1 className="font-display text-3xl font-bold">{info.title}</h1>
        <p className="mt-3 text-muted-foreground">{info.desc}</p>
        {order && <p className="mt-4 text-sm">Pedido: <span className="font-semibold">{order}</span></p>}
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/produtos"><Button variant="outline">Continuar comprando</Button></Link>
          <Link to="/"><Button className="bg-accent text-accent-foreground hover:bg-gold-dark">Voltar para Home</Button></Link>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentResultPage;
