import 'server-only';
import crypto from 'node:crypto';

/**
 * Valida a assinatura HMAC do webhook do Mercado Pago.
 *
 * Documentação:
 * https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks#editor_6
 *
 * Headers enviados pelo MP:
 *   x-signature: ts=<timestamp>,v1=<hash hex>
 *   x-request-id: <uuid>
 *
 * Template assinado:
 *   id:<data.id>;request-id:<x-request-id>;ts:<ts>;
 *
 * Hash: HMAC-SHA256(template, MP_WEBHOOK_SECRET) em hex.
 *
 * Se o segredo não estiver configurado (`MP_WEBHOOK_SECRET` vazio) a função
 * retorna `{ ok: true, enforced: false }` para não quebrar deploys de teste.
 * Em produção, sempre configure o segredo.
 */
export interface SignatureCheck {
  ok: boolean;
  enforced: boolean;
  reason?: string;
}

export function verifyMpSignature(opts: {
  signatureHeader: string | null;
  requestIdHeader: string | null;
  dataId: string | null;
  secret?: string;
}): SignatureCheck {
  const secret = opts.secret ?? process.env.MP_WEBHOOK_SECRET ?? '';
  if (!secret) return { ok: true, enforced: false };

  const { signatureHeader, requestIdHeader, dataId } = opts;
  if (!signatureHeader || !requestIdHeader || !dataId) {
    return { ok: false, enforced: true, reason: 'missing-headers' };
  }

  const parts = Object.fromEntries(
    signatureHeader.split(',').map((p) => {
      const [k, ...rest] = p.trim().split('=');
      return [k, rest.join('=')];
    })
  );
  const ts = parts.ts;
  const v1 = parts.v1;
  if (!ts || !v1) return { ok: false, enforced: true, reason: 'bad-signature-format' };

  // Rejeita assinaturas com mais de 10 minutos para evitar replay.
  const tsMs = Number(ts) * (ts.length <= 10 ? 1000 : 1);
  if (!Number.isFinite(tsMs)) return { ok: false, enforced: true, reason: 'bad-ts' };
  if (Math.abs(Date.now() - tsMs) > 10 * 60_000) {
    return { ok: false, enforced: true, reason: 'ts-expired' };
  }

  const template = `id:${dataId};request-id:${requestIdHeader};ts:${ts};`;
  const expected = crypto.createHmac('sha256', secret).update(template).digest('hex');

  // timingSafeEqual exige mesmo tamanho.
  if (expected.length !== v1.length) {
    return { ok: false, enforced: true, reason: 'length-mismatch' };
  }

  const equal = crypto.timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(v1, 'hex'));
  return equal
    ? { ok: true, enforced: true }
    : { ok: false, enforced: true, reason: 'hmac-mismatch' };
}
