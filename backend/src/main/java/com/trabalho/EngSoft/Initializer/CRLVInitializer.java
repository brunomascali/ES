package com.trabalho.EngSoft.Initializer;

import com.trabalho.EngSoft.Model.CRLV;
import com.trabalho.EngSoft.Repository.CRLVRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class CRLVInitializer implements CommandLineRunner {
    @Autowired
    CRLVRepository crlvRepository;

    @Override
    public void run(String... args) throws Exception {
        if (crlvRepository.count() == 0) {
            CRLV c1 = new CRLV();
            c1.setPlate("ABC1234");
            c1.setExpiration(LocalDate.of(2025, 12, 31));
            crlvRepository.save(c1);

            CRLV c2 = new CRLV();
            c2.setPlate("ABC5678");
            c2.setExpiration(LocalDate.of(2020, 12, 31));
            crlvRepository.save(c1);
        }
    }
}
