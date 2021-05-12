import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'UKPhonePipe'
})
export class UKPhonePipe implements PipeTransform {
  transform(value: string): string {
    const _arr = value.split('');
    return `${_arr.slice(0,3).join('')}  ${_arr.slice(3,6).join('')}  ${_arr.slice(6).join('')}`;
  }
}