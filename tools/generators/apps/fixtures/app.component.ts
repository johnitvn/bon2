import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiRootModule } from '@taiga-ui/core';

@Component({
  standalone: true,
  imports: [RouterModule, TuiRootModule],
  selector: '{prefix}-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = '{prefix}-site';
}
