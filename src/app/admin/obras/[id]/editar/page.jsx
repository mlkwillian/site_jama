
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import EditarObraForm from "./EditarObraForm";

export const metadata = {
  title: "Editar Obra | JAMA Fundações",
};

export default async function EditarObraPage({ params }) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: isAdmin, error: adminError } =
    await supabase.rpc("is_admin");

  if (adminError || !isAdmin) redirect("/admin/login");

  const { data: obra, error } = await supabase
    .from("obras")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !obra) notFound();

  return <EditarObraForm obra={obra} />;
}
