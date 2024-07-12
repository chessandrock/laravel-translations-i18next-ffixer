# Laravel Translations fixer for i18next

I need this package for my own projects, so I won't write much now, but...

I use this package: [vite-plugin-laravel-translations](https://www.npmjs.com/package/vite-plugin-laravel-translations) to maintain my translations in PHP format and export these to the client side, to use with React.js and [react-i18next](https://react.i18next.com/). I couldn't find a way to configure laravel to use "{{" as prefix and "}}" as suffix for the generated translations, nor could I find a way to make ":" a prefix and no suffix on react-i18next, so I decided to build a small piece of code that takes a string in the form of ":word" and converts it to "{{ word }}".

How to use it?

In your **i18n.js** file or configuration, you will have something like this, right?

```
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    detection: {
      order: ['htmlTag', 'navigator']
    },
    interpolation: {
      escapeValue: false,
    },
    resources: window.LARAVEL_TRANSLATIONS
  })

export default i18n
```

Just change the line that says **resources: window.LARAVEL_TRANSLATIONS** to **resources: ffixer(window.LARAVEL_TRANSLATIONS)**, and add the line **import ffixer from 'laravel-translations-i18next-ffixer'**.

## Why the name?

Because it aims to **fix** the issue with the **suffix** parameter in i18next.

## Is there a better way?

I don't know. I'll keep researching and probably ping the guys who maintain the vite-plugin-laravel-translations about this.

## License

MIT. See LICENSE.md
