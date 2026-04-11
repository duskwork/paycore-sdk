/* ============================================================================
   @duskwork/paycore-sdk
   ============================================================================
   Official TypeScript SDK for paycore — multi-tenant crypto payment gateway.

   Status: scaffolded — full implementation lands in Stage 4.

   Quick example:
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

   const checkoutUrl = pay.getCheckoutUrl(invoice.id);
   // → https://pay.example.com/checkout/<invoice.id>
   ```
   ============================================================================ */

export * from "./client.js";
export * from "./types.js";
export * from "./errors.js";
