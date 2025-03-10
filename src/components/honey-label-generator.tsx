"use client";

import { LabelFormData, labelFormSchema } from "@/schemas";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils/localStorage";
import { zodResolver } from "@hookform/resolvers/zod";
import { addMonths } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LabelForm } from "./label-form";
import { LabelPreview } from "./label-preview";
import { PDFGenerator } from "./pdf-generator";
import { Button } from "./ui/button";
import {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from "./ui/responsive-dialog";

export default function Home() {
  const [showPDF, setShowPDF] = useState(false);

  const form = useForm<LabelFormData>({
    resolver: zodResolver(labelFormSchema),
    defaultValues: {
      size: "250g",
      expirationDate: addMonths(new Date(), 24),
    },
  });

  const watchedFields = form.watch();

  const localStoredProductOptions = JSON.parse(
    getLocalStorageItem("productOptions") ?? "[]"
  ) as { label: string; isCustom: boolean }[];

  const productOptions = localStoredProductOptions?.length
    ? localStoredProductOptions
    : [
        { label: "Miel toutes fleurs", isCustom: false },
        { label: "Miel de châtaignier", isCustom: false },
        { label: "Miel de tournesol", isCustom: false },
      ];

  const onSubmit = form.handleSubmit(() => {
    setShowPDF(true);
  });

  const handleProductOptionCreate = (newOption: string) => {
    const newOptions = [
      ...productOptions,
      { label: newOption, isCustom: true },
    ];
    setLocalStorageItem("productOptions", JSON.stringify(newOptions));
    form.setValue("productName", newOption);
  };

  const handleProductOptionDelete = (option: string) => {
    const newOptions = productOptions.filter((opt) => opt.label !== option);
    setLocalStorageItem("productOptions", JSON.stringify(newOptions));
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-4">
        {"Paramètres de l'étiquette"}
      </h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <LabelForm
            form={form}
            onSubmit={onSubmit}
            productOptions={productOptions}
            onProductOptionCreate={handleProductOptionCreate}
            onProductOptionDelete={handleProductOptionDelete}
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-bold mb-2">{"Aperçu"}</h2>
          <div className="flex justify-center">
            <LabelPreview {...watchedFields} />
          </div>
        </div>
      </div>
      <ResponsiveDialog open={showPDF} onOpenChange={() => setShowPDF(false)}>
        <ResponsiveDialogContent className="lg:max-w-4xl">
          <ResponsiveDialogHeader>
            <ResponsiveDialogTitle>PDF Généré</ResponsiveDialogTitle>
            <ResponsiveDialogDescription>
              {"Vous pouvez maintenant l'imprimer."}
            </ResponsiveDialogDescription>
          </ResponsiveDialogHeader>
          <PDFGenerator labels={Array(8).fill(watchedFields)} />
          <ResponsiveDialogFooter>
            <ResponsiveDialogClose>
              <Button variant="outline" className="w-full">
                Fermer
              </Button>
            </ResponsiveDialogClose>
          </ResponsiveDialogFooter>
        </ResponsiveDialogContent>
      </ResponsiveDialog>
    </div>
  );
}
