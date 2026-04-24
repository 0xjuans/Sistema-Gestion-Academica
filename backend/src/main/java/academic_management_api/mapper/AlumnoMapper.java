package academic_management_api.mapper;

import academic_management_api.dto.AlumnoRequestDto;
import academic_management_api.dto.AlumnoResponseDto;
import academic_management_api.entity.Alumno;

// Mapper de conversion entre Alumno y sus DTOs.
public final class AlumnoMapper {

    private AlumnoMapper() {
    }

    public static Alumno toEntity(AlumnoRequestDto requestDto) {
        Alumno alumno = new Alumno();
        alumno.setNombre(requestDto.nombre());
        alumno.setApellido(requestDto.apellido());
        alumno.setEmail(requestDto.email());
        alumno.setFechaNacimiento(requestDto.fechaNacimiento());
        return alumno;
    }

    public static void updateEntity(Alumno alumno, AlumnoRequestDto requestDto) {
        alumno.setNombre(requestDto.nombre());
        alumno.setApellido(requestDto.apellido());
        alumno.setEmail(requestDto.email());
        alumno.setFechaNacimiento(requestDto.fechaNacimiento());
    }

    public static AlumnoResponseDto toResponseDto(Alumno alumno) {
        return new AlumnoResponseDto(
                alumno.getId(),
                alumno.getNombre(),
                alumno.getApellido(),
                alumno.getEmail(),
                alumno.getFechaNacimiento()
        );
    }
}
