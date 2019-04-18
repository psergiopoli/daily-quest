import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../service';
import { Data } from '../interface/quest';

@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.scss']
})
export class QuestComponent implements OnInit {

  public data: Data;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.data = this.localStorageService.load();
    if (!this.data) {
      this.data = new Data();
      this.localStorageService.save(this.data);
    }

    console.log(this.data);
  }

}
