import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Landing } from './pages/landing/landing';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: 'landing', component: Landing},
    { path: 'login', component: Login },
	{ path: 'register', component: Register },
	{ path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
	{ path: '**', redirectTo: 'dashboard' },
];
