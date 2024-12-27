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
import { loginLawyer } from "@/services/lawyerServices";
import { useRouter } from "next/navigation";
import { useState } from "react";
const formSchema = z.object({
  id: z.string({
    required_error: "Lawyer ID is required",
  }),
  name: z.string({
    required_error: "Name is required",
  }),
});

export default function LawyerLogin() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    let signinData = {
      lid: values.id,
      lname: values.name,
    };
    loginLawyer(signinData)
      .then((res) => {
        router.push("/dashboard/lawyer");
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <Scale className="h-12 w-12 text-primary mx-auto" />
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Lawyer Login
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Access your legal dashboard
          </p>
        </div>
        <div>
          {error && (
            <div className="bg-red-100 border mt-8 border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="lawyer@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lawyer ID</FormLabel>
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
            href="/signup/lawyer"
            className="font-medium text-primary hover:text-primary/80"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
