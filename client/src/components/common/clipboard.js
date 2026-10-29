export async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; }
  catch { window.prompt('Copy this text:', text); return false; }
}
