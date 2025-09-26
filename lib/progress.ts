export function calcFieldsCompletion(obj: Record<string, unknown>, requiredKeys?: string[]): number {
  const keys = (requiredKeys && requiredKeys.length ? requiredKeys : Object.keys(obj)).filter(Boolean)
  if (keys.length === 0) return 0

  const isFilled = (v: unknown) => {
    if (v === null || v === undefined) return false
    if (typeof v === "string") return v.trim().length > 0
    if (Array.isArray(v)) return v.length > 0
    if (typeof v === "number") return !Number.isNaN(v)
    if (typeof v === "boolean") return true
    // fallback for objects
    if (typeof v === "object") return Object.keys(v as object).length > 0
    return false
  }

  const filled = keys.reduce((acc, k) => (isFilled(obj[k]) ? acc + 1 : acc), 0)
  return clampPercentage(Math.round((filled / keys.length) * 100))
}

export function clampPercentage(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)))
}

// Recruiter registration progress helpers
export type RecruiterStepKey = 'companyDetails' | 'companyAddress' | 'recruiterInfo' | 'review';

export interface RecruiterProgressState {
  companyDetails: boolean;
  companyAddress: boolean;
  recruiterInfo: boolean;
  review: boolean;
}

const STORAGE_KEY = 'recruiterRegistrationProgress';

export function getRecruiterProgress(): RecruiterProgressState {
  if (typeof window === 'undefined') return {
    companyDetails: false,
    companyAddress: false,
    recruiterInfo: false,
    review: false,
  };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {
    companyDetails: false,
    companyAddress: false,
    recruiterInfo: false,
    review: false,
  };
}

export function setRecruiterStepComplete(step: RecruiterStepKey, complete: boolean) {
  const progress = getRecruiterProgress();
  progress[step] = complete;
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }
}

export function calcRecruiterProgressPercent(): number {
  const progress = getRecruiterProgress();
  const steps = Object.values(progress);
  const completed = steps.filter(Boolean).length;
  return completed * 25;
}

export function clearRecruiterProgress() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}
