export async function GET() {
    const res = await fetch('https://deisishop.pythonanywhere.com/products/')
    const data = await res.json();
    return Response.json(data)
}