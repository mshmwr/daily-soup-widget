import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Daily Soup — embeddable daily quote widget',
  description:
    'Drop-in widget that serves a growth-themed quote of the day. Two channels: <script> tag or NPM React component. Deterministic, copyright-safe, zero config.',
  metadataBase: new URL('https://daily-soup-widget.vercel.app'),
  openGraph: {
    title: 'Daily Soup',
    description: 'Embeddable growth-themed daily quote widget.',
    url: 'https://daily-soup-widget.vercel.app',
    siteName: 'Daily Soup',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
