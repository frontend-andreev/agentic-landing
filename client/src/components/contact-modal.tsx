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
    onSuccess: () => {
      toast({
        title: "Заявка отправлена",
        description: "Спасибо! Мы свяжемся с вами в ближайшее время.",
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
      <DialogContent className="bg-[var(--dark-secondary)] border-[var(--dark-border)] text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Обсудить проект</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm text-[var(--text-muted)]">
              Имя *
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange('name')}
              required
              className="bg-gray-700/30 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-blue-400"
              data-testid="input-name"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-sm text-[var(--text-muted)]">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              required
              className="bg-gray-700/30 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-blue-400"
              data-testid="input-email"
            />
          </div>
          <div>
            <Label htmlFor="description" className="text-sm text-[var(--text-muted)]">
              Краткое описание задачи *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={handleInputChange('description')}
              rows={4}
              required
              className="bg-gray-700/30 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-blue-400 resize-none"
              data-testid="textarea-description"
            />
          </div>
          <div className="flex space-x-4 pt-4">
            <Button
              type="submit"
              disabled={submitMutation.isPending}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold"
              data-testid="button-submit"
            >
              {submitMutation.isPending ? "Отправка..." : "Отправить"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="px-6 border-gray-600 hover:border-gray-500 text-white hover:bg-gray-700/50"
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
