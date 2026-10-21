/* NovaCart's browser-safe Supabase adapter. Authorization is enforced by SQL RLS. */
window.NovaBackend = (() => {
  const config = window.NOVACART_SUPABASE_CONFIG || {};
  const configured = Boolean(window.supabase?.createClient && /^https:\/\//.test(config.url || "") && config.publishableKey && !String(config.publishableKey).includes("PASTE_YOUR_"));
  const client = configured ? window.supabase.createClient(config.url, config.publishableKey) : null;
  let currentUser = null;
  const requireClient = () => { if (!client) throw new Error("Backend not connected yet. Add the Supabase URL and publishable key to supabase-config.js."); return client; };
  const check = ({ error }) => { if (error) throw error; };

  async function signUp(name, email, password) {
    const sb = requireClient();
    const { data, error } = await sb.auth.signUp({
      email, password,
      options: { data: { display_name: name }, emailRedirectTo: window.location.href }
    });
    if (error) throw error;
    return data;
  }
  async function signIn(email, password) {
    const { data, error } = await requireClient().auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }
  async function signOut() {
    const { error } = await requireClient().auth.signOut();
    if (error) throw error;
  }
  async function getSessionUser() {
    if (!client) return null;
    const { data, error } = await client.auth.getUser();
    if (error && error.name !== "AuthSessionMissingError") throw error;
    currentUser = data?.user || null;
    return currentUser;
  }
  function onAuthChange(callback) {
    if (!client) return null;
    return client.auth.onAuthStateChange((_event, session) => {
      currentUser = session?.user || null;
      callback(currentUser);
    });
  }
  const displayName = user => user?.user_metadata?.display_name || user?.email?.split("@")[0] || "NovaCart shopper";

  async function getCart() {
    const { data, error } = await requireClient().from("cart_items").select("product_name, quantity").order("created_at");
    if (error) throw error;
    return (data || []).flatMap(row => Array(Math.min(99, row.quantity)).fill(row.product_name));
  }
  async function saveCart(names) {
    const sb = requireClient();
    const counts = names.reduce((all, name) => (all[name] = (all[name] || 0) + 1, all), {});
    const { data: existing, error: readError } = await sb.from("cart_items").select("product_name");
    if (readError) throw readError;
    const keep = Object.keys(counts);
    const remove = (existing || []).map(row => row.product_name).filter(name => !keep.includes(name));
    if (remove.length) check(await sb.from("cart_items").delete().in("product_name", remove));
    if (keep.length) check(await sb.from("cart_items").upsert(keep.map(product_name => ({ product_name, quantity: counts[product_name] })), { onConflict: "user_id,product_name" }));
  }
  async function getWishlist() {
    const { data, error } = await requireClient().from("wishlist_items").select("product_name").order("created_at");
    if (error) throw error;
    return (data || []).map(row => row.product_name);
  }
  async function saveWishlist(names) {
    const sb = requireClient();
    const { data: existing, error } = await sb.from("wishlist_items").select("product_name");
    if (error) throw error;
    const keep = [...new Set(names)];
    const remove = (existing || []).map(row => row.product_name).filter(name => !keep.includes(name));
    if (remove.length) check(await sb.from("wishlist_items").delete().in("product_name", remove));
    if (keep.length) check(await sb.from("wishlist_items").upsert(keep.map(product_name => ({ product_name })), { onConflict: "user_id,product_name" }));
  }
  async function getReviews(productName) {
    const { data, error } = await requireClient().from("reviews").select("display_name,rating,body,image_url,created_at").eq("product_name", productName).order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map(row => ({ name: row.display_name, rating: row.rating, text: row.body, image: row.image_url || "", date: new Date(row.created_at).toLocaleDateString() }));
  }
  async function saveReview(productName, rating, body, imageBlob) {
    const sb = requireClient();
    if (!currentUser) throw new Error("Sign in before posting a review.");
    let imageUrl = null;
    if (imageBlob?.size) {
      if (imageBlob.size > 5 * 1024 * 1024) throw new Error("Choose a photo smaller than 5 MB.");
      const path = `${currentUser.id}/${crypto.randomUUID()}.jpg`;
      const { error: uploadError } = await sb.storage.from("review-photos").upload(path, imageBlob, { contentType: "image/jpeg", upsert: false });
      if (uploadError) throw uploadError;
      imageUrl = sb.storage.from("review-photos").getPublicUrl(path).data.publicUrl;
    }
    const { error } = await sb.from("reviews").upsert({
      product_name: productName, user_id: currentUser.id,
      display_name: displayName(currentUser), rating, body, image_url: imageUrl
    }, { onConflict: "product_name,user_id" });
    if (error) throw error;
  }
  async function sendSupportMessage(body) {
    if (!currentUser) throw new Error("Sign in before sending a support message.");
    const { error } = await requireClient().from("support_messages").insert({ user_id: currentUser.id, body });
    if (error) throw error;
  }
  return { configured, get user() { return currentUser; }, signUp, signIn, signOut, getSessionUser, onAuthChange, displayName, getCart, saveCart, getWishlist, saveWishlist, getReviews, saveReview, sendSupportMessage };
})();
