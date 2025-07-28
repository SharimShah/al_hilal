import LCard from "@/components/ui/LCard";
import { data } from "@/data/data";
export default function Location() {
  const ldata = data?.location;
  return (
    <>
      <section className="max-w-5xl mx-auto md:px-4 px-0 my-10">
        <h2 className="heading text-center mx-auto">{ldata?.heading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 mt-5">
          {ldata?.malls.map((mall, i) => (
            <LCard key={i} mall={mall} />
          ))}
        </div>
      </section>
    </>
  );
}
