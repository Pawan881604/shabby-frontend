import React from "react";

export const TimeAgo = ({ time }) => {
  // Attempt to convert the provided `time` to a Date object
  const date = new Date(time);

  // Check if the date is valid
  if (Object.prototype.toString.call(date) !== "[object Date]" || isNaN(date.getTime())) {
    return <span>Invalid date</span>; // Fallback in case of invalid date
  }

  const now = new Date();
  const color = now.getTime() < date.getTime() ? "red" : "green"; // Compare timestamps

  const getTimeDifference = (date) => {
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

  return <span style={{ color }}>{getTimeDifference(date)}</span>;
};
