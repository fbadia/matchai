import { Link } from 'react-router-dom';
import { Zap, ShieldCheck, UserPlus, Sparkles, Unlock, Lock, Check, Target, BarChart2, SearchX, FileCheck, TrendingUp, Wand2, FileDown } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export default function Landing() {
  return (
    <div className="min-h-screen bg-bg-deep pt-16">
      
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-64px)] flex items-center">
        <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <Badge variant="premium" className="mb-6">
              <Sparkles size={12} />
              <span>IA para recrutamento reverso</span>
            </Badge>
            
            <h1 className="text-display font-medium text-text-primary mb-5 leading-tight">
              <span className="block">Você mandou o currículo.</span>
              <span className="block">Não teve retorno.</span>
              <span className="block text-violet-300">E nunca vai saber por quê.</span>
            </h1>
            
            <p className="text-body-lg text-text-muted mb-8 max-w-lg leading-relaxed">
              Na maioria das empresas, um sistema automático lê e filtra os currículos antes de qualquer pessoa humana ver o seu. Se o seu material não estiver no formato certo, ele é descartado em segundos — sem explicação, sem feedback.
              <br/><br/>
              O MatchAI analisa o seu currículo e te diz exatamente o que precisa mudar.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
              <Link to="/cadastro">
                <Button variant="primary">
                  <Zap size={16} />
                  Analisar meu currículo agora
                </Button>
              </Link>
              <a href="#como-funciona" className="text-violet-300 hover:text-violet-500 text-body transition-colors mt-2 sm:mt-0 sm:self-center">
                Como isso funciona? &rarr;
              </a>
            </div>
            
            <p className="mt-4 text-caption text-text-disabled flex items-center justify-center sm:justify-start gap-1.5">
              <ShieldCheck size={12} className="text-emerald-400" />
              Grátis para começar. Sem cartão de crédito. 5 análises de presente no cadastro.
            </p>
          </div>

          <div className="hidden lg:block relative rotate-1">
            <Card variant="elevated" className="shadow-glow-violet w-full max-w-md mx-auto pointer-events-none">
              <div className="mb-4">
                <span className="inline-flex items-center gap-1.5 bg-emerald-900 border border-emerald-800 text-emerald-400 text-caption px-3 py-1 rounded-full font-medium">✅ Boa compatibilidade</span>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-[48px] font-medium text-violet-300 leading-none">82</span>
                  <span className="text-caption text-text-disabled">Score de compatibilidade</span>
                </div>
              </div>
              
              <div className="space-y-3 mt-6">
                {[
                  { label: 'Parsing', percent: 80, color: 'bg-emerald-400', val: '80%' },
                  { label: 'Keywords', percent: 65, color: 'bg-violet-500', val: '65%' },
                  { label: 'Estrutura', percent: 90, color: 'bg-emerald-400', val: '90%' },
                  { label: 'Métricas', percent: 50, color: 'bg-gold-400', val: '50%' },
                  { label: 'Gaps', percent: 70, color: 'bg-violet-500', val: '70%' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-caption text-text-muted w-20">{item.label}</span>
                    <div className="flex-1 h-1.5 bg-border-subtle rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.percent}%` }} />
                    </div>
                    <span className="text-caption text-text-muted w-10 text-right">{item.val}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ATS Education Section */}
      <section className="py-24 bg-bg-surface2 border-y border-border-default">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-h2 text-text-primary mb-6">O que está acontecendo com o seu currículo <span className="text-violet-300 block sm:inline">(que ninguém te conta)</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left mt-12">
            <div>
              <p className="text-body-lg text-text-muted mb-4">
                Sabe aquelas vagas onde você manda o currículo e nunca tem retorno nem de rejeição? Não é descaso — é tecnologia.
              </p>
              <p className="text-body-lg text-text-muted mb-4">
                A maioria das médias e grandes empresas usa um sistema chamado <strong>ATS</strong> <em>(Applicant Tracking System)</em>. Ele funciona como um filtro automático: lê todos os currículos recebidos, pontua cada um com base em critérios da vaga e decide quais chegam até o recrutador humano.
              </p>
              <p className="text-body-lg text-text-muted">
                Se o seu currículo não tiver as palavras certas, no formato certo, com as informações que o sistema espera — ele é descartado automaticamente. Antes de qualquer pessoa ler uma linha.
              </p>
            </div>
            <div className="bg-bg-deep p-8 rounded-xl border border-border-default text-center">
              <span className="text-[64px] font-medium text-violet-500 leading-none block mb-2">75%</span>
              <p className="text-body text-text-primary font-medium">dos currículos são eliminados por sistemas ATS antes de chegarem a um recrutador humano.</p>
            </div>
          </div>
          <p className="text-h4 font-medium text-text-primary mt-12">
            Não é que seu perfil não seja bom o suficiente. É que seu currículo não está falando a língua do sistema. E a gente pode mudar isso.
          </p>
        </div>
      </section>

      {/* MatchAI Presentation */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-h2 text-text-primary mb-4">Conheça o MatchAI — <span className="text-violet-300">seu assistente pessoal de currículo</span></h2>
          <p className="text-body-lg text-text-muted max-w-2xl mx-auto">
            O MatchAI compara o seu currículo com a descrição da vaga que você quer e te diz, em segundos, se ele tem chances reais de passar pelo filtro automático. Mais do que um número, você recebe um diagnóstico completo: o que está bom, o que está faltando e exatamente como melhorar — tudo baseado no que você já escreveu, sem inventar nada.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <Target size={24} className="text-violet-400 mb-4" />
            <h3 className="text-h3 text-text-primary mb-2">Análise específica por vaga</h3>
            <p className="text-body text-text-muted">Não existe currículo perfeito universal. O MatchAI analisa o seu material para <em>aquela</em> vaga específica que você quer.</p>
          </Card>
          <Card>
            <ShieldCheck size={24} className="text-emerald-400 mb-4" />
            <h3 className="text-h3 text-text-primary mb-2">Zero invenção</h3>
            <p className="text-body text-text-muted">Só trabalhamos com o que você já escreveu. Nenhuma experiência é inventada ou presumida. O que você tem é o que a gente usa.</p>
          </Card>
          <Card>
            <Zap size={24} className="text-gold-400 mb-4" />
            <h3 className="text-h3 text-text-primary mb-2">Resultado em segundos</h3>
            <p className="text-body text-text-muted">Sem espera, sem formulário longo, sem precisar de ajuda de ninguém. Cola o texto e recebe o diagnóstico.</p>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section id="como-funciona" className="py-24 bg-bg-surface2 border-y border-border-default">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-micro uppercase text-violet-300 tracking-wider mb-3 block">Como Funciona</span>
            <h2 className="text-h2 text-text-primary mb-4">É mais simples do que parece</h2>
            <p className="text-body-lg text-text-muted max-w-xl mx-auto">Quatro passos. Menos de dois minutos. Sem precisar entender nada de tecnologia.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Copie o texto da vaga', desc: 'Abra a vaga no LinkedIn, Indeed, ou onde você encontrou. Copie a descrição completa e cole aqui. Só isso.' },
              { num: '02', title: 'Cole o texto do seu currículo', desc: 'Nada de upload complicado. Só copie o conteúdo do seu currículo e cole no campo indicado. Word, PDF, Google Docs — tanto faz, a gente precisa só do texto.' },
              { num: '03', title: 'A IA faz a análise', desc: 'Em alguns segundos, nosso assistente compara os dois textos, identifica o que o sistema automático da empresa vai procurar e verifica se o seu currículo entrega isso.' },
              { num: '04', title: 'Você recebe o diagnóstico', desc: 'Uma nota de compatibilidade, uma explicação em português claro do que está bom e do que precisa melhorar — e, no plano completo, sugestões prontas de como reescrever.' },
            ].map((step, i) => (
              <Card key={i} className="relative overflow-hidden">
                <span className="text-display font-medium text-violet-500 opacity-10 absolute top-2 right-4 leading-none">{step.num}</span>
                <div className="relative z-10 pt-4">
                  <h3 className="text-h3 text-text-primary">{step.title}</h3>
                  <p className="text-body text-text-muted mt-2">{step.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* O que você recebe */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-h2 text-text-primary mb-4">O que você vai saber depois da análise</h2>
          <p className="text-body-lg text-text-muted max-w-xl mx-auto">Sem termos técnicos. Só o que importa para você conseguir a entrevista.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <BarChart2 size={24} className="text-violet-400 mb-4" />
            <h3 className="text-h3 text-text-primary mb-2">Sua nota de compatibilidade</h3>
            <p className="text-body text-text-muted">Um número de 0 a 100 que mostra o quanto o seu currículo está alinhado com aquela vaga específica. Quanto mais perto de 100, maiores as chances de passar pelo filtro automático.</p>
          </Card>
          <Card>
            <SearchX size={24} className="text-violet-400 mb-4" />
            <h3 className="text-h3 text-text-primary mb-2">O que está faltando</h3>
            <p className="text-body text-text-muted">Uma lista das palavras e habilidades que a vaga exige mas que não aparecem no seu currículo. São exatamente essas palavras que o sistema automático procura.</p>
          </Card>
          <Card>
            <FileCheck size={24} className="text-violet-400 mb-4" />
            <h3 className="text-h3 text-text-primary mb-2">Como seu currículo está organizado</h3>
            <p className="text-body text-text-muted">O sistema verifica se seu currículo tem as seções que os filtros automáticos esperam encontrar — experiência, formação, habilidades — e se estão no formato certo.</p>
          </Card>
          <Card>
            <TrendingUp size={24} className="text-violet-400 mb-4" />
            <h3 className="text-h3 text-text-primary mb-2">Se você tem resultados concretos</h3>
            <p className="text-body text-text-muted">Currículos com números e conquistas reais (ex: "aumentei as vendas em 30%") passam melhor pelos filtros do que currículos genéricos. A análise mostra se o seu tem isso.</p>
          </Card>
          <Card variant="featured">
            <Wand2 size={24} className="text-gold-400 mb-4" />
            <h3 className="text-h3 text-text-primary mb-2">Sugestões prontas de reescrita</h3>
            <p className="text-body text-text-muted">Frases do seu currículo reescritas para ficarem mais alinhadas com a vaga. Você decide se usa ou não — mas o trabalho duro já está feito.</p>
          </Card>
          <Card variant="featured">
            <FileDown size={24} className="text-emerald-400 mb-4" />
            <h3 className="text-h3 text-text-primary mb-2">Currículo otimizado em PDF</h3>
            <p className="text-body text-text-muted">Baixe uma versão do seu currículo já com as melhorias sugeridas, pronta para enviar.</p>
          </Card>
        </div>
      </section>

      {/* Freemium vs Premium */}
      <section className="py-24 bg-bg-surface2 border-y border-border-default">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-micro uppercase tracking-wider text-violet-300 block mb-3">Planos</span>
            <h2 className="text-h2 text-text-primary mb-4">Comece de graça. Vá mais longe com créditos.</h2>
            <p className="text-body-lg text-text-muted max-w-2xl mx-auto">
              Você ganha 5 análises completas de presente no cadastro. Sem precisar colocar o cartão.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Free Card */}
            <Card className="flex flex-col">
              <div className="flex items-center gap-2">
                <Unlock size={18} className="text-text-muted" />
                <h3 className="text-h3 text-text-primary">Gratuito</h3>
              </div>
              <div className="border-t border-border-default my-4"></div>
              <ul className="space-y-3 flex-1">
                {[
                  { text: 'Nota de compatibilidade (0–100)', active: true },
                  { text: 'Explicação geral do resultado', active: true },
                  { text: 'Prévia das áreas de melhoria', active: true },
                  { text: 'O que exatamente está faltando', active: false },
                  { text: 'Palavras-chave ausentes da vaga', active: false },
                  { text: 'Análise detalhada por categoria', active: false },
                  { text: 'Sugestões prontas de reescrita', active: false },
                  { text: 'Currículo otimizado em PDF', active: false },
                ].map((feature, i) => (
                  <li key={i} className={`flex items-start gap-2 text-body ${feature.active ? 'text-text-primary' : 'text-text-disabled'}`}>
                    {feature.active ? (
                      <Check size={14} className="text-emerald-400 mt-1 flex-shrink-0" />
                    ) : (
                      <Lock size={14} className="text-text-disabled mt-1 flex-shrink-0" />
                    )}
                    {feature.text}
                  </li>
                ))}
              </ul>
              <p className="text-caption text-text-disabled mt-6 text-center">Sem créditos</p>
            </Card>

            {/* Premium Card */}
            <Card variant="featured" className="flex flex-col">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-purple-200 text-micro px-3 py-1 rounded-full whitespace-nowrap tracking-wide">
                Mais popular
              </div>
              <div className="flex items-center gap-2 pt-2">
                <Sparkles size={18} className="text-violet-300" />
                <h3 className="text-h3 text-text-primary">Com crédito</h3>
              </div>
              <div className="border-t border-border-default my-4"></div>
              <ul className="space-y-3 flex-1">
                {[
                  'Nota de compatibilidade (0–100)',
                  'Explicação geral do resultado',
                  'Prévia das áreas de melhoria',
                  'O que exatamente está faltando',
                  'Palavras-chave ausentes da vaga',
                  'Análise detalhada por categoria',
                  'Sugestões prontas de reescrita',
                  'Currículo otimizado em PDF'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-body text-text-primary">
                    <Check size={14} className="text-violet-300 mt-1 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex justify-center">
                <span className="bg-gold-900 border border-gold-800 text-gold-400 text-caption px-3 py-1 rounded-full text-center">
                  Cada análise completa usa 1 crédito. Você já recebe 5 de graça no cadastro — dá pra testar bastante antes de precisar comprar qualquer coisa.
                </span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-micro uppercase tracking-wider text-violet-300 block mb-3">Preços</span>
          <h2 className="text-h2 text-text-primary mb-4">Pague só quando precisar. Sem mensalidade.</h2>
          <p className="text-body text-text-muted">Compre créditos no seu ritmo. Eles não têm prazo de validade — ficam na sua conta até você usar.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
          {/* Starter */}
          <Card>
            <span className="text-label text-text-muted mb-2 block">Starter</span>
            <div className="text-h1 text-text-primary">R$ 10</div>
            <div className="text-body text-violet-300 mt-1 mb-1">10 análises completas</div>
            <div className="text-caption text-text-disabled">R$ 1,00 por análise</div>
            <div className="border-t border-border-default my-4"></div>
            <p className="text-caption text-text-muted text-center mb-4 italic">(bom para testar algumas vagas)</p>
            <Button variant="secondary" className="w-full">Comprar</Button>
          </Card>

          {/* Pro */}
          <Card variant="featured">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-purple-200 text-micro px-3 py-1 rounded-full whitespace-nowrap tracking-wide">
              Melhor custo
            </div>
            <div className="pt-2">
              <span className="text-label text-text-muted mb-2 block">Pro</span>
              <div className="text-h1 text-text-primary">R$ 20</div>
              <div className="text-body text-violet-300 mt-1 mb-1">25 análises completas</div>
              <div className="text-caption text-text-disabled">R$ 0,80 por análise</div>
              <div className="border-t border-border-default my-4"></div>
              <p className="text-caption text-text-muted text-center mb-4 italic">(ideal se você está em busca ativa)</p>
              <Button variant="primary" className="w-full">
                <Zap size={16} />
                Comprar
              </Button>
            </div>
          </Card>
        </div>

        <p className="text-center mt-6 text-caption text-text-disabled flex items-center justify-center gap-1">
          <ShieldCheck size={12} className="text-emerald-400" />
          Pagamento seguro via Stripe &middot; Créditos não expiram &middot; Máximo de 50 créditos na carteira
        </p>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-bg-surface2 border-t border-border-default">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-h1 text-text-primary leading-tight">
            Você merece saber por que não está sendo chamado para entrevistas.
          </h1>
          <p className="text-body-lg text-text-muted mt-4 mb-8">
            A maioria das pessoas manda currículo no escuro e espera. O MatchAI acende a luz.<br/>Crie sua conta agora e receba 5 análises completas de presente — sem cartão de crédito.
          </p>
          <Link to="/cadastro">
            <Button variant="primary">
              <UserPlus size={16} />
              Criar minha conta grátis
            </Button>
          </Link>
          <p className="mt-4 text-caption text-text-disabled">Leva menos de 1 minuto para criar a conta. Você pode analisar seu primeiro currículo hoje ainda.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-deep border-t border-border-default py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="text-lg font-semibold tracking-tight">
              <span className="text-text-primary">Match</span>
              <span className="text-violet-500">AI</span>
            </div>
            <div className="text-caption text-text-disabled mt-1">Porque seu próximo emprego não pode depender de sorte.</div>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-caption text-text-disabled hover:text-text-muted transition-colors">Política de Privacidade</a>
            <a href="#" className="text-caption text-text-disabled hover:text-text-muted transition-colors">Termos de Uso</a>
            <span className="text-caption text-text-disabled">&copy; 2026 MatchAI</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
