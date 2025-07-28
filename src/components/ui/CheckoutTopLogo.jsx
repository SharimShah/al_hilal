import Image from "next/image";
import Link from "next/link";
export default function CheckoutTopLogo() {
  return (
    <>
      <div className="flex items-center justify-center mb-5">
        <Link href="/">
          <Image
            src="/images/kcglogo.png"
            width={300}
            height={200}
            alt="logo"
            className="w-[160px] sm:w-[210px] lg:w-[260px]"
          />
        </Link>
      </div>
    </>
  );
}
