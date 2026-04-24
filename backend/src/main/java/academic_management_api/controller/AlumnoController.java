package academic_management_api.controller;

import academic_management_api.dto.AlumnoRequestDto;
import academic_management_api.dto.AlumnoResponseDto;
import academic_management_api.service.AlumnoService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// Expone endpoints REST para la gestion de alumnos.
@RestController
@RequestMapping("/api/alumnos")
public class AlumnoController {

    private final AlumnoService alumnoService;

    public AlumnoController(AlumnoService alumnoService) {
        this.alumnoService = alumnoService;
    }

    @PostMapping
    public ResponseEntity<AlumnoResponseDto> create(@Valid @RequestBody AlumnoRequestDto requestDto) {
        AlumnoResponseDto createdAlumno = alumnoService.create(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAlumno);
    }

    @GetMapping
    public ResponseEntity<List<AlumnoResponseDto>> findAll() {
        return ResponseEntity.ok(alumnoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlumnoResponseDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(alumnoService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AlumnoResponseDto> update(
            @PathVariable Long id,
            @Valid @RequestBody AlumnoRequestDto requestDto
    ) {
        return ResponseEntity.ok(alumnoService.update(id, requestDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        alumnoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
