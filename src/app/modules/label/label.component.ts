import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent {
  @Input()
  @HostBinding('style.backgroundColor')
  public color: string;
}
