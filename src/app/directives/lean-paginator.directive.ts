import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[leanPaginator]',
  standalone: true,
})
export class LeanPaginationDirective implements AfterViewInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const nativeElement = this.elementRef.nativeElement;

    const firstButton = nativeElement.querySelector(
      'button.mat-mdc-paginator-navigation-first'
    );
    const lastButton = nativeElement.querySelector(
      'button.mat-mdc-paginator-navigation-last'
    );
    const nextButton = nativeElement.querySelector(
      'button.mat-mdc-paginator-navigation-next'
    );
    const previousButton = nativeElement.querySelector(
      'button.mat-mdc-paginator-navigation-previous'
    );
    const container = nativeElement.querySelector(
      'div.mat-mdc-paginator-range-actions'
    );

    const constMatPaginatorContainer = nativeElement.querySelector(
      'div.mat-mdc-paginator-container'
    );
    const pageSize = nativeElement.querySelector(
      'div.mat-mdc-paginator-page-size'
    );

    this.renderer.appendChild(container, previousButton);
    this.renderer.appendChild(container, firstButton);
    this.renderer.appendChild(container, lastButton);
    this.renderer.appendChild(container, nextButton);

    this.renderer.setStyle(firstButton, 'visibility', 'hidden');
    this.renderer.setStyle(lastButton, 'visibility', 'hidden');
    this.renderer.setStyle(pageSize, 'visibility', 'hidden');
    this.renderer.setStyle(constMatPaginatorContainer, 'padding', '0');
  }
}
