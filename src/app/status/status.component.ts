import { Component, OnInit } from '@angular/core';
import {StatusService} from '../services/status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
statuses$;
  constructor(private statusService: StatusService) { }

  ngOnInit() {
    this.statuses$ = this.statusService.getStatus();
  }

}
