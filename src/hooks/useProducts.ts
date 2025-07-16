import { useState, useEffect, useCallback } from 'react'
import { blink } from '../blink/client'
import type { Product, SearchFilters } from '../types'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalCount, setTotalCount] = useState(0)

  const searchProducts = useCallback(async (filters: SearchFilters = {}) => {
    setLoading(true)
    setError(null)

    try {
      // Since we can't use the database directly, we'll simulate with mock data
      // In a real implementation, this would query the products table
      const mockProducts: Product[] = [
        {
          id: '1',
          supplierId: 'sup1',
          name: 'Industrial LED Lighting Systems',
          nameAr: 'أنظمة الإضاءة LED الصناعية',
          description: 'High-efficiency LED lighting systems for industrial applications.',
          category: 'electronics',
          price: 450,
          currency: 'SAR',
          minOrderQuantity: 100,
          unit: 'units',
          availabilityStatus: 'available',
          images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop'],
          tags: ['LED', 'industrial', 'lighting'],
          featured: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          supplierId: 'sup2',
          name: 'Premium Cotton Fabrics',
          nameAr: 'أقمشة قطنية فاخرة',
          description: '100% premium cotton fabrics in various colors and patterns.',
          category: 'textiles',
          price: 25,
          currency: 'SAR',
          minOrderQuantity: 500,
          unit: 'meters',
          availabilityStatus: 'available',
          images: ['https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=200&fit=crop'],
          tags: ['cotton', 'fabric', 'premium'],
          featured: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '3',
          supplierId: 'sup3',
          name: 'Organic Dates Premium',
          nameAr: 'تمور عضوية فاخرة',
          description: 'Premium organic dates sourced from the finest farms in Saudi Arabia.',
          category: 'food-beverages',
          price: 120,
          currency: 'SAR',
          minOrderQuantity: 50,
          unit: 'kg',
          availabilityStatus: 'available',
          images: ['https://images.unsplash.com/photo-1609501676725-7186f734b2e1?w=300&h=200&fit=crop'],
          tags: ['dates', 'organic', 'premium'],
          featured: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '4',
          supplierId: 'sup4',
          name: 'Steel Reinforcement Bars',
          nameAr: 'قضبان التسليح الفولاذية',
          description: 'High-grade steel reinforcement bars for construction projects.',
          category: 'construction',
          price: 2800,
          currency: 'SAR',
          minOrderQuantity: 5,
          unit: 'tons',
          availabilityStatus: 'available',
          images: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=200&fit=crop'],
          tags: ['steel', 'construction', 'reinforcement'],
          featured: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '5',
          supplierId: 'sup5',
          name: 'Automotive Brake Systems',
          nameAr: 'أنظمة الفرامل للسيارات',
          description: 'Complete brake systems for various vehicle models.',
          category: 'automotive',
          price: 850,
          currency: 'SAR',
          minOrderQuantity: 20,
          unit: 'sets',
          availabilityStatus: 'available',
          images: ['https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop'],
          tags: ['automotive', 'brakes', 'systems'],
          featured: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '6',
          supplierId: 'sup6',
          name: 'Medical Surgical Instruments',
          nameAr: 'أدوات جراحية طبية',
          description: 'Professional surgical instruments for medical facilities.',
          category: 'healthcare',
          price: 1200,
          currency: 'SAR',
          minOrderQuantity: 10,
          unit: 'sets',
          availabilityStatus: 'available',
          images: ['https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop'],
          tags: ['medical', 'surgical', 'instruments'],
          featured: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]

      // Apply filters
      let filteredProducts = mockProducts

      if (filters.query) {
        const query = filters.query.toLowerCase()
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(query) ||
          product.nameAr?.includes(query) ||
          product.description?.toLowerCase().includes(query) ||
          product.tags.some(tag => tag.toLowerCase().includes(query))
        )
      }

      if (filters.category && filters.category !== 'all') {
        filteredProducts = filteredProducts.filter(product =>
          product.category === filters.category
        )
      }

      if (filters.minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(product =>
          product.price >= filters.minPrice!
        )
      }

      if (filters.maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(product =>
          product.price <= filters.maxPrice!
        )
      }

      // Apply sorting
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'price_asc':
            filteredProducts.sort((a, b) => a.price - b.price)
            break
          case 'price_desc':
            filteredProducts.sort((a, b) => b.price - a.price)
            break
          case 'newest':
            filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            break
          default:
            // Keep original order for relevance
            break
        }
      }

      // Apply pagination
      const page = filters.page || 1
      const limit = filters.limit || 12
      const startIndex = (page - 1) * limit
      const paginatedProducts = filteredProducts.slice(startIndex, startIndex + limit)

      setProducts(paginatedProducts)
      setTotalCount(filteredProducts.length)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search products')
    } finally {
      setLoading(false)
    }
  }, [])

  const getProductById = useCallback(async (id: string): Promise<Product | null> => {
    try {
      // In a real implementation, this would query the database
      const mockProducts: Product[] = [
        {
          id: '1',
          supplierId: 'sup1',
          name: 'Industrial LED Lighting Systems',
          nameAr: 'أنظمة الإضاءة LED الصناعية',
          description: 'High-efficiency LED lighting systems for industrial applications.',
          category: 'electronics',
          price: 450,
          currency: 'SAR',
          minOrderQuantity: 100,
          unit: 'units',
          availabilityStatus: 'available',
          images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop'],
          tags: ['LED', 'industrial', 'lighting'],
          featured: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
      
      return mockProducts.find(p => p.id === id) || null
    } catch (err) {
      console.error('Failed to get product:', err)
      return null
    }
  }, [])

  return {
    products,
    loading,
    error,
    totalCount,
    searchProducts,
    getProductById
  }
}