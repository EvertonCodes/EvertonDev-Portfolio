import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Método não permitido");
  }

  const { nome, email, assunto, mensagem } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email é obrigatório" });
  }

  try {
    // 🔍 DEBUG (pode remover depois)
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "OK" : "NÃO DEFINIDO");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: `"${nome}" <${email}>`,
      to: "evertondeveloperpe@gmail.com",
      subject: assunto || "Sem assunto",
      html: `
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong> ${mensagem}</p>
      `,
    });

    return res.status(200).json({ message: "Mensagem enviada com sucesso!" });

  } catch (err) {
    console.error("ERRO COMPLETO:", err);

    return res.status(500).json({
      message: "Erro ao enviar a mensagem",
      error: err.message,
    });
  }
}