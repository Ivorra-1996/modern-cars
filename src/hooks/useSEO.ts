import { useEffect } from "react";

interface SEOOptions {
  title: string;
  description?: string;
}

const SITE_NAME = "AutoBids";

export const useSEO = ({ title, description }: SEOOptions) => {
  useEffect(() => {
    document.title = `${title} | ${SITE_NAME}`;

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description);
    }
  }, [title, description]);
};
