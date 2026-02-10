import { 
  type User, 
  type UpsertUser,
  type InsertTimerSession,
  type TimerSession,
  users,
  timerSessions
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Timer session operations
  createTimerSession(session: InsertTimerSession): Promise<TimerSession>;
  updateTimerSession(id: string, timeSpent: number, completed: number): Promise<TimerSession>;
  getUserTimerSessions(userId: string, limit?: number): Promise<TimerSession[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Timer session operations
  async createTimerSession(session: InsertTimerSession): Promise<TimerSession> {
    const [newSession] = await db
      .insert(timerSessions)
      .values(session)
      .returning();
    return newSession;
  }

  async updateTimerSession(id: string, timeSpent: number, completed: number): Promise<TimerSession> {
    const [updated] = await db
      .update(timerSessions)
      .set({ 
        timeSpent, 
        completed,
        endedAt: new Date() 
      })
      .where(eq(timerSessions.id, id))
      .returning();
    return updated;
  }

  async getUserTimerSessions(userId: string, limit: number = 50): Promise<TimerSession[]> {
    return await db
      .select()
      .from(timerSessions)
      .where(eq(timerSessions.userId, userId))
      .orderBy(desc(timerSessions.startedAt))
      .limit(limit);
  }
}

export const storage = new DatabaseStorage();
