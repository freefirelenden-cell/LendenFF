// lib/apiClient.js



const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://lendenff.vercel.app' 
  : 'http://localhost:3000';


export async function getAccounts() {
  try {
    const res = await fetch(`${BASE_URL}/api/accounts`, {
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  } catch (err) {
    console.error("get account error:", err.message);
    return null;
  }
}
