export interface userType {
  // [key: string]: string | undefined;
  id?: string;
  name?: string;
  email: string;
  password: string;
  role?: string;
}

export interface productType {
  // [key: string]: string | number | { id: string; label: string }[] | undefined;
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: { id: string; label: string }[];
  deliveryInfo: string;
  onSale: string;
  priceDrop: number;
  imageUrl: string;
}

// context types
export interface AppContextType {
  setAuth: (auth: boolean, user: userType | null) => void;
  setPageLevelLoader: (loading: boolean) => void;
  setComponentLevelLoader: (loading: boolean, id?: string) => void;
  setUpdatedProduct: (product: productType | null) => void;
  state: AppStateType;
}

export interface AppStateType {
  user: userType;
  updatedProduct: productType,
  pageLevelLoader: boolean;
  componentLevelLoader: {
    loading: boolean;
    id: string;
  };
  isAuthenticated: boolean;
}
