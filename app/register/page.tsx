
import Navbar from "@/components/layout/navbar";
import RegisterForm from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <>
      <Navbar />

      <main className="max-w-md mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">
          Create Account
        </h1>

        <RegisterForm />
      </main>
    </>
  );
}

RegisterPage.getLayout = function getLayout(page: React.ReactNode) {
  return page;
}   