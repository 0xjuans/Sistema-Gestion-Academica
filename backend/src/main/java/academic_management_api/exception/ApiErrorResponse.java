package academic_management_api.exception;

import java.time.LocalDateTime;
import java.util.List;

// Estructura estandar para respuestas de error de la API.
public record ApiErrorResponse(
        LocalDateTime timestamp,
        int status,
        String error,
        String message,
        String path,
        List<String> details
) {
}
