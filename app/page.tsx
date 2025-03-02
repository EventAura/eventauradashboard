import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to the landing page without using any client-side authentication
  redirect("/landing");
}