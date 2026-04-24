package academic_management_api.dto;

import java.time.LocalDate;

// DTO de salida para exponer datos de alumnos.
public record AlumnoResponseDto(
        Long id,
        String nombre,
        String apellido,
        String email,
        LocalDate fechaNacimiento
) {
}
