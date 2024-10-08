import React, { useEffect, useState } from "react";

const TimeAndDate = ({ time }) => {
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    setCurrentTime(time);
  }, [time]);
  // Check if time is a valid date string or a valid timestamp
  const isValidTime = currentTime && !isNaN(new Date(currentTime).getTime());

  if (!isValidTime) {
    return <span>Error: Invalid tTime value</span>;
  }

  const prevTime = new Date(currentTime).getTime();
  const currentTimeStamp = new Date().getTime();
  const expire_time = prevTime < currentTimeStamp;

  const createdAtString = String(currentTime);
  const createdAtDate = new Date(createdAtString);

  // Format the date
  const formattedDate = new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    // hour: "numeric",
    // minute: "numeric",
    // second: "numeric",
    // hour12: true,
    timeZone: "Asia/Kolkata",
  }).format(createdAtDate);

  return (
    <span style={{ color: expire_time ? "red" : "green" }}>
      {expire_time?'Offer Expire':formattedDate}
    </span>
  );
};

export default TimeAndDate;
