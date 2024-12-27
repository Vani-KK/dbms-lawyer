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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { apiBaseUrl } from "@/lib/baseUrls";
import { registerLawyer } from "@/services/lawyerServices";
import { useState } from "react";
import { setCookie } from "@/lib/cookieUtils";
import { useRouter } from "next/navigation";
import { generateRandomUID } from "@/lib/generateUID";
const formSchema = z.object({
  lname: z.string().min(2, "Name must be at least 2 characters"),
  lid: z
    .string({
      required_error: "Lawyer ID is required",
    })
    .min(4, "Lawyer ID must be at least 4 characters"),
  ltype: z.string().min(1, "Please select a practice area"),
  lphone: z.string().min(10, "Phone number must be at least 10 digits"),
  laddress: z.string().min(5, "Address must be at least 5 characters"),
});

export default function LawyerSignUp() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lname: "",
      lid: generateRandomUID(),
      ltype: "",
      lphone: "",
      laddress: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    registerLawyer(values)
      .then((res) => {
        setCookie(
          "user",
          JSON.stringify({
            ...values,
            type: "lawyer",
          })
        );
        router.push("/dashboard/lawyer");
      })
      .catch((err) => {
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
            Lawyer Registration
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join our network of legal professionals
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
              name="lid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lawyer ID</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ltype"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Practice Area</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your practice area" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="corporate">Corporate Law</SelectItem>
                      <SelectItem value="criminal">Criminal Law</SelectItem>
                      <SelectItem value="family">Family Law</SelectItem>
                      <SelectItem value="immigration">
                        Immigration Law
                      </SelectItem>
                      <SelectItem value="intellectual">
                        Intellectual Property
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lphone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+91 1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="laddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Office Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123 Law Street, City, State"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Register as Lawyer
            </Button>
          </form>
        </Form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already registered?{" "}
          <Link
            href="/login/lawyer"
            className="font-medium text-primary hover:text-primary/80"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
