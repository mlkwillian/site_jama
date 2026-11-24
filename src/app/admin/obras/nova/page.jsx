
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import NovaObraForm from "./NovaObraForm";

export const metadata = {
  title: "Cadastrar Obra | JAMA Fundações",
};

export default async function NovaObraPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: isAdmin, error } = await supabase.rpc("is_admin");

  if (error || !isAdmin) {
    redirect("/admin/login");
  }

  return <NovaObraForm />;
}
