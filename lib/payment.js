export async function processPayment(paymentData) {
  const response = await fetch('/api/payments/process', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentData)
  });
  return await response.json();
}

export async function createOrder(orderData) {
  const response = await fetch('/api/orders/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  return await response.json();
}