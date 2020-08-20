import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { WindowRefService } from '../../@core/window-ref.service';

@Component({
  selector: 'bo-block-loader',
  templateUrl: './block-loader.component.html',
  styleUrls: ['./block-loader.component.scss']
})
export class BlockLoaderComponent implements OnInit, OnDestroy {
  defaultParentPosition: string;

  constructor(private elRef: ElementRef, private windowRefSrv: WindowRefService) {}

  ngOnInit() {
    this.defaultParentPosition = this.windowRefSrv.nativeWindow.getComputedStyle(
      this.elRef.nativeElement.parentElement
    ).position;
    this.elRef.nativeElement.parentElement.style.position =
      this.defaultParentPosition === 'absolute' ? 'absolute' : 'relative';
    this.checkIfParentHasBorders();
  }

  private checkIfParentHasBorders(): void {
    const borderWidth = parseFloat(
      this.windowRefSrv.nativeWindow.getComputedStyle(this.elRef.nativeElement.parentElement).borderWidth
    );
    if (!borderWidth) {
      return;
    }
    this.elRef.nativeElement.style.left = `${-1 * borderWidth}px`;
    this.elRef.nativeElement.style.top = `${-1 * borderWidth}px`;
    this.elRef.nativeElement.style.width = `calc(100% + ${2 * borderWidth}px`;
    this.elRef.nativeElement.style.height = `calc(100% + ${2 * borderWidth}px`;
  }

  ngOnDestroy() {
    this.elRef.nativeElement.parentElement.style.position = this.defaultParentPosition;
  }
}
