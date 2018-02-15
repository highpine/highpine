define([], function() {
    return {
        services: [],
        registerService: function(authService) {
            this.services.push(authService);
        }
    };
});