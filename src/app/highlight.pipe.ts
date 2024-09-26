import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true
})
export class HighlightPipe implements PipeTransform {
  transform(value: string, searchTerm: string): string {
    if (!searchTerm || !value) {
      return value;
    }
    const regex = new RegExp(searchTerm, 'ig'); // Case-insensitive matching ( AL ig)
    return value.replace(regex, (match) => `<span class ="opacity-75 bg-warning">${match}</span>`);
  }
}