export interface AuthState {
    token: string | null;
    loading: boolean;
    error: any;
    isLogged: boolean;
  }
  
  export const initialAuthState: AuthState = {
    token: null,
    loading: false,
    error: null,
    isLogged: false
  };
  