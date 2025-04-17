import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type loginFormData = z.infer<typeof loginSchema>;
export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: loginFormData) => {
    console.log("Login data:", data);
    // ส่งข้อมูลไปยัง backend เช่น fetch('/api/login', { method: 'POST', body: JSON.stringify(data) })
  };

  return (
    <>
      <Head><title>Login | MyBookShelf</title></Head>
      <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label>Email</label>
            <input {...register("email")} className="w-full border p-2" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <label>Password</label>
            <input type="password" {...register("password")} className="w-full border p-2" />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
        </form>
      </div>
    </>
  );
}
