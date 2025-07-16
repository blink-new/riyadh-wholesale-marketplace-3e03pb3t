import { useState, useCallback, useEffect } from 'react'
import type { CartItem, Product } from '../types'

const CART_STORAGE_KEY = 'tahweela_cart'

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
      if (savedCart) {
        setCartItems(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error)
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error)
    }
  }, [cartItems])

  const addToCart = useCallback((product: Product, quantity: number, specifications?: Record<string, any>) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(item => 
        item.productId === product.id && 
        JSON.stringify(item.specifications) === JSON.stringify(specifications)
      )

      if (existingItemIndex >= 0) {
        // Update existing item
        const updated = [...prev]
        updated[existingItemIndex] = {
          ...updated[existingItemIndex],
          quantity: updated[existingItemIndex].quantity + quantity
        }
        return updated
      } else {
        // Add new item
        return [...prev, {
          productId: product.id,
          supplierId: product.supplierId,
          quantity,
          specifications,
          product
        }]
      }
    })
    setIsOpen(true)
  }, [])

  const removeFromCart = useCallback((productId: string, specifications?: Record<string, any>) => {
    setCartItems(prev => prev.filter(item => 
      !(item.productId === productId && 
        JSON.stringify(item.specifications) === JSON.stringify(specifications))
    ))
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number, specifications?: Record<string, any>) => {
    if (quantity <= 0) {
      removeFromCart(productId, specifications)
      return
    }

    setCartItems(prev => prev.map(item => 
      item.productId === productId && 
      JSON.stringify(item.specifications) === JSON.stringify(specifications)
        ? { ...item, quantity }
        : item
    ))
  }, [removeFromCart])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity
    }, 0)
  }, [cartItems])

  const getCartItemCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }, [cartItems])

  const getSupplierGroups = useCallback(() => {
    return cartItems.reduce((groups, item) => {
      if (!groups[item.supplierId]) {
        groups[item.supplierId] = []
      }
      groups[item.supplierId].push(item)
      return groups
    }, {} as Record<string, CartItem[]>)
  }, [cartItems])

  return {
    cartItems,
    isOpen,
    setIsOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    getSupplierGroups
  }
}