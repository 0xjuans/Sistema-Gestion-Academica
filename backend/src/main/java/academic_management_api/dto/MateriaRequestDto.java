package academic_management_api.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

// DTO de entrada para crear o actualizar materias.
public record MateriaRequestDto(
        @NotBlank(message = "El nombre de la materia es obligatorio")
        String nombre,
        @NotBlank(message = "El codigo de la materia es obligatorio")
        String codigo,
        @Min(value = 1, message = "Los creditos deben ser mayores o iguales a 1")
        Integer creditos
) {
}
