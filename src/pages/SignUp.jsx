import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useLocalAuth } from '@/context/LocalAuthContext';
import { Button } from '@/components/ui/button';
import { User, Building, Mail, Phone, Lock, Hash } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const SignUp = () => {
  const navigate = useNavigate();
  const { signup, currentUser } = useLocalAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    registrationNumber: '',
    industryType: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (currentUser) {
      navigate('/dashboard', { replace: true });
    }
  }, [currentUser, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.registrationNumber.trim()) newErrors.registrationNumber = 'Registration number is required';
    if (!formData.industryType) newErrors.industryType = 'Industry type is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    const result = await signup(formData);
    setIsSubmitting(false);
    
    if (result.success) {
      toast({ title: "Account created successfully!" });
      navigate('/dashboard');
    } else {
      toast({ title: "Signup failed", description: result.error, variant: "destructive" });
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up - Company Portal</title>
      </Helmet>
      
      <div className="cyberpunk-bg min-h-screen flex flex-col items-center justify-center p-4">

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md cyber-card p-8"
        >
          <h2 className="text-3xl font-bold text-center text-white mb-8 drop-shadow-lg">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Full Name */}
            <div className="cyber-input-group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full cyber-input pl-12 pr-4 py-3.5"
              />
            </div>

            {/* Company Name */}
            <div className="cyber-input-group">
              <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Company Name"
                className="w-full cyber-input pl-12 pr-4 py-3.5"
              />
            </div>

            {/* Registration Number */}
            <div className="cyber-input-group">
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                placeholder="Registration Number"
                className="w-full cyber-input pl-12 pr-4 py-3.5"
              />
            </div>

            {/* Industry Type */}
            <div className="cyber-input-group">
              <select
                name="industryType"
                value={formData.industryType}
                onChange={handleChange}
                className="w-full cyber-input pl-4 pr-4 py-3.5 text-gray-400"
              >
                <option value="">Select Industry Type</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Chemical">Chemical</option>
                <option value="Mining">Mining</option>
                <option value="Power Plant">Power Plant</option>
                <option value="Warehouse">Warehouse</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Email */}
            <div className="cyber-input-group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full cyber-input pl-12 pr-4 py-3.5"
              />
            </div>

            {/* Phone */}
            <div className="cyber-input-group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full cyber-input pl-12 pr-4 py-3.5"
              />
            </div>

            {/* Password */}
            <div className="cyber-input-group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full cyber-input pl-12 pr-4 py-3.5"
              />
            </div>

            {/* Confirm Password */}
            <div className="cyber-input-group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full cyber-input pl-12 pr-4 py-3.5"
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full cyber-button py-6 mt-4 text-lg">
              {isSubmitting ? 'Creating...' : 'Sign Up'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 mb-4">
              Already have an account?{' '}
              <Link to="/login" className="text-neon-purple hover:text-white transition-colors">
                Login Here
              </Link>
            </p>
            <p className="text-xs text-gray-500">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SignUp;
