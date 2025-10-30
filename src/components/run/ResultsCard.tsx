// src/components/run/ResultsCard.tsx
import { Card } from "@/components/ui/card";
import { Building2, Globe, Briefcase, Users2, Info } from "lucide-react";

export type Results = {
  company: string;
  website?: string;
  careerPage?: string;
  contacts?: Array<{ name: string; role?: string; linkedIn?: string }>;
  sniff_out_clues?: string;
};

export default function ResultsCard({ results }: { results: Results }) {
  return (
    <Card className="glass-card p-8 h-full">
      <div className="space-y-8">
        {/* Company Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Company Found</p>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {results.company}
              </h3>
            </div>
          </div>
        </div>

        {/* Insights: Why this company */}
        {results.sniff_out_clues && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" />
              <h4 className="font-semibold text-sm">Why this company</h4>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {results.sniff_out_clues}
            </p>
          </div>
        )}

        {/* Resources */}
        {(results.website || results.careerPage) && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              <h4 className="font-semibold text-sm">Resources</h4>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {results.website && (
                <a
                  href={results.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors border border-transparent hover:border-primary/20"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Globe className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Website</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    Visit company site
                  </p>
                </a>
              )}

              {results.careerPage && (
                <a
                  href={results.careerPage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors border border-transparent hover:border-primary/20"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Careers</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    View open positions
                  </p>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Key Contacts */}
        {results.contacts && results.contacts.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users2 className="h-4 w-4 text-primary" />
              <h4 className="font-semibold text-sm">Key Contacts</h4>
            </div>
            <div className="space-y-3">
              {results.contacts.map((c, i) => (
                <div
                  key={`${c.linkedIn || c.name}-${i}`}
                  className="p-4 rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50 hover:border-primary/20 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-semibold mb-1">{c.name}</p>
                    {c.role && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {c.role}
                      </p>
                    )}
                    {c.linkedIn && (
                      <a
                        href={c.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium"
                      >
                        View LinkedIn Profile →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
