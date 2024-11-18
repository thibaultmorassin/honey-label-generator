"use client";

import { Check, ChevronsUpDown, Plus, X } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface CustomComboboxProps {
  options: { label: string; isCustom: boolean }[];
  value: string;
  onChange: (value: string) => void;
  onCreateOption: (value: string) => void;
  onDeleteOption: (value: string) => void;
}

export function CustomCombobox({
  options,
  value,
  onChange,
  onCreateOption,
  onDeleteOption,
}: CustomComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const defaultOptions = options.filter((option) => option.isCustom === false);
  const customOptions = options.filter((option) => option.isCustom);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? options.find((option) => option.label === value)?.label ??
              "Sélectionner un produit..."
            : "Sélectionner un produit..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
      >
        <Command>
          <CommandInput
            placeholder="Rechercher un produit..."
            value={value}
            onValueChange={onChange}
          />
          <CommandList>
            <CommandEmpty className="p-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => onCreateOption(value)}
              >
                <Plus className="mr-2 h-4 w-4" />
                {`Créer "${value}"`}
              </Button>
            </CommandEmpty>
            <CommandGroup heading={"Miels de base"}>
              {defaultOptions.map((option) => (
                <CommandItem
                  key={option.label}
                  value={option.label}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.label ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
            {customOptions.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup heading={"Autres miels"}>
                  {customOptions.map((option) => (
                    <CommandItem
                      key={option.label}
                      value={option.label}
                      onSelect={(currentValue) => {
                        onChange(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === option.label ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option.label}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto h-4 w-4 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteOption(option.label);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
