export interface userType {
  // [key: string]: string | undefined;
  _id?: string;
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

export interface cartType {
  _id?: string;
  userID: string;
  productID: productType;
  quantity?: number;
}

// before fields are being populated
export interface cartTypeObjectId {
  _id?: string;
  userID: string;
  productID: string;
  quantity?: number;
}

export interface addressType {
  _id?: string;
  userID?: string;
  fullName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface orderItemType {
  _id?: string,
  product: productType,
  qty: number
}

export interface orderType {
  _id?: string;
  user?: string;
  orderItems: orderItemType[];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
  paymentMethod: string;
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date;
  isProcessing: boolean;
}

// context and state types
export interface AppContextType {
  setAuth: (auth: boolean, user: userType | null| {}) => void;
  setPageLevelLoader: (loading: boolean) => void;
  setShowCartModal: (loading: boolean) => void;
  setComponentLevelLoader: (loading: boolean, id?: string) => void;
  setUpdatedProduct: (product: productType | null) => void;
  setCartItems: (product: productType[]) => void;
  setAddresses: (product: addressType[]) => void;
  setAllOrders: (product: orderType[]) => void;
  setAddressFormData: (product: addressType) => void;
  state: AppStateType;
}

export interface AppStateType {
  user: userType | null;
  showCartModal: boolean;
  cartItems: cartType[];
  updatedProduct: productType;
  pageLevelLoader: boolean;
  componentLevelLoader: {
    loading: boolean;
    id: string;
  };
  isAuthenticated: boolean;
  addresses: addressType[];
  allOrders: orderType[];
  addressFormData: addressType;
}
