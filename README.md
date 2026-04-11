# @duskwork/paycore-sdk

Official TypeScript SDK for [paycore](https://github.com/duskwork/paycore) — a self-hosted multi-tenant crypto payment gateway supporting BTC, ETH, USDT (ERC20/TRC20/Jetton), and TON.

> **Status:** Stage 1 scaffold. The full client lands in Stage 4 of the paycore Phase 2 rollout.

## Install

```bash
bun add @duskwork/paycore-sdk
# or
npm install @duskwork/paycore-sdk
```

## Quick start

```ts
import { PayCore } from "@duskwork/paycore-sdk";

const pay = new PayCore({
    apiKey: process.env.PAYCORE_API_KEY!,
    baseUrl: "https://pay.example.com",
});

const invoice = await pay.invoices.create({
    currency: "USDT_TRC20",
    amount: "9.99",
    fiatCurrency: "USD",
    externalUserId: "user_42",
    metadata: { planId: 3 },
});

console.log(pay.getCheckoutUrl(invoice.id));
// → https://pay.example.com/checkout/<invoice.id>
```

## Webhook verification

```ts
import { PayCore } from "@duskwork/paycore-sdk";

const pay = new PayCore({ apiKey: "...", baseUrl: "..." });

// Inside your HTTP handler:
const signature = request.headers.get("x-pay-signature")!;
const body = await request.text();

if (!pay.webhooks.verify(body, signature, process.env.WEBHOOK_SECRET!)) {
    return new Response("invalid signature", { status: 400 });
}

const event = pay.webhooks.parse(body);
if (event.event === "invoice.confirmed") {
    /* activate user's subscription */
}
```

## Streaming live invoice updates (SSE)

```ts
const stop = pay.invoices.events(invoice.id, (event) => {
    if (event.event === "invoice.confirmed") {
        console.log("Paid!", event.data.txHash);
        stop();
    }
});
```

## License

[MIT](./LICENSE) — use freely in any project, commercial or otherwise.
Issues and pull requests welcome at [github.com/duskwork/paycore-sdk](https://github.com/duskwork/paycore-sdk).
