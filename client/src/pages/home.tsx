import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { NeuralBackground } from "@/components/neural-background";
import { ChatDemo } from "@/components/chat-demo";
import { ContactModal } from "@/components/contact-modal";

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fade in animation on mount - prevent unwanted scroll
  useEffect(() => {
    // Ensure page starts at top
    window.scrollTo(0, 0);
    
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

      {/* Hero Section - More Subtle */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-6 animate-on-scroll">
            <span className="text-sm font-medium text-[var(--text-subtle)] tracking-wide uppercase">
              Следующий уровень поддержки
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light mb-8 animate-on-scroll leading-tight tracking-tight">
            Когда ваши клиенты получают ответы
            <br/>
            <span className="font-normal bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
              мгновенно
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-muted)] mb-16 animate-on-scroll max-w-2xl mx-auto leading-relaxed font-light">
            Наш AI не заменяет вашу команду. Он освобождает её для действительно важных задач.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-on-scroll max-w-md mx-auto">
            <Button
              onClick={() => scrollToSection('demo')}
              className="px-6 py-3 bg-[var(--dark-tertiary)] hover:bg-[var(--dark-secondary)] border border-[var(--dark-border)] hover:border-[var(--accent-primary)]/50 rounded-lg font-medium transition-all duration-500 text-white text-sm"
              data-testid="button-watch-demo"
            >
              Попробовать демо
            </Button>
            <Button
              onClick={() => scrollToSection('story')}
              variant="ghost"
              className="px-6 py-3 text-[var(--text-muted)] hover:text-white rounded-lg font-medium transition-all duration-300 text-sm"
              data-testid="button-learn-more"
            >
              Узнать подробнее
            </Button>
          </div>
        </div>
      </section>

      {/* Story Section - Narrative Approach */}
      <section id="story" className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-light mb-6 tracking-tight">
              Представьте себе мир, где каждый вопрос клиента
              <br/>
              <span className="font-normal text-[var(--accent-primary)]">получает идеальный ответ</span>
            </h2>
            <p className="text-lg text-[var(--text-muted)] font-light">
              Мгновенно. Точно. В любое время суток.
            </p>
          </div>
          
          {/* Side by side comparison */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Current Approach */}
            <div className="space-y-6" data-testid="old-approach-content">
              <div className="text-center mb-8">
                <h3 className="text-xl font-medium mb-2 text-[var(--text-subtle)]">Как сейчас</h3>
                <div className="w-16 h-px bg-[var(--text-subtle)]/30 mx-auto"></div>
              </div>
              
              <div className="space-y-6">
                <div className="group">
                  <div className="text-sm text-[var(--text-subtle)] mb-2 font-medium">3:47 AM</div>
                  <div className="p-5 bg-[var(--dark-secondary)]/30 rounded-xl border border-[var(--dark-border)]/50">
                    <p className="text-[var(--text-muted)] leading-relaxed text-sm">
                      "Извините, наша поддержка работает с 9:00 до 18:00. 
                      Ваш запрос будет обработан в порядке очереди..."
                    </p>
                  </div>
                </div>
                <div className="group">
                  <div className="text-sm text-[var(--text-subtle)] mb-2 font-medium">12 часов спустя</div>
                  <div className="p-5 bg-[var(--dark-secondary)]/30 rounded-xl border border-[var(--dark-border)]/50">
                    <p className="text-[var(--text-muted)] leading-relaxed text-sm">
                      "Здравствуйте! Извините за задержку. К сожалению, 
                      коллега, который знает ответ на ваш вопрос, сегодня болеет..."
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/20">
                  <div className="text-xs text-red-400 font-medium mb-1">Результат</div>
                  <div className="text-[var(--text-muted)] text-sm">
                    Клиент ждёт 12+ часов, может уйти к конкурентам
                  </div>
                </div>
              </div>
            </div>

            {/* AI Approach */}
            <div className="space-y-6" data-testid="ai-agent-content">
              <div className="text-center mb-8">
                <h3 className="text-xl font-medium mb-2 text-[var(--accent-primary)]">С AI-агентом</h3>
                <div className="w-16 h-px bg-[var(--accent-primary)]/50 mx-auto"></div>
              </div>
              
              <div className="space-y-6">
                <div className="group">
                  <div className="text-sm text-[var(--accent-primary)] mb-2 font-medium">3:47 AM</div>
                  <div className="p-5 bg-gradient-to-br from-[var(--accent-primary)]/8 to-[var(--accent-secondary)]/8 rounded-xl border border-[var(--accent-primary)]/25">
                    <p className="text-white leading-relaxed text-sm">
                      "Здравствуйте! Для отмены заказа №12345 перейдите в личный кабинет → 
                      'Мои заказы' → нажмите 'Отменить'. Возврат средств займёт 3-5 дней."
                    </p>
                    <div className="text-xs text-[var(--text-subtle)] mt-3">
                      Ответ получен мгновенно • AI-агент
                    </div>
                  </div>
                </div>
                <div className="group">
                  <div className="text-sm text-[var(--accent-primary)] mb-2 font-medium">В это же время</div>
                  <div className="p-4 bg-[var(--dark-tertiary)]/50 rounded-xl border border-[var(--dark-border)]">
                    <div className="text-xs text-[var(--text-subtle)] mb-2">Активные диалоги</div>
                    <div className="flex space-x-2">
                      {[1,2,3,4,5,6,7,8].map(i => (
                        <div key={i} className="w-6 h-6 bg-[var(--accent-primary)]/20 rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-[var(--accent-primary)] rounded-full animate-pulse"></div>
                        </div>
                      ))}
                      <div className="text-xs text-[var(--text-muted)] flex items-center">+247</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-green-500/8 rounded-xl border border-green-500/25">
                  <div className="text-xs text-green-400 font-medium mb-1">Результат</div>
                  <div className="text-[var(--text-muted)] text-sm">
                    Мгновенное решение, довольный клиент, масштабируемость
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Refined */}
      <section id="process" className="relative z-10 py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-light mb-6 tracking-tight">
              Как мы создаём AI, который 
              <br/>
              <span className="font-normal text-[var(--accent-primary)]">знает ваш бизнес лучше стажёра</span>
            </h2>
            <p className="text-lg text-[var(--text-muted)] font-light max-w-2xl mx-auto">
              Три этапа. Никаких сюрпризов. Полная прозрачность на каждом шаге.
            </p>
          </div>
          
          <div className="space-y-24">
            {[
              {
                step: "01",
                title: "Изучение",
                subtitle: "Глубокое погружение в ваш бизнес",
                description: "Анализируем вашу базу знаний, FAQ и историю диалогов. AI изучает специфику продуктов, типичные вопросы клиентов и особенности коммуникации вашего бренда.",
                color: "var(--accent-primary)",
                items: ["База знаний", "История диалогов", "FAQ и инструкции", "Стиль общения"]
              },
              {
                step: "02", 
                title: "Настройка",
                subtitle: "Создание уникальной личности AI",
                description: "Формируем индивидуальный стиль общения, который идеально соответствует вашему бренду. От формального до дружелюбного — AI говорит вашим голосом.",
                color: "var(--accent-secondary)",
                items: ["Тон коммуникации", "Терминология", "Сценарии ответов", "Эскалация сложных кейсов"]
              },
              {
                step: "03",
                title: "Интеграция", 
                subtitle: "Бесшовное внедрение в ваш сайт",
                description: "Предоставляем готовый код для интеграции, проводим тестирование и запускаем AI-агента. Никаких технических сложностей — всё работает сразу.",
                color: "var(--text-muted)",
                items: ["Интеграция в сайт", "Финальное тестирование", "Запуск и мониторинг", "Техническая поддержка"]
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                  <div className="lg:text-right">
                    <div className="inline-flex items-center space-x-4 lg:flex-row-reverse lg:space-x-reverse">
                      <div 
                        className="w-12 h-12 rounded-2xl flex items-center justify-center font-medium text-sm"
                        style={{ backgroundColor: `${item.color}20`, color: item.color }}
                      >
                        {item.step}
                      </div>
                      <div>
                        <h3 className="text-xl font-medium mb-1" style={{ color: item.color }}>
                          {item.title}
                        </h3>
                        <p className="text-sm text-[var(--text-subtle)]">{item.subtitle}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2">
                    <p className="text-[var(--text-muted)] leading-relaxed mb-6">
                      {item.description}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {item.items.map((detail, i) => (
                        <div key={i} className="flex items-center space-x-3">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-sm text-[var(--text-muted)]">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Separator line - not for the last item */}
                {index < 2 && (
                  <div className="flex justify-center mt-16">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-px bg-gradient-to-r from-transparent via-[var(--dark-border)] to-transparent"></div>
                      <div className="w-2 h-2 rounded-full bg-[var(--dark-border)] animate-pulse"></div>
                      <div className="w-12 h-px bg-gradient-to-r from-[var(--dark-border)] via-transparent to-transparent"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section - Interactive Experience */}
      <section id="demo" className="relative z-10 py-32 px-6 bg-[var(--dark-secondary)]/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-6 tracking-tight">
              Испытайте на себе
            </h2>
            <p className="text-lg text-[var(--text-muted)] font-light max-w-2xl mx-auto leading-relaxed">
              Этот AI-агент работает на том же движке, что мы создадим для вас. 
              Задайте любой вопрос о нашем сервисе.
            </p>
            <div className="mt-8 flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-[var(--accent-primary)] rounded-full animate-pulse"></div>
              <span className="text-xs text-[var(--text-subtle)] font-medium tracking-wide uppercase">
                Живой пример
              </span>
              <div className="w-2 h-2 bg-[var(--accent-secondary)] rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
          
          <ChatDemo />
        </div>
      </section>

      {/* Investment Section - Sophisticated Approach */}
      <section id="pricing" className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-light mb-8 tracking-tight">
              Инвестиция в будущее вашей поддержки
            </h2>
            <p className="text-lg text-[var(--text-muted)] font-light max-w-2xl mx-auto leading-relaxed">
              Мы не продаём программное обеспечение. Мы создаём решения.
            </p>
          </div>

          <div className="grid gap-12 lg:gap-16 mb-16">
            <div className="bg-[var(--dark-secondary)]/30 backdrop-blur rounded-2xl p-8 lg:p-12 border border-[var(--dark-border)]">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                <div>
                  <h3 className="text-xl font-medium mb-4 text-[var(--accent-primary)]">
                    Почему не SaaS?
                  </h3>
                  <p className="text-[var(--text-muted)] leading-relaxed mb-6">
                    Готовые решения не знают специфику вашего бизнеса. Мы создаём уникального AI-агента, 
                    который понимает ваши продукты, клиентов и процессы на том же уровне, что и ваши лучшие сотрудники.
                  </p>
                  <div className="space-y-3">
                    {[
                      "Глубокая интеграция с вашими системами",
                      "Понимание контекста вашего бизнеса", 
                      "Индивидуальный стиль коммуникации",
                      "Полный контроль над данными"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className="w-1.5 h-1.5 bg-[var(--accent-primary)] rounded-full"></div>
                        <span className="text-sm text-[var(--text-muted)]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-4 text-[var(--accent-secondary)]">
                    Как мы работаем
                  </h3>
                  <p className="text-[var(--text-muted)] leading-relaxed mb-6">
                    Единоразовая разработка под ключ. Стоимость зависит от сложности интеграции, 
                    объёма обучающих данных и ваших уникальных требований.
                  </p>
                  <div className="space-y-4">
                    <div className="p-4 bg-[var(--dark-tertiary)]/50 rounded-xl">
                      <div className="text-sm text-[var(--accent-secondary)] font-medium mb-1">Типичный проект</div>
                      <div className="text-[var(--text-muted)] text-sm">
                        Окупается за 2-3 месяца за счёт экономии на поддержке
                      </div>
                    </div>
                    <div className="p-4 bg-[var(--dark-tertiary)]/50 rounded-xl">
                      <div className="text-sm text-[var(--accent-secondary)] font-medium mb-1">После запуска</div>
                      <div className="text-[var(--text-muted)] text-sm">
                        Опциональная техническая поддержка и обновления
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={() => setIsContactModalOpen(true)}
              className="px-8 py-3 bg-[var(--dark-tertiary)] hover:bg-[var(--dark-secondary)] border border-[var(--dark-border)] hover:border-[var(--accent-primary)]/50 rounded-xl font-medium transition-all duration-500 text-white"
              data-testid="button-discuss-project"
            >
              Обсудить мой проект
            </Button>
            <p className="text-sm text-[var(--text-subtle)] mt-4">
              Бесплатная консультация • Расчёт стоимости за 24 часа
            </p>
          </div>
        </div>
      </section>

      <ContactModal 
        open={isContactModalOpen} 
        onOpenChange={setIsContactModalOpen} 
      />
    </div>
  );
}
