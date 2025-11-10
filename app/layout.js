// app/layout.js
import Providers from "./providers.js";
import './globals.css'
import Navbar from "./components/Navbar.js";

export const metadata = {
  title: "NextAuth GitHub Login - Minimal",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <Navbar/>
          {children}
        </body>
      </html>
    </Providers>
  );
}

