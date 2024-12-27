"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { showToast } from "../ui/toast-notification";
import { addClient } from "@/services/lawyerServices";
import { generateRandomUID } from "@/lib/generateUID";
import useUser from "@/hooks/useUser";

const formSchema = z.object({
  cid: z.string().min(6, "Client ID must be at least 6 characters"),
  cname: z.string().min(2, "Case name must be at least 2 characters"),
  cphone: z.string().min(1, "Phone number is required"),
  caddress: z.string().min(1, "Address is required"),
});

interface AddClientDialogProps {
  trigger?: React.ReactNode;
}

export function AddClientDialog({ trigger }: AddClientDialogProps) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cid: generateRandomUID(),
      cname: "",
      cphone: "",
      caddress: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    let clientData = {
      ...values,
      lid: user.lid,
    };
    addClient(clientData)
      .then(() => {
        showToast({ message: "Client added successfully", type: "success" });
        setOpen(false);
        form.reset();
      })
      .catch((error) => {
        showToast({ message: error, type: "error" });
        console.error(error);
      });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Add Client</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter client ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter client name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cphone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter client phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="caddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter client address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Add Client</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
