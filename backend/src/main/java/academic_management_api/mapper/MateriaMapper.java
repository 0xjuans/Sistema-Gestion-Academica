package academic_management_api.mapper;

import academic_management_api.dto.MateriaRequestDto;
import academic_management_api.dto.MateriaResponseDto;
import academic_management_api.entity.Materia;

// Mapper de conversion entre Materia y sus DTOs.
public final class MateriaMapper {

    private MateriaMapper() {
    }

    public static Materia toEntity(MateriaRequestDto requestDto) {
        Materia materia = new Materia();
        materia.setNombre(requestDto.nombre());
        materia.setCodigo(requestDto.codigo());
        materia.setCreditos(requestDto.creditos());
        return materia;
    }

    public static void updateEntity(Materia materia, MateriaRequestDto requestDto) {
        materia.setNombre(requestDto.nombre());
        materia.setCodigo(requestDto.codigo());
        materia.setCreditos(requestDto.creditos());
    }

    public static MateriaResponseDto toResponseDto(Materia materia) {
        return new MateriaResponseDto(
                materia.getId(),
                materia.getNombre(),
                materia.getCodigo(),
                materia.getCreditos()
        );
    }
}
