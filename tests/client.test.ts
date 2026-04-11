import { describe, it, expect } from "bun:test";
import { PayCore, PayCoreError } from "../src/index.js";

describe("PayCore — Stage 1 scaffold", () => {
    it("constructs with valid options", () => {
        const pay = new PayCore({ apiKey: "test", baseUrl: "https://pay.example.com" });
        expect(pay).toBeInstanceOf(PayCore);
    });

    it("throws when apiKey is missing", () => {
        expect(() => new PayCore({ apiKey: "", baseUrl: "https://x" })).toThrow(PayCoreError);
    });

    it("throws when baseUrl is missing", () => {
        expect(() => new PayCore({ apiKey: "test", baseUrl: "" })).toThrow(PayCoreError);
    });

    it("getCheckoutUrl strips trailing slashes and encodes id", () => {
        const pay = new PayCore({ apiKey: "test", baseUrl: "https://pay.example.com///" });
        expect(pay.getCheckoutUrl("abc-123")).toBe("https://pay.example.com/checkout/abc-123");
    });

    it("getCheckoutUrl uses checkoutOrigin override when provided", () => {
        const pay = new PayCore({
            apiKey: "test",
            baseUrl: "https://api.example.com",
            checkoutOrigin: "https://pay.example.com",
        });
        expect(pay.getCheckoutUrl("xyz")).toBe("https://pay.example.com/checkout/xyz");
    });

    it("invoices.create throws not_implemented for now (Stage 4)", async () => {
        const pay = new PayCore({ apiKey: "test", baseUrl: "https://pay.example.com" });
        await expect(
            pay.invoices.create({ currency: "BTC", amount: "0.01" }),
        ).rejects.toThrow(PayCoreError);
    });
});
