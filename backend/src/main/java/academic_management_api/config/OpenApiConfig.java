package academic_management_api.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// Configura metadatos basicos para la documentacion Swagger.
@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI academicManagementOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Academic Management API")
                        .description("API REST para gestionar alumnos, materias y notas")
                        .version("v1.0.0")
                        .contact(new Contact()
                                .name("Equipo Backend")
                                .email("backend@example.com"))
                        .license(new License()
                                .name("MIT")
                                .url("https://opensource.org/licenses/MIT")));
    }
}
