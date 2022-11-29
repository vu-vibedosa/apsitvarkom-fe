// eslint-disable-next-line no-undef
module.exports = {
  locales: ["en", "lt"],
  output: "src/locale/$LOCALE.json",

  // The locale to compare with default values to determine whether a default value has been changed.
  // If this is set and a default value differs from a translation in the specified locale, all entries
  // for that key across locales are reset to the default value, and existing translations are moved to
  // the `_old` file.
  resetDefaultValueLocale: "en",

  lexers: {
    ts: ["JsxLexer"],
    tsx: ["JsxLexer"],
  },
};
