import { useState } from "react";
import { motion } from "framer-motion";
import { createServerFn } from "@tanstack/react-start";
import doodleStars from "@/assets/inspos/doodle stars.png";
import rose from "@/assets/inspos/sticker rose.png";
import spiralPage from "@/assets/inspos/spiral page.png";
import doodleArrow from "@/assets/inspos/doodle arrow.png";
import doodleColdCoffee from "@/assets/inspos/doodle cold coffee.png";
import stickerPaws from "@/assets/inspos/sticker paws.png";
import roshniDhimarCv from "@/assets/inspos/Roshni Dhimar cv.pdf";

export interface SubmissionData {
  name: string;
  email: string;
  message: string;
}

export const submitContactForm = createServerFn({ method: "POST" })
  .inputValidator((data: SubmissionData) => {
    if (!data.name || data.name.trim().length === 0) {
      throw new Error("Name is required");
    }
    if (!data.email || !data.email.includes("@")) {
      throw new Error("A valid email is required");
    }
    if (!data.message || data.message.trim().length < 5) {
      throw new Error("Message must be at least 5 characters long");
    }
    return data;
  })
  .handler(async ({ data }: { data: SubmissionData }) => {
    const fs = await import("fs").then((m) => m.promises);
    const path = await import("path").then((m) => m.default);

    try {
      let emailSent = false;
      let emailError = "";

      // Send email if SMTP settings are present
      let smtpUser = process.env.SMTP_USER?.trim();
      let smtpPass = process.env.SMTP_PASS?.replace(/\s+/g, ""); // Strip any spaces from the App Password
      let smtpHost = (process.env.SMTP_HOST || "smtp.gmail.com").trim();
      let smtpPort = (process.env.SMTP_PORT || "587").trim();

      // Read fresh env values directly from the file to bypass Vite process caching
      try {
        const envPath = path.join(process.cwd(), ".env");
        const envContent = await fs.readFile(envPath, "utf-8");
        envContent.split("\n").forEach((line) => {
          const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
          if (match) {
            let value = match[2] ? match[2].trim() : "";
            if (value.startsWith('"') && value.endsWith('"')) {
              value = value.substring(1, value.length - 1);
            } else if (value.startsWith("'") && value.endsWith("'")) {
              value = value.substring(1, value.length - 1);
            }
            if (match[1] === "SMTP_USER") smtpUser = value.trim();
            if (match[1] === "SMTP_PASS") smtpPass = value.replace(/\s+/g, "");
            if (match[1] === "SMTP_HOST") smtpHost = value.trim();
            if (match[1] === "SMTP_PORT") smtpPort = value.trim();
          }
        });
      } catch (e) {
        // Fallback to process.env
      }

      console.log("SERVER-SIDE SMTP CONFIG DEBUG (LATEST):", {
        smtpUser,
        smtpPassLength: smtpPass?.length,
        smtpHost,
        smtpPort,
      });

      if (smtpUser && smtpPass) {
        try {
          const nodemailer = await import("nodemailer").then((m) => m.default);
          const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: parseInt(smtpPort, 10),
            secure: smtpPort === "465",
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
            tls: {
              rejectUnauthorized: false,
            },
          });

          const mailTo = process.env.SMTP_TO || "rosedhimar@gmail.com";

          await transporter.sendMail({
            from: `"${data.name}" <${smtpUser}>`,
            replyTo: data.email,
            to: mailTo,
            subject: `✦ Portfolio Message from ${data.name}`,
            text: `You received a new message from your portfolio contact form:\n\nName: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}\n\nTimestamp: ${new Date().toLocaleString()}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0d5c1; background-color: #faf7f2; color: #281c15;">
                <h2 style="border-bottom: 2px solid #c79a97; padding-bottom: 10px; color: #720915;">✦ New Portfolio Message</h2>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
                <div style="background-color: #fff6cc; border-left: 4px solid #ffee99; padding: 15px; margin: 20px 0; border-radius: 4px;">
                  <p style="margin: 0; font-style: italic;">"${data.message}"</p>
                </div>
                <p style="font-size: 12px; color: #a2745c;">Sent on: ${new Date().toLocaleString()}</p>
              </div>
            `,
          });
          emailSent = true;
          console.log("Email sent successfully to:", mailTo);
        } catch (err: unknown) {
          console.error("Failed to send email:", err);
          emailError = err instanceof Error ? err.message : String(err);
        }
      } else {
        console.warn(
          "SMTP_USER and SMTP_PASS environment variables are not set. Skipping email sending.",
        );
      }

      return {
        success: true,
        message: emailSent
          ? "Thank you! Your note has been pinned and sent to my email."
          : `Thank you! Your note has been pinned. ${emailError
            ? `(Email fail: ${emailError})`
            : "(Setup SMTP in .env to receive email alerts)"
          }`,
      };
    } catch (error) {
      console.error("Failed to process submission:", error);
      throw new Error("Could not send message. Please try again.");
    }
  });

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMsg("Please fill out all lines.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await submitContactForm({ data: { name, email, message } });
      if (res.success) {
        setStatus("success");
        setSuccessMsg(res.message);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
        setErrorMsg(res.message || "Something went wrong.");
      }
    } catch (err: unknown) {
      setStatus("error");
      const message = err instanceof Error ? err.message : "Could not pin message.";
      setErrorMsg(message);
    }
  };

  return (
    <section id="contact" className="relative pt-24 pb-0 bg-grid overflow-hidden">
      <img
        src={doodleStars}
        alt=""
        aria-hidden
        className="absolute top-12 right-10 w-24 float pointer-events-none"
      />
      <img
        src={rose}
        alt=""
        aria-hidden
        className="absolute -bottom-4 -left-6 w-40 -rotate-12 opacity-90 pointer-events-none"
      />

      <div className="max-w-4xl mx-auto px-6 relative">
        <div className="grid md:grid-cols-[1.5fr_1fr] gap-8 items-center text-center">
          {/* Left Column: Heading and paragraphs */}
          <div className="flex flex-col items-center justify-center">
            <p className="hand text-2xl text-[color:var(--rose-deep)] -rotate-1">⌇ the last page</p>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl mt-2 mb-6 leading-[0.95] text-[color:var(--ink)]">
              If any of this <span className="italic">felt familiar</span>,<br />
              let's talk.
            </h2>
            <p className="text-base sm:text-lg text-[color:var(--ink-soft)] max-w-xl leading-relaxed">
              I'm always quietly curious about new projects, internships, or just a thoughtful
              conversation about why some interfaces feel like home.
            </p>
            <p className="hand text-xl sm:text-2xl text-[color:var(--rose-deep)] mt-4 max-w-xl leading-snug">
              Got a Cool Project ? Want to Collaborate ?? Or just wanna say Hiee .
            </p>
          </div>

          {/* Right Column: Sticky note */}
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: 12, scale: 0.9 }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotate: 4,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 80,
                  damping: 12,
                  delay: 0.3,
                },
              }}
              viewport={{ once: true }}
              className="sticky-note p-6 rotate-[4deg] text-xl shadow-[var(--shadow-sticky)] w-48"
              style={{ background: "var(--butter)", borderRadius: 2 }}
            >
              <span
                className="tape"
                style={{ top: -10, left: "50%", transform: "translateX(-50%) rotate(4deg)" }}
              />
              open for projects,
              <br />
              freelancing & roles
              <br />· 2026 ·
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto text-center px-6">
        {/* Lined Notebook Contact Form Container */}
        <div className="relative max-w-xl mx-auto mt-16">
          {/* Doodle Arrow pointing to the form */}
          <img
            src={doodleArrow}
            alt=""
            className="hidden md:block absolute -left-20 top-16 w-16 rotate-[-110deg] opacity-75 pointer-events-none float"
          />

          <form onSubmit={handleSubmit} className="text-left w-full">
            <motion.div
              initial={{ opacity: 0, y: 50, rotate: -5, scale: 0.96 }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotate: -1,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 70,
                  damping: 15,
                  mass: 1.1,
                  delay: 0.2,
                },
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="paper-card bg-lines rounded-lg pt-12 p-8 md:p-10 rotate-[-1deg] shadow-lg relative hover-lift border-2 border-[color:var(--ink)]"
            >
              {/* Spiral binding page edge overlay */}
              <div className="absolute top-0 left-0 right-0 h-6 overflow-hidden rounded-t-lg z-20 select-none pointer-events-none">
                <img src={spiralPage} alt="" className="w-full h-full object-cover" />
              </div>

              {/* Washi tape on top */}
              <span
                className="tape yellow animate-pulse"
                style={{ top: 12, left: "15%", transform: "rotate(-3deg)", width: "70px" }}
              />
              <span
                className="tape sage"
                style={{ top: 12, right: "15%", transform: "rotate(2deg)", width: "70px" }}
              />

              {/* Cute paw sticker */}
              <img
                src={stickerPaws}
                alt=""
                className="absolute bottom-4 right-4 w-12 rotate-12 opacity-80 select-none pointer-events-none hover:scale-110 transition-transform"
              />

              <div className="mb-6 flex flex-col md:flex-row md:items-center gap-2 mt-4">
                <label className="hand text-2xl text-[color:var(--ink)] select-none font-bold">
                  Dear Rosh,
                </label>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-end gap-2">
                  <span className="hand text-2xl text-[color:var(--ink-soft)] whitespace-nowrap">
                    My name is
                  </span>
                  <input
                    type="text"
                    placeholder="write your name here..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={status === "loading"}
                    required
                    className="w-full border-b-2 border-[color:var(--ink)]/20 bg-transparent py-1 px-2 focus:outline-none focus:border-[color:var(--rose-deep)] transition-colors text-2xl hand text-[color:var(--ink)] placeholder-ink-soft/40"
                  />
                </div>

                <div className="flex flex-col md:flex-row md:items-end gap-2">
                  <span className="hand text-2xl text-[color:var(--ink-soft)] whitespace-nowrap">
                    You can email me at
                  </span>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading"}
                    required
                    className="w-full border-b-2 border-[color:var(--ink)]/20 bg-transparent py-1 px-2 focus:outline-none focus:border-[color:var(--rose-deep)] transition-colors text-2xl hand text-[color:var(--ink)] placeholder-ink-soft/40"
                  />
                </div>

                <div className="pt-4">
                  <p className="hand text-2xl text-[color:var(--ink-soft)] mb-2">
                    Here is what I wanted to say:
                  </p>
                  <textarea
                    rows={4}
                    placeholder="write your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={status === "loading"}
                    required
                    style={{ lineHeight: "32px", paddingTop: "0px" }}
                    className="w-full bg-transparent border-none focus:outline-none text-2xl hand text-[color:var(--ink)] placeholder-ink-soft/40 resize-none"
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-left">
                  {status === "success" && (
                    <div className="hand space-y-1">
                      <p className="text-xl text-[color:var(--sage)] font-bold animate-bounce">
                        ✓ note pinned to the board!
                      </p>
                      {successMsg && (
                        <p className="text-sm text-[color:var(--ink-soft)] leading-normal max-w-sm">
                          {successMsg}
                        </p>
                      )}
                    </div>
                  )}
                  {status === "error" && (
                    <p className="hand text-lg text-[color:var(--rose-deep)] font-bold">
                      ⚠ {errorMsg}
                    </p>
                  )}
                  {status === "loading" && (
                    <p className="hand text-xl text-[color:var(--ink-soft)] animate-pulse">
                      pinning note...
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="hand text-2xl border-2 border-[color:var(--ink)] bg-[color:var(--butter)] hover:bg-[color:var(--butter-deep)] px-6 py-2 rounded-md transition-colors hover-lift cursor-pointer text-[color:var(--ink)] font-bold shadow-[var(--shadow-sticky)]"
                >
                  {status === "loading" ? "pinning..." : "pin note ✦"}
                </button>
              </div>
            </motion.div>
          </form>
        </div>

        {/* Cold Coffee Doodle & Sign-off statement */}
        <div className="relative mt-20 flex flex-col items-center">
          <img
            src={doodleColdCoffee}
            alt="Doodle of a cold coffee cup"
            className="w-16 opacity-95 wiggle pointer-events-none mb-3"
          />
          <p className="hand text-xl text-[color:var(--ink-soft)]">
            thanks for reading till the last page ♡
            <br />
            <span className="text-base">— rosh, with cold coffee in hand</span>
          </p>
        </div>
      </div>

      {/* Full-width Dark Tone Footer */}
      <footer className="w-full bg-[#241b18] text-[#f5f1eb] py-12 px-6 mt-24 border-t border-[color:var(--ink)]/20">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="hand text-2xl font-bold tracking-wide text-[#f5f1eb]">Roshni Dhimar</p>
            <p className="hand text-sm text-[#f5f1eb]/70">handwritten with care · rosh · 2026</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              ["github", "https://github.com/Roshni-Dhimar-28"],
              ["linkedin", "https://www.linkedin.com/in/roshnidhimar"],
              ["email", "mailto:rosedhimar@gmail.com"],
              ["read.cv", roshniDhimarCv],
            ].map(([k, href]) => (
              <a
                key={k}
                href={href}
                target={k !== "email" ? "_blank" : undefined}
                rel={k !== "email" ? "noopener noreferrer" : undefined}
                className="hand text-lg text-[#f5f1eb]/85 hover:text-[color:var(--rose)] hover:underline transition-colors no-underline"
              >
                {k}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </section>
  );
}
