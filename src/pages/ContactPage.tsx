"use client";

import emailjs from "@emailjs/browser";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { memo, useActionState, useCallback } from "react";
import { useFormStatus } from "react-dom";
import PageHeader from "../components/PageHeader";
import SEO from "../components/SEO";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { usePortfolioData } from "../data/portfolio";
import { useTranslation } from "../i18n/useTranslation";
import type { Strings } from "../i18n/strings";

type FormState = { status: "idle" | "success" | "error"; message: string };

const submitContactFormImpl = async (
  _prevState: FormState,
  formData: FormData,
  t: Strings["contact"],
  recipientEmail: string,
) => {
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const message = String(formData.get("message") ?? "");
  const subject = String(formData.get("subject") ?? "").trim() || `Portfolio inquiry from ${name}`;

  try {
    const serviceId = import.meta.env.VITE_SERVICE_ID;
    const templateId = import.meta.env.VITE_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      const params = new URLSearchParams({ subject, body: `${message}\n\n— ${name} <${email}>` });
      window.open(`mailto:${recipientEmail}?${params.toString()}`);
      return { status: "success" as const, message: t.successMailto };
    }

    await emailjs.send(serviceId, templateId, { from_name: name, from_email: email, subject, message }, publicKey);
    return { status: "success" as const, message: t.successSent };
  } catch {
    return { status: "error" as const, message: t.error };
  }
};

const SubmitButton = ({ t }: { t: Strings["contact"] }) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full h-12 rounded-xl flex items-center justify-center gap-2">
      {pending ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" /> : <Send size={20} />}
      <span>{pending ? t.sending : t.sendMessage}</span>
    </Button>
  );
};

const ContactPage = () => {
  const { personalInfo, references } = usePortfolioData();
  const { t } = useTranslation();
  const submitContactForm = useCallback(
    (prevState: FormState, formData: FormData) =>
      submitContactFormImpl(prevState, formData, t.contact, personalInfo.email),
    [t.contact, personalInfo.email],
  );
  const [formState, formAction] = useActionState<FormState, FormData>(submitContactForm, { status: "idle", message: "" });

  return (
    <div className="py-16 sm:py-24 min-h-screen">
      <SEO title={t.seo.pages.contact.title} description={t.seo.pages.contact.description} />
      
      <div className="container-width max-w-5xl mx-auto px-4">
        <PageHeader eyebrow={t.contact.eyebrow} title={t.contact.title} subtitle={t.contact.subtitle} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Side */}
          <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <form action={formAction} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">{t.contact.formName}</Label>
                <Input id="name" name="name" placeholder={t.contact.formNamePlaceholder} required className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t.contact.formEmail}</Label>
                <Input id="email" name="email" type="email" placeholder="email@example.com" required className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">{t.common.subject}</Label>
                <Input id="subject" name="subject" placeholder={t.common.subject} className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{t.contact.formMessage}</Label>
                <Textarea id="message" name="message" placeholder={t.contact.formMessagePlaceholder} required className="rounded-xl min-h-32" />
              </div>
              <SubmitButton t={t.contact} />
              {formState.status === "success" && <p className="text-emerald-500 text-center font-medium">{formState.message}</p>}
              {formState.status === "error" && <p className="text-red-500 text-center font-medium">{formState.message}</p>}
            </form>
          </Card>

          {/* Info Side */}
          <div className="space-y-10">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold dark:text-white">{t.contact.contactInfoHeading}</h2>
              <div className="grid gap-4">
                {[
                  { icon: Mail, label: t.contact.emailLabel, info: personalInfo.email },
                  { icon: Phone, label: t.contact.phoneLabel, info: personalInfo.phone },
                  { icon: MapPin, label: t.contact.locationLabel, info: personalInfo.location }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 text-white"><item.icon size={18} /></span>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase">{item.label}</p>
                      <p className="font-semibold dark:text-white">{item.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold dark:text-white">{t.contact.referencesHeading}</h2>
              <div className="grid gap-4">
                {references.map((ref, i) => (
                  <Card key={i} className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-bold dark:text-white">{ref.name}</p>
                          <p className="text-xs text-slate-500 uppercase font-semibold">{ref.position}</p>
                        </div>
                        <Mail size={16} className="text-slate-500 dark:text-slate-400" />
                      </div>
                      <a href={`mailto:${ref.email}`} className="block text-sm text-indigo-600 dark:text-indigo-400 font-medium truncate hover:underline">{ref.email}</a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ContactPage);
