import { rule, shield, allow } from 'graphql-shield'
import { context as prisma } from '../context'

const isAuthenticated = rule({ cache: 'contextual' })(async (parent, args, { user }) => {
  return Boolean(user?.id)
})

const isAdmin = rule({ cache: 'contextual' })(async (parent, args, { user }) => {
   const dbUser = prisma.user?.findOne({
    where: {id: user?.id}
   })

   return dbUser?.role === 'ADMIN'
})


export const permissions = shield({
  Query: {  
    allBrands: allow,
    allCategories: allow,
    allProducts: allow,
    categoryById: allow,
    brandById: allow,
    productById: allow,
    orderById: isAuthenticated,
    userById: isAdmin

  },
  Mutation: {
    createUser: allow,
    updateUser: isAuthenticated,
    deleteUser: isAuthenticated,
    createProduct: isAdmin,
    updateProduct: isAdmin,
    deleteProduct: isAdmin,
    updateItemToOrder: isAuthenticated,
    deleteOrder: isAuthenticated
  }
})