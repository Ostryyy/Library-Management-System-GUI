import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { authGuard } from './guards/auth.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  exports: [
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
