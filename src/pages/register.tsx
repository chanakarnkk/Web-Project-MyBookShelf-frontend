import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});
type RegisterFormData = z.infer<typeof registerSchema>;


export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log("Register data:", data);
    // ส่งข้อมูลไปยัง backend เช่น fetch('/api/register', { method: 'POST', body: JSON.stringify(data) })
  };

  return (
    <>
      <Head><title>Register | MyBookShelf</title></Head>
      <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label>Name</label>
            <input {...register("name")} className="w-full border p-2" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
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
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Register</button>
        </form>
      </div>
    </>
  );
}
