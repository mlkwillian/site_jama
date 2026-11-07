
"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  ArrowLeft, ArrowRight, MapPin, CalendarDays, HardHat,
  ShieldCheck, Building2, CheckCircle2, Clock3,
} from "lucide-react";
import ObraGaleria from "./ObraGaleria";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend,
} from "recharts";

const Visualizacao3D = dynamic(() => import("./Visualizacao3D"), {
  ssr: false,
  loading: () => <div className="flex h-[260px] items-center justify-center text-sm text-zinc-500">...</div>,
});

const textos = {
  pt: {
    allWorks: "Todas as obras",
    work: "Obra",
    heroEyebrow: "JAMA FUNDAÇÕES · ACOMPANHAMENTO DE OBRA",
    workStatus: {
      planejada: "Planejada",
      em_andamento: "Em andamento",
      concluida: "Concluída",
    },
    stageStatus: {
      pendente: "Não iniciado",
      em_andamento: "Em andamento",
      concluida: "Concluído",
    },
    previous: "Obra anterior",
    next: "Próxima obra",
    dashboard: "Painel da obra",
    situation: "Situação",
    indicators: {
      physical: "Avanço físico",
      physicalDetail: "Percentual geral informado para a obra",
      accidentDays: "Dias sem acidentes",
      noAccidentDate: "Cadastre a data do último acidente",
      sinceAccident: "Contagem desde o último acidente",
      completedStages: "Etapas concluídas",
      inProgress: "em andamento",
      situation: "Situação",
      finished: "Obra finalizada",
      monitoring: "Acompanhamento da execução",
      delivery: "Previsão de entrega",
      noDelivery: "Não informada",
      start: "Início",
      noStart: "Data de início não informada",
      area: "Área construída",
      areaDetail: "Área total da obra",
      notInformed: "Não informado",
    },
    schedule: "Cronograma de execução",
    scheduleDetail: "Andamento das etapas cadastradas",
    completed: "concluídas",
    noStages: "Nenhuma etapa cadastrada para esta obra.",
    technical: "Responsável técnico",
    noProfessionalRecord: "Registro profissional não informado",
    diary: "Diário da obra",
    latestUpdates: "Atualizações mais recentes",
    noUpdates: "Nenhuma atualização cadastrada.",
    accumulated: "Avanço acumulado: previsto x realizado",
    monthlyEvolution: "Evolução mensal do avanço físico",
    period: "Período: completo",
    noMeasurements: "Ainda não há medições mensais. Cadastre os valores previstos e realizados no histórico de progresso da obra.",
    lastRecord: "Último registro",
    planned: "Previsto",
    actual: "Realizado",
    threeD: "Vista 3D da obra",
    threeDDetail: "Representação visual do projeto",
    modelRegistered: "Modelo 3D cadastrado",
    illustrative: "Representação ilustrativa",
    currentStage: "Etapa atual",
    footerTitle: "Grandes projetos exigem grandes bases.",
    footerText: "Esta obra tem a qualidade da JAMA Fundações.",
  },
  en: {
    allWorks: "All projects",
    work: "Project",
    heroEyebrow: "JAMA FOUNDATIONS · PROJECT TRACKING",
    workStatus: {
      planejada: "Planned",
      em_andamento: "In progress",
      concluida: "Completed",
    },
    stageStatus: {
      pendente: "Not started",
      em_andamento: "In progress",
      concluida: "Completed",
    },
    previous: "Previous project",
    next: "Next project",
    dashboard: "Project dashboard",
    situation: "Status",
    indicators: {
      physical: "Physical progress",
      physicalDetail: "Overall reported project progress",
      accidentDays: "Days without accidents",
      noAccidentDate: "Enter the date of the last accident",
      sinceAccident: "Count since the last accident",
      completedStages: "Completed stages",
      inProgress: "in progress",
      situation: "Status",
      finished: "Project completed",
      monitoring: "Construction progress tracking",
      delivery: "Estimated completion",
      noDelivery: "Not provided",
      start: "Start",
      noStart: "Start date not provided",
      area: "Built area",
      areaDetail: "Total project area",
      notInformed: "Not provided",
    },
    schedule: "Construction schedule",
    scheduleDetail: "Progress of registered stages",
    completed: "completed",
    noStages: "No stages have been registered for this project.",
    technical: "Technical manager",
    noProfessionalRecord: "Professional registration not provided",
    diary: "Project log",
    latestUpdates: "Latest updates",
    noUpdates: "No updates have been registered.",
    accumulated: "Cumulative progress: planned vs. actual",
    monthlyEvolution: "Monthly physical progress",
    period: "Period: complete",
    noMeasurements: "There are no monthly measurements yet. Add planned and actual values to the project's progress history.",
    lastRecord: "Latest record",
    planned: "Planned",
    actual: "Actual",
    threeD: "3D project view",
    threeDDetail: "Visual representation of the project",
    modelRegistered: "3D model registered",
    illustrative: "Illustrative representation",
    currentStage: "Current stage",
    footerTitle: "Great projects require strong foundations.",
    footerText: "This project carries the quality of JAMA Foundations.",
  },
    es: {
    allWorks: "Todas las obras",
    work: "Obra",
    heroEyebrow: "JAMA CIMENTACIONES · SEGUIMIENTO DE OBRA",
    workStatus: {
      planejada: "Planificada",
      em_andamento: "En curso",
      concluida: "Finalizada",
    },
    stageStatus: {
      pendente: "No iniciada",
      em_andamento: "En curso",
      concluida: "Concluida",
    },
    previous: "Obra anterior",
    next: "Obra siguiente",
    dashboard: "Panel de la obra",
    situation: "Situación",
    indicators: {
      physical: "Avance físico",
      physicalDetail: "Porcentaje general informado de la obra",
      accidentDays: "Días sin accidentes",
      noAccidentDate: "Registre la fecha del último accidente",
      sinceAccident: "Conteo desde el último accidente",
      completedStages: "Etapas concluidas",
      inProgress: "en curso",
      situation: "Situación",
      finished: "Obra finalizada",
      monitoring: "Seguimiento de la ejecución",
      delivery: "Previsión de entrega",
      noDelivery: "No informada",
      start: "Inicio",
      noStart: "Fecha de inicio no informada",
      area: "Área construida",
      areaDetail: "Área total de la obra",
      notInformed: "No informado",
    },
    schedule: "Cronograma de ejecución",
    scheduleDetail: "Avance de las etapas registradas",
    completed: "concluidas",
    noStages: "No hay etapas registradas para esta obra.",
    technical: "Responsable técnico",
    noProfessionalRecord: "Registro profesional no informado",
    diary: "Diario de obra",
    latestUpdates: "Actualizaciones más recientes",
    noUpdates: "No hay actualizaciones registradas.",
    accumulated: "Avance acumulado: previsto vs. realizado",
    monthlyEvolution: "Evolución mensual del avance físico",
    period: "Período: completo",
    noMeasurements: "Todavía no hay mediciones mensuales. Registre los valores previstos y realizados en el historial de progreso de la obra.",
    lastRecord: "Último registro",
    planned: "Previsto",
    actual: "Realizado",
    threeD: "Vista 3D de la obra",
    threeDDetail: "Representación visual del proyecto",
    modelRegistered: "Modelo 3D registrado",
    illustrative: "Representación ilustrativa",
    currentStage: "Etapa actual",
    footerTitle: "Los grandes proyectos necesitan grandes cimientos.",
    footerText: "Esta obra cuenta con la calidad de JAMA Cimentaciones.",
  },
};

function dataFormatada(valor, locale, fallback) {
  if (!valor) return fallback;
  const data = new Date(`${String(valor).slice(0, 10)}T12:00:00`);
  return Number.isNaN(data.getTime())
    ? fallback
    : data.toLocaleDateString(locale);
}

function mesFormatado(valor, locale) {
  if (!valor) return "";
  const data = new Date(`${String(valor).slice(0, 10)}T12:00:00`);
  if (Number.isNaN(data.getTime())) return "";
  return data.toLocaleDateString(locale, { month: "short" })
    .replace(".", "")
    .replace(/^./, (letra) => letra.toUpperCase());
}

function diasSemAcidentes(data) {
  if (!data) return null;
  const inicio = new Date(`${data.slice(0, 10)}T12:00:00`);
  const hoje = new Date();
  hoje.setHours(12, 0, 0, 0);
  if (Number.isNaN(inicio.getTime()) || inicio > hoje) return null;
  return Math.floor((hoje - inicio) / 86400000);
}

function percentualEtapa(etapa) {
  if (etapa.status === "concluida") return 100;
  return Math.min(100, Math.max(0, Number(etapa.percentual) || 0));
}

function Indicador({ titulo, valor, detalhe, destaque = false, icone: Icon }) {
  return (
    <article className="min-h-[112px] rounded-xl border border-white/[0.08] bg-[#1b1b1b] p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-zinc-400">{titulo}</p>
        {Icon && <Icon size={15} className="text-zinc-500" />}
      </div>
      <p className={`mt-2 text-[25px] font-bold leading-none ${destaque ? "text-emerald-400" : "text-zinc-100"}`}>
        {valor}
      </p>
      {detalhe && <p className="mt-2 text-xs text-zinc-500">{detalhe}</p>}
    </article>
  );
}

export default function ObraDashboard({
  obra, imagens, etapas, atualizacoes, progresso,
  anterior, proxima, totalObras, indiceObra,
}) {
  const { locale } = useLanguage();
  const t = textos[locale] || textos.pt;
  const localeData =
  locale === "en"
    ? "en-US"
    : locale === "es"
      ? "es-ES"
      : "pt-BR";

  const percentual = Math.min(100, Math.max(0, Number(obra.percentual) || 0));
  const dias = diasSemAcidentes(obra.data_ultimo_acidente);
  const concluidas = etapas.filter((etapa) => etapa.status === "concluida").length;
  const andamento = etapas.filter((etapa) => etapa.status === "em_andamento").length;

  const statusAtual = t.workStatus[obra.status] || obra.status;
  const area = obra.area_construida == null
    ? t.indicators.notInformed
    : `${Number(obra.area_construida).toLocaleString(localeData)} m²`;

  const dadosGrafico = progresso.map((item) => ({
    mes: mesFormatado(item.mes_referencia, localeData),
    previsto: Number(item.percentual_previsto),
    realizado: Number(item.percentual_realizado),
  }));

  const etapaAtual = etapas.find((etapa) => etapa.status === "em_andamento");

  return (
    <main className="min-h-screen bg-[#111111] text-zinc-100 pt-[110px]">
      <div className="mx-auto max-w-[1440px] px-4 pb-12 pt-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/portal" className="inline-flex items-center gap-2 text-sm text-emerald-400 transition hover:text-emerald-300">
            <ArrowLeft size={15} /> {t.allWorks}
          </Link>
          <span className="text-xs text-zinc-500">
            {t.work} {indiceObra >= 0 ? indiceObra + 1 : "—"} {locale === "en" ? "of" : "de"} {totalObras}
          </span>
        </div>

        <header className="relative mt-5 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#171717]">
          {obra.capa_url && (
            <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url("${obra.capa_url}")` }} />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#111]/95 via-[#111]/80 to-[#111]/55" />
          <div className="relative flex min-h-[220px] items-center justify-between gap-5 px-5 py-8 sm:px-9">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400">{t.heroEyebrow}</p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{obra.nome}</h1>
              <p className="mt-2 flex items-center gap-2 text-sm text-zinc-300">
                <MapPin size={15} className="text-emerald-400" />
                {[obra.cidade, obra.estado].filter(Boolean).join(" - ")}
              </p>
              <span className="mt-4 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                {statusAtual}
              </span>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              {anterior ? (
                <Link aria-label={t.previous} title={anterior.nome} href={`/portal/${anterior.slug}`} className="rounded-xl border border-white/10 bg-black/20 p-3 text-zinc-300 transition hover:bg-white/10">
                  <ArrowLeft size={18} />
                </Link>
              ) : (
                <span className="rounded-xl border border-white/5 p-3 text-zinc-700"><ArrowLeft size={18} /></span>
              )}
              {proxima ? (
                <Link aria-label={t.next} title={proxima.nome} href={`/portal/${proxima.slug}`} className="rounded-xl border border-white/10 bg-black/20 p-3 text-zinc-300 transition hover:bg-white/10">
                  <ArrowRight size={18} />
                </Link>
              ) : (
                <span className="rounded-xl border border-white/5 p-3 text-zinc-700"><ArrowRight size={18} /></span>
              )}
            </div>
          </div>
        </header>

        <ObraGaleria
          obraNome={obra.nome}
          capaUrl={obra.capa_url}
          imagens={imagens}
          locale={locale}
        />

        <section className="mt-5 rounded-2xl border border-white/[0.09] bg-[#151515] p-4 sm:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold">{t.dashboard}</h2>
              <p className="mt-1 text-xs text-zinc-500">{obra.nome} · {[obra.cidade, obra.estado].filter(Boolean).join(" - ")}</p>
            </div>
            <span className="rounded-lg border border-white/10 bg-[#202020] px-3 py-2 text-xs text-zinc-300">
              {t.situation}: <strong className="ml-1 text-zinc-100">{statusAtual}</strong>
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <Indicador titulo={t.indicators.physical} valor={`${percentual}%`} detalhe={t.indicators.physicalDetail} destaque />
            <Indicador titulo={t.indicators.accidentDays} valor={dias == null ? "—" : dias.toLocaleString(localeData)} detalhe={dias == null ? t.indicators.noAccidentDate : t.indicators.sinceAccident} icone={ShieldCheck} />
            <Indicador titulo={t.indicators.completedStages} valor={`${concluidas} ${locale === "en" ? "of" : "de"} ${etapas.length}`} detalhe={`${andamento} ${t.indicators.inProgress}`} icone={CheckCircle2} />
            <Indicador titulo={t.indicators.situation} valor={statusAtual} detalhe={obra.status === "concluida" ? t.indicators.finished : t.indicators.monitoring} icone={Clock3} />
            <Indicador titulo={t.indicators.delivery} valor={obra.previsao_conclusao ? dataFormatada(obra.previsao_conclusao, localeData, t.indicators.noDelivery) : t.indicators.noDelivery} detalhe={obra.data_inicio ? `${t.indicators.start}: ${dataFormatada(obra.data_inicio, localeData, t.indicators.notInformed)}` : t.indicators.noStart} icone={CalendarDays} />
            <Indicador titulo={t.indicators.area} valor={area} detalhe={t.indicators.areaDetail} icone={Building2} />
          </div>
        </section>

        <section className="mt-5 grid gap-4 xl:grid-cols-[1.35fr_0.9fr]">
          <div className="rounded-2xl border border-white/[0.09] bg-[#151515] p-5">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="font-semibold">{t.schedule}</h2>
                <p className="mt-1 text-xs text-zinc-500">{t.scheduleDetail}</p>
              </div>
              <span className="text-xs text-zinc-500">{concluidas}/{etapas.length} {t.completed}</span>
            </div>

            {etapas.length === 0 ? (
              <p className="rounded-lg border border-dashed border-white/10 p-5 text-sm text-zinc-500">{t.noStages}</p>
            ) : (
              <div className="space-y-5">
                {etapas.map((etapa) => {
                  const valor = percentualEtapa(etapa);
                  const status = t.stageStatus[etapa.status] || etapa.status;
                  return (
                    <div key={etapa.id}>
                      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                        <span className="font-medium text-zinc-200">{etapa.titulo}</span>
                        <span className={etapa.status === "concluida" ? "text-emerald-400" : "text-zinc-400"}>
                          {etapa.status === "concluida" ? status : etapa.status === "em_andamento" ? `${valor}%` : status}
                        </span>
                      </div>
                      <div className="h-[6px] overflow-hidden rounded-full bg-[#292929]">
                        <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${valor}%` }} />
                      </div>
                      {etapa.descricao && <p className="mt-1.5 text-xs text-zinc-500">{etapa.descricao}</p>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <section className="rounded-2xl border border-white/[0.09] bg-[#151515] p-5">
              <h2 className="font-semibold">{t.technical}</h2>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                  <HardHat size={21} />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold">{obra.responsavel_tecnico || t.indicators.notInformed}</p>
                  <p className="mt-1 text-xs text-zinc-500">{obra.registro_profissional || t.noProfessionalRecord}</p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-white/[0.09] bg-[#151515] p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-semibold">{t.diary}</h2>
                  <p className="mt-1 text-xs text-zinc-500">{t.latestUpdates}</p>
                </div>
                <span className="text-sm font-bold text-emerald-400">{percentual}%</span>
              </div>
              {atualizacoes.length === 0 ? (
                <p className="text-sm text-zinc-500">{t.noUpdates}</p>
              ) : (
                <div className="relative space-y-4 border-l border-emerald-500/40 pl-4">
                  {atualizacoes.map((item) => (
                    <article key={item.id} className="relative">
                      <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-[#151515] bg-emerald-400" />
                      <p className="text-[11px] text-zinc-500">{dataFormatada(item.data_atualizacao, localeData, "")}</p>
                      <h3 className="mt-1 text-sm font-medium text-zinc-200">{item.titulo}</h3>
                      <p className="mt-1 text-xs leading-5 text-zinc-500">{item.descricao}</p>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
        </section>

        <section className="mt-5 grid gap-4 xl:grid-cols-2">
          <div className="min-h-[330px] rounded-2xl border border-white/[0.09] bg-[#151515] p-5">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
              <div>
                <h2 className="font-semibold">{t.accumulated}</h2>
                <p className="mt-1 text-xs text-zinc-500">{t.monthlyEvolution}</p>
              </div>
              <span className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-zinc-400">{t.period}</span>
            </div>
            {dadosGrafico.length === 0 ? (
              <div className="flex h-[245px] items-center justify-center rounded-xl border border-dashed border-white/10 px-5 text-center text-sm text-zinc-500">{t.noMeasurements}</div>
            ) : (
              <>
                <div className="mb-2 text-xs text-zinc-400">
                  {t.lastRecord}: {t.planned.toLowerCase()} {dadosGrafico.at(-1).previsto}% · {t.actual.toLowerCase()} {dadosGrafico.at(-1).realizado}%
                </div>
                <div className="h-[245px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dadosGrafico} margin={{ top: 12, right: 12, left: -18, bottom: 0 }}>
                      <CartesianGrid stroke="#2a2a2a" strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="mes" tick={{ fill: "#929292", fontSize: 11 }} axisLine={{ stroke: "#3a3a3a" }} tickLine={false} />
                      <YAxis domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tickFormatter={(v) => `${v}%`} tick={{ fill: "#929292", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ background: "#202020", border: "1px solid #383838", borderRadius: 10, color: "#fff" }} formatter={(value, name) => [`${value}%`, name === "realizado" ? t.actual : t.planned]} />
                      <Legend formatter={(value) => value === "realizado" ? t.actual : t.planned} wrapperStyle={{ color: "#aaa", fontSize: 12 }} />
                      <Line type="monotone" dataKey="realizado" name="realizado" stroke="#159b79" strokeWidth={2.8} dot={{ r: 3, fill: "#159b79" }} activeDot={{ r: 5 }} />
                      <Line type="monotone" dataKey="previsto" name="previsto" stroke="#91a9d9" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </>
            )}
          </div>

          <div className="rounded-2xl border border-white/[0.09] bg-[#151515] p-5">
            <div className="mb-3">
              <h2 className="font-semibold">{t.threeD}</h2>
              <p className="mt-1 text-xs text-zinc-500">{t.threeDDetail}</p>
            </div>
            <Visualizacao3D modeloUrl={obra.modelo_3d_url} percentual={percentual} />
            <p className="mt-3 text-xs text-zinc-400">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400" />
              {obra.modelo_3d_url ? t.modelRegistered : `${t.illustrative} · ${percentual}%`}
            </p>
            {etapaAtual && (
              <p className="mt-2 text-xs text-zinc-500">
                {t.currentStage}: {etapaAtual.titulo}
              </p>
            )}
          </div>
        </section>

        <footer className="mt-5 flex flex-col justify-between gap-2 rounded-2xl border border-emerald-400/10 bg-gradient-to-r from-[#123d30] to-[#164b3a] px-5 py-6 sm:flex-row sm:items-center sm:px-7">
          <p className="text-lg font-bold text-white sm:text-xl">{t.footerTitle}</p>
          <p className="text-sm text-emerald-100/80">{t.footerText}</p>
        </footer>
      </div>
    </main>
  );
}
