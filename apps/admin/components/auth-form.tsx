import Form from 'next/form';

import { Input } from '@repo/ui/components/ui/input';
import { Label } from '@repo/ui/components/ui/label';

export function AuthForm({
  action,
  children,
  defaultEmail = '',
}: {
  action: NonNullable<string | ((formData: FormData) => void | Promise<void>) | undefined>;
  children: React.ReactNode;
  defaultEmail?: string;
}) {
  return (
    <Form action={action} className="flex flex-col gap-4 px-4 sm:px-16">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="font-normal text-zinc-600 dark:text-zinc-400">
          邮箱
        </Label>

        <Input
          id="email"
          name="email"
          className="text-md bg-muted md:text-sm"
          type="email"
          placeholder="请输入您的邮箱"
          autoComplete="email"
          required
          autoFocus
          defaultValue={defaultEmail}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password" className="font-normal text-zinc-600 dark:text-zinc-400">
          密码
        </Label>

        <Input id="password" name="password" className="text-md bg-muted md:text-sm" type="password" required />
      </div>

      {children}
    </Form>
  );
}
