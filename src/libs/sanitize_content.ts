export const sanitizeContent = (content: string) => {
  return content.replace(/<[^>]+>/g, "");
};
