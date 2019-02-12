import {getUsername} from "./logged";

export const isAlreadyParticipate = (list) => {
  return list.includes(getUsername())
};
