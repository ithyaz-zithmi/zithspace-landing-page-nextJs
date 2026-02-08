import { Merriweather, PT_Serif } from 'next/font/google';
import './globals.css';
import TrackingPixel from '@/components/TrackingPixel';

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-merriweather',
  display: 'swap',
});

const ptSerif = PT_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-pt-serif',
  display: 'swap',
});

export const metadata = {
  title: 'Zithtech - Building Smart Scalable Solutions',
  description:
    'Zithtech - Building smart scalable software solutions. Custom apps, digital products, and enterprise software development.',
  openGraph: {
    type: 'website',
    title: 'Zithtech - Building Smart Scalable Solutions',
    description:
      'We build digital products and custom software that turn ideas into scalable realities.',
    url: 'https://zithtech.com',
  },
  icons: {
    icon: '/logoblue.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={`${merriweather.variable} ${ptSerif.variable}`}>
        <TrackingPixel />
        {children}
      </body>
    </html>
  );
}
