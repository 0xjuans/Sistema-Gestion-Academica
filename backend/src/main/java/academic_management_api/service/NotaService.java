package academic_management_api.service;

import academic_management_api.dto.NotaCreateRequestDto;
import academic_management_api.dto.NotaResponseDto;
import academic_management_api.entity.Alumno;
import academic_management_api.entity.Materia;
import academic_management_api.entity.Nota;
import academic_management_api.mapper.NotaMapper;
import academic_management_api.repository.NotaRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// Contiene la logica de negocio para registro y consulta de notas.
@Service
public class NotaService {

    private final NotaRepository notaRepository;
    private final AlumnoService alumnoService;
    private final MateriaService materiaService;

    public NotaService(
            NotaRepository notaRepository,
            AlumnoService alumnoService,
            MateriaService materiaService
    ) {
        this.notaRepository = notaRepository;
        this.alumnoService = alumnoService;
        this.materiaService = materiaService;
    }

    @Transactional
    public NotaResponseDto create(NotaCreateRequestDto requestDto) {
        Alumno alumno = alumnoService.findEntityById(requestDto.alumnoId());
        Materia materia = materiaService.findEntityById(requestDto.materiaId());

        Nota nota = new Nota();
        nota.setValor(requestDto.valor());
        nota.setAlumno(alumno);
        nota.setMateria(materia);

        Nota savedNota = notaRepository.save(nota);
        return NotaMapper.toResponseDto(savedNota);
    }

    @Transactional(readOnly = true)
    public List<NotaResponseDto> findByAlumno(Long alumnoId) {
        alumnoService.findEntityById(alumnoId);
        return notaRepository.findByAlumnoId(alumnoId)
                .stream()
                .map(NotaMapper::toResponseDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<NotaResponseDto> findByAlumnoAndMateria(Long alumnoId, Long materiaId) {
        alumnoService.findEntityById(alumnoId);
        materiaService.findEntityById(materiaId);
        return notaRepository.findByAlumnoIdAndMateriaId(alumnoId, materiaId)
                .stream()
                .map(NotaMapper::toResponseDto)
                .toList();
    }
}
