export function initializeStylesheet(css: string) {
  const stylesheet = new CSSStyleSheet()
  stylesheet.replaceSync(css)

  return stylesheet
}
