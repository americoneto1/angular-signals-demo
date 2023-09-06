import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  styles: [`
    .example-container {
      position: absolute;
      top: 64px;
      bottom: 0;
      left: 0;
      right: 0;
      background: #eee;
    }
    .content {
      padding: 20px;
    }
  `],
  template: `
    <mat-toolbar color="primary">
      <span>Angular Signals Demo</span>
    </mat-toolbar>
    <mat-drawer-container class="example-container">
      <mat-drawer mode="side" opened>
        <mat-list role="list">
          <mat-list-item role="listitem">
            <a mat-list-item href="#" [routerLink]="['/']">Home</a>
          </mat-list-item>
          <mat-list-item role="listitem">
            <a mat-list-item href="#" [routerLink]="['/clientes']">Clientes</a>
          </mat-list-item>
        </mat-list>
      </mat-drawer>
      <mat-drawer-content class="content">
        <router-outlet></router-outlet>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    RouterModule
  ]
})
export class AppComponent implements OnInit {
  ngOnInit() {
    // effect(() => {
    //   console.log('effect');
    // });
  }
}
