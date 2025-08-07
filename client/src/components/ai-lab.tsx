import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Industry {
  id: string;
  name: string;
  icon: string;
  description: string;
  challenges: string[];
  aiSolutions: string[];
  sampleQuestions: string[];
}

const industries: Industry[] = [
  {
    id: "ecommerce",
    name: "Интернет-магазин",
    icon: "🛍️",
    description: "E-commerce платформа с каталогом товаров и доставкой",
    challenges: [
      "Вопросы о размерах и характеристиках товаров",
      "Статус заказа и доставки", 
      "Возвраты и обмены",
      "Технические проблемы с сайтом"
    ],
    aiSolutions: [
      "Интеграция с базой товаров для мгновенных ответов о наличии",
      "Подключение к системе трекинга заказов",
      "Автоматизация процесса возвратов",
      "Эскалация технических вопросов разработчикам"
    ],
    sampleQuestions: [
      "Есть ли кроссовки Nike Air Max в размере 42?",
      "Где мой заказ №12345?",
      "Как вернуть товар?"
    ]
  },
  {
    id: "education",
    name: "Онлайн-школа",
    icon: "🎓",
    description: "Образовательная платформа с курсами и сертификацией",
    challenges: [
      "Вопросы о программе курсов",
      "Технические проблемы с доступом к урокам",
      "Сертификация и дипломы",
      "Расписание и преподаватели"
    ],
    aiSolutions: [
      "База знаний по всем курсам и программам",
      "Диагностика технических проблем доступа",
      "Автоматическая выдача справок о прохождении",
      "Интеграция с календарем занятий"
    ],
    sampleQuestions: [
      "Что входит в курс 'Python для начинающих'?",
      "Не открывается урок, что делать?",
      "Как получить сертификат?"
    ]
  },
  {
    id: "saas",
    name: "SaaS-платформа",
    icon: "⚡",
    description: "Программное обеспечение как сервис для бизнеса",
    challenges: [
      "Настройка и конфигурация системы",
      "Интеграции с другими сервисами",
      "Биллинг и подписки",
      "Техническая поддержка функций"
    ],
    aiSolutions: [
      "Пошаговые гайды по настройке",
      "Документация по API и интеграциям",  
      "Автоматическое управление подписками",
      "Диагностика проблем и решения"
    ],
    sampleQuestions: [
      "Как подключить CRM к вашей платформе?",
      "Почему списалась двойная оплата?",
      "Не работает экспорт данных"
    ]
  }
];

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  duration: number;
  details: string[];
}

const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Анализ данных",
    description: "Изучаем специфику вашего бизнеса",
    duration: 2000,
    details: [
      "Анализируем FAQ и базу знаний",
      "Изучаем историю обращений клиентов",
      "Выявляем типичные сценарии",
      "Определяем тон и стиль общения"
    ]
  },
  {
    id: 2,
    title: "Обучение модели",
    description: "Создаём уникального AI-агента",
    duration: 3000,
    details: [
      "Загружаем данные в нейронную сеть",
      "Настраиваем параметры модели",
      "Обучаем на ваших примерах",
      "Тестируем качество ответов"
    ]
  },
  {
    id: 3,
    title: "Интеграция",
    description: "Подключаем к вашим системам",
    duration: 2500,
    details: [
      "Создаём API-интеграции",
      "Настраиваем доступ к базам данных", 
      "Подключаем внешние сервисы",
      "Тестируем в реальных условиях"
    ]
  }
];

interface AILabProps {
  onContactModalOpen?: () => void;
}

export function AILab({ onContactModalOpen }: AILabProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processComplete, setProcessComplete] = useState(false);
  const [currentStepDetails, setCurrentStepDetails] = useState<string[]>([]);
  const [visibleDetails, setVisibleDetails] = useState(0);

  useEffect(() => {
    if (isProcessing && selectedIndustry) {
      const step = processSteps[currentStep];
      if (step) {
        setCurrentStepDetails(step.details);
        setVisibleDetails(0);
        
        // Show details one by one
        step.details.forEach((_, index) => {
          setTimeout(() => {
            setVisibleDetails(index + 1);
          }, (index + 1) * (step.duration / step.details.length));
        });

        setTimeout(() => {
          if (currentStep < processSteps.length - 1) {
            setCurrentStep(currentStep + 1);
          } else {
            setIsProcessing(false);
            setProcessComplete(true);
          }
        }, step.duration);
      }
    }
  }, [currentStep, isProcessing, selectedIndustry]);

  const startProcess = (industry: Industry) => {
    setSelectedIndustry(industry);
    setCurrentStep(0);
    setIsProcessing(true);
    setProcessComplete(false);
    setVisibleDetails(0);
  };

  const resetLab = () => {
    setSelectedIndustry(null);
    setCurrentStep(0);
    setIsProcessing(false);
    setProcessComplete(false);
    setVisibleDetails(0);
  };

  return (
    <section id="ai-lab" className="relative z-10 py-20 px-6 bg-[var(--dark-secondary)]/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-[var(--accent-primary)] rounded-full animate-pulse"></div>
            <span className="text-xs text-[var(--text-subtle)] font-medium tracking-wide uppercase">
              AI-Лаборатория
            </span>
            <div className="w-2 h-2 bg-[var(--accent-secondary)] rounded-full animate-pulse delay-300"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-light mb-6 tracking-tight">
            Заглянуть под капот нашего процесса
          </h2>
          <p className="text-lg text-[var(--text-muted)] font-light max-w-2xl mx-auto leading-relaxed">
            Выберите свою индустрию и посмотрите, как мы создаём AI-агента специально для вашей сферы бизнеса
          </p>
        </div>

        {!selectedIndustry ? (
          // Industry Selection
          <div className="grid md:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <Card 
                key={industry.id}
                className="bg-[var(--dark-secondary)]/30 border-[var(--dark-border)] hover:border-[var(--accent-primary)]/50 transition-all duration-500 cursor-pointer group"
                onClick={() => startProcess(industry)}
                data-testid={`industry-${industry.id}`}
              >
                <div className="p-6">
                  <div className="text-3xl mb-4">{industry.icon}</div>
                  <h3 className="text-xl font-medium mb-2 text-white group-hover:text-[var(--accent-primary)] transition-colors">
                    {industry.name}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mb-4 leading-relaxed">
                    {industry.description}
                  </p>
                  <div className="space-y-2">
                    <div className="text-xs text-[var(--text-subtle)] font-medium">
                      Типичные вопросы:
                    </div>
                    {industry.challenges.slice(0, 2).map((challenge, index) => (
                      <div key={index} className="text-xs text-[var(--text-muted)] flex items-start space-x-2">
                        <div className="w-1 h-1 bg-[var(--accent-primary)] rounded-full mt-2 flex-shrink-0"></div>
                        <span>{challenge}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-[var(--dark-border)]/50">
                    <span className="text-xs text-[var(--accent-primary)] font-medium">
                      Создать AI-агента →
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          // Process Visualization
          <div className="space-y-8">
            {/* Header with selected industry */}
            <div className="text-center">
              <div className="inline-flex items-center space-x-3 bg-[var(--dark-secondary)]/50 rounded-2xl px-6 py-3 border border-[var(--dark-border)]">
                <span className="text-2xl">{selectedIndustry.icon}</span>
                <div className="text-left">
                  <div className="text-sm text-[var(--text-subtle)]">Создаём AI для:</div>
                  <div className="font-medium text-[var(--accent-primary)]">{selectedIndustry.name}</div>
                </div>
              </div>
            </div>

            {/* Process Steps */}
            <div className="grid lg:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <div 
                  key={step.id}
                  className={`relative ${
                    currentStep === index && isProcessing 
                      ? 'ring-2 ring-[var(--accent-primary)]/50' 
                      : currentStep > index 
                        ? 'ring-2 ring-green-500/50' 
                        : ''
                  } bg-[var(--dark-secondary)]/30 rounded-2xl p-6 border border-[var(--dark-border)] transition-all duration-500`}
                  data-testid={`process-step-${step.id}`}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div 
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-500 ${
                        currentStep === index && isProcessing
                          ? 'bg-[var(--accent-primary)] text-white animate-pulse'
                          : currentStep > index
                            ? 'bg-green-500 text-white'
                            : 'bg-[var(--dark-tertiary)] text-[var(--text-subtle)]'
                      }`}
                    >
                      {currentStep > index ? '✓' : step.id}
                    </div>
                    <h3 className="font-medium text-white">{step.title}</h3>
                  </div>
                  
                  <p className="text-sm text-[var(--text-muted)] mb-4">
                    {step.description}
                  </p>

                  {currentStep === index && isProcessing && (
                    <div className="space-y-2">
                      {currentStepDetails.map((detail, detailIndex) => (
                        <div 
                          key={detailIndex}
                          className={`text-xs text-[var(--text-muted)] flex items-start space-x-2 transition-all duration-300 ${
                            detailIndex < visibleDetails 
                              ? 'opacity-100 translate-x-0' 
                              : 'opacity-0 translate-x-4'
                          }`}
                        >
                          <div className="w-1 h-1 bg-[var(--accent-primary)] rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Results */}
            {processComplete && (
              <div className="bg-gradient-to-br from-[var(--accent-primary)]/5 to-[var(--accent-secondary)]/5 rounded-2xl p-8 border border-[var(--accent-primary)]/20 animate-fade-in">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-medium text-[var(--accent-primary)] mb-2">
                    🎉 AI-агент готов!
                  </h3>
                  <p className="text-[var(--text-muted)]">
                    Теперь ваши клиенты получат мгновенные ответы на вопросы о {selectedIndustry.name.toLowerCase()}
                  </p>
                </div>

                {/* Sample interaction */}
                <div className="bg-[var(--dark-bg)]/50 rounded-xl p-4 mb-6">
                  <div className="text-xs text-[var(--text-subtle)] mb-3">Пример диалога:</div>
                  <div className="space-y-3">
                    <div className="flex justify-end">
                      <div className="bg-[var(--dark-tertiary)] rounded-lg px-3 py-2 max-w-xs">
                        <div className="text-sm text-white">
                          {selectedIndustry.sampleQuestions[0]}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-gradient-to-r from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 rounded-lg px-3 py-2 max-w-xs border border-[var(--accent-primary)]/30">
                        <div className="text-sm text-white">
                          {selectedIndustry.aiSolutions[0]}
                        </div>
                        <div className="text-xs text-[var(--text-subtle)] mt-1">
                          Ответ получен за 0.3 сек • AI-агент
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={resetLab}
                    variant="outline"
                    className="bg-[var(--dark-tertiary)]/50 border-[var(--dark-border)] text-[var(--text-muted)] hover:bg-[var(--dark-secondary)]/70 hover:text-white"
                    data-testid="button-try-another"
                  >
                    Попробовать другую индустрию
                  </Button>
                  <Button
                    onClick={onContactModalOpen}
                    className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] hover:from-[var(--accent-primary)]/90 hover:to-[var(--accent-secondary)]/90 text-white"
                    data-testid="button-create-for-me"
                  >
                    Создать такого для моего бизнеса
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}