// lib/apiClient.js



const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function getNewest(limit) {
  try {
    const res = await fetch(`${BASE_URL}/api/accounts?sortBy=newest&limit=${limit}`, {
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  } catch (err) {
    console.error("get accounts error:", err.message);
    return null;
  }
}

