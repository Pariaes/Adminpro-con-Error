import { Component, OnInit } from '@angular/core';

import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settingd',
  templateUrl: './account-settingd.component.html',
  styles: [
  ]
})
export class AccountSettingdComponent implements OnInit{
  
  constructor(private _settingsService: SettingsService) {}

  ngOnInit(): void {
    this._settingsService.checkCurrentTheme();
  }

  changeTheme( theme: string ){
    this._settingsService.changeTheme( theme )
  }

}
