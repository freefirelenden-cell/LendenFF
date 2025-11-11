// lib/apiClient.js



const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://lendenff.vercel.app' 
  : 'http://localhost:3000';


export async function getNewest(limit) {
  try {
    const res = await fetch(`${BASE_URL}/api/accounts?sortBy=newest&limit=${limit}`, {
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  } catch (err) {
    console.error("getProductById error:", err.message);
    return null;
  }
}
