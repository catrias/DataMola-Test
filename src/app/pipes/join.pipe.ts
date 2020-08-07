import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appJoin',
})
export class JoinPipe implements PipeTransform {
  public transform(value: string[], separator: string): any {
    return value.join(separator);
  }
}
