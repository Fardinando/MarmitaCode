import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { error } = await req.json();
    
    // Call OpenRouter with the best programming model (using provided key)
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "MarmitaCode AI Guard",
      },
      body: JSON.stringify({
        "model": "deepseek/deepseek-chat", // One of the best for programming de graca/low cost
        "messages": [
          {
            "role": "system",
            "content": "Você é o Engenheiro de Software Sênior da MarmitaCode. Sua função é monitorar erros no site. Se um erro ocorrer, você deve analisar e fornecer uma explicação técnica curta e como você 'corrigiu' virtualmente."
          },
          {
            "role": "user",
            "content": `Ocorreu o seguinte erro no site: ${error}. Analise e relate a correção.`
          }
        ],
      })
    });

    const data = await response.json();
    console.log('AI Guard Fix:', data.choices?.[0]?.message?.content);

    return NextResponse.json({ success: true, analysis: data.choices?.[0]?.message?.content });
  } catch (err) {
    console.error('AI Guard Error:', err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
