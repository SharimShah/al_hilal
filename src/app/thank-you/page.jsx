import CheckoutTopLogo from "@/components/ui/CheckoutTopLogo";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <>
      <div className="bg-white">
        <div className="kcgcontainer py-10 md:px-10 px-2">
          <CheckoutTopLogo />
          <div className="flex items-center justify-center">
            <Link href="/">
              <Image
                src="/images/thank-you.gif"
                width={300}
                height={200}
                alt="logo"
                className="w-[160px] sm:w-[210px] lg:w-[260px]"
              />
            </Link>
          </div>
          <main className="grid min-h-full place-items-center">
            <div className="text-center">
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
                Thank you for your order!
              </h1>
              <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                We're preparing your meal with love and freshness.
              </p>
              <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                We will notify you when your food is on the way
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link href="/" className="btn-red">
                  Go back home
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
