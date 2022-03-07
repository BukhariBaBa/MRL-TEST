const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function CreateStripeSession(req, res) {
  const { item } = req.body;
  const redirectURL = "http://localhost:3000/payments/payment";

  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: item.price_id, quantity: 1 }],
    mode: "subscription",
    // allow_promotion_codes: true,
    discounts: [{
      coupon:"vig8WI4S"
    }],
    success_url: redirectURL + "?status=success",
    cancel_url: redirectURL + "?status=cancel",
  });
  res.json({ id: session.id });
}

export default CreateStripeSession;
