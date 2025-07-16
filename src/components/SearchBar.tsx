import { useState } from 'react'
import { Search, Filter, SlidersHorizontal } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { Label } from './ui/label'
import { Slider } from './ui/slider'
import { Switch } from './ui/switch'
import type { SearchFilters } from '../types'

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void
  language: 'en' | 'ar'
  initialFilters?: SearchFilters
}

const categories = [
  { id: 'all', name: 'All Categories', nameAr: 'جميع الفئات' },
  { id: 'electronics', name: 'Electronics', nameAr: 'الإلكترونيات' },
  { id: 'textiles', name: 'Textiles', nameAr: 'المنسوجات' },
  { id: 'food-beverages', name: 'Food & Beverages', nameAr: 'الأغذية والمشروبات' },
  { id: 'construction', name: 'Construction', nameAr: 'البناء والتشييد' },
  { id: 'automotive', name: 'Automotive', nameAr: 'السيارات' },
  { id: 'healthcare', name: 'Healthcare', nameAr: 'الرعاية الصحية' }
]

const sortOptions = [
  { value: 'relevance', label: 'Relevance', labelAr: 'الصلة' },
  { value: 'price_asc', label: 'Price: Low to High', labelAr: 'السعر: من الأقل إلى الأعلى' },
  { value: 'price_desc', label: 'Price: High to Low', labelAr: 'السعر: من الأعلى إلى الأقل' },
  { value: 'rating', label: 'Highest Rated', labelAr: 'الأعلى تقييماً' },
  { value: 'newest', label: 'Newest First', labelAr: 'الأحدث أولاً' }
]

export function SearchBar({ onSearch, language, initialFilters = {} }: SearchBarProps) {
  const [query, setQuery] = useState(initialFilters.query || '')
  const [category, setCategory] = useState(initialFilters.category || 'all')
  const [sortBy, setSortBy] = useState(initialFilters.sortBy || 'relevance')
  const [priceRange, setPriceRange] = useState([initialFilters.minPrice || 0, initialFilters.maxPrice || 10000])
  const [verifiedOnly, setVerifiedOnly] = useState(initialFilters.verified || false)
  const [minRating, setMinRating] = useState(initialFilters.rating || 0)

  const handleSearch = () => {
    const filters: SearchFilters = {
      query: query.trim() || undefined,
      category: category === 'all' ? undefined : category,
      sortBy: sortBy as SearchFilters['sortBy'],
      minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
      maxPrice: priceRange[1] < 10000 ? priceRange[1] : undefined,
      verified: verifiedOnly || undefined,
      rating: minRating > 0 ? minRating : undefined
    }
    onSearch(filters)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const resetFilters = () => {
    setQuery('')
    setCategory('all')
    setSortBy('relevance')
    setPriceRange([0, 10000])
    setVerifiedOnly(false)
    setMinRating(0)
    onSearch({})
  }

  return (
    <div className=\"space-y-4\">\n      {/* Main Search Bar */}\n      <div className=\"flex gap-2\">\n        <div className=\"relative flex-1\">\n          <Search className=\"absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4\" />\n          <Input\n            placeholder={language === 'en' ? 'Search products, suppliers, or categories...' : 'ابحث عن المنتجات أو الموردين أو الفئات...'}\n            className=\"pl-10 rtl:pl-4 rtl:pr-10\"\n            value={query}\n            onChange={(e) => setQuery(e.target.value)}\n            onKeyPress={handleKeyPress}\n          />\n        </div>\n        <Button onClick={handleSearch} className=\"gradient-primary text-white\">\n          <Search className=\"h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2\" />\n          {language === 'en' ? 'Search' : 'بحث'}\n        </Button>\n      </div>\n\n      {/* Quick Filters */}\n      <div className=\"flex flex-wrap gap-2 items-center\">\n        <Select value={category} onValueChange={setCategory}>\n          <SelectTrigger className=\"w-48\">\n            <SelectValue />\n          </SelectTrigger>\n          <SelectContent>\n            {categories.map(cat => (\n              <SelectItem key={cat.id} value={cat.id}>\n                {language === 'en' ? cat.name : cat.nameAr}\n              </SelectItem>\n            ))}\n          </SelectContent>\n        </Select>\n\n        <Select value={sortBy} onValueChange={setSortBy}>\n          <SelectTrigger className=\"w-48\">\n            <SelectValue />\n          </SelectTrigger>\n          <SelectContent>\n            {sortOptions.map(option => (\n              <SelectItem key={option.value} value={option.value}>\n                {language === 'en' ? option.label : option.labelAr}\n              </SelectItem>\n            ))}\n          </SelectContent>\n        </Select>\n\n        {/* Advanced Filters */}\n        <Sheet>\n          <SheetTrigger asChild>\n            <Button variant=\"outline\">\n              <SlidersHorizontal className=\"h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2\" />\n              {language === 'en' ? 'Filters' : 'المرشحات'}\n            </Button>\n          </SheetTrigger>\n          <SheetContent>\n            <SheetHeader>\n              <SheetTitle>\n                {language === 'en' ? 'Advanced Filters' : 'المرشحات المتقدمة'}\n              </SheetTitle>\n            </SheetHeader>\n            \n            <div className=\"space-y-6 mt-6\">\n              {/* Price Range */}\n              <div>\n                <Label className=\"text-sm font-medium\">\n                  {language === 'en' ? 'Price Range (SAR)' : 'نطاق السعر (ريال)'}\n                </Label>\n                <div className=\"mt-2\">\n                  <Slider\n                    value={priceRange}\n                    onValueChange={setPriceRange}\n                    max={10000}\n                    step={100}\n                    className=\"w-full\"\n                  />\n                  <div className=\"flex justify-between text-sm text-muted-foreground mt-1\">\n                    <span>{priceRange[0]} SAR</span>\n                    <span>{priceRange[1]} SAR</span>\n                  </div>\n                </div>\n              </div>\n\n              {/* Verified Suppliers Only */}\n              <div className=\"flex items-center justify-between\">\n                <Label htmlFor=\"verified-only\" className=\"text-sm font-medium\">\n                  {language === 'en' ? 'Verified Suppliers Only' : 'الموردون المعتمدون فقط'}\n                </Label>\n                <Switch\n                  id=\"verified-only\"\n                  checked={verifiedOnly}\n                  onCheckedChange={setVerifiedOnly}\n                />\n              </div>\n\n              {/* Minimum Rating */}\n              <div>\n                <Label className=\"text-sm font-medium\">\n                  {language === 'en' ? 'Minimum Rating' : 'الحد الأدنى للتقييم'}\n                </Label>\n                <div className=\"mt-2\">\n                  <Slider\n                    value={[minRating]}\n                    onValueChange={(value) => setMinRating(value[0])}\n                    max={5}\n                    step={0.5}\n                    className=\"w-full\"\n                  />\n                  <div className=\"flex justify-between text-sm text-muted-foreground mt-1\">\n                    <span>0 ⭐</span>\n                    <span>{minRating} ⭐</span>\n                    <span>5 ⭐</span>\n                  </div>\n                </div>\n              </div>\n\n              {/* Action Buttons */}\n              <div className=\"flex space-x-2 rtl:space-x-reverse pt-4\">\n                <Button onClick={handleSearch} className=\"flex-1 gradient-primary text-white\">\n                  {language === 'en' ? 'Apply Filters' : 'تطبيق المرشحات'}\n                </Button>\n                <Button onClick={resetFilters} variant=\"outline\" className=\"flex-1\">\n                  {language === 'en' ? 'Reset' : 'إعادة تعيين'}\n                </Button>\n              </div>\n            </div>\n          </SheetContent>\n        </Sheet>\n      </div>\n    </div>\n  )\n}"