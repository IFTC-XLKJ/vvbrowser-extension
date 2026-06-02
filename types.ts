export {};

declare global {
    interface Window {
        vvbrowser: {
            version: {
                name: string;
                code: number;
            };
        };
    }
}
