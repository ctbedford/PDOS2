import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertMetricsSchema, insertGoalSchema, insertJournalEntrySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Metrics routes
  app.get("/api/metrics", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const metrics = storage.getUserMetrics(req.user.id);
    res.json(metrics);
  });

  app.post("/api/metrics", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const metrics = storage.createMetrics({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(metrics);
  });

  // Goals routes
  app.get("/api/goals", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const goals = storage.getUserGoals(req.user.id);
    res.json(goals);
  });

  app.post("/api/goals", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const goal = storage.createGoal({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(goal);
  });

  // Journal routes
  app.get("/api/journal", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const entries = storage.getUserJournalEntries(req.user.id);
    res.json(entries);
  });

  app.post("/api/journal", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const entry = storage.createJournalEntry({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(entry);
  });

  const httpServer = createServer(app);
  return httpServer;
}
