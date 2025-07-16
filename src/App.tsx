import { useState, useEffect } from 'react'
import { Search, Menu, Globe, ShoppingCart, Star, MapPin, Phone, Mail, Plus, Filter, Grid, List, User, LogOut, CreditCard } from 'lucide-react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'
import { Textarea } from './components/ui/textarea'
import { Label } from './components/ui/label'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar'
import { SearchBar } from './components/SearchBar'
import { CartDrawer } from './components/CartDrawer'
import { SupplierDashboard } from './components/SupplierDashboard'
import { useAuth } from './hooks/useAuth'
import { useProducts } from './hooks/useProducts'
import { useCart } from './hooks/useCart'
import { useOrders } from './hooks/useOrders'
import type { SearchFilters, CartItem } from './types'

interface Supplier {
  id: string
  name: string
  nameAr: string
  category: string
  rating: number
  reviews: number
  location: string
  verified: boolean
  products: number
  image: string
  description?: string
}

interface Product {
  id: string
  name: string
  nameAr: string
  supplier: string
  price: string
  minOrder: string
  image: string
  category: string
  description?: string
}

function App() {
  const [language, setLanguage] = useState<'ar' | 'en'>('en')
  const [currentView, setCurrentView] = useState<'home' | 'suppliers' | 'products' | 'dashboard' | 'supplier-dashboard' | 'checkout'>('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({})

  // Hooks
  const { user, isLoading, login, logout } = useAuth()
  const { products, loading: productsLoading, searchProducts } = useProducts()
  const { addToCart } = useCart()
  const { createOrder } = useOrders()

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en')
  }

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(filters)
    searchProducts(filters)
    setCurrentView('products')
  }

  const handleAddToCart = (product: any, quantity: number = 1) => {
    const productData = {
      id: product.id,
      supplierId: product.supplierId || 'sup_1',
      name: product.name,
      nameAr: product.nameAr,
      description: product.description,
      category: product.category,
      price: typeof product.price === 'string' ? parseFloat(product.price.replace(/[^\d.]/g, '')) : product.price,
      currency: 'SAR',
      minOrderQuantity: typeof product.minOrder === 'string' ? parseInt(product.minOrder) : product.minOrderQuantity || 1,
      unit: product.unit || 'units',
      availabilityStatus: 'available' as const,
      images: [product.image],
      tags: [],
      featured: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    addToCart(productData, quantity)
  }

  const handleCheckout = (cartItems: CartItem[]) => {
    setCurrentView('checkout')
  }

  // Load products on mount
  useEffect(() => {
    searchProducts({})
  }, [])

  const categories = [
    { id: 'all', name: 'All Categories', nameAr: 'جميع الفئات', count: 3865 },
    { id: 'electronics', name: 'Electronics', nameAr: 'الإلكترونيات', count: 1250 },
    { id: 'textiles', name: 'Textiles', nameAr: 'المنسوجات', count: 890 },
    { id: 'food-beverages', name: 'Food & Beverages', nameAr: 'الأغذية والمشروبات', count: 650 },
    { id: 'construction', name: 'Construction', nameAr: 'البناء والتشييد', count: 420 },
    { id: 'automotive', name: 'Automotive', nameAr: 'السيارات', count: 380 },
    { id: 'healthcare', name: 'Healthcare', nameAr: 'الرعاية الصحية', count: 290 }
  ]

  const featuredSuppliers: Supplier[] = [
    {
      id: '1',
      name: 'Al-Riyadh Electronics Co.',
      nameAr: 'شركة الرياض للإلكترونيات',
      category: 'Electronics',
      rating: 4.8,
      reviews: 156,
      location: 'Riyadh Industrial City',
      verified: true,
      products: 245,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
      description: 'Leading supplier of industrial electronics and automation systems in Saudi Arabia.'
    },
    {
      id: '2',
      name: 'Saudi Textile Industries',
      nameAr: 'الصناعات النسيجية السعودية',
      category: 'Textiles',
      rating: 4.6,
      reviews: 89,
      location: 'King Abdullah Economic City',
      verified: true,
      products: 180,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      description: 'Premium textile manufacturer specializing in high-quality fabrics and materials.'
    },
    {
      id: '3',
      name: 'Gulf Food Distributors',
      nameAr: 'موزعو الأغذية الخليجية',
      category: 'Food & Beverages',
      rating: 4.9,
      reviews: 203,
      location: 'Riyadh Food Complex',
      verified: true,
      products: 320,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
      description: 'Trusted distributor of premium food products and beverages across the Gulf region.'
    },
    {
      id: '4',
      name: 'Modern Construction Supply',
      nameAr: 'إمدادات البناء الحديثة',
      category: 'Construction',
      rating: 4.7,
      reviews: 134,
      location: 'Riyadh Construction Hub',
      verified: true,
      products: 156,
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop',
      description: 'Complete construction materials and equipment supplier for major projects.'
    }
  ]

  const recentProducts: Product[] = [
    {
      id: '1',
      name: 'Industrial LED Lighting Systems',
      nameAr: 'أنظمة الإضاءة LED الصناعية',
      supplier: 'Al-Riyadh Electronics Co.',
      price: 'SAR 450',
      minOrder: '100 units',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
      category: 'Electronics',
      description: 'High-efficiency LED lighting systems for industrial applications.'
    },
    {
      id: '2',
      name: 'Premium Cotton Fabrics',
      nameAr: 'أقمشة قطنية فاخرة',
      supplier: 'Saudi Textile Industries',
      price: 'SAR 25/meter',
      minOrder: '500 meters',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=200&fit=crop',
      category: 'Textiles',
      description: '100% premium cotton fabrics in various colors and patterns.'
    },
    {
      id: '3',
      name: 'Organic Dates Premium',
      nameAr: 'تمور عضوية فاخرة',
      supplier: 'Gulf Food Distributors',
      price: 'SAR 120/kg',
      minOrder: '50 kg',
      image: 'https://images.unsplash.com/photo-1609501676725-7186f734b2e1?w=300&h=200&fit=crop',
      category: 'Food & Beverages',
      description: 'Premium organic dates sourced from the finest farms in Saudi Arabia.'
    },
    {
      id: '4',
      name: 'Steel Reinforcement Bars',
      nameAr: 'قضبان التسليح الفولاذية',
      supplier: 'Modern Construction Supply',
      price: 'SAR 2,800/ton',
      minOrder: '5 tons',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=200&fit=crop',
      category: 'Construction',
      description: 'High-grade steel reinforcement bars for construction projects.'
    },
    {
      id: '5',
      name: 'Automotive Brake Systems',
      nameAr: 'أنظمة الفرامل للسيارات',
      supplier: 'Gulf Auto Parts',
      price: 'SAR 850/set',
      minOrder: '20 sets',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop',
      category: 'Automotive',
      description: 'Complete brake systems for various vehicle models.'
    },
    {
      id: '6',
      name: 'Medical Surgical Instruments',
      nameAr: 'أدوات جراحية طبية',
      supplier: 'HealthCare Solutions',
      price: 'SAR 1,200/set',
      minOrder: '10 sets',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
      category: 'Healthcare',
      description: 'Professional surgical instruments for medical facilities.'
    }
  ]

  const filteredProducts = recentProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.nameAr.includes(searchQuery) ||
                         product.supplier.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory
    return matchesSearch && matchesCategory
  })

  const filteredSuppliers = featuredSuppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         supplier.nameAr.includes(searchQuery) ||
                         supplier.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || supplier.category.toLowerCase() === selectedCategory
    return matchesSearch && matchesCategory
  })

  const SupplierRegistrationForm = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gradient-primary text-white">
          <Plus className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
          {language === 'en' ? 'Join as Supplier' : 'انضم كمورد'}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-gradient">
            {language === 'en' ? 'Supplier Registration' : 'تسجيل المورد'}
          </DialogTitle>
          <DialogDescription>
            {language === 'en' 
              ? 'Join Tahweela marketplace and connect with buyers across Saudi Arabia'
              : 'انضم إلى سوق تحويلة وتواصل مع المشترين في جميع أنحاء المملكة العربية السعودية'
            }
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">
                {language === 'en' ? 'Company Name (English)' : 'اسم الشركة (بالإنجليزية)'}
              </Label>
              <Input id="companyName" placeholder="Enter company name" />
            </div>
            <div>
              <Label htmlFor="companyNameAr">
                {language === 'en' ? 'Company Name (Arabic)' : 'اسم الشركة (بالعربية)'}
              </Label>
              <Input id="companyNameAr" placeholder="أدخل اسم الشركة" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">
                {language === 'en' ? 'Business Category' : 'فئة العمل'}
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'en' ? 'Select category' : 'اختر الفئة'} />
                </SelectTrigger>
                <SelectContent>
                  {categories.slice(1).map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {language === 'en' ? category.name : category.nameAr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="location">
                {language === 'en' ? 'Location' : 'الموقع'}
              </Label>
              <Input id="location" placeholder={language === 'en' ? 'City, Saudi Arabia' : 'المدينة، المملكة العربية السعودية'} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">
                {language === 'en' ? 'Phone Number' : 'رقم الهاتف'}
              </Label>
              <Input id="phone" placeholder="+966 XX XXX XXXX" />
            </div>
            <div>
              <Label htmlFor="email">
                {language === 'en' ? 'Business Email' : 'البريد الإلكتروني للعمل'}
              </Label>
              <Input id="email" type="email" placeholder="business@company.com" />
            </div>
          </div>

          <div>
            <Label htmlFor="description">
              {language === 'en' ? 'Company Description' : 'وصف الشركة'}
            </Label>
            <Textarea 
              id="description" 
              placeholder={language === 'en' 
                ? 'Describe your company, products, and services...'
                : 'اوصف شركتك ومنتجاتك وخدماتك...'
              }
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="website">
              {language === 'en' ? 'Website (Optional)' : 'الموقع الإلكتروني (اختياري)'}
            </Label>
            <Input id="website" placeholder="https://www.company.com" />
          </div>

          <Button className="w-full gradient-primary text-white">
            {language === 'en' ? 'Submit Application' : 'إرسال الطلب'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )

  const ProductDetailModal = ({ product }: { product: Product }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          {language === 'en' ? 'View Details' : 'عرض التفاصيل'}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-gradient">
            {language === 'en' ? product.name : product.nameAr}
          </DialogTitle>
          <DialogDescription>
            {language === 'en' ? 'Supplied by' : 'يوفره'} {product.supplier}
          </DialogDescription>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">
                {language === 'en' ? 'Product Details' : 'تفاصيل المنتج'}
              </h3>
              <p className="text-muted-foreground">
                {product.description || (language === 'en' 
                  ? 'High-quality product from verified supplier.'
                  : 'منتج عالي الجودة من مورد معتمد.'
                )}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">
                  {language === 'en' ? 'Price' : 'السعر'}
                </Label>
                <p className="text-2xl font-bold text-gradient">{product.price}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">
                  {language === 'en' ? 'Minimum Order' : 'الحد الأدنى للطلب'}
                </Label>
                <p className="text-lg">{product.minOrder}</p>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">
                {language === 'en' ? 'Category' : 'الفئة'}
              </Label>
              <Badge variant="secondary" className="mt-1">{product.category}</Badge>
            </div>

            <div className="flex space-x-2 rtl:space-x-reverse">
              <Button className="flex-1 gradient-primary text-white">
                {language === 'en' ? 'Request Quote' : 'طلب عرض سعر'}
              </Button>
              <Button variant="outline" className="flex-1">
                {language === 'en' ? 'Contact Supplier' : 'اتصل بالمورد'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  const MobileMenu = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <div className="flex flex-col space-y-6 mt-6">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/logo.png" alt="Tahweela" className="h-8 w-auto" />
            <span className="text-xl font-bold text-gradient">تحويلة</span>
          </div>
          
          {user && (
            <div className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-muted rounded-lg">
              <Avatar>
                <AvatarFallback>{user.displayName?.[0] || user.email[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user.displayName || user.email}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Verified User' : 'مستخدم معتمد'}
                </p>
              </div>
            </div>
          )}
          
          <nav className="flex flex-col space-y-4">
            <Button 
              variant="ghost" 
              className="justify-start"
              onClick={() => setCurrentView('home')}
            >
              {language === 'en' ? 'Home' : 'الرئيسية'}
            </Button>
            <Button 
              variant="ghost" 
              className="justify-start"
              onClick={() => setCurrentView('suppliers')}
            >
              {language === 'en' ? 'Suppliers' : 'الموردين'}
            </Button>
            <Button 
              variant="ghost" 
              className="justify-start"
              onClick={() => setCurrentView('products')}
            >
              {language === 'en' ? 'Products' : 'المنتجات'}
            </Button>
            {user && (
              <Button 
                variant="ghost" 
                className="justify-start"
                onClick={() => setCurrentView('dashboard')}
              >
                {language === 'en' ? 'Dashboard' : 'لوحة التحكم'}
              </Button>
            )}
          </nav>
          
          <div className="flex flex-col space-y-3">
            {user ? (
              <>
                <SupplierRegistrationForm />
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                  {language === 'en' ? 'Sign Out' : 'تسجيل الخروج'}
                </Button>
              </>
            ) : (
              <>
                <SupplierRegistrationForm />
                <Button variant="outline" onClick={handleLogin}>
                  {language === 'en' ? 'Sign In' : 'تسجيل الدخول'}
                </Button>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            {language === 'en' ? 'Loading Tahweela...' : 'جاري تحميل تحويلة...'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="/logo.png" alt="Tahweela" className="h-10 w-auto" />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gradient">تحويلة</h1>
                <p className="text-xs text-muted-foreground">TAHWEELA</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
              <Button 
                variant="ghost" 
                onClick={() => setCurrentView('home')}
                className={currentView === 'home' ? 'text-primary' : ''}
              >
                {language === 'en' ? 'Home' : 'الرئيسية'}
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setCurrentView('suppliers')}
                className={currentView === 'suppliers' ? 'text-primary' : ''}
              >
                {language === 'en' ? 'Suppliers' : 'الموردين'}
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setCurrentView('products')}
                className={currentView === 'products' ? 'text-primary' : ''}
              >
                {language === 'en' ? 'Products' : 'المنتجات'}
              </Button>
              {user && (
                <Button 
                  variant="ghost" 
                  onClick={() => setCurrentView('dashboard')}
                  className={currentView === 'dashboard' ? 'text-primary' : ''}
                >
                  {language === 'en' ? 'Dashboard' : 'لوحة التحكم'}
                </Button>
              )}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLanguage}
                className="hidden sm:flex"
              >
                <Globe className="h-4 w-4" />
              </Button>
              
              <CartDrawer language={language} onCheckout={handleCheckout} />
              
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="hidden md:flex items-center space-x-2 rtl:space-x-reverse">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{user.displayName?.[0] || user.email[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="hidden lg:block">{user.displayName || user.email}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setCurrentView('dashboard')}>
                      <User className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                      {language === 'en' ? 'Dashboard' : 'لوحة التحكم'}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setCurrentView('supplier-dashboard')}>
                      <ShoppingCart className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                      {language === 'en' ? 'Supplier Dashboard' : 'لوحة المورد'}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                      {language === 'en' ? 'Sign Out' : 'تسجيل الخروج'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="hidden md:flex items-center space-x-2 rtl:space-x-reverse">
                  <SupplierRegistrationForm />
                  <Button variant="outline" onClick={login}>
                    {language === 'en' ? 'Sign In' : 'تسجيل الدخول'}
                  </Button>
                </div>
              )}
              
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {currentView === 'home' && (
        <>
          {/* Hero Section */}
          <section className="gradient-primary-soft py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
                {language === 'en' 
                  ? 'Riyadh\'s Premier Wholesale Marketplace' 
                  : 'السوق الرائد للجملة في الرياض'
                }
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                {language === 'en'
                  ? 'Connect with verified suppliers, discover quality products, and grow your business in Saudi Arabia\'s largest wholesale network.'
                  : 'تواصل مع الموردين المعتمدين، اكتشف المنتجات عالية الجودة، وانمِ عملك في أكبر شبكة للجملة في المملكة العربية السعودية.'
                }
              </p>
              
              {/* Search Bar */}
              <div className="max-w-4xl mx-auto mb-8">
                <SearchBar 
                  onSearch={handleSearch}
                  language={language}
                  initialFilters={searchFilters}
                />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient">2,500+</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Verified Suppliers' : 'مورد معتمد'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient">15,000+</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Products' : 'منتج'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient">50+</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Categories' : 'فئة'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient">1M+</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Monthly Orders' : 'طلب شهري'}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gradient mb-4">
                  {language === 'en' ? 'Browse Categories' : 'تصفح الفئات'}
                </h2>
                <p className="text-muted-foreground">
                  {language === 'en' 
                    ? 'Discover products across various industries' 
                    : 'اكتشف المنتجات عبر مختلف الصناعات'
                  }
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.slice(1).map((category, index) => (
                  <Card 
                    key={index} 
                    className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-gradient"
                    onClick={() => {
                      setSelectedCategory(category.id)
                      setCurrentView('products')
                    }}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 gradient-primary rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <div className="w-6 h-6 bg-white rounded"></div>
                      </div>
                      <h3 className="font-semibold mb-2">
                        {language === 'en' ? category.name : category.nameAr}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {category.count.toLocaleString()} {language === 'en' ? 'products' : 'منتج'}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Suppliers */}
          <section className="py-16 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gradient mb-4">
                  {language === 'en' ? 'Featured Suppliers' : 'الموردون المميزون'}
                </h2>
                <p className="text-muted-foreground">
                  {language === 'en' 
                    ? 'Connect with top-rated suppliers in Riyadh' 
                    : 'تواصل مع أفضل الموردين في الرياض'
                  }
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {featuredSuppliers.map((supplier) => (
                  <Card key={supplier.id} className="hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="aspect-video relative">
                      <img 
                        src={supplier.image} 
                        alt={supplier.name}
                        className="w-full h-full object-cover"
                      />
                      {supplier.verified && (
                        <Badge className="absolute top-4 right-4 gradient-primary text-white">
                          {language === 'en' ? 'Verified' : 'معتمد'}
                        </Badge>
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            {language === 'en' ? supplier.name : supplier.nameAr}
                          </CardTitle>
                          <CardDescription className="flex items-center mt-2">
                            <MapPin className="h-4 w-4 mr-1 rtl:mr-0 rtl:ml-1" />
                            {supplier.location}
                          </CardDescription>
                        </div>
                        <div className="text-right rtl:text-left">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1 rtl:mr-0 rtl:ml-1" />
                            <span className="font-semibold">{supplier.rating}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {supplier.reviews} {language === 'en' ? 'reviews' : 'تقييم'}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="secondary">{supplier.category}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {supplier.products} {language === 'en' ? 'products' : 'منتج'}
                        </span>
                      </div>
                      <Button className="w-full gradient-primary text-white">
                        {language === 'en' ? 'View Profile' : 'عرض الملف الشخصي'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Recent Products */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gradient mb-4">
                  {language === 'en' ? 'Latest Products' : 'أحدث المنتجات'}
                </h2>
                <p className="text-muted-foreground">
                  {language === 'en' 
                    ? 'Discover the newest additions to our marketplace' 
                    : 'اكتشف أحدث الإضافات إلى السوق'
                  }
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentProducts.slice(0, 6).map((product) => (
                  <Card key={product.id} className="hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="aspect-video relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {language === 'en' ? product.name : product.nameAr}
                      </CardTitle>
                      <CardDescription>{product.supplier}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-gradient">{product.price}</span>
                        <Badge variant="outline">
                          {language === 'en' ? 'Min:' : 'الحد الأدنى:'} {product.minOrder}
                        </Badge>
                      </div>
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Button 
                          className="flex-1 gradient-primary text-white"
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                          {language === 'en' ? 'Add to Cart' : 'أضف للسلة'}
                        </Button>
                        <ProductDetailModal product={product} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {currentView === 'products' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gradient">
                {language === 'en' ? 'Products' : 'المنتجات'}
              </h1>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
              <SearchBar 
                onSearch={handleSearch}
                language={language}
                initialFilters={searchFilters}
              />
            </div>

            {/* Loading State */}
            {productsLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {/* Products Grid */}
            {!productsLoading && (
              <div className={viewMode === 'grid' 
                ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
              }>
                {products.map((product) => (
                viewMode === 'grid' ? (
                  <Card key={product.id} className="hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="aspect-video relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {language === 'en' ? product.name : product.nameAr || product.name}
                      </CardTitle>
                      <CardDescription>
                        {product.supplier?.companyName || 'Supplier'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-gradient">
                          {product.price} {product.currency}
                        </span>
                        <Badge variant="outline">
                          {language === 'en' ? 'Min:' : 'الحد الأدنى:'} {product.minOrderQuantity} {product.unit}
                        </Badge>
                      </div>
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Button 
                          className="flex-1 gradient-primary text-white"
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                          {language === 'en' ? 'Add to Cart' : 'أضف للسلة'}
                        </Button>
                        <ProductDetailModal product={product} />
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card key={product.id} className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">
                            {language === 'en' ? product.name : product.nameAr || product.name}
                          </h3>
                          <p className="text-muted-foreground">
                            {product.supplier?.companyName || 'Supplier'}
                          </p>
                          <div className="flex items-center space-x-4 rtl:space-x-reverse mt-2">
                            <span className="text-xl font-bold text-gradient">
                              {product.price} {product.currency}
                            </span>
                            <Badge variant="outline">
                              {language === 'en' ? 'Min:' : 'الحد الأدنى:'} {product.minOrderQuantity} {product.unit}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Button 
                            className="gradient-primary text-white"
                            onClick={() => handleAddToCart(product)}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                            {language === 'en' ? 'Add to Cart' : 'أضف للسلة'}
                          </Button>
                          <ProductDetailModal product={product} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              ))}
            </div>

              </div>
            )}

            {!productsLoading && products.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  {language === 'en' 
                    ? 'No products found matching your search criteria.'
                    : 'لم يتم العثور على منتجات تطابق معايير البحث الخاصة بك.'
                  }
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {currentView === 'suppliers' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gradient">
                {language === 'en' ? 'Suppliers' : 'الموردون'}
              </h1>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {language === 'en' ? category.name : category.nameAr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-md">
                <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder={language === 'en' ? 'Search suppliers...' : 'ابحث عن الموردين...'}
                  className="pl-10 rtl:pl-4 rtl:pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Suppliers Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSuppliers.map((supplier) => (
                <Card key={supplier.id} className="hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="aspect-video relative">
                    <img 
                      src={supplier.image} 
                      alt={supplier.name}
                      className="w-full h-full object-cover"
                    />
                    {supplier.verified && (
                      <Badge className="absolute top-4 right-4 gradient-primary text-white">
                        {language === 'en' ? 'Verified' : 'معتمد'}
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {language === 'en' ? supplier.name : supplier.nameAr}
                        </CardTitle>
                        <CardDescription className="flex items-center mt-2">
                          <MapPin className="h-4 w-4 mr-1 rtl:mr-0 rtl:ml-1" />
                          {supplier.location}
                        </CardDescription>
                      </div>
                      <div className="text-right rtl:text-left">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1 rtl:mr-0 rtl:ml-1" />
                          <span className="font-semibold">{supplier.rating}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {supplier.reviews} {language === 'en' ? 'reviews' : 'تقييم'}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {supplier.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary">{supplier.category}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {supplier.products} {language === 'en' ? 'products' : 'منتج'}
                      </span>
                    </div>
                    <Button className="w-full gradient-primary text-white">
                      {language === 'en' ? 'View Profile' : 'عرض الملف الشخصي'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredSuppliers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  {language === 'en' 
                    ? 'No suppliers found matching your search criteria.'
                    : 'لم يتم العثور على موردين يطابقون معايير البحث الخاصة بك.'
                  }
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {currentView === 'supplier-dashboard' && user && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SupplierDashboard language={language} />
          </div>
        </section>
      )}

      {currentView === 'checkout' && (
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gradient mb-2">
                {language === 'en' ? 'Checkout' : 'الدفع'}
              </h1>
              <p className="text-muted-foreground">
                {language === 'en' 
                  ? 'Complete your order securely'
                  : 'أكمل طلبك بأمان'
                }
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 rtl:mr-0 rtl:ml-2" />
                  {language === 'en' ? 'Payment Processing' : 'معالجة الدفع'}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center py-12">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                    <CreditCard className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">
                    {language === 'en' ? 'Stripe Integration Ready' : 'تكامل Stripe جاهز'}
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    {language === 'en' 
                      ? 'Secure payment processing with Stripe will be integrated here. This includes order confirmation, payment processing, and receipt generation.'
                      : 'سيتم دمج معالجة الدفع الآمنة مع Stripe هنا. يشمل ذلك تأكيد الطلب ومعالجة الدفع وإنشاء الإيصال.'
                    }
                  </p>
                  <div className="flex justify-center space-x-4 rtl:space-x-reverse mt-6">
                    <Button 
                      variant="outline"
                      onClick={() => setCurrentView('home')}
                    >
                      {language === 'en' ? 'Continue Shopping' : 'متابعة التسوق'}
                    </Button>
                    <Button className="gradient-primary text-white">
                      {language === 'en' ? 'Process Payment' : 'معالجة الدفع'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {currentView === 'dashboard' && user && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gradient mb-2">
                {language === 'en' ? 'Dashboard' : 'لوحة التحكم'}
              </h1>
              <p className="text-muted-foreground">
                {language === 'en' 
                  ? `Welcome back, ${user.displayName || user.email}!`
                  : `مرحباً بعودتك، ${user.displayName || user.email}!`
                }
              </p>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">
                  {language === 'en' ? 'Overview' : 'نظرة عامة'}
                </TabsTrigger>
                <TabsTrigger value="orders">
                  {language === 'en' ? 'Orders' : 'الطلبات'}
                </TabsTrigger>
                <TabsTrigger value="favorites">
                  {language === 'en' ? 'Favorites' : 'المفضلة'}
                </TabsTrigger>
                <TabsTrigger value="profile">
                  {language === 'en' ? 'Profile' : 'الملف الشخصي'}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {language === 'en' ? 'Total Orders' : 'إجمالي الطلبات'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gradient">12</div>
                      <p className="text-xs text-muted-foreground">
                        {language === 'en' ? '+2 from last month' : '+2 من الشهر الماضي'}
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {language === 'en' ? 'Pending Quotes' : 'عروض الأسعار المعلقة'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gradient">5</div>
                      <p className="text-xs text-muted-foreground">
                        {language === 'en' ? 'Awaiting response' : 'في انتظار الرد'}
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {language === 'en' ? 'Favorite Suppliers' : 'الموردون المفضلون'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gradient">8</div>
                      <p className="text-xs text-muted-foreground">
                        {language === 'en' ? 'Verified partners' : 'شركاء معتمدون'}
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {language === 'en' ? 'Total Spent' : 'إجمالي المصروفات'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gradient">SAR 45,230</div>
                      <p className="text-xs text-muted-foreground">
                        {language === 'en' ? 'This year' : 'هذا العام'}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === 'en' ? 'Recent Activity' : 'النشاط الأخير'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm">
                            {language === 'en' 
                              ? 'Quote received from Al-Riyadh Electronics Co.'
                              : 'تم استلام عرض سعر من شركة الرياض للإلكترونيات'
                            }
                          </p>
                          <p className="text-xs text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm">
                            {language === 'en' 
                              ? 'Order #12345 shipped'
                              : 'تم شحن الطلب رقم #12345'
                            }
                          </p>
                          <p className="text-xs text-muted-foreground">1 day ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm">
                            {language === 'en' 
                              ? 'New supplier added to favorites'
                              : 'تم إضافة مورد جديد إلى المفضلة'
                            }
                          </p>
                          <p className="text-xs text-muted-foreground">3 days ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === 'en' ? 'Order History' : 'تاريخ الطلبات'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        {language === 'en' 
                          ? 'No orders yet. Start browsing products to place your first order!'
                          : 'لا توجد طلبات بعد. ابدأ في تصفح المنتجات لتقديم طلبك الأول!'
                        }
                      </p>
                      <Button 
                        className="mt-4 gradient-primary text-white"
                        onClick={() => setCurrentView('products')}
                      >
                        {language === 'en' ? 'Browse Products' : 'تصفح المنتجات'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="favorites">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === 'en' ? 'Favorite Suppliers' : 'الموردون المفضلون'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        {language === 'en' 
                          ? 'No favorite suppliers yet. Add suppliers to your favorites for quick access!'
                          : 'لا توجد موردون مفضلون بعد. أضف الموردين إلى مفضلتك للوصول السريع!'
                        }
                      </p>
                      <Button 
                        className="mt-4 gradient-primary text-white"
                        onClick={() => setCurrentView('suppliers')}
                      >
                        {language === 'en' ? 'Browse Suppliers' : 'تصفح الموردين'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === 'en' ? 'Profile Settings' : 'إعدادات الملف الشخصي'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <Avatar className="h-20 w-20">
                        <AvatarFallback className="text-2xl">
                          {user.displayName?.[0] || user.email[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">{user.displayName || user.email}</h3>
                        <p className="text-muted-foreground">{user.email}</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          {language === 'en' ? 'Change Avatar' : 'تغيير الصورة'}
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="displayName">
                          {language === 'en' ? 'Display Name' : 'الاسم المعروض'}
                        </Label>
                        <Input 
                          id="displayName" 
                          defaultValue={user.displayName || ''} 
                          placeholder={language === 'en' ? 'Enter your name' : 'أدخل اسمك'}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">
                          {language === 'en' ? 'Phone Number' : 'رقم الهاتف'}
                        </Label>
                        <Input 
                          id="phone" 
                          placeholder="+966 XX XXX XXXX" 
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="company">
                        {language === 'en' ? 'Company Name' : 'اسم الشركة'}
                      </Label>
                      <Input 
                        id="company" 
                        placeholder={language === 'en' ? 'Enter your company name' : 'أدخل اسم شركتك'}
                      />
                    </div>

                    <Button className="gradient-primary text-white">
                      {language === 'en' ? 'Save Changes' : 'حفظ التغييرات'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                <img src="/logo.png" alt="Tahweela" className="h-10 w-auto brightness-0 invert" />
                <div>
                  <h3 className="text-xl font-bold">تحويلة</h3>
                  <p className="text-sm opacity-80">TAHWEELA</p>
                </div>
              </div>
              <p className="text-sm opacity-80 mb-4">
                {language === 'en'
                  ? 'Connecting businesses across Saudi Arabia through our comprehensive wholesale marketplace.'
                  : 'ربط الشركات في جميع أنحاء المملكة العربية السعودية من خلال السوق الشامل للجملة.'
                }
              </p>
              <div className="flex space-x-4 rtl:space-x-reverse">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                  <span className="text-sm">+966 11 123 4567</span>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <Mail className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                <span className="text-sm">info@tahweela.sa</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">
                {language === 'en' ? 'For Suppliers' : 'للموردين'}
              </h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#" className="hover:opacity-100 transition-opacity">
                  {language === 'en' ? 'Join as Supplier' : 'انضم كمورد'}
                </a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">
                  {language === 'en' ? 'Supplier Dashboard' : 'لوحة المورد'}
                </a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">
                  {language === 'en' ? 'Verification Process' : 'عملية التحقق'}
                </a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">
                  {language === 'en' ? 'Success Stories' : 'قصص النجاح'}
                </a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">
                {language === 'en' ? 'For Buyers' : 'للمشترين'}
              </h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#" className="hover:opacity-100 transition-opacity">
                  {language === 'en' ? 'Browse Products' : 'تصفح المنتجات'}
                </a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">
                  {language === 'en' ? 'Find Suppliers' : 'البحث عن الموردين'}
                </a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">
                  {language === 'en' ? 'Request Quotes' : 'طلب عروض الأسعار'}
                </a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">
                  {language === 'en' ? 'Order Management' : 'إدارة الطلبات'}
                </a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">
                {language === 'en' ? 'Support' : 'الدعم'}
              </h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#" className="hover:opacity-100 transition-opacity">
                  {language === 'en' ? 'Help Center' : 'مركز المساعدة'}
                </a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">
                  {language === 'en' ? 'Contact Us' : 'اتصل بنا'}
                </a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">
                  {language === 'en' ? 'Terms of Service' : 'شروط الخدمة'}
                </a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">
                  {language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}
                </a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
            <p className="text-sm opacity-80">
              © 2024 Tahweela. {language === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App