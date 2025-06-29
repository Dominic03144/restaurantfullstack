export async function fetchMenuItems() {
  const res = await fetch("http://localhost:3000/api/menu/menuitem"); // Change port if needed
  if (!res.ok) throw new Error("Failed to fetch menu items");
  return res.json();
}
