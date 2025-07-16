import { useState, useCallback } from 'react'
import { blink } from '../blink/client'
import type { Order, OrderItem, CartItem } from '../types'

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getUserOrders = useCallback(async (userId: string) => {
    setLoading(true)
    setError(null)

    try {
      // Mock orders data - in real implementation, this would query the database
      const mockOrders: Order[] = [
        {
          id: 'ord_1',
          userId,
          supplierId: 'sup1',
          status: 'processing',
          totalAmount: 45000,
          currency: 'SAR',
          shippingAddress: 'Riyadh, Saudi Arabia',
          paymentStatus: 'paid',
          paymentMethod: 'stripe',
          trackingNumber: 'TRK123456789',
          estimatedDelivery: '2024-01-25',
          createdAt: '2024-01-20T10:00:00Z',
          updatedAt: '2024-01-21T14:30:00Z',
          items: [
            {
              id: 'item_1',
              orderId: 'ord_1',
              productId: '1',
              quantity: 100,
              unitPrice: 450,
              totalPrice: 45000,
              createdAt: '2024-01-20T10:00:00Z'
            }
          ]
        },
        {
          id: 'ord_2',
          userId,
          supplierId: 'sup2',
          status: 'delivered',
          totalAmount: 12500,
          currency: 'SAR',
          shippingAddress: 'Riyadh, Saudi Arabia',
          paymentStatus: 'paid',
          paymentMethod: 'stripe',
          trackingNumber: 'TRK987654321',
          createdAt: '2024-01-15T09:00:00Z',
          updatedAt: '2024-01-18T16:45:00Z',
          items: [
            {
              id: 'item_2',
              orderId: 'ord_2',
              productId: '2',
              quantity: 500,
              unitPrice: 25,
              totalPrice: 12500,
              createdAt: '2024-01-15T09:00:00Z'
            }
          ]
        }
      ]

      setOrders(mockOrders)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }, [])

  const createOrder = useCallback(async (cartItems: CartItem[], shippingAddress: string, billingAddress?: string) => {
    setLoading(true)
    setError(null)

    try {
      // Calculate total amount
      const totalAmount = cartItems.reduce((sum, item) => {
        return sum + (item.product?.price || 0) * item.quantity
      }, 0)

      // Group items by supplier
      const supplierGroups = cartItems.reduce((groups, item) => {
        if (!groups[item.supplierId]) {
          groups[item.supplierId] = []
        }
        groups[item.supplierId].push(item)
        return groups
      }, {} as Record<string, CartItem[]>)

      // Create separate orders for each supplier
      const newOrders: Order[] = []

      for (const [supplierId, items] of Object.entries(supplierGroups)) {
        const supplierTotal = items.reduce((sum, item) => {
          return sum + (item.product?.price || 0) * item.quantity
        }, 0)

        const orderId = `ord_${Date.now()}_${supplierId}`
        
        const orderItems: OrderItem[] = items.map((item, index) => ({
          id: `item_${orderId}_${index}`,
          orderId,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.product?.price || 0,
          totalPrice: (item.product?.price || 0) * item.quantity,
          specifications: item.specifications,
          createdAt: new Date().toISOString(),
          product: item.product
        }))

        const order: Order = {
          id: orderId,
          userId: 'current_user_id', // This would come from auth context
          supplierId,
          status: 'pending',
          totalAmount: supplierTotal,
          currency: 'SAR',
          shippingAddress,
          billingAddress,
          paymentStatus: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          items: orderItems
        }

        newOrders.push(order)
      }

      // In real implementation, save to database
      setOrders(prev => [...newOrders, ...prev])
      
      return { success: true, orders: newOrders }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create order')
      return { success: false, error: err instanceof Error ? err.message : 'Failed to create order' }
    } finally {
      setLoading(false)
    }
  }, [])

  const updateOrderStatus = useCallback(async (orderId: string, status: Order['status']) => {
    try {
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, status, updatedAt: new Date().toISOString() }
          : order
      ))
      return { success: true }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update order status')
      return { success: false, error: err instanceof Error ? err.message : 'Failed to update order status' }
    }
  }, [])

  const cancelOrder = useCallback(async (orderId: string) => {
    return updateOrderStatus(orderId, 'cancelled')
  }, [updateOrderStatus])

  return {
    orders,
    loading,
    error,
    getUserOrders,
    createOrder,
    updateOrderStatus,
    cancelOrder
  }
}