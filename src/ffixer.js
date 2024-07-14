/**
 * laravel-translations-i18next-ffixer
 * ===================================
 *
 * When using vite-plugin-laravel-translations, translations become available
 * as a global variable named LARAVEL_TRANSLATIONS. This global variable is a
 * nested object that contains a copy of the content in the "lang/" directory.
 *
 * Loading the translations as a resource in i18next works with just one issue:
 * Laravel translation strings prefix a placeholder with a colon ( : ) instead
 * of enclosing it between double curly brackets ( {{ }} ).
 *
 * The i18next package provides a way to configure the prefix and suffix to be
 * used in the placeholders, but there is no (documented) way to support the
 * format provided by Laravel for translation strings.
 *
 * This small function takes all the translation strings and performs a regular
 * expression to replace colon-prefixed placeholders by double curly bracketed
 * ones.
 *
 * If a value is found to be an object, the function looks into it recursively
 * to perform a nested search/replace instead of the regular expression, that
 * only applies to strings.
 *
 * The result of this function can be consumed by i18next.
 *
 * A second parameter was added to enable/disable debug: Performing a regular
 * expression operation as many times as there are translation strings impacts
 * the application's loading time, and printing the start/stop time is just a
 * basic way to measure such impact.
 */

const ffixer = (translations, debug = false) => {
  if (debug) console.warn('ffixer started at ' + Date.now().toString());
  if (typeof translations === 'object' && translations !== null) {
    for (let key in translations) {
      if (typeof translations[key] === 'object') {
        ffixer(translations[key]);
      } else if (typeof translations[key] === 'string') {
        translations[key] = translations[key].replace(
          /:(\w+)/g,
          (match, p1) => `{{ ${p1} }}`
        );
      }
    }
    if (debug) console.warn('ffixer finished ' + Date.now().toString());
    return translations;
  }
};

export default ffixer;
