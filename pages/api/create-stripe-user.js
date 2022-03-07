const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function CreateStripeUser(req, res) {
  const customer = await stripe.customers.create({
    description: 'My First Test Customer (created for API docs)',
  });
  res.json({ customer });
}

export default CreateStripeUser;