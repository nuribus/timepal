import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertTimerSessionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Timer session routes
  app.post('/api/timer-sessions', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = insertTimerSessionSchema.parse({
        ...req.body,
        userId,
      });
      const session = await storage.createTimerSession(validatedData);
      res.json(session);
    } catch (error) {
      console.error("Error creating timer session:", error);
      res.status(500).json({ message: "Failed to create timer session" });
    }
  });

  app.patch('/api/timer-sessions/:id', isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const { timeSpent, completed } = req.body;
      const session = await storage.updateTimerSession(id, timeSpent, completed);
      res.json(session);
    } catch (error) {
      console.error("Error updating timer session:", error);
      res.status(500).json({ message: "Failed to update timer session" });
    }
  });

  app.get('/api/timer-sessions', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const sessions = await storage.getUserTimerSessions(userId);
      res.json(sessions);
    } catch (error) {
      console.error("Error fetching timer sessions:", error);
      res.status(500).json({ message: "Failed to fetch timer sessions" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
