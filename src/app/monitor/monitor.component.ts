import { Component, OnInit} from '@angular/core';
import {LogsData} from '../module-helpers/logs-data';
import {MonitorService} from '../services/monitor.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {

  folderPath: string;
  isStarted: boolean;
  actionLogs$: BehaviorSubject<LogsData[]>;

  constructor(private monitorService:MonitorService) {
  }

  ngOnInit() {
    this.actionLogs$ = this.monitorService.allLogs;
  }

  startMonitor(folderPath) {
    this.isStarted = true;
    this.monitorService.startMonitoring(folderPath);
  }

  stopMonitor(folderPath) {
    this.isStarted = false;
    console.log(this.isStarted);
    this.monitorService.stopMonitoring(folderPath);
  }

  enterData(dirPath:string) {
    this.folderPath = dirPath;
    if (dirPath) this.monitorService.stopMonitoring(dirPath);
  }
}
