import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Host,
  Input,
  OnChanges,
  Optional,
  Output,
  Renderer2,
  Self,
  SimpleChanges,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { map, startWith } from 'rxjs';

/**
 * Directive for changing mat-paginator default style.
 */
@Directive({
  selector: '[appCustomPagination]',
  standalone: true,
})
export class CustomPaginationDirective implements AfterViewInit, OnChanges {
  /**
   * Custom emitter for parent component.
   */
  @Output() pageIndexChangeEmitter: EventEmitter<number> =
    new EventEmitter<number>();

  /**
   * Whether we want to display first/last button and dots.
   */
  @Input() showFirstButton = true;
  @Input() showLastButton = true;

  /**
   * How many buttons to display before and after
   * the selected button.
   */
  @Input() renderButtonsNumber = 2;

  /**
   * How many elements are in the table.
   */
  @Input() appCustomLength: number = 0;

  private dotsEndRef!: HTMLElement;
  private dotsStartRef!: HTMLElement;
  private bubbleContainerRef!: HTMLElement;

  private buttonsRef: HTMLElement[] = [];

  constructor(
    @Host() @Self() @Optional() private readonly matPag: MatPaginator,
    private elementRef: ElementRef,
    private ren: Renderer2
  ) {}

  ngAfterViewInit(): void {
    this.styleDefaultPagination();
    this.createBubbleDivRef();
    this.renderButtons();
    this.changeRangeLabelFormat();
  }

  /**
   * Change RabgeLabel template to 'x - y out of z'.
   */
  changeRangeLabelFormat() {
    this.matPag._intl.itemsPerPageLabel = 'Items per page';
    this.matPag._intl.getRangeLabel = (
      page: number,
      pageSize: number,
      length: number
    ) => {
      const start = page * pageSize + 1;
      const end = (page + 1) * pageSize;
      return `${start} - ${end} out of ${length}`;
    };
  }

  /**
   * React on parent component changing the appCustomLength - rerender bubbles.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes?.['appCustomLength']?.firstChange) {
      this.removeButtons();
      this.switchPage(0);
      this.renderButtons();
    }
  }

  /**
   * Render buttons and subscribe to paginator's (page) event.
   */
  private renderButtons(): void {
    this.buildButtons();

    this.matPag.page
      .pipe(
        map((e) => {
          return [e.previousPageIndex ?? 0, e.pageIndex];
        }),
        startWith([0, 0])
      )
      .subscribe(([prev, curr]) => {
        this.changeActiveButtonStyles(prev, curr);
      });
  }

  /**
   * Change the active button style to the current one and display/hide additional buttons
   * based on the navigated index.
   */
  private changeActiveButtonStyles(previousIndex: number, newIndex: number) {
    const previouslyActive = this.buttonsRef[previousIndex];
    const currentActive = this.buttonsRef[newIndex];

    if (previouslyActive === undefined || currentActive === undefined) {
      return;
    }

    this.ren.removeClass(previouslyActive, 'g-bubble__active');
    this.ren.addClass(currentActive, 'g-bubble__active');

    this.buttonsRef.forEach((button) =>
      this.ren.setStyle(button, 'display', 'none')
    );

    const renderElements = this.renderButtonsNumber;
    const endDots = newIndex < this.buttonsRef.length - renderElements - 1;
    const startDots = newIndex - renderElements > 0;

    const firstButton = this.buttonsRef[0];
    const lastButton = this.buttonsRef[this.buttonsRef.length - 1];

    if (this.showLastButton) {
      this.ren.setStyle(this.dotsEndRef, 'display', endDots ? 'block' : 'none');
      this.ren.setStyle(lastButton, 'display', endDots ? 'flex' : 'none');
    }

    if (this.showFirstButton) {
      this.ren.setStyle(
        this.dotsStartRef,
        'display',
        startDots ? 'block' : 'none'
      );
      this.ren.setStyle(firstButton, 'display', startDots ? 'flex' : 'none');
    }

    const startingIndex = startDots ? newIndex - renderElements : 0;

    const endingIndex = endDots
      ? newIndex + renderElements
      : this.buttonsRef.length - 1;

    for (let i = startingIndex; i <= endingIndex; i++) {
      const button = this.buttonsRef[i];
      this.ren.setStyle(button, 'display', 'flex');
    }
  }

  /**
   * Removes or change styling of some html elements.
   */
  private styleDefaultPagination() {
    const nativeElement = this.elementRef.nativeElement;

    const paginatorOuterContainer = nativeElement.querySelector(
      '.mat-mdc-paginator-outer-container'
    );
    const paginatorContainer = nativeElement.querySelector(
      '.mat-mdc-paginator-container'
    );
    const rangeActions = paginatorContainer.querySelector(
      '.mat-mdc-paginator-range-actions'
    );
    const pageSize = paginatorContainer.querySelector(
      '.mat-mdc-paginator-page-size'
    );
    const rangeLabel = rangeActions.querySelector(
      '.mat-mdc-paginator-range-label'
    );
    const firstButton = nativeElement.querySelector(
      'button.mat-mdc-paginator-navigation-first'
    );
    const lastButton = nativeElement.querySelector(
      'button.mat-mdc-paginator-navigation-last'
    );

    paginatorOuterContainer.append(rangeLabel);

    const customContainer = this.ren.createElement('div') as HTMLElement;
    this.ren.setStyle(customContainer, 'display', 'flex');
    this.ren.setStyle(customContainer, 'align-items', 'center');

    customContainer.append(pageSize);
    customContainer.append(rangeLabel);

    this.ren.insertBefore(paginatorContainer, customContainer, rangeActions);
    this.ren.setStyle(paginatorContainer, 'justify-content', 'space-between');

    const firstSvgIcon = lastButton.querySelector('svg');
    firstSvgIcon.innerHTML = `
                          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                          <path d="M15 6L13.59 7.41 18.17 12l-4.58 4.59L15 18l6-6z"></path>
                        `;

    const lastSvgIcon = firstButton.querySelector('svg');
    lastSvgIcon.innerHTML = `
                          <path d="M14 6L15.41 7.41 10.83 12l4.58 4.59L14 18l-6-6z"></path>
                          <path d="M9 6L10.41 7.41 5.83 12l4.58 4.59L9 18l-6-6z"></path>
                        `;
  }

  /**
   * Creates `bubbleContainerRef` where all buttons will be rendered.
   */
  private createBubbleDivRef(): void {
    const actionContainer = this.elementRef.nativeElement.querySelector(
      'div.mat-mdc-paginator-range-actions'
    );
    const nextButtonDefault = this.elementRef.nativeElement.querySelector(
      'button.mat-mdc-paginator-navigation-next'
    );

    this.bubbleContainerRef = this.ren.createElement('div') as HTMLElement;
    this.ren.addClass(this.bubbleContainerRef, 'g-bubble-container');

    this.ren.insertBefore(
      actionContainer,
      this.bubbleContainerRef,
      nextButtonDefault
    );
  }

  /**
   * Helper function that builds all button and add dots
   * between the first button, the rest and the last button.
   *
   * End result: (1) .... (4) (5) (6) ... (25).
   */
  private buildButtons(): void {
    const neededButtons = Math.ceil(
      this.appCustomLength / this.matPag.pageSize
    );

    if (neededButtons === 1) {
      this.ren.setStyle(this.elementRef.nativeElement, 'display', 'none');
      return;
    }

    this.buttonsRef = [this.createButton(0)];

    this.dotsStartRef = this.createDotsElement();

    for (let index = 1; index < neededButtons - 1; index++) {
      this.buttonsRef = [...this.buttonsRef, this.createButton(index)];
    }

    this.dotsEndRef = this.createDotsElement();

    this.buttonsRef = [
      ...this.buttonsRef,
      this.createButton(neededButtons - 1),
    ];
  }

  /**
   * Remove all buttons from DOM.
   */
  private removeButtons(): void {
    this.buttonsRef.forEach((button) => {
      this.ren.removeChild(this.bubbleContainerRef, button);
    });

    this.buttonsRef.length = 0;
  }

  /**
   * Create button HTML element.
   */
  private createButton(i: number): HTMLElement {
    const bubbleButton = this.ren.createElement('div');
    const text = this.ren.createText(String(i + 1));

    this.ren.addClass(bubbleButton, 'g-bubble');
    this.ren.setStyle(bubbleButton, 'margin-right', '8px');
    this.ren.appendChild(bubbleButton, text);

    this.ren.listen(bubbleButton, 'click', () => {
      this.switchPage(i);
    });

    this.ren.appendChild(this.bubbleContainerRef, bubbleButton);

    this.ren.setStyle(bubbleButton, 'display', 'none');

    return bubbleButton;
  }

  /**
   * Helper function to create dots (....) on DOM indicating that there are
   * many more bubbles until the last one.
   */
  private createDotsElement(): HTMLElement {
    const dotsEl = this.ren.createElement('span');
    const dotsText = this.ren.createText('.....');

    this.ren.setStyle(dotsEl, 'font-size', '18px');
    this.ren.setStyle(dotsEl, 'margin-right', '8px');
    this.ren.setStyle(dotsEl, 'padding-top', '6px');
    this.ren.setStyle(dotsEl, 'color', '#919191');

    this.ren.appendChild(dotsEl, dotsText);
    this.ren.appendChild(this.bubbleContainerRef, dotsEl);
    this.ren.setStyle(dotsEl, 'display', 'none');

    return dotsEl;
  }

  /**
   * Helper function to switch page.
   */
  private switchPage(i: number): void {
    const previousPageIndex = this.matPag.pageIndex;
    this.matPag.pageIndex = i;
    this.matPag['_emitPageEvent'](previousPageIndex);

    this.pageIndexChangeEmitter.emit(i);
  }
}
