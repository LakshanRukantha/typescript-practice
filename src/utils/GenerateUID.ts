type UniqueIDType = string;

export const GenerateUID = (title: string) => {
  const timestamp = new Date().getTime();
  return `${title
    .toLowerCase()
    .replace(/\s/g, "-")}-${timestamp}` as UniqueIDType;
};
