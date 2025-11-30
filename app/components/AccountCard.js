import Image from "next/image";
import Link from "next/link";

export default function AccountCard({ account }) {

  if (!account) return "account not found"

  return (
    <Link
      href={`/accounts/${account._id}`}
    >
      <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all overflow-hidden">
        {/* Image Section */}
        <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center">
          {account.status == 'sold' &&
            <div className="absolute w-full h-full flex justify-center items-center font-bold text-6xl bg-blue-500 opacity-60 text-black z-10">Sold</div>
          }

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
          

          <p className="text-[var(--color-text)] font-medium mb-3 line-clamp-2">
            {account.title}
          </p>

          <div className="flex justify-between">

          <h3 className="font-semibold text-[var(--color-brand-blue)] text-sm mb-1 uppercase tracking-wide">
            {account.rank}
          </h3>

            <p className="text-[var(--color-brand-yellow)] font-bold mb-4">
            Rs. {account.price}
          </p>

          </div>
        </div>
      </div>
    </Link>
  );
}

