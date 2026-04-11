/* ============================================================================
   Public types — paycore-sdk
   ============================================================================ */

export type Currency =
    | "BTC"
    | "ETH"
    | "USDT_ERC20"
    | "TON"
    | "USDT_JETTON"
    | "USDT_TRC20";

export type InvoiceStatus =
    | "pending"
    | "detecting"
    | "partial"
    | "confirmed"
    | "expired";

export interface Invoice {
    id: string;
    currency: Currency;
    address: string;
    memo?: string;
    amountExpected: string;
    amountReceived: string;
    amountFiat?: string;
    fiatCurrency?: string;
    exchangeRate?: string;
    status: InvoiceStatus;
    txHash?: string;
    metadata?: Record<string, unknown>;
    successUrl?: string;
    cancelUrl?: string;
    expiresAt: string;
    confirmedAt?: string;
    createdAt: string;
}

export interface PaymentMethod {
    symbol: Currency;
    network: string;
    networkName: string;
    minAmount: string;
    decimals: number;
    enabled: boolean;
}

export interface Rates {
    [symbol: string]: string;
}

export interface CreateInvoiceParams {
    currency: Currency;
    amount: string;
    fiatCurrency?: string;
    externalUserId?: string;
    webhookUrl?: string;
    metadata?: Record<string, unknown>;
    successUrl?: string;
    cancelUrl?: string;
    expiresInMinutes?: number;
}

export interface WebhookEvent {
    event: "invoice.confirmed" | "invoice.partial" | "invoice.expired";
    data: Invoice & { amountExtra?: string };
}

export interface PayCoreOptions {
    apiKey: string;
    baseUrl: string;
    /* Optional override for the public checkout origin used by getCheckoutUrl().
       Defaults to baseUrl. */
    checkoutOrigin?: string;
    /* Optional fetch implementation — useful in environments without global fetch. */
    fetch?: typeof globalThis.fetch;
}
