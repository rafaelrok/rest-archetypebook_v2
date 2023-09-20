package br.com.rafaelvieira.restarchetypebook_v2.integration.controller.withxml;

import static io.restassured.RestAssured.given;
import static org.junit.Assert.assertNotNull;

import br.com.rafaelvieira.restarchetypebook_v2.config.ConfigTest;
import br.com.rafaelvieira.restarchetypebook_v2.integration.containers.AbstractIntegrationTest;
import br.com.rafaelvieira.restarchetypebook_v2.integration.vo.AccountCredentialsVO;
import br.com.rafaelvieira.restarchetypebook_v2.integration.vo.TokenVO;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.boot.test.context.SpringBootTest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@TestMethodOrder(OrderAnnotation.class)
public class AuthControllerXmlTest extends AbstractIntegrationTest {

	private static TokenVO tokenVO;
	
	@Test
	@Order(1)
	public void testSignin() throws JsonMappingException, JsonProcessingException {
		
		AccountCredentialsVO user =
				new AccountCredentialsVO("rafael", "admin123");
		
		tokenVO = given()
				.basePath("/auth/signin")
					.port(ConfigTest.SERVER_PORT)
					.contentType(ConfigTest.CONTENT_TYPE_XML)
				.body(user)
					.when()
				.post()
					.then()
						.statusCode(200)
							.extract()
							.body()
								.as(TokenVO.class);
		
		Assertions.assertNotNull(tokenVO.getAccessToken());
		Assertions.assertNotNull(tokenVO.getRefreshToken());
	}
	
	@Test
	@Order(2)
	public void testRefresh() throws JsonMappingException, JsonProcessingException {
		
		var newTokenVO = given()
				.basePath("/auth/refresh")
				.port(ConfigTest.SERVER_PORT)
				.contentType(ConfigTest.CONTENT_TYPE_XML)
					.pathParam("username", tokenVO.getUsername())
					.header(ConfigTest.HEADER_PARAM_AUTHORIZATION, "Bearer " + tokenVO.getRefreshToken())
				.when()
					.put("{username}")
				.then()
					.statusCode(200)
				.extract()
					.body()
						.as(TokenVO.class);
		
		Assertions.assertNotNull(newTokenVO.getAccessToken());
		Assertions.assertNotNull(newTokenVO.getRefreshToken());
	}
}
