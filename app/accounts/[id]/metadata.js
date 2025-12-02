import { homeMetadata } from './metadata';
export const metadata = homeMetadata;
import { getAccountById } from "@/lib/apiServer";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function generateAccountMetadata(id) {
  try {
    const acc = await getAccountById(id);

    if (!acc) {
      return {
        title: "Account Not Found | Free Fire Lenden",
        description: "Requested Free Fire account does not exist.",
      };
    }

    const title = `${acc.title} | Free Fire Account | Rs.${acc.price}`;
    const description = `${acc.title} (${acc.rank}) - UID ${acc.uid}. Trusted Free Fire account purchase with secure checkout on Free Fire Lenden.`;
    const images = acc.img?.length ? acc.img.map(i => i.url) : ["/default-og.png"];

    return {
      title,
      description,
      keywords: [
        "free fire account",
        "buy free fire account",
        "ff id buy",
        "free fire id sale",
        `${acc.rank} free fire account`,
        `${acc.title} ff id`,
        "trusted ff seller",
        "free fire lenden"
      ],
      openGraph: {
        title,
        description,
        url: `${baseUrl}/accounts/${id}`,
        images,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images,
      },
      alternates: {
        canonical: `${baseUrl}/accounts/${id}`,
      },
    };

  } catch (error) {
    return {
      title: "Account Details | Free Fire Lenden",
      description: "Free Fire accounts for sale.",
    };
  }
}
