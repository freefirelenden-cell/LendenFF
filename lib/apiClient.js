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



// get all accounts 
export async function getAccounts(id) {
  try {
    const res = await fetch(`${BASE_URL}/api/accounts?userId=${id || ""}`, {
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  } catch (err) {
    console.error("get account error:", err.message);
    return [];
  }
}


// get one account by id
export async function getAccountById(id) {
  try {
    const res = await fetch(`${BASE_URL}/api/accounts/${id}`, {
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



// create account 
export async function createAccount(formData) {
  try {
    const res = await fetch(`${BASE_URL}/api/accounts`, {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(formData),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to create account");
    }

    return data;
  } catch (err) {
    console.error("createAccount error:", err.message);
    return null;
  }
}

// 🟡 Update account
export async function updateAccount(id, formData) {
  try {
    const res = await fetch(`${BASE_URL}/api/accounts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  } catch (err) {
    console.error("updateAccount error:", err.message);
    return null;
  }
}

// 🔴 Delete account
export async function deleteAccount(id) {
  try {
    const res = await fetch(`${BASE_URL}/api/accounts/${id}`, {
      method: "DELETE",
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  } catch (err) {
    console.error("deleteAccount error:", err.message);
    return null;
  }
}









// get user data <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// get user by id 
export async function getUserById(id) {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/user/${id}`, {
      cache: "no-store",
      method: "GET"
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  } catch (err) {
    console.error("get user details error:", err.message);
    return null;
  }
}

// sync user to db 
export async function syncUser(userData) {
  try {
    const toSendData = {
      authId: userData.id,
      email: userData.email,
      name: userData.name || '',
      image: userData.image || '',
      role: "user"
    }
    const res = await fetch('/api/auth/sync-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toSendData),
    });

    const data = await res.json();
    return data
  } catch (error) {
    console.error('❌ Failed to sync user:', error);
  }
};



// handle images <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



export async function uploadImages(tempImages) {
  try {
    const imagesToUpload = tempImages.filter(img => img.isTemp);
    const responses = await Promise.all(
      imagesToUpload.map(async (img) => {
        const formData = new FormData();
        formData.append("file", img.file); // 🔹 actual file object
        formData.append("fileName", img.fileName); // 🔹 image name for ImageKit

        const res = await fetch("/api/image", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error(`Upload failed for ${img.fileName}`);

        const result = await res.json();

        // Object URL cleanup
        if (img.url.startsWith('blob:')) {
          URL.revokeObjectURL(img.url);
        }

        return result;
      })
    );

    return responses; // sabka result ek array me
  } catch (error) {
    console.error("Upload error:", error);
    throw new Error("Image upload failed");
  }
}



// to delete images from selected and imagekit 
export async function deleteImage(img) {
  try {
    // Delete from ImageKit
    const res = await fetch("/api/image", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileId: img.fileId }),
    });
    const data = await res.json();
    if (!data.success) throw new Error("ImageKit delete failed");

  } catch (err) {
    console.error("Delete error:", err);
    alert("Failed to delete image!");
  }
};


