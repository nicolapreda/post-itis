
"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';

export default function LoginPage() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <div className="flex h-screen items-center justify-center bg-stone-100">
      <form action={dispatch} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm border border-stone-200">
        <h1 className="text-2xl font-bold mb-6 text-center text-red-600 uppercase tracking-tighter">Login Admin</h1>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="username">Username</label>
          <input className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200" type="text" name="username" placeholder="admin" required />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2" htmlFor="password">Password</label>
          <input className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200" type="password" name="password" placeholder="admin" required />
        </div>
        <LoginButton />
        {errorMessage && (
          <div className="mt-4 text-red-500 text-sm font-bold text-center">
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
 
  return (
    <button aria-disabled={pending} type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors text-lg">
      {pending ? 'Entrando...' : 'Entra'}
    </button>
  );
}
