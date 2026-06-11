import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Trash2, Send, ShoppingBag, ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import Navbar from '../components/Navbar';
import { useCartStore } from '../store/cartStore';
import DatePicker from '../components/DatePicker';
import TimePicker from '../components/TimePicker';

// ── config (values live in .env) ─────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const env = (import.meta as any).env;
const EMAILJS_SERVICE_ID           = env.VITE_EMAILJS_SERVICE_ID           as string;
const EMAILJS_TEMPLATE_ID          = env.VITE_EMAILJS_TEMPLATE_ID          as string;  // → bakery owner
const EMAILJS_CONFIRM_TEMPLATE_ID  = env.VITE_EMAILJS_CONFIRM_TEMPLATE_ID  as string;  // → customer
const EMAILJS_PUBLIC_KEY           = env.VITE_EMAILJS_PUBLIC_KEY           as string;
const GOOGLE_SCRIPT_URL            = env.VITE_GOOGLE_SCRIPT_URL            as string;
// ─────────────────────────────────────────────────────────────────────────────

interface OrderFormData {
  customerName: string;
  email: string;
  phoneNumber: string;
  deliveryLocation: string;
  deliveryDate: string;
  deliveryTime: string;
  notes: string;
}

export default function OrderCake() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalAmount } = useCartStore();
  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<OrderFormData>();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();

  const cartCount = totalItems();

  const onSubmit = async (data: OrderFormData) => {
    if (items.length === 0) return;
    setLoading(true);
    setSubmitError('');

    const itemsSummary = items
      .map((i) => `${i.name} (${i.variant}) x${i.quantity} @ ₹${i.unitPrice} = ₹${i.unitPrice * i.quantity}`)
      .join(' | ');

    const orderTotal = `Total: ₹${totalAmount()}`;

    // 1. Send email to bakery owner via EmailJS
    try {
      const { default: emailjs } = await import('@emailjs/browser');
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          customer_name:     data.customerName,
          email:             data.email,
          phone:             data.phoneNumber,
          delivery_location: data.deliveryLocation,
          delivery_date:     data.deliveryDate,
          delivery_time:     data.deliveryTime,
          notes:             data.notes || '—',
          items:             itemsSummary,
          total:             orderTotal,
          order_time:        new Date().toLocaleString('en-IN'),
        },
        EMAILJS_PUBLIC_KEY,
      );

      // 2. Send confirmation email to customer
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_CONFIRM_TEMPLATE_ID,
        {
          customer_name:     data.customerName,
          email:             data.email,
          phone:             data.phoneNumber,
          delivery_location: data.deliveryLocation,
          delivery_date:     data.deliveryDate,
          delivery_time:     data.deliveryTime,
          notes:             data.notes || '—',
          items:             itemsSummary,
          total:             orderTotal,
          order_time:        new Date().toLocaleString('en-IN'),
        },
        EMAILJS_PUBLIC_KEY,
      );
    } catch (err) {
      console.error('EmailJS error:', err);
      setSubmitError('Email delivery failed. Your order is still being saved to the sheet.');
    }

    // 2. Save to Google Sheets via Apps Script
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Apps Script requires no-cors from browser
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp:         new Date().toLocaleString('en-IN'),
          customerName:      data.customerName,
          email:             data.email,
          phoneNumber:       data.phoneNumber,
          deliveryLocation:  data.deliveryLocation,
          deliveryDate:      data.deliveryDate,
          deliveryTime:      data.deliveryTime,
          notes:             data.notes || '',
          items:             itemsSummary,
          total:             orderTotal,
        }),
      });
    } catch (err) {
      console.error('Google Sheets error:', err);
    }

    clearCart();
    reset();
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f5f0eb] font-lato">
        <Navbar />
        <div className="max-w-lg mx-auto px-4 py-16 sm:py-24 text-center">
          <div className="text-5xl sm:text-6xl mb-6">🎉</div>
          <h2 className="text-[#2c1209] font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 36px)' }}>
            Order Placed!
          </h2>
          <p className="text-[#5a3e2b] mb-2 font-lato text-sm sm:text-base">
           Thank you! Your order details have been sent to your email. Your order has been received by Shree Delights and saved in our records.
          </p>
          <p className="text-[#9a8070] text-sm mb-8 font-lato">We will confirm your order within 1 hour.</p>
          <button
            onClick={() => { setSubmitted(false); navigate('/'); }}
            className="bg-[#2c1209] hover:bg-[#1a0a04] text-white px-8 py-3 font-lato font-bold tracking-wider uppercase text-sm transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f0eb] font-lato">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Back */}
        <button
          onClick={() => navigate('/menu')}
          className="flex items-center gap-1 text-[#a0622a] hover:text-[#2c1209] mb-6 sm:mb-8 transition font-lato text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Menu
        </button>

        <h1
          className="text-[#2c1209] font-bold mb-1"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 5vw, 48px)' }}
        >
          Your Order
        </h1>
        <p className="text-[#6b5344] text-sm mb-8 font-lato">Review your items and fill in delivery details.</p>

        {/* Empty cart */}
        {items.length === 0 && (
          <div className="bg-white rounded-xl shadow p-8 sm:p-12 text-center mb-10">
            <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-[#e0d6cc] mx-auto mb-4" />
            <p className="text-[#6b5344] mb-4 font-lato">Your cart is empty.</p>
            <button
              onClick={() => navigate('/menu')}
              className="bg-[#2c1209] hover:bg-[#1a0a04] text-white px-6 py-2.5 font-lato font-bold tracking-wider uppercase text-xs transition"
            >
              Browse Menu
            </button>
          </div>
        )}

        {/* Cart items */}
        {items.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6 sm:mb-10">
            <h2 className="font-bold text-base sm:text-lg text-[#2c1209] mb-4 font-lato">
              Order Items ({cartCount})
            </h2>
            <div className="divide-y divide-[#f0e8de]">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 sm:gap-4 py-3 sm:py-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#2c1209] text-sm font-lato">{item.name}</p>
                    <p className="text-xs text-[#a0622a] font-semibold mt-0.5 font-lato">{item.variant}</p>
                    <p className="text-xs text-[#9a8070] font-lato">{item.priceLabel}</p>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-[#f0e8de] hover:bg-[#e0d6cc] flex items-center justify-center text-[#2c1209] font-bold transition text-sm flex-shrink-0"
                    >−</button>
                    <span className="w-5 sm:w-6 text-center font-bold text-[#2c1209] text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-[#f0e8de] hover:bg-[#e0d6cc] flex items-center justify-center text-[#2c1209] font-bold transition text-sm flex-shrink-0"
                    >+</button>
                  </div>
                  <p className="w-14 sm:w-20 text-right font-bold text-[#2c1209] text-sm font-lato">
                    ₹{item.unitPrice * item.quantity}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-400 hover:text-red-600 transition ml-1 flex-shrink-0"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#e8ddd0] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="text-[#5a3e2b] font-bold font-lato">Order Total</span>
              <span className="text-lg sm:text-xl font-bold text-[#2c1209] font-lato">₹{totalAmount()}</span>
            </div>
          </div>
        )}

        {/* Order Form */}
        {items.length > 0 && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-xl shadow-md p-5 sm:p-8 space-y-5 sm:space-y-6"
          >
            <h2 className="font-bold text-base sm:text-lg text-[#2c1209] font-lato">Delivery Details</h2>

            {submitError && (
              <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 text-sm px-4 py-3 rounded-lg font-lato">
                {submitError}
              </div>
            )}

            <div>
              <label className="block text-[#2c1209] mb-1 font-bold text-sm font-lato">Your Name *</label>
              <input
                type="text"
                placeholder="Full name"
                {...register('customerName', { required: 'Name is required' })}
                className="w-full px-4 py-2.5 border border-[#e0d6cc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a0622a] font-lato text-sm"
              />
              {errors.customerName && <p className="text-red-500 text-xs mt-1 font-lato">{errors.customerName.message}</p>}
            </div>

            <div>
              <label className="block text-[#2c1209] mb-1 font-bold text-sm font-lato">Email Address *</label>
              <input
                type="email"
                placeholder="you@example.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
                })}
                className="w-full px-4 py-2.5 border border-[#e0d6cc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a0622a] font-lato text-sm"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1 font-lato">{errors.email.message}</p>}
              <p className="text-[#9a8070] text-xs mt-1 font-lato">Order confirmation will be sent to this email</p>
            </div>

            <div>
              <label className="block text-[#2c1209] mb-1 font-bold text-sm font-lato">Phone Number *</label>
              <input
                type="tel"
                placeholder="10-digit mobile number"
                {...register('phoneNumber', {
                  required: 'Phone number is required',
                  pattern: { value: /^[0-9]{10}$/, message: 'Enter a valid 10-digit number' },
                })}
                className="w-full px-4 py-2.5 border border-[#e0d6cc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a0622a] font-lato text-sm"
              />
              {errors.phoneNumber && <p className="text-red-500 text-xs mt-1 font-lato">{errors.phoneNumber.message}</p>}
            </div>

            <div>
              <label className="block text-[#2c1209] mb-1 font-bold text-sm font-lato">Delivery Location *</label>
              <textarea
                placeholder="Full address / landmark"
                rows={2}
                {...register('deliveryLocation', { required: 'Delivery location is required' })}
                className="w-full px-4 py-2.5 border border-[#e0d6cc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a0622a] resize-none font-lato text-sm"
              />
              {errors.deliveryLocation && <p className="text-red-500 text-xs mt-1 font-lato">{errors.deliveryLocation.message}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-[#2c1209] mb-1 font-bold text-sm font-lato">Delivery Date *</label>
                <input type="hidden" {...register('deliveryDate', { required: 'Please choose a date' })} />
                <DatePicker
                  value={watch('deliveryDate') ?? ''}
                  onChange={(v) => setValue('deliveryDate', v, { shouldValidate: true })}
                  minDate={new Date().toISOString().split('T')[0]}
                  error={errors.deliveryDate?.message}
                />
              </div>
              <div>
                <label className="block text-[#2c1209] mb-1 font-bold text-sm font-lato">Delivery Time *</label>
                <input type="hidden" {...register('deliveryTime', { required: 'Please choose a time' })} />
                <TimePicker
                  value={watch('deliveryTime') ?? ''}
                  onChange={(v) => setValue('deliveryTime', v, { shouldValidate: true })}
                  error={errors.deliveryTime?.message}
                />
              </div>
            </div>

            <div>
              <label className="block text-[#2c1209] mb-1 font-bold text-sm font-lato">
                Additional Notes <span className="text-[#9a8070] font-normal">(optional)</span>
              </label>
              <textarea
                placeholder="Cake message, design references, dietary needs..."
                rows={3}
                {...register('notes')}
                className="w-full px-4 py-2.5 border border-[#e0d6cc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a0622a] resize-none font-lato text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2c1209] hover:bg-[#1a0a04] disabled:bg-[#2c1209]/50 text-white py-3.5 flex items-center justify-center gap-2 font-bold tracking-[0.15em] uppercase transition text-sm font-lato"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Placing Order…</>
              ) : (
                <><Send className="w-5 h-5" /> Confirm Order</>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
