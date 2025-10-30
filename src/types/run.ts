export interface SearchResult {
  company: string | null;
  website: string | null;
  careerPage: string | null;
  contacts: Array<{
    name: string;
    role?: string;
    linkedIn?: string;
  }>;
}
