import Clipboard = require("clipboard");

export function copyToClipboard(txt: string) {
  const btn = document.createElement("button");
  const c = new Clipboard(btn, {
    text: function () {
      return txt;
    }
  });
  btn.click();
  c.destroy();
}
