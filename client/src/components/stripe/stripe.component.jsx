import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price,onToken}) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51GO0svDjB3WE5E8BM3j7QjvRcZ5bxnsD9A1oM1GmDofJudfw4qpPlLqi847c7Nuz9GOvkQWRJCwHWrMT3t6nneky00rBDeMFQN';
  return (
    <StripeCheckout
      label='Book Now'
      name='Skylux Travel'
      billingAddress
      shippingAddress
      image='https://secure.skyluxtravel.com/build/assets/img/logo.png'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};


export default StripeCheckoutButton;