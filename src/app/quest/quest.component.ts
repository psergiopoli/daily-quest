import { Component, OnInit } from '@angular/core';
import { LocalStorageService, CloudStorageService } from '../service';
import { Data } from '../interface/quest';

@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.scss']
})
export class QuestComponent implements OnInit {

  public data: Data;

  constructor(
    private localStorageService: LocalStorageService,
    private cloudStorageService: CloudStorageService,
  ) { }

  ngOnInit() {
    this.data = this.localStorageService.load();
    if (!this.data) {
      this.data = new Data();
      this.localStorageService.save(this.data);
    }

    console.log(this.data);
  }

  saveToCloud() {
    this.cloudStorageService.save(this.data).then(() => {
      console.log('Data save with success');
    }).catch(err => {
      console.log(err);
    });
  }

  loadFromCloud() {
    this.cloudStorageService.load().then(data => {
      console.log(data);
      this.data = data;
    }).catch(err => {
      console.log(err);
    });
  }

}
