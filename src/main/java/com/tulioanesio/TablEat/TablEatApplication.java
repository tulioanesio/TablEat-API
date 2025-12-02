package com.tulioanesio.TablEat;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.ConfigurableEnvironment;

@SpringBootApplication
public class TablEatApplication {

    private static final Logger logger = LoggerFactory.getLogger(TablEatApplication.class);
    private static final String ANSI_RESET = "\u001B[0m";
    private static final String ANSI_GREEN = "\u001B[32m";

    public static void main(String[] args) {
        var context = SpringApplication.run(TablEatApplication.class, args);
        ConfigurableEnvironment env = context.getEnvironment();
        String activeProfiles = String.join(", ", env.getActiveProfiles());
        if (activeProfiles.isEmpty()) {
            activeProfiles = "LOCAL";
        }
        logger.info("🌟 Active profile(s): {}{}{}", ANSI_GREEN, activeProfiles, ANSI_RESET);
    }
}