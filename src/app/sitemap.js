export const dynamic = "force-dynamic";
import { fullUrl } from "@/domain/domain";
import { FetchData } from "@/lib/api";

export default async function sitemap() {
  const date = new Date().toISOString().slice(0, 10);
  const urls = await FetchData("sitemap");
  const apiUrls = urls.map((item) => ({
    url: item?.loc,
    lastModified: item?.lastmod,
  }));
  const staticRoutes = [
    {
      url: `${fullUrl}`,
      lastModified: date,
    },
  ];
  return [...staticRoutes, ...apiUrls];
}
