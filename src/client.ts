/* ============================================================================
   PayCore client — public API surface
   ============================================================================
   STAGE 1 SCAFFOLD: only the constructor and getCheckoutUrl helper are wired.
   The full request methods (invoices, methods, rates, webhooks, SSE events)
   land in Stage 4. This file exists so consumers can already type-check
   imports against the eventual shape.
   ============================================================================ */

import type {
    PayCoreOptions,
    Invoice,
    PaymentMethod,
    Rates,
    CreateInvoiceParams,
    WebhookEvent,
} from "./types.js";
import { PayCoreError } from "./errors.js";

export class PayCore {
    private readonly apiKey: string;
    private readonly baseUrl: string;
    private readonly checkoutOrigin: string;
    private readonly fetchImpl: typeof globalThis.fetch;

    constructor(options: PayCoreOptions) {
        if (!options.apiKey) throw new PayCoreError("apiKey is required", 0, "missing_api_key");
        if (!options.baseUrl) throw new PayCoreError("baseUrl is required", 0, "missing_base_url");
        this.apiKey = options.apiKey;
        this.baseUrl = options.baseUrl.replace(/\/+$/, "");
        this.checkoutOrigin = (options.checkoutOrigin ?? options.baseUrl).replace(/\/+$/, "");
        this.fetchImpl = options.fetch ?? globalThis.fetch;
    }

    /* Build the public checkout URL for an invoice id. The frontend Next.js
       checkout app exposes /checkout/[id]. */
    getCheckoutUrl(invoiceId: string): string {
        return `${this.checkoutOrigin}/checkout/${encodeURIComponent(invoiceId)}`;
    }

    /* === The following methods are placeholders — implemented in Stage 4 === */

    invoices = {
        create: async (_params: CreateInvoiceParams): Promise<Invoice> => {
            throw new PayCoreError("invoices.create not yet implemented", 501, "not_implemented");
        },
        get: async (_id: string): Promise<Invoice> => {
            throw new PayCoreError("invoices.get not yet implemented", 501, "not_implemented");
        },
        events: (_id: string, _onEvent: (event: WebhookEvent) => void): (() => void) => {
            throw new PayCoreError("invoices.events not yet implemented", 501, "not_implemented");
        },
    };

    async methods(): Promise<PaymentMethod[]> {
        throw new PayCoreError("methods not yet implemented", 501, "not_implemented");
    }

    async rates(): Promise<Rates> {
        throw new PayCoreError("rates not yet implemented", 501, "not_implemented");
    }

    webhooks = {
        verify: (_body: string, _signature: string, _secret: string): boolean => {
            throw new PayCoreError("webhooks.verify not yet implemented", 501, "not_implemented");
        },
        parse: (_body: string): WebhookEvent => {
            throw new PayCoreError("webhooks.parse not yet implemented", 501, "not_implemented");
        },
    };
}
