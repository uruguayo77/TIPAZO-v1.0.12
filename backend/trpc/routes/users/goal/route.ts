import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../../create-context";
import { TRPCError } from "@trpc/server";

// Schema for goal data
const goalSchema = z.object({
  purpose: z.string().min(1, "Purpose is required"),
  goal: z.number().min(1, "Goal amount must be greater than 0"),
});

// Mock database for goals (in a real app, this would be a database)
const goalDb = new Map();

// Helper function to check if user is admin
const isAdmin = (userId: string) => {
  // In a real app, this would check the user's role in the database
  return userId === 'admin';
};

// Helper function to check if user exists
const userExists = (userId: string) => {
  // In a real app, this would check if the user exists in the database
  return true; // Mock implementation always returns true
};

// Helper function to get user's goal
const getUserGoal = (userId: string) => {
  return goalDb.get(userId) || null;
};

// Helper function to create a mock user response
const createUserResponse = (userId: string, goalData: any = null) => {
  return {
    id: userId,
    bio: null,
    name: "User Name", // In a real app, this would be fetched from the database
    role: userId === 'admin' ? "admin" : "employee",
    rating: 0,
    goal: goalData,
  };
};

export const goalRouter = createTRPCRouter({
  // Update current user's goal
  updateMyGoal: publicProcedure
    .input(goalSchema)
    .mutation(async ({ input, ctx }) => {
      // In a real app, get the user ID from the authenticated session
      const userId = "current-user-id"; // Mock user ID
      
      // Create or update the goal
      const goalData = {
        id: `goal-${userId}`,
        purpose: input.purpose,
        progress: getUserGoal(userId)?.progress || 0, // Preserve existing progress
        goal: input.goal,
        updatedAt: new Date().toISOString(),
        createdAt: getUserGoal(userId)?.createdAt || new Date().toISOString(),
      };
      
      goalDb.set(userId, goalData);
      
      return createUserResponse(userId, goalData);
    }),
  
  // Delete current user's goal
  deleteMyGoal: publicProcedure
    .mutation(async ({ ctx }) => {
      // In a real app, get the user ID from the authenticated session
      const userId = "current-user-id"; // Mock user ID
      
      // Delete the goal
      goalDb.delete(userId);
      
      return createUserResponse(userId);
    }),
  
  // Admin updates a specific user's goal
  updateUserGoal: publicProcedure
    .input(z.object({
      userId: z.string().uuid("Invalid user ID"),
      ...goalSchema.shape,
    }))
    .mutation(async ({ input, ctx }) => {
      // In a real app, get the admin ID from the authenticated session
      const adminId = "admin"; // Mock admin ID
      
      // Check if user is admin
      if (!isAdmin(adminId)) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only admins can update other users' goals",
        });
      }
      
      // Check if user exists
      if (!userExists(input.userId)) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      
      // Create or update the goal
      const goalData = {
        id: `goal-${input.userId}`,
        purpose: input.purpose,
        progress: getUserGoal(input.userId)?.progress || 0, // Preserve existing progress
        goal: input.goal,
        updatedAt: new Date().toISOString(),
        createdAt: getUserGoal(input.userId)?.createdAt || new Date().toISOString(),
      };
      
      goalDb.set(input.userId, goalData);
      
      return createUserResponse(input.userId, goalData);
    }),
  
  // Admin deletes a specific user's goal
  deleteUserGoal: publicProcedure
    .input(z.object({
      userId: z.string().uuid("Invalid user ID"),
    }))
    .mutation(async ({ input, ctx }) => {
      // In a real app, get the admin ID from the authenticated session
      const adminId = "admin"; // Mock admin ID
      
      // Check if user is admin
      if (!isAdmin(adminId)) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only admins can delete other users' goals",
        });
      }
      
      // Check if user exists
      if (!userExists(input.userId)) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      
      // Delete the goal
      goalDb.delete(input.userId);
      
      return createUserResponse(input.userId);
    }),
  
  // Get a user's goal (for admin or self)
  getUserGoal: publicProcedure
    .input(z.object({
      userId: z.string().uuid("Invalid user ID"),
    }))
    .query(async ({ input, ctx }) => {
      // In a real app, get the user ID from the authenticated session
      const currentUserId = "current-user-id"; // Mock user ID
      
      // Check if user is admin or self
      if (currentUserId !== input.userId && !isAdmin(currentUserId)) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You can only view your own goal or you need admin privileges",
        });
      }
      
      // Check if user exists
      if (!userExists(input.userId)) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      
      const goalData = getUserGoal(input.userId);
      
      return createUserResponse(input.userId, goalData);
    }),
});