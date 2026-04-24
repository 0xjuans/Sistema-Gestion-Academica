package academic_management_api.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

// DTO de salida para exponer notas con su contexto.
public record NotaResponseDto(
        Long id,
        BigDecimal valor,
        LocalDateTime fechaRegistro,
        Long alumnoId,
        String alumnoNombreCompleto,
        Long materiaId,
        String materiaNombre,
        String materiaCodigo
) {
}
