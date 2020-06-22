import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})

export class ListComponent implements OnInit {

  public data;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.data = this.authService.getData().subscribe(
      data => this.data = JSON.stringify(data)
    );
  }
}
