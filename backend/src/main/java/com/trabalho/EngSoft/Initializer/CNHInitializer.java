package com.trabalho.EngSoft.Initializer;

import com.trabalho.EngSoft.Model.CNH;
import com.trabalho.EngSoft.Repository.CNHRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CNHInitializer implements CommandLineRunner {
    @Autowired
    CNHRepository cnhRepository;

    @Override
    public void run(String... args) throws Exception {
        if (cnhRepository.count() == 0) {
            CNH cnh1 = new CNH();
            cnh1.setCnh("1");
            cnh1.setCpf("1");
            cnhRepository.save(cnh1);

            CNH cnh2 = new CNH();
            cnh2.setCnh("2");
            cnh2.setCpf("2");
            cnhRepository.save(cnh2);
        }
    }
}