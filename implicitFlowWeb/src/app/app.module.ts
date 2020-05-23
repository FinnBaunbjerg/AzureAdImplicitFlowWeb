import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MsalModule, MsalService, MsalInterceptor } from '@azure/msal-angular';
import * as Msal from 'msal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const protectedResourceMap: any = [environment.baseUrl, environment.scopeUri];
const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export function loggerCallback(logLevel, message, piiEnabled) {
  console.log(message);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule.forRoot({
      auth: {
        clientId: environment.uiClienId,
        authority: 'https://login.microsoftonline.com/' + environment.tenantId,
        validateAuthority: true,
        redirectUri: environment.redirectUrl,
        postLogoutRedirectUri: environment.redirectUrl,
        navigateToLoginRequestUrl: true,
      },
      cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: true, // set to true for IE 11
      },
      system: {
        logger: new Msal.Logger(loggerCallback, {
          correlationId: '1234',
          level: Msal.LogLevel.Verbose,
          piiLoggingEnabled: true

        })
      },
      framework: {
        unprotectedResources: ["https://www.microsoft.com/en-us/"],
        protectedResourceMap: new Map(protectedResourceMap)
      },
    },
      {
        popUp: !isIE,
        consentScopes: environment.scopeUri,
        extraQueryParameters: {}
      })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
