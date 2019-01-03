function componentToHex(c: number): string {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(r: number, g: number, b: number) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const numReg = /\d+/g;
export function rgbStrToHex(rgb?: string): string {
  if (!rgb){
    return rgbToHex(0,0,0);
  }
  const matches = rgb.match(numReg);
  if (matches) {
    return rgbToHex(
      parseInt(matches[0]),
      parseInt(matches[1]),
      parseInt(matches[2])
    )
  } else {
    return "";
  }

}