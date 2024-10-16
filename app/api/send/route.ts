// app\api\send\route.ts

import { EmailTemplate } from '@/app/_components/email-template';
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    // استقبال البيانات من  body
    const { to, subject, firstName } = await req.json();

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', //  يمكنك تغيير عنوان المرسل هنا
      to: [to], //  استخدام البريد الإلكتروني المستلم من  body
      subject: subject, //  استخدام موضوع الرسالة المستلم من  body
      react: EmailTemplate({ firstName: firstName }), //  تمرير اسم المستخدم إلى القالب
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
