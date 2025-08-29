import Image from "next/image";
import Link from "next/link";
export default function CheckoutTopLogo() {
  return (
    <>
      <div className="flex items-center justify-center">
        <Link href="/">
          <Image
            src="/images/logo.png"
            width={300}
            height={200}
            alt="logo"
            className="w-[160px]"
          />
        </Link>
      </div>
    </>
  );
}
