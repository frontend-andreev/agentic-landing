import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { sendContactEmail } from "./sendgrid";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  description: z.string().min(10, "Description must be at least 10 characters")
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactSchema.parse(req.body);
      
      console.log("Contact form submission:", validatedData);
      
      // Log the contact form data (temporarily disabled email sending)
      console.log("=== НОВАЯ ЗАЯВКА ===");
      console.log(`Имя: ${validatedData.name}`);
      console.log(`Email: ${validatedData.email}`);
      console.log(`Описание: ${validatedData.description}`);
      console.log(`Время: ${new Date().toLocaleString('ru-RU')}`);
      console.log("==================");
      
      // TODO: Configure SendGrid properly
      // For now, just return success and log the data
      res.json({ 
        success: true, 
        message: "Заявка получена! Данные сохранены в логах сервера. Для получения заявки проверьте консоль сервера.",
        submittedAt: new Date().toISOString()
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
