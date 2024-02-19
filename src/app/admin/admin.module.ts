/* MODULOS */
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './router/admin-routing.module';
import { FormsModule } from '@angular/forms';
import { PowerBIEmbedModule } from 'powerbi-client-angular';
import { NgxSpinnerModule } from 'ngx-spinner';

/* INTERCEPTORES */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PowerBIInterceptor } from './services/powerbi.interceptor';

/* NGRX */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCurrentUser from './store/reducers/currentuser.reducers';

/* COMPONENTES */
import { MenuComponent } from './components/menu/controllers/menu.component';
import { DashboardComponent } from './components/dashboard/controllers/dashboard.component';
import { MaterialModule } from 'src/material.module';
import { SearchComponent } from './components/search/controllers/search.component';
import { CurrentUserEffect } from './store/effects/currentuser.effects';
import { DetalleProyectoComponent } from './components/ventas/controllers/detalle-proyecto.component';
import { ReporteGeneralComponent } from './components/ventas/controllers/reporte-general.component';
import { VentasComponent } from './components/ventas/controllers/ventas.component';
import { MarketingComponent } from './components/marketing/controllers/marketing.component';
import { PerfilClientesComponent } from './components/perfil-clientes/controllers/perfil-clientes.component';

@NgModule({
  declarations: [
    MenuComponent,
    DashboardComponent,
    SearchComponent,
    DetalleProyectoComponent,
    ReporteGeneralComponent,
    VentasComponent,
    MarketingComponent,
    PerfilClientesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    PowerBIEmbedModule,
    NgxSpinnerModule,
    StoreModule.forFeature(fromCurrentUser.currentUserFeatureKey, fromCurrentUser.currentUserReducer),
    EffectsModule.forFeature([CurrentUserEffect]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: PowerBIInterceptor, multi: true },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule { }
