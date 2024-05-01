import slugify from "slugify";
import { uuidRegex } from "./regex";

export const generateSlug = (name, id) => {
  const path = slugify(name, {
    lower: true,
    locale: "vi",
  });

  return `${path}-${id}.html`;
};

export const decodeSlug = (path) => {
  const matches = path.match(uuidRegex);

  if (matches) {
    return matches[0];
  } else {
    return null;
  }
};
