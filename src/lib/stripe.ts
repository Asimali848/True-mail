import { loadStripe } from "@stripe/stripe-js";

const stripePromise = async () => {
  const stripeClient = await loadStripe(
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  );
  return stripeClient;
};

export const checkout = async () => {
  const stripeInstance = await stripePromise();

  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/pay`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: [{ id: "xl-tshirt", amount: 1000 }] }),
  });

  const paySession: StripePaySession = await response.json();

  stripeInstance?.redirectToCheckout({
    sessionId: paySession.id,
  });
};
