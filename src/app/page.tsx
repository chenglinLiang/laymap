import { redirect } from "next/navigation";

// For static export, this emits a page that does a client-side redirect to /en/.
export default function RootPage() {
  redirect("/en/");
}
