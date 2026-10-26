
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";
import emailjs from "@emailjs/browser";
const contactDetails = [
  {
    icon: Mail,
    label: "EMAIL",
    value: "Let's talk about your next project",
  },
   {
    icon: MessageCircle,
    label: "OPEN TO OPPORTUNITIES",
    value: "New roles, collaborations & ambitious projects",
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));

    setSubmitted(false);
  };

const handleSubmit = async (event) => {
  event.preventDefault();


  const honeypot = event.target.website?.value;

  if (honeypot) {
    return;
  }

  const nextErrors = {};

  if (!form.name.trim()) {
    nextErrors.name = "Please enter your name.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    nextErrors.email = "Enter a valid email address.";
  }

  if (!form.subject.trim()) {
    nextErrors.subject = "Please add a subject.";
  }

  if (form.message.trim().length < 10) {
    nextErrors.message = "Please write at least 10 characters.";
  }

  if (Object.keys(nextErrors).length > 0) {
    setErrors(nextErrors);
    return;
  }

  try {
    setIsSending(true);

    await emailjs.send(
      "service_cpsge9m",
      "template_v2am2iq",
      {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      },
      "oiFzwrJ3ZMA-yZivB"
    );

    setSubmitted(true);

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    setErrors({});
  } catch (error) {
    console.error("EmailJS Error:", error);

    alert(
      "Sorry, something went wrong sending the message. Please try again."
    );
  } finally {
    setIsSending(false);
  }
};

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#F8F7F3] px-6 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Section introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col justify-between gap-5 sm:mb-16 sm:flex-row sm:items-end"
        >
          <div>
            <div className="mb-5 flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#A7D84D]" />
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#777A72]">
                Have something in mind?
              </p>
            </div>

            <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.075em] sm:text-6xl lg:text-7xl">
              Let's make
              <br />
              <span className="text-[#A0A398]">
                something meaningful.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-[#777A72] sm:text-base">
            Great work starts with a conversation. Whether you have a
            project in mind or an opportunity to share, I'd love to
            hear from you.
          </p>
        </motion.div>

        {/* Main contact composition */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.7 }}
          className="grid overflow-hidden rounded-[2rem] bg-[#171916] text-white lg:grid-cols-[0.9fr_1.1fr]"
        >
          {/* Left panel */}
          <div className="relative flex min-h-[440px] flex-col justify-between overflow-hidden p-7 sm:p-10 lg:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-[#B7ED52]/10 blur-[100px]"
            />

            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-[0.2em]">
                  PROVEE<span className="text-[#B7ED52]">.</span>
                </span>

                <span className="rounded-full border border-white/15 px-3 py-1.5 text-[10px] text-white/55">
                  Contact
                </span>
              </div>

              <div className="mt-20 sm:mt-24">
                <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                  The next step
                </p>

                <h3 className="mt-5 max-w-md text-4xl font-medium leading-[1.05] tracking-[-0.065em] sm:text-5xl">
                  Every great idea starts with{" "}
                  <span className="text-[#B7ED52]">
                    a conversation.
                  </span>
                </h3>

                <p className="mt-6 max-w-sm text-sm leading-7 text-white/55">
                  I'm building my experience one thoughtful project
                  at a time. Let's connect and explore what we can
                  create together.
                </p>
              </div>
            </div>

            <div className="relative mt-14 border-t border-white/10 pt-6">
              {contactDetails.map((detail) => {
                const Icon = detail.icon;

                return (
                  <div
                    key={detail.label}
                    className="flex items-start gap-4 py-3"
                  >
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <Icon
                        size={16}
                        strokeWidth={1.5}
                        className="text-[#B7ED52]"
                      />
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">
                        {detail.label}
                      </p>
                      <p className="mt-1 text-sm text-white/80">
                        {detail.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <ArrowUpRight
              aria-hidden="true"
              className="absolute bottom-10 right-8 hidden text-[#B7ED52]/25 sm:block"
              size={48}
              strokeWidth={1}
            />
          </div>

          {/* Right panel: contact form */}
          <div className="bg-white p-7 text-[#171916] sm:p-10 lg:p-12">
            <div className="mb-9 flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#8A8C83]">
                  Start a conversation
                </p>

                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.055em] sm:text-3xl">
                  Send me a message.
                </h3>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F0F2E9]">
                <Send
                  size={19}
                  strokeWidth={1.5}
                  className="text-[#6F8F37]"
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <input
    type="text"
    name="website"
    style={{ display: "none" }}
    tabIndex="-1"
    autoComplete="off"
  />
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-xs font-medium"
                  >
                    Your name
                  </label>

                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={updateField}
                    placeholder="Jane Smith"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                      errors.name ? "contact-name-error" : undefined
                    }
                    className="w-full rounded-xl border border-black/10 bg-[#FAFAF8] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#A5A69F] focus:border-[#A7D84D] focus:ring-4 focus:ring-[#A7D84D]/15"
                  />

                  {errors.name && (
                    <p
                      id="contact-name-error"
                      className="mt-2 text-xs text-red-600"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-xs font-medium"
                  >
                    Email address
                  </label>

                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={updateField}
                    placeholder="jane@company.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? "contact-email-error" : undefined
                    }
                    className="w-full rounded-xl border border-black/10 bg-[#FAFAF8] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#A5A69F] focus:border-[#A7D84D] focus:ring-4 focus:ring-[#A7D84D]/15"
                  />

                  {errors.email && (
                    <p
                      id="contact-email-error"
                      className="mt-2 text-xs text-red-600"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block text-xs font-medium"
                >
                  Subject
                </label>

                <input
                  id="contact-subject"
                  name="subject"
                  value={form.subject}
                  onChange={updateField}
                  placeholder="What would you like to discuss?"
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={
                    errors.subject ? "contact-subject-error" : undefined
                  }
                  className="w-full rounded-xl border border-black/10 bg-[#FAFAF8] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#A5A69F] focus:border-[#A7D84D] focus:ring-4 focus:ring-[#A7D84D]/15"
                />

                {errors.subject && (
                  <p
                    id="contact-subject-error"
                    className="mt-2 text-xs text-red-600"
                  >
                    {errors.subject}
                  </p>
                )}
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-xs font-medium"
                >
                  Your message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={updateField}
                  placeholder="Tell me a little about your idea, project, or opportunity..."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? "contact-message-error" : undefined
                  }
                  className="w-full resize-y rounded-xl border border-black/10 bg-[#FAFAF8] px-4 py-3.5 text-sm leading-6 outline-none transition placeholder:text-[#A5A69F] focus:border-[#A7D84D] focus:ring-4 focus:ring-[#A7D84D]/15"
                />

                {errors.message && (
                  <p
                    id="contact-message-error"
                    className="mt-2 text-xs text-red-600"
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="group mt-7 flex w-full items-center justify-between rounded-xl bg-[#B7ED52] px-5 py-4 text-sm font-semibold text-[#171916] transition duration-300 hover:bg-[#C7F778] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#A7D84D]/35"
              >
                <span>
  {isSending ? "Sending..." : "Send message"}
</span>

                <ArrowDownRight
                  size={19}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
                />
              </button>

              {submitted && (
                <div
                  role="status"
                  className="mt-4 flex items-start gap-2 rounded-xl border border-[#A7D84D]/40 bg-[#F5F9EC] p-4 text-xs leading-6 text-[#536A30]"
                >
                  <Check size={16} className="mt-1 shrink-0" />

                  <p>
                    Message sent successfully! Thanks for reaching out.
I'll get back to you as soon as possible.
                  </p>
                </div>
              )}

              <p className="mt-4 text-center text-[11px] leading-5 text-[#8A8C83]">
                Your details are used only to respond to your message.
              </p>
            </form>
          </div>
        </motion.div>

        {/* Closing note */}
        <div className="mt-8 flex flex-col justify-between gap-3 border-t border-black/[0.08] pt-5 text-xs text-[#85877F] sm:flex-row sm:items-center">
          <p>Thoughtful work. Meaningful connections.</p>

          <a
            href="#home"
            className="group inline-flex items-center gap-2 self-start font-medium text-[#34362F] transition hover:text-[#6F8F37] sm:self-auto"
          >
            Back to the top
            <ArrowDownRight
              size={15}
              className="rotate-[-135deg] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
