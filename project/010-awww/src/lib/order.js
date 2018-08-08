export function generator_oid(product_id) {
  product_id = product_id || '';
  return (new Date).getTime() + product_id + Math.round(Math.random() * 10);
}