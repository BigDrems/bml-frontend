import React, { useState, useActionState } from 'react';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import AuthLayout from './AuthLayout';
import InputField from '../common/InputField';
import SocialButtons from '../common/SocialButton';
import { useRegister } from '../../hooks/useAuth';

const Register = ({ onToggleMode }) => {
  const { mutateAsync } = useRegister();
  const [showPassword, setShowPassword] = useState(false);

  const registerAction = async (prevState, formData) => {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
      return { error: 'Passwords do not match!' };
    }

    try {
      await mutateAsync({ name, email, password });
      alert('Registration successful! Please sign in.');
      onToggleMode();
      return { success: true };
    } catch (error) {
      return { error: error.response?.data?.message || error.message || 'Registration failed' };
    }
  };

  const [state, formAction, isPending] = useActionState(registerAction, null);

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Sign up to get started with us"
    >
      <form action={formAction} className="space-y-5">
        {state?.error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
            {state.error}
          </div>
        )}

        <InputField
          label="Full Name"
          type="text"
          name="name"
          placeholder="John Doe"
          icon={User}
          required
        />

        <InputField
          label="Email Address"
          type="email"
          name="email"
          placeholder="you@example.com"
          icon={Mail}
          required
        />

        <InputField
          label="Password"
          name="password"
          placeholder=""
          icon={Lock}
          showPasswordToggle
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          required
        />

        <InputField
          label="Confirm Password"
          name="confirmPassword"
          placeholder=""
          icon={Lock}
          showPasswordToggle
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          required
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-gradient-to-r from-[#4F8706] to-[#90BE54] text-white py-3 rounded-[20px] font-medium font-roboto hover:from-[#3d6605] hover:to-[#7aa84a] transition flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed shadow-green"
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Create Account
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <SocialButtons />

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 font-roboto">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onToggleMode}
            className="text-[#4F8706] hover:text-[#90BE54] font-medium"
          >
            Sign in
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;