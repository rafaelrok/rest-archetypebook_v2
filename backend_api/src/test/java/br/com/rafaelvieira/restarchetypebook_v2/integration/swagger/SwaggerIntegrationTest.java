package br.com.rafaelvieira.restarchetypebook_v2.integration.swagger;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.*;

import br.com.rafaelvieira.restarchetypebook_v2.config.ConfigTest;
import br.com.rafaelvieira.restarchetypebook_v2.integration.containers.AbstractIntegrationTest;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class SwaggerIntegrationTest extends AbstractIntegrationTest {

	@Test
	public void shouldDisplaySwaggerUiPage() {
		var content =
			given()
				.basePath("/swagger-ui/index.html")
				.port(ConfigTest.SERVER_PORT)
				.when()
					.get()
				.then()
					.statusCode(200)
				.extract()
					.body()
						.asString();
		assertTrue(content.contains("Swagger UI"));
	}

}
