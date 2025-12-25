const API_BASE = import.meta.env.VITE_API_URL;

export const resolveMedia = (src) => {
  if (!src) return "";
  return src.startsWith("http")
    ? src
    : `${API_BASE}/uploads/${src}`;
};
