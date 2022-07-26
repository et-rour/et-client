export default function isPWA() {
  return window && window.matchMedia("(display-mode: standalone)").matches;
}
