import { users, metrics, goals, journalEntries } from "@shared/schema";
import type { User, InsertUser, Metrics, Goal, JournalEntry } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  sessionStore: session.Store;
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUserMetrics(userId: number): Promise<Metrics[]>;
  createMetrics(metrics: Omit<Metrics, "id">): Promise<Metrics>;
  getUserGoals(userId: number): Promise<Goal[]>;
  createGoal(goal: Omit<Goal, "id">): Promise<Goal>;
  getUserJournalEntries(userId: number): Promise<JournalEntry[]>;
  createJournalEntry(entry: Omit<JournalEntry, "id">): Promise<JournalEntry>;
}

export class MemStorage implements IStorage {
  sessionStore: session.Store;
  private users: Map<number, User>;
  private metrics: Map<number, Metrics>;
  private goals: Map<number, Goal>;
  private journalEntries: Map<number, JournalEntry>;
  private currentId: { [key: string]: number };

  constructor() {
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
    this.users = new Map();
    this.metrics = new Map();
    this.goals = new Map();
    this.journalEntries = new Map();
    this.currentId = {
      users: 1,
      metrics: 1,
      goals: 1,
      journalEntries: 1,
    };
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId.users++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  getUserMetrics(userId: number): Promise<Metrics[]> {
    return Promise.resolve(
      Array.from(this.metrics.values()).filter(
        (metric) => metric.userId === userId,
      ),
    );
  }

  createMetrics(metrics: Omit<Metrics, "id">): Promise<Metrics> {
    const id = this.currentId.metrics++;
    const newMetrics = { ...metrics, id };
    this.metrics.set(id, newMetrics);
    return Promise.resolve(newMetrics);
  }

  getUserGoals(userId: number): Promise<Goal[]> {
    return Promise.resolve(
      Array.from(this.goals.values()).filter((goal) => goal.userId === userId),
    );
  }

  createGoal(goal: Omit<Goal, "id">): Promise<Goal> {
    const id = this.currentId.goals++;
    const newGoal = { ...goal, id };
    this.goals.set(id, newGoal);
    return Promise.resolve(newGoal);
  }

  getUserJournalEntries(userId: number): Promise<JournalEntry[]> {
    return Promise.resolve(
      Array.from(this.journalEntries.values()).filter(
        (entry) => entry.userId === userId,
      ),
    );
  }

  createJournalEntry(entry: Omit<JournalEntry, "id">): Promise<JournalEntry> {
    const id = this.currentId.journalEntries++;
    const newEntry = { ...entry, id };
    this.journalEntries.set(id, newEntry);
    return Promise.resolve(newEntry);
  }
}

export const storage = new MemStorage();
