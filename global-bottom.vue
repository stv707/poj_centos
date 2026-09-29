<template>
  <footer
    class="absolute bottom-0 left-0 right-0 h-8 px-6 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200 bg-white z-50 select-none"
  >
    <div class="flex items-center gap-2">
      <img src="/cognitoz-logo.png" alt="Cognitoz" class="h-4 object-contain" />
      <span class="text-slate-300">|</span>
      <span class="font-semibold text-slate-700">POJ Putrajaya</span>
    </div>

    <div class="font-normal text-slate-600">
      Copyright &copy; 2026 Cognitoz I.T Training Sdn Bhd &mdash; www.cognitoz.com
    </div>

    <div class="font-mono text-slate-500 text-[10px] font-medium">
      {{ $nav.currentPage }} / {{ $nav.total }}
    </div>
  </footer>
</template>
