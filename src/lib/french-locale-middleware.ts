/**
 * Middleware to set default language to French for admin panel
 */

export const setFrenchLocaleMiddleware = (req: any, _res: any, next: any) => {
  // Set French as the preferred language
  req.locale = 'fr'
  if (req.language) req.language = 'fr'
  if (req.payload) {
    req.payload.locale = 'fr'
  }
  next()
}
