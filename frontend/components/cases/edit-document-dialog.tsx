"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FileUp } from "lucide-react";
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
import { generateRandomUID } from "@/lib/generateUID";
import useUser from "@/hooks/useUser";
import { addDocuments } from "@/services/lawyerServices";
import { toast } from "sonner";

const formSchema = z.object({
  primaryWitness: z
    .string()
    .min(2, "Primary witness name must be at least 2 characters"),
  opposition: z
    .string()
    .min(2, "Opposition details must be at least 2 characters"),
  defence: z.string().min(2, "Defence details must be at least 2 characters"),
  legalDocument: z
    .string()
    .min(2, "Legal document must be at least 2 characters"),
  referenceDocument: z
    .string()
    .min(2, "Reference document must be at least 2 characters"),
});

interface AddDocumentDialogProps {
  caseId: string;
  trigger?: React.ReactNode;
  documentData: any;
}

export function EditDocumentDialog({
  caseId,
  trigger,
  documentData,
}: AddDocumentDialogProps) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      primaryWitness: "",
      opposition: "",
      defence: "",
      legalDocument: "",
      referenceDocument: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    let inputData = {
      documentId: generateRandomUID(),
      pwitness: values.primaryWitness,
      opposition: values.opposition,
      defence: values.defence,
      legalDoc: values.legalDocument,
      referenceDoc: values.referenceDocument,
      caseId,
      lid: user.lid,
    };
    addDocuments(inputData)
      .then(() => {
        toast.success("Documents added successfully");
        setOpen(false);
        form.reset();
      })
      .catch((error) => {
        toast.error(error);
      });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <button className="flex w-full items-center">
            <FileUp className="mr-2 h-4 w-4" />
            Add Document
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Case Document</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="primaryWitness"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Witness</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter primary witness name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="opposition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opposition</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter opposition details" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="defence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Defence</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter defence details" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="legalDocument"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Legal Document</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter documents link" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="referenceDocument"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reference Document</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter documents link" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4 pt-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Upload Documents</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
