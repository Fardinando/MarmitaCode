/**
 * Envelopa uma Promise num timeout. Se a Promise original não resolver
 * em `ms` milissegundos, rejeita com Error('timeout'). Usada em chamadas a
 * serviços externos (Resend, Sheets) que não oferecem timeout nativo.
 */
export function withTimeout<T>(promise: Promise<T>, ms: number, label = 'external'): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`timeout: ${label} (${ms}ms)`)), ms);
    promise.then(
      (v) => {
        clearTimeout(timer);
        resolve(v);
      },
      (e) => {
        clearTimeout(timer);
        reject(e);
      },
    );
  });
}
