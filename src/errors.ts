/* ============================================================================
   Error types — paycore-sdk
   ============================================================================ */

export class PayCoreError extends Error {
    public readonly status: number;
    public readonly code: string;
    public readonly responseBody: unknown;

    constructor(message: string, status: number, code: string, responseBody?: unknown) {
        super(message);
        this.name = "PayCoreError";
        this.status = status;
        this.code = code;
        this.responseBody = responseBody;
    }
}

export class PayCoreNetworkError extends PayCoreError {
    constructor(message: string) {
        super(message, 0, "network_error");
        this.name = "PayCoreNetworkError";
    }
}

export class PayCoreUnauthorizedError extends PayCoreError {
    constructor(message = "Unauthorized — check your API key") {
        super(message, 401, "unauthorized");
        this.name = "PayCoreUnauthorizedError";
    }
}

export class PayCoreRateLimitError extends PayCoreError {
    public readonly retryAfter: number;
    constructor(retryAfter: number) {
        super(`Rate limit exceeded — retry in ${retryAfter}s`, 429, "rate_limited");
        this.name = "PayCoreRateLimitError";
        this.retryAfter = retryAfter;
    }
}
