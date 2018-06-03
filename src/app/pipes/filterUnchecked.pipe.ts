import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUnchecked',
  pure: false
})
export class filterUncheckedPipe implements PipeTransform {
  transform(items: any[]): any {
    if (!items) {
      return items;
    }
    return items.filter(item => item.visibile === 'unchecked');
  }
}
