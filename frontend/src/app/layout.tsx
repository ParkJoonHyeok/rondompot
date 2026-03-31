import type { Metadata } from "next";
import type { ReactNode } from "react";

type RootLayoutProps = {
  children: ReactNode;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://randompot.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "RandomPot",
  manifest: "/manifest.webmanifest",
  themeColor: "#111111",
  title: "RandomPot | 친구/모임/술자리용 랜덤 놀이 서비스",
  description:
    "룰렛, 벌칙 뽑기, 랜덤 미션, 팀나누기를 간편하게 사용할 수 있는 캐주얼 랜덤 놀이 웹서비스",
  appleWebApp: {
    capable: true,
    title: "RandomPot",
    statusBarStyle: "default"
  },
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/icon.svg"
  },
  openGraph: {
    title: "RandomPot | 친구/모임/술자리용 랜덤 놀이 서비스",
    description:
      "룰렛, 벌칙 뽑기, 랜덤 미션, 팀나누기를 간편하게 사용할 수 있는 캐주얼 랜덤 놀이 웹서비스",
    siteName: "RandomPot",
    type: "website",
    url: "/",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "RandomPot | 친구/모임/술자리용 랜덤 놀이 서비스"
      }
    ]
  },
  twitter: {
    card: "summary",
    title: "RandomPot | 친구/모임/술자리용 랜덤 놀이 서비스",
    description:
      "룰렛, 벌칙 뽑기, 랜덤 미션, 팀나누기를 간편하게 사용할 수 있는 캐주얼 랜덤 놀이 웹서비스",
    images: ["/og-image.svg"]
  }
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
          backgroundColor: "#f5f5f5"
        }}
      >
        {children}
      </body>
    </html>
  );
}
