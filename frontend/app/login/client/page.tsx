"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Scale } from "lucide-react";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signin } from "@/services/clientServices";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  clientId: z
    .string({
      required_error: "Client ID is required",
    })
    .min(6, "Client ID must be at least 4 characters"),
});

export default function ClientLogin() {
  const router = useRouter();
  const [user , setUser] = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      clientId: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    signin({
      clientId: values.clientId,
      clientName: values.username,
    }).then((res) => {
      if (res.success) {
        setUser(res.user);
        router.push("/dashboard/client");
      }
    });
    // Handle login logic here
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <Scale className="h-12 w-12 text-primary mx-auto" />
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Client Login
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Access your legal services
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="ClientName" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client ID</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </Form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/signup/client"
            className="font-medium text-primary hover:text-primary/80"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
