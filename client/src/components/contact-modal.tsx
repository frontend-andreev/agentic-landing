import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ContactFormData {
  name: string;
  email: string;
  description: string;
}

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    description: ""
  });
  const { toast } = useToast();

  const submitMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Заявка отправлена",
        description: data.message || "Спасибо! Мы свяжемся с вами в ближайшее время.",
      });
      setFormData({ name: "", email: "", description: "" });
      onOpenChange(false);
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при отправке заявки. Попробуйте еще раз.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.description) {
      toast({
        title: "Заполните все поля",
        description: "Пожалуйста, заполните все обязательные поля.",
        variant: "destructive",
      });
      return;
    }
    submitMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[var(--dark-bg)] border-[var(--dark-border)] text-white max-w-md backdrop-blur">
        <DialogHeader>
          <DialogTitle className="text-xl font-light mb-2 text-[var(--accent-primary)]">
            Обсудить проект
          </DialogTitle>
          <p className="text-sm text-[var(--text-subtle)] font-light">
            Расскажите о своей задаче, и мы предложим решение
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm text-[var(--text-muted)] font-medium">
              Имя *
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange('name')}
              required
              className="bg-[var(--dark-secondary)]/30 border-[var(--dark-border)]/50 text-white placeholder:text-[var(--text-subtle)] focus:border-[var(--accent-primary)]/50 focus:ring-1 focus:ring-[var(--accent-primary)]/20 transition-all duration-300"
              placeholder="Ваше имя"
              data-testid="input-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-[var(--text-muted)] font-medium">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              required
              className="bg-[var(--dark-secondary)]/30 border-[var(--dark-border)]/50 text-white placeholder:text-[var(--text-subtle)] focus:border-[var(--accent-primary)]/50 focus:ring-1 focus:ring-[var(--accent-primary)]/20 transition-all duration-300"
              placeholder="email@example.com"
              data-testid="input-email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm text-[var(--text-muted)] font-medium">
              Краткое описание задачи *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={handleInputChange('description')}
              rows={4}
              required
              className="bg-[var(--dark-secondary)]/30 border-[var(--dark-border)]/50 text-white placeholder:text-[var(--text-subtle)] focus:border-[var(--accent-primary)]/50 focus:ring-1 focus:ring-[var(--accent-primary)]/20 resize-none transition-all duration-300"
              placeholder="Расскажите о специфике вашего бизнеса и задачах, которые должен решать AI-агент..."
              data-testid="textarea-description"
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              disabled={submitMutation.isPending}
              className="flex-1 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] hover:from-[var(--accent-primary)]/90 hover:to-[var(--accent-secondary)]/90 text-white font-medium border-0 shadow-lg transition-all duration-300"
              data-testid="button-submit"
            >
              {submitMutation.isPending ? "Отправка..." : "Отправить заявку"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="px-6 bg-[var(--dark-tertiary)]/50 border-[var(--dark-border)] text-[var(--text-muted)] hover:bg-[var(--dark-secondary)]/70 hover:text-white hover:border-[var(--dark-border)]/80 transition-all duration-300"
              data-testid="button-cancel"
            >
              Отмена
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
