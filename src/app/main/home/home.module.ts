import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { HomeComponent, HistoriqueDialogComponent } from './home.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'auth/auth.interceptor';

const routes = [
    {
        path     : 'home',
        component: HomeComponent
    }
];

@NgModule({
    declarations: [
        HomeComponent,
        HistoriqueDialogComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule,
        MatButtonModule,
        MatDividerModule,
        MatDialogModule,
        MatTableModule
    ],
    exports     : [
        HomeComponent
    ],
    providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        },
      ],
    entryComponents: [
        HistoriqueDialogComponent
    ]
})

export class HomeModule
{
}
