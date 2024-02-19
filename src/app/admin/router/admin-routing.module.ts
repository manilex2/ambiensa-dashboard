import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/controllers/dashboard.component';
import { HomeComponent } from '../components/home/controllers/home.component';
import { ReporteGeneralComponent } from '../components/ventas/controllers/reporte-general.component';
import { DetalleProyectoComponent } from '../components/ventas/controllers/detalle-proyecto.component';
import { VentasComponent } from '../components/ventas/controllers/ventas.component';
import { MarketingComponent } from '../components/marketing/controllers/marketing.component';
import { PerfilClientesComponent } from '../components/perfil-clientes/controllers/perfil-clientes.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: "full" },
      { path: 'dashboard', component: DashboardComponent, children: [
        { path: 'inicio', component: HomeComponent },
        { path: 'ventas', component: VentasComponent, children: [
          { path: 'reporte-general', component: ReporteGeneralComponent },
          { path: 'detalle-proyecto', component: DetalleProyectoComponent }
        ]},
        { path: 'marketing', component: MarketingComponent },
        { path: 'perfil', component: PerfilClientesComponent }
      ]},
    ]
  },
  {
    path: "**", redirectTo: "admin"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
