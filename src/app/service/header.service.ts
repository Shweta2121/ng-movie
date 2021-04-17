import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface IHeader {
  isFullLogo: boolean;
  isTransparent: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private _defaultConfig: IHeader = {
    isFullLogo: true,
    isTransparent: false,
  };

  private _sinkConfig: BehaviorSubject<IHeader> = new BehaviorSubject<IHeader>(
    this._defaultConfig
  );

  private _obsConfig: Observable<IHeader> = this._sinkConfig.asObservable();

  get config(): Observable<IHeader> {
    return this._obsConfig;
  }

  setConfig(value?: IHeader) {
    this._sinkConfig.next(value ? value : this._defaultConfig);
  }
}
