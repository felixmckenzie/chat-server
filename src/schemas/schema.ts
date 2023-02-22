
export const typeDefs = `
type Query {
allBrands: [Brand!]!
allCategories: [Category!]!
allProducts: [Product!]!
ordersByUser(userInput: userInput!): [Order]
productById(id:Int): Product
brandById(id:Int): Brand
categoryById(id: Int): Category
}

type Mutation {

}

type Brand {
id: ID!
name: String!
description: String!
products: [Product!]
}

type Category {
    id: ID!
    name: String!
    products: [Product!]
}

type Product {
id: Int!
name: String!
description: String
price: Float!
category: Category!
brand: Brand!
image: String
orderItems: [orderItems!]
}

type User {
id: Int!
createdAt: DateTime
updatedAt: DateTime
email: String!
mobilePhone: String!
givenName: String!
familyName: String!
address: Address!
role: Role!
orders: [Order!]
}

type Address {
    id: Int!
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
    orderItems: [orderItem!]
    status: Boolean
    totalPrice: Float
    user: User!
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
`

