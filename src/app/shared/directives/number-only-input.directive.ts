import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[numbersOnly]'
})
export class NumberOnlyInputDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    if (event.key === '.' && input.value.includes('.')) {
      event.preventDefault();
    } else if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      event.preventDefault();
    }
  }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    if (value.length > 1 && value.startsWith('0')) {
      input.value = value.substring(1);
      input.dispatchEvent(new Event('input'));
    }
  }
}
