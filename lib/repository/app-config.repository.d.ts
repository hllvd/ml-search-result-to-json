declare const setAppConfig: ({ domain, key, value, }: {
    domain: string;
    key: string;
    value: string;
}) => Promise<void>;
export { setAppConfig };
