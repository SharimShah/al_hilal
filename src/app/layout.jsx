import "../styles/globals.css";
import { Archivo, Poppins } from "next/font/google";
import { ModalProvider } from "@/context/ModalContext";
import { CartProvider } from "@/context/CartContext";
import { SpringModal } from "@/components/ui/SpringModal";
import { fullUrl } from "@/data/data";
import NextTopLoader from "nextjs-toploader";
// import { GoogleTagManager } from "@next/third-parties/google";
import WhatsappBtn from "@/components/layout/WhatsappBtn";
import { LocationProvider } from "@/context/LocationContext";
import { CountryProvider } from "@/context/CountryContext";
import LocationSelect from "@/components/ui/LocationSelect";
export const metadata = {
  metadataBase: new URL(fullUrl),
  openGraph: {
    siteName: "Kelly Cajun Grill Best Cajun Cuisine Restaurant in Dubai",
    locale: "en_US",
    type: "website",
  },
  applicationName: "Kelly Cajun Grill Best Cajun Cuisine Restaurant in Dubai",
  referrer: "origin-when-cross-origin",
  alternates: {
    languages: {
      "en-US": "/",
    },
  },
};
const archivo = Archivo({
  weight: "400",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});
const poppins = Poppins({
  weight: "400",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});
export default function RootLayout({ children, modal }) {
  // const GTM = "GTM-PSXKB3TQ";

  return (
    <html lang="en" className="md:custom-scrollbar">
      <head>
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
             (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "sktd27k6gc");
            `,
          }}
        /> */}
        {/* Meta Pixel Code */}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?                         
              n.callMethod.apply(n,arguments):n.queue.push   
              (arguments)}; if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!
              0;n.version='2.0';n.queue=[];t=b.createElement(e);
              t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,
              'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '918432056457983');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=918432056457983&ev=
            PageView&noscript=1"
          />
        </noscript> */}
        {/* End Meta Pixel Code */}
        {/* <GoogleTagManager gtmId={GTM} /> */}
      </head>
      <body
        className={`${archivo.className} ${poppins.className}`}
        cz-shortcut-listen="true"
      >
        {/* <!-- Google Tag Manager (noscript) --> */}
        {/* <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM}`}
            height="1"
            width="1"
            style={{ display: "none" }}
          ></iframe>
        </noscript> */}
        {/* <!-- End Google Tag Manager (noscript) --> */}

        <CountryProvider>
          <CartProvider>
            <ModalProvider>
              <NextTopLoader
                color="black"
                initialPosition={0.08}
                height={2}
                crawl={true}
                showSpinner={false}
                easing="ease"
                speed={200}
                shadow="0 0 10px black,0 0 5px black"
                template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
                zIndex={1600}
                showAtBottom={false}
              />
              <LocationProvider>
                {children}
                {modal}
                <LocationSelect />
              </LocationProvider>
              <WhatsappBtn />
              <SpringModal />
            </ModalProvider>
          </CartProvider>
        </CountryProvider>
      </body>
    </html>
  );
}
