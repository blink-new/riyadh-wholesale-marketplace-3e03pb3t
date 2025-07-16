import { ShoppingCart, Plus, Minus, Trash2, CreditCard } from 'lucide-react'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { useCart } from '../hooks/useCart'
import type { CartItem } from '../types'

interface CartDrawerProps {
  language: 'en' | 'ar'
  onCheckout: (items: CartItem[]) => void
}

export function CartDrawer({ language, onCheckout }: CartDrawerProps) {
  const {
    cartItems,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    getCartItemCount,
    getSupplierGroups
  } = useCart()

  const itemCount = getCartItemCount()
  const total = getCartTotal()
  const supplierGroups = getSupplierGroups()

  const handleCheckout = () => {
    onCheckout(cartItems)
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant=\"outline\" size=\"icon\" className=\"relative\">
          <ShoppingCart className=\"h-4 w-4\" />
          {itemCount > 0 && (
            <Badge 
              variant=\"destructive\" 
              className=\"absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs\"
            >
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className=\"w-full sm:max-w-lg\">
        <SheetHeader>
          <SheetTitle className=\"flex items-center gap-2\">
            <ShoppingCart className=\"h-5 w-5\" />
            {language === 'en' ? 'Shopping Cart' : 'سلة التسوق'}
            {itemCount > 0 && (
              <Badge variant=\"secondary\">{itemCount}</Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className=\"flex flex-col h-full mt-6\">
          {cartItems.length === 0 ? (
            <div className=\"flex-1 flex items-center justify-center text-center\">
              <div>
                <ShoppingCart className=\"h-12 w-12 text-muted-foreground mx-auto mb-4\" />
                <p className=\"text-muted-foreground\">
                  {language === 'en' 
                    ? 'Your cart is empty' 
                    : 'سلة التسوق فارغة'
                  }
                </p>
                <p className=\"text-sm text-muted-foreground mt-2\">
                  {language === 'en' 
                    ? 'Add some products to get started' 
                    : 'أضف بعض المنتجات للبدء'
                  }
                </p>
              </div>
            </div>
          ) : (
            <>\n              <div className=\"flex-1 overflow-y-auto space-y-4\">\n                {Object.entries(supplierGroups).map(([supplierId, items]) => (\n                  <div key={supplierId} className=\"space-y-3\">\n                    <div className=\"text-sm font-medium text-muted-foreground border-b pb-2\">\n                      {language === 'en' ? 'Supplier:' : 'المورد:'} {items[0].product?.supplier?.companyName || supplierId}\n                    </div>\n                    \n                    {items.map((item, index) => (\n                      <div key={`${item.productId}-${index}`} className=\"flex items-center space-x-3 rtl:space-x-reverse p-3 border rounded-lg\">\n                        <img \n                          src={item.product?.images[0] || '/placeholder.jpg'} \n                          alt={item.product?.name}\n                          className=\"w-16 h-16 object-cover rounded\"\n                        />\n                        \n                        <div className=\"flex-1 min-w-0\">\n                          <h4 className=\"font-medium text-sm truncate\">\n                            {language === 'en' ? item.product?.name : item.product?.nameAr || item.product?.name}\n                          </h4>\n                          <p className=\"text-sm text-muted-foreground\">\n                            {item.product?.price} {item.product?.currency} / {item.product?.unit}\n                          </p>\n                          {item.specifications && (\n                            <p className=\"text-xs text-muted-foreground\">\n                              {language === 'en' ? 'Custom specs' : 'مواصفات مخصصة'}\n                            </p>\n                          )}\n                        </div>\n                        \n                        <div className=\"flex items-center space-x-2 rtl:space-x-reverse\">\n                          <Button\n                            variant=\"outline\"\n                            size=\"icon\"\n                            className=\"h-8 w-8\"\n                            onClick={() => updateQuantity(item.productId, item.quantity - 1, item.specifications)}\n                          >\n                            <Minus className=\"h-3 w-3\" />\n                          </Button>\n                          \n                          <span className=\"w-8 text-center text-sm font-medium\">\n                            {item.quantity}\n                          </span>\n                          \n                          <Button\n                            variant=\"outline\"\n                            size=\"icon\"\n                            className=\"h-8 w-8\"\n                            onClick={() => updateQuantity(item.productId, item.quantity + 1, item.specifications)}\n                          >\n                            <Plus className=\"h-3 w-3\" />\n                          </Button>\n                          \n                          <Button\n                            variant=\"ghost\"\n                            size=\"icon\"\n                            className=\"h-8 w-8 text-destructive hover:text-destructive\"\n                            onClick={() => removeFromCart(item.productId, item.specifications)}\n                          >\n                            <Trash2 className=\"h-3 w-3\" />\n                          </Button>\n                        </div>\n                      </div>\n                    ))}\n                  </div>\n                ))}\n              </div>\n\n              <div className=\"border-t pt-4 space-y-4\">\n                <div className=\"flex justify-between items-center\">\n                  <span className=\"font-medium\">\n                    {language === 'en' ? 'Total:' : 'المجموع:'}\n                  </span>\n                  <span className=\"text-xl font-bold text-gradient\">\n                    {total.toLocaleString()} SAR\n                  </span>\n                </div>\n                \n                <Button \n                  onClick={handleCheckout}\n                  className=\"w-full gradient-primary text-white\"\n                  disabled={cartItems.length === 0}\n                >\n                  <CreditCard className=\"h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2\" />\n                  {language === 'en' ? 'Proceed to Checkout' : 'المتابعة للدفع'}\n                </Button>\n                \n                <p className=\"text-xs text-muted-foreground text-center\">\n                  {language === 'en' \n                    ? 'Secure checkout powered by Stripe'\n                    : 'دفع آمن مدعوم من Stripe'\n                  }\n                </p>\n              </div>\n            </>\n          )}\n        </div>\n      </SheetContent>\n    </Sheet>\n  )\n}"