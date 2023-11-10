export default {
    install(app) {
        console.log(`[App version]: ${import.meta.env.VITE_APP_VERSION} - ${import.meta.env.VITE_APP_VERSION_DATE}`);
    },
};