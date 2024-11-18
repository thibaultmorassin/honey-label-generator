import { PHONE_NUMBER } from "@/lib/constants";
import Image from "next/image";

type LabelPreviewProps = {
  productName: string;
  expirationDate: Date;
  size: "250g" | "500g";
};

export function LabelPreview({
  productName,
  expirationDate,
  size,
}: LabelPreviewProps) {
  return (
    <div className="w-full max-w-[10cm] h-auto aspect-[10/7] border border-gray-300 relative overflow-hidden">
      <Image
        src="/placeholder.svg?height=280&width=400"
        alt="Background"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute inset-0 flex p-2">
        <div className="w-1/2 flex flex-col items-center justify-between">
          <Image
            src="/placeholder.svg"
            alt="Logo"
            width={100}
            height={100}
            className="w-full max-w-[100px] h-auto"
          />
        </div>
        <div className="w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-sm sm:text-lg font-bold">{productName}</h2>
            <p className="text-xs sm:text-sm">{PHONE_NUMBER}</p>
          </div>
          <div className="self-end">
            <p className="text-xs sm:text-sm">
              {"Date d'expiration:"}{" "}
              {expirationDate?.toLocaleDateString("fr-FR")}
            </p>
            <p className="text-xs sm:text-sm font-bold">{size}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
