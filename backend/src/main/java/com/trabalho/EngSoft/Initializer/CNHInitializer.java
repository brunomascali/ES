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
            cnh1.setCnh("11111111111");
            cnh1.setCpf("11111111111");
            cnhRepository.save(cnh1);

            CNH cnh2 = new CNH();
            cnh2.setCnh("22222222222");
            cnh2.setCpf("22222222222");
            cnhRepository.save(cnh2);
        }
    }
}