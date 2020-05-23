import { Component, OnInit, OnDestroy } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'implicitFlowWeb';
  loginSubscription;
  logoutSubscription;
  constructor(private broadcastService: BroadcastService, private msalService: MsalService) {
    this.msalService.logout();
  }

  ngOnInit(): void {
    this.loginSubscription = this.broadcastService.subscribe('msal:loginFailure', payload => {
      console.log( 'login failure');
      console.log(payload);
    });

    this.logoutSubscription = this.broadcastService.subscribe('msal:loginSuccess', payload => {
      console.log(payload);
    });

    this.msalService.loginPopup();
  }

  ngOnDestroy(): void {
    this.broadcastService.getMSALSubject().next(1);
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }

    if (this.logoutSubscription) {
      this.loginSubscription.unsubscribe();
    }

  }
}
