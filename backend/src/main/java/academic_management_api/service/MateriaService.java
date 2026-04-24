package academic_management_api.service;

import academic_management_api.dto.MateriaRequestDto;
import academic_management_api.dto.MateriaResponseDto;
import academic_management_api.entity.Materia;
import academic_management_api.exception.ConflictException;
import academic_management_api.exception.ResourceNotFoundException;
import academic_management_api.mapper.MateriaMapper;
import academic_management_api.repository.MateriaRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// Contiene la logica de negocio para gestion de materias.
@Service
public class MateriaService {

    private final MateriaRepository materiaRepository;

    public MateriaService(MateriaRepository materiaRepository) {
        this.materiaRepository = materiaRepository;
    }

    @Transactional
    public MateriaResponseDto create(MateriaRequestDto requestDto) {
        validateUniqueCodigo(requestDto.codigo(), null);
        Materia materia = MateriaMapper.toEntity(requestDto);
        Materia savedMateria = materiaRepository.save(materia);
        return MateriaMapper.toResponseDto(savedMateria);
    }

    @Transactional(readOnly = true)
    public List<MateriaResponseDto> findAll() {
        return materiaRepository.findAll()
                .stream()
                .map(MateriaMapper::toResponseDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public MateriaResponseDto findById(Long id) {
        Materia materia = findEntityById(id);
        return MateriaMapper.toResponseDto(materia);
    }

    @Transactional
    public MateriaResponseDto update(Long id, MateriaRequestDto requestDto) {
        Materia materia = findEntityById(id);
        validateUniqueCodigo(requestDto.codigo(), id);
        MateriaMapper.updateEntity(materia, requestDto);
        Materia updatedMateria = materiaRepository.save(materia);
        return MateriaMapper.toResponseDto(updatedMateria);
    }

    @Transactional
    public void delete(Long id) {
        Materia materia = findEntityById(id);
        materiaRepository.delete(materia);
    }

    @Transactional(readOnly = true)
    public Materia findEntityById(Long id) {
        return materiaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe una materia con id: " + id));
    }

    private void validateUniqueCodigo(String codigo, Long currentMateriaId) {
        materiaRepository.findByCodigo(codigo).ifPresent(existingMateria -> {
            boolean isDifferentMateria = currentMateriaId == null || !existingMateria.getId().equals(currentMateriaId);
            if (isDifferentMateria) {
                throw new ConflictException("Ya existe una materia registrada con el codigo: " + codigo);
            }
        });
    }
}
