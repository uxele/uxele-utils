import { IPage, Rect, IPoint } from "uxele-core/build";
const gridMargin = 20;
const itemPerRow = 4;

/**
 * scan all pages and prepare the layout. The layout is like below:
 * [pagesA]
 * -------
 * [pagesB]
 * 
 * pagesA group contains pages that come with offsetx and offsety attributes (e.g. adobe psd artboards)
 * pagesB group are pages without original offset (e.g. a static image  / pdf file etc)
 * 1. pages that has offsetx and offsety will be rendered in pagesA
 * 2. other pages with not offset will be rendered in pagesB in a 4*n grid system
 * 3. each page will render its name and preview
 * 4. name is above each page.
 */
export function pagesToLayout(pages: IPage[]): IPageOnCanvas[] {
  let rectA: Rect | undefined;
  const dynamicRects: Rect[] = [];
  const rtn: IPageOnCanvas[] = [];
  const pagesA: IPage[] = [];
  const pagesB: IPage[] = [];
  pages.forEach((page) => {
    if (page.offsetX !== undefined && page.offsetY !== undefined) {
      pagesA.push(page);
    } else {
      pagesB.push(page);
    }
  });
  pagesA.forEach((page) => {
    let rect = new Rect(page.offsetX!, page.offsetY!, page.offsetX! + page.width, page.offsetY! + page.height);
    if (rectA) {
      rectA = rectA.combine(rect);
    } else {
      rectA = rect;
    }
    rtn.push({
      page,
      rect
    })
  });
  if (rectA) {
    if (rectA.left !== 0 || rectA.top !== 0) {
      for (const item of rtn) {
        item.rect = item.rect.pan(-rectA.left, -rectA.top);
      }
      rectA = rectA.pan(-rectA.left, -rectA.top);
    }
  }
  pagesB.forEach((page) => {
    const nextOffset = nextGridSlot(dynamicRects);
    if (rectA) {
      nextOffset.y += rectA.height + gridMargin;
    }
    let rect = new Rect(nextOffset.x, nextOffset.y, page.width, page.height);
    dynamicRects.push(rect);
    rtn.push({
      page,
      rect
    })
  });
  return rtn;
}
export function nextGridSlot(grid: Rect[]): IPoint {
  const rowNum = Math.floor(grid.length / itemPerRow);
  const colNum = grid.length % itemPerRow;
  const x = grid.slice(rowNum * itemPerRow).reduce<number>((lastLeft, item: Rect) => lastLeft + item.width + gridMargin, 0);
  let y = 0;
  if (colNum > 0) {
    y = grid[rowNum * itemPerRow + colNum - 1].top;
  } else {
    for (let i = 0; i < rowNum; i++) {
      for (let j = 0; j < itemPerRow; j++) {
        const item = grid[i * itemPerRow + j]
        y = Math.max(y, item.top + item.height)
      }
      y += gridMargin;
    }
  }
  return { x, y };

}
export interface IPageOnCanvas {
  page: IPage;
  rect: Rect;
}
/**
 * immutable
 * calc scaled page layouts
 * @param pageLayouts the original page layout that are not scaled. (zoom =1)
 */
export function scalePageLayouts(pageLayouts: IPageOnCanvas[], scale: number): IPageOnCanvas[] {
  if (scale === 1) {
    return pageLayouts;
  }
  return pageLayouts.map((pageLayout) => {
    return {
      page: pageLayout.page,
      rect: pageLayout.rect.zoom(scale)
    }
  });
}