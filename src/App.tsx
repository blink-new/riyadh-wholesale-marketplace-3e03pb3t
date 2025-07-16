import { useState } from 'react'
import { Search, Menu, Globe, ShoppingCart, Star, MapPin, Phone, Mail } from 'lucide-react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet'

function App() {
  const [language, setLanguage] = useState<'ar' | 'en'>('en')

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en')
  }

  const categories = [
    { name: 'Electronics', nameAr: 'الإلكترونيات', count: 1250 },
    { name: 'Textiles', nameAr: 'المنسوجات', count: 890 },
    { name: 'Food & Beverages', nameAr: 'الأغذية والمشروبات', count: 650 },
    { name: 'Construction', nameAr: 'البناء والتشييد', count: 420 },
    { name: 'Automotive', nameAr: 'السيارات', count: 380 },
    { name: 'Healthcare', nameAr: 'الرعاية الصحية', count: 290 }
  ]

  const featuredSuppliers = [
    {
      id: 1,
      name: 'Al-Riyadh Electronics Co.',
      nameAr: 'شركة الرياض للإلكترونيات',
      category: 'Electronics',
      rating: 4.8,
      reviews: 156,
      location: 'Riyadh Industrial City',
      verified: true,
      products: 245,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Saudi Textile Industries',
      nameAr: 'الصناعات النسيجية السعودية',
      category: 'Textiles',
      rating: 4.6,
      reviews: 89,
      location: 'King Abdullah Economic City',
      verified: true,
      products: 180,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Gulf Food Distributors',
      nameAr: 'موزعو الأغذية الخليجية',
      category: 'Food & Beverages',
      rating: 4.9,
      reviews: 203,
      location: 'Riyadh Food Complex',
      verified: true,
      products: 320,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop'
    }
  ]

  const recentProducts = [
    {
      id: 1,
      name: 'Industrial LED Lighting Systems',
      nameAr: 'أنظمة الإضاءة LED الصناعية',
      supplier: 'Al-Riyadh Electronics Co.',
      price: 'SAR 450',
      minOrder: '100 units',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'Premium Cotton Fabrics',
      nameAr: 'أقمشة قطنية فاخرة',
      supplier: 'Saudi Textile Industries',
      price: 'SAR 25/meter',
      minOrder: '500 meters',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      name: 'Organic Dates Premium',
      nameAr: 'تمور عضوية فاخرة',
      supplier: 'Gulf Food Distributors',
      price: 'SAR 120/kg',
      minOrder: '50 kg',
      image: 'https://images.unsplash.com/photo-1609501676725-7186f734b2e1?w=300&h=200&fit=crop'
    }
  ]

  const MobileMenu = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <div className="flex flex-col space-y-6 mt-6">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="Tahweela" className="h-8 w-auto" />
            <span className="text-xl font-bold text-gradient">تحويلة</span>
          </div>
          <nav className="flex flex-col space-y-4">
            <a href="#" className="text-lg font-medium hover:text-primary transition-colors">
              {language === 'en' ? 'Home' : 'الرئيسية'}
            </a>
            <a href="#" className="text-lg font-medium hover:text-primary transition-colors">
              {language === 'en' ? 'Suppliers' : 'الموردين'}
            </a>
            <a href="#" className="text-lg font-medium hover:text-primary transition-colors">
              {language === 'en' ? 'Products' : 'المنتجات'}
            </a>
            <a href="#" className="text-lg font-medium hover:text-primary transition-colors">
              {language === 'en' ? 'Categories' : 'الفئات'}
            </a>
            <a href="#" className="text-lg font-medium hover:text-primary transition-colors">
              {language === 'en' ? 'About' : 'حول'}
            </a>
          </nav>
          <div className="flex flex-col space-y-3">
            <Button className="gradient-primary text-white">
              {language === 'en' ? 'Join as Supplier' : 'انضم كمورد'}
            </Button>
            <Button variant="outline">
              {language === 'en' ? 'Sign In' : 'تسجيل الدخول'}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )

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
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                {language === 'en' ? 'Home' : 'الرئيسية'}
              </a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                {language === 'en' ? 'Suppliers' : 'الموردين'}
              </a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                {language === 'en' ? 'Products' : 'المنتجات'}
              </a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                {language === 'en' ? 'Categories' : 'الفئات'}
              </a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                {language === 'en' ? 'About' : 'حول'}
              </a>
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
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <ShoppingCart className="h-4 w-4" />
              </Button>
              <div className="hidden md:flex items-center space-x-2 rtl:space-x-reverse">
                <Button className="gradient-primary text-white">
                  {language === 'en' ? 'Join as Supplier' : 'انضم كمورد'}
                </Button>
                <Button variant="outline">
                  {language === 'en' ? 'Sign In' : 'تسجيل الدخول'}
                </Button>
              </div>
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>

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
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder={language === 'en' ? 'Search products, suppliers, or categories...' : 'ابحث عن المنتجات أو الموردين أو الفئات...'}
                className="pl-12 rtl:pl-4 rtl:pr-12 h-14 text-lg border-gradient"
              />
              <Button className="absolute right-2 rtl:right-auto rtl:left-2 top-2 gradient-primary text-white">
                {language === 'en' ? 'Search' : 'بحث'}
              </Button>
            </div>
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
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-gradient">
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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{supplier.category}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {supplier.products} {language === 'en' ? 'products' : 'منتج'}
                    </span>
                  </div>
                  <Button className="w-full mt-4 gradient-primary text-white">
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
            {recentProducts.map((product) => (
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
                  <Button className="w-full gradient-primary text-white">
                    {language === 'en' ? 'Request Quote' : 'طلب عرض سعر'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-16">
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