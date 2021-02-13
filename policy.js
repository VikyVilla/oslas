module.exports = {
    // TODO : Attach policy in AWS (JSON) POLICY(CRUD)
    users: {
        tweet: ["create", "read", "update", "delete"]
    },
    admin: {
        tweet: ["create", "read", "update", "delete"],
        user: ["create", "read", "update", "delete"],
    },
    superadmin: {
        actions: ["create", "read", "update", "delete"],
        logs: ["create", "read", "update", "delete"],
        query: ["create", "read", "update", "delete"],
    }
};