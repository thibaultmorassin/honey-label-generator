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
    <div className="w-full max-w-[10cm] h-auto aspect-[10/7] border border-gray-300 relative overflow-hidden bg-white rounded-xl">
      <div className="absolute inset-0 flex p-4">
        <div className="w-1/2 flex flex-col items-center justify-between">
          <Image
            src="/ruche.jpeg"
            alt="Logo"
            width={100}
            height={100}
            className="w-full max-w-[140px] h-[140px] mt-4"
          />
          <p>LES RUCHERS DE PAPOU</p>
        </div>
        <div className="w-1/2 flex flex-col justify-between text-center">
          <div>
            <h2 className="text-sm sm:text-lg font-bold underline">{productName}</h2>
            <p className="text-xs xs:text-xs">{"Récolté en Charente-Maritime"}</p>
          </div>
          <div>
            <p className="text-xs sm:text-sm">{"Patrick Dayet"}</p>
            <p className="text-xs sm:text-sm">{"17190 Saint Georges"}</p>
            <p className="text-xs sm:text-sm">{PHONE_NUMBER}</p>
          </div>
          <div className="self-end">
            <p className="text-xs xs:text-xs">
              {"A consommer de préférence avant le :"}
            </p>
            <p className="text-xs sm:text-sm">
              {expirationDate?.toLocaleDateString("fr-FR")}
            </p>
            <p className="text-xs xs:text-xs"> Mis en pot par l'apiculteur</p>
            <p className="text-xs sm:text-sm font-bold">{size}</p>
            
          </div>
        </div>
      </div>
    </div>
  );
}
