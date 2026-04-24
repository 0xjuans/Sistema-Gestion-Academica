package academic_management_api.dto;

// DTO de salida para exponer datos de materias.
public record MateriaResponseDto(
        Long id,
        String nombre,
        String codigo,
        Integer creditos
) {
}
