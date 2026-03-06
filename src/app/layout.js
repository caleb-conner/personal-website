import './globals.css';

export const metadata = {
  title: 'Caleb Conner - Senior Software Engineer',
  description:
    'Building scalable, high-performance applications with expertise in full-stack development.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
