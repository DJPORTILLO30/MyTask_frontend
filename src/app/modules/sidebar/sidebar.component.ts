import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  tabs: string[] = ['Tareas', 'Recientes', 'Subidas', 'Crear tarea'];
  sidebarOpen: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  getIcon(tab: string): string {
    switch (tab) {
      case 'Tareas':
        return 'list';
      case 'Recientes':
        return 'schedule';
      case 'Subidas':
        return 'cloud_upload';
      case 'Crear tarea':
        return 'add_circle';
      default:
        return 'help_outline';
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
