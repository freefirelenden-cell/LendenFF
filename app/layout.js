// app/layout.js
import Providers from "./providers.js";
import './globals.css'

export const metadata = {
  title: "NextAuth GitHub Login - Minimal",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </Providers>
  );
}

