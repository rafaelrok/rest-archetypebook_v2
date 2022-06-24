package br.com.rafaelvieira.restarchetypebook_v2.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("REST_full API (Archetype_book_v2) with Java 18 and Spring Boot 3")
                        .version("v1")
                        .description("API para orquestração de livros")
                        .termsOfService("https://github.com/rafaelrok/rest-archetypebook_v2")
                        .license(
                                new License()
                                        .name("Apache 2.0")
                                        .url("https://github.com/rafaelrok/rest-archetypebook_v2/blob/main/LICENSE")
                        )
                );
    }

}
