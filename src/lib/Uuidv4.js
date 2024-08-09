import { v4 as uuidv4 } from"uuid";

function generateUuid() {
  const uuid = uuidv4();
  // const uuid = uuidv4().replace(/-/g, "");

  const uuid34Bit = parseInt(uuid.substring(0, 18), 16);
  return uuid34Bit.toString(32);
  // return uuid;
}

export default generateUuid;
