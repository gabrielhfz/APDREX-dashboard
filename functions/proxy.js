export async function onRequest(context) {
    const { request } = context;
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get("url");

    // 1. Verificación de seguridad: Si no hay URL, devolvemos error claro
    if (!targetUrl) {
        return new Response("Error: Falta parámetro URL", { status: 400 });
    }

    try {
        // 2. Ejecución del puente hacia la API de Rex
        const response = await fetch(targetUrl);
        
        // 3. Forzamos los encabezados de CORS para que el navegador no bloquee
        const newHeaders = new Headers(response.headers);
        newHeaders.set("Access-Control-Allow-Origin", "*");
        newHeaders.set("Access-Control-Allow-Methods", "GET, OPTIONS");
        
        return new Response(response.body, {
            status: response.status,
            headers: newHeaders,
        });
    } catch (err) {
        // 4. Si la API de Rex está caída o hay error de red
        return new Response("Error de conexión con la API", { status: 502 });
    }
}
