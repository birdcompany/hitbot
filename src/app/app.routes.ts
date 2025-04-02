import { Routes } from '@angular/router';
import { DataTableComponent } from './data-table/data-table.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ItemDashboardComponent } from './item-dashboard/item-dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { authGuard } from './auth.guard';
import { LoadingComponent } from './loading/loading.component';
import { LogInComponent } from './log-in/log-in.component';

export const routes: Routes = [
    { path: 'item-dashboard', component: ItemDashboardComponent, canActivate: [authGuard] },
    { path: 'orders', component: OrdersComponent, canActivate: [authGuard] },      
    { path: 'loading', component: LoadingComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'login', component: LogInComponent },
    { path: '', redirectTo: '/item-dashboard', pathMatch: 'full' },    
    { path: '**' , component: PageNotFoundComponent },
];
