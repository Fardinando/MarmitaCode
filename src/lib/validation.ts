export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(v: string) {
  return emailRegex.test(v.trim());
}

export function digitsOnly(v: string) {
  return v.replace(/\D/g, '');
}

export function isValidPhoneBR(v: string) {
  const d = digitsOnly(v);
  return d.length === 10 || d.length === 11;
}

export function formatPhoneBR(v: string) {
  const d = digitsOnly(v).slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function isValidCPF(v: string) {
  const d = digitsOnly(v);
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
  const calc = (len: number) => {
    let sum = 0;
    for (let i = 0; i < len; i++) sum += parseInt(d[i]) * (len + 1 - i);
    const r = (sum * 10) % 11;
    return r === 10 ? 0 : r;
  };
  return calc(9) === parseInt(d[9]) && calc(10) === parseInt(d[10]);
}

export function isValidCNPJ(v: string) {
  const d = digitsOnly(v);
  if (d.length !== 14 || /^(\d)\1{13}$/.test(d)) return false;
  const calc = (base: string) => {
    const w = base.length === 12 ? [5,4,3,2,9,8,7,6,5,4,3,2] : [6,5,4,3,2,9,8,7,6,5,4,3,2];
    const sum = base.split('').reduce((a, c, i) => a + parseInt(c) * w[i], 0);
    const r = sum % 11;
    return r < 2 ? 0 : 11 - r;
  };
  return calc(d.slice(0, 12)) === parseInt(d[12]) && calc(d.slice(0, 13)) === parseInt(d[13]);
}

export function isValidCpfOrCnpj(v: string) {
  const d = digitsOnly(v);
  if (d.length === 11) return isValidCPF(d);
  if (d.length === 14) return isValidCNPJ(d);
  return false;
}
