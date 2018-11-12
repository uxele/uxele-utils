export function centerSvgStringViewBox(svg: string) {
  const div = document.createElement("div");
  div.innerHTML = svg;
  const svgEle = div.firstChild as any;
  document.body.appendChild(div);
  const viewBox = svgEle.viewBox.baseVal;
  let started = false;
  const children = svgEle.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const bbox = child.getBBox();
    if (bbox.width === 0 || bbox.height === 0) {
      continue;
    }
    if (started) {
      if (viewBox.x > bbox.x) {
        viewBox.x = bbox.x;
      }
      if (viewBox.y > bbox.y) {
        viewBox.y = bbox.y;
      }
      if (viewBox.width < bbox.width + bbox.x - viewBox.x) {
        viewBox.width = bbox.width + bbox.x - viewBox.x;
      }
      if (viewBox.height < bbox.height + bbox.y - viewBox.y) {
        viewBox.height = bbox.height + bbox.y - viewBox.y;
      }
    } else {
      started = true;
      viewBox.x = bbox.x;
      viewBox.y = bbox.y;
      viewBox.width = bbox.width;
      viewBox.height = bbox.height;

    }
  }
  const rtn=div.innerHTML;
  document.body.removeChild(div);
  return rtn;
}