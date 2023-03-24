import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'troncate',
})
export class TroncatePipe implements PipeTransform {
  transform(value: string, maxLength = 20): string {
    if (value.length > maxLength) {
      return value.substring(0, maxLength) + '...';
    }

    return value;
  }
}
