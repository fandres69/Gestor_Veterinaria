import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-clients',
  templateUrl: './panel-clients.component.html',
  styleUrls: []
})
export class PanelClientsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

}
