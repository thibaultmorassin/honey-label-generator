/* eslint-disable jsx-a11y/alt-text */
"use client";

import useMediaQuery from "@/hooks/use-media-query";
import { PHONE_NUMBER } from "@/lib/constants";
import { LabelFormData } from "@/schemas";
import {
  Document,
  Image,
  Page,
  PDFDownloadLink,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { Download } from "lucide-react";
import { Button } from "./ui/button";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  label: {
    width: "50%",
    height: "25%",
    position: "relative",
    border: "1px solid grey",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 5,
    flexDirection: "row",
  },
  leftColumn: {
    width: "50%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightColumn: {
    width: "50%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  logo: {
    width: 50,
    height: 50,
  },
  productName: {
    fontSize: 12,
    fontWeight: "bold",
  },
  text: {
    fontSize: 8,
  },
  bottomRight: {
    alignSelf: "flex-end",
  },
});

type PDFGeneratorProps = {
  labels: LabelFormData[];
};

export function PDFGenerator({ labels }: PDFGeneratorProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const document = (
    <Document>
      <Page size="A4" style={styles.page}>
        {labels.map((label, index) => (
          <View key={index} style={styles.label}>
            <Image
              src="/placeholder.svg?height=280&width=400"
              style={styles.backgroundImage}
            />
            <View style={styles.content}>
              <View style={styles.leftColumn}>
                <Image style={styles.logo} src="/placeholder.svg" />
              </View>
              <View style={styles.rightColumn}>
                <View>
                  <Text style={styles.productName}>{label.productName}</Text>
                  <Text style={styles.text}>{PHONE_NUMBER}</Text>
                </View>
                <View style={styles.bottomRight}>
                  <Text style={styles.text}>
                    {"Date d'expiration: "}
                    {label.expirationDate.toLocaleDateString("fr-FR")}
                  </Text>
                  <Text style={styles.text}>{label.size}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );

  if (isMobile) {
    return (
      <div className="px-4 space-y-4">
        <Button asChild className="w-full" size="lg">
          <PDFDownloadLink document={document} fileName="etiquettes.pdf">
            <Download />
            Télécharger
          </PDFDownloadLink>
        </Button>
        <hr />
      </div>
    );
  }
  return (
    <PDFViewer width="100%" height={600}>
      {document}
    </PDFViewer>
  );
}
