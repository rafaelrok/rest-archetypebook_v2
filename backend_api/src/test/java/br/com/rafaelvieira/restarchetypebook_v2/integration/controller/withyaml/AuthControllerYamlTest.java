package br.com.rafaelvieira.restarchetypebook_v2.integration.controller.withyaml;

import static io.restassured.RestAssured.given;
import static org.junit.Assert.assertNotNull;

import br.com.rafaelvieira.restarchetypebook_v2.config.ConfigTest;
import br.com.rafaelvieira.restarchetypebook_v2.integration.containers.AbstractIntegrationTest;
import br.com.rafaelvieira.restarchetypebook_v2.integration.controller.withyaml.mapper.YMLMapper;
import br.com.rafaelvieira.restarchetypebook_v2.integration.vo.AccountCredentialsVO;
import br.com.rafaelvieira.restarchetypebook_v2.integration.vo.TokenVO;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.springframework.boot.test.context.SpringBootTest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import io.restassured.builder.RequestSpecBuilder;
import io.restassured.config.EncoderConfig;
import io.restassured.config.RestAssuredConfig;
import io.restassured.filter.log.LogDetail;
import io.restassured.filter.log.RequestLoggingFilter;
import io.restassured.filter.log.ResponseLoggingFilter;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@TestMethodOrder(OrderAnnotation.class)
public class AuthControllerYamlTest extends AbstractIntegrationTest {

	private static YMLMapper objectMapper;
	private static TokenVO tokenVO;
	
	@BeforeAll
	public static void setup() {
		objectMapper = new YMLMapper();
	}
	
	@Test
	@Order(1)
	public void testSignin() throws JsonMappingException, JsonProcessingException {
		
		AccountCredentialsVO user =
				new AccountCredentialsVO("rafael", "admin123");
		
		RequestSpecification specification = new RequestSpecBuilder()
					.addFilter(new RequestLoggingFilter(LogDetail.ALL))
					.addFilter(new ResponseLoggingFilter(LogDetail.ALL))
				.build();
		
		tokenVO = given().spec(specification)
				.config(
					RestAssuredConfig
						.config()
						.encoderConfig(EncoderConfig.encoderConfig()
							.encodeContentTypeAs(
									ConfigTest.CONTENT_TYPE_YML,
								ContentType.TEXT)))
				.accept(ConfigTest.CONTENT_TYPE_YML)
				.basePath("/auth/signin")
					.port(ConfigTest.SERVER_PORT)
					.contentType(ConfigTest.CONTENT_TYPE_YML)
				.body(user, objectMapper)
					.when()
				.post()
					.then()
						.statusCode(200)
							.extract()
							.body()
								.as(TokenVO.class, objectMapper);
		
		Assertions.assertNotNull(tokenVO.getAccessToken());
		Assertions.assertNotNull(tokenVO.getRefreshToken());
	}
	
	@Test
	@Order(2)
	public void testRefresh() throws JsonMappingException, JsonProcessingException {
		
		var newTokenVO = given()
				.config(
					RestAssuredConfig
						.config()
						.encoderConfig(EncoderConfig.encoderConfig()
							.encodeContentTypeAs(
									ConfigTest.CONTENT_TYPE_YML,
								ContentType.TEXT)))
				.accept(ConfigTest.CONTENT_TYPE_YML)
				.basePath("/auth/refresh")
				.port(ConfigTest.SERVER_PORT)
				.contentType(ConfigTest.CONTENT_TYPE_YML)
					.pathParam("username", tokenVO.getUsername())
					.header(ConfigTest.HEADER_PARAM_AUTHORIZATION, "Bearer " + tokenVO.getRefreshToken())
				.when()
					.put("{username}")
				.then()
					.statusCode(200)
				.extract()
					.body()
						.as(TokenVO.class, objectMapper);
		
		Assertions.assertNotNull(newTokenVO.getAccessToken());
		Assertions.assertNotNull(newTokenVO.getRefreshToken());
	}
}
