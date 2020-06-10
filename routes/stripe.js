const stripe = require('stripe')('sk_test_vWQ993FKQmeDK8l1kb8XTqGF00M9of6mNJ');
stripe.charges.retrieve('ch_1Gs0fGDjB3WE5E8BTfpsEdnL', {
    api_key: 'sk_test_vWQ993FKQmeDK8l1kb8XTqGF00M9of6mNJ'
  });