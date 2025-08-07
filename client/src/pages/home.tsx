import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { NeuralBackground } from "@/components/neural-background";
import { ChatDemo } from "@/components/chat-demo";
import { ContactModal } from "@/components/contact-modal";

export default function Home() {
  const [activeTab, setActiveTab] = useState<'old' | 'ai'>('old');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fade in animation on mount
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-fade-in-up');
      }, index * 200);
    });
  }, []);

  return (
    <div className="bg-[var(--dark-bg)] text-white font-sans overflow-x-hidden">
      <NeuralBackground />
      
      {/* Navigation */}
      <nav className="relative z-50 w-full py-6" data-testid="navigation">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI-Агент
            </div>
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('process')}
                className="text-[var(--text-muted)] hover:text-white transition-colors"
                data-testid="nav-process"
              >
                Процесс
              </button>
              <button 
                onClick={() => scrollToSection('demo')}
                className="text-[var(--text-muted)] hover:text-white transition-colors"
                data-testid="nav-demo"
              >
                Демо
              </button>
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="text-[var(--text-muted)] hover:text-white transition-colors"
                data-testid="nav-contact"
              >
                Контакт
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-on-scroll leading-tight">
            Поддержка, которая <br/>
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">не спит</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-[var(--text-muted)] mb-12 animate-on-scroll max-w-3xl mx-auto leading-relaxed">
            Наш AI-агент решает 80% запросов клиентов. Мгновенно.
          </h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center animate-on-scroll">
            <Button
              onClick={() => scrollToSection('demo')}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              data-testid="button-watch-demo"
            >
              Посмотреть в действии
            </Button>
            <Button
              onClick={() => scrollToSection('process')}
              variant="outline"
              className="px-8 py-4 border-[var(--dark-border)] hover:border-blue-400 rounded-lg font-semibold transition-all duration-300 bg-transparent hover:bg-blue-500/10 text-white"
              data-testid="button-how-it-works"
            >
              Как это работает
            </Button>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Новый стандарт <br/>
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">поддержки клиентов</span>
          </h2>
          
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Toggle Switch */}
            <div className="flex-shrink-0">
              <div className="bg-[var(--dark-secondary)] rounded-xl p-2 inline-flex">
                <button
                  onClick={() => setActiveTab('old')}
                  className={`px-6 py-3 rounded-lg transition-all duration-300 font-medium ${
                    activeTab === 'old' ? 'toggle-active text-white' : 'text-[var(--text-muted)]'
                  }`}
                  data-testid="toggle-old-approach"
                >
                  Старый подход
                </button>
                <button
                  onClick={() => setActiveTab('ai')}
                  className={`px-6 py-3 rounded-lg transition-all duration-300 font-medium ${
                    activeTab === 'ai' ? 'toggle-active text-white' : 'text-[var(--text-muted)]'
                  }`}
                  data-testid="toggle-ai-agent"
                >
                  AI-Агент
                </button>
              </div>
            </div>
            
            {/* Content Area */}
            <div className="flex-1">
              {activeTab === 'old' ? (
                <div className="space-y-6" data-testid="old-approach-content">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-red-400 text-sm">⏰</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Ограниченное время работы</h3>
                      <p className="text-[var(--text-muted)]">Поддержка доступна только в рабочие часы, клиенты вынуждены ждать</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-red-400 text-sm">❌</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Человеческий фактор</h3>
                      <p className="text-[var(--text-muted)]">Ошибки в ответах, неконсистентность информации, усталость сотрудников</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-red-400 text-sm">🐌</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Медленная скорость</h3>
                      <p className="text-[var(--text-muted)]">Длительное время ответа, необходимость поиска информации, очереди</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6" data-testid="ai-agent-content">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-400 text-sm">🌙</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">24/7/365 доступность</h3>
                      <p className="text-[var(--text-muted)]">Клиенты получают помощь в любое время, без выходных и праздников</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-400 text-sm">✅</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">100% точность</h3>
                      <p className="text-[var(--text-muted)]">Всегда актуальная информация, отсутствие ошибок, консистентные ответы</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-400 text-sm">⚡</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Мгновенный ответ</h3>
                      <p className="text-[var(--text-muted)]">Одновременная поддержка тысяч клиентов без очередей и задержек</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="relative z-10 py-24 px-6 bg-[var(--dark-secondary)]/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            Прозрачный процесс.
          </h2>
          <p className="text-xl text-[var(--text-muted)] text-center mb-20 max-w-2xl mx-auto">
            Гарантированный результат.
          </p>
          
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Process Line */}
            <div className="flex-shrink-0 lg:w-1/3">
              <div className="relative">
                <div className="process-line w-1 h-96 rounded-full mx-auto lg:mx-0"></div>
                <div className="absolute top-0 left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0">
                  <div className="w-4 h-4 bg-blue-500 rounded-full -ml-1.5 shadow-lg shadow-blue-500/50"></div>
                </div>
                <div className="absolute top-1/2 left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0 -translate-y-1/2">
                  <div className="w-4 h-4 bg-purple-500 rounded-full -ml-1.5 shadow-lg shadow-purple-500/50"></div>
                </div>
                <div className="absolute bottom-0 left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0">
                  <div className="w-4 h-4 bg-gray-600 rounded-full -ml-1.5"></div>
                </div>
              </div>
            </div>
            
            {/* Process Content */}
            <div className="flex-1 space-y-16">
              <div className="process-item">
                <h3 className="text-2xl font-bold mb-4 text-blue-400">ШАГ 1: АНАЛИЗ</h3>
                <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                  Мы погружаемся в ваш бизнес. Изучаем базу знаний, FAQ, диалоги, чтобы AI понял все нюансы ваших продуктов и клиентов.
                </p>
              </div>
              
              <div className="process-item">
                <h3 className="text-2xl font-bold mb-4 text-purple-400">ШАГ 2: НАСТРОЙКА</h3>
                <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                  Создаем уникальную "личность" для вашего AI-агента. Он будет общаться в стиле вашего бренда, будь то формальный или дружелюбный тон.
                </p>
              </div>
              
              <div className="process-item">
                <h3 className="text-2xl font-bold mb-4 text-gray-400">ШАГ 3: ИНТЕГРАЦИЯ</h3>
                <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                  Предоставляем безупречно работающий код, который легко встраивается в ваш сайт. Проводим финальное тестирование и запускаем.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            Наш AI <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">в действии</span>
          </h2>
          <h3 className="text-xl text-[var(--text-muted)] text-center mb-12 max-w-3xl mx-auto leading-relaxed">
            Этот агент не просто демо. Он работает на том же движке, что мы установим вам. Задайте ему любой вопрос о нашем сервисе.
          </h3>
          
          <ChatDemo />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-24 px-6 bg-[var(--dark-secondary)]/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            Инвестиция, <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">а не расход</span>
          </h2>
          
          <div className="space-y-8 text-lg text-[var(--text-muted)] leading-relaxed mb-12">
            <p>
              Мы не верим в универсальные тарифы, потому что не бывает универсальных бизнесов. Стоимость каждого проекта рассчитывается индивидуально и зависит от его уникальных задач.
            </p>
            <p>
              Наш подход — это полноценная разработка под ключ. Мы создаем не просто чат-бота, а интеллектуального агента, который становится естественным продолжением вашей команды поддержки.
            </p>
            <p>
              Инвестиции в AI-агента окупаются в первые месяцы работы за счет снижения нагрузки на сотрудников и увеличения удовлетворенности клиентов.
            </p>
          </div>
          
          <Button
            onClick={() => setIsContactModalOpen(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg font-semibold text-xl transition-all duration-300 transform hover:scale-105"
            data-testid="button-discuss-project"
          >
            Обсудить мой проект
          </Button>
        </div>
      </section>

      <ContactModal 
        open={isContactModalOpen} 
        onOpenChange={setIsContactModalOpen} 
      />
    </div>
  );
}
