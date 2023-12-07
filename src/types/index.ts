export interface userType {
  [key: string]: string | undefined;
  id?: string;
  name?: string;
  email: string;
  password: string;
  role?: string;
}

// context types
export interface AppContextType {
  // setUser: (userType: userType) => void;
  setAuth: (auth: boolean, user: userType | null) => void;
  setPageLevelLoader: (loading: boolean) => void;
  setComponentLevelLoader: (loading: boolean, id?: string) => void;
  state: AppStateType;
}

export interface AppStateType {
  user: userType,
  pageLevelLoader: boolean,
  componentLevelLoader: {
    loading: boolean,
    id: string,
  }
  isAuthenticated: boolean,
}
