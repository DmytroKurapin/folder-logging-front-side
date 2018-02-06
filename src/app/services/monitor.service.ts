import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FilesData, LogsData} from '../module-helpers/logs-data';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {Subscription} from 'rxjs/Subscription';
import {environment} from '../../environments/environment';
import {AuthService} from './auth.service';
import {Router} from "@angular/router";

@Injectable()
export class MonitorService {
  monitorIntervalSubscription: Subscription;
  private _allLogs = new BehaviorSubject<LogsData[]>([]);
  private arrCurrFiles: FilesData[] = [];

  constructor(private httpClient: HttpClient, private authService: AuthService, private router: Router) {
  }

  get allLogs(): BehaviorSubject<LogsData[]> {
    return this._allLogs;
  }

  startMonitoring(folderPath: string) {
    if (!localStorage.getItem('userName')) {
      this.router.navigate(['/logout']);
      return;
    }
    this.monitorIntervalSubscription = TimerObservable.create(0, 1000).subscribe((tick) => {
      console.log(tick);
      this.httpClient.post(`${environment.url}/api/start`, {
        dirUrl: folderPath,
        user: localStorage.getItem('userName')
      }/*this.allLogs.getValue()*/)
        .subscribe((dataResp: FilesData[]) => {
          if (!dataResp) console.log('or folder is empty or path incorrect. Needs to check and show diff messages for empty and for incorrect');
          else {

            if(dataResp[0] && dataResp[0].hasOwnProperty('errorMsg')) {
              this.allLogs.next([{icon:'cancel',message:'Path is incorrect'}]);
              return;
            }

            const currArrLength = this.arrCurrFiles.length;
            // find first load of files - no need in logs
            if (currArrLength === 0 && tick === 0 ) Object.assign(this.arrCurrFiles, dataResp);
            else {
              let newLogsArr: LogsData[] = this.allLogs.getValue();
              let arrOfActionIndexes = [];      // keeps indexes of received files, in order to find added files after
              for (let ind = 0; ind < currArrLength; ind++) {

                let tempIndex: number;
                if ((tempIndex = dataResp.findIndex(currFile => currFile.createdAt === this.arrCurrFiles[ind].createdAt && currFile.name !== this.arrCurrFiles[ind].name))
                  > -1) {
                  // file is renamed
                  arrOfActionIndexes.push(tempIndex);
                  newLogsArr.push({
                    icon: 'edit',
                    message: `File "${this.arrCurrFiles[ind].name}" was renamed into "${dataResp[tempIndex].name}"`
                  });
                  this.arrCurrFiles[ind].name = dataResp[tempIndex].name;
                } else if ((tempIndex = dataResp.findIndex(currFile => currFile.createdAt === this.arrCurrFiles[ind].createdAt && currFile.name === this.arrCurrFiles[ind].name)) > -1) {
                  // file remains in the folder
                  arrOfActionIndexes.push(tempIndex);
                } else if (dataResp.findIndex(
                  currFile => currFile.createdAt ===
                    this.arrCurrFiles[ind].createdAt) === -1) {
                  // file is removed
                  // todo error happened on calling createdAt of undefined
                  newLogsArr.push(
                    {
                      icon: 'delete_sweep',
                      message: `File ${this.arrCurrFiles[ind].name} was removed`
                    });
                  this.arrCurrFiles.splice(ind, 1);
                }
              }
              if (arrOfActionIndexes.length !== dataResp.length) {
                // we have added files
                let tempRespIndexes = Object.keys(dataResp);
                let difference = tempRespIndexes.filter(x => !arrOfActionIndexes.includes(parseInt(x)));
                difference.forEach(diffKey => {
                  newLogsArr.push(
                    {
                      icon: 'create_new_folder',
                      message: `File "${dataResp[diffKey].name}" was added`
                    });
                  this.arrCurrFiles.push(dataResp[diffKey]);
                })
              }
              this.allLogs.next(newLogsArr);
            }
          }
        });
    });
  }

  stopMonitoring(folderPath) {
    if (this.monitorIntervalSubscription) {
      let tempLogs = this.allLogs.getValue().map((tempLog: LogsData) => tempLog.message);
      console.log(tempLogs);
      let subs: Subscription = this.httpClient.post(`${environment.url}/api/stop`,
        {user: localStorage.getItem('userName'), logs: tempLogs, dirUrl: folderPath}).subscribe(resp => {
        this.allLogs.next([]);
        subs.unsubscribe();
      });
      this.monitorIntervalSubscription.unsubscribe();
    }
  }
}
