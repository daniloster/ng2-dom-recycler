import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

function getDynamicDomRecycler(selector: string, selectorItem: string) {
    @Component({
        selector: selector,
        styles: [`
            .dom-recycler-container {
                position: relative;
                max-height:100%;
                height:100%;
                box-sizing: border-box;
                overflow-y: scroll;
                margin: 0;
                padding: 0;
            }
            .dom-recycler-content {
                position: relative;
                box-sizing: border-box;
                overflow-y: auto;
                margin: 0;
            }
            .content-item {
                position: relative;
                overflow: auto;
            }
            .fake-bound {
                min-width: 100%;
                width: 100%;
                display: block;
                position: relative;
            }
        `],
        template: `
            <div
                (scroll)="onScroll($event)"
                class="dom-recycler-container"
            >
                <div
                    class="dom-recycler-content"
                    [ngStyle]="getStyle()"
                >
                    
                    <div *ngFor="let item of viewportItems" class="content-item">
                        <${selectorItem} [item]="item"></${selectorItem}>
                    </div>
                    
                </div>
            </div>
        `
    })
    class DomRecycler implements OnInit {
        @Input() items: Array<any>
        @Input() itemHeight: number
        @Input() totalBufferMargin: number
        @Input() viewportItems: Array<any>
        @Input() start: number
        @Input() end: number
        @Input() topPadding: number
        @Input() bottomPadding: number

        constructor() {}

        ngOnInit() {
            this.update({
                offsetHeight: window.screen.height,
                scrollTop: 0
            });
        }

        update(container: any) {
            const {
                start,
                end
            } = this.getBoxBuffer(
                this.items,
                container,
                this.itemHeight,
                this.totalBufferMargin);
            const isWindow = container.tagName === undefined;
            const isOutOfScope = (container.scrollTop > this.items.length * this.itemHeight);
            if (isWindow || !isOutOfScope && ((start !== undefined && start !== this.start) || end !== this.end)) {
                this.start = start || 0;
                this.end = end;
                this.viewportItems = this.items.slice(start, end);
                this.topPadding = this.start * this.itemHeight;
                this.bottomPadding = (this.items.length - this.end) * this.itemHeight;
                return true;
            }
            return false;
        }

        onScroll(e) {
            e.preventDefault();
            this.update(e.target);
        }

        getStyle() {
            return {
                'padding-top': this.topPadding + 'px',
                'padding-bottom': this.bottomPadding + 'px'
            };
        }

        /**
         * Calculates the start and end of the items that should be displayed according to
         * parameters provided.
         * @param item {array} list of the items that must be rendered
         * @param container {element} (Or object that contains offsetHeight and scrollTop)
         * represents the container element
         * @param itemHeight {number} is the size in pixels of the item element
         * @param totalBufferMargin {number} is the total buffer for the edges (top and bottom)
         */
        getBoxBuffer(items: Array<any>, container: any, itemHeight: number, totalBufferMargin: number) {
            const totalItems : number = items.length;
            const containerHeight : number = Number(container.offsetHeight);
            const totalElementInViewport : number = containerHeight / itemHeight;
            const scrollTop : number = container.scrollTop;
            const offTopView : number = Math.floor(scrollTop / itemHeight);
            let start : number = 0;
            let end : number = 0;
            let totalSlicesElements = Math.ceil(totalElementInViewport + totalBufferMargin);
            if (offTopView > totalBufferMargin) {
                start = offTopView - totalBufferMargin;
            }
            const diffOffBottomView = totalItems - start - totalSlicesElements;
            if (diffOffBottomView > 0) {
                totalSlicesElements += (diffOffBottomView > totalBufferMargin)
                    ? totalBufferMargin
                    : diffOffBottomView;
                end = start + totalSlicesElements;
            /* Fixing glitch on scrolling event for angular2 */
            } else if (start >= 0) {
                end = totalItems;
            } else {
                start = undefined;
                end = totalItems;
            }
            return {
                start,
                end
            };
        }
    }

    return DomRecycler;
}

export {getDynamicDomRecycler};

export default getDynamicDomRecycler;
