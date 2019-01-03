import { IPage, Rect, IPoint } from "uxele-core/build";
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
export declare function pagesToLayout(pages: IPage[]): IPageOnCanvas[];
export declare function nextGridSlot(grid: Rect[]): IPoint;
export interface IPageOnCanvas {
    page: IPage;
    rect: Rect;
}
/**
 * immutable
 * calc scaled page layouts
 * @param pageLayouts the original page layout that are not scaled. (zoom =1)
 */
export declare function scalePageLayouts(pageLayouts: IPageOnCanvas[], scale: number): IPageOnCanvas[];
