import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-country-icon',
  standalone: true,
  imports: [],
  templateUrl: './country-icon.component.html',
  styleUrl: './country-icon.component.css',
})
export class CountryIconComponent {
  countryCode = input.required<string>();
  imageSize = input<number>();

  imageSource = computed(() => {
    let size = this.imageSize() ?? 32;
    const url = `https://flagsapi.com/${this.countryCode()}/flat/${size}.png`;
    return url;
  });
}
