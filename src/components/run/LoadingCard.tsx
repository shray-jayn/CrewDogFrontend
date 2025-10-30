import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function LoadingCard() {
  return (
    <Card className="glass-card p-12 h-full flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="h-20 w-20 mx-auto rounded-full bg-gradient-to-br from-primary to-accent animate-glow-pulse flex items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary-foreground" />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xl font-semibold">Analyzing with AI</p>
          <p className="text-sm text-muted-foreground">
            Extracting company details and key contacts...
          </p>
        </div>
      </div>
    </Card>
  );
}
