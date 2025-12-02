import { getAccountById } from "@/lib/apiServer";

export async function generateMetadata({ params }) {
  const { id } = params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


  const acc = await getAccountById(id);

  if (!acc) {
    return {
      title: "Checkout | Free Fire Lenden",
      description: "Secure Free Fire account checkout.",
    };
  }

  return {
    title: `Checkout – ${acc.title} | Free Fire Lenden`,
    description: `Buy ${acc.title} securely. Price: Rs.${acc.price}. Trusted account selling platform.`,
    openGraph: {
      title: `Checkout – ${acc.title}`,
      description: acc.description,
      images: acc.img?.length ? acc.img.map(i => i.url) : [],
      url: `${baseUrl}/checkout/${id}`
    },
    alternates: {
      canonical: `${baseUrl}/checkout/${id}`,
    },
  };
}
