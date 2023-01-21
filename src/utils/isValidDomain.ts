export const isValidDomain = (domain: string) => {
  const domainFormat = /\b((?=[a-z0-9-]{1,63}\.)(xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}\b/;

  const regex = new RegExp(`${domainFormat.source}$`);

  return regex.test(domain);
};
