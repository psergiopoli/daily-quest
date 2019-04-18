import { Injectable } from '@angular/core';
import { Data } from '../interface/quest';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly LOCAL_STORAGE_KEY_DATA = 'LOCAL_STORAGE_KEY_DATA';

  constructor() { }

  save(data: Data) {
    localStorage.setItem(this.LOCAL_STORAGE_KEY_DATA, JSON.stringify(data));
  }

  load(): Data {
    const data = localStorage.getItem(this.LOCAL_STORAGE_KEY_DATA);
    return JSON.parse(data);
  }
}
