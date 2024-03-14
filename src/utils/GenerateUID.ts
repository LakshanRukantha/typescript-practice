import { v4 as uuidv4 } from "uuid";

type UniqueIDType = string;

export const GenerateUID = (title: string) => {
  let uniqueId = uuidv4().slice(0, 8);
  let dashedTitle = title.toLowerCase().replace(/\s/g, "-");
  return `${dashedTitle}-${uniqueId}` as UniqueIDType;
};
