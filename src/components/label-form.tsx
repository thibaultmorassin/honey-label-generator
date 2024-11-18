"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LabelFormData } from "@/schemas";
import { addMonths, format } from "date-fns";
import { fr } from "date-fns/locale";
import { UseFormReturn } from "react-hook-form";
import { CustomCombobox } from "./ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface LabelFormProps {
  form: UseFormReturn<LabelFormData>;
  onSubmit: () => void;
  productOptions: { label: string; isCustom: boolean }[];
  onProductOptionCreate: (newOption: string) => void;
  onProductOptionDelete: (option: string) => void;
}

export function LabelForm({
  form,
  onSubmit,
  productOptions,
  onProductOptionCreate,
  onProductOptionDelete,
}: LabelFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du produit</FormLabel>
              <FormControl>
                <CustomCombobox
                  options={productOptions}
                  value={field.value}
                  onChange={field.onChange}
                  onCreateOption={onProductOptionCreate}
                  onDeleteOption={onProductOptionDelete}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expirationDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{"Date d'expiration"}</FormLabel>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    {field.value
                      ? format(field.value, "P", { locale: fr })
                      : "Sélectionner une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    locale={fr}
                    initialFocus
                  />
                  <div className="flex justify-between p-2 border-t">
                    {[12, 18, 24].map((months) => (
                      <Button
                        key={months}
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          field.onChange(addMonths(new Date(), months))
                        }
                      >
                        +{months} mois
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Poids du pot</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="250g">250g</SelectItem>
                  <SelectItem value="500g">500g</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Générer
        </Button>
      </form>
    </Form>
  );
}
