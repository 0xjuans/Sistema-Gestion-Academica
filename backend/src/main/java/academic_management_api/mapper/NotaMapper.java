package academic_management_api.mapper;

import academic_management_api.dto.NotaResponseDto;
import academic_management_api.entity.Nota;

// Mapper de conversion entre Nota y su DTO de salida.
public final class NotaMapper {

    private NotaMapper() {
    }

    public static NotaResponseDto toResponseDto(Nota nota) {
        String alumnoNombreCompleto = nota.getAlumno().getNombre() + " " + nota.getAlumno().getApellido();
        return new NotaResponseDto(
                nota.getId(),
                nota.getValor(),
                nota.getFechaRegistro(),
                nota.getAlumno().getId(),
                alumnoNombreCompleto,
                nota.getMateria().getId(),
                nota.getMateria().getNombre(),
                nota.getMateria().getCodigo()
        );
    }
}
