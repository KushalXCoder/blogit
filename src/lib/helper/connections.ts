import { BlogPlatform } from "@/lib/types/blog.types";
import { IntegrationData } from "@/lib/types/global.types";

type ConnectionPatch = {
    platform: BlogPlatform;
    connected?: boolean;
    apiKey?: string;
};

export const getConnection = (connections: IntegrationData, platform: BlogPlatform) => {
    return connections.find((connection) => connection.platform === platform);
};

export const isPlatformConnected = (connections: IntegrationData, platform: BlogPlatform) => {
    return getConnection(connections, platform)?.connected ?? false;
};

export const upsertConnection = (connections: IntegrationData, patch: ConnectionPatch): IntegrationData => {
    const nextConnections = [...connections];
    const index = nextConnections.findIndex((connection) => connection.platform === patch.platform);

    const nextConnection = {
        platform: patch.platform,
        connected: patch.connected ?? nextConnections[index]?.connected ?? false,
        apiKey: patch.apiKey ?? nextConnections[index]?.apiKey ?? "",
    };

    if (index === -1) {
        nextConnections.push(nextConnection);
        return nextConnections;
    }

    nextConnections[index] = nextConnection;
    return nextConnections;
};
