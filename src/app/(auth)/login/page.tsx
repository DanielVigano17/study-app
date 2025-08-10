import { AuthForm } from "../_components/sign-in";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ redirectTo?: string }> }) {
  const params = await searchParams;
  const redirectTo = params?.redirectTo ?? "/billing";
  return (
    <AuthForm redirectTo={redirectTo} />
  );
}
