import Image from "next/image";
import Link from "next/link";

export default function AccountCard({ account }) {

  if (!account) return "account not found"

  return (
    <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all overflow-hidden">
      {/* Image Section */}
      <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center">
        {account.img?.length > 0 && account.img[0] ? (
          <Image
            src={account.img[0].url}
            alt={account.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <span className="text-gray-500 text-sm">{account.title}</span>
        )}
      </div>


      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-[var(--color-brand-blue)] text-sm mb-1 uppercase tracking-wide">
          {account.rank}
        </h3>

        <p className="text-[var(--color-text)] font-medium mb-3 line-clamp-2">
          {account.title}
        </p>

        <p className="text-[var(--color-brand-yellow)] font-bold mb-4">
          Rs. {account.price}
        </p>

        <Link
          href={`/accounts/${account._id}`}
          className="block text-center bg-[var(--color-brand-yellow)] text-black font-semibold py-2 rounded-lg hover:bg-[var(--color-brand-gold)] transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
