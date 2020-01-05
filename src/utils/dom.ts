const BASE_FONT_SIZE = 37.5;

export function getDocFontSize() {
  const computedStyle = document.defaultView.getComputedStyle(
    document.documentElement
  );

  return parseFloat(computedStyle.fontSize);
}

export function getRealSize(height: number) {
  const realHeight = (getDocFontSize() / BASE_FONT_SIZE) * height;

  return parseFloat(`${realHeight}`);
}
