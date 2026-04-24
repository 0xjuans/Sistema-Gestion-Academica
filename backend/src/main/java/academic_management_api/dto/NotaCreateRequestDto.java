package academic_management_api.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

// DTO de entrada para registrar una nota.
public record NotaCreateRequestDto(
        @NotNull(message = "El valor de la nota es obligatorio")
        @DecimalMin(value = "0.0", inclusive = true, message = "La nota minima es 0.0")
        @DecimalMax(value = "5.0", inclusive = true, message = "La nota maxima es 5.0")
        BigDecimal valor,
        @NotNull(message = "El id del alumno es obligatorio")
        Long alumnoId,
        @NotNull(message = "El id de la materia es obligatorio")
        Long materiaId
) {
}
