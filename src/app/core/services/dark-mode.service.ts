import { Injectable, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private readonly themeKey = 'theme';
  private theme$: BehaviorSubject<string> = new BehaviorSubject(this.getInitialTheme());


  constructor(private rendererFactory: RendererFactory2) {
    this.applyTheme(this.getInitialTheme());
  }

  public get theme() {
    return this.theme$.asObservable();
  }

  public toggleTheme(): void {
    const currentTheme = localStorage.getItem(this.themeKey) || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem(this.themeKey, newTheme);
    this.applyTheme(newTheme);
    this.theme$.next(newTheme);
  }

  private applyTheme(theme: string): void {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }


  private getInitialTheme(): string {
    const storedTheme = localStorage.getItem(this.themeKey);
    if (storedTheme) return storedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
