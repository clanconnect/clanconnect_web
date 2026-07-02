import type { Metadata } from "next";
import Script from "next/script";

import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "@/assets/stylesheets/clan_connect/scss/style.scss";
import "@/assets/stylesheets/clan_connect/css/style.css";
import "@/assets/stylesheets/clan_connect/css/fontStyle.css";
import "@/assets/stylesheets/clan_connect/css/style-static.css";
import "@/assets/stylesheets/clan_connect/css/style_responsive.css";
import "@/assets/App.css";
import "@/assets/index.css";
import "react-toastify/dist/ReactToastify.css";

import { Header } from "@/layout/header";
import Footer from "@/layout/footer";
import ScrollToTop from "@/components/scrollToTop";
import AppEffects from "@/components/AppEffects";

const BASE_URL = "https://www.clanconnect.ai";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Influencer Marketing Platform for company & agency | ClanConnect",
  description:
    "Clan Connect - The Most Democratic Influencer Marketing Platform of the World. Collaborate with social media influencers.",
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    siteName: "ClanConnect",
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
  },
  other: {
    "facebook-domain-verification": "9qwykcq70dsjwhl574eepg7r2xl8wv",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded&display=block"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Symbols+Rounded"
        />
      </head>
      <body suppressHydrationWarning>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P4S3TMD');`}
        </Script>
        {/* End Google Tag Manager */}
        <Header />
        {children}
        <Footer />
        <ScrollToTop />
        <AppEffects />
      </body>
    </html>
  );
}
