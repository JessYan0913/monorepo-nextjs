'use client';

import { useActionState, useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { AuthForm } from '@/components/auth-form';
import { SubmitButton } from '@/components/submit-button';
import { login, type LoginActionState } from '@/lib/actions/auth';

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);

  const [state, formAction] = useActionState<LoginActionState, FormData>(login, {
    status: 'idle',
  });

  useEffect(() => {
    if (state.status === 'failed') {
      toast.error('认证失败');
    } else if (state.status === 'invalid_data') {
      toast.error('数据验证失败');
    } else if (state.status === 'success') {
      setIsSuccessful(true);
      router.refresh();
      router.push('/');
    }
  }, [router, state.status]);

  const handleSubmit = (formData: FormData) => {
    setEmail(formData.get('email') as string);
    formAction(formData);
  };

  return (
    <div className="bg-background flex h-dvh w-screen items-start justify-center pt-12 md:items-center md:pt-0">
      <div className="flex w-full max-w-md flex-col gap-12 overflow-hidden rounded-2xl">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h3 className="text-xl font-semibold dark:text-zinc-50">登录</h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400">请输入您的邮箱和密码</p>
        </div>
        <AuthForm action={handleSubmit} defaultEmail={email}>
          <SubmitButton isSuccessful={isSuccessful}>登录</SubmitButton>
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-zinc-400">
            没有账号？{' '}
            <Link href="/register" className="font-semibold text-gray-800 hover:underline dark:text-zinc-200">
              注册
            </Link>{' '}
            一个账号
          </p>
        </AuthForm>
      </div>
    </div>
  );
}
