import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useLocalAuth } from '@/context/LocalAuthContext';
import { Button } from '@/components/ui/button';
import { Mail, Lock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const { login, currentUser } = useLocalAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (currentUser) {
      navigate('/dashboard', { replace: true });
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;
    
    setIsSubmitting(true);
    const result = await login(formData.email, formData.password);
    setIsSubmitting(false);
    
    if (result.success) {
      toast({ title: "Login successful!" });
      navigate('/dashboard');
    } else {
      toast({ title: "Login failed", description: result.error, variant: "destructive" });
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - Company Portal</title>
      </Helmet>
      
      <div className="cyberpunk-bg min-h-screen flex flex-col items-center justify-center p-4">

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md cyber-card p-8 pt-10"
        >
          <h2 className="text-3xl font-bold text-center text-white mb-2">
            Admin Login
          </h2>
          <div className="h-0.5 w-1/3 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-8 opacity-50"></div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="cyber-input-group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Email Address"
                className="w-full cyber-input pl-12 pr-4 py-3.5 placeholder-gray-500"
              />
            </div>

            <div className="cyber-input-group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Password"
                className="w-full cyber-input pl-12 pr-4 py-3.5 placeholder-gray-500"
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full cyber-button py-6 text-lg">
              {isSubmitting ? 'Authenticating...' : 'Login'}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <button className="text-gray-400 hover:text-white text-sm transition-colors">
              Forgot Password?
            </button>
            <div className="border-t border-gray-700/50 pt-4">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link to="/signup" className="text-neon-blue hover:text-white font-semibold transition-colors">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
