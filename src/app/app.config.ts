import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore, provideState } from '@ngrx/store';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from '../interceptors/token.interceptor';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authReducer } from './state/auth/auth.reducers';
import { AuthEffects } from './state/auth/auth.effects';
import { productsReducer } from './state/product/product.reducers';
import { ProductsEffects } from './state/product/product.effects';
import { userReducer } from './state/user/user.reducers';
import { UserEffects } from './state/user/user.effects';
import { cartReducer } from './state/cart/cart.reducers';
import { CartEffects } from './state/cart/cart.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),
    provideState({ name: 'products', reducer: productsReducer }),
    provideState({ name: 'auth', reducer:  authReducer}),
    provideState({ name: 'user', reducer:  userReducer}),
    provideState({ name: 'cart', reducer:  cartReducer}),
    provideEffects(),
    provideHttpClient(withInterceptors([
        tokenInterceptor
    ])),
    provideEffects([
      ProductsEffects,
      AuthEffects,
      UserEffects,
      CartEffects
    ]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      connectInZone: true
    }),
]
};
