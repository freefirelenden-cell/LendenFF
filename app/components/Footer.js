export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-center py-6 mt-10">
      <p className="text-sm">
        © {new Date().getFullYear()} <span className="text-yellow-400 font-semibold">FreeFireStore</span>. 
        All rights reserved.
      </p>
      <p className="text-xs mt-1">
        Made with ❤️ using Next.js & Tailwind CSS
      </p>
    </footer>
  );
}
