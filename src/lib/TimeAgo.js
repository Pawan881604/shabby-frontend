import React from "react";

export const TimeAgo = ({ time }) => {
  // Convert the provided `time` to a Date object
  const date =time;
console.log(time)
  // Check if the provided date is valid
  if (isNaN(date.getTime())) {
    return <span>Invalid date</span>; // Fallback in case of invalid date
  }

  const now = new Date();
  const color = now.getTime() < date.getTime() ? "red" : "green"; // Compare timestamps

  const getTimeDifference = (timestamp) => {
    const date = new Date(timestamp);
    const timeDifference = now - date;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) {
      return `${seconds} seconds ago`;
    } else if (hours < 1) {
      return `${minutes} minutes ago`;
    } else if (days < 1) {
      return `${hours} hours ago`;
    } else if (days === 1) {
      return "Yesterday";
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      const options = { month: "short", day: "numeric" };
      return date.toLocaleDateString(undefined, options);
    }
  };

  return <span style={{ color }}>{getTimeDifference(time)}</span>;
};
