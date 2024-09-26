import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VacationComponent } from './vacation/vacation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , VacationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'highlightPipe';
}
