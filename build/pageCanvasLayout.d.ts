import { IPage, Rect, IPoint } from "uxele-core/build";
/**
 * scan all pages and prepare the layout:
 * 1. pages that has offsetx and offsety will be rendered in group 1
 * 2. other pages with not offset will be rendered in group 2 in a 4*n grid system
 * 3. each page will render its name and preview
 */
export declare function pagesToLayout(pages: IPage[]): IPageOnCanvas[];
export declare function nextGridSlot(grid: Rect[]): IPoint;
export interface IPageOnCanvas {
    page: IPage;
    rect: Rect;
}
