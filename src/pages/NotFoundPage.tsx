import React from 'react';
import { Home } from 'lucide-react';
import { PageShell, PageSection, PageButton } from '../components/PageShell';

export default function NotFoundPage() {
  return (
    <PageShell
      kicker="// 404 / ROUTE NOT FOUND"
      title="This page isn't here."
      intro="The address may be outdated or the page may have moved. Use the navigation to explore the portfolio, or return to the homepage."
    >
      <PageSection>
        <div className="max-w-2xl rounded-3xl border border-cyan-950/70 bg-[#050b18] p-7 sm:p-10">
          <div className="w-12 h-12 rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5">
            <Home className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-white">Find your way back.</h2>
          <p className="text-sm text-slate-400 leading-relaxed mt-3">
            Available pages include About, Projects, Ventures, Skills, Writing, Tech with Patrick and Contact.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <PageButton href="/">Return home</PageButton>
            <PageButton href="/projects" secondary>Explore projects</PageButton>
          </div>
        </div>
      </PageSection>
    </PageShell>
  );
}
