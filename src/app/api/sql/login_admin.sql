GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;

INSERT INTO public.administradores (usuario_id)
VALUES ('*UID*');
