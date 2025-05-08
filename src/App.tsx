import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ConsumerHomepage from './pages/consumer/Homepage';
import VendorDashboard from './pages/vendor/Dashboard';
import ProductDetail from './pages/consumer/ProductDetail';
import Checkout from './pages/consumer/Checkout';
import OrderTracking from './pages/consumer/OrderTracking';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Layout><Landing /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/signup" element={<Layout><Signup /></Layout>} />
            <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
            
            {/* Protected Consumer Routes */}
            <Route path="/shop" element={
              <ProtectedRoute>
                <Layout><ConsumerHomepage /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <Layout><Checkout /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/order-tracking" element={
              <ProtectedRoute>
                <Layout><OrderTracking /></Layout>
              </ProtectedRoute>
            } />
            
            {/* Protected Vendor Routes */}
            <Route path="/vendor/dashboard" element={
              <ProtectedRoute requiredRole="vendor">
                <Layout isVendor><VendorDashboard /></Layout>
              </ProtectedRoute>
            } />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;