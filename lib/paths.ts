export function loc(locale: string, path: string) {
  if (!path.startsWith("/")) return path;
  return `/${locale}${path === "/" ? "" : path}`;
}
