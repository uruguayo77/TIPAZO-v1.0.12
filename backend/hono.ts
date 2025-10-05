import { Hono } from "hono";
import { cors } from "hono/cors";
import Stripe from "stripe";

// app will be mounted at /api
const app = new Hono();

// Enable CORS for all routes
app.use("*", cors());

// API Versioning prefix
const api = new Hono();

// Stripe setup
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";
const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" }) : (null as unknown as Stripe);

// Auth Routes
api.post("/v1/auth/sign-up/client", async (c) => {
  // TODO: Implement client sign-up logic
  return c.json({ message: "Client sign-up successful" }, 201);
});

api.post("/v1/auth/sign-up", async (c) => {
  // TODO: Implement worker sign-up logic
  return c.json({ message: "Sign-up successful" }, 201);
});

api.post("/v1/auth/sign-in", async (c) => {
  // TODO: Implement sign-in logic
  return c.json({ message: "Sign-in successful", token: "mock_token", refreshToken: "mock_refresh_token" }, 200);
});

api.post("/v1/auth/tokens/:refreshToken/refresh", async (c) => {
  const refreshToken = c.req.param("refreshToken");
  // TODO: Implement token refresh logic
  return c.json({ message: "Token refreshed", token: "mock_new_token" }, 200);
});

// Tips Routes
api.post("/v1/users/:id/tips/anonymous", async (c) => {
  const userId = c.req.param("id");
  // TODO: Implement anonymous tip logic
  return c.json({ message: `Anonymous tip sent to user ${userId}` }, 201);
});

api.post("/v1/users/:id/tips", async (c) => {
  const userId = c.req.param("id");
  // TODO: Implement tip logic
  return c.json({ message: `Tip sent to user ${userId}` }, 201);
});

api.get("/v1/tips/all", async (c) => {
  // TODO: Implement get all tips logic (admin)
  return c.json({ tips: [] }, 200);
});

api.get("/v1/tips", async (c) => {
  // TODO: Implement get user tips logic
  return c.json({ tips: [] }, 200);
});

api.get("/v1/tips/:id", async (c) => {
  const tipId = c.req.param("id");
  // TODO: Implement get specific tip logic
  return c.json({ tip: { id: tipId } }, 200);
});

// Reviews Routes
api.delete("/v1/reviews/:id", async (c) => {
  const reviewId = c.req.param("id");
  // TODO: Implement delete review logic
  return c.json({ message: `Review ${reviewId} deleted` }, 200);
});

api.get("/v1/users/me/reviews", async (c) => {
  // TODO: Implement get my reviews logic
  return c.json({ reviews: [] }, 200);
});

api.get("/v1/users/:id/reviews", async (c) => {
  const userId = c.req.param("id");
  // TODO: Implement get user reviews logic
  return c.json({ reviews: [] }, 200);
});

// Balances Routes
api.get("/v1/transactions", async (c) => {
  // TODO: Implement get all transactions logic (admin)
  return c.json({ transactions: [] }, 200);
});

api.get("/v1/users/me/balance", async (c) => {
  // TODO: Implement get my balance logic
  return c.json({ balance: 0 }, 200);
});

api.get("/v1/users/me/transactions", async (c) => {
  // TODO: Implement get my transactions logic
  return c.json({ transactions: [] }, 200);
});

api.get("/v1/users/:id/transactions", async (c) => {
  const userId = c.req.param("id");
  // TODO: Implement get user transactions logic
  return c.json({ transactions: [] }, 200);
});

api.post("/v1/users/:id/transactions", async (c) => {
  const userId = c.req.param("id");
  // TODO: Implement create transaction for user logic
  return c.json({ message: `Transaction created for user ${userId}` }, 201);
});

// Payments: Stripe Checkout (create session)
api.post("/v1/payments/stripe/checkout", async (c) => {
  if (!stripe) {
    return c.json({ message: "Stripe is not configured" }, 500);
  }

  try {
    const body = await c.req.json<{ amount: number; currency?: string; userId: string }>();
    const { amount, currency = "usd", userId } = body || ({} as any);

    if (!amount || amount <= 0 || !userId) {
      return c.json({ message: "Invalid request" }, 400);
    }

    // Amount in smallest currency unit
    const amountInCents = Math.round(amount * 100);

    const returnUrl = process.env.EXPO_PUBLIC_STRIPE_RETURN_URL || "https://example.com/return";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency,
            product_data: { name: "Wallet top-up" },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${returnUrl}?status=success&amount=${amount}&userId=${encodeURIComponent(userId)}`,
      cancel_url: `${returnUrl}?status=cancel`,
      metadata: { userId, type: "wallet_deposit", amount: String(amount) },
    });

    return c.json({ url: session.url }, 200);
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return c.json({ message: "Failed to create checkout session" }, 500);
  }
});

// Stripe webhook
api.post("/v1/webhooks/stripe", async (c) => {
  if (!stripe) {
    return c.json({ message: "Stripe is not configured" }, 500);
  }

  const signature = c.req.header("stripe-signature");
  if (!signature || !STRIPE_WEBHOOK_SECRET) {
    return c.json({ message: "Missing webhook signature or secret" }, 400);
  }

  const rawBody = await c.req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return c.json({ message: "Invalid signature" }, 400);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = (session.metadata && session.metadata["userId"]) || "";
      const amountTotal = session.amount_total || 0; // in cents
      const amount = amountTotal / 100;

      if (userId && amount > 0) {
        // TODO: Persist transaction and credit user balance
        // Example: call your balances service/DB here
        // await creditUserBalance(userId, amount, 'stripe', 'Stripe deposit');
        console.log(`Stripe webhook: credit ${amount} to user ${userId}`);
      }
    }

    return c.json({ received: true }, 200);
  } catch (err) {
    console.error("Stripe webhook handler error:", err);
    return c.json({ message: "Webhook handling failed" }, 500);
  }
});

// Metrics Routes
api.get("/v1/users/me/metrics/tips", async (c) => {
  // TODO: Implement get my tip metrics logic
  return c.json({ metrics: { totalTips: 0 } }, 200);
});

api.get("/v1/users/:id/metrics/tips", async (c) => {
  const userId = c.req.param("id");
  // TODO: Implement get user tip metrics logic
  return c.json({ metrics: { totalTips: 0 } }, 200);
});

// Tickets Routes
api.post("/v1/tickets", async (c) => {
  // TODO: Implement create ticket logic
  return c.json({ message: "Ticket created" }, 201);
});

api.get("/v1/tickets", async (c) => {
  // TODO: Implement get tickets logic
  return c.json({ tickets: [] }, 200);
});

api.patch("/v1/tickets/:id/in-progress", async (c) => {
  const ticketId = c.req.param("id");
  // TODO: Implement update ticket to in-progress logic
  return c.json({ message: `Ticket ${ticketId} marked as in-progress` }, 200);
});

api.patch("/v1/tickets/:id/completed", async (c) => {
  const ticketId = c.req.param("id");
  // TODO: Implement update ticket to completed logic
  return c.json({ message: `Ticket ${ticketId} marked as completed` }, 200);
});

api.delete("/v1/tickets/:id", async (c) => {
  const ticketId = c.req.param("id");
  // TODO: Implement delete ticket logic
  return c.json({ message: `Ticket ${ticketId} deleted` }, 200);
});

// Users Routes
api.get("/v1/users/me", async (c) => {
  // TODO: Implement get my profile logic
  return c.json({ user: {} }, 200);
});

api.patch("/v1/users/me", async (c) => {
  // TODO: Implement update my profile logic
  return c.json({ message: "Profile updated" }, 200);
});

api.patch("/v1/users/me/avatar", async (c) => {
  // TODO: Implement update my avatar logic
  return c.json({ message: "Avatar updated" }, 200);
});

api.delete("/v1/users/me/avatar", async (c) => {
  // TODO: Implement delete my avatar logic
  return c.json({ message: "Avatar deleted" }, 200);
});

api.patch("/v1/users/:id", async (c) => {
  const userId = c.req.param("id");
  // TODO: Implement update user profile logic (admin)
  return c.json({ message: `User ${userId} updated` }, 200);
});

api.get("/v1/users/:id", async (c) => {
  const userId = c.req.param("id");
  // TODO: Implement get user profile logic
  return c.json({ user: { id: userId } }, 200);
});

api.delete("/v1/users/:id", async (c) => {
  const userId = c.req.param("id");
  // TODO: Implement delete user logic (admin)
  return c.json({ message: `User ${userId} deleted` }, 200);
});

// Goals Routes
api.patch("/v1/users/me/goal", async (c) => {
  // TODO: Implement update my goal logic
  return c.json({ message: "Goal updated" }, 200);
});

api.delete("/v1/users/me/goal", async (c) => {
  // TODO: Implement delete my goal logic
  return c.json({ message: "Goal deleted" }, 200);
});

api.patch("/v1/users/:id/goal", async (c) => {
  const userId = c.req.param("id");
  // TODO: Implement update user goal logic (admin)
  return c.json({ message: `Goal for user ${userId} updated` }, 200);
});

api.delete("/v1/users/:id/goal", async (c) => {
  const userId = c.req.param("id");
  // TODO: Implement delete user goal logic (admin)
  return c.json({ message: `Goal for user ${userId} deleted` }, 200);
});

// Admin Routes (isolated for future dashboard sync)
const admin = new Hono();

admin.patch("/v1/users/:id/goal", async (c) => {
  const userId = c.req.param("id");
  // TODO: Implement admin update user goal logic
  return c.json({ message: `Admin: Goal for user ${userId} updated` }, 200);
});

admin.delete("/v1/users/:id/goal", async (c) => {
  const userId = c.req.param("id");
  // TODO: Implement admin delete user goal logic
  return c.json({ message: `Admin: Goal for user ${userId} deleted` }, 200);
});

admin.patch("/v1/users/:id", async (c) => {
  const userId = c.req.param("id");
  // TODO: Implement admin update user logic
  return c.json({ message: `Admin: User ${userId} updated` }, 200);
});

admin.delete("/v1/users/:id", async (c) => {
  const userId = c.req.param("id");
  // TODO: Implement admin delete user logic
  return c.json({ message: `Admin: User ${userId} deleted` }, 200);
});

admin.delete("/v1/users/:id/avatar", async (c) => {
  const userId = c.req.param("id");
  // TODO: Implement admin delete user avatar logic
  return c.json({ message: `Admin: Avatar for user ${userId} deleted` }, 200);
});

admin.get("/v1/tips/all", async (c) => {
  // TODO: Implement admin get all tips logic
  return c.json({ tips: [] }, 200);
});

admin.delete("/v1/tips/all", async (c) => {
  // TODO: Implement admin delete all tips logic
  return c.json({ message: "Admin: All tips deleted" }, 200);
});

admin.get("/v1/transactions", async (c) => {
  // TODO: Implement admin get all transactions logic
  return c.json({ transactions: [] }, 200);
});

admin.get("/v1/users/:id/transactions", async (c) => {
  const userId = c.req.param("id");
  // TODO: Implement admin get user transactions logic
  return c.json({ transactions: [] }, 200);
});

admin.get("/v1/users/:id/balance", async (c) => {
  const userId = c.req.param("id");
  // TODO: Implement admin get user balance logic
  return c.json({ balance: 0 }, 200);
});

admin.get("/v1/users/:id/metrics/tips", async (c) => {
  const userId = c.req.param("id");
  // TODO: Implement admin get user tip metrics logic
  return c.json({ metrics: { totalTips: 0 } }, 200);
});

admin.get("/v1/tickets", async (c) => {
  // TODO: Implement admin get tickets logic
  return c.json({ tickets: [] }, 200);
});

admin.patch("/v1/tickets/:id/in-progress", async (c) => {
  const ticketId = c.req.param("id");
  // TODO: Implement admin update ticket to in-progress logic
  return c.json({ message: `Admin: Ticket ${ticketId} marked as in-progress` }, 200);
});

admin.patch("/v1/tickets/:id/completed", async (c) => {
  const ticketId = c.req.param("id");
  // TODO: Implement admin update ticket to completed logic
  return c.json({ message: `Admin: Ticket ${ticketId} marked as completed` }, 200);
});

admin.delete("/v1/tickets/:id", async (c) => {
  const ticketId = c.req.param("id");
  // TODO: Implement admin delete ticket logic
  return c.json({ message: `Admin: Ticket ${ticketId} deleted` }, 200);
});

// Mount API routes
app.route("/api", api);

// Mount Admin routes separately for isolation
app.route("/api/admin", admin);

// Simple health check endpoint
app.get("/", (c) => {
  return c.json({ status: "ok", message: "API is running" });
});

export default app;