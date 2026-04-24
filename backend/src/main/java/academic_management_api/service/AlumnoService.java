package academic_management_api.service;

import academic_management_api.dto.AlumnoRequestDto;
import academic_management_api.dto.AlumnoResponseDto;
import academic_management_api.entity.Alumno;
import academic_management_api.exception.ConflictException;
import academic_management_api.exception.ResourceNotFoundException;
import academic_management_api.mapper.AlumnoMapper;
import academic_management_api.repository.AlumnoRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// Contiene la logica de negocio para gestion de alumnos.
@Service
public class AlumnoService {

    private final AlumnoRepository alumnoRepository;

    public AlumnoService(AlumnoRepository alumnoRepository) {
        this.alumnoRepository = alumnoRepository;
    }

    @Transactional
    public AlumnoResponseDto create(AlumnoRequestDto requestDto) {
        validateUniqueEmail(requestDto.email(), null);
        Alumno alumno = AlumnoMapper.toEntity(requestDto);
        Alumno savedAlumno = alumnoRepository.save(alumno);
        return AlumnoMapper.toResponseDto(savedAlumno);
    }

    @Transactional(readOnly = true)
    public List<AlumnoResponseDto> findAll() {
        return alumnoRepository.findAll()
                .stream()
                .map(AlumnoMapper::toResponseDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public AlumnoResponseDto findById(Long id) {
        Alumno alumno = findEntityById(id);
        return AlumnoMapper.toResponseDto(alumno);
    }

    @Transactional
    public AlumnoResponseDto update(Long id, AlumnoRequestDto requestDto) {
        Alumno alumno = findEntityById(id);
        validateUniqueEmail(requestDto.email(), id);
        AlumnoMapper.updateEntity(alumno, requestDto);
        Alumno updatedAlumno = alumnoRepository.save(alumno);
        return AlumnoMapper.toResponseDto(updatedAlumno);
    }

    @Transactional
    public void delete(Long id) {
        Alumno alumno = findEntityById(id);
        alumnoRepository.delete(alumno);
    }

    @Transactional(readOnly = true)
    public Alumno findEntityById(Long id) {
        return alumnoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe un alumno con id: " + id));
    }

    private void validateUniqueEmail(String email, Long currentAlumnoId) {
        alumnoRepository.findByEmail(email).ifPresent(existingAlumno -> {
            boolean isDifferentAlumno = currentAlumnoId == null || !existingAlumno.getId().equals(currentAlumnoId);
            if (isDifferentAlumno) {
                throw new ConflictException("Ya existe un alumno registrado con el email: " + email);
            }
        });
    }
}
