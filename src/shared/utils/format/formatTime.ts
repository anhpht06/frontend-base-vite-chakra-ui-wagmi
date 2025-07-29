export function formatTimeAgo(blockTime: string): string {
  if (!blockTime) return "";
  const timestampDate = new Date(blockTime);
  const currentDate = new Date();

  const timeDiff = currentDate.getTime() - timestampDate.getTime();

  const secondsDiff = Math.floor(timeDiff / 1000);
  const minutesDiff = Math.floor(secondsDiff / 60);
  const hoursDiff = Math.floor(minutesDiff / 60);
  const daysDiff = Math.floor(hoursDiff / 24);

  let timeAgo;

  if (daysDiff > 0) {
    timeAgo = `${daysDiff} days ago`;
  } else if (hoursDiff > 0) {
    timeAgo = `${hoursDiff} hours ago`;
  } else if (minutesDiff > 0) {
    timeAgo = `${minutesDiff} minutes ago`;
  } else {
    timeAgo = `${secondsDiff} seconds ago`;
  }

  return timeAgo;
}