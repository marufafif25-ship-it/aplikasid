import "./globals.css";

export const metadata = {
  title: "Aplikasi.id - Software Original untuk Kerja & Bisnis",
  description: "Toko software terpercaya untuk kebutuhan kerja, desain, editing, dan bisnis.",
  icons: {
    icon: [{ url: "/untukFaviconfix.png", type: "image/png", sizes: "500x500" }],
    apple: "/untukFaviconfix.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
