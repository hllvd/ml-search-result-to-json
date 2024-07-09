import { Entity } from "electrodb";
import "dotenv/config";
export declare const appConfigRepository: Entity<string, string, string, {
    model: {
        entity: string;
        version: string;
        service: string;
    };
    attributes: {
        clientId: {
            type: "string";
            required: true;
        };
        configKey: {
            type: "string";
            required: true;
        };
        configValue: {
            type: "string";
        };
    };
    indexes: {
        byClientId: {
            pk: {
                field: string;
                composite: "clientId"[];
            };
            sk: {
                field: string;
                composite: "configKey"[];
            };
        };
    };
}>;
