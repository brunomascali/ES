package com.trabalho.EngSoft.Service;

import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.stereotype.Service;

import java.util.Properties;

@Service
public class EmailService {

    public boolean SendVerificationCode(String email, String code) {
        // Email e senha (senha de aplicativo gerada pelo google)
        final String from = "go.vale.ufrgs@gmail.com";
        final String password = "cxhs lvlf uovg aydi";

        // Endereço do servidor Host
        String host = "smtp.gmail.com";

        // Configurando as propriedades do email
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", "587");

        // Criando um objeto sessão
        Session session = Session.getInstance(props,
                new Authenticator() {
                    @Override
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(from, password);
                    }
                });

        try {
            Message message = new MimeMessage(session);

            message.setFrom(new InternetAddress(from));
            message.setRecipient(Message.RecipientType.TO, new InternetAddress(email));
            message.setSubject("Email de verificação");
            message.setText("O seu código de verificação é: " + code);

            // Enviando o email
            Transport.send(message);
            return true;

        } catch (MessagingException e) {
            return false;
        }
    }
}
