import React, { useState, useActionState } from 'react';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useLogin } from '../../hooks/useAuth';
import AuthLayout from './AuthLayout';
import InputField from '../common/InputField';
import SocialButtons from '../common/SocialButton';

const SignIn = ({ onToggleMode }) => {
  const { mutateAsync } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const loginAction = async (prevState, formData) => {
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      // 1. Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      // 2. Backend Authentication
      await mutateAsync(idToken);
      
      return { success: true };
    } catch (error) {
      return { error: error.message || 'Failed to sign in' };
    }
  };

  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to continue to your account"
    >
      <form action={formAction} className="space-y-5">
        {state?.error && (
          <div className="p-4 text-sm text-red-600 bg-red-50 rounded-xl border border-red-100 flex items-start gap-3">
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <p className="font-medium">Sign In Failed</p>
              <p className="mt-1 text-red-500">{state.error}</p>
            </div>
          </div>
        )}
        {state?.success && (
          <div className="p-4 text-sm text-green-600 bg-green-50 rounded-xl border border-green-100 flex items-start gap-3">
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <p className="font-medium">Welcome back!</p>
              <p className="mt-1 text-green-500">Signing you in...</p>
            </div>
          </div>
        )}

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
          placeholder="••••••••"
          icon={Lock}
          showPasswordToggle
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          required
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="remember"
              className="w-4 h-4 text-[#4F8706] border-[#90BE54] rounded focus:ring-[#90BE54]"
            />
            <span className="ml-2 text-sm text-gray-600 font-roboto">Remember me</span>
          </label>
          <button
            type="button"
            className="text-sm text-[#4F8706] hover:text-[#90BE54] font-medium font-roboto"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-gradient-to-r from-[#4F8706] to-[#90BE54] text-white py-3 rounded-[20px] font-medium font-roboto hover:from-[#3d6605] hover:to-[#7aa84a] transition flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed shadow-green"
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Sign In
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <SocialButtons />

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 font-roboto">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onToggleMode}
            className="text-[#4F8706] hover:text-[#90BE54] font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};
export default SignIn;