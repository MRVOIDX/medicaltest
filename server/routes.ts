import type { Express } from "express";
import { storage } from "./storage";
import { analyzeSymptomsWithAI, chatWithAIStream, type ChatMessage } from "./gemini";
import { turkishClinics, turkishCities } from "@shared/clinicData";
import { z } from "zod";

const analyzeSymptomsSchema = z.object({
  symptoms: z.string().min(1, "Symptoms description is required"),
});

const chatSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(["user", "model"]),
    content: z.string().min(1),
  })),
  language: z.string().optional(),
});

export function registerRoutes(app: Express): void {
  // Analyze symptoms using Gemini AI
  app.post("/api/analyze-symptoms", async (req, res) => {
    try {
      const { symptoms } = analyzeSymptomsSchema.parse(req.body);
      
      const result = await analyzeSymptomsWithAI(symptoms);
      
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid request", details: error.errors });
      } else {
        console.error("Error analyzing symptoms:", error);
        res.status(500).json({ 
          error: "Failed to analyze symptoms. Please try again." 
        });
      }
    }
  });

  // Get clinics by department and optional city filter
  app.get("/api/clinics", async (req, res) => {
    try {
      const { department, city } = req.query;
      
      let filteredClinics = turkishClinics;
      
      if (department) {
        filteredClinics = filteredClinics.filter(
          clinic => clinic.department === department
        );
      }
      
      if (city) {
        filteredClinics = filteredClinics.filter(
          clinic => clinic.city === city
        );
      }
      
      res.json(filteredClinics);
    } catch (error) {
      console.error("Error fetching clinics:", error);
      res.status(500).json({ error: "Failed to fetch clinics" });
    }
  });

  // Get all cities
  app.get("/api/cities", async (req, res) => {
    try {
      res.json(turkishCities);
    } catch (error) {
      console.error("Error fetching cities:", error);
      res.status(500).json({ error: "Failed to fetch cities" });
    }
  });

  // Chat with AI (streaming)
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, language = 'en' } = chatSchema.parse(req.body);
      
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      
      const stream = chatWithAIStream(messages as ChatMessage[], language);
      
      for await (const chunk of stream) {
        res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
      }
      
      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid request", details: error.errors });
      } else {
        console.error("Error in chat:", error);
        if (!res.headersSent) {
          res.status(500).json({ 
            error: "Failed to generate response. Please try again." 
          });
        } else {
          res.write(`data: ${JSON.stringify({ error: "Failed to generate response" })}\n\n`);
          res.end();
        }
      }
    }
  });
}
