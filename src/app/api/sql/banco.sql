
-- ============================================
-- PORTAL DE OBRAS - ESTRUTURA INICIAL
-- ============================================

-- 1. TABELA DE OBRAS
CREATE TABLE public.obras (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    descricao TEXT,
    cidade TEXT NOT NULL,
    estado VARCHAR(2) NOT NULL,
    data_inicio DATE,
    previsao_conclusao DATE,
    percentual INTEGER NOT NULL DEFAULT 0
        CHECK (percentual BETWEEN 0 AND 100),
    status TEXT NOT NULL DEFAULT 'planejada'
        CHECK (status IN ('planejada', 'em_andamento', 'concluida')),
    responsavel_tecnico TEXT,
    registro_profissional TEXT,
    capa_url TEXT,
    capa_public_id TEXT,
    publicada BOOLEAN NOT NULL DEFAULT FALSE,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT obra_concluida_100
        CHECK (status <> 'concluida' OR percentual = 100)
);

-- 2. GALERIA DE IMAGENS
CREATE TABLE public.obra_imagens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    obra_id UUID NOT NULL REFERENCES public.obras(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    public_id TEXT NOT NULL,
    descricao TEXT,
    ordem INTEGER NOT NULL DEFAULT 0,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. ETAPAS DA EXECUÇÃO
CREATE TABLE public.obra_etapas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    obra_id UUID NOT NULL REFERENCES public.obras(id) ON DELETE CASCADE,
    titulo TEXT NOT NULL,
    descricao TEXT,
    status TEXT NOT NULL DEFAULT 'pendente'
        CHECK (status IN ('pendente', 'em_andamento', 'concluida')),
    data_inicio DATE,
    data_conclusao DATE,
    ordem INTEGER NOT NULL DEFAULT 0,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. HISTÓRICO DE ATUALIZAÇÕES
CREATE TABLE public.obra_atualizacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    obra_id UUID NOT NULL REFERENCES public.obras(id) ON DELETE CASCADE,
    titulo TEXT NOT NULL,
    descricao TEXT NOT NULL,
    percentual INTEGER
        CHECK (percentual IS NULL OR percentual BETWEEN 0 AND 100),
    data_atualizacao TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. ADMINISTRADORES
CREATE TABLE public.administradores (
    usuario_id UUID PRIMARY KEY
        REFERENCES auth.users(id) ON DELETE CASCADE,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- ÍNDICES
-- ============================================

CREATE INDEX idx_obras_status ON public.obras(status);
CREATE INDEX idx_obras_publicada ON public.obras(publicada);
CREATE INDEX idx_imagens_obra ON public.obra_imagens(obra_id);
CREATE INDEX idx_etapas_obra ON public.obra_etapas(obra_id);
CREATE INDEX idx_atualizacoes_obra
    ON public.obra_atualizacoes(obra_id, data_atualizacao DESC);

-- ============================================
-- FUNÇÃO PARA IDENTIFICAR ADMINISTRADORES
-- ============================================

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.administradores
        WHERE usuario_id = (SELECT auth.uid())
    );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- ============================================
-- ATIVAR RLS EM TODAS AS TABELAS
-- ============================================

ALTER TABLE public.obras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.obra_imagens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.obra_etapas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.obra_atualizacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.administradores ENABLE ROW LEVEL SECURITY;

-- ============================================
-- OBRAS: VISUALIZAÇÃO PÚBLICA
-- ============================================

CREATE POLICY "Visitantes veem obras publicadas"
ON public.obras
FOR SELECT
TO anon, authenticated
USING (publicada = TRUE OR (SELECT public.is_admin()));

-- ADMINISTRADOR: TODAS AS OPERAÇÕES
CREATE POLICY "Admin gerencia obras"
ON public.obras
FOR ALL
TO authenticated
USING ((SELECT public.is_admin()))
WITH CHECK ((SELECT public.is_admin()));

-- ============================================
-- IMAGENS: VISUALIZAÇÃO PÚBLICA
-- ============================================

CREATE POLICY "Visitantes veem imagens de obras publicadas"
ON public.obra_imagens
FOR SELECT
TO anon, authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.obras
        WHERE obras.id = obra_imagens.obra_id
        AND obras.publicada = TRUE
    )
    OR (SELECT public.is_admin())
);

CREATE POLICY "Admin gerencia imagens"
ON public.obra_imagens
FOR ALL
TO authenticated
USING ((SELECT public.is_admin()))
WITH CHECK ((SELECT public.is_admin()));

-- ============================================
-- ETAPAS: VISUALIZAÇÃO PÚBLICA
-- ============================================

CREATE POLICY "Visitantes veem etapas de obras publicadas"
ON public.obra_etapas
FOR SELECT
TO anon, authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.obras
        WHERE obras.id = obra_etapas.obra_id
        AND obras.publicada = TRUE
    )
    OR (SELECT public.is_admin())
);

CREATE POLICY "Admin gerencia etapas"
ON public.obra_etapas
FOR ALL
TO authenticated
USING ((SELECT public.is_admin()))
WITH CHECK ((SELECT public.is_admin()));

-- ============================================
-- ATUALIZAÇÕES: VISUALIZAÇÃO PÚBLICA
-- ============================================

CREATE POLICY "Visitantes veem atualizacoes de obras publicadas"
ON public.obra_atualizacoes
FOR SELECT
TO anon, authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.obras
        WHERE obras.id = obra_atualizacoes.obra_id
        AND obras.publicada = TRUE
    )
    OR (SELECT public.is_admin())
);

CREATE POLICY "Admin gerencia atualizacoes"
ON public.obra_atualizacoes
FOR ALL
TO authenticated
USING ((SELECT public.is_admin()))
WITH CHECK ((SELECT public.is_admin()));

-- ============================================
-- ADMINISTRADORES: SEM ACESSO PÚBLICO
-- ============================================

-- O cadastro inicial será feito pelo SQL Editor.
-- Nenhuma política pública será criada para esta tabela.







-- ============================================
-- ATUALIZAÇÃO DO PORTAL DE OBRAS - JAMA
-- ============================================

-- 1. NOVOS CAMPOS NA TABELA OBRAS

ALTER TABLE public.obras
ADD COLUMN IF NOT EXISTS area_construida NUMERIC(12,2);

ALTER TABLE public.obras
ADD COLUMN IF NOT EXISTS data_ultimo_acidente DATE;

ALTER TABLE public.obras
ADD COLUMN IF NOT EXISTS modelo_3d_url TEXT;


-- 2. PERCENTUAL INDIVIDUAL DAS ETAPAS

ALTER TABLE public.obra_etapas
ADD COLUMN IF NOT EXISTS percentual INTEGER NOT NULL DEFAULT 0;

-- Etapas já concluídas passam a ter 100%.
UPDATE public.obra_etapas
SET percentual = 100
WHERE status = 'concluida';

-- Garantir percentual entre 0 e 100.
ALTER TABLE public.obra_etapas
ADD CONSTRAINT obra_etapas_percentual_check
CHECK (percentual BETWEEN 0 AND 100);


-- 3. TABELA DE PROGRESSO MENSAL
-- Armazena o previsto e o realizado de cada mês.

CREATE TABLE public.obra_progresso_mensal (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    obra_id UUID NOT NULL
        REFERENCES public.obras(id) ON DELETE CASCADE,

    mes_referencia DATE NOT NULL,

    percentual_previsto NUMERIC(5,2) NOT NULL
        CHECK (percentual_previsto BETWEEN 0 AND 100),

    percentual_realizado NUMERIC(5,2) NOT NULL
        CHECK (percentual_realizado BETWEEN 0 AND 100),

    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT obra_progresso_mes_unico
        UNIQUE (obra_id, mes_referencia),

    CONSTRAINT mes_referencia_primeiro_dia
        CHECK (EXTRACT(DAY FROM mes_referencia) = 1)
);


-- 4. ÍNDICES

CREATE INDEX IF NOT EXISTS idx_progresso_mensal_obra
ON public.obra_progresso_mensal(obra_id, mes_referencia);


-- 5. SEGURANÇA DA NOVA TABELA

ALTER TABLE public.obra_progresso_mensal
ENABLE ROW LEVEL SECURITY;

-- Visualização pública somente de obras publicadas.

CREATE POLICY "Visitantes veem progresso de obras publicadas"
ON public.obra_progresso_mensal
FOR SELECT
TO anon, authenticated
USING (
    EXISTS (
        SELECT 1
        FROM public.obras
        WHERE obras.id = obra_progresso_mensal.obra_id
        AND obras.publicada = TRUE
    )
    OR (SELECT public.is_admin())
);

-- Administradores podem gerenciar os registros.

CREATE POLICY "Admin gerencia progresso mensal"
ON public.obra_progresso_mensal
FOR ALL
TO authenticated
USING ((SELECT public.is_admin()))
WITH CHECK ((SELECT public.is_admin()));


-- 6. PERMISSÕES DE ACESSO

GRANT SELECT ON public.obra_progresso_mensal
TO anon, authenticated;

GRANT INSERT, UPDATE, DELETE
ON public.obra_progresso_mensal
TO authenticated;

-- A função is_admin também é utilizada pelas políticas
-- de leitura pública das tabelas existentes.
GRANT EXECUTE ON FUNCTION public.is_admin()
TO anon, authenticated;
