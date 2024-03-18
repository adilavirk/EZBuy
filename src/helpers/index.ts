export const getProducts = async () => {
  const response = await fetch("https://jsonserver.reactbd.com/amazonpro", {
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  } else {
    return response.json();
  }
};
export const getPhones = async () => {
  const response = await fetch("https://jsonserver.reactbd.com/phone", {
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch phones");
  } else {
    return response.json();
  }
};
export const getPhoneCases = async () => {
  const response = await fetch("https://jsonserver.reactbd.com/phonecase", {
    cache: "no-cache",
  });
  if (!response.ok) {
    throw new Error("failed to fetch phone cases");
  } else {
    return response.json();
  }
};
export const getAccessories = async () => {
  const response = await fetch("https://jsonserver.reactbd.com/accessories", {
    cache: "no-cache",
  });
  if (!response.ok) {
    throw new Error("failed to fetch phone cases");
  } else {
    return response.json();
  }
};
export const getWatches = async () => {
  const response = await fetch("https://jsonserver.reactbd.com/watch", {
    cache: "no-cache",
  });
  if (!response.ok) {
    throw new Error("failed to fetch phone cases");
  } else {
    return response.json();
  }
};
