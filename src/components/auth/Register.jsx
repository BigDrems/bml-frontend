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
      onToggleMode();
      return { success: true };
    } catch (error) {
      return { error: error.response?.data?.message || error.message || 'Unable to create account. Please try again.' };
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
          <div className="p-4 text-sm text-red-600 bg-red-50 rounded-xl border border-red-100 flex items-start gap-3">
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <p className="font-medium">Registration Failed</p>
              <p className="mt-1 text-red-500">{state.error}</p>
            </div>
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