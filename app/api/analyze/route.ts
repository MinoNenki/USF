import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { openai, ANALYSIS_SYSTEM_PROMPT } from '@/lib/openai';

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  const formData = await req.formData();
  const analysisType = String(formData.get('analysisType') || 'general');
  const content = String(formData.get('content') || '').trim();

  if (!content) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('credits_balance')
    .eq('id', user.id)
    .single();

  if (!profile || profile.credits_balance <= 0) {
    return NextResponse.redirect(new URL('/pricing?error=no-credits', req.url));
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.3,
    messages: [
      { role: 'system', content: ANALYSIS_SYSTEM_PROMPT },
      {
        role: 'user',
        content: `Typ analizy: ${analysisType}\n\nTreść:\n${content}`,
      },
    ],
  });

  const resultText = completion.choices[0]?.message?.content || 'Brak wyniku.';

  const { error: rpcError } = await supabase.rpc('consume_credit_and_store_analysis', {
    p_user_id: user.id,
    p_analysis_type: analysisType,
    p_input_text: content,
    p_result_text: resultText,
  });

  if (rpcError) {
    return NextResponse.json({ error: rpcError.message }, { status: 400 });
  }

  return NextResponse.redirect(new URL('/dashboard', req.url));
}
