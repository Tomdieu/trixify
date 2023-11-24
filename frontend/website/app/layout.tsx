import "./globals.css";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import localFont from 'next/font/local'
import React from "react";
import AppProvider from "@/provider/AppProvider";
import NextUiProvider from "@/provider/NextUiProvider";
import { Toaster as SchadToaster } from "@/components/ui/toaster"
import ReactQueryProvider from "@/provider/ReactQueryProvider";

const poppins = localFont({
    src: [
        {
            path: '../public/fonts/Poppins/Poppins-Regular.ttf',
            weight: '400'
        },
        {
            path: '../public/fonts/Poppins/Poppins-Bold.ttf',
            weight: '700'
        },
        {
            path: '../public/fonts/Poppins/Poppins-Black.ttf',
            weight: '800'
        }
    ],
    variable: '--font-poppins'
})

export const metadata: Metadata = {
    title: "Trixify",
    description: "Trixify is a chat app",
    authors: [{ name: "Tomdieu Ivan", url: "https://github.com/tomdieu" }],
    creator: "Tomdieu Ivan",
    metadataBase: new URL('https://trixify.vercel.app'),
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: false,
            noimageindex: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    category: "Chat app",
    icons: [{ rel: "icon", url: "https://trixify.vercel.app/logo.svg" },
    { rel: "apple-touch-icon", url: "https://trixify.vercel.app/logo.svg" }],
    twitter: {
        card: 'summary_large_image',
        title: 'Trixify',
        description: "Trixify is a chat app",
        creator: '@tomdieu ivan',
        images: ['https://trixify.vercel.app/logo.svg'],
    },
    openGraph: {
        title: 'Trixify',
        description: "Trixify is a chat app",
        images: ['https://trixify.vercel.app/logo.svg'],
        creators: ['@tomdieu ivan'],
        url: 'https://trixify.vercel.app',

    }
};


export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${poppins.variable}`} suppressHydrationWarning={true}>

            <body className="w-full h-full">
                <Toaster />
                <NextTopLoader />
                <SchadToaster />
                <NextUiProvider>
                    <AppProvider>
                        <ReactQueryProvider>
                        {children}
                        </ReactQueryProvider>
                    </AppProvider>
                </NextUiProvider>

            </body>

        </html>
    );
}
