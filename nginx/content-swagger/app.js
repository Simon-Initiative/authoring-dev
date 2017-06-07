window.onload = function () {
    const ui = SwaggerUIBundle({
        url: "http://dev.local/content-service/api/swagger.json",
        dom_id: '#swagger-ui',
        presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
        ],
        plugins: [
            SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout"
    });

    window.ui = ui;
    document.body.style.display = 'block';
}
