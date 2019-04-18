import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../service';

@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.scss']
})
export class QuestComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.localStorageService.save();
  }

}
