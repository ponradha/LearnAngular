import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mobileNumber'
})
export class MobileNumberPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if (value.length === 11) {
      return value.substring(1);
    } else if (value.length === 13) {
        return value.substring(3);
    }
    return value;
  }

}
