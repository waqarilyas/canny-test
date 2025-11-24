interface CannySettings {
  boardToken: string;
  basePath: string | null;
  ssoToken: string | null;
  theme?: "light" | "dark" | "auto";
}

interface Window {
  Canny: (action: string, settings: CannySettings) => void;
}
