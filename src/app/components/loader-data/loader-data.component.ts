import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-loader-data',
  templateUrl: './loader-data.component.html',
  styleUrls: ['./loader-data.component.scss'],
})
export class LoaderDataComponent implements OnInit {
  @Input() loading: boolean;
  @Input() funcForLoading: () => void | null = null;

  constructor() {}

  ngOnInit(): void {
    if (this.funcForLoading) {
      this.funcForLoading();
    }
  }
}
