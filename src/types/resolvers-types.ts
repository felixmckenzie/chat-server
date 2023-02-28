import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Address = {
  __typename?: 'Address';
  State: Scalars['String'];
  address_line_one: Scalars['String'];
  address_line_two?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  id: Scalars['ID'];
  postCode: Scalars['String'];
};

export type AddressInput = {
  address_line_one?: InputMaybe<Scalars['String']>;
  address_line_two?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  postCode?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
};

export type Brand = {
  __typename?: 'Brand';
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  products: Array<Maybe<Product>>;
};

export type BrandInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  name: Scalars['String'];
  products: Array<Maybe<Product>>;
};

export type CategoryInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createOrder?: Maybe<Order>;
  createProduct?: Maybe<Product>;
  createUser?: Maybe<User>;
  deleteOrder?: Maybe<Order>;
  deleteProduct?: Maybe<Product>;
  deleteUser?: Maybe<User>;
  updateItemToOrder?: Maybe<Order>;
  updateProduct?: Maybe<Product>;
  updateUser?: Maybe<User>;
};


export type MutationCreateOrderArgs = {
  userId: Scalars['ID'];
};


export type MutationCreateProductArgs = {
  productInput: ProductInput;
};


export type MutationCreateUserArgs = {
  input: UserWithAddressInput;
};


export type MutationDeleteOrderArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateItemToOrderArgs = {
  itemId: Scalars['ID'];
  orderId: Scalars['ID'];
  quantity: Scalars['Int'];
  userId: Scalars['ID'];
};


export type MutationUpdateProductArgs = {
  productInput: ProductInput;
};


export type MutationUpdateUserArgs = {
  input: UserWithAddressInput;
};

export type Order = {
  __typename?: 'Order';
  billingAddress?: Maybe<Address>;
  deliveryAddress?: Maybe<Address>;
  id: Scalars['ID'];
  orderItems: Array<Maybe<OrderItem>>;
  orderStatus?: Maybe<OrderStatus>;
  status?: Maybe<Scalars['Boolean']>;
  totalPrice?: Maybe<Scalars['Float']>;
  user: User;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  order: Order;
  product: Product;
  quantity: Scalars['Int'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export enum OrderStatus {
  Cancelled = 'CANCELLED',
  Created = 'CREATED',
  Delivered = 'DELIVERED',
  Paid = 'PAID',
  Refunded = 'REFUNDED',
  Shipped = 'SHIPPED'
}

export type Product = {
  __typename?: 'Product';
  brand: Brand;
  category: Category;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  orderItems: Array<Maybe<OrderItem>>;
  price: Scalars['Float'];
};

export type ProductInput = {
  brand?: InputMaybe<BrandInput>;
  category?: InputMaybe<CategoryInput>;
  description?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
};

export type Query = {
  __typename?: 'Query';
  allBrands: Array<Brand>;
  allCategories: Array<Category>;
  allProducts: Array<Product>;
  brandById?: Maybe<Brand>;
  categoryById?: Maybe<Category>;
  orderById?: Maybe<Order>;
  productById?: Maybe<Product>;
  userById?: Maybe<User>;
};


export type QueryBrandByIdArgs = {
  id: Scalars['ID'];
};


export type QueryCategoryByIdArgs = {
  id: Scalars['ID'];
};


export type QueryOrderByIdArgs = {
  id: Scalars['ID'];
};


export type QueryProductByIdArgs = {
  id: Scalars['ID'];
};


export type QueryUserByIdArgs = {
  id: Scalars['ID'];
};

export enum Role {
  Admin = 'ADMIN',
  Regular = 'REGULAR'
}

export type User = {
  __typename?: 'User';
  address?: Maybe<Address>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  familyName: Scalars['String'];
  givenName: Scalars['String'];
  id: Scalars['ID'];
  mobilePhone: Scalars['String'];
  orders: Array<Maybe<Order>>;
  password: Scalars['String'];
  role: Role;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserWithAddressInput = {
  address?: InputMaybe<AddressInput>;
  email?: InputMaybe<Scalars['String']>;
  familyName?: InputMaybe<Scalars['String']>;
  givenName?: InputMaybe<Scalars['String']>;
  mobilePhone?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Role>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Address: ResolverTypeWrapper<Address>;
  AddressInput: AddressInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Brand: ResolverTypeWrapper<Brand>;
  BrandInput: BrandInput;
  Category: ResolverTypeWrapper<Category>;
  CategoryInput: CategoryInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Order: ResolverTypeWrapper<Order>;
  OrderItem: ResolverTypeWrapper<OrderItem>;
  OrderStatus: OrderStatus;
  Product: ResolverTypeWrapper<Product>;
  ProductInput: ProductInput;
  Query: ResolverTypeWrapper<{}>;
  Role: Role;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
  UserWithAddressInput: UserWithAddressInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Address: Address;
  AddressInput: AddressInput;
  Boolean: Scalars['Boolean'];
  Brand: Brand;
  BrandInput: BrandInput;
  Category: Category;
  CategoryInput: CategoryInput;
  DateTime: Scalars['DateTime'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  Order: Order;
  OrderItem: OrderItem;
  Product: Product;
  ProductInput: ProductInput;
  Query: {};
  String: Scalars['String'];
  User: User;
  UserWithAddressInput: UserWithAddressInput;
};

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  State?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address_line_one?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address_line_two?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  postCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BrandResolvers<ContextType = any, ParentType extends ResolversParentTypes['Brand'] = ResolversParentTypes['Brand']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  products?: Resolver<Array<Maybe<ResolversTypes['Product']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  products?: Resolver<Array<Maybe<ResolversTypes['Product']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createOrder?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationCreateOrderArgs, 'userId'>>;
  createProduct?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'productInput'>>;
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  deleteOrder?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationDeleteOrderArgs, 'id'>>;
  deleteProduct?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<MutationDeleteProductArgs, 'id'>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  updateItemToOrder?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationUpdateItemToOrderArgs, 'itemId' | 'orderId' | 'quantity' | 'userId'>>;
  updateProduct?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<MutationUpdateProductArgs, 'productInput'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>;
};

export type OrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
  billingAddress?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  deliveryAddress?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  orderItems?: Resolver<Array<Maybe<ResolversTypes['OrderItem']>>, ParentType, ContextType>;
  orderStatus?: Resolver<Maybe<ResolversTypes['OrderStatus']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  totalPrice?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderItem'] = ResolversParentTypes['OrderItem']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  brand?: Resolver<ResolversTypes['Brand'], ParentType, ContextType>;
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orderItems?: Resolver<Array<Maybe<ResolversTypes['OrderItem']>>, ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  allBrands?: Resolver<Array<ResolversTypes['Brand']>, ParentType, ContextType>;
  allCategories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  allProducts?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
  brandById?: Resolver<Maybe<ResolversTypes['Brand']>, ParentType, ContextType, RequireFields<QueryBrandByIdArgs, 'id'>>;
  categoryById?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<QueryCategoryByIdArgs, 'id'>>;
  orderById?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<QueryOrderByIdArgs, 'id'>>;
  productById?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryProductByIdArgs, 'id'>>;
  userById?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserByIdArgs, 'id'>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  familyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  givenName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  mobilePhone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orders?: Resolver<Array<Maybe<ResolversTypes['Order']>>, ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Address?: AddressResolvers<ContextType>;
  Brand?: BrandResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  OrderItem?: OrderItemResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

