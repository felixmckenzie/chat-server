
export const typeDefs = `

type Query {
allBrands: [Brand!]!
allCategories: [Category!]!
allProducts: [Product!]!
productById(id: ID!): Product
brandById(id: ID!): Brand
categoryById(id: ID!): Category
userById(id: ID!: User
orderById(id: ID!): Order
}

type Mutation {
createUser(input: UserWithAddressInput!): User
updateUser(input: UserWithAddressInput!): User
deleteUser(id: ID!): User
createProduct(productInput: productInput!): Product
updateProduct(productInput: productInput!): Product
deleteProduct(id: ID!): Product
createOrder(userId: ID!): Order
updateItemToOrder(userId: ID!, itemId: ID!, quantity: Int!): Order
deleteOrder(id: ID!): Order
}

input UserWithAdressInput {
givenName: String
familyName: String
email: String
mobilePhone: String
role: Role
address: AddressInput
}

input AddressInput {
address_line_one: String
address_line_two: String
city: String
state: String
postCode: String
}

input ProductInput {
name: String
description: String
brand: BrandInput
category: CategoryInput
price: Float
image: String
}

input BrandInput {
name: String
description: String
}

input CategoryInput {
    name: String
}

input OrderInput {
    userId: ID!
    orderItems: 
    
}

type Brand {
id: ID!
name: String!
description: String!
products: [Product]!
}

type Category {
    id: ID!
    name: String!
    products: [Product]!
}

type Product {
id: ID!
name: String!
description: String
price: Float!
category: Category!
brand: Brand!
image: String
orderItems: [orderItems]!
}

type User {
id: ID!
createdAt: DateTime
updatedAt: DateTime
email: String!
mobilePhone: String!
givenName: String!
familyName: String!
address: Address!
role: Role!
orders: [Order]!
}

type Address {
    id: ID!
    address_line_one: String!
    address_line_two: String
    city: String!
    postCode: String!
    State: String!
}

type OrderItem {
id: ID!
createdAt: DateTime
updatedAt: DateTime
order: Order!
product: Product!
quantity: Int
}

type Order {
    id: ID!
    orderItems: [orderItem]!
    status: Boolean
    totalPrice: Float
    user: User!
    deliveryAddress: Address
    billingAddress: Address
    orderStatus: OrderStatus
}

enum OrderStatus {
  CREATED
  PAID
  SHIPPED
  DELIVERED 
  CANCELLED
  REFUNDED
}
scalar DateTime
`

