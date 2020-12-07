function simpleDeepCopy(original) {
  return JSON.parse(JSON.stringify(original));
}

export { simpleDeepCopy };
