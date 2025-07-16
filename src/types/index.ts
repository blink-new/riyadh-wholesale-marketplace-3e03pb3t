export interface User {
  id: string
  email: string
  displayName?: string
  phone?: string
  companyName?: string
  userType: 'buyer' | 'supplier' | 'admin'
  createdAt: string
  updatedAt: string
}

export interface Supplier {
  id: string
  userId: string
  companyName: string
  companyNameAr?: string
  category: string
  location: string
  description?: string
  website?: string
  phone?: string
  email?: string
  verified: boolean
  rating: number
  totalReviews: number
  totalProducts: number
  logoUrl?: string
  coverImageUrl?: string
  businessLicense?: string
  status: 'pending' | 'approved' | 'rejected' | 'suspended'
  createdAt: string
  updatedAt: string
}

export interface Product {
  id: string
  supplierId: string
  name: string
  nameAr?: string
  description?: string
  descriptionAr?: string
  category: string
  subcategory?: string
  price: number
  currency: string
  minOrderQuantity: number
  unit: string
  availabilityStatus: 'available' | 'out_of_stock' | 'discontinued'
  images: string[]
  specifications?: Record<string, any>
  tags: string[]
  featured: boolean
  createdAt: string
  updatedAt: string
  supplier?: Supplier
}

export interface Order {
  id: string
  userId: string
  supplierId: string
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  totalAmount: number
  currency: string
  shippingAddress?: string
  billingAddress?: string
  notes?: string
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  paymentMethod?: string
  paymentIntentId?: string
  trackingNumber?: string
  estimatedDelivery?: string
  createdAt: string
  updatedAt: string
  items: OrderItem[]
  supplier?: Supplier
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  quantity: number
  unitPrice: number
  totalPrice: number
  specifications?: Record<string, any>
  createdAt: string
  product?: Product
}

export interface Quote {
  id: string
  userId: string
  supplierId: string
  productId: string
  quantity: number
  message?: string
  status: 'pending' | 'responded' | 'accepted' | 'declined'
  quotedPrice?: number
  quotedCurrency: string
  supplierResponse?: string
  validUntil?: string
  createdAt: string
  updatedAt: string
  product?: Product
  supplier?: Supplier
}

export interface Favorite {
  id: string
  userId: string
  supplierId?: string
  productId?: string
  type: 'supplier' | 'product'
  createdAt: string
  supplier?: Supplier
  product?: Product
}

export interface Review {
  id: string
  userId: string
  supplierId: string
  orderId?: string
  rating: number
  title?: string
  comment?: string
  response?: string
  createdAt: string
  updatedAt: string
  user?: User
}

export interface Category {
  id: string
  name: string
  nameAr?: string
  description?: string
  descriptionAr?: string
  parentId?: string
  icon?: string
  sortOrder: number
  active: boolean
  createdAt: string
  children?: Category[]
}

export interface SearchFilters {
  query?: string
  category?: string
  subcategory?: string
  minPrice?: number
  maxPrice?: number
  location?: string
  verified?: boolean
  rating?: number
  sortBy?: 'relevance' | 'price_asc' | 'price_desc' | 'rating' | 'newest'
  page?: number
  limit?: number
}

export interface CartItem {
  productId: string
  supplierId: string
  quantity: number
  specifications?: Record<string, any>
  product?: Product
}

export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  status: string
  clientSecret?: string
}