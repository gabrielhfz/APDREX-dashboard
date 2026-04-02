export async function onRequest(context) {
    const { request } = context;
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get("url");

    // Si detectamos el parámetro ?url=, actuamos como puente
    if (targetUrl) {
        const response = await fetch(targetUrl);
        const newHeaders = new Headers(response.headers);
        newHeaders.set("Access-Control-Allow-Origin", "*");
        
        return new Response(response.body, {
            status: response.status,
            headers: newHeaders,
        });
    }

    // Si no hay parámetro, sirve el HTML normalmente
    return context.next();
}