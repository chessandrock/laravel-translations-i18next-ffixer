const ffixer = (translations) => {
  if (typeof translations === "object" && translations !== null) {
    for (let key in translations) {
      if (typeof translations[key] === "object") {
        ffixer(translations[key]);
      } else if (typeof translations[key] === "string") {
        translations[key] = translations[key].replace(
          /:(\w+)/g,
          (match, p1) => `{{ ${p1} }}`
        );
      }
    }
    return translations;
  }
};

export default ffixer;
