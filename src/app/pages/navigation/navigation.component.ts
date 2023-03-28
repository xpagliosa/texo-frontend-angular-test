import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  routes = [
    {
      title: 'Dashboard',
      route: '/dashboard'
    },
    {
      title: 'List',
      route: '/list'
    }
  ]

}
