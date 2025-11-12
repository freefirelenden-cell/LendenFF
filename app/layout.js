// app/layout.js
import Providers from "./providers.js";
import './globals.css'
// import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import DataProvider from "./context/DataProvider.js";


export const metadata = {
  title: "NextAuth GitHub Login - Minimal",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <DataProvider>
            {/* <Navbar /> */}
            {children}
            <Footer />
          </DataProvider>
        </body>
      </html>
    </Providers>
  );
}

