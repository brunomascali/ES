package com.trabalho.EngSoft.Controller;

import com.trabalho.EngSoft.DTO.SignupRequest;
import com.trabalho.EngSoft.DTO.VerificationRequest;
import com.trabalho.EngSoft.Model.Role;
import com.trabalho.EngSoft.Model.User;
import com.trabalho.EngSoft.Model.VerificationCode;
import com.trabalho.EngSoft.Repository.UserRepository;
import com.trabalho.EngSoft.Repository.VerificationCodesRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.Set;
import java.util.Random;
import java.util.Properties;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VerificationCodesRepository verificationCodes;

    @GetMapping("")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable long id) {
        return userRepository.findById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> signUp(@RequestBody SignupRequest signupRequest) {
        
        // A verificação da checagem de email já está implementada na função de verificação
        // ela pode ser excluída do signUp, assim que a verificação for implementada no frontend
        if (userRepository.findByEmail(signupRequest.getEmail()).isPresent()) {
            return ResponseEntity.status(401).body("Email já cadastrado");
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd", Locale.ENGLISH);
        LocalDate dob = LocalDate.parse(signupRequest.getDateOfBirth(), formatter);

        User user = new User();
        user.setName(signupRequest.getName());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(signupRequest.getPassword());
        user.setDateOfBirth(dob);
        user.setRoles(Set.of(new Role(2, "USUARIO")));
        user.setCpf(signupRequest.getCpf());
        userRepository.save(user);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/sendCode")
    public ResponseEntity<?> verifyEmail(@RequestBody SignupRequest verificationRequest){
        String email = verificationRequest.getEmail();

        // Verifica no banco se o email já está cadastrado no banco
        if (userRepository.findByEmail(email).isPresent())
            return ResponseEntity.status(401).body("Email já cadastrado");

        Random rand = new Random();
        int code = rand.nextInt(10000 - 1000) + 1000;

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

            // Checa se já foi enviado código para esse email, se sim apaga o antigo
            Optional<VerificationCode> old_code = verificationCodes.findByEmail(email);
            if (old_code.isPresent())
                verificationCodes.delete(old_code.get());

            // Salva o código de verificação enviado no banco de códigos
            verificationCodes.save(new VerificationCode(email, code));
            
            return ResponseEntity.ok().build();

        } catch (MessagingException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @PostMapping("/verifyCode")
    public ResponseEntity<?> verifyCode(@RequestBody VerificationRequest verificationRequest){
        String email = verificationRequest.getEmail();
        int code = verificationRequest.getVerificationCode();
        Optional<VerificationCode> verify = verificationCodes.findByEmail(email);
        
        if (verify.isPresent()){
            VerificationCode emailCode = verify.get();

            // Se o código de verificação é igual ao gerado retorna ok e apaga o email e código do banco
            if (emailCode.getCode() == code){
                // Deleta o código de verificação
                verificationCodes.delete(emailCode);
                
                return ResponseEntity.ok().build();
            }
            else
                return ResponseEntity.status(401).body("Código informado está errado");
        }

        return ResponseEntity.status(401).body("Email incorreto");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable long id, @RequestBody User user) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User userToUpdate = userOptional.get();
            userToUpdate.setName(user.getName());
            userToUpdate.setEmail(user.getEmail());
            userRepository.save(userToUpdate);
            return ResponseEntity.ok(userToUpdate);
        }

        return ResponseEntity.notFound().build();
    }
}
