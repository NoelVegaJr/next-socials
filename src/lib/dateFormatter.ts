export const dateFormatter = (from: number): string => {
  const seconds = Math.round((new Date().getTime() - from) / 1000);

  if (seconds < 60) {
    return seconds + " seconds ago";
  }

  if (seconds < 3600) {
    return Math.round(seconds / 60) + " minutes ago";
  }

  if (seconds < 86400) {
    return Math.round(seconds / 3600) + " hours ago";
  }

  return new Date(from).toString();
};
