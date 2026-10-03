export const DATE_TO_BE_ANNOUNCED = "Date to be announced";

export function formatAddedDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value)) {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime()) || formatEventDate(value.slice(0, 10)) === DATE_TO_BE_ANNOUNCED) return null;

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatEventDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return DATE_TO_BE_ANNOUNCED;
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return DATE_TO_BE_ANNOUNCED;
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatUSD(value) {
  if (value === null || value === undefined || value === "") return null;
  const amount = Number(value);
  if (!Number.isFinite(amount)) return null;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(amount);
}

export function getCauseProgress(raised, need) {
  if (raised === null || raised === undefined || raised === "" || need === null || need === undefined || need === "") {
    return null;
  }
  const raisedAmount = Number(raised);
  const goalAmount = Number(need);
  if (!Number.isFinite(raisedAmount) || !Number.isFinite(goalAmount) || goalAmount <= 0) {
    return null;
  }
  return Math.min(100, Math.max(0, (raisedAmount / goalAmount) * 100));
}
