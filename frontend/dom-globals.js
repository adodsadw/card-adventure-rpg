// v1.8.5 hotfix: expose every element id on window before game.js runs.
// The legacy game script references many DOM nodes as bare identifiers
// (for example: goldValue, stageList, summonOne). Some browsers/WebViews
// do not reliably create those implicit globals, which stops game.js at startup.
(() => {
  document.querySelectorAll('[id]').forEach((element) => {
    const id = element.id;
    if (!id) return;
    try {
      if (!(id in window) || window[id] == null) {
        Object.defineProperty(window, id, {
          configurable: true,
          enumerable: false,
          writable: true,
          value: element
        });
      }
    } catch {
      window[id] = element;
    }
  });
})();
