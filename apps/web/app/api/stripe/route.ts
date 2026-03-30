import Stripe from "stripe";

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
  const { priceId } = await request.json();
  const origin = request.headers.get("origin") || "";

  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "subscription",
    success_url: `${origin}/success`,
    cancel_url: `${origin}/cancel`,
  });

  return Response.json({ url: session.url });
}
