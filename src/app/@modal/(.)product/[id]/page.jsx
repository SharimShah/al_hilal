import { FetchData } from "@/lib/api";
import ProModal from "@/sections/ProModal";
export default async function ItemPage({ params }) {
  const data = await FetchData("product", params?.id);
  return <ProModal data={data?.product} id={params?.id} pagetype="modal" />;
}
