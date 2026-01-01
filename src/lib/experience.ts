export type PeriodItem = {
  period: string;
};

const monthIndex: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11
};

function parseMonthYear(value: string): number | null {
  const raw = value.trim().toLowerCase();
  if (!raw || raw === 'present') return null;

  const match = raw.match(/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s+(\d{4})$/i);
  if (!match) return null;

  const month = monthIndex[match[1]];
  const year = Number(match[2]);

  if (!Number.isFinite(year) || month == null) return null;
  return year * 12 + month;
}

function parsePeriod(period: string): { start: number; end: number } | null {
  const parts = period.split(/\s*[–-]\s*/).map((p) => p.trim()).filter(Boolean);
  if (parts.length !== 2) return null;

  const start = parseMonthYear(parts[0]);
  const endRaw = parts[1].toLowerCase() === 'present' ? null : parseMonthYear(parts[1]);
  if (start == null) return null;

  const now = new Date();
  const end = endRaw ?? now.getFullYear() * 12 + now.getMonth();
  if (end < start) return null;

  return { start, end };
}

export function calculateExperienceYears(items: ReadonlyArray<PeriodItem> | null | undefined): number | null {
  const ranges = (items ?? [])
    .map((item) => parsePeriod(item.period))
    .filter((range): range is { start: number; end: number } => Boolean(range))
    .sort((a, b) => a.start - b.start);

  if (ranges.length === 0) return null;

  const merged: Array<{ start: number; end: number }> = [];
  for (const range of ranges) {
    const last = merged[merged.length - 1];
    if (!last) {
      merged.push({ ...range });
      continue;
    }

    if (range.start <= last.end + 1) {
      last.end = Math.max(last.end, range.end);
      continue;
    }

    merged.push({ ...range });
  }

  const totalMonths = merged.reduce((sum, r) => sum + (r.end - r.start + 1), 0);
  const years = Math.round((totalMonths / 12) * 10) / 10;
  return years >= 0.5 ? years : null;
}
