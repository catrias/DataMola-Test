import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { Genre } from '../../models';
import { GENRE_LABEL_COLOR } from './genre-label-color';

@Component({
  selector: 'app-genre-label',
  templateUrl: './genre-label.component.html',
  styleUrls: ['./genre-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenreLabelComponent {
  @Input() public genre: Genre;

  @HostBinding('style.backgroundColor')
  public get color(): string {
    return GENRE_LABEL_COLOR[this.genre];
  }
}
