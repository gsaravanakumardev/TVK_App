"use client";

import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { t } from "@/data/locales";
import { Construction, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UnderDevelopment() {
  const { lang } = useApp();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mb-6">
        <Construction size={40} className="text-secondary-foreground" />
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-2">{t("underDevelopment", lang)}</h1>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">
        {t("underDevMessage", lang)}
      </p>
      <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg mb-6">
        <span className="text-xs text-muted-foreground">
          {lang === "ta"
            ? "இந்த செயல்பாட்டை பயன்படுத்த, அதிகாரப்பூர்வ tn.gov.in தளத்திற்கு செல்லவும்"
            : "To use this feature, please visit the official tn.gov.in portal"
          }
        </span>
      </div>
      <Button
        onClick={() => router.push("/")}
        variant="default"
        className="flex items-center gap-2"
        data-testid="btn-go-back"
      >
        <ArrowLeft size={16} />
        {t("goBack", lang)}
      </Button>
    </div>
  );
}
