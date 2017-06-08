window.onload = function () {
    const protocol = window.location.protocol + '//';
    const hostname = window.location.host;
    const ui = SwaggerUIBundle({
        url: protocol+hostname+"/content-service/api/swagger.json",
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
