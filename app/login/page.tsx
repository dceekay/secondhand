import Navbar from "@/components/layout/navbar";
import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <>
      <Navbar />

      <main className="max-w-md mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <LoginForm />
      </main>
    </>
  );
}

LoginPage.getLayout = function getLayout(page: React.ReactNode) {
  return page;
}