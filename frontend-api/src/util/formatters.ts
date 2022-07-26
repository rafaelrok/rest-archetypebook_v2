export const formatPrice = (price: number) => {
  const params = { maximumFractionDigits: 2, minimumFractionDigits: 2 };
  return new Intl.NumberFormat('pt-BR', params).format(price);
};

export const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
};
